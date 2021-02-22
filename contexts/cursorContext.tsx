import React, {
  ComponentType,
  useContext,
  createContext,
  useState,
} from "react";

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

interface CursorContextTy {
  cursorState: CursorState;
  setCursorState?: (state: CursorState) => void;
}

export const CursorContext = createContext<CursorContextTy>({
  cursorState: { kind: "default" },
});

export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
  const [cursor, setCursorState] = useState<CursorState>({ kind: "default" });

  const setCursor = (newCursor: CursorState) => {
    setCursorState(newCursor);
  };

  return (
    <CursorContext.Provider
      value={{ cursorState: cursor, setCursorState: setCursor }}
    >
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);

export const withCursorProvider = <P extends object>(
  Component: ComponentType<P>
) => {
  const WithCursored = (props: P) => {
    return (
      <CursorProvider>
        <Component {...props} />
      </CursorProvider>
    );
  };
  return WithCursored;
};
