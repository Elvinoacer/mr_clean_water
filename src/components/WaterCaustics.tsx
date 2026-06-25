'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
varying vec2 v_uv;
void main() {
  v_uv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_causticIntensity;
uniform float u_waterDepth;
uniform float u_chromaticAberration;
uniform vec3 u_lightPos;

varying vec2 v_uv;

#define PI 3.14159265359
#define TAU 6.28318530718

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec2 hash2(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float valueNoise(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p = rot * p * 2.0 + vec2(100.0);
    a *= 0.5;
  }
  return v;
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 1.0;
  float freq = 1.0;
  for (int i = 0; i < 5; i++) {
    sum += amp * noise(p * freq);
    amp *= 0.5;
    freq *= 2.0;
  }
  return sum;
}

float waveHeight(vec2 p, float t) {
  return sin(p.x * 3.0 + t * 1.2) * cos(p.y * 2.5 + t * 0.9) * 0.15
       + sin(p.x * 5.0 - t * 0.8 + p.y * 4.0) * 0.08
       + sin(p.x * 1.5 + p.y * 3.0 + t * 0.6) * 0.12;
}

vec3 waterSurface(vec2 p, float t) {
  float n1 = fbm(p * 2.0 + vec2(t * 0.2, t * 0.15));
  float n2 = fbm(p * 3.0 - vec2(t * 0.15, t * 0.2));
  float wh = waveHeight(p, t);
  return vec3(n1 * 0.4 + n2 * 0.3 + wh, n1 * 0.3, n2 * 0.4);
}

vec3 refractRay(vec3 I, vec3 N, float eta) {
  float dotNI = dot(N, I);
  float k = 1.0 - eta * eta * (1.0 - dotNI * dotNI);
  if (k < 0.0) return vec3(0.0);
  return eta * I - (eta * dotNI + sqrt(k)) * N;
}

float caustics(vec2 pos, float t, float intensity) {
  float c = 0.0;
  float s1 = 1.7;
  float s2 = 2.3;
  for (int i = 0; i < 3; i++) {
    float fi = float(i) * 0.5;
    vec2 x = pos * s1 + t * 0.3 + fi;
    vec2 y = pos * s2 - t * 0.4 + fi + 1.0;
    float sx = sin(x.x) + sin(x.y);
    float sy = sin(y.x) + sin(y.y);
    c += pow(abs(sin(sx + sy)), 8.0) * 0.5;
  }
  return c * intensity;
}

vec3 oceanColor(float depth) {
  vec3 surface = vec3(0.0, 0.28, 0.39);
  vec3 mid = vec3(0.0, 0.12, 0.22);
  vec3 deep = vec3(0.0, 0.02, 0.06);
  vec3 col = mix(surface, mid, smoothstep(0.0, 2.0, depth));
  col = mix(col, deep, smoothstep(2.0, 5.0, depth));
  return col;
}

float godRays(vec2 uv, vec2 lightPos, float t) {
  vec2 delta = lightPos - uv;
  float rays = 0.0;
  float numSamples = 24.0;
  for (float i = 0.0; i < numSamples; i++) {
    vec2 s = uv + delta * (i / numSamples);
    rays += smoothstep(0.05, 0.0, length(s - lightPos));
  }
  return rays / numSamples;
}

void main() {
  vec2 uv = v_uv;
  float t = u_time;
  vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
  vec2 pos = (uv - 0.5) * aspect;
  vec2 mouseLight = (u_mouse - 0.5) * aspect;

  vec3 surf = waterSurface(pos, t);
  vec3 N = normalize(vec3(-surf.y * 0.5, 1.0, -surf.z * 0.5));

  vec3 I = normalize(vec3(0.0, 5.0, 8.0));
  vec3 refrR = refractRay(I, N, 0.75);
  vec3 refrG = refractRay(I, N, 0.77);
  vec3 refrB = refractRay(I, N, 0.79);

  vec2 rayPosR = pos + refrR.xz * u_waterDepth * 0.3;
  float floorR = fbm(rayPosR * 3.0 + t * 0.1);
  float depthR = u_waterDepth + floorR * 2.0;

  vec2 rayPosG = pos + refrG.xz * u_waterDepth * 0.3;
  float floorG = fbm(rayPosG * 3.0 + t * 0.1);
  float depthG = u_waterDepth + floorG * 2.0;

  vec2 rayPosB = pos + refrB.xz * u_waterDepth * 0.3;
  float floorB = fbm(rayPosB * 3.0 + t * 0.1);
  float depthB = u_waterDepth + floorB * 2.0;

  vec3 baseR = oceanColor(depthR);
  vec3 baseG = oceanColor(depthG);
  vec3 baseB = oceanColor(depthB);

  vec2 caustPosR = rayPosR + refrR.xz * 0.5;
  vec2 caustPosG = rayPosG + refrG.xz * 0.5;
  vec2 caustPosB = rayPosB + refrB.xz * 0.5;

  float caustR = caustics(caustPosR, t, u_causticIntensity);
  float caustG = caustics(caustPosG, t + 0.1, u_causticIntensity);
  float caustB = caustics(caustPosB, t + 0.2, u_causticIntensity);

  float mouseDist = length(pos - mouseLight);
  float mouseInfluence = smoothstep(1.5, 0.0, mouseDist);
  caustR += caustics(pos + mouseLight * 0.5, t * 1.5, u_causticIntensity * 1.5) * mouseInfluence * 0.8;
  caustG += caustics(pos + mouseLight * 0.5, t * 1.5 + 0.1, u_causticIntensity * 1.5) * mouseInfluence * 0.8;
  caustB += caustics(pos + mouseLight * 0.5, t * 1.5 + 0.2, u_causticIntensity * 1.5) * mouseInfluence * 0.8;

  vec3 caustTint = vec3(0.18, 0.82, 0.90) * 0.4;
  baseR += caustTint * caustR;
  baseG += caustTint * caustG;
  baseB += caustTint * caustB;

  vec3 col;
  col.r = mix(baseR.r, baseR.r * 1.3 + caustR * 0.3, smoothstep(0.3, 1.0, caustR));
  col.g = mix(baseG.g, baseG.g * 1.3 + caustG * 0.3, smoothstep(0.3, 1.0, caustG));
  col.b = mix(baseB.b, baseB.b * 1.3 + caustB * 0.3, smoothstep(0.3, 1.0, caustB));

  if (u_chromaticAberration > 0.0) {
    float aberration = u_chromaticAberration * (length(pos) * 0.5 + surf.x * 0.3);
    col.r = mix(col.r, baseR.r, aberration);
    col.b = mix(col.b, baseB.b, aberration);
  }

  float sparkle = pow(max(dot(normalize(vec3(0.0, 8.0, 4.0) - vec3(pos.x, 0.0, pos.y)), N), 0.0), 128.0) * 2.0;
  col += vec3(0.8, 0.95, 1.0) * sparkle;

  vec2 lightUV = (u_lightPos.xz / vec2(12.0, 4.0)) * 0.5 + 0.5;
  vec2 lightScreen = (lightUV - 0.5) * aspect + vec2(0.0, 0.3);
  float rays = godRays(pos, lightScreen, t) * 0.15;
  col += vec3(0.5, 0.85, 0.92) * rays;
  float mouseRays = godRays(pos, mouseLight, t) * mouseInfluence * 0.2;
  col += vec3(0.4, 0.8, 0.9) * mouseRays;

  float fog = smoothstep(0.0, u_waterDepth + 2.0, depthG);
  col = mix(col, oceanColor(depthG) * 0.5, fog * 0.3);

  float motes = smoothstep(0.96, 1.0, noise(pos * 15.0 + t * 0.1) * noise(pos * 20.0 - t * 0.15));
  col += vec3(0.6, 0.9, 0.95) * motes * 0.15;

  col *= smoothstep(0.0, 0.5, 1.0 - length(pos) * 0.8);
  col += vec3(0.02, 0.08, 0.12) * smoothstep(0.3, 1.2, length(uv - 0.5));

  col = col * (2.51 * col + 0.03) / (col * (2.43 * col + 0.59) + 0.14);
  col += (hash(uv * u_resolution + fract(t * 43.0)) - 0.5) * 0.03;
  col = max(col, vec3(0.0));

  gl_FragColor = vec4(col, 1.0);
}
`;

function CausticsPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouseTarget = useRef({ x: 0.5, y: 0.5 });
  const mouseCurrent = useRef({ x: 0.5, y: 0.5 });
  const { viewport } = useThree();

  useMemo(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseTarget.current.x = e.clientX / window.innerWidth;
      mouseTarget.current.y = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0.0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_causticIntensity: { value: 1.2 },
      u_waterDepth: { value: 3.5 },
      u_chromaticAberration: { value: 0.12 },
      u_lightPos: { value: new THREE.Vector3(0.0, 12.0, 4.0) },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (!materialRef.current) return;
    mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * 0.05;
    mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * 0.05;
    materialRef.current.uniforms.u_mouse.value.set(mouseCurrent.current.x, mouseCurrent.current.y);
    materialRef.current.uniforms.u_time.value = clock.getElapsedTime();
    materialRef.current.uniforms.u_resolution.value.set(viewport.width, viewport.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function WaterCaustics() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    >
      <Canvas
        dpr={[0.5, 1.25]}
        camera={{ position: [0, 0, 2.5], fov: 75, near: 0.1, far: 100 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
      >
        <CausticsPlane />
      </Canvas>
    </div>
  );
}
