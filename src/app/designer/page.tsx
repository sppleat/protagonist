'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Grid, PerspectiveCamera, Html } from '@react-three/drei';
import * as THREE from 'three';

// --- КОМПОНЕНТ ДИНАМИЧЕСКОГО АВАТАРА ---
function DynamicAvatar({ type, settings }: { type: string, settings: any }) {
  try {
    // Пытаемся загрузить модель. Если файла нет — сработает catch или Suspense
    const { scene } = useGLTF(`/models/${type}.glb`);

    useEffect(() => {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.morphTargetInfluences && mesh.morphTargetDictionary) {
            const dict = mesh.morphTargetDictionary;
            if (dict['Shoulder_Width'] !== undefined) mesh.morphTargetInfluences[dict['Shoulder_Width']] = settings.shoulders;
            if (dict['Waist_Width'] !== undefined) mesh.morphTargetInfluences[dict['Waist_Width']] = settings.waist;
            if (dict['Chest_Size'] !== undefined) mesh.morphTargetInfluences[dict['Chest_Size']] = settings.chest;
          }
        }
      });
    }, [scene, settings]);

    return <primitive object={scene} scale={3} position={[0, 0, 0]} />;
  } catch (e) {
    // Если модели нет, показываем этот золотой блок
    return (
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1, 3, 0.5]} />
        <meshPhysicalMaterial color="#c5a059" metalness={1} roughness={0.1} />
      </mesh>
    );
  }
}

export default function ArchitectPage() {
  const [avatarType, setAvatarType] = useState('male');
  const [settings, setSettings] = useState({ shoulders: 0.5, waist: 0.5, chest: 0.5 });

  return (
    <main className="min-h-screen bg-[#050505] text-[#c5a059] uppercase">
      {/* ПЕРЕКЛЮЧАТЕЛЬ ТИПА */}
      <section className="pt-28 pb-6 border-b border-[#c5a059]/10 flex justify-center gap-12 bg-black">
        {['male', 'female', 'child'].map((t) => (
          <button 
            key={t}
            onClick={() => setAvatarType(t)}
            className={`text-[11px] tracking-[0.5em] font-black transition-all ${avatarType === t ? 'text-white border-b border-white' : 'opacity-30 hover:opacity-100'}`}
          >
            {t === 'male' ? 'МУЖЧИНА' : t === 'female' ? 'ЖЕНЩИНА' : 'РЕБЕНОК'}
          </button>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 h-[calc(100vh-160px)]">
        
        {/* ЛЕВАЯ ПАНЕЛЬ: ПОЛЗУНКИ */}
        <aside className="lg:col-span-3 border-r border-[#c5a059]/10 p-10 space-y-10 bg-[#080808]">
          <p className="text-[9px] tracking-[0.4em] opacity-40 mb-10">BODY_PARAMETERS</p>
          
          {[
            { label: 'Плечи', key: 'shoulders' },
            { label: 'Грудь', key: 'chest' },
            { label: 'Талия', key: 'waist' },
          ].map((item) => (
            <div key={item.key} className="space-y-4">
              <div className="flex justify-between text-[10px] tracking-widest font-bold">
                <span>{item.label}</span>
                <span className="text-white">{(settings[item.key as keyof typeof settings] * 100).toFixed(0)}</span>
              </div>
              <input 
                type="range" min="0" max="1" step="0.01"
                value={settings[item.key as keyof typeof settings]}
                onChange={(e) => setSettings({...settings, [item.key]: parseFloat(e.target.value)})}
                className="w-full accent-[#c5a059] bg-[#c5a059]/10 h-[2px] appearance-none cursor-pointer"
              />
            </div>
          ))}
        </aside>

        {/* ЦЕНТР: ВЬЮПОРТ */}
        <div className="lg:col-span-6 relative bg-[#050505]">
          <Canvas shadows>
            <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={35} />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 20, 10]} intensity={1.5} color="#ffffff" />
            
            <Grid infiniteGrid fadeDistance={25} sectionColor="#c5a059" sectionThickness={1} cellColor="#111" />

            <Suspense fallback={<Html center><p className="text-[10px] tracking-[0.5em] animate-pulse">WAITING_FOR_MODEL...</p></Html>}>
              <DynamicAvatar type={avatarType} settings={settings} />
            </Suspense>

            <OrbitControls makeDefault target={[0, 1.5, 0]} enablePan={false} />
          </Canvas>
        </div>

        {/* ПРАВАЯ ПАНЕЛЬ: ИНФО */}
        <aside className="lg:col-span-3 p-10 bg-[#080808] border-l border-[#c5a059]/10">
          <div className="h-full flex flex-col justify-between">
            <div className="space-y-4 font-mono text-[9px] opacity-50">
               <p>ENGINE: THREE_JS</p>
               <p>VERSION: 2026.1</p>
               <p>STATUS: SYSTEM_READY</p>
            </div>
            <button className="w-full py-5 bg-[#c5a059] text-black text-[11px] font-[1000] tracking-[0.4em] hover:bg-white transition-all">
              SAVE_CONFIG
            </button>
          </div>
        </aside>

      </section>
    </main>
  );
}