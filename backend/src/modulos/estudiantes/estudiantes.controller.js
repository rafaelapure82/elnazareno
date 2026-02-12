// const estudianteServicio = require("./estudiantes.servicio")

// class estudiantesController {

//     // async crearEstudiante(req, res) {
//     //     console.log("body", req.body)
//     //     console.log("file", req.file)
//     //     const { estudiante, representante } = req.body;
//     //     try {
//     //         console.log("estudiantes",)
//     //         const resultado = await estudianteServicio.crearEstudianteBD(estudiante, representante)
//     //         //    console.log(resultado + " estudiante-controller")

//     //         res.status(201).json({
//     //             success: true,
//     //             message: resultado.representanteExistente
//     //                 ? 'Estudiante registrado con representante existente'
//     //                 : 'Registro completo exitoso',
//     //             data: resultado
//     //         });
//     //     } catch (error) {
//     //         res.status(error.error?.code === 'ER_DUP_ENTRY' ? 409 : 500).json(error);
//     //     }
//     // }

//     async crearEstudiante(req, res) {
//         try {
//             console.log("Datos recibidos del frontend:");
//             console.log("Body:", req.body);
//             console.log("File:", req.file);

//             // Procesar datos del formulario (FormData)
//             const data = {
//                 // Datos del estudiante
//                 nombres: req.body.nombres,
//                 apellidos: req.body.apellidos,
//                 sexo: req.body.sexo,
//                 tiene_cedula: req.body.tiene_cedula === 'true' || req.body.tiene_cedula === true,
//                 tipo_cedula: req.body.tipo_cedula || null,
//                 cedula: req.body.cedula || null,
//                 cedula_escolar: req.body.cedula_escolar,
//                 nacionalidad: req.body.nacionalidad,
//                 tipo_sangre: req.body.tipo_sangre,
//                 fecha_nacimiento: req.body.fecha_nacimiento,

//                 // Dirección del estudiante
//                 direccion: {
//                     estado: req.body['direccion[estado]'] || req.body.direccion?.estado,
//                     municipio: req.body['direccion[municipio]'] || req.body.direccion?.municipio,
//                     parroquia: req.body['direccion[parroquia]'] || req.body.direccion?.parroquia,
//                     sector: req.body['direccion[sector]'] || req.body.direccion?.sector,
//                     calle: req.body['direccion[calle]'] || req.body.direccion?.calle,
//                     casa: req.body['direccion[casa]'] || req.body.direccion?.casa,
//                     referencia: req.body['direccion[referencia]'] || req.body.direccion?.referencia || ''
//                 },

//                 // Datos del representante
//                 representante: {
//                     tipo_cedula: req.body['representante[tipo_cedula]'] || req.body.representante?.tipo_cedula,
//                     cedula: req.body['representante[cedula]'] || req.body.representante?.cedula,
//                     nombres: req.body['representante[nombres]'] || req.body.representante?.nombres,
//                     apellidos: req.body['representante[apellidos]'] || req.body.representante?.apellidos,
//                     sexo: req.body['representante[sexo]'] || req.body.representante?.sexo,
//                     fecha_nacimiento: req.body['representante[fecha_nacimiento]'] || req.body.representante?.fecha_nacimiento || null,
//                     relacion: req.body['representante[relacion]'] || req.body.representante?.relacion,
//                     telefono: req.body['representante[telefono]'] || req.body.representante?.telefono,
//                     email: req.body['representante[email]'] || req.body.representante?.email || null,
//                     ocupacion: req.body['representante[ocupacion]'] || req.body.representante?.ocupacion || null
//                 }
//             };

//             // Agregar información de la foto si existe
//             if (req.file) {
//                 data.foto = {
//                     filename: req.file.filename,
//                     path: req.file.path,
//                     mimetype: req.file.mimetype,
//                     size: req.file.size
//                 };
//             }

//             console.log("Datos procesados:", data);

//             const resultado = await estudianteServicio.crearEstudianteBD(data);

//             res.status(201).json({
//                 success: true,
//                 message: resultado.representanteExistente
//                     ? 'Estudiante registrado con representante existente'
//                     : 'Registro completo exitoso',
//                 data: resultado.estudiante
//             });
//         } catch (error) {
//             console.error("Error en crearEstudiante:", error);

//             // Manejo de errores específicos
//             if (error.code === 'ER_DUP_ENTRY') {
//                 return res.status(409).json({
//                     success: false,
//                     message: 'Registro duplicado',
//                     error: error.message
//                 });
//             }

//             if (error.code === 'VALIDATION_ERROR') {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'Error de validación',
//                     errors: error.errors
//                 });
//             }

//             res.status(500).json({
//                 success: false,
//                 message: 'Error interno del servidor',
//                 error: error.message
//             });
//         }
//     }

//     async eliminarEstudiante(req, res) {
//         const { id } = req.params;
//         try {

//             const resultado = await estudianteServicio.eliminarEstudianteBD(id);

//             res.status(200).json({
//                 success: true,
//                 message: 'Estudiante eliminado exitosamente',
//                 data: resultado
//             });

//         } catch (error) {
//             res.status(400).json({ error: 'Error al eliminar el estudiante' });
//         }
//     }

//     async editarEstudiante(req, res) {
//         const { estudiante, representante } = req.body;
//         const estudianteId = req.params.id;
//         try {
//             const resultado = await estudianteServicio.editarEstudianteBD(estudianteId, estudiante, representante);

//             res.status(200).json({
//                 success: true,
//                 message: 'Estudiante editado exitosamente',
//                 data: resultado
//             });
//         } catch (error) {
//             console.log(error)
//             if (error.message === 'ERR_DUPLICATED_CEDULA') {
//                 res.status(400).json({ error: 'Existe un representante con esta cédula' });
//             } else if (error.message === 'ERR_DUPLICATED_EMAIL') {
//                 res.status(400).json({ error: 'Existe un representante con este email' });
//             } else if (error.message === 'ERR_DUPLICATED_CEDULA_ESTUDIANTE') {
//                 res.status(400).json({ error: 'Existe un estudiante con esta cédula' });
//             } else if (error.message === 'ERR_DUPLICATED_CEDULA_ESCOLAR') {
//                 res.status(400).json({ error: 'Existe un estudiante con esta cédula escolar' });
//             } else {
//                 res.status(400).json({ error: 'Error al editar el estudiante' });
//             }
//         }
//     }

//     async obtenerEstudiantePorId(req, res) {
//         try {
//             const resultado = await estudianteServicio.obtenerEstudiantePorIdBD(req.params.id);
//             res.status(200).json({
//                 success: true,
//                 message: 'Estudiante obtenido exitosamente',
//                 data: resultado
//             });

//         } catch (error) {
//             res.status(400).json({
//                 success: false,
//                 message: 'Error al obtener estudiantes',
//                 error: error.message
//             });
//         }
//     }

//     async obtenerEstudiantePorCedulaoCiEscolar(req, res) {
//         const { cedula, cedula_escolar } = req.body;
//         console.log("cedula:", cedula, "cedula escolar:", cedula_escolar)
//         try {

//             // const resultado = await estudianteServicio.obtenerEstudiantePorCedulaoCiEscolarBD(cedula, cedula_escolar)
//             res.status(200).json({
//                 success: true,
//                 message: 'Estudiantes obtenido exitosamente',
//                 data: cedula
//             });

//         } catch (error) {
//             res.status(400).json({
//                 success: false,
//                 message: 'Error al obtener estudiante',
//                 error: error.message
//             });
//         }
//     }

//     // async obtenerTodosEstudiantes(req, res) {
//     //     try {
//     //         const { page = 1, limit = 10, search, sortBy = 'apellidos', sortOrder = 'asc', exportAll } = req.query;

//     //         const resultado = await estudianteServicio.obtenerTodosEstudiantesBD({
//     //             page,
//     //             limit,
//     //             search,
//     //             sortBy,
//     //             sortOrder,
//     //             exportAll
//     //         });


//     //         res.status(200).json({
//     //             success: true,
//     //             message: 'Estudiantes obtenido exitosamente',
//     //             data: resultado
//     //         });
//     //     } catch (error) {
//     //         res.status(400).json({
//     //             success: false,
//     //             message: 'Error al obtener los estudiantes',
//     //             error: error.message
//     //         });
//     //     }
//     // }

//     async obtenerTodosEstudiantes(req, res) {
//         try {
//             const { page = 1, limit = 10, search, sortBy = 'apellidos', sortOrder = 'asc', exportAll } = req.query;

//             const resultado = await estudianteServicio.obtenerTodosEstudiantesBD({
//                 page: parseInt(page),
//                 limit: parseInt(limit),
//                 search,
//                 sortBy,
//                 sortOrder,
//                 exportAll: exportAll === 'true'
//             });

//             // Si es exportAll, devolver solo los datos
//             if (exportAll === 'true') {
//                 return res.status(200).json({
//                     success: true,
//                     message: 'Estudiantes exportados exitosamente',
//                     data: resultado // Aquí resultado es el array de estudiantes
//                 });
//             }

//             // Para paginación normal
//             const total = resultado.total || 0;
//             const currentPage = parseInt(page);
//             const currentLimit = parseInt(limit);
//             const totalPages = Math.ceil(total / currentLimit);

//             res.status(200).json({
//                 success: true,
//                 message: 'Estudiantes obtenidos exitosamente',
//                 data: resultado.data || resultado.students || [], // Asegurar que siempre sea un array
//                 pagination: {
//                     total: total,
//                     page: currentPage,
//                     limit: currentLimit,
//                     totalPages: totalPages
//                 }
//             });
//         } catch (error) {
//             console.error('Error en obtenerTodosEstudiantes:', error);
//             res.status(400).json({
//                 success: false,
//                 message: 'Error al obtener los estudiantes',
//                 error: error.message
//             });
//         }
//     }


//     async buscarEstudiantes(req, res) {
//         console.log("llega al controlador");
//         try {
//             const { q } = req.body; // q = query parameter
//             console.log(req.body);
//             // Validar que haya un criterio de búsqueda
//             if (!q || q.trim().length === 0) {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'Debe proporcionar un criterio de búsqueda (parámetro "q")',
//                     data: []
//                 });
//             }

//             // Validar longitud mínima
//             if (q.trim().length < 2) {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'El criterio de búsqueda debe tener al menos 2 caracteres',
//                     data: []
//                 });
//             }

//             // Ejecutar búsqueda
//             const resultado = await estudianteServicio.buscarEstudiantes(q);

//             res.status(200).json(resultado);

//         } catch (error) {
//             console.error('Error en controlador de búsqueda de estudiantes:', error);

//             const statusCode = error.message.includes('Debe proporcionar') ? 400 : 500;

//             res.status(statusCode).json({
//                 success: false,
//                 message: error.message || 'Error al buscar estudiantes',
//                 data: [],
//                 error: process.env.NODE_ENV === 'development' ? error.stack : undefined
//             });
//         }
//     }


//     async buscarEstudiantesAvanzado(req, res) {
//         try {
//             const {
//                 nombreEstudiante,
//                 cedulaEstudiante,
//                 cedulaEscolar,
//                 nombreRepresentante,
//                 cedulaRepresentante,
//                 genero,
//                 limit = 50
//             } = req.query;

//             // Construir objeto de filtros
//             const filtros = {};

//             if (nombreEstudiante) filtros.nombreEstudiante = nombreEstudiante;
//             if (cedulaEstudiante) filtros.cedulaEstudiante = cedulaEstudiante;
//             if (cedulaEscolar) filtros.cedulaEscolar = cedulaEscolar;
//             if (nombreRepresentante) filtros.nombreRepresentante = nombreRepresentante;
//             if (cedulaRepresentante) filtros.cedulaRepresentante = cedulaRepresentante;
//             if (genero) filtros.genero = genero;
//             if (limit) filtros.limit = parseInt(limit);

//             // Ejecutar búsqueda avanzada
//             const resultado = await EstudianteServicio.buscarEstudiantesAvanzado(filtros);

//             res.status(200).json(resultado);

//         } catch (error) {
//             console.error('Error en búsqueda avanzada de estudiantes:', error);

//             res.status(error.message.includes('Debe proporcionar') ? 400 : 500).json({
//                 success: false,
//                 message: error.message || 'Error al buscar estudiantes',
//                 data: [],
//                 error: process.env.NODE_ENV === 'development' ? error.stack : undefined
//             });
//         }
//     }

// }
// module.exports = new estudiantesController();



const estudianteServicio = require("./estudiantes.servicio");

class estudiantesController {
    async crearEstudiante(req, res) {

        try {


            // console.log("=".repeat(50));
            // console.log("📋 DATOS RECIBIDOS DEL FRONTEND:");
            // console.log("=".repeat(50));

            // // Ver todos los datos disponibles
            // console.log("📦 Body:", req.body);
            // console.log("🖼️ File:", req.file);
            // console.log("🏷️ req.fotoNombre:", req.fotoNombre);
            // console.log("🏷️ req.fileName:", req.fileName);
            // console.log("📝 req.file?.filename:", req.file?.filename);

            // Validar que se haya subido una foto
            // if (!req.file) {
            //     return res.status(400).json({
            //         success: false,
            //         message: 'La foto del estudiante es requerida'
            //     });
            // }

            // Validar cédula escolar
            if (!req.body.cedula_escolar) {
                return res.status(400).json({
                    success: false,
                    message: 'La cédula escolar es requerida'
                });
            }

            // Procesar datos del formulario
            const data = {
                nombres: req.body.nombres,
                apellidos: req.body.apellidos,
                sexo: req.body.sexo,
                tiene_cedula: req.body.tiene_cedula === 'true' || req.body.tiene_cedula === true,
                tipo_cedula: req.body.tipo_cedula || null,
                cedula: req.body.cedula || null,
                cedula_escolar: req.body.cedula_escolar,
                nacionalidad: req.body.nacionalidad,
                tipo_sangre: req.body.tipo_sangre,
                fecha_nacimiento: req.body.fecha_nacimiento,

                direccion: {
                    estado: req.body['direccion[estado]'] || req.body.direccion?.estado,
                    municipio: req.body['direccion[municipio]'] || req.body.direccion?.municipio,
                    parroquia: req.body['direccion[parroquia]'] || req.body.direccion?.parroquia,
                    sector: req.body['direccion[sector]'] || req.body.direccion?.sector,
                    calle: req.body['direccion[calle]'] || req.body.direccion?.calle,
                    casa: req.body['direccion[casa]'] || req.body.direccion?.casa,
                    referencia: req.body['direccion[referencia]'] || req.body.direccion?.referencia || ''
                },

                representante: {
                    tipo_cedula: req.body['representante[tipo_cedula]'] || req.body.representante?.tipo_cedula,
                    cedula: req.body['representante[cedula]'] || req.body.representante?.cedula,
                    nombres: req.body['representante[nombres]'] || req.body.representante?.nombres,
                    apellidos: req.body['representante[apellidos]'] || req.body.representante?.apellidos,
                    sexo: req.body['representante[sexo]'] || req.body.representante?.sexo,
                    fecha_nacimiento: req.body['representante[fecha_nacimiento]'] || req.body.representante?.fecha_nacimiento || null,
                    relacion: req.body['representante[relacion]'] || req.body.representante?.relacion,
                    telefono: req.body['representante[telefono]'] || req.body.representante?.telefono,
                    email: req.body['representante[email]'] || req.body.representante?.email || null,
                    ocupacion: req.body['representante[ocupacion]'] || req.body.representante?.ocupacion || null
                }
            };

            // Agregar información de la foto
            if (req.file) {
                data.foto = {
                    filename: req.file.filename,
                    path: req.file.path,
                    mimetype: req.file.mimetype,
                    size: req.file.size
                };
            }

            console.log("Datos procesados:", data);

            const resultado = await estudianteServicio.crearEstudianteBD(data);

            res.status(201).json({
                success: true,
                message: resultado.message || 'Estudiante creado exitosamente',
                data: resultado.estudiante
            });
        } catch (error) {
            console.error("Error en crearEstudiante:", error);

            const statusCode = error.code === 'VALIDATION_ERROR' ? 400 :
                error.code === 'ER_DUP_ENTRY' ? 409 : 500;

            res.status(statusCode).json({
                success: false,
                message: error.message || 'Error al crear estudiante',
                error: process.env.NODE_ENV === 'development' ? error.stack : undefined
            });
        }
    }

    async eliminarEstudiante(req, res) {
        try {
            const { id } = req.params;
            if (!id || isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de estudiante inválido'
                });
            }

            const resultado = await estudianteServicio.eliminarEstudianteBD(id);

            res.status(200).json({
                success: true,
                message: 'Estudiante eliminado exitosamente',
                data: {
                    estudianteId: id,
                    representanteId: resultado.representanteId,
                    fotoEliminada: resultado.fotoEliminada || false
                }
            });

        } catch (error) {
            console.error("Error en eliminarEstudiante:", error);

            const statusCode = error.code === 'ESTUDIANTE_NO_ENCONTRADO' ? 404 : 500;

            res.status(statusCode).json({
                success: false,
                message: error.message || 'Error al eliminar estudiante',
                error: process.env.NODE_ENV === 'development' ? error.stack : undefined
            });
        }
    }

    async editarEstudiante(req, res) {
        try {
            const estudianteId = req.params.id;
            const file = req.file;
            if (!estudianteId || isNaN(estudianteId)) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de estudiante inválido'
                });
            }

            // Procesar datos del formulario
            const data = {
                nombres: req.body.nombres,
                apellidos: req.body.apellidos,
                sexo: req.body.sexo,
                tiene_cedula: req.body.tiene_cedula === 'true' || req.body.tiene_cedula === true,
                tipo_cedula: req.body.tipo_cedula || null,
                cedula: req.body.cedula || null,
                cedula_escolar: req.body.cedula_escolar,
                nacionalidad: req.body.nacionalidad,
                tipo_sangre: req.body.tipo_sangre,
                fecha_nacimiento: req.body.fecha_nacimiento,
                foto_existente: req.body.foto_existente,
                direccion: {
                    estado: req.body['direccion[estado]'] || req.body.direccion?.estado,
                    municipio: req.body['direccion[municipio]'] || req.body.direccion?.municipio,
                    parroquia: req.body['direccion[parroquia]'] || req.body.direccion?.parroquia,
                    sector: req.body['direccion[sector]'] || req.body.direccion?.sector,
                    calle: req.body['direccion[calle]'] || req.body.direccion?.calle,
                    casa: req.body['direccion[casa]'] || req.body.direccion?.casa,
                    referencia: req.body['direccion[referencia]'] || req.body.direccion?.referencia || ''
                },

                representante: {
                    tipo_cedula: req.body['representante[tipo_cedula]'] || req.body.representante?.tipo_cedula,
                    cedula: req.body['representante[cedula]'] || req.body.representante?.cedula,
                    nombres: req.body['representante[nombres]'] || req.body.representante?.nombres,
                    apellidos: req.body['representante[apellidos]'] || req.body.representante?.apellidos,
                    sexo: req.body['representante[sexo]'] || req.body.representante?.sexo,
                    fecha_nacimiento: req.body['representante[fecha_nacimiento]'] || req.body.representante?.fecha_nacimiento || null,
                    relacion: req.body['representante[relacion]'] || req.body.representante?.relacion,
                    telefono: req.body['representante[telefono]'] || req.body.representante?.telefono,
                    email: req.body['representante[email]'] || req.body.representante?.email || null,
                    ocupacion: req.body['representante[ocupacion]'] || req.body.representante?.ocupacion || null
                }
            };

            if (file) {
                data.foto = {
                    filename: file.filename,
                    path: file.path,
                    mimetype: file.mimetype,
                    size: file.size
                };
            }

            await estudianteServicio.editarEstudianteBD(estudianteId, data);

            const estudianteActualizado = await estudianteServicio.obtenerEstudiantePorIdBD(estudianteId);

            res.status(200).json({
                success: true,
                message: 'Estudiante actualizado exitosamente',
                data: estudianteActualizado
            });

        } catch (error) {
            console.error("Error en editarEstudiante:", error);

            const statusCode = error.code === 'ESTUDIANTE_NO_ENCONTRADO' ? 404 :
                error.message?.includes('ERR_DUPLICATED') ? 409 : 400;

            res.status(statusCode).json({
                success: false,
                message: error.message || 'Error al actualizar estudiante',
                error: process.env.NODE_ENV === 'development' ? error.stack : undefined
            });
        }
    }

    async obtenerEstudiantePorId(req, res) {
        try {
            const { id } = req.params;

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de estudiante inválido'
                });
            }

            const resultado = await estudianteServicio.obtenerEstudiantePorIdBD(id);

            if (!resultado) {
                return res.status(404).json({
                    success: false,
                    message: 'Estudiante no encontrado'
                });
            }

            // Agregar URL de la foto si existe
            if (resultado.estudiante.foto) {
                // resultado.estudiante.foto_url = `/uploads/estudiantes/${resultado.estudiante.foto}`;
                resultado.estudiante.foto_url = `/${resultado.estudiante.foto}`;
            }

            res.status(200).json({
                success: true,
                message: 'Estudiante obtenido exitosamente',
                data: resultado
            });

        } catch (error) {
            console.error('Error en obtenerEstudiantePorId:', error);

            const statusCode = error.code === 'ESTUDIANTE_NO_ENCONTRADO' ? 404 : 500;

            res.status(statusCode).json({
                success: false,
                message: error.message || 'Error al obtener estudiante',
                error: process.env.NODE_ENV === 'development' ? error.stack : undefined
            });
        }
    }

    async obtenerEstudiantePorCedulaoCiEscolar(req, res) {
        try {
            const {
                cedula,
                cedula_escolar,
                tipo_cedula = 'estudiante'
            } = req.body;

            if (!cedula && !cedula_escolar) {
                return res.status(400).json({
                    success: false,
                    message: 'Debe proporcionar cédula o cédula escolar'
                });
            }

            const resultado = await estudianteServicio.obtenerEstudiantePorCedulaoCiEscolarBD(
                cedula,
                cedula_escolar,
                tipo_cedula
            );

            if (!resultado) {
                return res.status(404).json({
                    success: false,
                    message: 'No se encontró estudiante con los criterios proporcionados'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Estudiante encontrado exitosamente',
                data: resultado
            });

        } catch (error) {
            console.error('Error en obtenerEstudiantePorCedulaoCiEscolar:', error);

            const statusCode = error.code === 'ESTUDIANTE_NO_ENCONTRADO' ? 404 : 500;

            res.status(statusCode).json({
                success: false,
                message: error.message || 'Error al buscar estudiante',
                error: process.env.NODE_ENV === 'development' ? error.stack : undefined
            });
        }
    }

    async obtenerTodosEstudiantes(req, res) {
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
                estado
            } = req.query;

            const resultado = await estudianteServicio.obtenerTodosEstudiantesBD({
                page: parseInt(page),
                limit: parseInt(limit),
                search,
                sortBy,
                sortOrder,
                exportAll: exportAll === 'true',
                genero,
                nacionalidad,
                estado
            });

            if (exportAll === 'true') {
                return res.status(200).json({
                    success: true,
                    message: 'Estudiantes exportados exitosamente',
                    data: resultado,
                    total: resultado.length
                });
            }

            const total = resultado.total || 0;
            const currentPage = parseInt(page);
            const currentLimit = parseInt(limit);
            const totalPages = Math.ceil(total / currentLimit);

            res.status(200).json({
                success: true,
                message: 'Estudiantes obtenidos exitosamente',
                data: resultado.data || resultado.students || [],
                pagination: {
                    total: total,
                    page: currentPage,
                    limit: currentLimit,
                    totalPages: totalPages,
                    hasNextPage: currentPage < totalPages,
                    hasPrevPage: currentPage > 1
                }
            });
        } catch (error) {
            console.error('Error en obtenerTodosEstudiantes:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener los estudiantes',
                error: error.message
            });
        }
    }

    async buscarEstudiantes(req, res) {
        try {
            const {
                q,
                page = 1,
                limit = 10,
                tipoBusqueda = 'general'
            } = req.body;

            if (!q || q.trim().length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Debe proporcionar un criterio de búsqueda',
                    data: []
                });
            }

            if (q.trim().length < 2) {
                return res.status(400).json({
                    success: false,
                    message: 'El criterio de búsqueda debe tener al menos 2 caracteres',
                    data: []
                });
            }

            const resultado = await estudianteServicio.buscarEstudiantes({
                criterio: q.trim(),
                page: parseInt(page),
                limit: parseInt(limit),
                tipoBusqueda
            });

            res.status(200).json(resultado);

        } catch (error) {
            console.error('Error en buscarEstudiantes:', error);

            const statusCode = error.message.includes('Debe proporcionar') ? 400 : 500;

            res.status(statusCode).json({
                success: false,
                message: error.message || 'Error al buscar estudiantes',
                data: [],
                error: process.env.NODE_ENV === 'development' ? error.stack : undefined
            });
        }
    }

    async buscarEstudiantesAvanzado(req, res) {
        try {
            const {
                nombreEstudiante,
                cedulaEstudiante,
                cedulaEscolar,
                nombreRepresentante,
                cedulaRepresentante,
                genero,
                limit = 50,
                page = 1
            } = req.query;

            const filtros = {};

            if (nombreEstudiante) filtros.nombreEstudiante = nombreEstudiante;
            if (cedulaEstudiante) filtros.cedulaEstudiante = cedulaEstudiante;
            if (cedulaEscolar) filtros.cedulaEscolar = cedulaEscolar;
            if (nombreRepresentante) filtros.nombreRepresentante = nombreRepresentante;
            if (cedulaRepresentante) filtros.cedulaRepresentante = cedulaRepresentante;
            if (genero) filtros.genero = genero;
            if (limit) filtros.limit = parseInt(limit);
            if (page) filtros.page = parseInt(page);

            const resultado = await estudianteServicio.buscarEstudiantesAvanzado(filtros);

            res.status(200).json(resultado);

        } catch (error) {
            console.error('Error en búsqueda avanzada de estudiantes:', error);

            res.status(error.message.includes('Debe proporcionar') ? 400 : 500).json({
                success: false,
                message: error.message || 'Error al buscar estudiantes',
                data: [],
                error: process.env.NODE_ENV === 'development' ? error.stack : undefined
            });
        }
    }

    async obtenerFotoEstudiante(req, res) {
        try {
            const { id } = req.params;

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de estudiante inválido'
                });
            }

            const estudiante = await estudianteServicio.obtenerEstudiantePorIdBD(id);
            console.log("buscar foto")
            if (!estudiante || !estudiante.estudiante.foto) {
                return res.status(404).json({
                    success: false,
                    message: 'Foto no encontrada'
                });
            }

            const fs = require('fs');
            const path = require('path');
            const upload = require('../../middleware/multerConfig');
            const fotoPath = path.join(upload.uploadPath, estudiante.estudiante.foto);

            if (!fs.existsSync(fotoPath)) {
                return res.status(404).json({
                    success: false,
                    message: 'Archivo de foto no encontrado'
                });
            }

            res.sendFile(fotoPath);
        } catch (error) {
            console.error('Error en obtenerFotoEstudiante:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener foto'
            });
        }
    }


    // En tu backend (estudiantes.controller.js)
    async obtenerEstadisticas(req, res) {
        try {
            const conexion = await pool.getConnection();

            // Consulta para estadísticas por género
            const [estadisticas] = await conexion.execute(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN genero = 'Masculino' THEN 1 ELSE 0 END) as masculinos,
        SUM(CASE WHEN genero = 'Femenino' THEN 1 ELSE 0 END) as femeninos,
        SUM(CASE WHEN genero NOT IN ('Masculino', 'Femenino') OR genero IS NULL THEN 1 ELSE 0 END) as otros
      FROM estudiantes
    `);

            // Estadísticas por nacionalidad (top 5)
            const [nacionalidades] = await conexion.execute(`
      SELECT nacionalidad, COUNT(*) as cantidad
      FROM estudiantes
      WHERE nacionalidad IS NOT NULL
      GROUP BY nacionalidad
      ORDER BY cantidad DESC
      LIMIT 5
    `);

            // Estadísticas por estado
            const [estados] = await conexion.execute(`
      SELECT direccion_estado as estado, COUNT(*) as cantidad
      FROM estudiantes
      WHERE direccion_estado IS NOT NULL AND direccion_estado != ''
      GROUP BY direccion_estado
      ORDER BY cantidad DESC
    `);

            // Edad promedio
            const [edad] = await conexion.execute(`
      SELECT 
        AVG(TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE())) as edad_promedio,
        MIN(TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE())) as edad_minima,
        MAX(TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE())) as edad_maxima
      FROM estudiantes
    `);

            conexion.release();

            res.status(200).json({
                success: true,
                data: {
                    generales: estadisticas[0],
                    nacionalidades,
                    estados,
                    edad: edad[0],
                    porcentajes: {
                        masculinos: estadisticas[0].total > 0 ?
                            ((estadisticas[0].masculinos / estadisticas[0].total) * 100).toFixed(1) : 0,
                        femeninos: estadisticas[0].total > 0 ?
                            ((estadisticas[0].femeninos / estadisticas[0].total) * 100).toFixed(1) : 0,
                        otros: estadisticas[0].total > 0 ?
                            ((estadisticas[0].otros / estadisticas[0].total) * 100).toFixed(1) : 0
                    }
                }
            });

        } catch (error) {
            console.error('Error obteniendo estadísticas:', error);
            res.status(500).json({
                success: false,
                message: 'Error al obtener estadísticas'
            });
        }
    }
}

module.exports = new estudiantesController();