import React, { useState } from 'react';
import UsuarioLista from './componentes/UsuarioLista';
import UsuarioFormulario from './componentes/UsuarioFormulario';
import UsuarioDetalle from './componentes/UsuarioDetalle';
import { FaUsers } from 'react-icons/fa';
import { useAuth } from '../../contextos/AuthContexto';

const UsuariosModulo = () => {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [modoModal, setModoModal] = useState('nuevo'); // 'nuevo', 'editar', 'ver'
    const { hasRole } = useAuth();

    // Verificar si el usuario actual es administrador
    // if (!hasRole('administrador')) {
    //     return (
    //         <div className="flex items-center justify-center min-h-screen">
    //             <div className="text-center">
    //                 <FaUsers className="h-12 w-12 text-gray-400 mx-auto mb-4" />
    //                 <h2 className="text-xl font-semibold text-gray-700">Acceso restringido</h2>
    //                 <p className="text-gray-500 mt-2">
    //                     Solo los administradores pueden acceder a esta sección
    //                 </p>
    //             </div>
    //         </div>
    //     );
    // }

    const abrirModalNuevo = () => {
        setUsuarioSeleccionado(null);
        setModoModal('nuevo');
        setModalAbierto(true);
    };

    const abrirModalEditar = (usuario) => {
        setUsuarioSeleccionado(usuario);
        setModoModal('editar');
        setModalAbierto(true);
    };

    const abrirModalVer = (usuario) => {
        setUsuarioSeleccionado(usuario);
        setModoModal('ver');
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setUsuarioSeleccionado(null);
    };

    const handleGuardarExitoso = () => {
        cerrarModal();
        // Aquí podrías recargar la lista si es necesario
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Título del módulo */}
            <div className="mb-8">
                <div className="flex items-center space-x-3">
                    <FaUsers className="h-8 w-8 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-800">Gestión de Usuarios</h1>
                </div>
                <p className="text-gray-600 mt-2">
                    Administra los usuarios del sistema
                </p>
            </div>

            {/* Lista de usuarios */}
            <UsuarioLista
                onNuevoUsuario={abrirModalNuevo}
                onEditarUsuario={abrirModalEditar}
                onVerUsuario={abrirModalVer}
            />

            {/* Modales */}
            {modalAbierto && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        {/* Header del modal */}
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-xl font-bold text-gray-800">
                                {modoModal === 'nuevo' && 'Nuevo Usuario'}
                                {modoModal === 'editar' && 'Editar Usuario'}
                                {modoModal === 'ver' && 'Detalles del Usuario'}
                            </h3>
                        </div>

                        {/* Contenido del modal */}
                        <div className="p-6">
                            {modoModal === 'ver' ? (
                                <UsuarioDetalle
                                    usuarioId={usuarioSeleccionado?.id}
                                    onClose={cerrarModal}
                                />
                            ) : (
                                <UsuarioFormulario
                                    usuario={usuarioSeleccionado}
                                    onGuardar={handleGuardarExitoso}
                                    onCancelar={cerrarModal}
                                    modo={modoModal}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsuariosModulo;