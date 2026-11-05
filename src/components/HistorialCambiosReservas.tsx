import React, { useState } from 'react';
import { DiagramStyleMode } from '../types';
import { ArrowLeft, Search, Calendar, Check } from 'lucide-react';

interface HistorialCambiosReservasProps {
  styleMode: DiagramStyleMode;
  onBack: () => void;
  onNavigateToNode?: (nodeId: string) => void;
}

interface AuditLogRow {
  dateTime: string;
  orderCode: string;
  clientName: string;
  userOrigin: string;
  eventType: string;
  justification: string;
  resultingStatus:
    | 'PENDIENTE'
    | 'CANCELADO'
    | 'EN PICKING'
    | 'LISTO PARA DESPACHO'
    | 'DESPACHADO (CERRADO)';
}

const INITIAL_LOGS: AuditLogRow[] = [
  {
    dateTime: '20/10/2026 11:20',
    orderCode: 'RES-940-005',
    clientName: 'Leche Gloria S.A.',
    userOrigin: 'Sistema (Auto)',
    eventType: 'Cambio de Estado (Inicio Picking)',
    justification: 'Asignación en A004 (Contenedor C007/C008) por Regla FEFO',
    resultingStatus: 'EN PICKING',
  },
  {
    dateTime: '19/10/2026 17:45',
    orderCode: 'RES-940-007',
    clientName: 'Nestlé Perú S.A.',
    userOrigin: 'Op_Despacho02',
    eventType: 'Confirmación de Despacho',
    justification: 'Salida conforme por Muelle 04 - Unidad Placa D2P-604',
    resultingStatus: 'DESPACHADO (CERRADO)',
  },
  {
    dateTime: '19/10/2026 14:30',
    orderCode: 'RES-940-001',
    clientName: 'Arca Continental Lindley',
    userOrigin: 'Op_Recepcion01',
    eventType: 'Reprogramación (Postergación)',
    justification: 'Transporte externo reportó avería mecánica en ruta',
    resultingStatus: 'PENDIENTE',
  },
  {
    dateTime: '19/10/2026 10:05',
    orderCode: 'RES-940-002',
    clientName: 'Supermercados Peruanos S.A.',
    userOrigin: 'Op_Almacen03',
    eventType: 'Cierre de Picking',
    justification: '8 Pallets verificados y trasladados a Muelle 02 (A002)',
    resultingStatus: 'LISTO PARA DESPACHO',
  },
  {
    dateTime: '19/10/2026 09:15',
    orderCode: 'RES-940-003',
    clientName: 'Hipermercados Tottus',
    userOrigin: 'Admin_WMS',
    eventType: 'Cancelación de Orden',
    justification: 'Cliente solicitó anulación por error en cantidades de orden',
    resultingStatus: 'CANCELADO',
  },
  {
    dateTime: '18/10/2026 16:00',
    orderCode: 'RES-940-001',
    clientName: 'Arca Continental Lindley',
    userOrigin: 'Sistema (Auto)',
    eventType: 'Cambio de Estado (Inicio Picking)',
    justification: 'Asignación automática en A001 (C001, C002, C009) por Regla FEFO',
    resultingStatus: 'EN PICKING',
  },
  {
    dateTime: '18/10/2026 12:10',
    orderCode: 'RES-940-004',
    clientName: 'Alicorp S.A.A.',
    userOrigin: 'Sistema (Auto)',
    eventType: 'Cambio de Estado (Inicio Picking)',
    justification: 'Extracción iniciada en A002 (Contenedores C003, C004, C010)',
    resultingStatus: 'EN PICKING',
  },
  {
    dateTime: '17/10/2026 09:40',
    orderCode: 'RES-940-006',
    clientName: 'Cencosud Retail Perú S.A.',
    userOrigin: 'Op_Recepcion01',
    eventType: 'Registro de Reserva',
    justification: 'Reserva registrada para Almacén A001 (9 Pallets programados)',
    resultingStatus: 'PENDIENTE',
  },
];

