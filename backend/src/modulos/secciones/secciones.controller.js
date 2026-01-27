// const seccionesServicio = require("./secciones.servicio")

// class seccionesController {
//     // GRADOS
//     async crearGrado(req, res) {
//         try {
//             const { nombre, nivel } = req.body;

//             if (!nombre || !nivel) {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'Nombre y nivel son requeridos'
//                 });
//             }
//             const resultado = await seccionesServicio.crearGrado({ nombre, nivel });
//             res.status(201).json({
//                 success: true,
//                 message: "Grado creado exitosamente",
//                 data: resultado
//             });
//         } catch (error) {

//             if (error.message.includes('Duplicate')) {
//                 return res.status(400).json({
//                     success: false,
//                     message: error.message
//                 });
//             }

//             res.status(500).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }

//     async obtenerGrados(req, res) {
//         try {
//             const resultado = await seccionesServicio.obtenerGrados();
//             res.status(200).json({
//                 success: true,
//                 message: "Grados obtenidos exitosamente",
//                 data: resultado
//             });
//         } catch (error) {
//             res.status(500).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }

//     async obtenerGradoPorId(req, res) {
//         try {
//             const { id } = req.params;
//             console.log(id)
//             console.log("aaaaaaaaaaaaaaaa")
//             const resultado = await seccionesServicio.obtenerGradoPorId(id);
//             res.status(200).json({
//                 success: true,
//                 message: resultado ? "Grado obtenido exitosamente" : "No se encontró el grado",
//                 data: resultado
//             });
//         } catch (error) {
//             res.status(404).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }

//     async actualizarGrado(req, res) {
//         try {
//             const { id } = req.params;
//             const { nombre, nivel } = req.body;

//             const resultado = await seccionesServicio.actualizarGrado(id, { nombre, nivel });
//             res.status(200).json({
//                 success: true,
//                 message: "Grado actualizado exitosamente",
//                 data: resultado
//             });
//         } catch (error) {
//             res.status(400).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }

//     async eliminarGrado(req, res) {
//         try {
//             const { id } = req.params;
//             const resultado = await seccionesServicio.eliminarGrado(id);
//             res.status(200).json({
//                 success: true,
//                 message: "Grado eliminado exitosamente",
//                 resultado
//             });
//         } catch (error) {
//             res.status(400).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }

//     //* Secciones

//     async crearSeccion(req, res) {
//         try {
//             const { grado_id, nombre, capacidad_maxima } = req.body;

//             if (!grado_id || !nombre) {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'Grado ID y nombre son requeridos'
//                 });
//             }

//             const resultado = await seccionesServicio.crearSeccion({
//                 grado_id,
//                 nombre,
//                 capacidad_maxima: capacidad_maxima || 40
//             });

//             res.status(201).json({
//                 success: true,
//                 message: "Sección creada exitosamente",
//                 data: resultado
//             })
//         } catch (error) {

//             res.status(400).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }

//     async obtenerSeccionesPorGrado(req, res) {
//         try {
//             const { gradoId } = req.params;
//             const resultado = await seccionesServicio.obtenerSeccionesPorGrado(gradoId);

//             res.status(200).json({
//                 success: true,
//                 message: "Secciones obtenidas exitosamente",
//                 data: resultado
//             });
//         } catch (error) {
//             res.status(404).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }

//     async obtenerSeccionCompleta(req, res) {
//         try {
//             const { id } = req.params;
//             const resultado = await seccionesServicio.obtenerSeccionCompleta(id);
//             res.status(200).json({
//                 success: true,
//                 message: "Sección obtenida exitosamente",
//                 data: resultado
//             })
//         } catch (error) {
//             res.status(404).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }

//     async actualizarSeccion(req, res) {
//         try {
//             const { id } = req.params;
//             const { nombre, capacidad_maxima } = req.body;

//             const resultado = await seccionesServicio.actualizarSeccion(id, {
//                 nombre,
//                 capacidad_maxima
//             });

