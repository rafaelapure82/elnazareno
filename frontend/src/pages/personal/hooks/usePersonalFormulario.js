
import { useState, useEffect } from 'react';
import { PersonalAdaptador } from '../adaptadores/personal.adaptador';
import { ArchivosAdaptador } from '../adaptadores/archivos.adaptador';

export const usePersonalFormulario = (initialData = null, tipo = 'docente') => {
    const [formData, setFormData] = useState(
        initialData
            ? PersonalAdaptador.toFormData(initialData)
            : {
                ...PersonalAdaptador.toFormData({}),
                tipo: tipo
            }
    );

    const [errors, setErrors] = useState({});
    const [archivos, setArchivos] = useState([]);
    const [archivosErrors, setArchivosErrors] = useState([]);

    // Tipos de personal
    const tiposPersonal = Object.values(PersonalAdaptador.tiposPersonal);

    // Actualizar datos iniciales
    useEffect(() => {
        if (initialData) {
            setFormData(PersonalAdaptador.toFormData(initialData));
            setArchivos(initialData.archivos || []);
        }
    }, [initialData]);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Limpiar error del campo
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Manejar cambios en archivos
    const handleFileChange = (files) => {
        const nuevosArchivos = Array.from(files).map(file => ({
            file,
            tipo: 'documento', // Valor por defecto
            nombre: file.name,
            tamaño: file.size
        }));

        setArchivos(prev => [...prev, ...nuevosArchivos]);
    };

    // Cambiar tipo de archivo
    const handleChangeFileType = (index, tipo) => {
        setArchivos(prev =>
            prev.map((archivo, i) =>
                i === index ? { ...archivo, tipo } : archivo
            )
        );
    };

    // Eliminar archivo
    const handleRemoveFile = (index) => {
        setArchivos(prev => prev.filter((_, i) => i !== index));
    };

    // Validar formulario
    const validate = () => {
        const validationErrors = PersonalAdaptador.validarPersonal(formData);
        setErrors(validationErrors);

        // Validar archivos
        const archivosValidationErrors = ArchivosAdaptador.validarArchivos(archivos);
        setArchivosErrors(archivosValidationErrors);

        return Object.keys(validationErrors).length === 0 && archivosValidationErrors.length === 0;
    };

    // Resetear formulario
    const resetForm = () => {
        setFormData({
            ...PersonalAdaptador.toFormData({}),
            tipo: tipo
        });
        setArchivos([]);
        setErrors({});
        setArchivosErrors([]);
    };

    // Preparar datos para enviar
    const prepareSubmit = () => {
        return {
            personal: PersonalAdaptador.toApiRequest(formData),
            archivos: ArchivosAdaptador.prepararArchivosParaSubir(archivos)
        };
    };

    return {
        formData,
        errors,
        archivos,
        archivosErrors,
        tiposPersonal,
        sexos: PersonalAdaptador.sexos,
        tiposTitulo: PersonalAdaptador.tiposTitulo,
        tiposArchivo: PersonalAdaptador.tiposArchivo,
        tallasFranela: PersonalAdaptador.tallasFranela,
        tallasPantalon: PersonalAdaptador.tallasPantalon,
        tallasZapato: PersonalAdaptador.tallasZapato,
        handleChange,
        handleFileChange,
        handleChangeFileType,
        handleRemoveFile,
        validate,
        resetForm,
        prepareSubmit
    };
};