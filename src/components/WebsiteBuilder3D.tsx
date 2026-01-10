import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Environment, PresentationControls, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

interface WebsiteBuilder3DProps {
  activeStep: number;
  primaryColor: string;
  secondaryColor: string;
  style: "minimal" | "modern" | "bold";
}

// Convert hex to THREE.Color
const hexToColor = (hex: string) => new THREE.Color(hex);

// Header component
const Header = ({ visible, primaryColor, style }: { visible: boolean; primaryColor: string; style: string }) => {
  const ref = useRef<THREE.Group>(null);
  const color = hexToColor(primaryColor);
  
  useFrame(() => {
    if (ref.current && visible) {
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, 2.2, 0.08);
      ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, 1, 0.08));
    } else if (ref.current) {
      ref.current.position.y = 4;
      ref.current.scale.setScalar(0);
    }
  });

  const headerRadius = style === "minimal" ? 0.02 : style === "bold" ? 0.1 : 0.05;

  return (
    <group ref={ref} position={[0, 4, 0]} scale={0}>
      <RoundedBox args={[4.2, 0.45, 0.12]} radius={headerRadius} position={[0, 0, 0]}>
        <meshStandardMaterial color={color} metalness={0.4} roughness={0.3} />
      </RoundedBox>
      {/* Logo */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}>
        <RoundedBox args={[0.5, 0.28, 0.08]} radius={0.05} position={[-1.6, 0, 0.1]}>
          <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.2} />
        </RoundedBox>
      </Float>
      {/* Nav items */}
      {[-0.4, 0.2, 0.8].map((x, i) => (
        <RoundedBox key={i} args={[0.45, 0.12, 0.04]} radius={0.02} position={[x, 0, 0.1]}>
          <meshStandardMaterial color="#ffffff" opacity={0.7} transparent metalness={0.5} roughness={0.3} />
        </RoundedBox>
      ))}
      {/* CTA button */}
      <Float speed={3} rotationIntensity={0.2} floatIntensity={0.2}>
        <RoundedBox args={[0.55, 0.22, 0.06]} radius={0.08} position={[1.55, 0, 0.1]}>
          <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} />
        </RoundedBox>
      </Float>
    </group>
  );
};

// Hero section
const HeroSection = ({ visible, primaryColor, secondaryColor, style }: { visible: boolean; primaryColor: string; secondaryColor: string; style: string }) => {
  const ref = useRef<THREE.Group>(null);
  const imageRef = useRef<THREE.Mesh>(null);
  const primary = hexToColor(primaryColor);
  const secondary = hexToColor(secondaryColor);
  
  useFrame((state) => {
    if (ref.current && visible) {
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, 1.1, 0.08);
      ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, 1, 0.08));
    } else if (ref.current) {
      ref.current.position.y = 3;
      ref.current.scale.setScalar(0);
    }
    
    if (imageRef.current && visible) {
      imageRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={ref} position={[0, 3, 0]} scale={0}>
      {/* Hero background with gradient effect */}
      <RoundedBox args={[4.2, 1.6, 0.1]} radius={style === "bold" ? 0.15 : 0.08} position={[0, 0, -0.05]}>
        <meshStandardMaterial color="#0f0f23" metalness={0.1} roughness={0.8} />
      </RoundedBox>
      
      {/* Decorative gradient orb */}
      <mesh position={[1.5, 0.3, 0.2]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color={primary} transparent opacity={0.3} />
      </mesh>
      
      {/* Title placeholder */}
      <RoundedBox args={[2.2, 0.22, 0.06]} radius={0.03} position={[-0.6, 0.45, 0.08]}>
        <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.3} />
      </RoundedBox>
      
      {/* Subtitle */}
      <RoundedBox args={[1.6, 0.1, 0.04]} radius={0.02} position={[-0.9, 0.15, 0.08]}>
        <meshStandardMaterial color="#ffffff" opacity={0.5} transparent />
      </RoundedBox>
      
      {/* CTA buttons */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.15}>
        <RoundedBox args={[0.75, 0.28, 0.08]} radius={0.08} position={[-1.3, -0.25, 0.1]}>
          <meshStandardMaterial color={primary} metalness={0.4} roughness={0.3} />
        </RoundedBox>
      </Float>
      <RoundedBox args={[0.75, 0.28, 0.08]} radius={0.08} position={[-0.45, -0.25, 0.1]}>
        <meshStandardMaterial color={secondary} metalness={0.3} roughness={0.4} />
      </RoundedBox>
      
      {/* Hero image/mockup */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh ref={imageRef} position={[1.3, 0, 0.15]}>
          <RoundedBox args={[1.4, 1.1, 0.1]} radius={0.1}>
            <meshStandardMaterial color={primary} metalness={0.5} roughness={0.3} />
          </RoundedBox>
          {/* Screen content */}
          <RoundedBox args={[1.2, 0.9, 0.02]} radius={0.05} position={[0, 0, 0.07]}>
            <meshStandardMaterial color="#1a1a2e" metalness={0.2} roughness={0.5} />
          </RoundedBox>
        </mesh>
      </Float>
    </group>
  );
};

// Features/Cards section
const FeaturesSection = ({ visible, primaryColor, secondaryColor, style }: { visible: boolean; primaryColor: string; secondaryColor: string; style: string }) => {
  const ref = useRef<THREE.Group>(null);
  const primary = hexToColor(primaryColor);
  const secondary = hexToColor(secondaryColor);
  
  useFrame(() => {
    if (ref.current && visible) {
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, -0.4, 0.08);
      ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, 1, 0.08));
    } else if (ref.current) {
      ref.current.position.y = 2;
      ref.current.scale.setScalar(0);
    }
  });

  const cardColors = [primary, secondary, new THREE.Color("#10B981")];
  const cardRadius = style === "minimal" ? 0.03 : style === "bold" ? 0.15 : 0.08;

  return (
    <group ref={ref} position={[0, 2, 0]} scale={0}>
      {[-1.35, 0, 1.35].map((x, i) => (
        <Float key={i} speed={2 + i * 0.3} rotationIntensity={0.15} floatIntensity={0.25}>
          <group position={[x, 0, 0]}>
            {/* Card */}
            <RoundedBox args={[1.15, 1.3, 0.1]} radius={cardRadius}>
              <meshStandardMaterial color="#1F2937" metalness={0.2} roughness={0.6} />
            </RoundedBox>
            {/* Icon */}
            <RoundedBox args={[0.45, 0.45, 0.08]} radius={0.1} position={[0, 0.35, 0.08]}>
              <meshStandardMaterial color={cardColors[i]} metalness={0.5} roughness={0.3} />
            </RoundedBox>
            {/* Title */}
            <RoundedBox args={[0.75, 0.1, 0.04]} radius={0.02} position={[0, -0.05, 0.08]}>
              <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.3} />
            </RoundedBox>
            {/* Description lines */}
            <RoundedBox args={[0.85, 0.06, 0.03]} radius={0.01} position={[0, -0.25, 0.08]}>
              <meshStandardMaterial color="#ffffff" opacity={0.4} transparent />
            </RoundedBox>
            <RoundedBox args={[0.65, 0.06, 0.03]} radius={0.01} position={[0, -0.38, 0.08]}>
              <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
            </RoundedBox>
          </group>
        </Float>
      ))}
    </group>
  );
};

// Testimonials section
const TestimonialsSection = ({ visible, primaryColor }: { visible: boolean; primaryColor: string }) => {
  const ref = useRef<THREE.Group>(null);
  const primary = hexToColor(primaryColor);
  
  useFrame((state) => {
    if (ref.current && visible) {
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, -1.6, 0.08);
      ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, 1, 0.08));
    } else if (ref.current) {
      ref.current.position.y = 1;
      ref.current.scale.setScalar(0);
    }
  });

  return (
    <group ref={ref} position={[0, 1, 0]} scale={0}>
      {/* Section background */}
      <RoundedBox args={[4.2, 0.9, 0.08]} radius={0.1}>
        <meshStandardMaterial color="#111827" metalness={0.1} roughness={0.7} />
      </RoundedBox>
      
      {/* Quote marks */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}>
        <mesh position={[-1.7, 0.25, 0.1]}>
          <torusGeometry args={[0.08, 0.025, 16, 32]} />
          <meshStandardMaterial color={primary} metalness={0.6} roughness={0.3} />
        </mesh>
      </Float>
      
      {/* Testimonial text */}
      <RoundedBox args={[2.8, 0.08, 0.03]} radius={0.01} position={[0, 0.1, 0.08]}>
        <meshStandardMaterial color="#ffffff" opacity={0.7} transparent />
      </RoundedBox>
      <RoundedBox args={[2.2, 0.08, 0.03]} radius={0.01} position={[0, -0.05, 0.08]}>
        <meshStandardMaterial color="#ffffff" opacity={0.5} transparent />
      </RoundedBox>
      
      {/* Avatar */}
      <mesh position={[0, -0.3, 0.1]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial color={primary} metalness={0.4} roughness={0.4} />
      </mesh>
    </group>
  );
};

