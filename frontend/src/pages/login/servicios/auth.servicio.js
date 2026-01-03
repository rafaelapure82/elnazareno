// src/modules/login/services/auth.service.js
import { ApiServicio } from './api.servicio';

export class AuthServicio {
    static async login(credentials) {
        // Endpoint esperado: POST /auth/login
        // Body esperado: { email: string, password: string }
        // Respuesta esperada: { 
        //   success: boolean, 
        //   token: string, 
        //   user: { id: number, email: string, name: string, roles: string[] },
        //   refreshToken?: string
        // }

        return await ApiServicio.post('/auth/login', credentials);
    }

    static async logout() {
        // Endpoint: POST /auth/logout
        try {
            return await ApiServicio.post('/auth/logout');
        } catch (error) {
            // Si falla el logout del servidor, continuamos con logout local
            console.warn('Logout del servidor falló:', error);
            return { success: true };
        }
    }

    static async validateToken(token) {
        // Endpoint: GET /auth/validate
        // Headers: Authorization: Bearer {token}
        // Respuesta: { valid: boolean, user?: object }
        console.log(token)
        return await ApiServicio.get('/auth/validate');
    }

    static async refreshToken(refreshToken) {
        // Endpoint: POST /auth/refresh
        // Body: { refreshToken: string }
        // Respuesta: { token: string, refreshToken: string }
        return await ApiServicio.post('/auth/refresh', { refreshToken });
    }

    static async forgotPassword(email) {
        // Endpoint: POST /auth/forgot-password
        return await ApiServicio.post('/auth/forgot-password', { email });
    }
}