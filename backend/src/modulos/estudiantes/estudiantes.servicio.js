// const estudiantesValidar = require("./estudiantes.validar")
// const { pool } = require("../../config/baseDatos")
// const estudiantesModel = require("./estudiantes.model")

// class estudianteServicio {
//     // async crearEstudianteBD(estudiante, representante) {
//     //     let conexion;

//     //     try {

//     //         const estudianteError = estudiantesValidar.validarDataEstudiante(estudiante)
//     //         const representanteError = estudiantesValidar.validarDataRepresentante(representante)

//     //         if (estudianteError.length > 0 || representanteError.length > 0) {
//     //             throw {
//     //                 code: 'VALIDATION_ERROR',
//     //                 message: 'Datos de entrada inválidos',
//     //                 errors: {
//     //                     estudiante: estudianteError,
//     //                     representante: representanteError
//     //                 }
//     //             };
//     //         }


//     //         conexion = await pool.getConnection();
//     //         await conexion.beginTransaction()
//     //         const { representanteID, estaRegistrado } = await estudiantesModel.verificarRepresentante(conexion, representante);

//     //         const estudianteExiste = await estudiantesModel.encontrarEstudiantePorCedula(estudiante)

//     //         estudiantesModel.verificarDuplicadoEstudiante(estudianteExiste, estudiante)

//     //         const nuevoEstudiante = await estudiantesModel.registrarEstudiante(conexion, estudiante, representanteID);

//     //         await conexion.commit();

//     //         return {
//     //             success: true,
//     //             message: 'Estudiante registrado exitosamente',
//     //             estudianteId: nuevoEstudiante.insertId,
//     //             representanteId: representanteID,
//     //             representanteExistente: estaRegistrado
//     //         };

//     //     } catch (error) {
//     //         if (conexion) {
//     //             await conexion.rollback();
//     //         }

//     //         return Promise.reject(error);
//     //     } finally {
//     //         if (conexion) {
//     //             conexion.release();
//     //         }
//     //     }
//     // }

//     async crearEstudianteBD(data) {
//         let conexion;

//         try {
//             console.log("Datos recibidos en servicio:", data);

//             // Validar datos
//             const estudianteError = estudiantesValidar.validarDataEstudiante({
//                 nombres: data.nombres,
//                 apellidos: data.apellidos,
//                 fechaNacimiento: data.fecha_nacimiento,
//                 cedula: data.cedula,
//                 cedulaEscolar: data.cedula_escolar,
//                 sexo: data.sexo,
//                 nacionalidad: data.nacionalidad,
//                 tipoSangre: data.tipo_sangre,
//                 tieneCedula: data.tiene_cedula,
//                 tipoCedula: data.tipo_cedula
//             });

//             const representanteError = estudiantesValidar.validarDataRepresentante(data.representante);

//             if (estudianteError.length > 0 || representanteError.length > 0) {
//                 throw {
//                     code: 'VALIDATION_ERROR',
//                     message: 'Datos de entrada inválidos',
//                     errors: {
//                         estudiante: estudianteError,
//                         representante: representanteError
//                     }
//                 };
//             }

//             conexion = await pool.getConnection();
//             await conexion.beginTransaction();

//             // Verificar y registrar representante
//             const { representanteID, estaRegistrado } = await estudiantesModel.verificarRepresentante(
//                 conexion,
//                 data.representante
//             );

//             // Verificar si el estudiante ya existe
//             const estudianteData = {
//                 nombres: data.nombres,
//                 apellidos: data.apellidos,
//                 cedula: data.cedula,
//                 cedulaEscolar: data.cedula_escolar,
//                 fechaNacimiento: data.fecha_nacimiento,
//                 sexo: data.sexo,
//                 nacionalidad: data.nacionalidad,
//                 tipoSangre: data.tipo_sangre,
//                 tieneCedula: data.tiene_cedula,
//                 tipoCedula: data.tipo_cedula,
//                 direccion: data.direccion,
//                 foto: data.foto
//             };

//             const estudianteExiste = await estudiantesModel.encontrarEstudiantePorCedula(estudianteData);
//             estudiantesModel.verificarDuplicadoEstudiante(estudianteExiste, estudianteData);

//             // Registrar estudiante
//             const nuevoEstudiante = await estudiantesModel.registrarEstudiante(
//                 conexion,
//                 estudianteData,
//                 representanteID
//             );
//             const estudiante = await estudiantesModel.obtenerEstudiantePorId(conexion, nuevoEstudiante.insertId)
//             console.log("estudiante nuevvooo", nuevoEstudiante)
//             await conexion.commit();

//             return {
//                 message: 'Estudiante registrado exitosamente',
//                 estudiante
//             };

//         } catch (error) {
//             console.error("Error en crearEstudianteBD:", error);

//             if (conexion) {
//                 await conexion.rollback();
//             }

//             throw error;
//         } finally {
//             if (conexion) {
//                 conexion.release();
//             }
//         }
//     }

//     async eliminarEstudianteBD(id) {
//         let conexion;
//         try {
//             conexion = await pool.getConnection();
//             await conexion.beginTransaction();

//             const representanteId = await estudiantesModel.obtenerIdRepresentante(conexion, id);
//             if (!representanteId) {
//                 throw {
//                     code: 'ESTUDIANTE_NO_ENCONTRADO',
//                     message: 'Estudiante no encontrado'
//                 };
//             }

//             const estudianteEliminado = await estudiantesModel.eliminarEstudiante(conexion, id);

//             if (estudianteEliminado.affectedRows == 0) {
//                 throw {
//                     code: 'ESTUDIANTE_NO_ELIMINADO',
//                     message: 'El estudiante no se pudo eliminar'
//                 };


//             }

//             await estudiantesModel.eliminarRepresentanteSiNoTieneEstudiantes(conexion, representanteId);

//             await conexion.commit();

//             return {
//                 success: true,
//                 message: 'Estudiante eliminado exitosamente',
//                 estudianteId: id,
//                 representanteId: representanteId
//             };

//         } catch (error) {

//             await conexion.rollback();
//             throw error;
//         } finally {

//             conexion.release();
//         }
//     }

//     async editarEstudianteBD(estudianteId, estudiante, representante) {
//         let conexion;
//         try {
//             conexion = await pool.getConnection();
//             await conexion.beginTransaction();

//             const representanteId = await estudiantesModel.obtenerIdRepresentante(conexion, estudianteId);
//             if (!representanteId) {
//                 throw {
//                     code: 'ESTUDIANTE_NO_ENCONTRADO',
//                     message: 'Estudiante no encontrado'
//                 };
//             }

//             const resultadoRepresentante = await estudiantesModel.actualizarDatosRepresentante(conexion, representanteId, representante);
//             if (resultadoRepresentante.affectedRows == 0) {
//                 throw {
//                     code: 'REPRESENTANTE_NO_ACTUALIZADO',
//                     message: 'El representante no se pudo actualizar'
//                 };
//             }

//             const resultadoEstudiante = await estudiantesModel.actualizarDatosEstudiante(conexion, estudianteId, estudiante);

//             if (resultadoEstudiante.affectedRows == 0) {
//                 throw {
//                     code: 'ESTUDIANTE_NO_ACTUALIZADO',
//                     message: 'El estudiante no se pudo actualizar'
//                 };
//             }
//             await conexion.commit();

//             return {
//                 success: true,
//                 message: 'Estudiante y representante actualizados exitosamente',
//                 estudianteId: estudianteId,
//                 representanteId: representanteId
//             }

//         } catch (error) {
//             console.log(error)
//             await conexion.rollback();
//             throw error;
//         } finally {
//             conexion.release();
//         }
//     }

//     static separarYFormatearObjetos(data) {
//         // Función para formatear fecha a dd/mm/aaaa
//         const formatearFecha = (fecha) => {
//             if (!fecha) return null;
//             const date = new Date(fecha);
//             const dia = date.getDate().toString().padStart(2, '0');
//             const mes = (date.getMonth() + 1).toString().padStart(2, '0');
//             const año = date.getFullYear();
//             return `${dia}/${mes}/${año}`;
//         };

//         // Separar el objeto en estudiante y representante
//         const estudiante = {
//             id: data.id,
//             nombres: data.nombres,
//             apellidos: data.apellidos,
//             fecha_nacimiento: formatearFecha(data.fecha_nacimiento),
//             genero: data.genero,
//             tipo_cedula: data.tipo_cedula,
//             cedula: data.cedula,
//             cedula_escolar: data.cedula_escolar,
//             representante_id: data.representante_id,
//             created_at: formatearFecha(data.created_at)
//         };

//         const representante = {
//             id: data.representante_id,
//             nombres: data.rep_nombres,
//             apellidos: data.rep_apellidos,
//             relacion: data.relacion,
//             email: data.email,
//             telefono: data.rep_telefono,
//             ocupacion: data.ocupacion,
//             tipo_cedula: data.rep_tipo_cedula,
//             cedula: data.rep_cedula,
//             created_at: formatearFecha(data.rep_created_at)
//         };

//         return {
//             estudiante,
//             representante
//         };
//     }

//     async obtenerEstudiantePorIdBD(id) {
//         let conexion;

//         try {
//             conexion = await pool.getConnection();
//             const resultado = await estudiantesModel.obtenerEstudiantePorId(conexion, id);

