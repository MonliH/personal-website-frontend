"use client";

import { useEffect, useRef } from "react";
import Stage from "@/libs/engine/Stage.js";
import HomeSvg from "../../public/paths/home.svg";

export default function Fluid() {
  const canvasContainer = useRef<HTMLDivElement>(null!);
  const homeSvg = useRef<SVGSVGElement>(null!);

  useEffect(() => {
    Stage.initialize(canvasContainer.current, "full", homeSvg);
    return () => {
      // Stage.destroy();
    };
  }, []);

  return (
    <>
<div
      className="w-screen h-screen z-100 fixed top-0 left-0 [&_canvas]:w-full [&_canvas]:h-full"
      ref={canvasContainer}
    >
    </div>
      <HomeSvg className="absolute top-0 h-[690px] w-11/12 lg:left-16 lg:w-[80%] lg:h-[92%] 2xl:h-[90%] 2xl:w-[85%] pointer-events-none" id="svg" />
    </>
    
  );
}
