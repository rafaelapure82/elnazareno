// src/modules/login/adapters/auth.adapter.js
export class AuthAdaptador {
    static toLocalStorage(authData, rememberMe) {
        return {
            token: authData.token,
            user: authData.user,
            storageType: rememberMe ? 'local' : 'session'
        };
    }

    static fromLocalStorage() {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const user = localStorage.getItem('user') || sessionStorage.getItem('user');

        if (!token || !user) return null;

        return {
            token,
            user: JSON.parse(user),
            storageType: localStorage.getItem('token') ? 'local' : 'session'
        };
    }

    static clearStorage() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        localStorage.removeItem('userEmail');
    }
}