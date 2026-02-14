import React, { useState, useEffect, useRef } from 'react';
import { HardHat, ClipboardCheck, Wrench, Users, Shield, BarChart3, FileText, Calendar, AlertTriangle, CheckCircle2, ArrowRight, Phone, Mail, MapPin, Building2, User, MessageCircle, ChevronDown, Star, Zap, Target, Clock, Package, Send, Menu, X, ChevronRight, Smartphone, Eye, Settings, BookOpen, Layers } from 'lucide-react';
import { cn } from './utils/cn';

export function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg">
              <HardHat size={22} className="text-white" />
            </div>
            <span className="text-lg font-extrabold text-slate-900">Строй контроль</span>
            <span className="text-lg font-extrabold text-orange-500">Имастер</span>
          </div>
          <button className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg">
            Связь с нами
          </button>
        </div>
      </header>

      <main className="pt-20">
        <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400 bg-orange-500 bg-opacity-10 px-4 py-2">
                <Zap size={16} className="text-orange-400" />
                <span className="text-sm font-medium text-orange-300">Новое приложение для строительства</span>
              </div>
              <h1 className="max-w-5xl text-center text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Оцифруем</span>
                <span className="text-orange-400"> хаос </span>
                <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">на стройке</span>
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-center text-lg text-slate-300 sm:text-xl md:text-2xl">
                Работа с ручной и блокнотом, группами в WhatsApp или Telegram - это не инструмент уже давно. Мы создаём приложение, которое изменит подход к управлению строительством.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:mt-12">
                <button className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 text-lg font-bold text-white shadow-2xl transition-all hover:shadow-orange-500/50 hover:-translate-y-1">
                  Принять участие
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </button>
                <button className="flex items-center gap-2 rounded-2xl border border-white/20 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10">
                  Узнать больше
                  <ChevronDown size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
                <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Наши основные действия</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                Облегчаем процессы и делаем более спокойной и результативной работу наших сотрудников.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: ClipboardCheck, title: 'Контроль', desc: 'Лёгкий контроль для техназора и мастера' },
                { icon: Wrench, title: 'Учёт материалов', desc: 'Учёт инструмента, расходников и материала' },
                { icon: Users, title: 'Координация', desc: 'Лёгкая координация всех участников' },
                { icon: Shield, title: 'Надзор качества', desc: 'Надзор за качеством работ' },
                { icon: BarChart3, title: 'Аналитика', desc: 'Данные и статистика проекта' },
                { icon: FileText, title: 'Документирование', desc: 'Ведение документации проекта' },
              ].map((item, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className="relative">
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg">
                      <item.icon size={26} />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-white to-orange-50 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl mb-8">
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Свяжитесь с нами</span>
            </h2>
            <form className="mx-auto max-w-3xl space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <input type="text" placeholder="Ваше имя" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100" />
                <input type="email" placeholder="Email" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100" />
                <input type="tel" placeholder="Телефон" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100" />
                <input type="text" placeholder="Город" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100" />
              </div>
              <textarea placeholder="Ваше сообщение" rows={5} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100 resize-none" />
              <button type="submit" className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:shadow-2xl hover:-translate-y-0.5">
                <Send size={20} className="inline mr-2" />
                Отправить
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 bg-slate-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500">
                <HardHat size={20} className="text-white" />
              </div>
              <span className="text-lg font-extrabold text-white">Строй контроль<span className="text-orange-400">Имастер</span></span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Phone size={14} />
                <span>+7 (921) 957-50-77</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} />
                <span>info@stroycontrol.app</span>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} СтройконтрольИмастер. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
