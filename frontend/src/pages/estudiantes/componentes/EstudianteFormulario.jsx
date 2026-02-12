import React, { useState, useEffect, useRef } from 'react';
import {
    FaUser, FaIdCard, FaSchool, FaBirthdayCake, FaMapMarkerAlt,
    FaPhone, FaEnvelope, FaUserFriends, FaCamera, FaTimes,
    FaVenusMars, FaFlag, FaTint, FaHome, FaUserPlus, FaSave
} from 'react-icons/fa';
import { GENEROS, NACIONALIDADES, TIPOS_SANGRE, ESTADOS_VENEZUELA, RELACIONES_REPRESENTANTE } from '../utils/constants';

// Componente InputField definido FUERA del componente principal
const InputField = ({ label, name, type = 'text', placeholder, icon: Icon, required = false, value, onChange, error, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
            {Icon && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon className="h-5 w-5 text-gray-400" />
                </div>
            )}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2.5 border ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    } rounded-lg focus:outline-none focus:ring-2 transition-colors`}
                placeholder={placeholder}
                required={required}
                {...props}
            />
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
);

// Componente SelectField definido FUERA del componente principal
const SelectField = ({ label, name, options, icon: Icon, required = false, value, onChange, error, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
            {Icon && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Icon className="h-5 w-5 text-gray-400" />
                </div>
            )}
            <select
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full ${Icon ? 'pl-10' : 'pl-3'} pr-10 py-2.5 border ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    } rounded-lg focus:outline-none focus:ring-2 appearance-none bg-white transition-colors`}
                required={required}
                {...props}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
);

