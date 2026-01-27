import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaSearch, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AsignarProfesorModal = ({ isOpen, onClose, onAssign, seccionId, servicios }) => {
    const [search, setSearch] = useState('');
    const [profesores, setProfesores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedProfesor, setSelectedProfesor] = useState(null);
    const [esTutor, setEsTutor] = useState(false);

    useEffect(() => {
        if (isOpen) {
            buscarProfesores();
        }
    }, [isOpen]);

    const buscarProfesores = async () => {
        setLoading(true);
        try {
            const result = await servicios.buscarProfesoresDisponibles(seccionId, search);
            console.log("result", result);
            if (result.success) {
                setProfesores(result.data);
            } else {
                Swal.fire('Error', result.message, 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Error al buscar profesores', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        buscarProfesores();
    };

    const handleSelectProfesor = (profesor) => {
        setSelectedProfesor(profesor);
    };

    const handleAssign = async () => {
        if (!selectedProfesor) {
            Swal.fire('Error', 'Debe seleccionar un profesor', 'warning');
            return;
        }

        const confirm = await Swal.fire({
            title: '¿Confirmar asignación?',
            html: `
        <div class="text-left">
          <p><strong>Profesor:</strong> ${selectedProfesor.nombreCompleto}</p>
          <p><strong>Cédula:</strong> ${selectedProfesor.cedula}</p>
          <p><strong>Rol:</strong> ${esTutor ? 'Tutor' : 'Profesor auxiliar'}</p>
        </div>
      `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, asignar',
            cancelButtonText: 'Cancelar'
        });

        if (confirm.isConfirmed) {
            const result = await onAssign(selectedProfesor.id, { es_tutor: esTutor });
            if (result) {
                setSelectedProfesor(null);
                setEsTutor(false);
                setSearch('');
                onClose();
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-lg bg-white">
                {/* Header */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b">
                    <div className="flex items-center">
                        <FaUserPlus className="text-2xl text-blue-600 mr-3" />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Asignar Profesor a Sección</h2>
                            <p className="text-gray-600">Seleccione un profesor para asignar a la sección</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <FaTimes className="text-2xl" />
                    </button>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <form onSubmit={handleSearch} className="flex">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Buscar profesor por nombre, cédula o email..."
                                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-r-lg hover:bg-blue-700 transition-colors"
                        >
                            Buscar
                        </button>
                    </form>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Lista de Profesores */}
                    <div className="lg:col-span-2">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Profesores Disponibles</h3>

                        {loading ? (
                            <div className="text-center py-8">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                <p className="mt-2 text-gray-600">Buscando profesores...</p>
                            </div>
                        ) : profesores.length === 0 ? (
                            <div className="text-center py-8 bg-gray-50 rounded-lg">
                                <p className="text-gray-500">No se encontraron profesores disponibles</p>
                            </div>
                        ) : (
                            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                                {profesores.map((profesor) => (
                                    <div
                                        key={profesor.id}
                                        onClick={() => handleSelectProfesor(profesor)}
                                        className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedProfesor?.id === profesor.id
                                            ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-semibold text-gray-800">{profesor.nombreCompleto}</h4>
                                                <p className="text-sm text-gray-600">Cédula: {profesor.cedula}</p>
                                                <p className="text-sm text-gray-600">Email: {profesor.email}</p>
                                                <p className="text-sm text-gray-600">Teléfono: {profesor.telefono}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                                                    {profesor.especialidad || 'Sin especialidad'}
                                                </span>
                                                <p className="text-sm text-gray-600 mt-2">
                                                    {profesor.totalSeccionesAsignadas} sección(es)
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-2 text-sm text-gray-500">
                                            <p>{profesor.seccionesActuales}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Panel de Asignación */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Detalles de Asignación</h3>

                            {selectedProfesor ? (
                                <>
                                    <div className="mb-6">
                                        <h4 className="font-medium text-gray-700 mb-2">Profesor Seleccionado:</h4>
                                        <div className="p-4 bg-white border border-gray-200 rounded-lg">
                                            <p className="font-semibold text-gray-800">{selectedProfesor.nombreCompleto}</p>
                                            <p className="text-sm text-gray-600">Cédula: {selectedProfesor.cedula}</p>
                                            <p className="text-sm text-gray-600">Email: {selectedProfesor.email}</p>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="flex items-center cursor-pointer">
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    checked={esTutor}
                                                    onChange={(e) => setEsTutor(e.target.checked)}
                                                    className="sr-only"
                                                />
                                                <div className={`block w-14 h-8 rounded-full ${esTutor ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                                                <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${esTutor ? 'transform translate-x-6' : ''}`}></div>
                                            </div>
                                            <span className="ml-3 text-gray-700 font-medium">
                                                Asignar como Tutor
                                            </span>
                                        </label>
                                        <p className="text-sm text-gray-500 mt-2">
                                            El tutor será el profesor principal responsable de la sección.
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <button
                                            onClick={handleAssign}
                                            className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            <FaUserPlus className="inline mr-2" />
                                            Asignar Profesor
                                        </button>
                                        <button
                                            onClick={() => setSelectedProfesor(null)}
                                            className="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            Cambiar Profesor
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-gray-400 mb-4">
                                        <FaUserPlus className="text-4xl mx-auto" />
                                    </div>
                                    <p className="text-gray-600">Seleccione un profesor de la lista para continuar</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AsignarProfesorModal;