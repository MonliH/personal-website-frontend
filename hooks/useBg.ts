import { useEffect } from "react";

const useBg = (color: string): void => {
  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, []);
};

export default useBg;
