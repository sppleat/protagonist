"use client";

import React, { useState } from 'react';
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import DesignerCanvas from '@/components/DesignerCanvas';

// --- КОМПОНЕНТЫ ИНТЕРФЕЙСА ---

function Header({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold tracking-tighter uppercase">AI Stylist</h1>
          <nav className="flex gap-6">
            {['stylist', 'designer', 'community'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                  activeTab === tab ? 'text-black border-b-2 border-black' : 'text-gray-400 hover:text-black'
                }`}
              >
                {tab === 'stylist' ? 'Стилист' : tab === 'designer' ? 'Дизайнер' : 'Сообщество'}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-xs font-bold uppercase border px-4 py-2 rounded hover:bg-black hover:text-white transition">
                Войти
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}

// --- ПРЕДСТАВЛЕНИЯ (VIEWS) ---

function StylistView() {
  return (
    <div className="py-12 text-center">
      <h2 className="text-4xl font-light mb-4">Ваш персональный AI Стилист</h2>
      <p className="text-gray-500 max-w-2xl mx-auto">
        Загрузите фото своего гардероба или опишите предпочтения, и наш интеллект подберет идеальный образ.
      </p>
      <div className="mt-10 p-20 border-2 border-dashed border-gray-200 rounded-3xl inline-block w-full max-w-2xl">
        <p className="text-sm text-gray-400">Здесь будет интерфейс чата или загрузки фото</p>
      </div>
    </div>
  );
}

function CommunityView() {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-light mb-8 uppercase tracking-tight">Тренды сообщества</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="aspect-[3/4] bg-gray-100 rounded-2xl flex items-center justify-center border">
            <span className="text-gray-400 text-xs">Образ #{i}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- ГЛАВНАЯ СТРАНИЦА ---

export default function Home() {
  const [activeTab, setActiveTab] = useState('stylist');

  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="max-w-7xl mx-auto px-6">
        {activeTab === 'stylist' && <StylistView />}
        
        {activeTab === 'designer' && (
          <div className="py-12">
            <h2 className="text-3xl font-light mb-8 text-center uppercase tracking-tight">Инструментарий дизайнера</h2>
            <DesignerCanvas />
          </div>
        )}
        
        {activeTab === 'community' && <CommunityView />}
      </div>
    </main>
  );
}