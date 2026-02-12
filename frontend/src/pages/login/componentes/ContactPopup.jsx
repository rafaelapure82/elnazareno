import React, { useState } from 'react';
import ContactInfoCard from '../../contacto/componente/ContactInfoCard';

const ContactPopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Botón en el login */}
            <div className="text-center pt-4">
                <button
                    onClick={() => setIsOpen(true)}
                    className="text-sm text-gray-600 hover:text-blue-600 transition duration-200 inline-flex items-center group"
                >
                    <div className="p-1.5 mr-2 bg-blue-50 group-hover:bg-blue-100 rounded-lg transition-colors">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                        </svg>
                    </div>
                    <span>Contactar al administrador</span>
                </button>
            </div>

            {/* Modal/Popup */}
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        {/* Fondo oscuro */}
                        <div
                            className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                            onClick={() => setIsOpen(false)}
                        ></div>

                        {/* Contenido del modal */}
                        <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-transparent shadow-none">
                            <div className="relative">
                                {/* Botón cerrar */}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute -top-10 right-0 p-2 text-white hover:text-gray-200 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>

                                {/* Tarjeta de contacto */}
                                <ContactInfoCard />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContactPopup;