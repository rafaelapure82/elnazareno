// const { pool, probarConexion } = require('../../config/baseDatos');


// class estudiantesModel {

//     //*Metodos del representante */
//     async buscarCedulaRepresentante(cedula) {
//         const [rows] = await pool.execute(
//             `SELECT id FROM representantes WHERE cedula = ? LIMIT 1`,
//             [cedula]
//         );
//         return rows;
//     }

//     // async registrarRepresentante(conexion, representante) {
//     //     try {
//     //         const [resultado] = await conexion.execute(
//     //             `INSERT INTO representantes 
//     //         (nombres, apellidos, relacion, email, telefono, ocupacion, tipo_cedula, cedula) 
//     //         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//     //             [
//     //                 representante.nombres,
//     //                 representante.apellidos,
//     //                 representante.relacion,
//     //                 representante.email,
//     //                 representante.telefono,
//     //                 representante.ocupacion,
//     //                 representante.tipoCedula,
//     //                 representante.cedula
//     //             ]
//     //         );

//     //         return resultado;

//     //     } catch (error) {
//     //         // Log completo con contexto mínimo (no imprimir datos sensibles completos)
//     //         try {
//     //             console.error('(estudiantes.model) Error en registrarRepresentante - cedula:', representante && representante.cedula);
//     //             console.error('(estudiantes.model) error.message:', error && error.message);
//     //             console.error('(estudiantes.model) error.stack:', error && error.stack);
//     //         } catch (logErr) {
//     //             // En caso de fallo en el log, imprimir el error bruto
//     //             console.error('(estudiantes.model) fallo al loggear error:', logErr);
//     //         }

//     //         // Manejo específico para duplicados en la columna unique (ej. cedula)
//     //         if (error && error.code === 'ER_DUP_ENTRY') {
//     //             try {
//     //                 const [rows] = await pool.execute(
//     //                     `SELECT id FROM representantes WHERE cedula = ? LIMIT 1`,
//     //                     [representante.cedula]
//     //                 );
//     //                 const existingId = rows && rows.length ? rows[0].id : null;
//     //                 const dupError = new Error('Cedula ya registrada');
//     //                 dupError.code = 'CEDULA_DUPLICADA';
//     //                 dupError.existingId = existingId;
//     //                 throw dupError;
//     //             } catch (innerSelectErr) {
//     //                 console.error('(estudiantes.model) error al obtener id existente tras ER_DUP_ENTRY:', innerSelectErr);
//     //                 // Si no podemos obtener el id existente, relanzamos el error original de duplicado
//     //                 throw error;
//     //             }
//     //         }

//     //         // Para otros errores, relanzamos para que el controlador decida cómo manejarlos
//     //         throw error;
//     //     }

//     // }

//     async registrarRepresentante(conexion, representante) {
//         try {
//             const [resultado] = await conexion.execute(
//                 `INSERT INTO representantes 
//             (nombres, apellidos, sexo, fecha_nacimiento, relacion, email, telefono, ocupacion, tipo_cedula, cedula) 
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//                 [
//                     representante.nombres,
//                     representante.apellidos,
//                     representante.sexo,
//                     representante.fecha_nacimiento || null,
//                     representante.relacion,
//                     representante.email || null,
//                     representante.telefono,
//                     representante.ocupacion || null,
//                     representante.tipo_cedula,
//                     representante.cedula
//                 ]
//             );

//             return resultado;
//         } catch (error) {
//             console.error('Error en registrarRepresentante:', error);

//             if (error.code === 'ER_DUP_ENTRY') {
//                 try {
//                     const [rows] = await pool.execute(
//                         `SELECT id FROM representantes WHERE cedula = ? LIMIT 1`,
//                         [representante.cedula]
//                     );
//                     const existingId = rows && rows.length ? rows[0].id : null;
//                     const dupError = new Error('Cédula ya registrada');
//                     dupError.code = 'CEDULA_DUPLICADA';
//                     dupError.existingId = existingId;
//                     throw dupError;
//                 } catch (innerSelectErr) {
//                     console.error('Error al obtener id existente:', innerSelectErr);
//                     throw error;
//                 }
//             }

//             throw error;
//         }
//     }

//     async verificarRepresentante(conexion, representante) {
//         const existeRepresentante = await this.buscarCedulaRepresentante(representante.cedula);

//         if (existeRepresentante.length > 0) {
//             console.log(`(estudiantes.model- linea 75) El representante existente con ID: ${existeRepresentante[0].id}`);
//             return {
//                 representanteID: existeRepresentante[0].id,
//                 estaRegistrado: true
//             };
//         }

//         const newRepresentante = await this.registrarRepresentante(conexion, representante);

//         return {
//             representanteID: newRepresentante.insertId,
//             estaRegistrado: false
//         };
//     }

//     async actualizarDatosRepresentante(conexion, representanteId, representante) {

//         try {

//             // Verificar duplicados antes de actualizar
//             const [existeCedula] = await conexion.execute(
//                 `SELECT id FROM representantes WHERE cedula = ? AND id != ?`,
//                 [representante.cedula, representanteId]
//             );

//             if (existeCedula.length > 0) {
//                 throw new Error('ERR_DUPLICATED_CEDULA');
//             }

//             // Verificar email si es único
//             if (representante.email) {
//                 const [existeEmail] = await conexion.execute(
//                     `SELECT id FROM representantes WHERE email = ? AND id != ?`,
//                     [representante.email, representanteId]
//                 );

//                 if (existeEmail.length > 0) {
//                     throw new Error('ERR_DUPLICATED_EMAIL');
//                 }
//             }

//             const [resultado] = await conexion.execute(`UPDATE representantes SET
//         nombres = ?,
//         apellidos = ?,
//         relacion = ?,
//         email = ?,
//         telefono = ?,
//         ocupacion = ?,
//         tipo_cedula = ?,
//         cedula = ?
//         WHERE id = ?`,
//                 [
//                     representante.nombres,
//                     representante.apellidos,
//                     representante.relacion,
//                     representante.email,
//                     representante.telefono,
//                     representante.ocupacion,
//                     representante.tipoCedula,
//                     representante.cedula,
//                     representanteId
//                 ]
//             );
//             return resultado;

//         } catch (error) {
//             if (error.code === 'ER_DUP_ENTRY') {
//                 if (error.message.includes('cedula')) {
//                     throw new Error('ERR_DUPLICATED_CEDULA');
//                 } else if (error.message.includes('email')) {
//                     throw new Error('ERR_DUPLICATED_EMAIL');
//                 }
//             }
//             throw error;
//         }

//     }

//     async obtenerIdRepresentante(conexion, estudianteId) {
//         const [representanteId] = await conexion.execute(
//             'SELECT representante_id FROM estudiantes WHERE id = ?',
//             [estudianteId]
//         );

//         return representanteId.length > 0 ? representanteId[0].representante_id : null;
//     }

//     async eliminarRepresentanteSiNoTieneEstudiantes(conexion, representanteId) {
//         const [otroEstudiante] = await conexion.query(
//             'SELECT id FROM estudiantes WHERE representante_id = ?',
//             [representanteId]
//         );

//         if (otroEstudiante.length === 0) {
//             await conexion.query(
//                 'DELETE FROM representantes WHERE id = ?',
//                 [representanteId]
//             );
//         }
//     };
//     //*Auxiliares *//

//     verificarDuplicadoEstudiante(existeEstudiante, estudiante) {
//         if (!existeEstudiante || existeEstudiante.length === 0) return;

//         const existing = existeEstudiante[0];

//         const isCedula = existing.cedula && estudiante.cedula && existing.cedula === estudiante.cedula;
//         const isCedulaEscolar = existing.cedula_escolar && estudiante.cedulaEscolar && existing.cedula_escolar === estudiante.cedulaEscolar;

//         const duplicateField = isCedula
//             ? 'estudiantes.cedula'
//             : isCedulaEscolar
//                 ? 'estudiantes.cedula_escolar'
//                 : (existing.cedula ? 'estudiantes.cedula' : 'estudiantes.cedula_escolar');

//         const duplicateValue = isCedula
//             ? estudiante.cedula
//             : isCedulaEscolar
//                 ? estudiante.cedulaEscolar
//                 : (existing.cedula || existing.cedula_escolar || null);

//         const error = new Error(`Estudiante ya registrado. Campo duplicado: ${duplicateField} (${duplicateValue})`);
//         error.code = 'CEDULA_DUPLICADA';
//         error.sqlCode = 'ER_DUP_ENTRY';
//         error.field = duplicateField;
//         error.value = duplicateValue;
//         error.existingId = existing.id || null;
//         error.status = 409; // HTTP Conflict, useful para controladores

//         throw error;
//     }

//     static mapeoColumnaEstudiante = {
//         estudiante: 'e.*',
//         representante: {
//             nombres: 'r.nombres as rep_nombres',
//             apellidos: 'r.apellidos as rep_apellidos',
//             relacion: 'r.relacion',
//             email: 'r.email',
//             telefono: 'r.telefono as rep_telefono',
//             ocupacion: 'r.ocupacion',
//             tipoCedula: 'r.tipo_cedula as rep_tipo_cedula',
//             cedula: 'r.cedula as rep_cedula',
//             created_at: 'r.created_at as rep_created_at'
//         }
//     };

//     static cotruirQueryEstudiante(buscar) {
//         let encontrar

//         const columns = [
//             this.mapeoColumnaEstudiante.estudiante,
//             ...Object.values(this.mapeoColumnaEstudiante.representante)
//         ].join(', ');

//         if (buscar == "id") {
//             encontrar = " e.id = ?"
//         } else {
//             encontrar = ` e.cedula = ? OR e.cedula_escolar = ?
//           LIMIT 1`
//         }

//         return `
//         SELECT ${columns}
//         FROM estudiantes e
//         JOIN representantes r ON e.representante_id = r.id
//         WHERE ${encontrar}`;


//     }

//     //*Metodos del estudiante */

//     async encontrarEstudiantePorCedula(estudiante) {
//         let query = '';
//         let params = [];
//         const cedula = (estudiante.cedula || '').toString().trim();
//         const cedulaEscolar = (estudiante.cedulaEscolar || '').toString().trim();

//         // Si ambos valores están presentes, buscar por cualquiera de los dos
//         if (cedula && cedulaEscolar) {
//             query = `SELECT id, cedula, cedula_escolar FROM estudiantes WHERE cedula = ? OR cedula_escolar = ? LIMIT 1`;
//             params = [cedula, cedulaEscolar];
//         } else if (!cedula && cedulaEscolar) {
//             query = `SELECT id, cedula, cedula_escolar FROM estudiantes WHERE cedula_escolar = ? LIMIT 1`;
//             params = [cedulaEscolar];
//         } else if (cedula && !cedulaEscolar) {
//             query = `SELECT id, cedula, cedula_escolar FROM estudiantes WHERE cedula = ? LIMIT 1`;
//             params = [cedula];
//         }

//         if (query) {
//             const [rows] = await pool.execute(query, params);
//             return rows;
//         }

//         return [];
//     }

//     // async registrarEstudiante(conexion, estudiante, representanteID) {
//     //     console.log(estudiante)
//     //     const [resultado] = await conexion.execute(
//     //         `INSERT INTO estudiantes 
//     //         (nombres, apellidos, fecha_nacimiento, genero, tipo_cedula, cedula, cedula_escolar, representante_id) 
//     //         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//     //         [
//     //             estudiante.nombres,
//     //             estudiante.apellidos,
//     //             estudiante.fechaNacimiento,
//     //             estudiante.genero,
//     //             estudiante.tipoCedula || null,
//     //             estudiante.cedula || null,
//     //             estudiante.cedulaEscolar,
//     //             representanteID
//     //         ]
//     //     );
//     //     return resultado;
//     // }

//     async guardarFotoEstudiante(conexion, estudianteId, fotoData) {
//         try {
//             await conexion.execute(
//                 `INSERT INTO fotos_estudiantes 
//             (estudiante_id, nombre_archivo, ruta, tipo_mime, tamano) 
//             VALUES (?, ?, ?, ?, ?)`,
//                 [
//                     estudianteId,
//                     fotoData.filename,
//                     fotoData.path,
//                     fotoData.mimetype,
//                     fotoData.size
//                 ]
//             );
//         } catch (error) {
//             console.error("Error al guardar foto:", error);
//             // No lanzamos error para no interrumpir el registro principal
//         }
//     }

//     async registrarEstudiante(conexion, estudiante, representanteID) {
//         console.log("Model 296: Datos para registrar estudiante:", estudiante);

//         const [resultado] = await conexion.execute(
//             `INSERT INTO estudiantes 
//         (nombres, apellidos, fecha_nacimiento, genero, tiene_cedula, tipo_cedula, cedula, 
//          cedula_escolar, nacionalidad, tipo_sangre, foto, direccion_estado, direccion_municipio, 
//          direccion_parroquia, direccion_sector, direccion_calle, direccion_casa, direccion_referencia, 
//          representante_id) 
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//             [
//                 estudiante.nombres,
//                 estudiante.apellidos,
//                 estudiante.fechaNacimiento,
//                 estudiante.sexo,
//                 estudiante.tieneCedula ? 1 : 0,
//                 estudiante.tipoCedula || null,
//                 estudiante.cedula || null,
//                 estudiante.cedulaEscolar,
//                 estudiante.nacionalidad,
//                 estudiante.tipoSangre || null,
//                 estudiante.foto ? estudiante.foto.filename : null,
//                 estudiante.direccion?.estado || null,
//                 estudiante.direccion?.municipio || null,
//                 estudiante.direccion?.parroquia || null,
//                 estudiante.direccion?.sector || null,
//                 estudiante.direccion?.calle || null,
//                 estudiante.direccion?.casa || null,
//                 estudiante.direccion?.referencia || null,
//                 representanteID
//             ]
//         );

//         // Si tenemos foto y queremos guardarla en una tabla separada
//         if (estudiante.foto) {
//             await this.guardarFotoEstudiante(conexion, resultado.insertId, estudiante.foto);
//         }

//         return resultado;
//     }

//     async eliminarEstudiante(conexion, estudianteId) {
//         const [resultado] = await conexion.execute(
//             'DELETE FROM estudiantes WHERE id = ?',
//             [estudianteId]
//         );
//         return resultado;
//     }

//     async actualizarDatosEstudiante(conexion, estudianteId, estudiante) {
//         try {
//             const [resultado] = await conexion.execute(`UPDATE estudiantes SET
//         nombres = ?,
//         apellidos = ?,
//         fecha_nacimiento = ?,
//         genero = ?,
//         tipo_cedula = ?,
//         cedula = ?,
//         cedula_escolar = ?
//         WHERE id = ?`,
//                 [
//                     estudiante.nombres,
//                     estudiante.apellidos,
//                     estudiante.fechaNacimiento,
//                     estudiante.genero,
//                     estudiante.tipoCedula,
//                     estudiante.cedula || null,
//                     estudiante.cedulaEscolar,
//                     estudianteId
//                 ]
//             );

//             return resultado;
//         } catch (error) {
//             if (error.code === 'ER_DUP_ENTRY') {
//                 if (error.message.includes('cedula')) {
//                     throw new Error('ERR_DUPLICATED_CEDULA_ESTUDIANTE');
//                 } else if (error.message.includes('cedula_escolar')) {
//                     throw new Error('ERR_DUPLICATED_CEDULA_ESCOLAR');
//                 }
//             }
//             throw error;
//         }

//     }

//     // async obtenerEstudiantePorId(conexion, estudianteId) {
//     //     let buscar = "id";
//     //     const query = estudiantesModel.cotruirQueryEstudiante(buscar);
//     //     const [rows] = await conexion.execute(query, [estudianteId]);
//     //     return rows[0];
//     // }

//     async obtenerEstudiantePorId(conexion, estudianteId) {
//         const query = `
//         SELECT 
//             e.*,
//             r.id as rep_id,
//             r.nombres as rep_nombres,
//             r.apellidos as rep_apellidos,
//             r.sexo as rep_sexo,
//             r.fecha_nacimiento as rep_fecha_nacimiento,
//             r.relacion,
//             r.email as rep_email,
//             r.telefono as rep_telefono,
//             r.ocupacion as rep_ocupacion,
//             r.tipo_cedula as rep_tipo_cedula,
//             r.cedula as rep_cedula,
//             r.created_at as rep_created_at
//         FROM estudiantes e
//         JOIN representantes r ON e.representante_id = r.id
//         WHERE e.id = ?
//     `;

//         const [rows] = await conexion.execute(query, [estudianteId]);
//         return rows[0];
//     }

//     async obtenerEstudiantePorCedulaoCiEscolar(conexion, cedula, cedulaEscolar) {
//         let buscar = "cedula";
//         const query = estudiantesModel.cotruirQueryEstudiante(buscar);
//         const [rows] = await conexion.execute(query, [cedula, cedulaEscolar]);
//         return rows[0];
//     }

//     // async obtenerTodosEstudiantes(filters) {
//     //     const { page = 1, limit = 10, search, sortBy = 'apellidos', sortOrder = 'asc', exportAll } = filters;

//     //     const finalLimit = exportAll ? 10000 : limit;
//     //     const finalPage = exportAll ? 1 : page;
//     //     const offset = (finalPage - 1) * finalLimit;

//     //     // Construir consulta base
//     //     let query = `
//     //   SELECT 
//     //     e.id,
//     //     e.nombres,
//     //     e.apellidos,
//     //     e.cedula,
//     //     e.cedula_escolar,
//     //     e.genero,
//     //     e.fecha_nacimiento,
//     //     r.nombres as rep_nombres,
//     //     r.apellidos as rep_apellidos,
//     //     r.cedula as rep_cedula,
//     //     r.telefono as rep_telefono
//     //   FROM estudiantes e
//     //   JOIN representantes r ON e.representante_id = r.id
//     // `;

//     //     const params = [];

//     //     // Añadir filtro de búsqueda si existe
//     //     if (search) {
//     //         query += `
//     //     WHERE e.nombres LIKE ? 
//     //     OR e.apellidos LIKE ? 
//     //     OR e.cedula LIKE ? 
//     //     OR e.cedula_escolar LIKE ?
//     //     OR r.nombres LIKE ?
//     //     OR r.apellidos LIKE ?
//     //   `;
//     //         const searchTerm = `%${search}%`;
//     //         params.push(...Array(6).fill(searchTerm));
//     //     }

//     //     // Añadir ordenamiento
//     //     query += ` ORDER BY ${sortBy} ${sortOrder === 'desc' ? 'DESC' : 'ASC'}`;

//     //     // Añadir paginación
//     //     query += ' LIMIT ? OFFSET ?';
//     //     params.push(parseInt(finalLimit), parseInt(offset));

//     //     // Ejecutar consulta
//     //     const [students] = await pool.query(query, params);

//     //     // Obtener conteo total para paginación
//     //     const [total] = await pool.query('SELECT COUNT(*) as total FROM estudiantes');

//     //     return {
//     //         students,
//     //         total: total[0].total
//     //     };
//     // }

//     async obtenerTodosEstudiantes(filters) {
//         const { page = 1, limit = 10, search, sortBy = 'apellidos', sortOrder = 'asc', exportAll } = filters;

//         const finalLimit = exportAll ? 10000 : limit;
//         const finalPage = exportAll ? 1 : page;
//         const offset = (finalPage - 1) * finalLimit;

//         // Construir consulta base
//         let query = `
//         SELECT 
//             e.id,
//             e.nombres,
//             e.apellidos,
//             e.cedula,
//             e.cedula_escolar,
//             e.genero,
//             e.fecha_nacimiento,
//             e.created_at,
//             -- Datos del representante
//             r.id as rep_id,
//             r.nombres as rep_nombres,
//             r.apellidos as rep_apellidos,
//             r.cedula as rep_cedula,
//             r.telefono as rep_telefono,
//             r.relacion as rep_relacion
//         FROM estudiantes e
//         JOIN representantes r ON e.representante_id = r.id
//         WHERE 1=1
//     `;

//         const params = [];

//         // Añadir filtro de búsqueda si existe
//         if (search) {
//             query += `
//             AND (
//                 e.nombres LIKE ? 
//                 OR e.apellidos LIKE ? 
//                 OR e.cedula LIKE ? 
//                 OR e.cedula_escolar LIKE ?
//                 OR r.nombres LIKE ?
//                 OR r.apellidos LIKE ?
//                 OR r.cedula LIKE ?
//             )
//         `;
//             const searchTerm = `%${search}%`;
//             params.push(...Array(7).fill(searchTerm));
//         }

//         // Añadir ordenamiento
//         const validSortColumns = ['apellidos', 'nombres', 'cedula', 'cedula_escolar', 'fecha_nacimiento', 'created_at'];
//         const sortColumn = validSortColumns.includes(sortBy) ? sortBy : 'apellidos';
//         const sortDirection = sortOrder === 'desc' ? 'DESC' : 'ASC';

//         query += ` ORDER BY e.${sortColumn} ${sortDirection}`;

//         // Obtener conteo total
//         let countQuery = `SELECT COUNT(*) as total FROM estudiantes e JOIN representantes r ON e.representante_id = r.id`;
//         if (search) {
//             countQuery += ` WHERE (
//             e.nombres LIKE ? 
//             OR e.apellidos LIKE ? 
//             OR e.cedula LIKE ? 
//             OR e.cedula_escolar LIKE ?
//             OR r.nombres LIKE ?
//             OR r.apellidos LIKE ?
//             OR r.cedula LIKE ?
//         )`;
//         }

//         const [totalResult] = search ?
//             await pool.query(countQuery, Array(7).fill(`%${search}%`)) :
//             await pool.query(countQuery);

//         const total = totalResult[0]?.total || 0;

//         // Añadir paginación
//         query += ' LIMIT ? OFFSET ?';
//         params.push(parseInt(finalLimit), parseInt(offset));

//         // Ejecutar consulta
//         const [rows] = await pool.query(query, params);

//         // Procesar resultados para crear la estructura requerida
//         const students = rows.map(row => ({
//             id: row.id,
//             nombres: row.nombres,
//             apellidos: row.apellidos,
//             cedula: row.cedula,
//             cedula_escolar: row.cedula_escolar,
//             genero: row.genero,
//             fecha_nacimiento: row.fecha_nacimiento,
//             created_at: row.created_at,
//             representante: {
//                 id: row.rep_id,
//                 nombres: row.rep_nombres,
//                 apellidos: row.rep_apellidos,
//                 cedula: row.rep_cedula,
//                 telefono: row.rep_telefono,
//                 relacion: row.rep_relacion
//             }
//         }));

//         return {
//             students,
//             total
//         };
//     }

//     async buscarEstudiantes(criterio) {
//         let query = `
//             SELECT 
//                 e.id,
//                 e.nombres as estudiante_nombres,
//                 e.apellidos as estudiante_apellidos,
//                 e.fecha_nacimiento,
//                 e.genero,
//                 e.tipo_cedula as estudiante_tipo_cedula,
//                 e.cedula as estudiante_cedula,
//                 e.cedula_escolar,
//                 e.representante_id,
//                 e.created_at as estudiante_created_at,

//                 -- Datos del representante
//                 r.id as representante_id,
//                 r.nombres as representante_nombres,
//                 r.apellidos as representante_apellidos,
//                 r.relacion,
//                 r.email as representante_email,
//                 r.telefono as representante_telefono,
//                 r.ocupacion,
//                 r.tipo_cedula as representante_tipo_cedula,
//                 r.cedula as representante_cedula,
//                 r.created_at as representante_created_at

//             FROM estudiantes e
//             INNER JOIN representantes r ON e.representante_id = r.id
//             WHERE 1 = 1
//         `;

//         const params = [];

//         // Si hay criterio de búsqueda
//         if (criterio && criterio.trim()) {
//             const searchTerm = `%${criterio}%`;

//             query += `
//                 AND (
//                     -- Búsqueda por nombre completo del estudiante
//                     CONCAT(e.nombres, ' ', e.apellidos) LIKE ?
//                     OR CONCAT(e.apellidos, ' ', e.nombres) LIKE ?

//                     -- Búsqueda por nombre individual del estudiante
//                     OR e.nombres LIKE ?
//                     OR e.apellidos LIKE ?

