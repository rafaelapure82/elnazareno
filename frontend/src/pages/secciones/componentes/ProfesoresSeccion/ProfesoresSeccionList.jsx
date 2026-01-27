import React from 'react';
import { FaChalkboardTeacher, FaUserTie, FaTrash, FaCrown, FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ProfesoresSeccionList = ({ profesores, onRemove, onUpdateTutor, loading }) => {
    const handleRemove = async (profesor) => {
        const confirm = await Swal.fire({
            title: '¿Remover profesor?',
            html: `
        <div class="text-left">
          <p><strong>Profesor:</strong> ${profesor.nombreCompleto}</p>
          <p><strong>Cédula:</strong> ${profesor.cedula}</p>
          <p>Esta acción removerá al profesor de la sección.</p>
        </div>
      `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, remover',
            cancelButtonText: 'Cancelar'
        });

        if (confirm.isConfirmed) {
            await onRemove(profesor.profesorId);
        }
    };

    const handleUpdateTutor = async (profesor) => {
        const confirm = await Swal.fire({
            title: '¿Cambiar rol del profesor?',
            html: `
        <div class="text-left">
          <p><strong>Profesor:</strong> ${profesor.nombreCompleto}</p>
          <p><strong>Acción:</strong> ${profesor.esTutor ? 'Remover como tutor' : 'Asignar como tutor'}</p>
          <p>${profesor.esTutor ? 'El profesor dejará de ser el tutor principal.' : 'El profesor será asignado como tutor principal.'}</p>
        </div>
      `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cambiar',
            cancelButtonText: 'Cancelar'
        });

        if (confirm.isConfirmed) {
            await onUpdateTutor(profesor.profesorId, !profesor.esTutor);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Cargando profesores...</p>
            </div>
        );
    }

    if (profesores.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
                <div className="text-gray-400 mb-4">
                    <FaChalkboardTeacher className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay profesores asignados</h3>
                <p className="text-gray-500">Asigne profesores a esta sección para comenzar.</p>
            </div>
        );
    }

    const tutor = profesores.find(p => p.esTutor);

    return (
        <div>
            {/* Tutor Principal */}
            {tutor && (
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <FaCrown className="text-yellow-500 mr-2" />
                        Tutor Principal
                    </h3>
                    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="p-3 bg-yellow-100 rounded-full">
                                    <FaUserTie className="text-yellow-600 text-2xl" />
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-xl font-bold text-gray-800">{tutor.nombreCompleto}</h4>
                                    <div className="flex items-center mt-1">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                            <FaCrown className="mr-1" />
                                            Tutor
                                        </span>
                                        <span className="ml-3 text-gray-600">Cédula: {tutor.cedula}</span>
                                        <span className="ml-3 text-gray-600">Email: {tutor.email}</span>
                                    </div>
                                    <p className="text-gray-600 mt-2">
                                        Fecha de asignación: {new Date(tutor.fechaAsignacion).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleUpdateTutor(tutor)}
                                    className="px-4 py-2 text-sm font-medium text-yellow-700 bg-yellow-100 hover:bg-yellow-200 rounded-lg transition-colors"
                                >
                                    Remover Tutor
                                </button>
                                <button
                                    onClick={() => handleRemove(tutor)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                                    title="Remover"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Profesores Auxiliares */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Profesores Auxiliares</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profesores
                        .filter(p => !p.esTutor)
                        .map((profesor) => (
                            <div key={profesor.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-start">
                                        <div className="p-3 bg-blue-100 rounded-full">
                                            <FaUser className="text-blue-600" />
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="font-semibold text-gray-800">{profesor.nombreCompleto}</h4>
                                            <p className="text-sm text-gray-600">Cédula: {profesor.cedula}</p>
                                            <p className="text-sm text-gray-600">Email: {profesor.email}</p>
                                            <p className="text-sm text-gray-600">Teléfono: {profesor.telefono}</p>
                                            <p className="text-sm text-gray-500 mt-2">
                                                Asignado: {new Date(profesor.fechaAsignacion).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleUpdateTutor(profesor)}
                                            className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded"
                                        >
                                            Hacer Tutor
                                        </button>
                                        <button
                                            onClick={() => handleRemove(profesor)}
                                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                                            title="Remover"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ProfesoresSeccionList;