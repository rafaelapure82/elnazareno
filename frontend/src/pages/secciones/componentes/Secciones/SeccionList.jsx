import React from 'react';
import SeccionCard from './SeccionCard';

const SeccionList = ({ secciones, onEdit, onDelete, gradoNombre }) => {
    if (secciones.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
                <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay secciones registradas</h3>
                <p className="text-gray-500">Comience creando la primera sección para este grado.</p>
            </div>
        );
    }
    console.log("Renderizando secciones:", secciones)
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {secciones.map((seccion) => (
                <SeccionCard
                    key={seccion.id}
                    seccion={seccion}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    gradoNombre={gradoNombre}
                />
            ))}
        </div>
    );
};

export default SeccionList;