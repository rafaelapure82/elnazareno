const DashboardPage = () => {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
            <p className="text-gray-600 mb-6">
                Bienvenido al sistema de gestión escolar.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h3 className="font-semibold text-blue-700">Estadísticas</h3>
                    <p className="text-2xl font-bold mt-2">1,250</p>
                    <p className="text-sm text-gray-500">Estudiantes activos</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h3 className="font-semibold text-green-700">Docentes</h3>
                    <p className="text-2xl font-bold mt-2">85</p>
                    <p className="text-sm text-gray-500">Profesores activos</p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                    <h3 className="font-semibold text-purple-700">Actividades</h3>
                    <p className="text-2xl font-bold mt-2">12</p>
                    <p className="text-sm text-gray-500">Próximas actividades</p>
                </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-700">
                    ✅ Si puedes ver este contenido, significa que el Layout con Sidebar está funcionando correctamente.
                </p>
            </div>
        </div>
    );
};

export default DashboardPage;

/*hola necesito hacer un modulo secciones con el patrón de carpetas ,personal: adaptadores, componentes, hooks, servicios: primero tenemos los endpoint de grados: router.post("/grados", seccionesController.crearGrado) esto es lo que espera : { nombre, nivel } y lo que que devuelve : "success":true,"message":"Grado creado exitosamente","data":{"id":7,"nombre":"1ER GRADO","nivel":"Primaria"}}, el otro es router.get("/grados", seccionesController.obtenerGrados)
esto es lo que me retorna  : {"success":true,"message":"Grados obtenidos exitosamente","data":[{"id":7,"nombre":"1ER GRADO","nivel":"Primaria","created_at":"2026-01-22T09:40:37.000Z","updated_at":"2026-01-22T09:40:37.000Z","total_secciones":0,"total_profesores":0,"total_estudiantes":0},{"id":5,"nombre":"2DO GRADO","nivel":"Media","created_at":"2025-12-06T20:49:47.000Z","updated_at":"2025-12-06T20:53:42.000Z","total_secciones":1,"total_profesores":0,"total_estudiantes":0}]} tambien tengo este router.get("/grados/:id", seccionesController.obtenerGradoPorId) que retorna toda la informacion de un solo grado , tengo este para editar : router.put("/grados/:id", seccionesController.actualizarGrado) que retorna : {"success":true,"message":"Grado actualizado exitosamente","data":{"id":5,"nombre":"2DO GRADO","nivel":"Media","created_at":"2025-12-06T20:49:47.000Z","updated_at":"2026-01-22T09:54:12.000Z"}}, este router.delete("/grados/:id", seccionesController.eliminarGrado) que retorna : {
    "success": true,
    "message": "Grado eliminado exitosamente",
    "resultado": 1
}
este es la columna de nivel y lo que acepta `nivel` enum('Inicial','Primaria','Media','Jovenes y Adultos') NOT NULL,  ahora vamos con los endpoint de secciones(es decir las secciones que va a tener cada grado ), router.post("/secciones", seccionesController.crearSeccion), estos son los valores que espera : grado_id, nombre, capacidad_maxima y esto es lo que retorna : {"success":true,"message":"Sección creada exitosamente","data":{"id":7,"grado_id":"7","nombre":"A","capacidad_maxima":"30"}}, el otro es router.get("/grados/:gradoId/secciones", seccionesController.obtenerSeccionesPorGrado);//eso es lo que retorna : {
    "success": true,
    "message": "Secciones obtenidas exitosamente",
    "data": [
        {
            "id": 7,
            "grado_id": 7,
            "nombre": "A",
            "capacidad_maxima": 30,
            "created_at": "2026-01-22T09:59:46.000Z",
            "updated_at": "2026-01-22T09:59:46.000Z",
            "grado_nombre": "1ER GRADO",
            "total_profesores": 0,
            "total_estudiantes": 0
        }
    ]
}
router.get("/secciones/:id", seccionesController.obtenerSeccionCompleta): esto es lo que nos retorna : {"success":true,"message":"Sección obtenida exitosamente","data":{"data":{"id":7,"grado_id":7,"nombre":"A","capacidad_maxima":30,"created_at":"2026-01-22T09:59:46.000Z","updated_at":"2026-01-22T09:59:46.000Z","profesores":[],"estudiantes":[],"capacidad_actual":0}}} , este otro router.put("/secciones/:id", seccionesController.actualizarSeccion);esto es lo que espera const { id } = req.params;
 ,const { nombre, capacidad_maxima }esto es lo que retorna {
    "success": true,
    "message": "Sección actualizada exitosamente",
    "data": {
        "id": 7,
        "grado_id": 7,
        "nombre": "A",
        "capacidad_maxima": 30,
        "created_at": "2026-01-22T09:59:46.000Z",
        "updated_at": "2026-01-22T10:09:02.000Z"
    }
}esta para eliminar router.delete("/secciones/:id", seccionesController.eliminarSeccion);esto es lo que retorna
{
    "success": true,
    "message": "Sección eliminada exitosamente",
    "data": 1
}


 */