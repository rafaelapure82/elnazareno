import React, { useState } from 'react';
import { 
    GraduationCap, 
    AlertCircle, 
    RefreshCw, 
    Users, 
    ChevronRight,
    Search,
    FileSpreadsheet,
    FileText,
    Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePersonal } from '../hooks/usePersonal';
import PersonalFormularioModal from '../componentes/PersonalFormularioModal';
import PersonalLista from '../componentes/PersonalLista';
import PersonalBuscar from '../componentes/PersonalBuscar';
import PersonalAccion from '../componentes/PersonalAccion';
import PersonalDetalleModal from '../componentes/PersonalDetalleModal';
import Swal from 'sweetalert2';
import { ExportacionService } from '../servicios/exportacion.service';

const DocentesPage = () => {
    const [showFormModal, setShowFormModal] = useState(false);
    const [selectedPersonal, setSelectedPersonal] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [editingPersonal, setEditingPersonal] = useState(null);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [detailError, setDetailError] = useState(null);

    const tipo = 'docente';

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

    const handleExportPDF = async () => {
        try {
            let datos = selectedIds.length > 0 
                ? await ExportacionService.obtenerDatosCompletos(personal, selectedIds)
                : personal;
            if (!datos?.length) return Swal.fire('Info', 'No hay datos', 'info');
            await ExportacionService.exportarAPDF(datos, tipo);
            Swal.fire('Éxito', 'PDF generado', 'success');
        } catch (e) {
            Swal.fire('Error', e.message, 'error');
        }
    };

    const handleExportExcel = async () => {
        try {
            let datos = selectedIds.length > 0 
                ? await ExportacionService.obtenerDatosCompletos(personal, selectedIds)
                : personal;
            if (!datos?.length) return Swal.fire('Info', 'No hay datos', 'info');
            await ExportacionService.exportarAExcel(datos, tipo);
            Swal.fire('Éxito', 'Excel generado', 'success');
        } catch (e) {
            Swal.fire('Error', e.message, 'error');
        }
    };

    const handleExportCSV = async () => {
        try {
            const datos = await ExportacionService.obtenerDatosCompletos(personal, selectedIds);
            await ExportacionService.exportarACSV(datos, tipo);
            Swal.fire('Éxito', 'CSV generado', 'success');
        } catch (e) {
            Swal.fire('Error', e.message, 'error');
        }
    };

    const handlePrint = async () => {
        try {
            const datos = await ExportacionService.obtenerDatosCompletos(personal, selectedIds);
            await ExportacionService.imprimir(datos, tipo);
        } catch (e) {
            Swal.fire('Error', e.message, 'error');
        }
    };

    const handleCreate = async (data) => {
        try {
            await registrarPersonal(data);
            setShowFormModal(false);
            Swal.fire('Éxito', 'Docente registrado correctamente', 'success');
        } catch (e) {
            Swal.fire('Error', e.message, 'error');
        }
    };

    const handleEdit = async (data) => {
        try {
            await actualizarPersonal(editingPersonal.id, data);
            setShowFormModal(false);
            setEditingPersonal(null);
            Swal.fire('Éxito', 'Datos actualizados correctamente', 'success');
        } catch (e) {
            Swal.fire('Error', e.message, 'error');
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Eliminar docente?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f43f5e',
            confirmButtonText: 'Sí, eliminar'
        });

        if (result.isConfirmed) {
            try {
                await eliminarPersonal(id);
                setSelectedIds(prev => prev.filter(sid => sid !== id));
                Swal.fire('Eliminado', 'El docente ha sido borrado', 'success');
            } catch (e) {
                Swal.fire('Error', e.message, 'error');
            }
        }
    };

    const handleDeleteSelected = async () => {
        const result = await Swal.fire({
            title: `¿Eliminar ${selectedIds.length} docentes?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f43f5e'
        });

        if (result.isConfirmed) {
            try {
                for (const id of selectedIds) await eliminarPersonal(id);
                setSelectedIds([]);
                Swal.fire('Eliminados', 'Registros borrados con éxito', 'success');
            } catch (e) {
                Swal.fire('Error', e.message, 'error');
            }
        }
    };

    const handleViewPersonal = async (p) => {
        setLoadingDetail(true);
        setShowDetailModal(true);
        try {
            const full = await obtenerPersonalPorId(p.id);
            setSelectedPersonal(full);
        } catch (e) {
            setDetailError(e.message);
            setSelectedPersonal(p);
        } finally {
            setLoadingDetail(false);
        }
    };

    const handleEditPersonal = (p) => {
        setEditingPersonal({ id: p.id, tipo: p.tipo });
        setShowFormModal(true);
    };

    const stats = {
        total: personal.length,
        masculinos: personal.filter(p => p.sexo === 'masculino').length,
        femeninos: personal.filter(p => p.sexo === 'femenino').length
    };

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
                <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 ring-8 ring-rose-50/50">
                    <AlertCircle size={40} />
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Error de Conexión</h3>
                    <p className="text-slate-500 font-medium mt-2">{error}</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={cargarPersonal}
                    className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest"
                >
                    <RefreshCw size={16} />
                    Reintentar
                </motion.button>
            </div>
        );
    }

    return (
        <div className="max-w-[1600px] mx-auto space-y-10 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-primary">
                        <div className="p-3 bg-primary/10 rounded-2xl">
                            <GraduationCap size={32} />
                        </div>
                        <div className="h-px w-12 bg-primary/20" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Docentes</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
                        Cuerpo <span className="text-primary">Docente</span>
                    </h1>
                    <p className="text-slate-500 font-medium text-lg max-w-2xl">
                        Gestión del personal académico, seguimiento de carga horaria y expedientes profesionales de los educadores.
                    </p>
                </div>

                <div className="flex items-center gap-4 bg-white/50 backdrop-blur-xl p-2 rounded-3xl border border-white shadow-xl shadow-slate-200/50">
                    <div className="px-8 py-4 text-center">
                        <div className="text-3xl font-black text-slate-900">{stats.total}</div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</div>
                    </div>
                    <div className="w-px h-12 bg-slate-100" />
                    <div className="px-8 py-4 text-center">
                        <div className="text-3xl font-black text-blue-500">{stats.masculinos}</div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Masc.</div>
                    </div>
                    <div className="w-px h-12 bg-slate-100" />
                    <div className="px-8 py-4 text-center">
                        <div className="text-3xl font-black text-pink-500">{stats.femeninos}</div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fem.</div>
                    </div>
                </div>
            </div>

            {/* Actions & Filters */}
            <div className="px-4 space-y-6">
                <PersonalAccion
                    personal={personal}
                    tipo={tipo}
                    selectedIds={selectedIds}
                    onAddClick={() => { setEditingPersonal(null); setShowFormModal(true); }}
                    onDeleteSelected={handleDeleteSelected}
                    onExportPDF={handleExportPDF}
                    onExportExcel={handleExportExcel}
                    onExportCSV={handleExportCSV}
                    onPrint={handlePrint}
                    selectedCount={selectedIds.length}
                    totalCount={personal.length}
                />

                <PersonalBuscar
                    tipo={tipo}
                    onFilterChange={actualizarFiltros}
                    filters={filters}
                    totalPersonal={personal.length}
                />
            </div>

            {/* Main Content Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-4 bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/60 overflow-hidden"
            >
                <PersonalLista
                    personal={personal}
                    loading={loading}
                    tipo={tipo}
                    onEdit={handleEditPersonal}
                    onDelete={handleDelete}
                    onView={handleViewPersonal}
                    onSelect={(id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id])}
                    selectedIds={selectedIds}
                />
            </motion.div>

            {/* Modals */}
            <PersonalFormularioModal
                isOpen={showFormModal}
                onClose={() => { setShowFormModal(false); setEditingPersonal(null); }}
                onSubmit={editingPersonal ? handleEdit : handleCreate}
                initialData={editingPersonal}
                tipo={tipo}
                title={editingPersonal ? `Editar ${tipo}` : `Nuevo ${tipo}`}
            />

            <PersonalDetalleModal
                personal={selectedPersonal}
                isOpen={showDetailModal}
                onClose={() => { setShowDetailModal(false); setSelectedPersonal(null); setDetailError(null); }}
                tipo={tipo}
                loading={loadingDetail}
                error={detailError}
            />
        </div>
    );
};

export default DocentesPage;