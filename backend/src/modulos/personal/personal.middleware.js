// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');


// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         cb(null, path.join(__dirname, '../carpeta-personal'));
// //     },
// //     filename: (req, file, cb) => {
// //         const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
// //         cb(null, uniqueName);
// //     }
// // });

// // const subir = multer({
// //     storage: storage,
// //     limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
// //     fileFilter: (req, file, cb) => {
// //         const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
// //         if (allowedTypes.includes(file.mimetype)) {
// //             cb(null, true);
// //         } else {
// //             cb(new Error('Tipo de archivo no permitido. Solo JPEG, PNG o PDF'));
// //         }
// //     }
// // });

// class MulterConfig {
//     constructor() {
//         this.carpetaDestino = path.join(__dirname, './carpeta-personal');
//         this.asegurarCarpeta();
//     }

//     asegurarCarpeta() {
//         try {
//             if (!fs.existsSync(this.carpetaDestino)) {
//                 fs.mkdirSync(this.carpetaDestino, {
//                     recursive: true,
//                     mode: 0o755 // Permisos de lectura/escritura
//                 });
//                 console.log(`✅ Carpeta creada exitosamente: ${this.carpetaDestino}`);
//             }

//             // Verificar permisos de escritura
//             fs.accessSync(this.carpetaDestino, fs.constants.W_OK);
//             console.log(`📁 Carpeta lista para uso: ${this.carpetaDestino}`);

//         } catch (error) {
//             console.error(`❌ Error crítico con la carpeta ${this.carpetaDestino}:`, error);
//             throw new Error(`No se puede acceder a la carpeta de destino: ${error.message}`);
//         }
//     }

//     getStorage() {
//         return multer.diskStorage({
//             destination: (req, file, cb) => {
//                 try {
//                     // Verificación final antes de guardar
//                     if (!fs.existsSync(this.carpetaDestino)) {
//                         fs.mkdirSync(this.carpetaDestino, { recursive: true });
//                     }
//                     cb(null, this.carpetaDestino);
//                 } catch (error) {
//                     cb(new Error(`Error al preparar destino: ${error.message}`), null);
//                 }
//             },
//             filename: (req, file, cb) => {
//                 const extension = path.extname(file.originalname);
//                 const nombreBase = path.basename(file.originalname, extension);
//                 const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
//                 cb(null, uniqueName);
//             }
//         });
//     }

//     getFileFilter() {
//         return (req, file, cb) => {
//             const allowedTypes = [
//                 'image/jpeg',
//                 'image/jpg',
//                 'image/png',
//                 'application/pdf'
//             ];

//             if (allowedTypes.includes(file.mimetype)) {
//                 cb(null, true);
//             } else {
//                 cb(new Error(`Tipo de archivo "${file.mimetype}" no permitido. Solo se aceptan: JPEG, JPG, PNG, PDF`), false);
//             }
//         };
//     }
// }

// // Crear instancia de configuración
// const multerConfig = new MulterConfig();

// // Configurar Multer
// const subir = multer({
//     storage: multerConfig.getStorage(),
//     limits: {
//         fileSize: 30 * 1024 * 1024, // 30MB
//         files: 5 // Máximo 5 archivos
//     },
//     fileFilter: multerConfig.getFileFilter()
// });

// // Manejo de errores de Multer
// subir.errorHandler = (error, req, res, next) => {
//     if (error instanceof multer.MulterError) {
//         if (error.code === 'LIMIT_FILE_SIZE') {
//             return res.status(400).json({
//                 success: false,
//                 message: 'El archivo es demasiado grande. Máximo 5MB permitido.'
//             });
//         }
//         if (error.code === 'LIMIT_FILE_COUNT') {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Demasiados archivos. Máximo 10 archivos permitidos.'
//             });
//         }
//     }

//     // Para errores de tipo de archivo
//     if (error.message.includes('Tipo de archivo')) {
//         return res.status(400).json({
//             success: false,
//             message: error.message
//         });
//     }

//     next(error);
// };

// module.exports = subir;


//!Ojo middleware2

// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// class MulterConfig {
//     constructor() {
//         this.carpetaDestino = path.join(__dirname, '/carpeta-personal');
//         this.asegurarCarpeta();
//     }

//     asegurarCarpeta() {
//         try {
//             if (!fs.existsSync(this.carpetaDestino)) {
//                 fs.mkdirSync(this.carpetaDestino, {
//                     recursive: true,
//                     mode: 0o755
//                 });
//                 console.log(`✅ Carpeta creada: ${this.carpetaDestino}`);
//             }
//             fs.accessSync(this.carpetaDestino, fs.constants.W_OK);
//         } catch (error) {
//             console.error(`❌ Error con la carpeta:`, error);
//             throw new Error(`No se puede acceder a la carpeta: ${error.message}`);
//         }
//     }

//     getStorage() {
//         return multer.diskStorage({
//             destination: (req, file, cb) => {
//                 try {
//                     if (!fs.existsSync(this.carpetaDestino)) {
//                         fs.mkdirSync(this.carpetaDestino, { recursive: true });
//                     }
//                     cb(null, this.carpetaDestino);
//                 } catch (error) {
//                     cb(new Error(`Error destino: ${error.message}`), null);
//                 }
//             },
//             filename: (req, file, cb) => {
//                 const extension = path.extname(file.originalname);
//                 const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
//                 cb(null, uniqueName);
//             }
//         });
//     }

//     getFileFilter() {
//         return (req, file, cb) => {
//             // TODAS LAS EXTENSIONES SOLICITADAS
//             const allowedTypes = [
//                 // Imágenes
//                 'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
//                 // PDF
//                 'application/pdf',
//                 // Office (antiguo)
//                 'application/msword', 'application/vnd.ms-excel', 'application/vnd.ms-powerpoint',
//                 // Office (nuevo)
//                 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//                 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//                 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
//                 // Texto
//                 'text/plain'
//             ];

//             if (allowedTypes.includes(file.mimetype)) {
//                 cb(null, true);
//             } else {
//                 const formatos = 'JPG, PNG, GIF, WEBP, PDF, DOC, XLS, PPT, TXT (y versiones modernas DOCX, XLSX, PPTX)';
//                 cb(new Error(`Tipo de archivo no permitido. Solo: ${formatos}`), false);
//             }
//         };
//     }
// }

// const multerConfig = new MulterConfig();

// // Configuración principal
// const subir = multer({
//     storage: multerConfig.getStorage(),
//     limits: {
//         fileSize: 30 * 1024 * 1024, // 30MB
//         files: 10
//     },
//     fileFilter: multerConfig.getFileFilter()
// });

// // Exportar middleware específicos
// subir.singleUpload = subir.single('archivo');
// subir.arrayUpload = subir.array('archivos', 10);
// subir.fieldsUpload = subir.fields([
//     { name: 'foto', maxCount: 1 },
//     { name: 'documentos', maxCount: 5 }
// ]);

// // Middleware de error
// subir.errorHandler = (error, req, res, next) => {
//     if (error instanceof multer.MulterError) {
//         let message = 'Error al subir archivo';
//         if (error.code === 'LIMIT_FILE_SIZE') message = 'Archivo muy grande (máx 30MB)';
//         if (error.code === 'LIMIT_FILE_COUNT') message = 'Demasiados archivos (máx 10)';

//         return res.status(400).json({ success: false, message });
//     }

//     if (error.message.includes('Tipo de archivo')) {
//         return res.status(400).json({ success: false, message: error.message });
//     }

//     next(error);
// };

// module.exports = subir;



const multer = require('multer');
const path = require('path');
const fs = require('fs');

class MulterConfig {
    constructor() {
        this.carpetaDestino = path.join(__dirname, '/carpeta-personal');
        this.asegurarCarpeta();
    }

    asegurarCarpeta() {
        try {
            if (!fs.existsSync(this.carpetaDestino)) {
                fs.mkdirSync(this.carpetaDestino, {
                    recursive: true,
                    mode: 0o755
                });
                console.log(`✅ Carpeta creada: ${this.carpetaDestino}`);
            }
            fs.accessSync(this.carpetaDestino, fs.constants.W_OK);
        } catch (error) {
            console.error(`❌ Error con la carpeta:`, error);
            throw new Error(`No se puede acceder a la carpeta: ${error.message}`);
        }
    }

    getStorage() {
        return multer.diskStorage({
            destination: (req, file, cb) => {
                try {
                    if (!fs.existsSync(this.carpetaDestino)) {
                        fs.mkdirSync(this.carpetaDestino, { recursive: true });
                    }
                    cb(null, this.carpetaDestino);
                } catch (error) {
                    cb(new Error(`Error destino: ${error.message}`), null);
                }
            },
            filename: (req, file, cb) => {
                const extension = path.extname(file.originalname);
                const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
                cb(null, uniqueName);
            }
        });
    }

    getFileFilter() {
        return (req, file, cb) => {
            const allowedTypes = [
                // Imágenes
                'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
                // PDF
                'application/pdf',
                // Office (antiguo)
                'application/msword', 'application/vnd.ms-excel', 'application/vnd.ms-powerpoint',
                // Office (nuevo)
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                // Texto
                'text/plain'
            ];

            if (allowedTypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                const formatos = 'JPG, PNG, GIF, WEBP, PDF, DOC, XLS, PPT, TXT (y versiones modernas DOCX, XLSX, PPTX)';
                cb(new Error(`Tipo de archivo no permitido. Solo: ${formatos}`), false);
            }
        };
    }
}

