import React, { useState } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';

const GradoForm = ({ onSubmit, onCancel, initialData = null }) => {
    const [formData, setFormData] = useState({
        nombre: initialData?.nombre || '',
        nivel: initialData?.nivel || ''
    });

    const niveles = ['Inicial', 'Primaria', 'Media', 'Jovenes y Adultos'];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                    Nombre del Grado
                </label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: 1ER GRADO"
                    required
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nivel">
                    Nivel
                </label>
                <select
                    id="nivel"
                    name="nivel"
                    value={formData.nivel}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">Seleccione un nivel</option>
                    {niveles.map((nivel) => (
                        <option key={nivel} value={nivel}>
                            {nivel}
                        </option>
                    ))}
                </select>
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

export default GradoForm;