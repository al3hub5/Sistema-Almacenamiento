import React, { useState } from 'react';
import { DiagramStyleMode } from '../types';

interface SecurityViewProps {
  styleMode: DiagramStyleMode;
  onGoBack: () => void;
}

export interface UserRoleProfile {
  id: string;
  name: string;
  permissions: string[];
}

export const MASTER_PERMISSIONS: string[] = [
  'Seguridad',
  'Mantenimiento de Base de Datos',
  'Contingencia',
  'Catálogo de Mercancías',
  'Catálogo de Contenedores',
  'Parámetros de Regla',
  'Parámetros de Política',
  'Consultas',
  'Estadística',
  'Data-Entry',
  'Reportes',
];

export const INITIAL_PROFILES: UserRoleProfile[] = [
  {
    id: '1',
    name: 'Administrador BD',
    permissions: [
      'Seguridad',
      'Mantenimiento de Base de Datos',
      'Contingencia',
    ],
  },
  {
    id: '2',
    name: 'Gerente',
    permissions: [
      'Catálogo de Mercancías',
      'Catálogo de Contenedores',
      'Parámetros de Regla',
      'Parámetros de Política',
      'Consultas',
      'Estadística',
    ],
  },
  {
    id: '3',
    name: 'Cliente',
    permissions: [
      'Data-Entry',
      'Reportes',
    ],
  },
  {
    id: '4',
    name: 'Operador de Recepción',
    permissions: [
      'Data-Entry',
      'Reportes',
    ],
  },
  {
    id: '5',
    name: 'Operador de Almacén',
    permissions: [
      'Data-Entry',
      'Consultas',
    ],
  },
  {
    id: '6',
    name: 'Operador de Despacho',
    permissions: [
      'Data-Entry',
      'Reportes',
    ],
  },
];

