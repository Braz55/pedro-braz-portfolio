import { Mail, MapPin, Sparkles, Phone, BookOpen, GraduationCap } from 'lucide-react'

interface DeskShelfProps {
  onSelectBook: (bookType: 'curriculum' | 'portfolio') => void
  activeBook: 'curriculum' | 'portfolio' | null
}

export default function DeskShelf({ onSelectBook, activeBook }: DeskShelfProps) {
  return (
    <div className={`room-bg min-h-screen flex flex-col justify-between py-12 px-6 transition-all duration-1000 relative overflow-hidden ${activeBook ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
      
      {/* Premium ambient light source (soft warm studio glow) */}
      <div className="absolute top-[2%] left-[10%] w-[450px] h-[450px] rounded-full bg-amber-100/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[8%] right-[15%] w-[350px] h-[350px] rounded-full bg-blue-50/15 blur-[100px] pointer-events-none" />

      {/* Main Header */}
      <header className="max-w-4xl mx-auto text-center z-10 mb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/[0.03] border border-zinc-200 text-zinc-600 text-xs font-semibold uppercase tracking-wider mb-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Pedro Braz &bull; UI/UX & Frontend Developer</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight font-display">
          Espaço de Trabalho <span className="text-zinc-500 font-normal">Interativo</span>
        </h1>
        <p className="text-zinc-500 text-sm md:text-base mt-2.5 max-w-md mx-auto leading-relaxed">
          Toca nos livros na prateleira para abrires o meu currículo ou os meus projetos de engenharia.
        </p>
      </header>

      {/* Shelf Scene */}
      <main className="max-w-5xl mx-auto w-full flex flex-col items-center justify-center z-10 my-auto">
        <div className="shelf-scene w-full">
          
          {/* 1. Digital Profile Frame (iPad Pro or brushed aluminum style) */}
          <div className="item-frame-stand">
            <div className="photo-frame-container">
              <div className="photo-frame">
                {/* Diagonal Glass Glare */}
                <div className="glass-glare" />
                
                {/* Frame Screen / Matte Display */}
                <div className="frame-screen p-6 flex flex-col items-center justify-between h-full">
                  {/* Top Bar / Status */}
                  <div className="w-full flex justify-between items-center text-[8px] font-mono text-zinc-500 tracking-widest border-b border-zinc-100/5 pb-3">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      SYSTEM ACTIVE
                    </span>
                    <span>UTAD // 2026</span>
                  </div>

                  {/* Profile Avatar Badge & Name */}
                  <div className="flex flex-col items-center text-center my-4 w-full">
                    {/* SVG Avatar Badge */}
                    <div className="relative w-24 h-24 rounded-full bg-zinc-950 flex items-center justify-center shadow-[inset_0_4px_12px_rgba(0,0,0,0.8)] border border-zinc-800 ring-2 ring-zinc-900 mb-4 overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-blue-500/10 opacity-60" />
                      
                      {/* Tech HUD circles */}
                      <svg className="absolute w-20 h-20 text-zinc-800" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="animate-[spin_40s_linear_infinite]" />
                        <circle cx="50" cy="50" r="41" stroke="currentColor" strokeWidth="0.5" strokeDasharray="8 8" className="animate-[spin_25s_linear_infinite_reverse]" opacity="0.4" />
                      </svg>

                      {/* Developer Initials Emblem */}
                      <div className="z-10 flex flex-col items-center justify-center">
                        <span className="text-2xl font-black tracking-tighter text-zinc-100 font-display">PB</span>
                        <div className="flex gap-1 mt-0.5">
                          <span className="w-1 h-1 bg-amber-500 rounded-full" />
                          <span className="w-1 h-1 bg-zinc-500 rounded-full" />
                          <span className="w-1 h-1 bg-blue-500 rounded-full" />
                        </div>
                      </div>

                      {/* Scanline overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] [background-size:100%_4px,6px_100%] pointer-events-none" />
                    </div>

                    <h2 className="font-display font-bold text-xl text-zinc-100 tracking-tight leading-none">Pedro Braz</h2>
                    <p className="text-[10px] text-amber-500/90 font-mono tracking-widest mt-1.5 uppercase font-semibold">
                      Software Engineer
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-[9px] text-zinc-400 font-mono">
                      <GraduationCap className="w-3 h-3 text-zinc-500" />
                      <span>Licenciatura UTAD</span>
                    </div>
                  </div>

                  {/* Bottom Contact / Details Grid */}
                  <div className="w-full grid grid-cols-1 gap-2 text-[9px] text-zinc-400 font-mono bg-zinc-950/60 p-3 rounded-lg border border-zinc-900/80 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-500/80 flex-shrink-0" />
                      <span>Mirandela, Portugal</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-3.5 h-3.5 text-amber-500/80 flex-shrink-0" />
                      <span className="truncate">pm7703125@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-3.5 h-3.5 text-amber-500/80 flex-shrink-0" />
                      <span>+351 914 271 784</span>
                    </div>
                  </div>
                </div>

                {/* Desktop Stand Support (Under the frame) */}
                <div className="frame-back-stand" />
              </div>
            </div>
          </div>

          {/* 2. Book 1: Curriculum (Standing 3D Leather Cover with Gold Foil) */}
          <div 
            onClick={() => onSelectBook('curriculum')}
            className="curriculum-book-container book-shelf-item"
          >
            {/* Dynamic Ambient Drop Shadow under book */}
            <div className="book-shadow-base" />

            {/* 3D Book Body */}
            <div className="book-3d-box curriculum-book-box">
              {/* Front Cover */}
              <div className="face face-front cover-curriculum">
                <div className="cover-curriculum-border flex flex-col justify-between p-4 h-full">
                  <div className="flex flex-col items-center text-center mt-2">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mb-1 shadow-[0_0_4px_#fbbf24]" />
                    <span className="text-[7px] tracking-[0.3em] font-serif text-amber-300/80">CURRICULUM VITAE</span>
                  </div>
                  
                  <div className="flex flex-col items-center text-center my-auto">
                    <BookOpen className="w-8 h-8 text-amber-400 mb-2 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                    <h3 className="foil-gold text-[12px] font-serif font-bold tracking-[0.2em] leading-tight text-center uppercase">
                      CURRÍCULO
                    </h3>
                    <span className="text-[7px] text-amber-200/50 font-serif italic mt-0.5 tracking-wider">ACADÉMICO</span>
                  </div>

                  <div className="flex flex-col items-center text-center mb-1">
                    <span className="text-[6px] tracking-[0.15em] text-amber-400/70 font-mono">PEDRO BRAZ</span>
                  </div>
                </div>
              </div>

              {/* Fanned out page layers when opened */}
              <div className="face-page-layer face-page-1">
                <div className="w-full h-full border-l border-zinc-200/50 p-3 flex flex-col justify-between">
                  <div className="space-y-1 mt-1">
                    <div className="h-[2px] w-4/5 bg-zinc-300 rounded" />
                    <div className="h-[2px] w-5/6 bg-zinc-200 rounded" />
                    <div className="h-[2px] w-2/3 bg-zinc-200 rounded" />
                  </div>
                  <span className="text-[5px] text-zinc-400 font-mono self-end">P.1</span>
                </div>
              </div>
              <div className="face-page-layer face-page-2">
                <div className="w-full h-full border-l border-zinc-200/50 p-3 flex flex-col justify-between">
                  <div className="space-y-1 mt-1">
                    <div className="h-[2px] w-3/4 bg-zinc-300 rounded" />
                    <div className="h-[2px] w-1/2 bg-zinc-200 rounded" />
                  </div>
                  <span className="text-[5px] text-zinc-400 font-mono self-end">P.2</span>
                </div>
              </div>
              <div className="face-page-layer face-page-3">
                <div className="w-full h-full border-l border-zinc-200/50 p-3 flex flex-col justify-between">
                  <div className="space-y-1 mt-1">
                    <div className="h-[2px] w-2/3 bg-zinc-300 rounded" />
                    <div className="h-[2px] w-3/4 bg-zinc-200 rounded" />
                  </div>
                  <span className="text-[5px] text-zinc-400 font-mono self-end">P.3</span>
                </div>
              </div>

              {/* Spine (Left Side) */}
              <div className="face face-left spine-curriculum">
                <span className="foil-gold">CURRÍCULO &bull; PEDRO BRAZ</span>
              </div>
              
              {/* Back Cover */}
              <div className="face face-back back-curriculum" />
              
              {/* Outer Page Edges */}
              <div className="face face-right" />
              <div className="face face-top" />
              <div className="face face-bottom" />
            </div>
            
            <div className="book-label">Currículo</div>
          </div>

          {/* 3. Book 2: Projects (Engineering Technical Manual Cover) */}
          <div 
            onClick={() => onSelectBook('portfolio')}
            className="portfolio-book-container book-shelf-item"
          >
            {/* Dynamic Ambient Drop Shadow under book */}
            <div className="book-shadow-base" />

            {/* 3D Book Body */}
            <div className="book-3d-box portfolio-book-box">
              {/* Front Cover */}
              <div className="face face-front cover-projects">
                <div className="cover-projects-content flex flex-col justify-between p-4 h-full text-zinc-300">
                  <div className="flex justify-between items-start font-mono text-[7px] text-sky-400/80">
                    <span>SPEC // 01</span>
                    <span>BRAZ55</span>
                  </div>

                  <div className="flex flex-col my-auto pl-1">
                    {/* Minimalist SVG Schematic */}
                    <svg className="w-9 h-9 text-sky-400 mb-2 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <rect x="2" y="2" width="6" height="6" rx="0.5" />
                      <rect x="16" y="2" width="6" height="6" rx="0.5" />
                      <rect x="9" y="16" width="6" height="6" rx="0.5" />
                      <path d="M5 8v4h6m8-4v4h-4m-1 4V12H7" strokeDasharray="1 1" />
                      <circle cx="5" cy="12" r="1" fill="currentColor" />
                      <circle cx="19" cy="12" r="1" fill="currentColor" />
                    </svg>
                    
                    <h3 className="text-zinc-100 text-[11px] font-mono font-bold tracking-wider uppercase leading-snug">
                      PROJETOS
                    </h3>
                    <p className="text-[7px] text-zinc-500 font-mono tracking-widest mt-0.5">
                      ENGINEERING MANUAL
                    </p>
                  </div>

                  <div className="border-t border-zinc-800 pt-2 flex justify-between items-center text-[6px] font-mono text-zinc-500">
                    <span>VOL. 2026</span>
                    <span className="text-sky-400">STATUS: OK</span>
                  </div>
                </div>
              </div>

              {/* Fanned out page layers when opened */}
              <div className="face-page-layer face-page-1">
                <div className="w-full h-full border-l border-zinc-200/50 p-3 flex flex-col justify-between bg-white text-zinc-800">
                  <div className="space-y-1 mt-1">
                    <div className="h-[2px] w-5/6 bg-zinc-300 rounded" />
                    <div className="h-[2px] w-2/3 bg-zinc-200 rounded" />
                    <div className="h-[2px] w-3/4 bg-zinc-200 rounded" />
                  </div>
                  <span className="text-[5px] text-zinc-400 font-mono self-end">P.1</span>
                </div>
              </div>
              <div className="face-page-layer face-page-2">
                <div className="w-full h-full border-l border-zinc-200/50 p-3 flex flex-col justify-between bg-white text-zinc-800">
                  <div className="space-y-1 mt-1">
                    <div className="h-[2px] w-3/4 bg-zinc-300 rounded" />
                    <div className="h-[2px] w-1/2 bg-zinc-200 rounded" />
                  </div>
                  <span className="text-[5px] text-zinc-400 font-mono self-end">P.2</span>
                </div>
              </div>
              <div className="face-page-layer face-page-3">
                <div className="w-full h-full border-l border-zinc-200/50 p-3 flex flex-col justify-between bg-white text-zinc-800">
                  <div className="space-y-1 mt-1">
                    <div className="h-[2px] w-2/3 bg-zinc-300 rounded" />
                    <div className="h-[2px] w-3/4 bg-zinc-250 rounded" />
                  </div>
                  <span className="text-[5px] text-zinc-400 font-mono self-end">P.3</span>
                </div>
              </div>

              {/* Spine (Left Side) */}
              <div className="face face-left spine-portfolio">
                <span>SPEC // MANUAL DE PROJETOS</span>
              </div>

              {/* Back Cover */}
              <div className="face face-back back-portfolio" />

              {/* Outer Page Edges */}
              <div className="face face-right" />
              <div className="face face-top" />
              <div className="face face-bottom" />
            </div>
            
            <div className="book-label">Projetos</div>
          </div>

          {/* 4. Wooden Shelf Board & Drop Shadows */}
          <div className="wood-shelf-container">
            <div className="wood-shelf-top" />
            <div className="wood-shelf-front" />
            <div className="wood-shelf-glow" />
          </div>
          <div className="wood-shelf-shadow" />

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-[10px] text-zinc-400 font-mono z-10 mt-8">
        &copy; {new Date().getFullYear()} Pedro Braz &bull; Licenciatura UTAD &bull; Neo-Skeuomorphic Showcase.
      </footer>
    </div>
  )
}
