import { useState, useEffect } from 'react';
import { PersonalAdaptador } from '../adaptadores/personal.adaptador';
import { ArchivosAdaptador } from '../adaptadores/archivos.adaptador';
import { PersonalServicio } from '../servicios/personal.servicio';

export const usePersonalFormulario = (initialData = null, tipo = 'docente') => {
    const [formData, setFormData] = useState({
        ...PersonalAdaptador.toFormData({}),
        tipo: tipo
    });

    const [errors, setErrors] = useState({});
    const [archivos, setArchivos] = useState([]);
    const [archivosErrors, setArchivosErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorCarga, setErrorCarga] = useState(null);

    // Tipos de personal
    const tiposPersonal = Object.values(PersonalAdaptador.tiposPersonal);

    // Cargar datos cuando initialData tiene un ID (modo edición)
    // useEffect(() => {
    //     const cargarDatosParaEdicion = async () => {
    //         // Si initialData es un objeto con id (modo edición)
    //         if (initialData?.id) {
    //             try {
    //                 setLoading(true);
    //                 setErrorCarga(null);

    //                 console.log('Modo edición, ID:', initialData.id);
    //                 console.log('InitialData completo:', initialData);

    //                 // PRIMERO: Si initialData ya tiene archivos, cargarlos inmediatamente
    //                 if (initialData.archivos && Array.isArray(initialData.archivos)) {
    //                     console.log('Archivos encontrados en initialData:', initialData.archivos);
    //                     setArchivos(initialData.archivos);
    //                 }

    //                 // SEGUNDO: Obtener datos actualizados de la API
    //                 const response = await PersonalServicio.obtenerPersonalPorId(initialData.id);
    //                 console.log('Respuesta API completa:', response);

    //                 if (response.data.success && response.data.data) {
    //                     // Transformar datos usando el adaptador
    //                     const datosCompletos = PersonalAdaptador.toFormData(response.data.data);
    //                     console.log('Datos transformados:', datosCompletos);

    //                     setFormData(datosCompletos);

    //                     // Cargar archivos de la respuesta de la API (si existen)
    //                     if (response.data.data.archivos && Array.isArray(response.data.data.archivos)) {
    //                         console.log('Archivos desde API:', response.data.data.archivos);
    //                         setArchivos(response.data.data.archivos);
    //                     }
    //                 } else {
    //                     // Si la API falla, usar los datos básicos
    //                     console.log('API falló, usando datos iniciales');
    //                     setFormData(PersonalAdaptador.toFormData(initialData));
    //                 }
    //             } catch (error) {
    //                 console.error('Error cargando datos del personal:', error);
    //                 setErrorCarga(error.message);

    //                 // Si falla, usar los datos básicos que tenemos
    //                 if (initialData) {
    //                     setFormData(PersonalAdaptador.toFormData(initialData));
    //                     if (initialData.archivos) {
    //                         setArchivos(initialData.archivos);
    //                     }
    //                 }
    //             } finally {
    //                 setLoading(false);
    //             }
    //         } else if (initialData) {
    //             // Si initialData ya tiene los datos completos (sin id - modo creación con datos)
    //             console.log('Modo creación con datos iniciales:', initialData);
    //             setFormData(PersonalAdaptador.toFormData(initialData));

    //             // Asegurarse de que archivos sea un array
    //             const archivosData = initialData.archivos || [];
    //             console.log('Archivos desde initialData:', archivosData);
    //             setArchivos(Array.isArray(archivosData) ? archivosData : []);
    //         }
    //     };

    //     cargarDatosParaEdicion();
    // }, [initialData]);

    useEffect(() => {
        const cargarDatosParaEdicion = async () => {
            if (initialData?.id) {
                try {
                    setLoading(true);
                    setErrorCarga(null);

                    // console.log('Modo edición, ID:', initialData.id);

                    // Obtener datos de la API
                    const response = await PersonalServicio.obtenerPersonalPorId(initialData.id);

                    if (response.data.success && response.data.data) {
                        const datosCompletos = PersonalAdaptador.toFormData(response.data.data);
                        setFormData(datosCompletos);

                        // Transformar archivos existentes para que NO sean editables
                        if (response.data.data.archivos && Array.isArray(response.data.data.archivos)) {
                            const archivosTransformados = response.data.data.archivos.map(archivo => ({
                                ...archivo,
                                id: archivo.id, // Mantener el ID
                                tipo: archivo.tipo_archivo, // Usar tipo_archivo como tipo principal
                                esExistente: true, // Marcar como archivo existente (no editable)
                                originalTipo: archivo.tipo_archivo // Guardar tipo original
                            }));
                            // console.log('Archivos existentes transformados:', archivosTransformados);
                            setArchivos(archivosTransformados);
                        }
                    }
                } catch (error) {
                    console.error('Error cargando datos:', error);
                    setErrorCarga(error.message);
                } finally {
                    setLoading(false);
                }
            }
        };

        cargarDatosParaEdicion();
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
    // const handleFileChange = (files) => {
    //     console.log('Archivos recibidos:', files);

    //     const nuevosArchivos = Array.from(files).map(file => ({
    //         file,
    //         tipo: 'documento', // Valor por defecto
    //         nombre: file.name,
    //         tamaño: file.size,
    //         esNuevo: true // Marcar como archivo nuevo
    //     }));

    //     console.log('Nuevos archivos procesados:', nuevosArchivos);

    //     setArchivos(prev => {
    //         const nuevos = [...prev, ...nuevosArchivos];
    //         console.log('Archivos totales después de agregar:', nuevos);
    //         return nuevos;
    //     });
    // };


    // const handleFileChange = (files) => {
    //     console.log('Archivos recibidos:', files);

    //     const nuevosArchivos = Array.from(files).map(file => {
    //         // Obtener extensión del archivo
    //         const extension = ArchivosAdaptador.obtenerExtension(file.name);

    //         // Determinar tipo automáticamente por extensión
    //         const tipoAutomatico = ArchivosAdaptador.determinarTipoPorExtension(extension);

    //         return {
    //             file,
    //             tipo: tipoAutomatico, // Tipo determinado automáticamente
    //             nombre: file.name,
    //             tamaño: file.size,
    //             esNuevo: true
    //         };
    //     });

    //     console.log('Nuevos archivos procesados:', nuevosArchivos);

    //     setArchivos(prev => {
    //         const nuevos = [...prev, ...nuevosArchivos];
    //         console.log('Archivos totales después de agregar:', nuevos);
    //         return nuevos;
    //     });
    // };

    // En handleFileChange (para archivos nuevos)
    const handleFileChange = (files) => {
        const nuevosArchivos = Array.from(files).map(file => {
            const extension = ArchivosAdaptador.obtenerExtension(file.name);
            const tipoAutomatico = ArchivosAdaptador.determinarTipoPorExtension(extension);

            return {
                file,
                tipo: tipoAutomatico,
                nombre: file.name,
                tamaño: file.size,
                esNuevo: true, // Marcar como nuevo
                esExistente: false // No es archivo existente
            };
        });

        setArchivos(prev => [...prev, ...nuevosArchivos]);
    };



    // Cambiar tipo de archivo
    // const handleChangeFileType = (index, tipo) => {
    //     setArchivos(prev => {
    //         const nuevosArchivos = prev.map((archivo, i) =>
    //             i === index ? { ...archivo, tipo } : archivo
    //         );
    //         console.log('Archivos después de cambiar tipo:', nuevosArchivos);
    //         return nuevosArchivos;
    //     });
    // };

    // En handleChangeFileType (solo para archivos nuevos)
    const handleChangeFileType = (index, tipo) => {
        setArchivos(prev => {
            const archivo = prev[index];

            // SOLO permitir cambiar tipo a archivos nuevos, NO a existentes
            if (archivo.esExistente) {
                console.warn('No se puede cambiar el tipo de un archivo existente');
                return prev;
            }

            return prev.map((item, i) =>
                i === index ? { ...item, tipo } : item
            );
        });
    };

    // Eliminar archivo
    // const handleRemoveFile = (index) => {
    //     setArchivos(prev => {
    //         const nuevosArchivos = prev.filter((_, i) => i !== index);
    //         console.log('Archivos después de eliminar:', nuevosArchivos);
    //         return nuevosArchivos;
    //     });
    // };

    const handleRemoveFile = (index) => {
        setArchivos(prev => {
            const archivo = prev[index];

            // Si es archivo existente, marcarlo para eliminación
            if (archivo.esExistente) {
                return prev.map((item, i) =>
                    i === index ? { ...item, marcadoParaEliminar: true } : item
                );
            }

            // Si es archivo nuevo, eliminarlo directamente
            return prev.filter((_, i) => i !== index);
        });
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
        setErrorCarga(null);
        setLoading(false);
    };

    // Preparar datos para enviar
    const prepareSubmit = () => {
        // Filtrar archivos marcados para eliminar
        const archivosParaEliminar = archivos.filter(a => a.marcadoParaEliminar).map(a => a.id);

        // Archivos nuevos para subir
        const archivosParaSubir = archivos.filter(a =>
            (a.esNuevo || a.file) && !a.marcadoParaEliminar
        );

        // Archivos existentes que se mantienen
        const archivosExistentes = archivos.filter(a =>
            a.esExistente && !a.marcadoParaEliminar
        );

        return {
            personal: PersonalAdaptador.toApiRequest(formData),
            archivos: {
                nuevos: ArchivosAdaptador.prepararArchivosParaSubir(archivosParaSubir),
                existentes: archivosExistentes,
                eliminar: archivosParaEliminar
            }
        };
    };

    return {
        formData,
        errors,
        archivos,
        archivosErrors,
        loading,
        errorCarga,
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