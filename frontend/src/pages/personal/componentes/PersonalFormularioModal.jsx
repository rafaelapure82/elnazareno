import React, { useState } from 'react';
import {
    FaUser, FaPhone, FaEnvelope, FaIdCard, FaCalendar,
    FaVenusMars, FaBriefcase, FaBuilding, FaGraduationCap,
    FaTshirt, FaShoePrints, FaUpload, FaTimes, FaTrash, FaSpinner
} from 'react-icons/fa';
import ArchivosManejador from './ArchivosManejador';
import { usePersonalFormulario } from '../hooks/usePersonalFormulario';

const PersonalFormularioModal = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    tipo = 'docente',
    title = 'Nuevo Personal'
}) => {
    const [activeTab, setActiveTab] = useState('basica');
    const [submitting, setSubmitting] = useState(false);

    const {
        formData,
        errors,
        archivos,
        archivosErrors,
        tiposPersonal,
        sexos,
        tiposTitulo,
        tiposArchivo,
        tallasFranela,
        tallasPantalon,
        tallasZapato,
        handleChange,
        handleFileChange,
        handleChangeFileType,
        handleRemoveFile,
        validate,
        resetForm,
        prepareSubmit
    } = usePersonalFormulario(initialData, tipo);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setSubmitting(true);
        try {
            const data = prepareSubmit();
            await onSubmit(data);
            handleClose();
        } catch (error) {
            console.error('Error al guardar:', error);
            alert(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <div className="flex items-center">
                        {tipo === 'docente' ? (
                            <FaGraduationCap className="h-6 w-6 text-blue-600 mr-3" />
                        ) : tipo === 'administrativo' ? (
                            <FaBriefcase className="h-6 w-6 text-green-600 mr-3" />
                        ) : (
                            <FaTshirt className="h-6 w-6 text-orange-600 mr-3" />
                        )}
                        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <FaTimes className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="border-b">
                    <div className="flex overflow-x-auto">
                        {['basica', 'laboral', 'academica', 'archivos'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-4 font-medium text-sm border-b-2 whitespace-nowrap transition-colors ${activeTab === tab
                                    ? 'border-indigo-600 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab === 'basica' && 'Información Básica'}
                                {tab === 'laboral' && 'Información Laboral'}
                                {tab === 'academica' && 'Formación Académica'}
                                {tab === 'archivos' && 'Documentos Adjuntos'}
                            </button>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    {activeTab === 'basica' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Tipo de Personal */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tipo de Personal *
                                    </label>
                                    <select
                                        name="tipo"
                                        value={formData.tipo}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    >
                                        {tiposPersonal.map(tipo => (
                                            <option key={tipo.value} value={tipo.value}>
                                                {tipo.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Primer Nombre */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Primer Nombre *
                                    </label>
                                    <div className="relative">
                                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                        <input
                                            type="text"
                                            name="primer_nombre"
                                            value={formData.primer_nombre}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.primer_nombre ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                            placeholder="Ej: Juan"
                                        />
                                    </div>
                                    {errors.primer_nombre && (
                                        <p className="mt-1 text-sm text-red-600">{errors.primer_nombre}</p>
                                    )}
                                </div>

                                {/* Segundo Nombre */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Segundo Nombre
                                    </label>
                                    <div className="relative">
                                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                        <input
                                            type="text"
                                            name="segundo_nombre"
                                            value={formData.segundo_nombre}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            placeholder="Ej: Carlos"
                                        />
                                    </div>
                                </div>

                                {/* Primer Apellido */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Primer Apellido *
                                    </label>
                                    <div className="relative">
                                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                        <input
                                            type="text"
                                            name="primer_apellido"
                                            value={formData.primer_apellido}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.primer_apellido ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                            placeholder="Ej: Pérez"
                                        />
                                    </div>
                                    {errors.primer_apellido && (
                                        <p className="mt-1 text-sm text-red-600">{errors.primer_apellido}</p>
                                    )}
                                </div>

                                {/* Segundo Apellido */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Segundo Apellido
                                    </label>
                                    <div className="relative">
                                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                        <input
                                            type="text"
                                            name="segundo_apellido"
                                            value={formData.segundo_apellido}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            placeholder="Ej: Rodríguez"
                                        />
                                    </div>
                                </div>

                                {/* Cédula */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Cédula *
                                    </label>
                                    <div className="relative">
                                        <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                        <input
                                            type="text"
                                            name="cedula"
                                            value={formData.cedula}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.cedula ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                            placeholder="Ej: 12345678"
                                        />
                                    </div>
                                    {errors.cedula && (
                                        <p className="mt-1 text-sm text-red-600">{errors.cedula}</p>
                                    )}
                                </div>

                                {/* Teléfono */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Teléfono *
                                    </label>
                                    <div className="relative">
                                        <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                        <input
                                            type="tel"
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.telefono ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                            placeholder="Ej: 04141234567"
                                        />
                                    </div>
                                    {errors.telefono && (
                                        <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>
                                    )}
                                </div>

                                {/* Correo */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Correo *
                                    </label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                        <input
                                            type="email"
                                            name="correo"
                                            value={formData.correo}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.correo ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                            placeholder="ejemplo@correo.com"
                                        />
                                    </div>
                                    {errors.correo && (
                                        <p className="mt-1 text-sm text-red-600">{errors.correo}</p>
                                    )}
                                </div>

                                {/* Fecha de Nacimiento */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Fecha de Nacimiento *
                                    </label>
                                    <div className="relative">
                                        <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                        <input
                                            type="date"
                                            name="fecha_nacimiento"
                                            value={formData.fecha_nacimiento}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.fecha_nacimiento ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                        />
                                    </div>
                                    {errors.fecha_nacimiento && (
                                        <p className="mt-1 text-sm text-red-600">{errors.fecha_nacimiento}</p>
                                    )}
                                </div>

                                {/* Sexo */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Sexo *
                                    </label>
                                    <div className="relative">
                                        <FaVenusMars className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                        <select
                                            name="sexo"
                                            value={formData.sexo}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        >
                                            {sexos.map(sexo => (
                                                <option key={sexo.value} value={sexo.value}>
                                                    {sexo.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'laboral' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Cargo Voucher */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Cargo (Voucher) *
                                    </label>
                                    <div className="relative">
                                        <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                        <input
                                            type="text"
                                            name="cargo_voucher"
                                            value={formData.cargo_voucher}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.cargo_voucher ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                            placeholder="Ej: Profesor de Matemáticas"
                                        />
                                    </div>
                                    {errors.cargo_voucher && (
                                        <p className="mt-1 text-sm text-red-600">{errors.cargo_voucher}</p>
                                    )}
                                </div>

                                {/* Código de Cargo */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Código de Cargo
                                    </label>
                                    <input
                                        type="text"
                                        name="codigo_cargo"
                                        value={formData.codigo_cargo}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="Ej: P-123"
                                    />
                                </div>

                                {/* Dependencia */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Dependencia *
                                    </label>
                                    <div className="relative">
                                        <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                        <input
                                            type="text"
                                            name="dependencia"
                                            value={formData.dependencia}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.dependencia ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                            placeholder="Ej: Departamento de Ciencias"
                                        />
                                    </div>
                                    {errors.dependencia && (
                                        <p className="mt-1 text-sm text-red-600">{errors.dependencia}</p>
                                    )}
                                </div>

                                {/* Código de Dependencia */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Código de Dependencia
                                    </label>
                                    <input
                                        type="text"
                                        name="codigo_dependencia"
                                        value={formData.codigo_dependencia}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="Ej: DEP-456"
                                    />
                                </div>

                                {/* Carga Horaria */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Carga Horaria
                                    </label>
                                    <input
                                        type="text"
                                        name="carga_horaria"
                                        value={formData.carga_horaria}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="Ej: 40 horas"
                                    />
                                </div>

                                {/* Fecha Ingreso MPPE */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Fecha Ingreso MPPE *
                                    </label>
                                    <div className="relative">
                                        <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                        <input
                                            type="date"
                                            name="fecha_ingreso_mppe"
                                            value={formData.fecha_ingreso_mppe}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.fecha_ingreso_mppe ? 'border-red-300' : 'border-gray-300'
                                                }`}
                                        />
                                    </div>
                                    {errors.fecha_ingreso_mppe && (
                                        <p className="mt-1 text-sm text-red-600">{errors.fecha_ingreso_mppe}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'academica' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Títulos Profesionales */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Títulos Profesionales
                                    </label>
                                    <div className="relative">
                                        <FaGraduationCap className="absolute left-3 top-4 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                        <textarea
                                            name="titulos_profesionales"
                                            value={formData.titulos_profesionales}
                                            onChange={handleChange}
                                            rows="4"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            placeholder="Ingrese los títulos profesionales separados por comas"
                                        />
                                    </div>
                                </div>

                                {/* Tipo de Título */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tipo de Título
                                    </label>
                                    <select
                                        name="tipo_titulo"
                                        value={formData.tipo_titulo}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    >
                                        <option value="">Seleccionar tipo</option>
                                        {tiposTitulo.map(tipo => (
                                            <option key={tipo.value} value={tipo.value}>
                                                {tipo.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Tallas */}
                            <div className="pt-6 border-t">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Tallas de Uniforme</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Talla Franela */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FaTshirt className="inline-block h-4 w-4 mr-2" />
                                            Talla Franela
                                        </label>
                                        <select
                                            name="talla_franela"
                                            value={formData.talla_franela}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        >
                                            {tallasFranela.map(talla => (
                                                <option key={talla} value={talla}>
                                                    {talla}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Talla Pantalón */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Talla Pantalón
                                        </label>
                                        <select
                                            name="talla_pantalon"
                                            value={formData.talla_pantalon}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        >
                                            {tallasPantalon.map(talla => (
                                                <option key={talla} value={talla}>
                                                    {talla}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Talla Zapato */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FaShoePrints className="inline-block h-4 w-4 mr-2" />
                                            Talla Zapato
                                        </label>
                                        <select
                                            name="talla_zapato"
                                            value={formData.talla_zapato}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        >
                                            {tallasZapato.map(talla => (
                                                <option key={talla} value={talla}>
                                                    {talla}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'archivos' && (
                        <ArchivosManejador
                            archivos={archivos}
                            archivosErrors={archivosErrors}
                            onFileChange={handleFileChange}
                            onChangeFileType={handleChangeFileType}
                            onRemoveFile={handleRemoveFile}
                            tiposArchivo={tiposArchivo}
                        />
                    )}

                    {/* Navegación entre tabs */}
                    <div className="flex justify-between items-center pt-6 mt-6 border-t">
                        <div>
                            {activeTab !== 'basica' && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        const tabs = ['basica', 'laboral', 'academica', 'archivos'];
                                        const currentIndex = tabs.indexOf(activeTab);
                                        setActiveTab(tabs[currentIndex - 1]);
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Anterior
                                </button>
                            )}
                        </div>

                        <div className="flex space-x-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                disabled={submitting}
                            >
                                Cancelar
                            </button>

                            {activeTab !== 'archivos' ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        const tabs = ['basica', 'laboral', 'academica', 'archivos'];
                                        const currentIndex = tabs.indexOf(activeTab);
                                        setActiveTab(tabs[currentIndex + 1]);
                                    }}
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Siguiente
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                                >
                                    {submitting ? (
                                        <>
                                            <FaSpinner className="animate-spin h-5 w-5 mr-2" />
                                            Guardando...
                                        </>
                                    ) : (
                                        'Guardar Personal'
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PersonalFormularioModal;