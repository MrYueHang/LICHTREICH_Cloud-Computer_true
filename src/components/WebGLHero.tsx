import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import * as THREE from 'three';
import './WebGLHero.css';

type Props = { reducedMotion?: boolean; lowPower?: boolean };
type SceneProps = { reducedMotion: boolean; lowPower: boolean };

const vertexShader = `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uFocus;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vPulse;
  void main() {
    vec3 p = position;
    float waveA = sin(p.y * 4.2 + uTime * 0.72 + uPointer.x * 2.0) * 0.085;
    float waveB = cos(p.x * 5.3 - uTime * 0.48 + uPointer.y * 1.6) * 0.06;
    float pulse = sin(uTime * 1.15 + length(p.xy) * 5.5) * 0.028 * (0.35 + uFocus * 0.65);
    p += normal * (waveA + waveB + pulse + uFocus * 0.13);
    vNormal = normal;
    vPosition = p;
    vPulse = waveA + waveB + pulse;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uCoral;
  uniform vec3 uCyan;
  uniform vec3 uAcid;
  uniform float uFocus;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vPulse;
  void main() {
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float rim = pow(1.0 - max(dot(normalize(vNormal), viewDir), 0.0), 2.2);
    float scan = 0.5 + 0.5 * sin(vPosition.y * 12.0 + uTime * 1.4);
    float field = smoothstep(-0.18, 0.22, vPulse + scan * 0.12);
    vec3 base = mix(uCyan, uCoral, field);
    base = mix(base, uAcid, rim * (0.55 + uFocus * 0.45));
    float light = 0.64 + 0.25 * sin(uTime * 0.7 + vPosition.x * 3.0);
    gl_FragColor = vec4(base * light + rim * 0.18, 0.96);
  }
`;

function supportsWebGL() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

function createParticles(count: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const radius = 1.9 + Math.random() * 1.35;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.cos(phi);
    positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
  }
  return positions;
}

function FieldScene({ reducedMotion, lowPower }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const { pointer } = useThree();
  const [focus, setFocus] = useState(0);
  const particleCount = lowPower ? 90 : 180;
  const particlePositions = useMemo(() => createParticles(particleCount), [particleCount]);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uPointer: { value: new THREE.Vector2() },
    uFocus: { value: 0 },
    uCoral: { value: new THREE.Color(0.88, 0.24, 0.17) },
    uCyan: { value: new THREE.Color(0.2, 0.72, 0.67) },
    uAcid: { value: new THREE.Color(0.78, 0.95, 0.24) },
  }), []);

  useFrame((state, delta) => {
    if (!group.current || !core.current || !material.current) return;
    const elapsed = state.clock.getElapsedTime();
    const motionScale = reducedMotion ? 0 : 1;
    material.current.uniforms.uTime.value = elapsed * motionScale;
    material.current.uniforms.uPointer.value.lerp(new THREE.Vector2(pointer.x, pointer.y), 0.08);
    material.current.uniforms.uFocus.value = THREE.MathUtils.lerp(material.current.uniforms.uFocus.value, focus, 0.08);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.28, 0.045);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.2, 0.045);
    core.current.rotation.z += delta * 0.12 * motionScale;
  });

  return (
    <group ref={group} onPointerDown={() => setFocus((value) => (value === 1 ? 0 : 1))}>
      <mesh ref={core} scale={focus ? 1.04 : 1}>
        <icosahedronGeometry args={[1.18, lowPower ? 3 : 4]} />
        <shaderMaterial ref={material} uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} transparent />
      </mesh>
      <mesh rotation={[Math.PI / 2.6, 0.15, -0.35]}>
        <torusGeometry args={[1.63, 0.012, 8, lowPower ? 56 : 96]} />
        <meshBasicMaterial color="#d6ff61" transparent opacity={0.8} />
      </mesh>
      <mesh rotation={[0.22, Math.PI / 2.1, 0.3]}>
        <torusGeometry args={[1.9, 0.009, 8, lowPower ? 48 : 80]} />
        <meshBasicMaterial color="#f07a60" transparent opacity={0.7} />
      </mesh>
      <points rotation={[0.2, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={particlePositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#8fe4dc" size={lowPower ? 0.025 : 0.032} sizeAttenuation transparent opacity={0.72} />
      </points>
    </group>
  );
}

function SceneFallback() {
  return <div className="webgl-fallback" role="img" aria-label="Statische Darstellung des WebGL-Hero-Experiments"><span>WebGL unavailable</span><strong>FORM / FLOW</strong><small>2D fallback active</small></div>;
}

export default function WebGLHero({ reducedMotion = false, lowPower = false }: Props) {
  const [available] = useState(supportsWebGL);
  const dpr: [number, number] = lowPower ? [1, 1.2] : [1, 1.65];
  const scene: ReactNode = available ? (
    <Canvas className="webgl-canvas" dpr={dpr} camera={{ position: [0, 0, 5.3], fov: 35 }} gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }} fallback={<SceneFallback />}>
      <color attach="background" args={['#161a20']} />
      <FieldScene reducedMotion={reducedMotion} lowPower={lowPower} />
    </Canvas>
  ) : <SceneFallback />;

  return (
    <div className={`webgl-hero ${lowPower ? 'is-low-power' : ''} ${reducedMotion ? 'is-reduced' : ''}`}>
      <div className="webgl-caption">shader reliquary / 01</div>
      <div className="webgl-stage">{scene}</div>
      <div className="webgl-footer"><span>hover to orbit · click to focus</span><span>{available ? 'webgl active' : 'fallback active'}</span></div>
    </div>
  );
}
