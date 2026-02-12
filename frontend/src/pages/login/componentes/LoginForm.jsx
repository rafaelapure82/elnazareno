// // // src/modules/login/components/LoginForm/LoginForm.jsx
// // import React from 'react';
// // import { useLogin } from '../hooks/useLogin';
// // import LoginHeader from './LoginHeader';
// // import LoginLayout from './LoginLayout';

// // const LoginForm = () => {
// //     const {
// //         formData,
// //         errors,
// //         isLoading,
// //         apiError,
// //         handleChange,
// //         handleSubmit,
// //         handleForgotPassword
// //     } = useLogin();

// //     return (
// //         <LoginLayout>
// //             <LoginHeader />

// //             <form onSubmit={handleSubmit} className="space-y-6">
// //                 {/* Usuario Input */}
// //                 <div>
// //                     <label for="usuario"
// //                         className="block text-sm font-medium text-gray-700 mb-1">
// //                         Usuario
// //                     </label>
// //                     <input
// //                         type="text"
// //                         name="usuario"
// //                         id="usuario"
// //                         value={formData.usuario}
// //                         onChange={handleChange}
// //                         className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.usuario
// //                             ? 'border-red-300 focus:ring-red-500'
// //                             : 'border-gray-300 focus:ring-indigo-500'
// //                             }`}
// //                         placeholder="Ingresa tu usario"
// //                         disabled={isLoading}
// //                     />
// //                     {errors.usuario && (
// //                         <p className="mt-1 text-sm text-red-600">{errors.usuario}</p>
// //                     )}
// //                 </div>

// //                 {/* Password Input */}
// //                 <div>
// //                     <label for="password"
// //                         className="block text-sm font-medium text-gray-700 mb-1">
// //                         Contraseña
// //                     </label>
// //                     <input
// //                         type="password"
// //                         name="password"
// //                         id="password"
// //                         value={formData.password}
// //                         onChange={handleChange}
// //                         className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.password
// //                             ? 'border-red-300 focus:ring-red-500'
// //                             : 'border-gray-300 focus:ring-indigo-500'
// //                             }`}
// //                         placeholder="••••••••"
// //                         disabled={isLoading}
// //                     />
// //                     {errors.password && (
// //                         <p className="mt-1 text-sm text-red-600">{errors.password}</p>
// //                     )}
// //                 </div>

// //                 {/* Remember Me & Forgot Password */}
// //                 <div className="flex items-center justify-between">
// //                     <div className="flex items-center">
// //                         <input
// //                             type="checkbox"
// //                             name="rememberMe"
// //                             checked={formData.rememberMe}
// //                             onChange={handleChange}
// //                             className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
// //                             disabled={isLoading}
// //                         />
// //                         <label className="ml-2 block text-sm text-gray-900">
// //                             Recordarme
// //                         </label>
// //                     </div>

// //                     <button
// //                         type="button"
// //                         onClick={handleForgotPassword}
// //                         className="text-sm font-medium text-indigo-600 hover:text-indigo-500 disabled:text-gray-400 cursor-pointer"
// //                         disabled={isLoading}
// //                     >
// //                         ¿Olvidaste tu contraseña?
// //                     </button>
// //                 </div>

// //                 {/* API Error */}
// //                 {(apiError || errors.submit) && (
// //                     <div className="rounded-lg bg-red-50 p-4 border border-red-200">
// //                         <div className="flex items-center">
// //                             <svg className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
// //                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
// //                             </svg>
// //                             <span className="text-sm text-red-700">{apiError || errors.submit}</span>
// //                         </div>
// //                     </div>
// //                 )}

// //                 {/* Submit Button */}
// //                 <button
// //                     type="submit"
// //                     disabled={isLoading}
// //                     className={`
// //             w-full py-3 px-4 rounded-lg text-white font-medium
// //             transition duration-200 flex justify-center items-center cursor-pointer
// //             ${isLoading
// //                             ? 'bg-indigo-400 cursor-not-allowed'
// //                             : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
// //                         }
// //           `}
// //                 >
// //                     {isLoading ? (
// //                         <>
// //                             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
// //                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                             </svg>
// //                             Autenticando...
// //                         </>
// //                     ) : (
// //                         'Iniciar sesión'
// //                     )}
// //                 </button>
// //             </form>
// //         </LoginLayout>
// //     );
// // };

