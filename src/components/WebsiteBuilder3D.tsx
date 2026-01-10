import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Text, Environment, PresentationControls } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

interface WebsiteBuilder3DProps {
  activeStep: number;
}

// Header component
const Header = ({ visible, progress }: { visible: boolean; progress: number }) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current && visible) {
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, 2.2, 0.1);
      ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, 1, 0.1));
    } else if (ref.current) {
      ref.current.position.y = 4;
      ref.current.scale.setScalar(0);
    }
  });

  return (
    <group ref={ref} position={[0, 4, 0]} scale={0}>
      <RoundedBox args={[4, 0.4, 0.1]} radius={0.05} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8B5CF6" metalness={0.3} roughness={0.4} />
      </RoundedBox>
      {/* Logo placeholder */}
      <RoundedBox args={[0.5, 0.25, 0.05]} radius={0.02} position={[-1.5, 0, 0.08]}>
        <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.3} />
      </RoundedBox>
      {/* Nav items */}
      {[-0.3, 0.3, 0.9].map((x, i) => (
        <RoundedBox key={i} args={[0.4, 0.15, 0.05]} radius={0.02} position={[x, 0, 0.08]}>
          <meshStandardMaterial color="#ffffff" opacity={0.6} transparent metalness={0.5} roughness={0.3} />
        </RoundedBox>
      ))}
      {/* CTA button */}
      <RoundedBox args={[0.5, 0.2, 0.05]} radius={0.05} position={[1.5, 0, 0.08]}>
        <meshStandardMaterial color="#22C55E" metalness={0.4} roughness={0.3} />
      </RoundedBox>
    </group>
  );
};

// Hero section
const HeroSection = ({ visible }: { visible: boolean }) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (ref.current && visible) {
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, 1.2, 0.1);
      ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, 1, 0.1));
    } else if (ref.current) {
      ref.current.position.y = 3;
      ref.current.scale.setScalar(0);
    }
  });

  return (
    <group ref={ref} position={[0, 3, 0]} scale={0}>
      {/* Hero background */}
      <RoundedBox args={[4, 1.5, 0.08]} radius={0.05} position={[0, 0, -0.05]}>
        <meshStandardMaterial color="#1E1B4B" metalness={0.2} roughness={0.5} />
      </RoundedBox>
      {/* Title */}
      <RoundedBox args={[2.5, 0.25, 0.05]} radius={0.03} position={[-0.5, 0.4, 0.05]}>
        <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.3} />
      </RoundedBox>
      {/* Subtitle */}
      <RoundedBox args={[1.8, 0.12, 0.05]} radius={0.02} position={[-0.85, 0.1, 0.05]}>
        <meshStandardMaterial color="#ffffff" opacity={0.5} transparent metalness={0.5} roughness={0.3} />
      </RoundedBox>
      {/* CTA buttons */}
      <RoundedBox args={[0.7, 0.25, 0.05]} radius={0.05} position={[-1.2, -0.3, 0.05]}>
        <meshStandardMaterial color="#8B5CF6" metalness={0.4} roughness={0.3} />
      </RoundedBox>
      <RoundedBox args={[0.7, 0.25, 0.05]} radius={0.05} position={[-0.4, -0.3, 0.05]}>
        <meshStandardMaterial color="#374151" metalness={0.4} roughness={0.3} />
      </RoundedBox>
      {/* Hero image placeholder */}
      <RoundedBox args={[1.2, 1, 0.08]} radius={0.08} position={[1.2, 0, 0.1]}>
        <meshStandardMaterial color="#6366F1" metalness={0.3} roughness={0.4} />
      </RoundedBox>
    </group>
  );
};

// Content cards section
const ContentCards = ({ visible }: { visible: boolean }) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (ref.current && visible) {
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, -0.3, 0.1);
      ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, 1, 0.1));
    } else if (ref.current) {
      ref.current.position.y = 2;
      ref.current.scale.setScalar(0);
    }
  });

  const cards = [
    { x: -1.4, color: "#EC4899" },
    { x: 0, color: "#F59E0B" },
    { x: 1.4, color: "#10B981" },
  ];

  return (
    <group ref={ref} position={[0, 2, 0]} scale={0}>
      {cards.map((card, i) => (
        <Float key={i} speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
          <group position={[card.x, 0, 0]}>
            <RoundedBox args={[1.1, 1.2, 0.08]} radius={0.08}>
              <meshStandardMaterial color="#1F2937" metalness={0.3} roughness={0.5} />
            </RoundedBox>
            {/* Card icon */}
            <RoundedBox args={[0.4, 0.4, 0.05]} radius={0.08} position={[0, 0.3, 0.06]}>
              <meshStandardMaterial color={card.color} metalness={0.4} roughness={0.3} />
            </RoundedBox>
            {/* Card title */}
            <RoundedBox args={[0.7, 0.1, 0.03]} radius={0.02} position={[0, -0.1, 0.06]}>
              <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.3} />
            </RoundedBox>
            {/* Card text */}
            <RoundedBox args={[0.8, 0.06, 0.03]} radius={0.01} position={[0, -0.3, 0.06]}>
              <meshStandardMaterial color="#ffffff" opacity={0.4} transparent metalness={0.5} roughness={0.3} />
            </RoundedBox>
            <RoundedBox args={[0.6, 0.06, 0.03]} radius={0.01} position={[0, -0.42, 0.06]}>
              <meshStandardMaterial color="#ffffff" opacity={0.3} transparent metalness={0.5} roughness={0.3} />
            </RoundedBox>
          </group>
        </Float>
      ))}
    </group>
  );
};

// Animations section with particles
const AnimationsSection = ({ visible }: { visible: boolean }) => {
  const ref = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (ref.current && visible) {
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, -1.5, 0.1);
      ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, 1, 0.1));
    } else if (ref.current) {
      ref.current.position.y = 1;
      ref.current.scale.setScalar(0);
    }
    
    if (particlesRef.current && visible) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  // Create particles
  const particleCount = 50;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 4;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
  }

  return (
    <group ref={ref} position={[0, 1, 0]} scale={0}>
      {/* Animated gradient bar */}
      <Float speed={3} rotationIntensity={0.2} floatIntensity={0.3}>
        <RoundedBox args={[4, 0.8, 0.08]} radius={0.08}>
          <meshStandardMaterial color="#4F46E5" metalness={0.4} roughness={0.3} />
        </RoundedBox>
        {/* Sparkle effects */}
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particleCount}
              array={positions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial size={0.03} color="#F9A8D4" transparent opacity={0.8} />
        </points>
      </Float>
    </group>
  );
};

// Footer section
const FooterSection = ({ visible }: { visible: boolean }) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (ref.current && visible) {
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, -2.3, 0.1);
      ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, 1, 0.1));
    } else if (ref.current) {
      ref.current.position.y = 0;
      ref.current.scale.setScalar(0);
    }
  });

  return (
    <group ref={ref} position={[0, 0, 0]} scale={0}>
      <RoundedBox args={[4, 0.5, 0.08]} radius={0.05}>
        <meshStandardMaterial color="#111827" metalness={0.2} roughness={0.6} />
      </RoundedBox>
      {/* Footer columns */}
      {[-1.2, -0.4, 0.4, 1.2].map((x, i) => (
        <group key={i} position={[x, 0, 0.06]}>
          <RoundedBox args={[0.5, 0.08, 0.02]} radius={0.01} position={[0, 0.1, 0]}>
            <meshStandardMaterial color="#ffffff" opacity={0.8} transparent />
          </RoundedBox>
          <RoundedBox args={[0.4, 0.05, 0.02]} radius={0.01} position={[0, -0.02, 0]}>
            <meshStandardMaterial color="#ffffff" opacity={0.4} transparent />
          </RoundedBox>
          <RoundedBox args={[0.35, 0.05, 0.02]} radius={0.01} position={[0, -0.1, 0]}>
            <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
          </RoundedBox>
        </group>
      ))}
    </group>
  );
};

// Scene content
const Scene = ({ activeStep }: { activeStep: number }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8B5CF6" />
      
      <PresentationControls
        global
        rotation={[0.1, 0.1, 0]}
        polar={[-0.2, 0.2]}
        azimuth={[-0.5, 0.5]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <group position={[0, 0, 0]}>
          <Header visible={activeStep >= 0} progress={activeStep} />
          <HeroSection visible={activeStep >= 1} />
          <ContentCards visible={activeStep >= 2} />
          <AnimationsSection visible={activeStep >= 3} />
          <FooterSection visible={activeStep >= 4} />
        </group>
      </PresentationControls>

      <Environment preset="city" />
    </>
  );
};

const WebsiteBuilder3D = ({ activeStep }: WebsiteBuilder3DProps) => {
  return (
    <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background border border-white/10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
      >
        <Scene activeStep={activeStep} />
      </Canvas>
    </div>
  );
};

export default WebsiteBuilder3D;
