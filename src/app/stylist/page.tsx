'use client';

import React from 'react';

export default function Page() {
  return (
    <main className="min-h-screen bg-[#050505]">
      {/* HERO SECTION (Повторяет стиль главной) */}
      <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
        {/* ФОНОВОЕ ИЗОБРАЖЕНИЕ (Замени под каждую страницу) */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[url('/oracle_bg.jpg')] bg-cover bg-center opacity-30 grayscale brightness-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black" />
        </div>

        {/* ЗАГОЛОВОК */}
        <div className="relative z-10 text-center px-4">
          <span className="text-[10px] tracking-[1.2em] text-[#c5a059]/60 mb-6 block">PROTAGONIST_SYSTEM_v.2</span>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter italic drop-shadow-[0_0_30px_rgba(197,160,89,0.3)]">
            ОРАКУЛ
          </h1>
        </div>
      </section>

      {/* КОНТЕНТНАЯ ЧАСТЬ (Интерфейс) */}
      <section className="relative z-20 max-w-[1400px] mx-auto px-10 pb-32 -mt-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-1 border-t border-l border-[#c5a059]/20 bg-[#c5a059]/5">
          
          {/* Левая панель инструментов */}
          <div className="md:col-span-3 border-r border-b border-[#c5a059]/20 p-8 flex flex-col gap-10">
            <h3 className="text-xs tracking-[0.4em] font-bold border-b border-[#c5a059]/30 pb-4">ПАРАМЕТРЫ</h3>
            <div className="space-y-6">
               {['СИЛУЭТ', 'МАТЕРИАЛ', 'АРХЕТИП'].map(item => (
                 <button key={item} className="w-full text-left text-[11px] tracking-[0.3em] hover:text-white transition-all opacity-60 hover:opacity-100">
                   {item} [+]
                 </button>
               ))}
            </div>
          </div>

          {/* Центральный рабочий стол */}
          <div className="md:col-span-9 border-r border-b border-[#c5a059]/20 p-12 min-h-[600px] flex items-center justify-center relative bg-black/40">
            <div className="absolute top-4 right-4 text-[8px] tracking-widest opacity-30">ENCRYPTED_DATA_STREAM</div>
            
            {/* Плейсхолдер для основного функционала */}
            <div className="border border-dashed border-[#c5a059]/30 w-full h-full flex items-center justify-center">
               <span className="text-[10px] tracking-[0.8em] animate-pulse">ОЖИДАНИЕ ЗАПРОСА...</span>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}