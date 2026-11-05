import React, { useState } from 'react';
import { DiagramStyleMode } from '../types';
import { ArrowLeft, Check } from 'lucide-react';

interface RegistroClienteProps {
  styleMode: DiagramStyleMode;
  onBack: () => void;
}

export const RegistroCliente: React.FC<RegistroClienteProps> = ({ styleMode, onBack }) => {
  const isSketch = styleMode === 'sketch';
  const [clientType, setClientType] = useState('Empresa (RUC)');
  const [documentId, setDocumentId] = useState('20100055237');
  const [companyName, setCompanyName] = useState('Arca Continental Lindley S.A.');
  const [address, setAddress] = useState('Av. Javier Prado Este 6210, La Molina');
  const [serviceType, setServiceType] = useState('Almacenamiento y Despacho');
  const [contactName, setContactName] = useState('Carlos Mendoza');
  const [phone, setPhone] = useState('987-654-321');
  const [email, setEmail] = useState('cmendoza@arcacontal.com');
  const [notes, setNotes] = useState('Cliente corporativo - Zona Seca y Fría.');
  const [savedToast, setSavedToast] = useState(false);

  const handleClear = () => {
    setDocumentId('');
    setCompanyName('');
    setAddress('');
    setContactName('');
    setPhone('');
    setEmail('');
    setNotes('');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div
      id="vista-registro-cliente"
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
            REGISTRO DE CLIENTE
          </h1>

          <div className="w-24" />
        </div>

        <form onSubmit={handleSave}>
          {/* Dos Bloques Principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {/* Bloque Izquierdo: Datos del Cliente */}
            <div className="border-2 border-zinc-900 p-4 bg-zinc-50 space-y-3">
              <h2 className="text-xs font-bold uppercase border-b-2 border-zinc-900 pb-2">
                1. Datos del Cliente
              </h2>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Tipo de Cliente:</label>
                <select
                  value={clientType}
                  onChange={(e) => setClientType(e.target.value)}
                  className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-semibold"
                >
                  <option value="Empresa (RUC)">Empresa (RUC)</option>
                  <option value="Persona Natural (DNI)">Persona Natural (DNI)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  RUC / N° Documento:
                </label>
                <input
                  type="text"
                  value={documentId}
                  onChange={(e) => setDocumentId(e.target.value)}
                  placeholder="Ej. 20100055237"
                  className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Razón Social / Nombre Completo:
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Ej. Arca Continental Lindley S.A."
                  className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Dirección Fiscal:</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Dirección principal..."
                  className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm"
                />
              </div>
            </div>

            {/* Bloque Derecho: Contacto y Servicio */}
            <div className="border-2 border-zinc-900 p-4 bg-zinc-50 space-y-3">
              <h2 className="text-xs font-bold uppercase border-b-2 border-zinc-900 pb-2">
                2. Datos de Contacto y Servicio
              </h2>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Tipo de Servicio Solicitado:
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-semibold"
                >
                  <option value="Almacenamiento y Despacho">Almacenamiento y Despacho</option>
                  <option value="Solo Almacenamiento">Solo Almacenamiento</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Persona de Contacto:
                </label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Nombre del responsable..."
                  className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Teléfono:</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="999-999-999"
                    className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Correo:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correo@empresa.com"
                    className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Observaciones:</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notas adicionales..."
                  className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex items-center justify-between pt-3 border-t-2 border-zinc-900">
            <div>
              {savedToast && (
                <span className="inline-flex items-center gap-1.5 border-2 border-zinc-900 bg-zinc-900 text-white px-3 py-1 text-xs font-bold">
                  <Check className="w-3.5 h-3.5" />
                  Cliente registrado correctamente
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleClear}
                className="border-2 border-zinc-900 bg-white hover:bg-zinc-100 px-4 py-1.5 text-sm font-bold shadow-[2px_2px_0px_#000] cursor-pointer"
              >
                Limpiar
              </button>
              <button
                type="submit"
                className="border-2 border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800 px-5 py-1.5 text-sm font-bold shadow-[2px_2px_0px_#000] cursor-pointer"
              >
                Registrar Cliente
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
