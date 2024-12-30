import React, { useState, useRef, useEffect } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const Box = () => {
  const [hover, setHover] = useState(false);
  return (
    <mesh
      position={[0, 0, 0]}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hover ? "red" : "teal"} />
    </mesh>
  );
};

const Car = () => {
  const { scene } = useLoader(GLTFLoader, "/Cars/scene.gltf");
  const carRef = useRef();

  useFrame(() => {
    if (carRef.current) {
      carRef.current.position.x = Math.sin(Date.now() * 0.002) * 5;
    }
  });

  return scene ? <primitive ref={carRef} object={scene} scale={4.5} /> : null;
};

const App = () => {
  return (
    <div
      style={{
        backgroundColor: "teal",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[30, 10, 5]} />

        <Box />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[3, 0, 0]} />

        <Stage>
          <Car />
        </Stage>

        <OrbitControls
          autoRotate={true}
          enableZoom={false}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default App;
