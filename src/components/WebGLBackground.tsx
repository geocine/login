import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const WebGLBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create a custom shader material for the starfield effect
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        varying vec2 vUv;

        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }

        void main() {
          vec2 st = gl_FragCoord.xy / resolution.xy - 0.5;
          st.x *= resolution.x / resolution.y;

          float brightness = 0.0;

          for (int i = 0; i < 100; i++) {  // Reduced number of stars
            float t = time * 0.03 + float(i) * 0.01;
            vec2 pos = vec2(
              random(vec2(float(i), 1.0)) * 2.0 - 1.0,  // Increased spread
              fract(random(vec2(float(i), 2.0)) - t) * 2.0 - 1.0  // Increased spread
            );

            float dist = length(st - pos);
            brightness += 0.00005 / (dist * dist);  // Reduced brightness
          }

          vec3 color = vec3(0.0, 0.3, 1.0) * brightness;  // Blue stars
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    camera.position.z = 1;

    const animate = (time: number) => {
      material.uniforms.time.value = time / 1000;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate(0);

    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
      material.uniforms.resolution.value.set(innerWidth, innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} />;
};

export default WebGLBackground;