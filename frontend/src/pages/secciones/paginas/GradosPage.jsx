import React, { useState, useEffect } from 'react';
import { 
    School, 
    Plus, 
    ArrowRight, 
    LayoutGrid, 
    BookOpen,
    Loader2,
    AlertCircle,
    RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GradoForm from '../componentes/Grados/GradoForm';
import GradoList from '../componentes/Grados/GradoList';
import { useSecciones } from '../hooks/useSecciones';

const GradosPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingGrado, setEditingGrado] = useState(null);
    const {
        grados,
        loading,
        obtenerGrados,
        crearGrado,
        actualizarGrado,
        eliminarGrado
    } = useSecciones();

    useEffect(() => {
        if (grados.length === 0 && !loading) {
            obtenerGrados();
        }
    }, [grados.length, loading, obtenerGrados]);

    const handleCreate = async (gradoData) => {
        if (editingGrado) {
            await actualizarGrado(editingGrado.id, gradoData);
        } else {
            await crearGrado(gradoData);
        }
        setShowForm(false);
        setEditingGrado(null);
    };

    const handleEdit = (grado) => {
        setEditingGrado(grado);
        setShowForm(true);
    };

    const handleDelete = async (grado) => {
        await eliminarGrado(grado.id);
    };

    return (
        <div className="max-w-[1600px] mx-auto space-y-10 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 pt-4">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-primary">
                        <div className="p-3 bg-primary/10 rounded-2xl">
                            <School size={32} />
                        </div>
                        <div className="h-px w-12 bg-primary/20" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Institución</span>
                    </div>
                    <motion.h1 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight"
                    >
                        Gestión de <span className="text-primary">Grados</span>
                    </motion.h1>
                    <p className="text-slate-500 font-medium text-lg max-w-2xl">
                        Administre los niveles académicos, grados y la estructura educativa de la institución.
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowForm(true)}
                    className="group flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-slate-200"
                >
                    <Plus size={18} className="text-primary group-hover:rotate-90 transition-transform duration-300" />
                    <span>Nuevo Grado</span>
                </motion.button>
            </div>

            <div className="px-4">
                <AnimatePresence>
                    {showForm && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="mb-10 bg-white/50 backdrop-blur-xl rounded-[2rem] border border-white p-8 shadow-xl"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <LayoutGrid size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
                                        {editingGrado ? 'Editar Grado Académico' : 'Crear Nuevo Grado'}
                                    </h2>
                                    <p className="text-sm font-bold text-slate-400">Complete los detalles para organizar la estructura escolar.</p>
                                </div>
                            </div>
                            <GradoForm
                                onSubmit={handleCreate}
                                onCancel={() => {
                                    setShowForm(false);
                                    setEditingGrado(null);
                                }}
                                initialData={editingGrado}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Content Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/60 overflow-hidden"
                >
                    <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                        <div className="flex items-center gap-3">
                            <BookOpen size={20} className="text-slate-400" />
                            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em]">Estructura Institucional</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">{grados.length} Grados Activos</span>
                        </div>
                    </div>

                    <div className="p-4">
                        {loading && grados.length === 0 ? (
                            <div className="py-20 flex flex-col items-center justify-center gap-4">
                                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                                <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Cargando Niveles...</p>
                            </div>
                        ) : (
                            <GradoList
                                grados={grados}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default GradosPage;