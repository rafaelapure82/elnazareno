export class RepresentanteAdaptador {
    static adaptarParaFrontend(data) {
        if (!data) return null;

        return {
            id: data.id,
            nombres: data.nombres,
            apellidos: data.apellidos,
            nombreCompleto: `${data.nombres} ${data.apellidos}`,
            sexo: data.sexo,
            fechaNacimiento: data.fecha_nacimiento,
            relacion: data.relacion,
            email: data.email,
            telefono: data.telefono,
            ocupacion: data.ocupacion,
            tipoCedula: data.tipo_cedula,
            cedula: data.cedula,
            createdAt: data.created_at
        };
    }

    static adaptarParaBackend(data) {
        return {
            tipo_cedula: data.tipoCedula,
            cedula: data.cedula,
            nombres: data.nombres,
            apellidos: data.apellidos,
            sexo: data.sexo,
            fecha_nacimiento: data.fechaNacimiento || null,
            relacion: data.relacion,
            telefono: data.telefono,
            email: data.email || null,
            ocupacion: data.ocupacion || null
        };
    }
}