import React from 'react';
import { FaUser, FaIdCard, FaSchool, FaBirthdayCake, FaMapMarkerAlt, FaPhone, FaEnvelope, FaUserFriends, FaCalendar, FaVenusMars, FaFlag } from 'react-icons/fa';

const EstudianteDetalle = ({ estudiante }) => {
    if (!estudiante) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">No se encontró información del estudiante.</p>
            </div>
        );
    }
    console.log("aaaaa", estudiante)
    return (
        <div className="space-y-6">
            {/* Encabezado con foto */}
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                        {estudiante.foto ? (
                            <img
                                src={estudiante.fotoUrl}
                                alt={estudiante.nombreCompleto}
                                className="h-32 w-32 rounded-full object-cover border-4 border-white shadow"
                            />
                        ) : (
                            <div className="h-32 w-32 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white shadow">
                                <FaUser className="h-16 w-16 text-blue-600" />
                            </div>
                        )}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{estudiante.nombreCompleto}</h1>
                        <div className="mt-2 flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                <FaSchool className="mr-1" /> {estudiante.cedulaEscolar}
                            </span>
                            {estudiante.cedula && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                    <FaIdCard className="mr-1" /> {estudiante.tipoCedula}-{estudiante.cedula}
                                </span>
                            )}
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                                <FaBirthdayCake className="mr-1" /> {estudiante.edad} años
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                                <FaVenusMars className="mr-1" /> {estudiante.sexo}
                            </span>
                            {estudiante.tipoSangre && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                                    Tipo de Sangre: {estudiante.tipoSangre}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Información en dos columnas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Columna izquierda: Información del estudiante */}
                <div className="space-y-6">
                    {/* Datos personales */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                            <FaUser className="mr-2" />
                            Información Personal
                        </h3>
                        <dl className="grid grid-cols-1 gap-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Nombres Completos</dt>
                                <dd className="mt-1 text-sm text-gray-900">{estudiante.nombres}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Apellidos</dt>
                                <dd className="mt-1 text-sm text-gray-900">{estudiante.apellidos}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Fecha de Nacimiento</dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {new Date(estudiante.fechaNacimiento).toLocaleDateString('es-ES', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })} ({estudiante.edad} años)
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Sexo</dt>
                                <dd className="mt-1 text-sm text-gray-900">{estudiante.sexo}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Nacionalidad</dt>
                                <dd className="mt-1 text-sm text-gray-900 flex items-center">
                                    <FaFlag className="mr-2" /> {estudiante.nacionalidad}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* Documentación */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                            <FaIdCard className="mr-2" />
                            Documentación
                        </h3>
                        <dl className="space-y-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Cédula Escolar</dt>
                                <dd className="mt-1 text-sm text-gray-900">{estudiante.cedulaEscolar}</dd>
                            </div>
                            {estudiante.tieneCedula && (
                                <>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Cédula de Identidad</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{estudiante.tipoCedula}{estudiante.cedula}</dd>
                                    </div>
                                </>
                            )}
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Tipo de Sangre</dt>
                                <dd className="mt-1 text-sm text-gray-900">{estudiante.tipoSangre || 'No especificado'}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* Columna derecha: Dirección y Representante */}
                <div className="space-y-6">
                    {/* Dirección */}
                    {estudiante.direccion && (
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                <FaMapMarkerAlt className="mr-2" />
                                Dirección
                            </h3>
                            <dl className="space-y-3">
                                {estudiante.direccion.estado && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Estado</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{estudiante.direccion.estado}</dd>
                                    </div>
                                )}
                                {estudiante.direccion.municipio && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Municipio</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{estudiante.direccion.municipio}</dd>
                                    </div>
                                )}
                                {estudiante.direccion.parroquia && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Parroquia</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{estudiante.direccion.parroquia}</dd>
                                    </div>
                                )}
                                {estudiante.direccion.sector && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Sector</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{estudiante.direccion.sector}</dd>
                                    </div>
                                )}
                                {estudiante.direccion.calle && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Calle/Avenida</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{estudiante.direccion.calle}</dd>
                                    </div>
                                )}
                                {estudiante.direccion.casa && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Casa/Apartamento</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{estudiante.direccion.casa}</dd>
                                    </div>
                                )}
                                {estudiante.direccion.referencia && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Referencia</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{estudiante.direccion.referencia}</dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                    )}

                    {/* Representante */}
                    {estudiante.representante && (
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                <FaUserFriends className="mr-2" />
                                Representante
                            </h3>
                            <div className="flex items-start space-x-4 mb-4">
                                <div className="flex-shrink-0">
                                    <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                                        <FaUserFriends className="h-8 w-8 text-blue-600" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-gray-900">{estudiante.representante.nombreCompleto}</h4>
                                    <p className="text-sm text-gray-500">{estudiante.representante.relacion}</p>
                                </div>
                            </div>
                            <dl className="space-y-3">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Cédula</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{estudiante.representante.tipoCedula}{estudiante.representante.cedula}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Teléfono</dt>
                                    <dd className="mt-1 text-sm text-gray-900 flex items-center">
                                        <FaPhone className="mr-2" /> {estudiante.representante.telefono}
                                    </dd>
                                </div>
                                {estudiante.representante.email && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                                        <dd className="mt-1 text-sm text-gray-900 flex items-center">
                                            <FaEnvelope className="mr-2" /> {estudiante.representante.email}
                                        </dd>
                                    </div>
                                )}
                                {estudiante.representante.ocupacion && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Ocupación</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{estudiante.representante.ocupacion}</dd>
                                    </div>
                                )}
                                {estudiante.representante.fechaNacimiento && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Fecha de Nacimiento</dt>
                                        <dd className="mt-1 text-sm text-gray-900 flex items-center">
                                            <FaCalendar className="mr-2" />
                                            {new Date(estudiante.representante.fechaNacimiento).toLocaleDateString('es-ES')}
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                    )}
                </div>
            </div>

            {/* Información adicional */}
            <div className="bg-white shadow rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="text-sm font-medium text-gray-500">Fecha de Registro</div>
                        <div className="mt-1 text-lg font-semibold text-gray-900">
                            {new Date(estudiante.createdAt).toLocaleDateString('es-ES')}
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm font-medium text-gray-500">Tiene Cédula</div>
                        <div className="mt-1">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${estudiante.tieneCedula ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {estudiante.tieneCedula ? 'Sí' : 'No'}
                            </span>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm font-medium text-gray-500">ID del Estudiante</div>
                        <div className="mt-1 text-lg font-mono text-gray-900">#{estudiante.id}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EstudianteDetalle;