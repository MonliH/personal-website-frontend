export interface ColorSize {
  kind: "color-size";
  size: number;
  color: string;
}
export const colorSize: (c: string, s: number) => ColorSize = (
  c: string,
  s: number
) => ({
  kind: "color-size",
  size: s,
  color: c,
});

export interface Color {
  kind: "color";
  color: string;
}
export const color: (c: string) => Color = (c: string) => ({
  kind: "color",
  color: c,
});

export interface Size {
  kind: "size";
  size: number;
}
export const size: (s: number) => Size = (s: number) => ({
  kind: "size",
  size: s,
});

export interface Default {
  kind: "default";
}
export const def: Default = { kind: "default" };

export type CursorState = ColorSize | Color | Size | Default;
