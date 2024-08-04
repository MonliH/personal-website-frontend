"use client";

import { useEffect, useRef } from "react";
import { ManagerContext, TestManager, useManager } from "./manager";

export default function ParticlesCanvas() {
  const glCanvasRef = useRef<HTMLCanvasElement>(null);
  const debugCanvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const manager = useRef<TestManager>(null!);

  useEffect(() => {
    const m = new TestManager();
    manager.current = m;

    const glCanvas = glCanvasRef.current;
    const debugCanvas = debugCanvasRef.current;
    const wrapper = wrapperRef.current;
    if (glCanvas && debugCanvas && wrapper) {
      const loop = () => {
        try {
          manager.current.SimulationLoop();
          window.requestAnimationFrame(loop);
        } catch (e) {
          console.error("Error during simulation loop", e);
        }
      };
      const init = () => {
        manager.current.init(glCanvas, debugCanvas, wrapper);
        window.requestAnimationFrame(loop);
      };
      window.requestAnimationFrame(init);
    }
  }, [
    debugCanvasRef.current,
    glCanvasRef.current,
    wrapperRef.current,
    manager,
  ]);

  return (
    <div ref={wrapperRef} className="absolute top-0 left-0 w-full h-full z-index-100 pointer-events-auto">
      <canvas ref={glCanvasRef} className="absolute top-0 left-0 w-full h-full z-index-100 pointer-events-auto"/>
      <canvas ref={debugCanvasRef} className="absolute top-0 left-0 w-full h-full z-index-100 pointer-events-auto"/>
    </div>
  );
}
