import React, { useState } from 'react';
import { DiagramStyleMode } from '../types';
import { ArrowLeft, Check } from 'lucide-react';

interface DetalleReservaProps {
  styleMode: DiagramStyleMode;
  onBack: () => void;
  onNavigateToNode?: (nodeId: string) => void;
  selectedOrderId?: string;
  onSelectOrder?: (orderId: string) => void;
}

interface PickingLine {
  code: string;
  description: string;
  lot: string;
  boxes: number;
  extractionContainer: string;
  status: 'Extraído (OK)' | 'Pendiente' | 'Despachado';
}

interface ReservationDetailData {
  orderId: string;
  clientName: string;
  warehouse: string;
  dockDate: string;
  dockName: string;
  status: string;
  progress: string;
  lines: PickingLine[];
}

const RESERVATION_DETAILS: ReservationDetailData[] = [
  {
    orderId: 'RES-940-001',
    clientName: 'Arca Continental Lindley',
    warehouse: 'A001 - Almacen Tio Ben',
    dockDate: '25/10/2026 (14:00 - 15:00)',
    dockName: 'Muelle 01 - A001',
    status: 'EN PICKING',
    progress: '80%',
    lines: [
      {
        code: '77512300001',
        description: 'Bebidas Carbonatadas (Cola) 3L',
        lot: 'LOTE-A44 (Venc: 2027)',
        boxes: 50,
        extractionContainer: 'A001 - Contenedor C001',
        status: 'Extraído (OK)',
      },
      {
        code: '77512300001',
        description: 'Bebidas Carbonatadas (Cola) 3L',
        lot: 'LOTE-A45 (Venc: 2027)',
        boxes: 20,
        extractionContainer: 'A001 - Contenedor C001',
        status: 'Pendiente',
      },
      {
        code: '77512300099',
        description: 'Bebidas Sabor Piña 500ml',
        lot: 'LOTE-B12 (Venc: 2026)',
        boxes: 100,
        extractionContainer: 'A001 - Contenedor C002',
        status: 'Extraído (OK)',
      },
      {
        code: '77512300088',
        description: 'Agua Mineral S/Gas 1L',
        lot: 'LOTE-X90 (Venc: 2028)',
        boxes: 200,
        extractionContainer: 'A001 - Contenedor C009',
        status: 'Extraído (OK)',
      },
    ],
  },
  {
    orderId: 'RES-940-002',
    clientName: 'Supermercados Peruanos S.A.',
    warehouse: 'A002 - Almacen Central Norte',
    dockDate: '26/10/2026 (10:00 - 11:00)',
    dockName: 'Muelle 02 - A002',
    status: 'LISTO PARA DESPACHO',
    progress: '100%',
    lines: [
      {
        code: '77520010011',
        description: 'Aceite Vegetal Botella 1L',
        lot: 'LOTE-C10 (Venc: 2027)',
        boxes: 120,
        extractionContainer: 'A002 - Contenedor C003',
        status: 'Extraído (OK)',
      },
      {
        code: '77520010045',
        description: 'Arroz Extra Saco 50kg',
        lot: 'LOTE-C18 (Venc: 2027)',
        boxes: 60,
        extractionContainer: 'A002 - Contenedor C004',
        status: 'Extraído (OK)',
      },
    ],
  },
  {
    orderId: 'RES-940-003',
    clientName: 'Hipermercados Tottus',
    warehouse: 'A003 - Almacen Deposito Callao',
    dockDate: '27/10/2026 (08:00 - 09:00)',
    dockName: 'Muelle 03 - A003',
    status: 'PENDIENTE',
    progress: '0%',
    lines: [
      {
        code: '77531004010',
        description: 'Detergente Industrial Saco 15kg',
        lot: 'LOTE-D05 (Ing: 05/2026)',
        boxes: 90,
        extractionContainer: 'A003 - Contenedor C005',
        status: 'Pendiente',
      },
      {
        code: '77531004088',
        description: 'Papel Toalla Institucional x 24 rollos',
        lot: 'LOTE-D09 (Ing: 06/2026)',
        boxes: 150,
        extractionContainer: 'A003 - Contenedor C006',
        status: 'Pendiente',
      },
    ],
  },
  {
    orderId: 'RES-940-004',
    clientName: 'Alicorp S.A.A.',
    warehouse: 'A002 - Almacen Central Norte',
    dockDate: '27/10/2026 (16:00 - 17:00)',
    dockName: 'Muelle 02 - A002',
    status: 'EN PICKING',
    progress: '65%',
    lines: [
      {
        code: '77540020100',
        description: 'Harina Industrial Especial 50kg',
        lot: 'LOTE-F21 (Venc: 2027)',
        boxes: 140,
        extractionContainer: 'A002 - Contenedor C003',
        status: 'Extraído (OK)',
      },
      {
        code: '77540020155',
        description: 'Fideos Spaghetti Paquete x 20 unid.',
        lot: 'LOTE-F25 (Venc: 2027)',
        boxes: 180,
        extractionContainer: 'A002 - Contenedor C010',
        status: 'Extraído (OK)',
      },
      {
        code: '77540020190',
        description: 'Manteca Vegetal Bloque 10kg',
        lot: 'LOTE-F30 (Venc: 2026)',
        boxes: 85,
        extractionContainer: 'A002 - Contenedor C004',
        status: 'Pendiente',
      },
    ],
  },
  {
    orderId: 'RES-940-005',
    clientName: 'Leche Gloria S.A.',
    warehouse: 'A004 - Almacen Frigorifico Sur',
    dockDate: '28/10/2026 (08:00 - 09:00)',
    dockName: 'Muelle 04 - A004',
    status: 'EN PICKING',
    progress: '70%',
    lines: [
      {
        code: '77550030012',
        description: 'Leche Evaporada Bandeja x 48 latas',
        lot: 'LOTE-G88 (Venc: 2026)',
        boxes: 220,
        extractionContainer: 'A004 - Contenedor C007',
        status: 'Extraído (OK)',
      },
      {
        code: '77550030079',
        description: 'Yogurt Bebible Frutado 1L (Refrigerado)',
        lot: 'LOTE-G92 (Venc: 11/2026)',
        boxes: 95,
        extractionContainer: 'A004 - Contenedor C008',
        status: 'Pendiente',
      },
    ],
  },
  {
    orderId: 'RES-940-006',
    clientName: 'Cencosud Retail Perú S.A.',
    warehouse: 'A001 - Almacen Tio Ben',
    dockDate: '29/10/2026 (10:00 - 11:00)',
    dockName: 'Muelle 01 - A001',
    status: 'PENDIENTE',
    progress: '0%',
    lines: [
      {
        code: '77560080021',
        description: 'Conservas de Atún en Filete x 48 latas',
        lot: 'LOTE-M14 (Venc: 2028)',
        boxes: 110,
        extractionContainer: 'A001 - Contenedor C001',
        status: 'Pendiente',
      },
      {
        code: '77560080054',
        description: 'Galletas Dulces Pack Mayorista',
        lot: 'LOTE-M19 (Venc: 2027)',
        boxes: 75,
        extractionContainer: 'A001 - Contenedor C002',
        status: 'Pendiente',
      },
    ],
  },
  {
    orderId: 'RES-940-007',
    clientName: 'Nestlé Perú S.A.',
    warehouse: 'A004 - Almacen Frigorifico Sur',
    dockDate: '19/10/2026 (14:00 - 15:00)',
    dockName: 'Muelle 04 - A004',
    status: 'DESPACHADO (CERRADO)',
    progress: '100%',
    lines: [
      {
        code: '77570090033',
        description: 'Cereal Matinal Caja x 24 unid.',
        lot: 'LOTE-N03 (Venc: 2027)',
        boxes: 130,
        extractionContainer: 'A004 - Contenedor C007',
        status: 'Despachado',
      },
      {
        code: '77570090081',
        description: 'Cobertura de Chocolate Industrial 5kg',
        lot: 'LOTE-N08 (Venc: 2026)',
        boxes: 65,
        extractionContainer: 'A004 - Contenedor C008',
        status: 'Despachado',
      },
    ],
  },
];

