import React, { useState, useEffect } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';

const SeccionForm = ({ onSubmit, onCancel, initialData = null, grados = [] }) => {
    const [formData, setFormData] = useState({
        nombre: initialData?.nombre || '',
        grado_id: initialData?.gradoId || '',
        capacidad_maxima: initialData?.capacidad_maxima || 40
    });
    useEffect(() => {
        if (initialData) {
            setFormData({
                nombre: initialData.nombre,
                grado_id: initialData.grado_id,
                capacidad_maxima: initialData.capacidad_maxima
            });
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'capacidad_maxima' ? parseInt(value) || 0 : value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="grado_id">
                    Grado
                </label>
                <select
                    id="grado_id"
                    name="grado_id"
                    value={formData.grado_id}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={!!initialData}
                >
                    <option value="">Seleccione un grado</option>
                    {grados.map((grado) => (
                        <option key={grado.id} value={grado.id}>
                            {grado.nombre} - {grado.nivel}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                    Nombre de la Sección
                </label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: A, B, C"
                    required
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="capacidad_maxima">
                    Capacidad Máxima
                </label>
                <input
                    type="number"
                    id="capacidad_maxima"
                    name="capacidad_maxima"
                    value={formData.capacidad_maxima}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="50"
                    required
                />
                <p className="text-sm text-gray-500 mt-1">Máximo 50 estudiantes por sección</p>
            </div>

            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center"
                >
                    <FaTimes className="mr-2" />
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                    <FaSave className="mr-2" />
                    {initialData ? 'Actualizar' : 'Crear'}
                </button>
            </div>
        </form>
    );
};

export default SeccionForm;