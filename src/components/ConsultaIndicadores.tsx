import React, { useState } from 'react';
import { DiagramStyleMode } from '../types';
import { ArrowLeft, Search, X } from 'lucide-react';

interface ConsultaIndicadoresProps {
  styleMode: DiagramStyleMode;
  onBack: () => void;
}

interface KpiItem {
  code: string;
  name: string;
  category: 'Despacho' | 'Almacén' | 'Recepción';
  target: string;
  currentValue: string;
  history: { label: string; value: number }[];
}

const INITIAL_KPIS: KpiItem[] = [
  {
    code: 'IND-001',
    name: 'Entregas a Tiempo y Completas (OTIF)',
    category: 'Despacho',
    target: '95.0%',
    currentValue: '96.5%',
    history: [
      { label: 'Jul', value: 93 },
      { label: 'Ago', value: 95 },
      { label: 'Sep', value: 96 },
      { label: 'Oct', value: 97 },
    ],
  },
  {
    code: 'IND-002',
    name: 'Ocupación Operativa de Ubicaciones en Rack',
    category: 'Almacén',
    target: '85.0%',
    currentValue: '78.0%',
    history: [
      { label: 'Jul', value: 72 },
      { label: 'Ago', value: 75 },
      { label: 'Sep', value: 80 },
      { label: 'Oct', value: 78 },
    ],
  },
  {
    code: 'IND-003',
    name: 'Cumplimiento de Ventana Horaria en Muelle',
    category: 'Recepción',
    target: '90.0%',
    currentValue: '92.0%',
    history: [
      { label: 'Jul', value: 88 },
      { label: 'Ago', value: 90 },
      { label: 'Sep', value: 91 },
      { label: 'Oct', value: 92 },
    ],
  },
  {
    code: 'IND-004',
    name: 'Exactitud de Registro de Inventario (ERI)',
    category: 'Almacén',
    target: '99.0%',
    currentValue: '99.4%',
    history: [
      { label: 'Jul', value: 98 },
      { label: 'Ago', value: 99 },
      { label: 'Sep', value: 99 },
      { label: 'Oct', value: 99 },
    ],
  },
  {
    code: 'IND-005',
    name: 'Exactitud en Preparación de Pedidos (Picking)',
    category: 'Despacho',
    target: '98.5%',
    currentValue: '99.1%',
    history: [
      { label: 'Jul', value: 97 },
      { label: 'Ago', value: 98 },
      { label: 'Sep', value: 99 },
      { label: 'Oct', value: 99 },
    ],
  },
  {
    code: 'IND-006',
    name: 'Cumplimiento de Rotación por Vencimiento (FEFO)',
    category: 'Almacén',
    target: '100%',
    currentValue: '98.8%',
    history: [
      { label: 'Jul', value: 96 },
      { label: 'Ago', value: 97 },
      { label: 'Sep', value: 98 },
      { label: 'Oct', value: 99 },
    ],
  },
  {
    code: 'IND-007',
    name: 'Conformidad de Recepción Física sin Merma',
    category: 'Recepción',
    target: '98.0%',
    currentValue: '98.6%',
    history: [
      { label: 'Jul', value: 97 },
      { label: 'Ago', value: 98 },
      { label: 'Sep', value: 98 },
      { label: 'Oct', value: 99 },
    ],
  },
  {
    code: 'IND-008',
    name: 'Tasa de Utilización de Muelles de Carga',
    category: 'Despacho',
    target: '80.0%',
    currentValue: '82.5%',
    history: [
      { label: 'Jul', value: 76 },
      { label: 'Ago', value: 79 },
      { label: 'Sep', value: 81 },
      { label: 'Oct', value: 83 },
    ],
  },
];

