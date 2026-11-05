import React, { useState } from 'react';
import { DiagramStyleMode } from '../types';
import { ArrowLeft, Search, Plus, Edit3, Trash2, Check, X } from 'lucide-react';

interface CatalogoMensajesProps {
  styleMode: DiagramStyleMode;
  onBack: () => void;
}

interface MessageItem {
  code: string;
  type: 'Éxito' | 'Advertencia' | 'Error';
  title: string;
  messageText: string;
}

const INITIAL_MESSAGES: MessageItem[] = [
  {
    code: 'MSG-001',
    type: 'Error',
    title: 'Exceso de peso en contenedor',
    messageText: 'El peso ingresado supera la capacidad máxima permitida (1,000 kg) del contenedor.',
  },
  {
    code: 'MSG-002',
    type: 'Advertencia',
    title: 'Lote próximo a vencer (Alerta FEFO)',
    messageText: 'El lote seleccionado vence en menos de 30 días. Priorizar su asignación a despacho.',
  },
  {
    code: 'MSG-003',
    type: 'Éxito',
    title: 'Reserva registrada correctamente',
    messageText: 'La orden de reserva y el compromiso de stock han sido guardados en el sistema.',
  },
  {
    code: 'MSG-004',
    type: 'Error',
    title: 'Ubicación sin capacidad disponible',
    messageText: 'La ubicación de rack seleccionada supera el límite máximo permitido (85% de ocupación).',
  },
  {
    code: 'MSG-005',
    type: 'Advertencia',
    title: 'Tolerancia de cita en muelle excedida',
    messageText: 'El vehículo superó los 15 minutos de tolerancia (POL-002). Cita sujeta a reprogramación.',
  },
  {
    code: 'MSG-006',
    type: 'Error',
    title: 'Desviación de temperatura en cadena de frío',
    messageText: 'El lote registra temperatura mayor a 5 °C. Se bloquea ingreso y se deriva a cuarentena.',
  },
  {
    code: 'MSG-007',
    type: 'Éxito',
    title: 'Recepción y conteo físico conformes',
    messageText: 'Los bultos verificados en muelle coinciden con la orden de ingreso. Stock habilitado.',
  },
  {
    code: 'MSG-008',
    type: 'Éxito',
    title: 'Despacho cerrado y validado',
    messageText: 'Todos los pallets de la reserva fueron cargados en la unidad de transporte.',
  },
];

export const CatalogoMensajes: React.FC<CatalogoMensajesProps> = ({ styleMode, onBack }) => {
  const isSketch = styleMode === 'sketch';
  const [messages, setMessages] = useState<MessageItem[]>(INITIAL_MESSAGES);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('Todos');
  const [selectedCode, setSelectedCode] = useState<string>('MSG-001');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [formCode, setFormCode] = useState('');
  const [formType, setFormType] = useState<MessageItem['type']>('Éxito');
  const [formTitle, setFormTitle] = useState('');
  const [formText, setFormText] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const filteredMessages = messages.filter((m) => {
    const matchesSearch =
      m.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.messageText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'Todos' || m.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleOpenAdd = () => {
    setModalMode('add');
    const nextNum = String(messages.length + 1).padStart(3, '0');
    setFormCode(`MSG-${nextNum}`);
    setFormType('Advertencia');
    setFormTitle('');
    setFormText('');
    setModalOpen(true);
  };

  const handleOpenEdit = () => {
    const current = messages.find((m) => m.code === selectedCode);
    if (!current) return;
    setModalMode('edit');
    setFormCode(current.code);
    setFormType(current.type);
    setFormTitle(current.title);
    setFormText(current.messageText);
    setModalOpen(true);
  };

  const handleDelete = () => {
    if (!selectedCode) return;
    setMessages((prev) => prev.filter((m) => m.code !== selectedCode));
    showToast(`Mensaje ${selectedCode} eliminado`);
    setSelectedCode('');
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCode.trim() || !formTitle.trim()) return;
    const item: MessageItem = {
      code: formCode.trim().toUpperCase(),
      type: formType,
      title: formTitle.trim(),
      messageText: formText.trim(),
    };
    if (modalMode === 'add') {
      setMessages((prev) => [...prev, item]);
      setSelectedCode(item.code);
      showToast(`Mensaje ${item.code} agregado`);
    } else {
      setMessages((prev) => prev.map((m) => (m.code === selectedCode ? item : m)));
      showToast(`Mensaje ${item.code} actualizado`);
    }
    setModalOpen(false);
  };

  return (
    <div
      id="vista-catalogo-mensajes"
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
            CATÁLOGOS DE MENSAJES
          </h1>

          <div className="w-24" />
        </div>

        {/* Filtros */}
        <div className="border-2 border-zinc-900 bg-zinc-50 p-4 mb-5 flex flex-col sm:flex-row items-end gap-3">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold uppercase text-zinc-800 mb-1">
              Buscar por Código o Texto:
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ej. MSG-001, peso, vencimiento, temperatura..."
              className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm focus:outline-none"
            />
          </div>
          <div className="w-full sm:w-44">
            <label className="block text-xs font-bold uppercase text-zinc-800 mb-1">
              Tipo de Mensaje:
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-semibold cursor-pointer"
            >
              <option value="Todos">Todos</option>
              <option value="Éxito">Éxito</option>
              <option value="Advertencia">Advertencia</option>
              <option value="Error">Error</option>
            </select>
          </div>
          <button
            type="button"
            onClick={() => showToast(`${filteredMessages.length} mensaje(s) encontrado(s)`)}
            className="border-2 border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800 px-4 py-1.5 text-sm font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            <Search className="w-4 h-4" />
            Buscar
          </button>
        </div>

        {/* Tabla de Mensajes */}
        <div className="border-2 border-zinc-900 overflow-x-auto mb-5">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-200 border-b-2 border-zinc-900 text-xs font-bold uppercase text-zinc-900">
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-24">Código</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-32 text-center">Tipo</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-60">Asunto</th>
                <th className="py-2.5 px-3">Texto del Mensaje</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y-2 divide-zinc-900">
              {filteredMessages.map((msg) => {
                const isSelected = msg.code === selectedCode;
                return (
                  <tr
                    key={msg.code}
                    onClick={() => setSelectedCode(msg.code)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-zinc-100 font-bold' : 'bg-white hover:bg-zinc-50'
                    }`}
                  >
                    <td className="py-2.5 px-3 border-r-2 border-zinc-900 font-mono">{msg.code}</td>
                    <td className="py-2.5 px-3 border-r-2 border-zinc-900 text-center">
                      <span className="border border-zinc-900 bg-zinc-100 px-2 py-0.5 text-xs font-bold">
                        {msg.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 border-r-2 border-zinc-900">{msg.title}</td>
                    <td className="py-2.5 px-3 text-xs">{msg.messageText}</td>
                  </tr>
                );
              })}
              {filteredMessages.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-zinc-500 text-sm">
                    No se encontraron mensajes registrados.
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
                  {modalMode === 'add' ? 'Agregar Mensaje' : 'Modificar Mensaje'}
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
                <div className="grid grid-cols-2 gap-3">
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
                    <label className="block text-xs font-bold uppercase mb-1">Tipo:</label>
                    <select
                      value={formType}
                      onChange={(e) => setFormType(e.target.value as MessageItem['type'])}
                      className="w-full border-2 border-zinc-900 px-3 py-1.5 text-sm bg-white"
                    >
                      <option value="Éxito">Éxito</option>
                      <option value="Advertencia">Advertencia</option>
                      <option value="Error">Error</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Asunto:</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full border-2 border-zinc-900 px-3 py-1.5 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">
                    Texto del Mensaje:
                  </label>
                  <textarea
                    rows={3}
                    value={formText}
                    onChange={(e) => setFormText(e.target.value)}
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
