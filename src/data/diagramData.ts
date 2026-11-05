import { ArchitectureNode, ConnectionLine } from '../types';

export const DIAGRAM_VIEWBOX = {
  width: 1840,
  height: 780,
};

export const NODES: ArchitectureNode[] = [
  // ================= Root Level (Nivel 0) =================
  {
    id: 'almacenamiento',
    label: 'Almacenamiento',
    level: 0,
    x: 791,
    y: 30,
    width: 240,
    height: 48,
  },

  // ================= Nivel 1 =================
  {
    id: 'seguridad',
    label: 'Seguridad',
    level: 1,
    parentId: 'almacenamiento',
    x: 520,
    y: 30,
    width: 190,
    height: 48,
  },
  {
    id: 'on-line',
    label: 'On-Line',
    level: 1,
    parentId: 'almacenamiento',
    x: 353,
    y: 135,
    width: 230,
    height: 48,
  },
  {
    id: 'batch',
    label: 'Batch',
    level: 1,
    parentId: 'almacenamiento',
    x: 1239,
    y: 135,
    width: 230,
    height: 48,
  },

  // ================= Nivel 2 - Bajo On-Line =================
  {
    id: 'gerencial',
    label: 'Gerencial',
    level: 2,
    parentId: 'on-line',
    x: 135,
    y: 235,
    width: 230,
    height: 48,
  },
  {
    id: 'operativo',
    label: 'Operativo',
    level: 2,
    parentId: 'on-line',
    x: 571,
    y: 235,
    width: 230,
    height: 48,
  },

  // ================= Nivel 2 - Bajo Batch =================
  {
    id: 'aplicativo',
    label: 'Aplicativo',
    level: 2,
    parentId: 'batch',
    x: 1021,
    y: 235,
    width: 230,
    height: 48,
  },
  {
    id: 'tecnico',
    label: 'Técnico',
    level: 2,
    parentId: 'batch',
    x: 1457,
    y: 235,
    width: 230,
    height: 48,
  },

  // ================= Nivel 3 - Los 8 Módulos de Cabecera =================
  // Bajo Gerencial
  {
    id: 'mantenimiento-parametros',
    label: 'Mantenimiento de Parámetros',
    level: 3,
    parentId: 'gerencial',
    x: 50,
    y: 335,
    width: 190,
    height: 48,
  },
  {
    id: 'consultas',
    label: 'Consultas',
    level: 3,
    parentId: 'gerencial',
    x: 260,
    y: 335,
    width: 190,
    height: 48,
  },

  // Bajo Operativo
  {
    id: 'data-entry',
    label: 'Data Entry',
    level: 3,
    parentId: 'operativo',
    x: 486,
    y: 335,
    width: 190,
    height: 48,
  },
  {
    id: 'reportes',
    label: 'Reportes',
    level: 3,
    parentId: 'operativo',
    x: 696,
    y: 335,
    width: 190,
    height: 48,
  },

  // Bajo Aplicativo
  {
    id: 'actualizar-bd',
    label: 'Actualizar BD',
    level: 3,
    parentId: 'aplicativo',
    x: 936,
    y: 335,
    width: 190,
    height: 48,
  },
  {
    id: 'estadisticas',
    label: 'Estadísticas',
    level: 3,
    parentId: 'aplicativo',
    x: 1146,
    y: 335,
    width: 190,
    height: 48,
  },

  // Bajo Técnico
  {
    id: 'mantenimiento-bd',
    label: 'Mantenimiento de BD',
    level: 3,
    parentId: 'tecnico',
    x: 1372,
    y: 335,
    width: 190,
    height: 48,
  },
  {
    id: 'contingencia',
    label: 'Contingencia',
    level: 3,
    parentId: 'tecnico',
    x: 1582,
    y: 335,
    width: 190,
    height: 48,
  },

  // ================= Nivel 4 - Cuadros Verticales =================

  // --- 1. Mantenimiento de Parámetros (Columna 1: x=50) ---
  {
    id: 'mp-parametros-sistema',
    label: 'Parámetros del Sistema',
    level: 4,
    parentId: 'mantenimiento-parametros',
    x: 50,
    y: 412,
    width: 190,
    height: 42,
    url: 'http://sistema-almacen.com/parametros/sistema',
  },
  {
    id: 'mp-catalogo-productos',
    label: 'Catálogo de Productos',
    level: 4,
    parentId: 'mantenimiento-parametros',
    x: 50,
    y: 470,
    width: 190,
    height: 42,
    url: 'http://sistema-almacen.com/parametros/catalogo-productos',
  },
  {
    id: 'mp-catalogo-protocolos',
    label: 'Catálogo de Protocolos',
    level: 4,
    parentId: 'mantenimiento-parametros',
    x: 50,
    y: 528,
    width: 190,
    height: 42,
    url: 'http://sistema-almacen.com/parametros/catalogo-protocolos',
  },
  {
    id: 'mp-catalogo-reglas',
    label: 'Catálogo de Reglas',
    level: 4,
    parentId: 'mantenimiento-parametros',
    x: 50,
    y: 586,
    width: 190,
    height: 42,
    url: 'http://sistema-almacen.com/parametros/catalogo-reglas',
  },
  {
    id: 'mp-catalogo-politicas',
    label: 'Catálogo de Políticas',
    level: 4,
    parentId: 'mantenimiento-parametros',
    x: 50,
    y: 644,
    width: 190,
    height: 42,
    url: 'http://sistema-almacen.com/parametros/catalogo-politicas',
  },
  {
    id: 'mp-catalogos-mensajes',
    label: 'Catálogos de Mensajes',
    level: 4,
    parentId: 'mantenimiento-parametros',
    x: 50,
    y: 702,
    width: 190,
    height: 42,
    url: 'http://sistema-almacen.com/parametros/catalogos-mensajes',
  },

  // --- 2. Consultas (Columna 2: x=260) ---
  {
    id: 'c-consulta-clientes',
    label: 'Consulta de Clientes',
    level: 4,
    parentId: 'consultas',
    x: 260,
    y: 412,
    width: 190,
    height: 42,
    url: 'http://sistema-almacen.com/consultas/clientes',
  },
  {
    id: 'c-consulta-indicadores',
    label: 'Consulta de Indicadores',
    level: 4,
    parentId: 'consultas',
    x: 260,
    y: 470,
    width: 190,
    height: 42,
    url: 'http://sistema-almacen.com/consultas/indicadores',
  },
  {
    id: 'c-consulta-vistas-resumidas',
    label: 'Consulta de Vistas Resumidas',
    level: 4,
    parentId: 'consultas',
    x: 260,
    y: 528,
    width: 190,
    height: 42,
    url: 'http://sistema-almacen.com/consultas/vistas-resumidas',
  },

  // --- 3. Data Entry (Columna 3: x=486) ---
  {
    id: 'de-registro-cliente',
    label: 'Registro de Cliente',
    level: 4,
    parentId: 'data-entry',
    x: 486,
    y: 412,
    width: 190,
    height: 42,
    url: 'http://sistema-almacen.com/data-entry/registro-cliente',
  },
  {
    id: 'de-registro-reservas',
    label: 'Registro de Reservas',
    level: 4,
    parentId: 'data-entry',
    x: 486,
    y: 470,
    width: 190,
    height: 42,
    url: 'http://sistema-almacen.com/data-entry/registro-reservas',
  },
  {
    id: 'de-gestion-reservas',
    label: 'Gestión de Reservas',
    level: 4,
    parentId: 'data-entry',
    x: 486,
    y: 528,
    width: 190,
    height: 42,
    url: 'http://sistema-almacen.com/data-entry/gestion-reservas',
  },
  {
    id: 'de-postergar-cancelar',
    label: 'Postergar / Cancelar Despacho',
    level: 4,
    parentId: 'data-entry',
    x: 486,
    y: 586,
    width: 190,
    height: 42,
    url: 'http://sistema-almacen.com/data-entry/postergar-cancelar',
  },
  {
    id: 'de-recepcion-despacho',
    label: 'Recepción / Despacho',
    level: 4,
    parentId: 'data-entry',
    x: 486,
    y: 644,
    width: 190,
    height: 42,
    url: 'http://sistema-almacen.com/data-entry/recepcion-despacho',
  },

  // --- 4. Reportes (Columna 4: x=696) ---
  {
    id: 'rep-estado-reservas',
    label: 'Estado de Reservas',
    level: 4,
    parentId: 'reportes',
    x: 696,
    y: 412,
    width: 190,
    height: 42,
    url: 'http://sistema-almacen.com/reportes/estado-reservas',
  },
  {
    id: 'rep-detalles-reserva',
    label: 'Detalles de Reserva',
    level: 4,
    parentId: 'reportes',
    x: 696,
    y: 470,
    width: 190,
    height: 42,
    url: 'http://sistema-almacen.com/reportes/detalles-reserva',
  },
  {
    id: 'rep-historial-cambios',
    label: 'Historial de Cambios de Reservas',
    level: 4,
    parentId: 'reportes',
    x: 696,
    y: 528,
    width: 190,
    height: 42,
    url: 'http://sistema-almacen.com/reportes/historial-cambios',
  },

  // --- 5. Actualizar BD (Columna 5: x=936) ---
  {
    id: 'abd-generacion-tickets',
    label: 'Generación de Tickets',
    level: 4,
    parentId: 'actualizar-bd',
    x: 936,
    y: 412,
    width: 190,
    height: 42,
    url: 'http://sistema-almacen.com/actualizar-bd/generacion-tickets',
  },
  {
    id: 'abd-tablas-maestras',
    label: 'Tablas Maestras',
    level: 4,
    parentId: 'actualizar-bd',
    x: 936,
    y: 470,
    width: 190,
    height: 42,
    url: 'http://sistema-almacen.com/actualizar-bd/tablas-maestras',
  },
  {
    id: 'abd-actualizacion-tablas',
    label: 'Actualización de Tablas Maestras',
    level: 4,
    parentId: 'actualizar-bd',
    x: 936,
    y: 528,
    width: 190,
    height: 42,
    url: 'http://sistema-almacen.com/actualizar-bd/actualizacion-tablas-maestras',
  },

  // --- 6. Estadísticas (Columna 6: x=1146) ---
  {
    id: 'est-parametros-indicadores',
    label: 'Parámetros de Indicadores',
    level: 4,
    parentId: 'estadisticas',
    x: 1146,
    y: 412,
    width: 190,
    height: 42,
    url: 'http://sistema-almacen.com/estadisticas/parametros-indicadores',
  },
  {
    id: 'est-parametros-vistas',
    label: 'Parámetros de Vistas Resumidas',
    level: 4,
    parentId: 'estadisticas',
    x: 1146,
    y: 470,
    width: 190,
    height: 42,
    url: 'http://sistema-almacen.com/estadisticas/parametros-vistas-resumidas',
  },

  // --- 7. Mantenimiento de BD (Columna 7: x=1372) ---
  {
    id: 'mbd-parametros-tablas',
    label: 'Parámetros de Tablas',
    level: 4,
    parentId: 'mantenimiento-bd',
    x: 1372,
    y: 412,
    width: 190,
    height: 42,
    url: 'http://sistema-almacen.com/mantenimiento-bd/parametros-tablas',
  },

  // --- 8. Contingencia (Columna 8: x=1582) ---
  {
    id: 'ctg-backup',
    label: 'Backup',
    level: 4,
    parentId: 'contingencia',
    x: 1582,
    y: 412,
    width: 190,
    height: 42,
    url: 'http://sistema-almacen.com/contingencia/backup',
  },
  {
    id: 'ctg-restauracion',
    label: 'Restauración',
    level: 4,
    parentId: 'contingencia',
    x: 1582,
    y: 470,
    width: 190,
    height: 42,
    url: 'http://sistema-almacen.com/contingencia/restauracion',
  },
];

