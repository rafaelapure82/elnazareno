import { useState, useEffect, useCallback } from 'react';
import { PersonalServicio } from '../servicios/personal.servicio';
import { PersonalAdaptador } from '../adaptadores/personal.adaptador';

export const usePersonal = (tipo) => {
    const [personal, setPersonal] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        searchQuery: '',
        sexo: 'todos',
        edadMin: '',
        edadMax: '',
        antiguedadMin: '',
        antiguedadMax: '',
        sortBy: 'nombreCompleto',
        order: 'asc'
    });

    // Cargar personal por tipo
    const cargarPersonal = useCallback(async () => {
        if (!tipo) return;

        setLoading(true);
        setError(null);

        try {
            const response = await PersonalServicio.obtenerPersonalPorTipo(tipo);
            const personalList = PersonalAdaptador.toPersonalList(response.data, tipo);
            setPersonal(personalList);
        } catch (err) {
            setError(err.message || 'Error al cargar personal');
            console.error('Error cargando personal:', err);
        } finally {
            setLoading(false);
        }
    }, [tipo]);

    // Obtener personal por ID
    const obtenerPersonalPorId = useCallback(async (id) => {
        try {
            const response = await PersonalServicio.obtenerPersonalPorId(id);
            return PersonalAdaptador.fromApiResponse(response);
        } catch (err) {
            throw new Error(err.message || 'Error al obtener personal');
        }
    }, []);

    // Registrar personal
    const registrarPersonal = useCallback(async (data) => {
        try {
            const response = await PersonalServicio.registrarPersonal(data);
            const nuevoPersonal = PersonalAdaptador.fromApiResponse(response.data);

            // Agregar a la lista local si es del mismo tipo
            if (nuevoPersonal.tipo === tipo) {
                setPersonal(prev => [...prev, {
                    id: nuevoPersonal.id,
                    tipo: nuevoPersonal.tipo,
                    tipoLabel: nuevoPersonal.tipoLabel,
                    tipoColor: nuevoPersonal.tipoColor,
                    nombreCompleto: nuevoPersonal.nombreCompleto,
                    primer_nombre: nuevoPersonal.primer_nombre,
                    primer_apellido: nuevoPersonal.primer_apellido,
                    cedula: nuevoPersonal.cedula,
                    telefono: nuevoPersonal.telefono,
                    correo: nuevoPersonal.correo,
                    sexo: nuevoPersonal.sexo,
                    cargo_voucher: nuevoPersonal.cargo_voucher,
                    dependencia: nuevoPersonal.dependencia,
                    carga_horaria: nuevoPersonal.carga_horaria,
                    fecha_ingreso_mppe: nuevoPersonal.fecha_ingreso_mppe,
                    edad: nuevoPersonal.edad,
                    antiguedad: nuevoPersonal.antiguedad,
                    fecha_registro: nuevoPersonal.fecha_registro,
                    fecha_actualizacion: nuevoPersonal.fecha_actualizacion
                }]);
            }

            return nuevoPersonal;
        } catch (err) {
            throw new Error(err.message || 'Error al registrar personal');
        }
    }, [tipo]);

    // Actualizar personal
    const actualizarPersonal = useCallback(async (id, data) => {
        try {
            const response = await PersonalServicio.actualizarPersonal(id, data);
            const personalActualizado = PersonalAdaptador.fromApiResponse(response);

            // Actualizar en la lista local si es del mismo tipo
            if (personalActualizado.tipo === tipo) {
                setPersonal(prev =>
                    prev.map(persona => persona.id === id ? {
                        ...persona,
                        ...personalActualizado,
                        nombreCompleto: personalActualizado.nombreCompleto,
                        edad: personalActualizado.edad,
                        antiguedad: personalActualizado.antiguedad
                    } : persona)
                );
            }

            return personalActualizado;
        } catch (err) {
            throw new Error(err.message || 'Error al actualizar personal');
        }
    }, [tipo]);

    // Eliminar personal
    const eliminarPersonal = useCallback(async (id) => {
        try {
            await PersonalServicio.eliminarPersonal(id);

            // Eliminar de la lista local
            setPersonal(prev => prev.filter(persona => persona.id !== id));

            return true;
        } catch (err) {
            throw new Error(err.message || 'Error al eliminar personal');
        }
    }, []);

    // Eliminar archivo
    const eliminarArchivo = useCallback(async (personalId, archivoId) => {
        try {
            await PersonalServicio.eliminarArchivo(personalId, archivoId);
            return true;
        } catch (err) {
            throw new Error(err.message || 'Error al eliminar archivo');
        }
    }, []);

    // Filtrar y ordenar personal
    const filteredPersonal = PersonalAdaptador.filterPersonal(personal, filters);
    const sortedPersonal = PersonalAdaptador.sortPersonal(
        filteredPersonal,
        filters.sortBy,
        filters.order
    );

    // Actualizar filtros
    const actualizarFiltros = useCallback((newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    }, []);

    // Cargar inicialmente
    useEffect(() => {
        if (tipo) {
            cargarPersonal();
        }
    }, [tipo, cargarPersonal]);

    return {
        personal: sortedPersonal,
        loading,
        error,
        filters,
        cargarPersonal,
        obtenerPersonalPorId,
        registrarPersonal,
        actualizarPersonal,
        eliminarPersonal,
        eliminarArchivo,
        actualizarFiltros
    };
};