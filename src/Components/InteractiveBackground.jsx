import { useEffect, useRef } from "react";
import { Renderer, Camera, Transform, Program, Mesh, Plane, Texture } from "ogl";

const InteractiveBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const renderer = new Renderer({ dpr: 2, canvas: canvasRef.current });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 1);

    const camera = new Camera(gl);
    camera.position.z = 5;
    const scene = new Transform();

    // Create a simple shader (based on Codrops animated flow effect)
    const vertex = `
      attribute vec2 uv;
      attribute vec3 position;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragment = `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uMouse;
      void main() {
        vec2 p = vUv * 2.0 - 1.0;
        float len = length(p - uMouse * 2.0);
        float glow = 0.02 / len;
        float color = sin(uTime * 0.5 + len * 20.0) * 0.5 + 0.5;
        gl_FragColor = vec4(color * glow, color * glow * 0.6, glow, 1.0);
      }
    `;

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: [0, 0] },
      },
    });

    const geometry = new Plane(gl);
    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    let mouse = { x: 0, y: 0 };
    window.addEventListener("mousemove", (e) => {
      mouse.x = (e.clientX / window.innerWidth) - 0.5;
      mouse.y = (e.clientY / window.innerHeight) - 0.5;
    });

    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", resize);
    resize();

    let time = 0;
    const update = () => {
      requestAnimationFrame(update);
      program.uniforms.uTime.value = time += 0.02;
      program.uniforms.uMouse.value = [mouse.x, mouse.y];
      renderer.render({ scene, camera });
    };
    update();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default InteractiveBackground;
