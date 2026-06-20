import { useState, useEffect, useRef } from 'react'
import { 
  Github, 
  Mail, 
  MapPin, 
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
  Gamepad2,
  Brain,
  Phone,
  ArrowUpRight
} from 'lucide-react'

// Define projects from LaTeX CV with associated public images
const projects = [
  {
    title: "ProjectPilot",
    subtitle: "Assistente de IA Documental",
    type: "Parceria de Investigação com o INESC TEC (Repositório Privado)",
    period: "2026",
    images: [
      "/image/project_pilot/1.png"
    ],
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
    skills: ["PostgreSQL", "SQLite", "MongoDB", "Supabase RLS"]
  },
  {
    title: "Frameworks & APIs",
    icon: <Cpu className="w-5 h-5 text-purple-400" />,
    skills: ["ASP.NET Core", "gRPC", "RabbitMQ", "Stripe API", "NestJS", "React", "Capacitor"]
  },
  {
    title: "Ferramentas & Padrões",
    icon: <Wrench className="w-5 h-5 text-teal-400" />,
    skills: ["Docker", "CI/CD", "RAG", "Protocol Buffers", "Distributed Systems", "QA Testing"]
  }
]

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: string;
}

function ScrollReveal({ children, className = "", delay = "" }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (ref.current) {
            observer.unobserve(ref.current)
          }
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${isVisible ? 'visible' : ''} ${delay} ${className}`}
    >
      {children}
    </div>
  )
}

function App() {
  const [copied, setCopied] = useState(false)
  const [activeFilter, setActiveFilter] = useState("Todos")
  const [activeView, setActiveView] = useState<"projects" | "curriculum">("projects")
  
  // Carousel States
  const [projectIndex, setProjectIndex] = useState(0)
  const [imageIndex, setImageIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText("pm7703125@gmail.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const navigateToView = (view: "projects" | "curriculum", elementId: string) => {
    setActiveView(view)
    setTimeout(() => {
      const element = document.getElementById(elementId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }, 50)
  }

  // Filter Categories
  const filterCategories = ["Todos", "Full-Stack", "IA & RAG", "IoT & Distribuídos", "Outros"]

  const filteredProjects = projects.filter(project => {
    if (activeFilter === "Todos") return true
    if (activeFilter === "Full-Stack") return project.tags.includes("NestJS")
    if (activeFilter === "IA & RAG") return project.tags.includes("RAG") || project.tags.includes("Llama 3.1")
    if (activeFilter === "IoT & Distribuídos") return project.tags.includes("RabbitMQ") || project.tags.includes("gRPC")
    if (activeFilter === "Outros") return project.tags.includes("WebGL") || project.tags.includes("Three.js")
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
    }, 250)
  }

  const handlePrevProject = () => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setProjectIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length)
      setImageIndex(0)
      setAnimating(false)
    }, 250)
  }

  const handleNextImage = (e: React.MouseEvent, max: number) => {
    e.stopPropagation()
    setImageIndex((prev) => (prev + 1) % max)
  }

  const handlePrevImage = (e: React.MouseEvent, max: number) => {
    e.stopPropagation()
    setImageIndex((prev) => (prev - 1 + max) % max)
  }

  const openLightbox = () => {
    setLightboxOpen(true)
  }

  // Keyboard navigation for image gallery and lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeProject || !activeProject.images || activeProject.images.length === 0) return

      if (lightboxOpen) {
        if (e.key === "ArrowRight") {
          setImageIndex((prev) => (prev + 1) % activeProject.images.length)
        } else if (e.key === "ArrowLeft") {
          setImageIndex((prev) => (prev - 1 + activeProject.images.length) % activeProject.images.length)
        } else if (e.key === "Escape") {
          setLightboxOpen(false)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen, activeProject])

  return (
    <div className="relative min-h-screen bg-grid-mesh pb-24 text-slate-300 selection:bg-indigo-500 selection:text-white">
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute top-[5%] left-[-15%] w-[600px] h-[600px] glow-purple rounded-full pointer-events-none z-0 animate-float-premium" />
      <div className="absolute top-[35%] right-[-15%] w-[700px] h-[700px] glow-indigo rounded-full pointer-events-none z-0 animate-float-premium-delayed" />
      <div className="absolute bottom-[5%] left-[10%] w-[500px] h-[500px] glow-teal rounded-full pointer-events-none z-0 animate-float-premium" />

      {/* Header Navigation */}
      <nav className="sticky top-0 z-50 glass-navbar px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigateToView("projects", "hero")}
            className="flex items-center gap-2.5 font-display font-bold text-xl tracking-tight text-white group cursor-pointer bg-transparent border-none"
          >
            <Terminal className="w-5 h-5 text-indigo-400 group-hover:rotate-6 transition-transform" />
            <span>pedro<span className="text-indigo-400">.braz</span>()</span>
          </button>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button 
              onClick={() => navigateToView("curriculum", "about")}
              className={`hover:text-white transition-colors cursor-pointer bg-transparent border-none ${
                activeView === "curriculum" ? "text-indigo-400 font-semibold" : "text-slate-400"
              }`}
            >
              Sobre
            </button>
            <button 
              onClick={() => navigateToView("curriculum", "skills")}
              className={`hover:text-white transition-colors cursor-pointer bg-transparent border-none ${
                activeView === "curriculum" ? "text-indigo-400 font-semibold" : "text-slate-400"
              }`}
            >
              Competências
            </button>
            <button 
              onClick={() => navigateToView("projects", "projects")}
              className={`hover:text-white transition-colors cursor-pointer bg-transparent border-none ${
                activeView === "projects" ? "text-indigo-400 font-semibold" : "text-slate-400"
              }`}
            >
              Projetos
            </button>
            <button 
              onClick={() => navigateToView("curriculum", "education")}
              className={`hover:text-white transition-colors cursor-pointer bg-transparent border-none ${
                activeView === "curriculum" ? "text-indigo-400 font-semibold" : "text-slate-400"
              }`}
            >
              Educação
            </button>
            <button 
              onClick={() => navigateToView(activeView, "contact")}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5 transition-all cursor-pointer border-none"
            >
              Contacto
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-12 md:pt-24 pb-16 px-6 max-w-6xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Big Typography and Intro (7/12) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6 badge-glow animate-fade-in-up-premium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Disponível para Mestrado & Projetos</span>
            </div>

            <h1 className="font-display font-black text-6xl md:text-8xl tracking-tight text-white mb-6 animate-fade-in-up-premium animation-delay-100 leading-none">
              PEDRO <br/>
              <span className="text-indigo-400">BRAZ</span>
            </h1>

            <p className="text-xl md:text-2xl font-display font-medium text-slate-300 mb-6 max-w-xl animate-fade-in-up-premium animation-delay-200">
              Software Engineer com foco em <span className="shimmer-text-premium font-bold">TypeScript, C# e Inteligência Artificial</span>
            </p>

            <p className="text-slate-400 text-base md:text-lg mb-8 leading-relaxed max-w-lg animate-fade-in-up-premium animation-delay-300">
              Estudante finalista de Engenharia Informática focado no desenho de arquiteturas robustas, sistemas distribuídos e simulação gráfica 3D.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up-premium animation-delay-450 w-full sm:w-auto">
              <button 
                onClick={() => navigateToView("projects", "projects")}
                className="px-6 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:-translate-y-1 transition-all flex items-center gap-2 justify-center w-full sm:w-auto cursor-pointer border-none"
              >
                <span>Explorar Projetos</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => navigateToView("curriculum", "about")}
                className="px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold hover:-translate-y-1 transition-all justify-center w-full sm:w-auto text-center cursor-pointer"
              >
                Ver Currículo Académico
              </button>
            </div>
          </div>

          {/* Right Column: Premium Code Window Mockup (5/12) */}
          <div className="lg:col-span-5 animate-fade-in-up-premium animation-delay-600">
            <div className="w-full glass-card rounded-2xl overflow-hidden shadow-2xl border border-white/5 animate-float-premium">
              {/* macOS Style Bar */}
              <div className="terminal-bar px-4 py-3 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="terminal-dot terminal-dot-close" />
                  <span className="terminal-dot terminal-dot-minimize" />
                  <span className="terminal-dot terminal-dot-zoom" />
                </div>
                <span className="text-xs font-mono text-slate-500">profile.ts</span>
                <span className="w-12" /> {/* spacer */}
              </div>
              
              {/* Terminal Code Content */}
              <div className="p-6 text-left font-mono text-xs md:text-sm leading-relaxed overflow-x-auto bg-slate-950/70">
                <p className="text-slate-500">// Perfil de Engenharia</p>
                <p className="mt-2 text-indigo-300">
                  <span className="text-pink-400">const</span> engineer = <span className="text-pink-400">new</span> <span className="text-teal-300">SoftwareEngineer</span>(<span className="text-emerald-400">"Pedro Braz"</span>);
                </p>
                
                <p className="mt-3 text-indigo-300">
                  engineer.<span className="text-sky-300">focusAreas</span>([
                </p>
                <p className="pl-6 text-emerald-400">
                  "TypeScript/Node.js",<br/>
                  "C#/.NET Core",<br/>
                  "AI & Local RAG",<br/>
                  "Bases de Dados"<br/>
                </p>
                <p className="text-indigo-300">
                  ]);
                </p>

                <p className="mt-4 text-indigo-300">
                  engineer.<span className="text-sky-300">competencies</span> = &#123;
                </p>
                <p className="pl-6 text-indigo-300">
                  distributedSystems: <span className="text-amber-400">"RabbitMQ + gRPC"</span>,<br/>
                  graphics3D: <span className="text-amber-400">"WebGL + Three.js"</span>,<br/>
                  requirements: <span className="text-amber-400">"Engenharia de Requisitos"</span>
                </p>
                <p className="text-indigo-300">
                  &#125;;
                </p>

                <p className="mt-4 text-indigo-300">
                  engineer.<span className="text-sky-300">academicStatus</span> = <span className="text-emerald-400">"Finalist @ UTAD"</span>;
                </p>
                <p className="text-indigo-300">
                  engineer.<span className="text-sky-300">nextMilestone</span> = <span className="text-emerald-400">"Mestrado @ ISEP"</span>;
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Floating Metrics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 w-full max-w-4xl mx-auto animate-fade-in-up-premium animation-delay-800">
          <div className="glass-card p-5 rounded-2xl flex items-center gap-4 hover:border-indigo-500/30 transition-colors">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/15">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Localização</p>
              <p className="text-sm font-semibold text-white">Mirandela, Portugal</p>
            </div>
          </div>
          <div className="glass-card p-5 rounded-2xl flex items-center gap-4 hover:border-emerald-500/30 transition-colors">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/15">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Formação</p>
              <p className="text-sm font-semibold text-white">Engenharia Informática</p>
            </div>
          </div>
          <div className="glass-card p-5 rounded-2xl flex items-center gap-4 hover:border-purple-500/30 transition-colors">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/15">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Código-Fonte</p>
              <a href="https://github.com/Braz55" target="_blank" rel="noreferrer" className="text-sm font-semibold text-white hover:text-indigo-400 transition-colors flex items-center gap-1">
                <span>github.com/Braz55</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-indigo-400" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* View Selector (Segmented Control) */}
      <div className="max-w-md mx-auto mb-8 px-6 z-20 relative animate-fade-in-up-premium animation-delay-800">
        <div className="p-1.5 bg-slate-950/80 border border-slate-800/80 rounded-2xl flex items-center shadow-2xl backdrop-blur-md">
          <button 
            onClick={() => navigateToView("projects", "projects")}
            className={`flex-1 py-3 px-4 rounded-xl font-display font-bold text-sm transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 border-none ${
              activeView === "projects"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/35"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-4.5 h-4.5" />
            Projetos de Destaque
          </button>
          <button 
            onClick={() => navigateToView("curriculum", "about")}
            className={`flex-1 py-3 px-4 rounded-xl font-display font-bold text-sm transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 border-none ${
              activeView === "curriculum"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/35"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <BookOpen className="w-4.5 h-4.5" />
            Currículo Profissional
          </button>
        </div>
      </div>

      {activeView === "curriculum" && (
        <>
          {/* About Section */}
          <section id="about" className="relative py-20 px-6 max-w-6xl mx-auto z-10 scroll-mt-20">
        <ScrollReveal>
          <div className="glass-card p-8 md:p-14 rounded-3xl relative overflow-hidden">
            {/* Ambient blur lighting */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-glow-indigo opacity-30 pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-8">
              <span className="w-8 h-1 bg-indigo-500 rounded-full inline-block" />
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
                Perfil Profissional
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-12 space-y-6 text-slate-300 text-lg leading-relaxed">
                <p>
                  Estudante finalista de Engenharia Informática na UTAD, com uma visão integrada do ciclo de vida de desenvolvimento de software. Demonstro sólida proficiência prática em arquitetura orientada a objetos e ambientes full-stack, com foco particular nos ecossistemas TypeScript/JavaScript e C#.
                </p>
                <p>
                  O meu percurso inclui o desenho e implementação de sistemas distribuídos e arquiteturas orientadas a eventos, programação gráfica 3D com WebGL e a modelação avançada de bases de dados relacionais (utilizando PostgreSQL e SQLite). Alinho competências analíticas em engenharia de requisitos e modelação conceptual à proatividade de gerir e alojar as minhas próprias aplicações na cloud. Procuro ingressar no Mestrado do ISEP para consolidar conhecimentos em padrões de desenho e no desenvolvimento de sistemas escaláveis e de alta qualidade.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Technical Skills Section */}
      <section id="skills" className="relative py-20 px-6 max-w-6xl mx-auto z-10 scroll-mt-20">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              Competências Técnicas
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto text-base">
              Stack de desenvolvimento e ferramentas integradas com as quais possuo experiência prática e académica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((category, idx) => (
              <div key={idx} className="glass-card p-8 rounded-2xl glass-card-hover flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
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
                        className="px-3.5 py-2 rounded-xl bg-slate-950/60 border border-slate-900 text-slate-300 text-sm hover:border-indigo-500/40 hover:text-white transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>
        </>
      )}

      {activeView === "projects" && (
        /* Projects Showcase Carousel Section */
        <section id="projects" className="relative py-20 px-6 max-w-6xl mx-auto z-10 scroll-mt-20">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="text-left">
              <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
                Projetos de Destaque
              </h2>
              <p className="text-slate-400 max-w-md">
                Uma exibição interativa focada no código e resultados, navegável através das setas direcionais.
              </p>
            </div>

            {/* Filter Categories */}
            <div className="flex flex-wrap gap-2 bg-slate-900/60 border border-slate-800/80 p-1.5 rounded-xl w-fit">
              {filterCategories.map((category, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
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

          {/* Carousel Body */}
          {filteredProjects.length > 0 ? (
            <div className="relative flex items-center justify-center gap-4 lg:gap-8">
              
              {/* Left Project Switcher */}
              <button
                onClick={handlePrevProject}
                className="p-3.5 md:p-4 rounded-full bg-slate-900/90 border border-slate-800 hover:border-indigo-500 text-slate-400 hover:text-white hover:bg-slate-800 shadow-xl transition-all cursor-pointer z-20 flex-shrink-0"
                title="Projeto Anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main Showcase Panel */}
              <div 
                className={`w-full max-w-5xl glass-card rounded-3xl overflow-hidden shadow-2xl border border-white/5 transition-all duration-300 ${
                  animating ? "opacity-0 translate-y-4 scale-[0.98]" : "opacity-100 translate-y-0 scale-100"
                }`}
              >
                {/* Decorative bar */}
                <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400" />
                
                <div className="flex flex-col">
                  
                  {/* Top: Large macOS Browser Mockup containing the screenshots */}
                  {activeProject.images && activeProject.images.length > 0 && (
                    <div className="p-4 md:p-6 bg-slate-950/40 border-b border-slate-800/80">
                      <div className="w-full glass-card rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950/80 flex flex-col relative group shadow-2xl shadow-indigo-500/10">
                        
                        {/* macOS Header */}
                        <div className="terminal-bar px-4 py-3 flex items-center justify-between border-b border-slate-900 bg-slate-950">
                          <div className="flex gap-1.5">
                            <span className="terminal-dot terminal-dot-close" />
                            <span className="terminal-dot terminal-dot-minimize" />
                            <span className="terminal-dot terminal-dot-zoom" />
                          </div>
                          <span className="text-[11px] font-mono font-semibold text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-md select-none tracking-wide">
                            {activeProject.title} - Preview ({imageIndex + 1} de {activeProject.images.length})
                          </span>
                          <span className="w-12" /> {/* spacer */}
                        </div>

                        {/* Large Image Frame */}
                        <div 
                          className="relative cursor-pointer overflow-hidden flex items-center justify-center p-6 bg-slate-950/70 min-h-[350px] md:min-h-[600px] z-10"
                          onClick={() => openLightbox()}
                        >
                          {/* Ambient Glow Backdrop */}
                          <div className="absolute inset-0 overflow-hidden pointer-events-none select-none rounded-lg z-0">
                            <img 
                              src={activeProject.images[imageIndex]} 
                              alt=""
                              className="w-full h-full object-cover scale-125 blur-3xl opacity-25 select-none pointer-events-none"
                            />
                          </div>

                          <img 
                            src={activeProject.images[imageIndex]} 
                            alt={`${activeProject.title} screenshot ${imageIndex + 1}`}
                            className="w-auto h-auto max-h-[580px] max-w-[95%] object-contain rounded-lg shadow-2xl border border-white/5 hover:scale-[1.015] transition-all duration-300 z-10"
                          />
                          
                          {/* Hover View Fullscreen Icon */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                            <div className="px-4 py-2.5 rounded-xl bg-slate-950/95 text-white shadow-2xl border border-slate-800 flex items-center gap-2 text-xs font-semibold">
                              <Maximize2 className="w-4 h-4 text-indigo-400" />
                              <span>Ampliar Imagem</span>
                            </div>
                          </div>

                          {/* Image Nav Arrows inside Frame */}
                          {activeProject.images.length > 1 && (
                            <>
                              <button
                                onClick={(e) => handlePrevImage(e, activeProject.images.length)}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-slate-950/80 border border-slate-800/80 hover:border-indigo-500/80 text-slate-400 hover:text-white transition-all shadow-2xl z-20 backdrop-blur-md hover:scale-105"
                                title="Imagem Anterior"
                              >
                                <ChevronLeft className="w-5 h-5" />
                              </button>
                              <button
                                onClick={(e) => handleNextImage(e, activeProject.images.length)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-slate-950/80 border border-slate-800/80 hover:border-indigo-500/80 text-slate-400 hover:text-white transition-all shadow-2xl z-20 backdrop-blur-md hover:scale-105"
                                title="Próxima Imagem"
                              >
                                <ChevronRight className="w-5 h-5" />
                              </button>
                            </>
                          )}

                          {/* Top Right Counter Badge */}
                          <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800/60 text-[10px] font-mono font-bold text-indigo-400">
                            {imageIndex + 1} / {activeProject.images.length}
                          </div>
                        </div>

                        {/* Bottom Filmstrip / Thumbnails */}
                        {activeProject.images.length > 1 && (
                          <div className="flex items-center justify-center gap-3 px-6 py-4 bg-slate-950 border-t border-slate-900 overflow-x-auto select-none">
                            {activeProject.images.map((img, idx) => (
                              <button
                                key={idx}
                                onClick={(e) => { e.stopPropagation(); setImageIndex(idx) }}
                                className={`relative w-16 h-10 md:w-20 md:h-12 rounded-lg overflow-hidden transition-all duration-200 flex-shrink-0 cursor-pointer ${
                                  imageIndex === idx 
                                    ? "ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-950 scale-105 opacity-100 shadow-lg shadow-indigo-500/25" 
                                    : "opacity-40 hover:opacity-85 hover:scale-102"
                                }`}
                              >
                                <img src={img} alt={`Miniatura ${idx + 1}`} className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Bottom: Project Details divided into Grid Columns */}
                  <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8">
                    
                    {/* Left details text (8/12) */}
                    <div className="md:col-span-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3.5 mb-6">
                          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 shadow-inner">
                            {activeProject.icon}
                          </div>
                          <div>
                            <h3 className="font-display font-extrabold text-2xl md:text-3xl text-white">
                              {activeProject.title}
                            </h3>
                            <p className="text-indigo-400 text-sm font-semibold mt-1">
                              {activeProject.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Detail points */}
                        <ul className="space-y-3.5">
                          {activeProject.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right tags & period metadata (4/12) */}
                    <div className="md:col-span-4 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-800/80 pt-6 md:pt-0 md:pl-8">
                      <div>
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-4">
                          Informações do Projeto
                        </h4>
                        
                        <div className="space-y-4 mb-8">
                          <div>
                            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Período</p>
                            <p className="text-sm font-semibold text-white mt-0.5">{activeProject.period}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Tipo</p>
                            <p className="text-sm text-slate-300 mt-0.5">{activeProject.type}</p>
                          </div>
                        </div>

                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-4">
                          Stack Tecnológica
                        </h4>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {activeProject.tags.map((tag, tIdx) => (
                          <span 
                            key={tIdx} 
                            className="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 text-xs font-semibold border border-indigo-500/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              </div>

              {/* Right Project Switcher */}
              <button
                onClick={handleNextProject}
                className="p-3.5 md:p-4 rounded-full bg-slate-900/90 border border-slate-800 hover:border-indigo-500 text-slate-400 hover:text-white hover:bg-slate-800 shadow-xl transition-all cursor-pointer z-20 flex-shrink-0"
                title="Próximo Projeto"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

            </div>
          ) : (
            <div className="glass-card p-12 rounded-2xl text-center text-slate-400">
              Nenhum projeto encontrado nesta categoria.
            </div>
          )}
        </ScrollReveal>

        {/* Bullet Pagination Indicators for Projects List */}
        {filteredProjects.length > 1 && (
          <div className="flex items-center justify-center gap-3 mt-8 z-10 relative">
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
                  }, 250)
                }}
                className={`w-3 h-3 rounded-full border transition-all cursor-pointer ${
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
      )}

      {activeView === "curriculum" && (
        /* Education Timeline Section */
        <section id="education" className="relative py-20 px-6 max-w-4xl mx-auto z-10 scroll-mt-20">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              Educação e Percurso
            </h2>
            <p className="text-slate-400">
              A minha formação e base académica em Engenharia Informática.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative border-l border-slate-800 ml-4 md:ml-6 pl-8 md:pl-10 space-y-12">
            {/* Dot indicator */}
            <div className="absolute left-[-6px] top-1.5 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20" />
            
            <div className="glass-card p-6 md:p-8 rounded-2xl relative">
              <span className="absolute top-6 right-6 text-xs text-indigo-400 font-mono font-bold bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                Set 2023 -- Jul 2026 (Previsão)
              </span>
              
              <h3 className="font-display font-bold text-2xl text-white mb-2">
                Licenciatura em Engenharia Informática
              </h3>
              <p className="text-lg text-slate-300 font-medium mb-6">
                Universidade de Trás-os-Montes e Alto Douro (UTAD)
              </p>
              
              <ul className="space-y-3.5 text-slate-300 text-sm">
                <li className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                  <span>Desenvolvimento de competências nucleares em algoritmos, arquitetura de sistemas distribuídos e engenharia de requisitos.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                  <span>Foco em computação gráfica e interfaces interativas, segurança aplicacional (RBAC/Identity/JWT) e usabilidade.</span>
                </li>
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-6 max-w-4xl mx-auto z-10 scroll-mt-20">
        <ScrollReveal>
          <div className="glass-card p-8 md:p-14 rounded-3xl text-center relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-glow-teal opacity-30 pointer-events-none" />
            
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              Vamos trabalhar juntos?
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto mb-10 text-base leading-relaxed">
              Estou ativamente à procura de novas oportunidades, projetos desafiantes ou contacto relacionado com a entrada no Mestrado do ISEP.
            </p>

            <div className="flex flex-col items-center gap-6">
              {/* Copy email widget */}
              <div className="flex items-center justify-between gap-3 bg-slate-950 border border-slate-900 p-2 rounded-xl max-w-full w-[380px] shadow-inner">
                <div className="flex items-center gap-3 pl-3 overflow-hidden">
                  <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span className="text-slate-200 text-sm font-semibold truncate select-all">
                    pm7703125@gmail.com
                  </span>
                </div>
                <button 
                  onClick={copyEmail}
                  className="px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copiado!" : "Copiar"}</span>
                </button>
              </div>

              {/* Action details cards links */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
                <a 
                  href="https://github.com/Braz55" 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 text-slate-300 hover:text-white transition-all flex items-center gap-2 text-sm font-semibold"
                >
                  <Github className="w-4 h-4 text-indigo-400" />
                  <span>GitHub Profile</span>
                </a>
                <a 
                  href="mailto:pm7703125@gmail.com" 
                  className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 text-slate-300 hover:text-white transition-all flex items-center gap-2 text-sm font-semibold"
                >
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <span>Enviar E-mail</span>
                </a>
                <a 
                  href="tel:+351914271784"
                  className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 text-slate-300 hover:text-white transition-all flex items-center gap-2 text-sm font-semibold"
                >
                  <Phone className="w-4 h-4 text-indigo-400" />
                  <span>+351 914 271 784</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-xl p-4 cursor-default select-none animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxOpen(false)
          }}
        >
          {/* Immersive Ambient Glow for Lightbox */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
            <img 
              src={activeProject.images[imageIndex]} 
              alt=""
              className="w-full h-full object-cover blur-[120px] opacity-20 scale-110"
            />
          </div>

          <button 
            className="absolute top-6 right-6 p-3 rounded-full bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white hover:border-indigo-500 hover:scale-105 transition-all shadow-2xl z-[120] cursor-pointer"
            onClick={() => setLightboxOpen(false)}
            title="Fechar Visualização (Esc)"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Lightbox Navigation Buttons */}
          {activeProject.images.length > 1 && (
            <>
              <button
                onClick={(e) => handlePrevImage(e, activeProject.images.length)}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-indigo-500 hover:scale-105 transition-all shadow-2xl z-[120] cursor-pointer backdrop-blur-md"
                title="Imagem Anterior (Seta Esquerda)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => handleNextImage(e, activeProject.images.length)}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-indigo-500 hover:scale-105 transition-all shadow-2xl z-[120] cursor-pointer backdrop-blur-md"
                title="Próxima Imagem (Seta Direita)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Fullscreen Image Container */}
          <div className="relative max-w-full max-h-[75vh] flex items-center justify-center z-10 p-2">
            <img 
              src={activeProject.images[imageIndex]} 
              alt={`${activeProject.title} fullscreen preview`} 
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/10 hover:scale-[1.005] transition-transform duration-300"
              onClick={(e) => e.stopPropagation()}
            />
            {/* Top center details info inside lightbox */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-slate-800 px-4 py-1.5 rounded-full text-xs text-slate-300 font-mono shadow-xl flex items-center gap-2 select-none">
              <span className="font-semibold text-white">{activeProject.title}</span>
              <span className="text-slate-600">|</span>
              <span className="text-indigo-400">{imageIndex + 1} de {activeProject.images.length}</span>
            </div>
          </div>

          {/* Lightbox Filmstrip */}
          {activeProject.images.length > 1 && (
            <div 
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2.5 px-5 py-3 bg-slate-900/90 border border-slate-800/80 rounded-2xl max-w-[85%] overflow-x-auto z-[120] shadow-2xl backdrop-blur-md select-none"
              onClick={(e) => e.stopPropagation()}
            >
              {activeProject.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setImageIndex(idx) }}
                  className={`relative w-14 h-9 md:w-18 md:h-11 rounded-lg overflow-hidden transition-all duration-200 flex-shrink-0 cursor-pointer ${
                    imageIndex === idx 
                      ? "ring-2 ring-indigo-500 scale-105 opacity-100 shadow-md shadow-indigo-500/30" 
                      : "opacity-40 hover:opacity-85 hover:scale-102"
                  }`}
                >
                  <img src={img} alt={`Miniatura ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 border-t border-slate-900/60 py-6 text-center text-xs text-slate-600">
        <p>&copy; {new Date().getFullYear()} Pedro Braz. Desenvolvido com React, TypeScript e Tailwind CSS v4.</p>
      </footer>
    </div>
  )
}

export default App