// // export default LoginForm;


// import React from 'react';
// import { useLogin } from '../hooks/useLogin';
// import LoginHeader from './LoginHeader';
// import LoginLayout from './LoginLayout';

// const LoginForm = () => {
//     const {
//         formData,
//         errors,
//         isLoading,
//         apiError,
//         handleChange,
//         handleSubmit,
//         handleForgotPassword
//     } = useLogin();

//     return (
//         <LoginLayout>
//             <LoginHeader />

//             <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Usuario Input */}
//                 <div className="space-y-2">
//                     <div className="flex items-center">
//                         <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
//                         </svg>
//                         <label htmlFor="usuario" className="block text-sm font-semibold text-gray-700">
//                             Usuario / Email
//                         </label>
//                     </div>
//                     <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                             <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
//                             </svg>
//                         </div>
//                         <input
//                             type="text"
//                             name="usuario"
//                             id="usuario"
//                             value={formData.usuario}
//                             onChange={handleChange}
//                             className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 transition duration-200 ${errors.usuario
//                                 ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
//                                 : 'border-gray-300 focus:ring-blue-500 focus:border-blue-400'
//                                 }`}
//                             placeholder="usuario@escuela.edu"
//                             disabled={isLoading}
//                         />
//                     </div>
//                     {errors.usuario && (
//                         <p className="mt-1 text-sm text-red-600 flex items-center">
//                             <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
//                             </svg>
//                             {errors.usuario}
//                         </p>
//                     )}
//                 </div>

//                 {/* Password Input */}
//                 <div className="space-y-2">
//                     <div className="flex items-center">
//                         <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
//                         </svg>
//                         <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
//                             Contraseña
//                         </label>
//                     </div>
//                     <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                             <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
//                             </svg>
//                         </div>
//                         <input
//                             type="password"
//                             name="password"
//                             id="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             className={`block w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 transition duration-200 ${errors.password
//                                 ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
//                                 : 'border-gray-300 focus:ring-blue-500 focus:border-blue-400'
//                                 }`}
//                             placeholder="Ingresa tu contraseña"
//                             disabled={isLoading}
//                         />
//                     </div>
//                     {errors.password && (
//                         <p className="mt-1 text-sm text-red-600 flex items-center">
//                             <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
//                             </svg>
//                             {errors.password}
//                         </p>
//                     )}
//                 </div>

//                 {/* Remember Me & Forgot Password */}
//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                         <div className="relative">
//                             <input
//                                 type="checkbox"
//                                 name="rememberMe"
//                                 checked={formData.rememberMe}
//                                 onChange={handleChange}
//                                 className="sr-only"
//                                 disabled={isLoading}
//                                 id="rememberMe"
//                             />
//                             <div className={`w-5 h-5 border rounded flex items-center justify-center cursor-pointer transition duration-200 ${formData.rememberMe ? 'bg-blue-500 border-blue-500' : 'border-gray-300 hover:border-blue-400'}`}
//                                 onClick={() => handleChange({ target: { name: 'rememberMe', checked: !formData.rememberMe } })}>
//                                 {formData.rememberMe && (
//                                     <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
//                                     </svg>
//                                 )}
//                             </div>
//                         </div>
//                         <label htmlFor="rememberMe" className="ml-3 text-sm text-gray-600 cursor-pointer select-none">
//                             Recordar sesión
//                         </label>
//                     </div>

//                     <button
//                         type="button"
//                         onClick={handleForgotPassword}
//                         className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition duration-200 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center"
//                         disabled={isLoading}
//                     >
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                         </svg>
//                         ¿Olvidaste tu contraseña?
//                     </button>
//                 </div>

//                 {/* API Error */}
//                 {(apiError || errors.submit) && (
//                     <div className="rounded-xl bg-red-50 p-4 border border-red-200 animate-pulse-once">
//                         <div className="flex items-center">
//                             <svg className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
//                             </svg>
//                             <span className="text-sm font-medium text-red-800">{apiError || errors.submit}</span>
//                         </div>
//                     </div>
//                 )}

