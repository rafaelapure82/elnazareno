import axios from "axios";
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
const API_BASE_URL = 'http://localhost:3000/api';

// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );


// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             // Token expirado - limpiar storage
//             localStorage.removeItem('token');
//             localStorage.removeItem('user');
//             sessionStorage.removeItem('token');
//             sessionStorage.removeItem('user');
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );


// Función para establecer el callback desde tu contexto
export const setRefreshTokenCallback = (callback) => {
    refreshTokenCallback = callback;
};

// Variable para almacenar el callback de refreshToken desde el contexto
let refreshTokenCallback = null;
// Variables para controlar el refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor de solicitudes
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor de respuestas
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Si el error es 401 y no es una solicitud de refresh
        if (error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes('/refreshToken')) {

            // Si no hay callback de refreshToken, redirigir al login
            if (!refreshTokenCallback) {
                handleUnauthorized();
                return Promise.reject(error);
            }

            // Si ya se está refrescando, poner en cola la solicitud
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Obtener el refresh token del storage
                const storedRefreshToken = localStorage.getItem('refreshToken') ||
                    sessionStorage.getItem('refreshToken');

                if (!storedRefreshToken) {
                    throw new Error('No refresh token available');
                }

                // Llamar al callback de refreshToken del contexto
                const newToken = await refreshTokenCallback(storedRefreshToken);

                // Actualizar el header de autorización
                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                // Procesar cola de solicitudes pendientes
                processQueue(null, newToken);

                // Reintentar la solicitud original
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Si el refresh falla, procesar errores y redirigir
                processQueue(refreshError, null);
                handleUnauthorized();
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        // Para otros errores 401 o si ya se reintentó
        if (error.response?.status === 401) {
            handleUnauthorized();
        }

        return Promise.reject(error);
    }
);

// Función para manejar token no autorizado
const handleUnauthorized = () => {
    // Limpiar storage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('user');

    // Redirigir al login
    window.location.href = '/login';
};

export default axiosInstance;