//             if (!resultado) {
//                 throw {
//                     code: 'ESTUDIANTE_NO_ENCONTRADO',
//                     message: 'Estudiante no encontrado'
//                 };
//             }

//             return estudianteServicio.separarYFormatearObjetos(resultado);
//         } catch (error) {
//             throw error;
//         } finally {
//             conexion.release();
//         }
//     }

//     //!OJOOO
//     async obtenerEstudiantePorCedulaoCiEscolarBD(cedula, cedulaEscolar) {
//         let conexion
//         try {
//             if (!cedula && !cedulaEscolar) {
//                 const error = new Error('Debe proporcionar al menos un número de cédula o cédula escolar');
//                 throw error;
//             }
//             conexion = await pool.getConnection();
//             const resultado = await estudiantesModel.obtenerEstudiantePorCedulaoCiEscolar(conexion, cedula, cedulaEscolar)
//             console.log(resultado)

//             if (!resultado) {
//                 throw {
//                     code: 'ESTUDIANTE_NO_ENCONTRADO',
//                     message: 'Estudiante no encontrado'
//                 };
//             }

//             return estudianteServicio.separarYFormatearObjetos(resultado);
//         } catch (error) {
//             throw error
//         }
//     }
//     // async obtenerTodosEstudiantesBD(filters) {
//     //     try {
//     //         const { page = 1, limit = 10, search, sortBy = 'apellidos', sortOrder = 'asc', exportAll } = filters;

//     //         const result = await estudiantesModel.obtenerTodosEstudiantes({
//     //             page,
//     //             limit,
//     //             search,
//     //             sortBy,
//     //             sortOrder,
//     //             exportAll
//     //         });

//     //         if (exportAll) {
//     //             return {
//     //                 success: true,
//     //                 data: result.students
//     //             };
//     //         }

//     //         return {
//     //             success: true,
//     //             data: result.students,
//     //             pagination: {
//     //                 total: result.total,
//     //                 page: parseInt(page),
//     //                 limit: parseInt(limit),
//     //                 totalPages: Math.ceil(result.total / limit)
//     //             }
//     //         };
//     //     } catch (error) {
//     //         throw new Error(`Error en servicio de estudiantes: ${error.message}`);
//     //     }
//     // }

//     async obtenerTodosEstudiantesBD(filters) {
//         try {
//             const { page = 1, limit = 10, search, sortBy = 'apellidos', sortOrder = 'asc', exportAll } = filters;

//             const result = await estudiantesModel.obtenerTodosEstudiantes({
//                 page,
//                 limit,
//                 search,
//                 sortBy,
//                 sortOrder,
//                 exportAll
//             });

//             // Para exportar todo, solo devolver los estudiantes
//             if (exportAll) {
//                 return result.students;
//             }

//             // Para paginación normal
//             return {
//                 data: result.students,
//                 total: result.total
//             };
//         } catch (error) {
//             throw new Error(`Error en servicio de estudiantes: ${error.message}`);
//         }
//     }


//     async buscarEstudiantes(criterio) {
//         try {
//             // Validar criterio de búsqueda
//             if (criterio && criterio.trim().length < 2) {
//                 throw new Error('El criterio de búsqueda debe tener al menos 2 caracteres');
//             }

//             // Normalizar criterio
//             const criterioNormalizado = criterio ? criterio.trim() : '';

//             // Buscar estudiantes
//             const estudiantes = await estudiantesModel.buscarEstudiantes(criterioNormalizado);

//             // Formatear respuesta
//             const resultado = estudiantes.map(estudiante => ({

//                 id: estudiante.id,
//                 nombres: estudiante.estudiante_nombres,
//                 apellidos: estudiante.estudiante_apellidos,
//                 nombreCompleto: `${estudiante.estudiante_nombres} ${estudiante.estudiante_apellidos}`,
//                 fechaNacimiento: estudiante.fecha_nacimiento,
//                 genero: estudiante.genero,
//                 tipoCedula: estudiante.estudiante_tipo_cedula,
//                 cedula: estudiante.estudiante_cedula,
//                 cedulaEscolar: estudiante.cedula_escolar,
//                 edad: estudiante.fecha_nacimiento,
//                 createdAt: estudiante.estudiante_created_at

//                 ,
//                 representante: {
//                     id: estudiante.representante_id,
//                     nombres: estudiante.representante_nombres,
//                     apellidos: estudiante.representante_apellidos,
//                     nombreCompleto: `${estudiante.representante_nombres} ${estudiante.representante_apellidos}`,
//                     relacion: estudiante.relacion,
//                     email: estudiante.representante_email,
//                     telefono: estudiante.representante_telefono,
//                     ocupacion: estudiante.ocupacion,
//                     tipoCedula: estudiante.representante_tipo_cedula,
//                     cedula: estudiante.representante_cedula,
//                     createdAt: estudiante.representante_created_at
//                 }
//             }));

//             return {
//                 success: true,
//                 data: resultado,
//                 total: resultado.length,
//                 criterio: criterioNormalizado
//             };

//         } catch (error) {
//             console.error('Error en servicio de búsqueda de estudiantes:', error);
//             throw error;
//         }
//     }

//     async buscarEstudiantesAvanzado(filtros) {
//         try {
//             // Validar filtros
//             this.validarFiltros(filtros);

//             // Buscar con filtros específicos
//             const estudiantes = await estudiantesModel.buscarEstudiantesAvanzado(filtros);

//             // Formatear respuesta
//             const resultado = estudiantes.map(estudiante => ({
//                 estudiante: {
//                     id: estudiante.id,
//                     nombres: estudiante.estudiante_nombres,
//                     apellidos: estudiante.estudiante_apellidos,
//                     nombreCompleto: `${estudiante.estudiante_nombres} ${estudiante.estudiante_apellidos}`,
//                     fechaNacimiento: estudiante.fecha_nacimiento,
//                     genero: estudiante.genero,
//                     tipoCedula: estudiante.estudiante_tipo_cedula,
//                     cedula: estudiante.estudiante_cedula,
//                     cedulaEscolar: estudiante.cedula_escolar,
//                     edad: this.calcularEdad(estudiante.fecha_nacimiento),
//                     createdAt: estudiante.estudiante_created_at
//                 },
//                 representante: {
//                     id: estudiante.representante_id,
//                     nombres: estudiante.representante_nombres,
//                     apellidos: estudiante.representante_apellidos,
//                     nombreCompleto: `${estudiante.representante_nombres} ${estudiante.representante_apellidos}`,
//                     relacion: estudiante.relacion,
//                     email: estudiante.representante_email,
//                     telefono: estudiante.representante_telefono,
//                     ocupacion: estudiante.ocupacion,
//                     tipoCedula: estudiante.representante_tipo_cedula,
//                     cedula: estudiante.representante_cedula,
//                     createdAt: estudiante.representante_created_at
//                 }
//             }));

//             return {
//                 success: true,
//                 data: resultado,
//                 total: resultado.length,
//                 filtros: filtros
//             };

//         } catch (error) {
//             console.error('Error en búsqueda avanzada de estudiantes:', error);
//             throw error;
//         }
//     }

// }

// module.exports = new estudianteServicio();

const estudiantesValidar = require("./estudiantes.validar");
const { pool } = require("../../config/baseDatos");
const estudiantesModel = require("./estudiantes.model");
const fs = require('fs');
const path = require('path');

class estudianteServicio {
    async crearEstudianteBD(data) {
        let conexion;

        try {
            console.log("Datos recibidos en servicio:", data);

            // Validar datos
            const estudianteError = estudiantesValidar.validarDataEstudiante({
                nombres: data.nombres,
                apellidos: data.apellidos,
                fechaNacimiento: data.fecha_nacimiento,
                cedula: data.cedula,
                cedulaEscolar: data.cedula_escolar,
                sexo: data.sexo,
                nacionalidad: data.nacionalidad,
                tipoSangre: data.tipo_sangre,
                tieneCedula: data.tiene_cedula,
                tipoCedula: data.tipo_cedula
            });

            const representanteError = estudiantesValidar.validarDataRepresentante(data.representante);

            if (estudianteError.length > 0 || representanteError.length > 0) {
                throw {
                    code: 'VALIDATION_ERROR',
                    message: 'Datos de entrada inválidos',
                    errors: {
                        estudiante: estudianteError,
                        representante: representanteError
                    }
                };
            }

            conexion = await pool.getConnection();
            await conexion.beginTransaction();

            // Verificar y registrar representante
            const { representanteID, estaRegistrado } = await estudiantesModel.verificarRepresentante(
                conexion,
                data.representante
            );

            // Verificar si el estudiante ya existe
            const estudianteData = {
                nombres: data.nombres,
                apellidos: data.apellidos,
                cedula: data.cedula,
                cedulaEscolar: data.cedula_escolar,
                fechaNacimiento: data.fecha_nacimiento,
                sexo: data.sexo,
                nacionalidad: data.nacionalidad,
                tipoSangre: data.tipo_sangre,
                tieneCedula: data.tiene_cedula,
                tipoCedula: data.tipo_cedula,
                direccion: data.direccion,
                foto: data.foto
            };

            const estudianteExiste = await estudiantesModel.encontrarEstudiantePorCedula(estudianteData);
            console.log("data del otro", estudianteData)
            console.log("Estudiante existe:", estudianteExiste);
            estudiantesModel.verificarDuplicadoEstudiante(estudianteExiste, estudianteData);

            // Registrar estudiante
            const nuevoEstudiante = await estudiantesModel.registrarEstudiante(
                conexion,
                estudianteData,
                representanteID
            );

            // Obtener estudiante recién creado con toda la información
            const estudiante = await estudiantesModel.obtenerEstudianteCompletoPorId(conexion, nuevoEstudiante.insertId);

            await conexion.commit();

            return {
                message: 'Estudiante registrado exitosamente',
                estudiante: estudianteServicio.separarYFormatearObjetos(estudiante)
            };

        } catch (error) {
            console.error("Error en crearEstudianteBD:", error);

            if (conexion) {
                await conexion.rollback();
            }

            throw error;
        } finally {
            if (conexion) {
                conexion.release();
            }
        }
    }