const EstudianteFormulario = ({ estudiante, onSubmit, loading, mode = 'create' }) => {
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        sexo: 'Masculino',
        tieneCedula: false,
        tipoCedula: 'V',
        cedula: '',
        cedulaEscolar: '',
        nacionalidad: 'Venezolana',
        tipoSangre: '',
        fechaNacimiento: '',
        foto: null,
        direccion: {
            estado: '',
            municipio: '',
            parroquia: '',
            sector: '',
            calle: '',
            casa: '',
            referencia: ''
        },
        representante: {
            tipoCedula: 'V',
            cedula: '',
            nombres: '',
            apellidos: '',
            sexo: 'Masculino',
            fechaNacimiento: '',
            relacion: '',
            telefono: '',
            email: '',
            ocupacion: ''
        }
    });

    const [errors, setErrors] = useState({});
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    // Función para obtener el valor de formData basado en el nombre
    const getValueFromFormData = (name) => {
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            if (parent === 'direccion' || parent === 'representante') {
                return formData[parent]?.[child] || '';
            }
        }
        return formData[name] || '';
    };

    // Calcular edad a partir de fecha de nacimiento
    const calcularEdad = (fechaNacimiento) => {
        if (!fechaNacimiento) return '';
        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }

        return edad;
    };

    // FUNCIÓN MILAGROSA - Colócala al inicio del componente
    const convertirFechaParaInput = (fechaString) => {
        if (!fechaString) return '';

        try {
            // Si ya viene en formato YYYY-MM-DD, devolverlo tal cual
            if (fechaString.includes('-')) {
                const [year, month, day] = fechaString.split('-');
                if (year && month && day && year.length === 4) {
                    return fechaString; // Ya está en formato correcto
                }
            }

            // Si viene en formato DD/MM/YYYY
            if (fechaString.includes('/')) {
                const partes = fechaString.split('/');

                // Formato DD/MM/YYYY
                if (partes.length === 3) {
                    let [dia, mes, anio] = partes;

                    // Asegurar que el año sea de 4 dígitos
                    if (anio.length === 2) {
                        anio = '20' + anio; // Convierte '18' a '2018'
                    }

                    // Asegurar que día y mes tengan 2 dígitos
                    dia = dia.padStart(2, '0');
                    mes = mes.padStart(2, '0');

                    return `${anio}-${mes}-${dia}`;
                }
            }

            // Intentar con Date object como último recurso
            const fecha = new Date(fechaString);
            if (!isNaN(fecha.getTime())) {
                return fecha.toISOString().split('T')[0];
            }

            return '';

        } catch (error) {
            console.warn('Error convirtiendo fecha:', fechaString, error);
            return '';
        }
    };

    useEffect(() => {
        if (estudiante) {
            console.log("estudiante", estudiante.representante.fechaNacimiento)

            const fotoExistente = estudiante.fotoUrl &&
                estudiante.fotoUrl !== 'null' &&
                !estudiante.fotoUrl.includes('/null')
                ? estudiante.fotoUrl
                : null;

            const data = {
                nombres: estudiante.nombres || '',
                apellidos: estudiante.apellidos || '',
                sexo: estudiante.sexo || 'Masculino',
                tieneCedula: estudiante.tieneCedula || false,
                tipoCedula: estudiante.tipoCedula || 'V',
                cedula: estudiante.cedula || '',
                cedulaEscolar: estudiante.cedulaEscolar || '',
                nacionalidad: estudiante.nacionalidad || 'Venezolana',
                tipoSangre: estudiante.tipoSangre || '',
                // fechaNacimiento: estudiante.fechaNacimiento ?
                //     new Date(estudiante.fechaNacimiento).toISOString().split('T')[0] : '',
                fechaNacimiento: convertirFechaParaInput(estudiante?.fechaNacimiento),
                // fechaNacimiento: estudiante?.fechaNacimiento
                //     ? new Date(estudiante.fechaNacimiento).toISOString().split('T')[0]
                //     : '',
                fotoExistente: fotoExistente,
                foto: null,
                direccion: {
                    estado: estudiante.direccion?.estado || '',
                    municipio: estudiante.direccion?.municipio || '',
                    parroquia: estudiante.direccion?.parroquia || '',
                    sector: estudiante.direccion?.sector || '',
                    calle: estudiante.direccion?.calle || '',
                    casa: estudiante.direccion?.casa || '',
                    referencia: estudiante.direccion?.referencia || ''
                },
                representante: estudiante.representante ? {
                    tipoCedula: estudiante.representante.tipoCedula || 'V',
                    cedula: estudiante.representante.cedula || '',
                    nombres: estudiante.representante.nombres || '',
                    apellidos: estudiante.representante.apellidos || '',
                    sexo: estudiante.representante.sexo || 'Masculino',
                    fechaNacimiento: convertirFechaParaInput(estudiante.representante.fecha_nacimiento
                    ),
                    //   new Date(estudiante.representante.fechaNacimiento).toISOString().split('T')[0] : '',
                    relacion: estudiante.representante.relacion || '',
                    telefono: estudiante.representante.telefono || '',
                    email: estudiante.representante.email || '',
                    ocupacion: estudiante.representante.ocupacion || ''
                } : {
                    tipoCedula: 'V',
                    cedula: '',
                    nombres: '',
                    apellidos: '',
                    sexo: 'Masculino',
                    fechaNacimiento: '',
                    relacion: '',
                    telefono: '',
                    email: '',
                    ocupacion: ''
                }
            };

            setFormData(data);

            // Configurar preview de la foto existente
            // if (estudiante.fotoUrl) {
            //     setPreviewUrl(estudiante.fotoUrl);
            // }

            // if (estudiante.fotoUrl &&
            //     estudiante.fotoUrl !== 'null' &&
            //     !estudiante.fotoUrl.includes('/null')) {
            //     setPreviewUrl(estudiante.fotoUrl);
            // }

            // Configurar preview de la foto existente
            if (fotoExistente) {
                setPreviewUrl(fotoExistente);
            }
        }
    }, [estudiante]);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            if (parent === 'direccion' || parent === 'representante') {
                setFormData(prev => ({
                    ...prev,
                    [parent]: {
                        ...prev[parent],
                        [child]: type === 'checkbox' ? checked : value
                    }
                }));
            }
        } else {
            const newValue = type === 'checkbox' ? checked :
                type === 'file' ? files[0] : value;

            setFormData(prev => ({
                ...prev,
                [name]: newValue
            }));

            // Si es un archivo de imagen, crear preview
            if (type === 'file' && files[0]) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewUrl(reader.result);
                };
                reader.readAsDataURL(files[0]);
            }
        }

        // Limpiar error del campo modificado
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleFotoClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveFoto = () => {
        setFormData(prev => ({ ...prev, foto: null }));
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nombres.trim()) newErrors.nombres = 'Los nombres son requeridos';
        if (!formData.apellidos.trim()) newErrors.apellidos = 'Los apellidos son requeridos';
        if (!formData.cedulaEscolar.trim()) newErrors.cedulaEscolar = 'La cédula escolar es requerida';
        if (!formData.fechaNacimiento) newErrors.fechaNacimiento = 'La fecha de nacimiento es requerida';
        if (!formData.nacionalidad.trim()) newErrors.nacionalidad = 'La nacionalidad es requerida';

        if (formData.tieneCedula) {
            if (!formData.cedula.trim()) newErrors.cedula = 'La cédula es requerida';
            if (!formData.tipoCedula) newErrors.tipoCedula = 'El tipo de cédula es requerido';
        }

        // Validar representante
        if (!formData.representante.nombres.trim()) newErrors['representante.nombres'] = 'Los nombres del representante son requeridos';
        if (!formData.representante.apellidos.trim()) newErrors['representante.apellidos'] = 'Los apellidos del representante son requeridos';
        if (!formData.representante.cedula.trim()) newErrors['representante.cedula'] = 'La cédula del representante es requerida';
        if (!formData.representante.relacion.trim()) newErrors['representante.relacion'] = 'La relación es requerida';
        if (!formData.representante.telefono.trim()) newErrors['representante.telefono'] = 'El teléfono es requerido';

        // Validar foto solo si es creación
        if (mode === 'create' && !formData.foto && !previewUrl) {
            newErrors.foto = 'La foto del estudiante es requerida';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    const edadActual = calcularEdad(formData.fechaNacimiento);

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-100">
                <div className="flex items-center mb-6">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                        {mode === 'create' ? (
                            <FaUserPlus className="h-7 w-7 text-white" />
                        ) : (
                            <FaUser className="h-7 w-7 text-white" />
                        )}
                    </div>
                    <div className="ml-4">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {mode === 'create' ? 'Registrar Nuevo Estudiante' : 'Editar Información del Estudiante'}
                        </h1>
                        <p className="text-gray-600 mt-1">
                            {mode === 'create'
                                ? 'Completa todos los campos requeridos para registrar un nuevo estudiante'
                                : 'Actualiza la información del estudiante y su representante'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Columna izquierda: Foto y datos básicos */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Sección de Foto (Estilo Carnet) */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                <FaCamera className="mr-2 text-blue-500" />
                                Foto del Estudiante
                            </h3>
                            {previewUrl && (
                                <button
                                    type="button"
                                    onClick={handleRemoveFoto}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FaTimes className="h-5 w-5" />
                                </button>
                            )}
                        </div>

                        <div className="text-center">
                            <div
                                onClick={handleFotoClick}
                                className={`relative mx-auto w-48 h-56 rounded-xl border-2 ${errors.foto ? 'border-red-300' : 'border-gray-300'
                                    } ${!previewUrl ? 'border-dashed hover:border-blue-400 cursor-pointer' : ''
                                    } transition-colors overflow-hidden bg-gradient-to-b from-gray-50 to-white`}
                            >
                                {previewUrl ? (
                                    <img
                                        src={previewUrl}
                                        alt="Foto del estudiante"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full p-4">
                                        <div className="mb-4 p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full">
                                            <FaCamera className="h-10 w-10 text-blue-500" />
                                        </div>
                                        <p className="text-sm text-gray-600 font-medium mb-1">Haz clic para subir foto</p>
                                        <p className="text-xs text-gray-500">Tamaño máximo: 5MB</p>
                                        <p className="text-xs text-gray-500">Formatos: JPG, PNG</p>
                                    </div>
                                )}

                                {previewUrl && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                                        <div className="flex justify-center">
                                            <button
                                                type="button"
                                                onClick={handleFotoClick}
                                                className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-blue-600 text-sm font-medium rounded-lg hover:bg-white transition-colors"
                                            >
                                                Cambiar Foto
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                name="foto"
                                onChange={handleChange}
                                accept="image/*"
                                className="hidden"
                            />

                            {errors.foto && (
                                <p className="mt-2 text-sm text-red-600">{errors.foto}</p>
                            )}

                            <div className="mt-4 text-xs text-gray-500">
                                <p>📸 <strong>Recomendaciones:</strong></p>
                                <p className="mt-1">• Foto tipo carnet (fondo claro)</p>
                                <p>• Rostro completamente visible</p>
                                <p>• Buena iluminación</p>
                                <p>• Formato JPG o PNG</p>
                            </div>
                        </div>
                    </div>

                    {/* Información básica del estudiante */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <FaUser className="mr-2 text-blue-500" />
                            Información Básica
                        </h3>

                        <div className="space-y-4">
                            <InputField
                                label="Nombres"
                                name="nombres"
                                placeholder="Ej: Juan Carlos"
                                icon={FaUser}
                                required
                                value={formData.nombres}
                                onChange={handleChange}
                                error={errors.nombres}
                            />

                            <InputField
                                label="Apellidos"
                                name="apellidos"
                                placeholder="Ej: Pérez González"
                                icon={FaUser}
                                required
                                value={formData.apellidos}
                                onChange={handleChange}
                                error={errors.apellidos}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <SelectField
                                    label="Sexo"
                                    name="sexo"
                                    options={GENEROS}
                                    icon={FaVenusMars}
                                    required
                                    value={formData.sexo}
                                    onChange={handleChange}
                                    error={errors.sexo}
                                />

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Fecha Nacimiento *
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaBirthdayCake className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="date"
                                            name="fechaNacimiento"
                                            value={formData.fechaNacimiento}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-3 py-2.5 border ${errors.fechaNacimiento ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                                } rounded-lg focus:outline-none focus:ring-2 transition-colors`}
                                            required
                                        />
                                    </div>
                                    {errors.fechaNacimiento && (
                                        <p className="mt-1 text-sm text-red-600">{errors.fechaNacimiento}</p>
                                    )}
                                    {formData.fechaNacimiento && (
                                        <p className="mt-1 text-xs text-blue-600 font-medium">
                                            Edad: {edadActual} años
                                        </p>
                                    )}
                                </div>
                            </div>

                            <SelectField
                                label="Nacionalidad"
                                name="nacionalidad"
                                options={[
                                    { value: 'Venezolana', label: 'Venezolana' },
                                    ...NACIONALIDADES.filter(n => n !== 'Venezolana').map(n => ({ value: n, label: n }))
                                ]}
                                icon={FaFlag}
                                required
                                value={formData.nacionalidad}
                                onChange={handleChange}
                                error={errors.nacionalidad}
                            />

                            <SelectField
                                label="Tipo de Sangre"
                                name="tipoSangre"
                                options={[
                                    { value: '', label: 'Seleccionar tipo' },
                                    ...TIPOS_SANGRE.map(tipo => ({ value: tipo, label: tipo }))
                                ]}
                                icon={FaTint}
                                value={formData.tipoSangre}
                                onChange={handleChange}
                                error={errors.tipoSangre}
                            />
                        </div>
                    </div>
                </div>

                {/* Columna derecha: Documentación y más información */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Sección de Documentación */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <FaIdCard className="mr-2 text-blue-500" />
                            Documentación
                        </h3>

                        <div className="space-y-6">
                            {/* Checkbox de tiene cédula */}
                            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                                <input
                                    type="checkbox"
                                    name="tieneCedula"
                                    checked={formData.tieneCedula}
                                    onChange={handleChange}
                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    id="tieneCedula"
                                />
                                <label htmlFor="tieneCedula" className="ml-3 text-sm font-medium text-gray-900">
                                    ¿El estudiante tiene cédula de identidad?
                                </label>
                            </div>

                            {formData.tieneCedula && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                                    <SelectField
                                        label="Tipo de Cédula"
                                        name="tipoCedula"
                                        options={[
                                            { value: 'V', label: 'V - Venezolano' },
                                            { value: 'E', label: 'E - Extranjero' },
                                            { value: 'P', label: 'P - Pasaporte' }
                                        ]}
                                        icon={FaIdCard}
                                        required={formData.tieneCedula}
                                        value={formData.tipoCedula}
                                        onChange={handleChange}
                                        error={errors.tipoCedula}
                                    />

                                    <InputField
                                        label="Número de Cédula"
                                        name="cedula"
                                        placeholder="Ej: 12345678"
                                        icon={FaIdCard}
                                        required={formData.tieneCedula}
                                        value={formData.cedula}
                                        onChange={handleChange}
                                        error={errors.cedula}
                                    />
                                </div>
                            )}

                            <InputField
                                label="Cédula Escolar"
                                name="cedulaEscolar"
                                placeholder="Ej: CS-2024-001"
                                icon={FaSchool}
                                required
                                value={formData.cedulaEscolar}
                                onChange={handleChange}
                                error={errors.cedulaEscolar}
                            />
                        </div>
                    </div>

                    {/* Sección de Dirección */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <FaHome className="mr-2 text-blue-500" />
                            Dirección del Estudiante
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <SelectField
                                label="Estado"
                                name="direccion.estado"
                                options={[
                                    { value: '', label: 'Seleccionar estado' },
                                    ...ESTADOS_VENEZUELA.map(estado => ({ value: estado, label: estado }))
                                ]}
                                icon={FaMapMarkerAlt}
                                value={formData.direccion.estado}
                                onChange={handleChange}
                                error={errors['direccion.estado']}
                            />

                            <InputField
                                label="Municipio"
                                name="direccion.municipio"
                                placeholder="Ej: Municipio"
                                icon={FaMapMarkerAlt}
                                value={formData.direccion.municipio}
                                onChange={handleChange}
                                error={errors['direccion.municipio']}
                            />

                            <InputField
                                label="Parroquia"
                                name="direccion.parroquia"
                                placeholder="Ej: Parroquia"
                                icon={FaMapMarkerAlt}
                                value={formData.direccion.parroquia}
                                onChange={handleChange}
                                error={errors['direccion.parroquia']}
                            />

                            <InputField
                                label="Sector"
                                name="direccion.sector"
                                placeholder="Ej: Sector"
                                icon={FaMapMarkerAlt}
                                value={formData.direccion.sector}
                                onChange={handleChange}
                                error={errors['direccion.sector']}
                            />

                            <InputField
                                label="Calle/Avenida"
                                name="direccion.calle"
                                placeholder="Ej: Calle Principal"
                                icon={FaMapMarkerAlt}
                                value={formData.direccion.calle}
                                onChange={handleChange}
                                error={errors['direccion.calle']}
                            />

                            <InputField
                                label="Casa/Apartamento"
                                name="direccion.casa"
                                placeholder="Ej: Casa #25"
                                icon={FaMapMarkerAlt}
                                value={formData.direccion.casa}
                                onChange={handleChange}
                                error={errors['direccion.casa']}
                            />

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Referencia
                                </label>
                                <div className="relative">
                                    <div className="absolute top-3 left-3">
                                        <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <textarea
                                        name="direccion.referencia"
                                        value={formData.direccion.referencia}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Puntos de referencia para llegar a la vivienda..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sección de Representante */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                <FaUserFriends className="mr-2 text-blue-500" />
                                Datos del Representante
                            </h3>
                            <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-full">
                                Información Requerida
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <SelectField
                                    label="Tipo de Cédula"
                                    name="representante.tipoCedula"
                                    options={[
                                        { value: 'V', label: 'V - Venezolano' },
                                        { value: 'E', label: 'E - Extranjero' },
                                        { value: 'P', label: 'P - Pasaporte' }
                                    ]}
                                    icon={FaIdCard}
                                    required
                                    value={formData.representante.tipoCedula}
                                    onChange={handleChange}
                                    error={errors['representante.tipoCedula']}
                                />

                                <InputField
                                    label="Cédula del Representante"
                                    name="representante.cedula"
                                    placeholder="Ej: 87654321"
                                    icon={FaIdCard}
                                    required
                                    value={formData.representante.cedula}
                                    onChange={handleChange}
                                    error={errors['representante.cedula']}
                                />
                            </div>

                            <InputField
                                label="Nombres del Representante"
                                name="representante.nombres"
                                placeholder="Ej: María"
                                icon={FaUser}
                                required
                                value={formData.representante.nombres}
                                onChange={handleChange}
                                error={errors['representante.nombres']}
                            />

                            <InputField
                                label="Apellidos del Representante"
                                name="representante.apellidos"
                                placeholder="Ej: Gómez Rodríguez"
                                icon={FaUser}
                                required
                                value={formData.representante.apellidos}
                                onChange={handleChange}
                                error={errors['representante.apellidos']}
                            />

                            <SelectField
                                label="Sexo"
                                name="representante.sexo"
                                options={GENEROS}
                                icon={FaVenusMars}
                                value={formData.representante.sexo}
                                onChange={handleChange}
                                error={errors['representante.sexo']}
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Fecha de Nacimiento
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaBirthdayCake className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="date"
                                        name="representante.fechaNacimiento"
                                        value={formData.representante.fechaNacimiento}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            </div>

                            <SelectField
                                label="Relación con el Estudiante"
                                name="representante.relacion"
                                options={[
                                    { value: '', label: 'Seleccionar relación' },
                                    ...RELACIONES_REPRESENTANTE.map(rel => ({ value: rel, label: rel }))
                                ]}
                                icon={FaUserFriends}
                                required
                                value={formData.representante.relacion}
                                onChange={handleChange}
                                error={errors['representante.relacion']}
                            />

                            <InputField
                                label="Ocupación"
                                name="representante.ocupacion"
                                placeholder="Ej: Docente, Ingeniero"
                                icon={FaUserFriends}
                                value={formData.representante.ocupacion}
                                onChange={handleChange}
                                error={errors['representante.ocupacion']}
                            />

                            <InputField
                                label="Teléfono"
                                name="representante.telefono"
                                placeholder="Ej: 04121234567"
                                icon={FaPhone}
                                required
                                value={formData.representante.telefono}
                                onChange={handleChange}
                                error={errors['representante.telefono']}
                            />

                            <InputField
                                label="Correo Electrónico"
                                name="representante.email"
                                type="email"
                                placeholder="ejemplo@correo.com"
                                icon={FaEnvelope}
                                value={formData.representante.email}
                                onChange={handleChange}
                                error={errors['representante.email']}
                            />
                        </div>

                        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                            <p className="text-sm text-gray-700">
                                <strong>Importante:</strong> El representante debe ser mayor de edad y tener una cédula única en el sistema.
                                Esta información es vital para la comunicación con el plantel educativo.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Botones de acción */}
            <div className="sticky bottom-6 bg-gradient-to-r from-white via-white to-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-xl p-6 mt-8">
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                    <div className="text-sm text-gray-600">
                        <p className="font-medium">Todos los campos marcados con <span className="text-red-500">*</span> son obligatorios</p>
                        <p className="mt-1 text-xs">Verifica que toda la información sea correcta antes de enviar</p>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all shadow-sm hover:shadow"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Procesando...
                                </>
                            ) : (
                                <>
                                    {mode === 'create' ? (
                                        <>
                                            <FaUserPlus className="mr-2 h-5 w-5" />
                                            Registrar Estudiante
                                        </>
                                    ) : (
                                        <>
                                            <FaSave className="mr-2 h-5 w-5" />
                                            Actualizar Estudiante
                                        </>
                                    )}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Notas importantes */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-100">
                    <h4 className="text-sm font-semibold text-amber-800 mb-2 flex items-center">
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0118 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Información importante
                    </h4>
                    <ul className="text-sm text-amber-700 space-y-1">
                        <li>• La cédula escolar es única e irrepetible</li>
                        <li>• Verifica que los datos del representante sean correctos</li>
                        <li>• La foto debe ser reciente y de buena calidad</li>
                        <li>• Todos los campos obligatorios deben completarse</li>
                    </ul>
                </div>

                <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <h4 className="text-sm font-semibold text-blue-800 mb-2 flex items-center">
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                        Datos únicos
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Cédula escolar del estudiante</li>
                        <li>• Cédula del representante</li>
                        <li>• Correo electrónico del representante</li>
                        <li>• Teléfono del representante</li>
                    </ul>
                </div>
            </div>
        </form>
    );
};

export default EstudianteFormulario;
