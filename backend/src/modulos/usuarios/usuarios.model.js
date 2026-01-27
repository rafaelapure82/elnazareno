const { pool } = require('../../config/baseDatos');


class usuariosModel {
    async obtenerTodosUsuarios() {
        try {
            const [rows] = await pool.query('SELECT id, nombre, usuario, correo, rol, ultimo_login  FROM usuarios');
            return rows;
        } catch (error) {
            throw new Error('Error al obtener usuarios desde la base de datos, ' + error.message);
        }
    }

    async buscarUsuarios(filtros = {}, offset = 0, limite = 10) {
        try {
            // Convertir a números para asegurar tipos correctos
            const offsetNum = parseInt(offset) || 0;
            const limiteNum = parseInt(limite) || 10;

            let query = `
                SELECT id, nombre, usuario, correo, rol, ultimo_login 
                FROM usuarios 
                WHERE 1=1
            `;

            const params = [];

            // Aplicar filtro de búsqueda si existe
            if (filtros.search && filtros.search.trim() !== '') {
                query += ` AND (
                    nombre LIKE ? OR 
                    usuario LIKE ? OR 
                    correo LIKE ?
                )`;
                const searchTerm = `%${filtros.search.trim()}%`;
                params.push(searchTerm, searchTerm, searchTerm);
            }

            // Aplicar filtro de rol si existe
            if (filtros.rol && (filtros.rol === 'administrador' || filtros.rol === 'usuario')) {
                query += ` AND rol = ?`;
                params.push(filtros.rol);
            }

            // Ordenar y paginar - agregar LIMIT y OFFSET solo si hay paginación
            query += ` ORDER BY nombre ASC`;

            if (limiteNum > 0) {
                query += ` LIMIT ?`;
                params.push(limiteNum);

                if (offsetNum > 0) {
                    query += ` OFFSET ?`;
                    params.push(offsetNum);
                }
            }

            console.log('Query ejecutada:', query);
            console.log('Parámetros:', params);
            console.log('Tipos de parámetros:', params.map(p => typeof p));

            const [rows] = await pool.execute(query, params);
            return rows;
        } catch (error) {
            console.error('Error detallado en buscarUsuarios:', error);
            // Para debug: mostrar el error completo
            if (error.sql) {
                console.error('SQL Error:', error.sql);
                console.error('SQL Message:', error.sqlMessage);
            }
            throw error;
        }
    }

    async contarUsuarios(filtros = {}) {
        try {
            let query = `SELECT COUNT(*) as total FROM usuarios WHERE 1=1`;
            const params = [];

            // Aplicar filtro de búsqueda si existe
            if (filtros.search && filtros.search.trim() !== '') {
                query += ` AND (
                    nombre LIKE ? OR 
                    usuario LIKE ? OR 
                    correo LIKE ?
                )`;
                const searchTerm = `%${filtros.search.trim()}%`;
                params.push(searchTerm, searchTerm, searchTerm);
            }

            // Aplicar filtro de rol si existe
            if (filtros.rol && (filtros.rol === 'administrador' || filtros.rol === 'usuario')) {
                query += ` AND rol = ?`;
                params.push(filtros.rol);
            }

            console.log('Query count:', query);
            console.log('Params count:', params);

            const [rows] = await pool.execute(query, params);
            return rows[0].total;
        } catch (error) {
            console.error('Error en contarUsuarios:', error);
            throw error;
        }
    }


    async buscarUsuariosSimple(filtros = {}) {
        try {
            let query = `
                SELECT id, nombre, usuario, correo, rol, ultimo_login 
                FROM usuarios 
                WHERE 1=1
            `;

            const params = [];

            if (filtros.search && filtros.search.trim() !== '') {
                query += ` AND (
                    nombre LIKE ? OR 
                    usuario LIKE ? OR 
                    correo LIKE ?
                )`;
                const searchTerm = `%${filtros.search.trim()}%`;
                params.push(searchTerm, searchTerm, searchTerm);
            }

            if (filtros.rol && (filtros.rol === 'administrador' || filtros.rol === 'usuario')) {
                query += ` AND rol = ?`;
                params.push(filtros.rol);
            }

            query += ` ORDER BY nombre ASC`;
            const [rows] = await pool.execute(query, params);
            return rows;
        } catch (error) {
            console.error('Error en buscarUsuariosSimple:', error);
            throw error;
        }
    }

    async obtenerUsuarioPorId(id) {
        const [rows] = await pool.query(
            'SELECT id, nombre, usuario, correo, rol,ultimo_login FROM usuarios WHERE id = ?',
            [id]
        );
        return rows[0];
    }

    async obtenerUsuarioNormalPorId(id) {
        const [rows] = await pool.query(
            'SELECT id, nombre, usuario, correo FROM usuarios WHERE id = ?',
            [id]
        );
        return rows[0];
    }

    async crearUsuario(usuarioData) {
        const { nombre, usuario, correo, rol, password } = usuarioData;
        const [resultado] = await pool.query(
            'INSERT INTO usuarios (nombre, usuario, correo, rol, contraseña) VALUES (?, ?, ?, ?, ?)',
            [nombre, usuario, correo, rol || 'usuario', password]
        );
        return { id: resultado.insertId, nombre, usuario, correo, rol: rol || 'usuario' };
    }

    async encontrarPorUsuario(usuario) {
        const [rows] = await pool.query(
            'SELECT * FROM usuarios WHERE usuario = ?',
            [usuario]
        );
        return rows[0];
    }

    async encontrarPorCorreo(correo) {
        const [rows] = await pool.query(
            'SELECT * FROM usuarios WHERE correo = ?',
            [correo]
        );
        return rows[0];

    }

    async actualizarUsuario(id, usuarioData) {
        const { nombre, usuario, correo, rol } = usuarioData;
        const [resultado] = await pool.query(
            'UPDATE usuarios SET nombre = ?, usuario = ?, correo = ?, rol = ? WHERE id = ?',
            [nombre, usuario, correo, rol || "usuario", id]
        );
        return resultado.affectedRows > 0;
    }

    async eliminarUsuario(id) {
        const [resultado] = await pool.query(
            'DELETE FROM usuarios WHERE id = ?',
            [id]
        );
        return resultado.affectedRows > 0;
    }

    async actualizarUsuarioNormal(id, usuarioData) {
        const { nombre, usuario, correo } = usuarioData;
        const [resultado] = await pool.query(
            'UPDATE usuarios SET nombre = ?, usuario = ?, correo = ? WHERE id = ?',
            [nombre, usuario, correo, id]
        );
        return resultado.affectedRows > 0;
    }

    async obtenerContrasena(id) {
        const [rows] = await pool.query(
            'SELECT contraseña FROM usuarios WHERE id = ?',
            [id]
        );
        return rows[0];
    }
    async actualizarContrasena(id, contrasena) {
        const [resultado] = await pool.query(
            'UPDATE usuarios SET contraseña = ? WHERE id = ?',
            [contrasena, id]
        );
        return resultado.affectedRows > 0;
    }
}
module.exports = new usuariosModel();