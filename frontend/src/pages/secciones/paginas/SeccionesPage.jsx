// // import React, { useState, useEffect } from 'react';
// // import { FaPlus, FaArrowLeft } from 'react-icons/fa';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import SeccionForm from '../componentes/Secciones/SeccionForm';
// // import SeccionList from '../componentes/Secciones/SeccionList';
// // import { useSecciones } from '../hooks/useSecciones';

// // const SeccionesPage = () => {
// //     const { gradoId } = useParams();
// //     const navigate = useNavigate();
// //     const [showForm, setShowForm] = useState(false);
// //     const [editingSeccion, setEditingSeccion] = useState(null);
// //     const [gradoInfo, setGradoInfo] = useState(null);
// //     const {
// //         secciones,
// //         loading,
// //         grados,
// //         obtenerSeccionesPorGrado,
// //         crearSeccion,
// //         actualizarSeccion,
// //         eliminarSeccion,
// //         obtenerGrados,
// //     } = useSecciones();

// //     useEffect(() => {
// //         const loadData = async () => {
// //             if (gradoId) {
// //                 await obtenerSeccionesPorGrado(gradoId);
// //                 // Buscar información del grado
// //                 await obtenerGrados();
// //                 const grado = grados.find(g => g.id.toString() === gradoId);
// //                 setGradoInfo(grado);
// //             }
// //         };
// //         loadData();
// //     }, [gradoId, obtenerSeccionesPorGrado, obtenerGrados]);

// //     const handleCreate = async (seccionData) => {
// //         const dataToSend = {
// //             ...seccionData,
// //             grado_id: gradoId
// //         };

// //         if (editingSeccion) {
// //             await actualizarSeccion(editingSeccion.id, seccionData);
// //         } else {
// //             await crearSeccion(dataToSend);
// //         }
// //         setShowForm(false);
// //         setEditingSeccion(null);
// //     };

// //     const handleEdit = (seccion) => {
// //         setEditingSeccion(seccion);
// //         setShowForm(true);
// //     };

// //     const handleDelete = async (seccion) => {
// //         await eliminarSeccion(seccion.id, gradoId);
// //     };

// //     const handleBack = () => {
// //         navigate('/secciones/grados');
// //     };
// //     console.log("aaa", gradoInfo)
// //     return (
// //         <div className="container mx-auto px-4 py-8">
// //             <div className="flex justify-between items-center mb-8">
// //                 <div className="flex items-center">
// //                     <button
// //                         onClick={handleBack}
// //                         className="mr-4 p-2 text-gray-600 hover:bg-gray-100 rounded-full"
// //                     >
// //                         <FaArrowLeft />
// //                     </button>
// //                     <div>
// //                         <h1 className="text-3xl font-bold text-gray-800">
// //                             Secciones {gradoInfo && `- ${gradoInfo.nombre}`}
// //                         </h1>
// //                         <p className="text-gray-600">Administre las secciones del grado seleccionado</p>
// //                     </div>
// //                 </div>
// //                 <button
// //                     onClick={() => setShowForm(true)}
// //                     className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
// //                 >
// //                     <FaPlus className="mr-2" />
// //                     Nueva Sección
// //                 </button>
// //             </div>

// //             {showForm && (
// //                 <div className="mb-8">
// //                     <div className="bg-gray-50 p-4 rounded-lg mb-4">
// //                         <h2 className="text-xl font-bold text-gray-800">
// //                             {editingSeccion ? 'Editar Sección' : 'Nueva Sección'}
// //                         </h2>
// //                     </div>
// //                     <SeccionForm
// //                         onSubmit={handleCreate}
// //                         onCancel={() => {
// //                             setShowForm(false);
// //                             setEditingSeccion(null);
// //                         }}
// //                         initialData={editingSeccion}
// //                         grados={gradoId ? [{ id: gradoId, ...gradoInfo }] : grados}
// //                     />
// //                 </div>
// //             )}

// //             <div className="bg-white rounded-lg shadow">
// //                 <div className="p-6">
// //                     <h2 className="text-xl font-bold text-gray-800 mb-4">
// //                         Secciones del Grado {gradoInfo?.nombre}
// //                     </h2>
// //                     {loading ? (
// //                         <div className="text-center py-8">
// //                             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //                             <p className="mt-2 text-gray-600">Cargando secciones...</p>
// //                         </div>
// //                     ) : (
// //                         <SeccionList
// //                             secciones={secciones}
// //                             onEdit={handleEdit}
// //                             onDelete={handleDelete}
// //                             gradoNombre={gradoInfo?.nombre}
// //                         />
// //                     )}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default SeccionesPage;


// import React, { useState, useEffect } from 'react';
// import { FaPlus, FaArrowLeft } from 'react-icons/fa';
// import { useParams, useNavigate } from 'react-router-dom';
// import SeccionForm from '../componentes/Secciones/SeccionForm';
// import SeccionList from '../componentes/Secciones/SeccionList';
// import { useSecciones } from '../hooks/useSecciones';

