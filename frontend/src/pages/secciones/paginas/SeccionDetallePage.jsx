import React, { useState, useEffect } from 'react';
import {
    FaArrowLeft, FaUsers, FaChalkboardTeacher, FaUserGraduate,
    FaUserPlus, FaEdit, FaTrash, FaCalendarAlt, FaSchool,
    FaClipboardList, FaChartBar, FaPhone, FaVenusMars
} from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AsignarProfesorModal from '../componentes/ProfesoresSeccion/AsignarProfesorModal';
import InscribirEstudianteModal from '../componentes/EstudiantesSeccion/InscribirEstudianteModal';
import ProfesoresSeccionList from '../componentes/ProfesoresSeccion/ProfesoresSeccionList';
import EstudiantesSeccionList from '../componentes/EstudiantesSeccion/EstudiantesSeccionList';
import { useSecciones } from '../hooks/useSecciones';

const SeccionDetallePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [seccion, setSeccion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('general');
    const [showProfesorModal, setShowProfesorModal] = useState(false);
    const [showEstudianteModal, setShowEstudianteModal] = useState(false);
    const [profesores, setProfesores] = useState([]);
    const [estudiantes, setEstudiantes] = useState([]);
    const [estadisticas, setEstadisticas] = useState([]);
    const {
        servicios,
        añoEscolarActual,
        asignarProfesorASeccion,
        removerProfesorDeSeccion,
        inscribirEstudianteASeccion,
        removerEstudianteDeSeccion,
        actualizarEstadoEstudiante
    } = useSecciones();

    useEffect(() => {
        cargarSeccion();
    }, [id]);
    const cargarSeccion = async () => {
        setLoading(true);
        try {
            const result = await servicios.obtenerSeccionCompleta(id);
            if (result.success) {
                setSeccion(result.data);
                setProfesores(result.data.profesores || []);
                setEstudiantes(result.data.estudiantes || []);
                setEstadisticas(result.data.estadisticasEstudiantes || []);
            } else {
                Swal.fire('Error', result.message, 'error');
                navigate('/secciones/grados');
            }
        } catch (error) {
            Swal.fire('Error', 'Error al cargar la sección', 'error');
            navigate('/secciones/grados');
        } finally {
            setLoading(false);
        }
    };

    const handleAssignProfesor = async (profesorId, data) => {
        const result = await asignarProfesorASeccion(id, profesorId, data);
        if (result) {
            await cargarSeccion();
        }
        return result;
    };

    const handleRemoveProfesor = async (profesorId) => {
        const result = await removerProfesorDeSeccion(id, profesorId);
        if (result) {
            await cargarSeccion();
        }
        return result;
    };

    const handleUpdateTutor = async (profesorId, esTutor) => {
        try {
            const result = await servicios.actualizarTutor(id, profesorId, esTutor);
            if (result.success) {
                Swal.fire('Éxito', result.message, 'success');
                await cargarSeccion();
            } else {
                Swal.fire('Error', result.message, 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Error al actualizar tutor', 'error');
        }
    };

    const handleInscribeEstudiante = async (estudianteId, añoEscolar) => {
        const result = await inscribirEstudianteASeccion(id, estudianteId, añoEscolar);
        if (result) {
            await cargarSeccion();
        }
        return result;
    };

    const handleRemoveEstudiante = async (estudianteId) => {
        const result = await removerEstudianteDeSeccion(id, estudianteId);
        if (result) {
            await cargarSeccion();
        }
        return result;
    };

    const handleUpdateEstadoEstudiante = async (estudianteId, estado) => {
        try {
            const result = await servicios.actualizarEstadoEstudiante(id, estudianteId, estado);
            if (result.success) {
                Swal.fire('Éxito', result.message, 'success');
                await cargarSeccion();
            } else {
                Swal.fire('Error', result.message, 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Error al actualizar estado', 'error');
        }
    };

    const handleEditSeccion = () => {
        navigate(`/secciones/editar/${id}`);
    };

    const handleDeleteSeccion = async () => {
        const confirm = await Swal.fire({
            title: '¿Eliminar sección?',
            html: `
        <div class="text-left">
          <p><strong>Sección:</strong> ${seccion?.nombre}</p>
          <p><strong>Grado:</strong> ${seccion?.gradoNombre}</p>
          <p class="text-red-600">¡Advertencia! Esta acción eliminará:</p>
          <ul class="list-disc ml-4 mt-2 text-red-600">
            <li>Todos los profesores asignados</li>
            <li>Todos los estudiantes inscritos</li>
            <li>El historial de la sección</li>
          </ul>
        </div>
      `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (confirm.isConfirmed) {
            try {
                const result = await servicios.eliminarSeccion(id);
                if (result.success) {
                    Swal.fire('Eliminado', result.message, 'success');
                    navigate(`/secciones/grados/${seccion?.gradoId}/secciones`);
                } else {
                    Swal.fire('Error', result.message, 'error');
                }
            } catch (error) {
                Swal.fire('Error', 'Error al eliminar sección', 'error');
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Cargando información de la sección...</p>
                </div>
            </div>
        );
    }

    if (!seccion) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Sección no encontrada</h2>
                    <p className="text-gray-600 mt-2">La sección solicitada no existe.</p>
                    <button
                        onClick={() => navigate('/secciones/grados')}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Volver a Grados
                    </button>
                </div>
            </div>
        );
    }

    const capacidadPorcentaje = Math.round((seccion.capacidadActual / seccion.capacidadMaxima) * 100);
    const capacidadDisponible = seccion.capacidadMaxima - seccion.capacidadActual;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                onClick={() => navigate(`/secciones/grados/${seccion.gradoId}/secciones`)}
                                className="mr-4 p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                            >
                                <FaArrowLeft />
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">
                                    Sección {seccion.nombre}
                                </h1>
                                <p className="text-gray-600 flex items-center">
                                    <FaSchool className="mr-2" />
                                    {seccion.gradoNombre} - {seccion.gradoNivel}
                                </p>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={handleEditSeccion}
                                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center"
                            >
                                <FaEdit className="mr-2" />
                                Editar
                            </button>
                            <button
                                onClick={handleDeleteSeccion}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
                            >
                                <FaTrash className="mr-2" />
                                Eliminar
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center">
                                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                                    <FaUsers className="text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-blue-600">Capacidad</p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {seccion.capacidadActual}/{seccion.capacidadMaxima}
                                    </p>
                                    <p className="text-sm text-blue-600">{capacidadDisponible} disponibles</p>
                                </div>
                            </div>
                            <div className="mt-2">
                                <div className="w-full bg-blue-100 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full"
                                        style={{ width: `${capacidadPorcentaje}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <div className="flex items-center">
                                <div className="p-3 bg-purple-100 rounded-lg mr-4">
                                    <FaChalkboardTeacher className="text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-purple-600">Profesores</p>
                                    <p className="text-2xl font-bold text-gray-800">{profesores.length}</p>
                                    <p className="text-sm text-purple-600">{seccion.tutor ? '1 Tutor' : 'Sin tutor'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center">
                                <div className="p-3 bg-green-100 rounded-lg mr-4">
                                    <FaUserGraduate className="text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-green-600">Estudiantes</p>
                                    <p className="text-2xl font-bold text-gray-800">{estudiantes.length}</p>
                                    <p className="text-sm text-green-600">
                                        {estadisticas.find(e => e.estado === 'activo')?.total || 0} activos
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <div className="flex items-center">
                                <div className="p-3 bg-orange-100 rounded-lg mr-4">
                                    <FaCalendarAlt className="text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-orange-600">Creada</p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {new Date(seccion.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-orange-600">
                                        Actualizada: {new Date(seccion.updatedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs y Contenido */}
            <div className="container mx-auto px-4 py-8">
                {/* Tabs */}
                <div className="border-b border-gray-200 mb-8">
                    <nav className="flex space-x-1">
                        <button
                            onClick={() => setActiveTab('general')}
                            className={`px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'general'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-blue-600'
                                }`}
                        >
                            <FaClipboardList className="inline mr-2" />
                            Información General
                        </button>
                        <button
                            onClick={() => setActiveTab('profesores')}
                            className={`px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'profesores'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-blue-600'
                                }`}
                        >
                            <FaChalkboardTeacher className="inline mr-2" />
                            Profesores ({profesores.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('estudiantes')}
                            className={`px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'estudiantes'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-blue-600'
                                }`}
                        >
                            <FaUserGraduate className="inline mr-2" />
                            Estudiantes ({estudiantes.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('estadisticas')}
                            className={`px-4 py-3 text-sm font-medium transition-colors ${activeTab === 'estadisticas'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-blue-600'
                                }`}
                        >
                            <FaChartBar className="inline mr-2" />
                            Estadísticas
                        </button>
                    </nav>
                </div>

                {/* Contenido de Tabs */}
                <div>
                    {/* Tab: Información General */}
                    {activeTab === 'general' && (
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Información de la Sección</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Datos Principales</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600">Nombre de la Sección</label>
                                            <p className="mt-1 text-lg font-medium text-gray-900">{seccion.nombre}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600">Grado</label>
                                            <p className="mt-1 text-lg font-medium text-gray-900">
                                                {seccion.gradoNombre} - {seccion.gradoNivel}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600">Capacidad</label>
                                            <p className="mt-1 text-lg font-medium text-gray-900">
                                                {seccion.capacidadActual} / {seccion.capacidadMaxima} estudiantes
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Adicional</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600">Fecha de Creación</label>
                                            <p className="mt-1 text-gray-900">
                                                {new Date(seccion.createdAt).toLocaleDateString()} {new Date(seccion.createdAt).toLocaleTimeString()}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600">Última Actualización</label>
                                            <p className="mt-1 text-gray-900">
                                                {new Date(seccion.updatedAt).toLocaleDateString()} {new Date(seccion.updatedAt).toLocaleTimeString()}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-600">Tutor Actual</label>
                                            <p className="mt-1 text-gray-900">
                                                {seccion.tutor ? seccion.tutor.nombreCompleto : 'Sin tutor asignado'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Capacidad */}
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Capacidad de la Sección</h3>
                                <div className="relative pt-1">
                                    <div className="flex mb-2 items-center justify-between">
                                        <div>
                                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                                {capacidadPorcentaje}% de capacidad
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-semibold inline-block text-blue-600">
                                                {seccion.capacidadActual}/{seccion.capacidadMaxima}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                                        <div
                                            style={{ width: `${capacidadPorcentaje}%` }}
                                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab: Profesores */}
                    {activeTab === 'profesores' && (
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold text-gray-800">Gestión de Profesores</h2>
                                    <button
                                        onClick={() => setShowProfesorModal(true)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                                    >
                                        <FaUserPlus className="mr-2" />
                                        Asignar Profesor
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <ProfesoresSeccionList
                                    profesores={profesores}
                                    onRemove={handleRemoveProfesor}
                                    onUpdateTutor={handleUpdateTutor}
                                    loading={false}
                                />
                            </div>
                        </div>
                    )}

                    {/* Tab: Estudiantes */}
                    {activeTab === 'estudiantes' && (
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold text-gray-800">Gestión de Estudiantes</h2>
                                    <button
                                        onClick={() => setShowEstudianteModal(true)}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                                    >
                                        <FaUserPlus className="mr-2" />
                                        Inscribir Estudiante
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <EstudiantesSeccionList
                                    estudiantes={estudiantes}
                                    estadisticas={estadisticas}
                                    onRemove={handleRemoveEstudiante}
                                    onUpdateEstado={handleUpdateEstadoEstudiante}
                                    loading={false}
                                />
                            </div>
                        </div>
                    )}

                    {/* Tab: Estadísticas */}
                    {activeTab === 'estadisticas' && (
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Estadísticas de la Sección</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribución por Estado</h3>
                                    <div className="space-y-4">
                                        {estadisticas.map((estadistica) => (
                                            <div key={estadistica.estado} className="flex items-center justify-between">
                                                <span className="text-gray-700">{estadistica.estado}</span>
                                                <div className="flex items-center">
                                                    <span className="font-bold text-gray-800 mr-3">{estadistica.total}</span>
                                                    <div className="w-32 bg-gray-200 rounded-full h-2.5">
                                                        <div
                                                            className="h-2.5 rounded-full bg-blue-600"
                                                            style={{ width: `${(estadistica.total / estudiantes.length) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen General</h3>
                                    <div className="space-y-4">
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <p className="text-sm text-blue-600">Capacidad Utilizada</p>
                                            <p className="text-3xl font-bold text-gray-800">{capacidadPorcentaje}%</p>
                                            <p className="text-sm text-blue-600">{capacidadDisponible} cupos disponibles</p>
                                        </div>

                                        <div className="bg-green-50 p-4 rounded-lg">
                                            <p className="text-sm text-green-600">Estudiantes Activos</p>
                                            <p className="text-3xl font-bold text-gray-800">
                                                {estadisticas.find(e => e.estado === 'activo')?.total || 0}
                                            </p>
                                            <p className="text-sm text-green-600">de {estudiantes.length} estudiantes totales</p>
                                        </div>

                                        <div className="bg-purple-50 p-4 rounded-lg">
                                            <p className="text-sm text-purple-600">Profesores Asignados</p>
                                            <p className="text-3xl font-bold text-gray-800">{profesores.length}</p>
                                            <p className="text-sm text-purple-600">{seccion.tutor ? 'Incluye 1 tutor' : 'Sin tutor asignado'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modales */}
            <AsignarProfesorModal
                isOpen={showProfesorModal}
                onClose={() => setShowProfesorModal(false)}
                onAssign={handleAssignProfesor}
                seccionId={id}
                servicios={servicios}
            />

            <InscribirEstudianteModal
                isOpen={showEstudianteModal}
                onClose={() => setShowEstudianteModal(false)}
                onInscribe={handleInscribeEstudiante}
                seccionId={id}
                servicios={servicios}
                añoEscolarActual={añoEscolarActual}
            />
        </div>
    );
};

export default SeccionDetallePage;