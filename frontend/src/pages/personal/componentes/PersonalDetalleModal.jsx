import React from 'react';
import {
    FaUser, FaPhone, FaEnvelope, FaIdCard, FaCalendar,
    FaVenusMars, FaBriefcase, FaBuilding, FaGraduationCap,
    FaTshirt, FaShoePrints, FaTimes, FaPrint, FaDownload,
    FaFile, FaFileImage, FaFilePdf, FaFileAlt
} from 'react-icons/fa';
import { PersonalAdaptador } from '../adaptadores/personal.adaptador';
import { ArchivosAdaptador } from '../adaptadores/archivos.adaptador';

const PersonalDetalleModal = ({ personal, isOpen, onClose, tipo }) => {
    if (!isOpen || !personal) return null;

    const formatDate = (dateString) => {
        if (!dateString) return 'No especificada';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const getTipoIcon = () => {
        switch (tipo) {
            case 'docente': return FaGraduationCap;
            case 'administrativo': return FaBriefcase;
            case 'obrero': return FaTshirt;
            default: return FaUser;
        }
    };

    const getTipoColor = () => {
        const colors = PersonalAdaptador.getColorByTipo(tipo);
        return colors;
    };

    const getSexoIcon = (sexo) => {
        switch (sexo) {
            case 'masculino': return { icon: FaUser, color: 'text-blue-600' };
            case 'femenino': return { icon: FaUser, color: 'text-pink-600' };
            default: return { icon: FaUser, color: 'text-gray-600' };
        }
    };

    const TipoIcon = getTipoIcon();
    const tipoColors = getTipoColor();
    const sexoData = getSexoIcon(personal.sexo);
    const SexoIcon = sexoData.icon;

    // Agrupar archivos por tipo
    const archivosAgrupados = ArchivosAdaptador.agruparArchivosPorTipo(personal.archivos || []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <div className="flex items-center">
                        <div className={`p-3 rounded-lg ${tipoColors.bg} mr-3`}>
                            <TipoIcon className={`h-8 w-8 ${tipoColors.text}`} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {personal.nombreCompleto}
                            </h2>
                            <p className="text-gray-600">
                                ID: {personal.id} • C.I.: {personal.cedula} • {personal.tipoLabel}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => window.print()}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Imprimir"
                        >
                            <FaPrint className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => {
                                // Exportar a PDF (implementación básica)
                                const content = document.querySelector('.modal-content').innerHTML;
                                const printWindow = window.open('', '_blank');
                                printWindow.document.write(`
                  <html>
                    <head>
                      <title>${personal.nombreCompleto} - Detalles</title>
                      <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h1 { color: #333; }
                        .section { margin-bottom: 20px; }
                        .label { font-weight: bold; color: #666; }
                        .value { margin-left: 10px; }
                      </style>
                    </head>
                    <body>
                      <h1>${personal.nombreCompleto}</h1>
                      <div>${content}</div>
                    </body>
                  </html>
                `);
                                printWindow.document.close();
                                printWindow.print();
                            }}
                            className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                            title="Exportar a PDF"
                        >
                            <FaDownload className="h-5 w-5" />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <FaTimes className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {/* Información principal en 2 columnas */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Columna izquierda - Información Personal */}
                        <div className="space-y-6">
                            {/* Información Básica */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                                    Información Personal
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <FaUser className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Nombre Completo</p>
                                            <p className="text-gray-900">{personal.nombreCompleto}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <SexoIcon className={`h-5 w-5 ${sexoData.color} mt-0.5 mr-3`} />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Sexo</p>
                                            <p className="text-gray-900 capitalize">{personal.sexo}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <FaIdCard className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Cédula de Identidad</p>
                                            <p className="text-gray-900">{personal.cedula}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <FaCalendar className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Fecha de Nacimiento</p>
                                            <p className="text-gray-900">
                                                {formatDate(personal.fecha_nacimiento)} ({personal.edad} años)
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <FaPhone className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Teléfono</p>
                                            <p className="text-gray-900">{personal.telefono}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <FaEnvelope className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Correo Electrónico</p>
                                            <p className="text-gray-900">{personal.correo}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tallas de Uniforme */}
                            {(personal.talla_franela || personal.talla_pantalon || personal.talla_zapato) && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                                        Tallas de Uniforme
                                    </h3>

                                    <div className="grid grid-cols-3 gap-4">
                                        {personal.talla_franela && (
                                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                                <FaTshirt className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                                                <p className="text-sm font-medium text-gray-500">Franela</p>
                                                <p className="text-lg font-bold text-gray-900">{personal.talla_franela}</p>
                                            </div>
                                        )}

                                        {personal.talla_pantalon && (
                                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                                <p className="text-sm font-medium text-gray-500">Pantalón</p>
                                                <p className="text-lg font-bold text-gray-900">{personal.talla_pantalon}</p>
                                            </div>
                                        )}

                                        {personal.talla_zapato && (
                                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                                <FaShoePrints className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                                                <p className="text-sm font-medium text-gray-500">Zapato</p>
                                                <p className="text-lg font-bold text-gray-900">{personal.talla_zapato}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Columna derecha - Información Laboral y Académica */}
                        <div className="space-y-6">
                            {/* Información Laboral */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                                    Información Laboral
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <FaBriefcase className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Cargo (Voucher)</p>
                                            <p className="text-gray-900">{personal.cargo_voucher}</p>
                                        </div>
                                    </div>

                                    {personal.codigo_cargo && (
                                        <div className="flex items-start">
                                            <FaBriefcase className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Código de Cargo</p>
                                                <p className="text-gray-900">{personal.codigo_cargo}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-start">
                                        <FaBuilding className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Dependencia</p>
                                            <p className="text-gray-900">{personal.dependencia}</p>
                                        </div>
                                    </div>

                                    {personal.codigo_dependencia && (
                                        <div className="flex items-start">
                                            <FaBuilding className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Código de Dependencia</p>
                                                <p className="text-gray-900">{personal.codigo_dependencia}</p>
                                            </div>
                                        </div>
                                    )}

                                    {personal.carga_horaria && (
                                        <div className="flex items-start">
                                            <FaCalendar className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Carga Horaria</p>
                                                <p className="text-gray-900">{personal.carga_horaria}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-start">
                                        <FaCalendar className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Fecha de Ingreso al MPPE</p>
                                            <p className="text-gray-900">
                                                {formatDate(personal.fecha_ingreso_mppe)} ({personal.antiguedad} años)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Información Académica */}
                            {(personal.titulos_profesionales || personal.tipo_titulo) && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                                        Formación Académica
                                    </h3>

                                    <div className="space-y-4">
                                        {personal.titulos_profesionales && (
                                            <div className="flex items-start">
                                                <FaGraduationCap className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Títulos Profesionales</p>
                                                    <p className="text-gray-900 whitespace-pre-line">{personal.titulos_profesionales}</p>
                                                </div>
                                            </div>
                                        )}

                                        {personal.tipo_titulo && (
                                            <div className="flex items-start">
                                                <FaGraduationCap className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Tipo de Título</p>
                                                    <p className="text-gray-900">{personal.tipo_titulo_label || personal.tipo_titulo}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Información del Registro */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                                    Información del Registro
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <FaCalendar className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Fecha de Registro</p>
                                            <p className="text-gray-900">{formatDate(personal.fecha_registro)}</p>
                                        </div>
                                    </div>

                                    {personal.fecha_actualizacion && (
                                        <div className="flex items-start">
                                            <FaCalendar className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Última Actualización</p>
                                                <p className="text-gray-900">{formatDate(personal.fecha_actualizacion)}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Archivos Adjuntos */}
                    {personal.archivos && personal.archivos.length > 0 && (
                        <div className="mt-8 pt-8 border-t">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Documentos Adjuntos ({personal.archivos.length})
                            </h3>

                            <div className="space-y-6">
                                {Object.entries(archivosAgrupados).map(([tipo, archivos]) => {
                                    const Icon = ArchivosAdaptador.getIconByTipo(tipo);
                                    const colors = ArchivosAdaptador.getColorByTipo(tipo);

                                    return (
                                        <div key={tipo}>
                                            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                                                <Icon className={`h-5 w-5 mr-2 ${colors.text}`} />
                                                {tipo.charAt(0).toUpperCase() + tipo.slice(1)}s ({archivos.length})
                                            </h4>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {archivos.map((archivo) => {
                                                    const FileIcon = ArchivosAdaptador.getIconByTipo(archivo.tipo_archivo);
                                                    const fileColors = ArchivosAdaptador.getColorByTipo(archivo.tipo_archivo);

                                                    return (
                                                        <div key={archivo.id} className={`border rounded-lg p-4 ${fileColors.border} ${fileColors.bg}`}>
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center space-x-3">
                                                                    <FileIcon className={`h-6 w-6 ${fileColors.text}`} />
                                                                    <div>
                                                                        <p className="font-medium text-sm truncate" title={archivo.nombre_archivo}>
                                                                            {archivo.nombre_archivo}
                                                                        </p>
                                                                        <p className="text-xs text-gray-600">
                                                                            {ArchivosAdaptador.formatTamaño(archivo.tamaño || 0)}
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                <div className="flex items-center space-x-2">
                                                                    <button
                                                                        onClick={() => window.open(archivo.ruta_archivo, '_blank')}
                                                                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                                                        title="Ver archivo"
                                                                    >
                                                                        <FaEye className="h-4 w-4" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => {
                                                                            const link = document.createElement('a');
                                                                            link.href = archivo.ruta_archivo;
                                                                            link.download = archivo.nombre_archivo;
                                                                            document.body.appendChild(link);
                                                                            link.click();
                                                                            document.body.removeChild(link);
                                                                        }}
                                                                        className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                                                                        title="Descargar archivo"
                                                                    >
                                                                        <FaDownload className="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            {/* Vista previa para imágenes */}
                                                            {archivo.tipo_archivo === 'imagen' && archivo.ruta_archivo && (
                                                                <div className="mt-4">
                                                                    <img
                                                                        src={archivo.ruta_archivo}
                                                                        alt={archivo.nombre_archivo}
                                                                        className="max-h-32 rounded-lg mx-auto"
                                                                        onError={(e) => {
                                                                            e.target.style.display = 'none';
                                                                        }}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t">
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={onClose}
                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalDetalleModal;