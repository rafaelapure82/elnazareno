import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GradosPage from './paginas/GradosPage';
import SeccionesPage from './paginas/SeccionesPage';
import SeccionDetallePage from './paginas/SeccionDetallePage';
import SeccionesLayout from './componentes/Layout/SeccionesLayout';

const SeccionesModule = () => {
    return (
        <Routes>
            <Route path="/" element={<SeccionesLayout />}>
                <Route index element={<GradosPage />} />
                <Route path="grados" element={<GradosPage />} />
                <Route path="grados/:gradoId/secciones" element={<SeccionesPage />} />
                <Route path="/detalle/:id" element={<SeccionDetallePage />} />
            </Route>
        </Routes>
    );
};

export default SeccionesModule;

// Exportar hooks y componentes para uso externo
// export { useSecciones } from './hooks/useSecciones';
// export { seccionesService } from './servicios/secciones.service';