// src/modules/dashboard/hooks/useDashboard.js
import { useState, useEffect, useCallback } from 'react';
import { InicioServicio } from '../servicios/inicio.servicio';
import { InicioAdaptador } from '../adaptadores/inicio.adaptador';

export const useInicio = () => {
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStatistics = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await InicioServicio.getStatistics();
            if (response.data.success) {
                const adaptedStats = InicioAdaptador.toStatistics(response.data);
                setStatistics(adaptedStats);
            } else {
                throw new Error('Error al obtener estadísticas');
            }
        } catch (err) {
            setError(err.message || 'Error al cargar datos del dashboard');
            console.error('Dashboard fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStatistics();
    }, [fetchStatistics]);

    const statCardsData = statistics
        ? InicioAdaptador.toStatCardData(statistics)
        : [];

    return {
        statistics,
        statCardsData,
        loading,
        error,
        refreshData: fetchStatistics
    };
};