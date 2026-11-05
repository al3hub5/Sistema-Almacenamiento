import React, { useState } from 'react';
import { DiagramStyleMode } from '../types';
import { ArrowLeft, Check } from 'lucide-react';

interface GestionReservasProps {
  styleMode: DiagramStyleMode;
  onBack: () => void;
}

interface AllocationItem {
  id: string;
  product: string;
  assignedBoxes: number;
  lot: string;
  location: string;
}

interface OrderManagementData {
  orderId: string;
  clientName: string;
  warehouse: string;
  status: string;
  priority: string;
  allocationRule: string;
  allocations: AllocationItem[];
}

const INITIAL_ORDERS_DATA: OrderManagementData[] = [
  {
    orderId: 'RES-940-001',
    clientName: 'Arca Continental Lindley',
    warehouse: 'A001 - Almacen Tio Ben',
    status: 'EN PICKING',
    priority: 'Alta',
    allocationRule: 'FEFO (Primero en Vencer)',
    allocations: [
      {
        id: '1-1',
        product: 'Bebidas Carbonatadas (Cola) 3L',
        assignedBoxes: 70,
        lot: 'LOTE-A44 (Venc: 2027)',
        location: 'A001 - Contenedor C001',
      },
      {
        id: '1-2',
        product: 'Bebidas Sabor Piña 500ml',
        assignedBoxes: 100,
        lot: 'LOTE-B12 (Venc: 2026)',
        location: 'A001 - Contenedor C002',
      },
      {
        id: '1-3',
        product: 'Agua Mineral S/Gas 1L',
        assignedBoxes: 200,
        lot: 'LOTE-X90 (Venc: 2028)',
        location: 'A001 - Contenedor C009',
      },
    ],
  },
  {
    orderId: 'RES-940-002',
    clientName: 'Supermercados Peruanos S.A.',
    warehouse: 'A002 - Almacen Central Norte',
    status: 'LISTO PARA DESPACHO',
    priority: 'Normal',
    allocationRule: 'FEFO (Primero en Vencer)',
    allocations: [
      {
        id: '2-1',
        product: 'Aceite Vegetal Botella 1L',
        assignedBoxes: 120,
        lot: 'LOTE-C10 (Venc: 2027)',
        location: 'A002 - Contenedor C003',
      },
      {
        id: '2-2',
        product: 'Arroz Extra Saco 50kg',
        assignedBoxes: 60,
        lot: 'LOTE-C18 (Venc: 2027)',
        location: 'A002 - Contenedor C004',
      },
    ],
  },
  {
    orderId: 'RES-940-003',
    clientName: 'Hipermercados Tottus',
    warehouse: 'A003 - Almacen Deposito Callao',
    status: 'PENDIENTE',
    priority: 'Alta',
    allocationRule: 'FIFO (Primero en Entrar)',
    allocations: [
      {
        id: '3-1',
        product: 'Detergente Industrial Saco 15kg',
        assignedBoxes: 90,
        lot: 'LOTE-D05 (Ing: 05/2026)',
        location: 'A003 - Contenedor C005',
      },
      {
        id: '3-2',
        product: 'Papel Toalla Institucional x 24 rollos',
        assignedBoxes: 150,
        lot: 'LOTE-D09 (Ing: 06/2026)',
        location: 'A003 - Contenedor C006',
      },
    ],
  },
  {
    orderId: 'RES-940-004',
    clientName: 'Alicorp S.A.A.',
    warehouse: 'A002 - Almacen Central Norte',
    status: 'EN PICKING',
    priority: 'Alta',
    allocationRule: 'FEFO (Primero en Vencer)',
    allocations: [
      {
        id: '4-1',
        product: 'Harina Industrial Especial 50kg',
        assignedBoxes: 140,
        lot: 'LOTE-F21 (Venc: 2027)',
        location: 'A002 - Contenedor C003',
      },
      {
        id: '4-2',
        product: 'Fideos Spaghetti Paquete x 20 unid.',
        assignedBoxes: 180,
        lot: 'LOTE-F25 (Venc: 2027)',
        location: 'A002 - Contenedor C010',
      },
      {
        id: '4-3',
        product: 'Manteca Vegetal Bloque 10kg',
        assignedBoxes: 85,
        lot: 'LOTE-F30 (Venc: 2026)',
        location: 'A002 - Contenedor C004',
      },
    ],
  },
  {
    orderId: 'RES-940-005',
    clientName: 'Leche Gloria S.A.',
    warehouse: 'A004 - Almacen Frigorifico Sur',
    status: 'EN PICKING',
    priority: 'Alta',
    allocationRule: 'FEFO (Primero en Vencer)',
    allocations: [
      {
        id: '5-1',
        product: 'Leche Evaporada Bandeja x 48 latas',
        assignedBoxes: 220,
        lot: 'LOTE-G88 (Venc: 2026)',
        location: 'A004 - Contenedor C007',
      },
      {
        id: '5-2',
        product: 'Yogurt Bebible Frutado 1L (Refrigerado)',
        assignedBoxes: 95,
        lot: 'LOTE-G92 (Venc: 11/2026)',
        location: 'A004 - Contenedor C008',
      },
    ],
  },
  {
    orderId: 'RES-940-006',
    clientName: 'Cencosud Retail Perú S.A.',
    warehouse: 'A001 - Almacen Tio Ben',
    status: 'PENDIENTE',
    priority: 'Normal',
    allocationRule: 'FIFO (Primero en Entrar)',
    allocations: [
      {
        id: '6-1',
        product: 'Conservas de Atún en Filete x 48 latas',
        assignedBoxes: 110,
        lot: 'LOTE-M14 (Venc: 2028)',
        location: 'A001 - Contenedor C001',
      },
      {
        id: '6-2',
        product: 'Galletas Dulces Pack Mayorista',
        assignedBoxes: 75,
        lot: 'LOTE-M19 (Venc: 2027)',
        location: 'A001 - Contenedor C002',
      },
    ],
  },
  {
    orderId: 'RES-940-007',
    clientName: 'Nestlé Perú S.A.',
    warehouse: 'A004 - Almacen Frigorifico Sur',
    status: 'LISTO PARA DESPACHO',
    priority: 'Normal',
    allocationRule: 'FEFO (Primero en Vencer)',
    allocations: [
      {
        id: '7-1',
        product: 'Cereal Matinal Caja x 24 unid.',
        assignedBoxes: 130,
        lot: 'LOTE-N03 (Venc: 2027)',
        location: 'A004 - Contenedor C007',
      },
      {
        id: '7-2',
        product: 'Cobertura de Chocolate Industrial 5kg',
        assignedBoxes: 65,
        lot: 'LOTE-N08 (Venc: 2026)',
        location: 'A004 - Contenedor C008',
      },
    ],
  },
];

