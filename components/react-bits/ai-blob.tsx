"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

import { cn } from "@/lib/utils";

/** PJ's brand palette — cajun red through roux gold */
export const PJS_BLOB_COLORS = ["#a4262c", "#cf4f47", "#74471f", "#c0905f"] as const;

export interface AIBlobProps {
  /** Width and height of the blob container in pixels */
  size?: number;
  /** Animation speed multiplier (higher = faster) */
  animationSpeed?: number;
  /** Intensity of the glow effect (0-1) */
  glowIntensity?: number;
  /** Scale of the noise pattern (higher = more detail) */
  noiseScale?: number;
  /** Scale of the internal noise patterns (higher = smaller patterns) */
  innerScale?: number;
  /** Resolution multiplier for performance (0.5 = half res, 1.0 = full res) */
  resolution?: number;
  /** Array of color hex strings for gradient (2-4 colors recommended) */
  colors?: string[];
  className?: string;
  style?: React.CSSProperties;
}

export function AIBlob({
  size = 400,
  animationSpeed = 1.0,
  glowIntensity = 0.8,
  noiseScale = 3.0,
  innerScale = 1.0,
  resolution = 1.0,
  colors = [...PJS_BLOB_COLORS],
  className,
  style,
}: AIBlobProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<{
    uTime: { value: number };
    uResolution: { value: THREE.Vector2 };
    uSpeed: { value: number };
    uGlowIntensity: { value: number };
    uNoiseScale: { value: number };
    uInnerScale: { value: number };
    uColor1: { value: THREE.Vector3 };
    uColor2: { value: THREE.Vector3 };
    uColor3: { value: THREE.Vector3 };
    uColor4: { value: THREE.Vector3 };
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const hexToRgb = (hex: string): THREE.Vector3 => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!result) return new THREE.Vector3(1, 1, 1);
      return new THREE.Vector3(
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
      );
    };

    const color1 = hexToRgb(colors[0] || PJS_BLOB_COLORS[0]);
    const color2 = hexToRgb(colors[1] || PJS_BLOB_COLORS[1]);
    const color3 = hexToRgb(colors[2] || PJS_BLOB_COLORS[2]);
    const color4 = hexToRgb(colors[3] || PJS_BLOB_COLORS[3]);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      premultipliedAlpha: false,
      stencil: false,
      depth: false,
    });

    renderer.setClearColor(0x000000, 0);
    const pixelRatio = Math.min(window.devicePixelRatio, 2) * resolution;
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(size, size);

    const bufferWidth = size * pixelRatio;
    const bufferHeight = size * pixelRatio;

    const gl = renderer.getContext();
    if (gl) {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }

    renderer.domElement.style.backgroundColor = "transparent";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.margin = "0";
    renderer.domElement.style.padding = "0";

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    uniformsRef.current = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(bufferWidth, bufferHeight) },
      uSpeed: { value: animationSpeed },
      uGlowIntensity: { value: glowIntensity },
      uNoiseScale: { value: noiseScale },
      uInnerScale: { value: innerScale },
      uColor1: { value: color1 },
      uColor2: { value: color2 },
      uColor3: { value: color3 },
      uColor4: { value: color4 },
    };

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision mediump float;

      uniform float uTime;
      uniform vec2 uResolution;
      uniform float uSpeed;
      uniform float uGlowIntensity;
      uniform float uNoiseScale;
      uniform float uInnerScale;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      uniform vec3 uColor4;

      #define PI_TWO 6.28318530718

      float rng(vec2 n) {
        return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
      }

      float perlin(vec2 p) {
        vec2 ip = floor(p);
        vec2 u = fract(p);
        u = u*u*(3.0-2.0*u);
        float res = mix(
          mix(rng(ip),rng(ip+vec2(1.0,0.0)),u.x),
          mix(rng(ip+vec2(0.0,1.0)),rng(ip+vec2(1.0,1.0)),u.x),u.y);
        return res*res;
      }

      float fractal(vec2 p, int octaves) {
        float s = 0.0;
        float m = 0.0;
        float a = 0.5;
        s += a * perlin(p);
        m += a;
        a *= 0.5;
        p *= 2.0;
        if (octaves >= 2) {
          s += a * perlin(p);
          m += a;
        }
        return s / m;
      }

      float brightness(vec3 color) {
        return dot(color, vec3(0.299, 0.587, 0.114));
      }

      mat3 rotateX(float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c);
      }

      mat3 rotateY(float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c);
      }

      mat3 rotateZ(float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return mat3(c, -s, 0.0, s, c, 0.0, 0.0, 0.0, 1.0);
      }

      void main() {
        float min_res = min(uResolution.x, uResolution.y);
        vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min_res * 1.5;
        float t = uTime * uSpeed;
        float l = dot(uv, uv);
        if (l > 2.5) {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
          return;
        }
        float sm = smoothstep(1.04, 0.96, l);
        float z = sqrt(max(0.0, 1.0 - min(l, 1.0)));
        vec3 noisePos = normalize(vec3(uv.x, uv.y, z));
        float angleX = sin(t * 0.23) * 1.5 + cos(t * 0.37) * 0.6;
        float angleY = sin(t * 0.19) * 1.3 + cos(t * 0.41) * 0.7;
        float angleZ = sin(t * 0.31) * 1.1 + cos(t * 0.29) * 0.5;
        noisePos = rotateX(angleX) * noisePos;
        noisePos = rotateY(angleY) * noisePos;
        noisePos = rotateZ(angleZ) * noisePos;
        float d = sm * l * l * l * 2.0;
        vec3 norm = normalize(vec3(uv.x, uv.y, .7 - d));
        float nx = fractal(noisePos.xy * 2.0 * uNoiseScale / 3.0 + t * 0.4 + 25.69, 2);
        float ny = fractal(noisePos.xy * 2.0 * uNoiseScale / 3.0 + t * 0.4 + 86.31, 2);
        float n = fractal(noisePos.xy * uNoiseScale + 2.0 * vec2(nx, ny), 2);
        vec3 col = vec3(n * 0.5 + 0.25);
        float a = atan(noisePos.y, noisePos.x) / PI_TWO + t * 0.1;
        float gradPos = fract(a);
        vec3 gradientColor;
        if (gradPos < 0.25) {
          gradientColor = mix(uColor1, uColor2, gradPos * 4.0);
        } else if (gradPos < 0.5) {
          gradientColor = mix(uColor2, uColor3, (gradPos - 0.25) * 4.0);
        } else if (gradPos < 0.75) {
          gradientColor = mix(uColor3, uColor4, (gradPos - 0.5) * 4.0);
        } else {
          gradientColor = mix(uColor4, uColor1, (gradPos - 0.75) * 4.0);
        }
        col *= gradientColor;
        col *= 2.0 * uGlowIntensity * 1.25;
        vec3 cd = abs(col);
        vec3 c = col * d;
        float lightDot = max(0.0, dot(norm, vec3(0, 0, -1)));
        c += (c * 0.5 + vec3(1.0) - brightness(c)) * vec3(lightDot * lightDot * lightDot * lightDot * lightDot * 3.0);
        col = c + col * pow((1.0 - smoothstep(1.0, 0.98, l) - pow(max(0.0, length(uv) - 1.0), 0.2)) * 2.0, 4.0);
        float f = fractal(noisePos.xy * 2. + t, 2) + 0.1;
        vec2 innerUV = uv * (f + 0.1) * 0.5 / uInnerScale;
        float innerL = dot(innerUV, innerUV);
        vec3 ins = normalize(cd) + 0.1;
        float ind = 0.2 + pow(smoothstep(0.0, 1.5, sqrt(innerL)) * 48.0, 0.25);
        ind *= ind * ind * ind;
        ind = 1.0 / ind;
        ins *= ind;
        col += ins * ins * sm * smoothstep(0.7, 1.0, ind) * uGlowIntensity;
        col += abs(norm) * (1.0 - d) * sm * 0.25;
        float colBrightness = brightness(col);
        float alpha = sm * pow(colBrightness, 2.5) * 2.0;
        alpha = clamp(alpha, 0.0, 1.0);
        float edgeDist = length(uv);
        float edgeFalloff = smoothstep(1.0, 0.95, edgeDist);
        alpha *= edgeFalloff;
        col = pow(col, vec3(0.95));
        gl_FragColor = vec4(col, alpha);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms: uniformsRef.current,
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.NormalBlending,
      depthTest: false,
      depthWrite: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationId: number | null = null;
    let isVisible = true;
    let isDocumentVisible = !document.hidden;

    const tick = (time: number) => {
      if (!isVisible || !isDocumentVisible) {
        animationId = null;
        return;
      }
      if (uniformsRef.current) {
        uniformsRef.current.uTime.value = time * 0.001;
      }
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (animationId !== null) return;
      animationId = requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && isDocumentVisible) startLoop();
        else stopLoop();
      },
      { threshold: 0.01 },
    );
    observer.observe(container);

    const onVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
      if (isDocumentVisible && isVisible) startLoop();
      else stopLoop();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    startLoop();

    return () => {
      stopLoop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [size, animationSpeed, glowIntensity, noiseScale, innerScale, resolution, colors]);

  useEffect(() => {
    if (!uniformsRef.current) return;
    uniformsRef.current.uSpeed.value = animationSpeed;
  }, [animationSpeed]);

  useEffect(() => {
    if (!uniformsRef.current) return;
    uniformsRef.current.uGlowIntensity.value = glowIntensity;
  }, [glowIntensity]);

  useEffect(() => {
    if (!uniformsRef.current) return;
    uniformsRef.current.uNoiseScale.value = noiseScale;
  }, [noiseScale]);

  useEffect(() => {
    if (!uniformsRef.current) return;
    uniformsRef.current.uInnerScale.value = innerScale;
  }, [innerScale]);

  useEffect(() => {
    if (!uniformsRef.current) return;
    const hexToRgb = (hex: string): THREE.Vector3 => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!result) return new THREE.Vector3(1, 1, 1);
      return new THREE.Vector3(
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
      );
    };
    uniformsRef.current.uColor1.value = hexToRgb(colors[0] || PJS_BLOB_COLORS[0]);
    uniformsRef.current.uColor2.value = hexToRgb(colors[1] || PJS_BLOB_COLORS[1]);
    uniformsRef.current.uColor3.value = hexToRgb(colors[2] || PJS_BLOB_COLORS[2]);
    uniformsRef.current.uColor4.value = hexToRgb(colors[3] || PJS_BLOB_COLORS[3]);
  }, [colors]);

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size, ...style }}
    >
      <div
        ref={containerRef}
        className="pointer-events-none h-full w-full select-none bg-transparent"
      />
    </div>
  );
}

export default AIBlob;
