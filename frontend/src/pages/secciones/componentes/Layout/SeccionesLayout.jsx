import React from 'react';
import { FaSchool, FaUsers, FaHome } from 'react-icons/fa';
import { Link, useLocation, Outlet } from 'react-router-dom';

const SeccionesLayout = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    const navItems = [
        {
            path: '/secciones/grados',
            label: 'Grados',
            icon: <FaSchool />,
            exact: false
        },
        {
            path: '/secciones/estadisticas',
            label: 'Estadísticas',
            icon: <FaUsers />,
            exact: true
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <FaSchool className="text-3xl text-blue-600 mr-3" />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Gestión Académica</h1>
                                <p className="text-gray-600 text-sm">Módulo de Secciones y Grados</p>
                            </div>
                        </div>
                        {/* <div className="flex items-center space-x-4">
                            <Link
                                to="/"
                                className="text-gray-600 hover:text-blue-600 flex items-center"
                            >
                                <FaHome className="mr-1" />
                                <span>Inicio</span>
                            </Link>
                        </div> */}
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className="bg-white border-b">
                <div className="container mx-auto px-4">
                    <div className="flex space-x-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-4 py-3 text-sm font-medium transition-colors ${isActive(item.path)
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                                    }`}
                            >
                                <div className="flex items-center">
                                    <span className="mr-2">{item.icon}</span>
                                    {item.label}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Main Content - Aquí se renderizarán las rutas hijas */}
            <main className="container mx-auto px-4 py-6">
                <Outlet /> {/* Esto es crucial - renderiza las rutas hijas */}
            </main>

            {/* Footer */}
            {/* <footer className="bg-white border-t mt-8">
                <div className="container mx-auto px-4 py-4">
                    <p className="text-center text-gray-600 text-sm">
                        © {new Date().getFullYear()} Sistema de Gestión Académica - Módulo de Secciones
                    </p>
                </div>
            </footer> */}
        </div>
    );
};

export default SeccionesLayout;