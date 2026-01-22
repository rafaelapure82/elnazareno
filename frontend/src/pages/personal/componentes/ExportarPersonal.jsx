// components/ExportarPersonal.jsx
import React, { useRef } from 'react';
import { FaPrint, FaFilePdf, FaDownload, FaSpinner, FaEye } from 'react-icons/fa';
import html2pdf from 'html2pdf.js';

const ExportarPersonal = ({ personal, tipo }) => {
    const printableRef = useRef(null);
    const [exportando, setExportando] = React.useState(false);

    // Función para formatear fechas
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
            return 'Fecha inválida';
        }
    };

    // Función para capitalizar texto
    const capitalize = (text) => {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    // Obtener nombre del tipo
    const getTipoNombre = () => {
        switch (tipo) {
            case 'docente': return 'Docente';
            case 'administrativo': return 'Personal Administrativo';
            case 'obrero': return 'Personal Obrero';
            default: return 'Personal';
        }
    };

    // Generar contenido HTML para exportación
    const generarContenidoExportacion = () => {
        if (!personal) return '';

        return `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${personal.nombreCompleto || 'Personal'} - Ficha Técnica</title>
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    
                    body {
                        font-family: 'Arial', 'Helvetica', sans-serif;
                        line-height: 1.4;
                        color: #333;
                        font-size: 11pt;
                        padding: 15mm;
                        background: #fff;
                    }
                    
                    .container {
                        max-width: 100%;
                    }
                    
                    /* Encabezado */
                    .header {
                        text-align: center;
                        margin-bottom: 25px;
                        padding-bottom: 15px;
                        border-bottom: 2px solid #4f46e5;
                    }
                    
                    .institucion {
                        font-size: 14pt;
                        font-weight: bold;
                        color: #4f46e5;
                        margin-bottom: 5px;
                    }
                    
                    .titulo {
                        font-size: 10pt;
                        color: #6b7280;
                        margin-bottom: 15px;
                    }
                    
                    .nombre-personal {
                        font-size: 20pt;
                        color: #1f2937;
                        margin: 10px 0 5px 0;
                        font-weight: 600;
                    }
                    
                    .subtitulo {
                        font-size: 11pt;
                        color: #6b7280;
                        margin-bottom: 20px;
                    }
                    
                    /* Grid de información */
                    .info-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 25px;
                        margin-bottom: 25px;
                    }
                    
                    /* Secciones */
                    .section {
                        margin-bottom: 20px;
                        page-break-inside: avoid;
                    }
                    
                    .section-title {
                        color: #374151;
                        border-bottom: 1px solid #e5e7eb;
                        padding-bottom: 8px;
                        margin-bottom: 12px;
                        font-size: 13pt;
                        font-weight: 600;
                    }
                    
                    /* Items de información */
                    .info-item {
                        margin-bottom: 10px;
                        display: flex;
                        align-items: flex-start;
                    }
                    
                    .info-label {
                        font-weight: 600;
                        color: #4b5563;
                        min-width: 160px;
                        flex-shrink: 0;
                    }
                    
                    .info-value {
                        color: #111827;
                        flex: 1;
                    }
                    
                    /* Uniforme */
                    .uniforme-grid {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 10px;
                        margin-top: 10px;
                    }
                    
                    .uniforme-item {
                        text-align: center;
                        padding: 8px;
                        border: 1px solid #e5e7eb;
                        border-radius: 4px;
                        background: #f9fafb;
                    }
                    
                    .uniforme-label {
                        font-size: 9pt;
                        color: #6b7280;
                        margin-bottom: 3px;
                    }
                    
                    .uniforme-value {
                        font-weight: 600;
                        font-size: 12pt;
                        color: #111827;
                    }
                    
                    /* Footer */
                    .footer {
                        margin-top: 30px;
                        padding-top: 15px;
                        border-top: 1px solid #e5e7eb;
                        text-align: center;
                        font-size: 9pt;
                        color: #6b7280;
                    }
                    
                    .fecha-generacion {
                        margin-bottom: 5px;
                    }
                    
                    /* Utilidades */
                    .text-center { text-align: center; }
                    .mt-2 { margin-top: 10px; }
                    .mb-2 { margin-bottom: 10px; }
                    .text-muted { color: #6b7280; }
                    .text-bold { font-weight: 600; }
                    
                    /* Para evitar cortes de página */
                    @media print {
                        .section {
                            page-break-inside: avoid;
                        }
                        
                        .no-break {
                            page-break-inside: avoid;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <!-- Encabezado institucional -->
                    <div class="header">
                        <div class="institucion">INSTITUCIÓN EDUCATIVA</div>
                        <div class="titulo">SISTEMA DE GESTIÓN DE PERSONAL</div>
                        <h1 class="nombre-personal">${personal.nombreCompleto || 'Nombre no disponible'}</h1>
                        <div class="subtitulo">
                            ID: ${personal.id || 'N/A'} • C.I.: ${personal.cedula || 'N/A'} • ${getTipoNombre()}
                        </div>
                    </div>
                    
                    <div class="info-grid">
                        <!-- Columna izquierda - Información Personal -->
                        <div class="no-break">
                            <div class="section">
                                <h3 class="section-title">INFORMACIÓN PERSONAL</h3>
                                <div class="info-item">
                                    <span class="info-label">Nombre Completo:</span>
                                    <span class="info-value">${personal.nombreCompleto || 'No disponible'}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Sexo:</span>
                                    <span class="info-value">${personal.sexo ? capitalize(personal.sexo) : 'No especificado'}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Cédula de Identidad:</span>
                                    <span class="info-value">${personal.cedula || 'No disponible'}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Fecha de Nacimiento:</span>
                                    <span class="info-value">${formatDate(personal.fecha_nacimiento)} ${personal.edad ? '(' + personal.edad + ' años)' : ''}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Teléfono:</span>
                                    <span class="info-value">${personal.telefono || 'No disponible'}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Correo Electrónico:</span>
                                    <span class="info-value">${personal.correo || 'No disponible'}</span>
                                </div>
                            </div>
                            
                            ${personal.talla_franela || personal.talla_pantalon || personal.talla_zapato ? `
                            <div class="section">
                                <h3 class="section-title">TALLAS DE UNIFORME</h3>
                                <div class="uniforme-grid">
                                    ${personal.talla_franela ? `
                                    <div class="uniforme-item">
                                        <div class="uniforme-label">FRANELA</div>
                                        <div class="uniforme-value">${personal.talla_franela}</div>
                                    </div>
                                    ` : ''}
                                    
                                    ${personal.talla_pantalon ? `
                                    <div class="uniforme-item">
                                        <div class="uniforme-label">PANTALÓN</div>
                                        <div class="uniforme-value">${personal.talla_pantalon}</div>
                                    </div>
                                    ` : ''}
                                    
                                    ${personal.talla_zapato ? `
                                    <div class="uniforme-item">
                                        <div class="uniforme-label">ZAPATO</div>
                                        <div class="uniforme-value">${personal.talla_zapato}</div>
                                    </div>
                                    ` : ''}
                                </div>
                            </div>
                            ` : ''}
                        </div>
                        
                        <!-- Columna derecha - Información Laboral -->
                        <div class="no-break">
                            <div class="section">
                                <h3 class="section-title">INFORMACIÓN LABORAL</h3>
                                <div class="info-item">
                                    <span class="info-label">Cargo (Voucher):</span>
                                    <span class="info-value">${personal.cargo_voucher || 'No especificado'}</span>
                                </div>
                                ${personal.codigo_cargo && personal.codigo_cargo !== 'null' ? `
                                <div class="info-item">
                                    <span class="info-label">Código de Cargo:</span>
                                    <span class="info-value">${personal.codigo_cargo}</span>
                                </div>
                                ` : ''}
                                <div class="info-item">
                                    <span class="info-label">Dependencia:</span>
                                    <span class="info-value">${personal.dependencia || 'No especificada'}</span>
                                </div>
                                ${personal.codigo_dependencia && personal.codigo_dependencia !== 'null' ? `
                                <div class="info-item">
                                    <span class="info-label">Código Dependencia:</span>
                                    <span class="info-value">${personal.codigo_dependencia}</span>
                                </div>
                                ` : ''}
                                ${personal.carga_horaria && personal.carga_horaria !== 'null' ? `
                                <div class="info-item">
                                    <span class="info-label">Carga Horaria:</span>
                                    <span class="info-value">${personal.carga_horaria}</span>
                                </div>
                                ` : ''}
                                <div class="info-item">
                                    <span class="info-label">Fecha Ingreso MPPE:</span>
                                    <span class="info-value">${formatDate(personal.fecha_ingreso_mppe)} ${personal.antiguedad ? '(' + personal.antiguedad + ' años)' : ''}</span>
                                </div>
                            </div>
                            
                            ${(personal.titulos_profesionales && personal.titulos_profesionales !== 'null') ||
                (personal.tipo_titulo && personal.tipo_titulo !== 'null') ? `
                            <div class="section">
                                <h3 class="section-title">FORMACIÓN ACADÉMICA</h3>
                                ${personal.titulos_profesionales && personal.titulos_profesionales !== 'null' ? `
                                <div class="info-item">
                                    <span class="info-label">Títulos Profesionales:</span>
                                    <span class="info-value">${personal.titulos_profesionales.replace(/\n/g, '<br>')}</span>
                                </div>
                                ` : ''}
                                ${personal.tipo_titulo && personal.tipo_titulo !== 'null' ? `
                                <div class="info-item">
                                    <span class="info-label">Tipo de Título:</span>
                                    <span class="info-value">${personal.tipo_titulo_label || personal.tipo_titulo}</span>
                                </div>
                                ` : ''}
                            </div>
                            ` : ''}
                            
                            <div class="section">
                                <h3 class="section-title">INFORMACIÓN DEL REGISTRO</h3>
                                <div class="info-item">
                                    <span class="info-label">Fecha de Registro:</span>
                                    <span class="info-value">${formatDate(personal.fecha_registro)}</span>
                                </div>
                                ${personal.fecha_actualizacion && personal.fecha_actualizacion !== 'null' ? `
                                <div class="info-item">
                                    <span class="info-label">Última Actualización:</span>
                                    <span class="info-value">${formatDate(personal.fecha_actualizacion)}</span>
                                </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div class="footer">
                        <div class="fecha-generacion">
                            Documento generado el: ${new Date().toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
                        </div>
                        <div>Ficha Técnica de Personal - Página 1 de 1</div>
                    </div>
                </div>
            </body>
            </html>
        `;
    };

    // Función para exportar a PDF
    const exportarAPDF = async () => {
        if (!personal) {
            alert('No hay información para exportar');
            return;
        }

        try {
            setExportando(true);

            // Crear elemento temporal con el contenido
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = generarContenidoExportacion();

            // Configuración de html2pdf
            const opt = {
                margin: [15, 15, 15, 15], // [top, right, bottom, left] en mm
                filename: `${personal.nombreCompleto || 'personal'}_ficha_${new Date().getTime()}.pdf`,
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 2, // Mejor calidad
                    useCORS: true,
                    logging: false,
                    letterRendering: true,
                    allowTaint: true
                },
                jsPDF: {
                    unit: 'mm',
                    format: 'a4',
                    orientation: 'portrait',
                    compress: true
                },
                pagebreak: {
                    mode: ['avoid-all', 'css', 'legacy']
                }
            };

            // Generar y descargar PDF
            await html2pdf().set(opt).from(tempDiv).save();

        } catch (error) {
            console.error('Error al generar PDF:', error);
            alert('Error al generar el PDF. Por favor, intente nuevamente.');
        } finally {
            setExportando(false);
        }
    };

    // Función para imprimir
    const imprimir = () => {
        if (!personal) {
            alert('No hay información para imprimir');
            return;
        }

        try {
            // Crear ventana de impresión
            const printWindow = window.open('', '_blank');

            // Generar contenido
            const contenido = generarContenidoExportacion();

            // Añadir estilos de impresión
            const contenidoConEstilos = contenido.replace(
                '</style>',
                `
                @media print {
                    @page {
                        margin: 15mm;
                    }
                    body {
                        padding: 0;
                    }
                    .no-print {
                        display: none !important;
                    }
                }
                </style>`
            );

            printWindow.document.open();
            printWindow.document.write(contenidoConEstilos);
            printWindow.document.close();

            // Esperar a que cargue y luego imprimir
            printWindow.onload = () => {
                printWindow.focus();
                printWindow.print();
                // Cerrar ventana después de imprimir (opcional)
                // printWindow.close();
            };

        } catch (error) {
            console.error('Error al imprimir:', error);
            alert('Error al preparar la impresión.');
        }
    };

    // Función para exportar a HTML (para vista previa)
    const vistaPrevia = () => {
        if (!personal) {
            alert('No hay información para mostrar');
            return;
        }

        const previewWindow = window.open('', '_blank', 'width=800,height=600');
        previewWindow.document.open();
        previewWindow.document.write(generarContenidoExportacion());
        previewWindow.document.close();
    };

    return (
        <div className="flex items-center space-x-2">
            {/* Botón de Vista Previa (opcional) */}

            {/* <button
                onClick={vistaPrevia}
                className="p-2 text-gray-400 hover:text-purple-600 transition-colors cursor-pointer"
                title="Vista previa"
                disabled={!personal || exportando}
            >
                <FaEye className="h-4 w-4" />
            </button> */}


            {/* Botón de Imprimir */}
            <button
                onClick={imprimir}
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
                title="Imprimir información"
                disabled={!personal || exportando}
            >
                <FaPrint className="h-5 w-5" />
            </button>

            {/* Botón de Exportar a PDF */}
            <button
                onClick={exportarAPDF}
                className="p-2 text-gray-400 hover:text-green-600 transition-colors cursor-pointer disabled:opacity-50"
                title="Exportar a PDF"
                disabled={!personal || exportando}
            >
                {exportando ? (
                    <FaSpinner className="h-5 w-5 animate-spin" />
                ) : (
                    <FaFilePdf className="h-5 w-5" />
                )}
            </button>
        </div>
    );
};

export default ExportarPersonal;