export const HistorialCambiosReservas: React.FC<HistorialCambiosReservasProps> = ({
  styleMode,
  onBack,
}) => {
  const isSketch = styleMode === 'sketch';
  const [searchOrder, setSearchOrder] = useState('');
  const [eventFilter, setEventFilter] = useState('Todos los Eventos');
  const [startDate, setStartDate] = useState('01/10/2026');
  const [endDate, setEndDate] = useState('31/10/2026');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const filteredLogs = INITIAL_LOGS.filter((row) => {
    const matchesOrder =
      row.orderCode.toLowerCase().includes(searchOrder.toLowerCase()) ||
      row.clientName.toLowerCase().includes(searchOrder.toLowerCase());
    const matchesEvent =
      eventFilter === 'Todos los Eventos' || row.eventType === eventFilter;
    return matchesOrder && matchesEvent;
  });

  return (
    <div
      id="vista-historial-cambios"
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
            HISTORIAL DE CAMBIOS DE RESERVAS
          </h1>

          <div className="w-24" />
        </div>

        {/* Filtros de Búsqueda */}
        <div className="border-2 border-zinc-900 bg-zinc-50 p-4 mb-5 grid grid-cols-1 sm:grid-cols-5 gap-3 items-end">
          <div>
            <label className="block text-xs font-bold uppercase text-zinc-800 mb-1">
              Buscar N° Orden (RES):
            </label>
            <input
              type="text"
              value={searchOrder}
              onChange={(e) => setSearchOrder(e.target.value)}
              placeholder="Ej. RES-940-001"
              className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-zinc-800 mb-1">
              Filtrar por Evento:
            </label>
            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-semibold"
            >
              <option value="Todos los Eventos">Todos los Eventos</option>
              <option value="Registro de Reserva">Registro de Reserva</option>
              <option value="Cambio de Estado (Inicio Picking)">
                Cambio de Estado (Inicio Picking)
              </option>
              <option value="Cierre de Picking">Cierre de Picking</option>
              <option value="Reprogramación (Postergación)">Reprogramación (Postergación)</option>
              <option value="Confirmación de Despacho">Confirmación de Despacho</option>
              <option value="Cancelación de Orden">Cancelación de Orden</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-zinc-800 mb-1">
              Fecha Inicio:
            </label>
            <div className="relative">
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-mono"
              />
              <Calendar className="w-3.5 h-3.5 text-zinc-600 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-zinc-800 mb-1">
              Fecha Fin:
            </label>
            <div className="relative">
              <input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-mono"
              />
              <Calendar className="w-3.5 h-3.5 text-zinc-600 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setToastMsg(`${filteredLogs.length} evento(s) encontrado(s)`)}
            className="border-2 border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800 px-3 py-1.5 text-sm font-bold flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            <Search className="w-4 h-4" />
            Aplicar Filtros
          </button>
        </div>

        {/* Tabla de Historial */}
        <div className="border-2 border-zinc-900 overflow-x-auto mb-5">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-200 border-b-2 border-zinc-900 text-xs font-bold uppercase text-zinc-900">
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-36">Fecha / Hora</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-44">
                  Orden (RES) / Cliente
                </th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-32">Usuario / Origen</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-48">Tipo de Evento</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900">Justificación / Detalle</th>
                <th className="py-2.5 px-3 w-40 text-center">Estado Resultante</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y-2 divide-zinc-900">
              {filteredLogs.map((log, idx) => (
                <tr key={idx} className="bg-white hover:bg-zinc-50">
                  <td className="py-2.5 px-3 border-r-2 border-zinc-900 font-mono text-xs">
                    {log.dateTime}
                  </td>
                  <td className="py-2.5 px-3 border-r-2 border-zinc-900 text-xs">
                    <div className="font-mono font-bold">{log.orderCode}</div>
                    <div className="text-zinc-600">{log.clientName}</div>
                  </td>
                  <td className="py-2.5 px-3 border-r-2 border-zinc-900 text-xs font-mono">
                    {log.userOrigin}
                  </td>
                  <td className="py-2.5 px-3 border-r-2 border-zinc-900 font-semibold text-xs">
                    {log.eventType}
                  </td>
                  <td className="py-2.5 px-3 border-r-2 border-zinc-900 text-xs">
                    {log.justification}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="border border-zinc-900 bg-zinc-100 px-2 py-0.5 text-xs font-bold">
                      {log.resultingStatus}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-xs text-zinc-500">
                    No se encontraron registros de auditoría para el filtro seleccionado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Nota de Auditoría */}
        <div className="border-2 border-dashed border-zinc-900 bg-zinc-50 p-3 mb-5 text-xs">
          <span className="font-bold">NOTA DE AUDITORÍA:</span> Por políticas de trazabilidad e
          integridad de datos (Kardex), los registros de este historial son inmutables y de solo
          lectura.
        </div>

        {/* Pie con Botón de Exportar */}
        <div className="flex items-center justify-between pt-2 border-t-2 border-zinc-900">
          <div>
            {toastMsg && (
              <span className="inline-flex items-center gap-1.5 border-2 border-zinc-900 bg-zinc-900 text-white px-3 py-1 text-xs font-bold">
                <Check className="w-3.5 h-3.5" />
                {toastMsg}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setToastMsg('Log de auditoría exportado (CSV/PDF)')}
            className="border-2 border-zinc-900 bg-white hover:bg-zinc-100 px-4 py-1.5 text-sm font-bold shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            Exportar Log (CSV/PDF)
          </button>
        </div>
      </div>
    </div>
  );
};
