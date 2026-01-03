// src/modules/login/adapters/login.adapter.js
export class LoginAdaptador {
    static toRequest(formData) {
        // Adapta los datos del formulario al formato que espera el backend
        return {
            usuario: formData.usuario.trim().toLowerCase(),
            password: formData.password
        };
    }

    static fromResponse(apiResponse) {
        // Adapta la respuesta del backend al formato que usa la aplicación
        return {
            token: apiResponse.token,
            refreshToken: apiResponse.refreshToken,
            user: {
                id: apiResponse.user.id,
                email: apiResponse.user.email,
                name: apiResponse.user.name || apiResponse.user.email.split('@')[0],
                roles: apiResponse.user.roles || ['user'],
                avatar: apiResponse.user.avatar,
                permissions: apiResponse.user.permissions || []
            },
            expiresIn: apiResponse.expiresIn || 3600
        };
    }
}