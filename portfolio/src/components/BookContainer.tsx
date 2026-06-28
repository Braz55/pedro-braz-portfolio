import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X, BookOpen } from 'lucide-react'

interface BookContainerProps {
  bookType: 'curriculum' | 'portfolio'
  onClose: () => void
  pages: React.ReactNode[]
  bookmarks: { label: string; pageIndex: number }[]
}

export default function BookContainer({ bookType, onClose, pages, bookmarks }: BookContainerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0) // 0 is cover, 1 is first spread (pages 1-2), etc.
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next')

  // Trigger opening cover after a brief delay for zoom entry animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
      setCurrentPage(1) // Open to first pages
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const handleNext = () => {
    if (isFlipping) return
    const maxPage = Math.ceil((pages.length - 1) / 2)
    if (currentPage < maxPage) {
      setFlipDirection('next')
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1)
        setIsFlipping(false)
      }, 700)
    }
  }

  const handlePrev = () => {
    if (isFlipping) return
    if (currentPage > 1) {
      setFlipDirection('prev')
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1)
        setIsFlipping(false)
      }, 700)
    }
  }

  const handleGoToPage = (targetSpread: number) => {
    if (isFlipping || targetSpread === currentPage) return
    setFlipDirection(targetSpread > currentPage ? 'next' : 'prev')
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentPage(targetSpread)
      setIsFlipping(false)
    }, 700)
  }

  const handleCloseBook = () => {
    setIsOpen(false)
    setCurrentPage(0)
    setTimeout(() => {
      onClose()
    }, 800)
  }

  const isManga = bookType === 'portfolio'
  const maxPageSpread = Math.ceil((pages.length - 1) / 2)

  // Get index of pages for current spread
  const leftPageIdx = (currentPage - 1) * 2 + 1
  const rightPageIdx = (currentPage - 1) * 2 + 2

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-hidden select-none">
      
      {/* Lightbox / Ambient glow in background matching the book theme */}
      <div className={`absolute inset-0 opacity-15 pointer-events-none blur-3xl transition-colors duration-1000 ${
        isManga ? 'bg-zinc-100' : 'bg-rose-900/30'
      }`} />

      {/* Book Container Toolbar */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-4 z-20">
        <button
          onClick={handleCloseBook}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
            isManga 
              ? 'bg-white text-black border-3 border-black shadow-[4px_4px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000]'
              : 'bg-rose-950/80 text-rose-200 border border-rose-800 hover:bg-rose-900 hover:text-white shadow-lg'
          }`}
        >
          <X className="w-4 h-4" />
          <span>Voltar à Secretária</span>
        </button>

        <div className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
          isManga ? 'bg-white text-black border-2 border-black' : 'bg-rose-950/40 border border-rose-900/50 text-rose-300'
        }`}>
          {currentPage === 0 
            ? 'Capa' 
            : `Spread ${currentPage} / ${maxPageSpread} (Pág. ${leftPageIdx}-${Math.min(rightPageIdx, pages.length - 1)})`}
        </div>
      </div>

      {/* 3D Book Area */}
      <div className="book-viewport w-full max-w-5xl h-[70vh] flex items-center justify-center z-10 relative">
        
        {/* Book Ribbon/Bookmark (Left Page decoration) */}
        {isOpen && currentPage > 0 && (
          <div className="book-ribbon z-30" />
        )}

        {/* Dynamic Book Canvas */}
        <div 
          className={`book-3d-canvas relative ${
            isOpen ? 'transform-style-preserve-3d rotateX(10deg)' : 'transform-style-preserve-3d rotateY(0deg)'
          }`}
        >
          {/* BOOK CLOSED STATE (Cover Page) */}
          {currentPage === 0 && (
            <div className="absolute inset-0 flex items-center justify-center z-30">
              {isManga ? (
                <div 
                  onClick={() => setIsOpen(true)}
                  className="cover-projects w-full max-w-[450px] h-[550px] border-4 border-black p-6 flex flex-col justify-between bg-white text-black cursor-pointer shadow-2xl hover:scale-102 transition-transform"
                >
                  <div className="flex justify-between items-start font-mono font-bold">
                    <span className="border border-black px-2 py-0.5">Vol. 1</span>
                    <span>Braz55</span>
                  </div>
                  <div className="text-center my-auto flex flex-col items-center">
                    <h2 className="text-4xl font-black font-display tracking-tight transform -rotate-3 leading-none">
                      OTAKU TIME
                    </h2>
                    <h3 className="text-2xl font-black font-display text-zinc-800 tracking-tighter mt-1">
                      PROFILER
                    </h3>
                    <div className="manga-sound-fx text-sm font-bold mt-4 px-3 py-1 bg-black text-white rounded">
                      DESTAQUE!
                    </div>
                  </div>
                  <div className="text-center border-t-3 border-black pt-4">
                    <p className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 animate-pulse">
                      Clique para ler
                    </p>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={() => setIsOpen(true)}
                  className="cover-curriculum w-full max-w-[450px] h-[550px] p-8 flex flex-col justify-between cursor-pointer shadow-2xl hover:scale-102 transition-transform"
                >
                  <div className="cover-curriculum-border border-4 border-amber-700/50 p-6 h-full flex flex-col justify-between">
                    <div className="text-center">
                      <span className="text-[11px] tracking-[0.3em] font-bold block mb-1">CURRICULUM VITAE</span>
                      <div className="w-12 h-[1px] bg-amber-500 mx-auto my-3" />
                      <span className="text-xs text-amber-500/80 font-serif italic">DE PEDRO BRAZ</span>
                    </div>

                    <div className="my-auto text-center">
                      <BookOpen className="w-14 h-14 text-amber-400 mx-auto mb-4" />
                      <h2 className="text-3xl font-bold font-display text-white tracking-wide">
                        PERCURSO PROFISSIONAL
                      </h2>
                    </div>

                    <p className="text-[10px] font-mono text-center text-amber-500/70 tracking-widest uppercase animate-pulse">
                      CLIQUE PARA ABRIR
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* OPEN BOOK SPREAD */}
          {currentPage > 0 && (
            <>
              {/* LEFT PAGE */}
              <div className={`page-spread page-left relative overflow-hidden ${
                isManga ? 'manga-halftone' : 'paper-texture'
              }`}>
                {/* Visual binder shadow/split center */}
                <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-black/15 to-transparent pointer-events-none z-20" />
                
                {/* Left Page Content */}
                <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between overflow-y-auto">
                  {pages[leftPageIdx] || (
                    <div className="flex items-center justify-center h-full text-zinc-400 font-mono text-xs">
                      [Página em branco]
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT PAGE */}
              <div className={`page-spread page-right relative overflow-hidden ${
                isManga ? 'manga-halftone' : 'paper-texture'
              }`}>
                {/* Visual binder shadow/split center */}
                <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-black/15 to-transparent pointer-events-none z-20" />
                
                {/* Right Page Content */}
                <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between overflow-y-auto">
                  {pages[rightPageIdx] || (
                    <div className="flex items-center justify-center h-full text-zinc-400 font-mono text-xs">
                      [Fim do Conteúdo]
                    </div>
                  )}
                </div>
              </div>

              {/* 3D FLIPPING PAGE SIMULATION OVERLAY */}
              {isFlipping && (
                <div 
                  className={`page-flipping ${isManga ? 'bg-white' : 'bg-[#faf7ee]'} border-l border-zinc-300 shadow-2xl`}
                  style={{
                    transform: flipDirection === 'next' 
                      ? 'rotateY(-180deg)' 
                      : 'rotateY(0deg)',
                    transition: 'transform 0.7s cubic-bezier(0.645, 0.045, 0.355, 1)',
                    backfaceVisibility: 'hidden',
                    transformOrigin: 'left center',
                    zIndex: 25,
                    left: '50%'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
                </div>
              )}
            </>
          )}
        </div>

        {/* Bookmark Tabs (Attached to the side of the opened book) */}
        {isOpen && currentPage > 0 && bookmarks.length > 0 && (
          <div className="absolute right-[-48px] md:right-[-60px] top-10 flex flex-col gap-3 z-30">
            {bookmarks.map((tab, idx) => {
              const isActive = currentPage === tab.pageIndex
              return (
                <button
                  key={idx}
                  onClick={() => handleGoToPage(tab.pageIndex)}
                  className={`bookmark-tab px-2 py-3.5 text-[9px] md:text-[10px] font-bold tracking-wider uppercase border-r-3 border-t-3 border-b-3 text-center cursor-pointer ${
                    isManga
                      ? isActive
                        ? 'bg-black text-white border-black scale-105'
                        : 'bg-white text-black border-black hover:bg-zinc-100'
                      : isActive
                        ? 'bg-rose-800 text-white border-rose-950 scale-105 shadow-md'
                        : 'bg-rose-950 text-rose-300 border-rose-900/60 hover:text-white hover:bg-rose-900'
                  }`}
                  style={{ width: '40px' }}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Nav Controls Footer */}
      {isOpen && currentPage > 0 && (
        <div className="w-full max-w-md flex items-center justify-between gap-4 mt-6 z-20">
          <button
            onClick={handlePrev}
            disabled={currentPage <= 1}
            className={`flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border-none flex-1 ${
              currentPage <= 1
                ? 'opacity-40 cursor-not-allowed text-zinc-500 bg-zinc-900'
                : isManga
                  ? 'bg-white text-black border-3 border-black shadow-[4px_4px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000]'
                  : 'bg-rose-950 text-rose-200 border border-rose-800 hover:bg-rose-900 hover:text-white shadow-lg'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentPage >= maxPageSpread}
            className={`flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border-none flex-1 ${
              currentPage >= maxPageSpread
                ? 'opacity-40 cursor-not-allowed text-zinc-500 bg-zinc-900'
                : isManga
                  ? 'bg-white text-black border-3 border-black shadow-[4px_4px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000]'
                  : 'bg-rose-950 text-rose-200 border border-rose-800 hover:bg-rose-900 hover:text-white shadow-lg'
            }`}
          >
            <span>Avançar</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
