// import React from 'react';
// import { FaMale, FaFemale, FaUsers, FaChartBar } from 'react-icons/fa';

// const EstadisticasEstudiantes = ({ estadisticas, loading }) => {
//     if (loading) {
//         return (
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//                 {[...Array(4)].map((_, i) => (
//                     <div key={i} className="bg-white overflow-hidden shadow rounded-lg animate-pulse">
//                         <div className="px-4 py-5 sm:p-6">
//                             <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
//                             <div className="h-8 bg-gray-200 rounded w-1/4"></div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         );
//     }

//     const { total, masculinos, femeninos, otros } = estadisticas;
//     const porcentajeMasculino = total > 0 ? ((masculinos / total) * 100).toFixed(1) : 0;
//     const porcentajeFemenino = total > 0 ? ((femeninos / total) * 100).toFixed(1) : 0;
//     const porcentajeOtros = total > 0 ? ((otros / total) * 100).toFixed(1) : 0;

//     return (
//         <div className="mb-6">
//             <div className="flex items-center mb-4">
//                 <FaChartBar className="h-5 w-5 text-gray-500 mr-2" />
//                 <h3 className="text-lg font-medium text-gray-900">Estadísticas por Género</h3>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                 {/* Total estudiantes */}
//                 <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-blue-500">
//                     <div className="px-4 py-5 sm:p-6">
//                         <div className="flex items-center">
//                             <div className="flex-shrink-0 bg-blue-100 p-3 rounded-md">
//                                 <FaUsers className="h-6 w-6 text-blue-600" />
//                             </div>
//                             <div className="ml-4">
//                                 <dt className="text-sm font-medium text-gray-500 truncate">Total Estudiantes</dt>
//                                 <dd className="mt-1 text-3xl font-semibold text-gray-900">{total}</dd>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Masculinos */}
//                 <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-blue-400">
//                     <div className="px-4 py-5 sm:p-6">
//                         <div className="flex items-center">
//                             <div className="flex-shrink-0 bg-blue-50 p-3 rounded-md">
//                                 <FaMale className="h-6 w-6 text-blue-500" />
//                             </div>
//                             <div className="ml-4 flex-1">
//                                 <div className="flex justify-between">
//                                     <dt className="text-sm font-medium text-gray-500 truncate">Masculinos</dt>
//                                     <span className="text-sm font-medium text-blue-600">{porcentajeMasculino}%</span>
//                                 </div>
//                                 <dd className="mt-1 text-2xl font-semibold text-gray-900">{masculinos}</dd>
//                                 <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
//                                     <div
//                                         className="bg-blue-500 h-2 rounded-full"
//                                         style={{ width: `${porcentajeMasculino}%` }}
//                                     ></div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Femeninos */}
//                 <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-pink-400">
//                     <div className="px-4 py-5 sm:p-6">
//                         <div className="flex items-center">
//                             <div className="flex-shrink-0 bg-pink-50 p-3 rounded-md">
//                                 <FaFemale className="h-6 w-6 text-pink-500" />
//                             </div>
//                             <div className="ml-4 flex-1">
//                                 <div className="flex justify-between">
//                                     <dt className="text-sm font-medium text-gray-500 truncate">Femeninos</dt>
//                                     <span className="text-sm font-medium text-pink-600">{porcentajeFemenino}%</span>
//                                 </div>
//                                 <dd className="mt-1 text-2xl font-semibold text-gray-900">{femeninos}</dd>
//                                 <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
//                                     <div
//                                         className="bg-pink-500 h-2 rounded-full"
//                                         style={{ width: `${porcentajeFemenino}%` }}
//                                     ></div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Otros */}
//                 <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-purple-400">
//                     <div className="px-4 py-5 sm:p-6">
//                         <div className="flex items-center">
//                             <div className="flex-shrink-0 bg-purple-50 p-3 rounded-md">
//                                 <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
//                                 </svg>
//                             </div>
//                             <div className="ml-4 flex-1">
//                                 <div className="flex justify-between">
//                                     <dt className="text-sm font-medium text-gray-500 truncate">Otros</dt>
//                                     <span className="text-sm font-medium text-purple-600">{porcentajeOtros}%</span>
//                                 </div>
//                                 <dd className="mt-1 text-2xl font-semibold text-gray-900">{otros}</dd>
//                                 <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
//                                     <div
//                                         className="bg-purple-500 h-2 rounded-full"
//                                         style={{ width: `${porcentajeOtros}%` }}
//                                     ></div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Gráfico circular (opcional) */}
//             {total > 0 && (
//                 <div className="mt-4 bg-white shadow rounded-lg p-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                             <h4 className="text-sm font-medium text-gray-700 mb-4">Distribución por Género</h4>
//                             <div className="flex items-center space-x-8">
//                                 <div className="relative h-40 w-40">
//                                     {/* Gráfico circular simple */}
//                                     <svg className="h-full w-full" viewBox="0 0 100 100">
//                                         {/* Masculinos */}
//                                         <circle
//                                             cx="50"
//                                             cy="50"
//                                             r="40"
//                                             fill="transparent"
//                                             stroke="#3b82f6"
//                                             strokeWidth="20"
//                                             strokeDasharray={`${porcentajeMasculino * 2.51} 251`}
//                                             strokeDashoffset="0"
//                                             transform="rotate(-90 50 50)"
//                                         />
//                                         {/* Femeninos */}
//                                         <circle
//                                             cx="50"
//                                             cy="50"
//                                             r="40"
//                                             fill="transparent"
//                                             stroke="#ec4899"
//                                             strokeWidth="20"
//                                             strokeDasharray={`${porcentajeFemenino * 2.51} 251`}
//                                             strokeDashoffset={-porcentajeMasculino * 2.51}
//                                             transform="rotate(-90 50 50)"
//                                         />
//                                         {/* Otros */}
//                                         <circle
//                                             cx="50"
//                                             cy="50"
//                                             r="40"
//                                             fill="transparent"
//                                             stroke="#8b5cf6"
//                                             strokeWidth="20"
//                                             strokeDasharray={`${porcentajeOtros * 2.51} 251`}
//                                             strokeDashoffset={-(porcentajeMasculino + porcentajeFemenino) * 2.51}
//                                             transform="rotate(-90 50 50)"
//                                         />
//                                     </svg>
//                                     <div className="absolute inset-0 flex items-center justify-center">
//                                         <span className="text-2xl font-bold text-gray-900">{total}</span>
//                                     </div>
//                                 </div>

