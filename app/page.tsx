"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

/* ─────────────────────── Icons ─────────────────────── */
const WaIcon = ({ className }: { className: string }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.882a.5.5 0 0 0 .613.613l6.035-1.465A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.523-5.168-1.432l-.368-.22-3.818.927.942-3.818-.24-.384A9.954 9.954 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);

const Chevron = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 24 24" strokeWidth={2} className={`w-4 h-4 stroke-current fill-none shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

/* ─────────────── Scroll animation ────────────────── */
function Animate({
  children,
  from = 'up',
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  from?: 'up' | 'left' | 'right';
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const hidden =
    from === 'left'  ? 'opacity-0 -translate-x-12' :
    from === 'right' ? 'opacity-0 translate-x-12'  :
                       'opacity-0 translate-y-10';

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-x-0 translate-y-0' : hidden} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* ─────────────────────── Data ──────────────────────── */
const faqs = [
  { q: '¿Qué son los masajes reductivos?', a: 'Son masajes especializados con técnicas de presión profunda que trabajan la grasa localizada, activan la circulación y reducen medidas en zonas como abdomen, caderas, muslos y brazos. Se complementan con drenaje linfático en Turrialba para eliminar toxinas y potenciar resultados.' },
  { q: '¿Dónde están exactamente?', a: 'Estamos en el corazón de Turrialba. Al reservar tu cita te enviamos la ubicación exacta por WhatsApp.' },
  { q: '¿Cuánto dura cada sesión?', a: 'Aproximadamente 1 hora. Dependiendo del plan puede variar. Al coordinar la cita te lo explicamos con detalle.' },
  { q: '¿Tengo que llevar algo?', a: 'Absolutamente nada. Nosotros ponemos todo: paños desechables, aceites profesionales y un ambiente privado y climatizado.' },
  { q: '¿Puedo reducir medidas del abdomen específicamente?', a: 'Sí. En la evaluación inicial determinamos las zonas prioritarias. El masaje reductivo en abdomen y caderas es uno de los trabajos más frecuentes y efectivos.' },
  { q: '¿Qué pasa si no veo resultados?', a: 'Aplicamos la garantía escrita. Según el paquete, damos sesiones adicionales sin costo hasta que logres el resultado. Tu riesgo es cero.' },
  { q: '¿Cómo reservo mi cita?', a: 'Por WhatsApp. Respondemos en menos de 5 minutos en horario laboral. Siempre ofrecemos dos opciones de horario para que la decisión sea simple.' },
];

const PAQUETES = [
  {
    id: 'Primeros Centímetros',
    label: 'Primeros Centímetros',
    price: '₡100.000',
    crossed: '₡165.000',
    desc: '4 sesiones · Primera experiencia reductiva',
    popular: false,
  },
  {
    id: 'Reto Figura Serenia 8',
    label: 'Reto Figura Serenia 8',
    price: '₡200.000',
    crossed: '₡390.000',
    desc: '8 sesiones · Proceso completo · 4 semanas',
    popular: true,
  },
];

/* ─────────────────────── Page ──────────────────────── */
export default function SereniaLanding() {
  const [isModalOpen, setIsModalOpen]     = useState(false);
  const [paquetePresel, setPaquetePresel] = useState('');
  const [openFaq, setOpenFaq]             = useState<number | null>(null);
  const [headerOpaque, setHeaderOpaque]   = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    horario: { manana: false, tarde: false },
  });

  /* header transparente → sólido al scroll */
  useEffect(() => {
    const fn = () => setHeaderOpaque(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const abrirModal = (paquete = '') => { setPaquetePresel(paquete); setIsModalOpen(true); };
  const cerrarModal = () => setIsModalOpen(false);

  const enviarWhatsApp = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { nombre, horario } = formData;
    let horarioTexto = 'cualquier horario';
    if (horario.manana && horario.tarde) horarioTexto = 'mañana o tarde';
    else if (horario.manana) horarioTexto = 'la mañana';
    else if (horario.tarde) horarioTexto = 'la tarde';
    const pack = paquetePresel || 'un paquete reductivo';
    const mensaje = `Hola, soy ${nombre}. Me interesa reservar ${pack}. Me funciona mejor en ${horarioTexto}. ¿Podemos coordinar?`;
    window.open(`https://wa.me/50689165109?text=${encodeURIComponent(mensaje)}`, '_blank');
    cerrarModal();
  };

  const waDirecto = (texto: string) =>
    window.open(`https://wa.me/50689165109?text=${encodeURIComponent(texto)}`, '_blank');

  return (
    <main className="relative overflow-x-hidden bg-background-light">

      {/* ── HEADER — transparente en hero, sólido al scroll ── */}
      <header className={`fixed top-0 w-full z-50 px-6 md:px-12 py-4 flex items-center justify-between transition-all duration-400 ${
        headerOpaque
          ? 'bg-background-light/96 backdrop-blur-md border-b border-[#CDD4DB]/50 shadow-sm'
          : 'bg-transparent'
      }`}>
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Serenia - Masajes Reductivos Turrialba" width={34} height={30} priority
            className={headerOpaque ? '' : 'brightness-0 invert'}
          />
          <span className={`text-lg font-serif font-bold tracking-wide leading-none transition-colors ${headerOpaque ? 'text-luxury-green' : 'text-white'}`}>
            Serenia
          </span>
        </div>
        <nav className="hidden lg:flex items-center gap-8">
          {[['#problema', 'El Problema'], ['#paquetes', 'Paquetes'], ['#garantia', 'Garantía'], ['#faq', 'FAQ']].map(([href, label]) => (
            <a key={href} href={href}
              className={`text-sm font-semibold transition-colors hover:text-primary ${headerOpaque ? 'text-[#5A6270]' : 'text-white/80'}`}>
              {label}
            </a>
          ))}
          <button onClick={() => abrirModal()}
            className="bg-luxury-green text-white rounded-full px-6 py-2.5 text-sm font-black hover:bg-luxury-green/90 transition-colors flex items-center gap-2">
            <WaIcon className="w-4 h-4 fill-white" />
            Reservar mi cupo
          </button>
        </nav>
        <button onClick={() => abrirModal()}
          className="lg:hidden bg-[#25D366] text-white rounded-full px-4 py-2 text-xs font-black flex items-center gap-1.5">
          <WaIcon className="w-3 h-3 fill-white" />
          Reservar
        </button>
      </header>

      {/* ── HERO — full-bleed imagen, overlay único, sin ruido ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Imagen de fondo */}
        <img
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070"
          alt="Masaje reductivo profesional en Serenia Turrialba Costa Rica"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Un solo overlay oscuro — sin colores extra */}
        <div className="absolute inset-0 bg-dark-deep/80" />

        {/* Contenido */}
        <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 xl:px-32 pt-28 pb-20">
          <div style={{ maxWidth: '56rem' }}>
            <h1
              className="font-serif text-white leading-[0.93] tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.8rem, 5vw, 5.5rem)' }}
            >
              Reducimos tus medidas en 4 semanas.
            </h1>
            <p
              className="text-primary font-black leading-tight mb-8"
              style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)' }}
            >
              Sin gym. Sin dietas extremas.
            </p>
            <p className="text-white/65 text-base md:text-lg leading-relaxed mb-12 max-w-xl">
              Masajes reductivos profesionales en Turrialba. Si no ves resultados, seguimos sin costo —{' '}
              <span className="text-white/90 font-semibold">garantía por escrito.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => abrirModal()}
                className="bg-primary text-white font-black py-4 px-9 rounded-full hover:bg-primary/90 hover:scale-105 transition-all uppercase tracking-wide text-sm flex items-center justify-center gap-2 w-fit">
                <WaIcon className="w-4 h-4 fill-white" />
                Reservar mi cupo
              </button>
              <a href="#paquetes"
                className="border border-white/25 text-white/75 font-semibold py-4 px-9 rounded-full hover:bg-white/8 transition-all uppercase tracking-wide text-sm text-center w-fit">
                Ver precios →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── EL PROBLEMA — editorial, texto grande ── */}
      <section id="problema" className="grid grid-cols-1 md:grid-cols-2">

        <Animate from="left" className="h-full">
          <div className="bg-luxury-green h-full px-8 md:px-12 lg:px-16 py-20 md:py-28 flex flex-col">
            <span className="text-primary text-[11px] font-black uppercase tracking-[0.3em] mb-10 block">
              Reducción de Medidas
            </span>
            <ul className="space-y-6 mb-12 flex-1">
              {[
                'La ropa no te queda como antes y te frustra',
                'Intentaste dietas que no son sostenibles',
                'No tenés tiempo para el gym pero querés resultados',
                'Querés sentirte bien en tu cuerpo, ya',
              ].map((f) => (
                <li key={f} className="flex items-start gap-4 text-base md:text-lg text-blue-50/90 leading-relaxed">
                  <span className="text-primary mt-1 font-bold shrink-0 text-xl leading-none">—</span>
                  {f}
                </li>
              ))}
            </ul>
            <p className="font-serif text-2xl md:text-3xl text-white italic leading-snug mb-12">
              "Reducir medidas sin gym es posible.<br />Necesitás el método correcto."
            </p>
            <button
              onClick={() => abrirModal('Reto Figura Serenia 8')}
              className="self-start border border-primary/60 text-primary py-3.5 px-8 rounded-full font-black uppercase tracking-wider text-sm hover:bg-primary hover:text-white hover:border-primary transition-all">
              Quiero Reducir Medidas →
            </button>
          </div>
        </Animate>

        <Animate from="right" className="h-full">
          <div className="bg-background-light h-full px-8 md:px-12 lg:px-16 py-20 md:py-28 flex flex-col">
            <span className="text-luxury-green text-[11px] font-black uppercase tracking-[0.3em] mb-10 block">
              Confianza en tu Cuerpo
            </span>
            <ul className="space-y-6 mb-12 flex-1">
              {[
                'Evitás fotos o eventos porque no te sentís bien en tu cuerpo',
                'La ropa que te gustaba ya no te queda igual',
                'Querés hacer algo pero no sabés por dónde empezar',
                'Ya probaste cosas antes y ninguna funcionó a largo plazo',
              ].map((f) => (
                <li key={f} className="flex items-start gap-4 text-base md:text-lg text-[#5A6270] leading-relaxed">
                  <span className="text-primary mt-1 font-bold shrink-0 text-xl leading-none">—</span>
                  {f}
                </li>
              ))}
            </ul>
            <p className="font-serif text-2xl md:text-3xl text-luxury-green italic leading-snug mb-12">
              "No necesitás cambiar tu vida entera.<br />Necesitás el método correcto."
            </p>
            <button
              onClick={() => abrirModal('Primeros Centímetros')}
              className="self-start bg-luxury-green text-white py-3.5 px-8 rounded-full font-black uppercase tracking-wider text-sm hover:bg-luxury-green/90 transition-all">
              Quiero Empezar Hoy →
            </button>
          </div>
        </Animate>
      </section>

      {/* ── PAQUETES ── */}
      <section id="paquetes" className="py-24 md:py-32 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">

          <Animate from="up">
            <div className="mb-14 md:mb-16">
              <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] block mb-4">
                Paquetes con Garantía Incluida
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0D1525] leading-tight">
                Elegí tu camino<br className="hidden md:block" /> para reducir medidas.
              </h2>
            </div>
          </Animate>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

            {/* Primeros Centímetros */}
            <Animate from="left" className="flex flex-col h-full">
              <div className="border border-[#CDD4DB] rounded-2xl p-8 flex flex-col h-full">
                <div className="mb-6">
                  <span className="text-[10px] font-black text-[#5A6270] uppercase tracking-[0.2em]">Para sentir el método</span>
                  <h3 className="text-2xl font-serif font-bold text-[#0D1525] mt-2 mb-1">Primeros Centímetros</h3>
                  <p className="text-[#5A6270] text-sm">4 sesiones · Primera experiencia reductiva</p>
                </div>
                <div className="mb-8">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-black text-[#0D1525]">₡100.000</span>
                    <span className="text-[#9AA5B0] line-through text-base">₡165.000</span>
                  </div>
                  <p className="text-[10px] text-primary font-black uppercase tracking-widest">Ahorrás ₡65.000</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    '4 sesiones de masaje reductivo profesional',
                    'Evaluación inicial de zonas a trabajar',
                    'Mini guía de hábitos potenciadores',
                    'Seguimiento por WhatsApp durante el proceso',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#5A6270]">
                      <span className="text-primary font-bold mt-0.5 shrink-0">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-7">
                  <p className="font-black text-amber-700 text-[10px] uppercase tracking-widest mb-1">Garantía</p>
                  <p className="text-amber-800 text-sm leading-relaxed">Si no notás diferencia visible en 4 sesiones, te regalamos <strong>1 sesión adicional sin costo.</strong></p>
                </div>
                <button
                  onClick={() => abrirModal('Primeros Centímetros')}
                  className="w-full border-2 border-luxury-green text-luxury-green py-4 rounded-xl font-black uppercase tracking-wider text-sm text-center hover:bg-luxury-green hover:text-white transition-all">
                  Empezar con este paquete →
                </button>
              </div>
            </Animate>

            {/* Reto Figura Serenia 8 */}
            <Animate from="right" delay={100} className="flex flex-col h-full">
              <div className="bg-luxury-green rounded-2xl p-8 flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-bl-2xl">
                  Más popular
                </div>
                <div className="mb-6 pt-4">
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Proceso completo</span>
                  <h3 className="text-2xl font-serif font-bold text-white mt-2 mb-1">Reto Figura Serenia 8</h3>
                  <p className="text-white/65 text-sm">8 sesiones · 4 semanas · Transformación real</p>
                </div>
                <div className="mb-8">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-black text-white">₡200.000</span>
                    <span className="text-white/35 line-through text-base">₡390.000</span>
                  </div>
                  <p className="text-[10px] text-primary font-black uppercase tracking-widest">Ahorrás ₡190.000</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    '8 sesiones de masaje reductivo profesional',
                    '1 sesión de drenaje linfático activador incluida',
                    'Medición y fotos iniciales + medición final documentada',
                    'Guía de alimentación anti-inflamatoria',
                    'Seguimiento semanal por WhatsApp durante las 4 semanas',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-white/80">
                      <span className="text-primary font-bold mt-0.5 shrink-0">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <div className="bg-white/10 border border-white/20 rounded-xl p-4 mb-7">
                  <p className="font-black text-primary text-[10px] uppercase tracking-widest mb-1.5">Garantía</p>
                  <p className="text-white/90 text-sm leading-relaxed">Si no reducís al menos <strong>3 cm en las zonas trabajadas</strong>, seguimos con sesiones adicionales <span className="text-primary font-black">COMPLETAMENTE GRATIS</span> hasta que lo logres.</p>
                </div>
                <button
                  onClick={() => abrirModal('Reto Figura Serenia 8')}
                  className="w-full bg-white text-luxury-green py-5 rounded-xl font-black uppercase tracking-wider text-sm text-center hover:bg-white/90 hover:scale-[1.02] transition-all">
                  Reservar mi Cupo →
                </button>
              </div>
            </Animate>
          </div>

          <Animate from="up" delay={100}>
            <div className="text-center mt-10">
              <button
                onClick={() => waDirecto('Hola, me interesa conocer más sobre los masajes reductivos de Serenia en Turrialba. ¿Podemos coordinar?')}
                className="text-luxury-green font-bold text-sm underline underline-offset-4 decoration-luxury-green/30 hover:decoration-luxury-green transition-all">
                ¿Dudas sobre cuál elegir? Escribinos por WhatsApp →
              </button>
            </div>
          </Animate>
        </div>
      </section>

      {/* ── GARANTÍA — monumental ── */}
      <section id="garantia" className="bg-luxury-green py-28 md:py-36 px-6 text-white overflow-hidden">
        <div className="container mx-auto max-w-4xl">
          <Animate from="up">
            <div className="text-center mb-16 md:mb-20">
              <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-10 block">
                Política de Garantía Serenia
              </p>
              <h2
                className="font-serif font-bold text-white leading-none mb-8"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
              >
                Tu riesgo<br />
                <em className="text-primary not-italic font-light">es cero.</em>
              </h2>
              <p className="text-blue-100/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                No pedimos fe ciega. Pedimos que te des la oportunidad — con respaldo por escrito.
              </p>
            </div>
          </Animate>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16 max-w-3xl mx-auto">
            <Animate from="left">
              <div className="border border-white/15 rounded-2xl p-7 h-full">
                <p className="text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-3">Primeros Centímetros</p>
                <p className="text-blue-50/80 text-sm leading-relaxed">Si no notás diferencia visible en 4 sesiones, te regalamos 1 sesión adicional sin costo.</p>
              </div>
            </Animate>
            <Animate from="right">
              <div className="border border-white/15 rounded-2xl p-7 h-full">
                <p className="text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-3">Reto Figura Serenia 8</p>
                <p className="text-blue-50/80 text-sm leading-relaxed">Si no reducís al menos 3 cm en las zonas trabajadas al finalizar, seguimos con sesiones adicionales COMPLETAMENTE GRATIS hasta que lo logres.</p>
              </div>
            </Animate>
          </div>

          <Animate from="up">
            <div className="text-center">
              <button
                onClick={() => abrirModal()}
                className="bg-primary text-white font-black text-base py-5 px-12 rounded-full hover:bg-primary/90 hover:scale-105 transition-all uppercase tracking-wide flex items-center gap-3 mx-auto">
                <WaIcon className="w-5 h-5 fill-white" />
                Quiero Empezar Sin Riesgo
              </button>
            </div>
          </Animate>
        </div>
      </section>

      {/* ── PROCESO ── */}
      <section className="py-24 md:py-32 px-6 bg-background-light overflow-hidden">
        <div className="container mx-auto max-w-4xl">
          <Animate from="up">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0D1525] mb-16 md:mb-20 text-center">
              Así de simple es empezar
            </h2>
          </Animate>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              { num: '01', title: 'Elegí tu paquete', desc: 'Mirá los paquetes y elegí el que se ajusta a tu objetivo. Si tenés dudas, escribinos sin compromiso.', delay: 0 },
              { num: '02', title: 'Reservá por WhatsApp', desc: 'Coordinamos horario y te confirmamos el cupo. Respuesta en menos de 5 minutos.', delay: 120 },
              { num: '03', title: 'Empezás a ver resultados', desc: 'Desde la primera semana, con seguimiento constante y garantía escrita de por medio.', delay: 240 },
            ].map((step) => (
              <Animate key={step.num} from="up" delay={step.delay}>
                <span className="font-black text-[#E8EDF0] leading-none block mb-2 select-none" style={{ fontSize: '5.5rem' }}>
                  {step.num}
                </span>
                <h3 className="font-bold text-luxury-green text-base mb-2">{step.title}</h3>
                <p className="text-[#5A6270] text-sm leading-relaxed">{step.desc}</p>
              </Animate>
            ))}
          </div>
          <Animate from="up" delay={200}>
            <div className="text-center mt-16">
              <button
                onClick={() => waDirecto('Hola Serenia, quiero reservar una sesión de masaje reductivo en Turrialba. ¿Cuándo hay disponibilidad?')}
                className="bg-[#25D366] text-white font-black py-4 px-9 rounded-full hover:scale-105 transition-all uppercase tracking-wide text-sm flex items-center gap-2.5 mx-auto">
                <WaIcon className="w-4 h-4 fill-white" />
                Escribir por WhatsApp ahora
              </button>
            </div>
          </Animate>
        </div>
      </section>

      {/* ── FAQ — accordion ── */}
      <section id="faq" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-2xl">
          <Animate from="up">
            <h2 className="font-serif text-4xl font-bold text-[#0D1525] mb-14">Preguntas frecuentes</h2>
          </Animate>
          <div>
            {faqs.map((item, i) => (
              <Animate key={item.q} from="up" delay={i * 40}>
                <div className="border-b border-[#CDD4DB]/60 last:border-b-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-5 text-left gap-6 group"
                    aria-expanded={openFaq === i}>
                    <h3 className="font-semibold text-[#0D1525] text-sm md:text-base group-hover:text-luxury-green transition-colors leading-snug">
                      {item.q}
                    </h3>
                    <span className="text-luxury-green"><Chevron open={openFaq === i} /></span>
                  </button>
                  {openFaq === i && (
                    <div className="pb-6">
                      <p className="text-[#5A6270] text-sm leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="bg-dark-deep py-32 px-6 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <Animate from="up">
            <Image src="/logo.png" alt="Serenia - Masajes Reductivos Turrialba" width={44} height={39}
              className="brightness-0 invert opacity-25 mx-auto mb-12" />
            <h2 className="font-serif text-white leading-[0.95] mb-8"
              style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}>
              Las medidas no bajan<br />
              <em className="text-primary not-italic font-light">esperando.</em>
            </h2>
            <p className="text-[#94A8B8] text-lg mb-5 max-w-md mx-auto leading-relaxed">
              Cada semana sin actuar es una semana más lejos de los resultados que querés.
            </p>
            <p className="text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-14">
              Garantía escrita · Cupos limitados · Respuesta inmediata
            </p>
            <button
              onClick={() => abrirModal()}
              className="bg-primary text-white text-base font-black py-5 px-12 rounded-full hover:scale-110 hover:bg-primary/90 transition-all uppercase tracking-wide inline-flex items-center gap-3">
              <WaIcon className="w-5 h-5 fill-white" />
              Reservar mi Cupo Ahora
            </button>
            <p className="text-[#2E3E4A] text-[10px] mt-10 uppercase tracking-[0.25em] font-bold">
              Serenia · Masajes Reductivos en Turrialba, Costa Rica
            </p>
          </Animate>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-black py-10 px-6 text-center">
        <div className="flex justify-center mb-4">
          <Image src="/logo.png" alt="Serenia - Masajes Reductivos Turrialba" width={26} height={23}
            className="opacity-20 brightness-0 invert" />
        </div>
        <p className="text-[#2E343A] text-[10px] font-bold uppercase tracking-[0.2em]">
          © 2026 Serenia · Masajes Reductivos en Turrialba, Costa Rica
        </p>
        <p className="text-[#1C2228] text-[9px] mt-2 uppercase tracking-widest">Powered by KAJOTA</p>
      </footer>

      {/* ── MODAL — con selector de paquetes y precios ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-dark-deep/90 backdrop-blur-sm" onClick={cerrarModal} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 max-h-[92vh] overflow-y-auto">
            <button onClick={cerrarModal}
              className="absolute top-4 right-4 text-[#9AA5B0] hover:text-luxury-green transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>

            <div className="flex justify-center mb-4">
              <Image src="/logo.png" alt="Serenia" width={28} height={25} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-luxury-green mb-1 text-center">Reservar mi Cupo</h3>
            <p className="text-[#5A6270] text-[10px] text-center mb-7 uppercase font-black tracking-[0.2em]">
              Masajes Reductivos · Turrialba
            </p>

            <form onSubmit={enviarWhatsApp} className="space-y-5">

              {/* Nombre */}
              <div>
                <label className="block text-[10px] font-black text-luxury-green uppercase mb-1.5 tracking-[0.15em]">
                  Tu Nombre
                </label>
                <input
                  required
                  type="text"
                  className="w-full bg-background-light border border-[#CDD4DB] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-luxury-green transition-colors"
                  placeholder="¿Cómo te llamás?"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                />
              </div>

              {/* Selector de paquetes con precios */}
              <div>
                <label className="block text-[10px] font-black text-luxury-green uppercase mb-2.5 tracking-[0.15em]">
                  ¿Qué paquete te interesa?
                </label>
                <div className="space-y-2.5">
                  {PAQUETES.map((pkg) => (
                    <label
                      key={pkg.id}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paquetePresel === pkg.id
                          ? 'border-luxury-green bg-luxury-green/5'
                          : 'border-[#CDD4DB] hover:border-luxury-green/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paquete"
                        value={pkg.id}
                        required
                        checked={paquetePresel === pkg.id}
                        onChange={() => setPaquetePresel(pkg.id)}
                        className="accent-luxury-green shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-[#0D1525] flex items-center gap-2 flex-wrap">
                          {pkg.label}
                          {pkg.popular && (
                            <span className="text-[9px] font-black bg-primary text-white px-2 py-0.5 rounded-full uppercase shrink-0">
                              Popular
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-[#5A6270] mt-0.5">{pkg.desc}</p>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <p className="font-black text-luxury-green text-sm">{pkg.price}</p>
                        <p className="text-[10px] text-[#9AA5B0] line-through">{pkg.crossed}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Horario */}
              <div>
                <label className="block text-[10px] font-black text-luxury-green uppercase mb-2.5 tracking-[0.15em]">
                  Horario preferido
                </label>
                <div className="flex gap-6">
                  {[{ key: 'manana', label: 'Mañana' }, { key: 'tarde', label: 'Tarde' }].map((h) => (
                    <label key={h.key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="accent-luxury-green w-4 h-4 rounded"
                        checked={formData.horario[h.key as 'manana' | 'tarde']}
                        onChange={(e) => setFormData({ ...formData, horario: { ...formData.horario, [h.key]: e.target.checked } })}
                      />
                      <span className="text-sm font-semibold text-[#5A6270]">{h.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#25D366] text-white font-black py-4 rounded-xl hover:scale-[1.02] transition-all uppercase tracking-wider flex items-center justify-center gap-2">
                <WaIcon className="w-5 h-5 fill-white" />
                Continuar a WhatsApp
              </button>
              <p className="text-center text-[10px] text-[#9AA5B0] font-bold uppercase tracking-widest">
                Respuesta en menos de 5 minutos
              </p>
            </form>
          </div>
        </div>
      )}

      {/* ── WhatsApp flotante ── */}
      <button
        onClick={() => abrirModal()}
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl hover:scale-110 transition-all"
        aria-label="Reservar cupo">
        <WaIcon className="w-7 h-7 fill-white" />
      </button>

    </main>
  );
}
