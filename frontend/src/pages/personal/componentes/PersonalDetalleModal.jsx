import React from 'react';
import {
    FaUser, FaPhone, FaEnvelope, FaIdCard, FaCalendar,
    FaVenusMars, FaBriefcase, FaBuilding, FaGraduationCap,
    FaTshirt, FaShoePrints, FaTimes, FaPrint, FaDownload,
    FaEye, FaExclamationTriangle
} from 'react-icons/fa';
import { API_BASE_URL } from '../../../compartidos/api/axios.config';
import ExportarPersonal from './ExportarPersonal';
import { PiPantsFill } from "react-icons/pi";
import { PersonalAdaptador } from '../adaptadores/personal.adaptador';
import { ArchivosAdaptador } from '../adaptadores/archivos.adaptador';
import { PersonalServicio } from '../servicios/personal.servicio'

const PersonalDetalleModal = ({
    personal,
    isOpen,
    onClose,
    tipo,
    loading = false,
    error = null
}) => {
    if (!isOpen) return null;

    // Mostrar estado de carga
    if (loading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl p-8 max-w-md w-full">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                        <p className="text-gray-700">Cargando información del personal...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Mostrar error si existe
    if (error) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl p-6 max-w-md w-full">
                    <div className="flex items-center text-red-600 mb-4">
                        <FaExclamationTriangle className="h-6 w-6 mr-2" />
                        <h3 className="font-bold">Error al cargar información</h3>
                    </div>
                    <p className="text-gray-700 mb-4">{error}</p>
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Si no hay personal
    if (!personal) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl p-6 max-w-md w-full">
                    <p className="text-gray-700 mb-4">No se encontró información del personal</p>
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Si personal existe pero está vacío o tiene estructura incorrecta
    if (!personal.id && !personal.nombreCompleto) {
        console.error("Estructura incorrecta del personal:", personal);
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl p-6 max-w-md w-full">
                    <p className="text-gray-700 mb-4">Información del personal incompleta</p>
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString || dateString === 'null' || dateString === 'undefined') {
            return 'No especificada';
        }
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return 'Fecha inválida';
            }
            return date.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });
        } catch (error) {
            console.error('Error formateando fecha:', dateString, error);
            return 'Fecha inválida';
        }
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
        if (personal.tipo && PersonalAdaptador.getColorByTipo) {
            return PersonalAdaptador.getColorByTipo(personal.tipo);
        }
        return PersonalAdaptador.getColorByTipo(tipo);
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
    const sexoData = getSexoIcon(personal.sexo || '');
    const SexoIcon = sexoData.icon;

    console.log("Archivos recibidos:", personal.archivos);
    console.log("¿Existe el método?", ArchivosAdaptador.agruparArchivosPorTipo);

    // Manejo seguro de archivos
    let archivosAgrupados = {};
    try {
        archivosAgrupados = ArchivosAdaptador.agruparArchivosPorTipo(personal.archivos || []);
        console.log("Archivos agrupados:", archivosAgrupados);
    } catch (error) {
        console.error('Error agrupando archivos:', error);
        console.error('ArchivosAdaptador:', ArchivosAdaptador);
        archivosAgrupados = {};
    }
    console.log("persona", personal)


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <div className="flex items-center">
                        <div className={`p-3 rounded-lg ${tipoColors?.bg || 'bg-gray-100'} mr-3`}>
                            <TipoIcon className={`h-8 w-8 ${tipoColors?.text || 'text-gray-600'}`} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {personal.nombreCompleto || 'Nombre no disponible'}
                            </h2>
                            <p className="text-gray-600">
                                ID: {personal.id || 'N/A'} • C.I.: {personal.cedula || 'N/A'} • {personal.tipoLabel || tipo}
                            </p>
                        </div>
                    </div>
                    {/* <div className="flex items-center space-x-2">
                        <button
                            onClick={() => window.print()}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
                            title="Imprimir"
                        >
                            <FaPrint className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => {
                                // Exportar a PDF (implementación básica)
                                const content = document.querySelector('.modal-content')?.innerHTML || '';
                                const printWindow = window.open('', '_blank');
                                printWindow.document.write(`
                                    <html>
                                        <head>
                                            <title>${personal.nombreCompleto || 'Personal'} - Detalles</title>
                                            <style>
                                                body { font-family: Arial, sans-serif; padding: 20px; }
                                                h1 { color: #333; }
                                                .section { margin-bottom: 20px; }
                                                .label { font-weight: bold; color: #666; }
                                                .value { margin-left: 10px; }
                                            </style>
                                        </head>
                                        <body>
                                            <h1>${personal.nombreCompleto || 'Personal'}</h1>
                                            <div>${content}</div>
                                        </body>
                                    </html>
                                `);
                                printWindow.document.close();
                                printWindow.print();
                            }}
                            className="p-2 text-gray-400 hover:text-green-600 transition-colors cursor-pointer"
                            title="Exportar a PDF"
                        >
                            <FaDownload className="h-5 w-5" />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        >
                            <FaTimes className="h-5 w-5 text-gray-500  hover:text-red-400" />
                        </button>
                    </div> */}

                    <div className="flex items-center space-x-2">
                        <ExportarPersonal
                            personal={personal}
                            tipo={tipo}
                        />
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        >
                            <FaTimes className="h-5 w-5 text-gray-500 hover:text-red-400" />
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
                                            <p className="text-gray-900">{personal.nombreCompleto || 'No disponible'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <SexoIcon className={`h-5 w-5 ${sexoData.color} mt-0.5 mr-3`} />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Sexo</p>
                                            <p className="text-gray-900 capitalize">{personal.sexo || 'No especificado'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <FaIdCard className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Cédula de Identidad</p>
                                            <p className="text-gray-900">{personal.cedula || 'No disponible'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <FaCalendar className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Fecha de Nacimiento</p>
                                            <p className="text-gray-900">
                                                {formatDate(personal.fecha_nacimiento)} {personal.edad ? `(${personal.edad} años)` : ''}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <FaPhone className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Teléfono</p>
                                            <p className="text-gray-900">{personal.telefono || 'No disponible'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <FaEnvelope className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Correo Electrónico</p>
                                            <p className="text-gray-900">{personal.correo || 'No disponible'}</p>
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
                                                <PiPantsFill className="h-6 w-6 text-gray-600 mx-auto mb-2" />
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
                                            <p className="text-gray-900">{personal.cargo_voucher || 'No especificado'}</p>
                                        </div>
                                    </div>

                                    {personal.codigo_cargo && personal.codigo_cargo !== 'null' && (
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
                                            <p className="text-gray-900">{personal.dependencia || 'No especificada'}</p>
                                        </div>
                                    </div>

                                    {personal.codigo_dependencia && personal.codigo_dependencia !== 'null' && (
                                        <div className="flex items-start">
                                            <FaBuilding className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Código de Dependencia</p>
                                                <p className="text-gray-900">{personal.codigo_dependencia}</p>
                                            </div>
                                        </div>
                                    )}

                                    {personal.carga_horaria && personal.carga_horaria !== 'null' && (
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
                                                {formatDate(personal.fecha_ingreso_mppe)} {personal.antiguedad ? `(${personal.antiguedad} años)` : ''}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Información Académica */}
                            {(personal.titulos_profesionales && personal.titulos_profesionales !== 'null') ||
                                (personal.tipo_titulo && personal.tipo_titulo !== 'null') ? (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                                        Formación Académica
                                    </h3>

                                    <div className="space-y-4">
                                        {personal.titulos_profesionales && personal.titulos_profesionales !== 'null' && (
                                            <div className="flex items-start">
                                                <FaGraduationCap className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Títulos Profesionales</p>
                                                    <p className="text-gray-900 whitespace-pre-line">{personal.titulos_profesionales}</p>
                                                </div>
                                            </div>
                                        )}

                                        {personal.tipo_titulo && personal.tipo_titulo !== 'null' && (
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
                            ) : null}

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

                                    {personal.fecha_actualizacion && personal.fecha_actualizacion !== 'null' && (
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
                    {personal.archivos && Array.isArray(personal.archivos) && personal.archivos.length > 0 && (
                        <div className="mt-8 pt-8 border-t">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Documentos Adjuntos ({personal.archivos.length})
                            </h3>

                            <div className="space-y-6">
                                {Object.entries(archivosAgrupados).map(([tipo, archivos]) => {
                                    const Icon = ArchivosAdaptador.getIconByTipo ? ArchivosAdaptador.getIconByTipo(tipo) : FaFile;
                                    const colors = ArchivosAdaptador.getColorByTipo ? ArchivosAdaptador.getColorByTipo(tipo) : { text: 'text-gray-600' };

                                    return (
                                        <div key={tipo}>
                                            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                                                {Icon && <Icon className={`h-5 w-5 mr-2 ${colors.text}`} />}
                                                {tipo.charAt(0).toUpperCase() + tipo.slice(1)}s ({archivos.length})
                                            </h4>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {archivos.map((archivo) => {
                                                    const FileIcon = ArchivosAdaptador.getIconByTipo ? ArchivosAdaptador.getIconByTipo(archivo.tipo_archivo) : FaFile;
                                                    const fileColors = ArchivosAdaptador.getColorByTipo ? ArchivosAdaptador.getColorByTipo(archivo.tipo_archivo) : {
                                                        border: 'border-gray-200',
                                                        bg: 'bg-gray-50',
                                                        text: 'text-gray-600'
                                                    };

                                                    // return (
                                                    //     <div key={archivo.id} className={`border rounded-lg p-4 ${fileColors.border} ${fileColors.bg}`}>
                                                    //         <div className="flex items-center justify-between">
                                                    //             <div className="flex items-center space-x-3">
                                                    //                 {FileIcon && <FileIcon className={`h-6 w-6 ${fileColors.text}`} />}
                                                    //                 <div>
                                                    //                     <p className="font-medium text-sm truncate text-overflow:ellipsis;" title={archivo.nombre_original}>
                                                    //                         {archivo.nombre_original}
                                                    //                     </p>
                                                    //                     <p className="text-xs text-gray-600">
                                                    //                         {ArchivosAdaptador.formatTamaño ? ArchivosAdaptador.formatTamaño(archivo.size_bytes || 0) : `${archivo.tamaño || 0} bytes`}
                                                    //                     </p>
                                                    //                 </div>
                                                    //             </div>

                                                    //             <div className="flex items-center space-x-2">
                                                    //                 <button
                                                    //                     onClick={() => {
                                                    //                         try {
                                                    //                             // Construir URL completa
                                                    //                             const urlCompleta = `${API_BASE_URL}/carpeta-personal/${archivo.ruta_archivo}`;

                                                    //                             // Verificar que la ruta no esté vacía
                                                    //                             if (!archivo.ruta_archivo) {
                                                    //                                 console.error('Ruta de archivo no disponible');
                                                    //                                 alert('No se puede abrir el archivo: ruta no disponible');
                                                    //                                 return;
                                                    //                             }

                                                    //                             // Abrir en nueva pestaña
                                                    //                             window.open(urlCompleta, '_blank', 'noopener,noreferrer');
                                                    //                         } catch (error) {
                                                    //                             console.error('Error al abrir archivo:', error);
                                                    //                             alert('Error al intentar abrir el archivo');
                                                    //                         }
                                                    //                     }}
                                                    //                     className="p-1 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
                                                    //                     title="Ver archivo"
                                                    //                     disabled={!archivo.ruta_archivo}
                                                    //                 >
                                                    //                     <FaEye className="h-4 w-4" />
                                                    //                 </button>
                                                    //                 <button
                                                    //                     onClick={async () => {
                                                    //                         try {
                                                    //                             // Opción A: Si tu endpoint usa el nombre del archivo
                                                    //                             const resultado = await PersonalServicio.descargarArchivoPorNombre(
                                                    //                                 archivo.ruta_archivo || archivo.nombre_archivo
                                                    //                             );

                                                    //                             if (resultado.success) {
                                                    //                                 // Crear URL del blob
                                                    //                                 const blob = new Blob([resultado.data], {
                                                    //                                     type: resultado.headers['content-type'] || 'application/octet-stream'
                                                    //                                 });

                                                    //                                 const blobUrl = window.URL.createObjectURL(blob);

                                                    //                                 // Crear link de descarga
                                                    //                                 const link = document.createElement('a');
                                                    //                                 link.href = blobUrl;
                                                    //                                 link.download = archivo.nombre_original || archivo.nombre_archivo || 'archivo';

                                                    //                                 // Simular click
                                                    //                                 document.body.appendChild(link);
                                                    //                                 link.click();

                                                    //                                 // Limpiar
                                                    //                                 setTimeout(() => {
                                                    //                                     document.body.removeChild(link);
                                                    //                                     window.URL.revokeObjectURL(blobUrl);
                                                    //                                 }, 100);

                                                    //                             } else {
                                                    //                                 alert(`Error: ${resultado.message}`);
                                                    //                             }

                                                    //                         } catch (error) {
                                                    //                             console.error('Error al descargar:', error);
                                                    //                             alert('Error al descargar el archivo');
                                                    //                         }
                                                    //                     }}
                                                    //                     className="p-1 text-gray-400 hover:text-green-600 transition-colors cursor-pointer"
                                                    //                     title="Descargar archivo"
                                                    //                 >
                                                    //                     <FaDownload className="h-4 w-4" />
                                                    //                 </button>
                                                    //             </div>

                                                    //         </div>
                                                    //     </div>
                                                    // );

                                                    return (
                                                        <div key={archivo.id} className={`border rounded-lg p-4 ${fileColors.border} ${fileColors.bg}`}>
                                                            <div className="flex items-center justify-between">
                                                                {/* Contenedor del texto con ancho limitado */}
                                                                <div className="flex items-center space-x-3 min-w-0 flex-1">
                                                                    {FileIcon && <FileIcon className={`h-6 w-6 ${fileColors.text} flex-shrink-0`} />}
                                                                    <div className="min-w-0 flex-1">
                                                                        {/* Contenedor para el nombre con truncate */}
                                                                        <div className="truncate" title={archivo.nombre_original}>
                                                                            <p className="font-medium text-sm truncate">
                                                                                {archivo.nombre_original}
                                                                            </p>
                                                                        </div>
                                                                        <p className="text-xs text-gray-600 truncate">
                                                                            {ArchivosAdaptador.formatTamaño ? ArchivosAdaptador.formatTamaño(archivo.size_bytes || 0) : `${archivo.tamaño || 0} bytes`}
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                {/* Botones que no se encogen */}
                                                                <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                                                                    <button
                                                                        onClick={() => {
                                                                            try {
                                                                                const urlCompleta = `${API_BASE_URL}/carpeta-personal/${archivo.ruta_archivo}`;

                                                                                if (!archivo.ruta_archivo) {
                                                                                    console.error('Ruta de archivo no disponible');
                                                                                    alert('No se puede abrir el archivo: ruta no disponible');
                                                                                    return;
                                                                                }

                                                                                window.open(urlCompleta, '_blank', 'noopener,noreferrer');
                                                                            } catch (error) {
                                                                                console.error('Error al abrir archivo:', error);
                                                                                alert('Error al intentar abrir el archivo');
                                                                            }
                                                                        }}
                                                                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer flex-shrink-0"
                                                                        title="Ver archivo"
                                                                        disabled={!archivo.ruta_archivo}
                                                                    >
                                                                        <FaEye className="h-4 w-4" />
                                                                    </button>
                                                                    <button
                                                                        onClick={async () => {
                                                                            try {
                                                                                const resultado = await PersonalServicio.descargarArchivoPorNombre(
                                                                                    archivo.ruta_archivo || archivo.nombre_archivo
                                                                                );

                                                                                if (resultado.success) {
                                                                                    const blob = new Blob([resultado.data], {
                                                                                        type: resultado.headers['content-type'] || 'application/octet-stream'
                                                                                    });

                                                                                    const blobUrl = window.URL.createObjectURL(blob);
                                                                                    const link = document.createElement('a');
                                                                                    link.href = blobUrl;
                                                                                    link.download = archivo.nombre_original || archivo.nombre_archivo || 'archivo';

                                                                                    document.body.appendChild(link);
                                                                                    link.click();

                                                                                    setTimeout(() => {
                                                                                        document.body.removeChild(link);
                                                                                        window.URL.revokeObjectURL(blobUrl);
                                                                                    }, 100);

                                                                                } else {
                                                                                    alert(`Error: ${resultado.message}`);
                                                                                }
                                                                            } catch (error) {
                                                                                console.error('Error al descargar:', error);
                                                                                alert('Error al descargar el archivo');
                                                                            }
                                                                        }}
                                                                        className="p-1 text-gray-400 hover:text-green-600 transition-colors cursor-pointer flex-shrink-0"
                                                                        title="Descargar archivo"
                                                                    >
                                                                        <FaDownload className="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                            </div>
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
                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-300 hover:border-gray-400  transition-colors cursor-pointer"
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