// const SeccionesPage = () => {
//     const { gradoId } = useParams();
//     const navigate = useNavigate();
//     const [showForm, setShowForm] = useState(false);
//     const [editingSeccion, setEditingSeccion] = useState(null);
//     const [gradoInfo, setGradoInfo] = useState(null);
//     const {
//         secciones,
//         loading,
//         grados,
//         obtenerSeccionesPorGrado,
//         crearSeccion,
//         actualizarSeccion,
//         eliminarSeccion,
//         obtenerGradoPorId, // Agregar este método
//         obtenerGrados
//     } = useSecciones();

//     useEffect(() => {
//         console.log("gradoId desde useParams:", gradoId); // Debug

//         const loadData = async () => {
//             if (gradoId) {
//                 try {
//                     // Cargar secciones del grado
//                     await obtenerSeccionesPorGrado(gradoId);

//                     // Obtener información específica del grado
//                     const grado = await obtenerGradoPorId(gradoId);
//                     setGradoInfo(grado);
//                 } catch (error) {
//                     console.error("Error cargando datos:", error);
//                 }
//             }
//         };

//         loadData();
//     }, [gradoId]); // Solo gradoId como dependencia

//     // Efecto para cargar todos los grados si es necesario
//     useEffect(() => {
//         if (!gradoInfo && gradoId) {
//             // Si no tenemos info del grado pero tenemos el ID,
//             // también podemos buscar en la lista de grados ya cargados
//             obtenerGrados();
//         }
//     }, [gradoId, gradoInfo, obtenerGrados]);

//     // También buscar en la lista de grados cuando se carguen
//     useEffect(() => {
//         if (gradoId && grados.length > 0 && !gradoInfo) {
//             const grado = grados.find(g => g.id.toString() === gradoId.toString());
//             if (grado) {
//                 setGradoInfo(grado);
//             }
//         }
//     }, [grados, gradoId, gradoInfo]);

//     const handleCreate = async (seccionData) => {
//         const dataToSend = {
//             ...seccionData,
//             grado_id: parseInt(gradoId) // Asegurar que sea número
//         };

//         console.log("Creando sección con datos:", dataToSend); // Debug

//         if (editingSeccion) {
//             await actualizarSeccion(editingSeccion.id, seccionData);
//         } else {
//             await crearSeccion(dataToSend);
//         }
//         setShowForm(false);
//         setEditingSeccion(null);
//     };

//     const handleEdit = (seccion) => {
//         setEditingSeccion(seccion);
//         setShowForm(true);
//     };

//     const handleDelete = async (seccion) => {
//         await eliminarSeccion(seccion.id, gradoId);
//     };

//     const handleBack = () => {
//         navigate('/secciones/grados');
//     };

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <div className="flex justify-between items-center mb-8">
//                 <div className="flex items-center">
//                     <button
//                         onClick={handleBack}
//                         className="mr-4 p-2 text-gray-600 hover:bg-gray-100 rounded-full"
//                     >
//                         <FaArrowLeft />
//                     </button>
//                     <div>
//                         <h1 className="text-3xl font-bold text-gray-800">
//                             Secciones {gradoInfo ? `- ${gradoInfo.nombre}` : `- Grado ${gradoId}`}
//                         </h1>
//                         <p className="text-gray-600">Administre las secciones del grado seleccionado</p>
//                     </div>
//                 </div>
//                 <button
//                     onClick={() => setShowForm(true)}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
//                     disabled={!gradoId} // Deshabilitar si no hay gradoId
//                 >
//                     <FaPlus className="mr-2" />
//                     Nueva Sección
//                 </button>
//             </div>

//             {showForm && (
//                 <div className="mb-8">
//                     <div className="bg-gray-50 p-4 rounded-lg mb-4">
//                         <h2 className="text-xl font-bold text-gray-800">
//                             {editingSeccion ? 'Editar Sección' : 'Nueva Sección'}
//                         </h2>
//                     </div>
//                     <SeccionForm
//                         onSubmit={handleCreate}
//                         onCancel={() => {
//                             setShowForm(false);
//                             setEditingSeccion(null);
//                         }}
//                         initialData={editingSeccion}
//                         grados={gradoId && gradoInfo ? [{ id: parseInt(gradoId), ...gradoInfo }] : []}
//                     />
//                 </div>
//             )}

//             <div className="bg-white rounded-lg shadow">
//                 <div className="p-6">
//                     <h2 className="text-xl font-bold text-gray-800 mb-4">
//                         {gradoInfo
//                             ? `Secciones del Grado ${gradoInfo.nombre}`
//                             : `Secciones del Grado ID: ${gradoId || 'No especificado'}`}
//                     </h2>

