import React, {
  ComponentType,
  useContext,
  createContext,
  useState,
} from "react";

import { CursorState } from "@lib/cursor";

interface CursorContextTy {
  cursorState: CursorState;
  setCursorState: (state: CursorState) => void;
}

export const CursorContext = createContext<CursorContextTy>({
  cursorState: { kind: "default" },
  setCursorState: () => {},
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
