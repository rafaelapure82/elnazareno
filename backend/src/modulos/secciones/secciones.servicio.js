// const Model = require("./secciones.model")


// class seccionesServicio {
//     // GRADOS
//     async crearGrado(data) {
//         try {
//             const gradoId = await Model.SeccionesModel.crearGrado(data);
//             return { id: gradoId, ...data };
//         } catch (error) {
//             throw new Error(`Error al crear grado: ${error.message}`);
//         }
//     }

//     async obtenerGrados() {
//         try {
//             const grados = await Model.SeccionesModel.obtenerGrados();
//             return grados;
//         } catch (error) {
//             throw new Error(`Error al obtener grados: ${error.message}`);
//         }
//     }

//     async obtenerGradoPorId(id) {
//         try {
//             const grado = await Model.SeccionesModel.obtenerGradoPorId(id);
//             if (!grado) {
//                 throw new Error('Grado no encontrado');
//             }
//             return { success: true, data: grado };
//         } catch (error) {
//             throw new Error(`Error al obtener grado: ${error.message}`);
//         }
//     }

//     async actualizarGrado(id, data) {
//         try {
//             const existe = await Model.SeccionesModel.verificarGradoExiste(id);
//             if (!existe) {
//                 throw new Error('Grado no encontrado');
//             }

//             const affectedRows = await Model.SeccionesModel.actualizarGrado(id, data);

//             if (affectedRows === 0) throw new Error('No se actualizó ningún registro');


//             const gradoActualizado = await Model.SeccionesModel.obtenerGradoPorId(id)
//             return gradoActualizado
//         } catch (error) {
//             throw new Error(`Error al actualizar grado: ${error.message}`);
//         }
//     }

//     async eliminarGrado(id) {
//         try {
//             const existe = await Model.SeccionesModel.verificarGradoExiste(id);
//             if (!existe) {
//                 throw new Error('Grado no encontrado');
//             }

//             const affectedRows = await Model.SeccionesModel.eliminarGrado(id);
//             return affectedRows;

//         } catch (error) {
//             throw new Error(`Error al eliminar grado: ${error.message}`);
//         }
//     }

//     //*Secciones

//     async crearSeccion(data) {
//         try {
//             // Verificar que el grado existe
//             const gradoExiste = await Model.SeccionesModel.verificarGradoExiste(data.grado_id);
//             if (!gradoExiste) {
//                 throw new Error('El grado especificado no existe');
//             }

//             const seccionId = await Model.SeccionesModel.crearSeccion(data);
//             return { id: seccionId, ...data };
//         } catch (error) {
//             if (error.message.includes('Duplicate')) {
//                 throw new Error('La sección que quieres crear ya existe ' + error.message);
//             }
//             throw new Error(`Error al crear sección: ${error.message}`);
//         }
//     }

//     async obtenerSeccionesPorGrado(gradoId) {
//         try {
//             const gradoExiste = await Model.SeccionesModel.verificarGradoExiste(gradoId);
//             if (!gradoExiste) {
//                 throw new Error('El grado especificado no existe');
//             }

//             const secciones = await Model.SeccionesModel.obtenerSeccionesPorGrado(gradoId);
//             return secciones
//         } catch (error) {
//             throw new Error(`Error al obtener secciones: ${error.message}`);
//         }
//     }

//     async obtenerSeccionCompleta(id) {
//         try {
//             const seccion = await Model.SeccionesModel.obtenerSeccionPorId(id);
//             if (!seccion) {
//                 throw new Error('Sección no encontrada');
//             }

//             const profesores = await Model.SeccionesModel.obtenerProfesoresPorSeccion(id);
//             const estudiantes = await Model.SeccionesModel.obtenerEstudiantesPorSeccion(id);
//             const capacidad = await Model.SeccionesModel.verificarCapacidadSeccion(id);

//             return {
//                 data: {
//                     ...seccion,
//                     profesores,
//                     estudiantes,
//                     capacidad_actual: capacidad?.estudiantes_actuales || 0,
//                     capacidad_maxima: capacidad?.capacidad_maxima || 0
//                 }
//             };
//         } catch (error) {
//             throw new Error(`Error al obtener sección: ${error.message}`);
//         }
//     }

//     async actualizarSeccion(id, data) {
//         try {
//             const existe = await Model.SeccionesModel.verificarSeccionExiste(id);
//             if (!existe) {
//                 throw new Error('Sección no encontrada');
//             }

//             const affectedRows = await Model.SeccionesModel.actualizarSeccion(id, data);
//             if (affectedRows === 0) throw new Error('No se actualizó ningún registro');
//             const seccionActualizada = await Model.SeccionesModel.obtenerSeccionPorId(id)
//             return seccionActualizada;
//             return affectedRows
//         } catch (error) {
//             throw new Error(`Error al actualizar sección: ${error.message}`);
//         }
//     }

//     async eliminarSeccion(id) {
//         try {
//             const existe = await Model.SeccionesModel.verificarSeccionExiste(id);
//             if (!existe) {
//                 throw new Error('Sección no encontrada');
//             }

//             const affectedRows = await Model.SeccionesModel.eliminarSeccion(id);
//             return affectedRows
//         } catch (error) {
//             throw new Error(`Error al eliminar sección: ${error.message}`);
//         }
//     }

//     //*Asignar profesor

//     async asignarProfesorASeccion(data) {
//         try {

//             // Verificar que la sección existe
//             const seccionExiste = await Model.SeccionesModel.verificarSeccionExiste(data.seccion_id);
//             if (!seccionExiste) {
//                 throw new Error('La sección especificada no existe');
//             }

//             // Verificar que el usuario es profesor
//             const profesorExiste = await Model.SeccionesModel.verificarDocenteExiste(data.profesor_id, 'docente');
//             if (!profesorExiste) {
//                 throw new Error('El usuario especificado no es un docente válido');
//             }

//             // Verificar si ya está asignado
//             const yaAsignado = await Model.SeccionesModel.verificarProfesorEnSeccion(
//                 data.profesor_id,
//                 data.seccion_id
//             );
//             if (yaAsignado) {
//                 throw new Error('Este profesor ya está asignado a esta sección');
//             }

//             // Si es tutor, verificar que no haya otro tutor
//             if (data.es_tutor) {
//                 const profesores = await Model.SeccionesModel.obtenerProfesoresPorSeccion(data.seccion_id);
//                 const tieneTutor = profesores.some(p => p.es_tutor);
//                 if (tieneTutor) {
//                     throw new Error('Esta sección ya tiene un tutor asignado');
//                 }
//             }

//             if (data.es_tutor == "true") {
//                 data.es_tutor = true
//             }

//             const asignacionId = await Model.SeccionesModel.asignarProfesorASeccion({
//                 ...data,
//                 fecha_asignacion: new Date().toISOString().split('T')[0]
//             });

//             return { id: asignacionId, ...data }

//         } catch (error) {
//             throw new Error(`Error al asignar profesor: ${error.message}`);
//         }
//     }
//     async eliminarProfesorDeSeccion(asignacionId) {
//         try {
//             const affectedRows = await Model.SeccionesModel.eliminarProfesorDeSeccion(asignacionId);
//             if (affectedRows === 0) {
//                 throw new Error('Asignación no encontrada');
//             }

//             return {
//                 success: true,
//                 message: 'Profesor removido de la sección correctamente'
//             };
//         } catch (error) {
//             throw new Error(`Error al eliminar profesor: ${error.message}`);
//         }
//     }

//     //*Asignar Estudiante

//     async asignarEstudianteASeccion(data) {
//         try {
//             // Verificar que la sección existe
//             const seccionExiste = await Model.SeccionesModel.verificarSeccionExiste(data.seccion_id);
//             if (!seccionExiste) {
//                 throw new Error('La sección especificada no existe');
//             }


//             const estudianteExiste = await Model.SeccionesModel.verificarEstudianteExite(data.estudiante_id);
//             if (!estudianteExiste) {
//                 throw new Error('El estudiante no existe');
//             }

//             // Verificar capacidad de la sección
//             const capacidad = await Model.SeccionesModel.verificarCapacidadSeccion(data.seccion_id);
//             if (capacidad && capacidad.estudiantes_actuales >= capacidad.capacidad_maxima) {
//                 throw new Error('La sección ha alcanzado su capacidad máxima');
//             }

//             // Verificar si ya está asignado en el mismo año escolar
//             const yaAsignado = await Model.SeccionesModel.verificarEstudianteEnSeccion(
//                 data.estudiante_id,
//                 data.seccion_id,
//                 data.año_escolar
//             );
//             if (yaAsignado) {
//                 throw new Error('Este estudiante ya está asignado a esta sección en el año escolar especificado');
//             }

//             const asignacionId = await Model.SeccionesModel.asignarEstudianteASeccion({
//                 ...data,
//                 estado: 'activo',
//                 fecha_inscripcion: new Date().toISOString().split('T')[0]
//             });


//             return {
//                 success: true,
//                 message: 'Estudiante asignado correctamente',
//                 data: { id: asignacionId, ...data }
//             };
//         } catch (error) {
//             throw new Error(`Error al asignar estudiante: ${error.message}`);
//         }
//     }

//     async actualizarEstadoEstudiante(asignacionId, estado) {
//         try {
//             const affectedRows = await Model.SeccionesModel.actualizarEstadoEstudiante(asignacionId, estado);
//             if (affectedRows === 0) {
//                 throw new Error('Asignación no encontrada');
//             }

//             return {
//                 success: true,
//                 message: `Estado del estudiante actualizado a "${estado}" correctamente`
//             };
//         } catch (error) {
//             throw new Error(`Error al actualizar estado: ${error.message}`);
//         }
//     }

//     async eliminarEstudianteDeSeccion(asignacionId) {
//         try {
//             const affectedRows = await Model.SeccionesModel.eliminarEstudianteDeSeccion(asignacionId);
//             if (affectedRows === 0) {
//                 throw new Error('Asignación no encontrada');
//             }

//             return {
//                 success: true,
//                 message: 'Estudiante removido de la sección correctamente'
//             };
//         } catch (error) {
//             throw new Error(`Error al eliminar estudiante: ${error.message}`);
//         }
//     }

//     //* PROFESORES EN SECCIONES

//     async asignarProfesorASeccion(profesor_id, seccion_id, es_tutor = false, fecha_asignacion = null) {
//         try {
//             // Verificar que la sección existe
//             const seccion = await Model.SeccionesModel.obtenerSeccionPorId(seccion_id);
//             if (!seccion) {
//                 throw new Error('Sección no encontrada');
//             }

//             // Verificar que el profesor es un docente activo
//             const esDocenteActivo = await Model.ProfesorSeccionModel.verificarDocenteActivo(profesor_id);
//             if (!esDocenteActivo) {
//                 throw new Error('El personal seleccionado no es un docente activo');
//             }

//             // Verificar si ya es tutor (solo puede haber uno)
//             if (es_tutor) {
//                 const tutorActual = await Model.ProfesorSeccionModel.obtenerTutor(seccion_id);
//                 if (tutorActual && tutorActual.profesor_id !== parseInt(profesor_id)) {
//                     throw new Error('Ya existe un tutor asignado a esta sección');
//                 }
//             }

//             const result = await Model.ProfesorSeccionModel.asignarProfesor(
//                 profesor_id,
//                 seccion_id,
//                 es_tutor ? 1 : 0,
//                 fecha_asignacion
//             );

//             return {
//                 success: true,
//                 data: {
//                     id: result.insertId,
//                     profesor_id,
//                     seccion_id,
//                     es_tutor,
//                     fecha_asignacion: fecha_asignacion || new Date().toISOString().split('T')[0]
//                 }
//             };
//         } catch (error) {
//             throw new Error(`Error al asignar profesor: ${error.message}`);
//         }
//     }

//     async obtenerProfesoresDeSeccion(seccion_id) {
//         try {
//             const profesores = await Model.ProfesorSeccionModel.obtenerPorSeccion(seccion_id);
//             return {
//                 success: true,
//                 data: profesores
//             };
//         } catch (error) {
//             throw new Error(`Error al obtener profesores: ${error.message}`);
//         }
//     }

//     async removerProfesorDeSeccion(seccion_id, profesor_id) {
//         try {
//             const result = await Model.ProfesorSeccionModel.removerProfesor(seccion_id, profesor_id);

//             if (result.affectedRows === 0) {
//                 throw new Error('Profesor no encontrado en esta sección');
//             }

//             return {
//                 success: true,
//                 data: {
//                     affectedRows: result.affectedRows
//                 }
//             };
//         } catch (error) {
//             throw new Error(`Error al remover profesor: ${error.message}`);
//         }
//     }

//     async actualizarTutor(seccion_id, profesor_id, es_tutor) {
//         try {
//             // Si se va a asignar como tutor, verificar que no haya otro
//             if (es_tutor) {
//                 const tutorActual = await Model.ProfesorSeccionModel.obtenerTutor(seccion_id);
//                 if (tutorActual && tutorActual.profesor_id !== parseInt(profesor_id)) {
//                     // Remover tutor actual
//                     await Model.ProfesorSeccionModel.actualizarTutor(seccion_id, tutorActual.profesor_id, 0);
//                 }
//             }

//             const result = await Model.ProfesorSeccionModel.actualizarTutor(seccion_id, profesor_id, es_tutor ? 1 : 0);

//             if (result.affectedRows === 0) {
//                 throw new Error('Profesor no encontrado en esta sección');
//             }

//             return {
//                 success: true,
//                 data: {
//                     profesor_id,
//                     seccion_id,
//                     es_tutor
//                 }
//             };
//         } catch (error) {
//             throw new Error(`Error al actualizar tutor: ${error.message}`);
//         }
//     }

//     async buscarProfesoresDisponibles(seccion_id, search = '') {
//         try {
//             const profesores = await Model.ProfesorSeccionModel.buscarDisponibles(seccion_id, search);
//             return {
//                 success: true,
//                 data: profesores
//             };
//         } catch (error) {
//             throw new Error(`Error al buscar profesores: ${error.message}`);
//         }
//     }

//     // ESTUDIANTES EN SECCIONES

//     async inscribirEstudianteASeccion(estudiante_id, seccion_id, año_escolar, estado = 'activo', fecha_inscripcion = null) {
//         try {
//             // Verificar que la sección existe y tiene capacidad
//             const seccion = await Model.SeccionesModel.obtenerSeccionPorId(seccion_id);
//             if (!seccion) {
//                 throw new Error('Sección no encontrada');
//             }

//             // Verificar que el estudiante existe
//             const estudianteExiste = await Model.EstudianteSeccionModel.verificarEstudianteActivo(estudiante_id);
//             if (!estudianteExiste) {
//                 throw new Error('Estudiante no encontrado');
//             }

//             // Verificar capacidad
//             if (seccion.capacidad_maxima) {
//                 const estudiantesActuales = await Model.EstudianteSeccionModel.obtenerPorSeccion(seccion_id);
//                 const estudiantesActivos = estudiantesActuales.filter(e => e.estado === 'activo');

//                 if (estudiantesActivos.length >= seccion.capacidad_maxima) {
//                     throw new Error('La sección ha alcanzado su capacidad máxima');
//                 }
//             }

//             // Verificar que el estudiante no esté ya inscrito en otro grado para el mismo año
//             const inscripcionExistente = await Model.EstudianteSeccionModel.verificarInscripcion(estudiante_id, año_escolar);
//             if (inscripcionExistente && inscripcionExistente.seccion_id !== parseInt(seccion_id)) {
//                 throw new Error(`El estudiante ya está inscrito en ${inscripcionExistente.seccion_nombre} (${inscripcionExistente.grado_nombre}) para el año escolar ${año_escolar}`);
//             }

//             const result = await Model.EstudianteSeccionModel.inscribirEstudiante(
//                 estudiante_id,
//                 seccion_id,
//                 año_escolar,
//                 estado,
//                 fecha_inscripcion
//             );

//             return {
//                 success: true,
//                 data: {
//                     id: result.insertId,
//                     estudiante_id,
//                     seccion_id,
//                     año_escolar,
//                     estado,
//                     fecha_inscripcion: fecha_inscripcion || new Date().toISOString().split('T')[0]
//                 }
//             };
//         } catch (error) {
//             throw new Error(`Error al inscribir estudiante: ${error.message}`);
//         }
//     }

//     async obtenerEstudiantesDeSeccion(seccion_id) {
//         try {
//             const estudiantes = await Model.EstudianteSeccionModel.obtenerPorSeccion(seccion_id);
//             const conteoEstados = await Model.EstudianteSeccionModel.obtenerConteoPorEstado(seccion_id);

//             return {
//                 success: true,
//                 data: {
//                     estudiantes,
//                     estadisticas: conteoEstados
//                 }
//             };
//         } catch (error) {
//             throw new Error(`Error al obtener estudiantes: ${error.message}`);
//         }
//     }

//     async removerEstudianteDeSeccion(seccion_id, estudiante_id) {
//         try {
//             const result = await Model.EstudianteSeccionModel.removerEstudiante(seccion_id, estudiante_id);

//             if (result.affectedRows === 0) {
//                 throw new Error('Estudiante no encontrado en esta sección');
//             }

//             return {
//                 success: true,
//                 data: {
//                     affectedRows: result.affectedRows
//                 }
//             };
//         } catch (error) {
//             throw new Error(`Error al remover estudiante: ${error.message}`);
//         }
//     }

//     async actualizarEstadoEstudiante(seccion_id, estudiante_id, estado) {
//         try {
//             if (!['activo', 'inactivo', 'graduado'].includes(estado)) {
//                 throw new Error('Estado inválido. Use: activo, inactivo o graduado');
//             }

//             const result = await Model.EstudianteSeccionModel.actualizarEstado(seccion_id, estudiante_id, estado);

//             if (result.affectedRows === 0) {
//                 throw new Error('Estudiante no encontrado en esta sección');
//             }

//             return {
//                 success: true,
//                 data: {
//                     estudiante_id,
//                     seccion_id,
//                     estado
//                 }
//             };
//         } catch (error) {
//             throw new Error(`Error al actualizar estado: ${error.message}`);
//         }
//     }

//     async buscarEstudiantesDisponibles(seccion_id, año_escolar, search = '') {
//         try {
//             // Si no se especifica año escolar, usar el actual
//             if (!año_escolar) {
//                 año_escolar = Model.EstudianteSeccionModel.obtenerAñoEscolarActual();
//             }

//             const estudiantes = await Model.EstudianteSeccionModel.buscarDisponibles(seccion_id, año_escolar, search);
//             return {
//                 success: true,
//                 data: estudiantes,
//                 año_escolar_utilizado: año_escolar
//             };
//         } catch (error) {
//             throw new Error(`Error al buscar estudiantes: ${error.message}`);
//         }
//     }

//     async obtenerHistorialEstudiante(estudiante_id) {
//         try {
//             const historial = await Model.EstudianteSeccionModel.obtenerHistorialEstudiante(estudiante_id);
//             return {
//                 success: true,
//                 data: historial
//             };
//         } catch (error) {
//             throw new Error(`Error al obtener historial: ${error.message}`);
//         }
//     }

//     // OBTENER INFORMACIÓN COMPLETA DE SECCIÓN
//     async obtenerSeccionCompleta(seccion_id) {
//         try {
//             const seccion = await Model.SeccionesModel.obtenerPorId(seccion_id);
//             if (!seccion) {
//                 throw new Error('Sección no encontrada');
//             }

//             const profesores = await Model.ProfesorSeccionModel.obtenerPorSeccion(seccion_id);
//             const estudiantes = await Model.EstudianteSeccionModel.obtenerPorSeccion(seccion_id);
//             const conteoEstados = await Model.EstudianteSeccionModel.obtenerConteoPorEstado(seccion_id);
//             const grado = await Model.SeccionesModel.obtenerGradoPorId(seccion.grado_id);
//             const tutor = await Model.ProfesorSeccionModel.obtenerTutor(seccion_id);

//             return {
//                 success: true,
//                 data: {
//                     ...seccion,
//                     grado_nombre: grado.nombre,
//                     grado_nivel: grado.nivel,
//                     profesores,
//                     estudiantes,
//                     tutor: tutor ? {
//                         id: tutor.profesor_id,
//                         nombre_completo: `${tutor.nombres} ${tutor.apellidos}`,
//                         cedula: tutor.cedula,
//                         correo: tutor.correo,
//                         telefono: tutor.telefono
//                     } : null,
//                     estadisticas_estudiantes: conteoEstados,
//                     total_estudiantes: estudiantes.length,
//                     total_profesores: profesores.length,
//                     capacidad_actual: estudiantes.filter(e => e.estado === 'activo').length,
//                     capacidad_disponible: seccion.capacidad_maxima - estudiantes.filter(e => e.estado === 'activo').length
//                 }
//             };
//         } catch (error) {
//             throw new Error(`Error al obtener sección completa: ${error.message}`);
//         }
//     }
// }


// module.exports = new seccionesServicio();


const Model = require("./secciones.model");

class SeccionesServicio {
    constructor() {
        this.SeccionesModel = Model.SeccionesModel;
        this.ProfesorSeccionModel = Model.ProfesorSeccionModel;
        this.EstudianteSeccionModel = Model.EstudianteSeccionModel;
    }

    // GRADOS - Métodos originales
    async crearGrado(data) {
        try {
            const gradoId = await this.SeccionesModel.crearGrado(data);
            return { id: gradoId, ...data };
        } catch (error) {
            throw new Error(`Error al crear grado: ${error.message}`);
        }
    }

    async obtenerGrados() {
        try {
            const grados = await this.SeccionesModel.obtenerGrados();
            return grados;
        } catch (error) {
            throw new Error(`Error al obtener grados: ${error.message}`);
        }
    }

    async obtenerGradoPorId(id) {
        try {
            const grado = await this.SeccionesModel.obtenerGradoPorId(id);
            if (!grado) {
                throw new Error('Grado no encontrado');
            }
            return { success: true, data: grado };
        } catch (error) {
            throw new Error(`Error al obtener grado: ${error.message}`);
        }
    }

    async actualizarGrado(id, data) {
        try {
            const existe = await this.SeccionesModel.verificarGradoExiste(id);
            if (!existe) {
                throw new Error('Grado no encontrado');
            }

            const affectedRows = await this.SeccionesModel.actualizarGrado(id, data);
            if (affectedRows === 0) throw new Error('No se actualizó ningún registro');

            const gradoActualizado = await this.SeccionesModel.obtenerGradoPorId(id);
            return gradoActualizado;
        } catch (error) {
            throw new Error(`Error al actualizar grado: ${error.message}`);
        }
    }

    async eliminarGrado(id) {
        try {
            const existe = await this.SeccionesModel.verificarGradoExiste(id);
            if (!existe) {
                throw new Error('Grado no encontrado');
            }

            const affectedRows = await this.SeccionesModel.eliminarGrado(id);
            return affectedRows;
        } catch (error) {
            throw new Error(`Error al eliminar grado: ${error.message}`);
        }
    }

    // SECCIONES - Métodos originales
    async crearSeccion(data) {
        try {
            const gradoExiste = await this.SeccionesModel.verificarGradoExiste(data.grado_id);
            if (!gradoExiste) {
                throw new Error('El grado especificado no existe');
            }

            const seccionId = await this.SeccionesModel.crearSeccion(data);
            return { id: seccionId, ...data };
        } catch (error) {
            if (error.message.includes('Duplicate')) {
                throw new Error('La sección que quieres crear ya existe ' + error.message);
            }
            throw new Error(`Error al crear sección: ${error.message}`);
        }
    }

    async obtenerSeccionesPorGrado(gradoId) {
        try {
            const gradoExiste = await this.SeccionesModel.verificarGradoExiste(gradoId);
            if (!gradoExiste) {
                throw new Error('El grado especificado no existe');
            }

            const secciones = await this.SeccionesModel.obtenerSeccionesPorGrado(gradoId);
            return secciones;
        } catch (error) {
            throw new Error(`Error al obtener secciones: ${error.message}`);
        }
    }

    // async obtenerSeccionCompleta(id) {
    //     try {
    //         const seccion = await this.SeccionesModel.obtenerSeccionPorId(id);
    //         if (!seccion) {
    //             throw new Error('Sección no encontrada');
    //         }
    //         const grado = await this.SeccionesModel.obtenerGradoPorId(seccion.grado_id)
    //         const profesores = await this.SeccionesModel.obtenerProfesoresPorSeccion(id);
    //         const estudiantes = await this.SeccionesModel.obtenerEstudiantesPorSeccion(id);
    //         const capacidad = await this.SeccionesModel.verificarCapacidadSeccion(id);
    //         return {
    //             data: {
    //                 ...seccion,
    //                 grado_nombre: grado.nombre,
    //                 grado_nivel: grado.nivel,
    //                 profesores,
    //                 estudiantes,
    //                 capacidad_actual: capacidad?.estudiantes_actuales || 0,
    //                 capacidad_maxima: capacidad?.capacidad_maxima || 0
    //             }
    //         };
    //     } catch (error) {
    //         throw new Error(`Error al obtener sección: ${error.message}`);
    //     }
    // }

    async obtenerSeccionCompleta(id) {
        try {
            const seccion = await this.SeccionesModel.obtenerSeccionPorId(id);
            if (!seccion) {
                throw new Error('Sección no encontrada');
            }

            const grado = await this.SeccionesModel.obtenerGradoPorId(seccion.grado_id);
            const profesores = await this.SeccionesModel.obtenerProfesoresPorSeccion(id);
            const estudiantes = await this.SeccionesModel.obtenerEstudiantesPorSeccion(id);
            const capacidad = await this.SeccionesModel.verificarCapacidadSeccion(id);
            const estadisticasEstudiantes = await this.SeccionesModel.obtenerEstadisticasEstudiantes(id);
            const tutor = await this.SeccionesModel.obtenerTutorSeccion(id);

            // Calcular totales
            const totalProfesores = profesores.length;
            const totalEstudiantes = estudiantes.length;

            return {
                data: {
                    ...seccion,
                    grado_nombre: grado.nombre,
                    grado_nivel: grado.nivel,
                    profesores,
                    estudiantes,
                    capacidad_actual: capacidad?.estudiantes_actuales || 0,
                    capacidad_maxima: capacidad?.capacidad_maxima || 0,
                    total_profesores: totalProfesores,
                    total_estudiantes: totalEstudiantes,
                    estadisticas_estudiantes: estadisticasEstudiantes,
                    tutor: tutor || null
                }
            };
        } catch (error) {
            throw new Error(`Error al obtener sección: ${error.message}`);
        }
    }


    async actualizarSeccion(id, data) {
        try {
            const existe = await this.SeccionesModel.verificarSeccionExiste(id);
            if (!existe) {
                throw new Error('Sección no encontrada');
            }

            const affectedRows = await this.SeccionesModel.actualizarSeccion(id, data);
            if (affectedRows === 0) throw new Error('No se actualizó ningún registro');

            const seccionActualizada = await this.SeccionesModel.obtenerSeccionPorId(id);
            return seccionActualizada;
        } catch (error) {
            throw new Error(`Error al actualizar sección: ${error.message}`);
        }
    }

    async eliminarSeccion(id) {
        try {
            const existe = await this.SeccionesModel.verificarSeccionExiste(id);
            if (!existe) {
                throw new Error('Sección no encontrada');
            }

            const affectedRows = await this.SeccionesModel.eliminarSeccion(id);
            return affectedRows;
        } catch (error) {
            throw new Error(`Error al eliminar sección: ${error.message}`);
        }
    }

    // Método antiguo para asignar profesor (mantener para compatibilidad)
    async asignarProfesorASeccionOld(data) {
        try {
            const seccionExiste = await this.SeccionesModel.verificarSeccionExiste(data.seccion_id);
            if (!seccionExiste) {
                throw new Error('La sección especificada no existe');
            }

            const profesorExiste = await this.SeccionesModel.verificarDocenteExiste(data.profesor_id, 'docente');
            if (!profesorExiste) {
                throw new Error('El usuario especificado no es un docente válido');
            }

            const yaAsignado = await this.SeccionesModel.verificarProfesorEnSeccion(
                data.profesor_id,
                data.seccion_id
            );
            if (yaAsignado) {
                throw new Error('Este profesor ya está asignado a esta sección');
            }

            if (data.es_tutor) {
                const profesores = await this.SeccionesModel.obtenerProfesoresPorSeccion(data.seccion_id);
                const tieneTutor = profesores.some(p => p.es_tutor);
                if (tieneTutor) {
                    throw new Error('Esta sección ya tiene un tutor asignado');
                }
            }

            if (data.es_tutor == "true") {
                data.es_tutor = true;
            }

            const asignacionId = await this.SeccionesModel.asignarProfesorASeccion({
                ...data,
                fecha_asignacion: new Date().toISOString().split('T')[0]
            });

            return { id: asignacionId, ...data };
        } catch (error) {
            throw new Error(`Error al asignar profesor: ${error.message}`);
        }
    }

    // PROFESORES EN SECCIONES - Nuevos métodos
    async asignarProfesorASeccion(profesor_id, seccion_id, es_tutor = false, fecha_asignacion) {
        try {
            // Verificar que la sección existe
            const seccion = await this.SeccionesModel.obtenerSeccionPorId(seccion_id);
            if (!seccion) {
                throw new Error('Sección no encontrada');
            }

            // Verificar que el profesor es un docente activo
            const esDocenteActivo = await this.ProfesorSeccionModel.verificarDocenteActivo(profesor_id);
            if (!esDocenteActivo) {
                throw new Error('El personal seleccionado no es un docente activo');
            }

            // Verificar si ya es tutor (solo puede haber uno)
            if (es_tutor) {
                const tutorActual = await this.ProfesorSeccionModel.obtenerTutor(seccion_id);
                if (tutorActual && tutorActual.profesor_id !== parseInt(profesor_id)) {
                    throw new Error('Ya existe un tutor asignado a esta sección');
                }
            }

            const result = await this.ProfesorSeccionModel.asignarProfesor(
                profesor_id,
                seccion_id,
                es_tutor ? 1 : 0,
                fecha_asignacion
            );

            return {
                success: true,
                data: {
                    id: result.insertId,
                    profesor_id,
                    seccion_id,
                    es_tutor,
                    fecha_asignacion: fecha_asignacion || new Date().toISOString().split('T')[0]
                }
            };
        } catch (error) {
            throw new Error(`Error al asignar profesor: ${error.message}`);
        }
    }

    async obtenerProfesoresDeSeccion(seccion_id) {
        try {
            const profesores = await this.ProfesorSeccionModel.obtenerPorSeccion(seccion_id);
            return {
                success: true,
                data: profesores
            };
        } catch (error) {
            throw new Error(`Error al obtener profesores: ${error.message}`);
        }
    }

    async removerProfesorDeSeccion(seccion_id, profesor_id) {
        try {
            const result = await this.ProfesorSeccionModel.removerProfesor(seccion_id, profesor_id);
            if (result.affectedRows === 0) {
                throw new Error('Profesor no encontrado en esta sección');
            }

            return {
                success: true,
                data: {
                    affectedRows: result.affectedRows
                }
            };
        } catch (error) {
            throw new Error(`Error al remover profesor: ${error.message}`);
        }
    }

    async actualizarTutor(seccion_id, profesor_id, es_tutor) {
        try {
            // Si se va a asignar como tutor, verificar que no haya otro
            if (es_tutor) {
                const tutorActual = await this.ProfesorSeccionModel.obtenerTutor(seccion_id);
                if (tutorActual && tutorActual.profesor_id !== parseInt(profesor_id)) {
                    // Remover tutor actual
                    await this.ProfesorSeccionModel.actualizarTutor(seccion_id, tutorActual.profesor_id, 0);
                }
            }

            const result = await this.ProfesorSeccionModel.actualizarTutor(seccion_id, profesor_id, es_tutor ? 1 : 0);

            if (result.affectedRows === 0) {
                throw new Error('Profesor no encontrado en esta sección');
            }

            return {
                success: true,
                data: {
                    profesor_id,
                    seccion_id,
                    es_tutor
                }
            };
        } catch (error) {
            throw new Error(`Error al actualizar tutor: ${error.message}`);
        }
    }

    async buscarProfesoresDisponibles(seccion_id, search = '') {
        try {
            const profesores = await this.ProfesorSeccionModel.buscarDisponibles(seccion_id, search);
            return {
                success: true,
                data: profesores
            };
        } catch (error) {
            throw new Error(`Error al buscar profesores: ${error.message}`);
        }
    }

    async obtenerSeccionesPorProfesor(profesor_id) {
        try {
            const secciones = await this.ProfesorSeccionModel.obtenerSeccionesPorProfesor(profesor_id);
            return {
                success: true,
                data: secciones
            };
        } catch (error) {
            throw new Error(`Error al obtener secciones por profesor: ${error.message}`);
        }
    }

    // ESTUDIANTES EN SECCIONES
    async inscribirEstudianteASeccion(estudiante_id, seccion_id, año_escolar, estado = 'activo', fecha_inscripcion = null) {
        try {
            // Verificar que la sección existe y tiene capacidad
            const seccion = await this.SeccionesModel.obtenerSeccionPorId(seccion_id);
            if (!seccion) {
                throw new Error('Sección no encontrada');
            }

            // Verificar que el estudiante existe
            const estudianteExiste = await this.EstudianteSeccionModel.verificarEstudianteActivo(estudiante_id);
            if (!estudianteExiste) {
                throw new Error('Estudiante no encontrado');
            }

            // Verificar capacidad
            if (seccion.capacidad_maxima) {
                const estudiantesActuales = await this.EstudianteSeccionModel.obtenerPorSeccion(seccion_id);
                const estudiantesActivos = estudiantesActuales.filter(e => e.estado === 'activo');

                if (estudiantesActivos.length >= seccion.capacidad_maxima) {
                    throw new Error('La sección ha alcanzado su capacidad máxima');
                }
            }

            // Verificar que el estudiante no esté ya inscrito en otro grado para el mismo año
            const inscripcionExistente = await this.EstudianteSeccionModel.verificarInscripcion(estudiante_id, año_escolar);
            if (inscripcionExistente && inscripcionExistente.seccion_id !== parseInt(seccion_id)) {
                throw new Error(`El estudiante ya está inscrito en ${inscripcionExistente.seccion_nombre} (${inscripcionExistente.grado_nombre}) para el año escolar ${año_escolar}`);
            }

            const result = await this.EstudianteSeccionModel.inscribirEstudiante(
                estudiante_id,
                seccion_id,
                año_escolar,
                estado,
                fecha_inscripcion
            );

            return {
                success: true,
                data: {
                    id: result.insertId,
                    estudiante_id,
                    seccion_id,
                    año_escolar,
                    estado,
                    fecha_inscripcion: fecha_inscripcion || new Date().toISOString().split('T')[0]
                }
            };
        } catch (error) {
            throw new Error(`Error al inscribir estudiante: ${error.message}`);
        }
    }

    async obtenerEstudiantesDeSeccion(seccion_id) {
        try {
            const estudiantes = await this.EstudianteSeccionModel.obtenerPorSeccion(seccion_id);
            const conteoEstados = await this.EstudianteSeccionModel.obtenerConteoPorEstado(seccion_id);

            return {
                success: true,
                data: {
                    estudiantes,
                    estadisticas: conteoEstados
                }
            };
        } catch (error) {
            throw new Error(`Error al obtener estudiantes: ${error.message}`);
        }
    }

    async removerEstudianteDeSeccion(seccion_id, estudiante_id) {
        try {
            const result = await this.EstudianteSeccionModel.removerEstudiante(seccion_id, estudiante_id);

            if (result.affectedRows === 0) {
                throw new Error('Estudiante no encontrado en esta sección');
            }

            return {
                success: true,
                data: {
                    affectedRows: result.affectedRows
                }
            };
        } catch (error) {
            throw new Error(`Error al remover estudiante: ${error.message}`);
        }
    }

    async actualizarEstadoEstudiante(seccion_id, estudiante_id, estado) {
        try {
            if (!['activo', 'inactivo', 'graduado'].includes(estado)) {
                throw new Error('Estado inválido. Use: activo, inactivo o graduado');
            }

            const result = await this.EstudianteSeccionModel.actualizarEstado(seccion_id, estudiante_id, estado);

            if (result.affectedRows === 0) {
                throw new Error('Estudiante no encontrado en esta sección');
            }

            return {
                success: true,
                data: {
                    estudiante_id,
                    seccion_id,
                    estado
                }
            };
        } catch (error) {
            throw new Error(`Error al actualizar estado: ${error.message}`);
        }
    }

    async buscarEstudiantesDisponibles(seccion_id, año_escolar, search = '') {
        try {
            // Si no se especifica año escolar, usar el actual
            if (!año_escolar) {
                año_escolar = this.EstudianteSeccionModel.obtenerAñoEscolarActual();
            }

            const estudiantes = await this.EstudianteSeccionModel.buscarDisponibles(seccion_id, año_escolar, search);
            return {
                success: true,
                data: estudiantes,
                año_escolar_utilizado: año_escolar
            };
        } catch (error) {
            throw new Error(`Error al buscar estudiantes: ${error.message}`);
        }
    }

    async obtenerHistorialEstudiante(estudiante_id) {
        try {
            const historial = await this.EstudianteSeccionModel.obtenerHistorialEstudiante(estudiante_id);
            return {
                success: true,
                data: historial
            };
        } catch (error) {
            throw new Error(`Error al obtener historial: ${error.message}`);
        }
    }

    async obtenerSeccionActualEstudiante(estudiante_id, año_escolar = null) {
        try {
            const seccion = await this.EstudianteSeccionModel.obtenerSeccionActual(estudiante_id, año_escolar);
            return {
                success: true,
                data: seccion
            };
        } catch (error) {
            throw new Error(`Error al obtener sección actual: ${error.message}`);
        }
    }

    // Método antiguo para asignar estudiante (mantener para compatibilidad)
    async asignarEstudianteASeccionOld(data) {
        try {
            const seccionExiste = await this.SeccionesModel.verificarSeccionExiste(data.seccion_id);
            if (!seccionExiste) {
                throw new Error('La sección especificada no existe');
            }

            const estudianteExiste = await this.SeccionesModel.verificarEstudianteExite(data.estudiante_id);
            if (!estudianteExiste) {
                throw new Error('El estudiante no existe');
            }

            const capacidad = await this.SeccionesModel.verificarCapacidadSeccion(data.seccion_id);
            if (capacidad && capacidad.estudiantes_actuales >= capacidad.capacidad_maxima) {
                throw new Error('La sección ha alcanzado su capacidad máxima');
            }

            const yaAsignado = await this.SeccionesModel.verificarEstudianteEnSeccion(
                data.estudiante_id,
                data.seccion_id,
                data.año_escolar
            );
            if (yaAsignado) {
                throw new Error('Este estudiante ya está asignado a esta sección en el año escolar especificado');
            }

            const asignacionId = await this.SeccionesModel.asignarEstudianteASeccion({
                ...data,
                estado: 'activo',
                fecha_inscripcion: new Date().toISOString().split('T')[0]
            });

            return {
                success: true,
                message: 'Estudiante asignado correctamente',
                data: { id: asignacionId, ...data }
            };
        } catch (error) {
            throw new Error(`Error al asignar estudiante: ${error.message}`);
        }
    }
}

module.exports = new SeccionesServicio();