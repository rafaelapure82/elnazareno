const archivosServicio = require("./archivos.servicio")
const fs = require("fs")
const path = require("path")

class archivosController {

    async subirArchivo(req, res) {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No se seleccionó ningún archivo válido'
            });
        }

        const { descripcion, categoria, nombre } = req.body || '';

        try {
            const archivoSubido = await archivosServicio.subirArchivo(req.file, descripcion, categoria, nombre)

            // Respuesta exitosa
            res.json({
                success: true,
                message: 'Archivo subido correctamente',
                file: archivoSubido
            });

        } catch (error) {

            let statusCode = 500;
            let message = 'Error al guardar la información del archivo en la base de datos';

            if (error.message.includes('No se seleccionó') || error.message.includes('descripción')) {
                statusCode = 400;
                message = error.message;
            }

            res.status(statusCode).json({
                success: false,
                message: message,
                error: error.message
            });
        }
    }

    async obtenerTodosArchivos(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const resultado = await archivosServicio.obtenerTodosArchivos(page, limit);

            res.status(200).json({
                success: true,
                data: resultado.data,
                paginacion: resultado.paginacion
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: 'Error al obtener los archivos',
                error: error.message
            });
        }
    }

    async obtenerArchivoPorId(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error("id invalida")
            }

            const archivo = await archivosServicio.obtenerArchivoPorId(id);

            res.status(200).json({
                success: true,
                data: archivo
            });

        } catch (error) {

            const statusCode = error.message === 'Archivo no encontrado' ? 404 : 500;

            res.status(statusCode).json({
                success: false,
                message: error.message,
                error: error.message
            });
        }
    }

    //* Se tiene que pasar el parametro por (Query Params)
    async buscarArchivo(req, res) {
        try {
            const { query: searchTerm } = req.query;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            if (!searchTerm) {
                return res.status(400).json({
                    success: false,
                    message: 'Término de búsqueda requerido'
                });
            }

            const resultado = await archivosServicio.buscarArchivo(searchTerm, page, limit);

            res.json({
                success: true,
                data: resultado.data,
                pagination: resultado.paginacion
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al buscar archivos',
                error: error.message
            });
        }
    }

    async eliminarArchivo(req, res) {
        try {
            const { id } = req.params

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de archivo inválido'
                });
            }

            const resultado = await archivosServicio.eliminarArchivo(id)

            res.status(200).json({
                success: true,
                message: resultado.message,
                data: {
                    id: resultado.id,
                    nombreArchivo: resultado.nombreArchivo
                }
            });

        } catch (error) {
            let statusCode = 500;
            let message = 'Error al eliminar el archivo';

            if (error.message === 'Archivo no encontrado') {
                statusCode = 404;
                message = error.message;
            }

            res.status(statusCode).json({
                success: false,
                message: message,
                error: error.message
            });
        }
    }

    async descargarArchivo(req, res) {
        try {
            const { id } = req.params;
            const usuarioId = req.user?.id || null;

            // Validar ID
            if (!id || isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de archivo inválido'
                });
            }

            // Obtener datos del archivo
            const datosArchivo = await archivosServicio.descargarArchivo(id, usuarioId);

            // Configurar headers para la descarga
            Object.entries(datosArchivo.headers).forEach(([key, value]) => {
                res.setHeader(key, value);
            });

            // Stream del archivo al cliente
            const fileStream = fs.createReadStream(datosArchivo.ruta);

            fileStream.on('error', (error) => {
                console.error('Error al leer el archivo:', error);
                if (!res.headersSent) {
                    res.status(500).json({
                        success: false,
                        message: 'Error al leer el archivo'
                    });
                }
            });

            fileStream.pipe(res);

        } catch (error) {
            console.error('Error en descarga de archivo:', error.message);

            const statusCode = error.message.includes('no encontrado') ? 404 : 500;

            res.status(statusCode).json({
                success: false,
                message: error.message || 'Error al descargar el archivo',
                error: process.env.NODE_ENV === 'development' ? error.stack : undefined
            });
        }
    }

    // Controlador para streaming con soporte a range (para pausar/reanudar descargas)
    async descargarArchivoStream(req, res) {
        try {
            const { id } = req.params;
            const range = req.headers.range;
            const usuarioId = req.user?.id || null;

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de archivo inválido'
                });
            }

            const datosArchivo = await archivosServicio.streamArchivo(id, range, usuarioId);
            const { ruta, stats, archivo } = datosArchivo;

            if (range) {
                // Parsear el rango solicitado
                const parts = range.replace(/bytes=/, "").split("-");
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
                const chunksize = (end - start) + 1;

                // Validar rango
                if (start >= stats.size || end >= stats.size) {
                    res.status(416).json({
                        success: false,
                        message: 'Rango solicitado no válido'
                    });
                    return;
                }

                // Configurar headers para respuesta parcial
                res.writeHead(206, {
                    'Content-Range': `bytes ${start}-${end}/${stats.size}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunksize,
                    'Content-Type': archivo.mimeType,
                    'Content-Disposition': `attachment; filename="${encodeURIComponent(archivo.nombreOriginal)}"`,
                });

                // Crear stream para el rango específico
                const fileStream = fs.createReadStream(ruta, { start, end });
                fileStream.pipe(res);
            } else {
                // Descarga completa
                res.writeHead(200, {
                    'Content-Length': stats.size,
                    'Content-Type': archivo.mimeType,
                    'Content-Disposition': `attachment; filename="${encodeURIComponent(archivo.nombreOriginal)}"`,
                });

                const fileStream = fs.createReadStream(ruta);
                fileStream.pipe(res);
            }

        } catch (error) {
            console.error('Error en streaming de archivo:', error);
            res.status(error.message.includes('no encontrado') ? 404 : 500).json({
                success: false,
                message: error.message || 'Error al descargar el archivo'
            });
        }
    }

    // Método para obtener información del archivo sin descargarlo
    static async obtenerInfoArchivo(req, res) {
        try {
            const { id } = req.params;

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de archivo inválido'
                });
            }

            // Usar el servicio para obtener información
            const archivo = await archivosServicio.obtenerInfoArchivo(id);

            if (!archivo) {
                return res.status(404).json({
                    success: false,
                    message: 'Archivo no encontrado'
                });
            }

            res.status(200).json({
                success: true,
                data: archivo
            });

        } catch (error) {
            console.error('Error obteniendo información del archivo:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener información del archivo'
            });
        }
    }
}




module.exports = new archivosController();