// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Carpeta EN LA MISMA UBICACIÓN que este archivo
// const uploadDir = path.join(__dirname, 'carpeta-estudiantes/');

// // Crear directorio automáticamente
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Configuración de almacenamiento
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadDir);
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         const ext = path.extname(file.originalname);
//         cb(null, 'foto-' + uniqueSuffix + ext);
//     }
// });

// // Filtrar tipos de archivos
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png|gif/;
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedTypes.test(file.mimetype);

//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb(new Error('Solo se permiten imágenes (JPEG, JPG, PNG, GIF)'));
//     }
// };

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 5 * 1024 * 1024 },
//     fileFilter: fileFilter
// });

// // Exportar la ruta para acceso externo si es necesario
// upload.uploadPath = uploadDir;

// module.exports = upload;


// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Carpeta EN LA MISMA UBICACIÓN que este archivo
// const uploadDir = path.join(__dirname, '../uploads/estudiantes/');

// // Crear directorio automáticamente
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
//     console.log(`Directorio creado: ${uploadDir}`);
// }

// // Configuración de almacenamiento
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadDir);
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         const ext = path.extname(file.originalname);
//         const originalName = path.basename(file.originalname, ext);
//         const safeName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
//         cb(null, 'foto-' + safeName + '-' + uniqueSuffix + ext);
//     }
// });

// // Filtrar tipos de archivos
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png|gif/;
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedTypes.test(file.mimetype);

//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb(new Error('Solo se permiten imágenes (JPEG, JPG, PNG, GIF)'));
//     }
// };

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 5 * 1024 * 1024, // 5MB
//         files: 1 // Solo un archivo
//     },
//     fileFilter: fileFilter
// });

// // Middleware para manejar errores de multer
// const handleMulterError = (err, req, res, next) => {
//     if (err instanceof multer.MulterError) {
//         if (err.code === 'LIMIT_FILE_SIZE') {
//             return res.status(400).json({
//                 success: false,
//                 message: 'El archivo es demasiado grande. Tamaño máximo: 5MB'
//             });
//         }
//         if (err.code === 'LIMIT_FILE_COUNT') {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Solo se permite subir un archivo'
//             });
//         }
//     } else if (err) {
//         return res.status(400).json({
//             success: false,
//             message: err.message || 'Error al subir el archivo'
//         });
//     }
//     next();
// };

// // Exportar la ruta para acceso externo
// upload.uploadPath = uploadDir;
// module.exports = upload;
// module.exports.handleMulterError = handleMulterError;


const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Carpeta EN LA MISMA UBICACIÓN que este archivo (carpeta-estudiantes)
const uploadDir = path.join(__dirname, 'carpeta-estudiantes');

// Crear directorio automáticamente
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`Directorio creado: ${uploadDir}`);
}

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const originalName = path.basename(file.originalname, ext);
        const safeName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
        const fileName = 'foto-' + safeName + '-' + uniqueSuffix + ext;

        // Guardar el nombre del archivo en req para poder acceder después
        req.fotoNombre = fileName;
        req.fileName = fileName; // También lo guardo aquí por si acaso

        cb(null, fileName);
    }
});

// Filtrar tipos de archivos
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes (JPEG, JPG, PNG, GIF)'));
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
        files: 1 // Solo un archivo
    },
    fileFilter: fileFilter
});

// Middleware personalizado que retorna el nombre del archivo
const uploadEstudianteFoto = (req, res, next) => {
    const uploadSingle = upload.single('foto'); // Asegúrate que 'foto' coincida con el campo del formulario

    uploadSingle(req, res, function (err) {
        if (err) {
            // Manejar errores de multer
            if (err instanceof multer.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({
                        success: false,
                        message: 'El archivo es demasiado grande. Tamaño máximo: 5MB'
                    });
                }
                if (err.code === 'LIMIT_FILE_COUNT') {
                    return res.status(400).json({
                        success: false,
                        message: 'Solo se permite subir un archivo'
                    });
                }
                return res.status(400).json({
                    success: false,
                    message: `Error al subir archivo: ${err.message}`
                });
            } else if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message || 'Error al subir el archivo'
                });
            }
        }

        // Si no hay archivo, permitir continuar pero con advertencia
        if (!req.file) {
            console.log('ADVERTENCIA: No se ha seleccionado ninguna imagen');
            req.fotoNombre = null;
            return next();
        }

        console.log('✅ Foto subida exitosamente:', req.file.filename);
        console.log('📸 Nombre guardado en req.fotoNombre:', req.fotoNombre);

        // NO RETORNAR RESPUESTA AQUÍ, solo continuar
        next();
    });
};

// Middleware SOLO para obtener el nombre (ya no retorna respuesta)
const setNombreArchivo = (req, res, next) => {
    // Este middleware solo asegura que tengamos el nombre disponible
    if (!req.fotoNombre && req.file) {
        req.fotoNombre = req.file.filename;
    }
    next();
};

// Middleware para verificar que la foto se subió (opcional)
const verificarFoto = (req, res, next) => {
    if (!req.file && !req.fotoNombre) {
        return res.status(400).json({
            success: false,
            message: 'No se ha seleccionado ninguna imagen'
        });
    }
    next();
};

// Exportar configuraciones
module.exports = {
    upload: upload,
    uploadEstudianteFoto: uploadEstudianteFoto,
    setNombreArchivo: setNombreArchivo,
    verificarFoto: verificarFoto,
    uploadDir: uploadDir
};