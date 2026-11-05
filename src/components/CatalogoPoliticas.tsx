import React, { useState } from 'react';
import { DiagramStyleMode } from '../types';
import { ArrowLeft, Search, Plus, Edit3, Trash2, Check, X } from 'lucide-react';

interface CatalogoPoliticasProps {
  styleMode: DiagramStyleMode;
  onBack: () => void;
}

interface PolicyItem {
  code: string;
  name: string;
  module: 'Reservas' | 'Recepción' | 'Despacho' | 'Inventario';
  limitValue: string;
  status: 'Activa' | 'Inactiva';
}

const INITIAL_POLICIES: PolicyItem[] = [
  {
    code: 'POL-001',
    name: 'Tiempo mínimo de anticipación para cancelar o postergar reserva',
    module: 'Reservas',
    limitValue: '24 Horas antes',
    status: 'Activa',
  },
  {
    code: 'POL-002',
    name: 'Tolerancia máxima de espera de vehículo en muelle asignado',
    module: 'Recepción',
    limitValue: '15 Minutos',
    status: 'Activa',
  },
  {
    code: 'POL-003',
    name: 'Prioridad obligatoria de despacho por fecha de vencimiento (FEFO)',
    module: 'Despacho',
    limitValue: 'Obligatorio',
    status: 'Activa',
  },
  {
    code: 'POL-004',
    name: 'Porcentaje máximo de ocupación operativa permitida por ubicación',
    module: 'Inventario',
    limitValue: '85% de Capacidad',
    status: 'Activa',
  },
  {
    code: 'POL-005',
    name: 'Vida útil mínima restante para aceptar lotes en recepción',
    module: 'Recepción',
    limitValue: 'Mínimo 90 Días',
    status: 'Activa',
  },
  {
    code: 'POL-006',
    name: 'Tiempo máximo de vigencia para reservas sin cita de transporte',
    module: 'Reservas',
    limitValue: '48 Horas',
    status: 'Activa',
  },
  {
    code: 'POL-007',
    name: 'Frecuencia obligatoria de conteo cíclico para productos de alta rotación',
    module: 'Inventario',
    limitValue: 'Semanal (7 Días)',
    status: 'Activa',
  },
  {
    code: 'POL-008',
    name: 'Verificación de precinto de seguridad antes de cierre de despacho',
    module: 'Despacho',
    limitValue: '100% de Unidades',
    status: 'Activa',
  },
];

