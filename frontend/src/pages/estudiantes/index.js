import EstudiantesPage from './pages/EstudiantesPage';
import CrearEstudiantePage from './pages/CrearEstudiantePage';
import EditarEstudiantePage from './pages/EditarEstudiantePage';
import DetalleEstudiantePage from './pages/DetalleEstudiantePage';

export {
    EstudiantesPage,
    CrearEstudiantePage,
    EditarEstudiantePage,
    DetalleEstudiantePage
};

export * from './adaptadores/estudiante.adaptador';
export * from './adaptadores/representante.adaptador';
export * from './hooks/useEstudiantes';
export * from './hooks/useEstudiante';
export * from './servicios/estudiante.service';
export * from './utils/constants';
export * from './utils/validators';
export * from './utils/formatters';