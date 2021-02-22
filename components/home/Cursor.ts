export interface ColorSize {
  kind: "color-size";
  size: number;
  color: string;
}

export interface Color {
  kind: "color";
  color: string;
}

export interface Size {
  kind: "size";
  size: number;
}

export interface Default {
  kind: "default";
}

export type CursorState = ColorSize | Color | Size | Default;
