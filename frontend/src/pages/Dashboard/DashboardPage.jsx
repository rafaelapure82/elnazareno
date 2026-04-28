import React from 'react';
import { 
    LayoutDashboard, 
    GraduationCap, 
    UserRound, 
    Calendar, 
    CheckCircle2,
    TrendingUp,
    Users,
    BookOpen,
    Bell,
    ArrowUpRight,
    Search,
    ChevronRight,
    Star,
    Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardPage = () => {
    return (
        <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 pt-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                >
                    <div className="flex items-center gap-3 text-primary">
                        <div className="p-3 bg-primary/10 rounded-2xl">
                            <LayoutDashboard size={32} />
                        </div>
                        <div className="h-px w-12 bg-primary/20" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Panel de Control</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
                        Dashboard <span className="text-primary font-bold">General</span>
                    </h1>
                    <p className="text-slate-500 font-medium text-lg max-w-2xl">
                        Visión integral del estado administrativo y académico del Complejo Educativo Ceibel Nazareno.
                    </p>
                </motion.div>

                <div className="flex items-center gap-4">
                    <div className="bg-white/50 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white shadow-xl shadow-slate-200/50 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                            <CheckCircle2 size={20} />
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estado Global</div>
                            <div className="text-sm font-black text-slate-900 uppercase">Sistema Óptimo</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 px-4">
                {[
                    { label: 'Estudiantes', val: '1,250', icon: GraduationCap, color: 'blue', tag: 'Matrícula' },
                    { label: 'Profesores', val: '85', icon: UserRound, color: 'emerald', tag: 'Académico' },
                    { label: 'Actividades', val: '12', icon: Calendar, color: 'primary', tag: 'Eventos' },
                    { label: 'Secciones', val: '42', icon: BookOpen, color: 'amber', tag: 'Estructura' }
                ].map((stat, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="group relative bg-white/70 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/60 overflow-hidden"
                    >
                        <div className={`absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-700 text-${stat.color === 'primary' ? 'primary' : stat.color + '-500'}`}>
                            <stat.icon size={120} />
                        </div>
                        <div className="relative flex flex-col justify-between h-40">
                            <div className="flex justify-between items-start">
                                <div className={`p-4 rounded-2xl bg-${stat.color === 'primary' ? 'primary' : stat.color + '-500'} text-white shadow-2xl shadow-${stat.color === 'primary' ? 'primary/20' : stat.color + '-100'}`}>
                                    <stat.icon size={24} />
                                </div>
                                <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-${stat.color === 'primary' ? 'primary' : stat.color + '-500'}/10 text-${stat.color === 'primary' ? 'primary' : stat.color + '-600'} rounded-full`}>
                                    {stat.tag}
                                </span>
                            </div>
                            <div>
                                <div className="text-4xl font-black text-slate-900 tracking-tighter">{stat.val}</div>
                                <div className="flex items-center gap-2 mt-1">
                                    <TrendingUp size={14} className="text-emerald-500" />
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label} Registrados</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 px-4">
                {/* Recent Activity / Announcements */}
                <div className="xl:col-span-2 space-y-8">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-primary flex items-center justify-center shadow-lg">
                                <Bell size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Actividad Institucional</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Últimos movimientos del sistema</p>
                            </div>
                        </div>
                        <button className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:translate-x-1 transition-transform flex items-center gap-2">
                            Ver Todo <ChevronRight size={14} />
                        </button>
                    </div>

                    <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/60 overflow-hidden divide-y divide-slate-50">
                        {[
                            { title: 'Nueva Inscripción', desc: 'Se ha registrado un nuevo estudiante en 1ER GRADO "A"', time: 'Hace 5 min', user: 'Admin' },
                            { title: 'Reporte Mensual', desc: 'El reporte de asistencia de Marzo ya está disponible', time: 'Hace 1 hora', user: 'Sist.' },
                            { title: 'Evento Programado', desc: 'Aniversario Institucional - Acto Central', time: 'Hace 2 horas', user: 'Coord.' }
                        ].map((item, i) => (
                            <div key={i} className="group p-8 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-white group-hover:text-primary group-hover:shadow-xl transition-all border border-transparent group-hover:border-slate-100">
                                        <Star size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-800 uppercase tracking-tight text-sm">{item.title}</h4>
                                        <p className="text-slate-500 text-sm font-medium mt-1">{item.desc}</p>
                                        <div className="flex items-center gap-3 mt-3">
                                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-1">
                                                <Clock size={10} /> {item.time}
                                            </span>
                                            <div className="w-1 h-1 rounded-full bg-slate-200" />
                                            <span className="text-[9px] font-black text-primary uppercase tracking-widest">{item.user}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="p-3 bg-slate-50 text-slate-300 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-primary hover:shadow-lg">
                                    <ArrowUpRight size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Status Column */}
                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-125 transition-transform duration-700">
                            <TrendingUp size={120} />
                        </div>
                        <div className="relative space-y-10">
                            <div className="space-y-4">
                                <h3 className="text-primary font-black text-[10px] uppercase tracking-[0.4em]">Actualización</h3>
                                <h4 className="text-3xl font-black leading-tight tracking-tight">Sistema Premium <br/>Implementado</h4>
                                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                                    Toda la interfaz administrativa ha sido migrada a la arquitectura Glassmorphism con componentes de alta fidelidad.
                                </p>
                            </div>
                            <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                    <CheckCircle2 size={24} />
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-widest">
                                    Capa Frontend: <span className="text-white">v4.0.0</span> <br/>
                                    <span className="text-emerald-400">100% Funcional</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary/5 p-8 rounded-[2.5rem] border border-primary/10 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                                <Users size={24} />
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Acceso Rápido</h4>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Módulos más usados</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {['Estudiantes', 'Personal', 'Reportes', 'Secciones'].map((mod, i) => (
                                <button key={i} className="px-4 py-3 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-widest hover:border-primary/30 hover:text-primary transition-all shadow-sm">
                                    {mod}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;