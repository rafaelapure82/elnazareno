export class InicioAdaptador {
    static toStatistics(apiResponse) {
        // Adapta la respuesta del API al formato que usa el frontend
        return {
            students: apiResponse.data?.estudiantes || 0,
            teachers: apiResponse.data?.docentes || 0,
            administrative: apiResponse.data?.administrativos || 0,
            workers: apiResponse.data?.obreros || 0,
            sections: apiResponse.data?.secciones || 0,
            lastUpdated: new Date().toISOString()
        };
    }

    static toStatCardData(statistics) {
        // Convierte las estadísticas a formato para las tarjetas
        return [
            {
                id: 'students',
                title: 'Estudiantes',
                value: statistics.students,
                icon: 'FaUserGraduate',
                color: 'blue',
                description: 'Total de estudiantes registrados',
                change: '+12%',
                changeType: 'increase'
            },
            {
                id: 'teachers',
                title: 'Docentes',
                value: statistics.teachers,
                icon: 'FaChalkboardTeacher',
                color: 'green',
                description: 'Total de docentes activos',
                change: '+5%',
                changeType: 'increase'
            },
            {
                id: 'administrative',
                title: 'Administrativos',
                value: statistics.administrative,
                icon: 'FaUserTie',
                color: 'purple',
                description: 'Personal administrativo',
                change: '+3%',
                changeType: 'increase'
            },
            {
                id: 'workers',
                title: 'Obreros',
                value: statistics.workers,
                icon: 'FaHardHat',
                color: 'orange',
                description: 'Personal obrero',
                change: '+2%',
                changeType: 'increase'
            },
            {
                id: 'sections',
                title: 'Secciones',
                value: statistics.sections,
                icon: 'FaUsers',
                color: 'red',
                description: 'Total de secciones activas',
                change: '+8%',
                changeType: 'increase'
            }
        ];
    }
}