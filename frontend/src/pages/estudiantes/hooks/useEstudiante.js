import { useState, useEffect } from 'react';
import { EstudianteService } from '../servicios/estudiante.service';
import { EstudianteAdaptador } from '../adaptadores/estudiante.adaptador';

export const useEstudiante = (id) => {
    const [estudiante, setEstudiante] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEstudiante = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await EstudianteService.obtenerPorId(id);

            if (response.success) {
                const estudianteAdaptado = EstudianteAdaptador.adaptarParaFrontend(response.data.estudiante);
                if (response.data.representante) {
                    estudianteAdaptado.representante = {
                        ...response.data.representante,
                        nombreCompleto: `${response.data.representante.nombres} ${response.data.representante.apellidos}`
                    };
                }

                setEstudiante(estudianteAdaptado);
            } else {
                setError(response.message || 'Error al cargar estudiante');
            }
        } catch (err) {
            setError(err.message || 'Error de conexión');
            console.error('Error fetching estudiante:', err);
        } finally {
            setLoading(false);
        }
    };

    const buscarPorCedula = async (filtros) => {
        try {
            setLoading(true);
            setError(null);

            const params = EstudianteAdaptador.adaptarBusquedaCedula(filtros);
            const response = await EstudianteService.buscarPorCedula(params);

            if (response.success) {
                const estudianteAdaptado = EstudianteAdaptador.adaptarParaFrontend(response.data.estudiante);

                if (response.data.representante) {
                    estudianteAdaptado.representante = {
                        ...response.data.representante,
                        nombreCompleto: `${response.data.representante.nombres} ${response.data.representante.apellidos}`
                    };
                }

                setEstudiante(estudianteAdaptado);
                return { success: true, data: estudianteAdaptado };
            } else {
                setError(response.message);
                return { success: false, message: response.message };
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Error al buscar estudiante';
            setError(errorMsg);
            return { success: false, message: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchEstudiante();
        }
    }, [id]);

    return {
        estudiante,
        loading,
        error,
        refresh: fetchEstudiante,
        buscarPorCedula
    };
};