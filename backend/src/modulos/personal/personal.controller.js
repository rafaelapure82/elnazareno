const personalServicio = require("./personal.servicio")
const path = require("path");
const fs = require("fs")

class personalController {

    async registrarPersonal(req, res) {

        const archivos = req.files || [];
        const info = req.body;

        const datos = JSON.parse(info.data)

        try {
            if (!datos.tipo || !datos.cedula) {
                return res.status(400).json({
                    success: false,
                    message: 'Datos incompletos: tipo y cédula son requeridos'
                });
            }

            const resultado = await personalServicio.registrarPersonal(datos, archivos)
            // console.log(resultado)

            res.status(201).json({
                success: true,
                message: `${resultado.tipo} registrado correctamente`,
                data: resultado.data,
                archivosProcesados: resultado.archivosProcesados

            });
        } catch (error) {
            // Eliminar archivos subidos en caso de error
            personalServicio.eliminarArchivosTemporales(archivos);

            const mensajeError = personalController.obtenerMensajeError(error.message);

            res.status(personalController.obtenerCodigoError(error.message)).json({
                success: false,
                message: mensajeError,
                error: error.message
            });
        }
    }

    async registrarInformacionPersonal(req, res) {
        const datos = req.body;
        try {
            if (!datos.tipo || !datos.cedula) {
                return res.status(400).json({
                    success: false,
                    message: 'Datos incompletos: tipo y cédula son requeridos'
                });
            }

            const resultado = await personalServicio.registrarInformacionPersonal(datos)

            res.status(201).json({
                success: true,
                message: `${resultado.data.tipo} registrado correctamente`,
                data: resultado.data

            });
        } catch (error) {
            const mensajeError = personalController.obtenerMensajeError(error.message);

            res.status(personalController.obtenerCodigoError(error.message)).json({
                success: false,
                message: mensajeError,
                error: error.message
            });
        }
    }

    async registrarArchivoPorId(req, res) {
        try {
            const personalId = req.params.id;
            const archivos = req.files || [];
            const descripciones = req.body;

            if (!personalId || isNaN(personalId)) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de personal inválido'
                });
            }


            const resultado = await personalServicio.registrarArchivoPorId(personalId, archivos, descripciones);

            res.status(201).json(resultado);

        } catch (error) {
            // Eliminar archivos subidos en caso de error
            personalServicio.eliminarArchivosTemporales(archivos);

            const mensajeError = personalController.obtenerMensajeError(error.message);
            const codigoError = personalController.obtenerCodigoError(error.message);

            res.status(codigoError).json({
                success: false,
                message: mensajeError,
                error: error.message
            });
        }
    }

    async obtenerPersonalPorTipo(req, res) {

        try {
            const { tipo } = req.query;
            const resultado = await personalServicio.obtenerPersonalPorTipo(tipo);


            res.status(200).json({
                success: true,
                data: resultado.personal == 0 ? "No hay personal registrado" : resultado.personal,
                meta: {
                    total: resultado.total,
                    filtro: resultado.filtro
                }
            });
        } catch (error) {
            const mensajeError = personalController.obtenerMensajeError(error.message);
            const codigoError = personalController.obtenerCodigoError(error.message);
            res.status(codigoError).json({
                success: false,
                message: mensajeError
            });
        }
    }

    async obtenerPersonalPorId(req, res) {
        const { id } = req.params;
        try {

            const resultado = await personalServicio.obtenerPersonalPorId(id);

            res.status(200).json({
                success: true,
                data: resultado
            });
        } catch (error) {
            const mensajeError = personalController.obtenerMensajeError(error.message);
            const codigoError = personalController.obtenerCodigoError(error.message);
            res.status(codigoError).json({
                success: false,
                message: mensajeError
            });
        }
    }

    async actualizarPersonal(req, res) {

        try {
            const { id } = req.params;
            // console.log(`🔄 Actualizando personal ID: ${id}`);

            // 1. Parsear datos del personal
            const personalData = req.body.personal ? JSON.parse(req.body.personal) : {};
            // console.log(' Datos personal recibidos:', personalData);

            //Obtener archivos nuevos subidos
            const archivosNuevos = req.files?.archivos || [];
            // console.log(`${archivosNuevos.length} archivo(s) nuevo(s) subido(s)`);

            // Parsear metadata general
            const metadata = req.body.metadata ? JSON.parse(req.body.metadata) : {
                existentes: [],
                eliminar: []
            };
            // console.log(' Metadata:', metadata);

            // Parsear metadata individual de cada archivo nuevo
            const metadatosArchivosNuevos = {};
            Object.keys(req.body).forEach(key => {
                if (key.startsWith('archivo_') && key.endsWith('_metadata')) {
                    const index = key.replace('archivo_', '').replace('_metadata', '');
                    try {
                        metadatosArchivosNuevos[index] = JSON.parse(req.body[key]);
                    } catch (e) {
                        console.error(`Error parseando metadata ${key}:`, e);
                    }
                }
            });

            // 5. Preparar estructura para el servicio
            const datosParaServicio = {
                datosPersonal: personalData,
                archivosNuevos: archivosNuevos.map((archivo, index) => ({
                    archivo: archivo, // Objeto completo de multer
                    metadata: metadatosArchivosNuevos[index] || {
                        tipo: 'documento',
                        descripcion: ''
                    }
                })),
                archivosExistentes: metadata.existentes || [],
                archivosAEliminar: metadata.eliminar || []
            };

            // console.log(' Enviando al servicio:', {
            //     datosPersonal: Object.keys(personalData).length,
            //     archivosNuevos: datosParaServicio.archivosNuevos.length,
            //     archivosExistentes: datosParaServicio.archivosExistentes.length,
            //     archivosAEliminar: datosParaServicio.archivosAEliminar.length
            // });

            // 6. Llamar al servicio
            const resultado = await personalServicio.actualizarPersonal(id, datosParaServicio);

            res.json({
                success: true,
                message: 'Personal actualizado correctamente',
                id: resultado.id,
                data: resultado.data,
                archivosProcesados: resultado.archivosProcesados

            });

        } catch (error) {
            const mensajeError = personalController.obtenerMensajeError(error.message);
            const codigoError = personalController.obtenerCodigoError(error.message);
            res.status(codigoError).json({
                success: false,
                message: mensajeError
            });
        }
    }

    async descargarArchivo(req, res) {
        try {
            const nombreArchivo = req.params.nombreArchivo;
            const rutaArchivo = path.join(__dirname, 'carpeta-personal', nombreArchivo);

            // Verificar si el archivo existe
            if (!fs.existsSync(rutaArchivo)) {
                return res.status(404).json({ error: 'Archivo no encontrado' });
            }

            // Configurar headers para forzar descarga
            res.setHeader('Content-Disposition', `attachment; filename="${nombreArchivo}"`);
            res.setHeader('Content-Type', 'application/octet-stream');

            // Enviar el archivo
            res.sendFile(rutaArchivo);

        } catch (error) {
            console.error('Error al descargar archivo:', error);
            res.status(500).json({ error: 'Error al descargar el archivo' });
        }
    }

    async obtenerPersonalMultiple(req, res) {
        try {
            // Obtener IDs del cuerpo de la solicitud
            const { ids } = req.body;

            // Validar que se proporcionaron IDs
            if (!ids) {
                return res.status(400).json({
                    success: false,
                    mensaje: 'Se requiere el campo "ids" en el cuerpo de la solicitud'
                });
            }

            // Validar que ids sea un array
            if (!Array.isArray(ids)) {
                return res.status(400).json({
                    success: false,
                    mensaje: 'El campo "ids" debe ser un array de números'
                });
            }

            // Validar que el array no esté vacío
            if (ids.length === 0) {
                return res.status(400).json({
                    success: false,
                    mensaje: 'El array "ids" no puede estar vacío'
                });
            }

            // Validar que todos los elementos sean números válidos
            const idsInvalidos = ids.filter(id =>
                !Number.isInteger(Number(id)) || Number(id) <= 0
            );

            if (idsInvalidos.length > 0) {
                return res.status(400).json({
                    success: false,
                    mensaje: `IDs inválidos encontrados: ${idsInvalidos.join(', ')}`
                });
            }

            // Obtener opciones de la consulta
            const conArchivos = req.query.conArchivos !== 'false'; // Por defecto true
            const options = { conArchivos };

            // Llamar al servicio
            const resultado = await personalServicio.obtenerPersonalPorIds(ids, options);

            // Responder según el resultado
            if (resultado.success) {
                return res.status(200).json(resultado);
            } else {
                return res.status(500).json(resultado);
            }

        } catch (error) {
            console.error('Error en PersonalController.obtenerPersonalMultiple:', error);

            return res.status(500).json({
                success: false,
                mensaje: 'Error interno del servidor',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    async eliminarPersonal(req, res) {
        try {
            const { id } = req.params;

            const resultado = await personalServicio.eliminarPersonal(id);

            res.json({
                success: true,
                message: 'Personal eliminado correctamente',
                data: {
                    id: resultado.id,
                    archivosEliminados: resultado.archivosEliminados
                }
            });
        } catch (error) {
            const mensajeError = personalController.obtenerMensajeError(error.message);
            const codigoError = personalController.obtenerCodigoError(error.message);
            res.status(codigoError).json({
                success: false,
                message: mensajeError
            });
        }
    }
    async eliminarArchivo(req, res) {
        try {
            const { id, archivoId } = req.params;

            const resultado = await personalServicio.eliminarArchivo(id, archivoId);
            res.status(200).json({
                success: true,
                message: 'Archivo eliminado correctamente',
                data: resultado
            });
        } catch (error) {
            const mensajeError = personalController.obtenerMensajeError(error.message);
            const codigoError = personalController.obtenerCodigoError(error.message);
            res.status(codigoError).json({
                success: false,
                message: mensajeError
            });
        }
    }

    static obtenerMensajeError(mensaje) {
        const mensajesError = {
            'Tipo de personal no válido': 'Tipo de personal no válido',
            'La cédula ya está registrada': 'La cédula ya está registrada',
            'La cédula ya está registrada por otro personal': 'La cédula ya está registrada por otro personal',
            'Error al obtener el personal': 'Error al obtener el personal',
            'Error al registrar el personal': 'Error al registrar el personal',
            'Error al actualizar el personal': 'Error al actualizar el personal',
            'Error al eliminar el personal': 'Error al eliminar el personal',
            'Personal no encontrado': 'Personal no encontrado',
            'ID de personal no válido': 'ID de personal no válido'
        };


        return mensajesError[mensaje] || 'Error al procesar la solicitud';
    }

    static obtenerCodigoError(mensaje) {
        const codigosError = {
            'Tipo de personal no válido': 400,
            'La cédula ya está registrada': 400,
            'La cédula ya está registrada por otro personal': 400,
            'Error al obtener el personal': 500,
            'Error al registrar el personal': 500,
            'Error al actualizar el personal': 500,
            'Error al eliminar el personal': 500,
            'Personal no encontrado': 404,
            'ID de personal no válido': 400
        };

        return codigosError[mensaje] || 500;
    }
}

module.exports = new personalController();