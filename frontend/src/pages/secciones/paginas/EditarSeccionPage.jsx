import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaTimes } from 'react-icons/fa';
import SeccionForm from '../componentes/Secciones/SeccionForm';
import { useSecciones } from '../hooks/useSecciones';
import Swal from 'sweetalert2';

const EditarSeccionPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [seccion, setSeccion] = useState(null);
    const [loading, setLoading] = useState(true);
    const { servicios, grados, obtenerSeccionCompleta, actualizarSeccion } = useSecciones();

    useEffect(() => {
        cargarSeccion();
    }, [id]);

    const cargarSeccion = async () => {
        setLoading(true);
        try {
            const result = await servicios.obtenerSeccionCompleta(id);
            if (result.success) {
                setSeccion(result.data);
            } else {
                Swal.fire('Error', result.message, 'error');
                navigate(`/secciones/detalle/${id}`);
            }
        } catch (error) {
            Swal.fire('Error', 'Error al cargar la sección', 'error');
            navigate(`/secciones/detalle/${id}`);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (seccionData) => {
        try {
            const result = await servicios.actualizarSeccion(id, seccionData);
            if (result.success) {
                Swal.fire('Éxito', result.message, 'success');
                navigate(`/secciones/detalle/${id}`);
            } else {
                Swal.fire('Error', result.message, 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Error al actualizar sección', 'error');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Cargando información...</p>
                </div>
            </div>
        );
    }

    if (!seccion) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Sección no encontrada</h2>
                    <button
                        onClick={() => navigate('/secciones/grados')}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Volver a Grados
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-8">
                <button
                    onClick={() => navigate(`/secciones/detalle/${id}`)}
                    className="mr-4 p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                >
                    <FaArrowLeft />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Editar Sección: {seccion.nombre}</h1>
                    <p className="text-gray-600">Actualice la información de la sección</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <SeccionForm
                    onSubmit={handleUpdate}
                    onCancel={() => navigate(`/secciones/detalle/${id}`)}
                    initialData={{
                        nombre: seccion.nombre,
                        capacidad_maxima: seccion.capacidadMaxima,
                        grado_id: seccion.gradoId
                    }}
                    grados={grados}
                />
            </div>
        </div>
    );
};

export default EditarSeccionPage;