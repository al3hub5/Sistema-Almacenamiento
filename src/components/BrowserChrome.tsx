import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Home,
  Copy,
  Check,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Grid,
  FileCode,
  PenTool,
  Printer,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { AppRoute, DiagramStyleMode, GridPattern } from '../types';

interface BrowserChromeProps {
  url: string;
  tabTitle?: string;
  currentRoute?: AppRoute;
  styleMode: DiagramStyleMode;
  gridPattern: GridPattern;
  zoom: number;
  canGoBack?: boolean;
  canGoForward?: boolean;
  onNavigateBack?: () => void;
  onNavigateForward?: () => void;
  onNavigateHome?: () => void;
  onSelectRoute?: (route: AppRoute) => void;
  onStyleModeChange: (mode: DiagramStyleMode) => void;
  onGridPatternChange: (pattern: GridPattern) => void;
  onZoomChange: (newZoom: number) => void;
  onResetZoom: () => void;
  children: React.ReactNode;
}

export const BrowserChrome: React.FC<BrowserChromeProps> = ({
  url,
  tabTitle = 'Login',
  currentRoute = 'login',
  styleMode,
  gridPattern,
  zoom,
  canGoBack = false,
  canGoForward = false,
  onNavigateBack,
  onNavigateForward,
  onNavigateHome,
  onSelectRoute,
  onStyleModeChange,
  onGridPatternChange,
  onZoomChange,
  onResetZoom,
  children,
}) => {
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div
      id="browser-window-container"
      className="w-full max-w-7xl mx-auto my-3 md:my-6 rounded-lg overflow-hidden border-2 border-zinc-900 bg-white shadow-[6px_6px_0px_#18181b] transition-all flex flex-col"
      style={{ minHeight: '88vh' }}
    >
      {/* ================= 1. BROWSER WINDOW TITLEBAR & TABS ================= */}
      <div
        id="browser-titlebar"
        className="bg-zinc-200 border-b-2 border-zinc-900 px-3 pt-2 pb-0 flex items-center justify-between select-none"
      >
        {/* Tabs area - Strictly single visible tab */}
        <div className="flex items-end gap-1 overflow-x-auto scrollbar-none">
          {/* Single Visible Tab (dynamically shows "Login" or "Arquitectura") */}
          <div
            id="browser-single-active-tab"
            className="group relative flex items-center gap-2 px-4 py-1.5 bg-white border-t-[3px] border-t-blue-600 border-x-2 border-zinc-900 rounded-t-md text-xs font-semibold text-zinc-900 shadow-sm"
          >
            {/* Tab wireframe icon */}
            <div className="w-3.5 h-3.5 rounded-sm border border-blue-400 bg-blue-50 text-blue-700 flex items-center justify-center text-[9px] font-mono">
              {currentRoute === 'login' ? '⚿' : currentRoute === 'seguridad' ? '🛡' : '❖'}
            </div>
            <span className="truncate max-w-[180px] font-mono text-[12px] font-bold text-zinc-900">
              {tabTitle}
            </span>
            <span className="ml-1 text-zinc-400 group-hover:text-rose-600 rounded-sm p-0.5 text-[10px] select-none transition-colors">
              ✕
            </span>
          </div>
        </div>

        {/* Window control buttons (Classic minimize, maximize, close) */}
        <div className="flex items-center gap-1.5 pb-2">
          <button
            type="button"
            title="Minimizar"
            className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center border border-zinc-900 bg-amber-400 hover:bg-amber-500 text-zinc-900 text-xs font-mono font-bold rounded-sm shadow-[1px_1px_0px_#18181b] active:translate-y-0.5 cursor-pointer transition-colors"
          >
            –
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Restaurar' : 'Maximizar'}
            className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center border border-zinc-900 bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-mono font-bold rounded-sm shadow-[1px_1px_0px_#18181b] active:translate-y-0.5 cursor-pointer transition-colors"
          >
            {isFullscreen ? '❐' : '□'}
          </button>
          <button
            type="button"
            title="Cerrar ventana"
            className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center border border-zinc-900 bg-rose-500 hover:bg-rose-600 text-white text-xs font-mono font-bold rounded-sm shadow-[1px_1px_0px_#18181b] active:translate-y-0.5 cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      {/* ================= 2. BROWSER NAVIGATION & URL BAR ================= */}
      <div
        id="browser-toolbar"
        className="bg-zinc-100 border-b-2 border-zinc-900 px-3 py-2 flex flex-wrap items-center gap-2 select-none"
      >
        {/* Navigation buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onNavigateBack}
            disabled={!canGoBack}
            title={canGoBack ? 'Atrás' : 'Sin historial previo'}
            className={`p-1.5 border rounded-sm active:translate-y-0.5 transition-colors ${
              canGoBack
                ? 'border-zinc-800 bg-white hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 text-zinc-900 cursor-pointer shadow-[1px_1px_0px_#18181b]'
                : 'border-zinc-300 bg-zinc-100 text-zinc-400 cursor-not-allowed opacity-60'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onNavigateForward}
            disabled={!canGoForward}
            title={canGoForward ? 'Adelante' : 'Sin historial posterior'}
            className={`p-1.5 border rounded-sm active:translate-y-0.5 transition-colors ${
              canGoForward
                ? 'border-zinc-800 bg-white hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 text-zinc-900 cursor-pointer shadow-[1px_1px_0px_#18181b]'
                : 'border-zinc-300 bg-zinc-100 text-zinc-400 cursor-not-allowed opacity-60'
            }`}
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleRefresh}
            title="Recargar"
            className="p-1.5 border border-zinc-800 bg-white hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 text-zinc-900 rounded-sm active:translate-y-0.5 cursor-pointer shadow-[1px_1px_0px_#18181b] transition-colors"
          >
            <RotateCw
              className={`w-3.5 h-3.5 ${
                isRefreshing ? 'animate-spin text-blue-600' : ''
              }`}
            />
          </button>
          <button
            type="button"
            onClick={onNavigateHome}
            title="Página de inicio (Login)"
            className="p-1.5 border border-zinc-800 bg-white hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 text-zinc-900 rounded-sm active:translate-y-0.5 hidden sm:block cursor-pointer shadow-[1px_1px_0px_#18181b] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ================= ADDRESS BAR (URL BAR) ================= */}
        {/* Required exactly: http://sistema-almacen.com/arquitectura */}
        <div
          id="browser-address-bar"
          className="flex-1 min-w-[280px] flex items-center bg-white border-2 border-zinc-900 hover:border-blue-600 focus-within:border-blue-600 rounded-md px-2.5 py-1 shadow-[2px_2px_0px_#18181b] transition-colors"
        >
          {/* Wireframe protocol badge */}
          <div className="flex items-center gap-1.5 pr-2.5 border-r border-zinc-200 text-emerald-700 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full border border-emerald-600 bg-emerald-500 inline-block"></span>
            <span className="hidden md:inline font-bold">http</span>
          </div>

          {/* Exact URL Text Input Display */}
          <div className="flex-1 px-2 font-mono text-xs sm:text-[13px] text-zinc-900 tracking-tight select-all overflow-x-auto whitespace-nowrap scrollbar-none font-medium">
            {url}
          </div>

          {/* Copy URL Button */}
          <button
            type="button"
            onClick={handleCopyUrl}
            title="Copiar URL"
            className="p-1 hover:bg-blue-50 rounded text-zinc-600 hover:text-blue-700 transition-colors"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* ================= TOOLBAR ACTION CONTROLS ================= */}
        <div className="flex items-center gap-1 ml-auto">
          {/* Style Mode Toggle: Boceto vs Wireframe Técnico */}
          <div className="flex items-center border border-zinc-800 bg-white rounded-sm overflow-hidden text-xs shadow-[1px_1px_0px_#18181b]">
            <button
              type="button"
              onClick={() => onStyleModeChange('sketch')}
              title="Estilo Boceto a mano alzada"
              className={`px-2 py-1 flex items-center gap-1 font-mono text-[11px] transition-colors ${
                styleMode === 'sketch'
                  ? 'bg-zinc-900 text-amber-300 font-semibold'
                  : 'bg-white text-zinc-800 hover:bg-zinc-100'
              }`}
            >
              <PenTool className="w-3 h-3 text-amber-400" />
              <span className="hidden md:inline">Boceto</span>
            </button>
            <button
              type="button"
              onClick={() => onStyleModeChange('wireframe')}
              title="Estilo Wireframe técnico CAD"
              className={`px-2 py-1 flex items-center gap-1 font-mono text-[11px] border-l border-zinc-800 transition-colors ${
                styleMode === 'wireframe'
                  ? 'bg-blue-700 text-white font-semibold'
                  : 'bg-white text-zinc-800 hover:bg-zinc-100'
              }`}
            >
              <FileCode className="w-3 h-3 text-blue-300" />
              <span className="hidden md:inline">Técnico</span>
            </button>
          </div>

          {/* Grid pattern toggle */}
          <div className="hidden lg:flex items-center border border-zinc-800 bg-white rounded-sm overflow-hidden text-xs">
            <button
              type="button"
              onClick={() => onGridPatternChange('grid')}
              title="Cuadrícula"
              className={`px-1.5 py-1 text-[11px] font-mono ${
                gridPattern === 'grid'
                  ? 'bg-zinc-900 text-white'
                  : 'hover:bg-zinc-100'
              }`}
            >
              #
            </button>
            <button
              type="button"
              onClick={() => onGridPatternChange('dots')}
              title="Matriz de puntos"
              className={`px-1.5 py-1 text-[11px] font-mono border-l border-zinc-800 ${
                gridPattern === 'dots'
                  ? 'bg-zinc-900 text-white'
                  : 'hover:bg-zinc-100'
              }`}
            >
              ::
            </button>
            <button
              type="button"
              onClick={() => onGridPatternChange('blank')}
              title="Lienzo blanco"
              className={`px-1.5 py-1 text-[11px] font-mono border-l border-zinc-800 ${
                gridPattern === 'blank'
                  ? 'bg-zinc-900 text-white'
                  : 'hover:bg-zinc-100'
              }`}
            >
              —
            </button>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center border border-zinc-800 bg-white rounded-sm overflow-hidden text-xs">
            <button
              type="button"
              onClick={() => onZoomChange(Math.max(0.6, zoom - 0.1))}
              title="Alejar"
              className="p-1 hover:bg-zinc-100 text-zinc-800"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onResetZoom}
              title="Restablecer zoom al 100%"
              className="px-1.5 py-0.5 font-mono text-[11px] text-zinc-900 hover:bg-zinc-100 border-x border-zinc-800 min-w-[42px] text-center"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              onClick={() => onZoomChange(Math.min(1.6, zoom + 0.1))}
              title="Acercar"
              className="p-1 hover:bg-zinc-100 text-zinc-800"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Print button */}
          <button
            type="button"
            onClick={handlePrint}
            title="Imprimir / Exportar wireframe"
            className="p-1.5 border border-zinc-800 bg-white hover:bg-zinc-100 text-zinc-800 rounded-sm active:translate-y-0.5"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ================= 3. BROWSER VIEWPORT (DIAGRAM AREA) ================= */}
      {/* 
        STRICT REQUIREMENT:
        "Debajo de la URL, dibuja un diagrama jerárquico de cajas rectangulares conectadas por líneas simples.
        No incluyas ningún texto descriptivo, títulos, ni explicaciones fuera de las cajas. Muestra única y exclusivamente las cajas conectadas."
      */}
      <div
        id="browser-viewport"
        className={`flex-1 relative overflow-auto bg-white min-h-[580px] p-4 md:p-8 flex items-center justify-center transition-colors ${
          gridPattern === 'grid'
            ? 'wireframe-grid'
            : gridPattern === 'dots'
            ? 'wireframe-dots'
            : 'bg-white'
        }`}
      >
        <div
          id="diagram-scalable-stage"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
          }}
          className="w-full flex items-center justify-center"
        >
          {children}
        </div>
      </div>

      {/* ================= 4. CLASSIC BROWSER STATUS BAR ================= */}
      <div
        id="browser-statusbar"
        className="bg-zinc-100 border-t-2 border-zinc-900 px-3 py-1 flex items-center justify-between text-[11px] font-mono text-zinc-600 select-none"
      >
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-900"></span>
          <span className="truncate max-w-[300px]">
            {url}
          </span>
        </div>
        <div className="flex items-center gap-3 text-zinc-500">
          <span className="hidden sm:inline">
            {currentRoute === 'login'
              ? 'Pantalla: Control de Acceso'
              : currentRoute === 'seguridad'
              ? 'Pantalla: Perfiles y Permisos'
              : currentRoute === 'arquitectura'
              ? '41 cajas conectadas'
              : `Pantalla: ${tabTitle}`}
          </span>
          <span className="border-l border-zinc-300 pl-2">
            Vista: {styleMode === 'sketch' ? 'Boceto a mano' : 'Wireframe técnico'}
          </span>
          <a
            href="/prototipo.html"
            target="_blank"
            rel="noopener noreferrer"
            title="Abrir archivo HTML único con CSS y JS integrado en nueva pestaña"
            className="border-l border-zinc-300 pl-2 text-zinc-800 hover:text-black font-semibold underline underline-offset-2"
          >
            HTML Único ↗
          </a>
        </div>
      </div>
    </div>
  );
};
