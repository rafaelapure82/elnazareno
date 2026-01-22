const { log } = require("console");
const { pool } = require("../../config/baseDatos")
const fs = require('fs');
class personalModel {

    async existeCedula(cedula, conexion, excludeId = null) {
        let query = 'SELECT id FROM personal WHERE cedula = ?';
        const params = [cedula];
        if (excludeId) {
            query += ' AND id != ?';
            params.push(excludeId);
        }
        //Ojo como estaba antes
        // const [rows] = await conexion.execute(query, [params]);
        const [rows] = await conexion.execute(query, params);

        return rows.length > 0;
    }

    async crearPersonal(personalData, conexion) {
        const query = `
            INSERT INTO personal 
            (tipo, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, 
             cedula, telefono, correo, fecha_nacimiento, sexo, cargo_voucher, 
             codigo_cargo, dependencia, codigo_dependencia, carga_horaria, 
             fecha_ingreso_mppe, titulos_profesionales, tipo_titulo, 
             talla_franela, talla_pantalon, talla_zapato) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const valores = [
            personalData.tipo,
            personalData.primer_nombre || null,
            personalData.segundo_nombre || null,
            personalData.primer_apellido || null,
            personalData.segundo_apellido || null,
            personalData.cedula || null,
            personalData.telefono || null,
            personalData.correo || null,
            personalData.fecha_nacimiento || null,
            personalData.sexo || null,
            personalData.cargo_voucher || null,
            personalData.codigo_cargo || null,
            personalData.dependencia || null,
            personalData.codigo_dependencia || null,
            personalData.carga_horaria || null,
            personalData.fecha_ingreso_mppe || null,
            personalData.titulos_profesionales || null,
            personalData.tipo_titulo || null,
            personalData.talla_franela || null,
            personalData.talla_pantalon || null,
            personalData.talla_zapato || null
        ]
        const [resultado] = await conexion.execute(query, valores);
        return resultado.insertId;
    }

    async agregarArchivo(archivoData, conexion) {
        const {
            personal_id,
            nombre_original,
            nombre_archivo,
            ruta_relativa,  // Ej: 'carpeta-personal/nombre.jpg'
            ruta_completa,  // Ej: 'C:/ruta/carpeta-personal/nombre.jpg'
            tipo_archivo,
            mime_type,
            size_bytes,
            descripcion = null
        } = archivoData;

        const [resultado] = await conexion.query(
            `INSERT INTO personal_archivos 
             (personal_id, nombre_original, nombre_archivo, ruta_archivo, 
              tipo_archivo, mime_type, size_bytes, descripcion) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [personal_id, nombre_original, nombre_archivo, ruta_relativa || nombre_archivo,
                tipo_archivo, mime_type, size_bytes, descripcion]
        );

