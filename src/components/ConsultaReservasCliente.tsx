import React, { useState } from 'react';
import { DiagramStyleMode } from '../types';
import { ArrowLeft, Search, X } from 'lucide-react';

interface ConsultaReservasClienteProps {
  styleMode: DiagramStyleMode;
  onBack: () => void;
}

interface ClientRecord {
  id: string;
  ruc: string;
  name: string;
  serviceType: string;
  activeReservations: number;
  assignedSpace: string;
  status: 'Activo' | 'Suspendido';
  contact: string;
  phone: string;
}

const INITIAL_CLIENTS: ClientRecord[] = [
  {
    id: 'CLI-001',
    ruc: '20100055237',
    name: 'Arca Continental Lindley S.A.',
    serviceType: 'Almacenamiento y Despacho',
    activeReservations: 4,
    assignedSpace: 'Zona Seca y Fría (120 Pallets)',
    status: 'Activo',
    contact: 'Carlos Mendoza',
    phone: '987-654-321',
  },
  {
    id: 'CLI-002',
    ruc: '20100070970',
    name: 'Supermercados Peruanos S.A.',
    serviceType: 'Cross-Docking y Despacho',
    activeReservations: 3,
    assignedSpace: 'Zona Seca (60 Pallets)',
    status: 'Activo',
    contact: 'Lucía Paredes',
    phone: '998-112-233',
  },
  {
    id: 'CLI-003',
    ruc: '20504743307',
    name: 'Hipermercados Tottus S.A.',
    serviceType: 'Almacenamiento General',
    activeReservations: 3,
    assignedSpace: 'Zona Seca (85 Pallets)',
    status: 'Activo',
    contact: 'Roberto Gómez',
    phone: '945-678-901',
  },
  {
    id: 'CLI-004',
    ruc: '20100047218',
    name: 'Alicorp S.A.A.',
    serviceType: 'Almacenamiento Masivo y Picking',
    activeReservations: 5,
    assignedSpace: 'Zona Seca - Pasillos 1 y 2 (150 Pallets)',
    status: 'Activo',
    contact: 'Mariana Torres',
    phone: '991-234-567',
  },
  {
    id: 'CLI-005',
    ruc: '20100190797',
    name: 'Leche Gloria S.A.',
    serviceType: 'Almacenamiento Refrigerado y Seco',
    activeReservations: 4,
    assignedSpace: 'Cámara Fría y Rack 3 (110 Pallets)',
    status: 'Activo',
    contact: 'Jorge Villavicencio',
    phone: '984-321-654',
  },
  {
    id: 'CLI-006',
    ruc: '20100128218',
    name: 'Cencosud Retail Perú S.A.',
    serviceType: 'Consolidación y Despacho',
    activeReservations: 2,
    assignedSpace: 'Zona de Pre-Despacho (45 Pallets)',
    status: 'Activo',
    contact: 'Valeria Salazar',
    phone: '976-543-210',
  },
  {
    id: 'CLI-007',
    ruc: '20263322496',
    name: 'Nestlé Perú S.A.',
    serviceType: 'Almacenamiento Climatizado',
    activeReservations: 3,
    assignedSpace: 'Cámara Climatizada (75 Pallets)',
    status: 'Activo',
    contact: 'Fernando Ríos',
    phone: '965-432-189',
  },
  {
    id: 'CLI-008',
    ruc: '20331066703',
    name: 'Distribuidora Mayorista del Sur S.A.C.',
    serviceType: 'Solo Almacenamiento',
    activeReservations: 0,
    assignedSpace: 'Zona Seca - Nivel C (20 Pallets)',
    status: 'Suspendido',
    contact: 'Héctor Quispe',
    phone: '954-789-321',
  },
];

