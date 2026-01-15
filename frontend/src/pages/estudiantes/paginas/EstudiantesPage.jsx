import React, { useState, useCallback } from 'react';
import { FaUserGraduate, FaUsers, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import { useEstudiantes } from '../hooks/useEstudiantes';
import EstudianteFormularioModal from '../componentes/EstudianteFormularioModal';
import EstudianteLista from '../componentes/EstudianteLista';
import EstudianteBuscar from '../componentes/EstudianteBuscar';
import EstudianteComportamiento from '../componentes/EstudianteComportamiento';
import EstudianteDetalleModal from '../componentes/EstudianteDetalleModal';

const EstudiantesPage = () => {
    const [showFormModal, setShowFormModal] = useState(false);
    const [selectedEstudiante, setSelectedEstudiante] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [editingEstudiante, setEditingEstudiante] = useState(null);

    // const {
    //     estudiantes,
    //     loading,
    //     error,
    //     filters,
    //     cargarEstudiantes,
    //     buscarPorCedula,
    //     crearEstudiante,
    //     editarEstudiante,
    //     eliminarEstudiante,
    //     actualizarFiltros
    // } = useEstudiantes();

    const {
        estudiantes,
        loading,
        error,
        filters,
        cargarEstudiantes,
        buscarPorCedula,
        crearEstudiante,
        editarEstudiante,
        eliminarEstudiante,
        actualizarFiltros
    } = useEstudiantes();

    // const handleSearch = (query) => {
    //     if (query.trim()) {
    //         buscarPorCedula(query);
    //     } else {
    //         cargarEstudiantes();
    //     }
    //     actualizarFiltros({ searchQuery: query });
    // };

    // Usar useCallback para handlers
    const handleSearch = useCallback((query) => {
        if (query.trim()) {
            buscarPorCedula(query);
            actualizarFiltros({ searchQuery: query });
        } else {
            cargarEstudiantes();
            actualizarFiltros({ searchQuery: '' });
        }
    }, [buscarPorCedula, cargarEstudiantes, actualizarFiltros]);



    const handleFilterChange = (newFilters) => {
        actualizarFiltros(newFilters);
    };

    const handleCreate = async (data) => {
        try {
            await crearEstudiante(data);
            setShowFormModal(false);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleEdit = async (data) => {
        try {
            await editarEstudiante(editingEstudiante.id, data);
            setShowFormModal(false);
            setEditingEstudiante(null);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este estudiante?')) {
            try {
                await eliminarEstudiante(id);
                setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
            } catch (error) {
                alert(error.message);
            }
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedIds.length === 0) {
            alert('Selecciona al menos un estudiante para eliminar');
            return;
        }

        if (window.confirm(`¿Estás seguro de eliminar ${selectedIds.length} estudiante(s)?`)) {
            try {
                for (const id of selectedIds) {
                    await eliminarEstudiante(id);
                }
                setSelectedIds([]);
            } catch (error) {
                alert(error.message);
            }
        }
    };

    const handleSelectEstudiante = (id) => {
        setSelectedIds(prev => {
            if (prev.includes(id)) {
                return prev.filter(selectedId => selectedId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const handleViewEstudiante = (estudiante) => {
        setSelectedEstudiante(estudiante);
        setShowDetailModal(true);
    };

    const handleEditEstudiante = (estudiante) => {
        setEditingEstudiante(estudiante);
        setShowFormModal(true);
    };

    const handleExport = () => {
        // Exportar lista a CSV
        const headers = ['ID', 'Nombre', 'Cédula', 'Cédula Escolar', 'Género', 'Edad', 'Representante', 'Teléfono'];
        const csvData = estudiantes.map(est => [
            est.id,
            est.nombreCompleto,
            est.cedula,
            est.cedula_escolar,
            est.genero,
            est.edad,
            est.representante?.nombreCompleto || '',
            est.representante?.telefono || ''
        ]);

        const csvContent = [
            headers.join(','),
            ...csvData.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'estudiantes.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePrint = () => {
        window.print();
    };

    const getStats = () => {
        const total = estudiantes.length;
        const masculinos = estudiantes.filter(e => e.genero === 'Masculino').length;
        const femeninos = estudiantes.filter(e => e.genero === 'Femenino').length;
        const otros = estudiantes.filter(e => e.genero === 'Otro').length;

        return { total, masculinos, femeninos, otros };
    };

    if (error) {
        return (
            <div className="p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                        <div className="flex items-center">
                            <FaExclamationTriangle className="h-6 w-6 text-red-600 mr-3" />
                            <div>
                                <h3 className="text-lg font-medium text-red-800">Error</h3>
                                <p className="text-red-700">{error}</p>
                                <button
                                    onClick={cargarEstudiantes}
                                    className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                                >
                                    Reintentar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const stats = getStats();

    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <FaUserGraduate className="h-8 w-8 text-indigo-600 mr-3" />
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                Gestión de Estudiantes
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Administra el registro de estudiantes y sus representantes
                            </p>
                        </div>
                    </div>

                    {/* Estadísticas */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                                    <div className="text-sm text-gray-600">Total Estudiantes</div>
                                </div>
                                <FaUsers className="h-8 w-8 text-indigo-400" />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold text-blue-600">{stats.masculinos}</div>
                                    <div className="text-sm text-gray-600">Masculinos</div>
                                </div>
                                <FaUserGraduate className="h-8 w-8 text-blue-400" />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold text-pink-600">{stats.femeninos}</div>
                                    <div className="text-sm text-gray-600">Femeninos</div>
                                </div>
                                <FaUserGraduate className="h-8 w-8 text-pink-400" />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold text-gray-600">{stats.otros}</div>
                                    <div className="text-sm text-gray-600">Otros</div>
                                </div>
                                <FaUserGraduate className="h-8 w-8 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Acciones */}
                <EstudianteComportamiento
                    onAddClick={() => {
                        setEditingEstudiante(null);
                        setShowFormModal(true);
                    }}
                    onDeleteSelected={handleDeleteSelected}
                    onExport={handleExport}
                    onPrint={handlePrint}
                    selectedCount={selectedIds.length}
                    totalCount={estudiantes.length}
                />

                {/* Búsqueda y filtros */}
                <EstudianteBuscar
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                    filters={filters}
                    totalEstudiantes={estudiantes.length}
                />

                {/* Lista de estudiantes */}
                <EstudianteLista
                    estudiantes={estudiantes}
                    loading={loading}
                    onEdit={handleEditEstudiante}
                    onDelete={handleDelete}
                    onView={handleViewEstudiante}
                    onSelect={handleSelectEstudiante}
                    selectedIds={selectedIds}
                />

                {/* Modal para agregar/editar estudiante */}
                <EstudianteFormularioModal
                    isOpen={showFormModal}
                    onClose={() => {
                        setShowFormModal(false);
                        setEditingEstudiante(null);
                    }}
                    onSubmit={editingEstudiante ? handleEdit : handleCreate}
                    initialData={editingEstudiante}
                    title={editingEstudiante ? 'Editar Estudiante' : 'Nuevo Estudiante'}
                />

                {/* Modal de detalles del estudiante */}
                <EstudianteDetalleModal
                    estudiante={selectedEstudiante}
                    isOpen={showDetailModal}
                    onClose={() => setShowDetailModal(false)}
                    onPrint={handlePrint}
                    onExport={handleExport}
                />
            </div>
        </div>
    );
};

export default EstudiantesPage;