export const ConsultaIndicadores: React.FC<ConsultaIndicadoresProps> = ({ styleMode, onBack }) => {
  const isSketch = styleMode === 'sketch';
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todos');
  const [selectedKpi, setSelectedKpi] = useState<KpiItem | null>(null);

  const filteredKpis = INITIAL_KPIS.filter((k) => {
    const matchesSearch =
      k.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'Todos' || k.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div
      id="vista-consulta-indicadores"
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
            CONSULTA DE INDICADORES
          </h1>

          <div className="w-24" />
        </div>

        {/* Filtros */}
        <div className="border-2 border-zinc-900 bg-zinc-50 p-4 mb-5 flex flex-col sm:flex-row items-end gap-3">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold uppercase text-zinc-800 mb-1">
              Buscar Indicador:
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ej. IND-001, OTIF, Ocupación, ERI, Picking..."
              className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm focus:outline-none"
            />
          </div>
          <div className="w-full sm:w-44">
            <label className="block text-xs font-bold uppercase text-zinc-800 mb-1">
              Área:
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-semibold cursor-pointer"
            >
              <option value="Todos">Todas</option>
              <option value="Recepción">Recepción</option>
              <option value="Almacén">Almacén</option>
              <option value="Despacho">Despacho</option>
            </select>
          </div>
          <button
            type="button"
            className="border-2 border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800 px-4 py-1.5 text-sm font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            <Search className="w-4 h-4" />
            Buscar
          </button>
        </div>

        {/* Tabla de Indicadores */}
        <div className="border-2 border-zinc-900 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-200 border-b-2 border-zinc-900 text-xs font-bold uppercase text-zinc-900">
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-24">Código</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900">Nombre del Indicador</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-32 text-center">Área</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-28 text-center">Meta</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-28 text-center">
                  Resultado
                </th>
                <th className="py-2.5 px-3 w-32 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y-2 divide-zinc-900">
              {filteredKpis.map((kpi) => (
                <tr key={kpi.code} className="bg-white hover:bg-zinc-50">
                  <td className="py-2.5 px-3 border-r-2 border-zinc-900 font-mono">{kpi.code}</td>
                  <td className="py-2.5 px-3 border-r-2 border-zinc-900 font-semibold">
                    {kpi.name}
                  </td>
                  <td className="py-2.5 px-3 border-r-2 border-zinc-900 text-center text-xs">
                    {kpi.category}
                  </td>
                  <td className="py-2.5 px-3 border-r-2 border-zinc-900 text-center font-mono">
                    {kpi.target}
                  </td>
                  <td className="py-2.5 px-3 border-r-2 border-zinc-900 text-center font-mono font-bold">
                    {kpi.currentValue}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      type="button"
                      onClick={() => setSelectedKpi(kpi)}
                      className="border border-zinc-900 bg-white hover:bg-zinc-900 hover:text-white px-2.5 py-1 text-xs font-bold shadow-[1px_1px_0px_#000] cursor-pointer"
                    >
                      [Ver Gráfico]
                    </button>
                  </td>
                </tr>
              ))}
              {filteredKpis.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-zinc-500 text-sm">
                    No se encontraron indicadores.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Gráfico de Indicador */}
        {selectedKpi && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white border-2 border-zinc-900 shadow-[5px_5px_0px_#000] w-full max-w-md p-5">
              <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-2 mb-4">
                <h2 className="text-sm font-bold uppercase">
                  Evolución: {selectedKpi.name} ({selectedKpi.code})
                </h2>
                <button
                  type="button"
                  onClick={() => setSelectedKpi(null)}
                  className="border border-zinc-900 p-1 hover:bg-zinc-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4 text-center">
                <div className="border-2 border-zinc-900 p-2 bg-zinc-50">
                  <p className="text-xs font-bold uppercase text-zinc-500">Meta Esperada</p>
                  <p className="text-lg font-mono font-bold">{selectedKpi.target}</p>
                </div>
                <div className="border-2 border-zinc-900 p-2 bg-zinc-100">
                  <p className="text-xs font-bold uppercase text-zinc-500">Resultado Actual</p>
                  <p className="text-lg font-mono font-bold">{selectedKpi.currentValue}</p>
                </div>
              </div>

              {/* Gráfico de barras simple estilo boceto */}
              <div className="border-2 border-zinc-900 p-4 bg-white">
                <p className="text-xs font-bold uppercase mb-3 text-center">
                  Resultados Mensuales (%)
                </p>
                <div className="h-36 flex items-end justify-around gap-4 pt-4 border-b-2 border-zinc-900 px-4">
                  {selectedKpi.history.map((item) => (
                    <div key={item.label} className="flex flex-col items-center flex-1">
                      <span className="text-xs font-mono font-bold mb-1">{item.value}%</span>
                      <div
                        style={{ height: `${Math.max(20, item.value)}px` }}
                        className="w-full max-w-[36px] border-2 border-zinc-900 bg-zinc-300"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-around pt-2 px-4 text-xs font-bold">
                  {selectedKpi.history.map((item) => (
                    <span key={item.label}>{item.label}</span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4 mt-4 border-t-2 border-zinc-900">
                <button
                  type="button"
                  onClick={() => setSelectedKpi(null)}
                  className="border-2 border-zinc-900 bg-zinc-900 text-white px-4 py-1.5 text-xs font-bold cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
