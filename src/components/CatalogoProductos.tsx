import React, { useState } from 'react';
import { DiagramStyleMode } from '../types';

interface CatalogoProductosProps {
  styleMode: DiagramStyleMode;
  onGoBack: () => void;
}

// Interfaz para Almacenes
interface AlmacenItem {
  id: string;
  codigo: string;
  descripcion: string;
  direccion: string;
  selected: boolean;
}

// Interfaz para Contenedores
interface ContenedorItem {
  id: string;
  codigo: string;
  almacen: string;
  material: string;
  volumen: string;
  pesoMaximo: string;
  entorno: string;
  selected: boolean;
}

// Interfaz para Volumen
interface VolumenItem {
  id: string;
  codigo: string;
  largo: number;
  ancho: number;
  alto: number;
  umVolumen: number;
  precioM3: number;
  selected: boolean;
}

// Interfaz para Despacho
interface DespachoItem {
  id: string;
  codigo: string;
  contenedor: string;
  embalaje: string;
  precioEmbalaje: number;
  selected: boolean;
}

// Interfaz para Entorno
interface EntornoItem {
  id: string;
  codigo: string;
  refrigeracion: 'SI' | 'NO';
  ventilacion: 'SI' | 'NO';
  temperatura: string; // Rango de temperatura (ej. "2°C a 8°C")
  presion: string;     // Rango o valor fijo (ej. "1.0 atm", "1.0 a 1.2 atm")
  humedad: number;     // Humedad en porcentaje (%) ej. 55
  selected: boolean;
}

// Opciones de embalaje permitidas
const EMBALAJE_OPCIONES = [
  'Caja',
  'Paleta',
  'Envoltura Stretch',
  'Saco industrial',
] as const;

const TABS = ['ÁLMACENES', 'CONTENEDOR', 'VOLUMEN', 'DESPACHO', 'ENTORNO'] as const;

// Datos iniciales de Almacenes (4 filas)
const INITIAL_ALMACENES: AlmacenItem[] = [
  {
    id: 'a1',
    codigo: 'A001',
    descripcion: 'Almacen Tio Ben',
    direccion: 'Av. Siempre viva 123',
    selected: false,
  },
  {
    id: 'a2',
    codigo: 'A002',
    descripcion: 'Almacen Central Norte',
    direccion: 'Jr. Los Libertadores 450',
    selected: false,
  },
  {
    id: 'a3',
    codigo: 'A003',
    descripcion: 'Almacen Deposito Callao',
    direccion: 'Av. Nestor Gambetta Km 8',
    selected: false,
  },
  {
    id: 'a4',
    codigo: 'A004',
    descripcion: 'Almacen Frigorifico Sur',
    direccion: 'Carretera Panamericana Sur Km 19',
    selected: false,
  },
];

// Datos iniciales de Contenedores (10 filas solicitadas)
const INITIAL_CONTENEDORES: ContenedorItem[] = [
  {
    id: 'c1',
    codigo: 'C001',
    almacen: 'A001',
    material: 'Metálico',
    volumen: 'V001',
    pesoMaximo: '28,200 kg',
    entorno: 'E001',
    selected: false,
  },
  {
    id: 'c2',
    codigo: 'C002',
    almacen: 'A001',
    material: 'Plástico',
    volumen: 'V002',
    pesoMaximo: '30,480 kg',
    entorno: 'E002',
    selected: false,
  },
  {
    id: 'c3',
    codigo: 'C003',
    almacen: 'A002',
    material: 'Cartón corrugado',
    volumen: 'V001',
    pesoMaximo: '26,000 kg',
    entorno: 'E003',
    selected: false,
  },
  {
    id: 'c4',
    codigo: 'C004',
    almacen: 'A002',
    material: 'Metálico con aislante térmico',
    volumen: 'V003',
    pesoMaximo: '18,500 kg',
    entorno: 'E004',
    selected: false,
  },
  {
    id: 'c5',
    codigo: 'C005',
    almacen: 'A003',
    material: 'Metálico',
    volumen: 'V002',
    pesoMaximo: '32,500 kg',
    entorno: 'E002',
    selected: false,
  },
  {
    id: 'c6',
    codigo: 'C006',
    almacen: 'A003',
    material: 'Plástico',
    volumen: 'V004',
    pesoMaximo: '22,000 kg',
    entorno: 'E003',
    selected: false,
  },
  {
    id: 'c7',
    codigo: 'C007',
    almacen: 'A004',
    material: 'Cartón corrugado',
    volumen: 'V001',
    pesoMaximo: '29,000 kg',
    entorno: 'E001',
    selected: false,
  },
  {
    id: 'c8',
    codigo: 'C008',
    almacen: 'A004',
    material: 'Metálico con aislante térmico',
    volumen: 'V002',
    pesoMaximo: '31,200 kg',
    entorno: 'E002',
    selected: false,
  },
  {
    id: 'c9',
    codigo: 'C009',
    almacen: 'A001',
    material: 'Metálico',
    volumen: 'V003',
    pesoMaximo: '27,500 kg',
    entorno: 'E004',
    selected: false,
  },
  {
    id: 'c10',
    codigo: 'C010',
    almacen: 'A002',
    material: 'Metálico con aislante térmico',
    volumen: 'V004',
    pesoMaximo: '20,000 kg',
    entorno: 'E001',
    selected: false,
  },
];

// Datos iniciales de Volumen (dimensiones enteras y precios <= S/ 10)
const INITIAL_VOLUMENES: VolumenItem[] = [
  {
    id: 'v1',
    codigo: 'V001',
    largo: 6,
    ancho: 2,
    alto: 3,
    umVolumen: 36,
    precioM3: 5,
    selected: false,
  },
  {
    id: 'v2',
    codigo: 'V002',
    largo: 8,
    ancho: 3,
    alto: 3,
    umVolumen: 72,
    precioM3: 6,
    selected: false,
  },
  {
    id: 'v3',
    codigo: 'V003',
    largo: 12,
    ancho: 3,
    alto: 3,
    umVolumen: 108,
    precioM3: 7,
    selected: false,
  },
  {
    id: 'v4',
    codigo: 'V004',
    largo: 14,
    ancho: 4,
    alto: 3,
    umVolumen: 168,
    precioM3: 8,
    selected: false,
  },
  {
    id: 'v5',
    codigo: 'V005',
    largo: 10,
    ancho: 2,
    alto: 2,
    umVolumen: 40,
    precioM3: 4,
    selected: false,
  },
  {
    id: 'v6',
    codigo: 'V006',
    largo: 12,
    ancho: 4,
    alto: 4,
    umVolumen: 192,
    precioM3: 9,
    selected: false,
  },
];

// Datos iniciales de Despacho (10 filas con códigos D001.., contenedor C001.., embalaje y precios no abusivos < 50)
const INITIAL_DESPACHOS: DespachoItem[] = [
  {
    id: 'd1',
    codigo: 'D001',
    contenedor: 'C001',
    embalaje: 'Caja',
    precioEmbalaje: 12,
    selected: false,
  },
  {
    id: 'd2',
    codigo: 'D002',
    contenedor: 'C002',
    embalaje: 'Paleta',
    precioEmbalaje: 25,
    selected: false,
  },
  {
    id: 'd3',
    codigo: 'D003',
    contenedor: 'C003',
    embalaje: 'Envoltura Stretch',
    precioEmbalaje: 18,
    selected: false,
  },
  {
    id: 'd4',
    codigo: 'D004',
    contenedor: 'C004',
    embalaje: 'Saco industrial',
    precioEmbalaje: 15,
    selected: false,
  },
  {
    id: 'd5',
    codigo: 'D005',
    contenedor: 'C005',
    embalaje: 'Paleta',
    precioEmbalaje: 28,
    selected: false,
  },
  {
    id: 'd6',
    codigo: 'D006',
    contenedor: 'C006',
    embalaje: 'Caja',
    precioEmbalaje: 10,
    selected: false,
  },
  {
    id: 'd7',
    codigo: 'D007',
    contenedor: 'C007',
    embalaje: 'Envoltura Stretch',
    precioEmbalaje: 22,
    selected: false,
  },
  {
    id: 'd8',
    codigo: 'D008',
    contenedor: 'C008',
    embalaje: 'Saco industrial',
    precioEmbalaje: 16,
    selected: false,
  },
  {
    id: 'd9',
    codigo: 'D009',
    contenedor: 'C009',
    embalaje: 'Paleta',
    precioEmbalaje: 30,
    selected: false,
  },
  {
    id: 'd10',
    codigo: 'D010',
    contenedor: 'C010',
    embalaje: 'Caja',
    precioEmbalaje: 14,
    selected: false,
  },
];

// Datos iniciales de Entorno (10 filas con códigos E001.., refrigeración SI/NO, ventilación SI/NO, rango temperatura, rango/valor presión y humedad %)
const INITIAL_ENTORNOS: EntornoItem[] = [
  {
    id: 'e1',
    codigo: 'E001',
    refrigeracion: 'NO',
    ventilacion: 'SI',
    temperatura: '18°C a 24°C',
    presion: '1.0 atm',
    humedad: 50,
    selected: false,
  },
  {
    id: 'e2',
    codigo: 'E002',
    refrigeracion: 'SI',
    ventilacion: 'SI',
    temperatura: '2°C a 8°C',
    presion: '1.0 a 1.2 atm',
    humedad: 65,
    selected: false,
  },
  {
    id: 'e3',
    codigo: 'E003',
    refrigeracion: 'SI',
    ventilacion: 'NO',
    temperatura: '-22°C a -18°C',
    presion: '1.0 atm',
    humedad: 85,
    selected: false,
  },
  {
    id: 'e4',
    codigo: 'E004',
    refrigeracion: 'NO',
    ventilacion: 'SI',
    temperatura: '15°C a 22°C',
    presion: '0.98 a 1.02 atm',
    humedad: 45,
    selected: false,
  },
  {
    id: 'e5',
    codigo: 'E005',
    refrigeracion: 'SI',
    ventilacion: 'SI',
    temperatura: '4°C a 10°C',
    presion: '1.1 atm',
    humedad: 70,
    selected: false,
  },
  {
    id: 'e6',
    codigo: 'E006',
    refrigeracion: 'NO',
    ventilacion: 'NO',
    temperatura: '20°C a 25°C',
    presion: '1.0 atm',
    humedad: 40,
    selected: false,
  },
  {
    id: 'e7',
    codigo: 'E007',
    refrigeracion: 'SI',
    ventilacion: 'SI',
    temperatura: '-5°C a 0°C',
    presion: '1.0 a 1.1 atm',
    humedad: 80,
    selected: false,
  },
  {
    id: 'e8',
    codigo: 'E008',
    refrigeracion: 'NO',
    ventilacion: 'SI',
    temperatura: '16°C a 20°C',
    presion: '101.3 kPa',
    humedad: 55,
    selected: false,
  },
  {
    id: 'e9',
    codigo: 'E009',
    refrigeracion: 'SI',
    ventilacion: 'NO',
    temperatura: '-18°C a -12°C',
    presion: '1.2 atm',
    humedad: 75,
    selected: false,
  },
  {
    id: 'e10',
    codigo: 'E010',
    refrigeracion: 'NO',
    ventilacion: 'SI',
    temperatura: '21°C a 26°C',
    presion: '1.0 atm',
    humedad: 60,
    selected: false,
  },
];

