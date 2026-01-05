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
                id: apiResponse.usuario.id,
                email: apiResponse.usuario.email,
                name: apiResponse.usuario.name || apiResponse.usuario.email.split('@')[0],
                roles: apiResponse.usuario.rol || ['usuario'],
                avatar: apiResponse.usuario.avatar,
                permissions: apiResponse.usuario.permissions || []
            },
            expiresIn: apiResponse.expiresIn || 3600
        };
    }
}