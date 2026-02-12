// import { NavLink } from "react-router-dom";
// import { useAuth } from "../../contextos/AuthContexto";
// import MostarInfoAdmin from "../componentes/MostarInfoAdmin";
// import {
//     FaUserPlus,
//     FaUsers,
//     FaHome,
//     FaUserGraduate,
//     FaUserTie,
//     FaChalkboardTeacher,
//     FaHardHat,
//     FaChalkboard,
//     FaChartBar,
//     FaCalendarAlt,
//     FaCog,
//     FaSignOutAlt,
//     FaUserEdit
// } from "react-icons/fa";
// import { IoIosArrowBack } from "react-icons/io";
// import Swal from "sweetalert2";
// export function Sidebar({ sidebarOpen, setSidebarOpen }) {
//     const { logout, user } = useAuth();
//     const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

//     const handleLogout = () => {
//         Swal.fire({
//             title: "Salir",
//             text: "Estas seguro que quieres cerrar sesion",
//             icon: "question",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Si, salir",
//             cancelButtonText: "Cancelar",
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 logout()
//             }
//         });
//     };

//     // Menú items con iconos
//     const menuItems = [
//         // Admin items (condicionales)
//         {
//             label: "Usuarios",
//             to: "/usuarios",
//             admin: true,
//             icon: <FaUserPlus className="text-xl" />
//         },
//         {
//             label: "Editar Usuarios",
//             to: "/editar-usuario",
//             admin: true,
//             icon: <FaUserEdit className="text-xl" />
//         },

//         // Items principales
//         {
//             label: "Inicio",
//             to: "/inicio",
//             icon: <FaHome className="text-xl" />
//         },
//         {
//             label: "Estudiantes",
//             to: "/estudiantes",
//             icon: <FaUserGraduate className="text-xl" />
//         },
//         {
//             label: "Administrativo",
//             to: "/personal/administrativos",
//             icon: <FaUserTie className="text-xl" />
//         },
//         {
//             label: "Docentes",
//             to: "/personal/docentes",
//             icon: <FaChalkboardTeacher className="text-xl" />
//         },
//         {
//             label: "Obreros",
//             to: "/personal/obreros",
//             icon: <FaHardHat className="text-xl" />
//         },
//         {
//             label: "Secciones",
//             to: "/secciones",
//             icon: <FaChalkboard className="text-xl" />
//         },
//         {
//             label: "Reportes",
//             to: "/reportes",
//             icon: <FaChartBar className="text-xl" />
//         },
//         {
//             label: "Actividades",
//             to: "/actividades",
//             icon: <FaCalendarAlt className="text-xl" />
//         },
//         {
//             label: "Configuración",
//             to: "/configuracion",
//             icon: <FaCog className="text-xl" />
//         },
//     ];

//     // Función para renderizar los items del menú (Desktop)
//     const renderDesktopMenuItems = () => (
//         <div className="py-4 px-2">
//             {/* Items Admin */}
//             <MostarInfoAdmin>
//                 {menuItems
//                     .filter(item => item.admin)
//                     .map(({ label, to, icon }) => (
//                         <div key={label} className="mb-1">
//                             <NavLink
//                                 to={to}
//                                 className={({ isActive }) => `
//                   flex items-center
//                   px-3 py-3 rounded-lg
//                   transition-all duration-200
//                   ${isActive
//                                         ? "bg-purple-600 text-white shadow-lg"
//                                         : "text-gray-300 hover:bg-gray-700"
//                                     }
//                   ${!sidebarOpen ? "justify-center" : ""}
//                 `}
//                                 title={!sidebarOpen ? label : ""}
//                             >
//                                 <span className="flex-shrink-0">{icon}</span>
//                                 {sidebarOpen && (
//                                     <span className="ml-3 text-sm font-medium truncate">
//                                         {label}
//                                     </span>
//                                 )}
//                             </NavLink>
//                         </div>
//                     ))}
//                 <div className="my-3 border-t border-gray-700"></div>
//             </MostarInfoAdmin>