export const ConsultaReservasCliente: React.FC<ConsultaReservasClienteProps> = ({
  styleMode,
  onBack,
}) => {
  const isSketch = styleMode === 'sketch';
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [selectedClient, setSelectedClient] = useState<ClientRecord | null>(null);

  const filteredClients = INITIAL_CLIENTS.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.ruc.includes(searchQuery) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.assignedSpace.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'Todos' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div
      id="vista-consulta-clientes"
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
            CONSULTA DE CLIENTES
          </h1>

          <div className="w-24" />
        </div>

        {/* Filtros de búsqueda */}
        <div className="border-2 border-zinc-900 bg-zinc-50 p-4 mb-5 flex flex-col sm:flex-row items-end gap-3">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold uppercase text-zinc-800 mb-1">
              Buscar por Razón Social o RUC:
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ej. Arca Continental, Alicorp, Gloria, 20100055237..."
              className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm focus:outline-none"
            />
          </div>
          <div className="w-full sm:w-44">
            <label className="block text-xs font-bold uppercase text-zinc-800 mb-1">
              Estado:
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-semibold cursor-pointer"
            >
              <option value="Todos">Todos</option>
              <option value="Activo">Activo</option>
              <option value="Suspendido">Suspendido</option>
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

        {/* Tabla de Clientes */}
        <div className="border-2 border-zinc-900 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-200 border-b-2 border-zinc-900 text-xs font-bold uppercase text-zinc-900">
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-28">RUC</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900">Cliente / Razón Social</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-56">Espacio Asignado</th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-28 text-center">
                  Reservas Activas
                </th>
                <th className="py-2.5 px-3 border-r-2 border-zinc-900 w-24 text-center">Estado</th>
                <th className="py-2.5 px-3 w-28 text-center">Detalle</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y-2 divide-zinc-900">
              {filteredClients.map((client) => (
                <tr key={client.id} className="bg-white hover:bg-zinc-50">
                  <td className="py-2.5 px-3 border-r-2 border-zinc-900 font-mono text-xs">
                    {client.ruc}
                  </td>
                  <td className="py-2.5 px-3 border-r-2 border-zinc-900 font-semibold">
                    {client.name}
                  </td>
                  <td className="py-2.5 px-3 border-r-2 border-zinc-900 text-xs">
                    {client.assignedSpace}
                  </td>
                  <td className="py-2.5 px-3 border-r-2 border-zinc-900 text-center font-mono font-bold">
                    {client.activeReservations}
                  </td>
                  <td className="py-2.5 px-3 border-r-2 border-zinc-900 text-center">
                    <span className="border border-zinc-900 bg-zinc-100 px-2 py-0.5 text-xs font-bold">
                      {client.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      type="button"
                      onClick={() => setSelectedClient(client)}
                      className="border border-zinc-900 bg-white hover:bg-zinc-900 hover:text-white px-2.5 py-1 text-xs font-bold shadow-[1px_1px_0px_#000] cursor-pointer"
                    >
                      [Ver Ficha]
                    </button>
                  </td>
                </tr>
              ))}
              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-zinc-500 text-sm">
                    No se encontraron clientes con ese criterio.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Ficha del Cliente */}
        {selectedClient && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white border-2 border-zinc-900 shadow-[5px_5px_0px_#000] w-full max-w-md p-5">
              <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-2 mb-4">
                <h2 className="text-sm font-bold uppercase">Ficha de Cliente ({selectedClient.id})</h2>
                <button
                  type="button"
                  onClick={() => setSelectedClient(null)}
                  className="border border-zinc-900 p-1 hover:bg-zinc-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2.5 text-sm">
                <div className="border border-zinc-900 p-2.5 bg-zinc-50">
                  <p className="text-xs font-bold uppercase text-zinc-500">Razón Social</p>
                  <p className="font-bold">{selectedClient.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="border border-zinc-900 p-2.5">
                    <p className="text-xs font-bold uppercase text-zinc-500">RUC</p>
                    <p className="font-mono">{selectedClient.ruc}</p>
                  </div>
                  <div className="border border-zinc-900 p-2.5">
                    <p className="text-xs font-bold uppercase text-zinc-500">Estado</p>
                    <p className="font-bold">{selectedClient.status}</p>
                  </div>
                </div>
                <div className="border border-zinc-900 p-2.5">
                  <p className="text-xs font-bold uppercase text-zinc-500">Servicio Contratado</p>
                  <p>{selectedClient.serviceType}</p>
                </div>
                <div className="border border-zinc-900 p-2.5">
                  <p className="text-xs font-bold uppercase text-zinc-500">Espacio Asignado</p>
                  <p>{selectedClient.assignedSpace}</p>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="border border-zinc-900 p-2.5">
                    <p className="text-xs font-bold uppercase text-zinc-500">Contacto</p>
                    <p>{selectedClient.contact}</p>
                  </div>
                  <div className="border border-zinc-900 p-2.5">
                    <p className="text-xs font-bold uppercase text-zinc-500">Teléfono</p>
                    <p className="font-mono">{selectedClient.phone}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-4 mt-4 border-t-2 border-zinc-900">
                <button
                  type="button"
                  onClick={() => setSelectedClient(null)}
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
