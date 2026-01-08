const LoadingSpinner = ({
    fullScreen = false,
    text = "Cargando...",
    showText = true
}) => {
    return (
        <div className={`
            ${fullScreen
                ? 'fixed inset-0 bg-white z-10'
                : 'absolute inset-0 bg-white/50'
            } 
            flex flex-col items-center justify-center
            transition-all duration-300
        `}>
            {/* Spinner que crece con el dispositivo */}
            <div className={`
                animate-spin rounded-full 
                border-4 border-gray-200 border-t-blue-600
                h-10 w-10      /* Móvil */
                sm:h-12 sm:w-12  /* Tablet */
                md:h-14 md:w-14  /* Laptop */
                lg:h-16 lg:w-16  /* Desktop */
            `}></div>

            {/* Texto que también escala */}
            {showText && text && (
                <p className={`
                    mt-4 text-gray-600 font-medium text-center
                    text-sm      /* Móvil */
                    sm:text-base /* Tablet */
                    md:text-lg   /* Laptop */
                    px-4 max-w-xs sm:max-w-sm
                `}>
                    {text}
                </p>
            )}
        </div>
    );
};

export default LoadingSpinner;