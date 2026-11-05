import React, { useState } from 'react';
import { DiagramStyleMode } from '../types';

interface ParametrosSistemaProps {
  styleMode: DiagramStyleMode;
  onGoBack: () => void;
}

export const ParametrosSistema: React.FC<ParametrosSistemaProps> = ({
  styleMode,
  onGoBack,
}) => {
  const isSketch = styleMode === 'sketch';
  const fontMain = isSketch ? 'font-sketch' : 'font-tech';

  // Estados de los campos
  const [nombreDueno, setNombreDueno] = useState('');
  const [nombreNegocio, setNombreNegocio] = useState('');
  const [pais, setPais] = useState('Perú');

  // Mensaje de feedback temporal
  const [mensajeFeedback, setMensajeFeedback] = useState<string | null>(null);

  const handleCargarPais = () => {
    setMensajeFeedback(`✓ Configuración territorial para [${pais}] cargada exitosamente.`);
    setTimeout(() => {
      setMensajeFeedback(null);
    }, 3500);
  };

  const handleGuardarCambios = (e: React.FormEvent) => {
    e.preventDefault();
    setMensajeFeedback('✓ Parámetros del sistema guardados exitosamente.');
    setTimeout(() => {
      setMensajeFeedback(null);
    }, 4000);
  };

  return (
    <div
      id="vista-parametros-sistema"
      className="w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 flex flex-col gap-6"
    >
      {/* ================= BARRA SUPERIOR DE LA VISTA ================= */}
      <div
        id="barra-superior-parametros"
        className="w-full relative flex items-center justify-between pb-3 border-b-2 border-dashed border-zinc-400 select-none min-h-[44px]"
      >
        {/* Botón <- Regresar en la esquina superior izquierda */}
        <button
          type="button"
          onClick={onGoBack}
          id="btn-regresar-arquitectura"
          title="Regresar a la Vista de Arquitectura"
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-white hover:bg-zinc-100 active:bg-zinc-200 border-2 border-zinc-900 rounded-sm font-bold text-xs sm:text-sm text-zinc-900 shadow-[3px_3px_0px_#18181b] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer shrink-0 z-10 ${fontMain}`}
        >
          <span className="text-base font-mono">&larr;</span>
          <span>Regresar</span>
        </button>

        {/* Título Principal Centrado en la parte superior */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1
            className={`font-black text-lg sm:text-2xl text-zinc-900 tracking-wide uppercase text-center px-4 ${fontMain}`}
          >
            Parámetros del Sistema
          </h1>
        </div>

        {/* Espaciador para balance visual simétrico */}
        <div className="w-20 sm:w-28 invisible"></div>
      </div>

      {/* Banner de Feedback si se guarda o carga */}
      {mensajeFeedback && (
        <div className="w-full p-3 bg-emerald-50 border-2 border-emerald-800 text-emerald-950 font-mono text-xs sm:text-sm font-bold shadow-[3px_3px_0px_#065f46] flex items-center justify-between animate-fadeIn">
          <span>{mensajeFeedback}</span>
          <button
            type="button"
            onClick={() => setMensajeFeedback(null)}
            className="text-xs font-mono font-bold underline ml-2 cursor-pointer hover:text-emerald-700"
          >
            ✕
          </button>
        </div>
      )}

      {/* ================= FORMULARIO PRINCIPAL ================= */}
      <form onSubmit={handleGuardarCambios} className="w-full flex flex-col gap-6">

        {/* ================= SECCIÓN 1: DATOS ================= */}
        <div
          id="seccion-datos"
          className="w-full bg-white border-2 border-zinc-900 rounded-sm p-5 sm:p-6 shadow-[4px_4px_0px_#18181b] flex flex-col gap-5"
        >
          {/* Encabezado de la sección */}
          <div className="border-b-2 border-dashed border-zinc-300 pb-2">
            <h2
              className={`font-black text-base sm:text-lg text-zinc-900 tracking-wide uppercase ${fontMain}`}
            >
              Datos
            </h2>
          </div>

          {/* Dos etiquetas alineadas verticalmente con cuadros de texto a la derecha */}
          <div className="flex flex-col gap-4 max-w-2xl">
            {/* Etiqueta 1: Nombre del dueño */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
              <label
                htmlFor="input-nombre-dueno"
                className={`w-48 font-bold text-sm sm:text-base text-zinc-900 select-none shrink-0 ${fontMain}`}
              >
                Nombre del dueño
              </label>
              <input
                id="input-nombre-dueno"
                type="text"
                value={nombreDueno}
                onChange={(e) => setNombreDueno(e.target.value)}
                placeholder=""
                className={`flex-1 h-10 sm:h-11 px-3 bg-white border-2 border-zinc-900 rounded-sm text-sm sm:text-base text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 shadow-[2px_2px_0px_#18181b] ${
                  isSketch ? 'font-sketch text-lg' : 'font-mono'
                }`}
                autoComplete="off"
              />
            </div>

            {/* Etiqueta 2: Nombre del negocio */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
              <label
                htmlFor="input-nombre-negocio"
                className={`w-48 font-bold text-sm sm:text-base text-zinc-900 select-none shrink-0 ${fontMain}`}
              >
                Nombre del negocio
              </label>
              <input
                id="input-nombre-negocio"
                type="text"
                value={nombreNegocio}
                onChange={(e) => setNombreNegocio(e.target.value)}
                placeholder=""
                className={`flex-1 h-10 sm:h-11 px-3 bg-white border-2 border-zinc-900 rounded-sm text-sm sm:text-base text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 shadow-[2px_2px_0px_#18181b] ${
                  isSketch ? 'font-sketch text-lg' : 'font-mono'
                }`}
                autoComplete="off"
              />
            </div>
          </div>
        </div>

        {/* ================= SECCIÓN 2: CONFIGURACIÓN ================= */}
        <div
          id="seccion-configuracion"
          className="w-full bg-white border-2 border-zinc-900 rounded-sm p-5 sm:p-6 shadow-[4px_4px_0px_#18181b] flex flex-col gap-5"
        >
          {/* Encabezado de la sección */}
          <div className="border-b-2 border-dashed border-zinc-300 pb-2">
            <h2
              className={`font-black text-base sm:text-lg text-zinc-900 tracking-wide uppercase ${fontMain}`}
            >
              Configuración
            </h2>
          </div>

          {/* Etiqueta País + Combo Box (Perú por defecto) + Botón Cargar */}
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
              <label
                htmlFor="select-pais"
                className={`w-48 font-bold text-sm sm:text-base text-zinc-900 select-none shrink-0 ${fontMain}`}
              >
                País
              </label>
              <div className="flex-1 flex items-center gap-2 sm:gap-3">
                <select
                  id="select-pais"
                  value={pais}
                  onChange={(e) => setPais(e.target.value)}
                  className={`flex-1 h-10 sm:h-11 px-3 bg-white border-2 border-zinc-900 rounded-sm text-sm sm:text-base font-bold text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 shadow-[2px_2px_0px_#18181b] cursor-pointer ${
                    isSketch ? 'font-sketch text-lg' : 'font-mono'
                  }`}
                >
                  <option value="Perú">Perú</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Chile">Chile</option>
                  <option value="México">México</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Ecuador">Ecuador</option>
                </select>
                <button
                  type="button"
                  id="btn-cargar-pais"
                  onClick={handleCargarPais}
                  title="Cargar configuración territorial"
                  className={`px-4 sm:px-6 h-10 sm:h-11 bg-white hover:bg-zinc-100 active:bg-zinc-200 border-2 border-zinc-900 rounded-sm font-bold text-xs sm:text-sm text-zinc-900 shadow-[2px_2px_0px_#18181b] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${fontMain}`}
                >
                  Cargar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTÓN DESTACADO: GUARDAR CAMBIOS (ESQUINA INFERIOR DERECHA) ================= */}
        <div className="w-full flex items-center justify-end pt-2 pb-6">
          <button
            id="btn-guardar-cambios"
            type="submit"
            className={`px-8 sm:px-10 py-3 sm:py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white border-2 border-zinc-900 rounded-sm font-black text-base sm:text-lg tracking-wider uppercase shadow-[4px_4px_0px_#18181b] hover:shadow-[5px_5px_0px_#1e3a8a] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_#18181b] transition-all cursor-pointer ${fontMain}`}
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};
