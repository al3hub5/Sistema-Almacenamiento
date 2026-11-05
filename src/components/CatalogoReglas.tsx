import React, { useState } from 'react';
import { DiagramStyleMode } from '../types';
import { RuleItem, INITIAL_RULES } from '../data/catalogData';
import { ArrowLeft, Search, Plus, Edit3, Trash2, Check, X } from 'lucide-react';

interface CatalogoReglasProps {
  styleMode: DiagramStyleMode;
  onBack: () => void;
  rules?: RuleItem[];
  onRulesChange?: React.Dispatch<React.SetStateAction<RuleItem[]>>;
}

export const CatalogoReglas: React.FC<CatalogoReglasProps> = ({
  styleMode,
  onBack,
  rules: externalRules,
  onRulesChange,
}) => {
  const isSketch = styleMode === 'sketch';
  const [localRules, setLocalRules] = useState<RuleItem[]>(INITIAL_RULES);

  const rules = externalRules ?? localRules;
  const setRules = onRulesChange ?? setLocalRules;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCode, setSelectedCode] = useState<string>('REG-001');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [formCode, setFormCode] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formVar, setFormVar] = useState('Peso del Contenedor (kg)');
  const [formOp, setFormOp] = useState('<=');
  const [formVal, setFormVal] = useState('');
  const [formAction, setFormAction] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const filteredRules = rules.filter(
    (r) =>
      r.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.variable.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.actionIfTrue.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setModalMode('add');
    const nextNum = String(rules.length + 1).padStart(3, '0');
    setFormCode(`REG-${nextNum}`);
    setFormDesc('');
    setFormVar('Peso del Contenedor (kg)');
    setFormOp('<=');
    setFormVal('1000');
    setFormAction('Permitir operación');
    setModalOpen(true);
  };

  const handleOpenEdit = () => {
    const current = rules.find((r) => r.code === selectedCode);
    if (!current) return;
    setModalMode('edit');
    setFormCode(current.code);
    setFormDesc(current.description);
    setFormVar(current.variable);
    setFormOp(current.operator);
    setFormVal(current.targetValue);
    setFormAction(current.actionIfTrue);
    setModalOpen(true);
  };

  const handleDelete = () => {
    if (!selectedCode) return;
    setRules((prev) => prev.filter((r) => r.code !== selectedCode));
    showToast(`Regla ${selectedCode} eliminada`);
    setSelectedCode('');
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCode.trim() || !formDesc.trim()) return;
    const item: RuleItem = {
      code: formCode.trim().toUpperCase(),
      description: formDesc.trim(),
      variable: formVar,
      operator: formOp,
      targetValue: formVal.trim(),
      actionIfTrue: formAction.trim() || 'Permitir operación',
    };

    if (modalMode === 'add') {
      setRules((prev) => [...prev, item]);
      setSelectedCode(item.code);
      showToast(`Regla ${item.code} registrada`);
    } else {
      setRules((prev) => prev.map((r) => (r.code === selectedCode ? item : r)));
      showToast(`Regla ${item.code} actualizada`);
    }
    setModalOpen(false);
  };

  return (
    <div
      id="vista-catalogo-reglas"
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
            CATÁLOGO DE REGLAS
          </h1>

          <div className="w-24" />
        </div>

        {/* Barra de Búsqueda */}
        <div className="border-2 border-zinc-900 bg-zinc-50 p-4 mb-5 flex flex-col sm:flex-row items-end gap-3">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold uppercase text-zinc-800 mb-1">
              Buscar por Código, Descripción o Condición:
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ej. REG-001, Peso, Temperatura, FEFO, Stock..."
              className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={() => showToast(`${filteredRules.length} regla(s) encontrada(s)`)}
            className="border-2 border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800 px-4 py-1.5 text-sm font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            <Search className="w-4 h-4" />
            Buscar
          </button>
        </div>

        {/* Tabla de Reglas */}
        <div className="border-2 border-zinc-900 overflow-x-auto mb-5">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-200 border-b-2 border-zinc-900 text-xs font-bold uppercase text-zinc-900">
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-24">Código</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900">Descripción</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-60">Condición Lógica</th>
                <th className="py-2.5 px-3 w-64">Acción del Sistema</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y-2 divide-zinc-900">
              {filteredRules.map((rule) => {
                const isSelected = rule.code === selectedCode;
                return (
                  <tr
                    key={rule.code}
                    onClick={() => setSelectedCode(rule.code)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-zinc-100 font-bold' : 'bg-white hover:bg-zinc-50'
                    }`}
                  >
                    <td className="py-2.5 px-3 border-r-2 border-zinc-900 font-mono">
                      {rule.code}
                    </td>
                    <td className="py-2.5 px-3 border-r-2 border-zinc-900">{rule.description}</td>
                    <td className="py-2.5 px-3 border-r-2 border-zinc-900 font-mono text-xs">
                      {rule.variable} {rule.operator} {rule.targetValue}
                    </td>
                    <td className="py-2.5 px-3 text-xs">{rule.actionIfTrue}</td>
                  </tr>
                );
              })}
              {filteredRules.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-zinc-500 text-sm">
                    No se encontraron reglas registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Botones CRUD */}
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

        {/* Modal Agregar / Modificar Regla */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white border-2 border-zinc-900 shadow-[5px_5px_0px_#000] w-full max-w-md p-5">
              <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-2 mb-4">
                <h2 className="text-sm font-bold uppercase">
                  {modalMode === 'add' ? 'Nueva Regla de Validación' : 'Modificar Regla'}
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
                  <label className="block text-xs font-bold uppercase mb-1">Variable a Evaluar:</label>
                  <input
                    type="text"
                    value={formVar}
                    onChange={(e) => setFormVar(e.target.value)}
                    className="w-full border-2 border-zinc-900 px-3 py-1.5 text-sm"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Operador:</label>
                    <select
                      value={formOp}
                      onChange={(e) => setFormOp(e.target.value)}
                      className="w-full border-2 border-zinc-900 px-3 py-1.5 text-sm bg-white font-mono"
                    >
                      <option value="<=">&lt;= (Menor o igual)</option>
                      <option value=">=">&gt;= (Mayor o igual)</option>
                      <option value="=">= (Igual a)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Valor Límite:</label>
                    <input
                      type="text"
                      value={formVal}
                      onChange={(e) => setFormVal(e.target.value)}
                      className="w-full border-2 border-zinc-900 px-3 py-1.5 text-sm font-mono"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Acción del Sistema:</label>
                  <input
                    type="text"
                    value={formAction}
                    onChange={(e) => setFormAction(e.target.value)}
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
