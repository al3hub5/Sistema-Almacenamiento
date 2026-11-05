import React, { useState } from 'react';
import { DiagramStyleMode } from '../types';

interface LoginWireframeProps {
  styleMode: DiagramStyleMode;
  onLoginSubmit: () => void;
}

export const LoginWireframe: React.FC<LoginWireframeProps> = ({
  styleMode,
  onLoginSubmit,
}) => {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const [isFaceHovered, setIsFaceHovered] = useState(false);

  const isSketch = styleMode === 'sketch';
  const fontMain = isSketch ? 'font-sketch' : 'font-tech';

  return (
    <div
      id="login-wireframe-canvas"
      className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-8 flex flex-col items-center justify-center select-none"
    >
      {/* 
        Strict requirement:
        "El contenido de la página debe dividirse visualmente en dos secciones principales sobre un fondo blanco limpio, sin distracciones.
        No incluyas explicaciones teóricas ni texto fuera de los elementos de la interfaz."
      */}
      <div
        id="login-two-columns-layout"
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center justify-center"
      >
        {/* ================= SECCIÓN IZQUIERDA: LOGIN TRADICIONAL ================= */}
        {/* 
          "Sección Izquierda (Login Tradicional): Dibuja un recuadro grande con el título centrado "CONTROL DE ACCESO".
          Debajo del título, dibuja un icono grande de un candado cerrado.
          Debajo del candado, alinea a la izquierda dos etiquetas de texto: "DNI" y "CONTRASEÑA", cada una con un rectángulo vacío al lado simulando los campos de entrada de texto.
          Debajo de los campos, dibuja un botón rectangular destacado con la palabra "INGRESAR"."
        */}
        <div
          id="seccion-login-tradicional"
          className={`w-full max-w-md mx-auto bg-white border-2 border-zinc-900 rounded-sm p-6 sm:p-8 flex flex-col items-center shadow-[4px_4px_0px_#18181b] ${
            isSketch ? 'rotate-[-0.3deg]' : ''
          }`}
        >
          {/* Título centrado: CONTROL DE ACCESO */}
          <h2
            id="titulo-control-acceso"
            className={`text-xl sm:text-2xl font-bold text-center tracking-wider text-zinc-900 mb-6 ${fontMain}`}
          >
            CONTROL DE ACCESO
          </h2>

          {/* Icono grande de un candado cerrado (dibujado en estilo boceto/wireframe vectorial) */}
          <div
            id="icono-candado-cerrado"
            className="w-24 h-24 sm:w-28 sm:h-28 mb-8 flex items-center justify-center"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full stroke-zinc-900 fill-none"
              strokeWidth={isSketch ? '3.5' : '3'}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Arco/Grillete cerrado del candado */}
              <path
                d="M 32 46 L 32 30 C 32 18, 68 18, 68 30 L 68 46"
                strokeWidth={isSketch ? '4' : '3.5'}
              />
              {/* Cuerpo rectangular del candado */}
              <rect
                x="20"
                y="46"
                width="60"
                height="44"
                rx={isSketch ? '2' : '0'}
                fill="#ffffff"
                strokeWidth={isSketch ? '3.5' : '3'}
              />
              {/* Cerradura / Ojo de la cerradura */}
              <circle cx="50" cy="64" r="5" fill="#18181b" />
              <path d="M 48 67 L 46 78 L 54 78 L 52 67 Z" fill="#18181b" />

              {/* Trazos de boceto en modo sketch */}
              {isSketch && (
                <>
                  <line
                    x1="24"
                    y1="50"
                    x2="76"
                    y2="50"
                    stroke="#71717a"
                    strokeWidth="1"
                    strokeDasharray="4 2"
                    opacity="0.5"
                  />
                  <line
                    x1="22"
                    y1="86"
                    x2="78"
                    y2="86"
                    stroke="#71717a"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                </>
              )}
            </svg>
          </div>

          {/* Formulario con DNI y CONTRASEÑA con rectángulos vacíos al lado */}
          <div className="w-full space-y-4 mb-8">
            {/* Campo USUARIO/CÓDIGO */}
            <div className="flex items-center gap-3 sm:gap-4">
              <label
                htmlFor="input-dni"
                className={`w-28 sm:w-32 text-left font-bold text-sm sm:text-base text-zinc-900 tracking-wide select-none ${fontMain}`}
              >
                USUARIO/CÓDIGO
              </label>
              <div className="flex-1 relative">
                <input
                  id="input-dni"
                  type="text"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  placeholder=""
                  className={`w-full h-10 sm:h-11 px-3 bg-white border-2 border-zinc-900 rounded-sm text-sm sm:text-base text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 shadow-[2px_2px_0px_#18181b] ${
                    isSketch ? 'font-sketch text-lg' : 'font-tech'
                  }`}
                  autoComplete="off"
                />
              </div>
            </div>

            {/* Campo CONTRASEÑA */}
            <div className="flex items-center gap-3 sm:gap-4">
              <label
                htmlFor="input-password"
                className={`w-28 sm:w-32 text-left font-bold text-sm sm:text-base text-zinc-900 tracking-wide select-none ${fontMain}`}
              >
                CONTRASEÑA
              </label>
              <div className="flex-1 relative">
                <input
                  id="input-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=""
                  className={`w-full h-10 sm:h-11 px-3 bg-white border-2 border-zinc-900 rounded-sm text-sm sm:text-base text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 shadow-[2px_2px_0px_#18181b] ${
                    isSketch ? 'font-sketch text-lg' : 'font-tech'
                  }`}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          {/* Botón rectangular destacado con la palabra INGRESAR */}
          <button
            id="boton-ingresar"
            type="button"
            onClick={onLoginSubmit}
            className={`w-full py-3 sm:py-3.5 px-6 border-2 border-zinc-900 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-base sm:text-lg tracking-wider rounded-sm shadow-[4px_4px_0px_#18181b] hover:shadow-[5px_5px_0px_#18181b] active:translate-y-0.5 active:translate-x-0.5 transition-all cursor-pointer ${fontMain}`}
          >
            INGRESAR
          </button>
        </div>

        {/* ================= SECCIÓN DERECHA: AUTENTICACIÓN ADICIONAL ================= */}
        {/* 
          "Sección Derecha (Autenticación Adicional): Alineado a la altura del recuadro de la izquierda, coloca un texto que diga "Ingresa por QR".
          Debajo, dibuja un gráfico cuadrado que simule un código QR grande.
          Debajo del QR, añade un texto pequeño que diga "Ingresar mediante registro facial"."
        */}
        <div
          id="seccion-autenticacion-adicional"
          className={`w-full max-w-md mx-auto flex flex-col items-center justify-center p-6 sm:p-8 ${
            isSketch ? 'rotate-[0.3deg]' : ''
          }`}
        >
          {/* Texto: Ingresa por QR (alineado en altura con el título izquierdo) */}
          <h2
            id="texto-ingresa-por-qr"
            className={`text-xl sm:text-2xl font-bold text-center tracking-wider text-zinc-900 mb-6 ${fontMain}`}
          >
            Ingresa por QR
          </h2>

          {/* Gráfico cuadrado simulando un código QR grande en estilo boceto/wireframe (Clickable) */}
          <div
            id="grafico-codigo-qr"
            onClick={onLoginSubmit}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onLoginSubmit();
            }}
            title="Hacer clic para ingresar por QR"
            className="w-56 h-56 sm:w-64 sm:h-64 p-3 bg-white border-2 border-zinc-900 rounded-sm shadow-[4px_4px_0px_#18181b] hover:shadow-[6px_6px_0px_#18181b] active:translate-x-0.5 active:translate-y-0.5 mb-6 flex items-center justify-center cursor-pointer transition-all"
          >
            <svg
              viewBox="0 0 160 160"
              className="w-full h-full fill-zinc-900"
              shapeRendering="crispEdges"
            >
              {/* Fondo blanco */}
              <rect x="0" y="0" width="160" height="160" fill="#ffffff" />

              {/* Borde exterior del QR */}
              <rect
                x="4"
                y="4"
                width="152"
                height="152"
                fill="none"
                stroke="#18181b"
                strokeWidth={isSketch ? '2.5' : '2'}
              />

              {/* 1. Finder pattern: Superior Izquierdo */}
              <rect x="12" y="12" width="36" height="36" fill="#18181b" />
              <rect x="18" y="18" width="24" height="24" fill="#ffffff" />
              <rect x="24" y="24" width="12" height="12" fill="#18181b" />

              {/* 2. Finder pattern: Superior Derecho */}
              <rect x="112" y="12" width="36" height="36" fill="#18181b" />
              <rect x="118" y="18" width="24" height="24" fill="#ffffff" />
              <rect x="124" y="24" width="12" height="12" fill="#18181b" />

              {/* 3. Finder pattern: Inferior Izquierdo */}
              <rect x="12" y="112" width="36" height="36" fill="#18181b" />
              <rect x="18" y="118" width="24" height="24" fill="#ffffff" />
              <rect x="24" y="124" width="12" height="12" fill="#18181b" />

              {/* Timing patterns (líneas punteadas de sincronización) */}
              <rect x="52" y="26" width="56" height="6" fill="#18181b" />
              <rect x="58" y="26" width="6" height="6" fill="#ffffff" />
              <rect x="70" y="26" width="6" height="6" fill="#ffffff" />
              <rect x="82" y="26" width="6" height="6" fill="#ffffff" />
              <rect x="94" y="26" width="6" height="6" fill="#ffffff" />

              <rect x="26" y="52" width="6" height="56" fill="#18181b" />
              <rect x="26" y="58" width="6" height="6" fill="#ffffff" />
              <rect x="26" y="70" width="6" height="6" fill="#ffffff" />
              <rect x="26" y="82" width="6" height="6" fill="#ffffff" />
              <rect x="26" y="94" width="6" height="6" fill="#ffffff" />

              {/* Data blocks / matrix pattern simulado */}
              <rect x="54" y="38" width="12" height="12" fill="#18181b" />
              <rect x="72" y="38" width="18" height="6" fill="#18181b" />
              <rect x="96" y="38" width="12" height="18" fill="#18181b" />

              <rect x="54" y="56" width="24" height="12" fill="#18181b" />
              <rect x="84" y="62" width="12" height="24" fill="#18181b" />
              <rect x="102" y="62" width="24" height="12" fill="#18181b" />
              <rect x="132" y="54" width="16" height="18" fill="#18181b" />

              <rect x="54" y="74" width="12" height="24" fill="#18181b" />
              <rect x="72" y="80" width="18" height="12" fill="#18181b" />
              <rect x="102" y="80" width="18" height="18" fill="#18181b" />
              <rect x="126" y="78" width="22" height="12" fill="#18181b" />

              {/* Alignment pattern (centro inferior derecho) */}
              <rect x="106" y="106" width="28" height="28" fill="#18181b" />
              <rect x="112" y="112" width="16" height="16" fill="#ffffff" />
              <rect x="116" y="116" width="8" height="8" fill="#18181b" />

              <rect x="54" y="104" width="18" height="18" fill="#18181b" />
              <rect x="78" y="104" width="18" height="12" fill="#18181b" />
              <rect x="54" y="128" width="30" height="12" fill="#18181b" />
              <rect x="90" y="128" width="12" height="20" fill="#18181b" />
              <rect x="138" y="104" width="10" height="44" fill="#18181b" />
              <rect x="110" y="138" width="22" height="10" fill="#18181b" />

              {/* Trazos tenues de boceto a mano */}
              {isSketch && (
                <rect
                  x="6"
                  y="6"
                  width="148"
                  height="148"
                  fill="none"
                  stroke="#a1a1aa"
                  strokeWidth="0.8"
                  strokeDasharray="4 2"
                />
              )}
            </svg>
          </div>

          {/* Texto pequeño: Ingresar mediante registro facial */}
          <div
            id="texto-registro-facial"
            className="flex items-center justify-center cursor-pointer group py-1 px-3 rounded hover:bg-zinc-100 transition-colors"
            onMouseEnter={() => setIsFaceHovered(true)}
            onMouseLeave={() => setIsFaceHovered(false)}
            onClick={onLoginSubmit}
            title="Ingresar mediante reconocimiento facial"
          >
            <span
              className={`text-xs sm:text-sm text-zinc-700 group-hover:text-black underline underline-offset-4 decoration-zinc-400 group-hover:decoration-zinc-900 ${fontMain}`}
            >
              Ingresar mediante registro facial
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