// Footer section
const FooterSection = ({ visible, primaryColor, style }: { visible: boolean; primaryColor: string; style: string }) => {
  const ref = useRef<THREE.Group>(null);
  const primary = hexToColor(primaryColor);
  
  useFrame(() => {
    if (ref.current && visible) {
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, -2.4, 0.08);
      ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, 1, 0.08));
    } else if (ref.current) {
      ref.current.position.y = 0;
      ref.current.scale.setScalar(0);
    }
  });

  return (
    <group ref={ref} position={[0, 0, 0]} scale={0}>
      <RoundedBox args={[4.2, 0.55, 0.08]} radius={style === "bold" ? 0.1 : 0.05}>
        <meshStandardMaterial color={primary} metalness={0.3} roughness={0.5} opacity={0.9} transparent />
      </RoundedBox>
      
      {/* Footer columns */}
      {[-1.4, -0.5, 0.4, 1.3].map((x, i) => (
        <group key={i} position={[x, 0, 0.06]}>
          <RoundedBox args={[0.55, 0.08, 0.02]} radius={0.01} position={[0, 0.12, 0]}>
            <meshStandardMaterial color="#ffffff" opacity={0.9} transparent />
          </RoundedBox>
          <RoundedBox args={[0.45, 0.05, 0.02]} radius={0.01} position={[0, 0, 0]}>
            <meshStandardMaterial color="#ffffff" opacity={0.5} transparent />
          </RoundedBox>
          <RoundedBox args={[0.4, 0.05, 0.02]} radius={0.01} position={[0, -0.1, 0]}>
            <meshStandardMaterial color="#ffffff" opacity={0.4} transparent />
          </RoundedBox>
        </group>
      ))}
    </group>
  );
};

// Floating particles
const Particles = ({ primaryColor, secondaryColor }: { primaryColor: string; secondaryColor: string }) => {
  const ref = useRef<THREE.Points>(null);
  const primary = hexToColor(primaryColor);
  
  const particles = useMemo(() => {
    const count = 80;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color={primary} transparent opacity={0.6} />
    </points>
  );
};

// Scene content
const Scene = ({ activeStep, primaryColor, secondaryColor, style }: WebsiteBuilder3DProps) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[-10, -10, -5]} intensity={0.6} color={primaryColor} />
      <pointLight position={[5, 5, 5]} intensity={0.4} color={secondaryColor} />
      
      <PresentationControls
        global
        rotation={[0.1, 0.1, 0]}
        polar={[-0.3, 0.3]}
        azimuth={[-0.6, 0.6]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <group position={[0, 0.2, 0]}>
          <Header visible={activeStep >= 0} primaryColor={primaryColor} style={style} />
          <HeroSection visible={activeStep >= 1} primaryColor={primaryColor} secondaryColor={secondaryColor} style={style} />
          <FeaturesSection visible={activeStep >= 2} primaryColor={primaryColor} secondaryColor={secondaryColor} style={style} />
          <TestimonialsSection visible={activeStep >= 3} primaryColor={primaryColor} />
          <FooterSection visible={activeStep >= 4} primaryColor={primaryColor} style={style} />
        </group>
      </PresentationControls>

      <Particles primaryColor={primaryColor} secondaryColor={secondaryColor} />
      <Environment preset="city" />
    </>
  );
};

const WebsiteBuilder3D = ({ activeStep, primaryColor, secondaryColor, style }: WebsiteBuilder3DProps) => {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#0f0f2a] to-[#0a0a1a]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
      >
        <Scene activeStep={activeStep} primaryColor={primaryColor} secondaryColor={secondaryColor} style={style} />
      </Canvas>
    </div>
  );
};

export default WebsiteBuilder3D;
