import { API_BASE_URL } from '../../../compartidos/api/axios.config'

export class EstudianteAdaptador {
    static adaptarCrear(data) {
        const formData = new FormData();

        // Datos del estudiante
        formData.append('nombres', data.nombres);
        formData.append('apellidos', data.apellidos);
        formData.append('sexo', data.sexo);
        formData.append('tiene_cedula', data.tieneCedula ? 'true' : 'false');
        formData.append('cedula_escolar', data.cedulaEscolar);
        formData.append('nacionalidad', data.nacionalidad);
        formData.append('fecha_nacimiento', data.fechaNacimiento);

        if (data.tieneCedula) {
            formData.append('tipo_cedula', data.tipoCedula);
            formData.append('cedula', data.cedula);
        }

        if (data.tipoSangre) {
            formData.append('tipo_sangre', data.tipoSangre);
        }

        // Dirección
        if (data.direccion) {
            const { estado, municipio, parroquia, sector, calle, casa, referencia } = data.direccion;
            formData.append('direccion[estado]', estado || '');
            formData.append('direccion[municipio]', municipio || '');
            formData.append('direccion[parroquia]', parroquia || '');
            formData.append('direccion[sector]', sector || '');
            formData.append('direccion[calle]', calle || '');
            formData.append('direccion[casa]', casa || '');
            formData.append('direccion[referencia]', referencia || '');
        }

        // Representante
        formData.append('representante[tipo_cedula]', data.representante.tipoCedula);
        formData.append('representante[cedula]', data.representante.cedula);
        formData.append('representante[nombres]', data.representante.nombres);
        formData.append('representante[apellidos]', data.representante.apellidos);
        formData.append('representante[sexo]', data.representante.sexo);
        formData.append('representante[relacion]', data.representante.relacion);
        formData.append('representante[telefono]', data.representante.telefono);

        if (data.representante.fechaNacimiento) {
            formData.append('representante[fecha_nacimiento]', data.representante.fechaNacimiento);
        }

        if (data.representante.email) {
            formData.append('representante[email]', data.representante.email);
        }

        if (data.representante.ocupacion) {
            formData.append('representante[ocupacion]', data.representante.ocupacion);
        }

        // Foto
        if (data.foto) {
            formData.append('foto', data.foto);
        }
        if (data.fotoExistente) {
            formData.append('foto_existente', data.fotoExistente);
        }
        return formData;
    }

    static adaptarEditar(data) {
        return this.adaptarCrear(data);
    }

    static adaptarBusqueda(filtros) {
        const adaptado = {};

        if (filtros.q) adaptado.q = filtros.q;
        if (filtros.page) adaptado.page = filtros.page;
        if (filtros.limit) adaptado.limit = filtros.limit;
        if (filtros.tipoBusqueda) adaptado.tipoBusqueda = filtros.tipoBusqueda;

        return adaptado;
    }

    static adaptarBusquedaCedula(filtros) {
        const adaptado = {};

        if (filtros.cedula) adaptado.cedula = filtros.cedula;
        if (filtros.cedulaEscolar) adaptado.cedula_escolar = filtros.cedulaEscolar;
        if (filtros.tipoCedula) adaptado.tipo_cedula = filtros.tipoCedula;

        return adaptado;
    }

    static adaptarParaFrontend(data) {
        if (!data) return null;

        return {
            id: data.id,
            nombres: data.nombres,
            apellidos: data.apellidos,
            nombreCompleto: `${data.nombres} ${data.apellidos}`,
            fechaNacimiento: data.fecha_nacimiento,
            edad: this.calcularEdad(data.fecha_nacimiento),
            sexo: data.sexo || data.genero,
            tieneCedula: data.tiene_cedula,
            tipoCedula: data.tipo_cedula,
            cedula: data.cedula,
            cedulaEscolar: data.cedula_escolar,
            nacionalidad: data.nacionalidad,
            tipoSangre: data.tipo_sangre,
            foto: data.foto,
            fotoUrl: data.foto_url ? `${API_BASE_URL}/carpeta-estudiantes/${data.foto_url}` : `${API_BASE_URL}/carpeta-estudiantes/${data.foto}`,
            direccion: {
                estado: data.direccion?.estado || data.direccion_estado,
                municipio: data.direccion?.municipio || data.direccion_municipio,
                parroquia: data.direccion?.parroquia || data.direccion_parroquia,
                sector: data.direccion?.sector || data.direccion_sector,
                calle: data.direccion?.calle || data.direccion_calle,
                casa: data.direccion?.casa || data.direccion_casa,
                referencia: data.direccion?.referencia || data.direccion_referencia
            },
            representanteId: data.representante_id,
            createdAt: data.created_at
        };
    }

    static calcularEdad(fechaNacimiento) {
        if (!fechaNacimiento) return null;
        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }

        return edad;
    }
}