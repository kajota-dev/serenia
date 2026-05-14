"use client";
import React, { useState } from 'react';
import Image from 'next/image';

type Objetivo = 'espalda' | 'reductivo' | 'ambas' | '';

export default function SereniaLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paquetePresel, setPaquetePresel] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    objetivo: '' as Objetivo,
    horario: { manana: false, tarde: false },
  });

  const abrirModal = (paquete = '') => {
    setPaquetePresel(paquete);
    setIsModalOpen(true);
  };
  const cerrarModal = () => setIsModalOpen(false);

  const enviarWhatsApp = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { nombre, objetivo, horario } = formData;

    let horarioTexto = 'cualquier horario';
    if (horario.manana && horario.tarde) horarioTexto = 'mañana o tarde';
    else if (horario.manana) horarioTexto = 'la mañana';
    else if (horario.tarde) horarioTexto = 'la tarde';

    let mensaje = '';
    if (objetivo === 'espalda') {
      const pack = paquetePresel || 'el Paquete Espalda Libre';
      mensaje = `Hola, soy ${nombre}. Tengo dolor de espalda y quiero reservar ${pack}. Me funciona mejor en ${horarioTexto}. ¿Podemos coordinar?`;
    } else if (objetivo === 'reductivo') {
      const pack = paquetePresel || 'el paquete reductivo';
      mensaje = `Hola, soy ${nombre}. Me interesa reservar ${pack} para reducir medidas. Me funciona mejor en ${horarioTexto}. ¿Podemos coordinar?`;
    } else {
      mensaje = `Hola, soy ${nombre}. Me interesa un plan personalizado (dolor de espalda y reducción de medidas). Me funciona mejor en ${horarioTexto}. ¿Cuándo podemos agendar?`;
    }

    window.open(`https://wa.me/50689165109?text=${encodeURIComponent(mensaje)}`, '_blank');
    cerrarModal();
  };

  const waDirecto = (texto: string) => {
    window.open(`https://wa.me/50689165109?text=${encodeURIComponent(texto)}`, '_blank');
  };

  return (
    <main className="relative overflow-x-hidden bg-background-light">

      {/* ── Barra de Urgencia ── */}
      <div className="bg-luxury-green text-white text-xs md:text-sm font-bold py-2.5 px-4 text-center sticky top-0 z-50">
        <p className="flex items-center justify-center gap-2 flex-wrap">
          SOLO 6 CUPOS DISPONIBLES ESTA SEMANA — ESCRIBINOS YA
        </p>
      </div>

      {/* ── Header ── */}
      <header className="flex items-center justify-between bg-white/95 backdrop-blur-md px-5 md:px-12 py-3 border-b border-gray-200 sticky top-[38px] z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Serenia logo" width={40} height={36} priority />
          <div>
            <h2 className="text-luxury-green text-xl font-serif font-bold leading-none tracking-wide">Serenia</h2>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
              Masoterapia &amp; Reductivos · Turrialba
            </p>
          </div>
        </div>
        <nav className="hidden lg:flex items-center gap-8">
          <a className="text-luxury-green hover:text-primary text-sm font-bold transition-colors" href="#problema">El Problema</a>
          <a className="text-luxury-green hover:text-primary text-sm font-bold transition-colors" href="#paquetes">Paquetes</a>
          <a className="text-luxury-green hover:text-primary text-sm font-bold transition-colors" href="#garantia">Garantía</a>
          <a className="text-luxury-green hover:text-primary text-sm font-bold transition-colors" href="#faq">FAQ</a>
          <button
            onClick={() => abrirModal()}
            className="bg-[#25D366] text-white rounded-full px-6 py-2.5 text-sm font-black shadow-lg hover:scale-105 transition-all flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.882a.5.5 0 0 0 .613.613l6.035-1.465A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.523-5.168-1.432l-.368-.22-3.818.927.942-3.818-.24-.384A9.954 9.954 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            RESERVAR AHORA
          </button>
        </nav>
        <button
          onClick={() => abrirModal()}
          className="lg:hidden bg-[#25D366] text-white rounded-full px-4 py-2 text-xs font-black shadow-lg flex items-center gap-1">
          <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.882a.5.5 0 0 0 .613.613l6.035-1.465A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.523-5.168-1.432l-.368-.22-3.818.927.942-3.818-.24-.384A9.954 9.954 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
          RESERVAR
        </button>
      </header>

      {/* ── HERO ── */}
      <section className="relative w-full flex items-center justify-center bg-luxury-green overflow-hidden pt-8 pb-20 md:py-20 md:min-h-[88vh]">
        <img
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070"
          alt="Masaje terapéutico profesional en Serenia Turrialba"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-green/50 via-luxury-green/70 to-luxury-green"></div>

        <div className="relative z-20 container mx-auto px-6 text-center text-white max-w-4xl">
          
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Eliminamos tu <span className="text-primary italic font-light">dolor de espalda</span>{' '}
            y reducimos{' '}
            <span className="text-primary italic font-light">tus medidas</span>{' '}
            en menos de 4 semanas.
          </h1>
          <p className="text-primary font-black text-sm uppercase tracking-widest mb-10">
            Desde Turrialba, para vos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => abrirModal()}
              className="bg-primary text-white text-base md:text-lg font-black py-4 px-10 rounded-full shadow-[0_0_30px_rgba(197,160,89,0.5)] hover:scale-105 transition-all uppercase flex items-center justify-center gap-2">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.882a.5.5 0 0 0 .613.613l6.035-1.465A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.523-5.168-1.432l-.368-.22-3.818.927.942-3.818-.24-.384A9.954 9.954 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              Reservar mi Cita
            </button>
            <a
              href="#paquetes"
              className="border-2 border-white/40 text-white text-base font-bold py-4 px-10 rounded-full hover:bg-white/10 transition-all uppercase">
              Ver Paquetes y Precios
            </a>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section className="bg-white py-6 border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: '📍', label: 'Ubicación', value: 'Turrialba Centro' },
            { icon: '✅', label: 'Garantía', value: 'Por escrito, siempre' },
            { icon: '💬', label: 'WhatsApp', value: 'Respuesta en minutos' },
            { icon: '📅', label: 'Cupos', value: 'Disponibles esta semana' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</p>
                <p className="text-sm font-bold text-luxury-green">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EL PROBLEMA ── */}
      <section id="problema" className="py-20 px-6 bg-background-light">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-luxury-green mb-4 text-balance">
              ¿Te pasa alguna de estas cosas?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Si la respuesta es sí, Serenia fue creado exactamente para vos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Dolor de espalda */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-luxury-green/10 rounded-full flex items-center justify-center text-2xl">🦴</div>
                <span className="text-xs font-black text-luxury-green uppercase tracking-widest">Dolor de Espalda</span>
              </div>
              <ul className="space-y-3 mb-6 flex-1">
                {[
                  'Llevás meses con dolor lumbar y nada lo quita',
                  'Las pastillas tapan pero no curan',
                  'El dolor no te deja dormir bien',
                  'Cargás mucho — trabajo, hijos, rutina — y el cuerpo lo acusa',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-red-400 mt-0.5">✗</span> {f}
                  </li>
                ))}
              </ul>
              <div className="bg-luxury-green/5 rounded-2xl p-4 mb-6">
                <p className="text-luxury-green font-bold italic">"El dolor de espalda no es normal. Y tiene solución. Sin pastillas."</p>
              </div>
              <button
                onClick={() => { setFormData({ ...formData, objetivo: 'espalda' }); abrirModal('Espalda Libre'); }}
                className="w-full bg-luxury-green text-white py-3 rounded-xl font-black uppercase tracking-wide text-sm hover:bg-luxury-green/90 transition-colors">
                Quiero Eliminar mi Dolor →
              </button>
            </div>

            {/* Reducción de medidas */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">✨</div>
                <span className="text-xs font-black text-primary uppercase tracking-widest">Reducción de Medidas</span>
              </div>
              <ul className="space-y-3 mb-6 flex-1">
                {[
                  'La ropa no te queda como antes y te frustra',
                  'Intentaste dietas que no son sostenibles',
                  'No tenés tiempo para el gym pero querés resultados',
                  'Querés sentirte bien en tu cuerpo, ya',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-red-400 mt-0.5">✗</span> {f}
                  </li>
                ))}
              </ul>
              <div className="bg-primary/5 rounded-2xl p-4 mb-6">
                <p className="text-luxury-green font-bold italic">"No necesitás el gym 5 días. Necesitás el método correcto."</p>
              </div>
              <button
                onClick={() => { setFormData({ ...formData, objetivo: 'reductivo' }); abrirModal('Figura Serenia'); }}
                className="w-full bg-primary text-white py-3 rounded-xl font-black uppercase tracking-wide text-sm hover:bg-primary/90 transition-colors">
                Quiero Reducir Medidas →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERENIA COMO GUÍA ── */}
      <section className="bg-luxury-green py-16 px-6 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-6">
            <Image src="/logo.png" alt="Serenia" width={56} height={50} className="brightness-0 invert opacity-60" />
          </div>
          <p className="text-primary font-black text-xs uppercase tracking-widest mb-3">El único centro especializado en Turrialba que combina:</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-10 text-balance">
            Técnica terapéutica + Reductivos + Garantía escrita.<br />
            <span className="text-primary italic font-light">Todo en un solo lugar.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🎯', title: 'Especializado', desc: 'Técnicas para dolor crónico y grasa localizada' },
              { icon: '📋', title: 'Garantía escrita', desc: 'Si no ves resultados, seguimos sin costo' },
              { icon: '💬', title: 'Seguimiento real', desc: 'Acompañamiento por WhatsApp en todo momento' },
              { icon: '🏆', title: 'Sin esperas', desc: 'Atención personalizada, sin filas' },
            ].map((item) => (
              <div key={item.title} className="bg-white/10 rounded-2xl p-5">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-white mb-1">{item.title}</h3>
                <p className="text-gray-300 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAQUETES ── */}
      <section id="paquetes" className="py-24 px-6 bg-[#f0f4f1]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="bg-primary/10 text-primary border border-primary/20 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">
              Paquetes con Garantía Incluida
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-luxury-green mb-4 text-balance">
              Elegí tu camino hacia el bienestar
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Todos los paquetes incluyen evaluación inicial, seguimiento por WhatsApp y garantía de resultados por escrito.
            </p>
          </div>

          {/* Masoterapia Terapéutica */}
          <div className="mb-6">
            <p className="text-xs font-black text-luxury-green uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="h-px flex-1 bg-luxury-green/20"></span>
              Para el Dolor de Espalda
              <span className="h-px flex-1 bg-luxury-green/20"></span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Espalda Libre */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-luxury-green relative flex flex-col">
              <div className="absolute -top-4 left-8">
                <span className="bg-luxury-green text-white px-4 py-1.5 rounded-full font-black text-[10px] uppercase shadow-lg">
                  Paquete Terapéutico
                </span>
              </div>
              <div className="mt-4 mb-6">
                <h3 className="text-2xl font-serif font-bold text-luxury-green mb-1">Espalda Libre</h3>
                <p className="text-gray-500 text-sm italic">5 sesiones · Para eliminar el dolor de espalda crónico</p>
              </div>

              <div className="bg-luxury-green/5 rounded-2xl p-5 mb-6">
                <div className="flex flex-wrap items-end gap-2 mb-2">
                  <span className="text-4xl font-black text-luxury-green">₡90.000</span>
                  <span className="text-gray-400 line-through text-lg mb-1">₡100.000</span>
                </div>
                <p className="text-xs text-luxury-green font-bold">Te ahorrás ₡10.000 vs sesiones individuales</p>
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {[
                  '5 sesiones de masoterapia terapéutica profunda',
                  'Evaluación postural inicial: mapa de zonas de tensión',
                  'Guía básica de hábitos posturales para el día a día',
                  'Seguimiento personalizado por WhatsApp',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-luxury-green font-bold mt-0.5">✓</span> {item}
                  </li>
                ))}
              </ul>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <p className="text-xs font-black text-amber-700 uppercase mb-1">🛡️ Garantía Serenia</p>
                <p className="text-amber-800 text-sm font-bold">Si después de 3 sesiones no sentís mejora real en el dolor, la 4ta sesión es <span className="text-red-600">COMPLETAMENTE GRATIS.</span></p>
              </div>

              <button
                onClick={() => { setFormData({ ...formData, objetivo: 'espalda' }); abrirModal('Espalda Libre'); }}
                className="w-full bg-luxury-green text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-luxury-green/90 transition-colors">
                Reservar Espalda Libre →
              </button>
            </div>

            {/* Individual Terapéutico */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-serif font-bold text-luxury-green mb-1">Sesión Individual</h3>
                <p className="text-gray-500 text-sm italic">1 sesión · Para quien quiere empezar a conocernos</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5 mb-6">
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-black text-luxury-green">₡20.000</span>
                </div>
                <p className="text-xs text-gray-500 font-bold mt-1">Por sesión, cualquier tipo de masaje</p>
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {[
                  'Masaje terapéutico o reductivo (a elegir)',
                  'Atención personalizada sin esperas',
                  'Ambiente privado y profesional',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-luxury-green font-bold mt-0.5">✓</span> {item}
                  </li>
                ))}
              </ul>

              <div className="bg-luxury-green/5 rounded-xl p-4 mb-6">
                <p className="text-xs font-black text-luxury-green uppercase mb-1">💡 Tip</p>
                <p className="text-luxury-green text-sm">¿No sabés por dónde empezar? Escribinos por WhatsApp y te asesoramos sin compromiso.</p>
              </div>

              <button
                onClick={() => abrirModal('Sesión Individual')}
                className="w-full border-2 border-luxury-green text-luxury-green py-4 rounded-xl font-black uppercase tracking-widest hover:bg-luxury-green hover:text-white transition-all text-sm">
                Reservar Sesión →
              </button>
            </div>
          </div>

          {/* Reductivos */}
          <div className="mb-6">
            <p className="text-xs font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="h-px flex-1 bg-primary/20"></span>
              Para Reducir Medidas
              <span className="h-px flex-1 bg-primary/20"></span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primeros Centímetros */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col">
              <div className="mb-6">
                <span className="bg-gray-100 text-gray-600 text-[10px] font-black px-3 py-1 rounded-full uppercase">Para sentir el método</span>
                <h3 className="text-2xl font-serif font-bold text-luxury-green mt-3 mb-1">Primeros Centímetros</h3>
                <p className="text-gray-500 text-sm italic">4 sesiones · Empezá a ver la diferencia antes de comprometerte</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5 mb-6">
                <div className="flex flex-wrap items-end gap-2 mb-2">
                  <span className="text-4xl font-black text-luxury-green">₡70.000</span>
                  <span className="text-gray-400 line-through text-lg mb-1">₡80.000</span>
                </div>
                <p className="text-xs text-primary font-bold">Te ahorrás ₡10.000 vs sesiones individuales</p>
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {[
                  '4 sesiones de masaje reductivo profesional',
                  'Evaluación inicial de zonas a trabajar',
                  'Mini guía: hábitos que potencian los resultados',
                  'Seguimiento por WhatsApp durante el proceso',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-primary font-bold mt-0.5">✓</span> {item}
                  </li>
                ))}
              </ul>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <p className="text-xs font-black text-amber-700 uppercase mb-1">🛡️ Garantía Serenia</p>
                <p className="text-amber-800 text-sm font-bold">Si no notás diferencia visible tras las 4 sesiones, te regalamos <span className="text-red-600">1 sesión adicional sin costo.</span></p>
              </div>

              <button
                onClick={() => { setFormData({ ...formData, objetivo: 'reductivo' }); abrirModal('Primeros Centímetros'); }}
                className="w-full border-2 border-primary text-primary py-4 rounded-xl font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all text-sm">
                Reservar Primeros Centímetros →
              </button>
            </div>

            {/* Figura Serenia */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-primary relative flex flex-col">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full font-black text-[10px] uppercase shadow-lg whitespace-nowrap">
                ⭐ PROCESO COMPLETO · MÁS POPULAR
              </div>
              <div className="mt-4 mb-6">
                <span className="bg-primary/15 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase">Transformación real de medidas</span>
                <h3 className="text-2xl font-serif font-bold text-luxury-green mt-3 mb-1">Figura Serenia</h3>
                <p className="text-gray-500 text-sm italic">8 sesiones · El proceso reductivo completo</p>
              </div>

              <div className="bg-primary/10 rounded-2xl p-5 mb-6">
                <div className="flex flex-wrap items-end gap-2 mb-2">
                  <span className="text-4xl font-black text-luxury-green">₡136.000</span>
                  <span className="text-gray-400 line-through text-xl mb-1">₡160.000</span>
                </div>
                <p className="text-xs text-primary font-black">Te ahorrás ₡24.000 vs sesiones individuales</p>
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {[
                  '8 sesiones de masaje reductivo profesional',
                  'Medición inicial y final con registro de avance (cintura, caderas, abdomen, muslos)',
                  '1 sesión de drenaje linfático incluida — activa eliminación de toxinas',
                  'Guía de alimentación anti-inflamatoria (incluida)',
                  'Seguimiento semanal por WhatsApp durante todo el proceso',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-luxury-green font-medium">
                    <span className="text-primary font-bold mt-0.5">✓</span> {item}
                  </li>
                ))}
              </ul>

              <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 mb-6">
                <p className="text-xs font-black text-amber-700 uppercase mb-1">🛡️ Garantía Serenia</p>
                <p className="text-amber-800 text-sm font-bold">Si no reducís al menos <strong>2 cm en las zonas trabajadas</strong>, te damos <span className="text-red-600">2 sesiones adicionales SIN COSTO.</span></p>
              </div>

              <button
                onClick={() => { setFormData({ ...formData, objetivo: 'reductivo' }); abrirModal('Figura Serenia'); }}
                className="w-full bg-primary text-white py-5 rounded-xl font-black uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-all">
                Reservar Figura Serenia →
              </button>

              <p className="text-center text-[10px] text-gray-400 mt-3 font-bold uppercase">Este es el paquete que ya se vendió — funciona.</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm mb-3">¿No sabés cuál te conviene? Tenemos el <strong className="text-luxury-green">Plan Personalizado</strong>.</p>
            <button
              onClick={() => waDirecto('Hola, me interesa el Plan Personalizado de Serenia. ¿Podemos coordinar?')}
              className="inline-flex items-center gap-2 border-2 border-luxury-green text-luxury-green font-black px-8 py-3 rounded-full hover:bg-luxury-green hover:text-white transition-all uppercase text-sm">
              Solicitar Plan Personalizado
            </button>
          </div>
        </div>
      </section>

      {/* ── GARANTÍA ── */}
      <section id="garantia" className="py-20 px-6 bg-luxury-green text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="text-6xl mb-4 block">🛡️</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-balance">
            ¿Miedo de pagar y no ver resultados?
          </h2>
          <p className="text-xl text-gray-200 mb-4 max-w-2xl mx-auto">
            Entendemos. Por eso en Serenia no pedimos fe ciega. Pedimos que te des la oportunidad — con respaldo.
          </p>
          <p className="text-primary font-black text-lg mb-10">Tu riesgo es CERO. Los resultados, reales.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                paquete: 'Espalda Libre',
                garantia: 'Si después de 3 sesiones no sentís mejora real en el dolor, la 4ta sesión es COMPLETAMENTE GRATIS.',
              },
              {
                paquete: 'Figura Serenia',
                garantia: 'Si no reducís al menos 2 cm en las zonas trabajadas al finalizar, te damos 2 sesiones adicionales SIN COSTO.',
              },
              {
                paquete: 'Primeros Centímetros',
                garantia: 'Si no notás diferencia visible tras las 4 sesiones, te regalamos 1 sesión adicional sin costo.',
              },
            ].map((g) => (
              <div key={g.paquete} className="bg-white/10 rounded-2xl p-6 text-left">
                <p className="text-primary font-black text-xs uppercase mb-2">{g.paquete}</p>
                <p className="text-white text-sm leading-relaxed">{g.garantia}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => abrirModal()}
            className="bg-primary text-white font-black text-lg py-5 px-12 rounded-full shadow-2xl hover:scale-105 transition-all uppercase flex items-center gap-3 mx-auto">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.882a.5.5 0 0 0 .613.613l6.035-1.465A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.523-5.168-1.432l-.368-.22-3.818.927.942-3.818-.24-.384A9.954 9.954 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            Quiero Empezar Sin Riesgo
          </button>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-luxury-green mb-3">Así de simple es empezar</h2>
            <p className="text-gray-500">Tres pasos y ya estás en camino.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: '1', title: 'Elegí tu paquete', desc: 'Mirá los paquetes y elegí el que se ajusta a tu objetivo. Si tenés dudas, escribinos y te orientamos.' },
              { num: '2', title: 'Reservá por WhatsApp', desc: 'Escribinos con el paquete que elegiste. Coordinamos horario y te confirmamos el cupo.' },
              { num: '3', title: 'Empezás a ver resultados', desc: 'Desde la primera semana. Con seguimiento constante y garantía escrita.' },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-16 h-16 bg-luxury-green rounded-full flex items-center justify-center text-white font-black text-2xl mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-bold text-luxury-green text-lg mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => waDirecto('Hola Serenia, quiero reservar una sesión. ¿Cuándo hay disponibilidad?')}
              className="bg-[#25D366] text-white font-black py-4 px-10 rounded-full shadow-lg hover:scale-105 transition-all uppercase text-base flex items-center gap-3 mx-auto">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.882a.5.5 0 0 0 .613.613l6.035-1.465A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.523-5.168-1.432l-.368-.22-3.818.927.942-3.818-.24-.384A9.954 9.954 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              Escribir Ahora por WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 px-6 bg-background-light">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-serif font-bold text-luxury-green mb-12 text-center">Preguntas Frecuentes</h2>
          <div className="space-y-5">
            {[
              {
                q: '¿Dónde están exactamente?',
                a: 'Estamos en el corazón de Turrialba. Al reservar tu cita te enviamos la ubicación exacta por WhatsApp.',
              },
              {
                q: '¿Cuánto dura cada sesión?',
                a: 'Aproximadamente 1 hora. Dependiendo del plan puede variar. Al coordinar la cita te lo explicamos con detalle.',
              },
              {
                q: '¿Tengo que llevar algo a la sesión?',
                a: 'Absolutamente nada. Nosotros ponemos todo: paños desechables, aceites profesionales y un ambiente privado y climatizado.',
              },
              {
                q: '¿Qué pasa si no veo resultados?',
                a: 'Aplicamos nuestra garantía escrita. Según el paquete, te damos sesiones adicionales sin costo. Tu riesgo es cero.',
              },
              {
                q: '¿Puedo combinar objetivos (dolor + reducción)?',
                a: 'Sí. El Plan Personalizado es exactamente para eso. Escribinos por WhatsApp y diseñamos un plan mixto a tu medida.',
              },
              {
                q: '¿Cómo reservo mi cita?',
                a: 'Por WhatsApp. Respondemos en menos de 5 minutos en horario laboral. Siempre ofrecemos dos opciones de horario para que la decisión sea simple.',
              },
            ].map((item) => (
              <div key={item.q} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-luxury-green text-base mb-2">{item.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="bg-luxury-green py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <Image src="/logo.png" alt="Serenia" width={64} height={58} className="brightness-0 invert opacity-50" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 text-balance">
            No esperes a que el dolor se vuelva crónico.<br />
            <span className="text-primary italic font-light">Las medidas tampoco bajan esperando.</span>
          </h2>
          <p className="text-gray-300 text-lg mb-4">Cada semana sin actuar es una semana más de incomodidad.</p>
          <p className="text-primary font-black text-sm uppercase tracking-widest mb-10">
            Garantía escrita incluida · Cupos limitados · Respuesta inmediata
          </p>
          <button
            onClick={() => abrirModal()}
            className="bg-primary text-white text-xl font-black py-6 px-14 rounded-full shadow-2xl hover:scale-110 transition-all uppercase inline-flex items-center gap-3">
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.882a.5.5 0 0 0 .613.613l6.035-1.465A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.523-5.168-1.432l-.368-.22-3.818.927.942-3.818-.24-.384A9.954 9.954 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            Reservar mi Cita Ahora
          </button>
          <p className="text-gray-400 text-xs mt-6 uppercase tracking-widest">Serenia · Masoterapia &amp; Reductivos · Turrialba, Costa Rica</p>
        </div>
      </section>

      {/* ── MODAL DE RESERVA PRE-CALIFICADO ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-luxury-green/85 backdrop-blur-sm" onClick={cerrarModal}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 border border-gray-100">
            <button onClick={cerrarModal} className="absolute top-4 right-4 text-gray-400 hover:text-luxury-green transition-colors">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>

            <div className="flex items-center gap-2 justify-center mb-1">
              <Image src="/logo.png" alt="Serenia" width={32} height={29} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-luxury-green mb-1 text-center">Reservar mi Cita</h3>
            <p className="text-gray-400 text-xs text-center mb-6 uppercase font-bold tracking-widest">Reservá tu lugar hoy</p>

            <form onSubmit={enviarWhatsApp} className="space-y-5">
              <div>
                <label className="block text-[10px] font-black text-luxury-green uppercase mb-1.5">Tu Nombre</label>
                <input
                  required
                  type="text"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-luxury-green"
                  placeholder="¿Cómo te llamás?"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-luxury-green uppercase mb-2">¿Cuál es tu objetivo principal?</label>
                <div className="space-y-2">
                  {[
                    { value: 'espalda', label: '🦴 Tengo dolor de espalda y quiero tratarlo' },
                    { value: 'reductivo', label: '✨ Quiero reducir medidas y tonificar' },
                    { value: 'ambas', label: '🎯 Quiero las dos cosas' },
                  ].map((opt) => (
                    <label key={opt.value} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.objetivo === opt.value ? 'border-luxury-green bg-luxury-green/5' : 'border-gray-100 hover:border-gray-200'}`}>
                      <input
                        type="radio"
                        name="objetivo"
                        value={opt.value}
                        required
                        className="accent-luxury-green"
                        checked={formData.objetivo === opt.value}
                        onChange={(e) => setFormData({ ...formData, objetivo: e.target.value as Objetivo })}
                      />
                      <span className="text-sm font-medium text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {paquetePresel && (
                <div className="bg-luxury-green/5 rounded-xl px-4 py-2 text-xs font-bold text-luxury-green">
                  📦 Paquete seleccionado: {paquetePresel}
                </div>
              )}

              <div>
                <label className="block text-[10px] font-black text-luxury-green uppercase mb-2">Horario preferido</label>
                <div className="flex gap-4">
                  {[
                    { key: 'manana', label: 'Mañana' },
                    { key: 'tarde', label: 'Tarde' },
                  ].map((h) => (
                    <label key={h.key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="accent-luxury-green w-4 h-4"
                        checked={formData.horario[h.key as 'manana' | 'tarde']}
                        onChange={(e) => setFormData({ ...formData, horario: { ...formData.horario, [h.key]: e.target.checked } })}
                      />
                      <span className="text-sm font-bold text-gray-600">{h.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#25D366] text-white font-black py-4 rounded-xl shadow-lg hover:scale-[1.02] transition-all uppercase tracking-widest mt-2 flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.882a.5.5 0 0 0 .613.613l6.035-1.465A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.523-5.168-1.432l-.368-.22-3.818.927.942-3.818-.24-.384A9.954 9.954 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                Continuar a WhatsApp
              </button>
              <p className="text-center text-[10px] text-gray-400 font-bold">Respuesta en menos de 5 minutos</p>
            </form>
          </div>
        </div>
      )}

      {/* ── Botón WhatsApp Flotante ── */}
      <button
        onClick={() => waDirecto('Hola Serenia, me interesa conocer más sobre sus servicios. ¿Podemos coordinar?')}
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl hover:scale-110 transition-all"
        aria-label="Contactar por WhatsApp">
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.882a.5.5 0 0 0 .613.613l6.035-1.465A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.523-5.168-1.432l-.368-.22-3.818.927.942-3.818-.24-.384A9.954 9.954 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
      </button>

      {/* ── Footer ── */}
      <footer className="bg-black text-gray-500 py-12 px-6 text-center text-xs font-bold uppercase tracking-widest">
        <div className="flex justify-center mb-4">
          <Image src="/logo.png" alt="Serenia" width={36} height={32} className="opacity-30 brightness-0 invert" />
        </div>
        <p className="mb-1">© 2026 Serenia · Masoterapia &amp; Reductivos · Turrialba, Costa Rica</p>
        <p className="opacity-30 text-[10px] mt-3">Powered by KAJOTA</p>
      </footer>
    </main>
  );
}