export const CatalogoProductos: React.FC<CatalogoProductosProps> = ({
  styleMode,
  onGoBack,
}) => {
  const isSketch = styleMode === 'sketch';
  const fontMain = isSketch ? 'font-sketch' : 'font-tech';

  // Pestaña activa ('ÁLMACENES' por defecto)
  const [activeTab, setActiveTab] = useState<string>('ÁLMACENES');

  // Estados de datos
  const [almacenes, setAlmacenes] = useState<AlmacenItem[]>(INITIAL_ALMACENES);
  const [contenedores, setContenedores] = useState<ContenedorItem[]>(INITIAL_CONTENEDORES);
  const [volumenes, setVolumenes] = useState<VolumenItem[]>(INITIAL_VOLUMENES);
  const [despachos, setDespachos] = useState<DespachoItem[]>(INITIAL_DESPACHOS);
  const [entornos, setEntornos] = useState<EntornoItem[]>(INITIAL_ENTORNOS);

  // Estados para feedback y modales
  const [mensajeFeedback, setMensajeFeedback] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<'agregar' | 'modificar' | null>(null);

  // Formulario de Almacenes
  const [formAlmacenCodigo, setFormAlmacenCodigo] = useState('');
  const [formAlmacenDescripcion, setFormAlmacenDescripcion] = useState('');
  const [formAlmacenDireccion, setFormAlmacenDireccion] = useState('');

  // Formulario de Contenedores
  const [formContCodigo, setFormContCodigo] = useState('');
  const [formContAlmacen, setFormContAlmacen] = useState('A001');
  const [formContMaterial, setFormContMaterial] = useState('Metálico');
  const [formContVolumen, setFormContVolumen] = useState('V001');
  const [formContPesoMaximo, setFormContPesoMaximo] = useState('');
  const [formContEntorno, setFormContEntorno] = useState('E001');

  // Formulario de Volumen (dimensiones enteras y precio <= S/ 10)
  const [formVolCodigo, setFormVolCodigo] = useState('');
  const [formVolLargo, setFormVolLargo] = useState<number>(6);
  const [formVolAncho, setFormVolAncho] = useState<number>(2);
  const [formVolAlto, setFormVolAlto] = useState<number>(3);
  const [formVolPrecioM3, setFormVolPrecioM3] = useState<number>(5);

  // Formulario de Despacho (códigos D001.., contenedor C001.., embalaje y precios no abusivos < 50)
  const [formDespCodigo, setFormDespCodigo] = useState('');
  const [formDespContenedor, setFormDespContenedor] = useState('C001');
  const [formDespEmbalaje, setFormDespEmbalaje] = useState<string>('Caja');
  const [formDespPrecio, setFormDespPrecio] = useState<number>(15);

  // Formulario de Entorno (códigos E001.., refrigeración SI/NO, ventilación SI/NO, rango temperatura, presión, humedad %)
  const [formEntCodigo, setFormEntCodigo] = useState('');
  const [formEntRefrigeracion, setFormEntRefrigeracion] = useState<'SI' | 'NO'>('SI');
  const [formEntVentilacion, setFormEntVentilacion] = useState<'SI' | 'NO'>('SI');
  const [formEntTemperatura, setFormEntTemperatura] = useState('2°C a 8°C');
  const [formEntPresion, setFormEntPresion] = useState('1.0 atm');
  const [formEntHumedad, setFormEntHumedad] = useState<number>(60);

  // Toggle de Checkboxes según la pestaña activa
  const handleToggleAlmacen = (id: string) => {
    setAlmacenes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const handleToggleSelectAllAlmacenes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setAlmacenes((prev) => prev.map((item) => ({ ...item, selected: isChecked })));
  };

  const handleToggleContenedor = (id: string) => {
    setContenedores((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const handleToggleSelectAllContenedores = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setContenedores((prev) => prev.map((item) => ({ ...item, selected: isChecked })));
  };

  const handleToggleVolumen = (id: string) => {
    setVolumenes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const handleToggleSelectAllVolumenes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setVolumenes((prev) => prev.map((item) => ({ ...item, selected: isChecked })));
  };

  const handleToggleDespacho = (id: string) => {
    setDespachos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const handleToggleSelectAllDespachos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setDespachos((prev) => prev.map((item) => ({ ...item, selected: isChecked })));
  };

  const handleToggleEntorno = (id: string) => {
    setEntornos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const handleToggleSelectAllEntornos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setEntornos((prev) => prev.map((item) => ({ ...item, selected: isChecked })));
  };

  // Abrir Modal Agregar
  const handleOpenAgregar = () => {
    if (activeTab === 'ÁLMACENES') {
      setFormAlmacenCodigo(`A00${almacenes.length + 1}`);
      setFormAlmacenDescripcion('');
      setFormAlmacenDireccion('');
    } else if (activeTab === 'CONTENEDOR') {
      const nextNum = (contenedores.length + 1).toString().padStart(3, '0');
      setFormContCodigo(`C${nextNum}`);
      setFormContAlmacen('A001');
      setFormContMaterial('Metálico');
      setFormContVolumen('V001');
      setFormContPesoMaximo('28,000 kg');
      setFormContEntorno('E001');
    } else if (activeTab === 'VOLUMEN') {
      const nextNum = (volumenes.length + 1).toString().padStart(3, '0');
      setFormVolCodigo(`V${nextNum}`);
      setFormVolLargo(6);
      setFormVolAncho(2);
      setFormVolAlto(3);
      setFormVolPrecioM3(5);
    } else if (activeTab === 'DESPACHO') {
      const nextNum = (despachos.length + 1).toString().padStart(3, '0');
      setFormDespCodigo(`D${nextNum}`);
      setFormDespContenedor(contenedores.length > 0 ? contenedores[0].codigo : 'C001');
      setFormDespEmbalaje('Caja');
      setFormDespPrecio(15);
    } else if (activeTab === 'ENTORNO') {
      const nextNum = (entornos.length + 1).toString().padStart(3, '0');
      setFormEntCodigo(`E${nextNum}`);
      setFormEntRefrigeracion('SI');
      setFormEntVentilacion('SI');
      setFormEntTemperatura('2°C a 8°C');
      setFormEntPresion('1.0 atm');
      setFormEntHumedad(60);
    }
    setModalOpen('agregar');
  };

  // Confirmar Agregar
  const handleConfirmAgregar = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'ÁLMACENES') {
      if (!formAlmacenCodigo.trim() || !formAlmacenDescripcion.trim()) return;
      const newItem: AlmacenItem = {
        id: Date.now().toString(),
        codigo: formAlmacenCodigo.trim(),
        descripcion: formAlmacenDescripcion.trim(),
        direccion: formAlmacenDireccion.trim() || 'Sin dirección',
        selected: false,
      };
      setAlmacenes((prev) => [...prev, newItem]);
      setMensajeFeedback(`✓ Almacén [${newItem.codigo}] agregado exitosamente.`);
    } else if (activeTab === 'CONTENEDOR') {
      if (!formContCodigo.trim() || !formContMaterial.trim()) return;
      const newItem: ContenedorItem = {
        id: Date.now().toString(),
        codigo: formContCodigo.trim(),
        almacen: formContAlmacen,
        material: formContMaterial.trim(),
        volumen: formContVolumen,
        pesoMaximo: formContPesoMaximo.trim() || '25,000 kg',
        entorno: formContEntorno.trim() || 'Estándar',
        selected: false,
      };
      setContenedores((prev) => [...prev, newItem]);
      setMensajeFeedback(`✓ Contenedor [${newItem.codigo}] registrado con éxito.`);
    } else if (activeTab === 'VOLUMEN') {
      if (!formVolCodigo.trim()) return;
      const largo = Math.max(1, Math.round(Number(formVolLargo)) || 1);
      const ancho = Math.max(1, Math.round(Number(formVolAncho)) || 1);
      const alto = Math.max(1, Math.round(Number(formVolAlto)) || 1);
      const umVolumen = largo * ancho * alto;
      // El precio por m³ no debe pasar de 10 soles
      const precioM3 = Math.min(10, Math.max(1, Math.round(Number(formVolPrecioM3)) || 1));
      const newItem: VolumenItem = {
        id: Date.now().toString(),
        codigo: formVolCodigo.trim(),
        largo,
        ancho,
        alto,
        umVolumen,
        precioM3,
        selected: false,
      };
      setVolumenes((prev) => [...prev, newItem]);
      setMensajeFeedback(`✓ Volumen [${newItem.codigo}] agregado exitosamente.`);
    } else if (activeTab === 'DESPACHO') {
      if (!formDespCodigo.trim()) return;
      // Precios razonables y no abusivos (< 50 soles)
      const precioEmbalaje = Math.min(48, Math.max(1, Math.round(Number(formDespPrecio)) || 1));
      const newItem: DespachoItem = {
        id: Date.now().toString(),
        codigo: formDespCodigo.trim(),
        contenedor: formDespContenedor,
        embalaje: formDespEmbalaje,
        precioEmbalaje,
        selected: false,
      };
      setDespachos((prev) => [...prev, newItem]);
      setMensajeFeedback(`✓ Despacho [${newItem.codigo}] registrado con éxito.`);
    } else if (activeTab === 'ENTORNO') {
      if (!formEntCodigo.trim()) return;
      const humedad = Math.min(100, Math.max(0, Math.round(Number(formEntHumedad)) || 0));
      const newItem: EntornoItem = {
        id: Date.now().toString(),
        codigo: formEntCodigo.trim(),
        refrigeracion: formEntRefrigeracion,
        ventilacion: formEntVentilacion,
        temperatura: formEntTemperatura.trim() || '18°C a 24°C',
        presion: formEntPresion.trim() || '1.0 atm',
        humedad,
        selected: false,
      };
      setEntornos((prev) => [...prev, newItem]);
      setMensajeFeedback(`✓ Entorno [${newItem.codigo}] registrado con éxito.`);
    }

    setModalOpen(null);
    setTimeout(() => setMensajeFeedback(null), 3000);
  };

  // Abrir Modal Modificar
  const handleOpenModificar = () => {
    if (activeTab === 'ÁLMACENES') {
      const selected = almacenes.find((i) => i.selected);
      if (!selected) {
        setMensajeFeedback('⚠ Selecciona una fila con la casilla de verificación para modificar.');
        setTimeout(() => setMensajeFeedback(null), 3500);
        return;
      }
      setFormAlmacenCodigo(selected.codigo);
      setFormAlmacenDescripcion(selected.descripcion);
      setFormAlmacenDireccion(selected.direccion);
    } else if (activeTab === 'CONTENEDOR') {
      const selected = contenedores.find((i) => i.selected);
      if (!selected) {
        setMensajeFeedback('⚠ Selecciona un contenedor con la casilla de verificación para modificar.');
        setTimeout(() => setMensajeFeedback(null), 3500);
        return;
      }
      setFormContCodigo(selected.codigo);
      setFormContAlmacen(selected.almacen);
      setFormContMaterial(selected.material);
      setFormContVolumen(selected.volumen);
      setFormContPesoMaximo(selected.pesoMaximo);
      setFormContEntorno(selected.entorno);
    } else if (activeTab === 'VOLUMEN') {
      const selected = volumenes.find((i) => i.selected);
      if (!selected) {
        setMensajeFeedback('⚠ Selecciona un registro de volumen con la casilla de verificación para modificar.');
        setTimeout(() => setMensajeFeedback(null), 3500);
        return;
      }
      setFormVolCodigo(selected.codigo);
      setFormVolLargo(selected.largo);
      setFormVolAncho(selected.ancho);
      setFormVolAlto(selected.alto);
      setFormVolPrecioM3(selected.precioM3);
    } else if (activeTab === 'DESPACHO') {
      const selected = despachos.find((i) => i.selected);
      if (!selected) {
        setMensajeFeedback('⚠ Selecciona un registro de despacho con la casilla de verificación para modificar.');
        setTimeout(() => setMensajeFeedback(null), 3500);
        return;
      }
      setFormDespCodigo(selected.codigo);
      setFormDespContenedor(selected.contenedor);
      setFormDespEmbalaje(selected.embalaje);
      setFormDespPrecio(selected.precioEmbalaje);
    } else if (activeTab === 'ENTORNO') {
      const selected = entornos.find((i) => i.selected);
      if (!selected) {
        setMensajeFeedback('⚠ Selecciona un registro de entorno con la casilla de verificación para modificar.');
        setTimeout(() => setMensajeFeedback(null), 3500);
        return;
      }
      setFormEntCodigo(selected.codigo);
      setFormEntRefrigeracion(selected.refrigeracion);
      setFormEntVentilacion(selected.ventilacion);
      setFormEntTemperatura(selected.temperatura);
      setFormEntPresion(selected.presion);
      setFormEntHumedad(selected.humedad);
    }
    setModalOpen('modificar');
  };

  // Confirmar Modificar
  const handleConfirmModificar = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'ÁLMACENES') {
      const selected = almacenes.find((i) => i.selected);
      if (!selected) return;
      setAlmacenes((prev) =>
        prev.map((i) =>
          i.id === selected.id
            ? {
                ...i,
                codigo: formAlmacenCodigo.trim(),
                descripcion: formAlmacenDescripcion.trim(),
                direccion: formAlmacenDireccion.trim(),
              }
            : i
        )
      );
      setMensajeFeedback(`✓ Almacén [${formAlmacenCodigo}] modificado exitosamente.`);
    } else if (activeTab === 'CONTENEDOR') {
      const selected = contenedores.find((i) => i.selected);
      if (!selected) return;
      setContenedores((prev) =>
        prev.map((i) =>
          i.id === selected.id
            ? {
                ...i,
                codigo: formContCodigo.trim(),
                almacen: formContAlmacen,
                material: formContMaterial.trim(),
                volumen: formContVolumen,
                pesoMaximo: formContPesoMaximo.trim(),
                entorno: formContEntorno.trim(),
              }
            : i
        )
      );
      setMensajeFeedback(`✓ Contenedor [${formContCodigo}] actualizado.`);
    } else if (activeTab === 'VOLUMEN') {
      const selected = volumenes.find((i) => i.selected);
      if (!selected) return;
      const largo = Math.max(1, Math.round(Number(formVolLargo)) || 1);
      const ancho = Math.max(1, Math.round(Number(formVolAncho)) || 1);
      const alto = Math.max(1, Math.round(Number(formVolAlto)) || 1);
      const umVolumen = largo * ancho * alto;
      const precioM3 = Math.min(10, Math.max(1, Math.round(Number(formVolPrecioM3)) || 1));
      setVolumenes((prev) =>
        prev.map((i) =>
          i.id === selected.id
            ? {
                ...i,
                codigo: formVolCodigo.trim(),
                largo,
                ancho,
                alto,
                umVolumen,
                precioM3,
              }
            : i
        )
      );
      setMensajeFeedback(`✓ Volumen [${formVolCodigo}] actualizado.`);
    } else if (activeTab === 'DESPACHO') {
      const selected = despachos.find((i) => i.selected);
      if (!selected) return;
      const precioEmbalaje = Math.min(48, Math.max(1, Math.round(Number(formDespPrecio)) || 1));
      setDespachos((prev) =>
        prev.map((i) =>
          i.id === selected.id
            ? {
                ...i,
                codigo: formDespCodigo.trim(),
                contenedor: formDespContenedor,
                embalaje: formDespEmbalaje,
                precioEmbalaje,
              }
            : i
        )
      );
      setMensajeFeedback(`✓ Despacho [${formDespCodigo}] actualizado.`);
    } else if (activeTab === 'ENTORNO') {
      const selected = entornos.find((i) => i.selected);
      if (!selected) return;
      const humedad = Math.min(100, Math.max(0, Math.round(Number(formEntHumedad)) || 0));
      setEntornos((prev) =>
        prev.map((i) =>
          i.id === selected.id
            ? {
                ...i,
                codigo: formEntCodigo.trim(),
                refrigeracion: formEntRefrigeracion,
                ventilacion: formEntVentilacion,
                temperatura: formEntTemperatura.trim() || '18°C a 24°C',
                presion: formEntPresion.trim() || '1.0 atm',
                humedad,
              }
            : i
        )
      );
      setMensajeFeedback(`✓ Entorno [${formEntCodigo}] actualizado.`);
    }

    setModalOpen(null);
    setTimeout(() => setMensajeFeedback(null), 3000);
  };

  // Eliminar filas seleccionadas
  const handleEliminar = () => {
    if (activeTab === 'ÁLMACENES') {
      const seleccionados = almacenes.filter((i) => i.selected);
      if (seleccionados.length === 0) {
        setMensajeFeedback('⚠ Marca con la casilla de verificación la(s) fila(s) que deseas eliminar.');
        setTimeout(() => setMensajeFeedback(null), 3500);
        return;
      }
      setAlmacenes((prev) => prev.filter((i) => !i.selected));
      setMensajeFeedback(`✓ Se eliminaron ${seleccionados.length} almacén(es) de la tabla.`);
    } else if (activeTab === 'CONTENEDOR') {
      const seleccionados = contenedores.filter((i) => i.selected);
      if (seleccionados.length === 0) {
        setMensajeFeedback('⚠ Marca con la casilla de verificación el/los contenedor(es) a eliminar.');
        setTimeout(() => setMensajeFeedback(null), 3500);
        return;
      }
      setContenedores((prev) => prev.filter((i) => !i.selected));
      setMensajeFeedback(`✓ Se eliminaron ${seleccionados.length} contenedor(es) de la tabla.`);
    } else if (activeTab === 'VOLUMEN') {
      const seleccionados = volumenes.filter((i) => i.selected);
      if (seleccionados.length === 0) {
        setMensajeFeedback('⚠ Marca con la casilla de verificación el/los volumen(es) a eliminar.');
        setTimeout(() => setMensajeFeedback(null), 3500);
        return;
      }
      setVolumenes((prev) => prev.filter((i) => !i.selected));
      setMensajeFeedback(`✓ Se eliminaron ${seleccionados.length} volumen(es) de la tabla.`);
    } else if (activeTab === 'DESPACHO') {
      const seleccionados = despachos.filter((i) => i.selected);
      if (seleccionados.length === 0) {
        setMensajeFeedback('⚠ Marca con la casilla de verificación el/los despacho(s) a eliminar.');
        setTimeout(() => setMensajeFeedback(null), 3500);
        return;
      }
      setDespachos((prev) => prev.filter((i) => !i.selected));
      setMensajeFeedback(`✓ Se eliminaron ${seleccionados.length} despacho(s) de la tabla.`);
    } else if (activeTab === 'ENTORNO') {
      const seleccionados = entornos.filter((i) => i.selected);
      if (seleccionados.length === 0) {
        setMensajeFeedback('⚠ Marca con la casilla de verificación el/los entorno(s) a eliminar.');
        setTimeout(() => setMensajeFeedback(null), 3500);
        return;
      }
      setEntornos((prev) => prev.filter((i) => !i.selected));
      setMensajeFeedback(`✓ Se eliminaron ${seleccionados.length} entorno(s) de la tabla.`);
    }

    setTimeout(() => setMensajeFeedback(null), 3000);
  };

  const allAlmacenesSelected = almacenes.length > 0 && almacenes.every((i) => i.selected);
  const allContenedoresSelected = contenedores.length > 0 && contenedores.every((i) => i.selected);
  const allVolumenesSelected = volumenes.length > 0 && volumenes.every((i) => i.selected);
  const allDespachosSelected = despachos.length > 0 && despachos.every((i) => i.selected);
  const allEntornosSelected = entornos.length > 0 && entornos.every((i) => i.selected);

  return (
    <div
      id="vista-catalogo-productos"
      className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 flex flex-col gap-5"
    >
      {/* ================= BARRA SUPERIOR DE LA VISTA ================= */}
      <div
        id="barra-superior-catalogo"
        className="w-full relative flex items-center justify-between pb-3 border-b-2 border-dashed border-zinc-400 select-none min-h-[44px]"
      >
        {/* Botón <- Regresar en la esquina superior izquierda */}
        <button
          type="button"
          onClick={onGoBack}
          id="btn-regresar-arquitectura"
          title="Regresar al Diagrama de Arquitectura"
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-white hover:bg-zinc-100 active:bg-zinc-200 border-2 border-zinc-900 rounded-sm font-bold text-xs sm:text-sm text-zinc-900 shadow-[3px_3px_0px_#18181b] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer shrink-0 z-10 ${fontMain}`}
        >
          <span className="text-base font-mono">&larr;</span>
          <span>Regresar</span>
        </button>

        {/* Título centralizado en la parte superior: 'Catálogo de productos' */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1
            className={`font-black text-xl sm:text-2xl text-zinc-900 tracking-wide uppercase text-center px-4 ${fontMain}`}
          >
            Catálogo de productos
          </h1>
        </div>

        {/* Espaciador para balance visual simétrico */}
        <div className="w-20 sm:w-28 invisible"></div>
      </div>

      {/* Banner de Feedback */}
      {mensajeFeedback && (
        <div className="w-full p-2.5 sm:p-3 bg-amber-50 border-2 border-zinc-900 text-zinc-900 font-mono text-xs sm:text-sm font-bold shadow-[3px_3px_0px_#18181b] flex items-center justify-between animate-fadeIn">
          <span>{mensajeFeedback}</span>
          <button
            type="button"
            onClick={() => setMensajeFeedback(null)}
            className="text-xs font-mono font-bold underline ml-2 cursor-pointer hover:text-amber-800"
          >
            ✕
          </button>
        </div>
      )}

      {/* ================= FILA DE 5 PESTAÑAS HORIZONTALES CENTRADAS ================= */}
      {/* 'ÁLMACENES', 'CONTENEDOR', 'VOLUMEN', 'DESPACHO', 'ENTORNO' */}
      <div
        id="fila-pestanas-catalogo"
        className="w-full flex items-center justify-center gap-1.5 sm:gap-3 overflow-x-auto pb-2 scrollbar-none select-none pt-2"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <div key={tab} className="relative shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab(tab)}
                id={`tab-${tab.toLowerCase()}`}
                className={`relative px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-zinc-900 rounded-sm font-black text-xs sm:text-sm tracking-wider uppercase transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-900 text-white shadow-[3px_3px_0px_#71717a]'
                    : 'bg-white text-zinc-800 hover:bg-zinc-100 active:bg-zinc-200 shadow-[2px_2px_0px_#18181b]'
                } ${fontMain}`}
              >
                {tab}
              </button>

              {/* Flecha o pico tipo globo de diálogo apuntando hacia la tabla de abajo si está activo */}
              {isActive && (
                <div
                  className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 pointer-events-none z-20"
                  style={{
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderTop: '9px solid #18181b',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ================= CUADRO GRANDE: TABLA DE DATOS (DATA GRID) ================= */}
      <div
        id="cuadro-tabla-datos"
        className="w-full bg-white border-2 border-zinc-900 rounded-sm shadow-[4px_4px_0px_#18181b] overflow-hidden flex flex-col"
      >
        {/* Contenedor de la tabla con scroll a la derecha */}
        <div className="w-full overflow-x-auto max-h-[380px] overflow-y-scroll relative border-b border-zinc-300">
          
          {/* TABLA 1: ÁLMACENES */}
          {activeTab === 'ÁLMACENES' && (
            <table className="w-full text-left border-collapse min-w-[620px]">
              {/* Encabezados estrictos: Codigo, Descripcion, Direccion y Casilla de verificación */}
              <thead className="bg-zinc-100 border-b-2 border-zinc-900 sticky top-0 z-10 select-none">
                <tr>
                  <th
                    className={`py-3 px-4 text-xs sm:text-sm font-black text-zinc-900 uppercase border-r-2 border-zinc-900 w-28 ${fontMain}`}
                  >
                    Codigo
                  </th>
                  <th
                    className={`py-3 px-4 text-xs sm:text-sm font-black text-zinc-900 uppercase border-r-2 border-zinc-900 ${fontMain}`}
                  >
                    Descripcion
                  </th>
                  <th
                    className={`py-3 px-4 text-xs sm:text-sm font-black text-zinc-900 uppercase border-r-2 border-zinc-900 ${fontMain}`}
                  >
                    Direccion
                  </th>
                  <th
                    className={`py-3 px-3 text-center text-xs sm:text-sm font-black text-zinc-900 uppercase w-20 shrink-0 ${fontMain}`}
                    title="Seleccionar todo"
                  >
                    <div className="flex items-center justify-center gap-1">
                      <input
                        type="checkbox"
                        checked={allAlmacenesSelected}
                        onChange={handleToggleSelectAllAlmacenes}
                        title="Seleccionar todo"
                        className="w-4 h-4 accent-zinc-900 cursor-pointer rounded border-2 border-zinc-900"
                      />
                    </div>
                  </th>
                </tr>
              </thead>

              {/* 4 filas de datos de Almacenes */}
              <tbody className="divide-y-2 divide-zinc-200 bg-white">
                {almacenes.map((row) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-amber-50/60 transition-colors ${
                      row.selected ? 'bg-blue-50/70 font-semibold' : ''
                    }`}
                  >
                    <td
                      className={`py-3 px-4 text-xs sm:text-sm text-zinc-900 border-r-2 border-zinc-900 font-mono font-bold ${
                        isSketch ? 'text-base font-sketch' : ''
                      }`}
                    >
                      {row.codigo}
                    </td>
                    <td
                      className={`py-3 px-4 text-xs sm:text-sm text-zinc-900 border-r-2 border-zinc-900 ${
                        isSketch ? 'text-base font-sketch' : fontMain
                      }`}
                    >
                      {row.descripcion}
                    </td>
                    <td
                      className={`py-3 px-4 text-xs sm:text-sm text-zinc-900 border-r-2 border-zinc-900 ${
                        isSketch ? 'text-base font-sketch' : fontMain
                      }`}
                    >
                      {row.direccion}
                    </td>
                    <td className="py-3 px-3 text-center w-20 shrink-0">
                      <input
                        type="checkbox"
                        checked={row.selected}
                        onChange={() => handleToggleAlmacen(row.id)}
                        className="w-4 h-4 accent-zinc-900 cursor-pointer rounded border-2 border-zinc-900"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* TABLA 2: CONTENEDOR (10 filas con columnas: codigo, almacen, material, volumen, peso maximo y entorno) */}
          {activeTab === 'CONTENEDOR' && (
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead className="bg-zinc-100 border-b-2 border-zinc-900 sticky top-0 z-10 select-none">
                <tr>
                  <th
                    className={`py-3 px-4 text-xs sm:text-sm font-black text-zinc-900 uppercase border-r-2 border-zinc-900 w-24 ${fontMain}`}
                  >
                    Codigo
                  </th>
                  <th
                    className={`py-3 px-3 text-xs sm:text-sm font-black text-zinc-900 uppercase border-r-2 border-zinc-900 w-24 text-center ${fontMain}`}
                  >
                    Almacen
                  </th>
                  <th
                    className={`py-3 px-4 text-xs sm:text-sm font-black text-zinc-900 uppercase border-r-2 border-zinc-900 ${fontMain}`}
                  >
                    Material
                  </th>
                  <th
                    className={`py-3 px-3 text-xs sm:text-sm font-black text-zinc-900 uppercase border-r-2 border-zinc-900 w-24 text-center ${fontMain}`}
                  >
                    Volumen
                  </th>
                  <th
                    className={`py-3 px-4 text-xs sm:text-sm font-black text-zinc-900 uppercase border-r-2 border-zinc-900 w-32 ${fontMain}`}
                  >
                    Peso Maximo
                  </th>
                  <th
                    className={`py-3 px-3 text-xs sm:text-sm font-black text-zinc-900 uppercase border-r-2 border-zinc-900 w-24 text-center ${fontMain}`}
                  >
                    Entorno
                  </th>
                  <th
                    className={`py-3 px-3 text-center text-xs sm:text-sm font-black text-zinc-900 uppercase w-20 shrink-0 ${fontMain}`}
                    title="Seleccionar todo"
                  >
                    <div className="flex items-center justify-center gap-1">
                      <input
                        type="checkbox"
                        checked={allContenedoresSelected}
                        onChange={handleToggleSelectAllContenedores}
                        title="Seleccionar todo"
                        className="w-4 h-4 accent-zinc-900 cursor-pointer rounded border-2 border-zinc-900"
                      />
                    </div>
                  </th>
                </tr>
              </thead>

              {/* 10 filas de datos de Contenedores */}
              <tbody className="divide-y-2 divide-zinc-200 bg-white">
                {contenedores.map((row) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-amber-50/60 transition-colors ${
                      row.selected ? 'bg-blue-50/70 font-semibold' : ''
                    }`}
                  >
                    <td
                      className={`py-3 px-4 text-xs sm:text-sm text-zinc-900 border-r-2 border-zinc-900 font-mono font-bold ${
                        isSketch ? 'text-base font-sketch' : ''
                      }`}
                    >
                      {row.codigo}
                    </td>
                    <td
                      className={`py-3 px-3 text-xs sm:text-sm text-zinc-900 border-r-2 border-zinc-900 font-mono font-bold text-center bg-zinc-50/60 ${
                        isSketch ? 'text-base font-sketch' : ''
                      }`}
                    >
                      {row.almacen}
                    </td>
                    <td
                      className={`py-3 px-4 text-xs sm:text-sm text-zinc-900 border-r-2 border-zinc-900 ${
                        isSketch ? 'text-base font-sketch' : fontMain
                      }`}
                    >
                      {row.material}
                    </td>
                    <td
                      className={`py-3 px-3 text-xs sm:text-sm text-zinc-900 border-r-2 border-zinc-900 font-mono font-bold text-center bg-zinc-50/60 ${
                        isSketch ? 'text-base font-sketch' : ''
                      }`}
                    >
                      {row.volumen}
                    </td>
                    <td
                      className={`py-3 px-4 text-xs sm:text-sm text-zinc-900 border-r-2 border-zinc-900 font-mono ${
                        isSketch ? 'text-base font-sketch' : ''
                      }`}
                    >
                      {row.pesoMaximo}
                    </td>
                    <td
                      className={`py-3 px-3 text-xs sm:text-sm text-zinc-900 border-r-2 border-zinc-900 font-mono font-bold text-center bg-zinc-50/60 ${
                        isSketch ? 'text-base font-sketch' : ''
                      }`}
                    >
                      {row.entorno}
                    </td>
                    <td className="py-3 px-3 text-center w-20 shrink-0">
                      <input
                        type="checkbox"
                        checked={row.selected}
                        onChange={() => handleToggleContenedor(row.id)}
                        className="w-4 h-4 accent-zinc-900 cursor-pointer rounded border-2 border-zinc-900"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* TABLA 3: VOLUMEN (Columnas: CÓDIGO, LARGO (m), ANCHO (m), ALTO (m), U.M. (m³), PRECIO POR m³) */}
          {activeTab === 'VOLUMEN' && (
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead className="bg-zinc-100 border-b-2 border-zinc-900 sticky top-0 z-10 select-none">
                <tr>
                  <th
                    className={`py-3 px-4 text-xs sm:text-sm font-black text-zinc-900 uppercase border-r-2 border-zinc-900 w-24 ${fontMain}`}
                  >
                    CÓDIGO
                  </th>
                  <th
                    className={`py-3 px-3 text-xs sm:text-sm font-black text-zinc-900 uppercase border-r-2 border-zinc-900 w-28 text-center ${fontMain}`}
                  >
                    LARGO (m)
                  </th>
                  <th
                    className={`py-3 px-3 text-xs sm:text-sm font-black text-zinc-900 uppercase border-r-2 border-zinc-900 w-28 text-center ${fontMain}`}
                  >
                    ANCHO (m)
                  </th>
                  <th
                    className={`py-3 px-3 text-xs sm:text-sm font-black text-zinc-900 uppercase border-r-2 border-zinc-900 w-28 text-center ${fontMain}`}
                  >
                    ALTO (m)
                  </th>
                  <th
                    className={`py-3 px-3 text-xs sm:text-sm font-black text-zinc-900 uppercase border-r-2 border-zinc-900 w-32 text-center ${fontMain}`}
                  >
                    U.M. (m³)
                  </th>
                  <th
                    className={`py-3 px-4 text-xs sm:text-sm font-black text-zinc-900 uppercase border-r-2 border-zinc-900 w-36 text-center ${fontMain}`}
                  >
                    PRECIO POR m³
                  </th>
                  <th
                    className={`py-3 px-3 text-center text-xs sm:text-sm font-black text-zinc-900 uppercase w-20 shrink-0 ${fontMain}`}
                    title="Seleccionar todo"
                  >
                    <div className="flex items-center justify-center gap-1">
                      <input
                        type="checkbox"
                        checked={allVolumenesSelected}
                        onChange={handleToggleSelectAllVolumenes}
                        title="Seleccionar todo"
                        className="w-4 h-4 accent-zinc-900 cursor-pointer rounded border-2 border-zinc-900"
                      />
                    </div>
                  </th>
                </tr>
              </thead>

              {/* Filas de datos de Volumen con dimensiones enteras y precio <= 10 soles */}
              <tbody className="divide-y-2 divide-zinc-200 bg-white">
                {volumenes.map((row) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-amber-50/60 transition-colors ${
                      row.selected ? 'bg-blue-50/70 font-semibold' : ''
                    }`}
                  >
                    <td
                      className={`py-3 px-4 text-xs sm:text-sm text-zinc-900 border-r-2 border-zinc-900 font-mono font-bold ${
                        isSketch ? 'text-base font-sketch' : ''
                      }`}
                    >
                      {row.codigo}
                    </td>
                    <td
                      className={`py-3 px-3 text-xs sm:text-sm text-zinc-900 border-r-2 border-zinc-900 font-mono font-bold text-center bg-zinc-50/60 ${
                        isSketch ? 'text-base font-sketch' : ''
                      }`}
                    >
                      {row.largo}
                    </td>
                    <td
                      className={`py-3 px-3 text-xs sm:text-sm text-zinc-900 border-r-2 border-zinc-900 font-mono font-bold text-center bg-zinc-50/60 ${
                        isSketch ? 'text-base font-sketch' : ''
                      }`}
                    >
                      {row.ancho}
                    </td>
                    <td
                      className={`py-3 px-3 text-xs sm:text-sm text-zinc-900 border-r-2 border-zinc-900 font-mono font-bold text-center bg-zinc-50/60 ${
                        isSketch ? 'text-base font-sketch' : ''
                      }`}
                    >
                      {row.alto}
                    </td>
                    <td
                      className={`py-3 px-3 text-xs sm:text-sm text-zinc-900 border-r-2 border-zinc-900 font-mono font-black text-center ${
                        isSketch ? 'text-base font-sketch' : ''
                      }`}
                    >
                      {row.umVolumen}
                    </td>
                    <td
                      className={`py-3 px-4 text-xs sm:text-sm text-zinc-900 border-r-2 border-zinc-900 font-mono font-black text-center text-emerald-800 bg-emerald-50/40 ${
                        isSketch ? 'text-base font-sketch' : ''
                      }`}
                    >
                      S/ {row.precioM3}
                    </td>
                    <td className="py-3 px-3 text-center w-20 shrink-0">
                      <input
                        type="checkbox"
                        checked={row.selected}
                        onChange={() => handleToggleVolumen(row.id)}
                        className="w-4 h-4 accent-zinc-900 cursor-pointer rounded border-2 border-zinc-900"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* TABLA 4: DESPACHO (Columnas: CÓDIGO, CONTENEDOR, EMBALAJE, PRECIO DE EMBALAJE) */}
          {activeTab === 'DESPACHO' && (
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead className="bg-zinc-100 border-b-2 border-zinc-900 sticky top-0 z-10 select-none">
                <tr>
                  <th
                    className={`py-3 px-4 text-xs sm:text-sm font-black text-zinc-900 uppercase border-r-2 border-zinc-900 w-28 ${fontMain}`}
                  >
                    CÓDIGO
                  </th>
                  <th
                    className={`py-3 px-3 text-xs sm:text-sm font-black text-zinc-900 uppercase border-r-2 border-zinc-900 w-32 text-center ${fontMain}`}
                  >
                    CONTENEDOR
                  </th>
                  <th
                    className={`py-3 px-4 text-xs sm:text-sm font-black text-zinc-900 uppercase border-r-2 border-zinc-900 ${fontMain}`}
                  >
                    EMBALAJE
                  </th>
                  <th
                    className={`py-3 px-4 text-xs sm:text-sm font-black text-zinc-900 uppercase border-r-2 border-zinc-900 w-44 text-center ${fontMain}`}
                  >
                    PRECIO EMBALAJE
                  </th>
                  <th
                    className={`py-3 px-3 text-center text-xs sm:text-sm font-black text-zinc-900 uppercase w-20 shrink-0 ${fontMain}`}
                    title="Seleccionar todo"
                  >
                    <div className="flex items-center justify-center gap-1">
                      <input
                        type="checkbox"
                        checked={allDespachosSelected}
                        onChange={handleToggleSelectAllDespachos}
                        title="Seleccionar todo"
                        className="w-4 h-4 accent-zinc-900 cursor-pointer rounded border-2 border-zinc-900"
                      />
                    </div>
                  </th>
                </tr>
              </thead>

              {/* Filas de datos de Despacho con códigos D001.., contenedor C001.., embalaje y precios accesibles < 50 soles */}
              <tbody className="divide-y-2 divide-zinc-200 bg-white">
                {despachos.map((row) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-amber-50/60 transition-colors ${
                      row.selected ? 'bg-blue-50/70 font-semibold' : ''
                    }`}
                  >
                    <td
                      className={`py-3 px-4 text-xs sm:text-sm text-zinc-900 border-r-2 border-zinc-900 font-mono font-bold ${
                        isSketch ? 'text-base font-sketch' : ''
                      }`}
                    >
                      {row.codigo}
                    </td>
                    <td
                      className={`py-3 px-3 text-xs sm:text-sm text-zinc-900 border-r-2 border-zinc-900 font-mono font-bold text-center ${
                        isSketch ? 'text-base font-sketch' : ''
                      }`}
                    >
                      {row.contenedor}
                    </td>
                    <td
                      className={`py-3 px-4 text-xs sm:text-sm text-zinc-900 border-r-2 border-zinc-900 font-bold ${
                        isSketch ? 'text-base font-sketch' : fontMain
                      }`}
                    >
                      {row.embalaje}
                    </td>
                    <td
                      className={`py-3 px-4 text-xs sm:text-sm text-zinc-900 border-r-2 border-zinc-900 font-mono font-black text-center text-emerald-800 bg-emerald-50/40 ${
                        isSketch ? 'text-base font-sketch' : ''
                      }`}
                    >
                      S/ {row.precioEmbalaje}
                    </td>
                    <td className="py-3 px-3 text-center w-20 shrink-0">
                      <input
                        type="checkbox"
                        checked={row.selected}
                        onChange={() => handleToggleDespacho(row.id)}
                        className="w-4 h-4 accent-zinc-900 cursor-pointer rounded border-2 border-zinc-900"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* TABLA 5: ENTORNO (Columnas: CÓDIGO, REFRIGERACIÓN (SI/NO), VENTILACIÓN (SI/NO), TEMPERATURA, PRESIÓN, HUMEDAD (%)) */}
          {activeTab === 'ENTORNO' && (
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead className="bg-zinc-100 border-b-2 border-zinc-900 sticky top-0 z-10 select-none">
                <tr>
                  <th
                    className={`py-3 px-3 text-xs sm:text-sm font-black text-zinc-900 uppercase border-r-2 border-zinc-900 w-24 text-center ${fontMain}`}
                  >
                    CÓDIGO
                  </th>
                  <th
                    className={`py-3 px-3 text-xs sm:text-sm font-black text-zinc-900 uppercase border-r-2 border-zinc-900 w-36 text-center ${fontMain}`}
                  >
                    REFRIGERACIÓN (SI/NO)
                  </th>
                  <th
                    className={`py-3 px-3 text-xs sm:text-sm font-black text-zinc-900 uppercase border-r-2 border-zinc-900 w-36 text-center ${fontMain}`}
                  >
                    VENTILACIÓN (SI/NO)
                  </th>
                  <th
                    className={`py-3 px-4 text-xs sm:text-sm font-black text-zinc-900 uppercase border-r-2 border-zinc-900 text-center ${fontMain}`}
                  >
                    TEMPERATURA
                  </th>
                  <th
                    className={`py-3 px-4 text-xs sm:text-sm font-black text-zinc-900 uppercase border-r-2 border-zinc-900 w-36 text-center ${fontMain}`}
                  >
                    PRESIÓN
                  </th>
                  <th
                    className={`py-3 px-3 text-xs sm:text-sm font-black text-zinc-900 uppercase border-r-2 border-zinc-900 w-28 text-center ${fontMain}`}
                  >
                    HUMEDAD (%)
                  </th>
                  <th
                    className={`py-3 px-3 text-center text-xs sm:text-sm font-black text-zinc-900 uppercase w-20 shrink-0 ${fontMain}`}
                    title="Seleccionar todo"
                  >
                    <div className="flex items-center justify-center gap-1">
                      <input
                        type="checkbox"
                        checked={allEntornosSelected}
                        onChange={handleToggleSelectAllEntornos}
                        title="Seleccionar todo"
                        className="w-4 h-4 accent-zinc-900 cursor-pointer rounded border-2 border-zinc-900"
                      />
                    </div>
                  </th>
                </tr>
              </thead>

              {/* Filas de datos de Entorno */}
              <tbody className="divide-y-2 divide-zinc-200 bg-white">
                {entornos.map((row) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-amber-50/60 transition-colors ${
                      row.selected ? 'bg-blue-50/70 font-semibold' : ''
                    }`}
                  >
                    <td
                      className={`py-3 px-3 text-xs sm:text-sm text-zinc-900 border-r-2 border-zinc-900 font-mono font-bold text-center ${
                        isSketch ? 'text-base font-sketch' : ''
                      }`}
                    >
                      {row.codigo}
                    </td>
                    <td
                      className={`py-3 px-3 text-xs sm:text-sm border-r-2 border-zinc-900 font-mono font-black text-center ${
                        row.refrigeracion === 'SI'
                          ? 'text-sky-800'
                          : 'text-zinc-600'
                      } ${isSketch ? 'text-base font-sketch' : ''}`}
                    >
                      {row.refrigeracion}
                    </td>
                    <td
                      className={`py-3 px-3 text-xs sm:text-sm border-r-2 border-zinc-900 font-mono font-black text-center ${
                        row.ventilacion === 'SI'
                          ? 'text-emerald-800'
                          : 'text-zinc-600'
                      } ${isSketch ? 'text-base font-sketch' : ''}`}
                    >
                      {row.ventilacion}
                    </td>
                    <td
                      className={`py-3 px-4 text-xs sm:text-sm text-zinc-900 border-r-2 border-zinc-900 font-mono font-bold text-center ${
                        isSketch ? 'text-base font-sketch' : ''
                      }`}
                    >
                      {row.temperatura}
                    </td>
                    <td
                      className={`py-3 px-4 text-xs sm:text-sm text-zinc-900 border-r-2 border-zinc-900 font-mono font-bold text-center ${
                        isSketch ? 'text-base font-sketch' : ''
                      }`}
                    >
                      {row.presion}
                    </td>
                    <td
                      className={`py-3 px-3 text-xs sm:text-sm text-zinc-900 border-r-2 border-zinc-900 font-mono font-black text-center bg-zinc-50/50 ${
                        isSketch ? 'text-base font-sketch' : ''
                      }`}
                    >
                      {row.humedad}%
                    </td>
                    <td className="py-3 px-3 text-center w-20 shrink-0">
                      <input
                        type="checkbox"
                        checked={row.selected}
                        onChange={() => handleToggleEntorno(row.id)}
                        className="w-4 h-4 accent-zinc-900 cursor-pointer rounded border-2 border-zinc-900"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Barra de estado o resumen al pie de la tabla */}
        <div className="w-full px-4 py-2 bg-zinc-50 flex items-center justify-between text-xs text-zinc-600 font-mono select-none">
          <span>
            Total de {activeTab.toLowerCase()}:{' '}
            {activeTab === 'ÁLMACENES'
              ? almacenes.length
              : activeTab === 'CONTENEDOR'
              ? contenedores.length
              : activeTab === 'VOLUMEN'
              ? volumenes.length
              : activeTab === 'DESPACHO'
              ? despachos.length
              : activeTab === 'ENTORNO'
              ? entornos.length
              : 0}
          </span>
          <span className="italic">
            {activeTab === 'ÁLMACENES'
              ? almacenes.filter((i) => i.selected).length
              : activeTab === 'CONTENEDOR'
              ? contenedores.filter((i) => i.selected).length
              : activeTab === 'VOLUMEN'
              ? volumenes.filter((i) => i.selected).length
              : activeTab === 'DESPACHO'
              ? despachos.filter((i) => i.selected).length
              : activeTab === 'ENTORNO'
              ? entornos.filter((i) => i.selected).length
              : 0}{' '}
            fila(s) seleccionada(s)
          </span>
        </div>
      </div>

      {/* ================= PARTE INFERIOR: TRES BOTONES CENTRADOS ================= */}
      {/* Botones de acción alineados y centrados horizontalmente */}
      <div
        id="barra-inferior-acciones"
        className="w-full flex items-center justify-center gap-2.5 sm:gap-4 pt-2 select-none"
      >
        {/* Botón 1: Modificar */}
        <button
          type="button"
          id="btn-modificar-catalogo"
          onClick={handleOpenModificar}
          className={`px-5 sm:px-7 py-2.5 bg-white hover:bg-zinc-100 active:bg-zinc-200 border-2 border-zinc-900 rounded-sm font-bold text-xs sm:text-sm text-zinc-900 shadow-[3px_3px_0px_#18181b] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer ${fontMain}`}
        >
          Modificar
        </button>

        {/* Botón 2: Eliminar */}
        <button
          type="button"
          id="btn-eliminar-catalogo"
          onClick={handleEliminar}
          className={`px-5 sm:px-7 py-2.5 bg-white hover:bg-rose-50 active:bg-rose-100 hover:text-rose-700 hover:border-rose-700 border-2 border-zinc-900 rounded-sm font-bold text-xs sm:text-sm text-zinc-900 shadow-[3px_3px_0px_#18181b] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer ${fontMain}`}
        >
          Eliminar
        </button>

        {/* Botón 3: Agregar */}
        <button
          type="button"
          id="btn-agregar-catalogo"
          onClick={handleOpenAgregar}
          className={`px-6 sm:px-8 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white border-2 border-zinc-900 rounded-sm font-black text-xs sm:text-sm uppercase tracking-wide shadow-[3px_3px_0px_#18181b] hover:shadow-[4px_4px_0px_#1e3a8a] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer ${fontMain}`}
        >
          Agregar
        </button>
      </div>

      {/* ================= MODAL SIMPLE DE AGREGAR / MODIFICAR ================= */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="w-full max-w-md bg-white border-3 border-zinc-900 rounded-sm shadow-[6px_6px_0px_#18181b] p-5 sm:p-6 flex flex-col gap-4">
            <div className="border-b-2 border-dashed border-zinc-300 pb-2 flex items-center justify-between">
              <h3
                className={`font-black text-base sm:text-lg text-zinc-900 tracking-wide uppercase ${fontMain}`}
              >
                {modalOpen === 'agregar'
                  ? `Agregar Nuevo ${activeTab === 'CONTENEDOR' ? 'Contenedor' : activeTab === 'VOLUMEN' ? 'Volumen' : activeTab === 'DESPACHO' ? 'Despacho' : activeTab === 'ENTORNO' ? 'Entorno' : 'Almacén'}`
                  : `Modificar ${activeTab === 'CONTENEDOR' ? 'Contenedor' : activeTab === 'VOLUMEN' ? 'Volumen' : activeTab === 'DESPACHO' ? 'Despacho' : activeTab === 'ENTORNO' ? 'Entorno' : 'Almacén'}`}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(null)}
                className="font-mono font-bold text-lg p-1 hover:text-rose-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={modalOpen === 'agregar' ? handleConfirmAgregar : handleConfirmModificar}
              className="flex flex-col gap-3.5"
            >
              {/* Formulario para Almacenes */}
              {activeTab === 'ÁLMACENES' && (
                <>
                  <div className="flex flex-col gap-1">
                    <label className={`font-bold text-xs sm:text-sm text-zinc-900 ${fontMain}`}>
                      Código:
                    </label>
                    <input
                      type="text"
                      value={formAlmacenCodigo}
                      onChange={(e) => setFormAlmacenCodigo(e.target.value)}
                      className="w-full h-9 px-3 bg-white border-2 border-zinc-900 rounded-sm font-mono text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className={`font-bold text-xs sm:text-sm text-zinc-900 ${fontMain}`}>
                      Descripción:
                    </label>
                    <input
                      type="text"
                      value={formAlmacenDescripcion}
                      onChange={(e) => setFormAlmacenDescripcion(e.target.value)}
                      className="w-full h-9 px-3 bg-white border-2 border-zinc-900 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className={`font-bold text-xs sm:text-sm text-zinc-900 ${fontMain}`}>
                      Dirección:
                    </label>
                    <input
                      type="text"
                      value={formAlmacenDireccion}
                      onChange={(e) => setFormAlmacenDireccion(e.target.value)}
                      className="w-full h-9 px-3 bg-white border-2 border-zinc-900 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
                    />
                  </div>
                </>
              )}

              {/* Formulario para Contenedores */}
              {activeTab === 'CONTENEDOR' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className={`font-bold text-xs text-zinc-900 ${fontMain}`}>
                        Código:
                      </label>
                      <input
                        type="text"
                        value={formContCodigo}
                        onChange={(e) => setFormContCodigo(e.target.value)}
                        className="w-full h-9 px-2.5 bg-white border-2 border-zinc-900 rounded-sm font-mono text-xs font-bold"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className={`font-bold text-xs text-zinc-900 ${fontMain}`}>
                        Almacén (Ref):
                      </label>
                      <select
                        value={formContAlmacen}
                        onChange={(e) => setFormContAlmacen(e.target.value)}
                        className="w-full h-9 px-2 bg-white border-2 border-zinc-900 rounded-sm font-mono text-xs font-bold"
                      >
                        <option value="A001">A001 - Tio Ben</option>
                        <option value="A002">A002 - Central Norte</option>
                        <option value="A003">A003 - Deposito Callao</option>
                        <option value="A004">A004 - Frigorifico Sur</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className={`font-bold text-xs text-zinc-900 ${fontMain}`}>
                      Material:
                    </label>
                    <select
                      value={formContMaterial}
                      onChange={(e) => setFormContMaterial(e.target.value)}
                      className="w-full h-9 px-2 bg-white border-2 border-zinc-900 rounded-sm font-mono text-xs font-bold"
                    >
                      <option value="Metálico">Metálico</option>
                      <option value="Plástico">Plástico</option>
                      <option value="Cartón corrugado">Cartón corrugado</option>
                      <option value="Metálico con aislante térmico">Metálico con aislante térmico</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className={`font-bold text-xs text-zinc-900 ${fontMain}`}>
                        Volumen (Ref):
                      </label>
                      <select
                        value={formContVolumen}
                        onChange={(e) => setFormContVolumen(e.target.value)}
                        className="w-full h-9 px-2 bg-white border-2 border-zinc-900 rounded-sm font-mono text-xs font-bold"
                      >
                        {volumenes.map((v) => (
                          <option key={v.id} value={v.codigo}>
                            {v.codigo} ({v.umVolumen} m³)
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className={`font-bold text-xs text-zinc-900 ${fontMain}`}>
                        Peso Máximo:
                      </label>
                      <input
                        type="text"
                        value={formContPesoMaximo}
                        onChange={(e) => setFormContPesoMaximo(e.target.value)}
                        placeholder="ej. 28,000 kg"
                        className="w-full h-9 px-2.5 bg-white border-2 border-zinc-900 rounded-sm text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className={`font-bold text-xs text-zinc-900 ${fontMain}`}>
                      Entorno (Ref):
                    </label>
                    <select
                      value={formContEntorno}
                      onChange={(e) => setFormContEntorno(e.target.value)}
                      className="w-full h-9 px-2 bg-white border-2 border-zinc-900 rounded-sm font-mono text-xs font-bold"
                    >
                      <option value="E001">E001 - Estándar / Seco</option>
                      <option value="E002">E002 - Temperatura Controlada</option>
                      <option value="E003">E003 - Atmósfera Modificada</option>
                      <option value="E004">E004 - Refrigerado / Congelado</option>
                    </select>
                  </div>
                </>
              )}

              {/* Formulario para Volumen */}
              {activeTab === 'VOLUMEN' && (
                <>
                  <div className="flex flex-col gap-1">
                    <label className={`font-bold text-xs text-zinc-900 ${fontMain}`}>
                      Código:
                    </label>
                    <input
                      type="text"
                      value={formVolCodigo}
                      onChange={(e) => setFormVolCodigo(e.target.value)}
                      className="w-full h-9 px-2.5 bg-white border-2 border-zinc-900 rounded-sm font-mono text-xs font-bold"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col gap-1">
                      <label className={`font-bold text-xs text-zinc-900 ${fontMain}`}>
                        Largo (m):
                      </label>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={formVolLargo}
                        onChange={(e) => setFormVolLargo(Math.max(1, Math.round(Number(e.target.value)) || 1))}
                        className="w-full h-9 px-2 bg-white border-2 border-zinc-900 rounded-sm font-mono text-xs font-bold text-center"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className={`font-bold text-xs text-zinc-900 ${fontMain}`}>
                        Ancho (m):
                      </label>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={formVolAncho}
                        onChange={(e) => setFormVolAncho(Math.max(1, Math.round(Number(e.target.value)) || 1))}
                        className="w-full h-9 px-2 bg-white border-2 border-zinc-900 rounded-sm font-mono text-xs font-bold text-center"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className={`font-bold text-xs text-zinc-900 ${fontMain}`}>
                        Alto (m):
                      </label>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={formVolAlto}
                        onChange={(e) => setFormVolAlto(Math.max(1, Math.round(Number(e.target.value)) || 1))}
                        className="w-full h-9 px-2 bg-white border-2 border-zinc-900 rounded-sm font-mono text-xs font-bold text-center"
                        required
                      />
                    </div>
                  </div>

                  {/* U.M. (m³) calculada automáticamente */}
                  <div className="p-2.5 bg-zinc-100 border-2 border-zinc-900 rounded-sm flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-zinc-800">U.M. Calculada (m³):</span>
                    <span className="font-black text-sm text-zinc-900 bg-white px-2.5 py-0.5 border border-zinc-900 rounded-xs">
                      {(formVolLargo || 0) * (formVolAncho || 0) * (formVolAlto || 0)} m³
                    </span>
                  </div>

                  {/* Precio por m³ (no debe pasar de 10 soles) */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <label className={`font-bold text-xs text-zinc-900 ${fontMain}`}>
                        Precio por m³ (Soles):
                      </label>
                      <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 border border-amber-300 rounded-xs">
                        Máximo S/ 10
                      </span>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-2 font-mono font-bold text-xs text-zinc-700">S/</span>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        step="1"
                        value={formVolPrecioM3}
                        onChange={(e) => {
                          const val = Math.round(Number(e.target.value));
                          setFormVolPrecioM3(val > 10 ? 10 : val < 1 ? 1 : val);
                        }}
                        className="w-full h-9 pl-8 pr-3 bg-white border-2 border-zinc-900 rounded-sm font-mono text-xs font-bold"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Formulario para Despacho */}
              {activeTab === 'DESPACHO' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className={`font-bold text-xs text-zinc-900 ${fontMain}`}>
                        Código:
                      </label>
                      <input
                        type="text"
                        value={formDespCodigo}
                        onChange={(e) => setFormDespCodigo(e.target.value)}
                        className="w-full h-9 px-2.5 bg-white border-2 border-zinc-900 rounded-sm font-mono text-xs font-bold"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className={`font-bold text-xs text-zinc-900 ${fontMain}`}>
                        Contenedor (Ref):
                      </label>
                      <select
                        value={formDespContenedor}
                        onChange={(e) => setFormDespContenedor(e.target.value)}
                        className="w-full h-9 px-2 bg-white border-2 border-zinc-900 rounded-sm font-mono text-xs font-bold"
                      >
                        {contenedores.map((c) => (
                          <option key={c.id} value={c.codigo}>
                            {c.codigo} ({c.material})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className={`font-bold text-xs text-zinc-900 ${fontMain}`}>
                      Embalaje:
                    </label>
                    <select
                      value={formDespEmbalaje}
                      onChange={(e) => setFormDespEmbalaje(e.target.value)}
                      className="w-full h-9 px-2 bg-white border-2 border-zinc-900 rounded-sm text-xs font-bold"
                    >
                      {EMBALAJE_OPCIONES.map((emb) => (
                        <option key={emb} value={emb}>
                          {emb}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Precio de Embalaje (< 50 soles) */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <label className={`font-bold text-xs text-zinc-900 ${fontMain}`}>
                        Precio de Embalaje (Soles):
                      </label>
                      <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 border border-emerald-300 rounded-xs">
                        Accesible (&lt; S/ 50)
                      </span>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-2 font-mono font-bold text-xs text-zinc-700">S/</span>
                      <input
                        type="number"
                        min="1"
                        max="49"
                        step="1"
                        value={formDespPrecio}
                        onChange={(e) => {
                          const val = Math.round(Number(e.target.value));
                          setFormDespPrecio(val >= 50 ? 49 : val < 1 ? 1 : val);
                        }}
                        className="w-full h-9 pl-8 pr-3 bg-white border-2 border-zinc-900 rounded-sm font-mono text-xs font-bold"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Formulario para Entorno (Columnas: Código, Refrigeración (SI/NO), Ventilación (SI/NO), Temperatura (rango), Presión, Humedad (%)) */}
              {activeTab === 'ENTORNO' && (
                <>
                  <div className="flex flex-col gap-1">
                    <label className={`font-bold text-xs text-zinc-900 ${fontMain}`}>
                      Código:
                    </label>
                    <input
                      type="text"
                      value={formEntCodigo}
                      onChange={(e) => setFormEntCodigo(e.target.value)}
                      className="w-full h-9 px-2.5 bg-white border-2 border-zinc-900 rounded-sm font-mono text-xs font-bold"
                      placeholder="ej. E011"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className={`font-bold text-xs text-zinc-900 ${fontMain}`}>
                        Refrigeración:
                      </label>
                      <select
                        value={formEntRefrigeracion}
                        onChange={(e) => setFormEntRefrigeracion(e.target.value as 'SI' | 'NO')}
                        className="w-full h-9 px-2 bg-white border-2 border-zinc-900 rounded-sm font-mono text-xs font-bold"
                      >
                        <option value="SI">SI</option>
                        <option value="NO">NO</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className={`font-bold text-xs text-zinc-900 ${fontMain}`}>
                        Ventilación:
                      </label>
                      <select
                        value={formEntVentilacion}
                        onChange={(e) => setFormEntVentilacion(e.target.value as 'SI' | 'NO')}
                        className="w-full h-9 px-2 bg-white border-2 border-zinc-900 rounded-sm font-mono text-xs font-bold"
                      >
                        <option value="SI">SI</option>
                        <option value="NO">NO</option>
                      </select>
                    </div>
                  </div>

                  {/* Temperatura (rango) */}
                  <div className="flex flex-col gap-1">
                    <label className={`font-bold text-xs text-zinc-900 ${fontMain}`}>
                      Temperatura (Rango):
                    </label>
                    <input
                      type="text"
                      value={formEntTemperatura}
                      onChange={(e) => setFormEntTemperatura(e.target.value)}
                      className="w-full h-9 px-2.5 bg-white border-2 border-zinc-900 rounded-sm font-mono text-xs font-bold"
                      placeholder="ej. 2°C a 8°C o -18°C a -15°C"
                      required
                    />
                  </div>

                  {/* Presión (rango o valor fijo) */}
                  <div className="flex flex-col gap-1">
                    <label className={`font-bold text-xs text-zinc-900 ${fontMain}`}>
                      Presión (Rango o Valor fijo):
                    </label>
                    <input
                      type="text"
                      value={formEntPresion}
                      onChange={(e) => setFormEntPresion(e.target.value)}
                      className="w-full h-9 px-2.5 bg-white border-2 border-zinc-900 rounded-sm font-mono text-xs font-bold"
                      placeholder="ej. 1.0 atm o 1.0 a 1.2 atm"
                      required
                    />
                  </div>

                  {/* Humedad (%) */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <label className={`font-bold text-xs text-zinc-900 ${fontMain}`}>
                        Humedad (%):
                      </label>
                      <span className="text-[10px] font-mono text-zinc-500">
                        Rango: 0% - 100%
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        value={formEntHumedad}
                        onChange={(e) => {
                          const val = Math.round(Number(e.target.value));
                          setFormEntHumedad(val > 100 ? 100 : val < 0 ? 0 : val);
                        }}
                        className="w-full h-9 pl-3 pr-8 bg-white border-2 border-zinc-900 rounded-sm font-mono text-xs font-bold"
                        required
                      />
                      <span className="absolute right-3 top-2 font-mono font-bold text-xs text-zinc-700">%</span>
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(null)}
                  className={`px-4 py-1.5 border-2 border-zinc-900 rounded-sm bg-white hover:bg-zinc-100 text-xs font-bold text-zinc-900 shadow-[2px_2px_0px_#18181b] cursor-pointer ${fontMain}`}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`px-5 py-1.5 border-2 border-zinc-900 rounded-sm bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase shadow-[2px_2px_0px_#18181b] cursor-pointer ${fontMain}`}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