//                     {!gradoId ? (
//                         <div className="text-center py-8">
//                             <p className="text-red-600">Error: No se especificó un grado</p>
//                             <button
//                                 onClick={handleBack}
//                                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                             >
//                                 Volver a Grados
//                             </button>
//                         </div>
//                     ) : loading ? (
//                         <div className="text-center py-8">
//                             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                             <p className="mt-2 text-gray-600">Cargando secciones...</p>
//                         </div>
//                     ) : (
//                         <SeccionList
//                             secciones={secciones}
//                             onEdit={handleEdit}
//                             onDelete={handleDelete}
//                             gradoNombre={gradoInfo?.nombre}
//                         />
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SeccionesPage;

import React, { useState, useEffect } from 'react';
import { FaPlus, FaArrowLeft } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import SeccionForm from '../componentes/Secciones/SeccionForm';
import SeccionList from '../componentes/Secciones/SeccionList';
import { useSecciones } from '../hooks/useSecciones';

const SeccionesPage = () => {
    const { gradoId } = useParams();
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [editingSeccion, setEditingSeccion] = useState(null);
    const [gradoInfo, setGradoInfo] = useState(null);
    const {
        secciones,
        loading,
        grados,
        obtenerSeccionesPorGrado,
        crearSeccion,
        actualizarSeccion,
        eliminarSeccion,
        obtenerGradoPorId
    } = useSecciones();

    useEffect(() => {
        console.log("gradoId desde useParams:", gradoId); // Debug
        console.log("grados en estado:", grados); // Debug

        const loadData = async () => {
            if (gradoId) {
                try {
                    // Cargar secciones del grado
                    await obtenerSeccionesPorGrado(gradoId);

                    // Buscar grado en la lista ya cargada
                    const gradoEncontrado = grados.find(g => g.id.toString() === gradoId.toString());
                    if (gradoEncontrado) {
                        setGradoInfo(gradoEncontrado);
                    } else {
                        // Si no está en caché, obtenerlo del servidor
                        console.log("Obteniendo grado desde servidor..."); // Debug
                        const grado = await obtenerGradoPorId(gradoId);
                        console.log("Grado obtenido del servidor:", grado); // Debug
                        setGradoInfo(grado);
                    }
                } catch (error) {
                    console.error("Error cargando datos:", error);
                    // Intentar con la lista de grados si falla
                    const gradoFromList = grados.find(g => g.id.toString() === gradoId.toString());
                    if (gradoFromList) {
                        setGradoInfo(gradoFromList);
                    }
                }
            }
        };

        loadData();
    }, [gradoId]); // Solo gradoId como dependencia

    const handleCreate = async (seccionData) => {
        const dataToSend = {
            ...seccionData,
            grado_id: parseInt(gradoId)
        };

        console.log("Creando sección con datos:", dataToSend);

        if (editingSeccion) {
            await actualizarSeccion(editingSeccion.id, seccionData);
        } else {
            await crearSeccion(dataToSend);
        }
        setShowForm(false);
        setEditingSeccion(null);
    };

    const handleEdit = (seccion) => {
        setEditingSeccion(seccion);
        setShowForm(true);
    };

    const handleDelete = async (seccion) => {
        await eliminarSeccion(seccion.id, gradoId);
    };

    const handleBack = () => {
        navigate('/secciones/grados');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                    <button
                        onClick={handleBack}
                        className="mr-4 p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                    >
                        <FaArrowLeft />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Secciones {gradoInfo ? `- ${gradoInfo.nombre}` : `- Grado ${gradoId}`}
                        </h1>
                        <p className="text-gray-600">Administre las secciones del grado seleccionado</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                    disabled={!gradoId}
                >
                    <FaPlus className="mr-2" />
                    Nueva Sección
                </button>
            </div>

            {showForm && (
                <div className="mb-8">
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-bold text-gray-800">
                            {editingSeccion ? 'Editar Sección' : 'Nueva Sección'}
                        </h2>
                    </div>
                    <SeccionForm
                        onSubmit={handleCreate}
                        onCancel={() => {
                            setShowForm(false);
                            setEditingSeccion(null);
                        }}
                        initialData={editingSeccion}
                        grados={gradoId && gradoInfo ? [{ id: parseInt(gradoId), ...gradoInfo }] : []}
                    />
                </div>
            )}

            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        {gradoInfo
                            ? `Secciones del Grado ${gradoInfo.nombre}`
                            : `Secciones del Grado ID: ${gradoId || 'No especificado'}`}
                    </h2>

                    {!gradoId ? (
                        <div className="text-center py-8">
                            <p className="text-red-600">Error: No se especificó un grado</p>
                            <button
                                onClick={handleBack}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Volver a Grados
                            </button>
                        </div>
                    ) : loading ? (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="mt-2 text-gray-600">Cargando secciones...</p>
                        </div>
                    ) : (
                        <SeccionList
                            secciones={secciones}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            gradoNombre={gradoInfo?.nombre}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SeccionesPage;