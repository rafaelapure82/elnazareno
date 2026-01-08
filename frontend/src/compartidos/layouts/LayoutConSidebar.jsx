import { useState, useEffect } from "react";
import { Sidebar } from "../componentes/Sidebar";
import { Outlet } from "react-router-dom";

const LayoutConSidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Detectar si es móvil
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            }
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    // Función para alternar sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Cerrar sidebar en móvil al hacer clic fuera
    const handleContentClick = () => {
        if (isMobile && sidebarOpen) {
            setSidebarOpen(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Overlay para móvil */}
            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Contenido principal */}
            <div
                className={`
          flex-1 transition-all duration-300
          ${sidebarOpen && !isMobile ? "md:ml-64" : "md:ml-20"}
          min-h-screen
        `}
                onClick={handleContentClick}
            >
                {/* Botón para abrir sidebar en móvil */}
                {isMobile && !sidebarOpen && (
                    <button
                        onClick={toggleSidebar}
                        className="fixed top-4 left-4 z-20 p-2 bg-blue-600 text-white rounded-lg shadow-lg md:hidden"
                    >
                        ☰
                    </button>
                )}

                {/* Header fijo (opcional) */}
                <header className="sticky top-0 z-10 bg-white shadow-sm md:hidden">
                    <div className="px-4 py-3">
                        <div className="flex items-center justify-between">
                            <h1 className="text-lg font-semibold text-gray-800">
                                Sistema Escolar
                            </h1>
                            <button
                                onClick={toggleSidebar}
                                className="p-2 rounded-lg hover:bg-gray-100"
                            >
                                {sidebarOpen ? "✕" : "☰"}
                            </button>
                        </div>
                    </div>
                </header>

                {/* Contenido de la página */}
                <main className="p-4 md:p-6">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>

                {/* Footer (opcional) */}
                <footer className="mt-auto border-t bg-white p-4">
                    <div className="text-center text-gray-500 text-sm">
                        © {new Date().getFullYear()} Sistema Escolar. Todos los derechos reservados.
                    </div>
                </footer>
            </div>
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