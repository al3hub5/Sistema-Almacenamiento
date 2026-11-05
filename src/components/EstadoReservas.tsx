import React, { useState } from 'react';
import { DiagramStyleMode } from '../types';
import { ArrowLeft, Search, Check } from 'lucide-react';

interface EstadoReservasProps {
  styleMode: DiagramStyleMode;
  onBack: () => void;
  onNavigateToNode?: (nodeId: string) => void;
  onSelectOrder?: (orderId: string) => void;
}

export interface ReservationCard {
  orderId: string;
  clientName: string;
  warehouse: string;
  scheduledDate: string;
  packagesRequired: string;
  status: 'EN PICKING' | 'LISTO PARA DESPACHO' | 'PENDIENTE' | 'DESPACHADO (CERRADO)';
  progressPercent: number;
  progressText: string;
}

export const INITIAL_RESERVATIONS: ReservationCard[] = [
  {
    orderId: 'RES-940-001',
    clientName: 'Arca Continental Lindley',
    warehouse: 'A001 - Almacen Tio Ben',
    scheduledDate: '25/10/2026',
    packagesRequired: '15 Pallets (370 Cajas)',
    status: 'EN PICKING',
    progressPercent: 80,
    progressText: '12 de 15 Pallets extraídos',
  },
  {
    orderId: 'RES-940-002',
    clientName: 'Supermercados Peruanos S.A.',
    warehouse: 'A002 - Almacen Central Norte',
    scheduledDate: '26/10/2026',
    packagesRequired: '8 Pallets (180 Cajas)',
    status: 'LISTO PARA DESPACHO',
    progressPercent: 100,
    progressText: '8 de 8 Pallets en muelle',
  },
  {
    orderId: 'RES-940-003',
    clientName: 'Hipermercados Tottus',
    warehouse: 'A003 - Almacen Deposito Callao',
    scheduledDate: '27/10/2026',
    packagesRequired: '12 Pallets (240 Cajas)',
    status: 'PENDIENTE',
    progressPercent: 0,
    progressText: '0 de 12 Pallets listos',
  },
  {
    orderId: 'RES-940-004',
    clientName: 'Alicorp S.A.A.',
    warehouse: 'A002 - Almacen Central Norte',
    scheduledDate: '27/10/2026',
    packagesRequired: '18 Pallets (405 Cajas)',
    status: 'EN PICKING',
    progressPercent: 65,
    progressText: '12 de 18 Pallets extraídos',
  },
  {
    orderId: 'RES-940-005',
    clientName: 'Leche Gloria S.A.',
    warehouse: 'A004 - Almacen Frigorifico Sur',
    scheduledDate: '28/10/2026',
    packagesRequired: '14 Pallets (315 Cajas)',
    status: 'EN PICKING',
    progressPercent: 70,
    progressText: '10 de 14 Pallets extraídos',
  },
  {
    orderId: 'RES-940-006',
    clientName: 'Cencosud Retail Perú S.A.',
    warehouse: 'A001 - Almacen Tio Ben',
    scheduledDate: '29/10/2026',
    packagesRequired: '9 Pallets (185 Cajas)',
    status: 'PENDIENTE',
    progressPercent: 0,
    progressText: '0 de 9 Pallets listos',
  },
  {
    orderId: 'RES-940-007',
    clientName: 'Nestlé Perú S.A.',
    warehouse: 'A004 - Almacen Frigorifico Sur',
    scheduledDate: '19/10/2026',
    packagesRequired: '10 Pallets (195 Cajas)',
    status: 'DESPACHADO (CERRADO)',
    progressPercent: 100,
    progressText: '10 de 10 Pallets despachados',
  },
];

