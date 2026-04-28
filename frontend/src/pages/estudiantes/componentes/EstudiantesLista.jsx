// import React, { useState } from 'react';
// import { FaEye, FaEdit, FaTrash, FaUserGraduate, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
// import { useEstudiantes } from '../hooks/useEstudiantes';
// import Swal from 'sweetalert2';
// import Paginacion from './Paginacion';

// const EstudiantesLista = ({ onView, onEdit, onDelete }) => {
//     const [sortConfig, setSortConfig] = useState({ key: 'apellidos', direction: 'asc' });
//     const { estudiantes, loading, error, pagination, eliminarEstudiante, actualizarFiltros } = useEstudiantes();

//     const handleSort = (key) => {
//         let direction = 'asc';
//         if (sortConfig.key === key && sortConfig.direction === 'asc') {
//             direction = 'desc';
//         }
//         setSortConfig({ key, direction });
//         actualizarFiltros({ sortBy: key, sortOrder: direction });
//     };

//     const handleDelete = async (id, nombre) => {
//         const result = await Swal.fire({
//             title: '¿Estás seguro?',
//             text: `Vas a eliminar al estudiante ${nombre}. Esta acción no se puede deshacer.`,
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#d33',
//             cancelButtonColor: '#3085d6',
//             confirmButtonText: 'Sí, eliminar',
//             cancelButtonText: 'Cancelar'
//         });

//         if (result.isConfirmed) {
//             try {
//                 await eliminarEstudiante(id);
//                 Swal.fire('¡Eliminado!', 'El estudiante ha sido eliminado.', 'success');
//             } catch (error) {
//                 Swal.fire('Error', 'No se pudo eliminar el estudiante.', 'error');
//             }
//         }
//     };

//     const getSortIcon = (key) => {
//         if (sortConfig.key !== key) return <FaSort className="text-gray-400" />;
//         return sortConfig.direction === 'asc'
//             ? <FaSortUp className="text-blue-500" />
//             : <FaSortDown className="text-blue-500" />;
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-64">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
//                 <strong>Error:</strong> {error}
//             </div>
//         );
//     }

//     if (estudiantes.length === 0) {
//         return (
//             <div className="text-center py-12">
//                 <FaUserGraduate className="mx-auto h-12 w-12 text-gray-400" />
//                 <h3 className="mt-2 text-sm font-medium text-gray-900">No hay estudiantes</h3>
//                 <p className="mt-1 text-sm text-gray-500">No se encontraron estudiantes con los criterios actuales.</p>
//             </div>
//         );
//     }

//     return (
//         <div className="overflow-x-auto bg-white shadow rounded-lg">
//             <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                     <tr>
//                         <th
//                             scope="col"
//                             className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
//                             onClick={() => handleSort('nombres')}
//                         >
//                             <div className="flex items-center space-x-1">
//                                 <span>Nombre</span>
//                                 {getSortIcon('nombres')}
//                             </div>
//                         </th>
//                         <th
//                             scope="col"
//                             className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
//                             onClick={() => handleSort('cedula_escolar')}
//                         >
//                             <div className="flex items-center space-x-1">
//                                 <span>Cédula Escolar</span>
//                                 {getSortIcon('cedula_escolar')}
//                             </div>
//                         </th>
//                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Edad
//                         </th>
//                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Representante
//                         </th>
//                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Teléfono
//                         </th>
//                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Acciones
//                         </th>
//                     </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                     {estudiantes.map((estudiante) => (
//                         <tr key={estudiante.id} className="hover:bg-gray-50">
//                             <td className="px-6 py-4 whitespace-nowrap">
//                                 <div className="flex items-center">
//                                     <div className="flex-shrink-0 h-10 w-10">
//                                         {estudiante.foto ? (
//                                             <img
//                                                 className="h-10 w-10 rounded-full object-cover"
//                                                 src={estudiante.fotoUrl}
//                                                 alt={estudiante.nombreCompleto}
//                                             />
//                                         ) : (
//                                             <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
//                                                 <FaUserGraduate className="h-5 w-5 text-blue-600" />
//                                             </div>
//                                         )}
//                                     </div>
//                                     <div className="ml-4">
//                                         <div className="text-sm font-medium text-gray-900">
//                                             {estudiante.nombreCompleto}
//                                         </div>
//                                         <div className="text-sm text-gray-500">
//                                             {estudiante.cedula ? `V-${estudiante.cedula}` : 'Sin cédula'}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                 {estudiante.cedulaEscolar}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                 {estudiante.edad} años
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                                 <div className="text-sm text-gray-900">{estudiante.representante?.nombreCompleto}</div>
//                                 <div className="text-sm text-gray-500">{estudiante.representante?.relacion}</div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                 {estudiante.representante?.telefono}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                 <div className="flex space-x-2">
//                                     <button
//                                         onClick={() => onView(estudiante.id)}
//                                         className="text-blue-600 hover:text-blue-900"
//                                         title="Ver detalle"
//                                     >
//                                         <FaEye className="h-5 w-5" />
//                                     </button>
//                                     <button
//                                         onClick={() => onEdit(estudiante.id)}
//                                         className="text-green-600 hover:text-green-900"
//                                         title="Editar"
//                                     >
//                                         <FaEdit className="h-5 w-5" />
//                                     </button>
//                                     <button
//                                         onClick={() => handleDelete(estudiante.id, estudiante.nombreCompleto)}
//                                         className="text-red-600 hover:text-red-900"
//                                         title="Eliminar"
//                                     >
//                                         <FaTrash className="h-5 w-5" />
//                                     </button>
//                                 </div>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {pagination && (
//                 <div className="px-6 py-4 border-t border-gray-200">
//                     <Paginacion
//                         pagination={pagination}
//                         onPageChange={(page) => actualizarFiltros({ page })}
//                     />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default EstudiantesLista;

