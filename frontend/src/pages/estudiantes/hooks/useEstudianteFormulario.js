import { useState, useEffect, useCallback } from 'react';
import { EstudiantesAdaptador } from '../adaptadores/estudiantes.adaptador';
import { EstudiantesServicio } from '../servicios/estudiantes.servicio';

export const useEstudianteForm = (initialData = null) => {
    const [formData, setFormData] = useState(
        initialData
            ? EstudiantesAdaptador.toFormData(initialData)
            : EstudiantesAdaptador.toFormData({})
    );

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Tipos de cédula
    const tiposCedula = [
        { value: 'V', label: 'V' },
        { value: 'E', label: 'E' },
        { value: 'P', label: 'P' },
        { value: 'J', label: 'J' }
    ];

    // Géneros
    const generos = [
        { value: 'Masculino', label: 'Masculino' },
        { value: 'Femenino', label: 'Femenino' },
        { value: 'Otro', label: 'Otro' }
    ];

    // Relaciones
    const relaciones = [
        { value: 'Padre', label: 'Padre' },
        { value: 'Madre', label: 'Madre' },
        { value: 'Representante', label: 'Representante' },
        { value: 'Tutor', label: 'Tutor' },
        { value: 'Abuelo', label: 'Abuelo' },
        { value: 'Abuela', label: 'Abuela' },
        { value: 'Tío', label: 'Tío' },
        { value: 'Tía', label: 'Tía' },
        { value: 'Hermano', label: 'Hermano' },
        { value: 'Hermana', label: 'Hermana' },
        { value: 'Otro', label: 'Otro' }
    ];

    // Actualizar datos iniciales
    useEffect(() => {
        if (initialData) {
            setFormData(EstudiantesAdaptador.toFormData(initialData));
        }
    }, [initialData]);

    // Manejar cambios en el formulario
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;

        // Si el campo pertenece al representante
        if (name.startsWith('representante.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                representante: {
                    ...prev.representante,
                    [field]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        // Limpiar error del campo
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    }, [errors]);

    // Buscar representante por cédula
    const buscarRepresentante = useCallback(async (cedula) => {
        if (!cedula.trim()) return;

        setLoading(true);
        try {
            const response = await EstudiantesServicio.buscarRepresentantePorCedula(cedula);
            if (response.success && response.data) {
                setFormData(prev => ({
                    ...prev,
                    representante: {
                        ...prev.representante,
                        nombres: response.data.nombres,
                        apellidos: response.data.apellidos,
                        relacion: response.data.relacion,
                        email: response.data.email || '',
                        telefono: response.data.telefono,
                        ocupacion: response.data.ocupacion || '',
                        tipo_cedula: response.data.tipo_cedula,
                        cedula: response.data.cedula
                    }
                }));
            }
        } catch (error) {
            console.log('Representante no encontrado, se creará uno nuevo', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Validar formulario
    const validate = useCallback(() => {
        const validationErrors = EstudiantesAdaptador.validarEstudiante(formData);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    }, [formData]);

    // Resetear formulario
    const resetForm = useCallback(() => {
        setFormData(EstudiantesAdaptador.toFormData({}));
        setErrors({});
    }, []);

    // Preparar datos para enviar
    const prepareSubmit = useCallback(() => {
        return EstudiantesAdaptador.toApiRequest(formData);
    }, [formData]);

    return {
        formData,
        errors,
        loading,
        submitting,
        tiposCedula,
        generos,
        relaciones,
        handleChange,
        buscarRepresentante,
        validate,
        resetForm,
        prepareSubmit,
        setSubmitting
    };
};