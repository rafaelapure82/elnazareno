import axiosInstance from '../../../compartidos/api/axios.config';

export class UsuarioServicio {
    static async obtenerUsuarios(params = {}) {
        try {
            // Construir query string
            const queryParams = new URLSearchParams();

            if (params.search) queryParams.append('search', params.search);
            if (params.page) queryParams.append('page', params.page);
            if (params.limit) queryParams.append('limit', params.limit);
            if (params.rol) queryParams.append('rol', params.rol);

            const queryString = queryParams.toString();
            const url = `/usuarios${queryString ? `?${queryString}` : ''}`;

            const response = await axiosInstance.get(url);

            return response.data;
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw error;
        }
    }

    static async obtenerUsuarioPorId(id) {
        try {
            const response = await axiosInstance.get(`/usuarios/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            throw error;
        }
    }

    static async crearUsuario(usuarioData) {
        try {
            const response = await axiosInstance.post('/usuarios', usuarioData);
            return response.data;
        } catch (error) {
            console.error('Error al crear usuario:', error);
            throw error;
        }
    }

    static async actualizarUsuario(id, usuarioData) {
        try {
            const response = await axiosInstance.put(`/usuarios/${id}`, usuarioData);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            throw error;
        }
    }

    static async eliminarUsuario(id) {
        try {
            const response = await axiosInstance.delete(`/usuarios/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            throw error;
        }
    }
}