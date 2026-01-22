// import React from 'react';
// import {
//     FaUser, FaPhone, FaEnvelope, FaIdCard, FaCalendar,
//     FaVenusMars, FaBriefcase, FaBuilding, FaTrash, FaEdit, FaEye,
//     FaSpinner, FaChalkboardTeacher, FaUserTie, FaHardHat
// } from 'react-icons/fa';
// import { PersonalAdaptador } from '../adaptadores/personal.adaptador';

// const PersonalLista = ({
//     personal,
//     loading,
//     tipo,
//     onEdit,
//     onDelete,
//     onView,
//     onSelect,
//     selectedIds = []
// }) => {
//     const getTipoIcon = (tipoPersonal) => {
//         switch (tipoPersonal) {
//             case 'docente': return FaChalkboardTeacher;
//             case 'administrativo': return FaUserTie;
//             case 'obrero': return FaHardHat;
//             default: return FaUser;
//         }
//     };

//     const getTipoColor = (tipoPersonal) => {
//         const colors = PersonalAdaptador.getColorByTipo(tipoPersonal);
//         return colors;
//     };

//     const getSexoIcon = (sexo) => {
//         switch (sexo) {
//             case 'masculino': return { icon: FaUser, color: 'text-blue-600' };
//             case 'femenino': return { icon: FaUser, color: 'text-pink-600' };
//             default: return { icon: FaUser, color: 'text-gray-600' };
//         }
//     };

//     const formatDate = (dateString) => {
//         if (!dateString) return '';
//         const date = new Date(dateString);
//         return date.toLocaleDateString('es-ES', {
//             day: '2-digit',
//             month: 'short',
//             year: 'numeric'
//         });
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center py-12">
//                 <FaSpinner className="animate-spin h-8 w-8 text-indigo-600" />
//                 <span className="ml-3 text-gray-600">Cargando personal...</span>
//             </div>
//         );
//     }

//     if (personal.length === 0) {
//         return (
//             <div className="text-center py-12">
//                 {tipo === 'docente' && <FaChalkboardTeacher className="h-16 w-16 text-gray-300 mx-auto mb-4" />}
//                 {tipo === 'administrativo' && <FaUserTie className="h-16 w-16 text-gray-300 mx-auto mb-4" />}
//                 {tipo === 'obrero' && <FaHardHat className="h-16 w-16 text-gray-300 mx-auto mb-4" />}
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                     {tipo === 'docente' && 'No hay docentes registrados'}
//                     {tipo === 'administrativo' && 'No hay administrativos registrados'}
//                     {tipo === 'obrero' && 'No hay obreros registrados'}
//                 </h3>
//                 <p className="text-gray-500">Registra el primer personal para comenzar</p>
//             </div>
//         );
//     }

//     return (
//         <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//             {/* Header de la tabla */}
//             <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 text-sm font-medium text-gray-700">
//                 <div className="col-span-1"></div>
//                 <div className="col-span-3">Personal</div>
//                 <div className="col-span-2">Contacto</div>
//                 <div className="col-span-2">Información Laboral</div>
//                 <div className="col-span-2">Detalles</div>
//                 <div className="col-span-2">Acciones</div>
//             </div>

//             {/* Lista de personal */}
//             <div className="divide-y divide-gray-100">
//                 {personal.map((persona) => {
//                     const TipoIcon = getTipoIcon(persona.tipo);
//                     const tipoColors = getTipoColor(persona.tipo);
//                     const sexoData = getSexoIcon(persona.sexo);
//                     const SexoIcon = sexoData.icon;
//                     const isSelected = selectedIds.includes(persona.id);

//                     return (
//                         <div
//                             key={persona.id}
//                             className={`grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors ${isSelected ? 'bg-indigo-50' : ''
//                                 }`}
//                             onClick={() => onSelect?.(persona.id)}
//                         >
//                             {/* Selección */}
//                             <div className="col-span-1 flex items-center">
//                                 <input
//                                     type="checkbox"
//                                     checked={isSelected}
//                                     onChange={() => onSelect?.(persona.id)}
//                                     className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
//                                     onClick={(e) => e.stopPropagation()}
//                                 />
//                             </div>

//                             {/* Información del personal */}
//                             <div className="col-span-3">
//                                 <div className="flex items-center space-x-3">
//                                     <div className={`p-2 rounded-lg ${tipoColors.bg}`}>
//                                         <TipoIcon className={`h-5 w-5 ${tipoColors.text}`} />
//                                     </div>
//                                     <div>
//                                         <p className="font-medium text-gray-900">{persona.nombreCompleto}</p>
//                                         <div className="flex items-center text-sm text-gray-500 mt-1">
//                                             <FaIdCard className="h-3 w-3 mr-1" />
//                                             <span>C.I.: {persona.cedula}</span>
//                                         </div>
//                                         <p className="text-xs text-gray-400 mt-1">
//                                             ID: {persona.id} • {persona.tipoLabel}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Contacto */}
//                             <div className="col-span-2">
//                                 <div className="space-y-1">
//                                     <div className="flex items-center text-sm">
//                                         <FaPhone className="h-3 w-3 text-gray-400 mr-2" />
//                                         <span className="text-gray-600 truncate">{persona.telefono}</span>
//                                     </div>
//                                     <div className="flex items-center text-sm">
//                                         <FaEnvelope className="h-3 w-3 text-gray-400 mr-2" />
//                                         <span className="text-gray-600 truncate">{persona.correo}</span>
//                                     </div>
//                                     <div className="flex items-center text-sm">
//                                         <SexoIcon className={`h-3 w-3 ${sexoData.color} mr-2`} />
//                                         <span className="text-gray-600 capitalize">{persona.sexo}</span>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Información Laboral */}
//                             <div className="col-span-2">
//                                 <div className="space-y-1">
//                                     <div className="flex items-center">
//                                         <FaBriefcase className="h-4 w-4 text-gray-400 mr-2" />
//                                         <span className="text-gray-900 text-sm truncate" title={persona.cargo_voucher}>
//                                             {persona.cargo_voucher}
//                                         </span>
//                                     </div>
//                                     <div className="flex items-center mt-2">
//                                         <FaBuilding className="h-4 w-4 text-gray-400 mr-2" />
//                                         <span className="text-gray-600 text-sm truncate" title={persona.dependencia}>
//                                             {persona.dependencia}
//                                         </span>
//                                     </div>
//                                     {persona.carga_horaria && (
//                                         <div className="text-xs text-gray-500 mt-2">
//                                             Carga: {persona.carga_horaria}
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Detalles */}
//                             <div className="col-span-2">
//                                 <div className="space-y-2">
//                                     <div className="flex items-center text-sm">
//                                         <FaCalendar className="h-3 w-3 text-gray-400 mr-2" />
//                                         <div>
//                                             <div className="text-gray-900">{persona.edad} años</div>
//                                             <div className="text-xs text-gray-500">Edad</div>
//                                         </div>
//                                     </div>
//                                     {persona.antiguedad && (
//                                         <div className="flex items-center text-sm">
//                                             <FaCalendar className="h-3 w-3 text-gray-400 mr-2" />
//                                             <div>
//                                                 <div className="text-gray-900">{persona.antiguedad} años</div>
//                                                 <div className="text-xs text-gray-500">Antigüedad</div>
//                                             </div>
//                                         </div>
//                                     )}
//                                     {persona.fecha_ingreso_mppe && (
//                                         <div className="text-xs text-gray-500 mt-1">
//                                             Ingreso: {formatDate(persona.fecha_ingreso_mppe)}
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Acciones */}
//                             <div className="col-span-2">
//                                 <div className="flex items-center space-x-2">
//                                     <button
//                                         onClick={(e) => {
//                                             e.stopPropagation();
//                                             onView?.(persona);
//                                         }}
//                                         className="p-2 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
//                                         title="Ver detalles"
//                                     >
//                                         <FaEye className="h-4 w-4" />
//                                     </button>
//                                     <button
//                                         onClick={(e) => {
//                                             e.stopPropagation();
//                                             onEdit?.(persona);
//                                         }}
//                                         className="p-2 text-gray-400 hover:text-green-600 transition-colors cursor-pointer"
//                                         title="Editar"
//                                     >
//                                         <FaEdit className="h-4 w-4" />
//                                     </button>
//                                     <button
//                                         onClick={(e) => {
//                                             e.stopPropagation();
//                                             onDelete?.(persona.id);
//                                         }}
//                                         className="p-2 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
//                                         title="Eliminar"
//                                     >
//                                         <FaTrash className="h-4 w-4" />
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>

//             {/* Footer */}
//             <div className="p-4 border-t bg-gray-50">
//                 <div className="flex justify-between items-center">
//                     <span className="text-sm text-gray-600">
//                         {personal.length} {tipo}{personal.length !== 1 ? 's' : ''} encontrado{personal.length !== 1 ? 's' : ''}
//                     </span>
//                     <span className="text-sm text-gray-500">
//                         Última actualización: {new Date().toLocaleTimeString('es-ES')}
//                     </span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PersonalLista;


