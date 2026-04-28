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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#8300cd] to-[#b800c4] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Elementos decorativos opcionales (difuminados) */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative w-full max-w-4xl animate-fade-in">
                {children}
                
                {/* Footer simple */}
                <div className="text-center mt-8 text-white/60 text-sm">
                    <p>Sistema Escolar v2.0 © {new Date().getFullYear()} - CEIB El Nazareno</p>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.8s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default LoginLayout;