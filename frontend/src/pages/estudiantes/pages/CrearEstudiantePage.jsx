// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaArrowLeft } from 'react-icons/fa';
// import EstudianteFormulario from '../componentes/EstudianteFormulario';
// import { useEstudiantes } from '../hooks/useEstudiantes';
// import Swal from 'sweetalert2';

// const CrearEstudiantePage = () => {
//     const navigate = useNavigate();
//     const { crearEstudiante } = useEstudiantes();

//     const handleSubmit = async (formData) => {
//         const result = await Swal.fire({
//             title: '¿Crear estudiante?',
//             text: '¿Estás seguro de que quieres registrar este estudiante?',
//             icon: 'question',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Sí, crear',
//             cancelButtonText: 'Cancelar'
//         });

//         if (result.isConfirmed) {
//             const response = await crearEstudiante(formData);

//             if (response.success) {
//                 await Swal.fire({
//                     icon: 'success',
//                     title: '¡Estudiante creado!',
//                     text: 'El estudiante ha sido registrado exitosamente.',
//                     showConfirmButton: false,
//                     timer: 2000
//                 });

//                 navigate('/estudiantes');
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error',
//                     text: response.message || 'No se pudo crear el estudiante.',
//                 });
//             }
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 {/* Encabezado */}
//                 <div className="mb-6">
//                     <button
//                         onClick={() => navigate('/estudiantes')}
//                         className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
//                     >
//                         <FaArrowLeft className="mr-2 h-4 w-4" />
//                         Volver a estudiantes
//                     </button>

//                     <div className="md:flex md:items-center md:justify-between">
//                         <div>
//                             <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
//                                 Registrar Nuevo Estudiante
//                             </h1>
//                             <p className="mt-2 text-sm text-gray-500">
//                                 Completa todos los campos requeridos (*) para registrar un nuevo estudiante.
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Formulario */}
//                 <div className="bg-white shadow rounded-lg">
//                     <div className="px-4 py-5 sm:p-6">
//                         <EstudianteFormulario
//                             onSubmit={handleSubmit}
//                             loading={false}
//                         />
//                     </div>
//                 </div>

//                 {/* Información */}
//                 <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
//                     <div className="flex">
//                         <div className="flex-shrink-0">
//                             <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
//                                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                             </svg>
//                         </div>
//                         <div className="ml-3">
//                             <h3 className="text-sm font-medium text-blue-800">
//                                 Información importante
//                             </h3>
//                             <div className="mt-2 text-sm text-blue-700">
//                                 <ul className="list-disc pl-5 space-y-1">
//                                     <li>La cédula escolar es un campo único y requerido</li>
//                                     <li>Si el estudiante tiene cédula, debe completar todos los campos de documentación</li>
//                                     <li>La foto debe ser en formato JPG, PNG o GIF y no mayor a 5MB</li>
//                                     <li>Los campos marcados con (*) son obligatorios</li>
//                                     <li>El representante debe tener una cédula única en el sistema</li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CrearEstudiantePage;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUserGraduate } from 'react-icons/fa';
import EstudianteFormulario from '../componentes/EstudianteFormulario';
import { useEstudiantes } from '../hooks/useEstudiantes';
import Swal from 'sweetalert2';

const CrearEstudiantePage = () => {
    const navigate = useNavigate();
    const { crearEstudiante } = useEstudiantes();

    const handleSubmit = async (formData) => {
        const result = await Swal.fire({
            title: '¿Registrar estudiante?',
            text: '¿Estás seguro de que quieres registrar este estudiante?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, registrar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        });

        if (result.isConfirmed) {
            const response = await crearEstudiante(formData);

            if (response.success) {
                await Swal.fire({
                    icon: 'success',
                    title: '¡Estudiante registrado!',
                    text: 'El estudiante ha sido registrado exitosamente.',
                    showConfirmButton: false,
                    timer: 2000
                });

                navigate('/estudiantes');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.message || 'No se pudo registrar el estudiante.',
                });
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Navegación */}
                <button
                    onClick={() => navigate('/estudiantes')}
                    className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6 px-4 py-2 rounded-lg hover:bg-white transition-colors"
                >
                    <FaArrowLeft className="mr-2 h-4 w-4" />
                    Volver a estudiantes
                </button>

                {/* Encabezado */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-xl mb-4">
                        <FaUserGraduate className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Registro de Nuevo Estudiante
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Completa el formulario para registrar un nuevo estudiante en el sistema.
                        Todos los campos marcados con <span className="text-red-500">*</span> son obligatorios.
                    </p>
                </div>

                {/* Formulario */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                    <div className="p-8">
                        <EstudianteFormulario
                            onSubmit={handleSubmit}
                            loading={false}
                            mode="create"
                        />
                    </div>
                </div>

                {/* Ayuda */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-medium text-blue-900">
                                Información del registro
                            </h3>
                            <div className="mt-2 text-blue-800">
                                <ul className="list-disc pl-5 space-y-2">
                                    <li className="text-sm">El estudiante será registrado inmediatamente después de completar el formulario</li>
                                    <li className="text-sm">Recibirás un mensaje de confirmación cuando el registro sea exitoso</li>
                                    <li className="text-sm">Puedes editar la información en cualquier momento desde la lista de estudiantes</li>
                                    <li className="text-sm">La información del representante es vital para la comunicación oficial</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrearEstudiantePage;