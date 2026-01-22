const personalModel = require("./personal.model")
const fs = require("fs")
const path = require("path")
class personalServicio {

    async registrarPersonal(datos, archivos) {
        let conexion;
        try {
            conexion = await personalModel.obtenerConexion();
            await conexion.beginTransaction();
            // Validar tipo de personal
            if (!this.validarTipoPersonal(datos.tipo)) {
                throw new Error('Tipo de personal no válido');
            }

            // Validar cédula única
            const cedulaExiste = await this.validarCedulaUnica(datos.cedula, conexion);
            if (cedulaExiste) {
                throw new Error('La cédula ya está registrada');
            }

            // Formatear datos
            // const personalData = this.formatearFechas(datos);
            // console.log("holaquetal", personalData)

            // Crear registro principal
            const personalId = await personalModel.crearPersonal(datos, conexion);
            if (!personalId) {
                throw new Error('Error al crear el registro de personal');
            }

            // Procesar archivos adjuntos
            if (archivos && archivos.length > 0) {
                for (const archivo of archivos) {
                    await personalModel.agregarArchivo(personalId, {
                        nombreArchivo: archivo.filename,
                        rutaArchivo: archivo.path,
                        tipoArchivo: this.determinarTipoArchivo(archivo.mimetype)
                    }, conexion);
                    if (!archivo) {
                        throw new Error('Error al asociar archivo al personal');
                    }
                }
            }



            const personal = await personalModel.obtenerDatosPersonalPorId(personalId, conexion)
            conexion.commit();
            return {
                id: personalId,
                data: personal,
                archivosProcesados: archivos ? archivos.length : 0
            };
        } catch (error) {
            conexion.rollback();
            throw error;
        } finally {
            if (conexion) {
                await conexion.release();
            }
        }
    }

    async registrarInformacionPersonal(datos) {
        let conexion;
        try {
            conexion = await personalModel.obtenerConexion();

            //Validar tipo cedula
            if (!this.validarTipoPersonal(datos.tipo)) {
                throw new Error('Tipo de personal no válido');
            }

            // Validar cédula única
            const cedulaExiste = await this.validarCedulaUnica(datos.cedula, conexion);
            if (cedulaExiste) {
                throw new Error('La cédula ya está registrada');
            }

            // Crear registro principal
            const personalId = await personalModel.crearPersonal(datos, conexion);
            if (!personalId) {
                throw new Error('Error al crear el registro de personal');
            }

            const personal = await personalModel.obtenerDatosPersonalPorId(personalId, conexion)
            return {
                id: personalId,
                data: personal,
            };
        } catch (error) {
            conexion.rollback();
            throw error;
        } finally {
            if (conexion) {
                await conexion.release();
            }
        }
    }

    async registrarArchivoPorId(personalId, archivos, descripciones = {}) {
        let conexion;

        try {
            // Validar que el personal existe
            conexion = await personalModel.obtenerConexion();
            // console.log("archiv", archivos)
            const existePersonal = await personalModel.existePersonal(personalId, conexion);
            if (!existePersonal) {
                throw new Error(`Personal con ID ${personalId} no existe`);
            }

            // Validar que hay archivos
            if (!archivos || archivos.length === 0) {
                throw new Error('No se recibieron archivos');
            }

            // Preparar datos para cada archivo
            const archivosAGuardar = archivos.map(archivo => {
                // Obtener descripción si existe
                const descripcionArchivo = descripciones[archivo.originalname] ||
                    descripciones[archivo.filename] ||
                    null;

                // Determinar tipo de archivo
                const tipoArchivo = this.determinarTipoArchivo(archivo.mimetype);
                // Extraer ruta relativa (desde carpeta-personal)
                // archivo.path = 'C:/ruta/completa/carpeta-personal/nombre.jpg'
                // Queremos: 'carpeta-personal/nombre.jpg'
                const rutaCompleta = archivo.path;
                const partesRuta = rutaCompleta.split(path.sep); const carpetaIndex = partesRuta.indexOf('carpeta-personal');

                let rutaRelativa;
                if (carpetaIndex !== -1) {
                    // Tomar desde carpeta-personal en adelante
                    rutaRelativa = partesRuta.slice(carpetaIndex).join('/');
                } else {
                    // Fallback: usar solo el nombre del archivo
                    rutaRelativa = archivo.filename;
                }

                return {
                    personal_id: parseInt(personalId),
                    nombre_original: archivo.originalname,
                    nombre_archivo: archivo.filename,
                    ruta_relativa: rutaRelativa,
                    ruta_completa: rutaCompleta,
                    tipo_archivo: tipoArchivo,
                    mime_type: archivo.mimetype,
                    size_bytes: archivo.size,
                    descripcion: descripcionArchivo
                };
            });


            // Guardar todos los archivos en la base de datos
            const idsGuardados = [];
            for (const archivoData of archivosAGuardar) {
                const id = await personalModel.agregarArchivo(archivoData, conexion);
                idsGuardados.push(id);
            }

            // Obtener los archivos guardados para la respuesta
            const archivosGuardados = await Promise.all(
                idsGuardados.map(id =>
                    personalModel.obtenerArchivoPorId(id, conexion)
                )
            );
            return {
                success: true,
                message: `Se registraron ${archivosGuardados.length} archivo(s)`,
                data: {
                    archivos: personalModel.formatearArchivos(archivosGuardados),
                    total: archivosGuardados.length,
                    personalId: parseInt(personalId)
                }
            };

        } catch (error) {
            console.error('Error registrando archivos:', error);

            // Si hubo error, intentar eliminar los archivos físicos subidos
            if (archivos && archivos.length > 0) {
                await this.limpiarArchivosSubidos(archivos);
            }

            throw error;
        } finally {
            if (conexion) conexion.release();
        }

    }

