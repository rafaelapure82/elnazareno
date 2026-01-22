// services/exportacion.service.js
import { PersonalServicio } from './personal.servicio';
import { PersonalAdaptador } from '../adaptadores/personal.adaptador';
import html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';

export class ExportacionService {

    // Obtener datos completos para exportar
    static async obtenerDatosCompletos(personalLista, selectedIds) {
        try {

            console.log('Obteniendo datos para exportación:', {
                tienePersonalLista: !!personalLista,
                cantidadPersonalLista: personalLista?.length || 0,
                tieneSelectedIds: !!selectedIds,
                cantidadSelectedIds: selectedIds?.length || 0
            });

            let datosParaExportar;

            // SOLO usar endpoint /multiples si hay selección específica
            if (selectedIds && selectedIds.length > 0) {
                console.log('Usando endpoint /multiples para IDs seleccionados:', selectedIds);

                // Usar el endpoint /personal/multiples para obtener datos completos
                const resultado = await PersonalServicio.obtenerPersonalMultiple(selectedIds);

                if (!resultado.success) {
                    console.error('Error del endpoint /multiples:', resultado.message);
                    throw new Error(resultado.message || 'Error al obtener datos completos');
                }

                console.log('Datos recibidos del endpoint /multiples:', resultado.data);

                // Adaptar los datos usando el adaptador
                datosParaExportar = resultado.data.map(personal => {
                    try {
                        return PersonalAdaptador.fromApiResponse({ success: true, data: personal });
                    } catch (error) {
                        console.error('Error adaptando personal:', personal, error);
                        // Retornar datos básicos si falla la adaptación
                        return {
                            id: personal.id,
                            nombreCompleto: `${personal.primer_nombre || ''} ${personal.segundo_nombre || ''} ${personal.primer_apellido || ''} ${personal.segundo_apellido || ''}`.trim(),
                            cedula: personal.cedula || '',
                            telefono: personal.telefono || '',
                            correo: personal.correo || '',
                            sexo: personal.sexo || '',
                            cargo_voucher: personal.cargo_voucher || '',
                            dependencia: personal.dependencia || ''
                        };
                    }
                });

                console.log('Datos adaptados para exportación (con /multiples):', datosParaExportar);

            } else {
                // Si NO hay selección, usar los datos de la lista actual
                console.log('Usando datos de la lista actual (sin selección específica)');
                datosParaExportar = personalLista || [];
                console.log('Cantidad de datos de lista:', datosParaExportar.length);
            }

            // Verificar que tenemos datos
            if (!datosParaExportar || datosParaExportar.length === 0) {
                console.warn('No hay datos para exportar');
                return [];
            }

            console.log('Datos finales para exportación:', {
                cantidad: datosParaExportar.length,
                primerRegistro: datosParaExportar[0]
            });

            return datosParaExportar;

        } catch (error) {
            console.error('Error obteniendo datos para exportación:', error);
            throw error;
        }
    }

    // Formatear fecha para exportación
    static formatFechaExportacion(fechaString) {
        if (!fechaString || fechaString === 'null' || fechaString === 'undefined') {
            return '';
        }

        try {
            const fecha = new Date(fechaString);
            if (isNaN(fecha.getTime())) return '';

            return fecha.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

        } catch (error) {
            return '';
        }
    }

    // Calcular edad para exportación
    static calcularEdadExportacion(fechaNacimiento) {
        if (!fechaNacimiento) return '';

        try {
            const hoy = new Date();
            const nacimiento = new Date(fechaNacimiento);
            let edad = hoy.getFullYear() - nacimiento.getFullYear();
            const mes = hoy.getMonth() - nacimiento.getMonth();

            if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
                edad--;
            }

            return `${edad} años`;

        } catch (error) {
            return '';
        }
    }

    // Calcular antigüedad para exportación
    static calcularAntiguedadExportacion(fechaIngreso) {
        if (!fechaIngreso) return '';

        try {
            const hoy = new Date();
            const ingreso = new Date(fechaIngreso);
            let años = hoy.getFullYear() - ingreso.getFullYear();
            const meses = hoy.getMonth() - ingreso.getMonth();

            if (meses < 0 || (meses === 0 && hoy.getDate() < ingreso.getDate())) {
                años--;
            }

            return `${años} años`;

        } catch (error) {
            return '';
        }
    }

    // Formatear datos para visualización en cualquier formato
    // static formatearDatosParaExportacion(datos) {
    //     return datos.map(persona => {
    //         // Asegurar que todos los campos necesarios existan
    //         return {
    //             // Identificación
    //             id: persona.id || '',
    //             nombreCompleto: persona.nombreCompleto ||
    //                 `${persona.primer_nombre || ''} ${persona.segundo_nombre || ''} ${persona.primer_apellido || ''} ${persona.segundo_apellido || ''}`.trim(),

    //             // Datos personales
    //             cedula: persona.cedula || '',
    //             telefono: persona.telefono || '',
    //             correo: persona.correo || '',
    //             sexo: persona.sexo ? persona.sexo.charAt(0).toUpperCase() + persona.sexo.slice(1) : '',
    //             fecha_nacimiento: persona.fecha_nacimiento || '',
    //             edad: persona.edad || '',

    //             // Información laboral
    //             cargo_voucher: persona.cargo_voucher || '',
    //             codigo_cargo: persona.codigo_cargo || '',
    //             dependencia: persona.dependencia || '',
    //             codigo_dependencia: persona.codigo_dependencia || '',
    //             carga_horaria: persona.carga_horaria || '',
    //             fecha_ingreso_mppe: persona.fecha_ingreso_mppe || '',
    //             antiguedad: persona.antiguedad || '',

    //             // Formación académica
    //             titulos_profesionales: persona.titulos_profesionales || '',
    //             tipo_titulo: persona.tipo_titulo || '',
    //             tipo_titulo_label: persona.tipo_titulo_label || '',

    //             // Tallas
    //             talla_franela: persona.talla_franela || '',
    //             talla_pantalon: persona.talla_pantalon || '',
    //             talla_zapato: persona.talla_zapato || '',

    //             // Fechas del sistema
    //             fecha_registro: persona.fecha_registro || '',
    //             fecha_actualizacion: persona.fecha_actualizacion || ''
    //         };
    //     });
    // }

    // Exportar a PDF (con datos COMPLETOS)
    // static async exportarAPDF(datosOriginales, tipo) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             console.log('Iniciando exportación PDF con:', {
    //                 cantidadDatos: datosOriginales.length,
    //                 tipo: tipo,
    //                 primerRegistro: datosOriginales[0]
    //             });

    //             if (!datosOriginales || datosOriginales.length === 0) {
    //                 throw new Error('No hay datos para exportar');
    //             }

    //             // Formatear datos para asegurar consistencia
    //             const datos = this.formatearDatosParaExportacion(datosOriginales);

    //             const fechaActual = new Date().toLocaleDateString('es-ES', {
    //                 day: '2-digit',
    //                 month: 'long',
    //                 year: 'numeric',
    //                 hour: '2-digit',
    //                 minute: '2-digit'
    //             });

    //             // Título según tipo
    //             const tituloPorTipo = {
    //                 'docente': 'DOCENTES',
    //                 'administrativo': 'PERSONAL ADMINISTRATIVO',
    //                 'obrero': 'PERSONAL OBRERO'
    //             };

    //             const titulo = tituloPorTipo[tipo] || 'PERSONAL';

    //             // Construir tabla HTML con TODOS los datos (versión COMPLETA)
    //             const contenidoHTML = `
    //                 <!DOCTYPE html>
    //                 <html>
    //                 <head>
    //                     <meta charset="UTF-8">
    //                     <style>
    //                         body {
    //                             font-family: 'Arial', sans-serif;
    //                             font-size: 9pt;
    //                             line-height: 1.4;
    //                             color: #333;
    //                             padding: 10mm;
    //                         }

    //                         .header {
    //                             text-align: center;
    //                             margin-bottom: 15px;
    //                             padding-bottom: 10px;
    //                             border-bottom: 2px solid #4f46e5;
    //                         }

    //                         .titulo {
    //                             font-size: 14pt;
    //                             color: #1f2937;
    //                             margin: 0;
    //                             font-weight: 600;
    //                         }

    //                         .subtitulo {
    //                             font-size: 10pt;
    //                             color: #6b7280;
    //                             margin: 5px 0 8px 0;
    //                         }

    //                         .info-exportacion {
    //                             font-size: 8pt;
    //                             color: #6b7280;
    //                             margin-bottom: 10px;
    //                         }

    //                         /* Tabla principal (datos básicos) */
    //                         .tabla-principal {
    //                             width: 100%;
    //                             border-collapse: collapse;
    //                             margin-top: 15px;
    //                             margin-bottom: 20px;
    //                             font-size: 8pt;
    //                         }

    //                         .tabla-principal th {
    //                             background-color: #4f46e5;
    //                             color: white;
    //                             padding: 6px 4px;
    //                             text-align: left;
    //                             font-weight: 600;
    //                             border: 1px solid #ddd;
    //                         }

    //                         .tabla-principal td {
    //                             padding: 5px 4px;
    //                             border: 1px solid #ddd;
    //                         }

    //                         .tabla-principal tr:nth-child(even) {
    //                             background-color: #f8fafc;
    //                         }

    //                         /* Tabla de detalles (expandida - se mostrará si hay espacio) */
    //                         .seccion-detalles {
    //                             margin-top: 20px;
    //                             page-break-inside: avoid;
    //                         }

    //                         .tabla-detalles {
    //                             width: 100%;
    //                             border-collapse: collapse;
    //                             margin-top: 10px;
    //                             font-size: 8pt;
    //                         }

    //                         .tabla-detalles th {
    //                             background-color: #6b7280;
    //                             color: white;
    //                             padding: 5px 4px;
    //                             text-align: left;
    //                             font-weight: 600;
    //                             border: 1px solid #ddd;
    //                         }

    //                         .tabla-detalles td {
    //                             padding: 4px 4px;
    //                             border: 1px solid #ddd;
    //                         }

    //                         .footer {
    //                             margin-top: 25px;
    //                             padding-top: 8px;
    //                             border-top: 1px solid #e5e7eb;
    //                             text-align: center;
    //                             font-size: 8pt;
    //                             color: #6b7280;
    //                         }

    //                         .campo-label {
    //                             font-weight: 600;
    //                             color: #4b5563;
    //                             min-width: 100px;
    //                             display: inline-block;
    //                         }

    //                         .campo-valor {
    //                             color: #111827;
    //                         }

    //                         /* Ajustes para evitar cortes de página */
    //                         .no-break {
    //                             page-break-inside: avoid;
    //                         }
    //                     </style>
    //                 </head>
    //                 <body>
    //                     <div class="header">
    //                         <h1 class="titulo">INSTITUCIÓN EDUCATIVA</h1>
    //                         <div class="subtitulo">INFORMACIÓN COMPLETA DE ${titulo}</div>
    //                         <div class="info-exportacion">
    //                             Generado: ${fechaActual} | Total registros: ${datos.length}
    //                         </div>
    //                     </div>

    //                     <!-- Tabla principal con datos básicos -->
    //                     <table class="tabla-principal">
    //                         <thead>
    //                             <tr>
    //                                 <th width="5%">ID</th>
    //                                 <th width="20%">NOMBRE COMPLETO</th>
    //                                 <th width="10%">CÉDULA</th>
    //                                 <th width="8%">SEXO</th>
    //                                 <th width="8%">EDAD</th>
    //                                 <th width="15%">CARGO</th>
    //                                 <th width="15%">DEPENDENCIA</th>
    //                                 <th width="10%">TELÉFONO</th>
    //                                 <th width="9%">EMAIL</th>
    //                             </tr>
    //                         </thead>
    //                         <tbody>
    //                             ${datos.map(persona => `
    //                                 <tr>
    //                                     <td>${persona.id}</td>
    //                                     <td>${persona.nombreCompleto}</td>
    //                                     <td>${persona.cedula}</td>
    //                                     <td>${persona.sexo}</td>
    //                                     <td>${persona.edad}</td>
    //                                     <td>${persona.cargo_voucher}</td>
    //                                     <td>${persona.dependencia}</td>
    //                                     <td>${persona.telefono}</td>
    //                                     <td>${persona.correo}</td>
    //                                 </tr>
    //                             `).join('')}
    //                         </tbody>
    //                     </table>

    //                     <!-- Sección de detalles completos (uno por persona) -->
    //                     <div class="seccion-detalles">
    //                         <h3 style="font-size: 10pt; color: #374151; margin-bottom: 10px;">
    //                             DETALLES COMPLETOS POR PERSONAL
    //                         </h3>

    //                         ${datos.map((persona, index) => `
    //                             <div class="no-break" style="margin-bottom: ${index === datos.length - 1 ? '0' : '15px'}; padding: 10px; border: 1px solid #e5e7eb; border-radius: 4px; background-color: #f9fafb;">
    //                                 <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; padding-bottom: 5px; border-bottom: 1px solid #e5e7eb;">
    //                                     <h4 style="margin: 0; font-size: 9pt; color: #1f2937;">
    //                                         ${persona.nombreCompleto} (ID: ${persona.id})
    //                                     </h4>
    //                                     <span style="font-size: 8pt; color: #6b7280;">
    //                                         Persona ${index + 1} de ${datos.length}
    //                                     </span>
    //                                 </div>

    //                                 <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 5px; font-size: 8pt;">
    //                                     <!-- Columna izquierda -->
    //                                     <div>
    //                                         <div><span class="campo-label">Cédula:</span> <span class="campo-valor">${persona.cedula}</span></div>
    //                                         <div><span class="campo-label">Sexo:</span> <span class="campo-valor">${persona.sexo}</span></div>
    //                                         <div><span class="campo-label">Edad:</span> <span class="campo-valor">${persona.edad}</span></div>
    //                                         <div><span class="campo-label">Teléfono:</span> <span class="campo-valor">${persona.telefono}</span></div>
    //                                         <div><span class="campo-label">Email:</span> <span class="campo-valor">${persona.correo}</span></div>
    //                                         ${persona.codigo_cargo ? `<div><span class="campo-label">Código Cargo:</span> <span class="campo-valor">${persona.codigo_cargo}</span></div>` : ''}
    //                                         ${persona.codigo_dependencia ? `<div><span class="campo-label">Código Dependencia:</span> <span class="campo-valor">${persona.codigo_dependencia}</span></div>` : ''}
    //                                     </div>

    //                                     <!-- Columna derecha -->
    //                                     <div>
    //                                         <div><span class="campo-label">Cargo:</span> <span class="campo-valor">${persona.cargo_voucher}</span></div>
    //                                         <div><span class="campo-label">Dependencia:</span> <span class="campo-valor">${persona.dependencia}</span></div>
    //                                         ${persona.carga_horaria ? `<div><span class="campo-label">Carga Horaria:</span> <span class="campo-valor">${persona.carga_horaria}</span></div>` : ''}
    //                                         ${persona.fecha_ingreso_mppe ? `<div><span class="campo-label">Fecha Ingreso:</span> <span class="campo-valor">${this.formatFechaExportacion(persona.fecha_ingreso_mppe)}</span></div>` : ''}
    //                                         ${persona.antiguedad ? `<div><span class="campo-label">Antigüedad:</span> <span class="campo-valor">${persona.antiguedad}</span></div>` : ''}
    //                                         ${persona.titulos_profesionales ? `<div><span class="campo-label">Títulos:</span> <span class="campo-valor">${persona.titulos_profesionales.substring(0, 50)}${persona.titulos_profesionales.length > 50 ? '...' : ''}</span></div>` : ''}
    //                                         ${persona.tipo_titulo_label ? `<div><span class="campo-label">Tipo Título:</span> <span class="campo-valor">${persona.tipo_titulo_label}</span></div>` : ''}
    //                                     </div>

    //                                     <!-- Tallas (si existen) -->
    //                                     ${(persona.talla_franela || persona.talla_pantalon || persona.talla_zapato) ? `
    //                                     <div style="grid-column: span 2; margin-top: 5px; padding-top: 5px; border-top: 1px dashed #e5e7eb;">
    //                                         <div style="font-weight: 600; color: #4b5563; margin-bottom: 3px;">Tallas de Uniforme:</div>
    //                                         <div style="display: flex; gap: 10px; font-size: 7pt;">
    //                                             ${persona.talla_franela ? `<div><span style="font-weight: 600;">Franela:</span> ${persona.talla_franela}</div>` : ''}
    //                                             ${persona.talla_pantalon ? `<div><span style="font-weight: 600;">Pantalón:</span> ${persona.talla_pantalon}</div>` : ''}
    //                                             ${persona.talla_zapato ? `<div><span style="font-weight: 600;">Zapato:</span> ${persona.talla_zapato}</div>` : ''}
    //                                         </div>
    //                                     </div>
    //                                     ` : ''}
    //                                 </div>
    //                             </div>
    //                         `).join('')}
    //                     </div>

    //                     <div class="footer">
    //                         <p>Documento generado electrónicamente - ${datos.length} registros completos</p>
    //                         <p>Fecha de generación: ${fechaActual}</p>
    //                         <p style="font-size: 7pt; color: #9ca3af;">
    //                             * Este documento contiene información confidencial. Uso exclusivo institucional.
    //                         </p>
    //                     </div>
    //                 </body>
    //                 </html>
    //             `;

    //             console.log('Contenido HTML generado para PDF (primeros 500 caracteres):', contenidoHTML.substring(0, 500));

    //             // Crear elemento para html2pdf
    //             const element = document.createElement('div');
    //             element.innerHTML = contenidoHTML;

    //             // Configuración de html2pdf - orientación vertical para mejor legibilidad
    //             const opt = {
    //                 margin: [10, 10, 10, 10],
    //                 filename: `reporte_completo_${tipo}_${new Date().getTime()}.pdf`,
    //                 image: { type: 'jpeg', quality: 0.98 },
    //                 html2canvas: {
    //                     scale: 2,
    //                     useCORS: true,
    //                     logging: false
    //                 },
    //                 jsPDF: {
    //                     unit: 'mm',
    //                     format: 'a4',
    //                     orientation: 'portrait',  // Cambiado a portrait para mejor lectura
    //                     compress: true
    //                 }
    //             };

    //             console.log('Generando PDF con configuración:', opt);

    //             // Generar PDF
    //             await html2pdf().set(opt).from(element).save();

    //             console.log('PDF generado exitosamente');
    //             resolve();

    //         } catch (error) {
    //             console.error('Error generando PDF:', error);
    //             reject(error);
    //         }
    //     });
    // }

    static formatearDatosParaExportacion(datos) {
        return datos.map(persona => {
            // Extraer nombres y apellidos del nombreCompleto si no vienen separados
            let primer_nombre = persona.primer_nombre || '';
            let segundo_nombre = persona.segundo_nombre || '';
            let primer_apellido = persona.primer_apellido || '';
            let segundo_apellido = persona.segundo_apellido || '';

            // Si no tenemos los nombres separados pero sí nombreCompleto, intentar extraer
            if ((!primer_nombre || !primer_apellido) && persona.nombreCompleto) {
                const partes = persona.nombreCompleto.split(' ');
                if (partes.length >= 2) {
                    primer_nombre = partes[0] || '';
                    primer_apellido = partes[partes.length - 1] || '';

                    if (partes.length > 2) {
                        segundo_nombre = partes.slice(1, partes.length - 1).join(' ') || '';
                    }
                }
            }

            // Asegurar que todos los campos necesarios existan
            const datosFormateados = {
                // Identificación
                id: persona.id || '',
                nombreCompleto: persona.nombreCompleto ||
                    `${primer_nombre} ${segundo_nombre} ${primer_apellido} ${segundo_apellido}`.trim(),

                // Nombres separados (importante para Excel)
                primer_nombre: primer_nombre,
                segundo_nombre: segundo_nombre,
                primer_apellido: primer_apellido,
                segundo_apellido: segundo_apellido,

                // Datos personales
                cedula: persona.cedula || '',
                telefono: persona.telefono || '',
                correo: persona.correo || '',
                sexo: persona.sexo ? persona.sexo.charAt(0).toUpperCase() + persona.sexo.slice(1) : '',
                fecha_nacimiento: persona.fecha_nacimiento || '',
                edad: persona.edad || '',

                // Información laboral
                cargo_voucher: persona.cargo_voucher || '',
                codigo_cargo: persona.codigo_cargo || '',
                dependencia: persona.dependencia || '',
                codigo_dependencia: persona.codigo_dependencia || '',
                carga_horaria: persona.carga_horaria || '',
                fecha_ingreso_mppe: persona.fecha_ingreso_mppe || '',
                antiguedad: persona.antiguedad || '',

                // Formación académica
                titulos_profesionales: persona.titulos_profesionales || '',
                tipo_titulo: persona.tipo_titulo || '',
                tipo_titulo_label: persona.tipo_titulo_label || '',

                // Tallas
                talla_franela: persona.talla_franela || '',
                talla_pantalon: persona.talla_pantalon || '',
                talla_zapato: persona.talla_zapato || '',

                // Fechas del sistema
                fecha_registro: persona.fecha_registro || '',
                fecha_actualizacion: persona.fecha_actualizacion || '',

                // Tipo de personal
                tipo: persona.tipo || '',
                tipoLabel: persona.tipoLabel || '',

                // Campos adicionales que pueden venir del adaptador
                sexoLabel: persona.sexoLabel || '',
                tipoColor: persona.tipoColor || ''
            };

            // Debug: verificar que tenemos todos los campos
            console.log('Datos formateados para persona ID', persona.id, ':', {
                tieneNombresSeparados: !!datosFormateados.primer_nombre && !!datosFormateados.primer_apellido,
                campos: Object.keys(datosFormateados).filter(key => datosFormateados[key]),
                valores: datosFormateados
            });

            return datosFormateados;
        });
    }


    static async exportarAPDF(datosOriginales, tipo) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log('Iniciando exportación PDF con:', {
                    cantidadDatos: datosOriginales.length,
                    tipo: tipo,
                    primerRegistro: datosOriginales[0]
                });

                if (!datosOriginales || datosOriginales.length === 0) {
                    throw new Error('No hay datos para exportar');
                }

                // Formatear datos para asegurar consistencia
                const datos = this.formatearDatosParaExportacion(datosOriginales);

                const fechaActual = new Date().toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });

                // Título según tipo
                const tituloPorTipo = {
                    'docente': 'DOCENTES',
                    'administrativo': 'PERSONAL ADMINISTRATIVO',
                    'obrero': 'PERSONAL OBRERO'
                };

                const titulo = tituloPorTipo[tipo] || 'PERSONAL';

                // Función auxiliar para formatear fechas dentro del HTML
                const formatFechaHTML = (fechaString) => {
                    if (!fechaString) return '';
                    try {
                        const fecha = new Date(fechaString);
                        if (isNaN(fecha.getTime())) return '';
                        return fecha.toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        });
                    } catch (error) {
                        return '';
                    }
                };

                // Función auxiliar para truncar texto largo
                const truncarTexto = (texto, maxLength = 50) => {
                    if (!texto) return '';
                    if (texto.length <= maxLength) return texto;
                    return texto.substring(0, maxLength) + '...';
                };

                // Construir tabla HTML con TODOS los datos
                const contenidoHTML = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        /* Estilos generales */
                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }
                        
                        body {
                            font-family: 'Arial', 'Helvetica', sans-serif;
                            font-size: 10pt;
                            line-height: 1.4;
                            color: #333;
                            padding: 15mm;
                            background: white;
                        }
                        
                        /* Encabezado */
                        .header {
                            text-align: center;
                            margin-bottom: 20px;
                            padding-bottom: 15px;
                            border-bottom: 3px solid #4f46e5;
                        }
                        
                        .titulo-principal {
                            font-size: 18pt;
                            color: #1f2937;
                            margin: 0;
                            font-weight: bold;
                            margin-bottom: 5px;
                        }
                        
                        .subtitulo {
                            font-size: 12pt;
                            color: #6b7280;
                            margin-bottom: 10px;
                            font-weight: 500;
                        }
                        
                        .info-exportacion {
                            font-size: 10pt;
                            color: #6b7280;
                            margin-bottom: 15px;
                        }
                        
                        /* Tabla principal */
                        .tabla-principal {
                            width: 100%;
                            border-collapse: collapse;
                            margin: 20px 0;
                            font-size: 9pt;
                            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                        }
                        
                        .tabla-principal thead {
                            background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
                            color: white;
                        }
                        
                        .tabla-principal th {
                            padding: 10px 8px;
                            text-align: left;
                            font-weight: 600;
                            border-right: 1px solid rgba(255,255,255,0.2);
                        }
                        
                        .tabla-principal th:last-child {
                            border-right: none;
                        }
                        
                        .tabla-principal td {
                            padding: 8px;
                            border-bottom: 1px solid #e5e7eb;
                            border-right: 1px solid #e5e7eb;
                        }
                        
                        .tabla-principal td:last-child {
                            border-right: none;
                        }
                        
                        .tabla-principal tr:nth-child(even) {
                            background-color: #f9fafb;
                        }
                        
                        .tabla-principal tr:hover {
                            background-color: #f3f4f6;
                        }
                        
                        /* Sección de detalles por persona */
                        .seccion-persona {
                            margin: 25px 0;
                            padding: 20px;
                            border: 1px solid #e5e7eb;
                            border-radius: 8px;
                            background: #ffffff;
                            page-break-inside: avoid;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                        }
                        
                        .titulo-persona {
                            font-size: 14pt;
                            color: #1f2937;
                            margin-bottom: 15px;
                            padding-bottom: 10px;
                            border-bottom: 2px solid #4f46e5;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        }
                        
                        .badge {
                            background: #4f46e5;
                            color: white;
                            padding: 4px 10px;
                            border-radius: 12px;
                            font-size: 9pt;
                            font-weight: 500;
                        }
                        
                        /* Grid de información */
                        .grid-info {
                            display: grid;
                            grid-template-columns: repeat(2, 1fr);
                            gap: 15px;
                            margin-bottom: 20px;
                        }
                        
                        .info-grupo {
                            background: #f8fafc;
                            padding: 15px;
                            border-radius: 6px;
                            border-left: 4px solid #4f46e5;
                        }
                        
                        .info-grupo h4 {
                            color: #374151;
                            margin-bottom: 10px;
                            font-size: 11pt;
                            font-weight: 600;
                        }
                        
                        .info-item {
                            margin-bottom: 8px;
                            display: flex;
                        }
                        
                        .info-label {
                            font-weight: 600;
                            color: #4b5563;
                            min-width: 140px;
                            flex-shrink: 0;
                        }
                        
                        .info-value {
                            color: #111827;
                            flex: 1;
                        }
                        
                        /* Tallas */
                        .tallas-container {
                            display: flex;
                            gap: 15px;
                            margin-top: 10px;
                            flex-wrap: wrap;
                        }
                        
                        .talla-item {
                            flex: 1;
                            min-width: 100px;
                            text-align: center;
                            padding: 12px;
                            background: #f0f9ff;
                            border: 1px solid #bae6fd;
                            border-radius: 6px;
                        }
                        
                        .talla-tipo {
                            font-size: 9pt;
                            color: #0369a1;
                            font-weight: 600;
                            margin-bottom: 5px;
                        }
                        
                        .talla-valor {
                            font-size: 14pt;
                            color: #0c4a6e;
                            font-weight: bold;
                        }
                        
                        /* Footer */
                        .footer {
                            margin-top: 40px;
                            padding-top: 15px;
                            border-top: 2px solid #e5e7eb;
                            text-align: center;
                            font-size: 9pt;
                            color: #6b7280;
                        }
                        
                        .total-registros {
                            font-weight: 600;
                            color: #4f46e5;
                            margin-bottom: 5px;
                        }
                        
                        /* Utilidades */
                        .text-center { text-align: center; }
                        .mb-2 { margin-bottom: 10px; }
                        .mt-3 { margin-top: 15px; }
                        .text-muted { color: #6b7280; }
                        
                        /* Para evitar cortes de página */
                        @media print {
                            @page {
                                margin: 15mm;
                            }
                            
                            .seccion-persona {
                                page-break-inside: avoid;
                            }
                            
                            body {
                                padding: 0;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1 class="titulo-principal">INSTITUCIÓN EDUCATIVA</h1>
                        <div class="subtitulo">INFORME COMPLETO DE ${titulo}</div>
                        <div class="info-exportacion">
                            Generado: ${fechaActual} | Total de registros: ${datos.length}
                        </div>
                    </div>
                    
                    <!-- Resumen general -->
                    <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #0ea5e9;">
                        <h3 style="color: #0369a1; margin-bottom: 10px; font-size: 12pt;">
                            RESUMEN DEL INFORME
                        </h3>
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; font-size: 10pt;">
                            <div>
                                <div style="font-weight: 600; color: #4b5563;">Total Personas:</div>
                                <div style="font-size: 14pt; color: #1e40af; font-weight: bold;">${datos.length}</div>
                            </div>
    <div>
        <div style="font-weight: 600; color: #4b5563;">Hombres:</div>
        <div style="font-size: 14pt; color: #3b82f6; font-weight: bold;">${datos.filter(p => {
                    const sexo = p.sexo ? p.sexo.toLowerCase() : '';
                    return sexo === 'masculino' || sexo === 'hombre' || sexo === 'm';
                }).length}</div>
    </div>
    <div>
        <div style="font-weight: 600; color: #4b5563;">Mujeres:</div>
        <div style="font-size: 14pt; color: #ec4899; font-weight: bold;">${datos.filter(p => {
                    const sexo = p.sexo ? p.sexo.toLowerCase() : '';
                    return sexo === 'femenino' || sexo === 'mujer' || sexo === 'f';
                }).length}</div>
    </div>
    <div>
        <div style="font-weight: 600; color: #4b5563;">Prom. Edad:</div>
        <div style="font-size: 14pt; color: #10b981; font-weight: bold;">
            ${datos.length > 0 ?
                        Math.round(datos.reduce((acc, p) => acc + (parseInt(p.edad) || 0), 0) / datos.length) + ' años' :
                        'N/A'
                    }
        </div>
                        </div>
                    </div>
                    
                    <!-- Tabla principal -->
                    <h3 style="color: #374151; margin: 25px 0 15px 0; font-size: 13pt;">
                        LISTA DE PERSONAL
                    </h3>
                    <table class="tabla-principal">
                        <thead>
                            <tr>
                                <th width="5%">ID</th>
                                <th width="25%">NOMBRE COMPLETO</th>
                                <th width="12%">CÉDULA</th>
                                <th width="8%">SEXO</th>
                                <th width="8%">EDAD</th>
                                <th width="20%">CARGO</th>
                                <th width="22%">DEPENDENCIA</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${datos.map(persona => `
                                <tr>
                                    <td class="text-center">${persona.id}</td>
                                    <td><strong>${persona.nombreCompleto}</strong></td>
                                    <td>${persona.cedula}</td>
                                    <td class="text-center">${persona.sexo ? persona.sexo.charAt(0).toUpperCase() + persona.sexo.slice(1) : ''}</td>
                                    <td class="text-center">${persona.edad || ''}</td>
                                    <td>${persona.cargo_voucher}</td>
                                    <td>${persona.dependencia}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    
                    <!-- Detalles completos por persona -->
                    <h3 style="color: #374151; margin: 30px 0 20px 0; font-size: 13pt; padding-bottom: 10px; border-bottom: 2px solid #e5e7eb;">
                        INFORMACIÓN DETALLADA POR PERSONA
                    </h3>
                    
                    ${datos.map((persona, index) => `
                        <div class="seccion-persona">
                            <div class="titulo-persona">
                                <span>${persona.nombreCompleto}</span>
                                <span class="badge">ID: ${persona.id} | Persona ${index + 1} de ${datos.length}</span>
                            </div>
                            
                            <div class="grid-info">
                                <!-- Columna izquierda: Información Personal -->
                                <div class="info-grupo">
                                    <h4>📋 INFORMACIÓN PERSONAL</h4>
                                    <div class="info-item">
                                        <span class="info-label">Cédula:</span>
                                        <span class="info-value">${persona.cedula}</span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-label">Sexo:</span>
                                        <span class="info-value">${persona.sexo ? persona.sexo.charAt(0).toUpperCase() + persona.sexo.slice(1) : ''}</span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-label">Edad:</span>
                                        <span class="info-value">${persona.edad || ''} años</span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-label">Teléfono:</span>
                                        <span class="info-value">${persona.telefono}</span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-label">Correo:</span>
                                        <span class="info-value">${persona.correo}</span>
                                    </div>
                                    ${persona.fecha_nacimiento ? `
                                    <div class="info-item">
                                        <span class="info-label">Fecha Nacimiento:</span>
                                        <span class="info-value">${formatFechaHTML(persona.fecha_nacimiento)}</span>
                                    </div>
                                    ` : ''}
                                </div>
                                
                                <!-- Columna derecha: Información Laboral -->
                                <div class="info-grupo">
                                    <h4>💼 INFORMACIÓN LABORAL</h4>
                                    <div class="info-item">
                                        <span class="info-label">Cargo:</span>
                                        <span class="info-value">${persona.cargo_voucher}</span>
                                    </div>
                                    ${persona.codigo_cargo ? `
                                    <div class="info-item">
                                        <span class="info-label">Código Cargo:</span>
                                        <span class="info-value">${persona.codigo_cargo}</span>
                                    </div>
                                    ` : ''}
                                    <div class="info-item">
                                        <span class="info-label">Dependencia:</span>
                                        <span class="info-value">${persona.dependencia}</span>
                                    </div>
                                    ${persona.codigo_dependencia ? `
                                    <div class="info-item">
                                        <span class="info-label">Código Dependencia:</span>
                                        <span class="info-value">${persona.codigo_dependencia}</span>
                                    </div>
                                    ` : ''}
                                    ${persona.carga_horaria ? `
                                    <div class="info-item">
                                        <span class="info-label">Carga Horaria:</span>
                                        <span class="info-value">${persona.carga_horaria} horas</span>
                                    </div>
                                    ` : ''}
                                    ${persona.fecha_ingreso_mppe ? `
                                    <div class="info-item">
                                        <span class="info-label">Fecha Ingreso MPPE:</span>
                                        <span class="info-value">${formatFechaHTML(persona.fecha_ingreso_mppe)}</span>
                                    </div>
                                    ` : ''}
                                    ${persona.antiguedad ? `
                                    <div class="info-item">
                                        <span class="info-label">Antigüedad:</span>
                                        <span class="info-value">${persona.antiguedad} años</span>
                                    </div>
                                    ` : ''}
                                </div>
                                
                                <!-- Formación Académica -->
                                ${(persona.titulos_profesionales || persona.tipo_titulo_label) ? `
                                <div class="info-grupo" style="grid-column: span 2;">
                                    <h4>🎓 FORMACIÓN ACADÉMICA</h4>
                                    ${persona.titulos_profesionales ? `
                                    <div class="info-item">
                                        <span class="info-label">Títulos Profesionales:</span>
                                        <span class="info-value">${truncarTexto(persona.titulos_profesionales, 100)}</span>
                                    </div>
                                    ` : ''}
                                    ${persona.tipo_titulo_label ? `
                                    <div class="info-item">
                                        <span class="info-label">Tipo de Título:</span>
                                        <span class="info-value">${persona.tipo_titulo_label}</span>
                                    </div>
                                    ` : ''}
                                </div>
                                ` : ''}
                            </div>
                            
                            <!-- Tallas de Uniforme -->
                            ${(persona.talla_franela || persona.talla_pantalon || persona.talla_zapato) ? `
                            <div style="margin-top: 20px;">
                                <h4 style="color: #374151; margin-bottom: 10px; font-size: 11pt;">
                                    👕 TALLAS DE UNIFORME
                                </h4>
                                <div class="tallas-container">
                                    ${persona.talla_franela ? `
                                    <div class="talla-item">
                                        <div class="talla-tipo">FRANELA</div>
                                        <div class="talla-valor">${persona.talla_franela}</div>
                                    </div>
                                    ` : ''}
                                    
                                    ${persona.talla_pantalon ? `
                                    <div class="talla-item">
                                        <div class="talla-tipo">PANTALÓN</div>
                                        <div class="talla-valor">${persona.talla_pantalon}</div>
                                    </div>
                                    ` : ''}
                                    
                                    ${persona.talla_zapato ? `
                                    <div class="talla-item">
                                        <div class="talla-tipo">ZAPATO</div>
                                        <div class="talla-valor">${persona.talla_zapato}</div>
                                    </div>
                                    ` : ''}
                                </div>
                            </div>
                            ` : ''}
                            
                            <!-- Fechas del sistema -->
                            <div style="margin-top: 20px; padding: 15px; background: #f8fafc; border-radius: 6px; border-left: 4px solid #9ca3af;">
                                <h4 style="color: #4b5563; margin-bottom: 10px; font-size: 10pt;">
                                    📅 INFORMACIÓN DEL SISTEMA
                                </h4>
                                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; font-size: 9pt;">
                                    ${persona.fecha_registro ? `
                                    <div>
                                        <span style="font-weight: 600; color: #4b5563;">Fecha de Registro:</span>
                                        <div style="color: #111827;">${formatFechaHTML(persona.fecha_registro)}</div>
                                    </div>
                                    ` : ''}
                                    
                                    ${persona.fecha_actualizacion ? `
                                    <div>
                                        <span style="font-weight: 600; color: #4b5563;">Última Actualización:</span>
                                        <div style="color: #111827;">${formatFechaHTML(persona.fecha_actualizacion)}</div>
                                    </div>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                    
                    <!-- Footer -->
                    <div class="footer">
                        <div class="total-registros">
                            Total de personas incluidas en este informe: ${datos.length}
                        </div>
                        <div style="margin-top: 5px;">
                            Documento generado electrónicamente el ${fechaActual}
                        </div>
                        <div style="font-size: 8pt; color: #9ca3af; margin-top: 10px;">
                            <strong>NOTA:</strong> Este documento es confidencial y para uso exclusivo de la institución.
                            La información contenida está protegida por la ley de protección de datos.
                        </div>
                    </div>
                </body>
                </html>
            `;

                console.log('HTML generado para PDF - longitud:', contenidoHTML.length);

                // Crear elemento para html2pdf
                const element = document.createElement('div');
                element.innerHTML = contenidoHTML;

                // Configuración optimizada para html2pdf
                const opt = {
                    margin: [15, 15, 15, 15], // [top, right, bottom, left] en mm
                    filename: `informe_completo_${tipo}_${new Date().getTime()}.pdf`,
                    image: {
                        type: 'jpeg',
                        quality: 0.98
                    },
                    html2canvas: {
                        scale: 2,
                        useCORS: true,
                        logging: true,
                        allowTaint: true,
                        letterRendering: true,
                        backgroundColor: '#ffffff'
                    },
                    jsPDF: {
                        unit: 'mm',
                        format: 'a4',
                        orientation: 'portrait',
                        compress: true,
                        hotfixes: ["px_scaling"]
                    },
                    pagebreak: {
                        mode: ['avoid-all', 'css', 'legacy']
                    }
                };

                console.log('Generando PDF con html2pdf...');

                // Generar PDF con timeout para evitar problemas
                await new Promise((resolvePdf, rejectPdf) => {
                    const timeout = setTimeout(() => {
                        rejectPdf(new Error('Timeout generando PDF'));
                    }, 30000); // 30 segundos timeout

                    html2pdf()
                        .set(opt)
                        .from(element)
                        .save()
                        .then(() => {
                            clearTimeout(timeout);
                            resolvePdf();
                        })
                        .catch(error => {
                            clearTimeout(timeout);
                            rejectPdf(error);
                        });
                });

                console.log('PDF generado exitosamente');
                resolve();

            } catch (error) {
                console.error('Error detallado generando PDF:', error);
                reject(error);
            }
        });
    }

    // Exportar a Excel (ya está funcionando, pero asegurémonos)
    // static async exportarAExcel(datosOriginales, tipo) {
    //     return new Promise((resolve, reject) => {
    //         try {
    //             console.log('Iniciando exportación Excel con:', {
    //                 cantidadDatos: datosOriginales.length,
    //                 tipo: tipo
    //             });

    //             if (!datosOriginales || datosOriginales.length === 0) {
    //                 throw new Error('No hay datos para exportar');
    //             }

    //             // Formatear datos para asegurar consistencia
    //             const datos = this.formatearDatosParaExportacion(datosOriginales);

    //             console.log('Datos formateados para Excel:', datos[0]);

    //             // Preparar datos con TODOS los campos
    //             const datosFormateados = datos.map(persona => {
    //                 return {
    //                     // Identificación
    //                     'ID': persona.id,
    //                     'Nombre Completo': persona.nombreCompleto,
    //                     'Primer Nombre': persona.primer_nombre || '',
    //                     'Segundo Nombre': persona.segundo_nombre || '',
    //                     'Primer Apellido': persona.primer_apellido || '',
    //                     'Segundo Apellido': persona.segundo_apellido || '',

    //                     // Documentación
    //                     'Cédula': persona.cedula,
    //                     'Teléfono': persona.telefono,
    //                     'Correo': persona.correo,
    //                     'Sexo': persona.sexo,

    //                     // Datos personales
    //                     'Fecha Nacimiento': this.formatFechaExportacion(persona.fecha_nacimiento),
    //                     'Edad': persona.edad,

    //                     // Información laboral
    //                     'Cargo': persona.cargo_voucher,
    //                     'Código Cargo': persona.codigo_cargo,
    //                     'Dependencia': persona.dependencia,
    //                     'Código Dependencia': persona.codigo_dependencia,
    //                     'Carga Horaria': persona.carga_horaria,
    //                     'Fecha Ingreso MPPE': this.formatFechaExportacion(persona.fecha_ingreso_mppe),
    //                     'Antigüedad': persona.antiguedad,

    //                     // Formación académica
    //                     'Títulos Profesionales': persona.titulos_profesionales,
    //                     'Tipo de Título': persona.tipo_titulo_label || persona.tipo_titulo,

    //                     // Tallas
    //                     'Talla Franela': persona.talla_franela,
    //                     'Talla Pantalón': persona.talla_pantalon,
    //                     'Talla Zapato': persona.talla_zapato,

    //                     // Fechas del sistema
    //                     'Fecha Registro': this.formatFechaExportacion(persona.fecha_registro),
    //                     'Última Actualización': this.formatFechaExportacion(persona.fecha_actualizacion)
    //                 };
    //             });

    //             // Crear workbook
    //             const wb = XLSX.utils.book_new();
    //             const ws = XLSX.utils.json_to_sheet(datosFormateados);

    //             // Establecer anchos de columnas
    //             const wscols = [
    //                 { wch: 5 },   // ID
    //                 { wch: 30 },  // Nombre Completo
    //                 { wch: 15 },  // Primer Nombre
    //                 { wch: 15 },  // Segundo Nombre
    //                 { wch: 15 },  // Primer Apellido
    //                 { wch: 15 },  // Segundo Apellido
    //                 { wch: 12 },  // Cédula
    //                 { wch: 12 },  // Teléfono
    //                 { wch: 25 },  // Correo
    //                 { wch: 8 },   // Sexo
    //                 { wch: 12 },  // Fecha Nacimiento
    //                 { wch: 5 },   // Edad
    //                 { wch: 25 },  // Cargo
    //                 { wch: 15 },  // Código Cargo
    //                 { wch: 25 },  // Dependencia
    //                 { wch: 15 },  // Código Dependencia
    //                 { wch: 10 },  // Carga Horaria
    //                 { wch: 12 },  // Fecha Ingreso
    //                 { wch: 10 },  // Antigüedad
    //                 { wch: 40 },  // Títulos
    //                 { wch: 15 },  // Tipo Título
    //                 { wch: 10 },  // Talla Franela
    //                 { wch: 10 },  // Talla Pantalón
    //                 { wch: 10 },  // Talla Zapato
    //                 { wch: 12 },  // Fecha Registro
    //                 { wch: 12 }   // Última Actualización
    //             ];
    //             ws['!cols'] = wscols;

    //             // Agregar hoja de datos
    //             XLSX.utils.book_append_sheet(wb, ws, tipo.toUpperCase());

    //             // Crear hoja de información
    //             const infoData = [
    //                 ['INFORMACIÓN DEL REPORTE'],
    //                 [''],
    //                 ['Tipo de Personal:', tipo.toUpperCase()],
    //                 ['Total de Registros:', datos.length],
    //                 ['Fecha de Generación:', new Date().toLocaleDateString('es-ES')],
    //                 ['Hora de Generación:', new Date().toLocaleTimeString('es-ES')],
    //                 [''],
    //                 ['NOTA: Este documento contiene información completa del personal.']
    //             ];
    //             const wsInfo = XLSX.utils.aoa_to_sheet(infoData);
    //             XLSX.utils.book_append_sheet(wb, wsInfo, 'Información');

    //             // Generar archivo
    //             const nombreArchivo = `reporte_completo_${tipo}_${new Date().getTime()}.xlsx`;
    //             console.log('Generando archivo Excel:', nombreArchivo);

    //             XLSX.writeFile(wb, nombreArchivo);

    //             console.log('Excel generado exitosamente');
    //             resolve();

    //         } catch (error) {
    //             console.error('Error generando Excel:', error);
    //             reject(error);
    //         }
    //     });
    // }

    static async exportarAExcel(datosOriginales, tipo) {
        return new Promise((resolve, reject) => {
            try {
                console.log('Iniciando exportación Excel con:', {
                    cantidadDatos: datosOriginales.length,
                    tipo: tipo
                });

                if (!datosOriginales || datosOriginales.length === 0) {
                    throw new Error('No hay datos para exportar');
                }

                // Formatear datos para asegurar consistencia
                const datos = this.formatearDatosParaExportacion(datosOriginales);

                console.log('Primer registro formateado para Excel:', datos[0]);
                console.log('Campos disponibles en primer registro:', Object.keys(datos[0]));

                // Preparar datos con TODOS los campos (ordenados lógicamente)
                const datosFormateados = datos.map(persona => {
                    return {
                        // 1. IDENTIFICACIÓN
                        'ID': persona.id,
                        'Nombre Completo': persona.nombreCompleto,
                        'Primer Nombre': persona.primer_nombre,
                        'Segundo Nombre': persona.segundo_nombre,
                        'Primer Apellido': persona.primer_apellido,
                        'Segundo Apellido': persona.segundo_apellido,

                        // 2. DOCUMENTACIÓN
                        'Cédula': persona.cedula,
                        'Teléfono': persona.telefono,
                        'Correo Electrónico': persona.correo,
                        'Sexo': persona.sexo,
                        'Sexo (Label)': persona.sexoLabel || '',

                        // 3. DATOS PERSONALES
                        'Fecha de Nacimiento': this.formatFechaExportacion(persona.fecha_nacimiento),
                        'Edad': persona.edad,

                        // 4. INFORMACIÓN LABORAL
                        'Cargo': persona.cargo_voucher,
                        'Código de Cargo': persona.codigo_cargo,
                        'Dependencia': persona.dependencia,
                        'Código de Dependencia': persona.codigo_dependencia,
                        'Carga Horaria': persona.carga_horaria,
                        'Fecha de Ingreso al MPPE': this.formatFechaExportacion(persona.fecha_ingreso_mppe),
                        'Antigüedad (años)': persona.antiguedad,

                        // 5. FORMACIÓN ACADÉMICA
                        'Títulos Profesionales': persona.titulos_profesionales,
                        'Tipo de Título': persona.tipo_titulo_label || persona.tipo_titulo,

                        // 6. TALLAS DE UNIFORME
                        'Talla de Franela': persona.talla_franela,
                        'Talla de Pantalón': persona.talla_pantalon,
                        'Talla de Zapato': persona.talla_zapato,

                        // 7. INFORMACIÓN DEL SISTEMA
                        'Fecha de Registro': this.formatFechaExportacion(persona.fecha_registro),
                        'Última Actualización': this.formatFechaExportacion(persona.fecha_actualizacion),

                        // 8. TIPO DE PERSONAL
                        'Tipo de Personal': persona.tipo,
                        'Tipo de Personal (Label)': persona.tipoLabel || ''
                    };
                });

                console.log('Primer registro preparado para Excel sheet:', datosFormateados[0]);

                // Crear workbook
                const wb = XLSX.utils.book_new();

                // Hoja 1: Datos principales
                const ws = XLSX.utils.json_to_sheet(datosFormateados);

                // Establecer anchos de columnas optimizados
                const wscols = [
                    // 1. IDENTIFICACIÓN
                    { wch: 5 },   // ID
                    { wch: 30 },  // Nombre Completo
                    { wch: 15 },  // Primer Nombre
                    { wch: 15 },  // Segundo Nombre
                    { wch: 15 },  // Primer Apellido
                    { wch: 15 },  // Segundo Apellido

                    // 2. DOCUMENTACIÓN
                    { wch: 12 },  // Cédula
                    { wch: 12 },  // Teléfono
                    { wch: 25 },  // Correo Electrónico
                    { wch: 10 },  // Sexo
                    { wch: 12 },  // Sexo (Label)

                    // 3. DATOS PERSONALES
                    { wch: 15 },  // Fecha de Nacimiento
                    { wch: 5 },   // Edad

                    // 4. INFORMACIÓN LABORAL
                    { wch: 25 },  // Cargo
                    { wch: 15 },  // Código de Cargo
                    { wch: 25 },  // Dependencia
                    { wch: 15 },  // Código de Dependencia
                    { wch: 12 },  // Carga Horaria
                    { wch: 15 },  // Fecha de Ingreso al MPPE
                    { wch: 12 },  // Antigüedad (años)

                    // 5. FORMACIÓN ACADÉMICA
                    { wch: 40 },  // Títulos Profesionales
                    { wch: 20 },  // Tipo de Título

                    // 6. TALLAS DE UNIFORME
                    { wch: 12 },  // Talla de Franela
                    { wch: 12 },  // Talla de Pantalón
                    { wch: 12 },  // Talla de Zapato

                    // 7. INFORMACIÓN DEL SISTEMA
                    { wch: 15 },  // Fecha de Registro
                    { wch: 15 },  // Última Actualización

                    // 8. TIPO DE PERSONAL
                    { wch: 15 },  // Tipo de Personal
                    { wch: 20 }   // Tipo de Personal (Label)
                ];

                ws['!cols'] = wscols;

                // Agregar hoja de datos
                XLSX.utils.book_append_sheet(wb, ws, 'DATOS COMPLETOS');

                // Hoja 2: Resumen estadístico
                const fechaActual = new Date().toLocaleDateString('es-ES');
                const horaActual = new Date().toLocaleTimeString('es-ES');

                const totalPersonas = datos.length;
                const hombres = datos.filter(p => {
                    const sexo = p.sexo ? p.sexo.toLowerCase() : '';
                    return sexo.includes('masculino') || sexo.includes('hombre') || sexo === 'm';
                }).length;

                const mujeres = datos.filter(p => {
                    const sexo = p.sexo ? p.sexo.toLowerCase() : '';
                    return sexo.includes('femenino') || sexo.includes('mujer') || sexo === 'f';
                }).length;

                const otros = totalPersonas - hombres - mujeres;

                const sumaEdades = datos.reduce((acc, p) => {
                    const edad = parseInt(p.edad);
                    return acc + (isNaN(edad) ? 0 : edad);
                }, 0);

                const promedioEdad = totalPersonas > 0 ? Math.round(sumaEdades / totalPersonas) : 0;

                const infoData = [
                    ['INFORME ESTADÍSTICO', '', '', ''],
                    ['', '', '', ''],
                    ['Tipo de Personal:', tipo.toUpperCase(), '', ''],
                    ['Fecha de Generación:', fechaActual, '', ''],
                    ['Hora de Generación:', horaActual, '', ''],
                    ['Total de Registros:', totalPersonas, '', ''],
                    ['', '', '', ''],
                    ['DISTRIBUCIÓN POR SEXO', 'CANTIDAD', 'PORCENTAJE', ''],
                    ['Hombres', hombres, totalPersonas > 0 ? `${Math.round((hombres / totalPersonas) * 100)}%` : '0%', ''],
                    ['Mujeres', mujeres, totalPersonas > 0 ? `${Math.round((mujeres / totalPersonas) * 100)}%` : '0%', ''],
                    ['Otros', otros, totalPersonas > 0 ? `${Math.round((otros / totalPersonas) * 100)}%` : '0%', ''],
                    ['', '', '', ''],
                    ['ESTADÍSTICAS ADICIONALES', '', '', ''],
                    ['Promedio de Edad:', `${promedioEdad} años`, '', ''],
                    ['', '', '', ''],
                    ['CAMPOS INCLUIDOS EN EL REPORTE', '', '', ''],
                    ['• Información personal completa (nombres, cédula, contacto)', '', '', ''],
                    ['• Datos laborales (cargo, dependencia, carga horaria)', '', '', ''],
                    ['• Formación académica (títulos profesionales)', '', '', ''],
                    ['• Tallas de uniforme', '', '', ''],
                    ['• Fechas importantes (nacimiento, ingreso, registro)', '', '', ''],
                    ['', '', '', ''],
                    ['NOTAS IMPORTANTES', '', '', ''],
                    ['Este archivo contiene información confidencial.', '', '', ''],
                    ['Uso exclusivo para fines institucionales.', '', '', ''],
                    ['Protegido por la ley de protección de datos personales.', '', '', '']
                ];

                const wsInfo = XLSX.utils.aoa_to_sheet(infoData);

                // Establecer anchos para hoja de información
                wsInfo['!cols'] = [
                    { wch: 40 },  // Descripción
                    { wch: 15 },  // Valor
                    { wch: 15 },  // Porcentaje
                    { wch: 10 }   // Espacio
                ];

                // Combinar celdas para títulos
                wsInfo['!merges'] = [
                    { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } },  // Título
                    { s: { r: 7, c: 0 }, e: { r: 7, c: 3 } },  // Distribución
                    { s: { r: 13, c: 0 }, e: { r: 13, c: 3 } }, // Estadísticas
                    { s: { r: 15, c: 0 }, e: { r: 15, c: 3 } }, // Campos
                    { s: { r: 22, c: 0 }, e: { r: 22, c: 3 } }  // Notas
                ];

                XLSX.utils.book_append_sheet(wb, wsInfo, 'INFORMACIÓN');

                // Hoja 3: Lista simplificada (para vistas rápidas)
                const datosSimplificados = datos.map(persona => ({
                    'ID': persona.id,
                    'Nombre': persona.nombreCompleto,
                    'Cédula': persona.cedula,
                    'Cargo': persona.cargo_voucher,
                    'Dependencia': persona.dependencia,
                    'Teléfono': persona.telefono,
                    'Correo': persona.correo,
                    'Sexo': persona.sexo
                }));

                const wsSimple = XLSX.utils.json_to_sheet(datosSimplificados);
                wsSimple['!cols'] = [
                    { wch: 5 },   // ID
                    { wch: 30 },  // Nombre
                    { wch: 12 },  // Cédula
                    { wch: 25 },  // Cargo
                    { wch: 25 },  // Dependencia
                    { wch: 12 },  // Teléfono
                    { wch: 25 },  // Correo
                    { wch: 10 }   // Sexo
                ];

                XLSX.utils.book_append_sheet(wb, wsSimple, 'VISTA RÁPIDA');

                // Generar archivo
                const nombreArchivo = `reporte_completo_${tipo}_${new Date().getTime()}.xlsx`;
                console.log('Generando archivo Excel:', nombreArchivo);

                XLSX.writeFile(wb, nombreArchivo);

                console.log('Excel generado exitosamente con', datos.length, 'registros');
                resolve();

            } catch (error) {
                console.error('Error detallado generando Excel:', error);
                reject(error);
            }
        });
    }

    // Exportar a CSV
    static async exportarACSV(datos, tipo) {
        return new Promise((resolve, reject) => {
            try {
                if (!datos || datos.length === 0) {
                    throw new Error('No hay datos para exportar');
                }

                // Definir encabezados con todos los campos importantes
                const headers = [
                    'ID', 'Nombre Completo', 'Cédula', 'Sexo', 'Edad',
                    'Teléfono', 'Correo', 'Cargo', 'Código Cargo',
                    'Dependencia', 'Código Dependencia', 'Carga Horaria',
                    'Fecha Ingreso MPPE', 'Antigüedad', 'Títulos Profesionales',
                    'Tipo de Título', 'Talla Franela', 'Talla Pantalón', 'Talla Zapato'
                ];

                // Preparar datos
                const csvData = datos.map(persona => [
                    persona.id || '',
                    `"${persona.nombreCompleto || ''}"`,
                    persona.cedula || '',
                    persona.sexo || '',
                    persona.edad || '',
                    persona.telefono || '',
                    `"${persona.correo || ''}"`,
                    `"${persona.cargo_voucher || ''}"`,
                    persona.codigo_cargo || '',
                    `"${persona.dependencia || ''}"`,
                    persona.codigo_dependencia || '',
                    persona.carga_horaria || '',
                    this.formatFechaExportacion(persona.fecha_ingreso_mppe),
                    persona.antiguedad || '',
                    `"${persona.titulos_profesionales || ''}"`,
                    persona.tipo_titulo_label || persona.tipo_titulo || '',
                    persona.talla_franela || '',
                    persona.talla_pantalon || '',
                    persona.talla_zapato || ''
                ]);

                // Crear contenido CSV
                const csvContent = [
                    headers.join(','),
                    ...csvData.map(row => row.join(','))
                ].join('\n');

                // Crear y descargar archivo
                const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
                link.href = url;
                link.download = `reporte_${tipo}_${new Date().getTime()}.csv`;
                link.click();
                URL.revokeObjectURL(url);

                resolve();

            } catch (error) {
                reject(error);
            }
        });
    }

    // Imprimir
    static async imprimir(datos, tipo) {
        return new Promise((resolve, reject) => {
            try {
                if (!datos || datos.length === 0) {
                    throw new Error('No hay datos para imprimir');
                }

                const fechaActual = new Date().toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });

                const tituloPorTipo = {
                    'docente': 'DOCENTES',
                    'administrativo': 'PERSONAL ADMINISTRATIVO',
                    'obrero': 'PERSONAL OBRERO'
                };

                const titulo = tituloPorTipo[tipo] || 'PERSONAL';

                // Crear ventana de impresión
                const printWindow = window.open('', '_blank');

                const contenido = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Reporte de ${titulo}</title>
                        <style>
                            @media print {
                                @page {
                                    margin: 15mm;
                                    size: A4 landscape;
                                }
                                
                                body {
                                    font-family: Arial, sans-serif;
                                    font-size: 10pt;
                                }
                                
                                .header {
                                    text-align: center;
                                    margin-bottom: 20px;
                                    border-bottom: 2px solid #000;
                                    padding-bottom: 10px;
                                }
                                
                                table {
                                    width: 100%;
                                    border-collapse: collapse;
                                    margin-top: 20px;
                                    font-size: 9pt;
                                }
                                
                                th {
                                    background-color: #f0f0f0;
                                    border: 1px solid #000;
                                    padding: 6px;
                                    text-align: left;
                                    font-weight: bold;
                                }
                                
                                td {
                                    border: 1px solid #000;
                                    padding: 5px;
                                }
                                
                                tr:nth-child(even) {
                                    background-color: #f9f9f9;
                                }
                                
                                .footer {
                                    margin-top: 30px;
                                    padding-top: 10px;
                                    border-top: 1px solid #000;
                                    font-size: 8pt;
                                    text-align: center;
                                }
                                
                                .no-print { display: none; }
                            }
                            
                            /* Estilos para vista previa */
                            body {
                                font-family: Arial, sans-serif;
                                padding: 20px;
                            }
                            
                            .print-button {
                                background: #4f46e5;
                                color: white;
                                border: none;
                                padding: 10px 20px;
                                border-radius: 5px;
                                cursor: pointer;
                                margin: 20px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="no-print">
                            <button class="print-button" onclick="window.print()">IMPRIMIR</button>
                            <button class="print-button" onclick="window.close()">CERRAR</button>
                        </div>
                        
                        <div class="header">
                            <h1>INSTITUCIÓN EDUCATIVA</h1>
                            <h2>REPORTE DE ${titulo}</h2>
                            <p>Generado: ${fechaActual} | Registros: ${datos.length}</p>
                        </div>
                        
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NOMBRE</th>
                                    <th>CÉDULA</th>
                                    <th>SEXO</th>
                                    <th>EDAD</th>
                                    <th>CARGO</th>
                                    <th>DEPENDENCIA</th>
                                    <th>TELÉFONO</th>
                                    <th>EMAIL</th>
                                    <th>ANTIGÜEDAD</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${datos.map(persona => `
                                    <tr>
                                        <td>${persona.id || ''}</td>
                                        <td>${persona.nombreCompleto || ''}</td>
                                        <td>${persona.cedula || ''}</td>
                                        <td>${persona.sexo ? persona.sexo.charAt(0).toUpperCase() : ''}</td>
                                        <td>${persona.edad || ''}</td>
                                        <td>${persona.cargo_voucher || ''}</td>
                                        <td>${persona.dependencia || ''}</td>
                                        <td>${persona.telefono || ''}</td>
                                        <td>${persona.correo || ''}</td>
                                        <td>${persona.antiguedad || ''}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        
                        <div class="footer">
                            <p>Total de registros: ${datos.length}</p>
                            <p>Documento confidencial - Uso interno</p>
                        </div>
                    </body>
                    </html>
                `;

                printWindow.document.open();
                printWindow.document.write(contenido);
                printWindow.document.close();

                printWindow.onload = () => {
                    // Opcional: imprimir automáticamente
                    // printWindow.print();
                    resolve();
                };

            } catch (error) {
                reject(error);
            }
        });
    }
}