export interface RuleItem {
  code: string;
  description: string;
  variable: string;
  operator: string;
  targetValue: string;
  actionIfTrue: string;
}

export interface StepItem {
  stepNumber: number;
  activity: string;
  maxTimeMinutes: number;
  associatedRule: string;
}

export interface ProtocolItem {
  code: string;
  description: string;
  type: 'Recepción' | 'Despacho' | 'Interno';
  responsible: string;
  steps: StepItem[];
}

export const INITIAL_RULES: RuleItem[] = [
  {
    code: 'REG-001',
    description: 'Validación de cita activa y documento de ingreso',
    variable: 'Estado de Cita en Muelle',
    operator: '=',
    targetValue: 'Programada',
    actionIfTrue: 'Autorizar ingreso del vehículo a muelle',
  },
  {
    code: 'REG-002',
    description: 'Control de puntualidad del transporte en muelle',
    variable: 'Minutos de Retraso',
    operator: '<=',
    targetValue: '15',
    actionIfTrue: 'Mantener turno de atención sin recargo',
  },
  {
    code: 'REG-003',
    description: 'Verificación de conteo físico contra orden',
    variable: 'Diferencia de Bultos',
    operator: '=',
    targetValue: '0',
    actionIfTrue: 'Confirmar recepción conforme de mercadería',
  },
  {
    code: 'REG-004',
    description: 'Control de temperatura en recepción refrigerada',
    variable: 'Temperatura de Zona (°C)',
    operator: '<=',
    targetValue: '5',
    actionIfTrue: 'Autorizar ingreso de lote a cámara fría',
  },
  {
    code: 'REG-005',
    description: 'Control de peso máximo por contenedor o pallet',
    variable: 'Peso del Contenedor (kg)',
    operator: '<=',
    targetValue: '1000',
    actionIfTrue: 'Permitir elevación y ubicación en rack',
  },
  {
    code: 'REG-006',
    description: 'Validación de capacidad libre en ubicación destino',
    variable: 'Capacidad de Ubicación (%)',
    operator: '<=',
    targetValue: '85',
    actionIfTrue: 'Confirmar asignación de ubicación en pasillo',
  },
  {
    code: 'REG-007',
    description: 'Prioridad de salida por fecha de vencimiento (FEFO)',
    variable: 'Días para Vencimiento',
    operator: '>=',
    targetValue: '30',
    actionIfTrue: 'Asignar lote más próximo a vencer al picking',
  },
  {
    code: 'REG-008',
    description: 'Verificación de stock disponible para reserva',
    variable: 'Stock Disponible (Cajas)',
    operator: '>=',
    targetValue: 'Cantidad Solicitada',
    actionIfTrue: 'Comprometer stock y generar orden de extracción',
  },
  {
    code: 'REG-009',
    description: 'Conformidad de bultos antes del cierre de despacho',
    variable: 'Pallets Verificados en Muelle',
    operator: '=',
    targetValue: 'Pallets Solicitados',
    actionIfTrue: 'Autorizar carga en camión y cerrar despacho',
  },
  {
    code: 'REG-010',
    description: 'Tolerancia de diferencia en auditoría de inventario',
    variable: 'Variación de Conteo (%)',
    operator: '<=',
    targetValue: '1',
    actionIfTrue: 'Validar saldo de ubicación sin bloqueo',
  },
];

