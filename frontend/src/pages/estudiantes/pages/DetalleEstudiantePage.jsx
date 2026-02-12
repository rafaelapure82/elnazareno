import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEdit, FaTrash, FaPrint } from 'react-icons/fa';
import EstudianteDetalle from '../componentes/EstudianteDetalle';
import { useEstudiante } from '../hooks/useEstudiante';
import { useEstudiantes } from '../hooks/useEstudiantes';
import Swal from 'sweetalert2';

const DetalleEstudiantePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { estudiante, loading, error } = useEstudiante(id);
    const { eliminarEstudiante } = useEstudiantes();
    console.log("detalle estudia", estudiante)
    const handleDelete = async () => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: `Vas a eliminar al estudiante ${estudiante?.nombreCompleto}. Esta acción no se puede deshacer.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            const response = await eliminarEstudiante(id);

            if (response.success) {
                await Swal.fire({
                    icon: 'success',
                    title: '¡Eliminado!',
                    text: 'El estudiante ha sido eliminado exitosamente.',
                    showConfirmButton: false,
                    timer: 1500
                });

                navigate('/estudiantes');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.message || 'No se pudo eliminar el estudiante.',
                });
            }
        }
    };

    // const handlePrint = () => {
    //     window.print();
    // };

    const handlePrint = () => {
        if (!estudiante) return;

        // Crear ventana de impresión
        const printWindow = window.open('', '_blank', 'width=800,height=600');

        // Formatear fecha para mostrar
        const formatearFecha = (fechaStr) => {
            if (!fechaStr) return 'No especificada';
            try {
                const fecha = new Date(fechaStr.split('/').reverse().join('-'));
                return fecha.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                });
            } catch (error) {
                return fechaStr;
            }
        };

        // Calcular edad del representante si tiene fecha
        const calcularEdadRepresentante = () => {
            if (!estudiante.representante?.fecha_nacimiento) return '';
            try {
                const [dia, mes, anio] = estudiante.representante.fecha_nacimiento.split('/');
                const fechaNac = new Date(`${anio}-${mes}-${dia}`);
                const hoy = new Date();
                let edad = hoy.getFullYear() - fechaNac.getFullYear();
                const mesDiff = hoy.getMonth() - fechaNac.getMonth();
                if (mesDiff < 0 || (mesDiff === 0 && hoy.getDate() < fechaNac.getDate())) {
                    edad--;
                }
                return `${edad} años`;
            } catch {
                return '';
            }
        };

        const edadRepresentante = calcularEdadRepresentante();

        // Contenido HTML para impresión
        const contenidoHTML = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Ficha Estudiantil - ${estudiante.nombreCompleto || estudiante.nombres}</title>
            <style>
                @media print {
                    @page {
                        size: letter;
                        margin: 1.5cm;
                    }
                }

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: 'Arial', 'Helvetica', sans-serif;
                    line-height: 1.5;
                    color: #1a1a1a;
                    background: white;
                    padding: 20px;
                }

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 30px;
                    padding-bottom: 20px;
                    border-bottom: 3px solid #2563eb;
                }

                .institucion {
                    text-align: left;
                }

                .institucion h1 {
                    font-size: 20pt;
                    color: #1e40af;
                    margin-bottom: 5px;
                    font-weight: bold;
                }

                .institucion p {
                    font-size: 11pt;
                    color: #4b5563;
                }

                .folio {
                    background: #f3f4f6;
                    padding: 10px 20px;
                    border-radius: 8px;
                    font-size: 10pt;
                    color: #374151;
                    border: 1px solid #d1d5db;
                }

                .titulo-seccion {
                    background: #2563eb;
                    color: white;
                    padding: 10px 15px;
                    margin: 25px 0 15px 0;
                    font-size: 14pt;
                    font-weight: bold;
                    border-radius: 6px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .foto-container {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 30px;
                }

                .foto-estudiante {
                    width: 150px;
                    height: 180px;
                    object-fit: cover;
                    border: 3px solid #2563eb;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }

                .foto-placeholder {
                    width: 150px;
                    height: 180px;
                    background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
                    border: 3px solid #94a3b8;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #475569;
                    font-size: 14pt;
                    font-weight: bold;
                }

                .grid-2 {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 25px;
                    margin-bottom: 25px;
                }

                .grid-3 {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                    margin-bottom: 25px;
                }

                .card {
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 10px;
                    padding: 20px;
                    break-inside: avoid;
                }

                .card-header {
                    border-bottom: 2px solid #2563eb;
                    padding-bottom: 10px;
                    margin-bottom: 15px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .card-header h3 {
                    font-size: 13pt;
                    color: #1e40af;
                    font-weight: 600;
                }

                .campo {
                    margin-bottom: 12px;
                    display: flex;
                    align-items: baseline;
                }

                .campo-label {
                    font-weight: 600;
                    color: #4b5563;
                    min-width: 140px;
                    font-size: 10pt;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .campo-valor {
                    color: #111827;
                    font-size: 11pt;
                    font-weight: 500;
                }

                .badge {
                    display: inline-block;
                    padding: 4px 12px;
                    background: #dbeafe;
                    color: #1e40af;
                    border-radius: 20px;
                    font-size: 10pt;
                    font-weight: 600;
                    border: 1px solid #93c5fd;
                }

                .tipo-sangre {
                    display: inline-block;
                    padding: 6px 12px;
                    background: #fee2e2;
                    color: #991b1b;
                    border-radius: 6px;
                    font-weight: bold;
                    font-size: 11pt;
                    border: 1px solid #fecaca;
                }

                .footer {
                    margin-top: 40px;
                    padding-top: 20px;
                    border-top: 2px solid #e2e8f0;
                    display: flex;
                    justify-content: space-between;
                    font-size: 9pt;
                    color: #6b7280;
                }

                .firma {
                    margin-top: 30px;
                    display: flex;
                    justify-content: space-between;
                }

                .firma-item {
                    text-align: center;
                    width: 200px;
                }

                .firma-linea {
                    border-top: 1px solid #374151;
                    margin-top: 40px;
                    padding-top: 10px;
                }

                hr {
                    border: none;
                    border-top: 1px solid #e2e8f0;
                    margin: 20px 0;
                }

                .text-center {
                    text-align: center;
                }

                .mt-4 {
                    margin-top: 20px;
                }

                .mb-2 {
                    margin-bottom: 10px;
                }

                .no-print {
                    display: none;
                }
            </style>
        </head>
        <body>
            <!-- Encabezado -->
            <div class="header">
                <div class="institucion">
                    <h1>INSTITUCIÓN EDUCATIVA</h1>
                    <p>Sistema de Gestión de Estudiantes - Ficha Estudiantil</p>
                </div>
                <div class="folio">
                    <strong>FOLIO:</strong> EST-${String(estudiante.id).padStart(6, '0')}<br>
                    <strong>FECHA:</strong> ${new Date().toLocaleDateString('es-ES')}
                </div>
            </div>

            <!-- Información del Estudiante -->
            <div class="card" style="margin-bottom: 30px;">
                <div class="card-header">
                    <span style="font-size: 16pt;">🎓</span>
                    <h3>INFORMACIÓN DEL ESTUDIANTE</h3>
                </div>
                
                <div style="display: flex; gap: 30px; align-items: start;">
                    <!-- Foto -->
                    <div style="flex-shrink: 0;">
                        ${estudiante.fotoUrl && estudiante.fotoUrl !== 'null'
                ? `<img src="${estudiante.fotoUrl}" alt="Foto del estudiante" class="foto-estudiante" 
                                 onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';"
                                 /><div class="foto-placeholder" style="display:none;">📸</div>`
                : `<div class="foto-placeholder">📸</div>`
            }
                    </div>
                    
                    <!-- Datos principales -->
                    <div style="flex: 1;">
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                            <div class="campo">
                                <span class="campo-label">Nombre Completo:</span>
                                <span class="campo-valor">${estudiante.nombreCompleto || `${estudiante.nombres} ${estudiante.apellidos}`}</span>
                            </div>
                            <div class="campo">
                                <span class="campo-label">Cédula Escolar:</span>
                                <span class="campo-valor"><span class="badge">${estudiante.cedulaEscolar || 'N/A'}</span></span>
                            </div>
                            <div class="campo">
                                <span class="campo-label">Fecha Nacimiento:</span>
                                <span class="campo-valor">${formatearFecha(estudiante.fechaNacimiento)}</span>
                            </div>
                            <div class="campo">
                                <span class="campo-label">Edad:</span>
                                <span class="campo-valor">${estudiante.edad || ''} años</span>
                            </div>
                            <div class="campo">
                                <span class="campo-label">Sexo:</span>
                                <span class="campo-valor">${estudiante.sexo || 'No especificado'}</span>
                            </div>
                            <div class="campo">
                                <span class="campo-label">Nacionalidad:</span>
                                <span class="campo-valor">${estudiante.nacionalidad || 'Venezolana'}</span>
                            </div>
                            <div class="campo">
                                <span class="campo-label">Tipo de Sangre:</span>
                                <span class="campo-valor">
                                    ${estudiante.tipoSangre
                ? `<span class="tipo-sangre">${estudiante.tipoSangre}</span>`
                : 'No especificado'}
                                </span>
                            </div>
                            <div class="campo">
                                <span class="campo-label">Cédula:</span>
                                <span class="campo-valor">
                                    ${estudiante.tieneCedula
                ? `${estudiante.tipoCedula || 'V'}-${estudiante.cedula}`
                : 'No posee'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Dirección de Habitación -->
            <div class="card">
                <div class="card-header">
                    <span style="font-size: 16pt;">🏠</span>
                    <h3>DIRECCIÓN DE HABITACIÓN</h3>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                    <div class="campo">
                        <span class="campo-label">Estado:</span>
                        <span class="campo-valor">${estudiante.direccion?.estado || 'No especificado'}</span>
                    </div>
                    <div class="campo">
                        <span class="campo-label">Municipio:</span>
                        <span class="campo-valor">${estudiante.direccion?.municipio || 'No especificado'}</span>
                    </div>
                    <div class="campo">
                        <span class="campo-label">Parroquia:</span>
                        <span class="campo-valor">${estudiante.direccion?.parroquia || 'No especificado'}</span>
                    </div>
                    <div class="campo">
                        <span class="campo-label">Sector:</span>
                        <span class="campo-valor">${estudiante.direccion?.sector || 'No especificado'}</span>
                    </div>
                    <div class="campo">
                        <span class="campo-label">Calle:</span>
                        <span class="campo-valor">${estudiante.direccion?.calle || 'No especificada'}</span>
                    </div>
                    <div class="campo">
                        <span class="campo-label">Casa/Apartamento:</span>
                        <span class="campo-valor">${estudiante.direccion?.casa || 'No especificado'}</span>
                    </div>
                    <div class="campo" style="grid-column: span 2;">
                        <span class="campo-label">Referencia:</span>
                        <span class="campo-valor">${estudiante.direccion?.referencia || 'No especificada'}</span>
                    </div>
                </div>
            </div>

            <!-- Datos del Representante -->
            <div class="card" style="margin-top: 25px;">
                <div class="card-header">
                    <span style="font-size: 16pt;">👨‍👩‍👧</span>
                    <h3>DATOS DEL REPRESENTANTE</h3>
                </div>
                
                ${estudiante.representante ? `
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                        <div class="campo">
                            <span class="campo-label">Nombre Completo:</span>
                            <span class="campo-valor">
                                ${estudiante.representante.nombreCompleto ||
                `${estudiante.representante.nombres} ${estudiante.representante.apellidos}`}
                            </span>
                        </div>
                        <div class="campo">
                            <span class="campo-label">Cédula:</span>
                            <span class="campo-valor">
                                <span class="badge">
                                    ${estudiante.representante.tipo_cedula || 'V'}-${estudiante.representante.cedula}
                                </span>
                            </span>
                        </div>
                        <div class="campo">
                            <span class="campo-label">Fecha Nacimiento:</span>
                            <span class="campo-valor">
                                ${formatearFecha(estudiante.representante.fecha_nacimiento)}
                                ${edadRepresentante ? ` (${edadRepresentante})` : ''}
                            </span>
                        </div>
                        <div class="campo">
                            <span class="campo-label">Sexo:</span>
                            <span class="campo-valor">${estudiante.representante.sexo || 'No especificado'}</span>
                        </div>
                        <div class="campo">
                            <span class="campo-label">Relación:</span>
                            <span class="campo-valor"><span class="badge">${estudiante.representante.relacion || 'No especificada'}</span></span>
                        </div>
                        <div class="campo">
                            <span class="campo-label">Ocupación:</span>
                            <span class="campo-valor">${estudiante.representante.ocupacion || 'No especificada'}</span>
                        </div>
                        <div class="campo">
                            <span class="campo-label">Teléfono:</span>
                            <span class="campo-valor">${estudiante.representante.telefono || 'No especificado'}</span>
                        </div>
                        <div class="campo">
                            <span class="campo-label">Correo:</span>
                            <span class="campo-valor">${estudiante.representante.email || 'No especificado'}</span>
                        </div>
                    </div>
                ` : `
                    <p style="color: #6b7280; text-align: center; padding: 20px;">
                        No hay información del representante registrada.
                    </p>
                `}
            </div>

            <!-- Fechas de registro -->
            <hr>
            <div style="display: flex; justify-content: space-between; color: #4b5563; font-size: 9pt;">
                <span><strong>Registrado:</strong> ${formatearFecha(estudiante.createdAt) || 'No especificada'}</span>
                <span><strong>ID Registro:</strong> #${estudiante.id}</span>
            </div>

            <!-- Footer con firmas -->
            <div class="footer">
                <div>
                    <strong>Documento generado por:</strong> Sistema de Gestión de Estudiantes<br>
                    <strong>Fecha de impresión:</strong> ${new Date().toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
                </div>
                <div>
                    <strong>Página 1 de 1</strong>
                </div>
            </div>

            <div class="firma">
                <div class="firma-item">
                    <div class="firma-linea"></div>
                    <p style="margin-top: 10px; font-size: 10pt;">Sello de la Institución</p>
                </div>
                <div class="firma-item">
                    <div class="firma-linea"></div>
                    <p style="margin-top: 10px; font-size: 10pt;">Firma del Representante</p>
                </div>
                <div class="firma-item">
                    <div class="firma-linea"></div>
                    <p style="margin-top: 10px; font-size: 10pt;">Firma del Docente</p>
                </div>
            </div>

            <div style="margin-top: 20px; font-size: 8pt; color: #9ca3af; text-align: center;">
                Este documento es válido como constancia de inscripción. 
                Cualquier modificación debe ser realizada en la institución.
            </div>

            <script>
                window.onload = function() {
                    window.print();
                    // Opcional: Cerrar ventana después de imprimir
                    setTimeout(function() { window.close(); }, 1000);
                };
            </script>
        </body>
        </html>
    `;

        printWindow.document.open();
        printWindow.document.write(contenidoHTML);
        printWindow.document.close();
    };



    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando información del estudiante...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">!</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => navigate('/estudiantes')}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                        <FaArrowLeft className="mr-2 h-4 w-4" />
                        Volver a estudiantes
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 print:bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:py-4">
                {/* Encabezado */}
                <div className="mb-6 print:hidden">
                    <div className="flex justify-between items-center mb-4">
                        <button
                            onClick={() => navigate('/estudiantes')}
                            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                        >
                            <FaArrowLeft className="mr-2 h-4 w-4" />
                            Volver a estudiantes
                        </button>

                        <div className="flex space-x-3">
                            <button
                                onClick={handlePrint}
                                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <FaPrint className="mr-2 h-4 w-4" />
                                Imprimir
                            </button>
                            <button
                                onClick={() => navigate(`/estudiantes/${id}/editar`)}
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                <FaEdit className="mr-2 h-4 w-4" />
                                Editar
                            </button>
                            <button
                                onClick={handleDelete}
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                <FaTrash className="mr-2 h-4 w-4" />
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Contenido */}
                <div className="bg-white shadow rounded-lg print:shadow-none">
                    <EstudianteDetalle estudiante={estudiante} />
                </div>

                {/* Información adicional para impresión */}
                <div className="hidden print:block mt-8 text-xs text-gray-500">
                    <div className="border-t pt-4">
                        <p>Documento generado el {new Date().toLocaleDateString('es-ES')}</p>
                        <p>ID del estudiante: #{estudiante?.id}</p>
                        <p>Sistema de Gestión de Estudiantes</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetalleEstudiantePage;