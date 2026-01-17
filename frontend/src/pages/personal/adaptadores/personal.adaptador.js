
export class PersonalAdaptador {
    // Tipos de personal
    static tiposPersonal = {
        docente: { value: 'docente', label: 'Docente', color: 'blue' },
        administrativo: { value: 'administrativo', label: 'Administrativo', color: 'green' },
        obrero: { value: 'obrero', label: 'Obrero', color: 'orange' }
    };

    // Sexos
    static sexos = [
        { value: 'masculino', label: 'Masculino' },
        { value: 'femenino', label: 'Femenino' },
        { value: 'otro', label: 'Otro' }
    ];

    // Tipos de archivo
    static tiposArchivo = [
        { value: 'imagen', label: 'Imagen' },
        { value: 'pdf', label: 'PDF' },
        { value: 'documento', label: 'Documento' }
    ];

    // Tipos de título
    static tiposTitulo = [
        { value: 'tecnico', label: 'Técnico' },
        { value: 'tsu', label: 'TSU' },
        { value: 'licenciatura', label: 'Licenciatura' },
        { value: 'especializacion', label: 'Especialización' },
        { value: 'maestria', label: 'Maestría' },
        { value: 'doctorado', label: 'Doctorado' }
    ];

    // Tallas
    static tallasFranela = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
    static tallasPantalon = ['28', '30', '32', '34', '36', '38', '40', '42', '44'];
    static tallasZapato = ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];

    // Adaptar personal para formulario
    static toFormData(personalData) {
        return {
            // Información básica
            tipo: personalData.tipo || 'docente',
            primer_nombre: personalData.primer_nombre || '',
            segundo_nombre: personalData.segundo_nombre || '',
            primer_apellido: personalData.primer_apellido || '',
            segundo_apellido: personalData.segundo_apellido || '',
            cedula: personalData.cedula || '',
            telefono: personalData.telefono || '',
            correo: personalData.correo || '',
            fecha_nacimiento: personalData.fecha_nacimiento
                ? new Date(personalData.fecha_nacimiento).toISOString().split('T')[0]
                : '',
            sexo: personalData.sexo || 'masculino',

            // Información laboral
            cargo_voucher: personalData.cargo_voucher || '',
            codigo_cargo: personalData.codigo_cargo || '',
            dependencia: personalData.dependencia || '',
            codigo_dependencia: personalData.codigo_dependencia || '',
            carga_horaria: personalData.carga_horaria || '',
            fecha_ingreso_mppe: personalData.fecha_ingreso_mppe
                ? new Date(personalData.fecha_ingreso_mppe).toISOString().split('T')[0]
                : '',

            // Información académica
            titulos_profesionales: personalData.titulos_profesionales || '',
            tipo_titulo: personalData.tipo_titulo || 'licenciatura',

            // Información de tallas
            talla_franela: personalData.talla_franela || 'M',
            talla_pantalon: personalData.talla_pantalon || '34',
            talla_zapato: personalData.talla_zapato || '38',

            // Archivos
            archivos: personalData.archivos || []
        };
    }

    // Adaptar formulario para API
    static toApiRequest(formData) {
        const request = {
            // Información básica
            tipo: formData.tipo,
            primer_nombre: formData.primer_nombre.trim(),
            segundo_nombre: formData.segundo_nombre?.trim() || null,
            primer_apellido: formData.primer_apellido.trim(),
            segundo_apellido: formData.segundo_apellido?.trim() || null,
            cedula: formData.cedula.trim(),
            telefono: formData.telefono.trim(),
            correo: formData.correo.trim(),
            fecha_nacimiento: formData.fecha_nacimiento,
            sexo: formData.sexo,

            // Información laboral
            cargo_voucher: formData.cargo_voucher.trim(),
            codigo_cargo: formData.codigo_cargo?.trim() || null,
            dependencia: formData.dependencia.trim(),
            codigo_dependencia: formData.codigo_dependencia?.trim() || null,
            carga_horaria: formData.carga_horaria?.trim() || null,
            fecha_ingreso_mppe: formData.fecha_ingreso_mppe,

            // Información académica
            titulos_profesionales: formData.titulos_profesionales?.trim() || null,
            tipo_titulo: formData.tipo_titulo || null,

            // Información de tallas
            talla_franela: formData.talla_franela || null,
            talla_pantalon: formData.talla_pantalon || null,
            talla_zapato: formData.talla_zapato || null
        };

        // Eliminar campos vacíos
        Object.keys(request).forEach(key => {
            if (request[key] === null || request[key] === undefined || request[key] === '') {
                delete request[key];
            }
        });

        return request;
    }

    // Adaptar respuesta de la API
    static fromApiResponse(apiData) {
        if (!apiData.success) {
            throw new Error(apiData.message || 'Error en la respuesta del servidor');
        }

        const personal = apiData.data;

        return {
            id: personal.id,
            tipo: personal.tipo,
            tipoLabel: this.tiposPersonal[personal.tipo]?.label || personal.tipo,
            tipoColor: this.tiposPersonal[personal.tipo]?.color || 'gray',

            // Nombre completo
            primer_nombre: personal.primer_nombre,
            segundo_nombre: personal.segundo_nombre,
            primer_apellido: personal.primer_apellido,
            segundo_apellido: personal.segundo_apellido,
            nombreCompleto: `${personal.primer_nombre} ${personal.segundo_nombre ? personal.segundo_nombre + ' ' : ''}${personal.primer_apellido} ${personal.segundo_apellido || ''}`.trim(),

            // Documentación
            cedula: personal.cedula,
            telefono: personal.telefono,
            correo: personal.correo,
            fecha_nacimiento: personal.fecha_nacimiento,
            sexo: personal.sexo,
            sexoLabel: this.sexos.find(s => s.value === personal.sexo)?.label || personal.sexo,

            // Información laboral
            cargo_voucher: personal.cargo_voucher,
            codigo_cargo: personal.codigo_cargo,
            dependencia: personal.dependencia,
            codigo_dependencia: personal.codigo_dependencia,
            carga_horaria: personal.carga_horaria,
            fecha_ingreso_mppe: personal.fecha_ingreso_mppe,

            // Información académica
            titulos_profesionales: personal.titulos_profesionales,
            tipo_titulo: personal.tipo_titulo,
            tipo_titulo_label: this.tiposTitulo.find(t => t.value === personal.tipo_titulo)?.label || personal.tipo_titulo,

            // Tallas
            talla_franela: personal.talla_franela,
            talla_pantalon: personal.talla_pantalon,
            talla_zapato: personal.talla_zapato,

            // Archivos
            archivos: personal.archivos || [],

            // Fechas
            fecha_registro: personal.fecha_registro,
            fecha_actualizacion: personal.fecha_actualizacion,

            // Calculados
            edad: this.calcularEdad(personal.fecha_nacimiento),
            antiguedad: this.calcularAntiguedad(personal.fecha_ingreso_mppe)
        };
    }

    // Adaptar lista de personal
    static toPersonalList(apiResponse, tipo) {

        if (!apiResponse.success) return [];
        if (apiResponse.data == "No hay personal registrado") return [];


        return apiResponse.data.map(personal => ({
            id: personal.id,
            tipo: personal.tipo,
            tipoLabel: this.tiposPersonal[personal.tipo]?.label || personal.tipo,
            tipoColor: this.tiposPersonal[personal.tipo]?.color || 'gray',

            // Nombre
            nombreCompleto: `${personal.primer_nombre} ${personal.segundo_nombre ? personal.segundo_nombre + ' ' : ''}${personal.primer_apellido} ${personal.segundo_apellido || ''}`.trim(),
            primer_nombre: personal.primer_nombre,
            primer_apellido: personal.primer_apellido,

            // Documentación
            cedula: personal.cedula,
            telefono: personal.telefono,
            correo: personal.correo,
            sexo: personal.sexo,

            // Información laboral
            cargo_voucher: personal.cargo_voucher,
            dependencia: personal.dependencia,
            carga_horaria: personal.carga_horaria,
            fecha_ingreso_mppe: personal.fecha_ingreso_mppe,

            // Calculados
            edad: this.calcularEdad(personal.fecha_nacimiento),
            antiguedad: this.calcularAntiguedad(personal.fecha_ingreso_mppe),

            // Fechas
            fecha_registro: personal.fecha_registro,
            fecha_actualizacion: personal.fecha_actualizacion
        }));
    }

    // Calcular edad
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

    // Calcular antigüedad
    static calcularAntiguedad(fechaIngreso) {
        if (!fechaIngreso) return null;
        const hoy = new Date();
        const ingreso = new Date(fechaIngreso);
        let años = hoy.getFullYear() - ingreso.getFullYear();
        const meses = hoy.getMonth() - ingreso.getMonth();

        if (meses < 0 || (meses === 0 && hoy.getDate() < ingreso.getDate())) {
            años--;
        }

        return años;
    }

    // Formatear fecha
    static formatFecha(fecha) {
        if (!fecha) return '';
        const date = new Date(fecha);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    }

    // Validar personal
    static validarPersonal(formData) {
        const errors = {};

        // Validar información básica
        if (!formData.primer_nombre?.trim()) {
            errors.primer_nombre = 'El primer nombre es requerido';
        }

        if (!formData.primer_apellido?.trim()) {
            errors.primer_apellido = 'El primer apellido es requerido';
        }

        if (!formData.cedula?.trim()) {
            errors.cedula = 'La cédula es requerida';
        } else if (!/^\d{6,10}$/.test(formData.cedula.replace(/\D/g, ''))) {
            errors.cedula = 'Cédula inválida';
        }

        if (!formData.telefono?.trim()) {
            errors.telefono = 'El teléfono es requerido';
        } else if (!/^\d{10,11}$/.test(formData.telefono.replace(/\D/g, ''))) {
            errors.telefono = 'Teléfono inválido';
        }

        if (!formData.correo?.trim()) {
            errors.correo = 'El correo es requerido';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.correo)) {
            errors.correo = 'Correo inválido';
        }

        if (!formData.fecha_nacimiento) {
            errors.fecha_nacimiento = 'La fecha de nacimiento es requerida';
        } else {
            const fechaNac = new Date(formData.fecha_nacimiento);
            const hoy = new Date();
            if (fechaNac >= hoy) {
                errors.fecha_nacimiento = 'La fecha de nacimiento debe ser anterior a hoy';
            }
        }

        // Validar información laboral
        if (!formData.cargo_voucher?.trim()) {
            errors.cargo_voucher = 'El cargo es requerido';
        }

        if (!formData.dependencia?.trim()) {
            errors.dependencia = 'La dependencia es requerida';
        }

        if (!formData.fecha_ingreso_mppe) {
            errors.fecha_ingreso_mppe = 'La fecha de ingreso al MPPE es requerida';
        }

        return errors;
    }

    // Filtrar personal
    static filterPersonal(personalList, filters) {
        let filtered = [...personalList];

        // Filtrar por búsqueda
        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            filtered = filtered.filter(persona =>
                persona.nombreCompleto.toLowerCase().includes(query) ||
                persona.cedula.toLowerCase().includes(query) ||
                persona.correo.toLowerCase().includes(query) ||
                persona.cargo_voucher.toLowerCase().includes(query) ||
                persona.dependencia.toLowerCase().includes(query)
            );
        }

        // Filtrar por sexo
        if (filters.sexo && filters.sexo !== 'todos') {
            filtered = filtered.filter(persona => persona.sexo === filters.sexo);
        }

        // Filtrar por edad
        if (filters.edadMin || filters.edadMax) {
            filtered = filtered.filter(persona => {
                const edad = persona.edad;
                return (!filters.edadMin || edad >= filters.edadMin) &&
                    (!filters.edadMax || edad <= filters.edadMax);
            });
        }

        // Filtrar por antigüedad
        if (filters.antiguedadMin || filters.antiguedadMax) {
            filtered = filtered.filter(persona => {
                const antiguedad = persona.antiguedad;
                return (!filters.antiguedadMin || antiguedad >= filters.antiguedadMin) &&
                    (!filters.antiguedadMax || antiguedad <= filters.antiguedadMax);
            });
        }

        return filtered;
    }

    // Ordenar personal
    static sortPersonal(personalList, sortBy = 'nombreCompleto', order = 'asc') {
        return [...personalList].sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            if (sortBy === 'edad' || sortBy === 'antiguedad') {
                aValue = a[sortBy] || 0;
                bValue = b[sortBy] || 0;
            }

            if (sortBy === 'nombreCompleto' || sortBy === 'cargo_voucher' || sortBy === 'dependencia') {
                aValue = aValue?.toLowerCase() || '';
                bValue = bValue?.toLowerCase() || '';
            }

            if (sortBy === 'fecha_ingreso_mppe' || sortBy === 'fecha_registro') {
                aValue = new Date(aValue).getTime();
                bValue = new Date(bValue).getTime();
            }

            if (order === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    }

    // Obtener icono por tipo
    static getIconByTipo(tipo) {
        const icons = {
            docente: 'FaChalkboardTeacher',
            administrativo: 'FaUserTie',
            obrero: 'FaHardHat'
        };
        return icons[tipo] || 'FaUser';
    }

    // Obtener color por tipo
    static getColorByTipo(tipo) {
        const colors = {
            docente: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
            administrativo: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
            obrero: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' }
        };
        return colors[tipo] || { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' };
    }
}