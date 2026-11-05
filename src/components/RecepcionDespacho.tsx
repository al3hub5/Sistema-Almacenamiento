import React, { useState } from 'react';
import { DiagramStyleMode } from '../types';
import { ArrowLeft, Calendar, Check } from 'lucide-react';

interface RecepcionDespachoProps {
  styleMode: DiagramStyleMode;
  onBack: () => void;
  onNavigateToNode?: (nodeId: string) => void;
}

interface DockAppointmentRecord {
  docId: string;
  type: 'inbound' | 'outbound';
  clientName: string;
  warehouse: string;
  merchandiseSummary: string;
  appointmentDate: string;
  timeWindow: string;
  assignedDock: string;
  carrierCompany: string;
  vehiclePlate: string;
  driverName: string;
  driverDni: string;
}

const INITIAL_APPOINTMENTS: DockAppointmentRecord[] = [
  // INBOUND (Recepción)
  {
    docId: 'ASN-943-001',
    type: 'inbound',
    clientName: 'Arca Continental Lindley',
    warehouse: 'A001 - Almacen Tio Ben',
    merchandiseSummary: '18 Pallets - Bebidas Carbonatadas y Agua Mineral',
    appointmentDate: '20/10/2026',
    timeWindow: '08:00 - 09:00',
    assignedDock: 'Muelle 01 - A001 (Almacen Tio Ben)',
    carrierCompany: 'Transportes del Norte S.A.C.',
    vehiclePlate: 'ABC-123',
    driverName: 'Juan Pérez Quispe',
    driverDni: '45892103',
  },
  {
    docId: 'ASN-943-002',
    type: 'inbound',
    clientName: 'Supermercados Peruanos S.A.',
    warehouse: 'A002 - Almacen Central Norte',
    merchandiseSummary: '12 Pallets - Aceite Vegetal y Abarrotes',
    appointmentDate: '21/10/2026',
    timeWindow: '10:00 - 11:00',
    assignedDock: 'Muelle 02 - A002 (Almacen Central Norte)',
    carrierCompany: 'Logística Ransa Operador S.A.',
    vehiclePlate: 'B7K-842',
    driverName: 'Miguel Ángel Torres',
    driverDni: '41209874',
  },
  {
    docId: 'ASN-943-003',
    type: 'inbound',
    clientName: 'Alicorp S.A.A.',
    warehouse: 'A002 - Almacen Central Norte',
    merchandiseSummary: '22 Pallets - Harina Industrial y Pastas',
    appointmentDate: '22/10/2026',
    timeWindow: '14:00 - 15:00',
    assignedDock: 'Muelle 02 - A002 (Almacen Central Norte)',
    carrierCompany: 'Transportes Cruz del Sur Cargo',
    vehiclePlate: 'F9W-910',
    driverName: 'Roberto Sánchez Vega',
    driverDni: '43781209',
  },
  {
    docId: 'ASN-943-004',
    type: 'inbound',
    clientName: 'Leche Gloria S.A.',
    warehouse: 'A004 - Almacen Frigorifico Sur',
    merchandiseSummary: '16 Pallets - Derivados Lácteos Refrigerados',
    appointmentDate: '23/10/2026',
    timeWindow: '08:00 - 09:00',
    assignedDock: 'Muelle 04 - A004 (Almacen Frigorifico Sur)',
    carrierCompany: 'Deprodeca Transporte Frío S.A.C.',
    vehiclePlate: 'C4M-755',
    driverName: 'Héctor Vargas Luna',
    driverDni: '40982311',
  },
  {
    docId: 'ASN-943-005',
    type: 'inbound',
    clientName: 'Nestlé Perú S.A.',
    warehouse: 'A004 - Almacen Frigorifico Sur',
    merchandiseSummary: '10 Pallets - Coberturas de Chocolate y Cereales',
    appointmentDate: '24/10/2026',
    timeWindow: '16:00 - 17:00',
    assignedDock: 'Muelle 04 - A004 (Almacen Frigorifico Sur)',
    carrierCompany: 'Frío Aéreo Logística S.A.',
    vehiclePlate: 'D2P-604',
    driverName: 'Luis Alberto Salazar',
    driverDni: '46102938',
  },
  // OUTBOUND (Despacho)
  {
    docId: 'RES-940-001',
    type: 'outbound',
    clientName: 'Arca Continental Lindley',
    warehouse: 'A001 - Almacen Tio Ben',
    merchandiseSummary: '15 Pallets (370 Cajas de Bebidas)',
    appointmentDate: '25/10/2026',
    timeWindow: '14:00 - 15:00',
    assignedDock: 'Muelle 01 - A001 (Almacen Tio Ben)',
    carrierCompany: 'Transportes del Norte S.A.C.',
    vehiclePlate: 'ABC-123',
    driverName: 'Juan Pérez Quispe',
    driverDni: '45892103',
  },
  {
    docId: 'RES-940-002',
    type: 'outbound',
    clientName: 'Supermercados Peruanos S.A.',
    warehouse: 'A002 - Almacen Central Norte',
    merchandiseSummary: '8 Pallets (180 Cajas de Abarrotes)',
    appointmentDate: '26/10/2026',
    timeWindow: '10:00 - 11:00',
    assignedDock: 'Muelle 02 - A002 (Almacen Central Norte)',
    carrierCompany: 'Logística Ransa Operador S.A.',
    vehiclePlate: 'B7K-842',
    driverName: 'Miguel Ángel Torres',
    driverDni: '41209874',
  },
  {
    docId: 'RES-940-003',
    type: 'outbound',
    clientName: 'Hipermercados Tottus',
    warehouse: 'A003 - Almacen Deposito Callao',
    merchandiseSummary: '12 Pallets (240 Cajas de Limpieza)',
    appointmentDate: '27/10/2026',
    timeWindow: '08:00 - 09:00',
    assignedDock: 'Muelle 03 - A003 (Almacen Deposito Callao)',
    carrierCompany: 'Flota Callao Express S.A.C.',
    vehiclePlate: 'A8T-331',
    driverName: 'Jorge Chávez Huamán',
    driverDni: '44512098',
  },
  {
    docId: 'RES-940-004',
    type: 'outbound',
    clientName: 'Alicorp S.A.A.',
    warehouse: 'A002 - Almacen Central Norte',
    merchandiseSummary: '18 Pallets (405 Cajas de Harina y Pastas)',
    appointmentDate: '27/10/2026',
    timeWindow: '16:00 - 17:00',
    assignedDock: 'Muelle 02 - A002 (Almacen Central Norte)',
    carrierCompany: 'Transportes Cruz del Sur Cargo',
    vehiclePlate: 'F9W-910',
    driverName: 'Roberto Sánchez Vega',
    driverDni: '43781209',
  },
  {
    docId: 'RES-940-005',
    type: 'outbound',
    clientName: 'Leche Gloria S.A.',
    warehouse: 'A004 - Almacen Frigorifico Sur',
    merchandiseSummary: '14 Pallets (315 Cajas de Lácteos Refrigerados)',
    appointmentDate: '28/10/2026',
    timeWindow: '08:00 - 09:00',
    assignedDock: 'Muelle 04 - A004 (Almacen Frigorifico Sur)',
    carrierCompany: 'Deprodeca Transporte Frío S.A.C.',
    vehiclePlate: 'C4M-755',
    driverName: 'Héctor Vargas Luna',
    driverDni: '40982311',
  },
  {
    docId: 'RES-940-006',
    type: 'outbound',
    clientName: 'Cencosud Retail Perú S.A.',
    warehouse: 'A001 - Almacen Tio Ben',
    merchandiseSummary: '9 Pallets (185 Cajas de Conservas y Galletas)',
    appointmentDate: '29/10/2026',
    timeWindow: '10:00 - 11:00',
    assignedDock: 'Muelle 01 - A001 (Almacen Tio Ben)',
    carrierCompany: 'Transportes San Martín S.A.',
    vehiclePlate: 'V5N-412',
    driverName: 'Ricardo Mendoza Prado',
    driverDni: '42871045',
  },
  {
    docId: 'RES-940-007',
    type: 'outbound',
    clientName: 'Nestlé Perú S.A.',
    warehouse: 'A004 - Almacen Frigorifico Sur',
    merchandiseSummary: '10 Pallets (195 Cajas de Cereales y Chocolates)',
    appointmentDate: '30/10/2026',
    timeWindow: '14:00 - 15:00',
    assignedDock: 'Muelle 04 - A004 (Almacen Frigorifico Sur)',
    carrierCompany: 'Frío Aéreo Logística S.A.',
    vehiclePlate: 'D2P-604',
    driverName: 'Luis Alberto Salazar',
    driverDni: '46102938',
  },
];

export const RecepcionDespacho: React.FC<RecepcionDespachoProps> = ({ styleMode, onBack }) => {
  const isSketch = styleMode === 'sketch';
  const [activeTab, setActiveTab] = useState<'inbound' | 'outbound'>('inbound');
  const [appointments, setAppointments] =
    useState<DockAppointmentRecord[]>(INITIAL_APPOINTMENTS);
  const [selectedDocId, setSelectedDocId] = useState<string>('ASN-943-001');
  const [savedToast, setSavedToast] = useState(false);

  const tabAppointments = appointments.filter((a) => a.type === activeTab);
  const currentAppointment =
    tabAppointments.find((a) => a.docId === selectedDocId) || tabAppointments[0];

  const handleSwitchTab = (tab: 'inbound' | 'outbound') => {
    setActiveTab(tab);
    const firstInTab = appointments.find((a) => a.type === tab);
    if (firstInTab) {
      setSelectedDocId(firstInTab.docId);
    }
  };

  const updateCurrentAppointment = (partial: Partial<DockAppointmentRecord>) => {
    setAppointments((prev) =>
      prev.map((item) =>
        item.docId === currentAppointment.docId ? { ...item, ...partial } : item
      )
    );
  };

  const handleReset = () => {
    const initial = INITIAL_APPOINTMENTS.find(
      (a) => a.docId === currentAppointment.docId
    );
    if (initial) {
      updateCurrentAppointment(initial);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div
      id="vista-recepcion-despacho"
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
            RECEPCIÓN / DESPACHO
          </h1>

          <div className="w-24" />
        </div>

        {/* Pestañas: Programar Recepción / Programar Despacho */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <button
            type="button"
            onClick={() => handleSwitchTab('inbound')}
            className={`py-2.5 px-4 border-2 border-zinc-900 text-xs sm:text-sm font-bold uppercase tracking-wide cursor-pointer ${
              activeTab === 'inbound'
                ? 'bg-zinc-900 text-white shadow-[2px_2px_0px_#000]'
                : 'bg-white text-zinc-800 hover:bg-zinc-100'
            }`}
          >
            PROGRAMAR RECEPCIÓN (INBOUND)
          </button>
          <button
            type="button"
            onClick={() => handleSwitchTab('outbound')}
            className={`py-2.5 px-4 border-2 border-zinc-900 text-xs sm:text-sm font-bold uppercase tracking-wide cursor-pointer ${
              activeTab === 'outbound'
                ? 'bg-zinc-900 text-white shadow-[2px_2px_0px_#000]'
                : 'bg-white text-zinc-800 hover:bg-zinc-100'
            }`}
          >
            PROGRAMAR DESPACHO (OUTBOUND)
          </button>
        </div>

        {/* Cabecera de Selección de Documento de Referencia */}
        <div className="border-2 border-zinc-900 bg-zinc-100 p-3.5 mb-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold w-full sm:w-auto">
            <span>
              {activeTab === 'inbound'
                ? 'Orden de Ingreso (ASN):'
                : 'Orden de Despacho (RES):'}
            </span>
            <select
              value={currentAppointment.docId}
              onChange={(e) => setSelectedDocId(e.target.value)}
              className="border-2 border-zinc-900 bg-white px-3 py-1.5 font-mono font-bold text-xs sm:text-sm"
            >
              {tabAppointments.map((app) => (
                <option key={app.docId} value={app.docId}>
                  {app.docId} | Cliente: {app.clientName}
                </option>
              ))}
            </select>
          </div>
          <span className="border-2 border-zinc-900 bg-white px-3 py-1 text-xs font-mono font-bold">
            {currentAppointment.warehouse}
          </span>
        </div>

        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {/* Bloque Izquierdo: Fecha, Hora y Muelle */}
            <div className="border-2 border-zinc-900 p-4 bg-zinc-50 space-y-3">
              <h2 className="text-xs font-bold uppercase border-b-2 border-zinc-900 pb-2">
                1. Fecha, Hora y Muelle ({currentAppointment.docId})
              </h2>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Detalle de Carga:
                </label>
                <div className="w-full border-2 border-zinc-900 bg-zinc-100 px-3 py-1.5 text-xs font-bold">
                  {currentAppointment.merchandiseSummary}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Fecha de la Cita:</label>
                <div className="relative">
                  <input
                    type="text"
                    value={currentAppointment.appointmentDate}
                    onChange={(e) =>
                      updateCurrentAppointment({ appointmentDate: e.target.value })
                    }
                    className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-mono"
                    required
                  />
                  <Calendar className="w-4 h-4 text-zinc-700 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Horario Programado (Ventana):
                </label>
                <select
                  value={currentAppointment.timeWindow}
                  onChange={(e) =>
                    updateCurrentAppointment({ timeWindow: e.target.value })
                  }
                  className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-mono font-semibold"
                >
                  <option value="08:00 - 09:00">08:00 - 09:00</option>
                  <option value="10:00 - 11:00">10:00 - 11:00</option>
                  <option value="14:00 - 15:00">14:00 - 15:00</option>
                  <option value="16:00 - 17:00">16:00 - 17:00</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Muelle (Dock) Asignado:
                </label>
                <select
                  value={currentAppointment.assignedDock}
                  onChange={(e) =>
                    updateCurrentAppointment({ assignedDock: e.target.value })
                  }
                  className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-semibold"
                >
                  <option value="Muelle 01 - A001 (Almacen Tio Ben)">
                    Muelle 01 - A001 (Almacen Tio Ben)
                  </option>
                  <option value="Muelle 02 - A002 (Almacen Central Norte)">
                    Muelle 02 - A002 (Almacen Central Norte)
                  </option>
                  <option value="Muelle 03 - A003 (Almacen Deposito Callao)">
                    Muelle 03 - A003 (Almacen Deposito Callao)
                  </option>
                  <option value="Muelle 04 - A004 (Almacen Frigorifico Sur)">
                    Muelle 04 - A004 (Almacen Frigorifico Sur)
                  </option>
                </select>
              </div>
            </div>

            {/* Bloque Derecho: Datos del Transporte y Conductor */}
            <div className="border-2 border-zinc-900 p-4 bg-zinc-50 space-y-3">
              <h2 className="text-xs font-bold uppercase border-b-2 border-zinc-900 pb-2">
                2. Datos del Transporte y Conductor
              </h2>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Empresa de Transporte:
                </label>
                <input
                  type="text"
                  value={currentAppointment.carrierCompany}
                  onChange={(e) =>
                    updateCurrentAppointment({ carrierCompany: e.target.value })
                  }
                  placeholder="Ej. Transportes del Norte"
                  className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Placa del Vehículo / Tracto:
                </label>
                <input
                  type="text"
                  value={currentAppointment.vehiclePlate}
                  onChange={(e) =>
                    updateCurrentAppointment({ vehiclePlate: e.target.value })
                  }
                  placeholder="Ej. ABC-123"
                  className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-mono uppercase"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">
                    Nombre del Conductor:
                  </label>
                  <input
                    type="text"
                    value={currentAppointment.driverName}
                    onChange={(e) =>
                      updateCurrentAppointment({ driverName: e.target.value })
                    }
                    placeholder="Ej. Juan Pérez"
                    className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">
                    DNI del Conductor:
                  </label>
                  <input
                    type="text"
                    value={currentAppointment.driverDni}
                    onChange={(e) =>
                      updateCurrentAppointment({ driverDni: e.target.value })
                    }
                    placeholder="8 dígitos"
                    className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-mono"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Nota de Política de Muelle */}
          <div className="border-2 border-dashed border-zinc-900 bg-zinc-50 p-3 mb-5 text-xs">
            <span className="font-bold">POLÍTICA DE SLA (POL-002):</span> El vehículo tiene una
            tolerancia máxima de retraso de 15 minutos en el muelle asignado.
          </div>

          {/* Botones Inferiores */}
          <div className="flex items-center justify-between pt-3 border-t-2 border-zinc-900">
            <div>
              {savedToast && (
                <span className="inline-flex items-center gap-1.5 border-2 border-zinc-900 bg-zinc-900 text-white px-3 py-1 text-xs font-bold">
                  <Check className="w-3.5 h-3.5" />
                  Cita {currentAppointment.docId} agendada en {currentAppointment.assignedDock} (
                  {currentAppointment.appointmentDate} {currentAppointment.timeWindow})
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="border-2 border-zinc-900 bg-white hover:bg-zinc-100 px-4 py-1.5 text-sm font-bold shadow-[2px_2px_0px_#000] cursor-pointer"
              >
                Deshacer Cambios
              </button>
              <button
                type="submit"
                className="border-2 border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800 px-5 py-1.5 text-sm font-bold shadow-[2px_2px_0px_#000] cursor-pointer"
              >
                Agendar Cita
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
