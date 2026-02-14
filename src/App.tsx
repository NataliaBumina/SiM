import { useState, useEffect, useRef } from "react";
import {
  HardHat,
  ClipboardCheck,
  Wrench,
  Users,
  Shield,
  BarChart3,
  FileText,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Building2,
  User,
  MessageCircle,
  ChevronDown,
  Star,
  Zap,
  Target,
  Clock,
  Package,
  Send,
  Menu,
  X,
  ChevronRight,
  Smartphone,
  Eye,
  Settings,
  BookOpen,
  Layers,
} from "lucide-react";
import { cn } from "@/utils/cn";

/* ─────────────────── Animated Counter ─────────────────── */
function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─────────────────── Section Wrapper ─────────────────── */
function Section({ id, className, children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={cn("relative py-20 md:py-28", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

/* ─────────────────── Pain Point Card ─────────────────── */
function PainCard({ icon: Icon, text, delay }: { icon: React.ElementType; text: string; delay: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-all duration-700 hover:shadow-xl hover:shadow-orange-100/50 hover:-translate-y-1",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-orange-50 to-amber-50 transition-transform group-hover:scale-150" />
      <div className="relative flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-200">
          <Icon size={20} />
        </div>
        <p className="text-sm leading-relaxed text-slate-700 md:text-base">{text}</p>
      </div>
    </div>
  );
}

/* ─────────────────── Feature Card ─────────────────── */
function FeatureCard({ icon: Icon, title, desc, color }: { icon: React.ElementType; title: string; desc: string; color: string }) {
  const colors: Record<string, string> = {
    blue: "from-blue-500 to-indigo-600 shadow-blue-200",
    green: "from-emerald-500 to-teal-600 shadow-emerald-200",
    purple: "from-violet-500 to-purple-600 shadow-violet-200",
    orange: "from-orange-500 to-amber-600 shadow-orange-200",
    cyan: "from-cyan-500 to-sky-600 shadow-cyan-200",
    rose: "from-rose-500 to-pink-600 shadow-rose-200",
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-slate-50 to-slate-100 transition-transform group-hover:scale-[2]" />
      <div className="relative">
        <div className={cn("mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg", colors[color])}>
          <Icon size={26} />
        </div>
        <h3 className="mb-2 text-lg font-bold text-slate-900">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-600">{desc}</p>
      </div>
    </div>
  );
}

/* ─────────────────── Main App ─────────────────── */
export function App() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ org: "", name: "", phone: "", city: "", activity: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError(false);

    const mailtoSubject = encodeURIComponent('Заявка СтройконтрольИмастер — ' + formData.org);
    const mailtoBody = encodeURIComponent(
      `Новая заявка с сайта СтройконтрольИмастер\n\n` +
      `Организация: ${formData.org}\n` +
      `ФИО: ${formData.name}\n` +
      `Телефон: ${formData.phone}\n` +
      `Город: ${formData.city}\n` +
      `Вид деятельности: ${formData.activity}\n` +
      `${formData.message ? `\nСообщение:\n${formData.message}` : ''}`
    );

    let sent = false;

    try {
      const response = await fetch('https://formsubmit.co/ajax/timurshingareev@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: 'Заявка СтройконтрольИмастер — ' + formData.org,
          'Организация': formData.org,
          'ФИО': formData.name,
          'Телефон': formData.phone,
          'Город': formData.city,
          'Вид деятельности': formData.activity,
          'Сообщение': formData.message || '(не указано)'
        })
      });
      if (response.ok) {
        sent = true;
      }
    } catch (err) {
      console.log('FormSubmit failed, trying mailto fallback...');
    }

    if (!sent) {
      window.location.href = `mailto:timurshingareev@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    }

    setSending(false);
    setSubmitted(true);
  };

  const navLinks = [
    { label: "О приложении", id: "about" },
    { label: "Проблемы", id: "problems" },
    { label: "Возможности", id: "features" },
    { label: "Участие", id: "participate" },
    { label: "Контакты", id: "contact" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      {/* ────────── HEADER ────────── */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "bg-white/90 shadow-lg shadow-slate-100/50 backdrop-blur-xl" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-200">
              <HardHat size={22} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-lg font-extrabold tracking-tight text-transparent">Стройконтроль</span>
              <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-lg font-extrabold tracking-tight text-transparent">Имастер</span>
            </div>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-orange-50 hover:text-orange-600"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("contact")}
              className="hidden rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition-all hover:shadow-xl hover:shadow-orange-300 hover:-translate-y-0.5 md:block"
            >
              Связаться с нами
            </button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="rounded-lg p-2 text-slate-700 md:hidden">
              {mobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="border-t border-slate-100 bg-white/95 backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-orange-50 hover:text-orange-600"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="mt-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 text-sm font-semibold text-white"
              >
                Связаться с нами
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ────────── HERO ────────── */}
      <section id="hero" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* decorative */}
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-[100px]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-60" />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 pt-20 sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 backdrop-blur-sm">
            <Zap size={16} className="text-orange-400" />
            <span className="text-sm font-medium text-orange-300">Приложение в разработке — участвуйте!</span>
          </div>

          <h1 className="max-w-5xl text-center text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Стройконтроль</span>
            <span className="text-orange-400">И</span>
            <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">мастер</span>
          </h1>

          <p className="mt-6 max-w-3xl text-center text-lg leading-relaxed text-slate-300 sm:text-xl md:text-2xl">
            Цифровой помощник для строительства: лёгкий операционный контроль, учёт материалов и инструмента, координация всех участников
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:gap-4 md:mt-10">
            {[
              { icon: ClipboardCheck, text: "Контроль" },
              { icon: Wrench, text: "Учёт" },
              { icon: Users, text: "Координация" },
              { icon: Shield, text: "Технология" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                <item.icon size={18} className="text-orange-400" />
                <span className="text-sm font-medium text-white">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row md:mt-12">
            <button
              onClick={() => scrollTo("contact")}
              className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-orange-500/30 transition-all hover:shadow-orange-500/50 hover:-translate-y-1"
            >
              Принять участие
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="flex items-center gap-2 rounded-2xl border border-white/20 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10"
            >
              Узнать больше
              <ChevronDown size={20} />
            </button>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown size={28} className="text-slate-500" />
          </div>
        </div>
      </section>

      {/* ────────── ABOUT ────────── */}
      <Section id="about" className="bg-gradient-to-b from-white to-slate-50">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600">
            <Target size={16} />
            О приложении
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Оцифруем <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">хаос</span> на стройке
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Работа с ручкой и блокнотом, группами в WhatsApp или Telegram — это не инструмент уже давно. Мы создаём приложение, которое изменит подход к управлению строительством.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Eye, title: "Операционный контроль", desc: "Лёгкий контроль для технадзора и мастера. Все процессы на ладони — от предписаний до исполнения.", color: "blue" },
            { icon: Package, title: "Учёт материалов", desc: "Учёт инструмента, расходников и основного материала. Контроль лимитов и заявок.", color: "green" },
            { icon: Users, title: "Координация участников", desc: "Лёгкая координация всех участников строительства — от бригадира до директора.", color: "purple" },
            { icon: BookOpen, title: "Соблюдение технологии", desc: "Помощь в соблюдении технологии строительства. Не дадим забыть ни одного пункта.", color: "orange" },
            { icon: FileText, title: "Исполнительная документация", desc: "Своевременная укомплектованность исполнительной документации в цифровом формате.", color: "cyan" },
            { icon: Settings, title: "Протоколы и задачи", desc: "Ведение протоколов совещаний, контроль задач и временных регламентов сотрудников.", color: "rose" },
          ].map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </Section>

      {/* ────────── STATS ────────── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-16">
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-orange-500/5 to-transparent" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4 sm:px-6 lg:px-8">
          {[
            { value: 15, suffix: "+", label: "Лет опыта в строительстве" },
            { value: 100, suffix: "+", label: "Решаемых проблем" },
            { value: 50, suffix: "+", label: "Функций приложения" },
            { value: 24, suffix: "/7", label: "Контроль процессов" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-extrabold text-orange-400 md:text-5xl">
                <AnimatedCounter end={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-sm text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ────────── PROBLEMS ────────── */}
      <Section id="problems" className="bg-gradient-to-b from-slate-50 to-white">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
            <AlertTriangle size={16} />
            Знакомые проблемы?
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            «Боли» строительного <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">процесса</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Когда всё держится на «одном» человеке — это не система. Заболел, уволился, ушёл в отпуск — и все «головняки» на директоре.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: ClipboardCheck, text: "Регламент не выполняется сотрудниками — нет контроля и фиксации нарушений" },
            { icon: AlertTriangle, text: "Предписания игнорируются — нет системы отслеживания реакции и устранения замечаний" },
            { icon: Package, text: "Нет чёткого учёта выдачи расходников и основного материала — постоянные потери" },
            { icon: BarChart3, text: "Заявки несвоевременны, перерасход по лимиткам — деньги утекают" },
            { icon: FileText, text: "Исполнительная документация не укомплектована и сдаётся с задержками" },
            { icon: Calendar, text: "Протоколы совещаний не ведутся, задачи не фиксируются и не контролируются" },
            { icon: Clock, text: "Временной регламент не соблюдается — опоздания, простои, срывы сроков" },
            { icon: Shield, text: "Пункты договора с заказчиком не отслеживаются — риск штрафов и конфликтов" },
            { icon: Target, text: "Работа геодезиста не синхронизирована с общим графиком строительства" },
            { icon: Users, text: "Координация между бригадами и подрядчиками — хаос в мессенджерах" },
            { icon: Layers, text: "Технология строительства нарушается — нет напоминаний и чек-листов" },
            { icon: Smartphone, text: "Ручка, блокнот и WhatsApp — это не инструмент управления стройкой" },
          ].map((p, i) => (
            <PainCard key={i} icon={p.icon} text={p.text} delay={i * 80} />
          ))}
        </div>
      </Section>

      {/* ────────── FEATURES / WHAT WE OFFER ────────── */}
      <Section id="features" className="bg-gradient-to-b from-white to-orange-50/30">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-600">
              <CheckCircle2 size={16} />
              Что мы предлагаем
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Наш <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">15-летний опыт</span> + ваши пожелания
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Мы объединяем реальный опыт в строительстве с современными технологиями, чтобы создать по-настоящему полезный инструмент.
            </p>

            <div className="mt-8 space-y-5">
              {[
                { icon: Star, text: "15 лет реального опыта в строительстве, заложенного в логику приложения" },
                { icon: Zap, text: "Доступ к тестированию приложения на этапе разработки" },
                { icon: CheckCircle2, text: "Бесплатное пользование приложением по окончании тестирования" },
                { icon: Users, text: "Учёт ваших конкретных пожеланий и болей при разработке" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-200">
                    <item.icon size={18} />
                  </div>
                  <p className="pt-1.5 text-slate-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Phone mockup */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-orange-400/20 to-amber-400/20 blur-2xl" />
              <div className="relative w-72 rounded-[2.5rem] border-[8px] border-slate-800 bg-slate-900 p-1 shadow-2xl sm:w-80">
                <div className="absolute left-1/2 top-4 h-6 w-24 -translate-x-1/2 rounded-full bg-slate-800" />
                <div className="overflow-hidden rounded-[2rem] bg-gradient-to-b from-orange-50 to-white">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-5 pb-5 pt-10">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                        <HardHat size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-orange-100">Добро пожаловать</p>
                        <p className="text-sm font-bold text-white">СтройконтрольИмастер</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 p-4">
                    {[
                      { icon: ClipboardCheck, label: "Операционный контроль", badge: "3" },
                      { icon: Wrench, label: "Учёт инструмента", badge: "" },
                      { icon: Package, label: "Материалы и заявки", badge: "5" },
                      { icon: FileText, label: "Документация", badge: "" },
                      { icon: Users, label: "Координация", badge: "2" },
                      { icon: Calendar, label: "Совещания", badge: "1" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 transition-colors hover:bg-orange-50">
                        <div className="flex items-center gap-3">
                          <item.icon size={18} className="text-orange-500" />
                          <span className="text-xs font-medium text-slate-700">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.badge && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight size={14} className="text-slate-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ────────── PARTICIPATION ────────── */}
      <Section id="participate" className="bg-gradient-to-b from-orange-50/30 to-white">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-600">
            <Users size={16} />
            Приглашение
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Примите <span className="bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">участие</span> в разработке
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600">
            Руководители строительных организаций и технадзоров — поделитесь с нами всей своей «болью». Ваш опыт поможет создать по-настоящему полезное приложение.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {/* From You */}
          <div className="relative overflow-hidden rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 p-8 md:p-10">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-orange-200/30 blur-2xl" />
            <div className="relative">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
                <MessageCircle size={16} />
                От вас
              </div>
              <ul className="space-y-4">
                {[
                  "Поделитесь всей «болью» в процессе строительства",
                  "Расскажите о проблемах с регламентами и предписаниями",
                  "Опишите сложности учёта материалов и инструмента",
                  "Укажите проблемы с документацией и совещаниями",
                  "Всё, что считаете нужным оцифровать",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white">
                      <ChevronRight size={12} />
                    </div>
                    <span className="text-sm text-slate-700 md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* From Us */}
          <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-8 md:p-10">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-200/30 blur-2xl" />
            <div className="relative">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                <CheckCircle2 size={16} />
                От нас
              </div>
              <ul className="space-y-4">
                {[
                  "15 лет опыта в строительстве + ваши пожелания",
                  "Доступ к тестированию приложения",
                  "Бесплатное пользование после завершения теста",
                  "Приложение уже в активной разработке",
                  "Удобный помощник для мастеров, прорабов и бригадиров",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <CheckCircle2 size={12} />
                    </div>
                    <span className="text-sm text-slate-700 md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ────────── QUOTE ────────── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-amber-500 py-16 md:py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <AlertTriangle size={32} className="text-white" />
          </div>
          <blockquote className="text-xl font-bold leading-relaxed text-white sm:text-2xl md:text-3xl">
            «Когда всё держится на одном человеке на объекте — это не система. Заболел, уволился, ушёл в отпуск, выгорел — и все "головняки" на директоре или руководителях, а им надо заниматься своей работой.»
          </blockquote>
          <div className="mt-8">
            <button
              onClick={() => scrollTo("contact")}
              className="group inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-orange-600 shadow-2xl shadow-orange-600/20 transition-all hover:-translate-y-1"
            >
              Давайте это изменим
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* ────────── CONTACT FORM ────────── */}
      <Section id="contact" className="bg-gradient-to-b from-white to-slate-50">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            <Send size={16} />
            Связаться
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Отправьте <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">сообщение</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Заполните форму — мы свяжемся с вами для обсуждения участия в проекте
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          {submitted ? (
            <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-12 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 shadow-xl shadow-emerald-200">
                <CheckCircle2 size={40} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Спасибо за обращение!</h3>
              <p className="mt-3 text-slate-600">Мы свяжемся с вами в ближайшее время для обсуждения деталей участия в проекте.</p>
              <button
                onClick={() => { setSubmitted(false); setFormData({ org: "", name: "", phone: "", city: "", activity: "", message: "" }); }}
                className="mt-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition-all hover:-translate-y-0.5"
              >
                Отправить ещё
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-100/50 md:p-12">
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  { name: "org" as const, label: "Название организации", icon: Building2, span: 2 },
                  { name: "name" as const, label: "ФИО контактного лица", icon: User, span: 1 },
                  { name: "phone" as const, label: "Телефон (ТГ или WhatsApp)", icon: Phone, span: 1 },
                  { name: "city" as const, label: "Город", icon: MapPin, span: 1 },
                  { name: "activity" as const, label: "Вид деятельности", icon: HardHat, span: 1 },
                ].map((field) => (
                  <div key={field.name} className={field.span === 2 ? "sm:col-span-2" : ""}>
                    <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700">
                      <field.icon size={14} className="text-slate-400" />
                      {field.label}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData[field.name]}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                      placeholder={field.label}
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700">
                    <MessageCircle size={14} className="text-slate-400" />
                    Ваше сообщение / описание проблем
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                    placeholder="Расскажите о вашей «боли» в строительных процессах, какие задачи нужно оцифровать..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={sending}
                className={cn(
                  "group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-orange-200 transition-all hover:shadow-2xl hover:shadow-orange-300 hover:-translate-y-0.5",
                  sending && "opacity-70 cursor-not-allowed"
                )}
              >
                <Send size={20} />
                {sending ? "Отправка..." : "Отправить сообщение"}
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </button>

              {sendError && (
                <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-4 text-center text-sm text-red-600">
                  Произошла ошибка при отправке. Пожалуйста, свяжитесь с нами напрямую через почту или Telegram.
                </div>
              )}

              <p className="mt-4 text-center text-xs text-slate-400">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </form>
          )}

          {/* Direct contacts */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
            <a
              href="mailto:timurshingareev@gmail.com"
              className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-6 py-4 shadow-sm transition-all hover:shadow-lg hover:border-orange-200 hover:-translate-y-0.5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-200">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400">Электронная почта</p>
                <p className="text-sm font-semibold text-slate-800 group-hover:text-orange-600 transition-colors">timurshingareev@gmail.com</p>
              </div>
            </a>
            <a
              href="https://t.me/tshingareev"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-6 py-4 shadow-sm transition-all hover:shadow-lg hover:border-orange-200 hover:-translate-y-0.5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-500 text-white shadow-lg shadow-sky-200">
                <Send size={18} />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400">Telegram</p>
                <p className="text-sm font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">@tshingareev</p>
              </div>
            </a>
          </div>
        </div>
      </Section>

      {/* ────────── FOOTER ────────── */}
      <footer className="border-t border-slate-100 bg-slate-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500">
                <HardHat size={20} className="text-white" />
              </div>
              <div>
                <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-lg font-extrabold text-transparent">Стройконтроль</span>
                <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-lg font-extrabold text-transparent">Имастер</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
              <a
                href="mailto:timurshingareev@gmail.com"
                className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-orange-400"
              >
                <Mail size={16} />
                <span>timurshingareev@gmail.com</span>
              </a>
              <a
                href="https://t.me/tshingareev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-orange-400"
              >
                <Send size={16} />
                <span>@tshingareev</span>
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} СтройконтрольИмастер. Приложение в разработке. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