//             {/* Items principales */}
//             {menuItems
//                 .filter(item => !item.admin && item.to !== "/configuracion")
//                 .map(({ label, to, icon }) => (
//                     <div key={label} className="mb-1">
//                         <NavLink
//                             to={to}
//                             end
//                             className={({ isActive }) => `
//                 flex items-center
//                 px-3 py-3 rounded-lg
//                 transition-all duration-200
//                 ${isActive
//                                     ? "bg-blue-600 text-white shadow-lg"
//                                     : "text-gray-300 hover:bg-gray-700"
//                                 }
//                 ${!sidebarOpen ? "justify-center" : ""}
//               `}
//                             title={!sidebarOpen ? label : ""}
//                         >
//                             <span className="flex-shrink-0">{icon}</span>
//                             {sidebarOpen && (
//                                 <span className="ml-3 text-sm font-medium truncate">
//                                     {label}
//                                 </span>
//                             )}
//                         </NavLink>
//                     </div>
//                 ))}

//             <div className="my-3 border-t border-gray-700"></div>

//             {/* Configuración */}
//             <div className="mb-1">
//                 <NavLink
//                     to="/configuracion"
//                     className={({ isActive }) => `
//             flex items-center
//             px-3 py-3 rounded-lg
//             transition-all duration-200
//             ${isActive
//                             ? "bg-gray-700 text-white"
//                             : "text-gray-300 hover:bg-gray-700"
//                         }
//             ${!sidebarOpen ? "justify-center" : ""}
//           `}
//                     title={!sidebarOpen ? "Configuración" : ""}
//                 >
//                     <FaCog className="text-xl flex-shrink-0" />
//                     {sidebarOpen && (
//                         <span className="ml-3 text-sm font-medium truncate">
//                             Configuración
//                         </span>
//                     )}
//                 </NavLink>
//             </div>

//             {/* Logout */}
//             <button
//                 onClick={handleLogout}
//                 className={`
//           flex items-center w-full
//           px-3 py-3 my-1 rounded-lg
//           text-red-400 hover:bg-red-900/20 
//           transition-all duration-200
//           ${!sidebarOpen ? "justify-center" : ""}
//         `}
//                 title={!sidebarOpen ? "Salir" : ""}
//             >
//                 <FaSignOutAlt className="text-xl flex-shrink-0" />
//                 {sidebarOpen && (
//                     <span className="ml-3 text-sm font-medium truncate">
//                         Salir
//                     </span>
//                 )}
//             </button>
//         </div>
//     );

//     // Función para renderizar los items del menú (Mobile)
//     const renderMobileMenuItems = () => (
//         <div className="py-4 px-2">
//             {/* Items Admin */}
//             <MostarInfoAdmin>
//                 {menuItems
//                     .filter(item => item.admin)
//                     .map(({ label, to, icon }) => (
//                         <div key={label} className="mb-1">
//                             <NavLink
//                                 to={to}
//                                 className={({ isActive }) => `
//                   flex items-center
//                   px-4 py-3 rounded-lg
//                   transition-all duration-200
//                   ${isActive
//                                         ? "bg-purple-600 text-white shadow-lg"
//                                         : "text-gray-300 hover:bg-gray-700"
//                                     }
//                 `}
//                                 onClick={() => setSidebarOpen(false)}
//                             >
//                                 <span className="flex-shrink-0">{icon}</span>
//                                 <span className="ml-3 text-sm font-medium">
//                                     {label}
//                                 </span>
//                             </NavLink>
//                         </div>
//                     ))}
//                 <div className="my-3 border-t border-gray-700"></div>
//             </MostarInfoAdmin>

//             {/* Items principales */}
//             {menuItems
//                 .filter(item => !item.admin && item.to !== "/configuracion")
//                 .map(({ label, to, icon }) => (
//                     <div key={label} className="mb-1">
//                         <NavLink
//                             to={to}
//                             end
//                             className={({ isActive }) => `
//                 flex items-center
//                 px-4 py-3 rounded-lg
//                 transition-all duration-200
//                 ${isActive
//                                     ? "bg-blue-600 text-white shadow-lg"
//                                     : "text-gray-300 hover:bg-gray-700"
//                                 }
//               `}
//                             onClick={() => setSidebarOpen(false)}
//                         >
//                             <span className="flex-shrink-0">{icon}</span>
//                             <span className="ml-3 text-sm font-medium">
//                                 {label}
//                             </span>
//                         </NavLink>
//                     </div>
//                 ))}