        return resultado.insertId;
    }

    async actualizarPersonal(id, datosActualizados, conexion) {
        try {
            // Filtrar campos undefined o null
            const camposValidos = Object.entries(datosActualizados)
                .filter(([_, value]) => value !== undefined && value !== null)
                .reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {});

            if (Object.keys(camposValidos).length === 0) {
                return false; // No hay campos para actualizar
            }

            const setClause = Object.keys(camposValidos)
                .map(field => `${field} = ?`)
                .join(', ');

            const values = [...Object.values(camposValidos), id];

            const query = `UPDATE personal SET ${setClause} WHERE id = ?`;
            const [result] = await conexion.execute(query, values);

            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error en modelo al actualizar personal:', error);
            throw error;
        }
    }

    async obtenerPersonalPorTipo(tipo, conexion) {
        const query = 'SELECT * FROM personal WHERE tipo = ?';
        const [rows] = await conexion.execute(query, [tipo]);
        return rows;
    }

    async obtenerDatosPersonalPorId(id, conexion) {
        const query = 'SELECT * FROM personal WHERE id = ?';
        const [rows] = await conexion.execute(query, [id]);
        return rows[0];

    }

    async obtenerArchivosPersonalPorId(personalId, conexion, archivoId = null) {
        let query = 'SELECT * FROM personal_archivos WHERE personal_id = ?';
        const params = [personalId];

        if (archivoId) {
            query += ' AND id = ?';
            params.push(archivoId);
        }

        const [rows] = await conexion.execute(query, params);
        return rows;
    }

    async obtenerArchivoPorId(archivoId, conexion) {
        const [archivos] = await conexion.query(
            `SELECT * FROM personal_archivos WHERE id = ?`,
            [archivoId]
        );

        return archivos[0] || null;
    }

    async eliminarArchivosPorPersonalId(id, conexion) {
        try {
            const query = `DELETE FROM personal_archivos WHERE personal_id = ?`;

            await conexion.execute(query, [id]);

        } catch (error) {
            console.error('Error en modelo al eliminar archivos:', error);
            throw error;
        }
    }

    async obtenerPersonalBasicoPorIds(ids = [], conexion) {
        try {
            if (!Array.isArray(ids) || ids.length === 0) {
                return [];
            }

            const idsValidos = ids.filter(id =>
                Number.isInteger(Number(id)) && Number(id) > 0
            ).map(id => Number(id));
            if (idsValidos.length === 0) {
                return [];
            }

            const placeholders = idsValidos.map(() => '?').join(',');
            const query = `
                SELECT * FROM personal 
                WHERE id IN (${placeholders})
                ORDER BY FIELD(id, ${placeholders})
            `;

            const params = [...idsValidos, ...idsValidos];
            const [rows] = await conexion.execute(query, params);

            return rows;
        } catch (error) {
            console.error('Error en PersonalModel.obtenerPersonalBasicoPorIds:', error);
            throw error;
        }
    }

    async eliminarArchivoPorId(archivoId, conexion) {
        try {
            const query = `DELETE FROM personal_archivos WHERE id = ?`;
            const [result] = await conexion.execute(query, [archivoId]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error en modelo al eliminar archivo:', error);
            throw error;
        }
    }

    async eliminarPersonal(id, conexion) {
        try {
            const query = `DELETE FROM personal WHERE id = ?`;
            const [resultado] = await conexion.execute(query, [id]);
            return resultado.affectedRows > 0;
        } catch (error) {
            console.error('Error en modelo al eliminar personal:', error);
            throw error;
        }
    }

    async eliminarArchivosFisicos(archivos) {

        try {
            let archivosEliminados = 0;
            for (const archivo of archivos) {
                try {
                    if (fs.existsSync(archivo.ruta_archivo)) {
                        fs.unlinkSync(archivo.ruta_archivo);
                        archivosEliminados++;
                        console.log(`✅ Archivo eliminado: ${archivo.ruta_archivo}`);
                    }
                } catch (err) {
                    console.error(`❌ Error eliminando archivo ${archivo.ruta_archivo}:`, err);
                }
            }

            return archivosEliminados;
        } catch (error) {
            console.error('Error en modelo al eliminar archivos físicos:', error);
            throw error;
        }
    }

    async obtenerPersonalPorId(id, conexion) {
        const datosPersonales = await this.obtenerDatosPersonalPorId(id, conexion);

        if (!datosPersonales) {
            throw new Error('Personal no encontrado');
        }

        const archivosPersonales = await this.obtenerArchivosPersonalPorId(id, conexion);
        const archivos = archivosPersonales.length > 0 ? archivosPersonales : "La persona no tiene archivos cargados";
        return {
            ...datosPersonales, archivos

        }
    }

    async existePersonal(personalId, conexion) {
        const [[{ existe }]] = await conexion.query(
            `SELECT COUNT(*) as existe FROM personal WHERE id = ?`,
            [personalId]
        );

        return parseInt(existe) > 0;
    }

    formatearTamanio(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    formatearArchivos(archivos) {
        return archivos.map(archivo => ({
            id: archivo.id,
            personalId: archivo.personal_id,
            nombreOriginal: archivo.nombre_original,
            nombreArchivo: archivo.nombre_archivo,
            rutaArchivo: archivo.ruta_archivo,
            tipoArchivo: archivo.tipo_archivo,
            mimeType: archivo.mime_type,
            sizeBytes: archivo.size_bytes,
            sizeFormateado: this.formatearTamanio(archivo.size_bytes),
            descripcion: archivo.descripcion,
            fechaSubida: archivo.fecha_subida,
            fechaSubidaFormateada: new Date(archivo.fecha_subida).toLocaleString('es-ES'),
            url: `/api/${archivo.ruta_archivo}`, // Ruta para acceder
            puedeEliminar: true
        }));
    }

    async obtenerConexion() {
        return await pool.getConnection();
    }

}

module.exports = new personalModel();