export const CatalogoPoliticas: React.FC<CatalogoPoliticasProps> = ({ styleMode, onBack }) => {
  const isSketch = styleMode === 'sketch';
  const [policies, setPolicies] = useState<PolicyItem[]>(INITIAL_POLICIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState('Todos');
  const [selectedCode, setSelectedCode] = useState<string>('POL-001');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [formCode, setFormCode] = useState('');
  const [formName, setFormName] = useState('');
  const [formModule, setFormModule] = useState<PolicyItem['module']>('Reservas');
  const [formLimit, setFormLimit] = useState('');
  const [formStatus, setFormStatus] = useState<PolicyItem['status']>('Activa');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const filteredPolicies = policies.filter((p) => {
    const matchesText =
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.limitValue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModule = moduleFilter === 'Todos' || p.module === moduleFilter;
    return matchesText && matchesModule;
  });

  const handleOpenAdd = () => {
    setModalMode('add');
    const nextNum = String(policies.length + 1).padStart(3, '0');
    setFormCode(`POL-${nextNum}`);
    setFormName('');
    setFormModule('Reservas');
    setFormLimit('');
    setFormStatus('Activa');
    setModalOpen(true);
  };

  const handleOpenEdit = () => {
    const current = policies.find((p) => p.code === selectedCode);
    if (!current) return;
    setModalMode('edit');
    setFormCode(current.code);
    setFormName(current.name);
    setFormModule(current.module);
    setFormLimit(current.limitValue);
    setFormStatus(current.status);
    setModalOpen(true);
  };

  const handleDelete = () => {
    if (!selectedCode) return;
    setPolicies((prev) => prev.filter((p) => p.code !== selectedCode));
    showToast(`Política ${selectedCode} eliminada`);
    setSelectedCode('');
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCode.trim() || !formName.trim()) return;
    const item: PolicyItem = {
      code: formCode.trim().toUpperCase(),
      name: formName.trim(),
      module: formModule,
      limitValue: formLimit.trim() || 'Estándar',
      status: formStatus,
    };

    if (modalMode === 'add') {
      setPolicies((prev) => [...prev, item]);
      setSelectedCode(item.code);
      showToast(`Política ${item.code} agregada`);
    } else {
      setPolicies((prev) => prev.map((p) => (p.code === selectedCode ? item : p)));
      showToast(`Política ${item.code} actualizada`);
    }
    setModalOpen(false);
  };

  return (
    <div
      id="vista-catalogo-politicas"
      className={`w-full max-w-5xl mx-auto py-4 px-4 sm:px-6 select-none ${
        isSketch ? 'font-sketch' : 'font-tech'
      }`}
    >
      <div className="bg-white border-2 border-zinc-900 shadow-[4px_4px_0px_#18181b] p-5 sm:p-6">
        {/* Cabecera */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b-2 border-zinc-900">
          <button
            type="button"
            onClick={onBack}
            className="border-2 border-zinc-900 bg-white hover:bg-zinc-100 px-3 py-1.5 text-sm font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Regresar
          </button>

          <h1 className="text-lg sm:text-xl font-bold tracking-wider uppercase text-zinc-900 text-center">
            CATÁLOGO DE POLÍTICAS
          </h1>

          <div className="w-24" />
        </div>

        {/* Filtros */}
        <div className="border-2 border-zinc-900 bg-zinc-50 p-4 mb-5 flex flex-col sm:flex-row items-end gap-3">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold uppercase text-zinc-800 mb-1">
              Buscar Política:
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ej. POL-001, Tolerancia, FEFO, Ocupación..."
              className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm focus:outline-none"
            />
          </div>
          <div className="w-full sm:w-48">
            <label className="block text-xs font-bold uppercase text-zinc-800 mb-1">
              Módulo de Aplicación:
            </label>
            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-semibold cursor-pointer"
            >
              <option value="Todos">Todos</option>
              <option value="Reservas">Reservas</option>
              <option value="Recepción">Recepción</option>
              <option value="Despacho">Despacho</option>
              <option value="Inventario">Inventario</option>
            </select>
          </div>
          <button
            type="button"
            onClick={() => showToast(`${filteredPolicies.length} política(s) mostrada(s)`)}
            className="border-2 border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800 px-4 py-1.5 text-sm font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            <Search className="w-4 h-4" />
            Buscar
          </button>
        </div>

        {/* Tabla de Políticas */}
        <div className="border-2 border-zinc-900 overflow-x-auto mb-5">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-200 border-b-2 border-zinc-900 text-xs font-bold uppercase text-zinc-900">
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-24">Código</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900">Política Operativa</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-32 text-center">Módulo</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-44">Parámetro / Límite</th>
                <th className="py-2.5 px-3 w-28 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y-2 divide-zinc-900">
              {filteredPolicies.map((pol) => {
                const isSelected = pol.code === selectedCode;
                return (
                  <tr
                    key={pol.code}
                    onClick={() => setSelectedCode(pol.code)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-zinc-100 font-bold' : 'bg-white hover:bg-zinc-50'
                    }`}
                  >
                    <td className="py-2.5 px-3 border-r-2 border-zinc-900 font-mono">{pol.code}</td>
                    <td className="py-2.5 px-3 border-r-2 border-zinc-900">{pol.name}</td>
                    <td className="py-2.5 px-3 border-r-2 border-zinc-900 text-center text-xs">
                      {pol.module}
                    </td>
                    <td className="py-2.5 px-3 border-r-2 border-zinc-900 font-mono text-xs">
                      {pol.limitValue}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="border border-zinc-900 bg-zinc-100 px-2 py-0.5 text-xs font-bold">
                        {pol.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filteredPolicies.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-zinc-500 text-sm">
                    No se encontraron políticas registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Botones inferiores CRUD */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleOpenAdd}
              className="border-2 border-zinc-900 bg-white hover:bg-zinc-100 px-4 py-1.5 text-sm font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Agregar
            </button>
            <button
              type="button"
              onClick={handleOpenEdit}
              disabled={!selectedCode}
              className="border-2 border-zinc-900 bg-white hover:bg-zinc-100 disabled:opacity-40 px-4 py-1.5 text-sm font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              Modificar
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={!selectedCode}
              className="border-2 border-zinc-900 bg-white hover:bg-zinc-100 disabled:opacity-40 px-4 py-1.5 text-sm font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar
            </button>
          </div>

          {toastMsg && (
            <div className="border-2 border-zinc-900 bg-zinc-900 text-white px-3 py-1 text-xs font-bold flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              {toastMsg}
            </div>
          )}
        </div>

        {/* Modal Agregar / Modificar */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white border-2 border-zinc-900 shadow-[5px_5px_0px_#000] w-full max-w-md p-5">
              <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-2 mb-4">
                <h2 className="text-sm font-bold uppercase">
                  {modalMode === 'add' ? 'Agregar Política' : 'Modificar Política'}
                </h2>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="border border-zinc-900 p-1 hover:bg-zinc-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleSaveModal} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Código:</label>
                  <input
                    type="text"
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    className="w-full border-2 border-zinc-900 px-3 py-1.5 text-sm font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Nombre de Política:</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full border-2 border-zinc-900 px-3 py-1.5 text-sm"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Módulo:</label>
                    <select
                      value={formModule}
                      onChange={(e) => setFormModule(e.target.value as PolicyItem['module'])}
                      className="w-full border-2 border-zinc-900 px-3 py-1.5 text-sm bg-white"
                    >
                      <option value="Reservas">Reservas</option>
                      <option value="Recepción">Recepción</option>
                      <option value="Despacho">Despacho</option>
                      <option value="Inventario">Inventario</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Estado:</label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as PolicyItem['status'])}
                      className="w-full border-2 border-zinc-900 px-3 py-1.5 text-sm bg-white"
                    >
                      <option value="Activa">Activa</option>
                      <option value="Inactiva">Inactiva</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Valor / Límite:</label>
                  <input
                    type="text"
                    value={formLimit}
                    onChange={(e) => setFormLimit(e.target.value)}
                    placeholder="Ej. 24 Horas, 15 Minutos..."
                    className="w-full border-2 border-zinc-900 px-3 py-1.5 text-sm"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 pt-3 border-t-2 border-zinc-900">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="border-2 border-zinc-900 bg-white px-4 py-1.5 text-xs font-bold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="border-2 border-zinc-900 bg-zinc-900 text-white px-4 py-1.5 text-xs font-bold cursor-pointer"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
