// components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contextos/AuthContexto';
import LoadingSpinner from './../compartidos/componentes/LoadingSpinner';

const ProtectedRouter = ({
    children,
    requiredRoles = [],
    requiredPermissions = [],
    redirectTo = "/unauthorized"
}) => {
    const {
        isAuthenticated,
        isLoading,
        user,
        hasRole,
        hasPermission
    } = useAuth();

    const location = useLocation();

    // 1. Loading state
    if (isLoading) {
        return (
            <LoadingSpinner
                fullScreen={true}
                text="Verificando permisos..."
                variant="primary"
            />
        );
    }

    // 2. Verificar autenticación
    if (!isAuthenticated) {
        // Guardar la ruta actual para redirigir después del login
        return (
            <Navigate
                to="/login"
                state={{
                    from: location.pathname,
                    message: "Por favor inicia sesión para acceder"
                }}
                replace
            />
        );
    }

    // 3. Verificar roles (si se especifican)
    if (requiredRoles.length > 0) {
        const hasRequiredRole = requiredRoles.some(role => hasRole(role));

        if (!hasRequiredRole) {
            return (
                <Navigate
                    to={redirectTo}
                    state={{
                        requiredRoles,
                        userRoles: user?.roles || [],
                        from: location.pathname
                    }}
                    replace
                />
            );
        }
    }

    // 4. Verificar permisos (si se especifican)
    if (requiredPermissions.length > 0) {
        const hasRequiredPermission = requiredPermissions.some(
            permission => hasPermission(permission)
        );

        if (!hasRequiredPermission) {
            return (
                <Navigate
                    to={redirectTo}
                    state={{
                        requiredPermissions,
                        userPermissions: user?.permissions || [],
                        from: location.pathname
                    }}
                    replace
                />
            );
        }
    }

    // 5. Todo OK, renderizar contenido
    return children;
};

export default ProtectedRouter;