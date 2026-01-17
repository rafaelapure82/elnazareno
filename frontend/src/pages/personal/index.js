// src/modules/personal/index.js
export { default as PersonalLayout } from './componentes/PersonalLayout';
export { default as DocentesPage } from './paginas/DocentesPage';
export { default as AdministrativosPage } from './paginas/AdministrativosPage';
export { default as ObrerosPage } from './paginas/ObrerosPage';
export { usePersonal } from './hooks/usePersonal';
export { usePersonalFormulario } from './hooks/usePersonalFormulario';
export { useArchivos } from './hooks/useArchivos';
export { PersonalServicio } from './servicios/personal.servicio';