export const CONNECTIONS: ConnectionLine[] = [
  // Conexión de Seguridad: Se conecta a la línea que sale justo por debajo del cuadro Almacenamiento
  {
    id: 'almacenamiento-to-seguridad',
    fromId: 'almacenamiento',
    toId: 'seguridad',
    path: 'M 911 92 L 615 92 L 615 78',
  },

  // Línea vertical que desciende justo por debajo del cuadro Almacenamiento hasta el bus On-Line / Batch
  {
    id: 'almacenamiento-to-bus',
    fromId: 'almacenamiento',
    toId: 'on-line',
    path: 'M 911 78 L 911 105',
  },
  {
    id: 'online-batch-bus',
    fromId: 'on-line',
    toId: 'batch',
    path: 'M 468 105 L 1354 105',
  },
  {
    id: 'bus-to-online',
    fromId: 'almacenamiento',
    toId: 'on-line',
    path: 'M 468 105 L 468 135',
  },
  {
    id: 'bus-to-batch',
    fromId: 'almacenamiento',
    toId: 'batch',
    path: 'M 1354 105 L 1354 135',
  },

  // On-Line down to Gerencial and Operativo
  {
    id: 'online-to-bus',
    fromId: 'on-line',
    toId: 'gerencial',
    path: 'M 468 183 L 468 210',
  },
  {
    id: 'gerencial-operativo-bus',
    fromId: 'gerencial',
    toId: 'operativo',
    path: 'M 250 210 L 686 210',
  },
  {
    id: 'bus-to-gerencial',
    fromId: 'on-line',
    toId: 'gerencial',
    path: 'M 250 210 L 250 235',
  },
  {
    id: 'bus-to-operativo',
    fromId: 'on-line',
    toId: 'operativo',
    path: 'M 686 210 L 686 235',
  },

  // Batch down to Aplicativo and Técnico
  {
    id: 'batch-to-bus',
    fromId: 'batch',
    toId: 'aplicativo',
    path: 'M 1354 183 L 1354 210',
  },
  {
    id: 'aplicativo-tecnico-bus',
    fromId: 'aplicativo',
    toId: 'tecnico',
    path: 'M 1136 210 L 1572 210',
  },
  {
    id: 'bus-to-aplicativo',
    fromId: 'batch',
    toId: 'aplicativo',
    path: 'M 1136 210 L 1136 235',
  },
  {
    id: 'bus-to-tecnico',
    fromId: 'batch',
    toId: 'tecnico',
    path: 'M 1572 210 L 1572 235',
  },

  // Gerencial down to Mantenimiento de Parámetros and Consultas
  {
    id: 'gerencial-to-bus',
    fromId: 'gerencial',
    toId: 'mantenimiento-parametros',
    path: 'M 250 283 L 250 310',
  },
  {
    id: 'mp-consultas-bus',
    fromId: 'mantenimiento-parametros',
    toId: 'consultas',
    path: 'M 145 310 L 355 310',
  },
  {
    id: 'bus-to-mp',
    fromId: 'gerencial',
    toId: 'mantenimiento-parametros',
    path: 'M 145 310 L 145 335',
  },
  {
    id: 'bus-to-consultas',
    fromId: 'gerencial',
    toId: 'consultas',
    path: 'M 355 310 L 355 335',
  },

  // Operativo down to Data Entry and Reportes
  {
    id: 'operativo-to-bus',
    fromId: 'operativo',
    toId: 'data-entry',
    path: 'M 686 283 L 686 310',
  },
  {
    id: 'de-reportes-bus',
    fromId: 'data-entry',
    toId: 'reportes',
    path: 'M 581 310 L 791 310',
  },
  {
    id: 'bus-to-de',
    fromId: 'operativo',
    toId: 'data-entry',
    path: 'M 581 310 L 581 335',
  },
  {
    id: 'bus-to-reportes',
    fromId: 'operativo',
    toId: 'reportes',
    path: 'M 791 310 L 791 335',
  },

  // Aplicativo down to Actualizar BD and Estadísticas
  {
    id: 'aplicativo-to-bus',
    fromId: 'aplicativo',
    toId: 'actualizar-bd',
    path: 'M 1136 283 L 1136 310',
  },
  {
    id: 'abd-estadisticas-bus',
    fromId: 'actualizar-bd',
    toId: 'estadisticas',
    path: 'M 1031 310 L 1241 310',
  },
  {
    id: 'bus-to-abd',
    fromId: 'aplicativo',
    toId: 'actualizar-bd',
    path: 'M 1031 310 L 1031 335',
  },
  {
    id: 'bus-to-estadisticas',
    fromId: 'aplicativo',
    toId: 'estadisticas',
    path: 'M 1241 310 L 1241 335',
  },

  // Técnico down to Mantenimiento de BD and Contingencia
  {
    id: 'tecnico-to-bus',
    fromId: 'tecnico',
    toId: 'mantenimiento-bd',
    path: 'M 1572 283 L 1572 310',
  },
  {
    id: 'mbd-contingencia-bus',
    fromId: 'mantenimiento-bd',
    toId: 'contingencia',
    path: 'M 1467 310 L 1677 310',
  },
  {
    id: 'bus-to-mbd',
    fromId: 'tecnico',
    toId: 'mantenimiento-bd',
    path: 'M 1467 310 L 1467 335',
  },
  {
    id: 'bus-to-contingencia',
    fromId: 'tecnico',
    toId: 'contingencia',
    path: 'M 1677 310 L 1677 335',
  },

  // ================= Conexiones Verticales de Cada Columna =================

  // Columna 1 (Mantenimiento de Parámetros: 6 cajas)
  { id: 'v-mp-1', fromId: 'mantenimiento-parametros', toId: 'mp-parametros-sistema', path: 'M 145 383 L 145 412' },
  { id: 'v-mp-2', fromId: 'mp-parametros-sistema', toId: 'mp-catalogo-productos', path: 'M 145 454 L 145 470' },
  { id: 'v-mp-3', fromId: 'mp-catalogo-productos', toId: 'mp-catalogo-protocolos', path: 'M 145 512 L 145 528' },
  { id: 'v-mp-4', fromId: 'mp-catalogo-protocolos', toId: 'mp-catalogo-reglas', path: 'M 145 570 L 145 586' },
  { id: 'v-mp-5', fromId: 'mp-catalogo-reglas', toId: 'mp-catalogo-politicas', path: 'M 145 628 L 145 644' },
  { id: 'v-mp-6', fromId: 'mp-catalogo-politicas', toId: 'mp-catalogos-mensajes', path: 'M 145 686 L 145 702' },

  // Columna 2 (Consultas: 3 cajas)
  { id: 'v-c-1', fromId: 'consultas', toId: 'c-consulta-clientes', path: 'M 355 383 L 355 412' },
  { id: 'v-c-2', fromId: 'c-consulta-clientes', toId: 'c-consulta-indicadores', path: 'M 355 454 L 355 470' },
  { id: 'v-c-3', fromId: 'c-consulta-indicadores', toId: 'c-consulta-vistas-resumidas', path: 'M 355 512 L 355 528' },

  // Columna 3 (Data Entry: 5 cajas)
  { id: 'v-de-1', fromId: 'data-entry', toId: 'de-registro-cliente', path: 'M 581 383 L 581 412' },
  { id: 'v-de-2', fromId: 'de-registro-cliente', toId: 'de-registro-reservas', path: 'M 581 454 L 581 470' },
  { id: 'v-de-3', fromId: 'de-registro-reservas', toId: 'de-gestion-reservas', path: 'M 581 512 L 581 528' },
  { id: 'v-de-4', fromId: 'de-gestion-reservas', toId: 'de-postergar-cancelar', path: 'M 581 570 L 581 586' },
  { id: 'v-de-5', fromId: 'de-postergar-cancelar', toId: 'de-recepcion-despacho', path: 'M 581 628 L 581 644' },

  // Columna 4 (Reportes: 3 cajas)
  { id: 'v-rep-1', fromId: 'reportes', toId: 'rep-estado-reservas', path: 'M 791 383 L 791 412' },
  { id: 'v-rep-2', fromId: 'rep-estado-reservas', toId: 'rep-detalles-reserva', path: 'M 791 454 L 791 470' },
  { id: 'v-rep-3', fromId: 'rep-detalles-reserva', toId: 'rep-historial-cambios', path: 'M 791 512 L 791 528' },

  // Columna 5 (Actualizar BD: 3 cajas)
  { id: 'v-abd-1', fromId: 'actualizar-bd', toId: 'abd-generacion-tickets', path: 'M 1031 383 L 1031 412' },
  { id: 'v-abd-2', fromId: 'abd-generacion-tickets', toId: 'abd-tablas-maestras', path: 'M 1031 454 L 1031 470' },
  { id: 'v-abd-3', fromId: 'abd-tablas-maestras', toId: 'abd-actualizacion-tablas', path: 'M 1031 512 L 1031 528' },

  // Columna 6 (Estadísticas: 2 cajas)
  { id: 'v-est-1', fromId: 'estadisticas', toId: 'est-parametros-indicadores', path: 'M 1241 383 L 1241 412' },
  { id: 'v-est-2', fromId: 'est-parametros-indicadores', toId: 'est-parametros-vistas', path: 'M 1241 454 L 1241 470' },

  // Columna 7 (Mantenimiento de BD: 1 caja)
  { id: 'v-mbd-1', fromId: 'mantenimiento-bd', toId: 'mbd-parametros-tablas', path: 'M 1467 383 L 1467 412' },

  // Columna 8 (Contingencia: 2 cajas)
  { id: 'v-ctg-1', fromId: 'contingencia', toId: 'ctg-backup', path: 'M 1677 383 L 1677 412' },
  { id: 'v-ctg-2', fromId: 'ctg-backup', toId: 'ctg-restauracion', path: 'M 1677 454 L 1677 470' },
];

