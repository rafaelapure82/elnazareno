import { useState, useCallback } from 'react';
import { ArchivosServicio } from '../servicios/archivo.servicio';
import { ArchivosAdaptador } from '../adaptadores/archivo.adaptador';

export const useSubirArhivo = () => {
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadError, setUploadError] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const subirArchivo = useCallback(async (formData, metadata = {}) => {
        setUploading(true);
        setUploadError(null);
        setUploadSuccess(false);
        setUploadProgress(0);

        try {
            // Crear FormData adaptado
            const uploadForm = ArchivosAdaptador.toUploadForm(formData, metadata);

            // Simular progreso (en producción usaría axios con onUploadProgress)
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return prev;
                    }
                    return prev + 10;
                });
            }, 200);

            // Subir archivo
            const response = await ArchivosServicio.subirArchivo(uploadForm);

            clearInterval(progressInterval);
            setUploadProgress(100);
            setUploadSuccess(true);

            return ArchivosAdaptador.fromApiResponse(response);

        } catch (err) {
            setUploadError(err.message || 'Error al subir archivo');
            throw err;
        } finally {
            setUploading(false);
            // Resetear progreso después de 2 segundos
            setTimeout(() => {
                setUploadProgress(0);
                setUploadSuccess(false);
            }, 2000);
        }
    }, []);

    const resetUpload = useCallback(() => {
        setUploading(false);
        setUploadProgress(0);
        setUploadError(null);
        setUploadSuccess(false);
    }, []);

    return {
        uploading,
        uploadProgress,
        uploadError,
        uploadSuccess,
        subirArchivo,
        resetUpload
    };
};