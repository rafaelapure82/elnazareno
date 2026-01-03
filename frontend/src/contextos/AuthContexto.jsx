import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { AuthServicio } from '../pages/login/servicios/auth.servicio';
import { AuthAdaptador } from '../pages/login/adaptadores/auth.adaptador';
import axiosInstance from '../compartidos/api/axios.config';

const AuthContexto = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: true
    });

    // Inicializar desde storage
    useEffect(() => {
        const initializeAuth = async () => {
            const storedAuth = AuthAdaptador.fromLocalStorage();

            if (storedAuth?.token) {
                try {
                    // Validar token con el servidor
                    await AuthServicio.validateToken(storedAuth.token);

                    setAuthState({
                        user: storedAuth.user,
                        token: storedAuth.token,
                        isAuthenticated: true,
                        isLoading: false
                    });

                    // Configurar axios
                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${storedAuth.token}`;

                } catch (error) {
                    // Token inválido - limpiar
                    AuthAdaptador.clearStorage();
                    setAuthState({
                        user: null,
                        token: null,
                        isAuthenticated: false,
                        isLoading: false
                    });
                }
            } else {
                setAuthState(prev => ({ ...prev, isLoading: false }));
            }
        };

        initializeAuth();
    }, []);

    // Función de login
    const login = useCallback(async (user, token, rememberMe = false) => {
        // Guardar en storage
        if (rememberMe) {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', JSON.stringify(user));
        }

        // Configurar axios
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Actualizar estado
        setAuthState({
            user,
            token,
            isAuthenticated: true,
            isLoading: false
        });

        return true;
    }, []);

    // Función de logout
    const logout = useCallback(async () => {
        try {
            await AuthServicio.logout();
        } catch (error) {
            console.warn('Error en logout del servidor:', error);
        } finally {
            // Limpiar siempre
            AuthAdaptador.clearStorage();
            delete axiosInstance.defaults.headers.common['Authorization'];

            setAuthState({
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false
            });
        }
    }, []);

    // Refrescar token
    const refreshToken = useCallback(async (refreshToken) => {
        try {
            const response = await AuthServicio.refreshToken(refreshToken);

            // Actualizar en storage y estado
            const storage = localStorage.getItem('token') ? localStorage : sessionStorage;
            storage.setItem('token', response.token);

            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;

            setAuthState(prev => ({
                ...prev,
                token: response.token
            }));

            return response.token;
        } catch (error) {
            await logout();
            throw error;
        }
    }, [logout]);

    // Verificar permisos
    const hasPermission = useCallback((permission) => {
        if (!authState.user?.permissions) return false;
        return authState.user.permissions.includes(permission);
    }, [authState.user]);

    const hasRole = useCallback((role) => {
        if (!authState.user?.roles) return false;
        return authState.user.roles.includes(role);
    }, [authState.user]);

    return (
        <AuthContexto.Provider
            value={{
                ...authState,
                login,
                logout,
                refreshToken,
                hasPermission,
                hasRole
            }}
        >
            {children}
        </AuthContexto.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContexto);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }
    return context;
};