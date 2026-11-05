import React, { useState } from 'react';
import { DiagramStyleMode } from '../types';
import { ArrowLeft, Check } from 'lucide-react';

interface PostergarCancelarDespachoProps {
  styleMode: DiagramStyleMode;
  onBack: () => void;
}

interface DispatchOrderData {
  orderId: string;
  clientName: string;
  warehouse: string;
  currentDate: string;
  currentStatus: string;
  reservedMerchandise: string;
  actionType: 'postergar' | 'cancelar';
  newDate: string;
  reason: string;
  comments: string;
}

const INITIAL_DISPATCH_ORDERS: DispatchOrderData[] = [
  {
    orderId: 'RES-940-001',
    clientName: 'Arca Continental Lindley',
    warehouse: 'A001 - Almacen Tio Ben',
    currentDate: '25/10/2026 - 14:00 hrs',
    currentStatus: 'EN PICKING',
    reservedMerchandise: '15 Pallets (370 Cajas de Bebidas)',
    actionType: 'postergar',
    newDate: '28/10/2026',
    reason: 'Retraso de unidad de transporte',
    comments: 'Reprogramado a solicitud del transportista por avería mecánica.',
  },
  {
    orderId: 'RES-940-002',
    clientName: 'Supermercados Peruanos S.A.',
    warehouse: 'A002 - Almacen Central Norte',
    currentDate: '26/10/2026 - 10:00 hrs',
    currentStatus: 'LISTO PARA DESPACHO',
    reservedMerchandise: '8 Pallets (180 Cajas de Abarrotes)',
    actionType: 'postergar',
    newDate: '29/10/2026',
    reason: 'Solicitud directa del cliente',
    comments: 'Sede de destino solicitó mover recepción 72 horas.',
  },
  {
    orderId: 'RES-940-003',
    clientName: 'Hipermercados Tottus',
    warehouse: 'A003 - Almacen Deposito Callao',
    currentDate: '27/10/2026 - 08:00 hrs',
    currentStatus: 'PENDIENTE DE DESPACHO',
    reservedMerchandise: '12 Pallets (240 Cajas de Limpieza)',
    actionType: 'cancelar',
    newDate: '30/10/2026',
    reason: 'Error en cantidades de la orden',
    comments: 'Cliente emitirá nueva orden corregida.',
  },
  {
    orderId: 'RES-940-004',
    clientName: 'Alicorp S.A.A.',
    warehouse: 'A002 - Almacen Central Norte',
    currentDate: '27/10/2026 - 16:00 hrs',
    currentStatus: 'EN PICKING',
    reservedMerchandise: '18 Pallets (405 Cajas de Harina y Pastas)',
    actionType: 'postergar',
    newDate: '30/10/2026',
    reason: 'Retraso de unidad de transporte',
    comments: 'Tracto asignado demorado en control de carretera.',
  },
  {
    orderId: 'RES-940-005',
    clientName: 'Leche Gloria S.A.',
    warehouse: 'A004 - Almacen Frigorifico Sur',
    currentDate: '28/10/2026 - 09:00 hrs',
    currentStatus: 'EN PICKING',
    reservedMerchandise: '14 Pallets (315 Cajas de Lácteos Refrigerados)',
    actionType: 'postergar',
    newDate: '31/10/2026',
    reason: 'Solicitud directa del cliente',
    comments: 'Reprogramación de ventana horaria para unidad refrigerada.',
  },
  {
    orderId: 'RES-940-006',
    clientName: 'Cencosud Retail Perú S.A.',
    warehouse: 'A001 - Almacen Tio Ben',
    currentDate: '29/10/2026 - 11:00 hrs',
    currentStatus: 'PENDIENTE DE DESPACHO',
    reservedMerchandise: '9 Pallets (185 Cajas de Conservas y Galletas)',
    actionType: 'postergar',
    newDate: '02/11/2026',
    reason: 'Solicitud directa del cliente',
    comments: 'Consolidación con siguiente lote semanal.',
  },
  {
    orderId: 'RES-940-007',
    clientName: 'Nestlé Perú S.A.',
    warehouse: 'A004 - Almacen Frigorifico Sur',
    currentDate: '30/10/2026 - 15:00 hrs',
    currentStatus: 'LISTO PARA DESPACHO',
    reservedMerchandise: '10 Pallets (195 Cajas de Cereales y Chocolates)',
    actionType: 'postergar',
    newDate: '03/11/2026',
    reason: 'Retraso de unidad de transporte',
    comments: 'Cambio de transportista autorizado por el cliente.',
  },
];