//!OPCION VIEJAAA


import React from 'react';
import { 
  Eye, 
  Edit3, 
  Trash2, 
  UserRound, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown,
  Phone,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Paginacion from './Paginacion';

const EstudiantesLista = ({
    estudiantes,
    loading,
    error,
    pagination,
    onView,
    onEdit,
    onDelete,
    onSort,
    sortConfig,
    onPageChange
}) => {

    const handleSort = (key) => {
        if (onSort) {
            let direction = 'asc';
            if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
                direction = 'desc';
            }
            onSort({ key, direction });
        }
    };

    const getSortIcon = (key) => {
        if (sortConfig?.key !== key) return <ArrowUpDown size={14} className="text-slate-400 group-hover:text-primary transition-colors" />;
        return sortConfig?.direction === 'asc'
            ? <ArrowUp size={14} className="text-primary" />
            : <ArrowDown size={14} className="text-primary" />;
    };

    if (loading) {
        return (
            <div className="p-20 flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Cargando Registros...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-10 text-center">
                <div className="glass-card border-rose-200 bg-rose-50/50 p-6 rounded-3xl inline-block">
                    <p className="text-rose-600 font-bold">Error: {error}</p>
                </div>
            </div>
        );
    }

    if (!estudiantes || estudiantes.length === 0) {
        return (
            <div className="p-20 text-center flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                    <UserRound size={40} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-slate-800">No hay estudiantes</h3>
                    <p className="text-slate-500 font-medium">No se encontraron registros que coincidan con tu búsqueda.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-slate-100">
                            {[
                                { label: 'Estudiante', key: 'nombres' },
                                { label: 'Cédula Escolar', key: 'cedula_escolar' },
                                { label: 'Edad', key: 'fecha_nacimiento' },
                                { label: 'Representante', key: null },
                                { label: 'Contacto', key: null },
                                { label: 'Acciones', key: null, align: 'text-right' }
                            ].map((col, i) => (
                                <th 
                                    key={i}
                                    onClick={() => col.key && handleSort(col.key)}
                                    className={`px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ${col.key ? 'cursor-pointer group hover:text-primary transition-colors' : ''} ${col.align || ''}`}
                                >
                                    <div className={`flex items-center gap-2 ${col.align === 'text-right' ? 'justify-end' : ''}`}>
                                        {col.label}
                                        {col.key && getSortIcon(col.key)}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        <AnimatePresence mode="popLayout">
                            {estudiantes.map((estudiante, idx) => (
                                <motion.tr 
                                    key={estudiante.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group hover:bg-slate-50/50 transition-colors"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                {estudiante.foto ? (
                                                    <img
                                                        className="h-11 w-11 rounded-2xl object-cover ring-2 ring-white shadow-sm"
                                                        src={estudiante.fotoUrl}
                                                        alt={estudiante.nombreCompleto}
                                                    />
                                                ) : (
                                                    <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center text-slate-400 ring-2 ring-white shadow-sm">
                                                        <UserRound size={20} />
                                                    </div>
                                                )}
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" title="Activo" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-black text-slate-800 tracking-tight group-hover:text-primary transition-colors">
                                                    {estudiante.nombreCompleto}
                                                </div>
                                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                                    {estudiante.cedula ? `${estudiante.tipoCedula || 'V'}-${estudiante.cedula}` : 'S/C'}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-xs font-black text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
                                            {estudiante.cedulaEscolar}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-xs font-bold text-slate-700">{estudiante.edad} años</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                                <UserCheck size={14} />
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-slate-800">{estudiante.representante?.nombreCompleto}</div>
                                                <div className="text-[10px] font-bold text-slate-400 uppercase">{estudiante.representante?.relacion}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                                            <Phone size={12} className="text-slate-400" />
                                            {estudiante.representante?.telefono || 'N/A'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => onView(estudiante.id)}
                                                className="p-2 rounded-xl bg-white text-blue-500 shadow-sm border border-slate-100 hover:bg-blue-50 transition-colors"
                                                title="Ver Detalle"
                                            >
                                                <Eye size={16} />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => onEdit(estudiante.id)}
                                                className="p-2 rounded-xl bg-white text-emerald-500 shadow-sm border border-slate-100 hover:bg-emerald-50 transition-colors"
                                                title="Editar"
                                            >
                                                <Edit3 size={16} />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => onDelete(estudiante.id)}
                                                className="p-2 rounded-xl bg-white text-rose-500 shadow-sm border border-slate-100 hover:bg-rose-50 transition-colors"
                                                title="Eliminar"
                                            >
                                                <Trash2 size={16} />
                                            </motion.button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {pagination && pagination.totalPages > 1 && (
                <div className="px-8 py-6 border-t border-slate-50">
                    <Paginacion
                        pagination={pagination}
                        onPageChange={onPageChange}
                    />
                </div>
            )}
        </div>
    );
};

export default EstudiantesLista;