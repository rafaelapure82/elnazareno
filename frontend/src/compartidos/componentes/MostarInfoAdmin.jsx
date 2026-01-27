
import { useAuth } from "../../contextos/AuthContexto";

export default function MostarInfoAdmin({ children }) {
    const { user, isAuthenticated, isLoading } = useAuth();

    // Si está cargando, mostrar nada o un loader
    if (isLoading) {
        return null; // O podrías retornar un skeleton loader
    }

    // Si no está autenticado, no mostrar nada
    if (!isAuthenticated) {
        return null;
    }

    // Verificar si el usuario tiene rol de administrador
    // Ajusta esta lógica según cómo manejes los roles en tu aplicación
    const isAdmin = () => {
        // Verificación basada en el objeto user que tienes
        if (user?.roles) {
            // Si roles es un string
            if (typeof user.roles === 'string') {
                return user.roles.toLowerCase() === 'administrador' ||
                    user.roles.toLowerCase() === 'admin';
            }
            // Si roles es un array
            if (Array.isArray(user.roles)) {
                return user.roles.some(role =>
                    role.toLowerCase() === 'administrador' ||
                    role.toLowerCase() === 'admin'
                );
            }
        }
        return false;
    };

    // Si no es administrador, no renderizar los children
    if (!isAdmin()) {
        return null;
    }

    // Si es administrador, renderizar los children
    return (
        <>
            {/* Opcional: Puedes agregar un indicador visual de que es la sección de admin */}
            <div className="mb-2">
                <div className="px-3 py-2">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 w-2 h-6 bg-purple-500 rounded-full mr-2"></div>
                        <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                            Administración
                        </span>
                    </div>
                </div>
                {children}
            </div>
        </>
    );
}