export const PostergarCancelarDespacho: React.FC<PostergarCancelarDespachoProps> = ({
  styleMode,
  onBack,
}) => {
  const isSketch = styleMode === 'sketch';
  const [orders, setOrders] = useState<DispatchOrderData[]>(INITIAL_DISPATCH_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState('RES-940-001');
  const [savedToast, setSavedToast] = useState(false);

  const currentOrder =
    orders.find((o) => o.orderId === selectedOrderId) || orders[0];

  const updateCurrentOrder = (partial: Partial<DispatchOrderData>) => {
    setOrders((prev) =>
      prev.map((item) =>
        item.orderId === currentOrder.orderId ? { ...item, ...partial } : item
      )
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentOrder.actionType === 'postergar') {
      updateCurrentOrder({
        currentDate: `${currentOrder.newDate} - 14:00 hrs`,
        currentStatus: 'REPROGRAMADO (PENDIENTE)',
      });
    } else {
      updateCurrentOrder({
        currentStatus: 'CANCELADO',
      });
    }
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div
      id="vista-postergar-cancelar"
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
            POSTERGAR / CANCELAR DESPACHO
          </h1>

          <div className="w-24" />
        </div>

        {/* Orden Seleccionada */}
        <div className="border-2 border-zinc-900 bg-zinc-100 p-3.5 mb-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold w-full sm:w-auto">
            <span>Orden de Despacho:</span>
            <select
              value={currentOrder.orderId}
              onChange={(e) => setSelectedOrderId(e.target.value)}
              className="border-2 border-zinc-900 bg-white px-3 py-1.5 font-mono font-bold text-xs sm:text-sm"
            >
              {orders.map((order) => (
                <option key={order.orderId} value={order.orderId}>
                  {order.orderId} | Cliente: {order.clientName}
                </option>
              ))}
            </select>
          </div>
          <span className="text-xs font-bold uppercase border border-zinc-900 bg-white px-2.5 py-1">
            Política POL-001: Mínimo 24h antes
          </span>
        </div>

        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {/* Bloque Izquierdo: Datos Actuales */}
            <div className="border-2 border-zinc-900 p-4 bg-zinc-50 space-y-3">
              <h2 className="text-xs font-bold uppercase border-b-2 border-zinc-900 pb-2">
                1. Datos Actuales del Despacho ({currentOrder.orderId})
              </h2>

              <div className="border border-zinc-900 bg-white p-3">
                <p className="text-xs font-bold uppercase text-zinc-500">
                  Cliente / Almacén Asignado
                </p>
                <p className="text-sm font-bold">
                  {currentOrder.clientName} ({currentOrder.warehouse})
                </p>
              </div>

              <div className="border border-zinc-900 bg-white p-3">
                <p className="text-xs font-bold uppercase text-zinc-500">
                  Fecha Programada Actual
                </p>
                <p className="text-sm font-mono font-bold">{currentOrder.currentDate}</p>
              </div>

              <div className="border border-zinc-900 bg-white p-3">
                <p className="text-xs font-bold uppercase text-zinc-500">Estado Actual</p>
                <p className="text-sm font-bold">{currentOrder.currentStatus}</p>
              </div>

              <div className="border border-zinc-900 bg-white p-3">
                <p className="text-xs font-bold uppercase text-zinc-500">Mercancía Reservada</p>
                <p className="text-sm">{currentOrder.reservedMerchandise}</p>
              </div>
            </div>

            {/* Bloque Derecho: Solicitud de Cambio */}
            <div className="border-2 border-zinc-900 p-4 bg-zinc-50 space-y-3">
              <h2 className="text-xs font-bold uppercase border-b-2 border-zinc-900 pb-2">
                2. Acción a Realizar
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => updateCurrentOrder({ actionType: 'postergar' })}
                  className={`border-2 border-zinc-900 py-2 px-3 text-xs font-bold uppercase cursor-pointer ${
                    currentOrder.actionType === 'postergar'
                      ? 'bg-zinc-900 text-white'
                      : 'bg-white text-zinc-900 hover:bg-zinc-100'
                  }`}
                >
                  Postergar Fecha
                </button>
                <button
                  type="button"
                  onClick={() => updateCurrentOrder({ actionType: 'cancelar' })}
                  className={`border-2 border-zinc-900 py-2 px-3 text-xs font-bold uppercase cursor-pointer ${
                    currentOrder.actionType === 'cancelar'
                      ? 'bg-zinc-900 text-white'
                      : 'bg-white text-zinc-900 hover:bg-zinc-100'
                  }`}
                >
                  Cancelar Despacho
                </button>
              </div>

              {currentOrder.actionType === 'postergar' && (
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">
                    Nueva Fecha de Despacho:
                  </label>
                  <input
                    type="text"
                    value={currentOrder.newDate}
                    onChange={(e) => updateCurrentOrder({ newDate: e.target.value })}
                    className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-mono"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Motivo:</label>
                <select
                  value={currentOrder.reason}
                  onChange={(e) => updateCurrentOrder({ reason: e.target.value })}
                  className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm"
                >
                  <option value="Retraso de unidad de transporte">
                    Retraso de unidad de transporte
                  </option>
                  <option value="Solicitud directa del cliente">
                    Solicitud directa del cliente
                  </option>
                  <option value="Error en cantidades de la orden">
                    Error en cantidades de la orden
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Justificación / Detalle:
                </label>
                <input
                  type="text"
                  value={currentOrder.comments}
                  onChange={(e) => updateCurrentOrder({ comments: e.target.value })}
                  className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm"
                  required
                />
              </div>
            </div>
          </div>

          {/* Botones Inferiores */}
          <div className="flex items-center justify-between pt-3 border-t-2 border-zinc-900">
            <div>
              {savedToast && (
                <span className="inline-flex items-center gap-1.5 border-2 border-zinc-900 bg-zinc-900 text-white px-3 py-1 text-xs font-bold">
                  <Check className="w-3.5 h-3.5" />
                  {currentOrder.actionType === 'postergar'
                    ? `Despacho ${currentOrder.orderId} postergado al ${currentOrder.newDate}`
                    : `Despacho ${currentOrder.orderId} cancelado`}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onBack}
                className="border-2 border-zinc-900 bg-white hover:bg-zinc-100 px-4 py-1.5 text-sm font-bold shadow-[2px_2px_0px_#000] cursor-pointer"
              >
                Descartar
              </button>
              <button
                type="submit"
                className="border-2 border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800 px-5 py-1.5 text-sm font-bold shadow-[2px_2px_0px_#000] cursor-pointer"
              >
                Confirmar Cambio
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