const multerConfig = new MulterConfig();

// Configuración principal
const subir = multer({
    storage: multerConfig.getStorage(),
    limits: {
        fileSize: 30 * 1024 * 1024, // 30MB
        files: 10
    },
    fileFilter: multerConfig.getFileFilter()
});

// ============================================
// MIDDLEWARE ESPECÍFICOS PARA PERSONAL
// ============================================

//Para registro (POST /personal)
subir.registrarPersonal = subir.fields([
    { name: 'archivos', maxCount: 10 },      // Archivos nuevos
    { name: 'foto_perfil', maxCount: 1 }     // Foto opcional
]);

// Para actualización (PUT /personal/:id) - AQUÍ ESTÁ LA SOLUCIÓN
subir.actualizarPersonal = subir.fields([
    { name: 'archivos', maxCount: 10 }       // Solo archivos nuevos
    // NOTA: Los campos 'personal' y 'metadata' van en req.body, no como archivos
]);

//Para subir solo foto
subir.subirFotoPersonal = subir.single('foto_perfil');

//Para subir documentos adicionales
subir.subirDocumentosPersonal = subir.array('documentos', 10);

//Middlewares generales (mantén los que ya tienes)
subir.singleUpload = subir.single('archivo');
subir.arrayUpload = subir.array('archivos', 10);
subir.fieldsUpload = subir.fields([
    { name: 'foto', maxCount: 1 },
    { name: 'documentos', maxCount: 5 }
]);

// ============================================
// MIDDLEWARE PARA ENRUTAR SEGÚN MÉTODO HTTP
// ============================================
subir.personalMiddleware = (req, res, next) => {
    try {
        console.log('🔍 Multer middleware para personal');
        console.log('Método:', req.method);
        console.log('Content-Type:', req.headers['content-type']);

        // Determinar qué middleware usar según el método
        if (req.method === 'POST' && req.path === '/') {
            console.log('📝 Usando middleware para REGISTRAR personal');
            return subir.registrarPersonal(req, res, next);
        }

        if (req.method === 'PUT' && req.path.match(/^\/\d+$/)) {
            console.log('✏️ Usando middleware para ACTUALIZAR personal');
            return subir.actualizarPersonal(req, res, next);
        }

        if (req.method === 'PATCH' && req.path.match(/^\/\d+\/foto$/)) {
            console.log('🖼️ Usando middleware para SUBIR FOTO');
            return subir.subirFotoPersonal(req, res, next);
        }

        // Por defecto, no usar multer si no es multipart
        next();

    } catch (error) {
        console.error('❌ Error en middleware personal:', error);
        next(error);
    }
};

// ============================================
// MIDDLEWARE DE ERRORES
// ============================================
subir.errorHandler = (error, req, res, next) => {
    console.error('❌ Error Multer:', error);

    if (error instanceof multer.MulterError) {
        let message = 'Error al subir archivo';

        switch (error.code) {
            case 'LIMIT_FILE_SIZE':
                message = 'Archivo muy grande (máximo 30MB)';
                break;
            case 'LIMIT_FILE_COUNT':
                message = 'Demasiados archivos (máximo 10)';
                break;
            case 'LIMIT_UNEXPECTED_FILE':
                message = 'Campo de archivo no esperado. Usa solo "archivos" para archivos';
                break;
            case 'LIMIT_PART_COUNT':
                message = 'Demasiadas partes en el formulario';
                break;
            case 'LIMIT_FIELD_KEY':
                message = 'Nombre de campo demasiado largo';
                break;
            default:
                message = `Error Multer: ${error.code}`;
        }

        return res.status(400).json({
            success: false,
            message,
            code: error.code
        });
    }

    if (error.message.includes('Tipo de archivo')) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }

    next(error);
};

// ============================================
// MIDDLEWARE PARA DEBUG
// ============================================
subir.debugMiddleware = (req, res, next) => {
    console.log('=== 🐛 DEBUG MULTER ===');
    console.log('URL:', req.url);
    console.log('Method:', req.method);
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Body keys:', Object.keys(req.body));
    console.log('Files:', req.files ? (Array.isArray(req.files) ? req.files.length : Object.keys(req.files).length) : 0);

    if (req.files) {
        if (Array.isArray(req.files)) {
            req.files.forEach((file, i) => {
                console.log(`  File[${i}]: ${file.fieldname} - ${file.originalname}`);
            });
        } else {
            Object.keys(req.files).forEach(field => {
                console.log(`  Field "${field}": ${req.files[field].length} archivo(s)`);
            });
        }
    }

    console.log('=== 🐛 FIN DEBUG ===');
    next();
};

module.exports = subir;