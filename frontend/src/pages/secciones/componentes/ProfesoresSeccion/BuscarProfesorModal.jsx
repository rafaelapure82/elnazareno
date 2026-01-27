import React, { useState } from 'react';
import { FaSearch, FaTimes, FaCheck } from 'react-icons/fa';

const BuscarProfesorModal = ({ isOpen, onClose, onSelect, servicios, seccionId }) => {
    const [search, setSearch] = useState('');
    const [profesores, setProfesores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search.trim()) return;

        setLoading(true);
        try {
            const result = await servicios.buscarProfesoresDisponibles(seccionId, search);
            if (result.success) {
                setProfesores(result.data);
            }
        } catch (error) {
            console.error('Error buscando profesores:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = () => {
        if (selectedId) {
            const profesor = profesores.find(p => p.id === selectedId);
            onSelect(profesor);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-3xl shadow-lg rounded-lg bg-white">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Buscar Profesor</h2>
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
                            placeholder="Buscar por nombre, cédula o email..."
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
                ) : profesores.length > 0 ? (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {profesores.map((profesor) => (
                            <div
                                key={profesor.id}
                                onClick={() => setSelectedId(profesor.id)}
                                className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedId === profesor.id
                                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                    }`}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="font-semibold text-gray-800">{profesor.nombreCompleto}</h4>
                                        <p className="text-sm text-gray-600">Cédula: {profesor.cedula}</p>
                                        <p className="text-sm text-gray-600">Email: {profesor.email}</p>
                                        <p className="text-sm text-gray-500">
                                            {profesor.seccionesActuales}
                                        </p>
                                    </div>
                                    {selectedId === profesor.id && (
                                        <FaCheck className="text-green-500 text-xl" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : search && (
                    <div className="text-center py-8 text-gray-500">
                        No se encontraron profesores
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
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
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

export default BuscarProfesorModal;