export const GestionReservas: React.FC<GestionReservasProps> = ({ styleMode, onBack }) => {
  const isSketch = styleMode === 'sketch';
  const [orders, setOrders] = useState<OrderManagementData[]>(INITIAL_ORDERS_DATA);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('RES-940-001');
  const [savedToast, setSavedToast] = useState(false);

  const currentOrder =
    orders.find((o) => o.orderId === selectedOrderId) || orders[0];

  const handleFieldChange = (
    field: 'status' | 'priority' | 'allocationRule',
    value: string
  ) => {
    setOrders((prev) =>
      prev.map((item) =>
        item.orderId === currentOrder.orderId ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div
      id="vista-gestion-reservas"
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
            GESTIÓN DE RESERVAS
          </h1>

          <div className="w-24" />
        </div>

        {/* Cabecera de Selección de Reserva */}
        <div className="border-2 border-zinc-900 bg-zinc-100 p-3.5 mb-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold w-full sm:w-auto">
            <span>Reserva Activa:</span>
            <select
              value={currentOrder.orderId}
              onChange={(e) => setSelectedOrderId(e.target.value)}
              className="border-2 border-zinc-900 bg-white px-3 py-1.5 font-mono font-bold text-xs sm:text-sm"
            >
              {orders.map((order) => (
                <option key={order.orderId} value={order.orderId}>
                  {order.orderId} | {order.clientName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="border-2 border-zinc-900 bg-white px-3 py-1 text-xs font-mono font-bold">
              {currentOrder.warehouse}
            </span>
            <span className="border-2 border-zinc-900 bg-zinc-900 text-white px-3 py-1 text-xs font-bold uppercase">
              Estado: {currentOrder.status}
            </span>
          </div>
        </div>

        {/* Dos Bloques Centrales */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-5">
          {/* Bloque Izquierdo: Configuración de la Orden */}
          <div className="md:col-span-4 border-2 border-zinc-900 p-4 bg-zinc-50 space-y-3">
            <h2 className="text-xs font-bold uppercase border-b-2 border-zinc-900 pb-2">
              Control de la Reserva
            </h2>

            <div>
              <label className="block text-xs font-bold uppercase mb-1">Cliente:</label>
              <div className="w-full border-2 border-zinc-900 bg-zinc-100 px-3 py-1.5 text-sm font-bold">
                {currentOrder.clientName}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-1">Estado de la Orden:</label>
              <select
                value={currentOrder.status}
                onChange={(e) => handleFieldChange('status', e.target.value)}
                className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-semibold"
              >
                <option value="PENDIENTE">PENDIENTE</option>
                <option value="EN PICKING">EN PICKING</option>
                <option value="LISTO PARA DESPACHO">LISTO PARA DESPACHO</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-1">Prioridad:</label>
              <select
                value={currentOrder.priority}
                onChange={(e) => handleFieldChange('priority', e.target.value)}
                className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm"
              >
                <option value="Alta">Alta</option>
                <option value="Normal">Normal</option>
                <option value="Baja">Baja</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-1">
                Criterio de Extracción:
              </label>
              <select
                value={currentOrder.allocationRule}
                onChange={(e) => handleFieldChange('allocationRule', e.target.value)}
                className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm"
              >
                <option value="FEFO (Primero en Vencer)">FEFO (Primero en Vencer)</option>
                <option value="FIFO (Primero en Entrar)">FIFO (Primero en Entrar)</option>
              </select>
            </div>
          </div>

          {/* Bloque Derecho: Asignación de Stock y Ubicación */}
          <div className="md:col-span-8 border-2 border-zinc-900 p-4 bg-zinc-50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-2 mb-3">
                <h2 className="text-xs font-bold uppercase">
                  Asignación de Lotes y Ubicaciones ({currentOrder.orderId})
                </h2>
                <span className="text-xs font-mono font-bold">
                  Total: {currentOrder.allocations.reduce((acc, i) => acc + i.assignedBoxes, 0)} Cajas
                </span>
              </div>

              <div className="border-2 border-zinc-900 bg-white overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-200 border-b-2 border-zinc-900 text-xs font-bold uppercase">
                      <th className="py-2 px-3 border-r-2 border-zinc-900">Producto</th>
                      <th className="py-2 px-3 border-r-2 border-zinc-900 w-24 text-center">
                        Cant.
                      </th>
                      <th className="py-2 px-3 border-r-2 border-zinc-900 w-36">Lote</th>
                      <th className="py-2 px-3 w-44">Ubicación Asignada</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y-2 divide-zinc-900">
                    {currentOrder.allocations.map((item) => (
                      <tr key={item.id}>
                        <td className="py-2.5 px-3 border-r-2 border-zinc-900">{item.product}</td>
                        <td className="py-2.5 px-3 border-r-2 border-zinc-900 text-center font-mono font-bold">
                          {item.assignedBoxes}
                        </td>
                        <td className="py-2.5 px-3 border-r-2 border-zinc-900 font-mono text-xs">
                          {item.lot}
                        </td>
                        <td className="py-2.5 px-3 text-xs font-semibold">{item.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Botones Inferiores */}
        <div className="flex items-center justify-between pt-3 border-t-2 border-zinc-900">
          <div>
            {savedToast && (
              <span className="inline-flex items-center gap-1.5 border-2 border-zinc-900 bg-zinc-900 text-white px-3 py-1 text-xs font-bold">
                <Check className="w-3.5 h-3.5" />
                Cambios guardados en la reserva {currentOrder.orderId} ({currentOrder.clientName})
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="border-2 border-zinc-900 bg-white hover:bg-zinc-100 px-4 py-1.5 text-sm font-bold shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="border-2 border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800 px-5 py-1.5 text-sm font-bold shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              Guardar Asignación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
