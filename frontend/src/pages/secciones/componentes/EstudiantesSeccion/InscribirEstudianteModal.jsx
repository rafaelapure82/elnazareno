import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaSearch, FaTimes, FaCalendarAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const InscribirEstudianteModal = ({ isOpen, onClose, onInscribe, seccionId, servicios, añoEscolarActual }) => {
    const [search, setSearch] = useState('');
    const [estudiantes, setEstudiantes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedEstudiante, setSelectedEstudiante] = useState(null);
    const [añoEscolar, setAñoEscolar] = useState(añoEscolarActual || new Date().getFullYear());

    useEffect(() => {
        if (isOpen && añoEscolar) {
            buscarEstudiantes();
        }
    }, [isOpen, añoEscolar]);

    const generarAñosEscolares = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let year = currentYear - 5; year <= currentYear + 2; year++) {
            years.push(year);
        }
        return years;
    };

    const buscarEstudiantes = async () => {
        setLoading(true);
        try {
            const result = await servicios.buscarEstudiantesDisponibles(seccionId, añoEscolar, search);
            if (result.success) {
                setEstudiantes(result.data);
            } else {
                Swal.fire('Error', result.message, 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Error al buscar estudiantes', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        buscarEstudiantes();
    };

    const handleSelectEstudiante = (estudiante) => {
        setSelectedEstudiante(estudiante);
    };

    const handleInscribe = async () => {
        if (!selectedEstudiante) {
            Swal.fire('Error', 'Debe seleccionar un estudiante', 'warning');
            return;
        }

        const confirm = await Swal.fire({
            title: '¿Confirmar inscripción?',
            html: `
        <div class="text-left">
          <p><strong>Estudiante:</strong> ${selectedEstudiante.nombreCompleto}</p>
          <p><strong>Cédula Escolar:</strong> ${selectedEstudiante.cedulaEscolar}</p>
          <p><strong>Año Escolar:</strong> ${añoEscolar}</p>
          <p><strong>Representante:</strong> ${selectedEstudiante.representanteNombreCompleto || 'No registrado'}</p>
        </div>
      `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, inscribir',
            cancelButtonText: 'Cancelar'
        });

        if (confirm.isConfirmed) {
            const result = await onInscribe(selectedEstudiante.id, añoEscolar);
            if (result) {
                setSelectedEstudiante(null);
                setSearch('');
                onClose();
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-5xl shadow-lg rounded-lg bg-white">
                {/* Header */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b">
                    <div className="flex items-center">
                        <FaUserPlus className="text-2xl text-green-600 mr-3" />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Inscribir Estudiante</h2>
                            <p className="text-gray-600">Seleccione un estudiante para inscribir en la sección</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <FaTimes className="text-2xl" />
                    </button>
                </div>

                {/* Filtros */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Año Escolar
                        </label>
                        <div className="relative">
                            <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <select
                                value={añoEscolar}
                                onChange={(e) => setAñoEscolar(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {generarAñosEscolares().map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <form onSubmit={handleSearch}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Buscar Estudiante
                            </label>
                            <div className="flex">
                                <div className="relative flex-grow">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Buscar por nombre, cédula o cédula escolar..."
                                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-r-lg hover:bg-blue-700"
                                >
                                    Buscar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Lista de Estudiantes */}
                    <div className="lg:col-span-2">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Estudiantes Disponibles</h3>

                        {loading ? (
                            <div className="text-center py-8">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                <p className="mt-2 text-gray-600">Buscando estudiantes...</p>
                            </div>
                        ) : estudiantes.length === 0 ? (
                            <div className="text-center py-8 bg-gray-50 rounded-lg">
                                <p className="text-gray-500">No se encontraron estudiantes disponibles</p>
                            </div>
                        ) : (
                            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                                {estudiantes.map((estudiante) => (
                                    <div
                                        key={estudiante.id}
                                        onClick={() => handleSelectEstudiante(estudiante)}
                                        className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedEstudiante?.id === estudiante.id
                                                ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
                                                : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-semibold text-gray-800">{estudiante.nombreCompleto}</h4>
                                                <p className="text-sm text-gray-600">Cédula: {estudiante.cedula || 'No registrada'}</p>
                                                <p className="text-sm text-gray-600">Cédula Escolar: {estudiante.cedulaEscolar}</p>
                                                <p className="text-sm text-gray-600">Fecha Nac: {new Date(estudiante.fechaNacimiento).toLocaleDateString()}</p>
                                                <p className="text-sm text-gray-600">Género: {estudiante.genero}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm">
                                                    <p className="font-medium text-gray-700">Representante</p>
                                                    <p className="text-gray-600">{estudiante.representanteNombreCompleto || 'No registrado'}</p>
                                                    <p className="text-gray-600">{estudiante.representanteTelefono || 'Sin teléfono'}</p>
                                                </div>
                                                <div className="mt-2">
                                                    <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                                                        {estudiante.seccionActual}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Panel de Inscripción */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Detalles de Inscripción</h3>

                            {selectedEstudiante ? (
                                <>
                                    <div className="mb-6">
                                        <h4 className="font-medium text-gray-700 mb-2">Estudiante Seleccionado:</h4>
                                        <div className="p-4 bg-white border border-gray-200 rounded-lg">
                                            <p className="font-semibold text-gray-800">{selectedEstudiante.nombreCompleto}</p>
                                            <p className="text-sm text-gray-600">Cédula Escolar: {selectedEstudiante.cedulaEscolar}</p>
                                            <p className="text-sm text-gray-600">Fecha Nacimiento: {new Date(selectedEstudiante.fechaNacimiento).toLocaleDateString()}</p>
                                            <p className="text-sm text-gray-600">Representante: {selectedEstudiante.representanteNombreCompleto}</p>
                                            <p className="text-sm text-gray-600">Teléfono: {selectedEstudiante.representanteTelefono}</p>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <p className="font-medium text-blue-800 mb-2">Año Escolar</p>
                                            <p className="text-2xl font-bold text-blue-600">{añoEscolar}</p>
                                            <p className="text-sm text-blue-600 mt-2">El estudiante será inscrito para este año académico</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <button
                                            onClick={handleInscribe}
                                            className="w-full py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            <FaUserPlus className="inline mr-2" />
                                            Inscribir Estudiante
                                        </button>
                                        <button
                                            onClick={() => setSelectedEstudiante(null)}
                                            className="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            Cambiar Estudiante
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-gray-400 mb-4">
                                        <FaUserPlus className="text-4xl mx-auto" />
                                    </div>
                                    <p className="text-gray-600">Seleccione un estudiante de la lista para continuar</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InscribirEstudianteModal;