export const SecurityView: React.FC<SecurityViewProps> = ({
  styleMode,
  onGoBack,
}) => {
  const isSketch = styleMode === 'sketch';
  const fontMain = isSketch ? 'font-sketch' : 'font-tech';

  // Arreglo de perfiles dinámico
  const [profiles, setProfiles] = useState<UserRoleProfile[]>(INITIAL_PROFILES);
  const [selectedProfileId, setSelectedProfileId] = useState<string>('2'); // Gerente por defecto

  // Estado de los Modales
  const [activeModal, setActiveModal] = useState<
    'nuevo' | 'editar' | 'eliminar' | null
  >(null);
  const [modalInputName, setModalInputName] = useState<string>('');
  const [modalError, setModalError] = useState<string>('');

  // Perfil actualmente seleccionado
  const selectedProfile =
    profiles.find((p) => p.id === selectedProfileId) || profiles[0] || null;

  // Manejo de Checkbox de permisos en tiempo real
  const handleTogglePermission = (permission: string) => {
    if (!selectedProfile) return;

    setProfiles((prev) =>
      prev.map((profile) => {
        if (profile.id !== selectedProfile.id) return profile;

        const hasPermission = profile.permissions.includes(permission);
        const updatedPermissions = hasPermission
          ? profile.permissions.filter((p) => p !== permission)
          : [...profile.permissions, permission];

        return {
          ...profile,
          permissions: updatedPermissions,
        };
      })
    );
  };

  // Abrir Modal Nuevo
  const handleOpenNuevo = () => {
    setModalInputName('');
    setModalError('');
    setActiveModal('nuevo');
  };

  // Abrir Modal Editar
  const handleOpenEditar = () => {
    if (!selectedProfile) return;
    setModalInputName(selectedProfile.name);
    setModalError('');
    setActiveModal('editar');
  };

  // Abrir Modal Eliminar
  const handleOpenEliminar = () => {
    if (!selectedProfile) return;
    setActiveModal('eliminar');
  };

  // Cerrar cualquier Modal
  const handleCloseModal = () => {
    setActiveModal(null);
    setModalInputName('');
    setModalError('');
  };

  // Guardar Nuevo Perfil
  const handleConfirmNuevo = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = modalInputName.trim();
    if (!trimmed) {
      setModalError('Por favor ingrese un nombre para el tipo de usuario.');
      return;
    }

    const newId = Date.now().toString();
    const newProfile: UserRoleProfile = {
      id: newId,
      name: trimmed,
      permissions: [],
    };

    setProfiles((prev) => [...prev, newProfile]);
    setSelectedProfileId(newId);
    handleCloseModal();
  };

  // Guardar Edición de Perfil
  const handleConfirmEditar = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = modalInputName.trim();
    if (!trimmed) {
      setModalError('El nombre no puede estar vacío.');
      return;
    }
    if (!selectedProfile) return;

    setProfiles((prev) =>
      prev.map((p) => (p.id === selectedProfile.id ? { ...p, name: trimmed } : p))
    );
    handleCloseModal();
  };

  // Confirmar Eliminación
  const handleConfirmEliminar = () => {
    if (!selectedProfile) return;

    const remaining = profiles.filter((p) => p.id !== selectedProfile.id);
    setProfiles(remaining);
    if (remaining.length > 0) {
      setSelectedProfileId(remaining[0].id);
    } else {
      setSelectedProfileId('');
    }
    handleCloseModal();
  };

  return (
    <div
      id="vista-seguridad"
      className="w-full max-w-5xl mx-auto px-2 sm:px-6 py-4 flex flex-col gap-6"
    >
      {/* ================= BARRA SUPERIOR DE LA VISTA ================= */}
      <div
        id="barra-superior-seguridad"
        className="w-full flex flex-wrap items-center justify-between gap-4 pb-3 border-b-2 border-dashed border-zinc-400 select-none"
      >
        {/* Botón <- Regresar en la esquina izquierda */}
        <button
          id="btn-regresar"
          type="button"
          onClick={onGoBack}
          title="Regresar a la Vista de Arquitectura"
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-white hover:bg-zinc-100 active:bg-zinc-200 border-2 border-zinc-900 rounded-sm font-bold text-xs sm:text-sm text-zinc-900 shadow-[3px_3px_0px_#18181b] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer ${fontMain}`}
        >
          <span className="text-base font-mono">&larr;</span>
          <span>Regresar</span>
        </button>

        {/* Botones de acción centrados / al lado derecho del botón regresar */}
        <div
          id="botones-accion-seguridad"
          className="flex items-center justify-center gap-2 sm:gap-3"
        >
          <button
            type="button"
            id="btn-accion-nuevo"
            onClick={handleOpenNuevo}
            title="Crear un nuevo tipo de usuario"
            className={`px-3.5 sm:px-5 py-1.5 sm:py-2 bg-white hover:bg-zinc-100 active:bg-zinc-200 border-2 border-zinc-900 rounded-sm font-bold text-xs sm:text-sm text-zinc-900 shadow-[2.5px_2.5px_0px_#18181b] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer ${fontMain}`}
          >
            + Nuevo
          </button>
          <button
            type="button"
            id="btn-accion-editar"
            onClick={handleOpenEditar}
            disabled={!selectedProfile}
            title="Editar nombre del perfil seleccionado"
            className={`px-3.5 sm:px-5 py-1.5 sm:py-2 bg-white hover:bg-zinc-100 active:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-zinc-900 rounded-sm font-bold text-xs sm:text-sm text-zinc-900 shadow-[2.5px_2.5px_0px_#18181b] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer ${fontMain}`}
          >
            Editar
          </button>
          <button
            type="button"
            id="btn-accion-eliminar"
            onClick={handleOpenEliminar}
            disabled={!selectedProfile}
            title="Eliminar perfil seleccionado"
            className={`px-3.5 sm:px-5 py-1.5 sm:py-2 bg-white hover:bg-zinc-100 active:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-zinc-900 rounded-sm font-bold text-xs sm:text-sm text-zinc-900 shadow-[2.5px_2.5px_0px_#18181b] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer ${fontMain}`}
          >
            Eliminar
          </button>
        </div>

        {/* Espaciador para balance visual en pantallas grandes */}
        <div className="hidden sm:block w-24"></div>
      </div>

      {/* ================= CONTENIDO PRINCIPAL: DOS COLUMNAS ================= */}
      <div
        id="columnas-perfiles-permisos"
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start"
      >
        {/* ----------------- COLUMNA IZQUIERDA: TIPO DE USUARIO ----------------- */}
        <div
          id="columna-tipo-usuario"
          className="w-full border-2 sm:border-3 border-zinc-900 bg-white rounded-sm shadow-[4px_4px_0px_#18181b] overflow-hidden flex flex-col"
        >
          {/* Encabezado resaltado */}
          <div
            id="encabezado-tipo-usuario"
            className="bg-zinc-200 border-b-2 sm:border-b-3 border-zinc-900 px-4 py-2.5 flex items-center justify-between select-none"
          >
            <h2
              className={`font-bold text-sm sm:text-base text-zinc-900 tracking-wider uppercase ${fontMain}`}
            >
              Tipo de Usuario
            </h2>
            <span className="text-[11px] font-mono bg-white px-2 py-0.5 border border-zinc-800 rounded-sm font-bold">
              Roles: {profiles.length}
            </span>
          </div>

          {/* Cuerpo con lista de roles con scroll real (overflow-y: auto y altura fija 320px) */}
          <div
            id="lista-roles-scrollable"
            className="w-full h-[320px] overflow-y-auto bg-white divide-y divide-zinc-200 select-none border-t border-zinc-100"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#18181b #f4f4f5',
            }}
          >
            {profiles.length === 0 ? (
              <div className="p-8 text-center text-zinc-500 font-mono text-sm">
                No hay perfiles registrados. Haz clic en "+ Nuevo" para crear uno.
              </div>
            ) : (
              profiles.map((profile) => {
                const isSelected = selectedProfile?.id === profile.id;
                return (
                  <div
                    key={profile.id}
                    id={`rol-item-${profile.id}`}
                    onClick={() => setSelectedProfileId(profile.id)}
                    className={`px-4 py-3 text-xs sm:text-sm font-semibold flex items-center justify-between cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-zinc-900 text-white font-bold'
                        : 'text-zinc-800 hover:bg-zinc-100'
                    } ${fontMain}`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span
                        className={`inline-block w-2.5 h-2.5 rounded-full border shrink-0 ${
                          isSelected
                            ? 'bg-white border-white'
                            : 'bg-zinc-300 border-zinc-600'
                        }`}
                      />
                      <span className="tracking-wide truncate">
                        {profile.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-xs border ${
                          isSelected
                            ? 'bg-zinc-800 border-zinc-500 text-zinc-200'
                            : 'bg-zinc-100 border-zinc-300 text-zinc-600'
                        }`}
                      >
                        {profile.permissions.length} perm.
                      </span>

                      {isSelected && (
                        <span className="text-[10px] uppercase tracking-wider font-mono bg-zinc-800 text-zinc-100 px-1.5 py-0.5 border border-zinc-400 rounded-sm">
                          [Activo]
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ----------------- COLUMNA DERECHA: ACCESOS ASIGNADOS ----------------- */}
        <div
          id="columna-accesos-asignados"
          className="w-full border-2 sm:border-3 border-zinc-900 bg-white rounded-sm shadow-[4px_4px_0px_#18181b] overflow-hidden flex flex-col"
        >
          {/* Encabezado resaltado */}
          <div
            id="encabezado-accesos-asignados"
            className="bg-zinc-200 border-b-2 sm:border-b-3 border-zinc-900 px-4 py-2.5 flex items-center justify-between select-none"
          >
            <h2
              className={`font-bold text-sm sm:text-base text-zinc-900 tracking-wider uppercase ${fontMain}`}
            >
              Accesos Asignados
            </h2>
            <span className="text-[11px] font-mono bg-white px-2 py-0.5 border border-zinc-800 rounded-sm font-bold truncate max-w-[200px]">
              {selectedProfile
                ? `${selectedProfile.name} (${selectedProfile.permissions.length}/${MASTER_PERMISSIONS.length})`
                : 'Sin Selección'}
            </span>
          </div>

          {/* Cuerpo con lista de 15 permisos con checkbox interactivo y scroll real (320px) */}
          <div
            id="lista-permisos-scrollable"
            className="w-full h-[320px] overflow-y-auto bg-white divide-y divide-zinc-200 select-none border-t border-zinc-100"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#18181b #f4f4f5',
            }}
          >
            {!selectedProfile ? (
              <div className="p-8 text-center text-zinc-500 font-mono text-sm">
                Seleccione un tipo de usuario para configurar sus accesos.
              </div>
            ) : (
              MASTER_PERMISSIONS.map((permission, index) => {
                const isChecked = selectedProfile.permissions.includes(permission);
                return (
                  <label
                    key={permission}
                    htmlFor={`checkbox-permiso-${index}`}
                    className={`px-4 py-2.5 text-xs sm:text-sm font-semibold flex items-center justify-between cursor-pointer hover:bg-zinc-50 transition-colors ${fontMain}`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Checkbox nativo estilizado en wireframe */}
                      <input
                        type="checkbox"
                        id={`checkbox-permiso-${index}`}
                        checked={isChecked}
                        onChange={() => handleTogglePermission(permission)}
                        className="w-4 h-4 accent-zinc-900 cursor-pointer border-2 border-zinc-900 rounded-xs"
                      />
                      <span
                        className={`tracking-wide ${
                          isChecked ? 'text-zinc-950 font-bold' : 'text-zinc-700'
                        }`}
                      >
                        {permission}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-mono uppercase px-1.5 py-0.5 border rounded-xs ${
                        isChecked
                          ? 'bg-zinc-900 text-white border-zinc-900 font-bold'
                          : 'bg-zinc-100 text-zinc-400 border-zinc-200'
                      }`}
                    >
                      {isChecked ? 'Habilitado' : 'Inactivo'}
                    </span>
                  </label>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* ================= MODALES CON OVERLAY OSCURO SEMITRANSPARENTE ================= */}
      {activeModal && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-[1px] animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
        >
          {/* 1. MODAL: NUEVO TIPO DE USUARIO */}
          {activeModal === 'nuevo' && (
            <div
              id="modal-nuevo"
              className="w-full max-w-md bg-white border-3 border-zinc-900 rounded-sm shadow-[6px_6px_0px_#18181b] p-6 flex flex-col gap-4 select-none"
            >
              <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-2">
                <h3
                  className={`text-base sm:text-lg font-black text-zinc-900 uppercase tracking-wider ${fontMain}`}
                >
                  Nuevo Tipo de Usuario
                </h3>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="w-6 h-6 border-2 border-zinc-900 flex items-center justify-center text-xs font-mono font-bold hover:bg-zinc-100"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleConfirmNuevo} className="flex flex-col gap-3">
                <label
                  htmlFor="input-nuevo-perfil"
                  className={`text-xs sm:text-sm font-bold text-zinc-800 ${fontMain}`}
                >
                  Ingrese el nombre:
                </label>
                <input
                  id="input-nuevo-perfil"
                  type="text"
                  autoFocus
                  value={modalInputName}
                  onChange={(e) => {
                    setModalInputName(e.target.value);
                    if (modalError) setModalError('');
                  }}
                  placeholder="Ej. Inspector de Calidad"
                  className={`w-full px-3 py-2 border-2 border-zinc-900 bg-white text-zinc-900 font-semibold text-sm shadow-[2px_2px_0px_#18181b] focus:outline-none focus:ring-1 focus:ring-zinc-900 ${fontMain}`}
                />
                {modalError && (
                  <p className="text-xs text-red-600 font-bold font-mono">
                    {modalError}
                  </p>
                )}

                <div className="flex items-center justify-end gap-3 pt-3 border-t-2 border-dashed border-zinc-300 mt-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className={`px-4 py-1.5 border-2 border-zinc-900 bg-white hover:bg-zinc-100 text-zinc-900 font-bold text-xs sm:text-sm shadow-[2px_2px_0px_#18181b] cursor-pointer ${fontMain}`}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className={`px-5 py-1.5 border-2 border-zinc-900 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm shadow-[2px_2px_0px_#18181b] cursor-pointer ${fontMain}`}
                  >
                    Agregar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 2. MODAL: EDITAR TIPO DE USUARIO */}
          {activeModal === 'editar' && (
            <div
              id="modal-editar"
              className="w-full max-w-md bg-white border-3 border-zinc-900 rounded-sm shadow-[6px_6px_0px_#18181b] p-6 flex flex-col gap-4 select-none"
            >
              <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-2">
                <h3
                  className={`text-base sm:text-lg font-black text-zinc-900 uppercase tracking-wider ${fontMain}`}
                >
                  Editar Tipo de Usuario
                </h3>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="w-6 h-6 border-2 border-zinc-900 flex items-center justify-center text-xs font-mono font-bold hover:bg-zinc-100"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleConfirmEditar} className="flex flex-col gap-3">
                <label
                  htmlFor="input-editar-perfil"
                  className={`text-xs sm:text-sm font-bold text-zinc-800 ${fontMain}`}
                >
                  Modificar nombre del perfil:
                </label>
                <input
                  id="input-editar-perfil"
                  type="text"
                  autoFocus
                  value={modalInputName}
                  onChange={(e) => {
                    setModalInputName(e.target.value);
                    if (modalError) setModalError('');
                  }}
                  className={`w-full px-3 py-2 border-2 border-zinc-900 bg-white text-zinc-900 font-semibold text-sm shadow-[2px_2px_0px_#18181b] focus:outline-none focus:ring-1 focus:ring-zinc-900 ${fontMain}`}
                />
                {modalError && (
                  <p className="text-xs text-red-600 font-bold font-mono">
                    {modalError}
                  </p>
                )}

                <div className="flex items-center justify-end gap-3 pt-3 border-t-2 border-dashed border-zinc-300 mt-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className={`px-4 py-1.5 border-2 border-zinc-900 bg-white hover:bg-zinc-100 text-zinc-900 font-bold text-xs sm:text-sm shadow-[2px_2px_0px_#18181b] cursor-pointer ${fontMain}`}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className={`px-5 py-1.5 border-2 border-zinc-900 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm shadow-[2px_2px_0px_#18181b] cursor-pointer ${fontMain}`}
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 3. MODAL: ELIMINAR (CONFIRMACIÓN) */}
          {activeModal === 'eliminar' && (
            <div
              id="modal-eliminar"
              className="w-full max-w-md bg-white border-3 border-zinc-900 rounded-sm shadow-[6px_6px_0px_#18181b] p-6 flex flex-col gap-4 select-none"
            >
              <div className="flex items-center justify-between border-b-2 border-zinc-900 pb-2">
                <h3
                  className={`text-base sm:text-lg font-black text-red-700 uppercase tracking-wider ${fontMain}`}
                >
                  Eliminar
                </h3>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="w-6 h-6 border-2 border-zinc-900 flex items-center justify-center text-xs font-mono font-bold hover:bg-zinc-100"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-3 py-1">
                <p className={`text-sm font-semibold text-zinc-800 ${fontMain}`}>
                  ¿Está seguro que desea eliminar este tipo de usuario?
                </p>

                {selectedProfile && (
                  <div className="bg-zinc-100 border-2 border-dashed border-zinc-900 p-3 rounded-xs flex items-center justify-between">
                    <span className="font-mono text-xs text-zinc-600">
                      Perfil seleccionado:
                    </span>
                    <span className="font-mono text-sm font-bold text-zinc-900">
                      {selectedProfile.name}
                    </span>
                  </div>
                )}

                <p className="text-xs text-zinc-500 font-mono">
                  Esta acción eliminará el perfil y sus accesos asignados de la lista.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t-2 border-dashed border-zinc-300 mt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className={`px-4 py-1.5 border-2 border-zinc-900 bg-white hover:bg-zinc-100 text-zinc-900 font-bold text-xs sm:text-sm shadow-[2px_2px_0px_#18181b] cursor-pointer ${fontMain}`}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmEliminar}
                  className={`px-5 py-1.5 border-2 border-red-700 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-[2px_2px_0px_#991b1b] cursor-pointer ${fontMain}`}
                >
                  Eliminar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
