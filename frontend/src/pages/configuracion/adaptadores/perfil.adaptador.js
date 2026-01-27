export class PerfilAdaptador {

    //? Adapta los datos del backend al formato esperado por el frontend

    static adaptarPerfil(datosBackend) {
        return {
            id: datosBackend.id,
            nombre: datosBackend.nombre,
            usuario: datosBackend.usuario,
            correo: datosBackend.correo
        };
    }


    //?  Adapta los datos del frontend al formato esperado por el backend para actualizar perfil

    static adaptarActualizacionPerfil(datosFrontend) {
        return {
            nombre: datosFrontend.nombre,
            usuario: datosFrontend.usuario,
            correo: datosFrontend.correo
        };
    }


    //?  Adapta los datos para cambio de contraseña

    static adaptarCambioContrasena(datosFrontend) {
        return {
            contrasena: datosFrontend.contrasenaActual,
            nuevaContrasena: datosFrontend.nuevaContrasena
        };
    }
}