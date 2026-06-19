import { useState, useEffect } from 'react'
import { 
  Github, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Terminal, 
  Database, 
  Cpu, 
  Code, 
  Wrench, 
  BookOpen, 
  Check, 
  Copy, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Maximize2,
  X,
  Map,
  Gamepad2,
  Brain
} from 'lucide-react'

// Define projects from LaTeX CV with associated public images
const projects = [
  {
    title: "ProjectPilot",
    subtitle: "Assistente de IA Documental",
    type: "Parceria de Investigação com o INESC TEC (Repositório Privado)",
    period: "2026",
    images: [], // No screenshots, will show specialized RAG interactive mockup
    tags: ["Llama 3.1", "RAG", "Python", "Open WebUI", "Semantic Search", "AI Engineering"],
    details: [
      "Desenho de uma arquitetura segura para processamento offline de documentação técnica, garantindo a privacidade total dos dados através da execução local de modelos de Inteligência Artificial.",
      "Implementação de um pipeline RAG (Retrieval-Augmented Generation) acoplado ao modelo Large Language Model (Llama 3.1) para extração semântica e respostas contextuais precisas.",
      "Integração do motor de inferência numa interface visual interativa utilizando Open WebUI, otimizando a experiência de interação do utilizador final com o sistema de IA."
    ],
    icon: <Brain className="w-8 h-8 text-purple-400" />
  },
  {
    title: "Otaku Time Pro",
    subtitle: "Plataforma Full-Stack e App Mobile",
    type: "Projeto Pessoal Autónomo",
    period: "2026",
    images: [
      "/image/otaku_time/1.png",
      "/image/otaku_time/2.png",
      "/image/otaku_time/3.png",
      "/image/otaku_time/4.jpeg"
    ],
    tags: ["React", "NestJS", "Prisma", "PostgreSQL", "Capacitor", "Neon DB", "CI/CD Render"],
    details: [
      "Arquitetura de um ecossistema cloud completo utilizando React (Frontend) e NestJS (Backend API), com alojamento e integração contínua (CI/CD) via Render.",
      "Modelação e gestão de base de dados relacional em ambiente cloud (PostgreSQL / Neon DB) integrada através do ORM Prisma.",
      "Desenvolvimento multiplataforma garantindo uma experiência nativa em Android através do Capacitor, consumindo a API centralizada para sincronização em tempo real.",
      "Integração de dados complexos através de múltiplas APIs externas (AniList, MangaUpdates) desenvolvendo algoritmos de fallback e background syncing para estabilidade da informação."
    ],
    icon: <Terminal className="w-8 h-8 text-sky-400" />
  },
  {
    title: "Plataforma de Monitorização IoT Distribuída",
    subtitle: "Sistema IoT Assíncrono para Telemetria",
    type: "Projeto Académico de Sistemas Distribuídos (Repositório Privado)",
    period: "2026",
    images: [
      "/image/isDistribuidos/1.png",
      "/image/isDistribuidos/2.png",
      "/image/isDistribuidos/3.png"
    ],
    tags: ["C#", "gRPC", "RabbitMQ", "MongoDB", "Python", "Node.js", "Polly Retry"],
    details: [
      "Arquitetura e implementação de um sistema IoT assíncrono para telemetria, utilizando um modelo Pub/Sub através de RabbitMQ (Topic Exchanges).",
      "Desenho de uma arquitetura de microsserviços integrando componentes heterogéneos (C#, Python, Node.js) comunicando estritamente via gRPC e Protocol Buffers.",
      "Implementação de mecanismos avançados de resiliência e tolerância a falhas, incluindo Dead-Letter Exchanges, Retry policies exponenciais (Polly) e Fallbacks.",
      "Desacoplamento da camada de dados utilizando armazenamento persistente em MongoDB para o registo em tempo real de métricas ambientais."
    ],
    icon: <Cpu className="w-8 h-8 text-emerald-400" />
  },
  {
    title: "Aplicação Gráfica 3D Interativa",
    subtitle: "Inspirada em Tron Light Cycles",
    type: "Projeto de Computação Gráfica (Trabalho de Grupo)",
    period: "2026",
    images: [
      "/image/neondrive/1.png",
      "/image/neondrive/2.png",
      "/image/neondrive/3.png"
    ],
    tags: ["WebGL", "Three.js", "JavaScript", "3D Graphics", "Vector Math"],
    details: [
      "Manipulação de matrizes de transformação e primitivas geométricas recorrendo a Three.js e WebGL para criar uma simulação 3D fluida inspirada em Tron Light Cycles."
    ],
    icon: <Gamepad2 className="w-8 h-8 text-pink-400" />
  }
]

// Skill Categories from LaTeX CV
const skillCategories = [
  {
    title: "Linguagens",
    icon: <Code className="w-5 h-5 text-indigo-400" />,
    skills: ["C#", "TypeScript", "JavaScript", "Python", "C", "C++", "HTML5/CSS3"]
  },
  {
    title: "Bases de Dados",
    icon: <Database className="w-5 h-5 text-emerald-400" />,
    skills: ["T-SQL", "PL/pgSQL", "PostgreSQL", "MongoDB", "Supabase RLS", "Neon DB"]
  },
  {
    title: "Frameworks \& APIs",
    icon: <Cpu className="w-5 h-5 text-purple-400" />,
    skills: ["ASP.NET Core", "gRPC", "RabbitMQ", "Stripe API", "NestJS", "React", "Capacitor"]
  },
  {
    title: "Ferramentas \& Padrões",
    icon: <Wrench className="w-5 h-5 text-teal-400" />,
    skills: ["Docker", "CI/CD", "RAG", "Protocol Buffers", "Diretrizes WCAG 2.2", "QA Testing", "Heurísticas Nielsen"]
  }
]

function App() {
  const [copied, setCopied] = useState(false)
  const [activeFilter, setActiveFilter] = useState("Todos")
  
  // Carousel States
  const [projectIndex, setProjectIndex] = useState(0)
  const [imageIndex, setImageIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState("")

  const copyEmail = () => {
    navigator.clipboard.writeText("pm7703125@gmail.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Filter Categories
  const filterCategories = ["Todos", "Full-Stack", "IA & RAG", "IoT & Distribuídos", "Outros"]

  const filteredProjects = projects.filter(project => {
    if (activeFilter === "Todos") return true
    if (activeFilter === "Full-Stack") return project.tags.includes("NestJS") || project.tags.includes("ASP.NET Core") || project.tags.includes("Supabase")
    if (activeFilter === "IA & RAG") return project.tags.includes("RAG") || project.tags.includes("Llama 3.1")
    if (activeFilter === "IoT & Distribuídos") return project.tags.includes("RabbitMQ") || project.tags.includes("gRPC")
    if (activeFilter === "Outros") return project.tags.includes("WebGL") || project.tags.includes("Three.js") || project.tags.includes("WCAG 2.2")
    return true
  })

  // Reset index when filter changes
  useEffect(() => {
    setProjectIndex(0)
    setImageIndex(0)
  }, [activeFilter])

  const activeProject = filteredProjects[projectIndex] || projects[0]

  const handleNextProject = () => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setProjectIndex((prev) => (prev + 1) % filteredProjects.length)
      setImageIndex(0)
      setAnimating(false)
    }, 300)
  }

  const handlePrevProject = () => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setProjectIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length)
      setImageIndex(0)
      setAnimating(false)
    }, 300)
  }

  const handleNextImage = (e: React.MouseEvent, max: number) => {
    e.stopPropagation()
    setImageIndex((prev) => (prev + 1) % max)
  }

  const handlePrevImage = (e: React.MouseEvent, max: number) => {
    e.stopPropagation()
    setImageIndex((prev) => (prev - 1 + max) % max)
  }

  const openLightbox = (imgUrl: string) => {
    setLightboxImage(imgUrl)
    setLightboxOpen(true)
  }

  return (
    <div className="relative min-h-screen selection:bg-indigo-500 selection:text-white pb-24">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-glow-purple rounded-full pointer-events-none z-0 animate-float" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-glow-blue rounded-full pointer-events-none z-0 animate-float-delayed" />
      <div className="absolute bottom-[10%] left-[15%] w-[450px] h-[450px] bg-glow-teal rounded-full pointer-events-none z-0 animate-float" />

      {/* Floating Navbar */}
      <nav className="sticky top-0 z-50 glass-navbar px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 font-display font-bold text-xl tracking-tight text-white hover:opacity-90 transition-opacity">
            <Terminal className="w-5 h-5 text-indigo-400" />
            <span>pedro<span className="text-indigo-400">.braz</span>()</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#about" className="hover:text-white transition-colors">Sobre</a>
            <a href="#skills" className="hover:text-white transition-colors">Competências</a>
            <a href="#projects" className="hover:text-white transition-colors">Projetos</a>
            <a href="#education" className="hover:text-white transition-colors">Educação</a>
            <a href="#contact" className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-500/20 transition-all">Contacto</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-20 md:pt-32 pb-16 px-6 max-w-6xl mx-auto z-10">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Disponível para Projetos & Mestrado</span>
          </div>

          <h1 className="font-display font-extrabold text-5xl md:text-8xl tracking-tight text-white mb-6">
            Pedro Braz
          </h1>

          <p className="text-xl md:text-3xl font-display font-medium text-slate-300 mb-8 max-w-2xl">
            Software Engineer especializado em ecossistemas <span className="shimmer-text font-bold">TypeScript, C# e IA</span>
          </p>

          <p className="text-slate-400 max-w-2xl text-base md:text-lg mb-10 leading-relaxed">
            Estudante finalista de Engenharia Informática focado em desenhar arquiteturas robustas, sistemas distribuídos resilientes e aplicações interativas modernas.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href="#projects" 
              className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/40 hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              <span>Ver Projetos</span>
              <ChevronRight className="w-4 h-4" />
            </a>
            <a 
              href="#contact" 
              className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-slate-600 text-slate-200 font-semibold hover:-translate-y-0.5 transition-all"
            >
              Falar Comigo
            </a>
          </div>

          {/* Core Info Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 w-full max-w-3xl">
            <div className="glass-panel p-4 rounded-xl flex items-center gap-4">
              <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs text-slate-400">Localização</p>
                <p className="text-sm font-semibold text-white">Mirandela, Portugal</p>
              </div>
            </div>
            <div className="glass-panel p-4 rounded-xl flex items-center gap-4">
              <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs text-slate-400">Formação</p>
                <p className="text-sm font-semibold text-white">Engenharia Informática</p>
              </div>
            </div>
            <div className="glass-panel p-4 rounded-xl flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
                <Github className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs text-slate-400">GitHub</p>
                <a href="https://github.com/Braz55" target="_blank" rel="noreferrer" className="text-sm font-semibold text-white hover:text-indigo-400 transition-colors flex items-center gap-1">
                  <span>Braz55</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-16 px-6 max-w-6xl mx-auto z-10 scroll-mt-20">
        <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-glow-blue rounded-full opacity-40 pointer-events-none" />
          
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-1 bg-indigo-500 rounded-full inline-block"></span>
            Perfil Profissional
          </h2>

          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            Estudante finalista de Engenharia Informática na UTAD, especializado no ciclo de vida completo de Engenharia de Software. Com sólida experiência prática baseada no desenvolvimento assistido por Inteligência Artificial, demonstro proficiência em arquiteturas orientadas a objetos e ambientes full-stack, com foco particular nos ecossistemas TypeScript/JavaScript e C#.
          </p>

          <p className="text-slate-300 text-lg leading-relaxed">
            O meu percurso inclui o desenho de sistemas distribuídos complexos através de mensajaria (RabbitMQ), programação gráfica 3D com WebGL e a modelação avançada de bases de dados relacionais utilizando T-SQL e PL/pgSQL. Alinho competências analíticas em engenharia de requisitos e modelação conceptual à proatividade de gerir e alojar os meus próprios projetos na cloud. Atualmente, procuro ingressar no Mestrado do ISEP para consolidar conhecimentos em padrões de desenho e no desenvolvimento de sistemas escaláveis e de alta qualidade.
          </p>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section id="skills" className="relative py-16 px-6 max-w-6xl mx-auto z-10 scroll-mt-20">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-4">
            Competências Técnicas
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Stack tecnológica e ferramentas com as quais tenho trabalhado no desenvolvimento de aplicações e sistemas de computação.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl glass-panel-hover">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700">
                  {category.icon}
                </div>
                <h3 className="font-display font-bold text-xl text-white">
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    className="px-3.5 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 text-sm hover:border-indigo-500/50 hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase Projects Carousel (Single Slide Project Viewer) */}
      <section id="projects" className="relative py-16 px-6 max-w-6xl mx-auto z-10 scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-4">
              Projetos de Destaque
            </h2>
            <p className="text-slate-400">
              Navegue através dos meus projetos como se estivesse no visualizador de fotos, alternando com as setas laterais.
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-2 bg-slate-900/80 border border-slate-800 p-1.5 rounded-xl w-fit">
            {filterCategories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeFilter === category 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Container */}
        {filteredProjects.length > 0 ? (
          <div className="relative flex items-center justify-center gap-2 md:gap-6">
            
            {/* Left Main Project Arrow */}
            <button
              onClick={handlePrevProject}
              className="p-3 md:p-4 rounded-full bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white hover:border-indigo-500 hover:bg-slate-800 shadow-xl transition-all flex-shrink-0 z-20"
              title="Projeto Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Showcase Glass Card */}
            <div 
              className={`w-full max-w-5xl glass-panel rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ${
                animating ? "opacity-0 translate-y-4 scale-95" : "opacity-100 translate-y-0 scale-100"
              }`}
            >
              {/* Colored top line decoration */}
              <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* Left Column: Project Details (7/12 width) */}
                <div className="lg:col-span-7 p-6 md:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        {activeProject.icon}
                      </div>
                      <div>
                        <h3 className="font-display font-extrabold text-2xl md:text-3xl text-white">
                          {activeProject.title}
                        </h3>
                        <p className="text-indigo-400 text-sm font-semibold mt-0.5">
                          {activeProject.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mb-6">
                      <span className="bg-slate-900 border border-slate-800 px-3 py-1 rounded-full uppercase tracking-wider text-[10px]">
                        {activeProject.period}
                      </span>
                      <span>•</span>
                      <span className="italic">{activeProject.type}</span>
                    </div>

                    {/* Bullet Points */}
                    <ul className="space-y-3 mb-8">
                      {activeProject.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5 text-slate-300 text-sm leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-800/80">
                    {activeProject.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Screenshot Gallery / Visual Mockup (5/12 width) */}
                <div className="lg:col-span-5 bg-slate-950/40 border-t lg:border-t-0 lg:border-l border-slate-800/80 p-6 flex flex-col justify-center min-h-[300px] lg:min-h-auto">
                  
                  {activeProject.images && activeProject.images.length > 0 ? (
                    /* Project Image Slider */
                    <div className="relative group rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col justify-between aspect-[16/10]">
                      
                      {/* Image Preview */}
                      <div 
                        className="w-full h-full relative cursor-pointer"
                        onClick={() => openLightbox(activeProject.images[imageIndex])}
                      >
                        <img 
                          src={activeProject.images[imageIndex]} 
                          alt={`${activeProject.title} screenshot ${imageIndex + 1}`}
                          className="w-full h-full object-contain p-2"
                        />
                        
                        {/* Hover Overlay Button */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="p-3 rounded-full bg-slate-900/90 text-white shadow-xl">
                            <Maximize2 className="w-5 h-5" />
                          </div>
                        </div>

                        {/* Image Counter Badge */}
                        <span className="absolute top-3 right-3 text-xs bg-slate-900/90 text-slate-300 border border-slate-700 px-2 py-0.5 rounded-md font-semibold select-none">
                          {imageIndex + 1} / {activeProject.images.length}
                        </span>
                      </div>

                      {/* Image Arrow Controls */}
                      <button
                        onClick={(e) => handlePrevImage(e, activeProject.images.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-slate-900/90 text-slate-400 hover:text-white border border-slate-700 hover:border-indigo-500 transition-all opacity-0 group-hover:opacity-100"
                        title="Imagem Anterior"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleNextImage(e, activeProject.images.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-slate-900/90 text-slate-400 hover:text-white border border-slate-700 hover:border-indigo-500 transition-all opacity-0 group-hover:opacity-100"
                        title="Próxima Imagem"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {/* Bottom Bullet Indicators */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {activeProject.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => { e.stopPropagation(); setImageIndex(idx) }}
                            className={`w-2 h-2 rounded-full transition-all ${
                              imageIndex === idx ? "bg-indigo-500 w-4" : "bg-slate-600 hover:bg-slate-400"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Fallback Custom Interactive Mockups for projects without images */
                    <div className="w-full aspect-[16/10] rounded-xl border border-slate-800 bg-slate-950/80 p-4 flex flex-col justify-between overflow-hidden relative group">
                      
                      {/* Projectpilot (AI / RAG) mockup */}
                      {activeProject.title === "ProjectPilot" && (
                        <div className="h-full flex flex-col justify-between text-left font-mono text-xs">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                            <span className="text-purple-400 flex items-center gap-1.5">
                              <Brain className="w-3.5 h-3.5" />
                              <span>Local RAG Pipeline</span>
                            </span>
                            <span className="text-slate-600">Model: Llama-3.1-8B</span>
                          </div>
                          <div className="flex-grow space-y-2.5 overflow-y-auto pr-1">
                            <div className="text-slate-500">&gt; embedding technical_docs.pdf...</div>
                            <div className="text-emerald-400">&gt; Vector database built successfully.</div>
                            <div className="bg-slate-900/80 p-2 rounded border border-slate-800/80 text-[10px] text-slate-300">
                              <span className="text-indigo-400">User:</span> Que mecanismos de tolerância a falhas devem ser implementados na monitorização?
                            </div>
                            <div className="bg-indigo-950/20 p-2 rounded border border-indigo-500/20 text-[10px] text-indigo-300 animate-pulse">
                              <span className="text-purple-400">ProjectPilot AI:</span> Com base nos documentos locais, utilize Dead-Letter Exchanges em RabbitMQ e políticas de retry exponencial com Polly...
                            </div>
                          </div>
                          <div className="border-t border-slate-800 pt-2 mt-2 flex items-center justify-between text-slate-500 text-[10px]">
                            <span>Status: Execute Local Offline</span>
                            <span className="text-purple-400">INESC TEC Partnership</span>
                          </div>
                        </div>
                      )}

                      {/* UTAD Maps mockup */}
                      {activeProject.title === "UTAD Maps" && (
                        <div className="h-full flex flex-col justify-between text-left font-sans">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 text-xs font-mono text-teal-400">
                            <span className="flex items-center gap-1.5">
                              <Map className="w-3.5 h-3.5" />
                              <span>Campus UTAD Navigation</span>
                            </span>
                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded text-[9px]">WCAG 2.2 AAA</span>
                          </div>
                          
                          {/* Styled vector map graphics */}
                          <div className="flex-grow flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-glow-teal opacity-20" />
                            <div className="w-full h-28 border border-slate-800 rounded-lg relative overflow-hidden bg-slate-900/60 p-2">
                              {/* Campus Paths & Buildings */}
                              <div className="absolute top-4 left-6 w-12 h-8 rounded bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-[8px] font-bold text-teal-300">E.C.T.</div>
                              <div className="absolute top-16 right-8 w-16 h-8 rounded bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-[8px] font-bold text-indigo-300">Reitoria</div>
                              {/* Route Path line */}
                              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <path d="M 30 50 Q 80 80 180 40 T 260 60" fill="none" stroke="#14b8a6" strokeWidth="2" strokeDasharray="4 3" />
                                <circle cx="30" cy="50" r="3" fill="#14b8a6" />
                                <circle cx="260" cy="60" r="4" fill="#a855f7" className="animate-ping" />
                                <circle cx="260" cy="60" r="3.5" fill="#a855f7" />
                              </svg>
                            </div>
                          </div>

                          <div className="border-t border-slate-800 pt-2 mt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                            <span>RLS Secure: Supabase/PostgreSQL</span>
                            <span>Acessível AA/AAA</span>
                          </div>
                        </div>
                      )}

                      {/* WebGL / 3D Graphics Tron mockup */}
                      {activeProject.title === "Aplicação Gráfica 3D Interativa" && (
                        <div className="h-full flex flex-col justify-between text-left font-mono">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 text-xs text-pink-400">
                            <span className="flex items-center gap-1.5">
                              <Gamepad2 className="w-3.5 h-3.5" />
                              <span>WebGL / Three.js Grid Engine</span>
                            </span>
                            <span>60 FPS</span>
                          </div>

                          {/* Tron retro Grid simulation */}
                          <div className="flex-grow flex items-center justify-center relative overflow-hidden bg-slate-950 rounded-lg border border-pink-500/10">
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(244,63,94,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(244,63,94,0.05)_1px,transparent_1px)] bg-[size:16px_16px]" />
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="relative w-36 h-20 border border-pink-500/30 rounded transform perspective-1000 rotateX(60deg) scale(1.3) flex items-center justify-center overflow-hidden">
                                {/* Tron Path */}
                                <div className="absolute bottom-0 left-12 w-0.5 h-full bg-pink-500 shadow-[0_0_10px_#f43f5e]" />
                                <div className="absolute bottom-6 left-12 w-16 h-0.5 bg-pink-500 shadow-[0_0_10px_#f43f5e]" />
                                <div className="absolute bottom-6 left-28 w-0.5 h-12 bg-pink-500 shadow-[0_0_10px_#f43f5e]" />
                                {/* Tron Light Cycle representation */}
                                <div className="absolute top-2 left-28 w-2.5 h-4 bg-pink-400 border border-white rounded-sm shadow-[0_0_8px_#fff]" />
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-slate-800 pt-2 mt-2 flex items-center justify-between text-[10px] text-slate-500">
                            <span>Computação Gráfica 3D</span>
                            <span className="text-pink-400">Tron Light Cycle Simulation</span>
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                </div>

              </div>
            </div>

            {/* Right Main Project Arrow */}
            <button
              onClick={handleNextProject}
              className="p-3 md:p-4 rounded-full bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white hover:border-indigo-500 hover:bg-slate-800 shadow-xl transition-all flex-shrink-0 z-20"
              title="Próximo Projeto"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

          </div>
        ) : (
          <div className="glass-panel p-12 rounded-2xl text-center text-slate-400">
            Nenhum projeto encontrado nesta categoria.
          </div>
        )}

        {/* Bullet Pagination Indicators for Projects List */}
        {filteredProjects.length > 1 && (
          <div className="flex items-center justify-center gap-2.5 mt-8 z-10 relative">
            {filteredProjects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (animating) return
                  setAnimating(true)
                  setTimeout(() => {
                    setProjectIndex(idx)
                    setImageIndex(0)
                    setAnimating(false)
                  }, 300)
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  projectIndex === idx 
                    ? "bg-indigo-500 border-indigo-500 w-8 shadow-lg shadow-indigo-500/30" 
                    : "border-slate-800 bg-slate-900 hover:border-slate-600"
                }`}
                title={`Ir para o projeto ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Education & Percurso */}
      <section id="education" className="relative py-16 px-6 max-w-4xl mx-auto z-10 scroll-mt-20">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-4">
            Educação e Percurso
          </h2>
          <p className="text-slate-400">
            A minha base académica na área de Engenharia Informática.
          </p>
        </div>

        {/* Custom Vertical Timeline */}
        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-6 pl-8 md:pl-10 space-y-12">
          {/* Timeline Dot */}
          <div className="absolute left-[-9px] top-1.5 w-4 h-4 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20" />
          
          <div className="glass-panel p-6 md:p-8 rounded-2xl relative">
            <span className="absolute top-6 right-6 text-sm text-indigo-400 font-semibold bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full">
              Set 2023 -- Jul 2026 (Previsão)
            </span>
            
            <h3 className="font-display font-bold text-2xl text-white mb-2">
              Licenciatura em Engenharia Informática
            </h3>
            <p className="text-lg text-slate-300 font-medium mb-6">
              Universidade de Trás-os-Montes e Alto Douro (UTAD)
            </p>
            
            <ul className="space-y-3.5 text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                <span>Desenvolvimento de competências nucleares em algoritmos, arquitetura de sistemas distribuídos e engenharia de requisitos.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                <span>Foco em computação gráfica e interfaces interativas, segurança aplicacional (RBAC/Identity/JWT) e usabilidade.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-16 px-6 max-w-4xl mx-auto z-10 scroll-mt-20">
        <div className="glass-panel p-8 md:p-12 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-glow-teal rounded-full opacity-35 pointer-events-none" />
          
          <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-4">
            Vamos trabalhar juntos?
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-8">
            Seja para oportunidades de emprego, projetos ou detalhes sobre o percurso académico, sinta-se à vontade para entrar em contacto.
          </p>

          <div className="flex flex-col items-center gap-6">
            {/* Email copying widget */}
            <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-2 rounded-xl max-w-full w-[360px] justify-between">
              <div className="flex items-center gap-2.5 pl-2 overflow-hidden">
                <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span className="text-slate-200 text-sm font-semibold truncate select-all">
                  pm7703125@gmail.com
                </span>
              </div>
              <button 
                onClick={copyEmail}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copiado!" : "Copiar"}</span>
              </button>
            </div>

            {/* Social Links buttons grid */}
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/Braz55" 
                target="_blank" 
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-indigo-500/50 hover:text-white transition-all text-slate-300"
                title="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="mailto:pm7703125@gmail.com" 
                className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-indigo-500/50 hover:text-white transition-all text-slate-300"
                title="Enviar Email"
              >
                <Mail className="w-6 h-6" />
              </a>
              <a 
                href="tel:+351914271784"
                className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-indigo-500/50 hover:text-white transition-all text-slate-300"
                title="Ligar"
              >
                <span className="text-sm font-bold px-1">+351 914 271 784</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox / Foto Fullscreen modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 cursor-zoom-out"
          onClick={() => setLightboxOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
          <img 
            src={lightboxImage} 
            alt="Fullscreen preview" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border border-white/5"
          />
        </div>
      )}

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 border-t border-slate-900/60 py-6 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} Pedro Braz. Construído com React, TypeScript e Tailwind CSS v4.</p>
      </footer>
    </div>
  )
}

export default App
