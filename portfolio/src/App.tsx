import { useState, useEffect } from 'react'
import { 
  Github, 
  Mail,
  Terminal, 
  Database, 
  Cpu, 
  Code, 
  Wrench, 
  BookOpen, 
  Check, 
  Copy, 
  Sparkles, 
  Phone, 
  Gamepad2, 
  Brain,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  FileText
} from 'lucide-react'

// Projects data from Pedro Braz's CV
const projects = [
  {
    id: "project-pilot",
    title: "ProjectPilot",
    subtitle: "Parceria de Investigação com o INESC TEC (Repositório Privado)",
    tags: ["Llama 3.1", "RAG", "Python", "Open WebUI", "Semantic Search"],
    period: "2026",
    details: [
      "Desenho de uma arquitetura segura para processamento offline de documentação técnica, garantindo a privacidade total dos dados através da execução local de modelos de Inteligência Artificial.",
      "Implementação de um pipeline RAG (Retrieval-Augmented Generation) acoplado ao modelo Large Language Model (Llama 3.1) para extração semântica e respostas contextuais precisas.",
      "Integração do motor de inferência numa interface visual interativa utilizando Open WebUI, otimizando a experiência de interação do utilizador final com o sistema de IA."
    ],
    images: [
      "/image/project_pilot/1.png"
    ],
    icon: <Brain className="w-5 h-5 text-manga-text" />,
    speech: "Uma arquitetura offline ultra-segura para IA e análise semântica local!",
    chapter: "Capítulo 1: Inteligência Artificial Local"
  },
  {
    id: "otaku-time",
    title: "Otaku Time Pro",
    subtitle: "Projeto Pessoal Autónomo",
    tags: ["React", "NestJS", "Prisma", "PostgreSQL", "Capacitor", "Neon DB"],
    period: "2026",
    details: [
      "Arquitetura de um ecossistema cloud completo utilizando React (Frontend) e NestJS (Backend API), com alojamento e integração contínua (CI/CD) via Render.",
      "Modelação e gestão de base de dados relacional em ambiente cloud (PostgreSQL / Neon DB) integrada através do ORM Prisma.",
      "Desenvolvimento multiplataforma garantindo uma experiência nativa em Android através do Capacitor, consumindo a API centralizada para sincronização em tempo real.",
      "Integração de dados complexos através de múltiplas APIs externas (AniList, MangaUpdates) desenvolvendo algoritmos de fallback e background syncing para estabilidade da informação."
    ],
    images: [
      "/image/otaku_time/1.png",
      "/image/otaku_time/2.png",
      "/image/otaku_time/3.png",
      "/image/otaku_time/4.jpeg"
    ],
    githubUrl: "https://github.com/Braz55/Otaku-Time-v2",
    icon: <Terminal className="w-5 h-5 text-manga-text" />,
    speech: "O ecossistema definitivo para gerir os meus animes e mangas favoritos!",
    chapter: "Capítulo 2: Rede Social de Anime"
  },
  {
    id: "iot-platform",
    title: "Plataforma de Monitorização IoT Distribuída",
    subtitle: "Projeto Académico de Sistemas Distribuídos (Repositório Privado)",
    tags: ["C#", "gRPC", "RabbitMQ", "MongoDB", "Python", "Polly Retry"],
    period: "2026",
    details: [
      "Arquitetura e implementação de um sistema IoT assíncrono para telemetria, utilizando um modelo Pub/Sub através de RabbitMQ (Topic Exchanges).",
      "Desenho de uma arquitetura de microsserviços integrando componentes heterogéneos (C#, Python, Node.js) comunicando estritamente via gRPC e Protocol Buffers.",
      "Implementação de mecanismos avançados de resiliência e tolerância a falhas, incluindo Dead-Letter Exchanges, Retry policies exponenciais (Polly) e Fallbacks.",
      "Desacoplamento da camada de dados utilizando armazenamento persistente em MongoDB para o registo em tempo real de métricas ambientais."
    ],
    images: [
      "/image/isDistribuidos/1.png",
      "/image/isDistribuidos/2.png",
      "/image/isDistribuidos/3.png"
    ],
    icon: <Cpu className="w-5 h-5 text-manga-text" />,
    speech: "Mensagens assíncronas de alto desempenho conectando microsserviços!",
    chapter: "Capítulo 3: Microsserviços e IoT"
  },
  {
    id: "neon-drive",
    title: "Neon Drive 3D",
    subtitle: "Simulação WebGL inspirada em Tron",
    tags: ["WebGL", "Three.js", "JavaScript", "3D Graphics", "Vector Math"],
    period: "2026",
    details: [
      "Manipulação de matrizes de transformação e geometria 3D com Three.js para criar uma simulação fluida inspirada em Tron."
    ],
    images: [
      "/image/neondrive/1.png",
      "/image/neondrive/2.png",
      "/image/neondrive/3.png"
    ],
    githubUrl: "https://github.com/liane04/CG_tron",
    icon: <Gamepad2 className="w-5 h-5 text-manga-text" />,
    speech: "Computação gráfica fluida baseada em álgebra linear e matrizes 3D!",
    chapter: "Capítulo 4: Álgebra Linear Visual"
  }
]

