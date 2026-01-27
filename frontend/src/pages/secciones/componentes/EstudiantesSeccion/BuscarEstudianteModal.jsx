import React, { useState } from 'react';
import { FaSearch, FaTimes, FaCheck, FaUserGraduate } from 'react-icons/fa';

const BuscarEstudianteModal = ({ isOpen, onClose, onSelect, servicios, seccionId, añoEscolar }) => {
    const [search, setSearch] = useState('');
    const [estudiantes, setEstudiantes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search.trim()) return;

        setLoading(true);
        try {
            const result = await servicios.buscarEstudiantesDisponibles(seccionId, añoEscolar, search);
            if (result.success) {
                setEstudiantes(result.data);
            }
        } catch (error) {
            console.error('Error buscando estudiantes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = () => {
        if (selectedId) {
            const estudiante = estudiantes.find(e => e.id === selectedId);
            onSelect(estudiante);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-3xl shadow-lg rounded-lg bg-white">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                        <FaUserGraduate className="mr-2 text-green-600" />
                        Buscar Estudiante
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <FaTimes className="text-2xl" />
                    </button>
                </div>

                <form onSubmit={handleSearch} className="mb-6">
                    <div className="flex">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Buscar por nombre, cédula o cédula escolar..."
                            className="flex-grow px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-r-lg hover:bg-blue-700"
                        >
                            <FaSearch />
                        </button>
                    </div>
                </form>

                {loading ? (
                    <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="mt-2 text-gray-600">Buscando...</p>
                    </div>
                ) : estudiantes.length > 0 ? (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {estudiantes.map((estudiante) => (
                            <div
                                key={estudiante.id}
                                onClick={() => setSelectedId(estudiante.id)}
                                className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedId === estudiante.id
                                        ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
                                        : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                                    }`}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="font-semibold text-gray-800">{estudiante.nombreCompleto}</h4>
                                        <p className="text-sm text-gray-600">Cédula: {estudiante.cedula || 'No registrada'}</p>
                                        <p className="text-sm text-gray-600">Cédula Escolar: {estudiante.cedulaEscolar}</p>
                                        <p className="text-sm text-gray-600">Representante: {estudiante.representanteNombreCompleto}</p>
                                    </div>
                                    {selectedId === estudiante.id && (
                                        <FaCheck className="text-green-500 text-xl" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : search && (
                    <div className="text-center py-8 text-gray-500">
                        No se encontraron estudiantes
                    </div>
                )}

                <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSelect}
                        disabled={!selectedId}
                        className={`px-4 py-2 rounded-lg flex items-center ${selectedId
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        <FaCheck className="mr-2" />
                        Seleccionar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BuscarEstudianteModal;