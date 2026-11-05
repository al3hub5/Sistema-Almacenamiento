export type DiagramStyleMode = 'sketch' | 'wireframe';
export type GridPattern = 'grid' | 'dots' | 'blank';

export type AppRoute = string;

export interface ArchitectureNode {
  id: string;
  label: string;
  level: number;
  parentId?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  url?: string;
  route?: string;
}

export interface ConnectionLine {
  id: string;
  fromId: string;
  toId: string;
  path: string;
}
