import React from 'react';
import { RefreshCw, AlertCircle, LayoutGrid, Users, Calendar, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInicio } from '../hooks/useInicio';
import TarjetaEstadisticas from './TarjetaEstadisticas';
import { useAuth } from '../../../contextos/AuthContexto';

const InicioPagina = () => {
    const {
        statCardsData,
        loading,
        error,
        refreshData
    } = useInicio();
    const {
        user,
    } = useAuth();

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card border-red-100 p-8 rounded-3xl text-center max-w-md"
                >
                    <AlertCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-800">Error de Conexión</h3>
                    <p className="text-slate-500 mt-2 mb-6">{error}</p>
                    <button
                        onClick={refreshData}
                        className="px-6 py-3 bg-rose-500 text-white rounded-2xl font-bold shadow-lg shadow-rose-200 hover:bg-rose-600 transition-all flex items-center justify-center w-full"
                    >
                        <RefreshCw className="w-5 h-5 mr-2" />
                        Reintentar ahora
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="flex items-center gap-3 text-primary mb-2">
                        <LayoutGrid size={20} className="animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Panel de Control</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                        ¡Hola, <span className="text-primary">{user?.nombre || user?.name || 'Director'}</span>!
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium max-w-2xl">
                        Aquí tienes el resumen actualizado de la gestión académica del <span className="text-slate-800 font-bold">CEIB El Nazareno</span>.
                    </p>
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={refreshData}
                    disabled={loading}
                    className="group flex items-center gap-2 px-6 py-3.5 bg-white rounded-2xl font-bold text-slate-700 shadow-sm border border-slate-200 hover:shadow-md transition-all active:scale-95 disabled:opacity-50"
                >
                    <RefreshCw size={18} className={`${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                    {loading ? 'Sincronizando...' : 'Actualizar Datos'}
                </motion.button>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {loading ? (
                    [...Array(5)].map((_, index) => (
                        <TarjetaEstadisticas key={index} loading={true} />
                    ))
                ) : (
                    statCardsData.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <TarjetaEstadisticas
                                title={stat.title}
                                value={stat.value}
                                icon={stat.icon}
                                color={stat.color}
                                description={stat.description}
                            />
                        </motion.div>
                    ))
                )}
            </div>

            {/* Detailed Summary Section */}
            {!loading && statCardsData.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass-card rounded-[40px] p-8 md:p-10 relative overflow-hidden"
                >
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <Activity size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Actividad del Sistema</h2>
                            <p className="text-sm text-slate-500 font-medium">Distribución demográfica en tiempo real</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {statCardsData.map((stat) => (
                            <div key={stat.id} className="p-6 bg-slate-50/50 rounded-3xl border border-white/50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                                <div className="text-3xl font-black text-slate-800 group-hover:text-primary transition-colors">{stat.value}</div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.title}</div>
                            </div>
                        ))}

                        {/* Total Highlight */}
                        <div className="col-span-2 md:col-span-2 lg:col-span-1 p-6 bg-primary rounded-3xl shadow-xl shadow-primary/20 text-white">
                            <div className="text-3xl font-black">
                                {statCardsData.reduce((sum, stat) => {
                                    if (stat.id !== 'sections') return sum + stat.value;
                                    return sum;
                                }, 0)}
                            </div>
                            <div className="text-[10px] font-bold opacity-80 uppercase tracking-widest mt-1">Total Matrícula</div>
                        </div>
                    </div>

                    {/* Status Bar */}
                    <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                            <Calendar size={16} />
                            <span>Corte: {new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-2xl text-xs font-bold flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                            SERVIDOR EN LÍNEA
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default InicioPagina;