export const INITIAL_PROTOCOLS: ProtocolItem[] = [
  {
    code: 'PRO-INB',
    description: 'Protocolo de Recepción y Descarga en Muelle',
    type: 'Recepción',
    responsible: 'Operador de Recepción',
    steps: [
      {
        stepNumber: 1,
        activity: 'Verificar cita programada y documentación del transportista en garita',
        maxTimeMinutes: 10,
        associatedRule: 'REG-001 (Validación de cita activa y documento de ingreso)',
      },
      {
        stepNumber: 2,
        activity: 'Registrar hora de arribo del camión y validar puntualidad en muelle',
        maxTimeMinutes: 5,
        associatedRule: 'REG-002 (Control de puntualidad del transporte en muelle)',
      },
      {
        stepNumber: 3,
        activity: 'Descargar pallets en zona de recepción y realizar conteo físico de cajas',
        maxTimeMinutes: 25,
        associatedRule: 'REG-003 (Verificación de conteo físico contra orden)',
      },
      {
        stepNumber: 4,
        activity: 'Medir temperatura de los lotes refrigerados antes de su ingreso',
        maxTimeMinutes: 10,
        associatedRule: 'REG-004 (Control de temperatura en recepción refrigerada)',
      },
    ],
  },
  {
    code: 'PRO-PUT',
    description: 'Protocolo de Almacenamiento y Ubicación en Rack',
    type: 'Recepción',
    responsible: 'Operador de Montacargas',
    steps: [
      {
        stepNumber: 1,
        activity: 'Escanear etiqueta del pallet recepcionado y verificar peso en báscula',
        maxTimeMinutes: 10,
        associatedRule: 'REG-005 (Control de peso máximo por contenedor o pallet)',
      },
      {
        stepNumber: 2,
        activity: 'Consultar ubicación sugerida y comprobar espacio libre en el pasillo',
        maxTimeMinutes: 5,
        associatedRule: 'REG-006 (Validación de capacidad libre en ubicación destino)',
      },
      {
        stepNumber: 3,
        activity: 'Trasladar pallet con montacargas, depositar en nivel de rack y confirmar ubicación',
        maxTimeMinutes: 15,
        associatedRule: 'REG-006 (Validación de capacidad libre en ubicación destino)',
      },
    ],
  },
  {
    code: 'PRO-PCK',
    description: 'Protocolo de Extracción y Picking de Pedidos',
    type: 'Despacho',
    responsible: 'Operador de Picking',
    steps: [
      {
        stepNumber: 1,
        activity: 'Recepcionar orden de reserva y verificar disponibilidad del stock comprometido',
        maxTimeMinutes: 5,
        associatedRule: 'REG-008 (Verificación de stock disponible para reserva)',
      },
      {
        stepNumber: 2,
        activity: 'Identificar lote asignado priorizando fecha de vencimiento más próxima (FEFO)',
        maxTimeMinutes: 10,
        associatedRule: 'REG-007 (Prioridad de salida por fecha de vencimiento (FEFO))',
      },
      {
        stepNumber: 3,
        activity: 'Extraer cajas de la ubicación indicada y conformar el pallet de salida',
        maxTimeMinutes: 25,
        associatedRule: 'REG-005 (Control de peso máximo por contenedor o pallet)',
      },
      {
        stepNumber: 4,
        activity: 'Trasladar los pallets extraídos hacia la zona de pre-despacho',
        maxTimeMinutes: 10,
        associatedRule: 'REG-009 (Conformidad de bultos antes del cierre de despacho)',
      },
    ],
  },
  {
    code: 'PRO-OUT',
    description: 'Protocolo de Consolidación y Despacho en Muelle',
    type: 'Despacho',
    responsible: 'Operador de Despacho',
    steps: [
      {
        stepNumber: 1,
        activity: 'Validar llegada del vehículo asignado a la cita de salida en el muelle',
        maxTimeMinutes: 10,
        associatedRule: 'REG-002 (Control de puntualidad del transporte en muelle)',
      },
      {
        stepNumber: 2,
        activity: 'Cotejar cantidad de pallets listos contra la orden de reserva del cliente',
        maxTimeMinutes: 15,
        associatedRule: 'REG-009 (Conformidad de bultos antes del cierre de despacho)',
      },
      {
        stepNumber: 3,
        activity: 'Cargar mercadería en la unidad de transporte, colocar precinto y cerrar orden',
        maxTimeMinutes: 20,
        associatedRule: 'REG-009 (Conformidad de bultos antes del cierre de despacho)',
      },
    ],
  },
  {
    code: 'PRO-INV',
    description: 'Protocolo de Conteo Cíclico y Auditoría de Stock',
    type: 'Interno',
    responsible: 'Auditor de Inventario',
    steps: [
      {
        stepNumber: 1,
        activity: 'Seleccionar pasillo y bloquear temporalmente movimientos en las ubicaciones a auditar',
        maxTimeMinutes: 10,
        associatedRule: 'REG-006 (Validación de capacidad libre en ubicación destino)',
      },
      {
        stepNumber: 2,
        activity: 'Efectuar conteo físico ciego de cajas por lote y comparar con saldo del sistema',
        maxTimeMinutes: 30,
        associatedRule: 'REG-010 (Tolerancia de diferencia en auditoría de inventario)',
      },
      {
        stepNumber: 3,
        activity: 'Verificar fechas de vencimiento de los lotes inspeccionados y liberar ubicación',
        maxTimeMinutes: 15,
        associatedRule: 'REG-007 (Prioridad de salida por fecha de vencimiento (FEFO))',
      },
    ],
  },
  {
    code: 'PRO-DEV',
    description: 'Protocolo de Logística Inversa y Cuarentena',
    type: 'Recepción',
    responsible: 'Inspector de Calidad',
    steps: [
      {
        stepNumber: 1,
        activity: 'Recibir mercadería devuelta en muelle y validar documento de retorno',
        maxTimeMinutes: 10,
        associatedRule: 'REG-001 (Validación de cita activa y documento de ingreso)',
      },
      {
        stepNumber: 2,
        activity: 'Inspeccionar estado físico de los envases, lotes y cadena de frío',
        maxTimeMinutes: 20,
        associatedRule: 'REG-004 (Control de temperatura en recepción refrigerada)',
      },
      {
        stepNumber: 3,
        activity: 'Definir reingreso a stock disponible o traslado a ubicación de cuarentena',
        maxTimeMinutes: 15,
        associatedRule: 'REG-003 (Verificación de conteo físico contra orden)',
      },
    ],
  },
];
