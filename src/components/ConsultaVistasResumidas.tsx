import React, { useState } from 'react';
import { DiagramStyleMode } from '../types';
import { ArrowLeft, Search, X } from 'lucide-react';

interface ConsultaVistasResumidasProps {
  styleMode: DiagramStyleMode;
  onBack: () => void;
}

interface SummaryViewItem {
  code: string;
  name: string;
  module: 'Almacén' | 'Reservas' | 'Despacho';
  period: string;
  summaryValue: string;
  details: { label: string; value: string }[];
}

const INITIAL_VIEWS: SummaryViewItem[] = [
  {
    code: 'VIS-001',
    name: 'Resumen de Stock por Categoría de Producto',
    module: 'Almacén',
    period: 'Octubre 2026',
    summaryValue: '1,450 Cajas Totales',
    details: [
      { label: 'Bebidas Carbonatadas', value: '850 Cajas' },
      { label: 'Aguas de Mesa', value: '400 Cajas' },
      { label: 'Bebidas Rehidratantes', value: '200 Cajas' },
    ],
  },
  {
    code: 'VIS-002',
    name: 'Resumen de Reservas Atendidas por Estado',
    module: 'Reservas',
    period: 'Octubre 2026',
    summaryValue: '28 Órdenes Procesadas',
    details: [
      { label: 'Despachadas (Cerradas)', value: '20 Órdenes' },
      { label: 'En Proceso de Picking', value: '5 Órdenes' },
      { label: 'Pendientes de Cita', value: '3 Órdenes' },
    ],
  },
  {
    code: 'VIS-003',
    name: 'Resumen de Movimientos por Muelle de Carga',
    module: 'Despacho',
    period: 'Octubre 2026',
    summaryValue: '42 Citas Atendidas',
    details: [
      { label: 'Muelle 01 - Carga Seca', value: '18 Citas' },
      { label: 'Muelle 02 - Carga Fría', value: '14 Citas' },
      { label: 'Muelle 03 - Despacho Rápido', value: '10 Citas' },
    ],
  },
  {
    code: 'VIS-004',
    name: 'Ocupación de Ubicaciones por Zona del Almacén',
    module: 'Almacén',
    period: 'Octubre 2026',
    summaryValue: '670 Pallets Ubicados',
    details: [
      { label: 'Zona Seca (Pasillos 1 al 4)', value: '420 Pallets' },
      { label: 'Cámara Refrigerada', value: '165 Pallets' },
      { label: 'Zona de Pre-Despacho', value: '85 Pallets' },
    ],
  },
  {
    code: 'VIS-005',
    name: 'Volumen de Reservas por Cliente Corporativo',
    module: 'Reservas',
    period: 'Octubre 2026',
    summaryValue: '24 Reservas Activas',
    details: [
      { label: 'Alicorp S.A.A.', value: '5 Reservas' },
      { label: 'Arca Continental Lindley S.A.', value: '4 Reservas' },
      { label: 'Leche Gloria S.A.', value: '4 Reservas' },
      { label: 'Otros Clientes Corporativos', value: '11 Reservas' },
    ],
  },
  {
    code: 'VIS-006',
    name: 'Estado de Lotes según Vigencia y Vencimiento (FEFO)',
    module: 'Almacén',
    period: 'Octubre 2026',
    summaryValue: '86 Lotes Activos',
    details: [
      { label: 'Vigencia Óptima (> 90 días)', value: '68 Lotes' },
      { label: 'Prioridad de Salida (30 a 90 días)', value: '14 Lotes' },
      { label: 'Alerta Próximo a Vencer (< 30 días)', value: '4 Lotes' },
    ],
  },
  {
    code: 'VIS-007',
    name: 'Consolidado de Pallets Despachados por Transportista',
    module: 'Despacho',
    period: 'Octubre 2026',
    summaryValue: '540 Pallets Despachados',
    details: [
      { label: 'Transportes del Norte S.A.C.', value: '220 Pallets' },
      { label: 'Ransa Comercial S.A.', value: '190 Pallets' },
      { label: 'Dinet Perú S.A.', value: '130 Pallets' },
    ],
  },
  {
    code: 'VIS-008',
    name: 'Resumen de Reprogramaciones y Cancelaciones de Cita',
    module: 'Reservas',
    period: 'Octubre 2026',
    summaryValue: '7 Incidencias Registradas',
    details: [
      { label: 'Postergaciones dentro de plazo (> 24h)', value: '4 Órdenes' },
      { label: 'Cancelaciones solicitadas por cliente', value: '2 Órdenes' },
      { label: 'Reprogramación por tardanza en muelle', value: '1 Orden' },
    ],
  },
];

