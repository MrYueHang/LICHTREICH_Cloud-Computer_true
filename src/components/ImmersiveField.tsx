import { useMemo, useState } from 'react';
import type { CSSProperties, PointerEvent } from 'react';

type Props = {
  reducedMotion?: boolean;
  lowPower?: boolean;
};

type SceneVars = CSSProperties & {
  '--scene-rx': string;
  '--scene-ry': string;
  '--scene-drift': string;
};

export default function ImmersiveField({ reducedMotion = false, lowPower = false }: Props) {
  const [rotation, setRotation] = useState({ x: -9, y: 13 });
  const nodes = useMemo(() => (lowPower ? 7 : 13), [lowPower]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotion || lowPower) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    setRotation({ x: -9 + y * -12, y: 13 + x * 18 });
  }

  const sceneStyle: SceneVars = {
    '--scene-rx': `${rotation.x}deg`,
    '--scene-ry': `${rotation.y}deg`,
    '--scene-drift': reducedMotion || lowPower ? '0s' : '9s',
  };

  return (
    <div
      className={`immersive-field ${lowPower ? 'is-low-power' : ''} ${reducedMotion ? 'is-reduced' : ''}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => !reducedMotion && !lowPower && setRotation({ x: -9, y: 13 })}
      role="img"
      aria-label="Abstrakte 3D-Szene aus Lichtknoten, Bahnen und schwebenden Architekturfragmenten"
    >
      <div className="field-caption">interactive field / 01</div>
      <div className="field-stage" style={sceneStyle}>
        <div className="field-sun" />
        <div className="field-orbit field-orbit-one" />
        <div className="field-orbit field-orbit-two" />
        <div className="field-grid" />
        <div className="field-core">
          <span className="field-core-label">FORM / FLOW</span>
          <span className="field-core-mark">∞</span>
        </div>
        {Array.from({ length: nodes }).map((_, index) => (
          <span
            className="field-node"
            key={index}
            style={{ '--node-index': index } as CSSProperties}
          />
        ))}
        <div className="field-slab field-slab-a" />
        <div className="field-slab field-slab-b" />
      </div>
      <div className="field-footer">
        <span>move to map the space</span>
        <span>no WebGL? still readable.</span>
      </div>
    </div>
  );
}
