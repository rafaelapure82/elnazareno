// const express = require("express")
// const router = express.Router()
// const estudiantesController = require("./estudiantes.controller")
// const upload = require("./estudiantes.middleware")

// router.post("/", upload.single('foto'), estudiantesController.crearEstudiante)
// router.delete("/:id", estudiantesController.eliminarEstudiante)
// router.put("/:id", estudiantesController.editarEstudiante)
// router.post("/buscar", estudiantesController.buscarEstudiantes)
// router.post("/buscar-cedula", estudiantesController.obtenerEstudiantePorCedulaoCiEscolar)
// router.get("/buscar-todos", estudiantesController.obtenerTodosEstudiantes)
// router.get("/:id", estudiantesController.obtenerEstudiantePorId)


// module.exports = router;


const express = require('express');
const router = express.Router();
const estudiantesController = require('./estudiantes.controller');
const { uploadEstudianteFoto, setNombreArchivo } = require('./estudiantes.middleware');

// Rutas de estudiantes
router.post("/", uploadEstudianteFoto, setNombreArchivo, estudiantesController.crearEstudiante);
router.delete("/:id", estudiantesController.eliminarEstudiante);
router.put("/:id", uploadEstudianteFoto, setNombreArchivo, estudiantesController.editarEstudiante);
router.post("/buscar", estudiantesController.buscarEstudiantes);
router.post("/buscar-cedula", estudiantesController.obtenerEstudiantePorCedulaoCiEscolar);
router.get("/buscar-todos", estudiantesController.obtenerTodosEstudiantes);
router.get("/:id", estudiantesController.obtenerEstudiantePorId);
router.get("/:id/foto", estudiantesController.obtenerFotoEstudiante);
router.get("/buscar/avanzado", estudiantesController.buscarEstudiantesAvanzado);
router.get("/estadisticas", estudiantesController.obtenerEstadisticas);
module.exports = router;