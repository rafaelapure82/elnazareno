import React, { useState } from 'react';
import { FaUserTie, FaExclamationTriangle } from 'react-icons/fa';
import { usePersonal } from '../hooks/usePersonal';
import PersonalFormularioModal from '../componentes/PersonalFormularioModal';
import PersonalLista from '../componentes/PersonalLista';
import PersonalBuscar from '../componentes/PersonalBuscar';
import PersonalAccion from '../componentes/PersonalAccion';
import PersonalDetalleModal from '../componentes/PersonalDetalleModal';
import Swal from 'sweetalert2'
import html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';
import { ExportacionService } from '../servicios/exportacion.service';

const AdministrativoPage = () => {
    const [showFormModal, setShowFormModal] = useState(false);
    const [selectedPersonal, setSelectedPersonal] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [editingPersonal, setEditingPersonal] = useState(null);

    const [loadingDetail, setLoadingDetail] = useState(false);
    const [detailError, setDetailError] = useState(null);

    const tipo = 'administrativo';

    const {
        personal,
        loading,
        error,
        filters,
        cargarPersonal,
        registrarPersonal,
        actualizarPersonal,
        eliminarPersonal,
        obtenerPersonalPorId,
        actualizarFiltros
    } = usePersonal(tipo);

    const getDatosParaExportar = () => {
        if (selectedIds.length > 0) {
            return personal.filter(p => selectedIds.includes(p.id));
        }
        return personal;
    };

    const handleExportPDF = async () => {
        try {
            // SOLO obtener datos completos si hay selección
            let datosParaExportar;

            if (selectedIds.length > 0) {
                // console.log('Exportando PDF con selección:', selectedIds.length, 'IDs');
                datosParaExportar = await ExportacionService.obtenerDatosCompletos(personal, selectedIds);
            } else {
                // console.log('Exportando PDF sin selección - usando datos de lista');
                datosParaExportar = personal; // Usar datos de la lista actual
            }

            if (!datosParaExportar || datosParaExportar.length === 0) {
                Swal.fire('Información', 'No hay datos para exportar', 'info');
                return;
            }

            // console.log('Datos para PDF:', datosParaExportar.length, 'registros');

            // Verificar que los datos tienen campos completos
            // const primerRegistro = datosParaExportar[0];
            // console.log('Campos en primer registro PDF:', Object.keys(primerRegistro));
            // console.log('Ejemplo de datos completos:', {
            //     tieneTitulos: !!primerRegistro.titulos_profesionales,
            //     tieneTallas: !!(primerRegistro.talla_franela || primerRegistro.talla_pantalon || primerRegistro.talla_zapato),
            //     tieneCodigos: !!(primerRegistro.codigo_cargo || primerRegistro.codigo_dependencia)
            // });

            await ExportacionService.exportarAPDF(datosParaExportar, tipo);

            Swal.fire('Éxito', `PDF generado con ${datosParaExportar.length} registros completos`, 'success');

        } catch (error) {
            console.error('Error exportando PDF:', error);
            Swal.fire('Error', `No se pudo generar el PDF: ${error.message}`, 'error');
            throw error;
        }
    };

    const handleExportExcel = async () => {
        try {
            // SOLO obtener datos completos si hay selección
            let datosParaExportar;

            if (selectedIds.length > 0) {
                // console.log('Exportando Excel con selección:', selectedIds.length, 'IDs');
                datosParaExportar = await ExportacionService.obtenerDatosCompletos(personal, selectedIds);
            } else {
                // console.log('Exportando Excel sin selección - usando datos de lista');
                datosParaExportar = personal; // Usar datos de la lista actual
            }

            if (!datosParaExportar || datosParaExportar.length === 0) {
                Swal.fire('Información', 'No hay datos para exportar', 'info');
                return;
            }

            // console.log('Datos para Excel:', datosParaExportar.length, 'registros');

            await ExportacionService.exportarAExcel(datosParaExportar, tipo);

            Swal.fire('Éxito', `Excel generado con ${datosParaExportar.length} registros completos`, 'success');

        } catch (error) {
            console.error('Error exportando Excel:', error);
            Swal.fire('Error', `No se pudo generar el Excel: ${error.message}`, 'error');
            throw error;
        }
    };


    // FUNCIÓN para exportar a CSV
    const handleExportCSV = async () => {
        try {
            // Obtener datos COMPLETOS desde el endpoint
            const datos = await ExportacionService.obtenerDatosCompletos(personal, selectedIds);

            if (datos.length === 0) {
                Swal.fire('Información', 'No hay datos para exportar', 'info');
                return;
            }

            await ExportacionService.exportarACSV(datos, tipo);

            Swal.fire('Éxito', `CSV generado con ${datos.length} registros`, 'success');

        } catch (error) {
            console.error('Error exportando CSV:', error);
            Swal.fire('Error', `No se pudo generar el CSV: ${error.message}`, 'error');
            throw error;
        }
    };

    // FUNCIÓN para imprimir
    const handlePrint = async () => {
        try {
            // Obtener datos COMPLETOS desde el endpoint
            const datos = await ExportacionService.obtenerDatosCompletos(personal, selectedIds);

            if (datos.length === 0) {
                Swal.fire('Información', 'No hay datos para imprimir', 'info');
                return;
            }

            await ExportacionService.imprimir(datos, tipo);

        } catch (error) {
            console.error('Error imprimiendo:', error);
            Swal.fire('Error', `No se pudo abrir la vista de impresión: ${error.message}`, 'error');
            throw error;
        }
    };

    //!# Funciones para editar 

    const handleCreate = async (data) => {
        try {
            await registrarPersonal(data);
            setShowFormModal(false);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleEdit = async (data) => {
        try {
            await actualizarPersonal(editingPersonal.id, data);
            setShowFormModal(false);
            setEditingPersonal(null);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: `¿Estás seguro de eliminar este ${tipo}?`,
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Si, eliminar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await eliminarPersonal(id);
                    setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
                    Swal.fire({
                        title: "Eliminado!",
                        text: `El ${tipo} ha sido eliminado`,
                        icon: "success"
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Error",
                        text: `Error:${error.message}`,
                        icon: "error"
                    });

                }
            }
        });

    };

    const handleDeleteSelected = async () => {
        if (selectedIds.length === 0) {
            alert('Selecciona al menos un docente para eliminar');
            return;
        }

        Swal.fire({
            title: `¿Estás seguro de eliminar ${selectedIds.length} ${tipo}(s)?`,
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Si, eliminar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    for (const id of selectedIds) {
                        await eliminarPersonal(id);
                    }
                    setSelectedIds([]);
                    Swal.fire({
                        title: "Eliminado!",
                        text: `El ${tipo} ha sido eliminado`,
                        icon: "success"
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Error",
                        text: `Error:${error.message}`,
                        icon: "error"
                    });

                }
            }
        });

    };

    const handleSelectPersonal = (id) => {
        setSelectedIds(prev => {
            if (prev.includes(id)) {
                return prev.filter(selectedId => selectedId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const handleViewPersonal = async (personal) => {
        setLoadingDetail(true);
        setDetailError(null);
        setShowDetailModal(true);

        try {
            // Cargar datos completos desde la API
            const personalCompleto = await obtenerPersonalPorId(personal.id);
            setSelectedPersonal(personalCompleto);
        } catch (error) {
            console.error('Error cargando detalles:', error);
            setDetailError(error.message);
            // Si falla, al menos mostrar los datos básicos
            setSelectedPersonal(personal);
        } finally {
            setLoadingDetail(false);
        }
    };

    const handleEditPersonal = (personal) => {
        setEditingPersonal({
            id: personal.id,
            tipo: personal.tipo
        });
        setShowFormModal(true);
    };

    const handleExport = () => {
        // Exportar a CSV
        const headers = ['ID', 'Nombre', 'Cédula', 'Teléfono', 'Correo', 'Cargo', 'Dependencia', 'Fecha Ingreso'];
        const csvData = personal.map(p => [
            p.id,
            p.nombreCompleto,
            p.cedula,
            p.telefono,
            p.correo,
            p.cargo_voucher,
            p.dependencia,
            p.fecha_ingreso_mppe
        ]);

        const csvContent = [
            headers.join(','),
            ...csvData.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'docentes.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Función para cerrar el modal
    const handleCloseDetailModal = () => {
        setShowDetailModal(false);
        setSelectedPersonal(null);
        setDetailError(null);
    };



    if (error) {
        return (
            <div className="p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                        <div className="flex items-center">
                            <FaExclamationTriangle className="h-6 w-6 text-red-600 mr-3" />
                            <div>
                                <h3 className="text-lg font-medium text-red-800">Error</h3>
                                <p className="text-red-700">{error}</p>
                                <button
                                    onClick={cargarPersonal}
                                    className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                                >
                                    Reintentar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const stats = {
        total: personal.length,
        masculinos: personal.filter(p => p.sexo === 'masculino').length,
        femeninos: personal.filter(p => p.sexo === 'femenino').length,
        otros: personal.filter(p => p.sexo === 'otro').length
    };

    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <FaUserTie className="h-8 w-8 text-green-600 mr-3" />
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                Gestión de Personal Administrativo
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Administra el registro de personal administrativo
                            </p>
                        </div>
                    </div>

                    {/* Estadísticas */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                                    <div className="text-sm text-gray-600">Total Administrativos</div>
                                </div>
                                <FaUserTie className="h-8 w-8 text-green-400" />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold text-blue-600">{stats.masculinos}</div>
                                    <div className="text-sm text-gray-600">Masculinos</div>
                                </div>
                                <FaUserTie className="h-8 w-8 text-blue-400" />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold text-pink-600">{stats.femeninos}</div>
                                    <div className="text-sm text-gray-600">Femeninos</div>
                                </div>
                                <FaUserTie className="h-8 w-8 text-pink-400" />
                            </div>
                        </div>

                        {/* <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold text-gray-600">{stats.otros}</div>
                                    <div className="text-sm text-gray-600">Otros</div>
                                </div>
                                <FaUserTie className="h-8 w-8 text-gray-400" />
                            </div>
                        </div> */}
                    </div>

                </div>

                <PersonalAccion
                    personal={personal}
                    tipo={tipo}
                    selectedIds={selectedIds}
                    onAddClick={() => {
                        setEditingPersonal(null);
                        setShowFormModal(true);
                    }}
                    onDeleteSelected={handleDeleteSelected}
                    onExportPDF={handleExportPDF}
                    onExportExcel={handleExportExcel}
                    onExportCSV={handleExportCSV}
                    onPrint={handlePrint}
                    selectedCount={selectedIds.length}
                    totalCount={personal.length}
                />


                {/* Búsqueda y filtros */}
                <PersonalBuscar
                    tipo={tipo}
                    onFilterChange={actualizarFiltros}
                    filters={filters}
                    totalPersonal={personal.length}
                />

                {/* Lista de personal */}
                <PersonalLista
                    personal={personal}
                    loading={loading}
                    tipo={tipo}
                    onEdit={handleEditPersonal}
                    onDelete={handleDelete}
                    onView={handleViewPersonal}
                    onSelect={handleSelectPersonal}
                    selectedIds={selectedIds}
                />

                {/* Modales */}
                <PersonalFormularioModal
                    isOpen={showFormModal}
                    onClose={() => {
                        setShowFormModal(false);
                        setEditingPersonal(null);
                    }}
                    onSubmit={editingPersonal ? handleEdit : handleCreate}
                    initialData={editingPersonal}
                    tipo={tipo}
                    title={editingPersonal ? `Editar ${tipo}` : `Nuevo ${tipo}`}
                />

                <PersonalDetalleModal
                    personal={selectedPersonal}
                    isOpen={showDetailModal}
                    onClose={handleCloseDetailModal}
                    tipo={tipo}
                    loading={loadingDetail}
                    error={detailError}
                />

            </div>
        </div>
    );
};

export default AdministrativoPage;