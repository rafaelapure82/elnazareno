import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import LoginLayout from './LoginLayout';
import ContactModal from '../componentes/ContactModal';
import logoEscuela from '../logo/logoEscuela.png';

const LoginForm = () => {
    const {
        formData,
        errors,
        isLoading,
        apiError,
        handleChange,
        handleSubmit
    } = useLogin();

    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    return (
        <LoginLayout>
            <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
                {/* Lado Izquierdo: Ilustración/Logo */}
                <div className="w-full md:w-1/2 bg-[#f2f2f2] flex items-center justify-center p-12">
                    <div className="relative w-48 h-48 md:w-64 md:h-64 bg-white rounded-full shadow-inner flex items-center justify-center overflow-hidden border-8 border-white">
                        <img
                            src={logoEscuela}
                            alt="Logo Escuela"
                            className="w-4/5 h-4/5 object-contain animate-float"
                        />
                    </div>
                </div>

                {/* Lado Derecho: Formulario */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="text-center md:text-left mb-8">
                            <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-wider">
                                Login
                            </h1>
                        </div>

                        {/* Usuario Input */}
                        <div className="space-y-1">
                            <input
                                type="text"
                                name="usuario"
                                id="usuario"
                                value={formData.usuario}
                                onChange={handleChange}
                                placeholder="Email / Usuario"
                                disabled={isLoading}
                                className={`w-full bg-[#f2f2f2] border-none rounded-full py-3 px-6 text-sm focus:ring-2 focus:ring-[#8300cd] outline-none transition-all ${errors.usuario ? 'ring-2 ring-red-400' : ''
                                    }`}
                            />
                            {errors.usuario && (
                                <p className="text-xs text-red-500 ml-4">{errors.usuario}</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="******"
                                disabled={isLoading}
                                className={`w-full bg-[#f2f2f2] border-none rounded-full py-3 px-6 text-sm focus:ring-2 focus:ring-[#8300cd] outline-none transition-all ${errors.password ? 'ring-2 ring-red-400' : ''
                                    }`}
                            />
                            {errors.password && (
                                <p className="text-xs text-red-500 ml-4">{errors.password}</p>
                            )}
                        </div>

                        {/* Error de API */}
                        {(apiError || errors.submit) && (
                            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-100 animate-shake">
                                {apiError || errors.submit}
                            </div>
                        )}

                        {/* Botón Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 rounded-full text-white font-bold uppercase tracking-widest text-sm shadow-lg transition-all duration-300 transform active:scale-95 ${isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-[#1fcc44] hover:bg-[#ff3f70] hover:shadow-[#ff3f70]/40'
                                }`}
                        >
                            {isLoading ? 'Autenticando...' : 'Login'}
                        </button>

                        {/* Enlaces y Ayuda */}
                        <div className="text-center space-y-4 pt-4">
                            <p className="text-xs text-gray-400">
                                Forgot <span className="text-gray-500 cursor-pointer hover:text-[#8300cd] transition-colors">Username</span> / <span className="text-gray-500 cursor-pointer hover:text-[#8300cd] transition-colors">Password</span>?
                            </p>
                            <button
                                type="button"
                                onClick={() => setIsContactModalOpen(true)}
                                className="text-xs font-bold text-gray-500 hover:text-[#8300cd] transition-colors uppercase tracking-tighter"
                            >
                                Crear una cuenta / Contactarse con el Administrador
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modal de Contacto */}
            <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
            />

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.4s ease-in-out;
                }
            `}</style>
        </LoginLayout>
    );
};

export default LoginForm;