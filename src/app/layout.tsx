import './globals.css';
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import Link from 'next/link';

export const metadata = {
  title: 'PROTAGONIST INSTRUMENTS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#c5a059',
          colorBackground: '#050505',
          colorText: '#c5a059',
          borderRadius: '0px',
        },
      }}
    >
      <html lang="ru" className="bg-[#050505]">
        <body className="antialiased bg-[#050505] text-[#c5a059] uppercase selection:bg-[#c5a059] selection:text-black">
          
          {/* --- ШАПКА: ГЛУБОКОЕ ЗОЛОТО --- */}
          <header className="fixed top-0 w-full h-32 z-50 flex items-center justify-between px-20 bg-gradient-to-b from-black via-black/60 to-transparent">
            
            {/* LOGO: Теперь с постоянным мягким свечением */}
            <Link href="/" className="flex flex-col leading-none group">
              <span className="text-3xl font-[1000] tracking-tighter text-[#c5a059] drop-shadow-[0_0_12px_rgba(197,160,89,0.4)] group-hover:drop-shadow-[0_0_20px_rgba(197,160,89,0.8)] transition-all duration-700">
                PROTAGONIST
              </span>
              <span className="text-[8px] tracking-[0.9em] text-[#c5a059] opacity-80 mt-1 ml-1">
                INSTRUMENTS
              </span>
            </Link>

            {/* NAV: Жирный золотой текст */}
            <nav className="hidden lg:flex items-center gap-24">
              {[
                { name: 'СТИЛИСТ', href: '/stylist' },
                { name: 'ДИЗАЙНЕР', href: '/designer' },
                { name: 'СООБЩЕСТВО', href: '/community' }
              ].map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className="text-[14px] tracking-[0.6em] font-[1000] text-[#c5a059] hover:text-white transition-all duration-500 hover:drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* ACTIONS */}
            <div className="flex items-center gap-14">
              <div className="flex items-center gap-10 text-[13px] tracking-[0.4em] font-black text-[#c5a059]">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="hover:text-white transition-all cursor-pointer">ACC</button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <button className="hover:text-white transition-all">CART</button>
              </div>

              {/* SEARCH: Минималистичный золотой акцент */}
              <button className="group relative py-2 overflow-hidden border-b border-[#c5a059]/30 hover:border-[#c5a059] transition-colors">
                <span className="relative z-10 text-[13px] tracking-[0.5em] font-black text-[#c5a059] group-hover:text-white transition-colors">
                  SEARCH
                </span>
              </button>
            </div>
          </header>

          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}