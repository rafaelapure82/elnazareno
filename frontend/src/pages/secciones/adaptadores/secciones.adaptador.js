export const seccionesAdaptador = {
    // Adaptadores para Grados
    adaptarGrado: (data) => ({
        id: data.id,
        nombre: data.nombre,
        nivel: data.nivel,
        totalSecciones: data.total_secciones || 0,
        totalProfesores: data.total_profesores || 0,
        totalEstudiantes: data.total_estudiantes || 0,
        createdAt: data.created_at,
        updatedAt: data.updated_at
    }),

    adaptarGrados: (grados) => grados.map(grado => seccionesAdaptador.adaptarGrado(grado)),

    // Adaptadores para Secciones
    adaptarSeccion: (data) => ({
        id: data.id,
        nombre: data.nombre,
        gradoId: data.grado_id,
        gradoNombre: data.grado_nombre,
        gradoNivel: data.grado_nivel,
        capacidadMaxima: data.capacidad_maxima,
        capacidadActual: data.capacidad_actual || 0,
        totalProfesores: data.total_profesores || 0,
        totalEstudiantes: data.total_estudiantes || 0,
        createdAt: data.created_at,
        updatedAt: data.updated_at
    }),

    adaptarSecciones: (secciones) => secciones.map(seccion => seccionesAdaptador.adaptarSeccion(seccion)),

    // Adaptador para Sección Completa
    adaptarSeccionCompleta: (data) => ({
        ...seccionesAdaptador.adaptarSeccion(data),
        profesores: data.profesores?.map(prof => ({
            id: prof.id,
            profesorId: prof.profesor_id,
            nombreCompleto: prof.nombre + " " + prof.apellido,
            cedula: prof.cedula,
            email: prof.email,
            telefono: prof.telefono,
            esTutor: prof.es_tutor == 1 ? true : false,
            fechaAsignacion: prof.fecha_asignacion
        })) || [],
        estudiantes: data.estudiantes?.map(est => ({
            id: est.id,
            estudianteId: est.estudiante_id,
            nombreCompleto: est.nombre + " " + est.apellido,
            cedulaEscolar: est.cedula_escolar,
            fechaNacimiento: est.fecha_nacimiento,
            estado: est.estado,
            genero: est.genero,
            fechaInscripcion: est.fecha_inscripcion,
            representanteTelefono: est.representante_telefono,
            representanteNombreCompleto: est.representante_nombres + " " + est.representante_apellidos,
            representante: est.representante_nombre_completo
        })) || [],
        estadisticasEstudiantes: data.estadisticas_estudiantes || [],
        tutor: data.tutor ? {
            id: data.tutor.id,
            nombreCompleto: data.tutor.nombre_completo,
            cedula: data.tutor.cedula,
            email: data.tutor.email
        } : null
    }),

    // Adaptadores para Profesores
    adaptarProfesor: (data) => ({
        id: data.id,
        nombreCompleto: data.nombre_completo,
        cedula: data.cedula,
        telefono: data.telefono,
        email: data.email,
        especialidad: data.especialidad,
        totalSeccionesAsignadas: data.total_secciones_asignadas || 0,
        seccionesActuales: data.secciones_actuales || 'Ninguna'
    }),

    adaptarProfesores: (profesores) => profesores.map(prof => seccionesAdaptador.adaptarProfesor(prof)),

    // Adaptadores para Estudiantes
    adaptarEstudiante: (data) => ({
        id: data.id,
        nombreCompleto: data.nombre_completo,
        cedula: data.cedula,
        cedulaEscolar: data.cedula_escolar,
        fechaNacimiento: data.fecha_nacimiento,
        genero: data.genero,
        representanteNombreCompleto: data.representante_nombre_completo,
        representanteTelefono: data.representante_telefono,
        seccionActual: data.seccion_actual || 'Ninguna'
    }),

    adaptarEstudiantes: (estudiantes) => estudiantes.map(est => seccionesAdaptador.adaptarEstudiante(est)),

    // Adaptador para Historial Académico
    adaptarHistorialAcademico: (data) => data.map(item => ({
        añoEscolar: item.año_escolar,
        seccionNombre: item.seccion_nombre,
        gradoNombre: item.grado_nombre,
        nivel: item.nivel,
        estado: item.estado,
        fechaInscripcion: item.fecha_inscripcion,
        tutorNombre: item.tutor_nombre
    })),

    // Adaptador para Año Escolar
    adaptarAñoEscolar: (data) => ({
        añoEscolar: data.año_escolar
    })
};