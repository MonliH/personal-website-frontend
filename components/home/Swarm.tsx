import { useState, useMemo, useEffect, useRef } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";
import * as COLORS from "nice-color-palettes";

import { CursorState } from "@components/home/Cursor";

const Swarm = ({
  count,
  setCursor,
}: {
  count: number;
  setCursor: (cursor: CursorState) => void;
}) => {
  const [hover, setHover] = useState<null | number>(null);
  const tempColor = new THREE.Color();
  const colors = useRef(
    new Array(count).fill(0).map(() => COLORS[0][Math.floor(Math.random() * 5)])
  );

  useEffect(() => {
    if (hover) {
      setCursor({
        kind: "color-size",
        color: `${colors.current[hover]}46`,
        size: 1.5,
      });
    } else {
      setCursor({ kind: "default" });
    }
  }, [hover]);

  const colorArray = useMemo(
    () =>
      Float32Array.from(
        new Array(count)
          .fill(0)
          .flatMap((_, i) => tempColor.set(colors.current[i]).toArray())
      ),
    [count]
  );

  const mesh = useRef<THREE.InstancedMesh | null>(null);
  const [dummy] = useState(() => new THREE.Object3D());

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -20 + Math.random() * 40 + 30;
      const yFactor = -20 + Math.random() * 40;
      const zFactor = -20 + Math.random() * 40;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      particles.forEach((particle, i) => {
        const { factor, speed, xFactor, yFactor, zFactor } = particle;
        let { t } = particle;
        /* eslint-disable no-param-reassign */
        particle.t += speed / 2;
        t = particle.t;
        const a = Math.cos(t) + Math.sin(t * 1) / 10;
        const b = Math.sin(t) + Math.cos(t * 2) / 10;
        const s = Math.max(1.5, Math.cos(t) * 5);
        particle.mx +=
          (state.mouse.x * state.viewport.width - particle.mx) * 0.02;
        particle.my +=
          (state.mouse.y * state.viewport.height - particle.my) * 0.02;
        /* eslint-enable no-param-reassign */
        dummy.position.set(
          (particle.mx / 10) * a +
            xFactor +
            Math.cos((t / 10) * factor) +
            (Math.sin(t * 1) * factor) / 10,
          (particle.my / 10) * b +
            yFactor +
            Math.sin((t / 10) * factor) +
            (Math.cos(t * 2) * factor) / 10,
          (particle.my / 10) * b +
            zFactor +
            Math.cos((t / 10) * factor) +
            (Math.sin(t * 3) * factor) / 10
        );
        dummy.scale.set(s, s, s);
        dummy.updateMatrix();
        mesh.current.setMatrixAt(i, dummy.matrix);
        tempColor.set(colors.current[i]).toArray(colorArray, i * 3);
        mesh.current.geometry.attributes.color.needsUpdate = true;
      });
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <instancedMesh
        ref={mesh}
        args={[null, null, count]}
        onPointerOut={() => setHover(undefined)}
        onPointerMove={(e) => setHover(e.instanceId)}
        castShadow
        receiveShadow
      >
        <sphereBufferGeometry args={[1, 32, 32]} attach="geometry">
          <instancedBufferAttribute
            attachObject={["attributes", "color"]}
            args={[colorArray, 3]}
          />
        </sphereBufferGeometry>
        <meshStandardMaterial attach="material" vertexColors />
      </instancedMesh>
    </>
  );
};
export default Swarm;
