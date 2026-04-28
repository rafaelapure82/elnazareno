import { useState, useEffect } from "react";
import { Sidebar } from "../componentes/Sidebar";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const LayoutConSidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) setSidebarOpen(false);
            else setSidebarOpen(true);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-primary/20 selection:text-primary relative overflow-hidden flex">
            {/* Background Decorative Blobs (Apple Style) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-100/40 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-pink-50/30 rounded-full blur-[100px]"></div>
            </div>

            {/* Sidebar Component */}
            <Sidebar 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen} 
            />

            {/* Main Content Area */}
            <main 
                className={`
                    flex-1 transition-all duration-500 ease-in-out z-10 relative
                    ${isMobile ? "ml-0" : sidebarOpen ? "ml-[280px]" : "ml-[100px]"}
                    p-4 md:p-8
                `}
            >
                {/* Mobile Header Button */}
                {isMobile && !sidebarOpen && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={() => setSidebarOpen(true)}
                        className="fixed top-6 left-6 z-[60] w-12 h-12 glass-card rounded-2xl flex items-center justify-center text-primary shadow-lg"
                    >
                        <span className="text-2xl">☰</span>
                    </motion.button>
                )}

                {/* Page Content Wrapper with Transition */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={window.location.pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-7xl mx-auto"
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>

                {/* Simplified Footer */}
                <footer className="mt-20 py-8 border-t border-slate-200/50">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm font-medium">
                        <p>© {new Date().getFullYear()} CEIB El Nazareno - Sistema de Gestión Escolar</p>
                        <div className="flex gap-6">
                            <span className="hover:text-primary transition-colors cursor-help">Soporte Técnico</span>
                            <span className="hover:text-primary transition-colors cursor-help">Documentación</span>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default LayoutConSidebar;



// // layouts/LayoutConSidebar.jsx
// import { useState, useEffect } from "react";
// import { Sidebar } from "../componentes/Sidebar";
// import { Outlet } from "react-router-dom";
// import { FiMenu } from "react-icons/fi";
// import { useAuth } from "../../contextos/AuthContexto";

// const LayoutConSidebar = () => {
//     const [sidebarOpen, setSidebarOpen] = useState(true);
//     const [isMobile, setIsMobile] = useState(false);
//     const { user } = useAuth();

//     useEffect(() => {
//         const checkMobile = () => {
//             const mobile = window.innerWidth < 768;
//             setIsMobile(mobile);
//             if (mobile) {
//                 setSidebarOpen(false);
//             } else {
//                 setSidebarOpen(true);
//             }
//         };

//         checkMobile();
//         window.addEventListener("resize", checkMobile);

//         return () => window.removeEventListener("resize", checkMobile);
//     }, []);

//     // Márgenes dinámicos según si la sidebar está abierta
//     const getMainContentMargin = () => {
//         if (isMobile) return "ml-0";
//         return sidebarOpen ? "md:ml-64" : "md:ml-16";
//     };

//     return (
//         <div className="flex min-h-screen bg-gray-50">
//             {/* Sidebar */}
//             <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//             {/* Contenido principal */}
//             <div className={`flex-1 transition-all duration-300 ${getMainContentMargin()}`}>
//                 {/* Botón para abrir sidebar en móvil (solo visible en móvil cuando sidebar está cerrada) */}
//                 {isMobile && !sidebarOpen && (
//                     <button
//                         onClick={() => setSidebarOpen(true)}
//                         className="fixed top-4 left-4 z-20 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
//                     >
//                         <FiMenu className="text-xl" />
//                     </button>
//                 )}

//                 {/* Header móvil (opcional) */}
//                 {isMobile && (
//                     <div className="sticky top-0 z-10 bg-white shadow-sm md:hidden">
//                         <div className="px-4 py-3">
//                             <div className="flex items-center justify-between">
//                                 <h1 className="text-lg font-semibold text-gray-800">
//                                     Sistema Escolar
//                                 </h1>
//                                 <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                                     <span className="text-blue-600 font-bold">
//                                         {user?.nombre?.charAt(0) || "U"}
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Contenido */}
//                 <main className="p-4 md:p-6 min-h-screen">
//                     <div className="max-w-7xl mx-auto">
//                         <Outlet />
//                     </div>
//                 </main>

//                 {/* Footer opcional */}
//                 <footer className="mt-auto border-t bg-white p-4">
//                     <div className="text-center text-gray-500 text-sm">
//                         © {new Date().getFullYear()} Sistema Escolar. Todos los derechos reservados.
//                     </div>
//                 </footer>
//             </div>
//         </div>
//     );
// };

// export default LayoutConSidebar;