import React from 'react';
import {
    FaUser, FaPhone, FaEnvelope, FaIdCard, FaCalendar,
    FaVenusMars, FaBriefcase, FaBuilding, FaTrash, FaEdit, FaEye,
    FaSpinner, FaChalkboardTeacher, FaUserTie, FaHardHat
} from 'react-icons/fa';
import { PersonalAdaptador } from '../adaptadores/personal.adaptador';

const PersonalLista = ({
    personal,
    loading,
    tipo,
    onEdit,
    onDelete,
    onView,
    onSelect,
    selectedIds = []
}) => {
    const getTipoIcon = (tipoPersonal) => {
        switch (tipoPersonal) {
            case 'docente': return FaChalkboardTeacher;
            case 'administrativo': return FaUserTie;
            case 'obrero': return FaHardHat;
            default: return FaUser;
        }
    };

    const getTipoColor = (tipoPersonal) => {
        const colors = PersonalAdaptador.getColorByTipo(tipoPersonal);
        return colors;
    };

    const getSexoIcon = (sexo) => {
        switch (sexo) {
            case 'masculino': return { icon: FaUser, color: 'text-blue-600' };
            case 'femenino': return { icon: FaUser, color: 'text-pink-600' };
            default: return { icon: FaUser, color: 'text-gray-600' };
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    // Manejar click en fila
    const handleRowClick = (personaId, e) => {
        if (e.target.type === 'checkbox' ||
            e.target.closest('button') ||
            e.target.tagName === 'A') {
            return; // No hacer nada si se hace click en checkbox, botón o enlace
        }

        if (onSelect) {
            onSelect(personaId);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <FaSpinner className="animate-spin h-8 w-8 text-indigo-600" />
                <span className="ml-3 text-gray-600">Cargando personal...</span>
            </div>
        );
    }

    if (personal.length === 0) {
        return (
            <div className="text-center py-12">
                {tipo === 'docente' && <FaChalkboardTeacher className="h-16 w-16 text-gray-300 mx-auto mb-4" />}
                {tipo === 'administrativo' && <FaUserTie className="h-16 w-16 text-gray-300 mx-auto mb-4" />}
                {tipo === 'obrero' && <FaHardHat className="h-16 w-16 text-gray-300 mx-auto mb-4" />}
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {tipo === 'docente' && 'No hay docentes registrados'}
                    {tipo === 'administrativo' && 'No hay administrativos registrados'}
                    {tipo === 'obrero' && 'No hay obreros registrados'}
                </h3>
                <p className="text-gray-500">Registra el primer personal para comenzar</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Header de la tabla */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 text-sm font-medium text-gray-700">
                <div className="col-span-1">ID</div>
                <div className="col-span-3">Personal</div>
                <div className="col-span-2">Contacto</div>
                <div className="col-span-2">Información Laboral</div>
                <div className="col-span-2">Detalles</div>
                <div className="col-span-2">Acciones</div>
            </div>

            {/* Lista de personal */}
            <div className="divide-y divide-gray-100">
                {personal.map((persona) => {
                    const TipoIcon = getTipoIcon(persona.tipo);
                    const tipoColors = getTipoColor(persona.tipo);
                    const sexoData = getSexoIcon(persona.sexo);
                    const SexoIcon = sexoData.icon;
                    const isSelected = selectedIds.includes(persona.id);

                    return (
                        <div
                            key={persona.id}
                            className={`grid grid-cols-12 gap-4 p-4 transition-all duration-200 cursor-pointer ${isSelected
                                    ? 'bg-blue-50 border-l-4 border-l-blue-500'
                                    : 'hover:bg-gray-50'
                                }`}
                            onClick={(e) => handleRowClick(persona.id, e)}
                        >
                            {/* ID */}
                            <div className="col-span-1 flex items-center">
                                <span className={`font-medium ${isSelected ? 'text-blue-600' : 'text-gray-600'}`}>
                                    {persona.id}
                                </span>
                            </div>

                            {/* Información del personal */}
                            <div className="col-span-3">
                                <div className="flex items-center space-x-3">
                                    <div className={`p-2 rounded-lg ${tipoColors.bg} ${isSelected ? 'ring-2 ring-blue-300' : ''
                                        }`}>
                                        <TipoIcon className={`h-5 w-5 ${tipoColors.text}`} />
                                    </div>
                                    <div>
                                        <p className={`font-medium ${isSelected ? 'text-blue-700' : 'text-gray-900'
                                            }`}>
                                            {persona.nombreCompleto}
                                        </p>
                                        <div className="flex items-center text-sm text-gray-500 mt-1">
                                            <FaIdCard className="h-3 w-3 mr-1" />
                                            <span>C.I.: {persona.cedula}</span>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {persona.tipoLabel}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Contacto */}
                            <div className="col-span-2">
                                <div className="space-y-1">
                                    <div className="flex items-center text-sm">
                                        <FaPhone className="h-3 w-3 text-gray-400 mr-2" />
                                        <span className={`truncate ${isSelected ? 'text-blue-600' : 'text-gray-600'
                                            }`}>
                                            {persona.telefono}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <FaEnvelope className="h-3 w-3 text-gray-400 mr-2" />
                                        <span className={`truncate ${isSelected ? 'text-blue-600' : 'text-gray-600'
                                            }`}>
                                            {persona.correo}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <SexoIcon className={`h-3 w-3 ${sexoData.color} mr-2`} />
                                        <span className={`capitalize ${isSelected ? 'text-blue-600' : 'text-gray-600'
                                            }`}>
                                            {persona.sexo}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Información Laboral */}
                            <div className="col-span-2">
                                <div className="space-y-1">
                                    <div className="flex items-center">
                                        <FaBriefcase className="h-4 w-4 text-gray-400 mr-2" />
                                        <span className={`text-sm truncate ${isSelected ? 'text-blue-700' : 'text-gray-900'
                                            }`} title={persona.cargo_voucher}>
                                            {persona.cargo_voucher}
                                        </span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <FaBuilding className="h-4 w-4 text-gray-400 mr-2" />
                                        <span className={`text-sm truncate ${isSelected ? 'text-blue-600' : 'text-gray-600'
                                            }`} title={persona.dependencia}>
                                            {persona.dependencia}
                                        </span>
                                    </div>
                                    {persona.carga_horaria && (
                                        <div className={`text-xs mt-2 ${isSelected ? 'text-blue-500' : 'text-gray-500'
                                            }`}>
                                            Carga: {persona.carga_horaria}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Detalles */}
                            <div className="col-span-2">
                                <div className="space-y-2">
                                    <div className="flex items-center text-sm">
                                        <FaCalendar className="h-3 w-3 text-gray-400 mr-2" />
                                        <div>
                                            <div className={`${isSelected ? 'text-blue-700' : 'text-gray-900'
                                                }`}>
                                                {persona.edad} años
                                            </div>
                                            <div className={`text-xs ${isSelected ? 'text-blue-500' : 'text-gray-500'
                                                }`}>
                                                Edad
                                            </div>
                                        </div>
                                    </div>
                                    {persona.antiguedad && (
                                        <div className="flex items-center text-sm">
                                            <FaCalendar className="h-3 w-3 text-gray-400 mr-2" />
                                            <div>
                                                <div className={`${isSelected ? 'text-blue-700' : 'text-gray-900'
                                                    }`}>
                                                    {persona.antiguedad} años
                                                </div>
                                                <div className={`text-xs ${isSelected ? 'text-blue-500' : 'text-gray-500'
                                                    }`}>
                                                    Antigüedad
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {persona.fecha_ingreso_mppe && (
                                        <div className={`text-xs mt-1 ${isSelected ? 'text-blue-500' : 'text-gray-500'
                                            }`}>
                                            Ingreso: {formatDate(persona.fecha_ingreso_mppe)}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Acciones */}
                            <div className="col-span-2">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onView?.(persona);
                                        }}
                                        className={`p-2 transition-colors cursor-pointer ${isSelected
                                                ? 'text-blue-400 hover:text-blue-600'
                                                : 'text-gray-400 hover:text-blue-600'
                                            }`}
                                        title="Ver detalles"
                                    >
                                        <FaEye className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onEdit?.(persona);
                                        }}
                                        className={`p-2 transition-colors cursor-pointer ${isSelected
                                                ? 'text-blue-400 hover:text-blue-600'
                                                : 'text-gray-400 hover:text-green-600'
                                            }`}
                                        title="Editar"
                                    >
                                        <FaEdit className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete?.(persona.id);
                                        }}
                                        className={`p-2 transition-colors cursor-pointer ${isSelected
                                                ? 'text-blue-400 hover:text-blue-600'
                                                : 'text-gray-400 hover:text-red-600'
                                            }`}
                                        title="Eliminar"
                                    >
                                        <FaTrash className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer simple */}
            <div className="p-4 border-t bg-gray-50">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                        {personal.length} {tipo}{personal.length !== 1 ? 's' : ''} encontrado{personal.length !== 1 ? 's' : ''}
                    </span>
                    <span className="text-sm text-gray-500">
                        {new Date().toLocaleDateString('es-ES')}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PersonalLista;