//                 {/* Submit Button */}
//                 <div className="pt-4">
//                     <button
//                         type="submit"
//                         disabled={isLoading}
//                         className={`
//                             w-full py-3 px-4 rounded-xl text-white font-semibold
//                             transition duration-300 flex justify-center items-center
//                             shadow-md hover:shadow-lg transform hover:-translate-y-0.5
//                             ${isLoading
//                                 ? 'bg-gradient-to-r from-blue-400 to-indigo-400 cursor-not-allowed'
//                                 : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95'
//                             }
//                             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
//                         `}
//                     >
//                         {isLoading ? (
//                             <>
//                                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                 </svg>
//                                 Iniciando sesión...
//                             </>
//                         ) : (
//                             <>
//                                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
//                                 </svg>
//                                 Acceder al Sistema
//                             </>
//                         )}
//                     </button>
//                 </div>

//                 {/* Separator */}
//                 <div className="relative">
//                     <div className="absolute inset-0 flex items-center">
//                         <div className="w-full border-t border-gray-300"></div>
//                     </div>
//                     <div className="relative flex justify-center text-sm">
//                         <span className="px-2 bg-white text-gray-500">¿Primera vez en la plataforma?</span>
//                     </div>
//                 </div>

//                 {/* Contact Admin Button */}
//                 <div className="text-center">
//                     <button
//                         type="button"
//                         className="text-sm text-gray-600 hover:text-blue-600 transition duration-200 inline-flex items-center"
//                     >
//                         <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
//                         </svg>
//                         Contactar al administrador
//                     </button>
//                 </div>
//             </form>
//         </LoginLayout>
//     );
// };

// export default LoginForm;


// import React, { useState } from 'react';
// import { useLogin } from '../hooks/useLogin';
// import LoginHeader from './LoginHeader';
// import LoginLayout from './LoginLayout';
// import ContactInfoCard from '../componentes/ContactPopup';

// const LoginForm = () => {
//     const {
//         formData,
//         errors,
//         isLoading,
//         apiError,
//         handleChange,
//         handleSubmit,
//         handleForgotPassword
//     } = useLogin();

//     const [showContact, setShowContact] = useState(false);

//     return (
//         <LoginLayout>
//             <LoginHeader />

//             {/* Alternar entre login y contacto */}
//             {!showContact ? (
//                 <>
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         {/* Usuario Input */}
//                         <div className="space-y-2">
//                             <div className="flex items-center">
//                                 <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
//                                 </svg>
//                                 <label htmlFor="usuario" className="block text-sm font-semibold text-gray-700">
//                                     Usuario / Email
//                                 </label>
//                             </div>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
//                                     </svg>
//                                 </div>
//                                 <input
//                                     type="text"
//                                     name="usuario"
//                                     id="usuario"
//                                     value={formData.usuario}
//                                     onChange={handleChange}
//                                     className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 transition duration-200 ${errors.usuario
//                                         ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
//                                         : 'border-gray-300 focus:ring-blue-500 focus:border-blue-400'
//                                         }`}
//                                     placeholder="usuario@escuela.edu"
//                                     disabled={isLoading}
//                                 />
//                             </div>
//                             {errors.usuario && (
//                                 <p className="mt-1 text-sm text-red-600 flex items-center">
//                                     <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                                         <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
//                                     </svg>
//                                     {errors.usuario}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Password Input */}
//                         <div className="space-y-2">
//                             <div className="flex items-center">
//                                 <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
//                                 </svg>
//                                 <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
//                                     Contraseña
//                                 </label>
//                             </div>
//                             <div className="relative">
//                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                     <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
//                                     </svg>
//                                 </div>
//                                 <input
//                                     type="password"
//                                     name="password"
//                                     id="password"
//                                     value={formData.password}
//                                     onChange={handleChange}
//                                     className={`block w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 transition duration-200 ${errors.password
//                                         ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
//                                         : 'border-gray-300 focus:ring-blue-500 focus:border-blue-400'
//                                         }`}
//                                     placeholder="Ingresa tu contraseña"
//                                     disabled={isLoading}
//                                 />
//                             </div>
//                             {errors.password && (
//                                 <p className="mt-1 text-sm text-red-600 flex items-center">
//                                     <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                                         <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
//                                     </svg>
//                                     {errors.password}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Remember Me & Forgot Password */}
//                         <div className="flex items-center justify-between">
//                             <div className="flex items-center">
//                                 <div className="relative">
//                                     <input
//                                         type="checkbox"
//                                         name="rememberMe"
//                                         checked={formData.rememberMe}
//                                         onChange={handleChange}
//                                         className="sr-only"
//                                         disabled={isLoading}
//                                         id="rememberMe"
//                                     />
//                                     <div className={`w-5 h-5 border rounded flex items-center justify-center cursor-pointer transition duration-200 ${formData.rememberMe ? 'bg-blue-500 border-blue-500' : 'border-gray-300 hover:border-blue-400'}`}
//                                         onClick={() => handleChange({ target: { name: 'rememberMe', checked: !formData.rememberMe } })}>
//                                         {formData.rememberMe && (
//                                             <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
//                                             </svg>
//                                         )}
//                                     </div>
//                                 </div>
//                                 <label htmlFor="rememberMe" className="ml-3 text-sm text-gray-600 cursor-pointer select-none">
//                                     Recordar sesión
//                                 </label>
//                             </div>

