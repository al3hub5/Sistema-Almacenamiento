import React, { useState, useEffect } from 'react';
import { DiagramStyleMode } from '../types';
import {
  ProtocolItem,
  RuleItem,
  StepItem,
  INITIAL_PROTOCOLS,
  INITIAL_RULES,
} from '../data/catalogData';
import { ArrowLeft, Plus, Trash2, Check } from 'lucide-react';

interface DetalleProtocoloProps {
  styleMode: DiagramStyleMode;
  onBack: () => void;
  protocolCode?: string;
  protocols?: ProtocolItem[];
  rules?: RuleItem[];
  onProtocolsChange?: React.Dispatch<React.SetStateAction<ProtocolItem[]>>;
  onSelectProtocolCode?: (code: string) => void;
}

export const DetalleProtocolo: React.FC<DetalleProtocoloProps> = ({
  styleMode,
  onBack,
  protocolCode = 'PRO-INB',
  protocols = INITIAL_PROTOCOLS,
  rules = INITIAL_RULES,
  onProtocolsChange,
  onSelectProtocolCode,
}) => {
  const isSketch = styleMode === 'sketch';

  const currentProtocol =
    protocols.find((p) => p.code === protocolCode) || protocols[0] || INITIAL_PROTOCOLS[0];

  const [description, setDescription] = useState(currentProtocol.description);
  const [operationType, setOperationType] = useState<'Recepción' | 'Despacho' | 'Interno'>(
    currentProtocol.type
  );
  const [responsible, setResponsible] = useState(currentProtocol.responsible);
  const [steps, setSteps] = useState<StepItem[]>(currentProtocol.steps);

  const ruleOptions = rules.map((r) => `${r.code} (${r.description})`);
  const [newActivity, setNewActivity] = useState('');
  const [newTime, setNewTime] = useState('15');
  const [newRule, setNewRule] = useState(ruleOptions[0] || 'REG-001');
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    setDescription(currentProtocol.description);
    setOperationType(currentProtocol.type);
    setResponsible(currentProtocol.responsible);
    setSteps(currentProtocol.steps);
  }, [currentProtocol]);

  const handleAddStep = () => {
    if (!newActivity.trim()) return;
    const nextStep: StepItem = {
      stepNumber: steps.length + 1,
      activity: newActivity.trim(),
      maxTimeMinutes: Number(newTime) || 15,
      associatedRule: newRule,
    };
    const updatedSteps = [...steps, nextStep];
    setSteps(updatedSteps);
    setNewActivity('');
  };

  const handleDeleteStep = (stepNumber: number) => {
    const filtered = steps
      .filter((s) => s.stepNumber !== stepNumber)
      .map((s, idx) => ({ ...s, stepNumber: idx + 1 }));
    setSteps(filtered);
  };

  const handleRuleChangeForStep = (stepNumber: number, ruleLabel: string) => {
    setSteps((prev) =>
      prev.map((s) => (s.stepNumber === stepNumber ? { ...s, associatedRule: ruleLabel } : s))
    );
  };

  const handleSave = () => {
    if (onProtocolsChange) {
      onProtocolsChange((prev) =>
        prev.map((p) =>
          p.code === currentProtocol.code
            ? {
                ...p,
                description: description.trim() || p.description,
                type: operationType,
                responsible: responsible.trim() || p.responsible,
                steps,
              }
            : p
        )
      );
    }
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div
      id="vista-detalle-protocolo"
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
            DETALLE DE PROTOCOLO ({currentProtocol.code})
          </h1>

          {/* Selector rápido para cambiar entre protocolos */}
          <div>
            <select
              value={currentProtocol.code}
              onChange={(e) => onSelectProtocolCode && onSelectProtocolCode(e.target.value)}
              className="border-2 border-zinc-900 bg-zinc-100 px-2.5 py-1 text-xs font-mono font-bold cursor-pointer"
              title="Cambiar protocolo visualizado"
            >
              {protocols.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.code}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Datos Generales del Protocolo */}
        <div className="border-2 border-zinc-900 bg-zinc-50 p-4 mb-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-zinc-800 mb-1">
              Descripción del Protocolo:
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-semibold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-zinc-800 mb-1">
              Tipo de Operación:
            </label>
            <select
              value={operationType}
              onChange={(e) =>
                setOperationType(e.target.value as 'Recepción' | 'Despacho' | 'Interno')
              }
              className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-semibold"
            >
              <option value="Recepción">Recepción</option>
              <option value="Despacho">Despacho</option>
              <option value="Interno">Interno</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-zinc-800 mb-1">
              Rol Responsable:
            </label>
            <input
              type="text"
              value={responsible}
              onChange={(e) => setResponsible(e.target.value)}
              className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm"
            />
          </div>
        </div>

        {/* Tabla de Secuencia de Pasos */}
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase text-zinc-800 mb-2">
            Secuencia de Pasos Operativos ({steps.length} pasos configurados):
          </h2>
          <div className="border-2 border-zinc-900 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-200 border-b-2 border-zinc-900 text-xs font-bold uppercase">
                  <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-16 text-center">Paso</th>
                  <th className="py-2.5 px-3 border-r-2 border-zinc-900">Actividad a Realizar</th>
                  <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-28 text-center">
                    Tiempo Máx.
                  </th>
                  <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-80">
                    Regla Asociada (Catálogo de Reglas)
                  </th>
                  <th className="py-2.5 px-3 w-20 text-center">Quitar</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y-2 divide-zinc-900">
                {steps.map((s) => (
                  <tr key={s.stepNumber} className="bg-white hover:bg-zinc-50">
                    <td className="py-2.5 px-3 border-r-2 border-zinc-900 text-center font-mono font-bold">
                      {s.stepNumber}
                    </td>
                    <td className="py-2.5 px-3 border-r-2 border-zinc-900">{s.activity}</td>
                    <td className="py-2.5 px-3 border-r-2 border-zinc-900 text-center font-mono">
                      {s.maxTimeMinutes} min
                    </td>
                    <td className="py-2 px-2.5 border-r-2 border-zinc-900">
                      <select
                        value={s.associatedRule}
                        onChange={(e) => handleRuleChangeForStep(s.stepNumber, e.target.value)}
                        className="w-full border border-zinc-900 bg-zinc-50 px-2 py-1 text-xs font-semibold cursor-pointer"
                      >
                        {!ruleOptions.includes(s.associatedRule) && (
                          <option value={s.associatedRule}>{s.associatedRule}</option>
                        )}
                        {ruleOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleDeleteStep(s.stepNumber)}
                        className="border border-zinc-900 bg-white hover:bg-zinc-100 p-1 cursor-pointer"
                        title="Eliminar paso"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Barra para agregar nuevo paso */}
        <div className="border-2 border-zinc-900 bg-zinc-50 p-3 mb-5 flex flex-col sm:flex-row items-end gap-3">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold uppercase mb-1">Nueva Actividad:</label>
            <input
              type="text"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              placeholder="Describa el paso operativo..."
              className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm"
            />
          </div>
          <div className="w-full sm:w-28">
            <label className="block text-xs font-bold uppercase mb-1">Tiempo (min):</label>
            <input
              type="number"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-mono"
            />
          </div>
          <div className="w-full sm:w-72">
            <label className="block text-xs font-bold uppercase mb-1">Regla Asociada:</label>
            <select
              value={newRule}
              onChange={(e) => setNewRule(e.target.value)}
              className="w-full border-2 border-zinc-900 bg-white px-2.5 py-1.5 text-xs font-semibold"
            >
              {ruleOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={handleAddStep}
            className="border-2 border-zinc-900 bg-white hover:bg-zinc-100 px-3 py-1.5 text-sm font-bold flex items-center gap-1 shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Añadir Paso
          </button>
        </div>

        {/* Botones inferiores */}
        <div className="flex items-center justify-between pt-2 border-t-2 border-zinc-900">
          <div>
            {savedToast && (
              <span className="inline-flex items-center gap-1.5 border-2 border-zinc-900 bg-zinc-900 text-white px-3 py-1 text-xs font-bold">
                <Check className="w-3.5 h-3.5" />
                Protocolo {currentProtocol.code} guardado correctamente
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="border-2 border-zinc-900 bg-white hover:bg-zinc-100 px-4 py-1.5 text-sm font-bold shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              Volver al Catálogo
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="border-2 border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800 px-5 py-1.5 text-sm font-bold shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