export const EstadoReservas: React.FC<EstadoReservasProps> = ({
  styleMode,
  onBack,
  onNavigateToNode,
  onSelectOrder,
}) => {
  const isSketch = styleMode === 'sketch';
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos los Estados');
  const [warehouseFilter, setWarehouseFilter] = useState('Todos los Almacenes');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const filteredList = INITIAL_RESERVATIONS.filter((item) => {
    const matchesSearch =
      item.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'Todos los Estados' || item.status === statusFilter;
    const matchesWarehouse =
      warehouseFilter === 'Todos los Almacenes' || item.warehouse === warehouseFilter;
    return matchesSearch && matchesStatus && matchesWarehouse;
  });

  const handleExport = () => {
    setToastMsg('Reporte de Estado de Reservas exportado correctamente');
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleOpenDetail = (orderId: string) => {
    if (onSelectOrder) {
      onSelectOrder(orderId);
    }
    if (onNavigateToNode) {
      onNavigateToNode('rep-detalles-reserva');
    }
  };

  return (
    <div
      id="vista-estado-reservas"
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
            ESTADO DE RESERVAS
          </h1>

          <div className="w-24" />
        </div>

        {/* Filtros de Reporte */}
        <div className="border-2 border-zinc-900 bg-zinc-50 p-4 mb-5 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
          <div>
            <label className="block text-xs font-bold uppercase text-zinc-800 mb-1">
              Buscar Orden o Cliente:
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ej. RES-940-001 o Arca..."
              className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-zinc-800 mb-1">
              Filtrar por Estado:
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-semibold"
            >
              <option value="Todos los Estados">Todos los Estados</option>
              <option value="PENDIENTE">PENDIENTE</option>
              <option value="EN PICKING">EN PICKING</option>
              <option value="LISTO PARA DESPACHO">LISTO PARA DESPACHO</option>
              <option value="DESPACHADO (CERRADO)">DESPACHADO (CERRADO)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-zinc-800 mb-1">
              Almacén:
            </label>
            <select
              value={warehouseFilter}
              onChange={(e) => setWarehouseFilter(e.target.value)}
              className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm"
            >
              <option value="Todos los Almacenes">Todos los Almacenes</option>
              <option value="A001 - Almacen Tio Ben">A001 - Almacen Tio Ben</option>
              <option value="A002 - Almacen Central Norte">A002 - Almacen Central Norte</option>
              <option value="A003 - Almacen Deposito Callao">
                A003 - Almacen Deposito Callao
              </option>
              <option value="A004 - Almacen Frigorifico Sur">
                A004 - Almacen Frigorifico Sur
              </option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => setToastMsg(`${filteredList.length} reserva(s) encontrada(s)`)}
            className="border-2 border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800 px-4 py-1.5 text-sm font-bold flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            <Search className="w-4 h-4" />
            Filtrar Reporte
          </button>
        </div>

        {/* Listado de Tarjetas / Filas */}
        <div className="space-y-3 mb-5">
          {filteredList.map((row) => (
            <div
              key={row.orderId}
              className="border-2 border-zinc-900 bg-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              {/* Izquierda: Textos */}
              <div className="space-y-1">
                <p className="text-sm font-bold text-zinc-900">
                  Orden: <span className="font-mono">{row.orderId}</span> | Cliente:{' '}
                  {row.clientName}
                </p>
                <p className="text-xs text-zinc-700">
                  Almacén: <span className="font-mono font-bold">{row.warehouse}</span> | Fecha
                  Programada: <span className="font-mono font-bold">{row.scheduledDate}</span> |
                  Volumen: <span className="font-bold">{row.packagesRequired}</span>
                </p>
              </div>

              {/* Derecha: Estado, Barra de Progreso y Botón */}
              <div className="flex flex-col sm:items-end gap-2">
                <div className="flex items-center gap-2">
                  <span className="border-2 border-zinc-900 bg-zinc-100 px-2.5 py-0.5 text-xs font-bold uppercase">
                    {row.status}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleOpenDetail(row.orderId)}
                    className="border-2 border-zinc-900 bg-white hover:bg-zinc-900 hover:text-white px-2.5 py-0.5 text-xs font-bold shadow-[1px_1px_0px_#000] cursor-pointer"
                  >
                    [Ver Detalle]
                  </button>
                </div>

                <div className="w-full sm:w-56">
                  <div className="w-full h-3 border-2 border-zinc-900 bg-white overflow-hidden">
                    <div
                      style={{ width: `${row.progressPercent}%` }}
                      className="h-full bg-zinc-800"
                    />
                  </div>
                  <p className="text-[11px] font-mono text-zinc-700 mt-0.5 sm:text-right">
                    {row.progressText} ({row.progressPercent}%)
                  </p>
                </div>
              </div>
            </div>
          ))}

          {filteredList.length === 0 && (
            <div className="border-2 border-zinc-900 bg-zinc-50 p-6 text-center text-sm text-zinc-600">
              No se encontraron reservas con los criterios seleccionados.
            </div>
          )}
        </div>

        {/* Pie con botón de exportación */}
        <div className="flex items-center justify-between pt-3 border-t-2 border-zinc-900">
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
            onClick={handleExport}
            className="border-2 border-zinc-900 bg-white hover:bg-zinc-100 px-4 py-1.5 text-sm font-bold shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            Exportar Reporte
          </button>
        </div>
      </div>
    </div>
  );
};