    async obtenerPersonalPorTipo(tipo) {
        let conexion;
        try {
            conexion = await personalModel.obtenerConexion();

            if (!this.validarTipoPersonal(tipo)) {
                throw new Error('Tipo de personal no válido');
            }
            const personal = await personalModel.obtenerPersonalPorTipo(tipo, conexion);

            return {
                personal,
                total: personal.length,
                filtro: tipo
            };

        } catch (error) {
            throw error;
        } finally {
            if (conexion) {
                await conexion.release();
            }
        }
    }

    async obtenerPersonalPorId(id) {
        let conexion;
        try {
            conexion = await personalModel.obtenerConexion();
            if (!id || isNaN(parseInt(id))) {
                throw new Error('ID de personal no válido');
            }

            const personal = await personalModel.obtenerPersonalPorId(id, conexion);

            return personal;

        } catch (error) {

            if (error.message === 'ID de personal no válido' ||
                error.message === 'Personal no encontrado') {
                throw error;
            }
            throw new Error('Error al obtener el personal');
        } finally {
            if (conexion) {
                await conexion.release();
            }
        }
    }

    async actualizarPersonal(id, datosCompletos) {
        // let conexion;
        // try {
        //     if (!id || isNaN(parseInt(id))) {
        //         throw new Error('ID de personal no válido');
        //     }

        //     conexion = await personalModel.obtenerConexion()

        //     // Validar cédula única (excluyendo el actual)
        //     if (datos.cedula) {
        //         const cedulaExiste = await personalModel.existeCedula(datos.cedula, conexion, id);
        //         if (cedulaExiste) {
        //             throw new Error('La cédula ya está registrada por otro personal');
        //         }
        //     }

        //     // Preparar datos para actualización
        //     const datosActualizados = this.validarDatosActualizacion({
        //         ...datos,
        //         fecha_nacimiento: datos.fecha_nacimiento
        //             ? this.formatearFechaParaBD(datos.fecha_nacimiento)
        //             : undefined,
        //         fecha_ingreso_mppe: datos.fecha_ingreso_mppe
        //             ? this.formatearFechaParaBD(datos.fecha_ingreso_mppe)
        //             : undefined
        //     });

        //     conexion.beginTransaction()
        //     // Actualizar datos principales
        //     const actualizado = await personalModel.actualizarPersonal(id, datosActualizados, conexion);

        //     if (!actualizado) {
        //         throw new Error('Personal no encontrado');
        //     }

        //     // Procesar archivos adjuntos
        //     const archivosProcesados = [];
        //     if (archivos.length > 0) {
        //         for (const archivo of archivos) {
        //             await personalModel.agregarArchivo(id, {
        //                 nombreArchivo: archivo.filename,
        //                 rutaArchivo: archivo.path,
        //                 tipoArchivo: this.determinarTipoArchivo(archivo.mimetype)
        //             }, conexion);
        //             archivosProcesados.push(archivo.filename);
        //         }
        //     }
        //     conexion.commit()

        //     const personal = await personalModel.obtenerDatosPersonalPorId(id, conexion)

        //     return {
        //         id: id,
        //         data: personal,
        //         archivosProcesados: archivosProcesados.length,
        //         nombresArchivos: archivosProcesados
        //     };

        // }
        let conexion;
        try {
            if (!id || isNaN(parseInt(id))) {
                throw new Error('ID de personal no válido');
            }

            // Extraer datos
            const { datosPersonal, archivosNuevos, archivosExistentes, archivosAEliminar } = datosCompletos;

            conexion = await personalModel.obtenerConexion();
            await conexion.beginTransaction();

            // 1. VALIDAR CÉDULA (si se está actualizando)
            if (datosPersonal.cedula) {
                const cedulaExiste = await personalModel.existeCedula(datosPersonal.cedula, conexion, id);
                if (cedulaExiste) {
                    throw new Error('La cédula ya está registrada por otro personal');
                }
            }

            // 2. PREPARAR DATOS PARA ACTUALIZACIÓN
            const datosActualizados = this.validarDatosActualizacion({
                ...datosPersonal,
                fecha_nacimiento: datosPersonal.fecha_nacimiento
                    ? this.formatearFechaParaBD(datosPersonal.fecha_nacimiento)
                    : undefined,
                fecha_ingreso_mppe: datosPersonal.fecha_ingreso_mppe
                    ? this.formatearFechaParaBD(datosPersonal.fecha_ingreso_mppe)
                    : undefined
            });
            // console.log("datos actualizados", datosActualizados)

            // 3. ACTUALIZAR DATOS PRINCIPALES DEL PERSONAL
            const actualizado = await personalModel.actualizarPersonal(id, datosActualizados, conexion);
            if (!actualizado) {
                throw new Error('Personal no encontrado');
            }

            // 4. PROCESAR ARCHIVOS NUEVOS
            const archivosNuevosProcesados = [];
            if (archivosNuevos.length > 0) {
                // console.log(`Guardando ${archivosNuevos.length} archivo(s) nuevo(s)...`);

                for (const item of archivosNuevos) {
                    const { archivo, metadata } = item;

                    // Crear datos para agregar archivo
                    const archivoData = {
                        personal_id: id,
                        nombre_original: archivo.originalname,
                        nombre_archivo: archivo.filename,
                        ruta_relativa: archivo.filename, // O la ruta que uses
                        ruta_completa: archivo.path,
                        tipo_archivo: metadata.tipo || 'documento',
                        mime_type: archivo.mimetype,
                        size_bytes: archivo.size,
                        descripcion: metadata.descripcion || ''
                    };

                    const archivoId = await personalModel.agregarArchivo(archivoData, conexion);
                    archivosNuevosProcesados.push({
                        id: archivoId,
                        nombre: archivo.originalname,
                        tipo: metadata.tipo
                    });

                    console.log(`✅ Archivo nuevo guardado: ${archivo.originalname} (ID: ${archivoId})`);
                }
            }

            // 5. ACTUALIZAR ARCHIVOS EXISTENTES (metadata)
            const archivosExistentesActualizados = [];
            if (archivosExistentes.length > 0) {
                // console.log(` Actualizando ${archivosExistentes.length} archivo(s) existente(s)...`);

                for (const archivoExistente of archivosExistentes) {
                    await conexion.execute(
                        `UPDATE personal_archivos 
                     SET tipo_archivo = ?, descripcion = ?, fecha_subida = NOW()
                     WHERE id = ? AND personal_id = ?`,
                        [
                            archivoExistente.tipo || 'documento',
                            archivoExistente.descripcion || '',
                            archivoExistente.id,
                            id
                        ]
                    );
                    archivosExistentesActualizados.push(archivoExistente.id);
                    // console.log(` Metadata actualizada para archivo ID: ${archivoExistente.id}`);
                }
            }

            // 6. ELIMINAR ARCHIVOS MARCADOS
            const archivosEliminados = [];
            if (archivosAEliminar.length > 0) {
                // console.log(`Eliminando ${archivosAEliminar.length} archivo(s)...`);

                for (const archivoId of archivosAEliminar) {
                    // Primero obtener información del archivo
                    const [archivos] = await conexion.execute(
                        'SELECT * FROM personal_archivos WHERE id = ? AND personal_id = ?',
                        [archivoId, id]
                    );

                    if (archivos.length > 0) {
                        const archivo = archivos[0];
                        archivo.ruta_archivo = path.join(__dirname, 'carpeta-personal', archivo.ruta_archivo);
                        // Eliminar archivo físico
                        if (archivo.ruta_archivo && fs.existsSync(archivo.ruta_archivo)) {
                            try {
                                fs.unlinkSync(archivo.ruta_archivo);
                                console.log(`❌ Archivo físico eliminado: ${archivo.ruta_archivo}`);
                            } catch (fsError) {
                                console.error(`⚠️ No se pudo eliminar archivo físico ${archivo.ruta_archivo}:`, fsError);
                            }
                        }

                        // Eliminar de la base de datos
                        await personalModel.eliminarArchivoPorId(archivoId, conexion);
                        archivosEliminados.push(archivoId);
                        console.log(`✅ Archivo eliminado de BD: ID ${archivoId}`);
                    } else {
                        console.log(`⚠️ Archivo no encontrado: ID ${archivoId}`);
                    }
                }
            }

            // 7. OBTENER DATOS ACTUALIZADOS DEL PERSONAL
            const personal = await personalModel.obtenerDatosPersonalPorId(id, conexion);

            await conexion.commit();
            console.log('✅ Transacción completada exitosamente');

            return {
                id: parseInt(id),
                data: personal,
                archivosProcesados: {
                    nuevos: archivosNuevosProcesados.length,
                    existentes: archivosExistentesActualizados.length,
                    eliminados: archivosEliminados.length
                },
                detalles: {
                    archivosNuevos: archivosNuevosProcesados,
                    archivosEliminados: archivosEliminados
                }
            };

        } catch (error) {
            if (conexion) {
                await conexion.rollback();
                console.error(' Transacción revertida:', error);
            }

            // Re-lanzar errores de validación específicos
            const erroresConocidos = [
                'ID de personal no válido',
                'La cédula ya está registrada por otro personal',
                'Personal no encontrado'
            ];

            if (erroresConocidos.includes(error.message)) {
                throw error;
            }

            console.error('Error general en servicio:', error);
            throw new Error(`Error al actualizar el personal: ${error.message}`);
        } finally {
            if (conexion) {
                await conexion.release();
            }
        }
    }

