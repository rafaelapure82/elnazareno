import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contextos/AuthContexto";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Users, 
  UserPlus, 
  GraduationCap, 
  Briefcase, 
  BookOpen, 
  Calendar, 
  Settings, 
  LogOut, 
  ChevronLeft,
  LayoutDashboard,
  ShieldCheck,
  UserRound,
  FileText
} from "lucide-react";
import Swal from "sweetalert2";

export function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const { logout, user } = useAuth();

    const handleLogout = () => {
        Swal.fire({
            title: "¿Cerrar sesión?",
            text: "Volverás a la pantalla de inicio de sesión.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#8300cd",
            cancelButtonColor: "#f43f5e",
            confirmButtonText: "Sí, salir",
            cancelButtonText: "Cancelar",
            background: "rgba(255, 255, 255, 0.9)",
            backdrop: `rgba(0,0,0,0.4) blur(4px)`
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
            }
        });
    };

    const isAdmin = () => {
        const roles = user?.roles?.toString().toLowerCase() || "";
        return roles.includes('admin') || roles.includes('administrador');
    };

    const menuItems = [
        { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
        { label: "Inicio", to: "/inicio", icon: Home },
        { label: "Usuarios", to: "/usuarios", icon: UserPlus, admin: true },
        { label: "Estudiantes", to: "/estudiantes", icon: GraduationCap },
        { label: "Administrativo", to: "/personal/administrativos", icon: ShieldCheck },
        { label: "Docentes", to: "/personal/docentes", icon: UserRound },
        { label: "Obreros", to: "/personal/obreros", icon: Briefcase },
        { label: "Secciones", to: "/secciones", icon: BookOpen },
        { label: "Reportes", to: "/reportes", icon: FileText },
        { label: "Actividades", to: "/actividades", icon: Calendar },
        { label: "Configuración", to: "/configuracion", icon: Settings },
    ];

    return (
        <>
            {/* Desktop Sidebar (Floating Apple Style) */}
            <motion.aside 
                initial={false}
                animate={{ width: sidebarOpen ? 260 : 80 }}
                className="hidden md:flex flex-col fixed left-4 top-4 bottom-4 glass-sidebar rounded-[32px] z-50 overflow-hidden"
            >
                {/* User Profile Header */}
                <div className="p-6">
                    <div className="flex items-center gap-3">
                        <motion.div 
                            layout
                            className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg`}
                        >
                            <span className="font-bold text-lg">
                                {user?.nombre?.charAt(0) || user?.name?.charAt(0) || "A"}
                            </span>
                        </motion.div>
                        <AnimatePresence>
                            {sidebarOpen && (
                                <motion.div 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="min-w-0"
                                >
                                    <p className="font-bold text-gray-800 text-sm truncate leading-tight">
                                        {user?.nombre || user?.name || "Administrador"}
                                    </p>
                                    <p className="text-[10px] uppercase tracking-widest text-primary font-bold mt-0.5">
                                        {isAdmin() ? "Sistema Master" : "Personal"}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Navigation Menu */}
                <div className="flex-1 px-3 space-y-1 overflow-y-auto no-scrollbar">
                    {menuItems.map((item) => {
                        if (item.admin && !isAdmin()) return null;
                        
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative
                                    ${isActive 
                                        ? "bg-primary/10 text-primary" 
                                        : "text-gray-500 hover:bg-white/50 hover:text-gray-800"
                                    }
                                    ${!sidebarOpen ? "justify-center px-2" : ""}
                                `}
                            >
                                {({ isActive }) => (
                                    <>
                                        <Icon size={isActive ? 22 : 20} strokeWidth={isActive ? 2.5 : 2} className="flex-shrink-0 transition-transform group-hover:scale-110" />
                                        {sidebarOpen && (
                                            <span className={`text-sm font-semibold truncate ${isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"}`}>
                                                {item.label}
                                            </span>
                                        )}
                                        {isActive && (
                                            <motion.div 
                                                layoutId="active-indicator"
                                                className="absolute left-0 w-1.5 h-6 bg-primary rounded-full shadow-[0_0_10px_rgba(131,0,205,0.5)]"
                                            />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </div>

                {/* Footer / Toggle */}
                <div className="p-4 border-t border-white/20 bg-white/30 backdrop-blur-sm">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="w-full flex items-center justify-center p-3 rounded-2xl hover:bg-white/50 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <motion.div
                            animate={{ rotate: sidebarOpen ? 0 : 180 }}
                        >
                            <ChevronLeft size={20} />
                        </motion.div>
                    </button>
                    
                    <button
                        onClick={handleLogout}
                        className={`mt-2 w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-colors ${!sidebarOpen ? "justify-center px-2" : ""}`}
                    >
                        <LogOut size={20} />
                        {sidebarOpen && <span className="text-sm font-bold uppercase tracking-tighter">Cerrar Sesión</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {sidebarOpen && (
                    <div className="md:hidden fixed inset-0 z-[100]">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute left-0 top-0 bottom-0 w-[280px] bg-white rounded-r-[40px] shadow-2xl p-6 flex flex-col"
                        >
                             <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold">
                                        {user?.nombre?.charAt(0) || "A"}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 leading-none">{user?.nombre || "Admin"}</p>
                                        <p className="text-[10px] text-primary font-bold mt-1 uppercase">CEIB El Nazareno</p>
                                    </div>
                                </div>
                                <button onClick={() => setSidebarOpen(false)} className="p-2 text-gray-400">×</button>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-1">
                                {menuItems.map((item) => {
                                    if (item.admin && !isAdmin()) return null;
                                    const Icon = item.icon;
                                    return (
                                        <NavLink
                                            key={item.to}
                                            to={item.to}
                                            onClick={() => setSidebarOpen(false)}
                                            className={({ isActive }) => `
                                                flex items-center gap-3 px-5 py-4 rounded-2xl transition-all
                                                ${isActive ? "bg-primary text-white shadow-lg shadow-primary/30" : "text-gray-500 hover:bg-gray-50"}
                                            `}
                                        >
                                            <Icon size={20} />
                                            <span className="font-semibold">{item.label}</span>
                                        </NavLink>
                                    );
                                })}
                            </div>

                            <button
                                onClick={handleLogout}
                                className="mt-6 flex items-center gap-3 px-5 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-colors"
                            >
                                <LogOut size={20} />
                                <span className="font-bold uppercase tracking-tighter">Salir del Sistema</span>
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}