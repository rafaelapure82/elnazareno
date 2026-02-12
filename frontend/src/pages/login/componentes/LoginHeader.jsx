// // src/modules/login/components/LoginHeader/LoginHeader.jsx
// import React from 'react';

// const LoginHeader = () => {
//     return (
//         <div className="text-center mb-8">
//             <div className="flex justify-center mb-4">
//                 <div className="bg-indigo-600 text-white p-3 rounded-lg shadow-md">
//                     <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
//                     </svg>
//                 </div>
//             </div>

//             <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
//                 Iniciar Sesión
//             </h2>

//             <p className="text-gray-600">
//                 Ingresa tus datos para iniciar sesion
//             </p>
//         </div>
//     );
// };

// export default LoginHeader;


import React from 'react';

const LoginHeader = () => {
    return (
        <div className="text-center mb-10">
            {/* Icono Escolar */}
            <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                    <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14v6"></path>
                    </svg>
                </div>
            </div>

            {/* Título con efecto */}
            <div className="relative mb-4">
                <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        Sistema Escolar
                    </span>
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto rounded-full"></div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
                Iniciar Sesión
            </h2>

            <p className="text-gray-500 text-sm max-w-xs mx-auto">
                Accede a tu cuenta para gestionar el contenido académico
            </p>
        </div>
    );
};

export default LoginHeader;