//                             <button
//                                 type="button"
//                                 onClick={handleForgotPassword}
//                                 className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition duration-200 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center"
//                                 disabled={isLoading}
//                             >
//                                 <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                                 </svg>
//                                 ¿Olvidaste tu contraseña?
//                             </button>
//                         </div>

//                         {/* API Error */}
//                         {(apiError || errors.submit) && (
//                             <div className="rounded-xl bg-red-50 p-4 border border-red-200 animate-pulse-once">
//                                 <div className="flex items-center">
//                                     <svg className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
//                                     </svg>
//                                     <span className="text-sm font-medium text-red-800">{apiError || errors.submit}</span>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Submit Button */}
//                         <div className="pt-4">
//                             <button
//                                 type="submit"
//                                 disabled={isLoading}
//                                 className={`
//                                     w-full py-3 px-4 rounded-xl text-white font-semibold
//                                     transition duration-300 flex justify-center items-center
//                                     shadow-md hover:shadow-lg transform hover:-translate-y-0.5
//                                     ${isLoading
//                                         ? 'bg-gradient-to-r from-blue-400 to-indigo-400 cursor-not-allowed'
//                                         : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95'
//                                     }
//                                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
//                                 `}
//                             >
//                                 {isLoading ? (
//                                     <>
//                                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                         </svg>
//                                         Iniciando sesión...
//                                     </>
//                                 ) : (
//                                     <>
//                                         <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
//                                         </svg>
//                                         Acceder al Sistema
//                                     </>
//                                 )}
//                             </button>
//                         </div>

//                         {/* Botón de contacto */}
//                         <div className="text-center pt-6 border-t border-gray-100">
//                             <button
//                                 type="button"
//                                 onClick={() => setShowContact(true)}
//                                 className="text-sm text-gray-600 hover:text-blue-600 transition duration-200 inline-flex items-center group"
//                             >
//                                 <div className="p-1.5 mr-2 bg-blue-50 group-hover:bg-blue-100 rounded-lg transition-colors">
//                                     <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
//                                     </svg>
//                                 </div>
//                                 <span>¿Problemas para acceder? Contactar administrador</span>
//                             </button>
//                         </div>
//                     </form>
//                 </>
//             ) : (
//                 <div className="space-y-6">
//                     {/* Botón para volver al login */}
//                     <div className="mb-4">
//                         <button
//                             onClick={() => setShowContact(false)}
//                             className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
//                         >
//                             <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
//                             </svg>
//                             Volver al inicio de sesión
//                         </button>
//                     </div>

//                     {/* Tarjeta de contacto */}
//                     <div className="animate-fade-in">
//                         <ContactInfoCard />
//                     </div>

