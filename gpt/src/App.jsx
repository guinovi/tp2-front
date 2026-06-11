const navLinks = [
  { href: "#contexto", label: "Contexto" },
  { href: "#features", label: "Módulos" },
  { href: "#testimonios", label: "Clientes" },
  { href: "#contacto", label: "Contacto" },
];

const stats = [
  { label: "Socios activos", value: "2.847", note: "+18% este mes", color: "primary" },
  { label: "Clases hoy", value: "64", note: "91% ocupación", color: "secondary" },
  { label: "MRR", value: "$18.2M", note: "Cobro recurrente", color: "accent" },
];

const features = [
  {
    icon: "👥",
    title: "Gestión de miembros",
    text: "Altas, bajas, perfiles, planes, historial y segmentación por sede o membresía.",
    color: "secondary",
  },
  {
    icon: "💳",
    title: "Facturación recurrente",
    text: "Automatizá cobros, vencimientos, comprobantes y recuperación de pagos fallidos.",
    color: "primary",
  },
  {
    icon: "📅",
    title: "Reservas de clases",
    text: "Cupos, listas de espera, cancelaciones y check-in para clases grupales.",
    color: "accent",
  },
  {
    icon: "📊",
    title: "Métricas en tiempo real",
    text: "Ingresos, retención, ocupación, churn y performance comercial sin esperar reportes.",
    color: "secondary",
  },
  {
    icon: "🏢",
    title: "Multi-sede y multi-tenant",
    text: "Separá operaciones por gimnasio, marca o franquicia con permisos granulares.",
    color: "primary",
  },
  {
    icon: "⚡",
    title: "Automatizaciones",
    text: "Recordatorios, campañas, alertas de riesgo y seguimiento automático de leads.",
    color: "accent",
  },
];

const testimonials = [
  {
    quote: "Pasamos de administrar con WhatsApp y Excel a tener reservas, pagos y métricas en una sola pantalla.",
    name: "Martina Suárez",
    role: "Directora, PulseBox",
  },
  {
    quote: "La recuperación de pagos fallidos nos mejoró el flujo de caja en menos de treinta días.",
    name: "Diego Ramos",
    role: "CEO, Urban Gym",
  },
  {
    quote: "Abrimos una segunda sede sin duplicar administración. Eso fue el cambio real.",
    name: "Camila Ferrer",
    role: "Founder, CoreFit Studio",
  },
];

const colorMap = {
  primary: {
    border: "border-primary/30",
    bg: "bg-primary/10",
    text: "text-primary",
    bar: "bg-primary/80",
  },
  secondary: {
    border: "border-secondary/30",
    bg: "bg-secondary/10",
    text: "text-secondary",
    bar: "bg-secondary/70",
  },
  accent: {
    border: "border-accent/30",
    bg: "bg-accent/10",
    text: "text-accent",
    bar: "bg-accent/80",
  },
};

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-bgSpace/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8" aria-label="Navegación principal">
        <a href="#" className="flex items-center gap-3" aria-label="FitOrbit OS inicio">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-xl font-black text-white glow-primary">F</span>
          <span className="font-display text-2xl tracking-wide">FitOrbit<span className="text-secondary">OS</span></span>
        </a>

        <div className="hidden items-center gap-8 text-sm font-bold text-slate-300 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors duration-300 hover:text-secondary">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="/" className="rounded-full border border-secondary/40 text-secondary hover:bg-secondary/15 px-4 py-2.5 text-sm font-black transition-all duration-300 flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" className="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Volver
          </a>
          <a href="#contacto" className="rounded-full bg-primary px-5 py-3 text-sm font-black text-white transition-all duration-300 hover:scale-105 glow-primary">
            Probar Gratis
          </a>
        </div>
      </nav>
    </header>
  );
}

