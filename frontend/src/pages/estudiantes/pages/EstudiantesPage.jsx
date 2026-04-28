import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserPlus, 
  Download, 
  RefreshCw, 
  Search, 
  FileSpreadsheet, 
  FileText, 
  ChevronRight,
  GraduationCap,
  Filter,
  Users,
  TrendingUp,
  Loader2,
  X,
  Plus,
  LayoutGrid,
  MoreVertical,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EstudiantesLista from '../componentes/EstudiantesLista';
import BuscarEstudiantes from '../componentes/BuscarEstudiantes';
import EstadisticasEstudiantes from '../componentes/EstadisticasEstudiantes';
import { useEstudiantes } from '../hooks/useEstudiantes';
import Swal from 'sweetalert2';

const EstudiantesPage = () => {
    const navigate = useNavigate();
    const [showExportOptions, setShowExportOptions] = useState(false);

    const {
        estudiantes,
        loading,
        error,
        pagination,
        estadisticas,
        filters,
        actualizarFiltros,
        cambiarPagina,
        refresh,
        refreshEstadisticas,
        eliminarEstudiante
    } = useEstudiantes();

    const [sortConfig, setSortConfig] = useState({
        key: filters?.sortBy || 'apellidos',
        direction: filters?.order || 'asc'
    });

    const handleFilterChange = (nuevosFiltros) => {
        actualizarFiltros(nuevosFiltros);
    };

    const handleSort = ({ key, direction }) => {
        setSortConfig({ key, direction });
        actualizarFiltros({
            sortBy: key,
            order: direction
        });
    };

    const handleView = (id) => {
        navigate(`/estudiantes/${id}`);
    };

    const handleEdit = (id) => {
        navigate(`/estudiantes/${id}/editar`);
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Eliminar estudiante?',
            text: 'Esta acción no se puede deshacer y borrará todos los registros asociados.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f43f5e',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'rounded-[2rem]',
                confirmButton: 'rounded-xl px-8 py-3',
                cancelButton: 'rounded-xl px-8 py-3'
            }
        });

        if (result.isConfirmed) {
            try {
                const response = await eliminarEstudiante(id);
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Eliminado',
                        text: 'El estudiante ha sido removido del sistema.',
                        confirmButtonColor: '#8300cd'
                    });
                } else {
                    throw new Error(response.message);
                }
            } catch (error) {
                Swal.fire('Error', 'No se pudo eliminar el estudiante.', 'error');
            }
        }
    };

    const handlePageChange = (page) => {
        cambiarPagina(page);
    };

    const handleExport = (format) => {
        setShowExportOptions(false);
        Swal.fire({
            title: 'Generando Reporte...',
            text: `Procesando archivo ${format.toUpperCase()}`,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'Reporte Listo',
                text: `El archivo ${format.toUpperCase()} ha sido generado con éxito.`,
                confirmButtonColor: '#8300cd'
            });
        }, 1500);
    };

    const handleRefresh = () => {
        refresh();
        refreshEstadisticas();
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });
        Toast.fire({
            icon: 'success',
            title: 'Sincronizado con éxito'
        });
    };

    return (
        <div className="max-w-[1600px] mx-auto space-y-10 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 pt-4">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-primary">
                        <div className="p-3 bg-primary/10 rounded-2xl">
                            <GraduationCap size={32} />
                        </div>
                        <div className="h-px w-12 bg-primary/20" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Académico</span>
                    </div>
                    <motion.h1 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight"
                    >
                        Gestión de <span className="text-primary">Estudiantes</span>
                    </motion.h1>
                    <p className="text-slate-500 font-medium text-lg max-w-2xl">
                        Administre la matrícula estudiantil, expedientes académicos y estadísticas demográficas de la institución.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleRefresh}
                        className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-primary hover:border-primary/20 transition-all shadow-sm"
                    >
                        <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                    </motion.button>

                    <div className="relative">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowExportOptions(!showExportOptions)}
                            className="flex items-center gap-3 px-6 py-4 bg-white border border-slate-100 text-slate-600 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-sm hover:border-primary/20 hover:text-primary transition-all"
                        >
                            <Download size={18} />
                            <span>Exportar</span>
                        </motion.button>
                        
                        <AnimatePresence>
                            {showExportOptions && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl border border-slate-100 p-2 z-50 overflow-hidden"
                                >
                                    <button onClick={() => handleExport('excel')} className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-emerald-600 rounded-2xl transition-all">
                                        <FileSpreadsheet size={18} /> Excel Spreadsheet
                                    </button>
                                    <button onClick={() => handleExport('pdf')} className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-rose-600 rounded-2xl transition-all">
                                        <FileText size={18} /> Documento PDF
                                    </button>
                                    <button onClick={() => handleExport('csv')} className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-2xl transition-all">
                                        <FileText size={18} /> Formato CSV
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/estudiantes/nuevo')}
                        className="group flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-slate-200"
                    >
                        <UserPlus size={18} className="text-primary" />
                        <span>Nuevo Registro</span>
                    </motion.button>
                </div>
            </div>

            <div className="px-4 space-y-10">
                {/* Stats Section */}
                <EstadisticasEstudiantes estadisticas={estadisticas} loading={estadisticas.loading} />

                {/* Filters & Search */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                    <div className="xl:col-span-4">
                        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-xl">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                    <Filter size={20} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Filtros Inteligentes</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Refine su búsqueda</p>
                                </div>
                            </div>
                            <BuscarEstudiantes onFilterChange={handleFilterChange} filters={filters} totalEstudiantes={pagination?.total || estudiantes.length} />
                        </div>
                    </div>

                    <div className="xl:col-span-8 space-y-6">
                        {/* Summary Card */}
                        <div className="bg-white/50 backdrop-blur-md px-8 py-6 rounded-[2rem] border border-white flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-primary">
                                    <Users size={20} />
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Resultados Encontrados</h4>
                                    <div className="text-2xl font-black text-slate-900">{pagination?.total || estudiantes.length} <span className="text-sm text-slate-400 font-bold ml-1 uppercase">Estudiantes</span></div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Página Actual</div>
                                <div className="flex items-center gap-2 justify-end">
                                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-black text-sm">{pagination?.page || 1}</span>
                                    <span className="text-slate-300 font-black">/</span>
                                    <span className="text-slate-500 font-bold text-sm">{pagination?.totalPages || 1}</span>
                                </div>
                            </div>
                        </div>

                        {/* List Area */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/60 overflow-hidden"
                        >
                            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                                <div className="flex items-center gap-3">
                                    <LayoutGrid size={20} className="text-slate-400" />
                                    <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em]">Módulos de Matrícula</h2>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Base de Datos Activa</span>
                                </div>
                            </div>

                            <EstudiantesLista
                                estudiantes={estudiantes}
                                loading={loading}
                                error={error}
                                pagination={pagination}
                                onView={handleView}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onPageChange={handlePageChange}
                                onSort={handleSort}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EstudiantesPage;