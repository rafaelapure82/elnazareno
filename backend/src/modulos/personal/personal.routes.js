const express = require('express');
const router = express.Router();
const personalController = require("./personal.controller")
const subir = require("./personal.middleware")

// router.post("/", subir.any("archivos", 3), personalController.registrarPersonal)
router.post("/", personalController.registrarInformacionPersonal)
router.post("/:id/archivos", subir.registrarPersonal, personalController.registrarArchivoPorId)
router.get("/", personalController.obtenerPersonalPorTipo)
router.get("/:id", personalController.obtenerPersonalPorId)
router.get("/descargar-archivo/:nombreArchivo", personalController.descargarArchivo)
router.put("/:id", subir.actualizarPersonal, personalController.actualizarPersonal)
router.delete("/:id", personalController.eliminarPersonal)
router.delete("/:id/:archivoId", personalController.eliminarArchivo)
router.post("/multiples", personalController.obtenerPersonalMultiple);

module.exports = router;