export const ConsultaVistasResumidas: React.FC<ConsultaVistasResumidasProps> = ({
  styleMode,
  onBack,
}) => {
  const isSketch = styleMode === 'sketch';
  const [searchQuery, setSearchQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState('Todos');
  const [selectedView, setSelectedView] = useState<SummaryViewItem | null>(null);

  const filteredViews = INITIAL_VIEWS.filter((v) => {
    const matchesSearch =
      v.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModule = moduleFilter === 'Todos' || v.module === moduleFilter;
    return matchesSearch && matchesModule;
  });

  return (
    <div
      id="vista-consulta-vistas-resumidas"
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
            CONSULTA DE VISTAS RESUMIDAS
          </h1>

          <div className="w-24" />
        </div>

        {/* Filtros */}
        <div className="border-2 border-zinc-900 bg-zinc-50 p-4 mb-5 flex flex-col sm:flex-row items-end gap-3">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold uppercase text-zinc-800 mb-1">
              Buscar Vista Resumida:
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ej. VIS-001, Stock, Ubicaciones, Lotes, Muelle..."
              className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm focus:outline-none"
            />
          </div>
          <div className="w-full sm:w-44">
            <label className="block text-xs font-bold uppercase text-zinc-800 mb-1">
              Módulo:
            </label>
            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-semibold cursor-pointer"
            >
              <option value="Todos">Todos</option>
              <option value="Almacén">Almacén</option>
              <option value="Reservas">Reservas</option>
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

        {/* Tabla de Vistas Resumidas */}
        <div className="border-2 border-zinc-900 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-200 border-b-2 border-zinc-900 text-xs font-bold uppercase text-zinc-900">
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-24">Código</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900">Vista Resumida</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-28 text-center">Módulo</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-32 text-center">Periodo</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-48">Total Consolidado</th>
                <th className="py-2.5 px-3 w-32 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y-2 divide-zinc-900">
              {filteredViews.map((view) => (
                <tr key={view.code} className="bg-white hover:bg-zinc-50">
                  <td className="py-2.5 px-3 border-r-2 border-zinc-900 font-mono">{view.code}</td>
                  <td className="py-2.5 px-3 border-r-2 border-zinc-900 font-semibold">
                    {view.name}
                  </td>
                  <td className="py-2.5 px-3 border-r-2 border-zinc-900 text-center text-xs">
                    {view.module}
                  </td>
                  <td className="py-2.5 px-3 border-r-2 border-zinc-900 text-center text-xs">
                    {view.period}
                  </td>
                  <td className="py-2.5 px-3 border-r-2 border-zinc-900 font-mono font-bold text-xs">
                    {view.summaryValue}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      type="button"
                      onClick={() => setSelectedView(view)}
                      className="border border-zinc-900 bg-white hover:bg-zinc-900 hover:text-white px-2.5 py-1 text-xs font-bold shadow-[1px_1px_0px_#000] cursor-pointer"
                    >
                      [Ver Resumen]
                    </button>
                  </td>
                </tr>
              ))}
              {filteredViews.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-zinc-500 text-sm">
                    No se encontraron vistas resumidas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal de Desglose de Vista Resumida */}
        {selectedView && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white border-2 border-zinc-900 shadow-[5px_5px_0px_#000] w-full max-w-md p-5">
              <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-2 mb-4">
                <h2 className="text-sm font-bold uppercase">
                  {selectedView.code} - {selectedView.name}
                </h2>
                <button
                  type="button"
                  onClick={() => setSelectedView(null)}
                  className="border border-zinc-900 p-1 hover:bg-zinc-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="border-2 border-zinc-900 bg-zinc-50 p-3 mb-4 flex justify-between items-center">
                <span className="text-xs font-bold uppercase">Total Consolidado:</span>
                <span className="font-mono font-bold text-sm">{selectedView.summaryValue}</span>
              </div>

              <div className="border-2 border-zinc-900 divide-y-2 divide-zinc-900">
                {selectedView.details.map((d) => (
                  <div key={d.label} className="p-2.5 flex justify-between items-center text-sm">
                    <span>{d.label}</span>
                    <span className="font-mono font-bold">{d.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4 mt-4 border-t-2 border-zinc-900">
                <button
                  type="button"
                  onClick={() => setSelectedView(null)}
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
