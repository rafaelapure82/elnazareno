export class UsuarioAdaptador {
    static fromApi(usuarioData) {
        return {
            id: usuarioData.id,
            nombre: usuarioData.nombre,
            usuario: usuarioData.usuario,
            correo: usuarioData.correo,
            rol: usuarioData.rol,
            ultimoLogin: usuarioData.ultimo_login ? new Date(usuarioData.ultimo_login) : null
        };
    }

    static toApi(usuario) {
        return {
            nombre: usuario.nombre,
            usuario: usuario.usuario,
            correo: usuario.correo,
            rol: usuario.rol,
            password: usuario.password
        };
    }

    static toApiUpdate(usuario) {
        return {
            nombre: usuario.nombre,
            usuario: usuario.usuario,
            correo: usuario.correo,
            rol: usuario.rol
        };
    }
}