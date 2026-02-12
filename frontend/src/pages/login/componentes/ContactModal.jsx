import React from 'react';
import Swal from 'sweetalert2'

const ContactModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const contactMethods = [
        {
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
            ),
            title: "Email Institucional",
            value: "edumarielbaro@gmail.com",
            subtitle: "Respuesta en 24-48h",
            action: "email",
            color: "blue"
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
            ),
            title: "Teléfono de Soporte",
            value: "0424-3196465",
            subtitle: "Lun-Vie 8:00-18:00",
            action: "phone",
            color: "green"
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
            ),
            title: "Direccion",
            value: "Puerto Miranda - Calle Principal",
            subtitle: "7:00-12:00",
            action: "office",
            color: "purple"
        }
    ];

    const handleEmailClick = () => {
        window.location.href = "mailto:admin@escuela.edu?subject=Consulta%20Sistema%20Escolar&body=Hola,%20necesito%20ayuda%20con:%0D%0A%0D%0A[Describe%20tu%20problema%20aquí]%0D%0A%0D%0ADatos%20de%20contacto:";
        onClose();
    };

    const handlePhoneClick = () => {
        window.location.href = "tel:+1234567890";
        onClose();
    };

    const handleAction = (actionType) => {
        switch (actionType) {
            case 'email':
                handleEmailClick();
                break;
            case 'phone':
                handlePhoneClick();
                break;
            case 'office':
                Swal.fire({
                    title: 'Ubicación',
                    html: `
    <div style="width: 100%; height: 300px;">
      <iframe 
        width="100%" 
        height="100%" 
        frameborder="0" 
        scrolling="no" 
        marginheight="0" 
        marginwidth="0" 
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d460.4961516931565!2d-67.47252350210499!3d7.9031186653209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses-419!2sve!4v1769722083138!5m2!1ses-419!2sve">
      </iframe>
    </div>
  `,
                    width: 600,
                    showCloseButton: true,
                    showConfirmButton: false
                });
                onClose();
                break;
            default:
                break;
        }
    };

    const getColorClasses = (color) => {
        switch (color) {
            case 'blue':
                return {
                    bg: 'bg-blue-50',
                    border: 'border-blue-200',
                    text: 'text-blue-700',
                    hover: 'hover:bg-blue-100',
                    icon: 'text-blue-600',
                    button: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                };
            case 'green':
                return {
                    bg: 'bg-green-50',
                    border: 'border-green-200',
                    text: 'text-green-700',
                    hover: 'hover:bg-green-100',
                    icon: 'text-green-600',
                    button: 'bg-green-100 text-green-700 hover:bg-green-200'
                };
            case 'purple':
                return {
                    bg: 'bg-purple-50',
                    border: 'border-purple-200',
                    text: 'text-purple-700',
                    hover: 'hover:bg-purple-100',
                    icon: 'text-purple-600',
                    button: 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                };
            default:
                return {
                    bg: 'bg-gray-50',
                    border: 'border-gray-200',
                    text: 'text-gray-700',
                    hover: 'hover:bg-gray-100',
                    icon: 'text-gray-600',
                    button: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                };
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                {/* Fondo oscuro */}
                <div
                    className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                    onClick={onClose}
                ></div>

                {/* Contenido del modal */}
                <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    {/* Header del modal */}
                    <div className="px-6 pt-6 pb-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Contacto de Soporte
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Selecciona una opción para contactarnos
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Contenido del modal */}
                    <div className="px-6 py-4">
                        {/* Métodos de contacto */}
                        <div className="space-y-4 mb-6">
                            {contactMethods.map((method, index) => {
                                const colors = getColorClasses(method.color);
                                return (
                                    <div
                                        key={index}
                                        className={`
                                            ${colors.bg} ${colors.border} ${colors.hover}
                                            border rounded-xl p-4 
                                            transition-all duration-200 
                                            cursor-pointer transform-gpu hover:scale-102
                                            flex items-center justify-between
                                        `}
                                        onClick={() => handleAction(method.action)}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className={`p-2 rounded-lg bg-white shadow-sm ${colors.icon}`}>
                                                {method.icon}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">{method.title}</p>
                                                <p className="text-xs text-gray-600">{method.subtitle}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-gray-900">{method.value}</p>
                                            <span className={`text-xs font-medium px-3 py-1 rounded-lg mt-1 inline-block ${colors.button}`}>
                                                {method.action === 'email' && 'Email'}
                                                {method.action === 'phone' && 'Llamar'}
                                                {method.action === 'office' && 'Info'}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Información adicional */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 mb-6">
                            <div className="flex items-start">
                                <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <div>
                                    <h4 className="text-sm font-semibold text-blue-700 mb-1">
                                        Tiempos de respuesta
                                    </h4>
                                    <p className="text-xs text-blue-600">
                                        • Email: 24-48h hábiles
                                        <br />
                                        • Teléfono: Inmediato en horario
                                        <br />
                                        • Urgencias: Ext. 100
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Consejos */}
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                <svg className="w-4 h-4 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                Para una atención más rápida:
                            </h4>
                            <ul className="text-xs text-gray-600 space-y-1">
                                <li className="flex items-start">
                                    <svg className="w-3 h-3 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                    Proporciona tu número de matrícula
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-3 h-3 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                    Describe claramente el problema
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer del modal */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
                        <p className="text-xs text-gray-500 text-center">
                            Sistema Escolar • Departamento de Soporte Técnico
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactModal;