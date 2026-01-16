'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Плавное появление контента после загрузки
    setIsLoaded(true);
  }, []);

  return (
    <main className={`min-h-screen bg-[#050505] text-[#f4f1ea] font-serif uppercase transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* --- СЕКЦИЯ №1: ГЛАВНЫЙ ЭКРАН (HERO) --- */}
      <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
        
        {/* АТЛАНТ: ФОНОВОЕ ИЗОБРАЖЕНИЕ */}
        <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
          <img 
            src="/atlas.jpg" 
            alt="Atlas"
            className="w-full h-full object-cover opacity-40 brightness-[0.7] grayscale transition-transform duration-[3s] hover:scale-105"
          />
          {/* Градиент снизу для плавного перехода в сетку */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        </div>

        {/* ЦЕНТРАЛЬНЫЙ КОНТЕНТ */}
        <div className="relative z-30 flex flex-col items-center text-center px-4">
          <div className="mb-8">
            <span className="text-[10px] tracking-[1.5em] text-[#c5a059] opacity-80">
              CELESTIAL_ORDER_V.1
            </span>
          </div>

          <h1 className="text-6xl md:text-[130px] font-black tracking-tighter leading-[0.8] mb-12 italic">
            CREATIVE <br /> 
            <span className="text-[#c5a059] not-italic drop-shadow-[0_0_50px_rgba(0,0,0,0.8)]">GENESIS</span>
          </h1>

          <div className="flex items-center gap-10 mb-16">
            <div className="w-16 h-[1px] bg-[#c5a059]/30" />
            <p className="text-[12px] tracking-[0.6em] text-[#c5a059] font-medium">
              HELD BY ETERNAL ATLAS
            </p>
            <div className="w-16 h-[1px] bg-[#c5a059]/30" />
          </div>

          {/* ИСПРАВЛЕННАЯ КНОПКА: Золотой фон теперь внутри */}
          <Link 
            href="/stylist" 
            className="group relative inline-block px-20 py-8 border border-[#c5a059]/30 bg-black/40 backdrop-blur-md overflow-hidden transition-all duration-700 hover:border-[#c5a059]"
          >
            <span className="relative z-20 font-bold tracking-[0.6em] text-[14px] group-hover:text-black transition-colors duration-500">
              ВХОД В ПАНТЕОН
            </span>
            <div className="absolute inset-0 z-10 bg-[#c5a059] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </Link>
        </div>
      </section>

      {/* --- СЕКЦИЯ №2: ТРИ КАРТОЧКИ (GRID) --- */}
      <section className="relative z-40 grid grid-cols-1 md:grid-cols-3 w-full bg-[#050505] border-t border-[#c5a059]/20">
        {[
          { title: 'ОРАКУЛ', desc: 'AI STYLE INSIGHT', link: '/stylist' },
          { title: 'АРХИТЕКТОР', desc: 'GEOMETRY OF DESIGN', link: '/designer' },
          { title: 'АГОРА', desc: 'GLOBAL EXCHANGE', link: '/community' }
        ].map((item, i) => (
          <Link 
            key={i} 
            href={item.link} 
            className="group relative h-[500px] border-r border-[#c5a059]/10 last:border-r-0 flex flex-col items-center justify-center overflow-hidden bg-[#050505] hover:bg-[#0a0a0a] transition-all duration-700"
          >
            <div className="text-center z-10">
              <h3 className="text-4xl font-black tracking-widest text-[#f4f1ea]/30 group-hover:text-[#c5a059] group-hover:scale-110 transition-all duration-700">
                {item.title}
              </h3>
              <p className="text-[10px] tracking-[0.4em] text-[#c5a059]/40 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                {item.desc}
              </p>
            </div>
            {/* Анимация линии снизу для каждой карточки */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#c5a059] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
          </Link>
        ))}
      </section>

    </main>
  );
}