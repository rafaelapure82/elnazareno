// src/modules/login/components/LoginForm/LoginForm.jsx
import React from 'react';
import { useLogin } from '../hooks/useLogin';
import LoginHeader from './LoginHeader';
import LoginLayout from './LoginLayout';

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

    return (
        <LoginLayout>
            <LoginHeader />

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Usuario Input */}
                <div>
                    <label for="usuario"
                        className="block text-sm font-medium text-gray-700 mb-1">
                        Usuario
                    </label>
                    <input
                        type="text"
                        name="usuario"
                        id="usuario"
                        value={formData.usuario}
                        onChange={handleChange}
                        className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.usuario
                            ? 'border-red-300 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-indigo-500'
                            }`}
                        placeholder="Ingresa tu usario"
                        disabled={isLoading}
                    />
                    {errors.usuario && (
                        <p className="mt-1 text-sm text-red-600">{errors.usuario}</p>
                    )}
                </div>

                {/* Password Input */}
                <div>
                    <label for="password"
                        className="block text-sm font-medium text-gray-700 mb-1">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.password
                            ? 'border-red-300 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-indigo-500'
                            }`}
                        placeholder="••••••••"
                        disabled={isLoading}
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                    )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                            disabled={isLoading}
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                            Recordarme
                        </label>
                    </div>

                    <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500 disabled:text-gray-400 cursor-pointer"
                        disabled={isLoading}
                    >
                        ¿Olvidaste tu contraseña?
                    </button>
                </div>

                {/* API Error */}
                {(apiError || errors.submit) && (
                    <div className="rounded-lg bg-red-50 p-4 border border-red-200">
                        <div className="flex items-center">
                            <svg className="h-5 w-5 text-red-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-red-700">{apiError || errors.submit}</span>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`
            w-full py-3 px-4 rounded-lg text-white font-medium
            transition duration-200 flex justify-center items-center cursor-pointer
            ${isLoading
                            ? 'bg-indigo-400 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        }
          `}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Autenticando...
                        </>
                    ) : (
                        'Iniciar sesión'
                    )}
                </button>
            </form>
        </LoginLayout>
    );
};

export default LoginForm;