function DashboardPreview() {
  const bars = [42, 78, 56, 88, 66, 95];
  const barColors = ["bg-secondary/50", "bg-primary/70", "bg-secondary/60", "bg-accent/80", "bg-primary/80", "bg-secondary/70"];

  return (
    <div id="demo" className="fade-in fade-delay-2 dashboard-float">
      <div className="scan relative overflow-hidden rounded-[2rem] border border-secondary/30 bg-cardBg/90 p-4 shadow-2xl shadow-secondary/10">
        <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-bgSpace/80 px-4 py-3">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-primary" />
            <span className="h-3 w-3 rounded-full bg-accent" />
            <span className="h-3 w-3 rounded-full bg-secondary" />
          </div>
          <span className="text-xs font-black uppercase tracking-[.3em] text-slate-400">Dashboard Live</span>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => {
            const colors = colorMap[stat.color];
            return (
              <div key={stat.label} className={`rounded-2xl border ${colors.border} ${colors.bg} p-4`}>
                <p className="text-xs font-bold text-slate-400">{stat.label}</p>
                <p className="mt-2 text-3xl font-black text-white">{stat.value}</p>
                <p className={`mt-2 text-sm ${colors.text}`}>{stat.note}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
          <div className="rounded-2xl border border-white/10 bg-bgSpace/70 p-5">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-black">Ingresos por sede</p>
              <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary">Tiempo real</span>
            </div>
            <div className="flex h-48 items-end gap-3">
              {bars.map((height, index) => (
                <span key={height} className={`w-full rounded-t-xl ${barColors[index]}`} style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-bgSpace/70 p-5">
            <p className="mb-5 font-black">Alertas operativas</p>
            <div className="space-y-3">
              <div className="rounded-xl bg-primary/10 p-3 text-sm text-slate-200">12 renovaciones pendientes</div>
              <div className="rounded-xl bg-secondary/10 p-3 text-sm text-slate-200">Clase HIIT completa</div>
              <div className="rounded-xl bg-accent/10 p-3 text-sm text-slate-200">Nueva sede lista</div>
              <div className="rounded-xl bg-white/5 p-3 text-sm text-slate-200">4 leads desde Instagram</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-20 md:pt-28 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_.95fr]">
        <div className="fade-in">
          <p className="mb-5 inline-flex rounded-full border border-secondary/40 bg-secondary/10 px-4 py-2 text-sm font-black text-secondary glow-secondary">
            SaaS multi-tenant para gimnasios modernos
          </p>

          <h1 className="font-display text-5xl uppercase leading-[.95] tracking-tight text-textCrisp md:text-7xl lg:text-8xl">
            Tu gimnasio no necesita más planillas.
            <span className="block text-primary drop-shadow-[0_0_18px_rgba(236,72,153,.55)]">Necesita control.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
            Centralizá socios, cobros, reservas, sedes, entrenadores y métricas en una plataforma diseñada para crecer con tu operación fitness.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#contacto" className="rounded-full bg-primary px-8 py-4 text-center text-base font-black text-white transition-all duration-300 hover:scale-105 glow-primary">
              Comenzar ahora
            </a>
            <a href="#demo" className="rounded-full border border-secondary/60 bg-cardBg/70 px-8 py-4 text-center text-base font-black text-secondary transition-all duration-300 hover:scale-105 hover:bg-secondary hover:text-bgSpace">
              Ver Demo
            </a>
          </div>
        </div>

        <DashboardPreview />
      </div>
    </section>
  );
}

function ContextSection() {
  return (
    <section id="contexto" className="reveal px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-cardBg/80 p-8 text-center shadow-2xl shadow-primary/5 md:p-12">
        <p className="mb-4 text-sm font-black uppercase tracking-[.35em] text-accent">Nuestra misión</p>
        <h2 className="font-display text-4xl uppercase md:text-6xl">Modernizar la gestión deportiva</h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
          FitOrbit OS reemplaza procesos fragmentados por una operación clara, automatizada y medible. Menos tiempo persiguiendo pagos. Más tiempo creando experiencias que retienen socios.
        </p>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-12 max-w-3xl">
          <p className="mb-4 text-sm font-black uppercase tracking-[.35em] text-secondary">Módulos clave</p>
          <h2 className="font-display text-4xl uppercase md:text-6xl">Todo el gimnasio en un solo cockpit</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const colors = colorMap[feature.color];
            return (
              <article key={feature.title} className="reveal rounded-[1.75rem] border border-white/10 bg-cardBg p-7 transition-all duration-300 hover:-translate-y-2 hover:border-secondary/70 hover:shadow-2xl hover:shadow-secondary/10">
                <div className={`mb-5 grid h-12 w-12 place-items-center rounded-2xl ${colors.bg} text-2xl ${colors.text}`}>{feature.icon}</div>
                <h3 className="text-xl font-black">{feature.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{feature.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonios" className="px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-12 text-center">
          <p className="mb-4 text-sm font-black uppercase tracking-[.35em] text-accent">Testimonios</p>
          <h2 className="font-display text-4xl uppercase md:text-6xl">Dueños que dejaron de apagar incendios</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="reveal rounded-[1.75rem] border border-white/10 bg-cardBg p-7">
              <div className="mb-4 text-accent">★★★★★</div>
              <p className="leading-7 text-slate-300">“{testimonial.quote}”</p>
              <div className="mt-6">
                <p className="font-black">{testimonial.name}</p>
                <p className="text-sm text-secondary">{testimonial.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contacto" className="px-5 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div className="reveal">
          <p className="mb-4 text-sm font-black uppercase tracking-[.35em] text-primary">Activá tu prueba</p>
          <h2 className="font-display text-4xl uppercase md:text-6xl">Si querés crecer, medí primero.</h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Pedí una demo guiada y descubrí cómo FitOrbit OS ordena la operación completa de tu gimnasio desde el primer día.
          </p>
        </div>

        <form className="reveal rounded-[2rem] border border-white/10 bg-cardBg p-6 shadow-2xl shadow-primary/10 md:p-8" action="#" method="post">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-300">Nombre</span>
              <input type="text" name="nombre" required className="w-full rounded-2xl border border-white/10 bg-bgSpace px-4 py-4 text-textCrisp outline-none transition-all duration-300 placeholder:text-slate-600 focus:border-secondary focus:ring-4 focus:ring-secondary/15" placeholder="Tu nombre" />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-300">Gimnasio</span>
              <input type="text" name="gimnasio" required className="w-full rounded-2xl border border-white/10 bg-bgSpace px-4 py-4 text-textCrisp outline-none transition-all duration-300 placeholder:text-slate-600 focus:border-secondary focus:ring-4 focus:ring-secondary/15" placeholder="Nombre del centro" />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-bold text-slate-300">Email</span>
            <input type="email" name="email" required className="w-full rounded-2xl border border-white/10 bg-bgSpace px-4 py-4 text-textCrisp outline-none transition-all duration-300 placeholder:text-slate-600 focus:border-secondary focus:ring-4 focus:ring-secondary/15" placeholder="tu@email.com" />
          </label>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-bold text-slate-300">Mensaje</span>
            <textarea name="mensaje" rows="5" required className="w-full resize-none rounded-2xl border border-white/10 bg-bgSpace px-4 py-4 text-textCrisp outline-none transition-all duration-300 placeholder:text-slate-600 focus:border-secondary focus:ring-4 focus:ring-secondary/15" placeholder="Contanos cuántas sedes tenés y qué querés mejorar" />
          </label>

          <button type="submit" className="mt-6 w-full rounded-full bg-primary px-8 py-4 text-base font-black text-white transition-all duration-300 hover:scale-[1.02] glow-primary">
            Enviar solicitud
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-10 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-2xl">FitOrbit<span className="text-secondary">OS</span></p>
          <p className="mt-2 text-sm text-slate-400">© 2026 FitOrbit OS. Todos los derechos reservados.</p>
        </div>

        <div className="flex flex-wrap gap-5 text-sm font-bold text-slate-300">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors duration-300 hover:text-secondary">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex gap-3">
          <a href="#" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-cardBg text-primary transition-all duration-300 hover:scale-110 hover:border-primary">IG</a>
          <a href="#" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-cardBg text-secondary transition-all duration-300 hover:scale-110 hover:border-secondary">IN</a>
          <a href="#" aria-label="YouTube" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-cardBg text-accent transition-all duration-300 hover:scale-110 hover:border-accent">YT</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden font-body text-textCrisp antialiased">
      <div className="space-grid fixed inset-0 -z-10" />
      <Header />
      <main>
        <Hero />
        <ContextSection />
        <Features />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