    // async eliminarEstudianteBD(id) {
    //     let conexion;
    //     const fs = require('fs');
    //     const path = require('path');
    //     const upload = require('./estudiantes.middleware');

    //     try {
    //         conexion = await pool.getConnection();
    //         await conexion.beginTransaction();

    //         // 1. Obtener información completa del estudiante
    //         const estudianteInfo = await estudiantesModel.obtenerEstudianteCompletoPorId(conexion, id);
    //         if (!estudianteInfo) {
    //             throw {
    //                 code: 'ESTUDIANTE_NO_ENCONTRADO',
    //                 message: 'Estudiante no encontrado'
    //             };
    //         }

    //         const representanteId = estudianteInfo.representante_id;
    //         const fotoNombre = estudianteInfo.foto;

    //         // 2. Eliminar estudiante
    //         const estudianteEliminado = await estudiantesModel.eliminarEstudiante(conexion, id);

    //         if (estudianteEliminado.affectedRows === 0) {
    //             throw {
    //                 code: 'ESTUDIANTE_NO_ELIMINADO',
    //                 message: 'El estudiante no se pudo eliminar'
    //             };
    //         }

    //         // 3. Eliminar archivo físico de la foto si existe
    //         let fotoEliminada = false;
    //         if (fotoNombre) {
    //             const fotoCompletaPath = path.join(upload.uploadPath, fotoNombre);

    //             try {
    //                 if (fs.existsSync(fotoCompletaPath)) {
    //                     fs.unlinkSync(fotoCompletaPath);
    //                     fotoEliminada = true;
    //                     console.log(`Archivo físico eliminado: ${fotoCompletaPath}`);
    //                 }
    //             } catch (fsError) {
    //                 console.warn(`No se pudo eliminar el archivo físico: ${fotoCompletaPath}`, fsError);
    //             }
    //         }

    //         // 4. Eliminar representante si no tiene más estudiantes
    //         await estudiantesModel.eliminarRepresentanteSiNoTieneEstudiantes(conexion, representanteId);

    //         await conexion.commit();

    //         return {
    //             success: true,
    //             message: 'Estudiante eliminado exitosamente',
    //             estudianteId: id,
    //             representanteId: representanteId,
    //             fotoEliminada: fotoEliminada
    //         };

    //     } catch (error) {
    //         console.error("Error en eliminarEstudianteBD:", error);
    //         if (conexion) await conexion.rollback();
    //         throw error;
    //     } finally {
    //         if (conexion) conexion.release();
    //     }
    // }

    async eliminarEstudianteBD(id) {
        let conexion;
        const fs = require('fs').promises; // Usar versión promises para mejor manejo
        const path = require('path');

        // IMPORTANTE: Importar correctamente el módulo
        const uploadMiddleware = require('./estudiantes.middleware');

        // Obtener la ruta de uploads - Verificar la estructura exportada
        let uploadDir;
        if (uploadMiddleware.uploadDir) {
            uploadDir = uploadMiddleware.uploadDir;
        } else if (uploadMiddleware.upload && uploadMiddleware.upload.uploadPath) {
            uploadDir = uploadMiddleware.upload.uploadPath;
        } else {
            // Fallback: definir la ruta directamente
            uploadDir = path.join(__dirname, 'carpeta-estudiantes');
        }

        try {
            conexion = await pool.getConnection();
            await conexion.beginTransaction();

            // 1. Obtener información completa del estudiante
            const estudianteInfo = await estudiantesModel.obtenerEstudianteCompletoPorId(conexion, id);
            if (!estudianteInfo) {
                throw {
                    code: 'ESTUDIANTE_NO_ENCONTRADO',
                    message: 'Estudiante no encontrado'
                };
            }

            const representanteId = estudianteInfo.representante_id;
            const fotoNombre = estudianteInfo.foto;

            // 2. Eliminar estudiante
            const estudianteEliminado = await estudiantesModel.eliminarEstudiante(conexion, id);

            if (estudianteEliminado.affectedRows === 0) {
                throw {
                    code: 'ESTUDIANTE_NO_ELIMINADO',
                    message: 'El estudiante no se pudo eliminar'
                };
            }

            // 3. Eliminar archivo físico de la foto si existe
            let fotoEliminada = false;
            if (fotoNombre) {
                const fotoCompletaPath = path.join(uploadDir, path.basename(fotoNombre));

                console.log(`🔍 Buscando archivo en: ${fotoCompletaPath}`);

                try {
                    // Verificar si el archivo existe
                    await fs.access(fotoCompletaPath);

                    // Eliminar el archivo
                    await fs.unlink(fotoCompletaPath);
                    fotoEliminada = true;
                    console.log(`✅ Archivo físico eliminado: ${fotoCompletaPath}`);

                } catch (fsError) {
                    if (fsError.code === 'ENOENT') {
                        console.warn(`⚠️ Archivo no encontrado: ${fotoCompletaPath}`);
                    } else {
                        console.error(`❌ Error al eliminar archivo: ${fotoCompletaPath}`, fsError);
                    }
                }
            }

            // 4. Eliminar representante si no tiene más estudiantes
            await estudiantesModel.eliminarRepresentanteSiNoTieneEstudiantes(conexion, representanteId);

            await conexion.commit();

            return {
                success: true,
                message: 'Estudiante eliminado exitosamente',
                estudianteId: id,
                representanteId: representanteId,
                fotoEliminada: fotoEliminada,
                rutaArchivo: fotoNombre ? `carpeta-estudiantes/${fotoNombre}` : null
            };

        } catch (error) {
            console.error("❌ Error en eliminarEstudianteBD:", error);
            if (conexion) await conexion.rollback();
            throw error;
        } finally {
            if (conexion) conexion.release();
        }
    }

    async editarEstudianteBD(estudianteId, data) {
        let conexion;
        try {
            conexion = await pool.getConnection();
            await conexion.beginTransaction();

            // 1. Obtener estudiante actual
            const estudianteActual = await estudiantesModel.obtenerEstudianteCompletoPorId(conexion, estudianteId);
            if (!estudianteActual) {
                throw {
                    code: 'ESTUDIANTE_NO_ENCONTRADO',
                    message: 'Estudiante no encontrado'
                };
            }

            let fotoActual = false;
            if (data.foto_existente) {
                fotoActual = estudianteActual.foto
            }

            const representanteId = estudianteActual.representante_id;

            // 2. Actualizar representante
            const resultadoRepresentante = await estudiantesModel.actualizarDatosRepresentante(
                conexion,
                representanteId,
                data.representante
            );

            if (resultadoRepresentante.affectedRows === 0) {
                throw {
                    code: 'REPRESENTANTE_NO_ACTUALIZADO',
                    message: 'El representante no se pudo actualizar'
                };
            }

            // 3. Actualizar estudiante
            const estudianteData = {
                nombres: data.nombres,
                apellidos: data.apellidos,
                fechaNacimiento: data.fecha_nacimiento,
                sexo: data.sexo,
                tieneCedula: data.tiene_cedula,
                tipoCedula: data.tipo_cedula,
                cedula: data.cedula,
                cedulaEscolar: data.cedula_escolar,
                nacionalidad: data.nacionalidad,
                tipoSangre: data.tipo_sangre,
                direccion: data.direccion,
                foto: data.foto,
                fotoActual
            };

            const resultadoEstudiante = await estudiantesModel.actualizarDatosEstudianteCompleto(
                conexion,
                estudianteId,
                estudianteData
            );

            if (resultadoEstudiante.affectedRows === 0) {
                throw {
                    code: 'ESTUDIANTE_NO_ACTUALIZADO',
                    message: 'El estudiante no se pudo actualizar'
                };
            }

            // 4. Si hay nueva foto, guardarla
            if (data.foto) {
                await estudiantesModel.guardarFotoEstudiante(conexion, estudianteId, data.foto);
            }

            await conexion.commit();

            return {
                success: true,
                message: 'Estudiante y representante actualizados exitosamente',
                estudianteId: estudianteId,
                representanteId: representanteId
            };

        } catch (error) {
            console.error("Error en editarEstudianteBD:", error);
            if (conexion) await conexion.rollback();
            throw error;
        } finally {
            if (conexion) conexion.release();
        }
    }

    static separarYFormatearObjetos(data) {
        const formatearFecha = (fecha) => {
            if (!fecha) return null;
            const date = new Date(fecha);
            const dia = date.getDate().toString().padStart(2, '0');
            const mes = (date.getMonth() + 1).toString().padStart(2, '0');
            const año = date.getFullYear();
            return `${dia}/${mes}/${año}`;
        };

        const estudiante = {
            id: data.id,
            nombres: data.nombres,
            apellidos: data.apellidos,
            fecha_nacimiento: formatearFecha(data.fecha_nacimiento),
            sexo: data.genero || data.sexo,
            tiene_cedula: data.tiene_cedula || false,
            nacionalidad: data.nacionalidad,
            tipo_sangre: data.tipo_sangre,
            tipo_cedula: data.tipo_cedula,
            cedula: data.cedula,
            cedula_escolar: data.cedula_escolar,
            foto: data.foto,
            foto_ruta: data.foto_ruta,
            direccion: {
                estado: data.direccion_estado,
                municipio: data.direccion_municipio,
                parroquia: data.direccion_parroquia,
                sector: data.direccion_sector,
                calle: data.direccion_calle,
                casa: data.direccion_casa,
                referencia: data.direccion_referencia
            },
            representante_id: data.representante_id || data.rep_id,
            created_at: formatearFecha(data.created_at)
        };

        const representante = {
            id: data.representante_id || data.rep_id,
            nombres: data.rep_nombres,
            apellidos: data.rep_apellidos,
            sexo: data.rep_sexo,
            fecha_nacimiento: formatearFecha(data.rep_fecha_nacimiento),
            relacion: data.relacion || data.rep_relacion,
            email: data.rep_email,
            telefono: data.rep_telefono,
            ocupacion: data.rep_ocupacion,
            tipo_cedula: data.rep_tipo_cedula,
            cedula: data.rep_cedula,
            created_at: formatearFecha(data.rep_created_at)
        };

        return {
            estudiante,
            representante
        };
    }

    async obtenerEstudiantePorIdBD(id) {
        let conexion;

        try {
            conexion = await pool.getConnection();
            const resultado = await estudiantesModel.obtenerEstudianteCompletoPorId(conexion, id);

            if (!resultado) {
                throw {
                    code: 'ESTUDIANTE_NO_ENCONTRADO',
                    message: 'Estudiante no encontrado'
                };
            }

            return estudianteServicio.separarYFormatearObjetos(resultado);
        } catch (error) {
            throw error;
        } finally {
            if (conexion) conexion.release();
        }
    }

    async obtenerEstudiantePorCedulaoCiEscolarBD(cedula, cedulaEscolar, tipoCedula = 'estudiante') {
        let conexion;
        try {
            if (!cedula && !cedulaEscolar) {
                throw new Error('Debe proporcionar al menos un número de cédula o cédula escolar');
            }

            conexion = await pool.getConnection();

            let resultado;
            if (tipoCedula === 'representante') {
                // Buscar por cédula del representante
                const query = `
                    SELECT e.*, r.*
                    FROM estudiantes e
                    JOIN representantes r ON e.representante_id = r.id
                    WHERE r.cedula = ?
                    LIMIT 1
                `;
                const [rows] = await conexion.execute(query, [cedula]);
                resultado = rows[0];
            } else {
                // Buscar por cédula o cédula escolar del estudiante
                resultado = await estudiantesModel.obtenerEstudiantePorCedulaoCiEscolar(
                    conexion,
                    cedula,
                    cedulaEscolar
                );
            }

            if (!resultado) {
                throw {
                    code: 'ESTUDIANTE_NO_ENCONTRADO',
                    message: 'Estudiante no encontrado'
                };
            }

            return this.separarYFormatearObjetos(resultado);

        } catch (error) {
            throw error;
        } finally {
            if (conexion) conexion.release();
        }
    }
    //!Vieja
    // async obtenerTodosEstudiantesBD(filters) {
    //     try {
    //         const { page = 1, limit = 50, search, sortBy = 'apellidos', sortOrder = 'asc', exportAll, genero, nacionalidad, estado } = filters;

    //         const result = await estudiantesModel.obtenerTodosEstudiantes({
    //             page,
    //             limit,
    //             search,
    //             sortBy,
    //             sortOrder,
    //             exportAll,
    //             genero,
    //             nacionalidad,
    //             estado
    //         });

    //         if (exportAll) {
    //             return result.students;
    //         }

    //         return {
    //             data: result.students,
    //             total: result.total
    //         };
    //     } catch (error) {
    //         throw new Error(`Error en servicio de estudiantes: ${error.message}`);
    //     }
    // }

    async obtenerTodosEstudiantesBD(filters) {
        try {
            const {
                page = 1,
                limit = 50,
                search,
                sortBy = 'apellidos',
                sortOrder = 'asc',
                exportAll,
                genero,
                nacionalidad,
                estado,
                tipoSangre,
                tieneCedula,
                fechaDesde,
                fechaHasta
            } = filters;

            const result = await estudiantesModel.obtenerTodosEstudiantes({
                page,
                limit,
                search,
                sortBy,
                sortOrder,
                exportAll,
                genero,
                nacionalidad,
                estado,
                tipoSangre,
                tieneCedula,
                fechaDesde,
                fechaHasta
            });

            if (exportAll) {
                return result.students;
            }

            return {
                data: result.students,
                total: result.total
            };
        } catch (error) {
            throw new Error(`Error en servicio de estudiantes: ${error.message}`);
        }
    }

    async buscarEstudiantes(options) {
        try {
            const { criterio, page = 1, limit = 10, tipoBusqueda = 'general' } = options;

            if (criterio && criterio.trim().length < 2) {
                throw new Error('El criterio de búsqueda debe tener al menos 2 caracteres');
            }

            const criterioNormalizado = criterio ? criterio.trim() : '';

            const offset = (page - 1) * limit;
            const estudiantes = await estudiantesModel.buscarEstudiantes(criterioNormalizado, limit, offset, tipoBusqueda);

            const resultado = estudiantes.map(estudiante => ({
                id: estudiante.id,
                nombres: estudiante.estudiante_nombres,
                apellidos: estudiante.estudiante_apellidos,
                nombreCompleto: `${estudiante.estudiante_nombres} ${estudiante.estudiante_apellidos}`,
                fechaNacimiento: estudiante.fecha_nacimiento,
                genero: estudiante.genero,
                tipoCedula: estudiante.estudiante_tipo_cedula,
                cedula: estudiante.estudiante_cedula,
                cedulaEscolar: estudiante.cedula_escolar,
                edad: this.calcularEdad(estudiante.fecha_nacimiento),
                createdAt: estudiante.estudiante_created_at,
                foto: estudiante.foto,
                representante: {
                    id: estudiante.representante_id,
                    nombres: estudiante.representante_nombres,
                    apellidos: estudiante.representante_apellidos,
                    nombreCompleto: `${estudiante.representante_nombres} ${estudiante.representante_apellidos}`,
                    relacion: estudiante.relacion,
                    email: estudiante.representante_email,
                    telefono: estudiante.representante_telefono,
                    ocupacion: estudiante.ocupacion,
                    tipoCedula: estudiante.representante_tipo_cedula,
                    cedula: estudiante.representante_cedula,
                    createdAt: estudiante.representante_created_at
                }
            }));

            const total = await estudiantesModel.contarEstudiantesBusqueda(criterioNormalizado, tipoBusqueda);

            return {
                success: true,
                data: resultado,
                total: total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit),
                criterio: criterioNormalizado
            };

        } catch (error) {
            console.error('Error en servicio de búsqueda de estudiantes:', error);
            throw error;
        }
    }

    async buscarEstudiantesAvanzado(filtros) {
        try {
            const estudiantes = await estudiantesModel.buscarEstudiantesAvanzado(filtros);

            const resultado = estudiantes.map(estudiante => ({
                estudiante: {
                    id: estudiante.id,
                    nombres: estudiante.estudiante_nombres,
                    apellidos: estudiante.estudiante_apellidos,
                    nombreCompleto: `${estudiante.estudiante_nombres} ${estudiante.estudiante_apellidos}`,
                    fechaNacimiento: estudiante.fecha_nacimiento,
                    genero: estudiante.genero,
                    tipoCedula: estudiante.estudiante_tipo_cedula,
                    cedula: estudiante.estudiante_cedula,
                    cedulaEscolar: estudiante.cedula_escolar,
                    edad: this.calcularEdad(estudiante.fecha_nacimiento),
                    createdAt: estudiante.estudiante_created_at
                },
                representante: {
                    id: estudiante.representante_id,
                    nombres: estudiante.representante_nombres,
                    apellidos: estudiante.representante_apellidos,
                    nombreCompleto: `${estudiante.representante_nombres} ${estudiante.representante_apellidos}`,
                    relacion: estudiante.relacion,
                    email: estudiante.representante_email,
                    telefono: estudiante.representante_telefono,
                    ocupacion: estudiante.ocupacion,
                    tipoCedula: estudiante.representante_tipo_cedula,
                    cedula: estudiante.representante_cedula,
                    createdAt: estudiante.representante_created_at
                }
            }));

            return {
                success: true,
                data: resultado,
                total: resultado.length,
                filtros: filtros
            };

        } catch (error) {
            console.error('Error en búsqueda avanzada de estudiantes:', error);
            throw error;
        }
    }

    calcularEdad(fechaNacimiento) {
        if (!fechaNacimiento) return null;
        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }

        return edad;
    }

    validarFiltros(filtros) {
        // Implementar validación de filtros si es necesario
        return true;
    }
}

module.exports = new estudianteServicio();