    async eliminarPersonal(id) {
        const conexion = await personalModel.obtenerConexion();
        try {
            await conexion.beginTransaction()

            if (!id || isNaN(parseInt(id))) {
                throw new Error('ID de personal no válido');
            }
            const archivos = await personalModel.obtenerArchivosPersonalPorId(id, conexion)

            const archivosEliminados = await personalModel.eliminarArchivosPorPersonalId(id, conexion);
            const resultado = await personalModel.eliminarPersonal(id, conexion);

            if (!resultado) {
                throw new Error('Personal no encontrado');
            }

            const archivosEliminadosCount = await personalModel.eliminarArchivosFisicos(archivos);

            await conexion.commit();
            return {

                id: parseInt(id),
                archivosEliminados: archivosEliminadosCount
            };
        } catch (error) {
            if (conexion) await conexion.rollback();

            if (error.message === 'ID de personal no válido' ||
                error.message === 'Personal no encontrado') {
                throw error;
            }
            throw new Error('Error al eliminar el personal');
        } finally {
            if (conexion) {
                await conexion.release();
            }
        }
    }

    async eliminarArchivo(personalId, archivoId) {
        const conexion = await personalModel.obtenerConexion();
        try {

            if (!personalId || isNaN(parseInt(personalId))) {
                throw new Error('ID de personal no válido');
            }

            if (!archivoId || isNaN(parseInt(archivoId))) {
                throw new Error('ID de archivo no válido');
            }

            const personal = await personalModel.obtenerDatosPersonalPorId(personalId, conexion);
            if (!personal) {
                throw new Error('Personal no encontrado');
            }

            const archivo = await personalModel.obtenerArchivosPersonalPorId(personalId, conexion, archivoId);
            if (!archivo) {
                throw new Error('Archivo no encontrado');
            }

            const eliminado = await personalModel.eliminarArchivoPorId(archivoId, conexion);
            if (!eliminado) {
                throw new Error('Error al eliminar archivo de la base de datos');
            }
            //!Ya se recibe el archivo , solo falta eliminar  y ya
            const archivoEliminado = await personalModel.eliminarArchivosFisicos(archivo);
            return {
                success: true,
                archivo: {
                    id: parseInt(archivoId),
                    nombre: archivo.nombre_archivo,
                    tipo: archivo.tipo_archivo
                },
                archivoEliminado
            };
        } catch (error) {
            if (conexion) await conexion.rollback();

            if (error.message === 'ID de personal no válido' ||
                error.message === 'Personal no encontrado') {
                throw error;
            }
            throw new Error('Error al eliminar el personal');
        } finally {
            if (conexion) {
                await conexion.release();
            }
        }
    }

    async obtenerPersonalPorIds(ids, options = {}) {
        let conexion;

        try {
            conexion = await personalModel.obtenerConexion();

            // Validación básica
            if (!ids || !Array.isArray(ids)) {
                throw new Error('Los IDs deben ser proporcionados como un array');
            }

            if (ids.length === 0) {
                return [];
            }

            // Limitar el número máximo de IDs para prevenir ataques
            const MAX_IDS = 100;
            if (ids.length > MAX_IDS) {
                throw new Error(`Máximo ${MAX_IDS} IDs permitidos por consulta`);
            }

            // Obtener datos según las opciones
            let personalData;

            personalData = await personalModel.obtenerPersonalBasicoPorIds(ids, conexion);
            // personalData = await PersonalModel.obtenerPersonalPorIds(ids);


            // Verificar si se encontraron todos los IDs solicitados
            const idsEncontrados = personalData.map(p => p.id);
            const idsNoEncontrados = ids.filter(id => !idsEncontrados.includes(Number(id)));

            // Preparar respuesta
            const response = {
                success: true,
                data: personalData,
                metadata: {
                    totalSolicitado: ids.length,
                    totalEncontrado: personalData.length,
                    idsNoEncontrados: idsNoEncontrados.length > 0 ? idsNoEncontrados : undefined
                }
            };

            // Advertencia si no se encontraron algunos IDs
            if (idsNoEncontrados.length > 0) {
                response.mensaje = `Advertencia: ${idsNoEncontrados.length} ID(s) no encontrado(s)`;
            }

            return response;
        } catch (error) {
            console.error('Error en PersonalService.obtenerPersonalPorIds:', error);

            return {
                success: false,
                mensaje: error.message || 'Error al obtener personal por IDs',
                error: process.env.NODE_ENV === 'development' ? error.stack : undefined
            };
        } finally {
            if (conexion) {
                await conexion.release();
            }
        }
    }

