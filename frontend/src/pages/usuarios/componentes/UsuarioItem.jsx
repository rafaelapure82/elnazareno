import React from 'react';
import { FaEdit, FaTrash, FaEye, FaUserShield, FaUser } from 'react-icons/fa';

const UsuarioItem = ({ usuario, onEdit, onDelete, onView, usuarioActualId }) => {
    const esUsuarioActual = usuario.id === usuarioActualId;
    const esAdministrador = usuario.rol === 'administrador';

    return (
        <tr className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        {esAdministrador ? (
                            <FaUserShield className="h-5 w-5 text-blue-600" />
                        ) : (
                            <FaUser className="h-5 w-5 text-gray-600" />
                        )}
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                            {usuario.nombre}
                            {esUsuarioActual && (
                                <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                    Tú
                                </span>
                            )}
                        </div>
                        <div className="text-sm text-gray-500">@{usuario.usuario}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{usuario.correo}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${esAdministrador
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                    {usuario.rol}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {usuario.ultimoLogin
                    ? new Date(usuario.ultimoLogin).toLocaleDateString('es-ES')
                    : 'Nunca'
                }
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                    onClick={() => onView(usuario)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                    title="Ver detalles"
                >
                    <FaEye className="h-5 w-5" />
                </button>
                <button
                    onClick={() => onEdit(usuario)}
                    className="text-green-600 hover:text-green-900 mr-3"
                    title="Editar"
                >
                    <FaEdit className="h-5 w-5" />
                </button>
                <button
                    onClick={() => onDelete(usuario.id)}
                    disabled={esUsuarioActual}
                    className={`${esUsuarioActual
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-red-600 hover:text-red-900'
                        }`}
                    title={esUsuarioActual ? "No puedes eliminar tu propio usuario" : "Eliminar"}
                >
                    <FaTrash className="h-5 w-5" />
                </button>
            </td>
        </tr>
    );
};

export default UsuarioItem;