//                     -- Búsqueda por cédula del estudiante
//                     OR e.cedula LIKE ?

//                     -- Búsqueda por cédula escolar
//                     OR e.cedula_escolar LIKE ?

//                     -- Búsqueda por nombre completo del representante
//                     OR CONCAT(r.nombres, ' ', r.apellidos) LIKE ?

//                     -- Búsqueda por nombre individual del representante
//                     OR r.nombres LIKE ?
//                     OR r.apellidos LIKE ?

//                     -- Búsqueda por cédula del representante
//                     OR r.cedula LIKE ?
//                 )
//             `;

//             // Agregar 10 veces el mismo término para cada condición LIKE
//             for (let i = 0; i < 10; i++) {
//                 params.push(searchTerm);
//             }
//         }

//         query += ` ORDER BY e.apellidos, e.nombres LIMIT 50`;

//         const [rows] = await pool.execute(query, params);
//         return rows;
//     }

//     async buscarEstudiantesAvanzado(filtros) {
//         let query = `
//             SELECT 
//                 e.id,
//                 e.nombres as estudiante_nombres,
//                 e.apellidos as estudiante_apellidos,
//                 e.fecha_nacimiento,
//                 e.genero,
//                 e.tipo_cedula as estudiante_tipo_cedula,
//                 e.cedula as estudiante_cedula,
//                 e.cedula_escolar,
//                 e.representante_id,
//                 e.created_at as estudiante_created_at,

//                 r.id as representante_id,
//                 r.nombres as representante_nombres,
//                 r.apellidos as representante_apellidos,
//                 r.relacion,
//                 r.email as representante_email,
//                 r.telefono as representante_telefono,
//                 r.ocupacion,
//                 r.tipo_cedula as representante_tipo_cedula,
//                 r.cedula as representante_cedula,
//                 r.created_at as representante_created_at

//             FROM estudiantes e
//             INNER JOIN representantes r ON e.representante_id = r.id
//             WHERE 1 = 1
//         `;

//         const params = [];

//         // Aplicar filtros específicos
//         if (filtros.nombreEstudiante) {
//             query += ` AND (e.nombres LIKE ? OR e.apellidos LIKE ?)`;
//             const term = `%${filtros.nombreEstudiante}%`;
//             params.push(term, term);
//         }

//         if (filtros.cedulaEstudiante) {
//             query += ` AND e.cedula LIKE ?`;
//             params.push(`%${filtros.cedulaEstudiante}%`);
//         }

//         if (filtros.cedulaEscolar) {
//             query += ` AND e.cedula_escolar LIKE ?`;
//             params.push(`%${filtros.cedulaEscolar}%`);
//         }

//         if (filtros.nombreRepresentante) {
//             query += ` AND (r.nombres LIKE ? OR r.apellidos LIKE ?)`;
//             const term = `%${filtros.nombreRepresentante}%`;
//             params.push(term, term);
//         }

//         if (filtros.cedulaRepresentante) {
//             query += ` AND r.cedula LIKE ?`;
//             params.push(`%${filtros.cedulaRepresentante}%`);
//         }

//         if (filtros.genero) {
//             query += ` AND e.genero = ?`;
//             params.push(filtros.genero);
//         }

//         // Ordenar y limitar
//         query += ` ORDER BY e.apellidos, e.nombres`;

//         if (filtros.limit) {
//             query += ` LIMIT ?`;
//             params.push(filtros.limit);
//         } else {
//             query += ` LIMIT 50`;
//         }

//         const [rows] = await pool.execute(query, params);
//         return rows;
//     }


// }

// module.exports = new estudiantesModel()



const { pool, probarConexion } = require('../../config/baseDatos');

class estudiantesModel {
    //* Métodos del representante */
    async buscarCedulaRepresentante(cedula) {
        const [rows] = await pool.execute(
            `SELECT id FROM representantes WHERE cedula = ? LIMIT 1`,
            [cedula]
        );
        return rows;
    }

    async registrarRepresentante(conexion, representante) {
        try {
            const [resultado] = await conexion.execute(
                `INSERT INTO representantes 
            (nombres, apellidos, sexo, fecha_nacimiento, relacion, email, telefono, ocupacion, tipo_cedula, cedula) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    representante.nombres,
                    representante.apellidos,
                    representante.sexo,
                    representante.fecha_nacimiento || null,
                    representante.relacion,
                    representante.email || null,
                    representante.telefono,
                    representante.ocupacion || null,
                    representante.tipo_cedula,
                    representante.cedula
                ]
            );

            return resultado;
        } catch (error) {
            console.error('Error en registrarRepresentante:', error);

            if (error.code === 'ER_DUP_ENTRY') {
                try {
                    const [rows] = await pool.execute(
                        `SELECT id FROM representantes WHERE cedula = ? LIMIT 1`,
                        [representante.cedula]
                    );
                    const existingId = rows && rows.length ? rows[0].id : null;
                    const dupError = new Error('Cédula ya registrada');
                    dupError.code = 'CEDULA_DUPLICADA';
                    dupError.existingId = existingId;
                    throw dupError;
                } catch (innerSelectErr) {
                    console.error('Error al obtener id existente:', innerSelectErr);
                    throw error;
                }
            }

            throw error;
        }
    }

    async verificarRepresentante(conexion, representante) {
        const existeRepresentante = await this.buscarCedulaRepresentante(representante.cedula);

        if (existeRepresentante.length > 0) {
            console.log(`El representante existente con ID: ${existeRepresentante[0].id}`);
            return {
                representanteID: existeRepresentante[0].id,
                estaRegistrado: true
            };
        }

        const newRepresentante = await this.registrarRepresentante(conexion, representante);

        return {
            representanteID: newRepresentante.insertId,
            estaRegistrado: false
        };
    }

    async actualizarDatosRepresentante(conexion, representanteId, representante) {
        try {
            // Verificar duplicados antes de actualizar
            const [existeCedula] = await conexion.execute(
                `SELECT id FROM representantes WHERE cedula = ? AND id != ?`,
                [representante.cedula, representanteId]
            );

            if (existeCedula.length > 0) {
                throw new Error('ERR_DUPLICATED_CEDULA');
            }

            // Verificar email si es único
            if (representante.email) {
                const [existeEmail] = await conexion.execute(
                    `SELECT id FROM representantes WHERE email = ? AND id != ?`,
                    [representante.email, representanteId]
                );

                if (existeEmail.length > 0) {
                    throw new Error('ERR_DUPLICATED_EMAIL');
                }
            }

            const [resultado] = await conexion.execute(`UPDATE representantes SET
        nombres = ?,
        apellidos = ?,
        sexo = ?,
        fecha_nacimiento = ?,
        relacion = ?,
        email = ?,
        telefono = ?,
        ocupacion = ?,
        tipo_cedula = ?,
        cedula = ?
        WHERE id = ?`,
                [
                    representante.nombres,
                    representante.apellidos,
                    representante.sexo,
                    representante.fecha_nacimiento || null,
                    representante.relacion,
                    representante.email,
                    representante.telefono,
                    representante.ocupacion || null,
                    representante.tipo_cedula,
                    representante.cedula,
                    representanteId
                ]
            );
            return resultado;

        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                if (error.message.includes('cedula')) {
                    throw new Error('ERR_DUPLICATED_CEDULA');
                } else if (error.message.includes('email')) {
                    throw new Error('ERR_DUPLICATED_EMAIL');
                }
            }
            throw error;
        }
    }

    async obtenerIdRepresentante(conexion, estudianteId) {
        const [representanteId] = await conexion.execute(
            'SELECT representante_id FROM estudiantes WHERE id = ?',
            [estudianteId]
        );

        return representanteId.length > 0 ? representanteId[0].representante_id : null;
    }

    async eliminarRepresentanteSiNoTieneEstudiantes(conexion, representanteId) {
        const [otroEstudiante] = await conexion.query(
            'SELECT id FROM estudiantes WHERE representante_id = ?',
            [representanteId]
        );

        if (otroEstudiante.length === 0) {
            await conexion.query(
                'DELETE FROM representantes WHERE id = ?',
                [representanteId]
            );
        }
    }

    //* Auxiliares */
    verificarDuplicadoEstudiante(existeEstudiante, estudiante) {
        if (!existeEstudiante || existeEstudiante.length === 0) return;

        const existing = existeEstudiante[0];

        const isCedula = existing.cedula && estudiante.cedula && existing.cedula === estudiante.cedula;
        const isCedulaEscolar = existing.cedula_escolar && estudiante.cedulaEscolar && existing.cedula_escolar === estudiante.cedulaEscolar;

        const duplicateField = isCedula
            ? 'estudiantes.cedula'
            : isCedulaEscolar
                ? 'estudiantes.cedula_escolar'
                : (existing.cedula ? 'estudiantes.cedula' : 'estudiantes.cedula_escolar');

        const duplicateValue = isCedula
            ? estudiante.cedula
            : isCedulaEscolar
                ? estudiante.cedulaEscolar
                : (existing.cedula || existing.cedula_escolar || null);

        const error = new Error(`Estudiante ya registrado. Campo duplicado: ${duplicateField} (${duplicateValue})`);
        error.code = 'CEDULA_DUPLICADA';
        error.sqlCode = 'ER_DUP_ENTRY';
        error.field = duplicateField;
        error.value = duplicateValue;
        error.existingId = existing.id || null;
        error.status = 409;

        throw error;
    }

    //* Métodos del estudiante */
    async encontrarEstudiantePorCedula(estudiante) {
        let query = '';
        let params = [];
        const cedula = (estudiante.cedula || '').toString().trim();
        const cedulaEscolar = (estudiante.cedulaEscolar || '').toString().trim();

        if (cedula && cedulaEscolar) {
            query = `SELECT id, cedula, cedula_escolar FROM estudiantes WHERE cedula = ? OR cedula_escolar = ? LIMIT 1`;
            params = [cedula, cedulaEscolar];
        } else if (!cedula && cedulaEscolar) {
            query = `SELECT id, cedula, cedula_escolar FROM estudiantes WHERE cedula_escolar = ? LIMIT 1`;
            params = [cedulaEscolar];
        } else if (cedula && !cedulaEscolar) {
            query = `SELECT id, cedula, cedula_escolar FROM estudiantes WHERE cedula = ? LIMIT 1`;
            params = [cedula];
        }

        if (query) {
            const [rows] = await pool.execute(query, params);
            return rows;
        }

        return [];
    }

    async guardarFotoEstudiante(conexion, estudianteId, fotoData) {
        try {
            // Eliminar foto anterior si existe
            await conexion.execute(
                `DELETE FROM fotos_estudiantes WHERE estudiante_id = ?`,
                [estudianteId]
            );

            await conexion.execute(
                `INSERT INTO fotos_estudiantes 
            (estudiante_id, nombre_archivo, ruta, tipo_mime, tamano) 
            VALUES (?, ?, ?, ?, ?)`,
                [
                    estudianteId,
                    fotoData.filename,
                    fotoData.path,
                    fotoData.mimetype,
                    fotoData.size
                ]
            );
        } catch (error) {
            console.error("Error al guardar foto:", error);
        }
    }

    async registrarEstudiante(conexion, estudiante, representanteID) {
        console.log("Model: Datos para registrar estudiante:", estudiante);

        const [resultado] = await conexion.execute(
            `INSERT INTO estudiantes 
        (nombres, apellidos, fecha_nacimiento, genero, tiene_cedula, tipo_cedula, cedula, 
         cedula_escolar, nacionalidad, tipo_sangre, foto, direccion_estado, direccion_municipio, 
         direccion_parroquia, direccion_sector, direccion_calle, direccion_casa, direccion_referencia, 
         representante_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                estudiante.nombres,
                estudiante.apellidos,
                estudiante.fechaNacimiento,
                estudiante.sexo,
                estudiante.tieneCedula ? 1 : 0,
                estudiante.tipoCedula || null,
                estudiante.cedula || null,
                estudiante.cedulaEscolar,
                estudiante.nacionalidad,
                estudiante.tipoSangre || null,
                estudiante.foto ? estudiante.foto.filename : null,
                estudiante.direccion?.estado || null,
                estudiante.direccion?.municipio || null,
                estudiante.direccion?.parroquia || null,
                estudiante.direccion?.sector || null,
                estudiante.direccion?.calle || null,
                estudiante.direccion?.casa || null,
                estudiante.direccion?.referencia || null,
                representanteID
            ]
        );

        if (estudiante.foto) {
            await this.guardarFotoEstudiante(conexion, resultado.insertId, estudiante.foto);
        }

        return resultado;
    }

    async eliminarEstudiante(conexion, estudianteId) {
        const [resultado] = await conexion.execute(
            'DELETE FROM estudiantes WHERE id = ?',
            [estudianteId]
        );
        return resultado;
    }

    async actualizarDatosEstudianteCompleto(conexion, estudianteId, estudiante) {
        try {
            const [resultado] = await conexion.execute(`UPDATE estudiantes SET
        nombres = ?,
        apellidos = ?,
        fecha_nacimiento = ?,
        genero = ?,
        tiene_cedula = ?,
        tipo_cedula = ?,
        cedula = ?,
        cedula_escolar = ?,
        nacionalidad = ?,
        tipo_sangre = ?,
        foto = ?,
        direccion_estado = ?,
        direccion_municipio = ?,
        direccion_parroquia = ?,
        direccion_sector = ?,
        direccion_calle = ?,
        direccion_casa = ?,
        direccion_referencia = ?
        WHERE id = ?`,
                [
                    estudiante.nombres,
                    estudiante.apellidos,
                    estudiante.fechaNacimiento,
                    estudiante.sexo,
                    estudiante.tieneCedula ? 1 : 0,
                    estudiante.tipoCedula || null,
                    estudiante.cedula || null,
                    estudiante.cedulaEscolar,
                    estudiante.nacionalidad,
                    estudiante.tipoSangre || null,
                    estudiante.foto ? estudiante.foto.filename : estudiante.fotoActual ? estudiante.fotoActual : null,
                    estudiante.direccion?.estado || null,
                    estudiante.direccion?.municipio || null,
                    estudiante.direccion?.parroquia || null,
                    estudiante.direccion?.sector || null,
                    estudiante.direccion?.calle || null,
                    estudiante.direccion?.casa || null,
                    estudiante.direccion?.referencia || null,
                    estudianteId
                ]
            );

            return resultado;
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                if (error.message.includes('cedula')) {
                    throw new Error('ERR_DUPLICATED_CEDULA_ESTUDIANTE');
                } else if (error.message.includes('cedula_escolar')) {
                    throw new Error('ERR_DUPLICATED_CEDULA_ESCOLAR');
                }
            }
            throw error;
        }
    }

    async obtenerEstudianteCompletoPorId(conexion, estudianteId) {
        const query = `
        SELECT 
            e.*,
            r.id as rep_id,
            r.nombres as rep_nombres,
            r.apellidos as rep_apellidos,
            r.sexo as rep_sexo,
            r.fecha_nacimiento as rep_fecha_nacimiento,
            r.relacion,
            r.email as rep_email,
            r.telefono as rep_telefono,
            r.ocupacion as rep_ocupacion,
            r.tipo_cedula as rep_tipo_cedula,
            r.cedula as rep_cedula,
            r.created_at as rep_created_at,
            fe.nombre_archivo as foto_nombre,
            fe.ruta as foto_ruta,
            fe.tipo_mime as foto_tipo,
            fe.tamano as foto_tamano
        FROM estudiantes e
        LEFT JOIN representantes r ON e.representante_id = r.id
        LEFT JOIN fotos_estudiantes fe ON e.id = fe.estudiante_id
        WHERE e.id = ?
    `;

        const [rows] = await conexion.execute(query, [estudianteId]);
        return rows[0];
    }

    async obtenerEstudiantePorCedulaoCiEscolar(conexion, cedula, cedulaEscolar) {
        const query = `
        SELECT 
            e.*,
            r.id as rep_id,
            r.nombres as rep_nombres,
            r.apellidos as rep_apellidos,
            r.sexo as rep_sexo,
            r.fecha_nacimiento as rep_fecha_nacimiento,
            r.relacion,
            r.email as rep_email,
            r.telefono as rep_telefono,
            r.ocupacion as rep_ocupacion,
            r.tipo_cedula as rep_tipo_cedula,
            r.cedula as rep_cedula,
            r.created_at as rep_created_at,
            fe.nombre_archivo as foto_nombre,
            fe.ruta as foto_ruta
        FROM estudiantes e
        LEFT JOIN representantes r ON e.representante_id = r.id
        LEFT JOIN fotos_estudiantes fe ON e.id = fe.estudiante_id
        WHERE e.cedula = ? OR e.cedula_escolar = ?
        LIMIT 1
    `;

        const [rows] = await conexion.execute(query, [cedula, cedulaEscolar]);
        return rows[0];
    }
    //!Vieja
    // async obtenerTodosEstudiantes(filters) {
    //     const {
    //         page = 1,
    //         limit = 50,
    //         search,
    //         sortBy = 'apellidos',
    //         sortOrder = 'asc',
    //         exportAll,
    //         genero,
    //         nacionalidad,
    //         estado,
    //         tipoSangre,        // NUEVO
    //         tieneCedula,       // NUEVO
    //         fechaDesde,        // NUEVO
    //         fechaHasta         // NUEVO
    //     } = filters;

    //     const finalLimit = exportAll ? 10000 : limit;
    //     const finalPage = exportAll ? 1 : page;
    //     const offset = (finalPage - 1) * finalLimit;

    //     let query = `
    //     SELECT 
    //         e.id,
    //         e.nombres,
    //         e.apellidos,
    //         e.cedula,
    //         e.tipo_cedula,
    //         e.tiene_cedula,
    //         e.cedula_escolar,
    //         e.sexo as genero,
    //         e.fecha_nacimiento,
    //         e.created_at,
    //         e.nacionalidad,
    //         e.direccion_estado,
    //         e.tipo_sangre,        /* NUEVO CAMPO */
    //         e.foto,
    //         r.id as rep_id,
    //         r.nombres as rep_nombres,
    //         r.apellidos as rep_apellidos,
    //         r.cedula as rep_cedula,
    //         r.telefono as rep_telefono,
    //         r.relacion as rep_relacion
    //     FROM estudiantes e
    //     JOIN representantes r ON e.representante_id = r.id
    //     WHERE 1=1
    // `;

    //     const params = [];

    //     // Filtro de búsqueda
    //     if (search) {
    //         query += `
    //         AND (
    //             e.nombres LIKE ? 
    //             OR e.apellidos LIKE ? 
    //             OR e.cedula LIKE ? 
    //             OR e.cedula_escolar LIKE ?
    //             OR r.nombres LIKE ?
    //             OR r.apellidos LIKE ?
    //             OR r.cedula LIKE ?
    //         )
    //     `;
    //         const searchTerm = `%${search}%`;
    //         params.push(...Array(7).fill(searchTerm));
    //     }

    //     // Filtros adicionales
    //     if (genero && genero !== 'todos') {
    //         query += ` AND e.sexo = ?`;
    //         params.push(genero);
    //     }

    //     if (nacionalidad && nacionalidad !== 'todos') {
    //         if (nacionalidad === 'Venezolana') {
    //             query += ` AND e.nacionalidad LIKE ?`;
    //             params.push('%Venezolana%');
    //         } else {
    //             query += ` AND e.nacionalidad = ?`;
    //             params.push(nacionalidad);
    //         }
    //     }

    //     if (estado && estado !== 'todos') {
    //         query += ` AND e.direccion_estado = ?`;
    //         params.push(estado);
    //     }

    //     // 🔥 NUEVO: Filtro por tipo de sangre
    //     if (tipoSangre && tipoSangre !== 'todos') {
    //         query += ` AND e.tipo_sangre = ?`;
    //         params.push(tipoSangre);
    //     }

    //     // 🔥 NUEVO: Filtro por tiene cédula
    //     if (tieneCedula && tieneCedula !== 'todos') {
    //         if (tieneCedula === 'si') {
    //             query += ` AND e.tiene_cedula = 1 AND e.cedula IS NOT NULL AND e.cedula != ''`;
    //         } else if (tieneCedula === 'no') {
    //             query += ` AND (e.tiene_cedula = 0 OR e.tiene_cedula IS NULL OR e.cedula IS NULL OR e.cedula = '')`;
    //         }
    //     }

    //     // 🔥 NUEVO: Filtro por rango de edad (fecha de nacimiento)
    //     if (fechaDesde) {
    //         query += ` AND e.fecha_nacimiento >= ?`;
    //         params.push(fechaDesde);
    //     }

    //     if (fechaHasta) {
    //         query += ` AND e.fecha_nacimiento <= ?`;
    //         params.push(fechaHasta);
    //     }

    //     // Ordenamiento
    //     const validSortColumns = ['apellidos', 'nombres', 'cedula', 'cedula_escolar', 'fecha_nacimiento', 'created_at'];
    //     const sortColumn = validSortColumns.includes(sortBy) ? sortBy : 'apellidos';
    //     const sortDirection = sortOrder === 'desc' ? 'DESC' : 'ASC';

    //     query += ` ORDER BY e.${sortColumn} ${sortDirection}`;

    //     // Obtener conteo total
    //     let countQuery = `
    //     SELECT COUNT(*) as total 
    //     FROM estudiantes e 
    //     JOIN representantes r ON e.representante_id = r.id 
    //     WHERE 1=1
    // `;
    //     const countParams = [];

    //     if (search) {
    //         countQuery += ` AND (
    //         e.nombres LIKE ? 
    //         OR e.apellidos LIKE ? 
    //         OR e.cedula LIKE ? 
    //         OR e.cedula_escolar LIKE ?
    //         OR r.nombres LIKE ?
    //         OR r.apellidos LIKE ?
    //         OR r.cedula LIKE ?
    //     )`;
    //         const searchTerm = `%${search}%`;
    //         countParams.push(...Array(7).fill(searchTerm));
    //     }

    //     if (genero && genero !== 'todos') {
    //         countQuery += ` AND e.sexo = ?`;
    //         countParams.push(genero);
    //     }

    //     if (nacionalidad && nacionalidad !== 'todos') {
    //         if (nacionalidad === 'Venezolana') {
    //             countQuery += ` AND e.nacionalidad LIKE ?`;
    //             countParams.push('%Venezolana%');
    //         } else {
    //             countQuery += ` AND e.nacionalidad = ?`;
    //             countParams.push(nacionalidad);
    //         }
    //     }

    //     if (estado && estado !== 'todos') {
    //         countQuery += ` AND e.direccion_estado = ?`;
    //         countParams.push(estado);
    //     }

    //     if (tipoSangre && tipoSangre !== 'todos') {
    //         countQuery += ` AND e.tipo_sangre = ?`;
    //         countParams.push(tipoSangre);
    //     }

    //     if (tieneCedula && tieneCedula !== 'todos') {
    //         if (tieneCedula === 'si') {
    //             countQuery += ` AND e.tiene_cedula = 1 AND e.cedula IS NOT NULL AND e.cedula != ''`;
    //         } else if (tieneCedula === 'no') {
    //             countQuery += ` AND (e.tiene_cedula = 0 OR e.tiene_cedula IS NULL OR e.cedula IS NULL OR e.cedula = '')`;
    //         }
    //     }

    //     if (fechaDesde) {
    //         countQuery += ` AND e.fecha_nacimiento >= ?`;
    //         countParams.push(fechaDesde);
    //     }

    //     if (fechaHasta) {
    //         countQuery += ` AND e.fecha_nacimiento <= ?`;
    //         countParams.push(fechaHasta);
    //     }

    //     const [totalResult] = await pool.query(countQuery, countParams);
    //     const total = totalResult[0]?.total || 0;

    //     // Añadir paginación
    //     query += ' LIMIT ? OFFSET ?';
    //     params.push(parseInt(finalLimit), parseInt(offset));

    //     // Ejecutar consulta
    //     const [rows] = await pool.query(query, params);

    //     const students = rows.map(row => ({
    //         id: row.id,
    //         nombres: row.nombres,
    //         apellidos: row.apellidos,
    //         nombreCompleto: `${row.nombres} ${row.apellidos}`.trim(),
    //         cedula: row.cedula,
    //         tipoCedula: row.tipo_cedula,
    //         tieneCedula: row.tiene_cedula === 1,
    //         cedula_escolar: row.cedula_escolar,
    //         sexo: row.genero,
    //         fecha_nacimiento: row.fecha_nacimiento,
    //         edad: this.calcularEdad(row.fecha_nacimiento),
    //         created_at: row.created_at,
    //         nacionalidad: row.nacionalidad,
    //         direccion_estado: row.direccion_estado,
    //         tipo_sangre: row.tipo_sangre,
    //         foto: row.foto,
    //         fotoUrl: row.foto ? `${process.env.API_URL || 'http://localhost:3000'}/api/carpeta-estudiantes/${row.foto}` : null,
    //         representante: {
    //             id: row.rep_id,
    //             nombres: row.rep_nombres,
    //             apellidos: row.rep_apellidos,
    //             nombreCompleto: `${row.rep_nombres || ''} ${row.rep_apellidos || ''}`.trim(),
    //             cedula: row.rep_cedula,
    //             telefono: row.rep_telefono,
    //             relacion: row.rep_relacion
    //         }
    //     }));

    //     return {
    //         students,
    //         total
    //     };
    // }

    async obtenerTodosEstudiantes(filters) {
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

        const finalLimit = exportAll ? 10000 : limit;
        const finalPage = exportAll ? 1 : page;
        const offset = (finalPage - 1) * finalLimit;

        let query = `
            SELECT 
                e.id,
                e.nombres,
                e.apellidos,
                e.cedula,
                e.tipo_cedula,
                e.tiene_cedula,
                e.cedula_escolar,
                e.genero,
                e.fecha_nacimiento,
                e.created_at,
                e.nacionalidad,
                e.direccion_estado,
                e.tipo_sangre,
                e.foto,
                r.id as rep_id,
                r.nombres as rep_nombres,
                r.apellidos as rep_apellidos,
                r.cedula as rep_cedula,
                r.telefono as rep_telefono,
                r.relacion as rep_relacion,
                r.sexo as rep_sexo
            FROM estudiantes e
            JOIN representantes r ON e.representante_id = r.id
            WHERE 1=1
        `;

        const params = [];

        // Búsqueda por texto
        if (search) {
            query += `
                AND (
                    e.nombres LIKE ? 
                    OR e.apellidos LIKE ? 
                    OR e.cedula LIKE ? 
                    OR e.cedula_escolar LIKE ?
                    OR r.nombres LIKE ?
                    OR r.apellidos LIKE ?
                    OR r.cedula LIKE ?
                )
            `;
            const searchTerm = `%${search}%`;
            params.push(...Array(7).fill(searchTerm));
        }

        // Filtro por género
        if (genero && genero !== 'todos') {
            query += ` AND e.genero = ?`;
            params.push(genero);
        }

        // Filtro por nacionalidad
        if (nacionalidad && nacionalidad !== 'todos') {
            if (nacionalidad === 'Venezolana') {
                query += ` AND e.nacionalidad LIKE ?`;
                params.push('%Venezolana%');
            } else {
                query += ` AND e.nacionalidad = ?`;
                params.push(nacionalidad);
            }
        }

        // Filtro por estado
        if (estado && estado !== 'todos') {
            query += ` AND e.direccion_estado = ?`;
            params.push(estado);
        }

        // 🔥 NUEVO: Filtro por tipo de sangre
        if (tipoSangre && tipoSangre !== 'todos') {
            query += ` AND e.tipo_sangre = ?`;
            params.push(tipoSangre);
        }

        // 🔥 NUEVO: Filtro por tiene cédula
        if (tieneCedula && tieneCedula !== 'todos') {
            if (tieneCedula === 'si') {
                query += ` AND e.tiene_cedula = 1 AND e.cedula IS NOT NULL AND e.cedula != ''`;
            } else if (tieneCedula === 'no') {
                query += ` AND (e.tiene_cedula = 0 OR e.tiene_cedula IS NULL OR e.cedula IS NULL OR e.cedula = '')`;
            }
        }

        // 🔥 NUEVO: Filtro por rango de fechas - CORREGIDO
        let fechaInicio = fechaDesde;
        let fechaFin = fechaHasta;

        // Si las fechas están invertidas, corregirlas automáticamente
        if (fechaDesde && fechaHasta && fechaDesde > fechaHasta) {
            fechaInicio = fechaHasta;
            fechaFin = fechaDesde;
        }

        if (fechaInicio) {
            query += ` AND e.fecha_nacimiento >= ?`;
            params.push(fechaInicio);
        }

        if (fechaFin) {
            query += ` AND e.fecha_nacimiento <= ?`;
            params.push(fechaFin);
        }

        // Ordenamiento
        const validSortColumns = ['apellidos', 'nombres', 'cedula', 'cedula_escolar', 'fecha_nacimiento', 'created_at'];
        const sortColumn = validSortColumns.includes(sortBy) ? sortBy : 'apellidos';
        const sortDirection = sortOrder === 'desc' ? 'DESC' : 'ASC';

        query += ` ORDER BY e.${sortColumn} ${sortDirection}`;

        // ========== COUNT QUERY ==========
        let countQuery = `
            SELECT COUNT(*) as total 
            FROM estudiantes e 
            JOIN representantes r ON e.representante_id = r.id 
            WHERE 1=1
        `;
        const countParams = [];

        if (search) {
            countQuery += ` AND (
                e.nombres LIKE ? 
                OR e.apellidos LIKE ? 
                OR e.cedula LIKE ? 
                OR e.cedula_escolar LIKE ?
                OR r.nombres LIKE ?
                OR r.apellidos LIKE ?
                OR r.cedula LIKE ?
            )`;
            const searchTerm = `%${search}%`;
            countParams.push(...Array(7).fill(searchTerm));
        }

        if (genero && genero !== 'todos') {
            countQuery += ` AND e.genero = ?`;
            countParams.push(genero);
        }

        if (nacionalidad && nacionalidad !== 'todos') {
            if (nacionalidad === 'Venezolana') {
                countQuery += ` AND e.nacionalidad LIKE ?`;
                countParams.push('%Venezolana%');
            } else {
                countQuery += ` AND e.nacionalidad = ?`;
                countParams.push(nacionalidad);
            }
        }

        if (estado && estado !== 'todos') {
            countQuery += ` AND e.direccion_estado = ?`;
            countParams.push(estado);
        }

        if (tipoSangre && tipoSangre !== 'todos') {
            countQuery += ` AND e.tipo_sangre = ?`;
            countParams.push(tipoSangre);
        }

        if (tieneCedula && tieneCedula !== 'todos') {
            if (tieneCedula === 'si') {
                countQuery += ` AND e.tiene_cedula = 1 AND e.cedula IS NOT NULL AND e.cedula != ''`;
            } else if (tieneCedula === 'no') {
                countQuery += ` AND (e.tiene_cedula = 0 OR e.tiene_cedula IS NULL OR e.cedula IS NULL OR e.cedula = '')`;
            }
        }

        if (fechaInicio) {
            countQuery += ` AND e.fecha_nacimiento >= ?`;
            countParams.push(fechaInicio);
        }

        if (fechaFin) {
            countQuery += ` AND e.fecha_nacimiento <= ?`;
            countParams.push(fechaFin);
        }

        // Ejecutar COUNT
        const [totalResult] = await pool.query(countQuery, countParams);
        const total = totalResult[0]?.total || 0;

        // Añadir paginación
        query += ' LIMIT ? OFFSET ?';
        params.push(parseInt(finalLimit), parseInt(offset));

        // Ejecutar consulta principal
        const [rows] = await pool.query(query, params);

        // Mapear resultados
        const students = rows.map(row => ({
            id: row.id,
            nombres: row.nombres,
            apellidos: row.apellidos,
            nombreCompleto: `${row.nombres} ${row.apellidos}`.trim(),
            cedula: row.cedula,
            tipoCedula: row.tipo_cedula,
            tieneCedula: row.tiene_cedula === 1,
            cedula_escolar: row.cedula_escolar,
            genero: row.genero,
            fecha_nacimiento: row.fecha_nacimiento,
            edad: this.calcularEdad ? this.calcularEdad(row.fecha_nacimiento) : null,
            created_at: row.created_at,
            nacionalidad: row.nacionalidad,
            direccion_estado: row.direccion_estado,
            tipo_sangre: row.tipo_sangre,
            foto: row.foto,
            fotoUrl: row.foto ? `${process.env.API_URL || 'http://localhost:3000'}/api/carpeta-estudiantes/${row.foto}` : null,
            representante: {
                id: row.rep_id,
                nombres: row.rep_nombres,
                apellidos: row.rep_apellidos,
                nombreCompleto: `${row.rep_nombres || ''} ${row.rep_apellidos || ''}`.trim(),
                cedula: row.rep_cedula,
                telefono: row.rep_telefono,
                relacion: row.rep_relacion,
                sexo: row.rep_sexo
            }
        }));

        return {
            students,
            total
        };
    }

    async buscarEstudiantes(criterio, limit = 50, offset = 0, tipoBusqueda = 'general') {
        let query = `
            SELECT 
                e.id,
                e.nombres as estudiante_nombres,
                e.apellidos as estudiante_apellidos,
                e.fecha_nacimiento,
                e.genero,
                e.tipo_cedula as estudiante_tipo_cedula,
                e.cedula as estudiante_cedula,
                e.cedula_escolar,
                e.foto,
                e.representante_id,
                e.created_at as estudiante_created_at,
                
                r.id as representante_id,
                r.nombres as representante_nombres,
                r.apellidos as representante_apellidos,
                r.relacion,
                r.email as representante_email,
                r.telefono as representante_telefono,
                r.ocupacion,
                r.tipo_cedula as representante_tipo_cedula,
                r.cedula as representante_cedula,
                r.created_at as representante_created_at
                
            FROM estudiantes e
            INNER JOIN representantes r ON e.representante_id = r.id
            WHERE 1 = 1
        `;

        const params = [];

        if (criterio && criterio.trim()) {
            const searchTerm = `%${criterio}%`;

            if (tipoBusqueda === 'estudiante') {
                query += `
                    AND (
                        CONCAT(e.nombres, ' ', e.apellidos) LIKE ?
                        OR e.nombres LIKE ?
                        OR e.apellidos LIKE ?
                        OR e.cedula LIKE ?
                        OR e.cedula_escolar LIKE ?
                    )
                `;
                params.push(...Array(5).fill(searchTerm));
            } else if (tipoBusqueda === 'representante') {
                query += `
                    AND (
                        CONCAT(r.nombres, ' ', r.apellidos) LIKE ?
                        OR r.nombres LIKE ?
                        OR r.apellidos LIKE ?
                        OR r.cedula LIKE ?
                    )
                `;
                params.push(...Array(4).fill(searchTerm));
            } else {
                query += `
                    AND (
                        CONCAT(e.nombres, ' ', e.apellidos) LIKE ?
                        OR e.nombres LIKE ?
                        OR e.apellidos LIKE ?
                        OR e.cedula LIKE ?
                        OR e.cedula_escolar LIKE ?
                        OR CONCAT(r.nombres, ' ', r.apellidos) LIKE ?
                        OR r.nombres LIKE ?
                        OR r.apellidos LIKE ?
                        OR r.cedula LIKE ?
                    )
                `;
                params.push(...Array(9).fill(searchTerm));
            }
        }

        query += ` ORDER BY e.apellidos, e.nombres LIMIT ? OFFSET ?`;
        params.push(parseInt(limit), parseInt(offset));

        const [rows] = await pool.execute(query, params);
        return rows;
    }

    async contarEstudiantesBusqueda(criterio, tipoBusqueda = 'general') {
        let query = `
            SELECT COUNT(*) as total
            FROM estudiantes e
            INNER JOIN representantes r ON e.representante_id = r.id
            WHERE 1 = 1
        `;

        const params = [];

        if (criterio && criterio.trim()) {
            const searchTerm = `%${criterio}%`;

            if (tipoBusqueda === 'estudiante') {
                query += `
                    AND (
                        CONCAT(e.nombres, ' ', e.apellidos) LIKE ?
                        OR e.nombres LIKE ?
                        OR e.apellidos LIKE ?
                        OR e.cedula LIKE ?
                        OR e.cedula_escolar LIKE ?
                    )
                `;
                params.push(...Array(5).fill(searchTerm));
            } else if (tipoBusqueda === 'representante') {
                query += `
                    AND (
                        CONCAT(r.nombres, ' ', r.apellidos) LIKE ?
                        OR r.nombres LIKE ?
                        OR r.apellidos LIKE ?
                        OR r.cedula LIKE ?
                    )
                `;
                params.push(...Array(4).fill(searchTerm));
            } else {
                query += `
                    AND (
                        CONCAT(e.nombres, ' ', e.apellidos) LIKE ?
                        OR e.nombres LIKE ?
                        OR e.apellidos LIKE ?
                        OR e.cedula LIKE ?
                        OR e.cedula_escolar LIKE ?
                        OR CONCAT(r.nombres, ' ', r.apellidos) LIKE ?
                        OR r.nombres LIKE ?
                        OR r.apellidos LIKE ?
                        OR r.cedula LIKE ?
                    )
                `;
                params.push(...Array(9).fill(searchTerm));
            }
        }

        const [rows] = await pool.execute(query, params);
        return rows[0]?.total || 0;
    }

    async buscarEstudiantesAvanzado(filtros) {
        let query = `
            SELECT 
                e.id,
                e.nombres as estudiante_nombres,
                e.apellidos as estudiante_apellidos,
                e.fecha_nacimiento,
                e.genero,
                e.tipo_cedula as estudiante_tipo_cedula,
                e.cedula as estudiante_cedula,
                e.cedula_escolar,
                e.representante_id,
                e.created_at as estudiante_created_at,
                
                r.id as representante_id,
                r.nombres as representante_nombres,
                r.apellidos as representante_apellidos,
                r.relacion,
                r.email as representante_email,
                r.telefono as representante_telefono,
                r.ocupacion,
                r.tipo_cedula as representante_tipo_cedula,
                r.cedula as representante_cedula,
                r.created_at as representante_created_at
                
            FROM estudiantes e
            INNER JOIN representantes r ON e.representante_id = r.id
            WHERE 1 = 1
        `;

        const params = [];

        if (filtros.nombreEstudiante) {
            query += ` AND (e.nombres LIKE ? OR e.apellidos LIKE ?)`;
            const term = `%${filtros.nombreEstudiante}%`;
            params.push(term, term);
        }

        if (filtros.cedulaEstudiante) {
            query += ` AND e.cedula LIKE ?`;
            params.push(`%${filtros.cedulaEstudiante}%`);
        }

        if (filtros.cedulaEscolar) {
            query += ` AND e.cedula_escolar LIKE ?`;
            params.push(`%${filtros.cedulaEscolar}%`);
        }

        if (filtros.nombreRepresentante) {
            query += ` AND (r.nombres LIKE ? OR r.apellidos LIKE ?)`;
            const term = `%${filtros.nombreRepresentante}%`;
            params.push(term, term);
        }

        if (filtros.cedulaRepresentante) {
            query += ` AND r.cedula LIKE ?`;
            params.push(`%${filtros.cedulaRepresentante}%`);
        }

        if (filtros.genero) {
            query += ` AND e.genero = ?`;
            params.push(filtros.genero);
        }

        query += ` ORDER BY e.apellidos, e.nombres`;

        if (filtros.limit) {
            query += ` LIMIT ?`;
            params.push(filtros.limit);
        } else {
            query += ` LIMIT 50`;
        }

        const [rows] = await pool.execute(query, params);
        return rows;
    }

    // Agrega esta función al final de tu modelo
    calcularEdad(fechaNacimiento) {
        if (!fechaNacimiento) return null;
        try {
            const hoy = new Date();
            const nacimiento = new Date(fechaNacimiento);
            let edad = hoy.getFullYear() - nacimiento.getFullYear();
            const mes = hoy.getMonth() - nacimiento.getMonth();

            if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
                edad--;
            }
            return edad;
        } catch (error) {
            return null;
        }
    }

}

module.exports = new estudiantesModel();