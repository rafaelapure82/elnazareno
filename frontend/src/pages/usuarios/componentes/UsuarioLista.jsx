// import React, { useEffect, useState } from 'react';
// import { FaPlus, FaSync, FaSearch } from 'react-icons/fa';
// import { useUsuarios } from '../hooks/useUsuarios';
// import UsuarioItem from './UsuarioItem';
// import { useAuth } from '../../../contextos/AuthContexto';

// const UsuarioLista = ({ onNuevoUsuario, onEditarUsuario, onVerUsuario }) => {
//     const { user } = useAuth();
//     const { usuarios, loading, error, total, cargarUsuarios, eliminarUsuario } = useUsuarios();
//     const [busqueda, setBusqueda] = useState('');
//     const [filtroRol, setFiltroRol] = useState('');


//     useEffect(() => {
//         cargarUsuarios();
//     }, [cargarUsuarios]);

//     const handleBuscar = (busquedaActual = busqueda, rolActual = filtroRol) => {
//         const params = {};
//         if (busqueda) params.search = busqueda;
//         if (filtroRol) params.rol = filtroRol;
//         cargarUsuarios(params);
//     };

//     const handleRecargar = () => {
//         setBusqueda('');
//         setFiltroRol('');
//         cargarUsuarios()
//     };

//     const handleKeyPress = (e) => {
//         if (e.key === 'Enter') {
//             handleBuscar();
//         }
//     };

//     const handleFiltroRolChange = (e) => {
//         const nuevoRol = e.target.value;
//         setFiltroRol(nuevoRol);

//         // Buscar automáticamente al cambiar el filtro
//         const params = {};
//         if (busqueda) params.search = busqueda;
//         if (nuevoRol) params.rol = nuevoRol;
//         cargarUsuarios(params);
//     };

//     if (error) {
//         return (
//             <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                 <p className="text-red-700">Error: {error}</p>
//                 <button
//                     onClick={handleRecargar}
//                     className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
//                 >
//                     Reintentar
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <div className="bg-white rounded-lg shadow">
//             {/* Header */}


//             <div className="px-6 py-4 border-b border-gray-200">
//                 <div className="flex justify-between items-center">
//                     <div>
//                         <h2 className="text-2xl font-bold text-gray-800">Usuarios</h2>
//                         <p className="text-gray-600">Total: {total} usuarios</p>
//                     </div>
//                     <button
//                         onClick={onNuevoUsuario}
//                         className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                     >
//                         <FaPlus className="mr-2" />
//                         Nuevo Usuario
//                     </button>
//                 </div>

//                 {/* Filtros de búsqueda */}
//                 <div className="mt-4 space-y-4">
//                     <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
//                         {/* Campo de búsqueda */}
//                         <div className="flex-1 relative">
//                             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                             <input
//                                 type="text"
//                                 value={busqueda}
//                                 onChange={(e) => setBusqueda(e.target.value)}
//                                 onKeyPress={handleKeyPress}
//                                 placeholder="Buscar por nombre, usuario o correo..."
//                                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             />
//                         </div>

//                         {/* Filtro por rol */}
//                         <div className="w-full md:w-auto">
//                             <select
//                                 value={filtroRol}
//                                 onChange={handleFiltroRolChange}
//                                 className="w-full md:w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             >
//                                 <option value="">Todos los roles</option>
//                                 <option value="administrador">Administrador</option>
//                                 <option value="usuario">Usuario</option>
//                             </select>
//                         </div>

//                         {/* Botones de acción */}
//                         <div className="flex space-x-2">
//                             <button
//                                 onClick={handleBuscar}
//                                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
//                             >
//                                 <FaSearch className="mr-2" />
//                                 Buscar
//                             </button>
//                             <button
//                                 onClick={handleRecargar}
//                                 className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center"
//                                 title="Recargar"
//                             >
//                                 <FaSync className={loading ? 'animate-spin' : ''} />
//                             </button>
//                         </div>
//                     </div>

//                     {/* Mostrar filtros activos */}
//                     {(busqueda || filtroRol) && (
//                         <div className="flex items-center space-x-2 text-sm">
//                             <span className="text-gray-600">Filtros activos:</span>
//                             {busqueda && (
//                                 <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center">
//                                     Búsqueda: {busqueda}
//                                     <button
//                                         onClick={() => {
//                                             setBusqueda('');
//                                             // Llamar a buscar con búsqueda vacía pero manteniendo rol si existe
//                                             handleBuscar('', filtroRol);
//                                         }}
//                                         className="ml-1 text-blue-600 hover:text-blue-800"
//                                     >
//                                         ×
//                                     </button>
//                                 </span>
//                             )}
//                             {filtroRol && (
//                                 <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full flex items-center">
//                                     Rol: {filtroRol}
//                                     <button
//                                         onClick={() => {
//                                             setFiltroRol('');
//                                             // Llamar a buscar con rol vacío pero manteniendo búsqueda si existe
//                                             handleBuscar(busqueda, '');
//                                         }}
//                                         className="ml-1 text-purple-600 hover:text-purple-800"
//                                     >
//                                         ×
//                                     </button>
//                                 </span>
//                             )}
//                             {/* Botón para limpiar todos los filtros */}
//                             {(busqueda && filtroRol) && (
//                                 <button
//                                     onClick={() => {
//                                         setBusqueda('');
//                                         setFiltroRol('');
//                                         cargarUsuarios(); // Sin parámetros = todos los usuarios
//                                     }}
//                                     className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900"
//                                 >
//                                     Limpiar todos
//                                 </button>
//                             )}
//                         </div>
//                     )}



//                 </div>


//             </div>

//             {/* Tabla */}
//             <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Usuario
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Correo
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Rol
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Último Login
//                             </th>
//                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Acciones
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         {loading ? (
//                             <tr>
//                                 <td colSpan="5" className="px-6 py-8 text-center">
//                                     <div className="flex justify-center">
//                                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                                     </div>
//                                     <p className="mt-2 text-gray-600">Cargando usuarios...</p>
//                                 </td>
//                             </tr>
//                         ) : usuarios.length === 0 ? (
//                             <tr>
//                                 <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
//                                     No se encontraron usuarios
//                                 </td>
//                             </tr>
//                         ) : (
//                             usuarios.map((usuario) => (
//                                 <UsuarioItem
//                                     key={usuario.id}
//                                     usuario={usuario}
//                                     onEdit={onEditarUsuario}
//                                     onDelete={eliminarUsuario}
//                                     onView={onVerUsuario}
//                                     usuarioActualId={user?.id}
//                                 />
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default UsuarioLista;




import React, { useEffect, useState, useCallback } from 'react';
import { FaPlus, FaSync, FaSearch } from 'react-icons/fa';
import { useUsuarios } from '../hooks/useUsuarios';
import UsuarioItem from './UsuarioItem';
import { useAuth } from '../../../contextos/AuthContexto';

const UsuarioLista = ({ onNuevoUsuario, onEditarUsuario, onVerUsuario }) => {
    const { user } = useAuth();
    const { usuarios, loading, error, total, cargarUsuarios, eliminarUsuario } = useUsuarios();
    const [busqueda, setBusqueda] = useState('');
    const [filtroRol, setFiltroRol] = useState('');

    useEffect(() => {
        cargarUsuarios();
    }, [cargarUsuarios]);

    // Usar useCallback para evitar recreaciones innecesarias
    const handleBuscar = useCallback((busquedaActual = busqueda, rolActual = filtroRol) => {
        const params = {};
        if (busquedaActual) params.search = busquedaActual;
        if (rolActual) params.rol = rolActual;
        cargarUsuarios(params);
    }, [busqueda, filtroRol, cargarUsuarios]);

    const handleRecargar = useCallback(() => {
        setBusqueda('');
        setFiltroRol('');
        cargarUsuarios();
    }, [cargarUsuarios]);

    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter') {
            handleBuscar();
        }
    }, [handleBuscar]);

    const handleFiltroRolChange = useCallback((e) => {
        const nuevoRol = e.target.value;
        setFiltroRol(nuevoRol);
        handleBuscar(busqueda, nuevoRol);
    }, [busqueda, handleBuscar]);

    const handleLimpiarBusqueda = useCallback(() => {
        setBusqueda('');
        handleBuscar('', filtroRol);
    }, [filtroRol, handleBuscar]);

    const handleLimpiarRol = useCallback(() => {
        setFiltroRol('');
        handleBuscar(busqueda, '');
    }, [busqueda, handleBuscar]);

    const handleLimpiarTodos = useCallback(() => {
        setBusqueda('');
        setFiltroRol('');
        cargarUsuarios();
    }, [cargarUsuarios]);

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700">Error: {error}</p>
                <button
                    onClick={handleRecargar}
                    className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Usuarios</h2>
                        <p className="text-gray-600">Total: {total} usuarios</p>
                    </div>
                    <button
                        onClick={onNuevoUsuario}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <FaPlus className="mr-2" />
                        Nuevo Usuario
                    </button>
                </div>

                {/* Filtros de búsqueda */}
                <div className="mt-4 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
                        {/* Campo de búsqueda */}
                        <div className="flex-1 relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Buscar por nombre, usuario o correo..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Filtro por rol */}
                        <div className="w-full md:w-auto">
                            <select
                                value={filtroRol}
                                onChange={handleFiltroRolChange}
                                className="w-full md:w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Todos los roles</option>
                                <option value="administrador">Administrador</option>
                                <option value="usuario">Usuario</option>
                            </select>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleBuscar()}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                            >
                                <FaSearch className="mr-2" />
                                Buscar
                            </button>
                            <button
                                onClick={handleRecargar}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center"
                                title="Recargar"
                            >
                                <FaSync className={loading ? 'animate-spin' : ''} />
                            </button>
                        </div>
                    </div>

                    {/* Mostrar filtros activos */}
                    {(busqueda || filtroRol) && (
                        <div className="flex items-center flex-wrap gap-2 text-sm">
                            <span className="text-gray-600">Filtros activos:</span>
                            {busqueda && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center">
                                    Búsqueda: {busqueda}
                                    <button
                                        onClick={handleLimpiarBusqueda}
                                        className="ml-1 text-blue-600 hover:text-blue-800"
                                    >
                                        ×
                                    </button>
                                </span>
                            )}
                            {filtroRol && (
                                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full flex items-center">
                                    Rol: {filtroRol}
                                    <button
                                        onClick={handleLimpiarRol}
                                        className="ml-1 text-purple-600 hover:text-purple-800"
                                    >
                                        ×
                                    </button>
                                </span>
                            )}
                            <button
                                onClick={handleLimpiarTodos}
                                className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900 underline"
                            >
                                Limpiar todos los filtros
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Usuario
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Correo
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Rol
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Último Login
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center">
                                    <div className="flex justify-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                    </div>
                                    <p className="mt-2 text-gray-600">Cargando usuarios...</p>
                                </td>
                            </tr>
                        ) : usuarios.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                    No se encontraron usuarios
                                </td>
                            </tr>
                        ) : (
                            usuarios.map((usuario) => (
                                <UsuarioItem
                                    key={usuario.id}
                                    usuario={usuario}
                                    onEdit={onEditarUsuario}
                                    onDelete={eliminarUsuario}
                                    onView={onVerUsuario}
                                    usuarioActualId={user?.id}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsuarioLista;