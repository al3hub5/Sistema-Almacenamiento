import { useState } from 'react';
import { BrowserChrome } from './components/BrowserChrome';
import { LoginWireframe } from './components/LoginWireframe';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { SecurityView } from './components/SecurityView';
import { ParametrosSistema } from './components/ParametrosSistema';
import { CatalogoProductos } from './components/CatalogoProductos';
import { CatalogoProtocolos } from './components/CatalogoProtocolos';
import { DetalleProtocolo } from './components/DetalleProtocolo';
import { CatalogoReglas } from './components/CatalogoReglas';
import { CatalogoPoliticas } from './components/CatalogoPoliticas';
import { CatalogoMensajes } from './components/CatalogoMensajes';
import { ConsultaReservasCliente } from './components/ConsultaReservasCliente';
import { ConsultaIndicadores } from './components/ConsultaIndicadores';
import { ConsultaVistasResumidas } from './components/ConsultaVistasResumidas';
import { RegistroCliente } from './components/RegistroCliente';
import { RegistroReservas } from './components/RegistroReservas';
import { GestionReservas } from './components/GestionReservas';
import { PostergarCancelarDespacho } from './components/PostergarCancelarDespacho';
import { RecepcionDespacho } from './components/RecepcionDespacho';
import { EstadoReservas } from './components/EstadoReservas';
import { DetalleReserva } from './components/DetalleReserva';
import { HistorialCambiosReservas } from './components/HistorialCambiosReservas';
import { EmptyModuleView } from './components/EmptyModuleView';
import { NODES } from './data/diagramData';
import {
  INITIAL_PROTOCOLS,
  INITIAL_RULES,
  ProtocolItem,
  RuleItem,
} from './data/catalogData';
import { AppRoute, DiagramStyleMode, GridPattern } from './types';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('login');
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [history, setHistory] = useState<AppRoute[]>(['login']);

  const [styleMode, setStyleMode] = useState<DiagramStyleMode>('sketch');
  const [gridPattern, setGridPattern] = useState<GridPattern>('blank');
  const [zoom, setZoom] = useState<number>(1);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const [selectedProtocolCode, setSelectedProtocolCode] = useState<string>('PRO-INB');
  const [selectedReservationId, setSelectedReservationId] = useState<string>('RES-940-001');
  const [protocols, setProtocols] = useState<ProtocolItem[]>(INITIAL_PROTOCOLS);
  const [rules, setRules] = useState<RuleItem[]>(INITIAL_RULES);

  const navigateTo = (route: AppRoute) => {
    if (route === currentRoute) return;
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(route);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentRoute(route);
  };

  const handleGoBack = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setCurrentRoute(history[prevIndex]);
    }
  };

  const handleGoForward = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setCurrentRoute(history[nextIndex]);
    }
  };

  const handleGoHome = () => {
    navigateTo('login');
  };

  const currentNode = NODES.find((n) => n.id === currentRoute);

  const currentUrl =
    currentRoute === 'login'
      ? 'http://sistema-almacen.com/login'
      : currentRoute === 'seguridad'
      ? 'http://sistema-almacen.com/seguridad'
      : currentRoute === 'arquitectura'
      ? 'http://sistema-almacen.com/arquitectura'
      : currentRoute === 'mp-detalle-protocolo'
      ? `http://sistema-almacen.com/parametros/protocolos/${selectedProtocolCode}`
      : currentNode?.url || 'http://sistema-almacen.com/arquitectura';

  const currentTabTitle =
    currentRoute === 'login'
      ? 'Login'
      : currentRoute === 'seguridad'
      ? 'Seguridad'
      : currentRoute === 'arquitectura'
      ? 'Arquitectura'
      : currentRoute === 'mp-detalle-protocolo'
      ? `Detalle: ${selectedProtocolCode}`
      : currentRoute === 'c-consulta-clientes'
      ? 'Consulta de Clientes'
      : currentRoute === 'c-consulta-indicadores'
      ? 'Consulta de Indicadores'
      : currentRoute === 'c-consulta-vistas-resumidas'
      ? 'Consulta de Vistas Resumidas'
      : currentRoute === 'de-registro-cliente'
      ? 'Registro de Cliente'
      : currentRoute === 'de-registro-reservas'
      ? 'Registro de Reservas'
      : currentRoute === 'de-gestion-reservas'
      ? 'Gestión de Reservas'
      : currentRoute === 'de-postergar-cancelar'
      ? 'Postergar / Cancelar Despacho'
      : currentRoute === 'de-recepcion-despacho'
      ? 'Recepción / Despacho'
      : currentRoute === 'rep-estado-reservas'
      ? 'Estado de Reservas'
      : currentRoute === 'rep-detalles-reserva'
      ? 'Detalle de Reserva'
      : currentRoute === 'rep-historial-cambios'
      ? 'Historial de Cambios de Reservas'
      : currentNode?.label || 'Módulo';

  return (
    <main
      id="main-app-wrapper"
      className="min-h-screen w-full bg-zinc-200/90 text-zinc-900 p-2 sm:p-4 md:p-6 flex flex-col justify-center items-center font-sans antialiased"
    >
      <BrowserChrome
        url={currentUrl}
        tabTitle={currentTabTitle}
        currentRoute={currentRoute}
        styleMode={styleMode}
        gridPattern={gridPattern}
        zoom={zoom}
        canGoBack={historyIndex > 0}
        canGoForward={historyIndex < history.length - 1}
        onNavigateBack={handleGoBack}
        onNavigateForward={handleGoForward}
        onNavigateHome={handleGoHome}
        onSelectRoute={navigateTo}
        onStyleModeChange={setStyleMode}
        onGridPatternChange={setGridPattern}
        onZoomChange={setZoom}
        onResetZoom={() => setZoom(1)}
      >
        {/* ================= VISTA 1: LOGIN ================= */}
        <div
          id="vista-login"
          style={{ display: currentRoute === 'login' ? 'block' : 'none' }}
          className="w-full"
        >
          <LoginWireframe
            styleMode={styleMode}
            onLoginSubmit={() => navigateTo('arquitectura')}
          />
        </div>

        {/* ================= VISTA 2: ARQUITECTURA ================= */}
        <div
          id="vista-arquitectura"
          style={{ display: currentRoute === 'arquitectura' ? 'block' : 'none' }}
          className="w-full flex flex-col"
        >
          {/* Esquina superior derecha: Botón "Cerrar Sesión" */}
          <div className="w-full flex justify-end items-center px-4 sm:px-8 pt-3 pb-1 select-none">
            <button
              id="btn-cerrar-sesion"
              type="button"
              onClick={() => navigateTo('login')}
              title="Cerrar Sesión y volver al Login"
              className={`border-2 border-zinc-900 bg-white hover:bg-zinc-100 active:bg-zinc-200 text-zinc-900 font-bold px-4 py-1.5 text-xs sm:text-sm tracking-wide rounded-sm shadow-[2.5px_2.5px_0px_#18181b] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer ${
                styleMode === 'sketch' ? 'font-sketch text-base' : 'font-tech'
              }`}
            >
              Cerrar Sesión
            </button>
          </div>

          {/* Diagrama Jerárquico Debajo del Botón */}
          <div className="w-full">
            <ArchitectureDiagram
              styleMode={styleMode}
              hoveredNodeId={hoveredNodeId}
              selectedNodeId={selectedNodeId}
              onHoverNode={setHoveredNodeId}
              onSelectNode={setSelectedNodeId}
              onNavigateToSecurity={() => navigateTo('seguridad')}
              onNavigateToNode={(node) => navigateTo(node.id)}
            />
          </div>
        </div>

        {/* ================= VISTA 3: SEGURIDAD (PERFILES Y PERMISOS) ================= */}
        <div
          id="vista-seguridad-wrapper"
          style={{ display: currentRoute === 'seguridad' ? 'block' : 'none' }}
          className="w-full"
        >
          <SecurityView
            styleMode={styleMode}
            onGoBack={() => navigateTo('arquitectura')}
          />
        </div>

        {/* ================= VISTA: PARÁMETROS DEL SISTEMA ================= */}
        {currentRoute === 'mp-parametros-sistema' && (
          <div id="vista-mp-parametros-sistema-wrapper" className="w-full">
            <ParametrosSistema
              styleMode={styleMode}
              onGoBack={() => navigateTo('arquitectura')}
            />
          </div>
        )}

        {/* ================= VISTA: CATÁLOGO DE PRODUCTOS ================= */}
        {currentRoute === 'mp-catalogo-productos' && (
          <div id="vista-mp-catalogo-productos-wrapper" className="w-full">
            <CatalogoProductos
              styleMode={styleMode}
              onGoBack={() => navigateTo('arquitectura')}
            />
          </div>
        )}

        {/* ================= VISTA: CATÁLOGO DE PROTOCOLOS ================= */}
        {currentRoute === 'mp-catalogo-protocolos' && (
          <div id="vista-mp-catalogo-protocolos-wrapper" className="w-full">
            <CatalogoProtocolos
              styleMode={styleMode}
              onBack={() => navigateTo('arquitectura')}
              protocols={protocols}
              onProtocolsChange={setProtocols}
              onOpenDetail={(protocolCode) => {
                setSelectedProtocolCode(protocolCode);
                navigateTo('mp-detalle-protocolo');
              }}
            />
          </div>
        )}

        {/* ================= VISTA: DETALLE DE PROTOCOLO ================= */}
        {currentRoute === 'mp-detalle-protocolo' && (
          <div id="vista-mp-detalle-protocolo-wrapper" className="w-full">
            <DetalleProtocolo
              styleMode={styleMode}
              onBack={() => navigateTo('mp-catalogo-protocolos')}
              protocolCode={selectedProtocolCode}
              protocols={protocols}
              rules={rules}
              onProtocolsChange={setProtocols}
              onSelectProtocolCode={setSelectedProtocolCode}
            />
          </div>
        )}

        {/* ================= VISTA: CATÁLOGO DE REGLAS ================= */}
        {currentRoute === 'mp-catalogo-reglas' && (
          <div id="vista-mp-catalogo-reglas-wrapper" className="w-full">
            <CatalogoReglas
              styleMode={styleMode}
              onBack={() => navigateTo('arquitectura')}
              rules={rules}
              onRulesChange={setRules}
            />
          </div>
        )}

        {/* ================= VISTA: CATÁLOGO DE POLÍTICAS ================= */}
        {currentRoute === 'mp-catalogo-politicas' && (
          <div id="vista-mp-catalogo-politicas-wrapper" className="w-full">
            <CatalogoPoliticas
              styleMode={styleMode}
              onBack={() => navigateTo('arquitectura')}
            />
          </div>
        )}

        {/* ================= VISTA: CATÁLOGO DE MENSAJES ================= */}
        {currentRoute === 'mp-catalogos-mensajes' && (
          <div id="vista-mp-catalogos-mensajes-wrapper" className="w-full">
            <CatalogoMensajes
              styleMode={styleMode}
              onBack={() => navigateTo('arquitectura')}
            />
          </div>
        )}

        {/* ================= VISTA: CONSULTA DE CLIENTES ================= */}
        {currentRoute === 'c-consulta-clientes' && (
          <div id="vista-c-consulta-clientes-wrapper" className="w-full">
            <ConsultaReservasCliente
              styleMode={styleMode}
              onBack={() => navigateTo('arquitectura')}
            />
          </div>
        )}

        {/* ================= VISTA: CONSULTA DE INDICADORES ================= */}
        {currentRoute === 'c-consulta-indicadores' && (
          <div id="vista-c-consulta-indicadores-wrapper" className="w-full">
            <ConsultaIndicadores
              styleMode={styleMode}
              onBack={() => navigateTo('arquitectura')}
            />
          </div>
        )}

        {/* ================= VISTA: CONSULTA DE VISTAS RESUMIDAS ================= */}
        {currentRoute === 'c-consulta-vistas-resumidas' && (
          <div id="vista-c-consulta-vistas-resumidas-wrapper" className="w-full">
            <ConsultaVistasResumidas
              styleMode={styleMode}
              onBack={() => navigateTo('arquitectura')}
            />
          </div>
        )}

        {/* ================= VISTA: REGISTRO DE CLIENTE (DATA ENTRY) ================= */}
        {currentRoute === 'de-registro-cliente' && (
          <div id="vista-de-registro-cliente-wrapper" className="w-full">
            <RegistroCliente
              styleMode={styleMode}
              onBack={() => navigateTo('arquitectura')}
            />
          </div>
        )}

        {/* ================= VISTA: REGISTRO DE RESERVAS (DATA ENTRY) ================= */}
        {currentRoute === 'de-registro-reservas' && (
          <div id="vista-de-registro-reservas-wrapper" className="w-full">
            <RegistroReservas
              styleMode={styleMode}
              onBack={() => navigateTo('arquitectura')}
            />
          </div>
        )}

        {/* ================= VISTA: GESTIÓN DE RESERVAS (DATA ENTRY) ================= */}
        {currentRoute === 'de-gestion-reservas' && (
          <div id="vista-de-gestion-reservas-wrapper" className="w-full">
            <GestionReservas
              styleMode={styleMode}
              onBack={() => navigateTo('arquitectura')}
            />
          </div>
        )}

        {/* ================= VISTA: POSTERGAR / CANCELAR DESPACHO (DATA ENTRY) ================= */}
        {currentRoute === 'de-postergar-cancelar' && (
          <div id="vista-de-postergar-cancelar-wrapper" className="w-full">
            <PostergarCancelarDespacho
              styleMode={styleMode}
              onBack={() => navigateTo('arquitectura')}
            />
          </div>
        )}

        {/* ================= VISTA: RECEPCIÓN / DESPACHO (DATA ENTRY) ================= */}
        {currentRoute === 'de-recepcion-despacho' && (
          <div id="vista-de-recepcion-despacho-wrapper" className="w-full">
            <RecepcionDespacho
              styleMode={styleMode}
              onBack={() => navigateTo('arquitectura')}
              onNavigateToNode={(nodeId) => navigateTo(nodeId)}
            />
          </div>
        )}

        {/* ================= VISTA: ESTADO DE RESERVAS (REPORTES) ================= */}
        {currentRoute === 'rep-estado-reservas' && (
          <div id="vista-rep-estado-reservas-wrapper" className="w-full">
            <EstadoReservas
              styleMode={styleMode}
              onBack={() => navigateTo('arquitectura')}
              onNavigateToNode={(nodeId) => navigateTo(nodeId as AppRoute)}
              onSelectOrder={setSelectedReservationId}
            />
          </div>
        )}

        {/* ================= VISTA: DETALLE DE RESERVA (REPORTES) ================= */}
        {currentRoute === 'rep-detalles-reserva' && (
          <div id="vista-rep-detalles-reserva-wrapper" className="w-full">
            <DetalleReserva
              styleMode={styleMode}
              onBack={() => navigateTo('arquitectura')}
              onNavigateToNode={(nodeId) => navigateTo(nodeId as AppRoute)}
              selectedOrderId={selectedReservationId}
              onSelectOrder={setSelectedReservationId}
            />
          </div>
        )}

        {/* ================= VISTA: HISTORIAL DE CAMBIOS DE RESERVAS (REPORTES) ================= */}
        {currentRoute === 'rep-historial-cambios' && (
          <div id="vista-rep-historial-cambios-wrapper" className="w-full">
            <HistorialCambiosReservas
              styleMode={styleMode}
              onBack={() => navigateTo('arquitectura')}
              onNavigateToNode={(nodeId) => navigateTo(nodeId)}
            />
          </div>
        )}

        {/* ================= VISTA DE MÓDULO VACÍO (PARA LOS DEMÁS CUADROS) ================= */}
        {currentRoute !== 'login' &&
          currentRoute !== 'arquitectura' &&
          currentRoute !== 'seguridad' &&
          currentRoute !== 'mp-parametros-sistema' &&
          currentRoute !== 'mp-catalogo-productos' &&
          currentRoute !== 'mp-catalogo-protocolos' &&
          currentRoute !== 'mp-detalle-protocolo' &&
          currentRoute !== 'mp-catalogo-reglas' &&
          currentRoute !== 'mp-catalogo-politicas' &&
          currentRoute !== 'mp-catalogos-mensajes' &&
          currentRoute !== 'c-consulta-clientes' &&
          currentRoute !== 'c-consulta-indicadores' &&
          currentRoute !== 'c-consulta-vistas-resumidas' &&
          currentRoute !== 'de-registro-cliente' &&
          currentRoute !== 'de-registro-reservas' &&
          currentRoute !== 'de-gestion-reservas' &&
          currentRoute !== 'de-postergar-cancelar' &&
          currentRoute !== 'de-recepcion-despacho' &&
          currentRoute !== 'rep-estado-reservas' &&
          currentRoute !== 'rep-detalles-reserva' &&
          currentRoute !== 'rep-historial-cambios' && (
            <div id={`vista-${currentRoute}-wrapper`} className="w-full">
              <EmptyModuleView
                title={currentNode?.label || 'Módulo'}
                url={currentNode?.url}
                styleMode={styleMode}
                onGoBack={() => navigateTo('arquitectura')}
              />
            </div>
          )}
      </BrowserChrome>
    </main>
  );
}
