const fs = require("fs/promises");
const { pool } = require("../../config/baseDatos")
const archivoModel = require("./archivos.model");
const path = require("path");

const fileURLToPath = require('url');

class archivosServicio {
    async subirArchivo(archivo, descripcion, categoria, nombre) {
        let conexion;
        try {
            conexion = await pool.getConnection();

            const resultado = await archivoModel.subirArchivo({
                nombre_original: archivo.originalname,
                nombre_guardado: archivo.filename,
                path: archivo.path,
                size: archivo.size,
                nombre: nombre ? nombre.trim() : null,
                categoria: categoria ? categoria.trim() : null,
                mime_type: archivo.mimetype,
                description: descripcion ? descripcion.trim() : null
            }, conexion);

            const archivoSubido = await archivoModel.obtenerArchivoPorId(resultado.insertId, conexion)

            if (!archivoSubido) {
                throw new Error('No se pudo recuperar el archivo subido');
            }

            return {
                id: archivoSubido.id,
                nombreOriginal: archivoSubido.nombre_original,
                nombreAlmacenado: archivoSubido.nombre_guardado,
                path: archivoSubido.path,
                size: archivoSubido.size,
                type: archivoSubido.mime_type,
                descripcion: archivoSubido.description,
                categoria: archivoSubido.categoria,
                nombre: archivoSubido.nombre,
                fechaCreacion: archivoSubido.created_at,
                urlDescarga: `/carpeta-archivo/${archivoSubido.nombre_guardado}`
            }

        } catch (error) {
            if (archivo) {
                fs.unlink(archivo.path, (unlinkErr) => {
                    if (unlinkErr) console.error('Error eliminando archivo:', unlinkErr);
                });
            }
            throw error;
        } finally {
            if (conexion) conexion.release();
        }
    }

    async obtenerTodosArchivos(page = 1, limit = 10) {
        let conexion

        try {
            conexion = await pool.getConnection();

            const validPage = Math.max(1, parseInt(page));
            const validLimit = Math.max(1, Math.min(parseInt(limit), 100)); // Máximo 100 por página
            const offset = (validPage - 1) * validLimit;

            const [archivo, total] = await Promise.all([
                archivoModel.obtenerTodoPagina(validLimit, offset, conexion),
                archivoModel.contarTodos(conexion)
            ]);

            return {
                data: archivo,
                paginacion: {
                    total: total,
                    pagina: validPage,
                    limite: validLimit,
                    totalPagina: Math.ceil(total / validLimit),
                    hasNext: validPage < Math.ceil(total / validLimit),
                    hasPrev: validPage > 1
                }
            }
        } catch (error) {
            throw error;
        } finally {
            if (conexion) conexion.release();
        }
    }

    async obtenerArchivoPorId(id) {
        let conexion;

        try {

            if (!id || isNaN(id)) {
                throw new Error("id invalida")
            }

            conexion = await pool.getConnection();
            const archivo = await archivoModel.obtenerArchivoPorId(id, conexion)
            if (!archivo) {
                throw new Error("Archivo no encontrado")
            }

            return archivo

        } catch (error) {
            throw error
        } finally {
            if (conexion) conexion.release();
        }

    }

    async buscarArchivo(searchTerm, page = 1, limit = 10) {
        let conexion;
        //!Esto es de ejemplo
        try {
            if (!searchTerm) {
                throw new Error('Término de búsqueda requerido');
            }

            conexion = await pool.getConnection();

            const validPage = Math.max(1, parseInt(page));
            const validLimit = Math.max(1, Math.min(parseInt(limit), 100));
            const offset = (validPage - 1) * validLimit;

            // const [files, total] = await Promise.all([
            //     archivoModel.buscarArchivo(searchTerm, validLimit, offset, conexion),
            //     archivoModel.contarBusqueda(searchTerm, conexion)
            // ]);

            // Implementar búsqueda según tus necesidades
            // Esto es un ejemplo
            const [files] = await conexion.query(
                `SELECT * FROM archivos_subidos 
             WHERE nombre_original LIKE ? OR description LIKE ? OR nombre LIKE ? OR categoria LIKE ?
             ORDER BY created_at DESC
             LIMIT ? OFFSET ?`,
                [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, validLimit, offset]
            );

            const [[total]] = await conexion.query(
                'SELECT COUNT(*) as total FROM archivos_subidos WHERE nombre_original LIKE ? OR description LIKE ? OR nombre LIKE ? OR categoria LIKE ?',
                [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`,]
            );

            return {
                data: files,
                paginacion: {
                    total: total,
                    pagina: validPage,
                    limite: validLimit,
                    totalPagina: Math.ceil(total / validLimit)
                }
            };
        } catch (error) {
            throw error;
        } finally {
            if (conexion) conexion.release();
        }

    }

    async eliminarArchivo(id) {
        let conexion
        try {
            conexion = await pool.getConnection();
            // Obtener información del archivo
            const archivo = await archivoModel.obtenerArchivoPorId(id, conexion);

            if (!archivo) {
                throw new Error('Archivo no encontrado');
            }

            // Eliminar de la base de datos
            const archivoEliminado = await archivoModel.eliminarArchivoPorId(id, conexion);

            if (!archivoEliminado) {
                throw new Error('No se pudo eliminar el archivo de la base de datos');
            }

            await fs.unlink(archivo.path);

            await conexion.commit()

            return {
                id: parseInt(id),
                nombreArchivo: archivo.nombre_original,
                message: 'Archivo eliminado correctamente'
            };

        } catch (error) {
            await conexion.rollback();
            throw error;
        } finally {
            if (conexion) conexion.release();
        }
    }

    async descargarArchivo(id, usuarioId = null) {

        let conexion;

        try {
            conexion = await pool.getConnection();
            // 1. Obtener información del archivo
            const archivo = await archivoModel.obtenerArchivoPorId(id, conexion);

            if (!archivo) {
                throw new Error('Archivo no encontrado');
            }

            // 2. Construir ruta completa del archivo
            const rutaCompleta = path.join(__dirname, archivo.download_url);

            // 3. Verificar que el archivo existe físicamente
            try {
                await fs.access(rutaCompleta);
            } catch (error) {
                throw new Error('El archivo no existe en el servidor');
            }

            // 4. Obtener estadísticas del archivo
            const stats = await fs.stat(rutaCompleta);

            // 5. Registrar la descarga si hay usuario
            if (usuarioId) {
                await archivoModel.registrarDescarga(id, usuarioId);
            }

            return {
                archivo,
                ruta: rutaCompleta,
                stats,
                headers: {
                    'Content-Type': archivo.mime_type,
                    'Content-Length': stats.size,
                    'Content-Disposition': `attachment; filename="${encodeURIComponent(archivo.nombreOriginal)}"`,
                    'Cache-Control': 'private, no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                    'X-File-Name': archivo.nombre_original,
                    'X-File-Size': archivo.size,
                    'X-File-Type': archivo.mime_type
                }
            };
        } catch (error) {
            console.error('Error en servicio de descarga:', error);
            throw error;
        } finally {
            if (conexion) conexion.release();
        }
    }

    async streamArchivo(id, range, usuarioId = null) {
        let conexion;
        try {
            conexion = await pool.getConnection();
            const archivo = await archivoModel.obtenerArchivoPorId(id, conexion);

            if (!archivo) {
                throw new Error('Archivo no encontrado');
            }

            const rutaCompleta = path.join(__dirname, '..', archivo.path);
            const stats = await fs.stat(rutaCompleta);

            // Registrar descarga
            if (usuarioId) {
                await archivoModel.registrarDescarga(id, usuarioId);
            }

            return {
                archivo,
                ruta: rutaCompleta,
                stats,
                range
            };
        } catch (error) {
            throw error;
        } finally {
            if (conexion) conexion.release();
        }
    }

}


module.exports = new archivosServicio();