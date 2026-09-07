import { useState, useEffect, createContext, useContext } from 'react'
import logoImg from '@/imports/image.png'
import heroImg   from '@/imports/images.jpg'
import salonPhoto2 from '@/imports/salon2.png'
import salonPhoto3 from '@/imports/salon3.png'
import salonPhoto4 from '@/imports/salon4.png'

// ─── i18n ──────────────────────────────────────────────────────────────────

type Lang = 'en' | 'ar'

const T = {
  en: {
    dir: 'ltr' as 'ltr' | 'rtl',
    nav: { about: 'About', services: 'Services', gallery: 'Gallery', reviews: 'Reviews', contact: 'Contact', bookNow: 'Book Now' },
    hero: {
      location: 'Amman, Jordan',
      sub: 'A luxury beauty experience designed to make you feel confident, beautiful, and unforgettable.',
      cta: 'Book an Appointment',
      cta2: 'Explore Services',
      whatsapp: 'WhatsApp Booking',
    },
    about: {
      tag: 'Our Story',
      heading: 'The Marina & I Experience',
      p1: 'At Marina & I Beauty Lounge, we believe beauty is a deeply personal art. Our curated team of specialists brings international expertise, premium products, and an unwavering commitment to every client who steps through our doors.',
      p2: 'From precision cuts and transformative color to flawless bridal makeup and advanced skin treatments — every service is designed around you. Discover the standard that Amman\'s most discerning women trust.',
      pillars: ['Beauty', 'Elegance', 'Confidence'],
      cta: 'Discover Our Services',
    },
    services: {
      heading: 'Our Services',
      sub: 'Each treatment is crafted around your unique beauty.',
      explore: 'Explore',
      items: [
        { name: 'Hair', desc: 'Precision cuts, transformative color, and expert blowouts tailored to your hair type.' },
        { name: 'Makeup', desc: 'From natural day looks to full bridal glam. Every face tells a story.' },
        { name: 'Nails', desc: 'Classic, gel, and artistic nail designs delivered with meticulous attention to detail.' },
        { name: 'Lashes & Brows', desc: 'Extensions, lifts, lamination, and microblading to frame your features perfectly.' },
        { name: 'Skincare', desc: 'Deep cleansing facials, hydration treatments, and anti-aging therapies for radiant skin.' },
        { name: 'Hair Treatments', desc: 'Olaplex, keratin, and deep conditioning rituals to restore strength and shine.' },
      ],
    },
    why: {
      tag: 'Why Marina & I',
      heading: 'A Standard Apart',
      features: [
        { num: '01', title: 'Professional Expertise', desc: 'Our certified stylists and beauty specialists bring years of international training and artistry to every appointment.' },
        { num: '02', title: 'Premium Products', desc: 'We use only top-tier professional brands — Olaplex, L\'Oréal Professionnel, Kérastase, and more.' },
        { num: '03', title: 'Personalized Experience', desc: 'Every visit begins with a thoughtful consultation. Your vision, your preferences, your result.' },
        { num: '04', title: 'Luxury Atmosphere', desc: 'A serene marble-adorned sanctuary designed to make you feel transformed from the moment you arrive.' },
      ],
    },
    gallery: {
      tag: 'Our Gallery',
      heading: 'Follow Our Journey',
      instagram: 'Follow on Instagram',
    },
    reviews: {
      heading: 'What Our Clients Say',
      sub: '4.5 stars · 396 reviews on Google',
      items: [
        { name: 'Anhar D.', date: 'June 2025', text: 'I went to many big names in Amman and the color always faded to orange — but Ibrahim gave me exactly what I asked for. I felt truly heard. The place is elegant and welcoming.' },
        { name: 'Lara M.', date: 'May 2025', text: 'Came in with a wedding party visiting Jordan and Mohammed was outstanding. He understood my vision from the photos I showed him. Everyone left thrilled.' },
        { name: 'Dina B.', date: 'April 2025', text: 'I asked for an Italian bob on curly hair — not easy — but Ibrahim knows how to work with curls beautifully. The team made me feel completely at home.' },
      ],
    },
    cta: {
      heading: 'Ready for your next beauty experience?',
      btn: 'Book Your Appointment',
      whatsapp: 'Book via WhatsApp',
    },
    contact: {
      tag: 'Find Us',
      heading: 'Marina & I Beauty Lounge',
      sub: 'Amman, Jordan',
      address: 'Ismail Abdo St., Amman, Jordan',
      phone: '07 7771 0030',
      hours1: 'Sun – Thu: 9:00 AM – 7:00 PM',
      hours2: 'Fri – Sat: 10:00 AM – 8:00 PM',
      directions: 'Get Directions',
      whatsapp: 'WhatsApp Us',
      follow: 'Follow Us',
    },
    footer: {
      tagline: "Amman's luxury beauty sanctuary.",
      nav: ['About', 'Services', 'Gallery', 'Contact'],
      navIds: ['about', 'services', 'gallery', 'contact'],
      copyright: `© ${new Date().getFullYear()} Marina & I Beauty Lounge · Amman, Jordan`,
    },
  },
  ar: {
    dir: 'rtl' as const,
    nav: { about: 'عن الصالون', services: 'الخدمات', gallery: 'المعرض', reviews: 'التقييمات', contact: 'تواصلي', bookNow: 'احجزي الآن' },
    hero: {
      location: 'عمّان، الأردن',
      sub: 'تجربة تجميل فاخرة مصممة لتشعري بالثقة والجمال وتتركي أثراً لا يُنسى.',
      cta: 'احجزي موعدك',
      cta2: 'استعرضي خدماتنا',
      whatsapp: 'تواصلي عبر واتساب',
    },
    about: {
      tag: 'قصتنا',
      heading: 'تجربة مارينا آند آي',
      p1: 'في مارينا آند آي بيوتي لاونج، نؤمن بأن الجمال فن شخصي عميق. يجمع فريقنا المتخصص خبرات دولية ومنتجات فاخرة والتزاماً راسخاً تجاه كل عميلة تدخل أبوابنا.',
      p2: 'من القصات الدقيقة وتحويلات الألوان الرائعة إلى مكياج العروس المثالي وعلاجات البشرة المتقدمة — كل خدمة مصممة خصيصاً لكِ.',
      pillars: ['الجمال', 'الأناقة', 'الثقة'],
      cta: 'اكتشفي خدماتنا',
    },
    services: {
      heading: 'خدماتنا',
      sub: 'كل علاج مصمم حول جمالكِ الفريد.',
      explore: 'استعرضي',
      items: [
        { name: 'الشعر', desc: 'قصات دقيقة وألوان مذهلة وتجفيف احترافي مناسب لطبيعة شعركِ.' },
        { name: 'المكياج', desc: 'من الإطلالات الطبيعية اليومية إلى الجلام الكامل للعروس.' },
        { name: 'الأظافر', desc: 'تصاميم كلاسيكية وجيل وأظافر فنية بأدق التفاصيل.' },
        { name: 'الرموش والحواجب', desc: 'تركيبات ورفع ولاميناشن وميكروبليدينج لإطار مثالي لعيونكِ.' },
        { name: 'العناية بالبشرة', desc: 'تنظيف عميق وعلاجات ترطيب ومقاومة للشيخوخة لبشرة متألقة.' },
        { name: 'علاجات الشعر', desc: 'أولابلكس وكيراتين وطقوس تكييف عميق لاستعادة القوة والبريق.' },
      ],
    },
    why: {
      tag: 'لماذا مارينا آند آي',
      heading: 'معيار مختلف',
      features: [
        { num: '٠١', title: 'خبرة احترافية', desc: 'فريقنا المعتمد يجلب سنوات من التدريب والفن الدولي لكل موعد.' },
        { num: '٠٢', title: 'منتجات فاخرة', desc: 'نستخدم حصرياً أرقى الماركات المهنية — أولابلكس ولوريال وكيراستاس.' },
        { num: '٠٣', title: 'تجربة شخصية', desc: 'كل زيارة تبدأ باستشارة متأنية. رؤيتكِ، تفضيلاتكِ، نتيجتكِ.' },
        { num: '٠٤', title: 'أجواء فاخرة', desc: 'ملاذ هادئ مزين بالرخام مصمم ليجعلكِ تشعرين بالتحول من اللحظة الأولى.' },
      ],
    },
    gallery: {
      tag: 'معرض صورنا',
      heading: 'تابعي رحلتنا',
      instagram: 'تابعينا على إنستغرام',
    },
    reviews: {
      heading: 'ماذا تقول عميلاتنا',
      sub: '٤.٥ نجمة · ٣٩٦ تقييم على جوجل',
      items: [
        { name: 'أنهار د.', date: 'يونيو ٢٠٢٥', text: 'ذهبت إلى أماكن كثيرة في عمّان واللون دائماً يتحول — لكن إبراهيم أعطاني ما أردته بالضبط. شعرت أنني سُمعت. المكان أنيق ورحب جداً.' },
        { name: 'لارا م.', date: 'مايو ٢٠٢٥', text: 'جئت مع مجموعة حفل زفاف ومحمد كان رائعاً. فهم رؤيتي من الصور. الجميع غادر سعيداً جداً.' },
        { name: 'دينا ب.', date: 'أبريل ٢٠٢٥', text: 'طلبت قصة إيطالية على شعري المجعد وإبراهيم يعرف كيف يتعامل مع الشعر المجعد باحتراف. الفريق جعلني أشعر بالترحيب الكامل.' },
      ],
    },
    cta: {
      heading: 'هل أنتِ مستعدة لتجربة جمال لا تُنسى؟',
      btn: 'احجزي موعدك الآن',
      whatsapp: 'احجزي عبر واتساب',
    },
    contact: {
      tag: 'زورينا',
      heading: 'مارينا آند آي بيوتي لاونج',
      sub: 'عمّان، الأردن',
      address: 'شارع إسماعيل عبدو، عمّان، الأردن',
      phone: '07 7771 0030',
      hours1: 'الأحد – الخميس: ٩:٠٠ ص – ٧:٠٠ م',
      hours2: 'الجمعة – السبت: ١٠:٠٠ ص – ٨:٠٠ م',
      directions: 'احصلي على الاتجاهات',
      whatsapp: 'تواصلي عبر واتساب',
      follow: 'تابعينا',
    },
    footer: {
      tagline: 'ملاذ التجميل الفاخر في عمّان.',
      nav: ['عن الصالون', 'الخدمات', 'المعرض', 'تواصلي'],
      navIds: ['about', 'services', 'gallery', 'contact'],
      copyright: `© ${new Date().getFullYear()} مارينا آند آي بيوتي لاونج · عمّان، الأردن`,
    },
  },
}

type Tr = typeof T['en']
const LangCtx = createContext<{ t: Tr; lang: Lang; setLang: (l: Lang) => void }>({ t: T.en, lang: 'en', setLang: () => {} })
const useLang = () => useContext(LangCtx)

// ─── Shared ────────────────────────────────────────────────────────────────

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i < n ? '#C9A96E' : 'none'} stroke="#C9A96E" strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

function WaBtn({ label, cls = '' }: { label: string; cls?: string }) {
  return (
    <a href="https://wa.me/96277710030" target="_blank" rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] text-white text-xs tracking-[0.12em] uppercase font-medium transition-all duration-300 hover:bg-[#1eb855] ${cls}`}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      {label}
    </a>
  )
}

const IGIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

// ─── Top Bar ────────────────────────────────────────────────────────────────

function TopBar() {
  const { lang, setLang } = useLang()
  return (
    <div className="bg-[#0A0A0A] py-2.5 px-4 sm:px-6">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-4">
        <p className="text-white/60 text-[10px] sm:text-xs tracking-[0.35em] uppercase font-medium truncate"
          style={{ fontFamily: 'Playfair Display, serif' }}>
          MARINA &amp; I BEAUTY LOUNGE
        </p>
        <button
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          className="flex items-center gap-1.5 text-[10px] sm:text-xs tracking-[0.15em] text-white/50 hover:text-[#C9A96E] transition-colors shrink-0"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          {lang === 'en' ? 'العربية' : 'English'}
        </button>
      </div>
    </div>
  )
}

// ─── Nav ────────────────────────────────────────────────────────────────────

function Nav({ active, setActive }: { active: string; setActive: (s: string) => void }) {
  const { t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setActive(id); setOpen(false)
  }

  const links = [
    { id: 'about', label: t.nav.about },
    { id: 'services', label: t.nav.services },
    { id: 'gallery', label: t.nav.gallery },
    { id: 'reviews', label: t.nav.reviews },
    { id: 'contact', label: t.nav.contact },
  ]

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-sm' : ''} border-b border-[#E8E4DE]`}>
      <div className={`max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between ${t.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
        {/* Logo */}
        <button onClick={() => go('home')} className="shrink-0 w-11 h-11 overflow-hidden">
          <img
            src={logoImg}
            alt="Marina & I Beauty Lounge"
            className="w-full h-full object-cover"
            style={{ mixBlendMode: 'multiply' }}
          />
        </button>

        {/* Desktop links */}
        <ul className={`hidden lg:flex items-center gap-8 ${t.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
          {links.map(l => (
            <li key={l.id}>
              <button onClick={() => go(l.id)}
                className={`text-[11px] tracking-[0.18em] uppercase font-medium transition-colors duration-200 ${active === l.id ? 'text-[#C9A96E]' : 'text-[#0A0A0A] hover:text-[#C9A96E]'}`}>
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Book now + hamburger */}
        <div className={`flex items-center gap-3 ${t.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <a href="tel:+96277710030"
            className="hidden lg:inline-flex text-[11px] tracking-[0.18em] uppercase font-medium px-5 py-2.5 border border-[#0A0A0A] text-[#0A0A0A] transition-all duration-300 hover:bg-[#0A0A0A] hover:text-white">
            {t.nav.bookNow}
          </a>
          <button onClick={() => setOpen(!open)} className="lg:hidden flex flex-col gap-1.5 p-2" aria-label="Menu">
            <span className={`block w-5 h-px bg-[#0A0A0A] transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-px bg-[#0A0A0A] transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-[#0A0A0A] transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-80' : 'max-h-0'}`}>
        <div className={`bg-white border-t border-[#E8E4DE] px-6 py-6 flex flex-col gap-5 ${t.dir === 'rtl' ? 'items-end' : ''}`}>
          {links.map(l => (
            <button key={l.id} onClick={() => go(l.id)}
              className="text-[11px] tracking-[0.18em] uppercase font-medium text-[#0A0A0A] hover:text-[#C9A96E] transition-colors">
              {l.label}
            </button>
          ))}
          <a href="tel:+96277710030" className={`text-[11px] tracking-[0.18em] uppercase font-medium px-5 py-3 border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all ${t.dir === 'rtl' ? 'self-end' : 'self-start'}`}>
            {t.nav.bookNow}
          </a>
        </div>
      </div>
    </header>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────

const SLIDES = [
  { src: heroImg,      alt: 'Marina & I Beauty Lounge' },
  { src: salonPhoto4,  alt: 'Salon interior — marble counter and chandelier' },
  { src: salonPhoto3,  alt: 'Hair styling at Marina & I' },
  { src: salonPhoto2,  alt: 'Bridal makeup look' },
]

function Hero() {
  const { t } = useLang()
  const h = t.hero
  const [cur, setCur]       = useState(0)
  const [animKey, setAnimKey] = useState(0) // forces kenburns restart on each slide

  useEffect(() => {
    const id = setInterval(() => {
      setCur(c => (c + 1) % SLIDES.length)
      setAnimKey(k => k + 1)
    }, 6000)
    return () => clearInterval(id)
  }, [])

  const goTo = (i: number) => { setCur(i); setAnimKey(k => k + 1) }

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-black">

      {/* ── Slider images ── */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === cur ? 1 : 0, zIndex: i === cur ? 1 : 0 }}
        >
          <img
            key={i === cur ? animKey : i}
            src={slide.src as string}
            alt={slide.alt}
            className={`w-full h-full object-cover object-center ${i === cur ? 'kenburns' : ''}`}
          />
        </div>
      ))}

      {/* Dark overlay — stronger at bottom so text pops */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      {/* Left vignette for text legibility */}
      <div className={`absolute inset-0 z-10 ${
        t.dir === 'rtl'
          ? 'bg-gradient-to-l from-black/60 via-black/30 to-transparent'
          : 'bg-gradient-to-r from-black/60 via-black/30 to-transparent'
      }`} />

      {/* ── Content ── */}
      <div className={`relative z-20 flex flex-col justify-center min-h-screen
        px-6 sm:px-12 lg:px-20 xl:px-28 py-24
        max-w-screen-xl mx-auto w-full
        ${t.dir === 'rtl' ? 'items-end text-right' : 'items-start'}`}>

        {/* Logo — square filled card */}
        <div className="mb-8">
          <div className="w-28 h-28 sm:w-36 sm:h-36 bg-white shadow-lg overflow-hidden">
            <img
              src={logoImg}
              alt="Marina & I Beauty Lounge"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Location tag */}
        <div className={`flex items-center gap-3 mb-7 ${t.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <div className="h-px w-10 bg-[#C9A96E]" />
          <span className="text-[#C9A96E] text-[10px] tracking-[0.35em] uppercase font-medium">{h.location}</span>
        </div>

        {/* Headline — always English, brand signature */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-white leading-[1.08] mb-6"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Your Beauty,<br />
          <em className="text-white/85">Our Signature.</em>
        </h1>

        <p className={`text-white/60 text-sm sm:text-base md:text-lg leading-relaxed mb-10 font-light max-w-lg ${t.dir === 'rtl' ? 'ml-auto' : ''}`}>
          {h.sub}
        </p>

        <div className={`flex flex-wrap gap-3 mb-6 ${t.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <a
            href="tel:+96277710030"
            className="inline-flex items-center px-8 py-4 border border-[#C9A96E] text-[#C9A96E] text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:bg-[#C9A96E] hover:text-white"
          >
            {h.cta}
          </a>
          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center px-8 py-4 border border-white/35 text-white/75 text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:border-white hover:text-white"
          >
            {h.cta2}
          </button>
        </div>
        <WaBtn label={h.whatsapp} />

        {/* ── Slide dots ── */}
        <div className={`absolute bottom-10 flex items-center gap-3 ${t.dir === 'rtl' ? 'right-6 sm:right-12 lg:right-20 xl:right-28' : 'left-6 sm:left-12 lg:left-20 xl:left-28'}`}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="transition-all duration-300 focus:outline-none"
              style={{
                width: i === cur ? '2rem' : '0.5rem',
                height: '2px',
                backgroundColor: i === cur ? '#C9A96E' : 'rgba(255,255,255,0.35)',
              }}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className={`absolute bottom-10 flex items-center gap-1.5 ${t.dir === 'rtl' ? 'left-6 sm:left-12' : 'right-6 sm:right-12'}`}>
          <span className="text-white text-sm font-light" style={{ fontFamily: 'Playfair Display, serif' }}>
            {String(cur + 1).padStart(2, '0')}
          </span>
          <span className="text-white/30 text-xs">/ {String(SLIDES.length).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  )
}

// ─── About ───────────────────────────────────────────────────────────────────

function About() {
  const { t } = useLang()
  const a = t.about

  return (
    <section id="about" className="py-24 lg:py-32 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        {/* Label */}
        <div className={`flex items-center gap-4 mb-4 ${t.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <div className="h-px w-10 bg-[#C9A96E]" />
          <span className="text-[#C9A96E] text-[10px] tracking-[0.35em] uppercase font-medium">{a.tag}</span>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center ${t.dir === 'rtl' ? 'lg:flex lg:flex-row-reverse' : ''}`}>
          {/* Images */}
          <div className="relative flex-1 min-w-0">
            <img src={salonPhoto4} alt="Marina & I Beauty Lounge interior"
              className="w-full h-[420px] sm:h-[520px] lg:h-[600px] object-cover object-top" />
            {/* Small inset image */}
            <div className={`absolute -bottom-8 ${t.dir === 'rtl' ? '-left-4 sm:-left-8' : '-right-4 sm:-right-8'} w-36 sm:w-48 h-44 sm:h-60 border-4 border-white overflow-hidden shadow-xl hidden sm:block`}>
              <img src={salonPhoto3} alt="Salon client" className="w-full h-full object-cover object-top" />
            </div>
          </div>

          {/* Text */}
          <div className={`flex-1 min-w-0 pb-8 sm:pb-16 lg:pb-0 ${t.dir === 'rtl' ? 'text-right' : ''}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0A0A0A] leading-[1.15] mb-7"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              {a.heading}
            </h2>
            <p className="text-[#5A5550] leading-relaxed mb-5 font-light text-sm sm:text-base">{a.p1}</p>
            <p className="text-[#5A5550] leading-relaxed mb-10 font-light text-sm sm:text-base">{a.p2}</p>

            {/* Pillars */}
            <div className={`flex items-center gap-5 mb-10 flex-wrap ${t.dir === 'rtl' ? 'flex-row-reverse justify-end' : ''}`}>
              {a.pillars.map((w, i) => (
                <div key={w} className={`flex items-center gap-5 ${t.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <span className="text-[#0A0A0A] text-[10px] tracking-[0.3em] uppercase font-medium">{w}</span>
                  {i < a.pillars.length - 1 && <span className="text-[#C9A96E] text-lg leading-none">·</span>}
                </div>
              ))}
            </div>

            <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className={`inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase font-medium text-[#0A0A0A] border-b border-[#0A0A0A] pb-1 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-all duration-300 ${t.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              {a.cta}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className={t.dir === 'rtl' ? 'rotate-180' : ''}>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Services ────────────────────────────────────────────────────────────────

const SERVICE_IMAGES = [
  'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&h=400&fit=crop&auto=format',
  salonPhoto2,
  'https://images.unsplash.com/photo-1604654894611-6973b376cbde?w=600&h=400&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1594157895135-57d7f66f2a0f?w=600&h=400&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=400&fit=crop&auto=format',
  salonPhoto4,
]

function Services() {
  const { t } = useLang()
  const s = t.services

  return (
    <section id="services" className="py-24 lg:py-32 bg-[#0A0A0A]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className={`flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6 ${t.dir === 'rtl' ? 'sm:flex-row-reverse' : ''}`}>
          <div className={t.dir === 'rtl' ? 'text-right' : ''}>
            <div className={`flex items-center gap-4 mb-4 ${t.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <div className="h-px w-10 bg-[#C9A96E]" />
              <span className="text-[#C9A96E] text-[10px] tracking-[0.35em] uppercase font-medium">Marina &amp; I</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              {s.heading}
            </h2>
          </div>
          <p className={`text-white/40 text-sm font-light max-w-xs ${t.dir === 'rtl' ? 'text-right' : ''}`}>{s.sub}</p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {s.items.map((item, i) => (
            <div key={item.name} className="group relative overflow-hidden bg-[#0A0A0A] p-0">
              {/* Image */}
              <div className="relative overflow-hidden h-52 sm:h-56">
                <img
                  src={SERVICE_IMAGES[i] as string}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              {/* Text */}
              <div className={`p-6 ${t.dir === 'rtl' ? 'text-right' : ''}`}>
                <h3 className="text-white text-lg tracking-wide mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {item.name}
                </h3>
                <p className="text-white/45 text-xs sm:text-sm font-light leading-relaxed mb-5">{item.desc}</p>
                <button
                  onClick={() => {}}
                  className={`inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-medium text-[#C9A96E] border-b border-[#C9A96E]/40 pb-0.5 hover:border-[#C9A96E] transition-all duration-200 ${t.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  {s.explore}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className={t.dir === 'rtl' ? 'rotate-180' : ''}>
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Why ─────────────────────────────────────────────────────────────────────

function Why() {
  const { t } = useLang()
  const w = t.why

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className={`flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6 ${t.dir === 'rtl' ? 'sm:flex-row-reverse' : ''}`}>
          <div className={t.dir === 'rtl' ? 'text-right' : ''}>
            <div className={`flex items-center gap-4 mb-4 ${t.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <div className="h-px w-10 bg-[#C9A96E]" />
              <span className="text-[#C9A96E] text-[10px] tracking-[0.35em] uppercase font-medium">{w.tag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0A0A0A]" style={{ fontFamily: 'Playfair Display, serif' }}>
              {w.heading}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-[#E8E4DE]">
          {w.features.map((f, i) => (
            <div key={f.num}
              className={`p-8 lg:p-10 border-b sm:border-b-0 ${t.dir === 'rtl' ? 'text-right border-l' : 'border-r'} border-[#E8E4DE] last:border-0 group hover:bg-[#FAF8F5] transition-colors duration-300`}>
              <div className={`flex items-start gap-4 mb-6 ${t.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <span className="text-[#C9A96E] text-xs tracking-[0.15em] font-medium">{f.num}</span>
                <div className="flex-1 h-px bg-[#C9A96E]/30 mt-2" />
              </div>
              <h3 className="text-[#0A0A0A] text-base mb-3 leading-snug" style={{ fontFamily: 'Playfair Display, serif' }}>
                {f.title}
              </h3>
              <p className="text-[#7A736B] text-xs sm:text-sm font-light leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Gallery ─────────────────────────────────────────────────────────────────

const GALLERY = [
  { src: salonPhoto3, alt: 'Hair styling at Marina & I', tall: true },
  { src: salonPhoto2, alt: 'Bridal makeup look', tall: false },
  { src: 'https://images.unsplash.com/photo-1604654894611-6973b376cbde?w=600&h=420&fit=crop&auto=format', alt: 'Nail art', tall: false },
  { src: salonPhoto4, alt: 'Salon interior', tall: true },
  { src: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&h=420&fit=crop&auto=format', alt: 'Blowout session', tall: false },
  { src: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=420&fit=crop&auto=format', alt: 'Facial treatment', tall: false },
]

function Gallery() {
  const { t } = useLang()
  const g = t.gallery
  const [hov, setHov] = useState<number | null>(null)

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-[#F6F3EE]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className={`flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-5 ${t.dir === 'rtl' ? 'sm:flex-row-reverse' : ''}`}>
          <div className={t.dir === 'rtl' ? 'text-right' : ''}>
            <div className={`flex items-center gap-4 mb-4 ${t.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <div className="h-px w-10 bg-[#C9A96E]" />
              <span className="text-[#C9A96E] text-[10px] tracking-[0.35em] uppercase font-medium">{g.tag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0A0A0A]" style={{ fontFamily: 'Playfair Display, serif' }}>
              {g.heading}
            </h2>
          </div>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-medium text-[#0A0A0A] border-b border-[#0A0A0A] pb-1 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-all duration-300 ${t.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <IGIcon />
            {g.instagram}
          </a>
        </div>

        {/* Masonry columns */}
        <div className="columns-2 md:columns-3 gap-3 space-y-3">
          {GALLERY.map((item, i) => (
            <div key={i} className="break-inside-avoid relative overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}>
              <img src={item.src as string} alt={item.alt}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className={`absolute inset-0 bg-black/35 flex items-end p-4 transition-opacity duration-300 ${hov === i ? 'opacity-100' : 'opacity-0'}`}>
                <span className="text-white text-[10px] tracking-[0.2em] uppercase font-medium">{item.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

function Reviews() {
  const { t } = useLang()
  const r = t.reviews

  return (
    <section id="reviews" className="py-24 lg:py-32 bg-[#0A0A0A]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-10 bg-[#C9A96E]" />
            <span className="text-[#C9A96E] text-[10px] tracking-[0.35em] uppercase font-medium">Google Reviews</span>
            <div className="h-px w-10 bg-[#C9A96E]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            {r.heading}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <Stars n={5} />
            <span className="text-white/35 text-xs font-light ml-2">{r.sub}</span>
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10 ${t.dir === 'rtl' ? 'md:flex md:flex-row-reverse' : ''}`}>
          {r.items.map((rev, i) => (
            <div key={i} className={`p-8 lg:p-10 border-b md:border-b-0 ${t.dir === 'rtl' ? 'border-l' : 'border-r'} border-white/10 last:border-0 relative ${t.dir === 'rtl' ? 'text-right flex-1' : ''}`}>
              {/* Quote */}
              <div className={`absolute top-7 ${t.dir === 'rtl' ? 'left-8' : 'right-8'} text-5xl text-[#C9A96E]/15 leading-none`}
                style={{ fontFamily: 'Playfair Display, serif' }}>"</div>

              <Stars n={5} />
              <p className="text-white/55 text-sm font-light leading-relaxed mt-5 mb-7">
                "{rev.text}"
              </p>
              <div className={`border-t border-white/10 pt-5 flex items-center justify-between ${t.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <div>
                  <p className="text-white text-sm font-medium tracking-wide">{rev.name}</p>
                  <p className="text-white/30 text-xs font-light mt-0.5">{rev.date}</p>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[#C9A96E] text-xs font-medium">
                  {rev.name[0]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Booking CTA ─────────────────────────────────────────────────────────────

function BookingCTA() {
  const { t } = useLang()
  const c = t.cta

  return (
    <section className="py-24 bg-[#0C0C0C] border-t border-white/10 relative overflow-hidden">
      {/* Decorative diagonal lines */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(201,169,110,.8) 40px,rgba(201,169,110,.8) 41px)' }} />

      <div className={`max-w-screen-xl mx-auto px-6 lg:px-10 text-center ${t.dir === 'rtl' ? 'text-right sm:text-center' : ''}`}>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-14 bg-[#C9A96E]/40" />
          <div className="w-1.5 h-1.5 bg-[#C9A96E] rotate-45" />
          <div className="h-px w-14 bg-[#C9A96E]/40" />
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white mb-8 leading-tight"
          style={{ fontFamily: 'Playfair Display, serif' }}>
          {c.heading}
        </h2>

        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${t.dir === 'rtl' ? 'sm:flex-row-reverse' : ''}`}>
          <a href="tel:+96277710030"
            className="inline-flex items-center px-10 py-4 border border-white text-white text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:bg-white hover:text-[#0A0A0A] w-full sm:w-auto justify-center">
            {c.btn}
          </a>
          <WaBtn label={c.whatsapp} cls="w-full sm:w-auto justify-center" />
        </div>
      </div>
    </section>
  )
}

// ─── Contact ─────────────────────────────────────────────────────────────────

function Contact() {
  const { t } = useLang()
  const c = t.contact

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start ${t.dir === 'rtl' ? 'lg:flex lg:flex-row-reverse' : ''}`}>
          {/* Info */}
          <div className={`flex-1 min-w-0 ${t.dir === 'rtl' ? 'text-right' : ''}`}>
            <div className={`flex items-center gap-4 mb-5 ${t.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <div className="h-px w-10 bg-[#C9A96E]" />
              <span className="text-[#C9A96E] text-[10px] tracking-[0.35em] uppercase font-medium">{c.tag}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#0A0A0A] mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
              {c.heading}
            </h2>
            <p className="text-[#C9A96E] text-sm tracking-[0.2em] uppercase font-light mb-10">{c.sub}</p>

            <div className="space-y-7 mb-10">
              {[
                {
                  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                  label: t.dir === 'rtl' ? 'العنوان' : 'Address',
                  val: c.address,
                },
                {
                  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
                  label: t.dir === 'rtl' ? 'الهاتف' : 'Phone',
                  val: c.phone,
                },
                {
                  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                  label: t.dir === 'rtl' ? 'ساعات العمل' : 'Opening Hours',
                  val: `${c.hours1} / ${c.hours2}`,
                },
              ].map(row => (
                <div key={row.label} className={`flex items-start gap-4 ${t.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-9 h-9 shrink-0 border border-[#E8E4DE] flex items-center justify-center text-[#C9A96E]">
                    {row.icon}
                  </div>
                  <div>
                    <p className="text-[#0A0A0A] text-xs tracking-[0.15em] uppercase font-medium mb-1">{row.label}</p>
                    <p className="text-[#7A736B] text-sm font-light">{row.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className={`flex flex-wrap gap-3 mb-8 ${t.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white text-[11px] tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:bg-[#C9A96E]">
                {c.directions}
              </a>
              <WaBtn label={c.whatsapp} />
            </div>

            {/* Social row */}
            <div className={`flex items-center gap-4 ${t.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <span className="text-[#9A9390] text-[10px] tracking-[0.25em] uppercase font-medium">{c.follow}</span>
              <div className="h-px flex-1 bg-[#E8E4DE]" />
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"
                className="text-[#0A0A0A] hover:text-[#C9A96E] transition-colors"><IGIcon /></a>
            </div>
          </div>

          {/* Map + image stack */}
          <div className="flex-1 min-w-0 space-y-4">
            <div className="relative overflow-hidden bg-[#E8E4DE]" style={{ height: 360 }}>
              <iframe
                title="Marina & I location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384.2!2d35.9!3d31.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDU3JzAwLjAiTiAzNcKwNTQnMDAuMCJF!5e0!3m2!1sen!2sjo!4v1700000000000!5m2!1sen!2sjo"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" className="grayscale opacity-90"
              />
            </div>
            <div className="border border-[#E8E4DE] p-5 flex items-center justify-between">
              <div>
                <p className="text-[#0A0A0A] text-xs tracking-[0.15em] uppercase font-medium mb-0.5">MARINA &amp; I BEAUTY LOUNGE</p>
                <p className="text-[#9A9390] text-xs font-light">Ismail Abdo St., Amman</p>
              </div>
              <a href="tel:+96277710030" className="text-[#C9A96E] text-xs tracking-[0.1em] font-medium hover:underline">
                07 7771 0030
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const { t } = useLang()
  const f = t.footer

  return (
    <footer className="bg-[#0A0A0A] pt-14 pb-8">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12 ${t.dir === 'rtl' ? 'sm:flex sm:flex-row-reverse' : ''}`}>
          {/* Brand */}
          <div className={`sm:col-span-1 flex-1 min-w-0 ${t.dir === 'rtl' ? 'text-right' : ''}`}>
            <div className="w-20 h-20 bg-white overflow-hidden mb-5">
              <img src={logoImg} alt="Marina & I Beauty Lounge" className="w-full h-full object-cover" />
            </div>
            <p className="text-white/35 text-xs font-light leading-relaxed max-w-[200px]">{f.tagline}</p>
          </div>

          {/* Nav */}
          <div className={`flex-1 min-w-0 ${t.dir === 'rtl' ? 'text-right' : ''}`}>
            <h5 className="text-[#C9A96E] text-[10px] tracking-[0.3em] uppercase font-medium mb-5">
              {t.dir === 'rtl' ? 'الصفحات' : 'Navigate'}
            </h5>
            <ul className="space-y-3">
              {f.nav.map((label, i) => (
                <li key={label}>
                  <button onClick={() => document.getElementById(f.navIds[i])?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-white/40 text-xs font-light hover:text-white transition-colors">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className={`flex-1 min-w-0 ${t.dir === 'rtl' ? 'text-right' : ''}`}>
            <h5 className="text-[#C9A96E] text-[10px] tracking-[0.3em] uppercase font-medium mb-5">
              {t.dir === 'rtl' ? 'تواصلي' : 'Contact'}
            </h5>
            <ul className="space-y-3">
              <li><a href="tel:+96277710030" className="text-white/40 text-xs font-light hover:text-white transition-colors">07 7771 0030</a></li>
              <li><a href="https://wa.me/96277710030" target="_blank" rel="noopener noreferrer" className="text-white/40 text-xs font-light hover:text-white transition-colors">WhatsApp</a></li>
              <li><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-white/40 text-xs font-light hover:text-white transition-colors">Instagram</a></li>
              <li><span className="text-white/25 text-xs font-light">Amman, Jordan</span></li>
            </ul>
          </div>
        </div>

        <div className={`border-t border-white/8 pt-7 flex flex-col sm:flex-row items-center justify-between gap-3 ${t.dir === 'rtl' ? 'sm:flex-row-reverse' : ''}`}>
          <p className="text-white/20 text-[10px] tracking-wide font-light">{f.copyright}</p>
          <div className={`flex items-center gap-4 ${t.dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <a href="https://wa.me/96277710030" target="_blank" rel="noopener noreferrer"
              className="text-white/25 hover:text-[#25D366] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"
              className="text-white/25 hover:text-[#C9A96E] transition-colors"><IGIcon /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [lang, setLang] = useState<Lang>('en')
  const [active, setActive] = useState('home')
  const t = T[lang]

  useEffect(() => {
    document.documentElement.dir = t.dir
    document.documentElement.lang = lang
  }, [lang, t.dir])

  useEffect(() => {
    const ids = ['home', 'about', 'services', 'gallery', 'reviews', 'contact']
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.3 }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  return (
    <LangCtx.Provider value={{ t, lang, setLang }}>
      <div style={{ fontFamily: 'Outfit, sans-serif' }}>
        <TopBar />
        <Nav active={active} setActive={setActive} />
        <Hero />
        <About />
        <Services />
        <Why />
        <Gallery />
        <Reviews />
        <BookingCTA />
        <Contact />
        <Footer />
      </div>
    </LangCtx.Provider>
  )
}
