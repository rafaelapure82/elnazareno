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