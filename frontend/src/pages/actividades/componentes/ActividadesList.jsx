// modules/actividades/componentes/ActividadesList.jsx - ACTUALIZADO
import React from 'react';
import ActividadCard from './ActividadCard';
import LoadingSpinner from '../../../compartidos/componentes/LoadingSpinner';

const ActividadesList = ({
    actividades,
    cargando,
    error,
    onEdit,
    onDelete,
    onView,
    puedeEditar = false
}) => {
    if (cargando) {
        return (
            <div className="py-12">
                <LoadingSpinner text="Cargando actividades..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-600 font-medium">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    if (actividades.length === 0) {
        return (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
                <div className="text-gray-400 text-5xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No hay actividades
                </h3>
                <p className="text-gray-500">
                    Crea tu primera actividad para comenzar
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actividades.map((actividad) => (
                <ActividadCard
                    key={actividad.id}
                    actividad={actividad}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onView={onView}
                    puedeEditar={puedeEditar}
                />
            ))}
        </div>
    );
};

export default ActividadesList;