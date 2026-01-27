// const express = require('express');
// const router = express.Router();
// const seccionesController = require('./secciones.controller');

// //*Grados
// router.post("/grados", seccionesController.crearGrado)
// router.get("/grados", seccionesController.obtenerGrados)
// router.get("/grados/:id", seccionesController.obtenerGradoPorId)
// router.put("/grados/:id", seccionesController.actualizarGrado)
// router.delete("/grados/:id", seccionesController.eliminarGrado)

// //*Secciones
// router.post("/secciones", seccionesController.crearSeccion);
// router.get("/grados/:gradoId/secciones", seccionesController.obtenerSeccionesPorGrado);//*¨Nota para buscar grado
// router.get("/secciones/:id", seccionesController.obtenerSeccionCompleta);
// router.put("/secciones/:id", seccionesController.actualizarSeccion);
// router.delete("/secciones/:id", seccionesController.eliminarSeccion);

// //*Asignar profesor a seccion

// // router.post("/secciones/profesores", seccionesController.asignarProfesorASeccion);
// // router.delete("/secciones/profesores/:asignacionId", seccionesController.eliminarProfesorDeSeccion);

// //*Asignar estudiante a seccion

// // router.post('/secciones/estudiantes', seccionesController.asignarEstudianteASeccion);
// // router.patch('/secciones/estudiantes/:asignacionId/estado', seccionesController.actualizarEstadoEstudiante);
// // router.delete('/secciones/estudiantes/:asignacionId', seccionesController.eliminarEstudianteDeSeccion);

// // PROFESORES EN SECCIONES
// router.post('/secciones/:seccionId/profesores/:profesorId', seccionesController.asignarProfesorASeccion);
// router.get('/secciones/:seccionId/profesores', seccionesController.obtenerProfesoresDeSeccion);
// router.delete('/secciones/:seccionId/profesores/:profesorId', seccionesController.removerProfesorDeSeccion);
// router.put('/secciones/:seccionId/profesores/:profesorId/tutor', seccionesController.actualizarTutor);
// router.get('/secciones/:seccionId/profesores-disponibles', seccionesController.buscarProfesoresDisponibles);

// // ESTUDIANTES EN SECCIONES
// router.post('/secciones/:seccionId/estudiantes/:estudianteId', seccionesController.inscribirEstudianteASeccion);
// router.get('/secciones/:seccionId/estudiantes', seccionesController.obtenerEstudiantesDeSeccion);
// router.delete('/secciones/:seccionId/estudiantes/:estudianteId', seccionesController.removerEstudianteDeSeccion);
// router.put('/secciones/:seccionId/estudiantes/:estudianteId/estado', seccionesController.actualizarEstadoEstudiante);
// router.get('/secciones/:seccionId/estudiantes-disponibles', seccionesController.buscarEstudiantesDisponibles);
// router.get('/estudiantes/:estudianteId/historial', seccionesController.obtenerHistorialEstudiante);

// // Sección completa con toda la información
// // router.get('/secciones/:id/completa', seccionesController.obtenerSeccionCompleta);

// module.exports = router;

const express = require('express');
const router = express.Router();
const seccionesController = require('./secciones.controller');

//*Grados
router.post("/grados", seccionesController.crearGrado);
router.get("/grados", seccionesController.obtenerGrados);
router.get("/grados/:id", seccionesController.obtenerGradoPorId);
router.put("/grados/:id", seccionesController.actualizarGrado);
router.delete("/grados/:id", seccionesController.eliminarGrado);

//*Secciones
router.post("/secciones", seccionesController.crearSeccion);
router.get("/grados/:gradoId/secciones", seccionesController.obtenerSeccionesPorGrado);
router.get("/secciones/:id", seccionesController.obtenerSeccionCompleta);
router.put("/secciones/:id", seccionesController.actualizarSeccion);
router.delete("/secciones/:id", seccionesController.eliminarSeccion);

// PROFESORES EN SECCIONES
router.post('/secciones/:seccionId/profesores/:profesorId', seccionesController.asignarProfesorASeccion);
router.get('/secciones/:seccionId/profesores', seccionesController.obtenerProfesoresDeSeccion);
router.delete('/secciones/:seccionId/profesores/:profesorId', seccionesController.removerProfesorDeSeccion);
router.put('/secciones/:seccionId/profesores/:profesorId/tutor', seccionesController.actualizarTutor);
router.get('/secciones/:seccionId/profesores-disponibles', seccionesController.buscarProfesoresDisponibles);
router.get('/profesores/:profesorId/secciones', seccionesController.obtenerSeccionesPorProfesor);

// ESTUDIANTES EN SECCIONES
router.post('/secciones/:seccionId/estudiantes/:estudianteId', seccionesController.inscribirEstudianteASeccion);
router.get('/secciones/:seccionId/estudiantes', seccionesController.obtenerEstudiantesDeSeccion);
router.delete('/secciones/:seccionId/estudiantes/:estudianteId', seccionesController.removerEstudianteDeSeccion);
router.put('/secciones/:seccionId/estudiantes/:estudianteId/estado', seccionesController.actualizarEstadoEstudiante);
router.get('/secciones/:seccionId/estudiantes-disponibles', seccionesController.buscarEstudiantesDisponibles);
router.get('/estudiantes/:estudianteId/historial', seccionesController.obtenerHistorialEstudiante);
router.get('/estudiantes/:estudianteId/seccion-actual', seccionesController.obtenerSeccionActualEstudiante);

// Endpoint para obtener año escolar actual
router.get('/config/:param', (req, res) => {
    const añoActual = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const añoEscolar = month >= 8 ? añoActual : añoActual - 1;

    res.json({
        success: true,
        message: "Año escolar actual obtenido",
        data: { año_escolar: añoEscolar }
    });
});

module.exports = router;