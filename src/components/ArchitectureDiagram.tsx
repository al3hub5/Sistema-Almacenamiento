import React from 'react';
import { ArchitectureNode, DiagramStyleMode } from '../types';
import { NODES, CONNECTIONS, JUNCTION_DOTS, DIAGRAM_VIEWBOX } from '../data/diagramData';

interface ArchitectureDiagramProps {
  styleMode: DiagramStyleMode;
  hoveredNodeId: string | null;
  selectedNodeId: string | null;
  onHoverNode: (id: string | null) => void;
  onSelectNode: (id: string | null) => void;
  onNavigateToSecurity?: () => void;
  onNavigateToNode?: (node: ArchitectureNode) => void;
}

const SPLIT_LABELS: Record<string, [string, string]> = {
  // Nivel 3
  'Mantenimiento de Parámetros': ['Mantenimiento de', 'Parámetros'],

  // Columna 1
  'Parámetros del Sistema': ['Parámetros del', 'Sistema'],
  'Catálogo de Productos': ['Catálogo de', 'Productos'],
  'Catálogo de Protocolos': ['Catálogo de', 'Protocolos'],
  'Catálogo de Reglas': ['Catálogo de', 'Reglas'],
  'Catálogo de Políticas': ['Catálogo de', 'Políticas'],
  'Catálogos de Mensajes': ['Catálogos de', 'Mensajes'],

  // Columna 2
  'Consulta de Clientes': ['Consulta de', 'Clientes'],
  'Consulta de Indicadores': ['Consulta de', 'Indicadores'],
  'Consulta de Vistas Resumidas': ['Consulta de', 'Vistas Resumidas'],

  // Columna 3
  'Registro de Cliente': ['Registro de', 'Cliente'],
  'Registro de Reservas': ['Registro de', 'Reservas'],
  'Gestión de Reservas': ['Gestión de', 'Reservas'],
  'Postergar / Cancelar Despacho': ['Postergar / Cancelar', 'Despacho'],
  'Recepción / Despacho': ['Recepción /', 'Despacho'],

  // Columna 4
  'Estado de Reservas': ['Estado de', 'Reservas'],
  'Detalles de Reserva': ['Detalles de', 'Reserva'],
  'Historial de Cambios de Reservas': ['Historial de Cambios', 'de Reservas'],

  // Columna 5
  'Generación de Tickets': ['Generación de', 'Tickets'],
  'Actualización de Tablas Maestras': ['Actualización de', 'Tablas Maestras'],

  // Columna 6
  'Parámetros de Indicadores': ['Parámetros de', 'Indicadores'],
  'Parámetros de Vistas Resumidas': ['Parámetros de', 'Vistas Resumidas'],

  // Columna 7
  'Parámetros de Tablas': ['Parámetros de', 'Tablas'],
};

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
  styleMode,
  hoveredNodeId,
  selectedNodeId,
  onHoverNode,
  onSelectNode,
  onNavigateToSecurity,
  onNavigateToNode,
}) => {
  const isSketch = styleMode === 'sketch';

  // Render label sin negrita (font-normal), con primera letra mayúscula salvo conectores
  const renderLabel = (node: ArchitectureNode) => {
    const cx = node.x + node.width / 2;
    const cy = node.y + node.height / 2;

    const split = SPLIT_LABELS[node.label];

    if (split) {
      const fontSizeClass =
        node.level === 3
          ? isSketch
            ? 'text-[14px]'
            : 'text-[12px]'
          : isSketch
          ? 'text-[13px]'
          : 'text-[11px]';

      return (
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          fontWeight="normal"
          className={`select-none pointer-events-none fill-zinc-900 font-normal ${
            isSketch ? 'font-sketch' : 'font-tech'
          } ${fontSizeClass}`}
        >
          <tspan x={cx} dy="-0.55em">
            {split[0]}
          </tspan>
          <tspan x={cx} dy="1.15em">
            {split[1]}
          </tspan>
        </text>
      );
    }

    const fontSizeClass =
      node.level === 0
        ? isSketch
          ? 'text-[17px] tracking-wide'
          : 'text-[13.5px] tracking-wider'
        : node.level === 1
        ? isSketch
          ? 'text-[15.5px]'
          : 'text-[12.5px] tracking-wide'
        : node.level === 2
        ? isSketch
          ? 'text-[14.5px]'
          : 'text-[12px] tracking-wide'
        : node.level === 3
        ? isSketch
          ? 'text-[14px]'
          : 'text-[12px]'
        : isSketch
        ? 'text-[13px]'
        : 'text-[11px]';

    return (
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fontWeight="normal"
        className={`select-none pointer-events-none fill-zinc-900 font-normal ${
          isSketch ? 'font-sketch' : 'font-tech'
        } ${fontSizeClass}`}
      >
        {node.label}
      </text>
    );
  };

  return (
    <div className="w-full overflow-x-auto py-2">
      <svg
        id="architecture-svg-canvas"
        viewBox={`0 0 ${DIAGRAM_VIEWBOX.width} ${DIAGRAM_VIEWBOX.height}`}
        className="w-full h-auto min-w-[1200px] max-w-[1840px] mx-auto block select-none"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Subtle pencil/hand-drawn wobble filter for sketch mode */}
          <filter id="hand-drawn-filter" x="-4%" y="-4%" width="108%" height="108%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={isSketch ? 1.4 : 0}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Drop shadow for wireframe boxes */}
          <filter id="box-shadow" x="-10%" y="-10%" width="125%" height="125%">
            <feDropShadow
              dx={isSketch ? '3' : '2.5'}
              dy={isSketch ? '3' : '2.5'}
              stdDeviation={isSketch ? '0.5' : '0'}
              floodColor="#18181b"
              floodOpacity={isSketch ? '0.85' : '0.95'}
            />
          </filter>

          {/* Hover highlight shadow */}
          <filter id="hover-shadow" x="-10%" y="-10%" width="125%" height="125%">
            <feDropShadow
              dx="4"
              dy="4"
              stdDeviation="1"
              floodColor="#000000"
              floodOpacity="1"
            />
          </filter>
        </defs>

        {/* ================= Connection Lines Layer ================= */}
        <g
          id="connections-layer"
          filter={isSketch ? 'url(#hand-drawn-filter)' : undefined}
        >
          {CONNECTIONS.map((conn) => {
            return (
              <g key={conn.id} id={`conn-${conn.id}`}>
                {/* Main simple connection line */}
                <path
                  d={conn.path}
                  fill="none"
                  stroke="#18181b"
                  strokeWidth={isSketch ? 2 : 1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-colors duration-150"
                />

                {/* In sketch mode, a subtle ghost understroke for hand-drawn character */}
                {isSketch && (
                  <path
                    d={conn.path}
                    fill="none"
                    stroke="#71717a"
                    strokeWidth={0.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="4 2"
                    opacity={0.3}
                    transform="translate(0.5, 0.5)"
                  />
                )}
              </g>
            );
          })}

          {/* Junction anchor dots at line branching nodes */}
          <g id="junction-dots" fill="#18181b">
            {JUNCTION_DOTS.map((dot, idx) => (
              <circle
                key={`dot-${idx}`}
                cx={dot.cx}
                cy={dot.cy}
                r={isSketch ? 3.5 : 3}
              />
            ))}
          </g>
        </g>

        {/* ================= Rectangular Boxes Layer ================= */}
        <g id="boxes-layer">
          {NODES.map((node) => {
            const isHovered = hoveredNodeId === node.id;
            const isSelected = selectedNodeId === node.id;

            // Box styling: pure white fill with solid dark wireframe border
            let strokeColor = '#18181b';
            let strokeWidth = isSketch ? 2 : 1.75;
            let fill = '#ffffff';

            if (isHovered) {
              strokeColor = '#000000';
              strokeWidth = 2.5;
              fill = '#f4f4f5';
            } else if (isSelected) {
              strokeColor = '#000000';
              strokeWidth = 2.5;
              fill = '#e4e4e7';
            }

            // Distinguish levels slightly with subtle background accents
            if (!isHovered && !isSelected) {
              if (node.level === 0) fill = '#ffffff';
              else if (node.level === 1) fill = '#fafafa';
              else if (node.level === 2) fill = '#ffffff';
              else if (node.level === 3) fill = '#f8fafc';
              else fill = '#ffffff';
            }

            const cornerRadius = isSketch ? 2 : 0;
            const isSecurityNode = node.id === 'seguridad';
            const hasVerBadge = isSecurityNode || Boolean(node.url);

            return (
              <g
                key={node.id}
                id={`node-${node.id}`}
                className="cursor-pointer transition-transform duration-100"
                onMouseEnter={() => onHoverNode(node.id)}
                onMouseLeave={() => onHoverNode(null)}
                onClick={() => {
                  if (isSecurityNode && onNavigateToSecurity) {
                    onNavigateToSecurity();
                  } else if (node.url && onNavigateToNode) {
                    onNavigateToNode(node);
                  } else {
                    onSelectNode(isSelected ? null : node.id);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                {/* The rectangular box */}
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.width}
                  height={node.height}
                  rx={cornerRadius}
                  ry={cornerRadius}
                  fill={fill}
                  stroke={isHovered ? '#2563eb' : strokeColor}
                  strokeWidth={strokeWidth}
                  filter={
                    isHovered || isSelected
                      ? 'url(#hover-shadow)'
                      : 'url(#box-shadow)'
                  }
                  className="transition-colors duration-150"
                />

                {/* Hand-drawn sketch extra outline or hatch when in sketch mode */}
                {isSketch && (
                  <rect
                    x={node.x + 1}
                    y={node.y + 1}
                    width={node.width - 2}
                    height={node.height - 2}
                    fill="none"
                    stroke="#71717a"
                    strokeWidth={0.6}
                    strokeDasharray="6 3"
                    opacity={0.35}
                    className="pointer-events-none"
                  />
                )}

                {/* Cuadrito indicador ("VER ↗") con fondo negro (azul al hover) para Seguridad y todos los cuadros inferiores */}
                {hasVerBadge && (
                  <g className="pointer-events-none select-none">
                    <rect
                      x={node.x + node.width - 44}
                      y={node.y + 3}
                      width={40}
                      height={13}
                      fill={isHovered ? '#2563eb' : '#18181b'}
                      rx={1}
                    />
                    <text
                      x={node.x + node.width - 24}
                      y={node.y + 12}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="8.5px"
                      fontFamily="monospace"
                      fontWeight="normal"
                    >
                      VER ↗
                    </text>
                  </g>
                )}

                {/* Level indicator tick on the top-left corner for root */}
                {node.level === 0 && (
                  <line
                    x1={node.x + 4}
                    y1={node.y + 4}
                    x2={node.x + 14}
                    y2={node.y + 4}
                    stroke="#18181b"
                    strokeWidth={1.5}
                  />
                )}

                {/* Label inside the box */}
                {renderLabel(node)}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};