export const JUNCTION_DOTS = [
  // Punto de ramificación para Seguridad (sale justo por debajo del cuadro Almacenamiento)
  { cx: 911, cy: 92 },

  // On-Line / Batch bus
  { cx: 911, cy: 105 },
  { cx: 468, cy: 105 },
  { cx: 1354, cy: 105 },

  // Gerencial / Operativo bus
  { cx: 468, cy: 210 },
  { cx: 250, cy: 210 },
  { cx: 686, cy: 210 },

  // Aplicativo / Técnico bus
  { cx: 1354, cy: 210 },
  { cx: 1136, cy: 210 },
  { cx: 1572, cy: 210 },

  // Gerencial -> MP / Consultas bus
  { cx: 250, cy: 310 },
  { cx: 145, cy: 310 },
  { cx: 355, cy: 310 },

  // Operativo -> DE / Reportes bus
  { cx: 686, cy: 310 },
  { cx: 581, cy: 310 },
  { cx: 791, cy: 310 },

  // Aplicativo -> ABD / Estadísticas bus
  { cx: 1136, cy: 310 },
  { cx: 1031, cy: 310 },
  { cx: 1241, cy: 310 },

  // Técnico -> MBD / Contingencia bus
  { cx: 1572, cy: 310 },
  { cx: 1467, cy: 310 },
  { cx: 1677, cy: 310 },
];
