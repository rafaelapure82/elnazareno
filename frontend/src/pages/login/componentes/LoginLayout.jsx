// // src/modules/login/components/LoginLayout/LoginLayout.jsx
// import React from 'react';
// // import './LoginLayout.css';

// const LoginLayout = ({ children }) => {
//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
//                 {children}
//             </div>
//         </div>
//     );
// };

// export default LoginLayout;
import React from 'react';

const LoginLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

            {/* Iconos decorativos escolares */}
            <div className="absolute top-10 left-10 opacity-10">
                <svg className="w-20 h-20 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                </svg>
            </div>
            <div className="absolute bottom-10 right-10 opacity-10">
                <svg className="w-24 h-24 text-indigo-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
            </div>

            <div className="relative max-w-md w-full space-y-8">
                <div className="bg-white p-10 rounded-2xl shadow-2xl backdrop-blur-sm border border-gray-100">
                    {children}
                </div>

                {/* Footer */}
                <div className="text-center">
                    <p className="text-gray-500 text-sm">
                        Sistema Escolar v2.0 © {new Date().getFullYear()}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                        Para uso exclusivo del personal educativo autorizado
                    </p>
                </div>
            </div>

            {/* Estilos para animaciones */}
            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                .animate-pulse-once {
                    animation: pulse 0.5s ease-in-out;
                }
                @keyframes pulse {
                    0% { opacity: 0.5; }
                    100% { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default LoginLayout;