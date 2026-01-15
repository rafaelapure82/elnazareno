// modules/actividades/componentes/ActividadForm.jsx
import React, { useState, useRef } from 'react';
import { FaUpload, FaTrash, FaImage } from 'react-icons/fa';
import { API_BASE_URL } from '../../../compartidos/api/axios.config'
const ActividadForm = ({ actividad, onSubmit, onCancel, cargando = false }) => {
    const isEdit = !!actividad;

    const [titulo, setTitulo] = useState(actividad?.titulo || '');
    const [descripcion, setDescripcion] = useState(actividad?.descripcion || '');
    const [imagenes, setImagenes] = useState([]);
    const [imagenesPreviews, setImagenesPreviews] = useState([]);
    const [imagenesAEliminar, setImagenesAEliminar] = useState([]);

    const fileInputRef = useRef(null);
    // Imágenes existentes (solo en modo edición)
    const imagenesExistentes = actividad?.imagenes || [];

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        // Validar cantidad máxima de imágenes
        const totalImagenes = imagenes.length + imagenesPreviews.length + files.length;
        if (totalImagenes > 5) {
            alert('Máximo 5 imágenes permitidas');
            return;
        }

        // Crear previews de las nuevas imágenes
        const nuevasPreviews = files.map(file => ({
            id: URL.createObjectURL(file), // Usamos URL como ID temporal
            url: URL.createObjectURL(file),
            file,
            isNew: true
        }));

        setImagenes(prev => [...prev, ...files]);
        setImagenesPreviews(prev => [...prev, ...nuevasPreviews]);
    };

    const handleRemoveImage = (index, isExisting = false) => {
        if (isExisting) {
            // Para imágenes existentes, marcarlas para eliminación
            const imagen = imagenesExistentes[index];
            setImagenesAEliminar(prev => [...prev, imagen]);
        } else {
            // Para nuevas imágenes, remover del estado
            const preview = imagenesPreviews[index];
            URL.revokeObjectURL(preview.url); // Liberar memoria

            const newImagenes = [...imagenes];
            const newPreviews = [...imagenesPreviews];

            newImagenes.splice(index, 1);
            newPreviews.splice(index, 1);

            setImagenes(newImagenes);
            setImagenesPreviews(newPreviews);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!titulo.trim() || !descripcion.trim()) {
            alert('Por favor complete todos los campos');
            return;
        }

        if (isEdit) {
            onSubmit({
                id: actividad.id,
                titulo,
                descripcion,
                nuevasImagenes: imagenes,
                imagenesAEliminar
            });
        } else {
            onSubmit({
                titulo,
                descripcion,
                imagenes
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            {/* Título */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título *
                </label>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Título de la actividad"
                    maxLength={100}
                    required
                />
                <p className="text-xs text-gray-500 mt-1">{titulo.length}/100 caracteres</p>
            </div>

            {/* Descripción */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción *
                </label>
                <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition h-32 resize-none"
                    placeholder="Describe la actividad..."
                    maxLength={500}
                    required
                />
                <p className="text-xs text-gray-500 mt-1">{descripcion.length}/500 caracteres</p>
            </div>

            {/* Imágenes existentes (solo en edición) */}
            {isEdit && imagenesExistentes.length > 0 && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Imágenes actuales
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                        {imagenesExistentes.map((imagen, index) => {
                            const isMarkedForDelete = imagenesAEliminar.includes(imagen);

                            return (
                                <div key={index} className="relative">
                                    <img
                                        src={API_BASE_URL + imagen.imagen_url}
                                        alt={`Imagen ${index + 1}`}
                                        className={`w-full h-24 object-cover rounded-lg ${isMarkedForDelete ? 'opacity-50' : ''
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index, true)}
                                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                    >
                                        <FaTrash size={12} />
                                    </button>
                                    {isMarkedForDelete && (
                                        <div className="absolute inset-0 bg-red-500/20 rounded-lg flex items-center justify-center">
                                            <span className="text-red-600 font-bold text-sm">Eliminar</span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Nuevas imágenes */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Agregar imágenes
                    </label>
                    <span className="text-xs text-gray-500">
                        {imagenesPreviews.length + imagenesExistentes.length - imagenesAEliminar.length}/5
                    </span>
                </div>

                {/* Previews de nuevas imágenes */}
                {imagenesPreviews.length > 0 && (
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-3">
                        {imagenesPreviews.map((preview, index) => (
                            <div key={preview.id} className="relative">
                                <img
                                    src={preview.url}
                                    alt={`Nueva imagen ${index + 1}`}
                                    className="w-full h-24 object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index, false)}
                                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                >
                                    <FaTrash size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Botón para subir imágenes */}
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 cursor-pointer transition-colors"
                >
                    <FaUpload className="mx-auto text-gray-400 text-3xl mb-3" />
                    <p className="text-gray-600">Haz clic para subir imágenes</p>
                    <p className="text-sm text-gray-500 mt-1">
                        PNG, JPG, GIF hasta 5MB. Máximo 5 imágenes.
                    </p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    disabled={cargando}
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={cargando}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                    {cargando ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            {isEdit ? 'Actualizando...' : 'Creando...'}
                        </>
                    ) : (
                        <>
                            {isEdit ? 'Actualizar actividad' : 'Crear actividad'}
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default ActividadForm;