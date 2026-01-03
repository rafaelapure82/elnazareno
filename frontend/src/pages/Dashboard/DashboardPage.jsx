// src/pages/Dashboard/DashboardPage.jsx
const DashboardPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow p-6">
                    <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                    <p className="text-gray-600">
                        Bienvenido al dashboard. Esta página estará protegida.
                    </p>
                    <div className="mt-6">
                        <button
                            onClick={() => window.location.href = '/login'}
                            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                        >
                            Cerrar Sesión (simulado)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;