import {
    FaUserGraduate,
    FaChalkboardTeacher,
    FaUserTie,
    FaHardHat,
    FaUsers,
    FaArrowUp,
    FaArrowDown
} from 'react-icons/fa';

const iconMap = {
    FaUserGraduate: FaUserGraduate,
    FaChalkboardTeacher: FaChalkboardTeacher,
    FaUserTie: FaUserTie,
    FaHardHat: FaHardHat,
    FaUsers: FaUsers,
};

const colorClasses = {
    blue: {
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        iconBg: 'bg-blue-100',
    },
    green: {
        bg: 'bg-green-50',
        text: 'text-green-600',
        iconBg: 'bg-green-100',
    },
    purple: {
        bg: 'bg-purple-50',
        text: 'text-purple-600',
        iconBg: 'bg-purple-100',
    },
    orange: {
        bg: 'bg-orange-50',
        text: 'text-orange-600',
        iconBg: 'bg-orange-100',
    },
    red: {
        bg: 'bg-red-50',
        text: 'text-red-600',
        iconBg: 'bg-red-100',
    },
};

const TarjetaEstadisticas = ({
    title,
    value,
    icon,
    color = 'blue',
    description,
    loading = false
}) => {
    const IconComponent = iconMap[icon] || FaUserGraduate;
    const colors = colorClasses[color] || colorClasses.blue;

    const formatNumber = (num) => {
        return new Intl.NumberFormat('es-ES').format(num);
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm animate-pulse">
                <div className="flex items-center justify-between">
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                        <div className="h-8 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
                </div>
                <div className="h-3 bg-gray-200 rounded w-32 mt-4"></div>
            </div>
        );
    }

    return (
        <div className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 ${colors.bg}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                        {formatNumber(value)}
                    </p>
                </div>

                <div className={`p-3 rounded-lg ${colors.iconBg}`}>
                    <IconComponent className={`h-8 w-8 ${colors.text}`} />
                </div>
            </div>

            {description && (
                <p className="text-sm text-gray-500 mt-4">{description}</p>
            )}
        </div>
    );
};

export default TarjetaEstadisticas;