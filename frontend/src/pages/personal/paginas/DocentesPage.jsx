// src/modules/personal/components/DocentesPage.jsx
import React, { useState } from 'react';
import { FaChalkboardTeacher, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
import { usePersonal } from '../hooks/usePersonal';
import PersonalFormularioModal from '../componentes/PersonalFormularioModal';
import PersonalLista from '../componentes/PersonalLista';
import PersonalBuscar from '../componentes/PersonalBuscar';
import PersonalAccion from '../componentes/PersonalAccion';
import PersonalDetalleModal from '../componentes/PersonalDetalleModal';

const DocentesPage = () => {
    const [showFormModal, setShowFormModal] = useState(false);
    const [selectedPersonal, setSelectedPersonal] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [editingPersonal, setEditingPersonal] = useState(null);

    const tipo = 'docente';

    const {
        personal,
        loading,
        error,
        filters,
        cargarPersonal,
        registrarPersonal,
        actualizarPersonal,
        eliminarPersonal,
        actualizarFiltros
    } = usePersonal(tipo);

    const handleCreate = async (data) => {
        try {
            await registrarPersonal(data);
            setShowFormModal(false);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleEdit = async (data) => {
        try {
            await actualizarPersonal(editingPersonal.id, data);
            setShowFormModal(false);
            setEditingPersonal(null);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este docente?')) {
            try {
                await eliminarPersonal(id);
                setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
            } catch (error) {
                alert(error.message);
            }
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedIds.length === 0) {
            alert('Selecciona al menos un docente para eliminar');
            return;
        }

        if (window.confirm(`¿Estás seguro de eliminar ${selectedIds.length} docente(s)?`)) {
            try {
                for (const id of selectedIds) {
                    await eliminarPersonal(id);
                }
                setSelectedIds([]);
            } catch (error) {
                alert(error.message);
            }
        }
    };

    const handleSelectPersonal = (id) => {
        setSelectedIds(prev => {
            if (prev.includes(id)) {
                return prev.filter(selectedId => selectedId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const handleViewPersonal = (personal) => {
        setSelectedPersonal(personal);
        setShowDetailModal(true);
    };

    const handleEditPersonal = (personal) => {
        setEditingPersonal(personal);
        setShowFormModal(true);
    };

    const handleExport = () => {
        // Exportar a CSV
        const headers = ['ID', 'Nombre', 'Cédula', 'Teléfono', 'Correo', 'Cargo', 'Dependencia', 'Fecha Ingreso'];
        const csvData = personal.map(p => [
            p.id,
            p.nombreCompleto,
            p.cedula,
            p.telefono,
            p.correo,
            p.cargo_voucher,
            p.dependencia,
            p.fecha_ingreso_mppe
        ]);

        const csvContent = [
            headers.join(','),
            ...csvData.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'docentes.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                                    onClick={cargarPersonal}
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

    const stats = {
        total: personal.length,
        masculinos: personal.filter(p => p.sexo === 'masculino').length,
        femeninos: personal.filter(p => p.sexo === 'femenino').length,
        otros: personal.filter(p => p.sexo === 'otro').length
    };

    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <FaChalkboardTeacher className="h-8 w-8 text-blue-600 mr-3" />
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                Gestión de Docentes
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Administra el registro de docentes de la institución
                            </p>
                        </div>
                    </div>

                    {/* Estadísticas */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                                    <div className="text-sm text-gray-600">Total Docentes</div>
                                </div>
                                <FaChalkboardTeacher className="h-8 w-8 text-blue-400" />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold text-blue-600">{stats.masculinos}</div>
                                    <div className="text-sm text-gray-600">Masculinos</div>
                                </div>
                                <FaChalkboardTeacher className="h-8 w-8 text-blue-400" />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold text-pink-600">{stats.femeninos}</div>
                                    <div className="text-sm text-gray-600">Femeninos</div>
                                </div>
                                <FaChalkboardTeacher className="h-8 w-8 text-pink-400" />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold text-gray-600">{stats.otros}</div>
                                    <div className="text-sm text-gray-600">Otros</div>
                                </div>
                                <FaChalkboardTeacher className="h-8 w-8 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Acciones */}
                <PersonalAccion
                    tipo={tipo}
                    onAddClick={() => {
                        setEditingPersonal(null);
                        setShowFormModal(true);
                    }}
                    onDeleteSelected={handleDeleteSelected}
                    onExport={handleExport}
                    selectedCount={selectedIds.length}
                    totalCount={personal.length}
                />

                {/* Búsqueda y filtros */}
                <PersonalBuscar
                    tipo={tipo}
                    onFilterChange={actualizarFiltros}
                    filters={filters}
                    totalPersonal={personal.length}
                />

                {/* Lista de personal */}
                <PersonalLista
                    personal={personal}
                    loading={loading}
                    tipo={tipo}
                    onEdit={handleEditPersonal}
                    onDelete={handleDelete}
                    onView={handleViewPersonal}
                    onSelect={handleSelectPersonal}
                    selectedIds={selectedIds}
                />

                {/* Modales */}
                <PersonalFormularioModal
                    isOpen={showFormModal}
                    onClose={() => {
                        setShowFormModal(false);
                        setEditingPersonal(null);
                    }}
                    onSubmit={editingPersonal ? handleEdit : handleCreate}
                    initialData={editingPersonal}
                    tipo={tipo}
                    title={editingPersonal ? 'Editar Docente' : 'Nuevo Docente'}
                />

                <PersonalDetalleModal
                    personal={selectedPersonal}
                    isOpen={showDetailModal}
                    onClose={() => setShowDetailModal(false)}
                    tipo={tipo}
                />
            </div>
        </div>
    );
};

export default DocentesPage;