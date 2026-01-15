const express = require("express")
const router = express.Router()
const archivosController = require("./archivos.controller")
const archivosMiddleware = require("./archivos.middleware")

router.post("/", archivosMiddleware, archivosController.subirArchivo)
router.get("/", archivosController.obtenerTodosArchivos)
router.get("/buscar", archivosController.buscarArchivo)
router.get("/:id", archivosController.obtenerArchivoPorId)
router.delete("/:id", archivosController.eliminarArchivo)
router.get("/descargar/:id", archivosController.descargarArchivo)
router.get("/stream/:id", archivosController.descargarArchivoStream)
module.exports = router;