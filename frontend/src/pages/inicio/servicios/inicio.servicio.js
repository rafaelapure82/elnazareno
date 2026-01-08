import axiosInstance from "../../../compartidos/api/axios.config";


export class InicioServicio {
    static async getStatistics() {
        // Endpoint: GET /dashboard/statistics
        // Respuesta esperada: {
        //   success: true,
        //   data: {
        //     estudiantes: number,
        //     docentes: number,
        //     administrativos: number,
        //     obreros: number,
        //     secciones: number
        //   }
        // }
        return await axiosInstance.get('/estadistica/');
    }

    // static async getRecentActivity() {
    //     // Endpoint: GET /dashboard/activity
    //     return await ApiService.get('/dashboard/activity');
    // }

    // static async getChartsData() {
    //     // Endpoint: GET /dashboard/charts
    //     return await ApiService.get('/dashboard/charts');
    // }
}