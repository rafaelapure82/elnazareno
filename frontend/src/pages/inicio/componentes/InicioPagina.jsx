import { FaSync, FaExclamationTriangle, FaHome } from 'react-icons/fa';
import { useInicio } from '../hooks/useInicio';
import TarjetaEstadisticas from './TarjetaEstadisticas';
import { useAuth } from '../../../contextos/AuthContexto';

const InicioPagina = () => {
    const {
        statCardsData,
        loading,
        error,
        refreshData
    } = useInicio();
    const {
        user,
    } = useAuth();
    console.log(user);
    if (error) {
        return (
            <div className="p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                        <div className="flex items-center">
                            <FaExclamationTriangle className="h-6 w-6 text-red-600 mr-3" />
                            <div>
                                <h3 className="text-lg font-medium text-red-800">Error al cargar datos</h3>
                                <p className="text-red-600 mt-1">{error}</p>
                                <button
                                    onClick={refreshData}
                                    className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center"
                                >
                                    <FaSync className="h-4 w-4 mr-2" />
                                    Reintentar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center">
                            <FaHome className="h-8 w-8 text-indigo-600 mr-3" />
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    Bienvenido {user?.name || 'Usuario'}
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    Resumen estadístico general de la institución
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={refreshData}
                            disabled={loading}
                            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                        >
                            <FaSync className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                            {loading ? 'Actualizando...' : 'Actualizar'}
                        </button>
                    </div>
                </div>

                {/* Grid de estadísticas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
                    {loading ? (
                        // Skeleton loading para 5 cards
                        [...Array(5)].map((_, index) => (
                            <TarjetaEstadisticas key={index} loading={true} />
                        ))
                    ) : (
                        statCardsData.map((stat) => (
                            <TarjetaEstadisticas
                                key={stat.id}
                                title={stat.title}
                                value={stat.value}
                                icon={stat.icon}
                                color={stat.color}
                                description={stat.description}
                            />
                        ))
                    )}
                </div>

                {/* Resumen general */}
                {!loading && statCardsData.length > 0 && (
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Resumen General</h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {statCardsData.map((stat) => (
                                <div key={stat.id} className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                    <div className="text-sm text-gray-600 mt-1">{stat.title}</div>
                                </div>
                            ))}

                            {/* Total general */}
                            <div className="text-center p-4 bg-indigo-50 rounded-lg col-span-2 md:col-span-2 lg:col-span-1">
                                <div className="text-2xl font-bold text-indigo-900">
                                    {statCardsData.reduce((sum, stat) => {
                                        if (stat.id !== 'sections') return sum + stat.value;
                                        return sum;
                                    }, 0)}
                                </div>
                                <div className="text-sm text-indigo-600 mt-1">Total Personas</div>
                            </div>
                        </div>

                        {/* Pie de página */}
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Última actualización: {new Date().toLocaleDateString('es-ES', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                                <div className="mt-2 sm:mt-0">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                        <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                                        Sistema Activo
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InicioPagina;