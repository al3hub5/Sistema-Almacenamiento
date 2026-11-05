import React from 'react';
import { DiagramStyleMode } from '../types';

interface EmptyModuleViewProps {
  title: string;
  url?: string;
  styleMode: DiagramStyleMode;
  onGoBack: () => void;
}

export const EmptyModuleView: React.FC<EmptyModuleViewProps> = ({
  title,
  styleMode,
  onGoBack,
}) => {
  const isSketch = styleMode === 'sketch';

  return (
    <div
      id="vista-modulo-vacio"
      className="w-full min-h-[520px] flex flex-col justify-between p-4 sm:p-6"
    >
      {/* Barra superior con botón para regresar a Arquitectura */}
      <div className="w-full flex items-center justify-between pb-4 border-b border-zinc-300 select-none">
        <button
          type="button"
          onClick={onGoBack}
          id="btn-regresar-arquitectura"
          title="Regresar al diagrama de Arquitectura"
          className={`flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-zinc-100 active:bg-zinc-200 border-2 border-zinc-900 rounded-sm text-xs sm:text-sm text-zinc-900 shadow-[2px_2px_0px_#18181b] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer ${
            isSketch ? 'font-sketch font-normal text-base' : 'font-tech font-normal'
          }`}
        >
          <span className="font-mono text-base">&larr;</span>
          <span>Regresar a Arquitectura</span>
        </button>

        {/* Título del módulo */}
        <span
          className={`text-xs sm:text-sm text-zinc-600 ${
            isSketch ? 'font-sketch text-base' : 'font-tech'
          }`}
        >
          {title}
        </span>
      </div>

      {/* Contenedor central vacío */}
      <div
        id="lienzo-vacio"
        className="flex-1 w-full min-h-[380px] my-6 border-2 border-dashed border-zinc-200 rounded-sm bg-zinc-50/40 flex items-center justify-center select-none"
      >
        {/* Ventana vacía intencional */}
      </div>

      {/* Pie de página discreto */}
      <div className="w-full text-right text-[11px] font-mono text-zinc-400 select-none">
        Área de trabajo en blanco
      </div>
    </div>
  );
};
