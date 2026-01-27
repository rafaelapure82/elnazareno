import React, { useState, useEffect } from 'react';
import { FaChartBar, FaSchool, FaUsers, FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import { useSecciones } from '../hooks/useSecciones';
import Swal from 'sweetalert2';

const EstadisticasPage = () => {
    const { grados, secciones, obtenerGrados, añoEscolarActual, servicios } = useSecciones();
    const [loading, setLoading] = useState(true);
    const [estadisticas, setEstadisticas] = useState({
        totalGrados: 0,
        totalSecciones: 0,
        totalProfesores: 0,
        totalEstudiantes: 0,
        capacidadPromedio: 0,
        seccionesPorGrado: []
    });

    useEffect(() => {
        cargarEstadisticas();
    }, []);

    const cargarEstadisticas = async () => {
        setLoading(true);
        try {
            await obtenerGrados();
            // Calcular estadísticas
            const totalSecciones = grados.reduce((acc, grado) => acc + (grado.totalSecciones || 0), 0);
            const totalProfesores = grados.reduce((acc, grado) => acc + (grado.totalProfesores || 0), 0);
            const totalEstudiantes = grados.reduce((acc, grado) => acc + (grado.totalEstudiantes || 0), 0);

            // Calcular capacidad promedio
            let capacidadTotal = 0;
            let seccionesConCapacidad = 0;

            // Obtener detalles de cada sección para calcular capacidad
            for (const grado of grados) {
                try {
                    const result = await servicios.obtenerSeccionesPorGrado(grado.id);
                    if (result.success) {
                        result.data.forEach(seccion => {
                            if (seccion.capacidadMaxima) {
                                capacidadTotal += seccion.capacidadMaxima;
                                seccionesConCapacidad++;
                            }
                        });
                    }
                } catch (error) {
                    console.error(`Error obteniendo secciones del grado ${grado.id}:`, error);
                }
            }

            const capacidadPromedio = seccionesConCapacidad > 0
                ? Math.round(capacidadTotal / seccionesConCapacidad)
                : 0;

            // Preparar datos para gráficos
            const seccionesPorGrado = grados.map(grado => ({
                nombre: grado.nombre,
                nivel: grado.nivel,
                cantidad: grado.totalSecciones || 0,
                estudiantes: grado.totalEstudiantes || 0,
                profesores: grado.totalProfesores || 0
            }));

            setEstadisticas({
                totalGrados: grados.length,
                totalSecciones,
                totalProfesores,
                totalEstudiantes,
                capacidadPromedio,
                seccionesPorGrado
            });
        } catch (error) {
            Swal.fire('Error', 'Error al cargar estadísticas', 'error');
            console.error('Error cargando estadísticas:', error);
        } finally {
            setLoading(false);
        }
    };

    const getColorByNivel = (nivel) => {
        switch (nivel) {
            case 'Inicial': return 'bg-pink-500';
            case 'Primaria': return 'bg-blue-500';
            case 'Media': return 'bg-green-500';
            case 'Jovenes y Adultos': return 'bg-purple-500';
            default: return 'bg-gray-500';
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Cargando estadísticas...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                    <FaChartBar className="text-4xl text-blue-600 mr-4" />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Estadísticas del Sistema</h1>
                        <p className="text-gray-600">Resumen general de grados, secciones y estudiantes</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">Año escolar: {añoEscolarActual || new Date().getFullYear()}</p>
                    <p className="text-sm text-gray-500">Actualizado: {new Date().toLocaleDateString()}</p>
                </div>
            </div>

            {/* Cards de estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-lg mr-4">
                            <FaSchool className="text-blue-600 text-2xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total Grados</p>
                            <p className="text-3xl font-bold text-gray-800">{estadisticas.totalGrados}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-lg mr-4">
                            <FaUsers className="text-green-600 text-2xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total Secciones</p>
                            <p className="text-3xl font-bold text-gray-800">{estadisticas.totalSecciones}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-purple-100 rounded-lg mr-4">
                            <FaChalkboardTeacher className="text-purple-600 text-2xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total Profesores</p>
                            <p className="text-3xl font-bold text-gray-800">{estadisticas.totalProfesores}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                            <FaUserGraduate className="text-yellow-600 text-2xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total Estudiantes</p>
                            <p className="text-3xl font-bold text-gray-800">{estadisticas.totalEstudiantes}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Capacidad promedio */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Capacidad Promedio por Sección</h2>
                <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-8">
                        <div
                            className="bg-blue-600 h-8 rounded-full flex items-center justify-center text-white font-bold"
                            style={{ width: `${Math.min(estadisticas.capacidadPromedio * 2, 100)}%` }}
                        >
                            {estadisticas.capacidadPromedio} estudiantes
                        </div>
                    </div>
                    <div className="ml-4 text-sm text-gray-600">
                        Promedio por sección
                    </div>
                </div>
            </div>

            {/* Tabla de distribución por grado */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Distribución por Grado</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Grado
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nivel
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Secciones
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estudiantes
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Profesores
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Progreso
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {estadisticas.seccionesPorGrado.map((grado, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{grado.nombre}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getColorByNivel(grado.nivel).replace('bg-', 'bg-').replace('-500', '-100')} ${getColorByNivel(grado.nivel).replace('bg-', 'text-')}`}>
                                            {grado.nivel}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{grado.cantidad}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{grado.estudiantes}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{grado.profesores}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="w-32 bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${getColorByNivel(grado.nivel)}`}
                                                style={{ width: `${Math.min((grado.cantidad / Math.max(estadisticas.totalSecciones, 1)) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Información adicional */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">Resumen General</h3>
                    <ul className="space-y-2">
                        <li className="flex justify-between">
                            <span className="text-blue-700">Estudiantes por sección:</span>
                            <span className="font-medium">{estadisticas.totalSecciones > 0 ? Math.round(estadisticas.totalEstudiantes / estadisticas.totalSecciones) : 0}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="text-blue-700">Profesores por sección:</span>
                            <span className="font-medium">{estadisticas.totalSecciones > 0 ? Math.round(estadisticas.totalProfesores / estadisticas.totalSecciones) : 0}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="text-blue-700">Secciones por grado:</span>
                            <span className="font-medium">{estadisticas.totalGrados > 0 ? Math.round(estadisticas.totalSecciones / estadisticas.totalGrados) : 0}</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-800 mb-3">Información del Sistema</h3>
                    <p className="text-green-700 mb-2">
                        El sistema muestra estadísticas en tiempo real de todos los grados y secciones registradas.
                    </p>
                    <p className="text-green-700">
                        Las estadísticas se actualizan automáticamente cada vez que se realizan cambios en el sistema.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EstadisticasPage;