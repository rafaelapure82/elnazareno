// src/modules/login/components/LoginHeader/LoginHeader.jsx
import React from 'react';

const LoginHeader = () => {
    return (
        <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
                <div className="bg-indigo-600 text-white p-3 rounded-lg shadow-md">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                </div>
            </div>

            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                Iniciar Sesión
            </h2>

            <p className="text-gray-600">
                Ingresa tus datos para iniciar sesion
            </p>
        </div>
    );
};

export default LoginHeader;