//             res.status(200).json({
//                 success: true,
//                 message: "Sección actualizada exitosamente",
//                 data: resultado
//             });
//         } catch (error) {
//             res.status(400).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }

//     async eliminarSeccion(req, res) {
//         try {
//             const { id } = req.params;
//             const resultado = await seccionesServicio.eliminarSeccion(id);
//             res.status(200).json(
//                 {
//                     success: true,
//                     message: "Sección eliminada exitosamente",
//                     data: resultado
//                 });
//         } catch (error) {
//             res.status(400).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }

//     //*Asignar profesor
//     // async asignarProfesorASeccion(req, res) {
//     //     try {
//     //         const { seccion_id, profesor_id, es_tutor } = req.body;

//     //         if (!seccion_id || !profesor_id) {
//     //             return res.status(400).json({
//     //                 success: false,
//     //                 message: 'Sección ID y Profesor ID son requeridos'
//     //             });
//     //         }

//     //         const resultado = await seccionesServicio.asignarProfesorASeccion({
//     //             seccion_id,
//     //             profesor_id,
//     //             es_tutor: es_tutor || false
//     //         });

//     //         res.status(201).json({
//     //             success: true,
//     //             message: "Profesor asignado a la sección exitosamente",
//     //             data: resultado
//     //         });
//     //     } catch (error) {
//     //         res.status(400).json({
//     //             success: false,
//     //             message: error.message
//     //         });
//     //     }
//     // }

//     // async eliminarProfesorDeSeccion(req, res) {
//     //     try {
//     //         const { asignacionId } = req.params;
//     //         const resultado = await seccionesServicio.eliminarProfesorDeSeccion(asignacionId);
//     //         res.status(200).json(resultado);
//     //     } catch (error) {
//     //         res.status(400).json({
//     //             success: false,
//     //             message: error.message
//     //         });
//     //     }
//     // }

//     //* Asignar Estudiante

//     // async asignarEstudianteASeccion(req, res) {
//     //     try {
//     //         const { seccion_id, estudiante_id, año_escolar } = req.body;

//     //         if (!seccion_id || !estudiante_id || !año_escolar) {
//     //             return res.status(400).json({
//     //                 success: false,
//     //                 message: 'Sección ID, Estudiante ID y Año Escolar son requeridos'
//     //             });
//     //         }

//     //         const resultado = await seccionesServicio.asignarEstudianteASeccion({
//     //             seccion_id,
//     //             estudiante_id,
//     //             año_escolar
//     //         });

//     //         res.status(201).json(resultado);
//     //     } catch (error) {
//     //         res.status(400).json({
//     //             success: false,
//     //             message: error.message
//     //         });
//     //     }
//     // }

//     // async actualizarEstadoEstudiante(req, res) {
//     //     try {
//     //         const { asignacionId } = req.params;
//     //         const { estado } = req.body;

//     //         if (!['activo', 'inactivo', 'graduado'].includes(estado)) {
//     //             return res.status(400).json({
//     //                 success: false,
//     //                 message: 'Estado inválido. Use: activo, inactivo o graduado'
//     //             });
//     //         }

//     //         const resultado = await seccionesServicio.actualizarEstadoEstudiante(asignacionId, estado);
//     //         res.status(200).json(resultado);
//     //     } catch (error) {
//     //         res.status(400).json({
//     //             success: false,
//     //             message: error.message
//     //         });
//     //     }
//     // }

//     // async eliminarEstudianteDeSeccion(req, res) {
//     //     try {
//     //         const { asignacionId } = req.params;
//     //         const resultado = await seccionesServicio.eliminarEstudianteDeSeccion(asignacionId);
//     //         res.status(200).json(resultado);
//     //     } catch (error) {
//     //         res.status(400).json({
//     //             success: false,
//     //             message: error.message
//     //         });
//     //     }
//     // }

//     // PROFESORES EN SECCIONES

//     async asignarProfesorASeccion(req, res) {
//         try {
//             const { seccionId, profesorId } = req.params;
//             const { es_tutor = false, fecha_asignacion = null } = req.body;

//             const result = await seccionesServicio.asignarProfesorASeccion(
//                 profesorId,
//                 seccionId,
//                 es_tutor,
//                 fecha_asignacion
//             );

//             res.json({
//                 success: true,
//                 message: es_tutor ?
//                     "Profesor asignado como tutor exitosamente" :
//                     "Profesor asignado a la sección exitosamente",
//                 data: result.data
//             });
//         } catch (error) {
//             res.status(500).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }

//     async obtenerProfesoresDeSeccion(req, res) {
//         try {
//             const { seccionId } = req.params;
//             const result = await seccionesServicio.obtenerProfesoresDeSeccion(seccionId);

//             res.json({
//                 success: true,
//                 message: "Profesores obtenidos exitosamente",
//                 data: result.data
//             });
//         } catch (error) {
//             res.status(500).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }

//     async removerProfesorDeSeccion(req, res) {
//         try {
//             const { seccionId, profesorId } = req.params;
//             const result = await seccionesServicio.removerProfesorDeSeccion(seccionId, profesorId);

//             res.json({
//                 success: true,
//                 message: "Profesor removido de la sección exitosamente",
//                 data: result.data
//             });
//         } catch (error) {
//             const status = error.message.includes('no encontrado') ? 404 : 500;
//             res.status(status).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }

//     async actualizarTutor(req, res) {
//         try {
//             const { seccionId, profesorId } = req.params;
//             const { es_tutor } = req.body;

//             if (typeof es_tutor !== 'boolean') {
//                 return res.status(400).json({
//                     success: false,
//                     message: "El campo es_tutor debe ser un valor booleano"
//                 });
//             }

//             const result = await seccionesServicio.actualizarTutor(seccionId, profesorId, es_tutor);

//             res.json({
//                 success: true,
//                 message: es_tutor ?
//                     "Profesor asignado como tutor exitosamente" :
//                     "Profesor actualizado exitosamente",
//                 data: result.data
//             });
//         } catch (error) {
//             res.status(500).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }

//     async buscarProfesoresDisponibles(req, res) {
//         try {
//             const { seccionId } = req.params;
//             const { search = '' } = req.query;

//             const result = await seccionesServicio.buscarProfesoresDisponibles(seccionId, search);

//             res.json({
//                 success: true,
//                 message: "Profesores disponibles obtenidos exitosamente",
//                 data: result.data
//             });
//         } catch (error) {
//             res.status(500).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }

//     async obtenerSeccionesPorProfesor(req, res) {
//         try {
//             const { profesorId } = req.params;
//             const secciones = await seccionesServicio.obtenerSeccionesPorProfesor(profesorId);

//             res.json({
//                 success: true,
//                 message: "Secciones del profesor obtenidas exitosamente",
//                 data: secciones
//             });
//         } catch (error) {
//             res.status(500).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }


//     // ESTUDIANTES EN SECCIONES

//     async inscribirEstudianteASeccion(req, res) {
//         try {
//             const { seccionId, estudianteId } = req.params;
//             const { año_escolar, estado = 'activo', fecha_inscripcion = null } = req.body;

//             if (!año_escolar) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "El campo año_escolar es requerido"
//                 });
//             }

//             // Validar formato de año (YYYY)
//             if (!/^\d{4}$/.test(año_escolar)) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "Formato de año escolar inválido. Use YYYY"
//                 });
//             }

//             const result = await seccionesServicio.inscribirEstudianteASeccion(
//                 estudianteId,
//                 seccionId,
//                 año_escolar,
//                 estado,
//                 fecha_inscripcion
//             );

//             res.json({
//                 success: true,
//                 message: "Estudiante inscrito a la sección exitosamente",
//                 data: result.data
//             });
//         } catch (error) {
//             res.status(500).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }

//     async obtenerEstudiantesDeSeccion(req, res) {
//         try {
//             const { seccionId } = req.params;
//             const result = await seccionesServicio.obtenerEstudiantesDeSeccion(seccionId);

//             res.json({
//                 success: true,
//                 message: "Estudiantes obtenidos exitosamente",
//                 data: result.data
//             });
//         } catch (error) {
//             res.status(500).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }

//     async removerEstudianteDeSeccion(req, res) {
//         try {
//             const { seccionId, estudianteId } = req.params;
//             const result = await seccionesServicio.removerEstudianteDeSeccion(seccionId, estudianteId);

//             res.json({
//                 success: true,
//                 message: "Estudiante removido de la sección exitosamente",
//                 data: result.data
//             });
//         } catch (error) {
//             const status = error.message.includes('no encontrado') ? 404 : 500;
//             res.status(status).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }

//     async actualizarEstadoEstudiante(req, res) {
//         try {
//             const { seccionId, estudianteId } = req.params;
//             const { estado } = req.body;

//             if (!estado || !['activo', 'inactivo', 'graduado'].includes(estado)) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "Estado inválido. Use: activo, inactivo o graduado"
//                 });
//             }

//             const result = await seccionesServicio.actualizarEstadoEstudiante(seccionId, estudianteId, estado);

//             res.json({
//                 success: true,
//                 message: `Estado del estudiante actualizado a ${estado} exitosamente`,
//                 data: result.data
//             });
//         } catch (error) {
//             res.status(500).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }

//     async buscarEstudiantesDisponibles(req, res) {
//         try {
//             const { seccionId } = req.params;
//             const { año_escolar, search = '' } = req.query;

//             if (!año_escolar) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "El parámetro año_escolar es requerido"
//                 });
//             }

//             const result = await seccionesServicio.buscarEstudiantesDisponibles(seccionId, año_escolar, search);

//             res.json({
//                 success: true,
//                 message: "Estudiantes disponibles obtenidos exitosamente",
//                 data: result.data
//             });
//         } catch (error) {
//             res.status(500).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }

//     async obtenerHistorialEstudiante(req, res) {
//         try {
//             const { estudianteId } = req.params;
//             const result = await seccionesServicio.obtenerHistorialEstudiante(estudianteId);

//             res.json({
//                 success: true,
//                 message: "Historial académico obtenido exitosamente",
//                 data: result.data
//             });
//         } catch (error) {
//             res.status(500).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }

//     // async obtenerSeccionCompleta(req, res) {
//     //     try {
//     //         const { id } = req.params;
//     //         const result = await seccionesServicio.obtenerSeccionCompleta(id);

//     //         res.json({
//     //             success: true,
//     //             message: "Sección obtenida exitosamente",
//     //             data: result.data
//     //         });
//     //     } catch (error) {
//     //         res.status(500).json({
//     //             success: false,
//     //             message: error.message
//     //         });
//     //     }
//     // }

// }

// module.exports = new seccionesController();

const seccionesServicio = require("./secciones.servicio");

class seccionesController {
    // GRADOS
    async crearGrado(req, res) {
        try {
            const { nombre, nivel } = req.body;

            if (!nombre || !nivel) {
                return res.status(400).json({
                    success: false,
                    message: 'Nombre y nivel son requeridos'
                });
            }
            const resultado = await seccionesServicio.crearGrado({ nombre, nivel });
            res.status(201).json({
                success: true,
                message: "Grado creado exitosamente",
                data: resultado
            });
        } catch (error) {
            if (error.message.includes('Duplicate')) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }

            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async obtenerGrados(req, res) {
        try {
            const resultado = await seccionesServicio.obtenerGrados();
            res.status(200).json({
                success: true,
                message: "Grados obtenidos exitosamente",
                data: resultado
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async obtenerGradoPorId(req, res) {
        try {
            const { id } = req.params;
            const resultado = await seccionesServicio.obtenerGradoPorId(id);
            res.status(200).json({
                success: true,
                message: resultado ? "Grado obtenido exitosamente" : "No se encontró el grado",
                data: resultado
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    async actualizarGrado(req, res) {
        try {
            const { id } = req.params;
            const { nombre, nivel } = req.body;

            const resultado = await seccionesServicio.actualizarGrado(id, { nombre, nivel });
            res.status(200).json({
                success: true,
                message: "Grado actualizado exitosamente",
                data: resultado
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async eliminarGrado(req, res) {
        try {
            const { id } = req.params;
            const resultado = await seccionesServicio.eliminarGrado(id);
            res.status(200).json({
                success: true,
                message: "Grado eliminado exitosamente",
                resultado
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    //* Secciones

    async crearSeccion(req, res) {
        try {
            const { grado_id, nombre, capacidad_maxima } = req.body;

            if (!grado_id || !nombre) {
                return res.status(400).json({
                    success: false,
                    message: 'Grado ID y nombre son requeridos'
                });
            }

            const resultado = await seccionesServicio.crearSeccion({
                grado_id,
                nombre,
                capacidad_maxima: capacidad_maxima || 40
            });

            res.status(201).json({
                success: true,
                message: "Sección creada exitosamente",
                data: resultado
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async obtenerSeccionesPorGrado(req, res) {
        try {
            const { gradoId } = req.params;
            const resultado = await seccionesServicio.obtenerSeccionesPorGrado(gradoId);

            res.status(200).json({
                success: true,
                message: "Secciones obtenidas exitosamente",
                data: resultado
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    async obtenerSeccionCompleta(req, res) {
        try {
            const { id } = req.params;
            const resultado = await seccionesServicio.obtenerSeccionCompleta(id);
            res.status(200).json({
                success: true,
                message: "Sección obtenida exitosamente",
                data: resultado
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    async actualizarSeccion(req, res) {
        try {
            const { id } = req.params;
            const { nombre, capacidad_maxima } = req.body;

            const resultado = await seccionesServicio.actualizarSeccion(id, {
                nombre,
                capacidad_maxima
            });

            res.status(200).json({
                success: true,
                message: "Sección actualizada exitosamente",
                data: resultado
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async eliminarSeccion(req, res) {
        try {
            const { id } = req.params;
            const resultado = await seccionesServicio.eliminarSeccion(id);
            res.status(200).json({
                success: true,
                message: "Sección eliminada exitosamente",
                data: resultado
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // PROFESORES EN SECCIONES

    async asignarProfesorASeccion(req, res) {
        try {
            const { seccionId, profesorId } = req.params;
            const { es_tutor = false, fecha_asignacion = null } = req.body;

            const result = await seccionesServicio.asignarProfesorASeccion(
                profesorId,
                seccionId,
                es_tutor,
                fecha_asignacion
            );

            res.json({
                success: true,
                message: es_tutor ?
                    "Profesor asignado como tutor exitosamente" :
                    "Profesor asignado a la sección exitosamente",
                data: result.data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async obtenerProfesoresDeSeccion(req, res) {
        try {
            const { seccionId } = req.params;
            const result = await seccionesServicio.obtenerProfesoresDeSeccion(seccionId);

            res.json({
                success: true,
                message: "Profesores obtenidos exitosamente",
                data: result.data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async removerProfesorDeSeccion(req, res) {
        try {
            const { seccionId, profesorId } = req.params;
            const result = await seccionesServicio.removerProfesorDeSeccion(seccionId, profesorId);
            res.json({
                success: true,
                message: "Profesor removido de la sección exitosamente",
                data: result.data
            });
        } catch (error) {
            const status = error.message.includes('no encontrado') ? 404 : 500;
            res.status(status).json({
                success: false,
                message: error.message
            });
        }
    }

    async actualizarTutor(req, res) {
        try {
            const { seccionId, profesorId } = req.params;
            const { es_tutor } = req.body;
            if (typeof es_tutor !== 'boolean') {
                return res.status(400).json({
                    success: false,
                    message: "El campo es_tutor debe ser un valor booleano"
                });
            }

            const result = await seccionesServicio.actualizarTutor(seccionId, profesorId, es_tutor);

            res.json({
                success: true,
                message: es_tutor ?
                    "Profesor asignado como tutor exitosamente" :
                    "Profesor actualizado exitosamente",
                data: result.data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async buscarProfesoresDisponibles(req, res) {
        try {
            const { seccionId } = req.params;
            const { search = '' } = req.query;
            const result = await seccionesServicio.buscarProfesoresDisponibles(seccionId, search);

            res.json({
                success: true,
                message: "Profesores disponibles obtenidos exitosamente",
                data: result.data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async obtenerSeccionesPorProfesor(req, res) {
        try {
            const { profesorId } = req.params;
            const result = await seccionesServicio.obtenerSeccionesPorProfesor(profesorId);

            res.json({
                success: true,
                message: "Secciones del profesor obtenidas exitosamente",
                data: result.data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // ESTUDIANTES EN SECCIONES

    async inscribirEstudianteASeccion(req, res) {
        try {
            const { seccionId, estudianteId } = req.params;
            const { año_escolar, estado = 'activo', fecha_inscripcion = null } = req.body;

            if (!año_escolar) {
                return res.status(400).json({
                    success: false,
                    message: "El campo año_escolar es requerido"
                });
            }

            // Validar formato de año (YYYY)
            if (!/^\d{4}$/.test(año_escolar)) {
                return res.status(400).json({
                    success: false,
                    message: "Formato de año escolar inválido. Use YYYY"
                });
            }

            const result = await seccionesServicio.inscribirEstudianteASeccion(
                estudianteId,
                seccionId,
                año_escolar,
                estado,
                fecha_inscripcion
            );

            res.json({
                success: true,
                message: "Estudiante inscrito a la sección exitosamente",
                data: result.data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async obtenerEstudiantesDeSeccion(req, res) {
        try {
            const { seccionId } = req.params;
            const result = await seccionesServicio.obtenerEstudiantesDeSeccion(seccionId);

            res.json({
                success: true,
                message: "Estudiantes obtenidos exitosamente",
                data: result.data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async removerEstudianteDeSeccion(req, res) {
        try {
            const { seccionId, estudianteId } = req.params;
            const result = await seccionesServicio.removerEstudianteDeSeccion(seccionId, estudianteId);

            res.json({
                success: true,
                message: "Estudiante removido de la sección exitosamente",
                data: result.data
            });
        } catch (error) {
            const status = error.message.includes('no encontrado') ? 404 : 500;
            res.status(status).json({
                success: false,
                message: error.message
            });
        }
    }

    async actualizarEstadoEstudiante(req, res) {
        try {
            const { seccionId, estudianteId } = req.params;
            const { estado } = req.body;

            if (!estado || !['activo', 'inactivo', 'graduado'].includes(estado)) {
                return res.status(400).json({
                    success: false,
                    message: "Estado inválido. Use: activo, inactivo o graduado"
                });
            }

            const result = await seccionesServicio.actualizarEstadoEstudiante(seccionId, estudianteId, estado);

            res.json({
                success: true,
                message: `Estado del estudiante actualizado a ${estado} exitosamente`,
                data: result.data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async buscarEstudiantesDisponibles(req, res) {
        try {
            const { seccionId } = req.params;
            const { año_escolar, search = '' } = req.query;

            if (!año_escolar) {
                return res.status(400).json({
                    success: false,
                    message: "El parámetro año_escolar es requerido"
                });
            }

            const result = await seccionesServicio.buscarEstudiantesDisponibles(seccionId, año_escolar, search);

            res.json({
                success: true,
                message: "Estudiantes disponibles obtenidos exitosamente",
                data: result.data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async obtenerHistorialEstudiante(req, res) {
        try {
            const { estudianteId } = req.params;
            const result = await seccionesServicio.obtenerHistorialEstudiante(estudianteId);

            res.json({
                success: true,
                message: "Historial académico obtenido exitosamente",
                data: result.data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Obtener sección actual del estudiante
    async obtenerSeccionActualEstudiante(req, res) {
        try {
            const { estudianteId } = req.params;
            const { año_escolar } = req.query;

            const result = await seccionesServicio.obtenerSeccionActualEstudiante(estudianteId, año_escolar);

            res.json({
                success: true,
                message: result.data ? "Sección actual obtenida exitosamente" : "Estudiante no inscrito en ninguna sección",
                data: result.data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new seccionesController();