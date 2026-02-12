import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUser, FaArrowLeft, FaUserEdit, FaIdCard } from 'react-icons/fa';
import EstudianteFormulario from '../componentes/EstudianteFormulario';
import { useEstudiante } from '../hooks/useEstudiante';
import { useEstudiantes } from '../hooks/useEstudiantes';
import Swal from 'sweetalert2';

const EditarEstudiantePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { estudiante, loading: estudianteLoading, error: estudianteError, refresh } = useEstudiante(id);
    const { editarEstudiante } = useEstudiantes();
    const [submitLoading, setSubmitLoading] = React.useState(false);

    useEffect(() => {
        if (estudianteError) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: estudianteError || 'No se pudo cargar el estudiante',
                confirmButtonText: 'Volver',
                confirmButtonColor: '#3085d6'
            }).then(() => {
                navigate('/estudiantes');
            });
        }
    }, [estudianteError, navigate]);

    const handleSubmit = async (formData) => {
        const result = await Swal.fire({
            title: '¿Guardar cambios?',
            text: '¿Estás seguro de que quieres actualizar la información del estudiante?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, guardar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        });

        if (result.isConfirmed) {
            setSubmitLoading(true);
            console.log("gormularo", formData)
            try {
                // Si no hay nueva foto, mantener la actual
                if (!formData.foto && estudiante?.foto) {
                    delete formData.foto;
                }

                const response = await editarEstudiante(id, formData);

                if (response.success) {
                    await Swal.fire({
                        icon: 'success',
                        title: '¡Cambios guardados!',
                        text: 'La información del estudiante ha sido actualizada exitosamente.',
                        showConfirmButton: false,
                        timer: 1500
                    });

                    await refresh();
                    navigate(`/estudiantes/${id}`);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.message || 'No se pudo actualizar el estudiante.',
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message || 'Ocurrió un error al actualizar.',
                });
            } finally {
                setSubmitLoading(false);
            }
        }
    };

    if (estudianteLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Cargando información del estudiante...</p>
                    <p className="text-gray-500 text-sm mt-2">Por favor espera un momento</p>
                </div>
            </div>
        );
    }

    if (!estudiante) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto">
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                        <FaIdCard className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Estudiante no encontrado</h2>
                    <p className="text-gray-600 mb-6">El estudiante que buscas no existe o ha sido eliminado.</p>
                    <button
                        onClick={() => navigate('/estudiantes')}
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                    >
                        <FaArrowLeft className="mr-2 h-5 w-5" />
                        Volver a estudiantes
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Navegación */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <button
                        onClick={() => navigate(`/estudiantes/${id}`)}
                        className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-white transition-colors mb-4 sm:mb-0"
                    >
                        <FaArrowLeft className="mr-2 h-4 w-4" />
                        Volver al detalle
                    </button>

                    <div className="flex items-center space-x-4">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                            Editando estudiante
                        </div>
                        <div className="text-sm text-gray-600">
                            ID: <span className="font-mono font-bold">#{estudiante.id}</span>
                        </div>
                    </div>
                </div>

                {/* Encabezado */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-xl mb-4">
                        <FaUserEdit className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Editar Información del Estudiante
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Actualizando información de <span className="font-bold text-gray-900">{estudiante.nombreCompleto}</span>
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
                        <span className="inline-flex items-center">
                            <FaIdCard className="mr-1 h-4 w-4" />
                            Cédula escolar: {estudiante.cedulaEscolar}
                        </span>
                        <span className="inline-flex items-center">
                            <FaUser className="mr-1 h-4 w-4" />
                            Edad: {estudiante.edad} años
                        </span>
                    </div>
                </div>

                {/* Formulario */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                    <div className="p-8">
                        <EstudianteFormulario
                            estudiante={estudiante}
                            onSubmit={handleSubmit}
                            loading={submitLoading}
                            mode="edit"
                        />
                    </div>
                </div>

                {/* Advertencias importantes */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-6 border border-yellow-200">
                        <h4 className="text-lg font-semibold text-amber-900 mb-3 flex items-center">
                            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Advertencias importantes
                        </h4>
                        <ul className="text-sm text-amber-800 space-y-2">
                            {/* <li className="flex items-start">
                                <span className="mr-2">⚠️</span>
                                <span>La cédula escolar <strong>no puede ser modificada</strong></span>
                            </li> */}
                            <li className="flex items-start">
                                <span className="mr-2">⚠️</span>
                                <span>Cambios en la cédula del representante requieren verificación</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">⚠️</span>
                                <span>La nueva foto reemplazará la anterior automáticamente</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                        <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            Última actualización
                        </h4>
                        <div className="text-sm text-blue-800 space-y-2">
                            <p>
                                <span className="font-medium">Registrado:</span>{' '}
                                {new Date(estudiante.createdAt).toLocaleDateString('es-ES', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                            <p>
                                <span className="font-medium">Representante:</span>{' '}
                                {estudiante.representante?.nombreCompleto}
                            </p>
                            <p>
                                <span className="font-medium">Teléfono:</span>{' '}
                                {estudiante.representante?.telefono}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarEstudiantePage;