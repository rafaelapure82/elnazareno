import React, { useState } from 'react';
import { FaFilePdf, FaFileExcel, FaPrint, FaFileCsv, FaSpinner } from 'react-icons/fa';
import html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';

const ExportarListaPersonal = ({
    personal,
    tipo,
    selectedIds = [],
    onExportComplete
}) => {
    const [exportando, setExportando] = useState('');
    const [exportandoPDF, setExportandoPDF] = useState(false);

    // Obtener nombre del tipo
    const getTipoNombre = () => {
        switch (tipo) {
            case 'docente': return 'Docentes';
            case 'administrativo': return 'Personal Administrativo';
            case 'obrero': return 'Personal Obrero';
            default: return 'Personal';
        }
    };

    // Formatear fechas
    const formatDate = (dateString) => {
        if (!dateString || dateString === 'null' || dateString === 'undefined') {
            return '';
        }
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return '';
            }
            return date.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch (error) {
            return '';
        }
    };

    // Capitalizar texto
    const capitalize = (text) => {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    // Obtener personal seleccionado o todos
    const getPersonalParaExportar = () => {
        if (selectedIds.length > 0) {
            return personal.filter(p => selectedIds.includes(p.id));
        }
        return personal;
    };

    // Exportar a PDF
    const exportarAPDF = async () => {
        if (!personal || personal.length === 0) {
            alert('No hay datos para exportar');
            return;
        }

        try {
            setExportando('pdf');
            const personalParaExportar = getPersonalParaExportar();
            const esSeleccion = selectedIds.length > 0;

            // Crear contenido HTML para el PDF
            const fechaActual = new Date().toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            const contenidoHTML = `
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Lista de ${getTipoNombre()}</title>
                    <style>
                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }
                        
                        body {
                            font-family: 'Arial', sans-serif;
                            font-size: 10pt;
                            line-height: 1.4;
                            color: #333;
                            padding: 15mm;
                        }
                        
                        .header {
                            text-align: center;
                            margin-bottom: 20px;
                            padding-bottom: 15px;
                            border-bottom: 2px solid #4f46e5;
                        }
                        
                        .titulo-principal {
                            font-size: 18pt;
                            color: #1f2937;
                            margin-bottom: 5px;
                            font-weight: 600;
                        }
                        
                        .subtitulo {
                            font-size: 11pt;
                            color: #6b7280;
                            margin-bottom: 10px;
                        }
                        
                        .info-exportacion {
                            font-size: 9pt;
                            color: #6b7280;
                            margin-bottom: 20px;
                        }
                        
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 15px;
                            font-size: 9pt;
                        }
                        
                        thead {
                            background-color: #4f46e5;
                            color: white;
                        }
                        
                        th {
                            padding: 8px 5px;
                            text-align: left;
                            font-weight: 600;
                            border: 1px solid #ddd;
                        }
                        
                        td {
                            padding: 6px 5px;
                            border: 1px solid #ddd;
                        }
                        
                        tr:nth-child(even) {
                            background-color: #f8fafc;
                        }
                        
                        .footer {
                            margin-top: 30px;
                            padding-top: 10px;
                            border-top: 1px solid #e5e7eb;
                            text-align: center;
                            font-size: 9pt;
                            color: #6b7280;
                        }
                        
                        .total-registros {
                            font-weight: 600;
                            color: #4f46e5;
                        }
                        
                        .text-center { text-align: center; }
                        .text-right { text-align: right; }
                        .nowrap { white-space: nowrap; }
                        
                        @media print {
                            @page {
                                margin: 15mm;
                                size: A4 landscape;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1 class="titulo-principal">INSTITUCIÓN EDUCATIVA</h1>
                        <div class="subtitulo">LISTA DE ${getTipoNombre().toUpperCase()}</div>
                        <div class="info-exportacion">
                            Generado: ${fechaActual} | 
                            ${esSeleccion ? 'Selección: ' + personalParaExportar.length + ' registros' : 'Total: ' + personalParaExportar.length + ' registros'}
                        </div>
                    </div>
                    
                    <table>
                        <thead>
                            <tr>
                                <th width="5%">ID</th>
                                <th width="20%">NOMBRE COMPLETO</th>
                                <th width="10%">CÉDULA</th>
                                <th width="8%">SEXO</th>
                                <th width="15%">CARGO</th>
                                <th width="15%">DEPENDENCIA</th>
                                <th width="10%">TELÉFONO</th>
                                <th width="12%">EMAIL</th>
                                <th width="5%">EDAD</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${personalParaExportar.map((p, index) => `
                                <tr>
                                    <td class="text-center">${p.id}</td>
                                    <td>${p.nombreCompleto || ''}</td>
                                    <td>${p.cedula || ''}</td>
                                    <td class="text-center">${p.sexo ? capitalize(p.sexo) : ''}</td>
                                    <td>${p.cargo_voucher || ''}</td>
                                    <td>${p.dependencia || ''}</td>
                                    <td>${p.telefono || ''}</td>
                                    <td>${p.correo || ''}</td>
                                    <td class="text-center">${p.edad || ''}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="9" class="footer">
                                    <div class="total-registros">
                                        Total de registros: ${personalParaExportar.length}
                                    </div>
                                    <div style="margin-top: 5px;">
                                        Documento confidencial - Uso interno
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </body>
                </html>
            `;

            // Crear elemento temporal
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = contenidoHTML;

            // Configuración de html2pdf para formato horizontal
            const opt = {
                margin: [15, 15, 15, 15],
                filename: `lista_${tipo}_${new Date().getTime()}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    logging: false
                },
                jsPDF: {
                    unit: 'mm',
                    format: 'a4',
                    orientation: 'landscape',
                    compress: true
                }
            };

            // Generar PDF
            await html2pdf().set(opt).from(tempDiv).save();

            if (onExportComplete) {
                onExportComplete('pdf');
            }

        } catch (error) {
            console.error('Error al generar PDF:', error);
            alert('Error al generar el PDF');
        } finally {
            setExportando('');
        }
    };

    // Exportar a Excel
    const exportarAExcel = () => {
        if (!personal || personal.length === 0) {
            alert('No hay datos para exportar');
            return;
        }

        try {
            setExportando('excel');
            const personalParaExportar = getPersonalParaExportar();

            // Preparar datos para Excel
            const datos = personalParaExportar.map(p => ({
                'ID': p.id,
                'Nombre Completo': p.nombreCompleto || '',
                'Cédula': p.cedula || '',
                'Sexo': p.sexo ? capitalize(p.sexo) : '',
                'Fecha Nacimiento': formatDate(p.fecha_nacimiento),
                'Edad': p.edad || '',
                'Teléfono': p.telefono || '',
                'Email': p.correo || '',
                'Cargo': p.cargo_voucher || '',
                'Código Cargo': p.codigo_cargo || '',
                'Dependencia': p.dependencia || '',
                'Código Dependencia': p.codigo_dependencia || '',
                'Carga Horaria': p.carga_horaria || '',
                'Fecha Ingreso MPPE': formatDate(p.fecha_ingreso_mppe),
                'Antigüedad (años)': p.antiguedad || '',
                'Títulos Profesionales': p.titulos_profesionales || '',
                'Tipo Título': p.tipo_titulo_label || p.tipo_titulo || '',
                'Talla Franela': p.talla_franela || '',
                'Talla Pantalón': p.talla_pantalon || '',
                'Talla Zapato': p.talla_zapato || '',
                'Fecha Registro': formatDate(p.fecha_registro),
                'Última Actualización': formatDate(p.fecha_actualizacion)
            }));

            // Crear workbook
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(datos);

            // Estilos de columnas (ancho automático)
            const wscols = [
                { wch: 5 },   // ID
                { wch: 30 },  // Nombre
                { wch: 15 },  // Cédula
                { wch: 8 },   // Sexo
                { wch: 15 },  // Fecha Nacimiento
                { wch: 5 },   // Edad
                { wch: 15 },  // Teléfono
                { wch: 25 },  // Email
                { wch: 25 },  // Cargo
                { wch: 15 },  // Código Cargo
                { wch: 25 },  // Dependencia
                { wch: 15 },  // Código Dependencia
                { wch: 10 },  // Carga Horaria
                { wch: 15 },  // Fecha Ingreso
                { wch: 8 },   // Antigüedad
                { wch: 40 },  // Títulos
                { wch: 15 },  // Tipo Título
                { wch: 10 },  // Talla Franela
                { wch: 10 },  // Talla Pantalón
                { wch: 10 },  // Talla Zapato
                { wch: 15 },  // Fecha Registro
                { wch: 15 }   // Última Actualización
            ];
            ws['!cols'] = wscols;

            // Agregar hoja al workbook
            XLSX.utils.book_append_sheet(wb, ws, getTipoNombre());

            // Agregar hoja de metadatos
            const metadata = [
                ['INFORMACIÓN DEL REPORTE'],
                [''],
                ['Tipo de Personal:', getTipoNombre()],
                ['Total de Registros:', personalParaExportar.length],
                ['Fecha de Generación:', new Date().toLocaleDateString('es-ES')],
                ['Hora de Generación:', new Date().toLocaleTimeString('es-ES')],
                [''],
                ['NOTA: Este documento es de carácter confidencial.']
            ];
            const wsMeta = XLSX.utils.aoa_to_sheet(metadata);
            XLSX.utils.book_append_sheet(wb, wsMeta, 'Información');

            // Generar y descargar archivo
            const nombreArchivo = `lista_${tipo}_${new Date().getTime()}.xlsx`;
            XLSX.writeFile(wb, nombreArchivo);

            if (onExportComplete) {
                onExportComplete('excel');
            }

        } catch (error) {
            console.error('Error al generar Excel:', error);
            alert('Error al generar el archivo Excel');
        } finally {
            setExportando('');
        }
    };

    // Exportar a CSV (simplificado)
    const exportarACSV = () => {
        if (!personal || personal.length === 0) {
            alert('No hay datos para exportar');
            return;
        }

        try {
            setExportando('csv');
            const personalParaExportar = getPersonalParaExportar();

            // Encabezados
            const headers = [
                'ID', 'Nombre Completo', 'Cédula', 'Sexo', 'Fecha Nacimiento',
                'Edad', 'Teléfono', 'Email', 'Cargo', 'Dependencia',
                'Carga Horaria', 'Fecha Ingreso MPPE', 'Antigüedad'
            ];

            // Datos
            const datos = personalParaExportar.map(p => [
                p.id,
                `"${p.nombreCompleto || ''}"`,
                p.cedula || '',
                p.sexo || '',
                formatDate(p.fecha_nacimiento),
                p.edad || '',
                p.telefono || '',
                `"${p.correo || ''}"`,
                `"${p.cargo_voucher || ''}"`,
                `"${p.dependencia || ''}"`,
                p.carga_horaria || '',
                formatDate(p.fecha_ingreso_mppe),
                p.antiguedad || ''
            ]);

            // Crear contenido CSV
            const csvContent = [
                headers.join(','),
                ...datos.map(row => row.join(','))
            ].join('\n');

            // Crear y descargar archivo
            const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.download = `lista_${tipo}_${new Date().getTime()}.csv`;
            link.click();
            URL.revokeObjectURL(url);

            if (onExportComplete) {
                onExportComplete('csv');
            }

        } catch (error) {
            console.error('Error al generar CSV:', error);
            alert('Error al generar el archivo CSV');
        } finally {
            setExportando('');
        }
    };

    // Imprimir lista
    const imprimirLista = () => {
        if (!personal || personal.length === 0) {
            alert('No hay datos para imprimir');
            return;
        }

        const personalParaExportar = getPersonalParaExportar();
        const fechaActual = new Date().toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        // Crear ventana de impresión
        const printWindow = window.open('', '_blank');

        const contenido = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Lista de ${getTipoNombre()}</title>
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
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>INSTITUCIÓN EDUCATIVA</h1>
                    <h2>LISTA DE ${getTipoNombre().toUpperCase()}</h2>
                    <p>Generado: ${fechaActual} | Registros: ${personalParaExportar.length}</p>
                </div>
                
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOMBRE</th>
                            <th>CÉDULA</th>
                            <th>SEXO</th>
                            <th>CARGO</th>
                            <th>DEPENDENCIA</th>
                            <th>TELÉFONO</th>
                            <th>EMAIL</th>
                            <th>EDAD</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${personalParaExportar.map(p => `
                            <tr>
                                <td>${p.id}</td>
                                <td>${p.nombreCompleto || ''}</td>
                                <td>${p.cedula || ''}</td>
                                <td>${p.sexo || ''}</td>
                                <td>${p.cargo_voucher || ''}</td>
                                <td>${p.dependencia || ''}</td>
                                <td>${p.telefono || ''}</td>
                                <td>${p.correo || ''}</td>
                                <td>${p.edad || ''}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <div class="footer">
                    <p>Total de registros: ${personalParaExportar.length}</p>
                    <p>Documento confidencial - Uso interno</p>
                </div>
                
                <script>
                    window.onload = () => window.print();
                </script>
            </body>
            </html>
        `;

        printWindow.document.open();
        printWindow.document.write(contenido);
        printWindow.document.close();
    };

    return (
        <div className="flex items-center space-x-2">
            {/* Botón Imprimir */}
            <button
                onClick={imprimirLista}
                disabled={exportando !== ''}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer"
                title="Imprimir lista"
            >
                <FaPrint className="h-4 w-4 mr-1" />
                Imprimir
            </button>

            {/* Botón PDF */}
            <button
                onClick={exportarAPDF}
                disabled={exportando !== ''}
                className="inline-flex items-center px-3 py-2 border border-red-300 rounded-lg text-red-700 hover:bg-red-50 transition-colors disabled:opacity-50 cursor-pointer"
                title="Exportar a PDF"
            >
                {exportando === 'pdf' ? (
                    <FaSpinner className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                    <FaFilePdf className="h-4 w-4 mr-1" />
                )}
                PDF
            </button>

            {/* Botón Excel */}
            <button
                onClick={exportarAExcel}
                disabled={exportando !== ''}
                className="inline-flex items-center px-3 py-2 border border-green-300 rounded-lg text-green-700 hover:bg-green-50 transition-colors disabled:opacity-50 cursor-pointer"
                title="Exportar a Excel"
            >
                {exportando === 'excel' ? (
                    <FaSpinner className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                    <FaFileExcel className="h-4 w-4 mr-1" />
                )}
                Excel
            </button>

            {/* Botón CSV */}
            <button
                onClick={exportarACSV}
                disabled={exportando !== ''}
                className="inline-flex items-center px-3 py-2 border border-blue-300 rounded-lg text-blue-700 hover:bg-blue-50 transition-colors disabled:opacity-50 cursor-pointer"
                title="Exportar a CSV"
            >
                {exportando === 'csv' ? (
                    <FaSpinner className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                    <FaFileCsv className="h-4 w-4 mr-1" />
                )}
                CSV
            </button>
        </div>
    );
};

export default ExportarListaPersonal;