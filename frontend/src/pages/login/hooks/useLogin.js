import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contextos/AuthContexto';

import { AuthServicio } from '../servicios/auth.servicio';
import { LoginAdaptador } from '../adaptadores/login.adaptador';

import { AuthAdaptador } from '../adaptadores/auth.adaptador'; //*moseusa

import { useAuthValidacion } from './useAuthValidacion';

export const useLogin = () => {
    const navigate = useNavigate();
    const { login: contextLogin } = useAuth();
    const { validarFormulario } = useAuthValidacion();

    const [formData, setFormData] = useState({
        usuario: '',
        password: '',
        rememberMe: false
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    // Cargar email guardado
    useEffect(() => {
        const savedUsuario = localStorage.getItem('userUsuario');
        if (savedUsuario) {
            setFormData(prev => ({
                ...prev,
                usuario: savedUsuario,
                rememberMe: true
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));

        // Limpiar errores al escribir
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        if (apiError) setApiError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');

        // Validación del formulario
        const validationErrors = validarFormulario(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);

        try {
            // 1. Adaptar datos al formato del backend
            const credenciales = LoginAdaptador.toRequest(formData);

            // 2. Llamar al servicio de autenticación
            const respuesta = await AuthServicio.login(credenciales);

            // 3. Adaptar respuesta del backend
            const authData = LoginAdaptador.fromResponse(respuesta);

            console.log(authData.refreshToken)
            // 4. Guardar en contexto global
            await contextLogin(
                authData.user,
                authData.token,
                authData.refreshToken,
                formData.rememberMe
            );

            // 5. Guardar email si se seleccionó "Recordarme"
            if (formData.rememberMe) {
                localStorage.setItem('userUsuario', formData.usuario);
            } else {
                localStorage.removeItem('userUsuario');
            }

            // 6. Redirigir al dashboard
            navigate('/dashboard', { replace: true });

        } catch (error) {
            // Manejo de errores específicos de la API

            let errorMessage = 'Error en el login';
            // console.log(error.message)
            if (error.message === "Recurso no encontrado") {
                errorMessage = "Usuario o contraseña incorrectas"
            } else if (error.message.includes('Usuario o Correo invalidos')) {
                errorMessage = 'Usuario o contraseña incorrectos';
            } else if (error.message.includes('Error de conexión')) {
                errorMessage = 'Error de conexión. Verifica tu internet.';
            } else if (error.message.includes('Error interno')) {
                errorMessage = 'Error del servidor. Intenta más tarde.';
            } else {
                errorMessage = error.message || 'Error desconocido';
            }

            setApiError(errorMessage);
            setErrors({ submit: errorMessage });

        } finally {
            setIsLoading(false);
        }
    };
    //*OJO
    const handleForgotPassword = async () => {
        if (!formData.email) {
            setErrors({ email: 'Ingresa tu email para recuperar contraseña' });
            return;
        }

        try {
            await AuthServicio.forgotPassword(formData.email);
            alert('Se ha enviado un correo para recuperar tu contraseña');
        } catch (error) {
            setApiError(error.message);
        }
    };

    return {
        formData,
        errors,
        isLoading,
        apiError,
        handleChange,
        handleSubmit,
        handleForgotPassword
    };
};