import React from 'react';
import { 
    Settings, 
    User, 
    Lock, 
    Info, 
    ShieldCheck, 
    Key, 
    Mail, 
    Fingerprint,
    Loader2,
    AlertCircle,
    ArrowRight,
    Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../contextos/AuthContexto';
import { ConfiguracionPerfil } from '../componentes/ConfiguracionPerfil';
import { CambiarContrasena } from '../componentes/CambiarContrasena';

const Configuracion = () => {
    const { user, isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Verificando Credenciales...</p>
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
                <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 ring-8 ring-rose-50/50">
                    <Shield size={40} />
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Acceso Restringido</h2>
                    <p className="text-slate-500 font-medium mt-2">Por favor, inicie sesión para configurar su perfil.</p>
                </div>
            </div>
        );
    }

    const idUsuario = user.id;

    return (
        <div className="max-w-[1200px] mx-auto space-y-10 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 pt-4">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-primary">
                        <div className="p-3 bg-primary/10 rounded-2xl">
                            <Settings size={32} />
                        </div>
                        <div className="h-px w-12 bg-primary/20" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Preferencias</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
                        Ajustes de <span className="text-primary">Cuenta</span>
                    </h1>
                    <p className="text-slate-500 font-medium text-lg max-w-2xl">
                        Personalice su perfil institucional, gestione sus credenciales y revise su seguridad.
                    </p>
                </div>

                <div className="bg-white/50 backdrop-blur-xl px-8 py-4 rounded-3xl border border-white shadow-xl shadow-slate-200/50 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-primary font-black">
                        {user.nombre?.charAt(0) || user.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <div className="text-sm font-black text-slate-900 uppercase tracking-tight">{user.nombre || user.name}</div>
                        <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Sesión Activa
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Column: Forms */}
                <div className="lg:col-span-8 space-y-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/60 overflow-hidden"
                    >
                        <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3 bg-slate-50/30">
                            <User size={20} className="text-primary" />
                            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em]">Información del Perfil</h2>
                        </div>
                        <div className="p-8">
                            <ConfiguracionPerfil idUsuario={idUsuario} />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/60 overflow-hidden"
                    >
                        <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3 bg-slate-50/30">
                            <Lock size={20} className="text-primary" />
                            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em]">Seguridad y Contraseña</h2>
                        </div>
                        <div className="p-8">
                            <CambiarContrasena idUsuario={idUsuario} />
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Account Info & Status */}
                <div className="lg:col-span-4 space-y-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-125 transition-transform duration-700">
                            <ShieldCheck size={120} />
                        </div>
                        <div className="relative space-y-8">
                            <div>
                                <h3 className="text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-4">Información de Cuenta</h3>
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                            <Fingerprint size={12} /> ID Único
                                        </span>
                                        <span className="font-mono text-sm font-bold text-slate-300">{user.id}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                            <User size={12} /> Usuario
                                        </span>
                                        <span className="font-bold text-slate-100">{user.name}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                            <Mail size={12} /> Email
                                        </span>
                                        <span className="font-bold text-slate-100">{user.email}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/10">
                                <div className="flex items-center gap-4 text-emerald-400">
                                    <div className="w-10 h-10 rounded-2xl bg-emerald-400/10 flex items-center justify-center">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black uppercase tracking-widest">Estado Seguro</div>
                                        <div className="text-xs font-bold text-slate-400">Autenticación verificada</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Support Card */}
                    <div className="bg-primary/5 rounded-[2.5rem] p-8 border border-primary/10">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                                <Info size={24} />
                            </div>
                            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">¿Necesita ayuda?</h4>
                        </div>
                        <p className="text-slate-500 text-xs font-medium leading-relaxed mb-6">
                            Si tiene problemas con su cuenta o desea solicitar cambios en sus permisos institucionales, contacte al administrador.
                        </p>
                        <button className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest group">
                            Soporte Técnico <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Configuracion;