// Skill Categories
const skillCategories = [
  {
    title: "Linguagens",
    icon: <Code className="w-4 h-4 text-manga-accent-red" />,
    skills: ["C#", "TypeScript", "JavaScript", "Python", "C", "C++", "HTML5/CSS3"]
  },
  {
    title: "Bases de Dados",
    icon: <Database className="w-4 h-4 text-manga-accent-blue" />,
    skills: ["PostgreSQL", "SQLite", "MongoDB", "Supabase"]
  },
  {
    title: "Frameworks & APIs",
    icon: <Cpu className="w-4 h-4 text-manga-sage" />,
    skills: ["ASP.NET Core", "gRPC", "RabbitMQ", "Stripe API", "NestJS", "React", "Capacitor"]
  },
  {
    title: "Ferramentas & Padrões",
    icon: <Wrench className="w-4 h-4 text-manga-yellow" />,
    skills: ["Docker", "CI/CD", "RAG", "Protocol Buffers", "Distributed Systems", "QA Testing"]
  }
]

export default function App() {
  const [copied, setCopied] = useState(false)
  const [lightboxImg, setLightboxImg] = useState<string | null>(null)
  
  // Navigation Tabs: 'projetos' or 'curriculo'
  const [activeTab, setActiveTab] = useState<'projetos' | 'curriculo'>('projetos')

  // Open Book indices and anims
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [oldProjectIndex, setOldProjectIndex] = useState<number | null>(null)

  // Inner project screenshot carousel indices
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [oldImageIndex, setOldImageIndex] = useState(0)

  const [currentCurriculumPage, setCurrentCurriculumPage] = useState(0) // 0 or 1
  const [oldCurriculumPage, setOldCurriculumPage] = useState<number | null>(null)

  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null)

  const copyEmail = () => {
    navigator.clipboard.writeText("pm7703125@gmail.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Reset inner project carousel index when active project changes
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [currentProjectIndex])

  // Projects Y-axis 3D flipping handlers
  const handleNextProject = () => {
    if (isFlipping || currentProjectIndex >= projects.length - 1) return
    setOldProjectIndex(currentProjectIndex)
    setOldImageIndex(currentImageIndex)
    setIsFlipping(true)
    setFlipDirection('next')
    
    // Change core index immediately so backgrounds update
    setCurrentProjectIndex((prev) => prev + 1)

    // Clear flipping state after animation duration (600ms)
    setTimeout(() => {
      setIsFlipping(false)
      setFlipDirection(null)
      setOldProjectIndex(null)
    }, 600)
  }

  const handlePrevProject = () => {
    if (isFlipping || currentProjectIndex <= 0) return
    setOldProjectIndex(currentProjectIndex)
    setOldImageIndex(currentImageIndex)
    setIsFlipping(true)
    setFlipDirection('prev')

    setCurrentProjectIndex((prev) => prev - 1)

    setTimeout(() => {
      setIsFlipping(false)
      setFlipDirection(null)
      setOldProjectIndex(null)
    }, 600)
  }

  // Curriculum Y-axis 3D flipping handlers
  const handleNextCurriculum = () => {
    if (isFlipping || currentCurriculumPage >= 1) return
    setOldCurriculumPage(currentCurriculumPage)
    setIsFlipping(true)
    setFlipDirection('next')

    setCurrentCurriculumPage(1)

    setTimeout(() => {
      setIsFlipping(false)
      setFlipDirection(null)
      setOldCurriculumPage(null)
    }, 600)
  }

  const handlePrevCurriculum = () => {
    if (isFlipping || currentCurriculumPage <= 0) return
    setOldCurriculumPage(currentCurriculumPage)
    setIsFlipping(true)
    setFlipDirection('prev')

    setCurrentCurriculumPage(0)

    setTimeout(() => {
      setIsFlipping(false)
      setFlipDirection(null)
      setOldCurriculumPage(null)
    }, 600)
  }

  // Tab Switcher
  const switchTab = (tab: 'projetos' | 'curriculo') => {
    if (isFlipping) return
    setActiveTab(tab)
    setIsFlipping(false)
    setFlipDirection(null)
    setOldProjectIndex(null)
    setOldCurriculumPage(null)
  }

  // PROJECT RENDER HELPERS (for modular reuse)
  const renderProjectLeftPage = (idx: number, _isPageInsideSheet = false) => {
    const p = projects[idx]
    return (
      <div className="w-full h-full p-5 lg:px-7 lg:py-6 flex flex-col justify-between relative bg-white overflow-y-auto lg:overflow-visible">
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 screentone-subtle opacity-[0.15] pointer-events-none z-0" />
        
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            {/* Header - upgraded text size */}
            <div className="flex justify-between items-center border-b border-manga-text/20 pb-1.5 mb-3">
              <div>
                <span className="text-xs font-mono font-bold text-manga-text/60 uppercase tracking-widest block">
                  PROJETO {idx + 1} DE {projects.length}
                </span>
                <span className="text-xs font-hand font-bold text-manga-accent-blue block uppercase">
                  {p.chapter}
                </span>
              </div>
            </div>

            {/* Icon + Title - upgraded subtitle */}
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded bg-manga-bg border border-manga-text shadow-[2px_2px_0px_#2C2C35]">
                {p.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight font-sans text-manga-text">
                  {p.title}
                </h3>
                <p className="text-xs lg:text-sm font-mono text-manga-text/70 font-semibold">{p.subtitle}</p>
              </div>
            </div>

            {/* Details list - upgraded from text-xs to text-sm and text color to solid ink-blue */}
            <div className="mt-2.5">
              <h4 className="text-xs font-mono font-bold text-manga-accent-blue uppercase tracking-wider mb-1">Detalhes de Engenharia:</h4>
              <ul className="text-xs lg:text-[13px] font-sans space-y-1.5 text-manga-text pl-1 leading-snug">
                {p.details.map((detail, dIdx) => (
                  <li key={dIdx} className="flex gap-2 items-start">
                    <span className="text-manga-accent-red font-bold text-base leading-none flex-shrink-0">&bull;</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tags - upgraded from text-[9px] to text-xs */}
          <div className="mt-3 pt-1.5 border-t border-manga-text/10 flex justify-between items-end">
            <div>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="text-xs font-mono font-bold px-2.5 py-0.5 border border-manga-text/30 bg-manga-accent-red-light text-manga-accent-red rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="text-xs font-mono text-manga-text/40 mt-2.5 text-left">
                Pág. {(idx * 2) + 1}
              </div>
            </div>
            {p.githubUrl && !_isPageInsideSheet && (
              <a 
                href={p.githubUrl} 
                target="_blank" 
                rel="noreferrer"
                className="retro-btn text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 font-mono mb-1 bg-white"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Código</span>
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }

  const renderProjectRightPage = (projIdx: number, imageIdx = 0, isPageInsideSheet = false) => {
    const p = projects[projIdx]
    const activeImg = p.images[imageIdx] || p.images[0]
    
    // Internal screenshot carousel handlers
    const handleNextImg = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (isPageInsideSheet) return
      setCurrentImageIndex((prev) => (prev + 1) % p.images.length)
    }

    const handlePrevImg = (e: React.MouseEvent) => {
      e.stopPropagation()
      if (isPageInsideSheet) return
      setCurrentImageIndex((prev) => (prev - 1 + p.images.length) % p.images.length)
    }

    return (
      <div className="w-full h-full p-6 lg:p-8 flex flex-col justify-between bg-white relative overflow-y-auto lg:overflow-visible">
        <div className="absolute inset-0 screentone-subtle opacity-[0.15] pointer-events-none z-0" />
        
        <div className="relative z-10 flex flex-col h-full justify-between">
          {/* Quote Speech Bubble - upgraded from text-xs to text-sm/base font-bold for legibility */}
          <div className="mb-3 speech-bubble-manga p-3.5 shadow-[2px_2px_0px_#2C2C35] border-2 border-manga-text bg-white">
            <p className="font-hand text-sm lg:text-base leading-relaxed text-manga-text font-bold">
              "{p.speech}"
            </p>
          </div>

          {/* Screenshot Card */}
          <div className="relative group cursor-zoom-in my-auto">
            <div className="border-2 border-manga-text overflow-hidden h-[180px] lg:h-[250px] w-full bg-manga-bg relative rounded-xl shadow-[4px_4px_0px_#2C2C35] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] group-hover:shadow-[6px_6px_0px_#2C2C35] group-hover:border-[2.5px] transition-all duration-300">
              
              <img 
                src={activeImg} 
                alt={`${p.title} - Screenshot ${imageIdx + 1}`} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />

              {/* Filmstrip dots indicator inside the screenshot frame - upgraded indicator sizes */}
              {p.images.length > 1 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 bg-white/95 border border-manga-text px-2.5 py-1 rounded-full shadow-[1px_1px_0px_#2c2c35] z-30">
                  {p.images.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (!isPageInsideSheet) setCurrentImageIndex(dotIdx)
                      }}
                      className={`w-2 h-2 rounded-full border border-manga-text transition-colors cursor-pointer ${
                        imageIdx === dotIdx ? 'bg-manga-accent-red' : 'bg-white'
                      }`}
                      title={`Ver captura ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Side carousel navigation arrows - upgraded arrow buttons */}
              {p.images.length > 1 && !isPageInsideSheet && (
                <>
                  <button
                    onClick={handlePrevImg}
                    className="retro-btn absolute left-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full flex items-center justify-center p-0 text-xs font-bold"
                    title="Imagem Anterior"
                  >
                    ‹
                  </button>
                  <button
                    onClick={handleNextImg}
                    className="retro-btn absolute right-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full flex items-center justify-center p-0 text-xs font-bold"
                    title="Próxima Imagem"
                  >
                    ›
                  </button>
                </>
              )}
              
              <div className="absolute inset-0 bg-manga-text/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="retro-btn px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5" /> Ampliar Captura
                </span>
              </div>
              
              {!isPageInsideSheet && (
                <button 
                  onClick={() => setLightboxImg(activeImg)}
                  className="absolute inset-0 w-full h-full z-20 cursor-zoom-in"
                  title="Ver screenshot ampliado"
                />
              )}
            </div>
          </div>

          {/* Footer Actions - upgraded text */}
          <div className="mt-4 pt-2 border-t border-manga-text/10 flex justify-between items-center">
            {isPageInsideSheet ? (
              <div className="w-2" />
            ) : (
              <button 
                onClick={() => setLightboxImg(activeImg)}
                className="retro-btn text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 font-mono"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Ver Ecrã Inteiro</span>
              </button>
            )}

            <div className="text-xs font-mono text-manga-text/40 text-right">
              Pág. {(projIdx * 2) + 2}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // CURRICULUM RENDER HELPERS
  const renderCurriculumLeftPage = (pageIdx: number, isPageInsideSheet = false) => {
    if (pageIdx === 0) {
      return (
        <div className="w-full h-full p-5 lg:px-7 lg:py-6 flex flex-col justify-between bg-white relative overflow-y-auto lg:overflow-visible">
          <div className="absolute inset-0 screentone-subtle opacity-[0.12] pointer-events-none z-0" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              {/* Header - upgraded */}
              <div className="flex justify-between items-center border-b border-manga-text/20 pb-1.5 mb-3">
                <h3 className="text-lg font-bold font-sans flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-manga-accent-blue" />
                  <span>Sobre Mim</span>
                </h3>
                <span className="text-xs font-mono bg-manga-accent-blue text-white px-2 py-0.5 rounded">
                  PERFIL
                </span>
              </div>

              {/* Bio Paragraph - upgraded to full LaTeX Perfil text */}
              <div className="text-xs lg:text-[13px] leading-normal text-manga-text text-justify space-y-2.5 mb-3 font-sans">
                <p className="indent-4">
                  Estudante finalista de Engenharia Informática na UTAD, com uma visão integrada do ciclo de vida de desenvolvimento de software. Demonstro sólida proficiência prática em arquitetura orientada a objetos e ambientes full-stack, com foco particular nos ecossistemas TypeScript/JavaScript e C#.
                </p>
                <p className="indent-4">
                  O meu percurso inclui o desenho e implementação de sistemas distribuídos e arquiteturas orientadas a eventos, programação gráfica 3D com WebGL e a modelação avançada de bases de dados relacionais (utilizando PostgreSQL e SQLite). Alinho competências analíticas em engenharia de requisitos e modelação conceptual à proatividade de gerir e alojar as minhas próprias aplicações na cloud. Procuro ingressar no Mestrado do ISEP para consolidar conhecimentos em padrões de desenho e no desenvolvimento de sistemas escaláveis e de alta qualidade.
                </p>
              </div>

              {/* UTAD education timeline - updated with LaTeX content and GPA */}
              <div className="border-t border-manga-text/10 pt-2">
                <h4 className="text-xs font-mono font-bold text-manga-accent-blue uppercase tracking-wider mb-1">Educação:</h4>
                <div className="relative border-l border-manga-text/20 pl-4 ml-1">
                  <div className="relative">
                    <div className="absolute -left-[20.5px] top-1 w-2.5 h-2.5 rounded-full border border-manga-text bg-manga-sage" />
                    <span className="text-xs font-mono font-bold text-manga-sage block">
                      Set 2023 -- Jul 2026 (Previsão)
                    </span>
                    <h5 className="font-sans font-bold text-sm text-manga-text">
                      Licenciatura em Engenharia Informática
                    </h5>
                    <p className="text-xs text-manga-text/60">
                      Universidade de Trás-os-Montes e Alto Douro (UTAD)
                    </p>
                    <ul className="text-[11px] font-sans text-manga-text/75 mt-1 list-disc pl-4 space-y-0.5">
                      <li>Desenvolvimento de competências nucleares em algoritmos, arquitetura de sistemas e engenharia de requisitos.</li>
                      <li className="font-bold text-manga-accent-red">Média atual: 14 valores.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-xs font-mono text-manga-text/40 pt-2">
              Pág. 1
            </div>
          </div>
        </div>
      )
    } else {
      // Contacts Page - upgraded
      return (
        <div className="w-full h-full p-6 lg:p-8 flex flex-col justify-between bg-white relative overflow-y-auto lg:overflow-visible">
          <div className="absolute inset-0 screentone-subtle opacity-[0.12] pointer-events-none z-0" />
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center border-b border-manga-text/20 pb-2 mb-4">
                <h3 className="text-lg font-bold font-sans flex items-center gap-2">
                  <Mail className="w-5 h-5 text-manga-accent-blue" />
                  <span>Contacto Direto</span>
                </h3>
                <span className="text-xs font-mono bg-manga-yellow border border-manga-text px-2.5 py-0.5 rounded text-manga-text font-bold">
                  VOLUME 2
                </span>
              </div>

              <p className="text-sm text-manga-text/70 mb-4 leading-relaxed">
                Estou inteiramente disponível para partilha de projetos, dúvidas académicas ou propostas de colaboração.
              </p>

              {/* Email Copy Area */}
              <div className="border border-manga-text/20 p-3 bg-manga-bg/40 rounded-xl mb-4 relative">
                <span className="text-[10px] font-mono font-bold text-manga-text/50 uppercase tracking-widest block mb-0.5">Email profissional:</span>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-mono text-manga-text font-bold truncate select-all">pm7703125@gmail.com</span>
                  
                  {!isPageInsideSheet && (
                    <button 
                      onClick={copyEmail}
                      className={`retro-btn px-3 py-1.5 text-xs flex items-center gap-1 rounded-md ${copied ? 'bg-manga-accent-red-light border-manga-accent-red text-manga-accent-red' : ''}`}
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-manga-accent-red" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Social items - upgraded to text-sm */}
              <div className="space-y-3 text-sm font-mono">
                <a href="tel:+351914271784" className="flex items-center gap-2 text-manga-text hover:underline">
                  <Phone className="w-4 h-4 text-manga-accent-blue" />
                  <span>+351 914 271 784</span>
                </a>
                <a href="https://github.com/Braz55" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-manga-text hover:underline">
                  <Github className="w-4 h-4 text-manga-accent-blue" />
                  <span>github.com/Braz55</span>
                </a>
                <div className="text-xs text-manga-text/40 pt-3 leading-normal font-sans">
                  Localização: Mirandela, Portugal
                </div>
              </div>
            </div>
            
            <div className="text-xs font-mono text-manga-text/40 pt-3">
              Pág. 3
            </div>
          </div>
        </div>
      )
    }
  }

  const renderCurriculumRightPage = (pageIdx: number, _isPageInsideSheet = false) => {
    if (pageIdx === 0) {
      return (
        <div className="w-full h-full p-5 lg:px-7 lg:py-6 flex flex-col justify-between bg-white relative overflow-y-auto lg:overflow-visible">
          <div className="absolute inset-0 screentone-subtle opacity-[0.12] pointer-events-none z-0" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center border-b border-manga-text/20 pb-1.5 mb-3">
                <h3 className="text-lg font-bold font-sans flex items-center gap-2">
                  <Code className="w-5 h-5 text-manga-accent-red" />
                  <span>Foco Técnico &amp; Competências</span>
                </h3>
                <span className="text-xs font-mono bg-manga-accent-red text-white px-2 py-0.5 rounded">
                  SKILLS
                </span>
              </div>

              {/* Skill tags - updated with LaTeX content */}
              <div className="space-y-2.5">
                {skillCategories.map((cat, idx) => (
                  <div key={idx} className="border border-manga-text/20 p-2 rounded-xl bg-manga-bg/30">
                    <div className="flex items-center gap-1.5 mb-1">
                      {cat.icon}
                      <h4 className="font-sans font-bold text-xs text-manga-text uppercase tracking-wider">
                        {cat.title}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {cat.skills.map((skill, sIdx) => (
                        <span 
                          key={sIdx} 
                          className="px-2 py-0.5 rounded bg-white border border-manga-text/30 text-xs text-manga-text font-mono font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-xs font-mono text-manga-text/40 pt-2 text-right">
              Pág. 2
            </div>
          </div>
        </div>
      )
    } else {
      // Ambitions page - upgraded text-sm
      return (
        <div className="w-full h-full p-6 lg:p-8 flex flex-col justify-between bg-white relative overflow-y-auto lg:overflow-visible">
          <div className="absolute inset-0 screentone-subtle opacity-[0.12] pointer-events-none z-0" />
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center border-b border-manga-text/20 pb-2 mb-4">
                <h3 className="text-lg font-bold font-sans flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-manga-yellow" />
                  <span>Metas &amp; Ambições</span>
                </h3>
                <span className="text-xs font-mono bg-manga-text text-white px-2.5 py-0.5 rounded">
                  FIM
                </span>
              </div>

              {/* Ambition checkboxes - upgraded to text-sm */}
              <ul className="text-[13px] lg:text-sm font-sans space-y-3 text-manga-text pl-1 mb-4">
                <li className="flex gap-2 items-start">
                  <span className="text-manga-accent-blue font-bold text-base leading-none">✓</span>
                  <span>Consolidar e expandir projetos de código aberto (Open Source).</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-manga-accent-blue font-bold text-base leading-none">✓</span>
                  <span>Projetar arquiteturas tolerantes a falhas em sistemas gRPC e RabbitMQ de telemetria.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-manga-accent-blue font-bold text-base leading-none">✓</span>
                  <span>Explorar a aplicação prática de IA offline acoplada ao NestJS e React.</span>
                </li>
              </ul>

              <div className="border-t border-manga-text/10 pt-4 text-center">
                <span className="text-[10px] font-hand text-manga-text/50 block">
                  "O código limpo é como um livro bem escrito."
                </span>
                <span className="text-xs font-mono font-bold text-manga-accent-red mt-1 block">
                  -- Pedro Braz
                </span>
              </div>
            </div>
            
            <div className="text-xs font-mono text-manga-text/40 pt-3 text-right">
              Pág. 4
            </div>
          </div>
        </div>
      )
    }
  }

  // INDEX LOGIC SELECTORS FOR DUAL-PAGE VIEW
  const leftProjectIdx = isFlipping && flipDirection === 'next' && oldProjectIndex !== null ? oldProjectIndex : currentProjectIndex
  const rightProjectIdx = isFlipping && flipDirection === 'prev' && oldProjectIndex !== null ? oldProjectIndex : currentProjectIndex

  const leftCurriculumPage = isFlipping && flipDirection === 'next' && oldCurriculumPage !== null ? oldCurriculumPage : currentCurriculumPage
  const rightCurriculumPage = isFlipping && flipDirection === 'prev' && oldCurriculumPage !== null ? oldCurriculumPage : currentCurriculumPage

  return (
    <div className="min-h-screen bg-manga-bg text-manga-text flex flex-col items-center selection:bg-manga-accent-red-light selection:text-manga-accent-red pb-12 relative px-4 md:px-6 lg:px-8">
      
      {/* BACKGROUND DECORATIONS (Hand-drawn look) */}
      <div className="absolute top-12 left-6 opacity-20 select-none hidden lg:block animate-float-slow pointer-events-none">
        <svg width="45" height="45" viewBox="0 0 100 100" fill="none" stroke="#2C2C35" strokeWidth="2">
          <path d="M50 10 L55 45 L90 50 L55 55 L50 90 L45 55 L10 50 L45 45 Z" />
        </svg>
      </div>

      <div className="absolute top-72 right-6 opacity-20 select-none hidden lg:block animate-float pointer-events-none">
        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="#2C2C35" strokeWidth="2">
          <circle cx="50" cy="50" r="30" strokeDasharray="6 6" />
          <path d="M50 10 L50 90 M10 50 L90 50" />
        </svg>
      </div>

      {/* 1. HERO SECTION - Wider max-w and tighter margins */}
      <header className="w-full max-w-[1200px] mt-6 lg:mt-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-10 pb-8 border-b border-manga-text/10">
        
        {/* Float Avatar Container */}
        <div className="relative flex-shrink-0 animate-float">
          {/* Handwritten badge above avatar */}
          <div className="absolute -top-5 -right-5 bg-manga-yellow text-manga-text border-2 border-manga-text px-2.5 py-0.5 text-[11px] font-hand font-bold rotate-6 shadow-[2px_2px_0px_#2C2C35]">
            Finalista UTAD!
          </div>
          
          <div className="w-36 h-36 lg:w-40 lg:h-40 rounded-2xl border-2 border-manga-text bg-white overflow-hidden p-1.5 shadow-[4px_4px_0px_#2C2C35]">
            <img 
              src="/avatar_manga.png" 
              alt="Pedro Braz Avatar Manga" 
              className="w-full h-full object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div className="w-32 h-2.5 bg-manga-text/10 rounded-full blur-[2px] mx-auto mt-3 animate-pulse" />
        </div>

        {/* Hero Bio & Dialogue Bubble */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          {/* Custom Manga speech bubble */}
          <div className="mb-4 speech-bubble-manga lg:speech-bubble-left p-4 max-w-xl lg:max-w-2xl shadow-[2px_2px_0px_#2C2C35] border-2 border-manga-text bg-white">
            <div className="absolute -top-3 left-4 px-2 py-0.5 bg-manga-text text-[8px] font-mono rounded tracking-widest uppercase">
              STATUS: LEITURA 3D
            </div>
            <p className="font-sans text-xs md:text-sm leading-relaxed text-manga-text font-medium">
              "Olá! Sou o <span className="font-bold text-manga-accent-red underline decoration-wavy decoration-1">Pedro Braz</span>, Software Engineer. Estruturei o portefólio com um efeito de **Viragem de Página 3D real**! Clica nos botões de rodapé para veres a folha a desfolhar."
            </p>
          </div>

          <div className="flex flex-col items-center lg:items-start">
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight font-sans text-manga-text">
              Pedro Braz
            </h1>
            <p className="text-xs font-mono text-manga-accent-blue font-bold uppercase mt-0.5 tracking-wider flex items-center gap-1.5">
              <span>&lt;</span> Software Engineer &amp; Full-Stack Builder <span>/&gt;</span>
            </p>
          </div>

          {/* Social / Contact Retro Buttons Row */}
          <div className="flex flex-wrap gap-2.5 mt-4 justify-center lg:justify-start">
            <a 
              href="https://github.com/Braz55" 
              target="_blank" 
              rel="noreferrer"
              className="retro-btn px-3.5 py-1.5 text-xs flex items-center gap-1.5 rounded-lg"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            
            <a 
              href="tel:+351914271784" 
              className="retro-btn px-3.5 py-1.5 text-xs flex items-center gap-1.5 rounded-lg"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Ligar</span>
            </a>

            <div className="relative">
              <button 
                onClick={copyEmail}
                className={`retro-btn px-3.5 py-1.5 text-xs flex items-center gap-1.5 rounded-lg ${copied ? 'bg-manga-accent-red-light border-manga-accent-red text-manga-accent-red' : ''}`}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-manga-accent-red" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar Email'}</span>
              </button>
              {copied && (
                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-manga-text text-white text-[8px] font-mono px-2 py-0.5 rounded shadow whitespace-nowrap animate-bounce z-30">
                  pm7703125@gmail.com
                </div>
              )}
            </div>

            <a 
              href="/curriculo/Curriculo.pdf"
              download="Curriculo_Pedro_Braz.pdf"
              className="retro-btn px-3.5 py-1.5 text-xs flex items-center gap-1.5 rounded-lg bg-white"
              title="Baixar Currículo em formato PDF"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Baixar CV (PDF)</span>
            </a>
          </div>
        </div>
      </header>

      {/* 2. TABS NAVIGATION - Wider max-w and tighter margins */}
      <nav className="w-full max-w-[1200px] my-5 lg:my-6 flex justify-center gap-3">
        <button 
          onClick={() => switchTab('projetos')}
          className={`retro-btn px-5 py-2 rounded-xl text-xs tracking-wider uppercase transition-all flex items-center gap-2 ${activeTab === 'projetos' ? 'bg-manga-accent-blue text-white shadow-[1px_1px_0px_#2C2C35] translate-x-[2px] translate-y-[2px]' : ''}`}
        >
          <span>📖</span>
          <span>Livro de Projetos</span>
        </button>
        
        <button 
          onClick={() => switchTab('curriculo')}
          className={`retro-btn px-5 py-2 rounded-xl text-xs tracking-wider uppercase transition-all flex items-center gap-2 ${activeTab === 'curriculo' ? 'bg-manga-accent-red text-white shadow-[1px_1px_0px_#2C2C35] translate-x-[2px] translate-y-[2px]' : ''}`}
        >
          <span>📓</span>
          <span>Caderno de Currículo</span>
        </button>
      </nav>

      {/* 3. DYNAMIC CONTENT: OPEN BOOK CONTAINER - Responsive width adaptation */}
      <main className="w-full max-w-[1200px] px-0 md:px-2 lg:px-4">
        
        {/* PROJECTS BOOK */}
        {activeTab === 'projetos' && (
          <div className="flex flex-col gap-5">
            
            {/* The Book Body with 3D perspective - Desktop set heights, mobile stacked */}
            <div className="book-container flex flex-col lg:flex-row relative min-h-[480px] lg:h-[560px] bg-white overflow-visible">
              
              {/* Central Spine/Crease */}
              <div className="book-crease hidden lg:block" />

              {/* BACKGROUND LEFT PAGE: Shows details */}
              <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-manga-text/20 relative overflow-hidden rounded-l-2xl">
                {renderProjectLeftPage(leftProjectIdx)}
              </div>

              {/* BACKGROUND RIGHT PAGE: Shows image */}
              <div className="w-full lg:w-1/2 relative overflow-hidden rounded-r-2xl">
                {renderProjectRightPage(rightProjectIdx, rightProjectIdx === currentProjectIndex ? currentImageIndex : oldImageIndex)}
              </div>

              {/* 3D TURNING SHEET OVERLAY (VISIBLE ONLY DURING FLIPPING ON DESKTOP) */}
              {isFlipping && oldProjectIndex !== null && (
                <>
                  {/* NEXT PAGE SHEET (Flips right to left) */}
                  {flipDirection === 'next' && (
                    <div className="absolute top-0 bottom-0 left-1/2 w-1/2 z-40 transform-style-3d origin-center-spine-left animate-flip-sheet-next hidden lg:block pointer-events-none">
                      
                      {/* FRONT FACE (displays old project right page) */}
                      <div className="absolute inset-0 backface-hidden border-l border-manga-text/10 rounded-r-2xl overflow-hidden bg-white">
                        {renderProjectRightPage(oldProjectIndex, oldImageIndex, true)}
                      </div>
                      
                      {/* BACK FACE (displays new project left page) */}
                      <div className="absolute inset-0 backface-hidden rotate-y-180 border-r border-manga-text/10 rounded-l-2xl overflow-hidden bg-white">
                        {renderProjectLeftPage(currentProjectIndex, true)}
                      </div>
                      
                    </div>
                  )}

                  {/* PREV PAGE SHEET (Flips left to right) */}
                  {flipDirection === 'prev' && (
                    <div className="absolute top-0 bottom-0 left-0 w-1/2 z-40 transform-style-3d origin-center-spine-right animate-flip-sheet-prev hidden lg:block pointer-events-none">
                      
                      {/* FRONT FACE (displays old project left page) */}
                      <div className="absolute inset-0 backface-hidden border-r border-manga-text/10 rounded-l-2xl overflow-hidden bg-white">
                        {renderProjectLeftPage(oldProjectIndex, true)}
                      </div>
                      
                      {/* BACK FACE (displays new project right page) */}
                      <div className="absolute inset-0 backface-hidden rotate-y-180 border-l border-manga-text/10 rounded-r-2xl overflow-hidden bg-white">
                        {renderProjectRightPage(currentProjectIndex, 0, true)}
                      </div>
                      
                    </div>
                  )}
                </>
              )}

            </div>

            {/* Book flipping navigation controls (Retro physical buttons) */}
            <div className="flex justify-between items-center mt-1 px-1">
              <button 
                onClick={handlePrevProject}
                disabled={currentProjectIndex === 0 || isFlipping}
                className={`retro-btn px-3.5 py-2 rounded-xl text-xs flex items-center gap-1 ${currentProjectIndex === 0 ? 'opacity-40 cursor-not-allowed shadow-[0px_0px_0px_#2c2c35] translate-x-[3px] translate-y-[3px]' : ''}`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Página Anterior</span>
              </button>

              <div className="text-[11px] font-mono font-bold text-manga-text bg-white border-2 border-manga-text px-3.5 py-1.5 rounded-xl shadow-[2px_2px_0px_#2C2C35]">
                Volume 1 &bull; Projeto {currentProjectIndex + 1} de {projects.length}
              </div>

              <button 
                onClick={handleNextProject}
                disabled={currentProjectIndex === projects.length - 1 || isFlipping}
                className={`retro-btn px-3.5 py-2 rounded-xl text-xs flex items-center gap-1 ${currentProjectIndex === projects.length - 1 ? 'opacity-40 cursor-not-allowed shadow-[0px_0px_0px_#2c2c35] translate-x-[3px] translate-y-[3px]' : ''}`}
              >
                <span>Próxima Página</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

        {/* CURRICULUM BOOK */}
        {activeTab === 'curriculo' && (
          <div className="flex flex-col gap-5">
            
            {/* The Book Body with 3D perspective - Desktop set heights, mobile stacked */}
            <div className="book-container flex flex-col lg:flex-row relative min-h-[480px] lg:h-[560px] bg-white overflow-visible">
              
              {/* Central Spine/Crease */}
              <div className="book-crease hidden lg:block" />

              {/* BACKGROUND LEFT PAGE */}
              <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-manga-text/20 relative overflow-hidden rounded-l-2xl">
                {renderCurriculumLeftPage(leftCurriculumPage)}
              </div>

              {/* BACKGROUND RIGHT PAGE */}
              <div className="w-full lg:w-1/2 relative overflow-hidden rounded-r-2xl">
                {renderCurriculumRightPage(rightCurriculumPage)}
              </div>

              {/* 3D TURNING SHEET OVERLAY (VISIBLE ONLY DURING FLIPPING ON DESKTOP) */}
              {isFlipping && oldCurriculumPage !== null && (
                <>
                  {/* NEXT PAGE SHEET (Flips right to left) */}
                  {flipDirection === 'next' && (
                    <div className="absolute top-0 bottom-0 left-1/2 w-1/2 z-40 transform-style-3d origin-center-spine-left animate-flip-sheet-next hidden lg:block pointer-events-none">
                      
                      {/* FRONT FACE (displays old curriculum page 2 / right) */}
                      <div className="absolute inset-0 backface-hidden border-l border-manga-text/10 rounded-r-2xl overflow-hidden bg-white">
                        {renderCurriculumRightPage(oldCurriculumPage, true)}
                      </div>
                      
                      {/* BACK FACE (displays new curriculum page 3 / left) */}
                      <div className="absolute inset-0 backface-hidden rotate-y-180 border-r border-manga-text/10 rounded-l-2xl overflow-hidden bg-white">
                        {renderCurriculumLeftPage(currentCurriculumPage, true)}
                      </div>
                      
                    </div>
                  )}

                  {/* PREV PAGE SHEET (Flips left to right) */}
                  {flipDirection === 'prev' && (
                    <div className="absolute top-0 bottom-0 left-0 w-1/2 z-40 transform-style-3d origin-center-spine-right animate-flip-sheet-prev hidden lg:block pointer-events-none">
                      
                      {/* FRONT FACE (displays old curriculum page 3 / left) */}
                      <div className="absolute inset-0 backface-hidden border-r border-manga-text/10 rounded-l-2xl overflow-hidden bg-white">
                        {renderCurriculumLeftPage(oldCurriculumPage, true)}
                      </div>
                      
                      {/* BACK FACE (displays new curriculum page 2 / right) */}
                      <div className="absolute inset-0 backface-hidden rotate-y-180 border-l border-manga-text/10 rounded-r-2xl overflow-hidden bg-white">
                        {renderCurriculumRightPage(currentCurriculumPage, true)}
                      </div>
                      
                    </div>
                  )}
                </>
              )}

            </div>

            {/* Book flipping navigation controls (Retro physical buttons) */}
            <div className="flex justify-between items-center mt-1 px-1">
              <button 
                onClick={handlePrevCurriculum}
                disabled={currentCurriculumPage === 0 || isFlipping}
                className={`retro-btn px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 ${currentCurriculumPage === 0 ? 'opacity-40 cursor-not-allowed shadow-[0px_0px_0px_#2c2c35] translate-x-[3px] translate-y-[3px]' : ''}`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Página Anterior</span>
              </button>

              <div className="text-[11px] font-mono font-bold text-manga-text bg-white border-2 border-manga-text px-4 py-1.5 rounded-xl shadow-[2px_2px_0px_#2C2C35]">
                Volume 2 &bull; Folha {currentCurriculumPage + 1} de 2
              </div>

              <button 
                onClick={handleNextCurriculum}
                disabled={currentCurriculumPage === 1 || isFlipping}
                className={`retro-btn px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 ${currentCurriculumPage === 1 ? 'opacity-40 cursor-not-allowed shadow-[0px_0px_0px_#2c2c35] translate-x-[3px] translate-y-[3px]' : ''}`}
              >
                <span>Próxima Página</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </main>

      {/* 4. LIGHTBOX COMPONENT FOR PREVIEW */}
      {lightboxImg && (
        <div 
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-[#2C2C35]/95 flex flex-col items-center justify-center p-4 cursor-zoom-out select-none"
        >
          {/* Close button */}
          <button 
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 retro-btn p-2 rounded-full cursor-pointer hover:scale-105 transition-transform"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Framed preview panel */}
          <div className="relative max-w-full max-h-[85vh] p-2.5 bg-white border-4 border-manga-text shadow-[8px_8px_0px_#2C2C35] rounded-2xl">
            <img 
              src={lightboxImg} 
              alt="Ampliação do Painel" 
              className="max-w-full max-h-[75vh] object-contain rounded-xl border border-manga-text/20"
            />
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-manga-text text-white border-2 border-white text-xs font-mono px-4 py-1 rounded-full uppercase tracking-wider">
              Manga Panel Snapshot
            </div>
            
            <div className="mt-2.5 text-center text-xs font-hand text-manga-text/50 font-bold">
              (Clica fora ou no botão X para fechar a visualização)
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="w-full max-w-[1200px] mt-10 border-t-2 border-manga-text/10 pt-6 flex flex-col md:flex-row justify-between items-center text-manga-text/50 text-xs font-mono">
        <div>
          <span>EDITORA BR55</span>
          <span className="mx-2">&bull;</span>
          <span>VOLUME 1 &bull; MANGA REDESIGN</span>
        </div>
        <div className="mt-2 md:mt-0 font-hand text-sm font-bold text-manga-text/40">
          Feito com ☕ e código limpo &bull; Mirandela 2026
        </div>
      </footer>
    </div>
  )
}
