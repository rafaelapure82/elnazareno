import React, { useState, useEffect } from 'react';
import { 
    LayoutGrid, 
    Plus, 
    ArrowLeft, 
    BookOpen, 
    ChevronRight,
    Loader2,
    Calendar,
    Users,
    Settings2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import SeccionForm from '../componentes/Secciones/SeccionForm';
import SeccionList from '../componentes/Secciones/SeccionList';
import { useSecciones } from '../hooks/useSecciones';
import Swal from 'sweetalert2';

const SeccionesPage = () => {
    const { gradoId } = useParams();
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [editingSeccion, setEditingSeccion] = useState(null);
    const [gradoInfo, setGradoInfo] = useState(null);
    
    const {
        secciones,
        loading,
        grados,
        obtenerSeccionesPorGrado,
        crearSeccion,
        actualizarSeccion,
        eliminarSeccion,
        obtenerGradoPorId
    } = useSecciones();

    useEffect(() => {
        const loadData = async () => {
            if (gradoId) {
                try {
                    await obtenerSeccionesPorGrado(gradoId);
                    const gradoEncontrado = grados.find(g => g.id.toString() === gradoId.toString());
                    if (gradoEncontrado) {
                        setGradoInfo(gradoEncontrado);
                    } else {
                        const grado = await obtenerGradoPorId(gradoId);
                        setGradoInfo(grado);
                    }
                } catch (error) {
                    console.error("Error cargando datos:", error);
                }
            }
        };
        loadData();
    }, [gradoId]);

    const handleCreate = async (seccionData) => {
        const dataToSend = {
            ...seccionData,
            grado_id: parseInt(gradoId)
        };

        try {
            if (editingSeccion) {
                await actualizarSeccion(editingSeccion.id, seccionData);
                Swal.fire('Éxito', 'Sección actualizada', 'success');
            } else {
                await crearSeccion(dataToSend);
                Swal.fire('Éxito', 'Sección creada', 'success');
            }
            setShowForm(false);
            setEditingSeccion(null);
        } catch (e) {
            Swal.fire('Error', e.message, 'error');
        }
    };

    const handleEdit = (seccion) => {
        setEditingSeccion(seccion);
        setShowForm(true);
    };

    const handleDelete = async (seccion) => {
        const result = await Swal.fire({
            title: '¿Eliminar sección?',
            text: 'Se perderán todos los datos asociados a esta sección.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f43f5e',
            confirmButtonText: 'Sí, eliminar'
        });

        if (result.isConfirmed) {
            try {
                await eliminarSeccion(seccion.id, gradoId);
                Swal.fire('Eliminado', 'La sección ha sido borrada', 'success');
            } catch (e) {
                Swal.fire('Error', e.message, 'error');
            }
        }
    };

    const handleBack = () => {
        navigate('/secciones/grados');
    };

    return (
        <div className="max-w-[1600px] mx-auto space-y-10 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 pt-4">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <motion.button
                            whileHover={{ scale: 1.1, x: -5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleBack}
                            className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-primary hover:border-primary/20 transition-all shadow-sm"
                        >
                            <ArrowLeft size={20} />
                        </motion.button>
                        <div className="h-px w-8 bg-slate-100" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Distribución</span>
                    </div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight"
                    >
                        Secciones <span className="text-primary">{gradoInfo ? gradoInfo.nombre : '...'}</span>
                    </motion.h1>
                    <p className="text-slate-500 font-medium text-lg max-w-2xl">
                        Gestión detallada de las aulas y grupos de alumnos pertenecientes al nivel seleccionado.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="bg-white/50 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white shadow-xl shadow-slate-200/50 flex items-center gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-black text-slate-900">{secciones.length}</div>
                            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Aulas</div>
                        </div>
                        <div className="w-px h-8 bg-slate-100" />
                        <div className="text-center text-primary">
                            <Users size={20} />
                            <div className="text-[9px] font-black uppercase tracking-widest mt-1">Matrícula</div>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowForm(true)}
                        className="group flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-slate-200"
                    >
                        <Plus size={18} className="text-primary group-hover:rotate-90 transition-transform duration-300" />
                        <span>Nueva Sección</span>
                    </motion.button>
                </div>
            </div>

            <div className="px-4">
                <AnimatePresence mode="wait">
                    {showForm && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-10 overflow-hidden"
                        >
                            <div className="bg-white/50 backdrop-blur-xl rounded-[2.5rem] border border-white p-8 shadow-xl">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                        <Settings2 size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
                                            {editingSeccion ? 'Modificar Parámetros' : 'Nueva Configuración de Aula'}
                                        </h2>
                                        <p className="text-sm font-bold text-slate-400">Defina los detalles del grupo académico para este nivel.</p>
                                    </div>
                                </div>
                                <SeccionForm
                                    onSubmit={handleCreate}
                                    onCancel={() => {
                                        setShowForm(false);
                                        setEditingSeccion(null);
                                    }}
                                    initialData={editingSeccion}
                                    grados={gradoId && gradoInfo ? [{ id: parseInt(gradoId), ...gradoInfo }] : []}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* List Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/60 overflow-hidden"
                >
                    <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                        <div className="flex items-center gap-3">
                            <LayoutGrid size={20} className="text-slate-400" />
                            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em]">Módulos Académicos</h2>
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            <Calendar size={14} className="text-slate-300" />
                            Periodo Activo: {new Date().getFullYear()}
                        </div>
                    </div>

                    <div className="p-2">
                        {loading ? (
                            <div className="py-24 flex flex-col items-center justify-center gap-4">
                                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                                <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Sincronizando Secciones...</p>
                            </div>
                        ) : (
                            <SeccionList
                                secciones={secciones}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                gradoNombre={gradoInfo?.nombre}
                            />
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SeccionesPage;