//             <div className="my-3 border-t border-gray-700"></div>

//             {/* Configuración */}
//             <div className="mb-1">
//                 <NavLink
//                     to="/configuracion"
//                     className={({ isActive }) => `
//             flex items-center
//             px-4 py-3 rounded-lg
//             transition-all duration-200
//             ${isActive
//                             ? "bg-gray-700 text-white"
//                             : "text-gray-300 hover:bg-gray-700"
//                         }
//           `}
//                     onClick={() => setSidebarOpen(false)}
//                 >
//                     <FaCog className="text-xl" />
//                     <span className="ml-3 text-sm font-medium">
//                         Configuración
//                     </span>
//                 </NavLink>
//             </div>

//             {/* Logout */}
//             <button
//                 onClick={() => {
//                     handleLogout();
//                     setSidebarOpen(false);
//                 }}
//                 className="flex items-center w-full text-left px-4 py-3 my-1 rounded-lg text-red-400 hover:bg-red-900/20 transition-all duration-200"
//             >
//                 <FaSignOutAlt className="text-xl" />
//                 <span className="ml-3 text-sm font-medium">
//                     Salir
//                 </span>
//             </button>
//         </div>
//     );

//     return (
//         <>
//             {/* Desktop Sidebar */}
//             <aside className={`
//         hidden md:flex md:flex-col md:fixed md:inset-y-0
//         bg-gradient-to-b from-gray-800 to-gray-900 text-white z-30
//         transition-all duration-300
//         ${sidebarOpen ? "w-64" : "w-16"}
//         h-screen
//         shadow-xl
//       `}>
//                 {/* Header */}
//                 <div className="p-4 border-b border-gray-700">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                             <div className={`
//                 flex-shrink-0 transition-all duration-300
//                 ${sidebarOpen ? "w-10 h-10" : "w-8 h-8"}
//                 bg-blue-600 rounded-full flex items-center justify-center
//               `}>
//                                 <span className="font-bold">
//                                     {user?.name?.charAt(0) || "U"}
//                                 </span>
//                             </div>
//                             {sidebarOpen && (
//                                 <div className="min-w-0">
//                                     <p className="font-semibold text-sm truncate">
//                                         {user?.name || "Usuario"}
//                                     </p>
//                                     <p className="text-xs text-gray-400 truncate">
//                                         {user?.roles || "Usuario"}
//                                     </p>
//                                 </div>
//                             )}
//                         </div>

//                         <button
//                             onClick={toggleSidebar}
//                             className={`
//                 p-1.5 hover:bg-gray-700 rounded-lg
//                 transition-all duration-300 cursor-pointer py-3 px-2 ml-2
//                 ${sidebarOpen ? "rotate-0" : "rotate-180"}
//               `}
//                             title={sidebarOpen ? "Colapsar" : "Expandir"}
//                         >
//                             <IoIosArrowBack />
//                         </button>
//                     </div>
//                 </div>

//                 {/* Menu Desktop - Contenedor con scrollbar personalizada */}
//                 <div className="flex-1 overflow-y-auto custom-scrollbar">
//                     {renderDesktopMenuItems()}
//                 </div>

//                 {sidebarOpen && (
//                     <div className="p-3 text-center text-xs text-gray-400 border-t border-gray-700">
//                         Sistema Escolar v1.0
//                     </div>
//                 )}
//             </aside>

//             {/* Mobile Sidebar */}
//             <div className={`
//         md:hidden fixed inset-0 z-40
//         ${sidebarOpen ? "block" : "hidden"}
//       `}>
//                 {/* Overlay */}
//                 {sidebarOpen && (
//                     <div
//                         className="absolute inset-0 bg-black bg-opacity-50"
//                         onClick={() => setSidebarOpen(false)}
//                     />
//                 )}

//                 {/* Sidebar Content */}
//                 <div className={`
//           absolute left-0 top-0 h-full w-64
//           bg-gradient-to-b from-gray-800 to-gray-900 text-white
//           transform transition-transform duration-300
//           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//           shadow-2xl
//         `}>
//                     {/* Mobile Header */}
//                     <div className="flex items-center justify-between p-4 border-b border-gray-700">
//                         <div className="flex items-center gap-3">
//                             <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
//                                 <span className="font-bold">
//                                     {user?.nombre?.charAt(0) || "U"}
//                                 </span>
//                             </div>
//                             <div className="min-w-0">
//                                 <p className="font-semibold truncate">
//                                     {user?.nombre || "Usuario"}
//                                 </p>
//                                 <p className="text-sm text-gray-400 truncate">Administrador</p>
//                             </div>
//                         </div>