//                     {/* Información adicional */}
//                     <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
//                         <div className="flex items-start">
//                             <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                             </svg>
//                             <div>
//                                 <h4 className="text-sm font-semibold text-blue-700 mb-1">
//                                     Horario de atención preferencial
//                                 </h4>
//                                 <p className="text-xs text-blue-600">
//                                     Para resolver problemas de acceso rápidamente, te recomendamos contactarnos durante el horario escolar:
//                                     <br />
//                                     <span className="font-medium">Lunes a Viernes: 7:30 AM - 4:30 PM</span>
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Estilos CSS para animaciones */}
//             <style jsx>{`
//                 .animate-pulse-once {
//                     animation: pulse 0.5s ease-in-out;
//                 }
//                 .animate-fade-in {
//                     animation: fadeIn 0.3s ease-in-out;
//                 }
//                 @keyframes pulse {
//                     0% { opacity: 0.5; }
//                     100% { opacity: 1; }
//                 }
//                 @keyframes fadeIn {
//                     from { opacity: 0; transform: translateY(10px); }
//                     to { opacity: 1; transform: translateY(0); }
//                 }
//             `}</style>
//         </LoginLayout>
//     );
// };

// export default LoginForm;


import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import LoginHeader from './LoginHeader';
import LoginLayout from './LoginLayout';
import ContactModal from '../componentes/ContactModal';

const LoginForm = () => {
    const {
        formData,
        errors,
        isLoading,
        apiError,
        handleChange,
        handleSubmit,
        handleForgotPassword
    } = useLogin();

    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    return (
        <LoginLayout>
            <LoginHeader />

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Usuario Input */}
                <div className="space-y-2">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        <label htmlFor="usuario" className="block text-sm font-semibold text-gray-700">
                            Usuario / Email
                        </label>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            name="usuario"
                            id="usuario"
                            value={formData.usuario}
                            onChange={handleChange}
                            className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 transition duration-200 ${errors.usuario
                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-400'
                                }`}
                            placeholder="usuario@escuela.edu"
                            disabled={isLoading}
                        />
                    </div>
                    {errors.usuario && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                            </svg>
                            {errors.usuario}
                        </p>
                    )}
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                            Contraseña
                        </label>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                        </div>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`block w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 transition duration-200 ${errors.password
                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-400'
                                }`}
                            placeholder="Ingresa tu contraseña"
                            disabled={isLoading}
                        />
                    </div>
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                            </svg>
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="relative">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                className="sr-only"
                                disabled={isLoading}
                                id="rememberMe"
                            />
                            <div className={`w-5 h-5 border rounded flex items-center justify-center cursor-pointer transition duration-200 ${formData.rememberMe ? 'bg-blue-500 border-blue-500' : 'border-gray-300 hover:border-blue-400'}`}
                                onClick={() => handleChange({ target: { name: 'rememberMe', checked: !formData.rememberMe } })}>
                                {formData.rememberMe && (
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                )}
                            </div>
                        </div>
                        <label htmlFor="rememberMe" className="ml-3 text-sm text-gray-600 cursor-pointer select-none">
                            Recordar sesión
                        </label>
                    </div>

                    {/* <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition duration-200 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center"
                        disabled={isLoading}
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        ¿Olvidaste tu contraseña?
                    </button> */}
                </div>

                {/* API Error */}
                {(apiError || errors.submit) && (
                    <div className="rounded-xl bg-red-50 p-4 border border-red-200 animate-pulse-once">
                        <div className="flex items-center">
                            <svg className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                            </svg>
                            <span className="text-sm font-medium text-red-800">{apiError || errors.submit}</span>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`
                            w-full py-3 px-4 rounded-xl text-white font-semibold
                            transition duration-300 flex justify-center items-center
                            shadow-md hover:shadow-lg transform hover:-translate-y-0.5
                            ${isLoading
                                ? 'bg-gradient-to-r from-blue-400 to-indigo-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95'
                            }
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                        `}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Iniciando sesión...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                                </svg>
                                Acceder al Sistema
                            </>
                        )}
                    </button>
                </div>

                {/* Separator */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">¿Primera vez en la plataforma?</span>
                    </div>
                </div>

                {/* Contact Admin Button */}
                <div className="text-center">
                    <button
                        type="button"
                        onClick={() => setIsContactModalOpen(true)}
                        className="text-sm text-gray-600 hover:text-blue-600 transition duration-200 inline-flex items-center group"
                    >
                        <div className="p-1.5 mr-2 bg-blue-50 group-hover:bg-blue-100 rounded-lg transition-colors">
                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                            </svg>
                        </div>
                        <span>Contactar al administrador</span>
                    </button>
                </div>
            </form>

            {/* Modal de contacto */}
            <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
            />
        </LoginLayout>
    );
};

export default LoginForm;