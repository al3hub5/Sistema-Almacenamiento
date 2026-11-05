import React, { useState } from 'react';
import { DiagramStyleMode } from '../types';
import { ArrowLeft, Plus, Trash2, Check } from 'lucide-react';

interface RegistroReservasProps {
  styleMode: DiagramStyleMode;
  onBack: () => void;
}

interface ReservedProductLine {
  id: number;
  productName: string;
  quantity: number;
  unit: string;
}

export const RegistroReservas: React.FC<RegistroReservasProps> = ({ styleMode, onBack }) => {
  const isSketch = styleMode === 'sketch';
  const [clientName, setClientName] = useState('CLI-001 - Arca Continental Lindley');
  const [operationType, setOperationType] = useState('Despacho de Mercancía');
  const [scheduledDate, setScheduledDate] = useState('25/10/2026');
  const [warehouseCode, setWarehouseCode] = useState('A001 - Almacen Tio Ben');

  const [productInput, setProductInput] = useState('');
  const [quantity, setQuantity] = useState('50');
  const [lines, setLines] = useState<ReservedProductLine[]>([
    { id: 1, productName: 'Bebidas Carbonatadas (Cola) 3L', quantity: 70, unit: 'Cajas' },
    { id: 2, productName: 'Bebidas Sabor Piña 500ml', quantity: 100, unit: 'Cajas' },
  ]);
  const [savedToast, setSavedToast] = useState(false);

  const handleAddLine = () => {
    const qty = Number(quantity);
    if (!productInput.trim() || !qty || qty <= 0) return;
    setLines((prev) => [
      ...prev,
      {
        id: Date.now(),
        productName: productInput.trim(),
        quantity: qty,
        unit: 'Cajas',
      },
    ]);
    setProductInput('');
  };

  const handleDeleteLine = (id: number) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  };

  const handleClear = () => {
    setLines([]);
    setProductInput('');
  };

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div
      id="vista-registro-reservas"
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
            REGISTRO DE RESERVAS
          </h1>

          <div className="w-24" />
        </div>

        {/* Dos Bloques */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-5">
          {/* Bloque Izquierdo: Datos Generales */}
          <div className="md:col-span-5 border-2 border-zinc-900 p-4 bg-zinc-50 space-y-3">
            <h2 className="text-xs font-bold uppercase border-b-2 border-zinc-900 pb-2">
              1. Datos de la Reserva
            </h2>

            <div>
              <label className="block text-xs font-bold uppercase mb-1">
                Cliente Registrado:
              </label>
              <select
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-semibold"
              >
                <option value="CLI-001 - Arca Continental Lindley">
                  CLI-001 - Arca Continental Lindley
                </option>
                <option value="CLI-002 - Supermercados Peruanos S.A.">
                  CLI-002 - Supermercados Peruanos S.A.
                </option>
                <option value="CLI-003 - Hipermercados Tottus">
                  CLI-003 - Hipermercados Tottus
                </option>
                <option value="CLI-004 - Alicorp S.A.A.">CLI-004 - Alicorp S.A.A.</option>
                <option value="CLI-005 - Leche Gloria S.A.">CLI-005 - Leche Gloria S.A.</option>
                <option value="CLI-006 - Cencosud Retail Perú S.A.">
                  CLI-006 - Cencosud Retail Perú S.A.
                </option>
                <option value="CLI-007 - Nestlé Perú S.A.">CLI-007 - Nestlé Perú S.A.</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-1">Tipo de Operación:</label>
              <select
                value={operationType}
                onChange={(e) => setOperationType(e.target.value)}
                className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-semibold"
              >
                <option value="Despacho de Mercancía">Despacho de Mercancía</option>
                <option value="Recepción de Mercancía">Recepción de Mercancía</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-1">Fecha Solicitada:</label>
              <input
                type="text"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-1">Almacén:</label>
              <select
                value={warehouseCode}
                onChange={(e) => setWarehouseCode(e.target.value)}
                className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-semibold"
              >
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
          </div>

          {/* Bloque Derecho: Productos Solicitados */}
          <div className="md:col-span-7 border-2 border-zinc-900 p-4 bg-zinc-50 flex flex-col justify-between">
            <div>
              <h2 className="text-xs font-bold uppercase border-b-2 border-zinc-900 pb-2 mb-3">
                2. Productos de la Reserva
              </h2>

              <div className="flex flex-col sm:flex-row items-end gap-2 mb-4">
                <div className="flex-1 w-full">
                  <label className="block text-xs font-bold uppercase mb-1">
                    Producto / Mercancía:
                  </label>
                  <input
                    type="text"
                    value={productInput}
                    onChange={(e) => setProductInput(e.target.value)}
                    placeholder="Escribir nombre o descripción del producto..."
                    className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm"
                  />
                </div>
                <div className="w-full sm:w-24">
                  <label className="block text-xs font-bold uppercase mb-1">Cant. (Cajas):</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full border-2 border-zinc-900 bg-white px-3 py-1.5 text-sm font-mono"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddLine}
                  className="border-2 border-zinc-900 bg-white hover:bg-zinc-100 px-3 py-1.5 text-sm font-bold flex items-center gap-1 shadow-[2px_2px_0px_#000] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Añadir
                </button>
              </div>

              <div className="border-2 border-zinc-900 bg-white overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-200 border-b-2 border-zinc-900 text-xs font-bold uppercase">
                      <th className="py-2 px-3 border-r-2 border-zinc-900">Producto</th>
                      <th className="py-2 px-3 border-r-2 border-zinc-900 w-28 text-center">
                        Cantidad
                      </th>
                      <th className="py-2 px-3 w-16 text-center">Quitar</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y-2 divide-zinc-900">
                    {lines.map((line) => (
                      <tr key={line.id}>
                        <td className="py-2 px-3 border-r-2 border-zinc-900">{line.productName}</td>
                        <td className="py-2 px-3 border-r-2 border-zinc-900 text-center font-mono font-bold">
                          {line.quantity} {line.unit}
                        </td>
                        <td className="py-2 px-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleDeleteLine(line.id)}
                            className="border border-zinc-900 p-1 hover:bg-zinc-100 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {lines.length === 0 && (
                      <tr>
                        <td colSpan={3} className="py-4 text-center text-zinc-500 text-xs">
                          Agregue al menos un producto a la reserva.
                        </td>
                      </tr>
                    )}
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
                Reserva registrada correctamente
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
              type="button"
              onClick={handleSave}
              className="border-2 border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800 px-5 py-1.5 text-sm font-bold shadow-[2px_2px_0px_#000] cursor-pointer"
            >
              Guardar Reserva
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
