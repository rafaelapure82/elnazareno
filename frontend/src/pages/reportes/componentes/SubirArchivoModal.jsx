import React, { useState, useRef } from 'react';
import { FaUpload, FaTimes, FaFile, FaSpinner } from 'react-icons/fa';
import { useSubirArhivo } from '../hooks/useSubirArchivo';
import Swal from 'sweetalert2'

const SubirArchivoModal = ({ isOpen, onClose, onUploadSuccess }) => {
    const fileInputRef = useRef(null);
    const { uploading, uploadProgress, uploadError, subirArchivo } = useSubirArhivo();

    const [formData, setFormData] = useState({
        archivo: null,
        nombre: '',
        descripcion: '',
        categoria: 'general'
    });

    const categorias = [
        { value: 'general', label: 'General' },
        { value: 'reportes', label: 'Reportes' },
        { value: 'documentos', label: 'Documentos' },
        { value: 'imagenes', label: 'Imágenes' },
        { value: 'videos', label: 'Videos' },
        { value: 'audios', label: 'Audios' },
        { value: 'archivos', label: 'Archivos' }
    ];

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                archivo: file,
                nombre: file.name.split('.')[0] // Sugerir nombre sin extensión
            }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.archivo) {
            alert('Por favor selecciona un archivo');
            return;
        }

        try {
            const resultado = await subirArchivo(formData);

            onUploadSuccess?.(resultado);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Archivo Subido con Exito",
                showConfirmButton: false,
                timer: 1500
            });
            handleReset();
            onClose();
        } catch (error) {
            console.error('Error al subir archivo:', error);
        }
    };

    const handleReset = () => {
        setFormData({
            archivo: null,
            nombre: '',
            descripcion: '',
            categoria: 'general'
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            setFormData(prev => ({
                ...prev,
                archivo: file,
                nombre: file.name.split('.')[0]
            }));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <div className="flex items-center">
                        <FaUpload className="h-6 w-6 text-indigo-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">Subir Archivo</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <FaTimes className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Área de drop de archivos */}
                    <div
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        {formData.archivo ? (
                            <div className="flex items-center justify-center space-x-3">
                                <FaFile className="h-12 w-12 text-indigo-500" />
                                <div className="text-left">
                                    <p className="font-medium text-gray-900">{formData.archivo.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {(formData.archivo.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleReset();
                                        }}
                                        className="text-sm text-red-600 hover:text-red-700 mt-2"
                                    >
                                        Cambiar archivo
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <FaUpload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 mb-2">
                                    Arrastra y suelta tu archivo aquí o haz clic para seleccionar
                                </p>
                                <p className="text-sm text-gray-500">
                                    Tamaño máximo: 100MB. Formatos soportados: PDF, DOC, XLS, JPG, PNG, etc.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Campos del formulario */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre del archivo
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Ingresa un nombre descriptivo"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Descripción
                            </label>
                            <textarea
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleInputChange}
                                rows="3"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Describe el contenido del archivo..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Categoría
                            </label>
                            <select
                                name="categoria"
                                value={formData.categoria}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                                {categorias.map(cat => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Barra de progreso */}
                    {uploading && (
                        <div className="space-y-2">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-indigo-600 transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                />
                            </div>
                            <p className="text-sm text-gray-600 text-center">
                                Subiendo... {uploadProgress}%
                            </p>
                        </div>
                    )}

                    {/* Mensaje de error */}
                    {uploadError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-700">{uploadError}</p>
                        </div>
                    )}

                    {/* Botones */}
                    <div className="flex justify-end space-x-4 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            disabled={uploading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={uploading || !formData.archivo}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                        >
                            {uploading ? (
                                <>
                                    <FaSpinner className="animate-spin h-5 w-5 mr-2" />
                                    Subiendo...
                                </>
                            ) : (
                                <>
                                    <FaUpload className="h-5 w-5 mr-2" />
                                    Subir Archivo
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubirArchivoModal;