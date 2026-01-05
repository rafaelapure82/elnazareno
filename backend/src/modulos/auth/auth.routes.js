const express = require("express")
const router = express.Router()
const authController = require("./auth.controller")
const authMiddleware = require("../../middleware/authMiddleware")

router.post("/registrar", authController.registrar)
router.post("/login", authController.login)
router.get("/validarToken", authMiddleware, authController.verificarToken)
router.post("/refreshToken", authController.refreshToken)
router.post("/cerrar-sesion", authController.cerrarSesion)
module.exports = router;