export const DetalleReserva: React.FC<DetalleReservaProps> = ({
  styleMode,
  onBack,
  onNavigateToNode,
  selectedOrderId = 'RES-940-001',
  onSelectOrder,
}) => {
  const isSketch = styleMode === 'sketch';
  const [localOrderId, setLocalOrderId] = useState(selectedOrderId);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const activeOrderId = onSelectOrder ? selectedOrderId : localOrderId;
  const currentReservation =
    RESERVATION_DETAILS.find((r) => r.orderId === activeOrderId) ||
    RESERVATION_DETAILS[0];

  const handleOrderChange = (newOrderId: string) => {
    setLocalOrderId(newOrderId);
    if (onSelectOrder) {
      onSelectOrder(newOrderId);
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  return (
    <div
      id="vista-detalle-reserva"
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
            DETALLE DE RESERVA
          </h1>

          <div className="w-24" />
        </div>

        {/* Cabecera de la Orden con Selector */}
        <div className="border-2 border-zinc-900 bg-zinc-50 p-4 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-bold text-zinc-900">Documento:</span>
              <select
                value={currentReservation.orderId}
                onChange={(e) => handleOrderChange(e.target.value)}
                className="border-2 border-zinc-900 bg-white px-2.5 py-1 text-sm font-mono font-bold"
              >
                {RESERVATION_DETAILS.map((item) => (
                  <option key={item.orderId} value={item.orderId}>
                    {item.orderId} | Cliente: {item.clientName}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs font-semibold text-zinc-700">
              Almacén: <span className="font-mono font-bold">{currentReservation.warehouse}</span> |
              Cita en Muelle ({currentReservation.dockName}):{' '}
              <span className="font-mono font-bold">{currentReservation.dockDate}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="border-2 border-zinc-900 bg-white px-3 py-1 text-xs font-mono font-bold">
              Progreso: {currentReservation.progress}
            </span>
            <span className="border-2 border-zinc-900 bg-zinc-900 text-white px-3 py-1 text-xs font-bold uppercase">
              {currentReservation.status}
            </span>
          </div>
        </div>

        {/* Tabla de Líneas de la Reserva */}
        <div className="border-2 border-zinc-900 overflow-x-auto mb-5">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-200 border-b-2 border-zinc-900 text-xs font-bold uppercase text-zinc-900">
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-32">Código GTIN</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900">Descripción</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-44">Lote / SSCC</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-28 text-center">
                  Cant. (Cajas)
                </th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-48">
                  Almacén / Contenedor
                </th>
                <th className="py-2.5 px-3 w-36 text-center">Estado de Línea</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y-2 divide-zinc-900">
              {currentReservation.lines.map((line, index) => (
                <tr key={index} className="bg-white hover:bg-zinc-50">
                  <td className="py-2.5 px-3 border-r-2 border-zinc-900 font-mono text-xs font-bold">
                    {line.code}
                  </td>
                  <td className="py-2.5 px-3 border-r-2 border-zinc-900">{line.description}</td>
                  <td className="py-2.5 px-3 border-r-2 border-zinc-900 font-mono text-xs">
                    {line.lot}
                  </td>
                  <td className="py-2.5 px-3 border-r-2 border-zinc-900 text-center font-mono font-bold">
                    {line.boxes}
                  </td>
                  <td className="py-2.5 px-3 border-r-2 border-zinc-900 text-xs font-semibold">
                    {line.extractionContainer}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="border border-zinc-900 bg-zinc-100 px-2 py-0.5 text-xs font-bold">
                      {line.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Acciones Inferiores */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t-2 border-zinc-900">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() =>
                onNavigateToNode && onNavigateToNode('de-postergar-cancelar')
              }
              className="border-2 border-zinc-900 bg-white hover:bg-zinc-100 px-4 py-1.5 text-sm font-bold shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              Postergar / Cancelar
            </button>
            <button
              type="button"
              onClick={() =>
                showToast(`Descargando Packing List de ${currentReservation.orderId} (PDF)...`)
              }
              className="border-2 border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800 px-4 py-1.5 text-sm font-bold shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              Descargar Packing List (PDF)
            </button>
          </div>

          <div className="flex items-center gap-3">
            {toastMsg && (
              <span className="inline-flex items-center gap-1.5 border-2 border-zinc-900 bg-zinc-900 text-white px-3 py-1 text-xs font-bold">
                <Check className="w-3.5 h-3.5" />
                {toastMsg}
              </span>
            )}
            <button
              type="button"
              onClick={() =>
                onNavigateToNode ? onNavigateToNode('rep-estado-reservas') : onBack()
              }
              className="border-2 border-zinc-900 bg-white hover:bg-zinc-100 px-4 py-1.5 text-sm font-bold shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              Volver al Listado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
