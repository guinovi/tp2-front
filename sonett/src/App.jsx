import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  /* ── State variables ── */
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(6); 
  const [cardsPerView, setCardsPerView] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const carouselTrackRef = useRef(null);
  const touchStartXRef = useRef(0);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    gym: '',
    email: '',
    members: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorBox, setErrorBox] = useState('');
  const [successBox, setSuccessBox] = useState('');

  /* ── Scroll effect for header ── */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Scroll Reveal Observer ── */
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Testimonials data ── */
  const testimonials = [
    {
      initials: 'MR',
      name: 'Marcos Ríos',
      role: 'Director, PowerFit — Buenos Aires',
      text: 'Redujimos la morosidad un 43% en los primeros dos meses. La facturación recurrente cambió completamente nuestra operación diaria. ¡Dejamos de perseguir cobros manuales!',
      gradient: 'from-primary to-accent'
    },
    {
      initials: 'CV',
      name: 'Carolina Vidal',
      role: 'CEO, FitLab Studios — Santiago de Chile',
      text: 'La app de reservas elevó la percepción de nuestra marca al nivel de las grandes franquicias. Nuestros socios adoran la facilidad para agendar clases. ¡La retención subió un 28%!',
      gradient: 'from-secondary to-primary'
    },
    {
      initials: 'JM',
      name: 'Javier Morales',
      role: 'Fundador, ActiveZone Network — Bogotá',
      text: 'Manejo 7 sedes desde un solo dashboard unificado. Los reportes consolidados que antes nos tomaban 3 días enteros, ahora se generan en tiempo real con un solo clic.',
      gradient: 'from-accent to-secondary'
    },
    {
      initials: 'AL',
      name: 'Ana Lucía Torres',
      role: 'Propietaria, Vital Gym — Montevideo',
      text: 'El soporte humano 24/7 y la velocidad de migración nos sorprendieron. En menos de 48 horas teníamos toda nuestra base de datos migrada desde el sistema anterior sin perder un solo socio.',
      gradient: 'from-primary to-secondary'
    },
    {
      initials: 'FP',
      name: 'Facundo Pereyra',
      role: 'Co-Founder, CrossFit Elevate — Córdoba',
      text: 'El módulo de control de acceso por QR redujo las colas en la entrada drásticamente. Ahora el personal se enfoca en atender a la gente y no en check-ins mecánicos.',
      gradient: 'from-secondary to-accent'
    },
    {
      initials: 'EG',
      name: 'Estela Gómez',
      role: 'Gerente de Operaciones, Iron Gym — Asunción',
      text: 'Implementar las alertas automatizadas por WhatsApp nos permitió recuperar un 35% de membresías inactivas antes de que decidieran cancelar definitivamente.',
      gradient: 'from-accent to-primary'
    }
  ];

  /* ── Responsive Carousel View Calculation ── */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3);
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = testimonials.length;

  // Jump back to middle index on resize to prevent out of bounds
  useEffect(() => {
    setCurrentSlide(testimonials.length);
  }, [cardsPerView]);

  // Re-enable transitioning after silent jump resets
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  const goToSlide = (index) => {
    if (!isTransitioning) return;
    setCurrentSlide(index);
  };

  /* ── Autoplay Testimonials ── */
  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, isTransitioning]);

  /* ── Swipe Handlers ── */
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goToSlide(currentSlide + (diff > 0 ? 1 : -1));
    }
  };

  const handleTransitionEnd = () => {
    if (currentSlide < testimonials.length) {
      setIsTransitioning(false);
      setCurrentSlide(currentSlide + testimonials.length);
    } else if (currentSlide >= testimonials.length * 2) {
      setIsTransitioning(false);
      setCurrentSlide(currentSlide - testimonials.length);
    }
  };

  /* ── Form Handler ── */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorBox('');
    setSuccessBox('');

    const { name, gym, email } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      setErrorBox('Por favor, ingresá tu nombre completo.');
      return;
    }
    if (!gym.trim()) {
      setErrorBox('Por favor, ingresá el nombre de tu gimnasio.');
      return;
    }
    if (!email.trim() || !emailRegex.test(email)) {
      setErrorBox('Por favor, ingresá un email válido.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessBox('✅ ¡Listo! Te contactaremos en menos de 24 horas hábiles. Revisá también tu carpeta de spam.');
      setFormData({
        name: '',
        gym: '',
        email: '',
        members: '',
        message: ''
      });
    }, 2000);
  };

  return (
    <div className="antialiased text-textCrisp min-h-screen flex flex-col bg-bgSpace">

      {/* ═══════════════════════════════════════════════════ */}
      {/* 1. HEADER – Sticky Navigation                      */}
      {/* ═══════════════════════════════════════════════════ */}
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-bgSpace/80 backdrop-blur-md border-b border-white/5 ${
          scrolled ? 'scrolled' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16 md:h-18" aria-label="Navegación principal">
            
            {/* Logo */}
            <a href="#inicio" className="flex items-center gap-2 group" aria-label="GymOS – Inicio">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight">
                <span className="text-gradient">Gym</span><span className="text-textCrisp">OS</span>
              </span>
            </a>

            {/* Nav links – Desktop */}
            <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-textCrisp/70" role="list">
              <li><a href="#caracteristicas" className="hover:text-secondary transition-colors duration-200">Características</a></li>
              <li><a href="#nosotros" className="hover:text-secondary transition-colors duration-200">Nosotros</a></li>
              <li><a href="#testimonios" className="hover:text-secondary transition-colors duration-200">Testimonios</a></li>
              <li><a href="#contacto" className="hover:text-secondary transition-colors duration-200">Contacto</a></li>
            </ul>

            {/* CTA + Mobile menu button */}
            <div className="flex items-center gap-3">
              <a href="#contacto" className="glow-pink bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hidden sm:inline-flex">
                Probar Gratis
              </a>
              {/* Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-textCrisp/70 hover:text-textCrisp hover:bg-white/10 transition-all duration-200"
                aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {!isMobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                )}
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div id="mobile-menu" className="md:hidden pb-4 border-t border-white/10 mt-2">
              <ul className="flex flex-col gap-1 pt-3" role="list">
                <li><a href="#caracteristicas" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-textCrisp/80 hover:bg-white/5 hover:text-secondary transition-all duration-200 text-sm font-medium">Características</a></li>
                <li><a href="#nosotros" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-textCrisp/80 hover:bg-white/5 hover:text-secondary transition-all duration-200 text-sm font-medium">Nosotros</a></li>
                <li><a href="#testimonios" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-textCrisp/80 hover:bg-white/5 hover:text-secondary transition-all duration-200 text-sm font-medium">Testimonios</a></li>
                <li><a href="#contacto" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-textCrisp/80 hover:bg-white/5 hover:text-secondary transition-all duration-200 text-sm font-medium">Contacto</a></li>
                <li className="pt-2">
                  <a href="#contacto" onClick={() => setIsMobileMenuOpen(false)} className="glow-pink bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full block text-center transition-all duration-300">Probar Gratis</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">
        {/* ═══════════════════════════════════════════════════ */}
        {/* 2. HERO SECTION                                    */}
        {/* ═══════════════════════════════════════════════════ */}
        <section id="inicio" className="hero-mesh dot-grid relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
          
          {/* Decorative blobs */}
          <div className="absolute top-1/4 -left-32 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Text side */}
              <div>
                <div className="neon-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-accent text-xs font-semibold mb-6 fade-in-up fade-delay-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                  Nuevo: Panel de Métricas v3.0 disponible
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight mb-6 fade-in-up fade-delay-2">
                  Gestioná tu<br/>
                  <span className="text-gradient">Gimnasio</span><br/>
                  sin fricción.
                </h1>

                <p className="text-textCrisp/65 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg fade-in-up fade-delay-3">
                  GymOS es el sistema SaaS multi-tenant que automatizan membresías, facturación recurrente, reservas de clases y reportes en tiempo real — todo desde un solo lugar.
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap gap-6 mb-10 fade-in-up fade-delay-3">
                  <div>
                    <p className="text-3xl font-black text-primary">+2.400</p>
                    <p className="text-xs text-textCrisp/50 font-medium mt-0.5">Gimnasios activos</p>
                  </div>
                  <div className="w-px bg-white/10 self-stretch"></div>
                  <div>
                    <p className="text-3xl font-black text-secondary">98.9%</p>
                    <p class="text-xs text-textCrisp/50 font-medium mt-0.5">Uptime garantizado</p>
                  </div>
                  <div className="w-px bg-white/10 self-stretch"></div>
                  <div>
                    <p className="text-3xl font-black text-accent">4.9★</p>
                    <p className="text-xs text-textCrisp/50 font-medium mt-0.5">Rating promedio</p>
                  </div>
                </div>

                {/* Dual CTA */}
                <div className="flex flex-wrap gap-4 fade-in-up fade-delay-4">
                  <a href="#contacto" className="glow-pink bg-primary text-white font-bold px-8 py-4 rounded-full text-base flex items-center gap-2">
                    Comenzar ahora
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/></svg>
                  </a>
                  <a href="#demo" className="glow-cyan border border-secondary/50 text-secondary font-bold px-8 py-4 rounded-full text-base flex items-center gap-2 hover:bg-secondary/10 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"/></svg>
                    Ver Demo
                  </a>
                </div>
              </div>

              {/* Dashboard visual */}
              <div id="demo" className="relative flex justify-center lg:justify-end fade-in-up fade-delay-4">
                <div className="float-anim w-full max-w-lg">
                  {/* Dashboard shell */}
                  <div className="bg-cardBg rounded-2xl border border-white/10 shadow-2xl overflow-hidden" style={{ boxShadow: '0 0 60px rgba(236,72,153,0.12), 0 0 120px rgba(6,182,212,0.08)' }}>
                    
                    {/* Titlebar */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                      <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                      <span class="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                      <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                      <span className="ml-3 text-xs text-textCrisp/40 font-mono">gymos.app / dashboard</span>
                    </div>

                    <div className="p-5 space-y-4">
                      {/* KPI row */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-bgSpace/70 rounded-xl p-3 border border-white/5">
                          <p className="text-textCrisp/40 text-[10px] font-medium uppercase tracking-wider">Activos</p>
                          <p className="text-2xl font-black text-primary mt-1">847</p>
                          <p className="text-[10px] text-green-400 mt-0.5">▲ 12% este mes</p>
                        </div>
                        <div className="bg-bgSpace/70 rounded-xl p-3 border border-white/5">
                          <p className="text-textCrisp/40 text-[10px] font-medium uppercase tracking-wider">Ingresos</p>
                          <p className="text-2xl font-black text-secondary mt-1">$42k</p>
                          <p className="text-[10px] text-green-400 mt-0.5">▲ 8.3% este mes</p>
                        </div>
                        <div className="bg-bgSpace/70 rounded-xl p-3 border border-white/5">
                          <p className="text-textCrisp/40 text-[10px] font-medium uppercase tracking-wider">Clases Hoy</p>
                          <p className="text-2xl font-black text-accent mt-1">23</p>
                          <p className="text-[10px] text-textCrisp/30 mt-0.5">8 completadas</p>
                        </div>
                      </div>

                      {/* Mini chart */}
                      <div className="bg-bgSpace/70 rounded-xl p-4 border border-white/5">
                        <div className="flex justify-between items-center mb-3">
                          <p className="text-xs font-semibold text-textCrisp/70">Ingresos Mensuales</p>
                          <span className="text-[10px] bg-green-500/15 text-green-400 px-2 py-0.5 rounded-full">+24.7%</span>
                        </div>
                        {/* SVG bar chart */}
                        <svg viewBox="0 0 280 80" className="w-full h-16" aria-label="Gráfico de ingresos mensuales" role="img">
                          <defs>
                            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8"/>
                              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2"/>
                            </linearGradient>
                            <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8"/>
                              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2"/>
                            </linearGradient>
                          </defs>
                          <rect x="10"  y="50" width="20" height="30" rx="3" fill="url(#barGrad)" opacity="0.7"/>
                          <rect x="45"  y="40" width="20" height="40" rx="3" fill="url(#barGrad)" opacity="0.7"/>
                          <rect x="80"  y="30" width="20" height="50" rx="3" fill="url(#barGrad2)" opacity="0.9"/>
                          <rect x="115" y="45" width="20" height="35" rx="3" fill="url(#barGrad)" opacity="0.7"/>
                          <rect x="150" y="25" width="20" height="55" rx="3" fill="url(#barGrad2)" opacity="0.9"/>
                          <rect x="185" y="35" width="20" height="45" rx="3" fill="url(#barGrad)" opacity="0.7"/>
                          <rect x="220" y="10" width="20" height="70" rx="3" fill="url(#barGrad2)" opacity="1"/>
                          <rect x="255" y="15" width="20" height="65" rx="3" fill="url(#barGrad2)" opacity="0.9"/>
                        </svg>
                      </div>

                      {/* Member list */}
                      <div className="bg-bgSpace/70 rounded-xl p-3 border border-white/5">
                        <p className="text-xs font-semibold text-textCrisp/70 mb-2">Últimas inscripciones</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex-shrink-0"></div>
                            <span className="text-xs text-textCrisp/80 flex-1">Valentina García</span>
                            <span className="text-[10px] bg-green-500/15 text-green-400 px-1.5 py-0.5 rounded-full">Activa</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-primary flex-shrink-0"></div>
                            <span className="text-xs text-textCrisp/80 flex-1">Martín López</span>
                            <span className="text-[10px] bg-yellow-500/15 text-yellow-400 px-1.5 py-0.5 rounded-full">Pendiente</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-secondary to-accent flex-shrink-0"></div>
                            <span className="text-xs text-textCrisp/80 flex-1">Lucía Fernández</span>
                            <span className="text-[10px] bg-green-500/15 text-green-400 px-1.5 py-0.5 rounded-full">Activa</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating badge */}
                  <div className="absolute -bottom-5 -left-5 bg-cardBg border border-secondary/30 rounded-2xl px-4 py-3 shadow-xl" style={{ boxShadow: '0 0 24px rgba(6,182,212,0.2)' }}>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-500/15 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-textCrisp">Pago procesado</p>
                        <p className="text-[10px] text-textCrisp/50">hace 2 seg</p>
                      </div>
                    </div>
                  </div>

                  {/* Floating notification */}
                  <div className="absolute -top-5 -right-5 bg-cardBg border border-primary/30 rounded-2xl px-4 py-3 shadow-xl" style={{ boxShadow: '0 0 24px rgba(236,72,153,0.2)' }}>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-textCrisp">+14 nuevos hoy</p>
                        <p className="text-[10px] text-textCrisp/50">Socios registrados</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider mx-auto max-w-5xl"></div>

        {/* ═══════════════════════════════════════════════════ */}
        {/* 3. ABOUT US / CONTEXTO                             */}
        {/* ═══════════════════════════════════════════════════ */}
        <section id="nosotros" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" aria-hidden="true"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Visual side */}
              <div className="reveal order-2 lg:order-1">
                <div className="relative">
                  <div className="bg-cardBg rounded-3xl border border-white/10 p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" aria-hidden="true"></div>

                    <div className="relative grid grid-cols-2 gap-4">
                      {/* Mission items */}
                      <div className="bg-bgSpace/80 rounded-2xl p-5 border border-white/5 hover:border-secondary/30 transition-all duration-300 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>
                        </div>
                        <p className="text-sm font-bold text-textCrisp mb-1">Innovación continua</p>
                        <p className="text-xs text-textCrisp/50 leading-relaxed">Lanzamos updates cada 2 semanas impulsados por feedback real.</p>
                      </div>

                      <div className="bg-bgSpace/80 rounded-2xl p-5 border border-white/5 hover:border-secondary/30 transition-all duration-300 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>
                        </div>
                        <p className="text-sm font-bold text-textCrisp mb-1">Seguridad enterprise</p>
                        <p className="text-xs text-textCrisp/50 leading-relaxed">Cifrado AES-256 y cumplimiento GDPR en cada tenant.</p>
                      </div>

                      <div className="bg-bgSpace/80 rounded-2xl p-5 border border-white/5 hover:border-secondary/30 transition-all duration-300 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/></svg>
                        </div>
                        <p className="text-sm font-bold text-textCrisp mb-1">Soporte humano</p>
                        <p className="text-xs text-textCrisp/50 leading-relaxed">Chat 24/7 con expertos en gestión deportiva, no bots.</p>
                      </div>

                      <div className="bg-bgSpace/80 rounded-2xl p-5 border border-white/5 hover:border-secondary/30 transition-all duration-300 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>
                        </div>
                        <p className="text-sm font-bold text-textCrisp mb-1">Datos accionables</p>
                        <p className="text-xs text-textCrisp/50 leading-relaxed">KPIs que te dicen qué hacer, no solo qué pasó.</p>
                      </div>
                    </div>
                  </div>

                  {/* Decorative ring */}
                  <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full border-2 border-secondary/10 pointer-events-none" aria-hidden="true"></div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full border-2 border-primary/15 pointer-events-none" aria-hidden="true"></div>
                </div>
              </div>

              {/* Text side */}
              <div className="reveal order-1 lg:order-2">
                <span className="inline-block text-secondary text-xs font-bold uppercase tracking-widest mb-4">Nuestra misión</span>
                <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6">
                  La gestión deportiva<br/>
                  <span className="text-gradient">merece ser moderna.</span>
                </h2>
                <p className="text-textCrisp/60 text-lg leading-relaxed mb-6">
                  Fundamos GymOS porque vimos dueños de gimnasios perdiendo horas con planillas, cobros manuales y herramientas desconectadas. Decidimos cambiar eso.
                </p>
                <p className="text-textCrisp/60 text-base leading-relaxed mb-8">
                  Hoy, más de 2.400 centros en 14 países usan GymOS para automatizar su operación diaria, recuperar tiempo y enfocarse en lo que realmente importa: <strong className="text-textCrisp font-semibold">sus socios y su comunidad.</strong>
                </p>

                {/* Timeline / milestones */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mt-0.5">
                      <span className="text-primary text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-textCrisp">Setup en menos de 30 minutos</p>
                      <p className="text-xs text-textCrisp/50 mt-0.5">Tu gimnasio online en el día, sin técnicos ni configuraciones complejas.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/15 border border-secondary/30 flex items-center justify-center mt-0.5">
                      <span className="text-secondary text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-textCrisp">Multi-sede desde el día uno</p>
                      <p className="text-xs text-textCrisp/50 mt-0.5">Gestioná múltiples sucursales desde un único panel centralizado.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mt-0.5">
                      <span className="text-accent text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-textCrisp">Escalá sin límites</p>
                      <p className="text-xs text-textCrisp/50 mt-0.5">Desde 50 hasta 50.000 socios. La plataforma crece con vos.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider mx-auto max-w-5xl"></div>

        {/* ═══════════════════════════════════════════════════ */}
        {/* 4. CARACTERÍSTICAS (FEATURES)                      */}
        {/* ═══════════════════════════════════════════════════ */}
        <section id="caracteristicas" className="py-24 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/6 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-16 reveal">
              <span className="inline-block text-secondary text-xs font-bold uppercase tracking-widest mb-4">Módulos incluidos</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
                Todo lo que tu gimnasio<br/>
                <span className="text-gradient">necesita, integrado.</span>
              </h2>
              <p className="text-textCrisp/55 text-lg">Sin integraciones externas caras. Sin módulos de pago aparte. Todo en una sola suscripción.</p>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* Feature 1 */}
              <article className="card-glow bg-cardBg rounded-2xl p-6 reveal group cursor-default">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>
                </div>
                <h3 className="text-lg font-bold text-textCrisp mb-2">Gestión de Socios</h3>
                <p className="text-textCrisp/55 text-sm leading-relaxed mb-4">Perfiles completos, historial de asistencia, foto de carnet y control de acceso con QR o huella. Todo en un clic.</p>
                <ul className="space-y-1.5">
                  <li className="flex items-center gap-2 text-xs text-textCrisp/60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    Alta masiva por CSV / Excel
                  </li>
                  <li className="flex items-center gap-2 text-xs text-textCrisp/60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    Control de acceso biométrico
                  </li>
                  <li className="flex items-center gap-2 text-xs text-textCrisp/60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    Alertas de vencimiento automáticas
                  </li>
                </ul>
              </article>

              {/* Feature 2 */}
              <article className="card-glow bg-cardBg rounded-2xl p-6 reveal group cursor-default">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-secondary/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/></svg>
                </div>
                <h3 className="text-lg font-bold text-textCrisp mb-2">Facturación Recurrente</h3>
                <p className="text-textCrisp/55 text-sm leading-relaxed mb-4">Cobros automáticos por débito, tarjeta o transferencia. Reconciliación contable en tiempo real sin intervención manual.</p>
                <ul className="space-y-1.5">
                  <li className="flex items-center gap-2 text-xs text-textCrisp/60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    Stripe, MercadoPago, PayU integrado
                  </li>
                  <li className="flex items-center gap-2 text-xs text-textCrisp/60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    Factura electrónica automática
                  </li>
                  <li class="flex items-center gap-2 text-xs text-textCrisp/60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    Reintento inteligente de cobros fallidos
                  </li>
                </ul>
              </article>

              {/* Feature 3 */}
              <article className="card-glow bg-cardBg rounded-2xl p-6 reveal group cursor-default">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"/></svg>
                </div>
                <h3 className="text-lg font-bold text-textCrisp mb-2">Reservas de Clases</h3>
                <p className="text-textCrisp/55 text-sm leading-relaxed mb-4">App propia para socios, lista de espera inteligente, confirmaciones por WhatsApp y cancelaciones automáticas con penalización configurable.</p>
                <ul className="space-y-1.5">
                  <li className="flex items-center gap-2 text-xs text-textCrisp/60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    App mobile iOS y Android incluida
                  </li>
                  <li className="flex items-center gap-2 text-xs text-textCrisp/60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    Lista de espera automática
                  </li>
                  <li className="flex items-center gap-2 text-xs text-textCrisp/60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    Instructores con agenda propia
                  </li>
                </ul>
              </article>

              {/* Feature 4 */}
              <article className="card-glow bg-cardBg rounded-2xl p-6 reveal group cursor-default">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>
                </div>
                <h3 className="text-lg font-bold text-textCrisp mb-2">Métricas en Tiempo Real</h3>
                <p className="text-textCrisp/55 text-sm leading-relaxed mb-4">Dashboard ejecutivo con churn rate, LTV, tasa de retención, picos de asistencia y forecast de ingresos mensual.</p>
                <ul class="space-y-1.5">
                  <li className="flex items-center gap-2 text-xs text-textCrisp/60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    Exportación a Excel / PDF / Google Sheets
                  </li>
                  <li className="flex items-center gap-2 text-xs text-textCrisp/60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    Alertas por anomalías detectadas con IA
                  </li>
                  <li className="flex items-center gap-2 text-xs text-textCrisp/60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    Comparativa entre sedes
                  </li>
                </ul>
              </article>

              {/* Feature 5 */}
              <article className="card-glow bg-cardBg rounded-2xl p-6 reveal group cursor-default">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-secondary/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/></svg>
                </div>
                <h3 className="text-lg font-bold text-textCrisp mb-2">Comunicaciones Automatizadas</h3>
                <p className="text-textCrisp/55 text-sm leading-relaxed mb-4">Email marketing, notificaciones push, WhatsApp y SMS. Flujos condicionales basados en comportamiento del socio.</p>
                <ul className="space-y-1.5">
                  <li className="flex items-center gap-2 text-xs text-textCrisp/60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    Recordatorio de cuotas vencidas
                  </li>
                  <li className="flex items-center gap-2 text-xs text-textCrisp/60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    Bienvenida personalizada automática
                  </li>
                  <li className="flex items-center gap-2 text-xs text-textCrisp/60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    Segmentación por historial de clases
                  </li>
                </ul>
              </article>

              {/* Feature 6 */}
              <article className="card-glow bg-cardBg rounded-2xl p-6 reveal group cursor-default relative overflow-hidden">
                <div className="absolute top-4 right-4 neon-badge px-2.5 py-1 rounded-full text-accent text-[10px] font-bold uppercase tracking-wider">⭐ Popular</div>
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"/></svg>
                </div>
                <h3 className="text-lg font-bold text-textCrisp mb-2">Multi-Sede & Multi-Tenant</h3>
                <p className="text-textCrisp/55 text-sm leading-relaxed mb-4">Arquitectura multi-tenant real. Cada gimnasio tiene su propio espacio aislado. Grupos corporativos gestionan todas sus sedes desde un hub central.</p>
                <ul className="space-y-1.5">
                  <li className="flex items-center gap-2 text-xs text-textCrisp/60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    Socios que rotan entre sedes
                  </li>
                  <li className="flex items-center gap-2 text-xs text-textCrisp/60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    Roles diferenciados por sede
                  </li>
                  <li className="flex items-center gap-2 text-xs text-textCrisp/60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    Consolidado financiero unificado
                  </li>
                </ul>
              </article>

            </div>

            {/* CTA below features */}
            <div className="text-center mt-14 reveal">
              <a href="#contacto" className="glow-pink bg-primary text-white font-bold px-10 py-4 rounded-full text-base inline-flex items-center gap-2 transition-all duration-300">
                Ver todos los módulos
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/></svg>
              </a>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider mx-auto max-w-5xl"></div>

        {/* ═══════════════════════════════════════════════════ */}
        {/* 5. TESTIMONIOS                                     */}
        {/* ═══════════════════════════════════════════════════ */}
        <section id="testimonios" className="py-24 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/6 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-14 reveal">
              <span className="inline-block text-secondary text-xs font-bold uppercase tracking-widest mb-4">Lo que dicen nuestros clientes</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
                Resultados que<br/>
                <span className="text-gradient">hablan solos.</span>
              </h2>
              <p className="text-textCrisp/55 text-lg">Más de 2.400 gimnasios ya transformaron su operación con GymOS.</p>
            </div>

            {/* Carousel */}
            <div className="reveal">
              <div className="carousel-wrapper" role="region" aria-label="Testimonios de clientes">
                <div
                  className="carousel-track"
                  ref={carouselTrackRef}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  onTransitionEnd={handleTransitionEnd}
                  style={{
                    display: 'flex',
                    gap: '1.5rem',
                    transition: isTransitioning ? 'transform 0.4s ease' : 'none',
                    transform: `translateX(calc(-${currentSlide} * (${100 / cardsPerView}% + 24px / ${cardsPerView})))`
                  }}
                >
                  {[...testimonials, ...testimonials, ...testimonials].map((item, idx) => (
                    <article
                      key={idx}
                      className="carousel-card"
                      style={{
                        minWidth: `calc(${100 / cardsPerView}% - ${24 * (cardsPerView - 1) / cardsPerView}px)`
                      }}
                    >
                      <div className="card-glow bg-cardBg rounded-2xl p-6 h-full flex flex-col relative overflow-hidden group">
                        {/* Decorative Quote Icon */}
                        <div className="absolute top-4 right-4 text-white/3 group-hover:text-white/8 transition-colors duration-300 pointer-events-none">
                          <svg className="w-16 h-16 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.154c-2.433.914-3.996 3.635-3.996 5.846h4v10h-10z"/>
                          </svg>
                        </div>

                        <div className="flex items-center gap-1 mb-4 text-accent relative z-10">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="sr-only">5 de 5 estrellas</span>
                        </div>

                        <blockquote className="text-textCrisp/75 text-sm leading-relaxed flex-1 mb-5 relative z-10">
                          "{item.text}"
                        </blockquote>

                        <footer className="flex items-center gap-3 pt-4 border-t border-white/10 relative z-10">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.gradient} flex-shrink-0 flex items-center justify-center text-white font-bold text-sm`}>
                            {item.initials}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-textCrisp">{item.name}</p>
                            <p className="text-xs text-textCrisp/45">{item.role}</p>
                          </div>
                        </footer>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Carousel controls */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => goToSlide(currentSlide - 1)}
                  aria-label="Testimonio anterior"
                  className="w-10 h-10 rounded-full border border-white/15 hover:border-secondary/50 flex items-center justify-center text-textCrisp/60 hover:text-secondary transition-all duration-200 hover:bg-secondary/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>
                </button>
                
                {/* Dots */}
                <div className="flex gap-2" role="tablist" aria-label="Navegación de testimonios">
                  {[...Array(testimonials.length)].map((_, i) => {
                    const activeDot = ((currentSlide - testimonials.length) % testimonials.length + testimonials.length) % testimonials.length;
                    return (
                      <button
                        key={i}
                        role="tab"
                        aria-label={`Ir al testimonio ${i + 1}`}
                        aria-selected={i === activeDot}
                        onClick={() => goToSlide(i + testimonials.length)}
                        className={`rounded-full transition-all duration-200 ${
                          i === activeDot ? 'bg-primary w-5 h-2' : 'bg-white/20 hover:bg-white/40 w-2 h-2'
                        }`}
                      />
                    );
                  })}
                </div>

                <button
                  onClick={() => goToSlide(currentSlide + 1)}
                  aria-label="Testimonio siguiente"
                  className="w-10 h-10 rounded-full border border-white/15 hover:border-secondary/50 flex items-center justify-center text-textCrisp/60 hover:text-secondary transition-all duration-200 hover:bg-secondary/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Divider */}
        <div className="section-divider mx-auto max-w-5xl"></div>

        {/* ═══════════════════════════════════════════════════ */}
        {/* 6. FORMULARIO DE CONTACTO                          */}
        {/* ═══════════════════════════════════════════════════ */}
        <section id="contacto" className="py-24 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/4 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Left: Value props */}
              <div className="reveal">
                <span className="inline-block text-secondary text-xs font-bold uppercase tracking-widest mb-4">Empezá hoy</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6">
                  14 días gratis.<br/>
                  <span className="text-gradient">Sin tarjeta.</span><br/>
                  Sin compromisos.
                </h2>
                <p className="text-textCrisp/60 text-lg leading-relaxed mb-8">
                  Completá el formulario y en menos de 24 horas un especialista de GymOS te contactará para configurar tu espacio personalizado.
                </p>

                {/* Perks */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    </div>
                    <p className="text-sm text-textCrisp/80 font-medium">Onboarding guiado 1 a 1 con un experto</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    </div>
                    <p className="text-sm text-textCrisp/80 font-medium">Migración gratuita de tu herramienta actual</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    </div>
                    <p className="text-sm text-textCrisp/80 font-medium">Cancelá cuando quieras, sin penalización</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                    </div>
                    <p className="text-sm text-textCrisp/80 font-medium">Acceso completo a todos los módulos durante el trial</p>
                  </div>
                </div>
              </div>

              {/* Right: Form */}
              <div className="reveal">
                <div className="bg-cardBg rounded-3xl border border-white/10 p-8 relative overflow-hidden" style={{ boxShadow: '0 0 40px rgba(236,72,153,0.08)' }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-secondary/3" aria-hidden="true"></div>

                  <div className="relative">
                    <h3 className="text-xl font-bold text-textCrisp mb-1">Comenzar prueba gratuita</h3>
                    <p className="text-textCrisp/45 text-sm mb-6">Respondemos en menos de 24 horas hábiles.</p>

                    <form onSubmit={handleFormSubmit} noValidate className="space-y-4" aria-label="Formulario de contacto">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="field-name" className="block text-xs font-semibold text-textCrisp/70 mb-1.5 uppercase tracking-wider">Nombre completo</label>
                          <input
                            id="field-name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Ej: Marcos Ríos"
                            required
                            className="input-glow w-full bg-bgSpace/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-textCrisp placeholder-textCrisp/25 transition-all duration-200 hover:border-white/20 focus:border-secondary/50"
                          />
                        </div>
                        <div>
                          <label htmlFor="field-gym" className="block text-xs font-semibold text-textCrisp/70 mb-1.5 uppercase tracking-wider">Nombre del gimnasio</label>
                          <input
                            id="field-gym"
                            name="gym"
                            type="text"
                            value={formData.gym}
                            onChange={handleInputChange}
                            placeholder="Ej: PowerFit"
                            required
                            className="input-glow w-full bg-bgSpace/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-textCrisp placeholder-textCrisp/25 transition-all duration-200 hover:border-white/20 focus:border-secondary/50"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="field-email" className="block text-xs font-semibold text-textCrisp/70 mb-1.5 uppercase tracking-wider">Email de contacto</label>
                        <input
                          id="field-email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="marcos@powerfitgym.com"
                          required
                          className="input-glow w-full bg-bgSpace/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-textCrisp placeholder-textCrisp/25 transition-all duration-200 hover:border-white/20 focus:border-secondary/50"
                        />
                      </div>

                      <div>
                        <label htmlFor="field-members" className="block text-xs font-semibold text-textCrisp/70 mb-1.5 uppercase tracking-wider">¿Cuántos socios activos tenés?</label>
                        <select
                          id="field-members"
                          name="members"
                          value={formData.members}
                          onChange={handleInputChange}
                          className="input-glow w-full bg-bgSpace/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-textCrisp/80 transition-all duration-200 hover:border-white/20 focus:border-secondary/50 appearance-none cursor-pointer"
                          style={{
                            backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")',
                            backgroundPosition: 'right 1rem center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '1.25em'
                          }}
                        >
                          <option value="" disabled className="text-textCrisp/30">Seleccioná un rango</option>
                          <option value="0-100" className="bg-cardBg">Menos de 100 socios</option>
                          <option value="100-500" className="bg-cardBg">100 – 500 socios</option>
                          <option value="500-2000" className="bg-cardBg">500 – 2.000 socios</option>
                          <option value="2000+" className="bg-cardBg">Más de 2.000 socios</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="field-message" className="block text-xs font-semibold text-textCrisp/70 mb-1.5 uppercase tracking-wider">Contanos tu situación actual (opcional)</label>
                        <textarea
                          id="field-message"
                          name="message"
                          rows="4"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="¿Qué sistema usás hoy? ¿Qué problema querés resolver? ..."
                          className="input-glow w-full bg-bgSpace/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-textCrisp placeholder-textCrisp/25 transition-all duration-200 hover:border-white/20 focus:border-secondary/50 resize-none"
                        ></textarea>
                      </div>

                      {/* Error / success messages */}
                      {errorBox && (
                        <div id="form-error" className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2" role="alert" aria-live="polite">
                          {errorBox}
                        </div>
                      )}
                      
                      {successBox && (
                        <div id="form-success" className="text-xs text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg px-4 py-2" role="status" aria-live="polite">
                          {successBox}
                        </div>
                      )}

                      <button
                        id="form-submit"
                        type="submit"
                        disabled={isSubmitting}
                        className="glow-pink w-full bg-primary text-white font-bold py-4 rounded-xl text-base flex items-center justify-center gap-2 transition-all duration-300 mt-2"
                      >
                        {!isSubmitting ? (
                          <>
                            <span>Comenzar prueba de 14 días</span>
                            <svg id="btn-arrow" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/></svg>
                          </>
                        ) : (
                          <>
                            <span>Enviando...</span>
                            <svg id="btn-spinner" className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          </>
                        )}
                      </button>

                      <p className="text-center text-[11px] text-textCrisp/30 mt-2">
                        Al enviar aceptás nuestros <a href="#" className="text-secondary hover:underline">Términos de Servicio</a> y <a href="#" className="text-secondary hover:underline">Política de Privacidad</a>.
                      </p>
                    </form>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 7. FOOTER                                          */}
      {/* ═══════════════════════════════════════════════════ */}
      <footer className="border-t border-white/8 bg-cardBg/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

            {/* Brand */}
            <div className="lg:col-span-1">
              <a href="#inicio" className="flex items-center gap-2 mb-4 w-fit" aria-label="GymOS – Inicio">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>
                </div>
                <span className="text-lg font-bold tracking-tight">
                  <span className="text-gradient">Gym</span><span className="text-textCrisp">OS</span>
                </span>
              </a>
              <p className="text-textCrisp/45 text-sm leading-relaxed mb-5">El sistema operativo para centros de fitness modernos. Multi-tenant, multi-sede, siempre disponible.</p>

              {/* Social */}
              <div className="flex items-center gap-3">
                <a href="#" aria-label="GymOS en Instagram" className="social-icon w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-textCrisp/50 hover:border-secondary/40">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" aria-label="GymOS en LinkedIn" className="social-icon w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-textCrisp/50 hover:border-secondary/40">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" aria-label="GymOS en Twitter / X" className="social-icon w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-textCrisp/50 hover:border-secondary/40">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" aria-label="GymOS en YouTube" className="social-icon w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-textCrisp/50 hover:border-secondary/40">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>

            {/* Links: Producto */}
            <nav aria-label="Producto">
              <h4 className="text-xs font-bold text-textCrisp/70 uppercase tracking-widest mb-4">Producto</h4>
              <ul className="space-y-2.5" role="list">
                <li><a href="#caracteristicas" className="text-sm text-textCrisp/50 hover:text-secondary transition-colors duration-200">Características</a></li>
                <li><a href="#" className="text-sm text-textCrisp/50 hover:text-secondary transition-colors duration-200">Precios</a></li>
                <li><a href="#" className="text-sm text-textCrisp/50 hover:text-secondary transition-colors duration-200">Changelog</a></li>
                <li><a href="#" className="text-sm text-textCrisp/50 hover:text-secondary transition-colors duration-200">Roadmap</a></li>
                <li><a href="#" className="text-sm text-textCrisp/50 hover:text-secondary transition-colors duration-200">Integraciones</a></li>
                <li><a href="#" className="text-sm text-textCrisp/50 hover:text-secondary transition-colors duration-200">API & Docs</a></li>
              </ul>
            </nav>

            {/* Links: Empresa */}
            <nav aria-label="Empresa">
              <h4 className="text-xs font-bold text-textCrisp/70 uppercase tracking-widest mb-4">Empresa</h4>
              <ul className="space-y-2.5" role="list">
                <li><a href="#nosotros" className="text-sm text-textCrisp/50 hover:text-secondary transition-colors duration-200">Sobre nosotros</a></li>
                <li><a href="#" className="text-sm text-textCrisp/50 hover:text-secondary transition-colors duration-200">Blog</a></li>
                <li><a href="#" class="text-sm text-textCrisp/50 hover:text-secondary transition-colors duration-200">Casos de éxito</a></li>
                <li><a href="#" className="text-sm text-textCrisp/50 hover:text-secondary transition-colors duration-200">Prensa</a></li>
                <li><a href="#" className="text-sm text-textCrisp/50 hover:text-secondary transition-colors duration-200">Carreras</a></li>
                <li><a href="#contacto" className="text-sm text-textCrisp/50 hover:text-secondary transition-colors duration-200">Contacto</a></li>
              </ul>
            </nav>

            {/* Links: Legal + Newsletter */}
            <div>
              <nav aria-label="Legal" className="mb-8">
                <h4 className="text-xs font-bold text-textCrisp/70 uppercase tracking-widest mb-4">Legal</h4>
                <ul className="space-y-2.5" role="list">
                  <li><a href="#" className="text-sm text-textCrisp/50 hover:text-secondary transition-colors duration-200">Términos de servicio</a></li>
                  <li><a href="#" className="text-sm text-textCrisp/50 hover:text-secondary transition-colors duration-200">Política de privacidad</a></li>
                  <li><a href="#" className="text-sm text-textCrisp/50 hover:text-secondary transition-colors duration-200">Política de cookies</a></li>
                  <li><a href="#" className="text-sm text-textCrisp/50 hover:text-secondary transition-colors duration-200">SLA & Uptime</a></li>
                </ul>
              </nav>
              {/* Tiny newsletter */}
              <div>
                <p className="text-xs font-bold text-textCrisp/70 uppercase tracking-widest mb-3">Newsletter</p>
                <form className="flex gap-2" aria-label="Suscribirse al newsletter" onSubmit={(e) => e.preventDefault()}>
                  <input type="email" placeholder="tu@email.com" aria-label="Email para newsletter" className="input-glow flex-1 min-w-0 bg-bgSpace/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-textCrisp placeholder-textCrisp/25 transition-all duration-200 focus:border-secondary/50" />
                  <button type="submit" aria-label="Suscribirse" className="bg-secondary/15 border border-secondary/30 text-secondary rounded-xl px-3 py-2 text-xs font-semibold hover:bg-secondary/25 transition-all duration-200 flex-shrink-0">OK</button>
                </form>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-textCrisp/30 text-center sm:text-left">
              © {new Date().getFullYear()} GymOS Inc. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-textCrisp/30">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true"></span>
              Todos los sistemas operativos
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
