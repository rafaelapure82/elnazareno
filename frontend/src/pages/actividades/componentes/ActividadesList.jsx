import React from 'react';
import ActividadCard from './ActividadCard';
import { motion, AnimatePresence } from 'framer-motion';

const ActividadesList = ({
    actividades,
    onEdit,
    onDelete,
    onView,
    puedeEditar = false
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
            <AnimatePresence mode="popLayout">
                {actividades.map((actividad, idx) => (
                    <motion.div
                        key={actividad.id}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ delay: idx * 0.05 }}
                    >
                        <ActividadCard
                            actividad={actividad}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onView={onView}
                            puedeEditar={puedeEditar}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default ActividadesList;