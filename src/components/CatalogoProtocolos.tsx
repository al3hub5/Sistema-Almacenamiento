import React, { useState } from 'react';
import { DiagramStyleMode } from '../types';
import { ProtocolItem, INITIAL_PROTOCOLS } from '../data/catalogData';
import { ArrowLeft, Search, Plus, Edit3, Trash2, Check, X } from 'lucide-react';

interface CatalogoProtocolosProps {
  styleMode: DiagramStyleMode;
  onBack: () => void;
  onOpenDetail?: (protocolCode: string) => void;
  protocols?: ProtocolItem[];
  onProtocolsChange?: React.Dispatch<React.SetStateAction<ProtocolItem[]>>;
}

export const CatalogoProtocolos: React.FC<CatalogoProtocolosProps> = ({
  styleMode,
  onBack,
  onOpenDetail,
  protocols: externalProtocols,
  onProtocolsChange,
}) => {
  const isSketch = styleMode === 'sketch';
  const [localProtocols, setLocalProtocols] = useState<ProtocolItem[]>(INITIAL_PROTOCOLS);

  const protocols = externalProtocols ?? localProtocols;
  const setProtocols = onProtocolsChange ?? setLocalProtocols;

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('Todos');
  const [selectedCode, setSelectedCode] = useState<string>('PRO-INB');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [formCode, setFormCode] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formType, setFormType] = useState<'Recepción' | 'Despacho' | 'Interno'>('Recepción');
  const [formResp, setFormResp] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const filteredProtocols = protocols.filter((p) => {
    const matchesSearch =
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.responsible.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'Todos' || p.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleOpenAdd = () => {
    setModalMode('add');
    setFormCode(`PRO-00${protocols.length + 1}`);
    setFormDesc('');
    setFormType('Recepción');
    setFormResp('Operador de Almacén');
    setModalOpen(true);
  };

  const handleOpenEdit = () => {
    const current = protocols.find((p) => p.code === selectedCode);
    if (!current) return;
    setModalMode('edit');
    setFormCode(current.code);
    setFormDesc(current.description);
    setFormType(current.type);
    setFormResp(current.responsible);
    setModalOpen(true);
  };

  const handleDelete = () => {
    if (!selectedCode) return;
    setProtocols((prev) => prev.filter((p) => p.code !== selectedCode));
    showToast(`Protocolo ${selectedCode} eliminado`);
    setSelectedCode('');
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCode.trim() || !formDesc.trim()) return;
    if (modalMode === 'add') {
      const newItem: ProtocolItem = {
        code: formCode.trim().toUpperCase(),
        description: formDesc.trim(),
        type: formType,
        responsible: formResp.trim() || 'Operador de Almacén',
        steps: [
          {
            stepNumber: 1,
            activity: 'Validación inicial de documentos y condiciones operativas',
            maxTimeMinutes: 10,
            associatedRule: 'REG-001 (Validación de cita activa y documento de ingreso)',
          },
        ],
      };
      setProtocols((prev) => [...prev, newItem]);
      setSelectedCode(newItem.code);
      showToast(`Protocolo ${newItem.code} agregado`);
    } else {
      setProtocols((prev) =>
        prev.map((p) =>
          p.code === selectedCode
            ? {
                ...p,
                code: formCode.trim().toUpperCase(),
                description: formDesc.trim(),
                type: formType,
                responsible: formResp.trim(),
              }
            : p
        )
      );
      showToast(`Protocolo ${formCode} actualizado`);
    }
    setModalOpen(false);
  };

  return (
    <div
      id="vista-catalogo-protocolos"
      className={`w-full max-w-5xl mx-auto py-4 px-4 sm:px-6 select-none ${
        isSketch ? 'font-sketch' : 'font-tech'
      }`}
    >
      <div className="bg-white border-2 border-zinc-900 shadow-[4px_4px_0px_#18181b] p-5 sm:p-6 relative">
        {/* Cabecera */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b-2 border-zinc-900">
          <button
            type="button"
            onClick={onBack}
            className="border-2 border-zinc-900 bg-white hover:bg-zinc-100 px-3 py-1.5 text-sm font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Regresar
          </button>

          <h1 className="text-lg sm:text-xl font-bold tracking-wider uppercase text-zinc-900 text-center">
            CATÁLOGO DE PROTOCOLOS
          </h1>

          <div className="w-24" />
        </div>

        {/* Filtros sencillos */}
        <div className="border-2 border-zinc-900 bg-zinc-50 p-4 mb-5 flex flex-col sm:flex-row items-end gap-3">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold uppercase text-zinc-800 mb-1">
              Buscar Código o Descripción:
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ej. PRO-INB, Recepción, Picking, Inventario..."
              className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm focus:outline-none"
            />
          </div>

          <div className="w-full sm:w-52">
            <label className="block text-xs font-bold uppercase text-zinc-800 mb-1">
              Tipo de Operación:
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-semibold focus:outline-none cursor-pointer"
            >
              <option value="Todos">Todos</option>
              <option value="Recepción">Recepción</option>
              <option value="Despacho">Despacho</option>
              <option value="Interno">Interno</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => showToast(`Mostrando ${filteredProtocols.length} protocolo(s)`)}
            className="border-2 border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800 px-4 py-1.5 text-sm font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            <Search className="w-4 h-4" />
            Buscar
          </button>
        </div>

        {/* Tabla de Protocolos */}
        <div className="border-2 border-zinc-900 overflow-x-auto mb-5">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-200 border-b-2 border-zinc-900 text-xs font-bold uppercase text-zinc-900">
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-28">Código</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900">Descripción del Protocolo</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-32 text-center">Tipo</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-48">Responsable</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-20 text-center">Pasos</th>
                <th className="py-2.5 px-3 w-32 text-center">Detalle</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y-2 divide-zinc-900">
              {filteredProtocols.map((item) => {
                const isSelected = item.code === selectedCode;
                return (
                  <tr
                    key={item.code}
                    onClick={() => setSelectedCode(item.code)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-zinc-100 font-bold' : 'bg-white hover:bg-zinc-50'
                    }`}
                  >
                    <td className="py-2.5 px-3 border-r-2 border-zinc-900 font-mono">
                      {item.code}
                    </td>
                    <td className="py-2.5 px-3 border-r-2 border-zinc-900">{item.description}</td>
                    <td className="py-2.5 px-3 border-r-2 border-zinc-900 text-center">
                      <span className="border border-zinc-900 bg-zinc-100 px-2 py-0.5 text-xs font-bold">
                        {item.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 border-r-2 border-zinc-900 text-xs">
                      {item.responsible}
                    </td>
                    <td className="py-2.5 px-3 border-r-2 border-zinc-900 text-center font-mono">
                      {item.steps.length}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCode(item.code);
                          if (onOpenDetail) onOpenDetail(item.code);
                        }}
                        className="border border-zinc-900 bg-white hover:bg-zinc-900 hover:text-white px-2.5 py-1 text-xs font-bold shadow-[1px_1px_0px_#000] cursor-pointer"
                      >
                        [Ver Pasos]
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredProtocols.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-zinc-500 text-sm">
                    No se encontraron protocolos registrados.
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
                  {modalMode === 'add' ? 'Agregar Protocolo' : 'Modificar Protocolo'}
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
                  <label className="block text-xs font-bold uppercase mb-1">Descripción:</label>
                  <input
                    type="text"
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    className="w-full border-2 border-zinc-900 px-3 py-1.5 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Tipo:</label>
                  <select
                    value={formType}
                    onChange={(e) =>
                      setFormType(e.target.value as 'Recepción' | 'Despacho' | 'Interno')
                    }
                    className="w-full border-2 border-zinc-900 px-3 py-1.5 text-sm bg-white"
                  >
                    <option value="Recepción">Recepción</option>
                    <option value="Despacho">Despacho</option>
                    <option value="Interno">Interno</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Responsable:</label>
                  <input
                    type="text"
                    value={formResp}
                    onChange={(e) => setFormResp(e.target.value)}
                    className="w-full border-2 border-zinc-900 px-3 py-1.5 text-sm"
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