//                         <button
//                             onClick={() => setSidebarOpen(false)}
//                             className="p-2 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
//                         >
//                             <span className="text-xl">×</span>
//                         </button>
//                     </div>

//                     {/* Mobile Menu - Contenedor con scrollbar personalizada */}
//                     <div className="h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar">
//                         {renderMobileMenuItems()}
//                     </div>

//                     {/* Footer Mobile */}
//                     <div className="p-3 text-center text-sm text-gray-400 border-t border-gray-700">
//                         Sistema Escolar v1.0
//                     </div>
//                 </div>
//             </div>

//             {/* Estilos para la barra de scroll personalizada */}
//             <style jsx>{`
//                 .custom-scrollbar {
//                     scrollbar-width: thin;
//                     scrollbar-color: #4a5568 #2d3748;
//                 }

//                 .custom-scrollbar::-webkit-scrollbar {
//                     width: 6px;
//                 }

//                 .custom-scrollbar::-webkit-scrollbar-track {
//                     background: #2d3748;
//                     border-radius: 3px;
//                 }

//                 .custom-scrollbar::-webkit-scrollbar-thumb {
//                     background-color: #4a5568;
//                     border-radius: 3px;
//                     border: none;
//                 }

//                 .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//                     background-color: #718096;
//                 }

//                 .custom-scrollbar::-webkit-scrollbar-corner {
//                     background: transparent;
//                 }
//             `}</style>
//         </>
//     );
// }


import { NavLink } from "react-router-dom";
import { useAuth } from "../../contextos/AuthContexto";
import MostarInfoAdmin from "../componentes/MostarInfoAdmin";
import {
    FaUserPlus,
    FaHome,
    FaUserGraduate,
    FaUserTie,
    FaChalkboardTeacher,
    FaHardHat,
    FaChalkboard,
    FaChartBar,
    FaCalendarAlt,
    FaCog,
    FaSignOutAlt,
    FaUserEdit,
    FaUserShield,
    FaUserCircle
} from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import Swal from "sweetalert2";

export function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const { logout, user } = useAuth();
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const handleLogout = () => {
        Swal.fire({
            title: "Salir",
            text: "Estas seguro que quieres cerrar sesion",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, salir",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                logout()
            }
        });
    };

    // Función para determinar si es administrador
    const isAdmin = () => {
        if (!user?.roles) return false;

        const roles = typeof user.roles === 'string'
            ? user.roles.toLowerCase()
            : Array.isArray(user.roles)
                ? user.roles.map(r => r.toString().toLowerCase())
                : [];

        if (typeof roles === 'string') {
            return roles.includes('administrador') || roles.includes('admin');
        }

        return roles.some(role =>
            role.includes('administrador') || role.includes('admin')
        );
    };

    // Función para formatear el rol para mostrar
    const formatRole = () => {
        if (!user?.roles) return "Usuario";

        if (isAdmin()) {
            return "Administrador";
        }

        // Si el rol es un array, tomar el primero
        if (Array.isArray(user.roles)) {
            return user.roles[0] || "Usuario";
        }

        // Si es string, capitalizar
        const role = user.roles.toString();
        return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    };

    // Función para obtener el color del avatar según el rol
    const getAvatarColor = () => {
        if (isAdmin()) {
            return "bg-gradient-to-br from-purple-600 to-purple-800";
        }
        return "bg-gradient-to-br from-blue-600 to-blue-800";
    };

    // Menú items con iconos
    const menuItems = [
        // Admin items (condicionales)
        {
            label: "Usuarios",
            to: "/usuarios",
            admin: true,
            icon: <FaUserPlus className="text-xl" />
        },
        // {
        //     label: "Editar Usuarios",
        //     to: "/editar-usuario",
        //     admin: true,
        //     icon: <FaUserEdit className="text-xl" />
        // },

        // Items principales
        {
            label: "Inicio",
            to: "/inicio",
            icon: <FaHome className="text-xl" />
        },
        {
            label: "Estudiantes",
            to: "/estudiantes",
            icon: <FaUserGraduate className="text-xl" />
        },
        {
            label: "Administrativo",
            to: "/personal/administrativos",
            icon: <FaUserTie className="text-xl" />
        },
        {
            label: "Docentes",
            to: "/personal/docentes",
            icon: <FaChalkboardTeacher className="text-xl" />
        },
        {
            label: "Obreros",
            to: "/personal/obreros",
            icon: <FaHardHat className="text-xl" />
        },
        {
            label: "Secciones",
            to: "/secciones",
            icon: <FaChalkboard className="text-xl" />
        },
        {
            label: "Reportes",
            to: "/reportes",
            icon: <FaChartBar className="text-xl" />
        },
        {
            label: "Actividades",
            to: "/actividades",
            icon: <FaCalendarAlt className="text-xl" />
        },
        {
            label: "Configuración",
            to: "/configuracion",
            icon: <FaCog className="text-xl" />
        },
    ];

    // Función para renderizar los items del menú (Desktop)
    const renderDesktopMenuItems = () => (
        <div className="py-4 px-2">
            {/* Items Admin */}
            <MostarInfoAdmin>
                {menuItems
                    .filter(item => item.admin)
                    .map(({ label, to, icon }) => (
                        <div key={label} className="mb-1">
                            <NavLink
                                to={to}
                                className={({ isActive }) => `
                  flex items-center
                  px-3 py-3 rounded-lg
                  transition-all duration-200
                  ${isActive
                                        ? "bg-purple-600 text-white shadow-lg"
                                        : "text-gray-300 hover:bg-gray-700"
                                    }
                  ${!sidebarOpen ? "justify-center" : ""}
                `}
                                title={!sidebarOpen ? label : ""}
                            >
                                <span className="flex-shrink-0">{icon}</span>
                                {sidebarOpen && (
                                    <span className="ml-3 text-sm font-medium truncate">
                                        {label}
                                    </span>
                                )}
                            </NavLink>
                        </div>
                    ))}
                <div className="my-3 border-t border-gray-700"></div>
            </MostarInfoAdmin>

            {/* Items principales */}
            {menuItems
                .filter(item => !item.admin && item.to !== "/configuracion")
                .map(({ label, to, icon }) => (
                    <div key={label} className="mb-1">
                        <NavLink
                            to={to}
                            end
                            className={({ isActive }) => `
                flex items-center
                px-3 py-3 rounded-lg
                transition-all duration-200
                ${isActive
                                    ? "bg-blue-600 text-white shadow-lg"
                                    : "text-gray-300 hover:bg-gray-700"
                                }
                ${!sidebarOpen ? "justify-center" : ""}
              `}
                            title={!sidebarOpen ? label : ""}
                        >
                            <span className="flex-shrink-0">{icon}</span>
                            {sidebarOpen && (
                                <span className="ml-3 text-sm font-medium truncate">
                                    {label}
                                </span>
                            )}
                        </NavLink>
                    </div>
                ))}

            <div className="my-3 border-t border-gray-700"></div>

            {/* Configuración */}
            <div className="mb-1">
                <NavLink
                    to="/configuracion"
                    className={({ isActive }) => `
            flex items-center
            px-3 py-3 rounded-lg
            transition-all duration-200
            ${isActive
                            ? "bg-gray-700 text-white"
                            : "text-gray-300 hover:bg-gray-700"
                        }
            ${!sidebarOpen ? "justify-center" : ""}
          `}
                    title={!sidebarOpen ? "Configuración" : ""}
                >
                    <FaCog className="text-xl flex-shrink-0" />
                    {sidebarOpen && (
                        <span className="ml-3 text-sm font-medium truncate">
                            Configuración
                        </span>
                    )}
                </NavLink>
            </div>

            {/* Logout */}
            <button
                onClick={handleLogout}
                className={`
          flex items-center w-full
          px-3 py-3 my-1 rounded-lg
          text-red-400 hover:bg-red-900/20 
          transition-all duration-200
          ${!sidebarOpen ? "justify-center" : ""}
        `}
                title={!sidebarOpen ? "Salir" : ""}
            >
                <FaSignOutAlt className="text-xl flex-shrink-0" />
                {sidebarOpen && (
                    <span className="ml-3 text-sm font-medium truncate">
                        Salir
                    </span>
                )}
            </button>
        </div>
    );

    // Función para renderizar los items del menú (Mobile)
    const renderMobileMenuItems = () => (
        <div className="py-4 px-2">
            {/* Items Admin */}
            <MostarInfoAdmin>
                {menuItems
                    .filter(item => item.admin)
                    .map(({ label, to, icon }) => (
                        <div key={label} className="mb-1">
                            <NavLink
                                to={to}
                                className={({ isActive }) => `
                  flex items-center
                  px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${isActive
                                        ? "bg-purple-600 text-white shadow-lg"
                                        : "text-gray-300 hover:bg-gray-700"
                                    }
                `}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <span className="flex-shrink-0">{icon}</span>
                                <span className="ml-3 text-sm font-medium">
                                    {label}
                                </span>
                            </NavLink>
                        </div>
                    ))}
                <div className="my-3 border-t border-gray-700"></div>
            </MostarInfoAdmin>

            {/* Items principales */}
            {menuItems
                .filter(item => !item.admin && item.to !== "/configuracion")
                .map(({ label, to, icon }) => (
                    <div key={label} className="mb-1">
                        <NavLink
                            to={to}
                            end
                            className={({ isActive }) => `
                flex items-center
                px-4 py-3 rounded-lg
                transition-all duration-200
                ${isActive
                                    ? "bg-blue-600 text-white shadow-lg"
                                    : "text-gray-300 hover:bg-gray-700"
                                }
              `}
                            onClick={() => setSidebarOpen(false)}
                        >
                            <span className="flex-shrink-0">{icon}</span>
                            <span className="ml-3 text-sm font-medium">
                                {label}
                            </span>
                        </NavLink>
                    </div>
                ))}

            <div className="my-3 border-t border-gray-700"></div>

            {/* Configuración */}
            <div className="mb-1">
                <NavLink
                    to="/configuracion"
                    className={({ isActive }) => `
            flex items-center
            px-4 py-3 rounded-lg
            transition-all duration-200
            ${isActive
                            ? "bg-gray-700 text-white"
                            : "text-gray-300 hover:bg-gray-700"
                        }
          `}
                    onClick={() => setSidebarOpen(false)}
                >
                    <FaCog className="text-xl" />
                    <span className="ml-3 text-sm font-medium">
                        Configuración
                    </span>
                </NavLink>
            </div>

            {/* Logout */}
            <button
                onClick={() => {
                    handleLogout();
                    setSidebarOpen(false);
                }}
                className="flex items-center w-full text-left px-4 py-3 my-1 rounded-lg text-red-400 hover:bg-red-900/20 transition-all duration-200"
            >
                <FaSignOutAlt className="text-xl" />
                <span className="ml-3 text-sm font-medium">
                    Salir
                </span>
            </button>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className={`
        hidden md:flex md:flex-col md:fixed md:inset-y-0
        bg-gradient-to-b from-gray-800 to-gray-900 text-white z-30
        transition-all duration-300
        ${sidebarOpen ? "w-64" : "w-16"}
        h-screen
        shadow-xl
      `}>
                {/* Header con información del usuario */}
                <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`
                                flex-shrink-0 transition-all duration-300
                                ${sidebarOpen ? "w-10 h-10" : "w-8 h-8"}
                                ${getAvatarColor()}
                                rounded-full flex items-center justify-center
                                shadow-md
                                ${isAdmin() ? "ring-2 ring-purple-400/30" : "ring-2 ring-blue-400/30"}
                            `}>
                                {isAdmin() ? (
                                    <FaUserShield className="text-white text-sm" />
                                ) : (
                                    <FaUserCircle className="text-white text-sm" />
                                )}
                            </div>
                            {sidebarOpen && (
                                <div className="min-w-0 flex-1">
                                    {/* Nombre del usuario */}
                                    <div className="flex items-center">
                                        <p className="font-semibold text-sm truncate mr-1">
                                            {user?.name || "Usuario"}
                                        </p>
                                        {isAdmin() && (
                                            <FaUserShield className="text-purple-400 flex-shrink-0" size={12} />
                                        )}
                                    </div>

                                    {/* Rol del usuario con estilo diferenciado */}
                                    <div className={`
                                        mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                                        ${isAdmin()
                                            ? "bg-purple-900/40 text-purple-300 border border-purple-700/30"
                                            : "bg-blue-900/40 text-blue-300 border border-blue-700/30"
                                        }
                                    `}>
                                        {isAdmin() && (
                                            <FaUserShield className="mr-1" size={8} />
                                        )}
                                        {formatRole()}
                                    </div>

                                    {/* Email si está disponible */}
                                    {user?.email && sidebarOpen && (
                                        <p className="mt-1 text-xs text-gray-400 truncate">
                                            {user.email}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={toggleSidebar}
                            className={`
                p-1.5 hover:bg-gray-700 rounded-lg
                transition-all duration-300 cursor-pointer py-3 px-2 ml-2
                ${sidebarOpen ? "rotate-0" : "rotate-180"}
              `}
                            title={sidebarOpen ? "Colapsar" : "Expandir"}
                        >
                            <IoIosArrowBack />
                        </button>
                    </div>
                </div>

                {/* Menu Desktop - Contenedor con scrollbar personalizada */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {renderDesktopMenuItems()}
                </div>

                {sidebarOpen && (
                    <div className="p-3 text-center text-xs text-gray-400 border-t border-gray-700">
                        Sistema Escolar v1.0
                    </div>
                )}
            </aside>

            {/* Mobile Sidebar */}
            <div className={`
        md:hidden fixed inset-0 z-40
        ${sidebarOpen ? "block" : "hidden"}
      `}>
                {/* Overlay */}
                {sidebarOpen && (
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar Content */}
                <div className={`
          absolute left-0 top-0 h-full w-64
          bg-gradient-to-b from-gray-800 to-gray-900 text-white
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          shadow-2xl
        `}>
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-700">
                        <div className="flex items-center gap-3">
                            <div className={`
                                w-10 h-10 ${getAvatarColor()} rounded-full 
                                flex items-center justify-center shadow-md
                                ${isAdmin() ? "ring-2 ring-purple-400/30" : "ring-2 ring-blue-400/30"}
                            `}>
                                {isAdmin() ? (
                                    <FaUserShield className="text-white" />
                                ) : (
                                    <FaUserCircle className="text-white" />
                                )}
                            </div>
                            <div className="min-w-0">
                                {/* Nombre y rol en móvil */}
                                <div className="flex items-center">
                                    <p className="font-semibold truncate mr-1">
                                        {user?.name || "Usuario"}
                                    </p>
                                    {isAdmin() && (
                                        <FaUserShield className="text-purple-400 flex-shrink-0" size={12} />
                                    )}
                                </div>

                                {/* Rol con badge */}
                                <div className={`
                                    mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                                    ${isAdmin()
                                        ? "bg-purple-900/40 text-purple-300 border border-purple-700/30"
                                        : "bg-blue-900/40 text-blue-300 border border-blue-700/30"
                                    }
                                `}>
                                    {isAdmin() && (
                                        <FaUserShield className="mr-1" size={8} />
                                    )}
                                    {formatRole()}
                                </div>

                                {/* Email si está disponible */}
                                {user?.email && (
                                    <p className="mt-1 text-xs text-gray-400 truncate">
                                        {user.email}
                                    </p>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="p-2 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                        >
                            <span className="text-xl">×</span>
                        </button>
                    </div>

                    {/* Mobile Menu - Contenedor con scrollbar personalizada */}
                    <div className="h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar">
                        {renderMobileMenuItems()}
                    </div>

                    {/* Footer Mobile */}
                    <div className="p-3 text-center text-sm text-gray-400 border-t border-gray-700">
                        Sistema Escolar v1.0
                    </div>
                </div>
            </div>

            {/* Estilos para la barra de scroll personalizada */}
            <style jsx>{`
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: #4a5568 #2d3748;
                }
                
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #2d3748;
                    border-radius: 3px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #4a5568;
                    border-radius: 3px;
                    border: none;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #718096;
                }
                
                .custom-scrollbar::-webkit-scrollbar-corner {
                    background: transparent;
                }
            `}</style>
        </>
    );
}