//                                 <div className="space-y-3">
//                                     <div className="flex items-center">
//                                         <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
//                                         <span className="text-sm text-gray-700">Masculinos: {masculinos} ({porcentajeMasculino}%)</span>
//                                     </div>
//                                     <div className="flex items-center">
//                                         <div className="h-3 w-3 rounded-full bg-pink-500 mr-2"></div>
//                                         <span className="text-sm text-gray-700">Femeninos: {femeninos} ({porcentajeFemenino}%)</span>
//                                     </div>
//                                     <div className="flex items-center">
//                                         <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
//                                         <span className="text-sm text-gray-700">Otros: {otros} ({porcentajeOtros}%)</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div>
//                             <h4 className="text-sm font-medium text-gray-700 mb-4">Resumen</h4>
//                             <div className="space-y-3">
//                                 <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
//                                     <span className="text-sm font-medium text-blue-800">Proporción H:M</span>
//                                     <span className="text-lg font-bold text-blue-900">
//                                         {total > 0 ? (femeninos / masculinos).toFixed(2) : '0.00'} : 1
//                                     </span>
//                                 </div>
//                                 <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//                                     <span className="text-sm font-medium text-gray-800">Promedio por género</span>
//                                     <span className="text-lg font-bold text-gray-900">
//                                         {total > 0 ? (total / 3).toFixed(0) : 0}
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default EstadisticasEstudiantes;


import React from 'react';
import { FaMale, FaFemale, FaUsers, FaChartBar, FaQuestionCircle } from 'react-icons/fa';

const EstadisticasEstudiantes = ({ estadisticas, loading }) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white shadow rounded-lg p-6 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    </div>
                ))}
            </div>
        );
    }

    const { total, masculinos, femeninos, otros } = estadisticas;
    const porcentajeMasculino = total > 0 ? ((masculinos / total) * 100).toFixed(1) : 0;
    const porcentajeFemenino = total > 0 ? ((femeninos / total) * 100).toFixed(1) : 0;
    const porcentajeOtros = total > 0 ? ((otros / total) * 100).toFixed(1) : 0;

    const estadisticasItems = [
        {
            label: 'Total Estudiantes',
            value: total,
            icon: FaUsers,
            color: 'blue',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600',
            borderColor: 'border-blue-500'
        },
        {
            label: 'Masculinos',
            value: masculinos,
            porcentaje: porcentajeMasculino,
            icon: FaMale,
            color: 'blue',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600',
            borderColor: 'border-blue-400'
        },
        {
            label: 'Femeninos',
            value: femeninos,
            porcentaje: porcentajeFemenino,
            icon: FaFemale,
            color: 'pink',
            bgColor: 'bg-pink-50',
            textColor: 'text-pink-600',
            borderColor: 'border-pink-400'
        },
        // {
        //     label: 'Otros',
        //     value: otros,
        //     porcentaje: porcentajeOtros,
        //     icon: FaQuestionCircle,
        //     color: 'purple',
        //     bgColor: 'bg-purple-50',
        //     textColor: 'text-purple-600',
        //     borderColor: 'border-purple-400'
        // }
    ];

    return (
        <div className="mb-8">
            <div className="flex items-center mb-6">
                <div className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
                    <FaChartBar className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">Estadísticas por Género</h3>
                    <p className="text-sm text-gray-500">Distribución total de estudiantes registrados</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {estadisticasItems.map((item, index) => (
                    <div
                        key={index}
                        className={`bg-white rounded-xl border-l-4 ${item.borderColor} shadow-sm p-5 hover:shadow-md transition-shadow duration-200`}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className={`p-2 rounded-lg ${item.bgColor}`}>
                                <item.icon className={`h-5 w-5 ${item.textColor}`} />
                            </div>
                            {item.porcentaje !== undefined && (
                                <span className={`text-sm font-medium ${item.textColor}`}>
                                    {item.porcentaje}%
                                </span>
                            )}
                        </div>

                        <div>
                            <p className="text-sm font-medium text-gray-500 truncate">{item.label}</p>
                            <p className="mt-1 text-2xl font-bold text-gray-900">{item.value}</p>
                        </div>

                        {item.porcentaje !== undefined && (
                            <div className="mt-3">
                                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                    <span>Progreso</span>
                                    <span>{item.porcentaje}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${item.bgColor.replace('bg-', 'bg-').replace('-50', '-500')}`}
                                        style={{ width: `${item.porcentaje}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EstadisticasEstudiantes;