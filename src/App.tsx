/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Flame, 
  Star, 
  ShieldAlert, 
  BookOpen, 
  Trophy, 
  User, 
  Home,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  X,
  Phone,
  Check,
  Edit,
  LogOut,
  RefreshCcw,
  Zap,
  Gamepad2,
  CircleDashed,
  Cpu,
  Wind
} from 'lucide-react';
import { AgeGroup, UserStats, Lesson, CrisisContact, Section, Technique } from './types';

// Mock data
const CRISIS_CONTACTS: CrisisContact[] = [
  { name: 'Línea 106', number: '106', description: 'Atención psicológica gratuita en Bogotá y Colombia.' },
  { name: 'Línea Salvavidas', number: '300 241 12 12', description: 'Atención en salud mental para jóvenes.' },
  { name: 'Emergencias', number: '123', description: 'Emergencia nacional única.' }
];

const SECTIONS: Section[] = [
  { id: 's1', title: 'Orígenes del Vacío', description: 'Introducción a la ansiedad y depresión.', theme: 'from-blue-900 to-bg-main' },
  { id: 's2', title: 'Ecos de la Mente', description: 'Entendiendo emociones internas.', theme: 'from-purple-900 to-bg-main' },
  { id: 's3', title: 'Arsenal del Héroe', description: 'Técnicas de regulación emocional.', theme: 'from-indigo-900 to-bg-main' },
  { id: 's4', title: 'Zona de Crisis', description: 'Manejo en momentos difíciles.', theme: 'from-rose-900 to-bg-main' },
];

const TECHNIQUES: Technique[] = [
  { id: 't1', name: 'Respiración Profunda', description: 'Inhala en 4, mantén 4, exhala 4.', icon: 'Wind', unlocked: true },
  { id: 't2', name: 'Grounding 5-4-3-2-1', description: 'Reconoce cosas a tu alrededor.', icon: 'Check', unlocked: false },
  { id: 't3', name: 'Lugar Seguro', description: 'Imagina un lugar que te de paz.', icon: 'Home', unlocked: false },
];

const INITIAL_LESSONS: Lesson[] = [
  // Section 1
  { 
    id: '1', 
    sectionId: 's1', 
    title: '¿Qué es la ansiedad?', 
    description: 'Aprende sobre esa sensación.', 
    type: 'general', 
    activityType: 'narrative',
    ageGroup: 'preteen', 
    completed: false, 
    order: 1,
    content: [
      { text: "¡Hola! Hoy vamos a hablar sobre la ansiedad.", image: "🦸" },
      { text: "¿Alguna vez has sentido mariposas en la panza o que tu corazón late rápido?", image: "🦋" },
      { text: "¡Eso es normal! Se llama ansiedad y es como una alarma que tenemos adentro.", image: "🚨" }
    ]
  },
  { 
    id: '2', 
    sectionId: 's1', 
    title: 'El Monstruo de la Bruma', 
    description: 'Un primer encuentro.', 
    type: 'npc', 
    activityType: 'quiz',
    ageGroup: 'preteen', 
    completed: false, 
    order: 2,
    content: [
      { 
        question: "¿Cómo se siente la ansiedad en el cuerpo?", 
        options: ["Paz total", "Corazón rápido o cosquilleo", "Ganas de dormir"], 
        correct: 1,
        feedback: "¡Exacto! Es una respuesta física de alerta."
      }
    ]
  },
  { 
    id: '3', 
    sectionId: 's1', 
    title: 'Nubes de tristeza', 
    description: 'Entendiendo la depresión.', 
    type: 'depression', 
    activityType: 'interactive',
    ageGroup: 'preteen', 
    completed: false, 
    order: 3,
    content: [
      { type: 'breathe', text: "Vamos a despejar las nubes. Respira conmigo.", steps: 3 }
    ]
  },
  { id: 'boss1', sectionId: 's1', title: 'Guardián del Umbral', description: 'Prueba final de inicio.', type: 'boss', activityType: 'quiz', ageGroup: 'preteen', completed: false, order: 4, content: [{ question: "¿Qué haces si la ansiedad es muy fuerte?", options: ["Huir", "Respirar y usar herramientas", "Gritar"], correct: 1, feedback: "¡Bien hecho! Tienes el control." }] },
  
  // Section 2
  { id: '4', sectionId: 's2', title: 'Ecos del Corazón', description: 'Escucha tus latidos.', type: 'anxiety', activityType: 'interactive', ageGroup: 'preteen', completed: false, order: 5, content: [{ type: 'grounding', text: "Busca 3 cosas rojas en tu habitación." }] },
  { id: '5', sectionId: 's2', title: 'El Espejo Sincero', description: 'Identifica lo que sientes.', type: 'general', activityType: 'quiz', ageGroup: 'preteen', completed: false, order: 6 },
  { id: 'boss2', sectionId: 's2', title: 'Rey de las Dudas', description: 'Vence la inseguridad.', type: 'boss', activityType: 'quiz', ageGroup: 'preteen', completed: false, order: 7 },
  
  // Section 3
  { id: '6', sectionId: 's3', title: 'Escudo Galáctico', description: 'Técnica de respiración.', type: 'general', activityType: 'interactive', ageGroup: 'preteen', completed: false, order: 8 },
  { id: '7', sectionId: 's3', title: 'Anclaje Estelar', description: 'Técnica de grounding.', type: 'general', activityType: 'interactive', ageGroup: 'preteen', completed: false, order: 9 },
  
  // Section 4
  { id: '8', sectionId: 's4', title: 'Luz de Emergencia', description: 'Qué hacer en crisis.', type: 'general', activityType: 'narrative', ageGroup: 'preteen', completed: false, order: 10 },
];

export default function App() {
  const [view, setView] = useState<'onboarding' | 'intro' | 'dashboard' | 'lesson' | 'achievements' | 'profile'>('onboarding');
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null);
  const [parentalConsent, setParentalConsent] = useState(false);
  const [stats, setStats] = useState<UserStats>({ 
    xp: 0, 
    streak: 1, 
    hearts: 99, 
    level: 1, 
    name: 'Cadete Espacial', 
    avatar: '👦', 
    bossesDefeated: 0 
  });
  const [lessons, setLessons] = useState<Lesson[]>(INITIAL_LESSONS);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [showCrisis, setShowCrisis] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem('mindhero_data');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.stats) setStats(data.stats);
        if (data.ageGroup) setAgeGroup(data.ageGroup);
        if (data.parentalConsent) {
          setParentalConsent(data.parentalConsent);
          if (view === 'onboarding') setView('dashboard');
        }
      } catch (e) {
        console.error("Error loading saved data", e);
      }
    }
  }, [view]);

  const save = (updatedStats = stats, updatedAge = ageGroup, updatedConsent = parentalConsent) => {
    localStorage.setItem('mindhero_data', JSON.stringify({ stats: updatedStats, ageGroup: updatedAge, parentalConsent: updatedConsent }));
  };

  const handleStartOnboarding = (age: AgeGroup) => {
    setAgeGroup(age);
  };

  const handleConsent = () => {
    setParentalConsent(true);
    setView('intro');
    save(stats, ageGroup, true);
  };

  const handleStartLesson = (lesson: Lesson) => {
    const prevLessonsDone = lessons.filter(l => l.order < lesson.order && !l.completed).length === 0;
    if (prevLessonsDone || lesson.order === 1) {
      setCurrentLesson(lesson);
      setView('lesson');
    }
  };

  const handleCompleteLesson = () => {
    const nextXp = stats.xp + 50;
    const isBoss = currentLesson?.type === 'boss';
    const nextStats = { 
      ...stats, 
      xp: nextXp, 
      bossesDefeated: stats.bossesDefeated + (isBoss ? 1 : 0),
      level: Math.floor(nextXp / 500) + 1
    };
    setStats(nextStats);
    setLessons(prev => prev.map(l => l.id === currentLesson?.id ? { ...l, completed: true } : l));
    setView('dashboard');
    save(nextStats);
  };

  const handleReset = () => {
    localStorage.removeItem('mindhero_data');
    setStats({ xp: 0, streak: 1, hearts: 99, level: 1, name: 'Cadete Espacial', avatar: '👦', bossesDefeated: 0 });
    setAgeGroup(null);
    setParentalConsent(false);
    setView('onboarding');
  };

  const handleLogout = () => {
    setView('onboarding');
    setAgeGroup(null);
    setParentalConsent(false);
    // Clear parental consent from local storage to ensure flow restart
    const saved = localStorage.getItem('mindhero_data');
    if (saved) {
      const data = JSON.parse(saved);
      localStorage.setItem('mindhero_data', JSON.stringify({ ...data, parentalConsent: false, ageGroup: null }));
    }
  };

  const updateProfile = (name: string, avatar: string) => {
    const nextStats = { ...stats, name, avatar };
    setStats(nextStats);
    save(nextStats);
    setShowEditProfile(false);
  };

  return (
    <div className="min-h-screen bg-bg-main flex flex-col items-center justify-start overflow-x-hidden border-8 border-bg-space relative">
      <StarsBackground />
      
      <AnimatePresence mode="wait">
        {view === 'onboarding' && (
          <Onboarding key="onboarding" onStart={handleStartOnboarding} ageGroup={ageGroup as AgeGroup | null} onConsent={handleConsent} />
        )}

        {view === 'intro' && (
          <IntroNarrative key="intro" onComplete={() => setView('dashboard')} />
        )}

        {view === 'dashboard' && (
          <Dashboard 
            key="dashboard" 
            stats={stats} 
            lessons={lessons} 
            onStartLesson={handleStartLesson}
            ageGroup={ageGroup}
            onNavigate={(v) => setView(v as any)}
          />
        )}

        {view === 'achievements' && (
          <AchievementsView 
            key="achievements" 
            stats={stats} 
            lessons={lessons} 
            onBack={() => setView('dashboard')} 
          />
        )}

        {view === 'profile' && (
          <ProfileView 
            key="profile" 
            stats={stats} 
            onEdit={() => setShowEditProfile(true)}
            onReset={handleReset}
            onLogout={handleLogout}
            onBack={() => setView('dashboard')} 
          />
        )}

        {view === 'lesson' && currentLesson && (
          <LessonView 
            key="lesson" 
            lesson={currentLesson} 
            hearts={stats.hearts}
            onClose={() => setView('dashboard')} 
            onComplete={handleCompleteLesson}
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-8 right-8 flex items-center group z-50">
        <div className="bg-white rounded-2xl shadow-2xl p-4 mr-4 border-2 border-red-100 opacity-0 lg:group-hover:opacity-100 transition-opacity">
          <p className="text-xs font-black text-accent-rose">¿AYUDA YA?</p>
          <p className="text-[10px] text-slate-500 font-bold italic">Llama a la Línea 106</p>
        </div>
        <motion.button 
          id="crisis-button"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setShowCrisis(true)}
          className="w-20 h-20 bg-accent-rose hover:bg-rose-600 rounded-full border-b-8 border-rose-800 flex flex-col items-center justify-center text-white shadow-2xl transition-transform active:translate-y-1 active:border-b-0"
        >
          <span className="text-3xl">🆘</span>
          <span className="text-[10px] font-black uppercase">Sos</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {showCrisis && <CrisisModal contacts={CRISIS_CONTACTS} onClose={() => setShowCrisis(false)} />}
        {showEditProfile && <EditProfileModal currentName={stats.name} currentAvatar={stats.avatar} onSave={updateProfile} onClose={() => setShowEditProfile(false)} />}
      </AnimatePresence>
    </div>
  );
}

function StarsBackground() {
  return (
    <div className="stars-container">
      {[...Array(50)].map((_, i) => (
        <div 
          key={i} 
          className="star" 
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3}px`,
            height: `${Math.random() * 3}px`,
            ['--duration' as any]: `${2 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );
}

// Sub-components

function IntroNarrative({ onComplete }: { onComplete: () => void, key?: string }) {
  const [step, setStep] = useState(0);
  const narrative = [
    { text: "En un universo donde las emociones pueden destruir mundos...", image: "🌌" },
    { text: "Soy un viajero de una galaxia lejana. Mi hogar fue devastado por la Ansiedad y la Depresión.", image: "👤" },
    { text: "He venido a la Tierra buscando aliados para reconstruir la paz emocional.", image: "🏠" },
    { text: "Tú tienes el potencial de ser un MindHero. Juntos, recuperaremos el equilibrio.", image: "✨" },
    { text: "Aprenderás técnicas, vencerás sombras y desbloquearás tu verdadero poder.", image: "🛡️" }
  ];

  const handleNext = () => {
    if (step < narrative.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-bg-main z-50 flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="max-w-xl w-full">
        <motion.div 
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-bg-space rounded-[60px] p-12 border-4 border-brand-primary/30 shadow-2xl relative"
        >
          <div className="text-9xl mb-10">{narrative[step].image}</div>
          <p className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-relaxed mb-6">
            {narrative[step].text}
          </p>
        </motion.div>
        
        <div className="mt-12 flex justify-center gap-4">
           {narrative.map((_, i) => (
             <div key={i} className={`w-3 h-3 rounded-full ${i === step ? 'bg-brand-primary scale-125 shadow-[0_0_10px_#610094]' : 'bg-slate-700'} transition-all`} />
           ))}
        </div>

        <button 
          onClick={handleNext}
          className="mt-12 w-full py-6 bg-brand-primary text-white font-black text-xl rounded-2xl shadow-xl border-b-8 border-purple-800 hover:scale-105 transition-all active:translate-y-1 active:border-b-0 uppercase tracking-widest"
        >
          {step === narrative.length - 1 ? '¡Comenzar aventura!' : 'Siguiente'}
        </button>
      </div>
    </motion.div>
  );
}

function Onboarding({ onStart, ageGroup, onConsent }: { onStart: (age: AgeGroup) => void, ageGroup: AgeGroup | null, onConsent: () => void, key?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="max-w-md w-full px-6 py-12 flex flex-col items-center text-center bg-white border-8 border-gray-50 rounded-[48px] shadow-2xl mt-12 mb-12"
    >
      <div className="w-24 h-24 mb-8 bg-brand-primary rounded-[32px] flex items-center justify-center text-white shadow-xl shadow-blue-200 rotate-3 border-b-8 border-blue-700">
        <Star size={48} fill="currentColor" />
      </div>
      
      {!ageGroup ? (
        <>
          <h1 className="text-3xl md:text-4xl font-black mb-4 text-slate-800 tracking-tight uppercase">¡Hola! Soy MindHero</h1>
          <p className="text-slate-500 mb-10 text-lg font-bold">Tu compañero para descubrir el superpoder de tus emociones. ¿Cuántos años tienes?</p>
          
          <div className="grid gap-6 w-full">
            <AgeButton label="6 - 9 años" onClick={() => onStart('child')} color="bg-brand-success border-green-700" />
            <AgeButton label="10 - 12 años" onClick={() => onStart('preteen')} color="bg-brand-primary border-blue-700" />
            <AgeButton label="13 - 17 años" onClick={() => onStart('teen')} color="bg-slate-800 border-slate-900" />
          </div>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-black mb-4 text-slate-800 uppercase">Permiso de Padres</h2>
          <p className="text-slate-500 mb-8 font-bold">MindHero es un espacio seguro. De acuerdo con la Ley 1098 de Colombia, necesitamos el permiso de tus padres o guardianes.</p>
          
          <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-100 mb-8 text-left">
            <h3 className="font-black mb-2 flex items-center gap-2 text-slate-700 uppercase text-xs tracking-widest"><ShieldAlert size={16} className="text-accent-rose" /> Nota Ética</h3>
            <p className="text-sm text-slate-500 font-bold leading-relaxed">Esta app no reemplaza la terapia clínica. El contenido ha sido diseñado por psicólogos profesionales colombianos.</p>
          </div>

          <button 
            id="parent-consent-btn"
            onClick={onConsent}
            className="w-full py-5 bg-accent-amber text-slate-800 font-black rounded-3xl shadow-lg border-b-8 border-yellow-600 hover:scale-[1.02] transition-all active:scale-95 active:border-b-0 uppercase tracking-wide"
          >
            SOY EL PADRE Y ACEPTO
          </button>
        </>
      )}
      
      <div className="mt-8 pt-8 border-t-2 border-gray-50">
         <p className="text-[10px] text-slate-400 font-bold uppercase">Ley 1098 de 2006 · Colombia</p>
      </div>
    </motion.div>
  );
}

function AgeButton({ label, onClick, color }: { label: string, onClick: () => void, color: string }) {
  return (
    <button 
      onClick={onClick}
      className={`py-6 px-4 ${color} text-white font-black rounded-3xl text-xl shadow-lg border-b-8 hover:scale-[1.02] transition-all active:scale-95 active:border-b-0 uppercase tracking-tight`}
    >
      {label}
    </button>
  );
}

function Dashboard({ stats, lessons, onStartLesson, ageGroup, onNavigate }: { stats: UserStats, lessons: Lesson[], onStartLesson: (l: Lesson) => void, ageGroup: AgeGroup | null, onNavigate: (v: string) => void, key?: string }) {
  return (
    <div className="w-full h-full flex flex-col relative z-10">
      {/* Header */}
      <header className="h-20 bg-bg-space/80 backdrop-blur-md border-b-4 border-brand-primary/30 px-4 md:px-8 flex items-center justify-between shadow-lg z-10 sticky top-0">
        <div className="flex items-center space-x-3 md:space-x-6">
          <div className="bg-brand-primary p-2 md:p-3 rounded-2xl text-white shadow-lg shadow-purple-500/20">
            <Gamepad2 size={24} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg md:text-xl font-black text-white leading-none uppercase tracking-widest glow-text">MindHero</h1>
            <span className="text-[10px] font-bold text-accent-amber uppercase tracking-wider">Sector {stats.level} · {ageGroup === 'child' ? '6-9' : ageGroup === 'preteen' ? '10-12' : '13-17'} Años</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 md:space-x-6">
          <div className="hidden sm:flex items-center bg-brand-secondary/40 px-3 py-1.5 rounded-full border-2 border-brand-primary/50 text-white">
            <Flame size={16} className="text-orange-500 mr-2" fill="currentColor" />
            <span className="font-black text-sm uppercase italic">{stats.streak} D</span>
          </div>
          <div className="flex items-center bg-brand-secondary/40 px-3 py-1.5 rounded-full border-2 border-brand-primary/50 text-white">
            <Zap size={16} className="text-accent-amber mr-2" fill="currentColor" />
            <span className="font-black text-sm uppercase tracking-tight">{stats.xp} EXP</span>
          </div>
          <button 
            onClick={() => onNavigate('profile')}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-brand-primary shadow-md bg-brand-secondary flex items-center justify-center overflow-hidden hover:scale-110 transition-transform"
          >
            <span className="text-2xl">{stats.avatar}</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden h-screen relative">
        <nav className="hidden lg:flex w-24 border-r-4 border-brand-primary/30 bg-bg-space/50 backdrop-blur-sm flex-col items-center py-8 space-y-8">
          <NavButton icon={<Home size={28} />} label="Mapa" active onClick={() => onNavigate('dashboard')} />
          <NavButton icon={<Trophy size={28} />} label="Logros" onClick={() => onNavigate('achievements')} />
          <NavButton icon={<User size={28} />} label="Perfil" onClick={() => onNavigate('profile')} />
        </nav>

        <main className="flex-1 overflow-y-auto px-4 pb-32">
          <div className="max-w-xl mx-auto mt-8">
            {SECTIONS.map((section, sIdx) => {
              const sectionLessons = lessons.filter(l => l.sectionId === section.id);
              return (
                <section key={section.id} className="mb-20">
                  {/* Section Title */}
                  <div className={`mb-10 text-center p-8 bg-gradient-to-b ${section.theme} rounded-3xl border-b-8 border-brand-primary/40 relative overflow-hidden`}>
                     <div className="relative z-10">
                        <p className="text-[10px] font-black text-accent-amber uppercase tracking-[0.3em] mb-2">Sección {sIdx + 1}</p>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2 glow-text">{section.title}</h2>
                        <p className="text-xs font-bold text-slate-300 italic">{section.description}</p>
                     </div>
                  </div>

                  {/* Nodes for this section */}
                  <div className="flex flex-col items-center space-y-16 relative">
                    {/* Visual Connection line could be added here */}
                    {sectionLessons.map((lesson, lIdx) => {
                      const isLocked = lIdx > 0 && !sectionLessons[lIdx - 1]?.completed && !lesson.completed;
                      return (
                        <div key={lesson.id} className="relative group">
                          {/* Connection line fragment */}
                          {lIdx < sectionLessons.length - 1 && (
                            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-1.5 h-16 bg-brand-primary/20 -z-10" />
                          )}
                          
                          <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: lIdx * 0.1 }}
                            onClick={() => !isLocked && onStartLesson(lesson)}
                            className={`
                              w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-2xl relative z-10 transition-all
                              ${lesson.completed 
                                ? 'bg-brand-success border-b-8 border-green-700 text-white shadow-green-500/30' 
                                : isLocked 
                                  ? 'bg-slate-800 border-b-8 border-slate-900 text-slate-600 opacity-60'
                                  : 'bg-brand-primary border-b-8 border-purple-800 text-white shadow-purple-500/30 glow-text ring-4 ring-purple-500/20'}
                              ${lIdx % 2 === 0 ? '-translate-x-10' : 'translate-x-10'}
                              hover:scale-110 active:translate-y-1 active:border-b-0
                            `}
                          >
                            <span className="text-3xl mb-1">
                              {lesson.type === 'boss' ? '👿' : lesson.type === 'npc' ? '🤖' : '🪐'}
                            </span>
                            {lesson.completed ? <Check size={20} className="font-black" /> : null}
                          </motion.button>
                          
                          {/* Current label */}
                          {!lesson.completed && !isLocked && (
                            <div className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent-amber text-black font-black rounded-lg text-[9px] uppercase tracking-widest whitespace-nowrap animate-pulse`}>
                              En Curso
                            </div>
                          )}

                          <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 text-center w-40 ${lIdx % 2 === 0 ? '-translate-x-2' : 'translate-x-2'}`}>
                            <p className={`text-[10px] font-black uppercase tracking-widest ${lesson.completed ? 'text-slate-400' : isLocked ? 'text-slate-600' : 'text-slate-200'}`}>
                              {lesson.title}
                            </p>
                          </div>

                          {/* Decorative Monster for Boss */}
                          {lesson.type === 'boss' && !lesson.completed && (
                            <div className="absolute -right-20 top-0 text-4xl animate-bounce">👾</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </main>
      </div>

      {/* Mobile Footer */}
      <footer className="lg:hidden fixed bottom-0 left-0 right-0 bg-bg-space/95 border-t-4 border-brand-primary/30 h-20 px-6 flex justify-around items-center z-40 backdrop-blur-md">
        <NavButton icon={<Home size={24} />} label="Mapa" active onClick={() => onNavigate('dashboard')} />
        <NavButton icon={<Trophy size={24} />} label="Logros" onClick={() => onNavigate('achievements')} />
        <NavButton icon={<User size={24} />} label="Perfil" onClick={() => onNavigate('profile')} />
      </footer>
    </div>
  );
}

function AchievementsView({ stats, lessons, onBack }: { stats: UserStats, lessons: Lesson[], onBack: () => void, key?: string }) {
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);
  const completed = lessons.filter(l => l.completed).length;
  const progressPercent = Math.min((completed / lessons.length) * 100, 100);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="fixed inset-0 bg-bg-main z-50 overflow-y-auto pt-10 pb-20 px-6"
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Previous Header/Progress code */}
        <header className="w-full flex items-center justify-between mb-12">
           <button onClick={onBack} className="w-12 h-12 bg-bg-space rounded-2xl flex items-center justify-center text-white border-2 border-brand-primary/30 hover:scale-110 transition-transform">
              <ChevronLeft />
           </button>
           <h2 className="text-2xl font-black text-white uppercase tracking-widest glow-text">Logros Galácticos</h2>
           <div className="w-12" />
        </header>

        <section className="w-full bg-bg-space rounded-[40px] p-8 border-4 border-brand-primary/20 mb-10 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 blur-3xl -z-10" />
           <div className="flex justify-between mb-4">
              <span className="font-black text-slate-400 uppercase text-xs">Progreso Heroico</span>
              <span className="font-black text-brand-primary">{Math.round(progressPercent)}%</span>
           </div>
           <div className="w-full h-4 bg-black rounded-full overflow-hidden mb-6 p-1 border border-brand-primary/30 shadow-inner">
              <motion.div 
                className="h-full bg-brand-primary rounded-full shadow-[0_0_10px_#610094]"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
              />
           </div>
           <div className="grid grid-cols-3 gap-4">
              <AchievementStat icon={<Trophy className="text-accent-amber" />} label="Nivel" value={stats.level} />
              <AchievementStat icon={<Flame className="text-orange-500" />} label="Racha" value={`${stats.streak}d`} />
              <AchievementStat icon={<Gamepad2 className="text-brand-primary" />} label="Bosses" value={stats.bossesDefeated} />
           </div>
        </section>

        {/* Techniques list */}
        <section className="w-full mb-12">
          <h3 className="text-lg font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
            <BookOpen size={20} className="text-brand-primary" /> Arsenal del Héroe
          </h3>
          <div className="grid gap-4">
            {TECHNIQUES.map(t => (
              <div 
                key={t.id} 
                onClick={() => t.unlocked && setSelectedTechnique(t)}
                className={`p-6 rounded-3xl border-2 transition-all cursor-pointer hover:scale-[1.02] ${t.unlocked ? 'bg-bg-space border-brand-primary/40' : 'bg-slate-900 border-slate-800 opacity-50 grayscale'}`}
              >
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 bg-brand-primary/20 rounded-2xl flex items-center justify-center text-brand-primary">
                      {t.icon === 'Wind' ? <Wind /> : t.icon === 'Check' ? <CheckCircle2 /> : <Home />}
                   </div>
                   <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-black text-white uppercase text-sm tracking-tight">{t.name}</p>
                        {t.unlocked && <span className="text-[8px] bg-brand-success/20 text-brand-success px-2 py-0.5 rounded-full font-black uppercase">Click para repasar</span>}
                      </div>
                      <p className="text-xs text-slate-500 font-bold mt-1">{t.description}</p>
                   </div>
                   {t.unlocked && <Zap className="text-accent-amber" size={20} />}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full">
           <h3 className="text-lg font-black text-white uppercase tracking-widest mb-6 border-b-4 border-brand-primary/20 pb-2">Insignias</h3>
           <div className="grid grid-cols-4 gap-4">
              <BadgeItem icon="🌟" unlocked={completed >= 1} label="Cadete" />
              <BadgeItem icon="🔥" unlocked={stats.streak >= 3} label="Constante" />
              <BadgeItem icon="🛡️" unlocked={stats.bossesDefeated >= 1} label="Guardián" />
              <BadgeItem icon="🪐" unlocked={stats.level >= 2} label="Viajero" />
           </div>
        </section>

        {/* Technique Detail Modal */}
        <AnimatePresence>
          {selectedTechnique && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-6" onClick={() => setSelectedTechnique(null)}>
               <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="bg-bg-space w-full max-w-sm rounded-[60px] p-10 border-8 border-brand-primary/20 text-center relative shadow-[0_0_50px_rgba(97,0,148,0.3)]" onClick={e => e.stopPropagation()}>
                  <div className="text-8xl mb-8">
                     {selectedTechnique.icon === 'Wind' ? '🌬️' : selectedTechnique.icon === 'Check' ? '🧘' : '🏠'}
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-4 glow-text">{selectedTechnique.name}</h3>
                  <p className="text-slate-300 font-bold leading-relaxed mb-8">
                    {selectedTechnique.id === 't1' 
                      ? 'Cierra los ojos. Inhala aire profundamente contando hasta 4. Mantén el aire por 4 segundos. Exhala lentamente en 4 segundos. Siente cómo la calma entra en tu sistema.' 
                      : selectedTechnique.id === 't2'
                        ? 'Busca: 5 cosas que puedas ver, 4 cosas que puedas tocar, 3 cosas que puedas oír, 2 cosas que puedas oler y 1 cosa que puedas probar. Esto te trae de vuelta al presente.'
                        : 'Imagina un lugar donde te sientas completamente seguro y feliz. Puede ser real o inventado. Cuando te sientas asustado, cierra los ojos y viaja allí.'}
                  </p>
                  <button onClick={() => setSelectedTechnique(null)} className="w-full py-5 bg-brand-primary text-white font-black uppercase tracking-widest rounded-3xl border-b-8 border-purple-800 active:translate-y-1 active:border-b-0">¡ENTENDIDO!</button>
               </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
function AchievementStat({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
  return (
    <div className="bg-black/40 p-4 rounded-3xl flex flex-col items-center">
       {icon}
       <span className="text-[10px] font-black text-slate-500 uppercase mt-1">{label}</span>
       <span className="font-black text-lg text-white">{value}</span>
    </div>
  );
}

function BadgeItem({ icon, unlocked, label }: { icon: string, unlocked: boolean, label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all shadow-xl ${unlocked ? 'bg-brand-primary/30 border-2 border-brand-primary shadow-purple-500/20 outline outline-2 outline-offset-2 outline-brand-primary/20' : 'bg-slate-900 border-2 border-slate-800 grayscale scale-90 opacity-40'}`}>
        {icon}
      </div>
      <span className="text-[8px] font-black uppercase text-slate-500 mt-2 tracking-widest">{label}</span>
    </div>
  );
}

function ProfileView({ stats, onEdit, onReset, onLogout, onBack }: { stats: UserStats, onEdit: () => void, onReset: () => void, onLogout: () => void, onBack: () => void, key?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-bg-main z-50 overflow-y-auto px-6 pt-10 pb-20"
    >
      <div className="max-w-md mx-auto flex flex-col items-center">
        <header className="w-full flex items-center justify-between mb-12">
           <button onClick={onBack} className="w-12 h-12 bg-bg-space rounded-2xl flex items-center justify-center text-white border-2 border-brand-primary/30 hover:scale-110 transition-transform">
              <ChevronLeft />
           </button>
           <h2 className="text-xl font-black text-white uppercase tracking-widest glow-text">Tu Identidad</h2>
           <div className="w-12" />
        </header>

        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="w-40 h-40 rounded-[50px] bg-bg-space flex items-center justify-center text-7xl border-b-[12px] border-brand-primary shadow-2xl shadow-purple-900/30 mb-8 relative"
        >
           {stats.avatar}
           <button 
            onClick={onEdit}
            className="absolute -bottom-2 -right-2 w-12 h-12 bg-accent-amber rounded-2xl flex items-center justify-center text-slate-800 shadow-xl border-b-4 border-yellow-700 active:translate-y-1 active:border-b-0"
           >
              <Edit size={20} />
           </button>
        </motion.div>

        <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-2 text-center">{stats.name}</h3>
        <p className="text-brand-primary font-black uppercase tracking-[0.3em] text-[10px] mb-12">Nivel {stats.level} · Cadete Galáctico</p>

        <div className="w-full space-y-4">
           <ProfileActionButton icon={<Edit />} label="Editar Perfil" onClick={onEdit} color="bg-brand-primary border-purple-800" />
           <ProfileActionButton icon={<LogOut />} label="Cerrar Sesión" onClick={onLogout} color="bg-bg-space border-brand-primary/30" secondary />
           <ProfileActionButton icon={<RefreshCcw />} label="Reiniciar Progreso" onClick={() => { if(confirm('¿Estás seguro? Perderás todo tu progreso espacial.')) onReset(); }} color="bg-slate-900 border-slate-950" danger />
        </div>

        <div className="mt-16 pt-8 border-t-2 border-brand-primary/10 w-full text-center">
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">Avalado por</p>
            <p className="font-black text-slate-300 text-sm italic uppercase tracking-tighter">Dra. Claudia Martínez · Colpsic #123456</p>
        </div>
      </div>
    </motion.div>
  );
}

function ProfileActionButton({ icon, label, onClick, color, danger = false, secondary = false }: { icon: React.ReactNode, label: string, onClick: () => void, color: string, danger?: boolean, secondary?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full py-5 px-6 rounded-3xl flex items-center justify-between transition-all active:scale-95 border-b-8 shadow-xl ${color} ${secondary ? 'text-slate-200' : 'text-white'}`}
    >
       <div className="flex items-center gap-4">
          <div className={`${danger ? 'text-accent-rose' : 'text-accent-amber'} bg-white/10 p-2 rounded-xl`}>{icon}</div>
          <span className="font-black uppercase tracking-wider text-sm">{label}</span>
       </div>
       <ChevronRight size={20} className="text-white/20" />
    </button>
  );
}

function EditProfileModal({ currentName, currentAvatar, onSave, onClose }: { currentName: string, currentAvatar: string, onSave: (n: string, a: string) => void, onClose: () => void }) {
  const [name, setName] = useState(currentName);
  const [avatar, setAvatar] = useState(currentAvatar);
  const avatars = ['👦', '👧', '🤖', '👾', '🚀', '⭐', '🪐', '🧠'];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-6" onClick={onClose}>
      <motion.div initial={{ y: 50 }} animate={{ y: 0 }} className="bg-bg-space w-full max-w-sm rounded-[48px] p-8 border-8 border-brand-primary/20 shadow-2xl" onClick={e => e.stopPropagation()}>
         <h3 className="text-xl font-black text-white uppercase tracking-widest text-center mb-8 glow-text">Editar Identidad</h3>
         
         <div className="mb-8">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Nombre de Héroe</label>
            <input 
              value={name} 
              onChange={e => setName(e.target.value)}
              className="w-full bg-black/40 border-2 border-brand-primary/30 rounded-2xl py-4 px-6 text-white font-black uppercase text-sm tracking-widest focus:outline-none focus:border-brand-primary"
            />
         </div>

         <div className="mb-10">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Elegir Avatar</label>
            <div className="grid grid-cols-4 gap-4">
               {avatars.map(a => (
                 <button 
                  key={a} 
                  onClick={() => setAvatar(a)}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all ${a === avatar ? 'bg-brand-primary border-b-4 border-purple-800 scale-110 shadow-lg' : 'bg-black/40 border-2 border-brand-primary/10 hover:bg-black/60'}`}
                 >
                    {a}
                 </button>
               ))}
            </div>
         </div>

         <div className="flex gap-4">
            <button onClick={onClose} className="flex-1 py-4 bg-slate-900 text-slate-400 font-black uppercase tracking-widest text-xs rounded-2xl border-b-4 border-slate-950">Cancelar</button>
            <button onClick={() => onSave(name, avatar)} className="flex-1 py-4 bg-brand-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl border-b-4 border-purple-800 shadow-xl shadow-purple-900/20">Guardar</button>
         </div>
      </motion.div>
    </motion.div>
  );
}

function StatBadge({ icon, value }: { icon: React.ReactNode, value: number }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full font-bold text-sm">
      {icon}
      <span>{value}</span>
    </div>
  );
}

function NavButton({ icon, label, onClick, active = false }: { icon: React.ReactNode, label: string, onClick?: () => void, active?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 ${active ? 'text-white' : 'text-slate-400'} hover:text-white transition-colors`}
    >
      <div className={`p-1 rounded-xl ${active ? 'bg-blue-50' : ''}`}>
        {icon}
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest leading-none">{label}</span>
    </button>
  );
}

function LessonView({ lesson, hearts, onClose, onComplete }: { lesson: Lesson, hearts: number, onClose: () => void, onComplete: () => void, key?: string }) {
  const [step, setStep] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'wrong' | 'tip' | 'correct'>('tip');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  const content = lesson.content || [
    { text: "¡Hola! Hoy vamos a explorar las galaxias de tus sentimientos.", image: "🦸" },
    { text: "¿Sabías que la ansiedad es como una alarma estelar que a veces se activa sin peligro?", image: "🦋" },
    { text: "¡Pero no te preocupes! Tenemos herramientas para calmar la alarma.", image: "🚨" },
    { text: "Incluso los mejores héroes sienten miedo a veces. Lo importante es respirar.", image: "✨" },
  ];

  const currentContent = content[step];

  const handleNext = () => {
    if (lesson.activityType === 'quiz' && !showFeedback) {
      if (selectedOption === null) return;
      if (selectedOption === currentContent.correct) {
        setFeedbackType('correct');
        setShowFeedback(true);
      } else {
        setFeedbackType('wrong');
        setShowFeedback(true);
      }
      return;
    }

    if (step < content.length - 1) {
      setStep(step + 1);
      setShowFeedback(false);
      setSelectedOption(null);
    } else {
      onComplete();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-bg-main z-[60] flex flex-col border-8 border-brand-primary"
    >
      <header className="h-20 border-b-4 border-brand-primary/30 flex items-center px-4 md:px-8 gap-4 bg-bg-space/80 backdrop-blur-md">
        <button onClick={onClose} className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
          <X size={32} />
        </button>
        <div className="flex-1 h-4 bg-black rounded-full overflow-hidden border-2 border-brand-primary/30 shadow-inner">
          <motion.div 
            className="h-full bg-brand-primary shadow-[0_0_15px_#610094]"
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / content.length) * 100}%` }}
          />
        </div>
        <div className="flex items-center gap-2 bg-brand-primary px-4 py-2 rounded-xl text-white font-black text-lg">
           <Heart size={20} fill="currentColor" /> ∞
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 relative">
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${lesson.id}-${step}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="max-w-2xl w-full bg-bg-space p-8 md:p-12 rounded-[60px] shadow-2xl border-4 border-brand-primary/30 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-brand-primary/20 blur-[60px] -z-10" />

            {lesson.activityType === 'narrative' && (
              <>
                <div className="text-8xl md:text-9xl mb-8 transform hover:scale-110 transition-transform cursor-pointer drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  {currentContent.image || '🪐'}
                </div>
                <h2 className="text-xl md:text-3xl font-black text-white leading-tight uppercase tracking-tight glow-text leading-relaxed">
                  {currentContent.text}
                </h2>
              </>
            )}

            {lesson.activityType === 'quiz' && (
              <div className="text-left w-full">
                <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-8 text-center uppercase tracking-widest">{currentContent.question}</h2>
                <div className="grid gap-4">
                  {currentContent.options.map((opt: string, i: number) => (
                    <button 
                      key={i}
                      onClick={() => !showFeedback && setSelectedOption(i)}
                      className={`w-full py-5 px-6 rounded-3xl border-b-4 font-black text-left flex items-center gap-4 transition-all ${
                        selectedOption === i 
                          ? 'bg-brand-primary text-white border-purple-800' 
                          : 'bg-black/20 text-slate-300 border-black/40 hover:bg-black/40'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">{i + 1}</div>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {lesson.activityType === 'interactive' && (
              <div className="flex flex-col items-center">
                <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-8">{currentContent.text}</h2>
                {currentContent.type === 'breathe' ? (
                   <InteractiveBreathe steps={currentContent.steps} onFinish={() => handleNext()} />
                ) : (
                   <div className="text-6xl animate-pulse p-12 bg-brand-primary/10 rounded-full border-4 border-dashed border-brand-primary/50">
                      🔍
                   </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Feedback Bubble */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className={`absolute bottom-32 w-full max-w-sm p-6 rounded-3xl border-b-4 shadow-2xl z-20 ${
                feedbackType === 'correct' ? 'bg-brand-success border-green-700' : 
                feedbackType === 'wrong' ? 'bg-accent-rose border-rose-700' : 'bg-accent-amber border-yellow-600'
              }`}
            >
               <div className="flex gap-4">
                  <div className="text-3xl">{feedbackType === 'correct' ? '🎉' : feedbackType === 'wrong' ? '🛸' : '💡'}</div>
                  <div>
                    <h3 className="font-black text-white uppercase text-xs mb-1">
                      {feedbackType === 'correct' ? '¡Increíble!' : feedbackType === 'wrong' ? '¡Ups! Casi...' : 'Recuerda que...'}
                    </h3>
                    <p className="text-xs text-white/90 font-bold leading-relaxed">
                      {feedbackType === 'correct' ? currentContent.feedback : 
                       feedbackType === 'wrong' ? 'Esa no es la respuesta, pero no te rindas. ¡Aprender es parte de la misión!' : 
                       'Tomar descansos y respirar es parte del entrenamiento de un héroe.'}
                    </p>
                  </div>
               </div>
               <button onClick={() => { if(feedbackType === 'correct') { handleNext() } else { setShowFeedback(false) } }} className="mt-4 w-full py-2 bg-black/10 text-white font-black text-[10px] border border-white/20 rounded-lg">ENTENDIDO</button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="p-8 border-t-4 border-brand-primary/30 bg-bg-space/80">
        <div className="max-w-xl mx-auto flex gap-4">
          <button 
            onClick={handleNext}
            disabled={lesson.activityType === 'quiz' && selectedOption === null && !showFeedback}
            className={`w-full py-6 bg-brand-primary text-white font-black text-xl rounded-3xl shadow-xl border-b-8 border-purple-800 hover:scale-[1.02] transition-all active:translate-y-1 active:border-b-0 uppercase tracking-widest glow-text ${lesson.activityType === 'quiz' && selectedOption === null && !showFeedback ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
          >
            {step < content.length - 1 ? 'CONTINUAR' : '¡MISIÓN CUMPLIDA!'}
          </button>
        </div>
      </footer>
    </motion.div>
  );
}

function InteractiveBreathe({ steps, onFinish }: { steps: number, onFinish: () => void }) {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= steps) {
      onFinish();
      return;
    }

    const timer = setInterval(() => {
      setPhase(p => {
        if (p === 'inhale') return 'hold';
        if (p === 'hold') return 'exhale';
        setCount(c => c + 1);
        return 'inhale';
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [count, steps, onFinish]);

  return (
    <div className="flex flex-col items-center">
      <motion.div 
        animate={{ 
          scale: phase === 'inhale' ? 1.5 : phase === 'hold' ? 1.5 : 0.8,
          opacity: phase === 'hold' ? 1 : 0.7
        }}
        transition={{ duration: 4, ease: "easeInOut" }}
        className="w-32 h-32 bg-brand-primary rounded-full flex items-center justify-center text-white text-3xl shadow-[0_0_40px_#610094]"
      >
        <Wind size={40} />
      </motion.div>
      <div className="mt-12">
        <p className="text-2xl font-black text-white uppercase tracking-widest">
          {phase === 'inhale' ? 'Inhala...' : phase === 'hold' ? 'Mantén...' : 'Exhala...'}
        </p>
        <p className="text-slate-500 font-bold mt-2 italic">Ciclo {count + 1} de {steps}</p>
      </div>
    </div>
  );
}

function CrisisModal({ contacts, onClose }: { contacts: CrisisContact[], onClose: () => void }) {
  const [activeTechnique, setActiveTechnique] = useState<'478' | '54321' | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 50, scale: 0.9 }}
        animate={{ y: 0, scale: 1 }}
        className="bg-white w-full max-w-lg rounded-[48px] overflow-hidden shadow-2xl border-8 border-gray-50 flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-accent-rose p-6 md:p-8 text-white text-center border-b-8 border-rose-800 shrink-0">
          <ShieldAlert size={48} className="mx-auto mb-2" />
          <h2 className="text-2xl font-black mb-1 uppercase tracking-tight">Protocolo de Emergencia</h2>
          <p className="text-rose-100 text-xs font-bold uppercase tracking-widest opacity-80">Respira. Estamos contigo.</p>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-8">
          {/* Herramientas Rápidas Section */}
          <section>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Zap size={14} className="text-accent-amber" /> Herramientas de Calma Inmediata
            </h3>
            <div className="grid gap-4">
               <button 
                onClick={() => setActiveTechnique('478')}
                className="w-full p-6 bg-blue-50 border-2 border-blue-100 rounded-[32px] text-left hover:scale-[1.02] transition-transform group"
               >
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm group-hover:rotate-12 transition-transform">
                        <Wind size={24} />
                     </div>
                     <div>
                        <p className="font-black text-slate-800 uppercase text-xs tracking-tight">Técnica 4-7-8</p>
                        <p className="text-[10px] text-slate-500 font-bold">Respiración profunda controlada.</p>
                     </div>
                  </div>
               </button>

               <button 
                onClick={() => setActiveTechnique('54321')}
                className="w-full p-6 bg-purple-50 border-2 border-purple-100 rounded-[32px] text-left hover:scale-[1.02] transition-transform group"
               >
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-purple-600 shadow-sm group-hover:rotate-12 transition-transform">
                        <Star size={24} />
                     </div>
                     <div>
                        <p className="font-black text-slate-800 uppercase text-xs tracking-tight">Método 5-4-3-2-1</p>
                        <p className="text-[10px] text-slate-500 font-bold">Grounding para volver al presente.</p>
                     </div>
                  </div>
               </button>
            </div>
          </section>

          {/* Contactos Section */}
          <section>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Líneas de Ayuda Profesional</h3>
            <div className="space-y-3">
              {contacts.map(contact => (
                <a 
                  key={contact.number}
                  href={`tel:${contact.number.replace(/\s/g, '')}`}
                  className="flex items-center gap-4 p-4 bg-slate-50 border-2 border-gray-100 rounded-2xl hover:bg-slate-100 transition-all group active:scale-95"
                >
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-accent-rose group-hover:scale-110 transition-transform border-b-2 border-gray-100">
                    <Phone size={18} fill="currentColor" />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-slate-800 uppercase text-[10px] tracking-widest">{contact.name}</p>
                    <p className="text-xs text-slate-500 font-black">{contact.number}</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-300" />
                </a>
              ))}
            </div>
          </section>
        </div>

        <button 
          onClick={onClose}
          className="w-full py-6 text-slate-400 font-black text-xs uppercase tracking-widest border-t-2 border-gray-50 outline-none hover:bg-gray-50 transition-colors shrink-0"
        >
          Cerrar Protocolo
        </button>

        {/* Mini Tool Modals */}
        <AnimatePresence>
          {activeTechnique && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 bg-white z-[110] flex flex-col p-10 text-center"
            >
               <button onClick={() => setActiveTechnique(null)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-800 transition-colors">
                  <X size={32} />
               </button>

               <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="text-7xl mb-8">
                     {activeTechnique === '478' ? '🌬️' : '🌍'}
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 uppercase tracking-widest mb-6">
                    {activeTechnique === '478' ? 'Respiración 4-7-8' : 'Grounding 5-4-3-2-1'}
                  </h3>
                  
                  <div className="space-y-6 text-slate-600 font-bold leading-relaxed text-lg">
                    {activeTechnique === '478' ? (
                      <ul className="space-y-4">
                        <li className="flex items-center gap-4 bg-blue-50 p-4 rounded-2xl"><span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">1</span> Inhala por la nariz (4s)</li>
                        <li className="flex items-center gap-4 bg-blue-50 p-4 rounded-2xl"><span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">2</span> Mantén el aire (7s)</li>
                        <li className="flex items-center gap-4 bg-blue-50 p-4 rounded-2xl"><span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">3</span> Exhala por la boca (8s)</li>
                      </ul>
                    ) : (
                      <ul className="space-y-3">
                        <li className="flex items-center gap-4 bg-purple-50 p-3 rounded-xl"><span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">5</span> cosas que ves</li>
                        <li className="flex items-center gap-4 bg-purple-50 p-3 rounded-xl"><span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">4</span> cosas que sientes</li>
                        <li className="flex items-center gap-4 bg-purple-50 p-3 rounded-xl"><span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">3</span> cosas que escuchas</li>
                        <li className="flex items-center gap-4 bg-purple-50 p-3 rounded-xl"><span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">2</span> cosas que hueles</li>
                        <li className="flex items-center gap-4 bg-purple-50 p-3 rounded-xl"><span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">1</span> cosa que saboreas</li>
                      </ul>
                    )}
                  </div>
               </div>

               <button 
                onClick={() => setActiveTechnique(null)}
                className="w-full py-5 bg-slate-800 text-white font-black uppercase rounded-3xl mt-10 active:translate-y-1"
               >
                 He terminado
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
