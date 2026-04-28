import React, { useState, useEffect } from 'react';
import { 
    Calendar, 
    Plus, 
    Search, 
    Filter, 
    LayoutGrid, 
    List, 
    Clock, 
    Image as ImageIcon,
    ChevronLeft,
    ChevronRight,
    Loader2,
    Settings2,
    Trash2,
    Edit3,
    Eye,
    TrendingUp,
    CheckCircle2,
    X,
    ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActividades } from '../hooks/useActividades';
import ActividadesList from '../componentes/ActividadesList';
import ActividadForm from '../componentes/ActividadForm';
import ActividadDetalle from '../componentes/ActividadDetalle';
import Swal from 'sweetalert2';

const ActividadesPage = () => {
    const {
        actividades,
        actividadActual,
        cargando,
        error,
        paginacion,
        obtenerActividades,
        obtenerActividadPorId,
        crearActividad,
        eliminarActividad,
        editarActividad,
        cambiarPagina,
        limpiarBusqueda,
        limpiarActividadActual
    } = useActividades();

    const [modo, setModo] = useState('lista'); // 'lista', 'crear', 'editar', 'detalle'
    const [terminoBusqueda, setTerminoBusqueda] = useState('');
    const [orden, setOrden] = useState('desc');
    const [filtro, setFiltro] = useState('todos');

    useEffect(() => {
        obtenerActividades();
    }, []);

    const handleCrear = async (data) => {
        const resultado = await crearActividad(data.titulo, data.descripcion, data.imagenes);
        if (resultado.success) {
            setModo('lista');
            Swal.fire({ title: "Actividad creada", icon: "success", customClass: { popup: 'rounded-[2rem]' } });
        }
    };

    const handleEditar = async (data) => {
        const resultado = await editarActividad(data.id, data.titulo, data.descripcion, data.nuevasImagenes, data.imagenesAEliminar);
        if (resultado.success) {
            setModo('lista');
            Swal.fire({ title: "Actividad actualizada", icon: "success", customClass: { popup: 'rounded-[2rem]' } });
        }
    };

    const handleEliminar = async (id) => {
        const result = await Swal.fire({
            title: "¿Eliminar actividad?",
            text: "Esta acción no se puede revertir.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#f43f5e",
            confirmButtonText: "Sí, eliminar"
        });

        if (result.isConfirmed) {
            const resultado = await eliminarActividad(id);
            if (resultado.success) {
                Swal.fire('Eliminado', 'La actividad ha sido borrada', 'success');
            }
        }
    };

    const handleVerDetalle = async (id) => {
        const resultado = await obtenerActividadPorId(id);
        if (resultado.success) setModo('detalle');
    };

    const handleEditarActividad = async (actividad) => {
        const resultado = await obtenerActividadPorId(actividad.id);
        if (resultado.success) setModo("editar");
    };

    const actividadesFiltradas = actividades.filter(actividad => {
        if (terminoBusqueda) {
            const termino = terminoBusqueda.toLowerCase();
            if (!actividad.titulo?.toLowerCase().includes(termino) && !actividad.descripcion?.toLowerCase().includes(termino)) return false;
        }
        if (filtro === 'conImagenes' && (!actividad.imagenes || actividad.imagenes.length === 0)) return false;
        if (filtro === 'sinImagenes' && actividad.imagenes && actividad.imagenes.length > 0) return false;
        return true;
    }).sort((a, b) => {
        const fechaA = new Date(a.fechaCreacion);
        const fechaB = new Date(b.fechaCreacion);
        return orden === 'asc' ? fechaA - fechaB : fechaB - fechaA;
    });

    const handleCambiarPagina = (nuevaPagina) => {
        cambiarPagina(nuevaPagina);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="max-w-[1600px] mx-auto space-y-10 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 pt-4">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-primary">
                        <div className="p-3 bg-primary/10 rounded-2xl">
                            <Calendar size={32} />
                        </div>
                        <div className="h-px w-12 bg-primary/20" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Cronograma</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
                        Actividades <span className="text-primary">Escolares</span>
                    </h1>
                    <p className="text-slate-500 font-medium text-lg max-w-2xl">
                        Gestión de eventos, noticias y actividades institucionales con soporte multimedia.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="bg-white/50 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white shadow-xl shadow-slate-200/50 flex items-center gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-black text-slate-900">{actividades.length}</div>
                            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total</div>
                        </div>
                        <div className="w-px h-8 bg-slate-100" />
                        <div className="text-center">
                            <div className="text-2xl font-black text-primary">{actividades.filter(a => a.imagenes?.length > 0).length}</div>
                            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Multimedia</div>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setModo('crear')}
                        className="group flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-slate-200"
                    >
                        <Plus size={18} className="text-primary group-hover:rotate-90 transition-transform duration-300" />
                        <span>Nueva Actividad</span>
                    </motion.button>
                </div>
            </div>

            <div className="px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar / Navigation */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="bg-white/70 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-xl">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6 px-2">Navegación</h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setModo('lista')}
                                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all ${modo === 'lista' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50'}`}
                                >
                                    <List size={18} />
                                    <span>Lista General</span>
                                </button>
                                <button
                                    onClick={() => setModo('crear')}
                                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all ${modo === 'crear' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50'}`}
                                >
                                    <Plus size={18} />
                                    <span>Crear Nueva</span>
                                </button>
                                {modo === 'detalle' && (
                                    <button
                                        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold bg-slate-900 text-white"
                                    >
                                        <Eye size={18} className="text-primary" />
                                        <span>Detalle Activo</span>
                                    </button>
                                )}
                            </div>

                            <div className="mt-10 pt-10 border-t border-slate-100 space-y-6">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-4 px-2">Panel de Control</h3>
                                
                                <div className="space-y-4">
                                    <div className="relative group">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary" size={16} />
                                        <input
                                            type="text"
                                            value={terminoBusqueda}
                                            onChange={(e) => setTerminoBusqueda(e.target.value)}
                                            placeholder="Buscar..."
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-transparent rounded-xl text-sm font-bold focus:bg-white focus:border-primary/20 outline-none transition-all"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Orden Cronológico</label>
                                        <select
                                            value={orden}
                                            onChange={(e) => setOrden(e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-primary/20 transition-all cursor-pointer"
                                        >
                                            <option value="desc">Más recientes</option>
                                            <option value="asc">Más antiguas</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">Filtro Multimedia</label>
                                        <select
                                            value={filtro}
                                            onChange={(e) => setFiltro(e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl text-sm font-bold outline-none focus:bg-white focus:border-primary/20 transition-all cursor-pointer"
                                        >
                                            <option value="todos">Todos</option>
                                            <option value="conImagenes">Con imágenes</option>
                                            <option value="sinImagenes">Sin imágenes</option>
                                        </select>
                                    </div>

                                    {(terminoBusqueda || filtro !== 'todos' || orden !== 'desc') && (
                                        <button
                                            onClick={() => { setTerminoBusqueda(''); setFiltro('todos'); setOrden('desc'); }}
                                            className="w-full py-3 text-[10px] font-black text-rose-500 uppercase tracking-widest hover:bg-rose-50 rounded-xl transition-all"
                                        >
                                            Limpiar Filtros
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats Card */}
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                                <TrendingUp size={80} />
                            </div>
                            <h4 className="text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-2">Actividad Reciente</h4>
                            <div className="text-3xl font-black mb-1">+{actividades.filter(a => {
                                const weekAgo = new Date();
                                weekAgo.setDate(weekAgo.getDate() - 7);
                                return new Date(a.fechaCreacion) > weekAgo;
                            }).length}</div>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Nuevas esta semana</p>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={modo}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {modo === 'lista' ? (
                                    <div className="space-y-8">
                                        {cargando ? (
                                            <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white p-24 flex flex-col items-center justify-center gap-6">
                                                <Loader2 className="w-16 h-16 text-primary animate-spin" />
                                                <p className="text-sm font-black text-slate-400 uppercase tracking-[0.25em]">Sincronizando Calendario...</p>
                                            </div>
                                        ) : error ? (
                                            <div className="bg-rose-50 border border-rose-100 rounded-[2.5rem] p-16 text-center space-y-6">
                                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-rose-500 mx-auto shadow-sm">
                                                    <X size={40} />
                                                </div>
                                                <p className="text-rose-600 font-bold text-lg">{error}</p>
                                                <button onClick={() => obtenerActividades()} className="px-8 py-3 bg-rose-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest">Reintentar</button>
                                            </div>
                                        ) : actividadesFiltradas.length === 0 ? (
                                            <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white p-24 text-center space-y-8">
                                                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mx-auto ring-8 ring-slate-50/50">
                                                    <List size={48} />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Sin Resultados</h3>
                                                    <p className="text-slate-500 font-medium mt-2 max-w-xs mx-auto">No hay actividades que coincidan con los filtros actuales.</p>
                                                </div>
                                                <button onClick={() => setModo('crear')} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest">Crear Primera Actividad</button>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/60 overflow-hidden">
                                                    <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                                                        <div className="flex items-center gap-3">
                                                            <LayoutGrid size={20} className="text-slate-400" />
                                                            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em]">Módulos de Noticias</h2>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                            <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Actualizado Tiempo Real</span>
                                                        </div>
                                                    </div>
                                                    <ActividadesList
                                                        actividades={actividadesFiltradas}
                                                        onEdit={handleEditarActividad}
                                                        onDelete={handleEliminar}
                                                        onView={handleVerDetalle}
                                                        puedeEditar={true}
                                                    />
                                                </div>

                                                {paginacion.totalPaginas > 1 && (
                                                    <div className="flex items-center justify-between px-8 py-6 bg-white/50 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl shadow-slate-200/50">
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Página {paginacion.paginaActual} de {paginacion.totalPaginas}</span>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => handleCambiarPagina(paginacion.paginaActual - 1)}
                                                                disabled={paginacion.paginaActual === 1}
                                                                className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 disabled:opacity-30 transition-all hover:text-primary hover:border-primary/20"
                                                            >
                                                                <ChevronLeft size={20} />
                                                            </button>
                                                            <div className="flex items-center gap-1">
                                                                {[...Array(paginacion.totalPaginas)].map((_, i) => {
                                                                    const p = i + 1;
                                                                    if (p === 1 || p === paginacion.totalPaginas || (p >= paginacion.paginaActual - 1 && p <= paginacion.paginaActual + 1)) {
                                                                        return (
                                                                            <button
                                                                                key={p}
                                                                                onClick={() => handleCambiarPagina(p)}
                                                                                className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${p === paginacion.paginaActual ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-slate-400 hover:text-slate-900'}`}
                                                                            >
                                                                                {p}
                                                                            </button>
                                                                        );
                                                                    } else if (p === paginacion.paginaActual - 2 || p === paginacion.paginaActual + 2) {
                                                                        return <span key={p} className="text-slate-300 px-1">...</span>;
                                                                    }
                                                                    return null;
                                                                })}
                                                            </div>
                                                            <button
                                                                onClick={() => handleCambiarPagina(paginacion.paginaActual + 1)}
                                                                disabled={paginacion.paginaActual === paginacion.totalPaginas}
                                                                className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 disabled:opacity-30 transition-all hover:text-primary hover:border-primary/20"
                                                            >
                                                                <ChevronRight size={20} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                ) : modo === 'crear' || modo === 'editar' ? (
                                    <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-2xl p-10">
                                        <div className="flex items-center gap-6 mb-10 pb-6 border-b border-slate-50">
                                            <button onClick={() => setModo('lista')} className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 transition-all"><ArrowLeft size={20} /></button>
                                            <div>
                                                <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{modo === 'crear' ? 'Nueva Actividad' : 'Editar Actividad'}</h2>
                                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Configuración de Entrada Editorial</p>
                                            </div>
                                        </div>
                                        <ActividadForm
                                            actividad={modo === 'editar' ? actividadActual : null}
                                            onSubmit={modo === 'crear' ? handleCrear : handleEditar}
                                            onCancel={() => setModo('lista')}
                                            cargando={cargando}
                                        />
                                    </div>
                                ) : (
                                    <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-2xl p-10">
                                        <div className="flex items-center gap-6 mb-10 pb-6 border-b border-slate-50">
                                            <button onClick={() => setModo('lista')} className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 transition-all"><ArrowLeft size={20} /></button>
                                            <div>
                                                <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Visor de Actividad</h2>
                                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Detalles y Multimedia</p>
                                            </div>
                                        </div>
                                        {actividadActual ? (
                                            <ActividadDetalle
                                                actividad={actividadActual}
                                                onEdit={() => setModo('editar')}
                                                onDelete={handleEliminar}
                                                puedeEditar={true}
                                            />
                                        ) : (
                                            <div className="py-20 flex flex-col items-center justify-center gap-4">
                                                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cargando Multimedia...</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActividadesPage;