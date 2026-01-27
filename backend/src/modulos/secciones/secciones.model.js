// const { pool } = require("../../config/baseDatos");

// class seccionesModel {
//     // GRADOS
//     async crearGrado(data) {
//         const query = 'INSERT INTO grados SET ?';
//         const [resultado] = await pool.query(query, data);
//         return resultado.insertId;
//     }

//     async obtenerGrados() {
//         const query = `
//             SELECT g.*, 
//                    COUNT(DISTINCT s.id) as total_secciones,
//                    COUNT(DISTINCT ps.profesor_id) as total_profesores,
//                    COUNT(DISTINCT es.estudiante_id) as total_estudiantes
//             FROM grados g
//             LEFT JOIN secciones s ON g.id = s.grado_id
//             LEFT JOIN profesor_seccion ps ON s.id = ps.seccion_id
//             LEFT JOIN estudiante_seccion es ON s.id = es.seccion_id AND es.estado = 'activo'
//             GROUP BY g.id
//             ORDER BY g.nivel, g.nombre`;
//         const [rows] = await pool.query(query);
//         return rows;
//     }

//     async obtenerGradoPorId(id) {
//         const query = 'SELECT * FROM grados WHERE id = ?';
//         const [rows] = await pool.query(query, [id]);
//         return rows[0];
//     }

//     async actualizarGrado(id, data) {
//         const query = 'UPDATE grados SET ? WHERE id = ?';
//         const [result] = await pool.query(query, [data, id]);
//         return result.affectedRows;
//     }

//     async eliminarGrado(id) {
//         const query = 'DELETE FROM grados WHERE id = ?';
//         const [resultado] = await pool.query(query, [id]);
//         return resultado.affectedRows;
//     }

//     //*Secciones

//     async crearSeccion(data) {
//         const query = 'INSERT INTO secciones SET ?';
//         const [resultado] = await pool.query(query, data);
//         return resultado.insertId;
//     }

//     async obtenerSeccionesPorGrado(gradoId) {
//         const query = `
//             SELECT s.*, 
//                    g.nombre as grado_nombre,
//                    COUNT(DISTINCT ps.profesor_id) as total_profesores,
//                    COUNT(DISTINCT es.estudiante_id) as total_estudiantes
//             FROM secciones s
//             JOIN grados g ON s.grado_id = g.id
//             LEFT JOIN profesor_seccion ps ON s.id = ps.seccion_id
//             LEFT JOIN estudiante_seccion es ON s.id = es.seccion_id AND es.estado = 'activo'
//             WHERE s.grado_id = ?
//             GROUP BY s.id
//             ORDER BY s.nombre`;
//         const [rows] = await pool.query(query, [gradoId]);
//         return rows;
//     }

//     async obtenerSeccionPorId(id) {
//         const query = 'SELECT * FROM secciones WHERE id = ?';
//         const [rows] = await pool.query(query, [id]);
//         return rows[0];
//     }

//     async actualizarSeccion(id, data) {
//         const query = 'UPDATE secciones SET ? WHERE id = ?';
//         const [resultado] = await pool.query(query, [data, id]);
//         return resultado.affectedRows;
//     }

//     async eliminarSeccion(id) {
//         const query = 'DELETE FROM secciones WHERE id = ?';
//         const [resultado] = await pool.query(query, [id]);
//         return resultado.affectedRows;
//     }

//     //*Asignar profesor

//     async asignarProfesorASeccion(data) {
//         const query = 'INSERT INTO profesor_seccion SET ?';
//         const [resultado] = await pool.query(query, data);
//         return resultado.insertId;
//     }

//     async obtenerProfesoresPorSeccion(seccionId) {
//         const query = `
//                 SELECT ps.*,
//                 p.id as profesor_id,
//                 p.primer_nombre as nombre,
//                 p.primer_apellido as apellido,
//                 p.correo as email,
//                 p.telefono
//     FROM profesor_seccion ps
//     JOIN personal p ON ps.profesor_id = p.id
//     WHERE ps.seccion_id = ?
//                 AND p.tipo = 'docente'
//     ORDER BY ps.es_tutor DESC, p.primer_apellido`
//             ;
//         const [rows] = await pool.query(query, [seccionId]);
//         return rows;
//     }

//     async verificarProfesorEnSeccion(profesorId, seccionId) {
//         const query = 'SELECT id FROM profesor_seccion WHERE profesor_id = ? AND seccion_id = ?';
//         const [rows] = await pool.query(query, [profesorId, seccionId]);
//         return rows.length > 0;
//     }

//     async eliminarProfesorDeSeccion(asignacionId) {
//         const query = 'DELETE FROM profesor_seccion WHERE id = ?';
//         const [resultado] = await pool.query(query, [asignacionId]);
//         return resultado.affectedRows;
//     }


//     //* Verificar
//     async verificarGradoExiste(id) {
//         const query = 'SELECT id FROM grados WHERE id = ?';
//         const [rows] = await pool.query(query, [id]);
//         return rows.length > 0;
//     }

//     async verificarSeccionExiste(id) {
//         const query = 'SELECT id FROM secciones WHERE id = ?';
//         const [rows] = await pool.query(query, [id]);
//         return rows.length > 0;
//     }

//     async verificarDocenteExiste(id, tipo) {
//         const query = 'SELECT id FROM personal WHERE id = ? AND tipo = ?';
//         const [rows] = await pool.query(query, [id, tipo]);
//         return rows.length > 0;
//     }

//     async verificarEstudianteExite(id) {
//         const query = 'SELECT id FROM estudiantes WHERE id = ?';
//         const [rows] = await pool.query(query, [id]);
//         return rows.length > 0;
//     }

//     async verificarCapacidadSeccion(seccionId) {
//         const query = `
//             SELECT s.capacidad_maxima, 
//                    COUNT(es.id) as estudiantes_actuales
//             FROM secciones s
//             LEFT JOIN estudiante_seccion es ON s.id = es.seccion_id AND es.estado = 'activo'
//             WHERE s.id = ?
//             GROUP BY s.id`;
//         const [rows] = await pool.query(query, [seccionId]);
//         return rows[0] || null;
//     }


//     //*Asignar Estudiante
//     async asignarEstudianteASeccion(data) {
//         const query = 'INSERT INTO estudiante_seccion SET ?';
//         const [resultado] = await pool.query(query, data);
//         return resultado.insertId;
//     }

//     async obtenerEstudiantesPorSeccion(seccionId) {
//         const query = `
//                     SELECT es.*, 
//             e.id as estudiante_id,
//             e.nombres as nombre, 
//             e.apellidos as apellido,
//             e.cedula_escolar,
//             e.fecha_nacimiento
//         FROM estudiante_seccion es
//         JOIN estudiantes e ON es.estudiante_id = e.id
//         WHERE es.seccion_id = ? AND es.estado = 'activo'
//         ORDER BY e.apellidos, e.nombres`;
//         const [rows] = await pool.query(query, [seccionId]);
//         return rows;
//     }

//     async verificarEstudianteEnSeccion(estudianteId, seccionId, añoEscolar) {
//         const query = 'SELECT id FROM estudiante_seccion WHERE estudiante_id = ? AND seccion_id = ? AND año_escolar = ?';
//         const [rows] = await pool.query(query, [estudianteId, seccionId, añoEscolar]);
//         return rows.length > 0;
//     }

//     async actualizarEstadoEstudiante(asignacionId, estado) {
//         const query = 'UPDATE estudiante_seccion SET estado = ? WHERE id = ?';
//         const [resultado] = await pool.query(query, [estado, asignacionId]);
//         return resultado.affectedRows;
//     }

//     async eliminarEstudianteDeSeccion(asignacionId) {
//         const query = 'DELETE FROM estudiante_seccion WHERE id = ?';
//         const [resultado] = await pool.query(query, [asignacionId]);
//         return resultado.affectedRows;
//     }

// }

// class profesorSeccionModel {
//     // Asignar profesor a sección
//     async asignarProfesor(profesor_id, seccion_id, es_tutor = 0, fecha_asignacion = null) {
//         const query = `
//             INSERT INTO profesor_seccion (profesor_id, seccion_id, es_tutor, fecha_asignacion) 
//             VALUES (?, ?, ?, ?)
//             ON DUPLICATE KEY UPDATE es_tutor = VALUES(es_tutor), fecha_asignacion = VALUES(fecha_asignacion)
//         `;
//         const [result] = await pool.execute(query, [profesor_id, seccion_id, es_tutor, fecha_asignacion]);
//         return result;
//     }

//     // Obtener profesores por sección
//     async obtenerPorSeccion(seccion_id) {
//         const query = `
//             SELECT 
//                 ps.id,
//                 ps.profesor_id,
//                 ps.seccion_id,
//                 ps.es_tutor,
//                 ps.fecha_asignacion,
//                 ps.created_at,
//                 p.id as personal_id,
//                 CONCAT(p.primer_nombre, ' ', COALESCE(p.segundo_nombre, '')) as nombres,
//                 CONCAT(p.primer_apellido, ' ', COALESCE(p.segundo_apellido, '')) as apellidos,
//                 p.cedula,
//                 p.telefono,
//                 p.correo,
//                 p.cargo_voucher,
//                 p.dependencia,
//                 p.titulos_profesionales,
//                 p.tipo_titulo,
//                 p.especialidad,
//                 p.estado
//             FROM profesor_seccion ps
//             JOIN personal p ON ps.profesor_id = p.id
//             WHERE ps.seccion_id = ? 
//             AND p.tipo = 'docente'
//             AND (p.estado IS NULL OR p.estado = 'activo')
//             ORDER BY ps.es_tutor DESC, p.primer_apellido, p.primer_nombre
//         `;
//         const [rows] = await pool.execute(query, [seccion_id]);

//         // Formatear nombres completos
//         return rows.map(row => ({
//             ...row,
//             nombre_completo: `${row.nombres.trim()} ${row.apellidos.trim()}`.replace(/\s+/g, ' ')
//         }));
//     }

//     // Remover profesor de sección
//     async removerProfesor(seccion_id, profesor_id) {
//         const query = 'DELETE FROM profesor_seccion WHERE seccion_id = ? AND profesor_id = ?';
//         const [result] = await pool.execute(query, [seccion_id, profesor_id]);
//         return result;
//     }

//     // Actualizar si es tutor
//     async actualizarTutor(seccion_id, profesor_id, es_tutor) {
//         const query = 'UPDATE profesor_seccion SET es_tutor = ? WHERE seccion_id = ? AND profesor_id = ?';
//         const [result] = await pool.execute(query, [es_tutor, seccion_id, profesor_id]);
//         return result;
//     }

//     // Verificar si profesor ya está asignado
//     async verificarAsignacion(profesor_id, seccion_id) {
//         const query = 'SELECT id FROM profesor_seccion WHERE profesor_id = ? AND seccion_id = ?';
//         const [rows] = await pool.execute(query, [profesor_id, seccion_id]);
//         return rows.length > 0;
//     }

//     // Obtener tutor de sección
//     async obtenerTutor(seccion_id) {
//         const query = `
//             SELECT 
//                 ps.profesor_id,
//                 p.id as personal_id,
//                 CONCAT(p.primer_nombre, ' ', COALESCE(p.segundo_nombre, '')) as nombres,
//                 CONCAT(p.primer_apellido, ' ', COALESCE(p.segundo_apellido, '')) as apellidos,
//                 p.cedula,
//                 p.correo,
//                 p.telefono
//             FROM profesor_seccion ps
//             JOIN personal p ON ps.profesor_id = p.id
//             WHERE ps.seccion_id = ? 
//             AND ps.es_tutor = 1 
//             AND p.tipo = 'docente'
//             AND (p.estado IS NULL OR p.estado = 'activo')
//             LIMIT 1
//         `;
//         const [rows] = await pool.execute(query, [seccion_id]);
//         return rows[0] || null;
//     }

//     // Buscar profesores disponibles para asignar
//     async buscarDisponibles(seccion_id, search = '') {
//         const query = `
//             SELECT 
//                 p.id,
//                 CONCAT(p.primer_nombre, ' ', COALESCE(p.segundo_nombre, '')) as nombres,
//                 CONCAT(p.primer_apellido, ' ', COALESCE(p.segundo_apellido, '')) as apellidos,
//                 p.cedula,
//                 p.telefono,
//                 p.correo,
//                 p.fecha_nacimiento,
//                 p.sexo,
//                 p.cargo_voucher,
//                 p.dependencia,
//                 p.carga_horaria,
//                 p.fecha_ingreso_mppe,
//                 p.titulos_profesionales,
//                 p.tipo_titulo,
//                 p.especialidad,
//                 p.talla_franela,
//                 p.talla_pantalon,
//                 p.talla_zapato,
//                 COUNT(DISTINCT ps2.seccion_id) as total_secciones_asignadas,
//                 GROUP_CONCAT(DISTINCT s.nombre SEPARATOR ', ') as secciones_actuales
//             FROM personal p
//             LEFT JOIN profesor_seccion ps2 ON p.id = ps2.profesor_id
//             LEFT JOIN secciones s ON ps2.seccion_id = s.id
//             WHERE p.id NOT IN (
//                 SELECT profesor_id 
//                 FROM profesor_seccion 
//                 WHERE seccion_id = ?
//             )
//             AND p.tipo = 'docente'
//             AND (p.estado IS NULL OR p.estado = 'activo')
//             AND (
//                 p.primer_nombre LIKE ? 
//                 OR p.segundo_nombre LIKE ? 
//                 OR p.primer_apellido LIKE ? 
//                 OR p.segundo_apellido LIKE ? 
//                 OR p.cedula LIKE ? 
//                 OR p.correo LIKE ?
//                 OR CONCAT(p.primer_nombre, ' ', p.primer_apellido) LIKE ?
//                 OR CONCAT(p.primer_nombre, ' ', p.segundo_nombre, ' ', p.primer_apellido, ' ', p.segundo_apellido) LIKE ?
//             )
//             GROUP BY p.id, p.primer_nombre, p.segundo_nombre, p.primer_apellido, p.segundo_apellido, 
//                      p.cedula, p.telefono, p.correo, p.fecha_nacimiento, p.sexo, p.cargo_voucher, 
//                      p.dependencia, p.carga_horaria, p.fecha_ingreso_mppe, p.titulos_profesionales, 
//                      p.tipo_titulo, p.especialidad, p.talla_franela, p.talla_pantalon, p.talla_zapato
//             ORDER BY p.primer_apellido, p.primer_nombre
//             LIMIT 50
//         `;

//         const searchTerm = `%${search}%`;
//         const [rows] = await pool.execute(query, [
//             seccion_id,
//             searchTerm, searchTerm, searchTerm, searchTerm,
//             searchTerm, searchTerm, searchTerm, searchTerm
//         ]);

//         // Formatear respuesta
//         return rows.map(row => ({
//             id: row.id,
//             nombre_completo: `${row.nombres.trim()} ${row.apellidos.trim()}`.replace(/\s+/g, ' '),
//             cedula: row.cedula,
//             telefono: row.telefono,
//             correo: row.correo,
//             cargo_voucher: row.cargo_voucher,
//             dependencia: row.dependencia,
//             especialidad: row.especialidad,
//             titulos_profesionales: row.titulos_profesionales,
//             total_secciones_asignadas: row.total_secciones_asignadas,
//             secciones_actuales: row.secciones_actuales || 'Ninguna'
//         }));
//     }

//     // Obtener secciones por profesor
//     async obtenerSeccionesPorProfesor(profesor_id) {
//         const query = `
//             SELECT 
//                 ps.seccion_id,
//                 ps.es_tutor,
//                 ps.fecha_asignacion,
//                 s.nombre as seccion_nombre,
//                 s.capacidad_maxima,
//                 g.nombre as grado_nombre,
//                 g.nivel
//             FROM profesor_seccion ps
//             JOIN secciones s ON ps.seccion_id = s.id
//             JOIN grados g ON s.grado_id = g.id
//             WHERE ps.profesor_id = ?
//             ORDER BY g.nivel, s.nombre
//         `;
//         const [rows] = await pool.execute(query, [profesor_id]);
//         return rows;
//     }

//     // Verificar si es docente activo
//     async verificarDocenteActivo(profesor_id) {
//         const query = `
//             SELECT id, tipo, estado 
//             FROM personal 
//             WHERE id = ? 
//             AND tipo = 'docente'
//             AND (estado IS NULL OR estado = 'activo')
//         `;
//         const [rows] = await pool.execute(query, [profesor_id]);
//         return rows.length > 0;
//     }


//     // Obtener carga de trabajo del profesor por año
//     async obtenerCargaTrabajo(profesor_id, año_escolar) {
//         const query = `
//             SELECT 
//                 COUNT(*) as total_secciones,
//                 SUM(CASE WHEN es_tutor = 1 THEN 1 ELSE 0 END) as como_tutor
//             FROM profesor_seccion 
//             WHERE profesor_id = ? 
//             AND YEAR(fecha_asignacion) = ?
//         `;
//         const [rows] = await db.execute(query, [profesor_id, año_escolar]);
//         return rows[0];
//     }

// }

// class estudianteSeccionModel {
//     // Inscribir estudiante a sección
//     async inscribirEstudiante(estudiante_id, seccion_id, año_escolar, estado = 'activo', fecha_inscripcion = null) {
//         const query = `
//             INSERT INTO estudiante_seccion (estudiante_id, seccion_id, año_escolar, estado, fecha_inscripcion) 
//             VALUES (?, ?, ?, ?, ?)
//             ON DUPLICATE KEY UPDATE 
//                 seccion_id = VALUES(seccion_id),
//                 estado = VALUES(estado),
//                 fecha_inscripcion = VALUES(fecha_inscripcion)
//         `;
//         const [result] = await pool.execute(query, [estudiante_id, seccion_id, año_escolar, estado, fecha_inscripcion]);
//         return result;
//     }

//     // Obtener estudiantes por sección
//     async obtenerPorSeccion(seccion_id) {
//         const query = `
//             SELECT 
//                 es.id,
//                 es.estudiante_id,
//                 es.seccion_id,
//                 es.año_escolar,
//                 es.estado,
//                 es.fecha_inscripcion,
//                 es.created_at,
//                 e.id as estudiante_id,
//                 e.nombres,
//                 e.apellidos,
//                 e.fecha_nacimiento,
//                 e.genero,
//                 e.tipo_cedula,
//                 e.cedula,
//                 e.cedula_escolar,
//                 e.representante_id,
//                 r.nombres as representante_nombres,
//                 r.apellidos as representante_apellidos,
//                 r.telefono as representante_telefono
//             FROM estudiante_seccion es
//             JOIN estudiantes e ON es.estudiante_id = e.id
//             LEFT JOIN representantes r ON e.representante_id = r.id
//             WHERE es.seccion_id = ?
//             ORDER BY e.apellidos, e.nombres
//         `;
//         const [rows] = await pool.execute(query, [seccion_id]);

//         // Formatear nombres completos
//         return rows.map(row => ({
//             ...row,
//             nombre_completo: `${row.nombres} ${row.apellidos}`,
//             representante_nombre_completo: row.representante_nombres ?
//                 `${row.representante_nombres} ${row.representante_apellidos}` : null
//         }));
//     }

//     // Remover estudiante de sección
//     async removerEstudiante(seccion_id, estudiante_id) {
//         const query = 'DELETE FROM estudiante_seccion WHERE seccion_id = ? AND estudiante_id = ?';
//         const [result] = await pool.execute(query, [seccion_id, estudiante_id]);
//         return result;
//     }

//     // Actualizar estado del estudiante en sección
//     async actualizarEstado(seccion_id, estudiante_id, estado) {
//         const query = 'UPDATE estudiante_seccion SET estado = ? WHERE seccion_id = ? AND estudiante_id = ?';
//         const [result] = await pool.execute(query, [estado, seccion_id, estudiante_id]);
//         return result;
//     }

//     // Verificar si estudiante ya está inscrito en el año escolar
//     async verificarInscripcion(estudiante_id, año_escolar) {
//         const query = `
//             SELECT es.id, es.seccion_id, es.estado, s.nombre as seccion_nombre, g.nombre as grado_nombre
//             FROM estudiante_seccion es
//             JOIN secciones s ON es.seccion_id = s.id
//             JOIN grados g ON s.grado_id = g.id
//             WHERE es.estudiante_id = ? AND es.año_escolar = ?
//         `;
//         const [rows] = await pool.execute(query, [estudiante_id, año_escolar]);
//         return rows[0] || null;
//     }

//     // Buscar estudiantes disponibles para inscribir
//     async buscarDisponibles(seccion_id, año_escolar, search = '') {
//         const query = `
//             SELECT 
//                 e.id,
//                 e.nombres,
//                 e.apellidos,
//                 e.fecha_nacimiento,
//                 e.genero,
//                 e.tipo_cedula,
//                 e.cedula,
//                 e.cedula_escolar,
//                 e.representante_id,
//                 r.nombres as representante_nombres,
//                 r.apellidos as representante_apellidos,
//                 r.telefono as representante_telefono,
//                 es2.seccion_id as seccion_actual_id,
//                 s2.nombre as seccion_actual_nombre,
//                 g2.nombre as grado_actual_nombre
//             FROM estudiantes e
//             LEFT JOIN representantes r ON e.representante_id = r.id
//             LEFT JOIN estudiante_seccion es2 ON e.id = es2.estudiante_id AND es2.año_escolar = ?
//             LEFT JOIN secciones s2 ON es2.seccion_id = s2.id
//             LEFT JOIN grados g2 ON s2.grado_id = g2.id
//             WHERE e.id NOT IN (
//                 SELECT estudiante_id 
//                 FROM estudiante_seccion 
//                 WHERE año_escolar = ?
//             )
//             AND (
//                 e.nombres LIKE ? 
//                 OR e.apellidos LIKE ? 
//                 OR e.cedula LIKE ? 
//                 OR e.cedula_escolar LIKE ?
//                 OR CONCAT(e.nombres, ' ', e.apellidos) LIKE ?
//                 OR r.nombres LIKE ?
//                 OR r.apellidos LIKE ?
//             )
//             ORDER BY e.apellidos, e.nombres
//             LIMIT 50
//         `;

//         const searchTerm = `%${search}%`;
//         const [rows] = await pool.execute(query, [
//             año_escolar,
//             año_escolar,
//             searchTerm, searchTerm, searchTerm, searchTerm,
//             searchTerm, searchTerm, searchTerm
//         ]);

//         // Formatear respuesta
//         return rows.map(row => ({
//             id: row.id,
//             nombre_completo: `${row.nombres} ${row.apellidos}`,
//             cedula: row.cedula,
//             cedula_escolar: row.cedula_escolar,
//             fecha_nacimiento: row.fecha_nacimiento,
//             genero: row.genero,
//             representante_nombre_completo: row.representante_nombres ?
//                 `${row.representante_nombres} ${row.representante_apellidos}` : null,
//             representante_telefono: row.representante_telefono,
//             seccion_actual: row.seccion_actual_nombre ?
//                 `${row.seccion_actual_nombre} (${row.grado_actual_nombre})` : 'Ninguna'
//         }));
//     }

//     // Obtener historial académico del estudiante
//     async obtenerHistorialEstudiante(estudiante_id) {
//         const query = `
//             SELECT 
//                 es.año_escolar,
//                 es.estado,
//                 es.fecha_inscripcion,
//                 s.nombre as seccion_nombre,
//                 g.nombre as grado_nombre,
//                 g.nivel,
//                 CONCAT(p.primer_nombre, ' ', p.primer_apellido) as tutor_nombre
//             FROM estudiante_seccion es
//             JOIN secciones s ON es.seccion_id = s.id
//             JOIN grados g ON s.grado_id = g.id
//             LEFT JOIN profesor_seccion ps ON s.id = ps.seccion_id AND ps.es_tutor = 1
//             LEFT JOIN personal p ON ps.profesor_id = p.id
//             WHERE es.estudiante_id = ?
//             ORDER BY es.año_escolar DESC
//         `;
//         const [rows] = await pool.execute(query, [estudiante_id]);
//         return rows;
//     }

//     // Obtener conteo por estado en sección
//     async obtenerConteoPorEstado(seccion_id) {
//         const query = `
//             SELECT 
//                 estado,
//                 COUNT(*) as total
//             FROM estudiante_seccion 
//             WHERE seccion_id = ?
//             GROUP BY estado
//         `;
//         const [rows] = await pool.execute(query, [seccion_id]);
//         return rows;
//     }

//     // Obtener sección actual del estudiante
//     async obtenerSeccionActual(estudiante_id, año_escolar = null) {
//         let query = `
//             SELECT 
//                 es.*,
//                 s.nombre as seccion_nombre,
//                 g.nombre as grado_nombre,
//                 g.nivel
//             FROM estudiante_seccion es
//             JOIN secciones s ON es.seccion_id = s.id
//             JOIN grados g ON s.grado_id = g.id
//             WHERE es.estudiante_id = ?
//         `;

//         const params = [estudiante_id];

//         if (año_escolar) {
//             query += ' AND es.año_escolar = ?';
//             params.push(año_escolar);
//         } else {
//             query += ' ORDER BY es.año_escolar DESC LIMIT 1';
//         }

//         const [rows] = await pool.execute(query, params);
//         return rows[0] || null;
//     }

//     // Verificar si estudiante existe y está activo
//     async verificarEstudianteActivo(estudiante_id) {
//         // Nota: Tu tabla estudiantes no tiene campo 'estado', 
//         // pero podrías agregarlo o verificar por otros criterios
//         const query = 'SELECT id FROM estudiantes WHERE id = ?';
//         const [rows] = await pool.execute(query, [estudiante_id]);
//         return rows.length > 0;
//     }


//     // Obtener año escolar actual (helper function)
//     async obtenerAñoEscolarActual() {
//         const now = new Date();
//         const year = now.getFullYear();
//         const month = now.getMonth() + 1; // Enero = 0

//         // Si estamos después de agosto, el año escolar es el año actual - año siguiente
//         // Si estamos antes de agosto, el año escolar es año anterior - año actual
//         return month >= 8 ? year : year - 1;
//     }

// };

// module.exports = {
//     SeccionesModel: new seccionesModel(),
//     ProfesorSeccionModel: new profesorSeccionModel(),
//     EstudianteSeccionModel: new estudianteSeccionModel()
// };


const { pool } = require("../../config/baseDatos");

class SeccionesModel {
    // GRADOS
    async crearGrado(data) {
        const query = 'INSERT INTO grados SET ?';
        const [resultado] = await pool.query(query, data);
        return resultado.insertId;
    }

    async obtenerGrados() {
        const query = `
            SELECT g.*, 
                   COUNT(DISTINCT s.id) as total_secciones,
                   COUNT(DISTINCT ps.profesor_id) as total_profesores,
                   COUNT(DISTINCT es.estudiante_id) as total_estudiantes
            FROM grados g
            LEFT JOIN secciones s ON g.id = s.grado_id
            LEFT JOIN profesor_seccion ps ON s.id = ps.seccion_id
            LEFT JOIN estudiante_seccion es ON s.id = es.seccion_id AND es.estado = 'activo'
            GROUP BY g.id
            ORDER BY g.nivel, g.nombre`;
        const [rows] = await pool.query(query);
        return rows;
    }

    async obtenerGradoPorId(id) {
        const query = 'SELECT * FROM grados WHERE id = ?';
        const [rows] = await pool.query(query, [id]);
        return rows[0];
    }

    async actualizarGrado(id, data) {
        const query = 'UPDATE grados SET ? WHERE id = ?';
        const [result] = await pool.query(query, [data, id]);
        return result.affectedRows;
    }

    async eliminarGrado(id) {
        const query = 'DELETE FROM grados WHERE id = ?';
        const [resultado] = await pool.query(query, [id]);
        return resultado.affectedRows;
    }

    //*Secciones

    async crearSeccion(data) {
        const query = 'INSERT INTO secciones SET ?';
        const [resultado] = await pool.query(query, data);
        return resultado.insertId;
    }

    // async obtenerSeccionesPorGrado(gradoId) {
    //     const query = `
    //         SELECT s.*, 
    //                g.nombre as grado_nombre,
    //                COUNT(DISTINCT ps.profesor_id) as total_profesores,
    //                COUNT(DISTINCT es.estudiante_id) as total_estudiantes
    //         FROM secciones s
    //         JOIN grados g ON s.grado_id = g.id
    //         LEFT JOIN profesor_seccion ps ON s.id = ps.seccion_id
    //         LEFT JOIN estudiante_seccion es ON s.id = es.seccion_id AND es.estado = 'activo'
    //         WHERE s.grado_id = ?
    //         GROUP BY s.id
    //         ORDER BY s.nombre`;
    //     const [rows] = await pool.query(query, [gradoId]);
    //     return rows;
    // }

    async obtenerSeccionesPorGrado(gradoId) {
        const query = `
        SELECT s.*, 
               g.nombre as grado_nombre,
               COUNT(DISTINCT ps.profesor_id) as total_profesores,
               COUNT(DISTINCT es.estudiante_id) as total_estudiantes,
               COUNT(DISTINCT es.estudiante_id) as capacidad_actual
        FROM secciones s
        JOIN grados g ON s.grado_id = g.id
        LEFT JOIN profesor_seccion ps ON s.id = ps.seccion_id
        LEFT JOIN estudiante_seccion es ON s.id = es.seccion_id AND es.estado = 'activo'
        WHERE s.grado_id = ?
        GROUP BY s.id
        ORDER BY s.nombre`;
        const [rows] = await pool.query(query, [gradoId]);
        return rows;
    }


    async obtenerSeccionPorId(id) {
        const query = 'SELECT * FROM secciones WHERE id = ?';
        const [rows] = await pool.query(query, [id]);
        return rows[0];
    }

    async actualizarSeccion(id, data) {
        const query = 'UPDATE secciones SET ? WHERE id = ?';
        const [resultado] = await pool.query(query, [data, id]);
        return resultado.affectedRows;
    }

    async eliminarSeccion(id) {
        const query = 'DELETE FROM secciones WHERE id = ?';
        const [resultado] = await pool.query(query, [id]);
        return resultado.affectedRows;
    }

    //*Asignar profesor (método antiguo - mantener para compatibilidad)
    async asignarProfesorASeccion(data) {
        const query = 'INSERT INTO profesor_seccion SET ?';
        const [resultado] = await pool.query(query, data);
        return resultado.insertId;
    }

    async obtenerProfesoresPorSeccion(seccionId) {
        const query = `
            SELECT ps.*,
                   p.id as profesor_id,
                   p.primer_nombre as nombre,
                   p.primer_apellido as apellido,
                   p.cedula as cedula,
                   p.correo as email,
                   p.telefono
            FROM profesor_seccion ps
            JOIN personal p ON ps.profesor_id = p.id
            WHERE ps.seccion_id = ?
            AND p.tipo = 'docente'
            ORDER BY ps.es_tutor DESC, p.primer_apellido`;
        const [rows] = await pool.query(query, [seccionId]);
        return rows;
    }

    async verificarProfesorEnSeccion(profesorId, seccionId) {
        const query = 'SELECT id FROM profesor_seccion WHERE profesor_id = ? AND seccion_id = ?';
        const [rows] = await pool.query(query, [profesorId, seccionId]);
        return rows.length > 0;
    }

    async eliminarProfesorDeSeccion(asignacionId) {
        const query = 'DELETE FROM profesor_seccion WHERE id = ?';
        const [resultado] = await pool.query(query, [asignacionId]);
        return resultado.affectedRows;
    }

    //* Verificar
    async verificarGradoExiste(id) {
        const query = 'SELECT id FROM grados WHERE id = ?';
        const [rows] = await pool.query(query, [id]);
        return rows.length > 0;
    }

    async verificarSeccionExiste(id) {
        const query = 'SELECT id FROM secciones WHERE id = ?';
        const [rows] = await pool.query(query, [id]);
        return rows.length > 0;
    }

    async verificarDocenteExiste(id, tipo) {
        const query = 'SELECT id FROM personal WHERE id = ? AND tipo = ?';
        const [rows] = await pool.query(query, [id, tipo]);
        return rows.length > 0;
    }

    async verificarEstudianteExite(id) {
        const query = 'SELECT id FROM estudiantes WHERE id = ?';
        const [rows] = await pool.query(query, [id]);
        return rows.length > 0;
    }

    async verificarCapacidadSeccion(seccionId) {
        const query = `
            SELECT s.capacidad_maxima, 
                   COUNT(es.id) as estudiantes_actuales
            FROM secciones s
            LEFT JOIN estudiante_seccion es ON s.id = es.seccion_id AND es.estado = 'activo'
            WHERE s.id = ?
            GROUP BY s.id`;
        const [rows] = await pool.query(query, [seccionId]);
        return rows[0] || null;
    }

    //*Asignar Estudiante (método antiguo - mantener para compatibilidad)
    async asignarEstudianteASeccion(data) {
        const query = 'INSERT INTO estudiante_seccion SET ?';
        const [resultado] = await pool.query(query, data);
        return resultado.insertId;
    }


    //!Esto es la query del de abajo
    // const query = `
    //     SELECT es.*, 
    //            e.id as estudiante_id,
    //            e.nombres as nombre, 
    //            e.apellidos as apellido,
    //            e.cedula_escolar,
    //            e.fecha_nacimiento,
    //            e.genero
    //     FROM estudiante_seccion es
    //     JOIN estudiantes e ON es.estudiante_id = e.id
    //     WHERE es.seccion_id = ? AND es.estado = 'activo'
    //     ORDER BY e.apellidos, e.nombres`;

    async obtenerEstudiantesPorSeccion(seccionId) {
        const query = `
    SELECT es.*, 
           e.id as estudiante_id,
           e.nombres as nombre, 
           e.apellidos as apellido,
           e.cedula_escolar,
           e.fecha_nacimiento,
           e.genero,
           -- Datos del representante
           r.nombres as representante_nombres,
           r.apellidos as representante_apellidos,
           r.telefono as representante_telefono
    FROM estudiante_seccion es
    JOIN estudiantes e ON es.estudiante_id = e.id
    LEFT JOIN representantes r ON e.representante_id = r.id
    WHERE es.seccion_id = ? AND es.estado = 'activo'
    ORDER BY e.apellidos, e.nombres`;

        const [rows] = await pool.query(query, [seccionId]);
        return rows;
    }

    async verificarEstudianteEnSeccion(estudianteId, seccionId, añoEscolar) {
        const query = 'SELECT id FROM estudiante_seccion WHERE estudiante_id = ? AND seccion_id = ? AND año_escolar = ?';
        const [rows] = await pool.query(query, [estudianteId, seccionId, añoEscolar]);
        return rows.length > 0;
    }

    async actualizarEstadoEstudiante(asignacionId, estado) {
        const query = 'UPDATE estudiante_seccion SET estado = ? WHERE id = ?';
        const [resultado] = await pool.query(query, [estado, asignacionId]);
        return resultado.affectedRows;
    }

    async eliminarEstudianteDeSeccion(asignacionId) {
        const query = 'DELETE FROM estudiante_seccion WHERE id = ?';
        const [resultado] = await pool.query(query, [asignacionId]);
        return resultado.affectedRows;
    }
    async obtenerEstadisticasEstudiantes(seccionId) {
        const query = `
        SELECT 
            estado,
            COUNT(*) as total
        FROM estudiante_seccion 
        WHERE seccion_id = ?
        GROUP BY estado
        ORDER BY estado`;
        const [rows] = await pool.query(query, [seccionId]);
        return rows;
    }

    async obtenerTutorSeccion(seccionId) {
        const query = `
        SELECT 
            p.id,
            CONCAT(p.primer_nombre, ' ', p.primer_apellido) as nombre_completo,
            p.cedula,
            p.correo as email
        FROM profesor_seccion ps
        JOIN personal p ON ps.profesor_id = p.id
        WHERE ps.seccion_id = ? 
        AND ps.es_tutor = 1
        AND p.tipo = 'docente'
        LIMIT 1`;
        const [rows] = await pool.query(query, [seccionId]);
        return rows[0] || null;
    }

}

class ProfesorSeccionModel {
    // Asignar profesor a sección
    async asignarProfesor(profesor_id, seccion_id, es_tutor = 0, fecha_asignacion) {
        if (!fecha_asignacion) {
            fecha_asignacion = new Date();
        }
        const query = `
            INSERT INTO profesor_seccion (profesor_id, seccion_id, es_tutor, fecha_asignacion) 
            VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE es_tutor = VALUES(es_tutor), fecha_asignacion = VALUES(fecha_asignacion)
        `;
        const [result] = await pool.query(query, [profesor_id, seccion_id, es_tutor, fecha_asignacion]);
        return result;
    }

    // Obtener profesores por sección
    async obtenerPorSeccion(seccion_id) {
        const query = `
            SELECT 
                ps.id,
                ps.profesor_id,
                ps.seccion_id,
                ps.es_tutor,
                ps.fecha_asignacion,
                ps.created_at,
                p.id as personal_id,
                CONCAT(p.primer_nombre, ' ', COALESCE(p.segundo_nombre, '')) as nombres,
                CONCAT(p.primer_apellido, ' ', COALESCE(p.segundo_apellido, '')) as apellidos,
                p.cedula,
                p.telefono,
                p.correo,
                p.cargo_voucher,
                p.dependencia,
                p.titulos_profesionales,
                p.tipo_titulo,
                p.especialidad,
                p.estado
            FROM profesor_seccion ps
            JOIN personal p ON ps.profesor_id = p.id
            WHERE ps.seccion_id = ? 
            AND p.tipo = 'docente'
            AND (p.estado IS NULL OR p.estado = 'activo')
            ORDER BY ps.es_tutor DESC, p.primer_apellido, p.primer_nombre
        `;
        const [rows] = await pool.query(query, [seccion_id]);

        // Formatear nombres completos
        return rows.map(row => ({
            ...row,
            nombre_completo: `${row.nombres.trim()} ${row.apellidos.trim()}`.replace(/\s+/g, ' ')
        }));
    }

    // Remover profesor de sección
    async removerProfesor(seccion_id, profesor_id) {
        const query = 'DELETE FROM profesor_seccion WHERE seccion_id = ? AND profesor_id = ?';
        const [result] = await pool.query(query, [seccion_id, profesor_id]);
        return result;
    }

    // Actualizar si es tutor
    async actualizarTutor(seccion_id, profesor_id, es_tutor) {
        const query = 'UPDATE profesor_seccion SET es_tutor = ? WHERE seccion_id = ? AND profesor_id = ?';
        const [result] = await pool.query(query, [es_tutor, seccion_id, profesor_id]);
        return result;
    }

    // Verificar si profesor ya está asignado
    async verificarAsignacion(profesor_id, seccion_id) {
        const query = 'SELECT id FROM profesor_seccion WHERE profesor_id = ? AND seccion_id = ?';
        const [rows] = await pool.query(query, [profesor_id, seccion_id]);
        return rows.length > 0;
    }

    // Obtener tutor de sección
    async obtenerTutor(seccion_id) {
        const query = `
            SELECT 
                ps.profesor_id,
                p.id as personal_id,
                CONCAT(p.primer_nombre, ' ', COALESCE(p.segundo_nombre, '')) as nombres,
                CONCAT(p.primer_apellido, ' ', COALESCE(p.segundo_apellido, '')) as apellidos,
                p.cedula,
                p.correo,
                p.telefono
            FROM profesor_seccion ps
            JOIN personal p ON ps.profesor_id = p.id
            WHERE ps.seccion_id = ? 
            AND ps.es_tutor = 1 
            AND p.tipo = 'docente'
            AND (p.estado IS NULL OR p.estado = 'activo')
            LIMIT 1
        `;
        const [rows] = await pool.query(query, [seccion_id]);
        return rows[0] || null;
    }

    // Buscar profesores disponibles para asignar
    async buscarDisponibles(seccion_id, search = '') {
        const query = `
            SELECT 
                p.id,
                CONCAT(p.primer_nombre, ' ', COALESCE(p.segundo_nombre, '')) as nombres,
                CONCAT(p.primer_apellido, ' ', COALESCE(p.segundo_apellido, '')) as apellidos,
                p.cedula,
                p.telefono,
                p.correo,
                p.fecha_nacimiento,
                p.sexo,
                p.cargo_voucher,
                p.dependencia,
                p.carga_horaria,
                p.fecha_ingreso_mppe,
                p.titulos_profesionales,
                p.tipo_titulo,
                p.talla_franela,
                p.talla_pantalon,
                p.talla_zapato,
                COUNT(DISTINCT ps2.seccion_id) as total_secciones_asignadas,
                GROUP_CONCAT(DISTINCT s.nombre SEPARATOR ', ') as secciones_actuales
            FROM personal p
            LEFT JOIN profesor_seccion ps2 ON p.id = ps2.profesor_id
            LEFT JOIN secciones s ON ps2.seccion_id = s.id
            WHERE p.id NOT IN (
                SELECT profesor_id 
                FROM profesor_seccion 
                WHERE seccion_id = ?
            )
            AND p.tipo = 'docente'
            AND (p.estado IS NULL OR p.estado = 'activo')
            AND (
                p.primer_nombre LIKE ? 
                OR p.segundo_nombre LIKE ? 
                OR p.primer_apellido LIKE ? 
                OR p.segundo_apellido LIKE ? 
                OR p.cedula LIKE ? 
                OR p.correo LIKE ?
                OR CONCAT(p.primer_nombre, ' ', p.primer_apellido) LIKE ?
                OR CONCAT(p.primer_nombre, ' ', p.segundo_nombre, ' ', p.primer_apellido, ' ', p.segundo_apellido) LIKE ?
            )
            GROUP BY p.id, p.primer_nombre, p.segundo_nombre, p.primer_apellido, p.segundo_apellido, 
                     p.cedula, p.telefono, p.correo, p.fecha_nacimiento, p.sexo, p.cargo_voucher, 
                     p.dependencia, p.carga_horaria, p.fecha_ingreso_mppe, p.titulos_profesionales, 
                     p.tipo_titulo, p.talla_franela, p.talla_pantalon, p.talla_zapato
            ORDER BY p.primer_apellido, p.primer_nombre
            LIMIT 50
        `;

        const searchTerm = `%${search}%`;
        const [rows] = await pool.query(query, [
            seccion_id,
            searchTerm, searchTerm, searchTerm, searchTerm,
            searchTerm, searchTerm, searchTerm, searchTerm
        ]);

        // Formatear respuesta
        return rows.map(row => ({
            id: row.id,
            nombre_completo: `${row.nombres.trim()} ${row.apellidos.trim()}`.replace(/\s+/g, ' '),
            cedula: row.cedula,
            telefono: row.telefono,
            correo: row.correo,
            cargo_voucher: row.cargo_voucher,
            dependencia: row.dependencia,
            especialidad: row.especialidad,
            titulos_profesionales: row.titulos_profesionales,
            total_secciones_asignadas: row.total_secciones_asignadas,
            secciones_actuales: row.secciones_actuales || 'Ninguna'
        }));
    }

    // Obtener secciones por profesor
    async obtenerSeccionesPorProfesor(profesor_id) {
        const query = `
            SELECT 
                ps.seccion_id,
                ps.es_tutor,
                ps.fecha_asignacion,
                s.nombre as seccion_nombre,
                s.capacidad_maxima,
                g.nombre as grado_nombre,
                g.nivel
            FROM profesor_seccion ps
            JOIN secciones s ON ps.seccion_id = s.id
            JOIN grados g ON s.grado_id = g.id
            WHERE ps.profesor_id = ?
            ORDER BY g.nivel, s.nombre
        `;
        const [rows] = await pool.query(query, [profesor_id]);
        return rows;
    }

    // Verificar si es docente activo
    async verificarDocenteActivo(profesor_id) {
        const query = `
            SELECT id, tipo, estado 
            FROM personal 
            WHERE id = ? 
            AND tipo = 'docente'
            AND (estado IS NULL OR estado = 'activo')
        `;
        const [rows] = await pool.query(query, [profesor_id]);
        return rows.length > 0;
    }
}

class EstudianteSeccionModel {
    // Inscribir estudiante a sección
    async inscribirEstudiante(estudiante_id, seccion_id, año_escolar, estado = 'activo', fecha_inscripcion = null) {
        if (!fecha_inscripcion) {
            fecha_inscripcion = new Date();
        }
        const query = `
            INSERT INTO estudiante_seccion (estudiante_id, seccion_id, año_escolar, estado, fecha_inscripcion) 
            VALUES (?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
                seccion_id = VALUES(seccion_id),
                estado = VALUES(estado),
                fecha_inscripcion = VALUES(fecha_inscripcion)
        `;
        const [result] = await pool.query(query, [estudiante_id, seccion_id, año_escolar, estado, fecha_inscripcion]);
        return result;
    }

    // Obtener estudiantes por sección
    async obtenerPorSeccion(seccion_id) {
        const query = `
            SELECT 
                es.id,
                es.estudiante_id,
                es.seccion_id,
                es.año_escolar,
                es.estado,
                es.fecha_inscripcion,
                es.created_at,
                e.id as estudiante_id,
                e.nombres,
                e.apellidos,
                e.fecha_nacimiento,
                e.genero,
                e.tipo_cedula,
                e.cedula,
                e.cedula_escolar,
                e.representante_id,
                r.nombres as representante_nombres,
                r.apellidos as representante_apellidos,
                r.telefono as representante_telefono
            FROM estudiante_seccion es
            JOIN estudiantes e ON es.estudiante_id = e.id
            LEFT JOIN representantes r ON e.representante_id = r.id
            WHERE es.seccion_id = ?
            ORDER BY e.apellidos, e.nombres
        `;
        const [rows] = await pool.query(query, [seccion_id]);

        // Formatear nombres completos
        return rows.map(row => ({
            ...row,
            nombre_completo: `${row.nombres} ${row.apellidos}`,
            representante_nombre_completo: row.representante_nombres ?
                `${row.representante_nombres} ${row.representante_apellidos}` : null
        }));
    }

    // Remover estudiante de sección
    async removerEstudiante(seccion_id, estudiante_id) {
        const query = 'DELETE FROM estudiante_seccion WHERE seccion_id = ? AND estudiante_id = ?';
        const [result] = await pool.query(query, [seccion_id, estudiante_id]);
        return result;
    }

    // Actualizar estado del estudiante en sección
    async actualizarEstado(seccion_id, estudiante_id, estado) {
        const query = 'UPDATE estudiante_seccion SET estado = ? WHERE seccion_id = ? AND estudiante_id = ?';
        const [result] = await pool.query(query, [estado, seccion_id, estudiante_id]);
        return result;
    }

    // Verificar si estudiante ya está inscrito en el año escolar
    async verificarInscripcion(estudiante_id, año_escolar) {
        const query = `
            SELECT es.id, es.seccion_id, es.estado, s.nombre as seccion_nombre, g.nombre as grado_nombre
            FROM estudiante_seccion es
            JOIN secciones s ON es.seccion_id = s.id
            JOIN grados g ON s.grado_id = g.id
            WHERE es.estudiante_id = ? AND es.año_escolar = ?
        `;
        const [rows] = await pool.query(query, [estudiante_id, año_escolar]);
        return rows[0] || null;
    }

    // Buscar estudiantes disponibles para inscribir
    async buscarDisponibles(seccion_id, año_escolar, search = '') {
        const query = `
            SELECT 
                e.id,
                e.nombres,
                e.apellidos,
                e.fecha_nacimiento,
                e.genero,
                e.tipo_cedula,
                e.cedula,
                e.cedula_escolar,
                e.representante_id,
                r.nombres as representante_nombres,
                r.apellidos as representante_apellidos,
                r.telefono as representante_telefono,
                es2.seccion_id as seccion_actual_id,
                s2.nombre as seccion_actual_nombre,
                g2.nombre as grado_actual_nombre
            FROM estudiantes e
            LEFT JOIN representantes r ON e.representante_id = r.id
            LEFT JOIN estudiante_seccion es2 ON e.id = es2.estudiante_id AND es2.año_escolar = ?
            LEFT JOIN secciones s2 ON es2.seccion_id = s2.id
            LEFT JOIN grados g2 ON s2.grado_id = g2.id
            WHERE e.id NOT IN (
                SELECT estudiante_id 
                FROM estudiante_seccion 
                WHERE año_escolar = ?
            )
            AND (
                e.nombres LIKE ? 
                OR e.apellidos LIKE ? 
                OR e.cedula LIKE ? 
                OR e.cedula_escolar LIKE ?
                OR CONCAT(e.nombres, ' ', e.apellidos) LIKE ?
                OR r.nombres LIKE ?
                OR r.apellidos LIKE ?
            )
            ORDER BY e.apellidos, e.nombres
            LIMIT 50
        `;

        const searchTerm = `%${search}%`;
        const [rows] = await pool.query(query, [
            año_escolar,
            año_escolar,
            searchTerm, searchTerm, searchTerm, searchTerm,
            searchTerm, searchTerm, searchTerm
        ]);

        // Formatear respuesta
        return rows.map(row => ({
            id: row.id,
            nombre_completo: `${row.nombres} ${row.apellidos}`,
            cedula: row.cedula,
            cedula_escolar: row.cedula_escolar,
            fecha_nacimiento: row.fecha_nacimiento,
            genero: row.genero,
            representante_nombre_completo: row.representante_nombres ?
                `${row.representante_nombres} ${row.representante_apellidos}` : null,
            representante_telefono: row.representante_telefono,
            seccion_actual: row.seccion_actual_nombre ?
                `${row.seccion_actual_nombre} (${row.grado_actual_nombre})` : 'Ninguna'
        }));
    }

    // Obtener historial académico del estudiante
    async obtenerHistorialEstudiante(estudiante_id) {
        const query = `
            SELECT 
                es.año_escolar,
                es.estado,
                es.fecha_inscripcion,
                s.nombre as seccion_nombre,
                g.nombre as grado_nombre,
                g.nivel,
                CONCAT(p.primer_nombre, ' ', p.primer_apellido) as tutor_nombre
            FROM estudiante_seccion es
            JOIN secciones s ON es.seccion_id = s.id
            JOIN grados g ON s.grado_id = g.id
            LEFT JOIN profesor_seccion ps ON s.id = ps.seccion_id AND ps.es_tutor = 1
            LEFT JOIN personal p ON ps.profesor_id = p.id
            WHERE es.estudiante_id = ?
            ORDER BY es.año_escolar DESC
        `;
        const [rows] = await pool.query(query, [estudiante_id]);
        return rows;
    }

    // Obtener conteo por estado en sección
    async obtenerConteoPorEstado(seccion_id) {
        const query = `
            SELECT 
                estado,
                COUNT(*) as total
            FROM estudiante_seccion 
            WHERE seccion_id = ?
            GROUP BY estado
        `;
        const [rows] = await pool.query(query, [seccion_id]);
        return rows;
    }

    // Obtener sección actual del estudiante
    async obtenerSeccionActual(estudiante_id, año_escolar = null) {
        let query = `
            SELECT 
                es.*,
                s.nombre as seccion_nombre,
                g.nombre as grado_nombre,
                g.nivel
            FROM estudiante_seccion es
            JOIN secciones s ON es.seccion_id = s.id
            JOIN grados g ON s.grado_id = g.id
            WHERE es.estudiante_id = ?
        `;

        const params = [estudiante_id];

        if (año_escolar) {
            query += ' AND es.año_escolar = ?';
            params.push(año_escolar);
        } else {
            query += ' ORDER BY es.año_escolar DESC LIMIT 1';
        }

        const [rows] = await pool.query(query, params);
        return rows[0] || null;
    }

    // Verificar si estudiante existe y está activo
    async verificarEstudianteActivo(estudiante_id) {
        const query = 'SELECT id FROM estudiantes WHERE id = ?';
        const [rows] = await pool.query(query, [estudiante_id]);
        return rows.length > 0;
    }

    // Obtener año escolar actual (método estático)
    obtenerAñoEscolarActual() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1; // Enero = 0

        // Si estamos después de agosto, el año escolar es el año actual - año siguiente
        // Si estamos antes de agosto, el año escolar es año anterior - año actual
        return month >= 8 ? year : year - 1;
    }
}

module.exports = {
    SeccionesModel: new SeccionesModel(),
    ProfesorSeccionModel: new ProfesorSeccionModel(),
    EstudianteSeccionModel: new EstudianteSeccionModel()
};
