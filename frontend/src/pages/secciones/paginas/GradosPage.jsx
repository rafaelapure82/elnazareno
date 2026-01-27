// import React, { useState, useEffect } from 'react';
// import { FaPlus, FaSchool } from 'react-icons/fa';
// import GradoForm from '../componentes/Grados/GradoForm';
// import GradoList from '../componentes/Grados/GradoList';
// import { useSecciones } from '../hooks/useSecciones';

// const GradosPage = () => {
//     const [showForm, setShowForm] = useState(false);
//     const [editingGrado, setEditingGrado] = useState(null);
//     const {
//         grados,
//         loading,
//         obtenerGrados,
//         crearGrado,
//         actualizarGrado,
//         eliminarGrado
//     } = useSecciones();
//     useEffect(() => {
//         obtenerGrados();
//     }, [obtenerGrados]);

//     const handleCreate = async (gradoData) => {
//         if (editingGrado) {
//             await actualizarGrado(editingGrado.id, gradoData);
//         } else {
//             await crearGrado(gradoData);
//         }
//         setShowForm(false);
//         setEditingGrado(null);
//     };

//     const handleEdit = (grado) => {
//         setEditingGrado(grado);
//         setShowForm(true);
//     };

//     const handleDelete = async (grado) => {
//         await eliminarGrado(grado.id);
//     };

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <div className="flex justify-between items-center mb-8">
//                 <div className="flex items-center">
//                     <FaSchool className="text-4xl text-blue-600 mr-4" />
//                     <div>
//                         <h1 className="text-3xl font-bold text-gray-800">Gestión de Grados</h1>
//                         <p className="text-gray-600">Administre los grados académicos de la institución</p>
//                     </div>
//                 </div>
//                 <button
//                     onClick={() => setShowForm(true)}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
//                 >
//                     <FaPlus className="mr-2" />
//                     Nuevo Grado
//                 </button>
//             </div>

//             {showForm && (
//                 <div className="mb-8">
//                     <div className="bg-gray-50 p-4 rounded-lg mb-4">
//                         <h2 className="text-xl font-bold text-gray-800">
//                             {editingGrado ? 'Editar Grado' : 'Nuevo Grado'}
//                         </h2>
//                     </div>
//                     <GradoForm
//                         onSubmit={handleCreate}
//                         onCancel={() => {
//                             setShowForm(false);
//                             setEditingGrado(null);
//                         }}
//                         initialData={editingGrado}
//                     />
//                 </div>
//             )}

//             <div className="bg-white rounded-lg shadow">
//                 <div className="p-6">
//                     <h2 className="text-xl font-bold text-gray-800 mb-4">Lista de Grados</h2>
//                     {loading ? (
//                         <div className="text-center py-8">
//                             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                             <p className="mt-2 text-gray-600">Cargando grados...</p>
//                         </div>
//                     ) : (
//                         <GradoList
//                             grados={grados}
//                             onEdit={handleEdit}
//                             onDelete={handleDelete}
//                         />
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default GradosPage;



import React, { useState, useEffect } from 'react';
import { FaPlus, FaSchool } from 'react-icons/fa';
import GradoForm from '../componentes/Grados/GradoForm';
import GradoList from '../componentes/Grados/GradoList';
import { useSecciones } from '../hooks/useSecciones';

const GradosPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingGrado, setEditingGrado] = useState(null);
    const {
        grados,
        loading,
        obtenerGrados,
        crearGrado,
        actualizarGrado,
        eliminarGrado
    } = useSecciones();

    useEffect(() => {
        console.log("Grados en estado:", grados); // Debug
        console.log("Loading:", loading); // Debug
    }, [grados, loading]);

    useEffect(() => {
        // Cargar grados solo si no están cargados
        if (grados.length === 0 && !loading) {
            console.log("Cargando grados..."); // Debug
            obtenerGrados();
        }
    }, [grados.length, loading, obtenerGrados]);

    const handleCreate = async (gradoData) => {
        console.log("Creando grado:", gradoData); // Debug
        if (editingGrado) {
            await actualizarGrado(editingGrado.id, gradoData);
        } else {
            await crearGrado(gradoData);
        }
        setShowForm(false);
        setEditingGrado(null);
    };

    const handleEdit = (grado) => {
        console.log("Editando grado:", grado); // Debug
        setEditingGrado(grado);
        setShowForm(true);
    };

    const handleDelete = async (grado) => {
        console.log("Eliminando grado:", grado.id); // Debug
        await eliminarGrado(grado.id);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                    <FaSchool className="text-4xl text-blue-600 mr-4" />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Gestión de Grados</h1>
                        <p className="text-gray-600">Administre los grados académicos de la institución</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                >
                    <FaPlus className="mr-2" />
                    Nuevo Grado
                </button>
            </div>

            {showForm && (
                <div className="mb-8">
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-bold text-gray-800">
                            {editingGrado ? 'Editar Grado' : 'Nuevo Grado'}
                        </h2>
                    </div>
                    <GradoForm
                        onSubmit={handleCreate}
                        onCancel={() => {
                            setShowForm(false);
                            setEditingGrado(null);
                        }}
                        initialData={editingGrado}
                    />
                </div>
            )}

            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Lista de Grados</h2>
                    {loading && grados.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="mt-2 text-gray-600">Cargando grados...</p>
                        </div>
                    ) : (
                        <GradoList
                            grados={grados}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default GradosPage;