    validarTipoPersonal(tipo) {
        const tiposValidos = ['docente', 'administrativo', 'obrero'];
        return tiposValidos.includes(tipo);
    }

    validarDatosActualizacion(datos) {
        const camposPermitidos = [
            'primer_nombre', 'segundo_nombre', 'primer_apellido', 'segundo_apellido',
            'cedula', 'telefono', 'correo', 'fecha_nacimiento', 'sexo', 'cargo_voucher',
            'codigo_cargo', 'dependencia', 'codigo_dependencia', 'carga_horaria',
            'fecha_ingreso_mppe', 'titulos_profesionales', 'tipo_titulo', 'talla_franela',
            'talla_pantalon', 'talla_zapato'
        ];

        // Filtrar solo campos permitidos
        return Object.keys(datos)
            .filter(key => camposPermitidos.includes(key))
            .reduce((obj, key) => {
                obj[key] = datos[key];
                return obj;
            }, {});
    }

    formatearFechas(datos) {

        return {
            ...datos,
            fechaNacimiento: new Date(datos.fechaNacimiento).toISOString().split('T')[0],
            fechaIngresoMPPE: new Date(datos.fechaIngresoMPPE).toISOString().split('T')[0]
        };
    }

    formatearFechaParaBD(dateString) {
        if (!dateString) return null;

        const date = new Date(dateString);
        if (isNaN(date.getTime())) return null;

        // Formato YYYY-MM-DD compatible con MySQL
        return date.toISOString().split('T')[0];
    }

    determinarTipoArchivo(mimeType) {
        if (!mimeType) return 'otro';

        if (mimeType.startsWith('image/')) {
            return 'imagen';
        } else if (mimeType === 'application/pdf') {
            return 'pdf';
        } else if (
            mimeType.includes('document') ||
            mimeType.includes('word') ||
            mimeType.includes('excel') ||
            mimeType.includes('powerpoint')
        ) {
            return 'documento';
        } else {
            return 'otro';
        }
    }

    async validarCedulaUnica(cedula, conexion) {
        return await personalModel.existeCedula(cedula, conexion);
    }

    eliminarArchivosTemporales(archivos) {
        if (archivos && archivos.length > 0) {
            archivos.forEach(archivo => {
                if (fs.existsSync(archivo.path)) {
                    fs.unlinkSync(archivo.path);
                }
            });
        }
    }

    async limpiarArchivosSubidos(archivosMulter) {
        for (const archivo of archivosMulter) {
            if (!archivo?.path) continue;

            // Normalizar usando path
            const rutaNormalizada = path.normalize(archivo.path);

            await fs.unlink(rutaNormalizada).catch(error => {
                console.error(`Error eliminando ${archivo.filename}:`, error.message);
            });
        }
    }
}

module.exports = new personalServicio();