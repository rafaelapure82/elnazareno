// src/modules/login/components/LoginLayout/LoginLayout.jsx
import React from 'react';
// import './LoginLayout.css';

const LoginLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
                {children}
            </div>
        </div>
    );
};

export default LoginLayout;