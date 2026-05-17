/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  Wind,
} from "lucide-react";
import {
  AgeGroup,
  UserStats,
  Lesson,
  CrisisContact,
  Section,
  Technique,
  UserRole,
  ParentConfig,
  InstitutionalConfig,
} from "./types";

// Mock data
const CRISIS_CONTACTS: CrisisContact[] = [
  {
    name: "Padres",
    number: "Llamar a acudiente",
    description: "Contacto directo de emergencia.",
  },
  {
    name: "Centro de Ayuda Psicológica",
    number: "01 8000 113 113",
    description: "Atención especializada 24/7.",
  },
  {
    name: "Emergencias 123",
    number: "123",
    description: "Policía y ambulancias nacional.",
  },
];

const SECTIONS: Section[] = [
  {
    id: "anxiety",
    title: "Dimensión de Ansiedad",
    description: "Enfrenta las tormentas del mañana.",
    theme: "from-blue-900 to-bg-main",
  },
  {
    id: "depression",
    title: "Abismo de Depresión",
    description: "Encuentra la luz en la oscuridad.",
    theme: "from-purple-900 to-bg-main",
  },
];

const TECHNIQUES: Technique[] = [
  {
    id: "t1",
    name: "Respiración Profunda",
    description: "Inhala en 4, mantén 4, exhala 4.",
    icon: "Wind",
    unlocked: true,
  },
  {
    id: "t2",
    name: "Grounding 5-4-3-2-1",
    description: "Reconoce cosas a tu alrededor.",
    icon: "Check",
    unlocked: false,
  },
  {
    id: "t3",
    name: "Lugar Seguro",
    description: "Imagina un lugar que te de paz.",
    icon: "Home",
    unlocked: false,
  },
];

const INITIAL_LESSONS: Lesson[] = [
  // ANXIETY STAGE (10 Levels)
  ...Array.from({ length: 9 }).map((_, i) => ({
    id: `ans-${i + 1}`,
    sectionId: "anxiety",
    title: `Misión Ansiedad ${i + 1}`,
    description: `Nivel ${i + 1} de entrenamiento.`,
    type: "anxiety" as const,
    activityType: "quiz" as const,
    ageGroup: "teen" as const,
    completed: false,
    order: i + 1,
    content: [
      {
        question: `Exploración de Ansiedad: Nivel ${i + 1}. ¿Cuál es una señal común de ansiedad?`,
        options: ["Paz absoluta", "Corazón acelerado", "Hambre extrema"],
        correct: 1,
        feedback: "¡Bien! El cuerpo se prepara para la acción.",
      },
    ],
  })),
  {
    id: "ans-10",
    sectionId: "anxiety",
    title: "EL JEFE: VORTEX",
    description: "El desafío final de la Ansiedad.",
    type: "boss" as const,
    activityType: "quiz" as const,
    ageGroup: "teen" as const,
    completed: false,
    order: 10,
    content: [
      {
        question: "BOSS: ¿Qué técnica detiene el pensamiento impulsivo?",
        options: ["Huir", "Respirar 4-7-8", "Gritar"],
        correct: 1,
      },
      {
        question: "BOSS: La ansiedad es una emoción...",
        options: ["Mala siempre", "Natural de protección", "Inexistente"],
        correct: 1,
      },
    ],
  },
  // DEPRESSION STAGE (10 Levels)
  ...Array.from({ length: 9 }).map((_, i) => ({
    id: `dep-${i + 1}`,
    sectionId: "depression",
    title: `Misión Depresión ${i + 1}`,
    description: `Nivel ${i + 1} de resiliencia.`,
    type: "depression" as const,
    activityType: "quiz" as const,
    ageGroup: "teen" as const,
    completed: false,
    order: 11 + i,
    content: [
      {
        question: `Entendiendo la Depresión: Nivel ${i + 1}. ¿Cómo se siente a menudo la depresión?`,
        options: [
          "Como una nube gris persistente",
          "Como alegría explosiva",
          "Como ganas de correr un maratón",
        ],
        correct: 0,
        feedback: "Correcto. Es una sensación de falta de energía y color.",
      },
    ],
  })),
  {
    id: "dep-10",
    sectionId: "depression",
    title: "EL JEFE: SOMBRA ETERNA",
    description: "Vence al vacío final.",
    type: "boss" as const,
    activityType: "quiz" as const,
    ageGroup: "teen" as const,
    completed: false,
    order: 20,
    content: [
      {
        question: "BOSS: ¿Cuál es el primer paso para sanar?",
        options: ["Esconderse", "Hablar con alguien de confianza", "Ignorarlo"],
        correct: 1,
      },
    ],
  },
];

export default function App() {
  const [view, setView] = useState<
    | "onboarding"
    | "parentConsent"
    | "roleSelection"
    | "institutionalForm"
    | "intro"
    | "walkthrough"
    | "dashboard"
    | "lesson"
    | "achievements"
    | "profile"
    | "parentView"
  >("onboarding");
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null);
  const [parentalConsent, setParentalConsent] = useState(false);
  const [parentData, setParentData] = useState<ParentConfig | null>(null);
  const [institutionalData, setInstitutionalData] =
    useState<InstitutionalConfig | null>(null);
  const [stats, setStats] = useState<UserStats>({
    xp: 0,
    streak: 1,
    hearts: 99,
    level: 1,
    name: "Cadete Espacial",
    avatar: "👦",
    bossesDefeated: 0,
    lastLessonDate: null,
    completedLessons: [],
  });
  const [lessons, setLessons] = useState<Lesson[]>(INITIAL_LESSONS);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [showCrisis, setShowCrisis] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  // Persistence - Load once on mount
  useEffect(() => {
    const saved = localStorage.getItem("mindhero_data");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.stats) {
          const loadedStats = {
            ...data.stats,
            completedLessons: data.stats.completedLessons || [],
          };
          setStats(loadedStats);

          // Re-sync lesson completion status
          setLessons((prev) =>
            prev.map((l) => ({
              ...l,
              completed: loadedStats.completedLessons.includes(l.id),
            })),
          );
        }
        if (data.ageGroup) setAgeGroup(data.ageGroup);
        if (data.parentalConsent) {
          setParentalConsent(data.parentalConsent);
          // Only redirect if we haven't set a different view yet
          setView("dashboard");
        }
      } catch (e) {
        console.error("Error loading saved data", e);
      }
    }
  }, []); // Run only on mount

  const save = (
    updatedStats = stats,
    updatedAge = ageGroup,
    updatedConsent = parentalConsent,
    updatedParentData = parentData,
  ) => {
    localStorage.setItem(
      "mindhero_data",
      JSON.stringify({
        stats: updatedStats,
        ageGroup: updatedAge,
        parentalConsent: updatedConsent,
        parentData: updatedParentData,
      }),
    );
  };

  const handleStartOnboarding = (age: AgeGroup) => {
    setAgeGroup(age);
    setView("parentConsent");
  };

  const handleConsent = (data: ParentConfig) => {
    setParentData(data);
    setParentalConsent(true);
    setView("roleSelection");
    save(stats, ageGroup, true, data);
  };

  const handleRoleSelection = (role: UserRole) => {
    setUserRole(role);
    if (role === "parent") {
      setView("parentView");
    } else if (role === "student") {
      setView("institutionalForm");
    } else {
      setView("intro");
    }
  };

  const handleInstitutionalSubmit = (data: InstitutionalConfig) => {
    setInstitutionalData(data);
    setView("intro");
    // We could save this data too if needed
  };

  const handleStartLesson = (lesson: Lesson) => {
    const prevLessonsDone =
      lessons.filter((l) => l.order < lesson.order && !l.completed).length ===
      0;
    if (prevLessonsDone || lesson.order === 1) {
      setCurrentLesson(lesson);
      setView("lesson");
    }
  };

  const handleCompleteLesson = () => {
    const today = new Date().toDateString();
    const nextXp = stats.xp + 50;
    const isBoss = currentLesson?.type === "boss";

    const nextStats = {
      ...stats,
      xp: nextXp,
      bossesDefeated: stats.bossesDefeated + (isBoss ? 1 : 0),
      level: Math.floor(nextXp / 500) + 1,
      lastLessonDate: today,
      completedLessons: [
        ...(stats.completedLessons || []),
        currentLesson?.id || "",
      ],
    };

    setStats(nextStats);
    setLessons((prev) =>
      prev.map((l) =>
        l.id === currentLesson?.id ? { ...l, completed: true } : l,
      ),
    );
    setView("dashboard");
    save(nextStats);
  };

  const handleReset = () => {
    localStorage.removeItem("mindhero_data");
    setStats({
      xp: 0,
      streak: 1,
      hearts: 99,
      level: 1,
      name: "Cadete Espacial",
      avatar: "👦",
      bossesDefeated: 0,
      lastLessonDate: null,
      completedLessons: [],
    });
    setAgeGroup(null);
    setParentalConsent(false);
    setView("onboarding");
  };

  const handleLogout = () => {
    setView("onboarding");
    setAgeGroup(null);
    setParentalConsent(false);
    // Clear parental consent from local storage to ensure flow restart
    const saved = localStorage.getItem("mindhero_data");
    if (saved) {
      const data = JSON.parse(saved);
      localStorage.setItem(
        "mindhero_data",
        JSON.stringify({ ...data, parentalConsent: false, ageGroup: null }),
      );
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
        {view === "onboarding" && (
          <Onboarding key="onboarding" onStart={handleStartOnboarding} />
        )}

        {view === "parentConsent" && (
          <ParentConsentView key="consent" onConsent={handleConsent} />
        )}

        {view === "roleSelection" && (
          <RoleSelection key="roles" onSelect={handleRoleSelection} />
        )}

        {view === "institutionalForm" && (
          <InstitutionalFormView
            key="inst"
            onSubmit={handleInstitutionalSubmit}
          />
        )}

        {view === "intro" && (
          <IntroNarrative
            key="intro"
            onComplete={() => setView("walkthrough")}
          />
        )}

        {view === "walkthrough" && (
          <AppWalkthrough
            key="walkthrough"
            onComplete={() => setView("dashboard")}
          />
        )}

        {view === "parentView" && (
          <ParentDashboard
            key="parent"
            stats={stats}
            lessons={lessons}
            onBack={() => setView("onboarding")}
          />
        )}

        {view === "dashboard" && (
          <Dashboard
            key="dashboard"
            stats={stats}
            lessons={lessons}
            onStartLesson={handleStartLesson}
            ageGroup={ageGroup}
            onNavigate={(v) => setView(v as any)}
            onShowCrisis={() => setShowCrisis(true)}
          />
        )}

        {view === "achievements" && (
          <AchievementsView
            key="achievements"
            stats={stats}
            lessons={lessons}
            onBack={() => setView("dashboard")}
          />
        )}

        {view === "profile" && (
          <ProfileView
            key="profile"
            stats={stats}
            onEdit={() => setShowEditProfile(true)}
            onReset={handleReset}
            onLogout={handleLogout}
            onBack={() => setView("dashboard")}
          />
        )}

        {view === "lesson" && currentLesson && (
          <LessonView
            key="lesson"
            lesson={currentLesson}
            onClose={() => setView("dashboard")}
            onComplete={handleCompleteLesson}
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-8 right-8 flex items-center group z-50">
        <div className="bg-white rounded-2xl shadow-2xl p-4 mr-4 border-2 border-red-100 opacity-0 lg:group-hover:opacity-100 transition-opacity">
          <p className="text-xs font-black text-accent-rose">¿AYUDA YA?</p>
          <p className="text-[10px] text-slate-500 font-bold italic">
            Llama a la Línea 106
          </p>
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
        {showCrisis && (
          <CrisisModal
            contacts={CRISIS_CONTACTS}
            onClose={() => setShowCrisis(false)}
          />
        )}
        {showEditProfile && (
          <EditProfileModal
            currentName={stats.name}
            currentAvatar={stats.avatar}
            onSave={updateProfile}
            onClose={() => setShowEditProfile(false)}
          />
        )}
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
            ["--duration" as any]: `${2 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
}

function IntroNarrative({
  onComplete,
}: {
  onComplete: () => void;
  key?: string;
}) {
  const [step, setStep] = useState(0);
  const narrative = [
    {
      text: "En un universo donde las sombras de la Ansiedad y la Depresión han devorado mundos enteros...",
      image: "🌌",
      bg: "bg-black",
    },
    {
      text: "Soy Kaelen, el último Guardián de la Luz Emocional. Mi galaxia fue destruida por el gran Vacío.",
      image: "👤",
      bg: "bg-purple-950",
    },
    {
      text: "He viajado por el hiperespacio buscando al Elegido. Alguien con el valor de enfrentar sus propios miedos.",
      image: "✨",
      bg: "bg-indigo-950",
    },
    {
      text: "Ahora, tú eres el Elegido. Me ayudarás a entender y combatir estas sombras que acechan tu mundo.",
      image: "🛡️",
      bg: "bg-brand-primary/20",
    },
    {
      text: "Con este conocimiento, podrás vencerlas tú solo, incluso cuando yo ya no pueda estar a tu lado.",
      image: "⚡",
      bg: "bg-brand-primary/40",
    },
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
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-8 text-center transition-colors duration-1000 ${narrative[step].bg}`}
    >
      <div className="max-w-2xl w-full">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          className="bg-bg-space/40 backdrop-blur-xl rounded-[60px] p-12 border-4 border-brand-primary/30 shadow-[0_0_50px_rgba(97,0,148,0.5)] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 to-transparent pointer-events-none" />
          <div className="text-9xl mb-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
            {narrative[step].image}
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-relaxed mb-6 glow-text">
            {narrative[step].text}
          </h2>
        </motion.div>

        <div className="mt-12 flex justify-center gap-4">
          {narrative.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${i === step ? "bg-brand-primary scale-125 shadow-[0_0_20px_#610094]" : "bg-slate-700"} transition-all`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="mt-12 group relative w-full overflow-hidden py-6 bg-brand-primary text-white font-black text-xl rounded-2xl shadow-[0_0_30px_rgba(97,0,148,0.4)] border-b-8 border-purple-800 hover:scale-105 transition-all active:translate-y-1 active:border-b-0 uppercase tracking-widest"
        >
          <span className="relative z-10">
            {step === narrative.length - 1 ? "¡ACEPTO LA MISIÓN!" : "Siguiente"}
          </span>
          <div className="absolute inset-x-0 bottom-0 top-full bg-white/20 transition-all group-hover:top-0" />
        </button>
      </div>
    </motion.div>
  );
}

function ParentConsentView({
  onConsent,
}: {
  onConsent: (data: ParentConfig) => void;
  key?: string;
}) {
  const [formData, setFormData] = useState<ParentConfig>({
    idNumber: "",
    verifiedEmail: "",
    childName: "",
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md w-full px-8 py-12 flex flex-col items-center text-center bg-white border-8 border-bg-space rounded-[60px] shadow-2xl z-10"
    >
      <div className="w-full">
        <h2 className="text-2xl font-black text-slate-800 uppercase mb-4">
          Verificación de Adulto
        </h2>
        <p className="text-slate-500 font-bold mb-8 text-sm">
          De acuerdo con la Ley 1098, requerimos verificar los datos del
          responsable legal.
        </p>

        <div className="space-y-4 text-left">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400">
              Nombre del Menor
            </label>
            <input
              type="text"
              className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-xl font-bold"
              placeholder="Nombre completo"
              value={formData.childName}
              onChange={(e) =>
                setFormData({ ...formData, childName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400">
              Cédula del Acudiente
            </label>
            <input
              type="text"
              className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-xl font-bold"
              placeholder="Número de documento"
              value={formData.idNumber}
              onChange={(e) =>
                setFormData({ ...formData, idNumber: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400">
              Correo de Contacto
            </label>
            <input
              type="email"
              className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-xl font-bold"
              placeholder="email@ejemplo.com"
              value={formData.verifiedEmail}
              onChange={(e) =>
                setFormData({ ...formData, verifiedEmail: e.target.value })
              }
            />
          </div>
        </div>

        <button
          disabled={
            !formData.childName || !formData.idNumber || !formData.verifiedEmail
          }
          onClick={() => onConsent(formData)}
          className="w-full mt-10 py-5 bg-accent-amber text-slate-800 font-black rounded-3xl border-b-8 border-yellow-600 shadow-xl uppercase tracking-widest disabled:opacity-50 disabled:grayscale"
        >
          VERIFICAR Y CONTINUAR
        </button>
      </div>
    </motion.div>
  );
}

function RoleSelection({
  onSelect,
}: {
  onSelect: (role: UserRole) => void;
  key?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md w-full px-8 py-12 flex flex-col items-center text-center bg-white border-8 border-bg-space rounded-[60px] shadow-2xl z-10"
    >
      <div className="w-20 h-20 bg-brand-primary rounded-3xl flex items-center justify-center text-white mb-8 shadow-xl">
        <User size={40} />
      </div>
      <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight mb-8">
        ¿Quién eres tú?
      </h2>
      <div className="grid gap-6 w-full">
        <button
          onClick={() => onSelect("player")}
          className="py-6 bg-brand-primary text-white font-black rounded-3xl border-b-8 border-blue-800 hover:scale-[1.02] active:translate-y-1 active:border-b-0 flex items-center justify-center gap-4 text-xl"
        >
          <Gamepad2 /> SOY JUGADOR
        </button>
        <button
          onClick={() => onSelect("parent")}
          className="py-6 bg-bg-space text-brand-primary font-black rounded-3xl border-b-8 border-slate-900 border-2 hover:scale-[1.02] active:translate-y-1 active:border-b-0 flex items-center justify-center gap-4 text-xl"
        >
          <User /> SOY EL PADRE
        </button>
        <button
          onClick={() => onSelect("student")}
          className="py-6 bg-slate-100 text-slate-700 font-black rounded-3xl border-b-8 border-slate-300 border-2 hover:scale-[1.02] active:translate-y-1 active:border-b-0 flex items-center justify-center gap-4 text-xl"
        >
          <BookOpen /> SOY ESTUDIANTE
        </button>
      </div>
    </motion.div>
  );
}

function InstitutionalFormView({
  onSubmit,
}: {
  onSubmit: (data: InstitutionalConfig) => void;
  key?: string;
}) {
  const [formData, setFormData] = useState<InstitutionalConfig>({
    studentName: "",
    institutionalEmail: "",
    verificationCode: "",
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md w-full px-8 py-12 flex flex-col items-center text-center bg-white border-8 border-bg-space rounded-[60px] shadow-2xl z-10"
    >
      <div className="w-full">
        <h2 className="text-2xl font-black text-slate-800 uppercase mb-4 text-center">
          Registro Institucional
        </h2>
        <p className="text-slate-500 font-bold mb-8 text-sm text-center">
          Completa tus datos académicos para acceder a la red de tu institución.
        </p>

        <div className="space-y-4 text-left">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400">
              Nombre del Estudiante
            </label>
            <input
              type="text"
              className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-xl font-bold"
              placeholder="Tu nombre completo"
              value={formData.studentName}
              onChange={(e) =>
                setFormData({ ...formData, studentName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400">
              Correo Institucional
            </label>
            <input
              type="email"
              className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-xl font-bold"
              placeholder="estudiante@colegio.edu.co"
              value={formData.institutionalEmail}
              onChange={(e) =>
                setFormData({ ...formData, institutionalEmail: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400">
              Código de Verificación
            </label>
            <input
              type="text"
              className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-xl font-bold"
              placeholder="Código entregado por tu colegio"
              value={formData.verificationCode}
              onChange={(e) =>
                setFormData({ ...formData, verificationCode: e.target.value })
              }
            />
          </div>
        </div>

        <button
          disabled={
            !formData.studentName ||
            !formData.institutionalEmail ||
            !formData.verificationCode
          }
          onClick={() => onSubmit(formData)}
          className="w-full mt-10 py-5 bg-brand-primary text-white font-black rounded-3xl border-b-8 border-purple-800 shadow-xl uppercase tracking-widest disabled:opacity-50 disabled:grayscale"
        >
          ACCEDER AL JUEGO
        </button>
      </div>
    </motion.div>
  );
}

function Onboarding({
  onStart,
}: {
  onStart: (age: AgeGroup) => void;
  key?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="max-w-md w-full px-6 py-12 flex flex-col items-center text-center bg-white border-8 border-bg-space rounded-[48px] shadow-2xl mt-12 mb-12"
    >
      <div className="w-24 h-24 mb-8 bg-brand-primary rounded-[32px] flex items-center justify-center text-white shadow-xl shadow-blue-200 rotate-3 border-b-8 border-blue-700">
        <Star size={48} fill="currentColor" />
      </div>

      <h1 className="text-3xl md:text-4xl font-black mb-4 text-slate-800 tracking-tight uppercase leading-tight">
        Bienvenidos a MindHero
      </h1>
      <p className="text-slate-500 mb-10 text-lg font-bold">
        Esta experiencia está diseñada exclusivamente para jóvenes entre 13 y 17
        años.
      </p>

      <div className="grid gap-6 w-full">
        <button
          onClick={() => onStart("teen")}
          className="py-6 px-4 bg-brand-primary text-white font-black rounded-3xl text-xl shadow-lg border-b-8 border-blue-800 hover:scale-[1.02] active:scale-95 active:border-b-0 uppercase"
        >
          TENGO ENTRE 13 Y 17 AÑOS
        </button>
      </div>

      <div className="mt-8 pt-8 border-t-2 border-gray-50">
        <p className="text-[10px] text-slate-400 font-bold uppercase">
          Ley 1098 de 2006 · Protección Juvenil
        </p>
      </div>
    </motion.div>
  );
}

function AppWalkthrough({
  onComplete,
}: {
  onComplete: () => void;
  key?: string;
}) {
  const [step, setStep] = useState(0);
  const steps = [
    {
      title: "El Mapa Estelar",
      desc: "Aquí verás tu progreso. Cada planeta es un nivel que debes superar para avanzar.",
      icon: <Home size={40} />,
    },
    {
      title: "Entrenamiento Diario",
      desc: "Solo puedes completar una misión por día. ¡La constancia es clave!",
      icon: <Flame size={40} />,
    },
    {
      title: "Tu Arsenal",
      desc: "En Logros verás las técnicas que has aprendido para usar en la vida real.",
      icon: <Star size={40} />,
    },
    {
      title: "Protocolo SOS",
      desc: "Si te sientes abrumado, usa el botón SOS arriba para ayuda inmediata.",
      icon: <ShieldAlert size={40} />,
    },
    {
      title: "Tu Identidad",
      desc: "Personaliza tu avatar y mira tus estadísticas en el perfil.",
      icon: <User size={40} />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8"
    >
      <div className="max-w-md w-full bg-bg-space p-10 rounded-[60px] border-4 border-brand-primary text-center">
        <div className="w-20 h-20 bg-brand-primary/20 rounded-3xl flex items-center justify-center text-brand-primary mx-auto mb-8">
          {steps[step].icon}
        </div>
        <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-4">
          {steps[step].title}
        </h3>
        <p className="text-slate-300 font-bold leading-relaxed mb-10">
          {steps[step].desc}
        </p>

        <div className="flex gap-4">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 py-4 bg-slate-900 text-slate-400 font-black rounded-2xl"
            >
              ANTERIOR
            </button>
          )}
          <button
            onClick={() =>
              step < steps.length - 1 ? setStep(step + 1) : onComplete()
            }
            className="flex-2 py-4 bg-brand-primary text-white font-black rounded-2xl shadow-lg shadow-purple-900/40"
          >
            {step === steps.length - 1 ? "¡LISTO PARA EMPEZAR!" : "SIGUIENTE"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ParentDashboard({
  stats,
  lessons,
  onBack,
}: {
  stats: UserStats;
  lessons: Lesson[];
  onBack: () => void;
  key?: string;
}) {
  const completedCount = lessons.filter((l) => l.completed).length;
  const totalCount = lessons.length;

  const getSectionProgress = (sectionId: string) => {
    const sectionLessons = lessons.filter((l) => l.sectionId === sectionId);
    const completed = sectionLessons.filter((l) => l.completed).length;
    return Math.round((completed / sectionLessons.length) * 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl w-full px-8 py-12 bg-white rounded-[60px] shadow-2xl border-8 border-bg-space overflow-y-auto max-h-[90vh]"
    >
      <header className="flex items-center justify-between mb-10">
        <button
          onClick={onBack}
          className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-800"
        >
          <ChevronLeft />
        </button>
        <h2 className="text-xl font-black text-slate-800 uppercase tracking-widest text-center">
          Progreso del Hijo
        </h2>
        <div className="w-12" />
      </header>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-6 bg-blue-50 rounded-3xl border-2 border-blue-100 text-center">
          <p className="text-[10px] font-black text-blue-400 uppercase mb-2">
            Ansiedad
          </p>
          <p className="text-3xl font-black text-slate-800">
            {getSectionProgress("anxiety")}%
          </p>
          <div className="w-full h-1.5 bg-white rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-blue-500"
              style={{ width: `${getSectionProgress("anxiety")}%` }}
            />
          </div>
        </div>
        <div className="p-6 bg-purple-50 rounded-3xl border-2 border-purple-100 text-center">
          <p className="text-[10px] font-black text-purple-400 uppercase mb-2">
            Depresión
          </p>
          <p className="text-3xl font-black text-slate-800">
            {getSectionProgress("depression")}%
          </p>
          <div className="w-full h-1.5 bg-white rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-purple-500"
              style={{ width: `${getSectionProgress("depression")}%` }}
            />
          </div>
        </div>
      </div>

      <div className="p-8 bg-blue-50 rounded-[40px] border-2 border-blue-100 mb-8">
        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4 text-center">
          Estado del Jugador
        </p>
        <div className="flex justify-between items-end mb-4">
          <div className="text-center flex-1">
            <p className="text-3xl font-black text-slate-800">
              {completedCount}/{totalCount}
            </p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">
              Misiones
            </p>
          </div>
          <div className="text-center flex-1">
            <p className="text-3xl font-black text-slate-800">
              {stats.streak}d
            </p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">
              Racha
            </p>
          </div>
          <div className="text-center flex-1">
            <p className="text-3xl font-black text-slate-800">{stats.level}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">
              Nivel
            </p>
          </div>
        </div>
        <div className="w-full h-4 bg-white rounded-full overflow-hidden p-1 border border-blue-200">
          <motion.div
            className="h-full bg-brand-primary rounded-full transition-all"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest mb-4">
          Actividad Reciente
        </h3>
        {lessons
          .filter((l) => l.completed)
          .slice(-3)
          .map((l) => (
            <div
              key={l.id}
              className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between"
            >
              <div>
                <p className="font-black text-slate-700 text-sm">{l.title}</p>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                  Completado
                </p>
              </div>
              <div className="text-green-500">
                <CheckCircle2 size={16} />
              </div>
            </div>
          ))}
        {completedCount === 0 && (
          <p className="text-center py-10 text-slate-400 font-bold italic">
            Aún no hay misiones completadas.
          </p>
        )}
      </div>

      <button
        onClick={onBack}
        className="w-full mt-10 py-5 bg-slate-800 text-white font-black rounded-3xl uppercase tracking-widest"
      >
        Volver al Inicio
      </button>
    </motion.div>
  );
}

function AgeButton({
  label,
  onClick,
  color,
}: {
  label: string;
  onClick: () => void;
  color: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`py-6 px-4 ${color} text-white font-black rounded-3xl text-xl shadow-lg border-b-8 hover:scale-[1.02] transition-all active:scale-95 active:border-b-0 uppercase tracking-tight`}
    >
      {label}
    </button>
  );
}

function Dashboard({
  stats,
  lessons,
  onStartLesson,
  ageGroup,
  onNavigate,
  onShowCrisis,
}: {
  stats: UserStats;
  lessons: Lesson[];
  onStartLesson: (l: Lesson) => void;
  ageGroup: AgeGroup | null;
  onNavigate: (v: string) => void;
  onShowCrisis: () => void;
  key?: string;
}) {
  return (
    <div className="w-full h-full flex flex-col relative z-10">
      {/* Header */}
      <header className="h-20 bg-bg-space/80 backdrop-blur-md border-b-4 border-brand-primary/30 px-4 md:px-8 flex items-center justify-between shadow-lg z-10 sticky top-0">
        <div className="flex items-center space-x-3 md:space-x-4">
          <div className="bg-brand-primary p-2 rounded-xl text-white shadow-lg">
            <Gamepad2 size={20} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-black text-white leading-none uppercase tracking-widest glow-text">
              MindHero
            </h1>
          </div>

          {/* Top SOS Button - Discreeter */}
          <button
            onClick={onShowCrisis}
            className="ml-4 px-3 py-1.5 bg-accent-rose/20 text-accent-rose border border-accent-rose/30 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-accent-rose hover:text-white transition-all flex items-center gap-1"
          >
            <ShieldAlert size={12} /> SOS
          </button>
        </div>

        <div className="flex items-center space-x-3 md:space-x-6">
          <div className="hidden sm:flex items-center bg-brand-secondary/40 px-3 py-1.5 rounded-full border-2 border-brand-primary/50 text-white">
            <Flame
              size={16}
              className="text-orange-500 mr-2"
              fill="currentColor"
            />
            <span className="font-black text-sm uppercase italic">
              {stats.streak} D
            </span>
          </div>
          <div className="flex items-center bg-brand-secondary/40 px-3 py-1.5 rounded-full border-2 border-brand-primary/50 text-white">
            <Zap
              size={16}
              className="text-accent-amber mr-2"
              fill="currentColor"
            />
            <span className="font-black text-sm uppercase tracking-tight">
              {stats.xp} EXP
            </span>
          </div>
          <button
            onClick={() => onNavigate("profile")}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-brand-primary shadow-md bg-brand-secondary flex items-center justify-center overflow-hidden hover:scale-110 transition-transform"
          >
            <span className="text-2xl">{stats.avatar}</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden h-screen relative">
        <nav className="hidden lg:flex w-24 border-r-4 border-brand-primary/30 bg-bg-space/50 backdrop-blur-sm flex-col items-center py-8 space-y-8">
          <NavButton
            icon={<Home size={28} />}
            label="Mapa"
            active
            onClick={() => onNavigate("dashboard")}
          />
          <NavButton
            icon={<Trophy size={28} />}
            label="Logros"
            onClick={() => onNavigate("achievements")}
          />
          <NavButton
            icon={<User size={28} />}
            label="Perfil"
            onClick={() => onNavigate("profile")}
          />
        </nav>

        <main className="flex-1 overflow-y-auto px-4 pb-32">
          <div className="max-w-xl mx-auto mt-8">
            {SECTIONS.map((section, sIdx) => {
              const sectionLessons = lessons.filter(
                (l) => l.sectionId === section.id,
              );
              return (
                <section key={section.id} className="mb-20">
                  {/* Section Title */}
                  <div
                    className={`mb-10 text-center p-8 bg-gradient-to-b ${section.theme} rounded-3xl border-b-8 border-brand-primary/40 relative overflow-hidden`}
                  >
                    <div className="relative z-10">
                      <p className="text-[10px] font-black text-accent-amber uppercase tracking-[0.3em] mb-2">
                        Sección {sIdx + 1}
                      </p>
                      <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2 glow-text">
                        {section.title}
                      </h2>
                      <p className="text-xs font-bold text-slate-300 italic">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  {/* Nodes for this section */}
                  <div className="flex flex-col items-center space-y-16 relative">
                    {/* Visual Connection line could be added here */}
                    {sectionLessons.map((lesson, lIdx) => {
                      const isCompleted = lesson.completed;
                      const isLocked =
                        lIdx > 0 &&
                        !sectionLessons[lIdx - 1]?.completed &&
                        !isCompleted;
                      const isActive = !isLocked && !isCompleted;

                      return (
                        <div key={lesson.id} className="relative group">
                          {/* Connection line fragment */}
                          {lIdx < sectionLessons.length - 1 && (
                            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-1.5 h-16 bg-brand-primary/20 -z-10" />
                          )}

                          <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                              opacity: 1,
                              scale: isActive ? 1.15 : 1,
                              filter: isActive
                                ? "drop-shadow(0 0 15px rgba(97,0,148,0.6))"
                                : "none",
                            }}
                            transition={{
                              delay: lIdx * 0.1,
                              scale: isActive
                                ? {
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                  }
                                : {},
                            }}
                            onClick={() => !isLocked && onStartLesson(lesson)}
                            className={`
                              w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-2xl relative z-10 transition-all
                              ${
                                isCompleted
                                  ? "bg-brand-success border-b-8 border-green-700 text-white shadow-green-500/30"
                                  : isLocked
                                    ? "bg-slate-800 border-b-8 border-slate-900 text-slate-600 opacity-60"
                                    : "bg-brand-primary border-b-8 border-purple-800 text-white shadow-purple-500/30 ring-4 ring-purple-500/40 glow-text shadow-[0_0_30px_rgba(97,0,148,0.4)]"
                              }
                              ${lIdx % 2 === 0 ? "-translate-x-10" : "translate-x-10"}
                              hover:scale-110 active:translate-y-1 active:border-b-0
                            `}
                          >
                            <span className="text-3xl mb-1">
                              {lesson.type === "boss"
                                ? "👿"
                                : lesson.type === "npc"
                                  ? "🤖"
                                  : "🪐"}
                            </span>
                            {isCompleted ? (
                              <Check size={20} className="font-black" />
                            ) : null}
                          </motion.button>

                          {/* Current label */}
                          {isActive && (
                            <div
                              className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent-amber text-black font-black rounded-lg text-[9px] uppercase tracking-widest whitespace-nowrap animate-bounce z-20`}
                            >
                              ¡JUEGA AQUÍ!
                            </div>
                          )}

                          <div
                            className={`absolute -bottom-10 left-1/2 -translate-x-1/2 text-center w-40 ${lIdx % 2 === 0 ? "-translate-x-2" : "translate-x-2"}`}
                          >
                            <p
                              className={`text-[10px] font-black uppercase tracking-widest ${lesson.completed ? "text-slate-400" : isLocked ? "text-slate-600" : "text-slate-200"}`}
                            >
                              {lesson.title}
                            </p>
                          </div>

                          {/* Decorative Monster for Boss */}
                          {lesson.type === "boss" && !lesson.completed && (
                            <div className="absolute -right-20 top-0 text-4xl animate-bounce">
                              👾
                            </div>
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
        <NavButton
          icon={<Home size={24} />}
          label="Mapa"
          active
          onClick={() => onNavigate("dashboard")}
        />
        <NavButton
          icon={<Trophy size={24} />}
          label="Logros"
          onClick={() => onNavigate("achievements")}
        />
        <NavButton
          icon={<User size={24} />}
          label="Perfil"
          onClick={() => onNavigate("profile")}
        />
      </footer>
    </div>
  );
}

function AchievementsView({
  stats,
  lessons,
  onBack,
}: {
  stats: UserStats;
  lessons: Lesson[];
  onBack: () => void;
  key?: string;
}) {
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(
    null,
  );
  const completed = lessons.filter((l) => l.completed).length;
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
          <button
            onClick={onBack}
            className="w-12 h-12 bg-bg-space rounded-2xl flex items-center justify-center text-white border-2 border-brand-primary/30 hover:scale-110 transition-transform"
          >
            <ChevronLeft />
          </button>
          <h2 className="text-2xl font-black text-white uppercase tracking-widest glow-text">
            Logros Galácticos
          </h2>
          <div className="w-12" />
        </header>

        <section className="w-full bg-bg-space rounded-[40px] p-8 border-4 border-brand-primary/20 mb-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 blur-3xl -z-10" />
          <div className="flex justify-between mb-4">
            <span className="font-black text-slate-400 uppercase text-xs">
              Progreso Heroico
            </span>
            <span className="font-black text-brand-primary">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <div className="w-full h-4 bg-black rounded-full overflow-hidden mb-6 p-1 border border-brand-primary/30 shadow-inner">
            <motion.div
              className="h-full bg-brand-primary rounded-full shadow-[0_0_10px_#610094]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <AchievementStat
              icon={<Trophy className="text-accent-amber" />}
              label="Nivel"
              value={stats.level}
            />
            <AchievementStat
              icon={<Flame className="text-orange-500" />}
              label="Racha"
              value={`${stats.streak}d`}
            />
            <AchievementStat
              icon={<Gamepad2 className="text-brand-primary" />}
              label="Bosses"
              value={stats.bossesDefeated}
            />
          </div>
        </section>

        {/* Techniques list */}
        <section className="w-full mb-12">
          <h3 className="text-lg font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
            <BookOpen size={20} className="text-brand-primary" /> Arsenal del
            Héroe
          </h3>
          <div className="grid gap-4">
            {TECHNIQUES.map((t) => (
              <div
                key={t.id}
                onClick={() => t.unlocked && setSelectedTechnique(t)}
                className={`p-6 rounded-3xl border-2 transition-all cursor-pointer hover:scale-[1.02] ${t.unlocked ? "bg-bg-space border-brand-primary/40" : "bg-slate-900 border-slate-800 opacity-50 grayscale"}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-brand-primary/20 rounded-2xl flex items-center justify-center text-brand-primary">
                    {t.icon === "Wind" ? (
                      <Wind />
                    ) : t.icon === "Check" ? (
                      <CheckCircle2 />
                    ) : (
                      <Home />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-black text-white uppercase text-sm tracking-tight">
                        {t.name}
                      </p>
                      {t.unlocked && (
                        <span className="text-[8px] bg-brand-success/20 text-brand-success px-2 py-0.5 rounded-full font-black uppercase">
                          Click para repasar
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-bold mt-1">
                      {t.description}
                    </p>
                  </div>
                  {t.unlocked && (
                    <Zap className="text-accent-amber" size={20} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full">
          <h3 className="text-lg font-black text-white uppercase tracking-widest mb-6 border-b-4 border-brand-primary/20 pb-2">
            Insignias
          </h3>
          <div className="grid grid-cols-4 gap-4">
            <BadgeItem icon="🌟" unlocked={completed >= 1} label="Cadete" />
            <BadgeItem
              icon="🔥"
              unlocked={stats.streak >= 3}
              label="Constante"
            />
            <BadgeItem
              icon="🛡️"
              unlocked={stats.bossesDefeated >= 1}
              label="Guardián"
            />
            <BadgeItem icon="🪐" unlocked={stats.level >= 2} label="Viajero" />
          </div>
        </section>

        {/* Technique Detail Modal */}
        <AnimatePresence>
          {selectedTechnique && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-6"
              onClick={() => setSelectedTechnique(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-bg-space w-full max-w-sm rounded-[60px] p-10 border-8 border-brand-primary/20 text-center relative shadow-[0_0_50px_rgba(97,0,148,0.3)]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-8xl mb-8">
                  {selectedTechnique.icon === "Wind"
                    ? "🌬️"
                    : selectedTechnique.icon === "Check"
                      ? "🧘"
                      : "🏠"}
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-4 glow-text">
                  {selectedTechnique.name}
                </h3>
                <p className="text-slate-300 font-bold leading-relaxed mb-8">
                  {selectedTechnique.id === "t1"
                    ? "Cierra los ojos. Inhala aire profundamente contando hasta 4. Mantén el aire por 4 segundos. Exhala lentamente en 4 segundos. Siente cómo la calma entra en tu sistema."
                    : selectedTechnique.id === "t2"
                      ? "Busca: 5 cosas que puedas ver, 4 cosas que puedas tocar, 3 cosas que puedas oír, 2 cosas que puedas oler y 1 cosa que puedas probar. Esto te trae de vuelta al presente."
                      : "Imagina un lugar donde te sientas completamente seguro y feliz. Puede ser real o inventado. Cuando te sientas asustado, cierra los ojos y viaja allí."}
                </p>
                <button
                  onClick={() => setSelectedTechnique(null)}
                  className="w-full py-5 bg-brand-primary text-white font-black uppercase tracking-widest rounded-3xl border-b-8 border-purple-800 active:translate-y-1 active:border-b-0"
                >
                  ¡ENTENDIDO!
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
function AchievementStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-black/40 p-4 rounded-3xl flex flex-col items-center">
      {icon}
      <span className="text-[10px] font-black text-slate-500 uppercase mt-1">
        {label}
      </span>
      <span className="font-black text-lg text-white">{value}</span>
    </div>
  );
}

function BadgeItem({
  icon,
  unlocked,
  label,
}: {
  icon: string;
  unlocked: boolean;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all shadow-xl ${unlocked ? "bg-brand-primary/30 border-2 border-brand-primary shadow-purple-500/20 outline outline-2 outline-offset-2 outline-brand-primary/20" : "bg-slate-900 border-2 border-slate-800 grayscale scale-90 opacity-40"}`}
      >
        {icon}
      </div>
      <span className="text-[8px] font-black uppercase text-slate-500 mt-2 tracking-widest">
        {label}
      </span>
    </div>
  );
}

function ProfileView({
  stats,
  onEdit,
  onReset,
  onLogout,
  onBack,
}: {
  stats: UserStats;
  onEdit: () => void;
  onReset: () => void;
  onLogout: () => void;
  onBack: () => void;
  key?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-bg-main z-50 overflow-y-auto px-6 pt-10 pb-20"
    >
      <div className="max-w-md mx-auto flex flex-col items-center">
        <header className="w-full flex items-center justify-between mb-12">
          <button
            onClick={onBack}
            className="w-12 h-12 bg-bg-space rounded-2xl flex items-center justify-center text-white border-2 border-brand-primary/30 hover:scale-110 transition-transform"
          >
            <ChevronLeft />
          </button>
          <h2 className="text-xl font-black text-white uppercase tracking-widest glow-text">
            Tu Identidad
          </h2>
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

        <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-2 text-center">
          {stats.name}
        </h3>
        <p className="text-brand-primary font-black uppercase tracking-[0.3em] text-[10px] mb-12">
          Nivel {stats.level} · Cadete Galáctico
        </p>

        <div className="w-full space-y-4">
          <ProfileActionButton
            icon={<Edit />}
            label="Editar Perfil"
            onClick={onEdit}
            color="bg-brand-primary border-purple-800"
          />
          <ProfileActionButton
            icon={<LogOut />}
            label="Cerrar Sesión"
            onClick={onLogout}
            color="bg-bg-space border-brand-primary/30"
            secondary
          />
          <ProfileActionButton
            icon={<RefreshCcw />}
            label="Reiniciar Progreso"
            onClick={() => {
              if (confirm("¿Estás seguro? Perderás todo tu progreso espacial."))
                onReset();
            }}
            color="bg-slate-900 border-slate-950"
            danger
          />
        </div>

        <div className="mt-16 pt-8 border-t-2 border-brand-primary/10 w-full text-center">
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">
            Avalado por
          </p>
          <p className="font-black text-slate-300 text-sm italic uppercase tracking-tighter">
            Dra. Claudia Martínez · Colpsic #123456
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ProfileActionButton({
  icon,
  label,
  onClick,
  color,
  danger = false,
  secondary = false,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color: string;
  danger?: boolean;
  secondary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full py-5 px-6 rounded-3xl flex items-center justify-between transition-all active:scale-95 border-b-8 shadow-xl ${color} ${secondary ? "text-slate-200" : "text-white"}`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`${danger ? "text-accent-rose" : "text-accent-amber"} bg-white/10 p-2 rounded-xl`}
        >
          {icon}
        </div>
        <span className="font-black uppercase tracking-wider text-sm">
          {label}
        </span>
      </div>
      <ChevronRight size={20} className="text-white/20" />
    </button>
  );
}

function EditProfileModal({
  currentName,
  currentAvatar,
  onSave,
  onClose,
}: {
  currentName: string;
  currentAvatar: string;
  onSave: (n: string, a: string) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(currentName);
  const [avatar, setAvatar] = useState(currentAvatar);
  const avatars = ["👦", "👧", "🤖", "👾", "🚀", "⭐", "🪐", "🧠"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="bg-bg-space w-full max-w-sm rounded-[48px] p-8 border-8 border-brand-primary/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-black text-white uppercase tracking-widest text-center mb-8 glow-text">
          Editar Identidad
        </h3>

        <div className="mb-8">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
            Nombre de Héroe
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/40 border-2 border-brand-primary/30 rounded-2xl py-4 px-6 text-white font-black uppercase text-sm tracking-widest focus:outline-none focus:border-brand-primary"
          />
        </div>

        <div className="mb-10">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">
            Elegir Avatar
          </label>
          <div className="grid grid-cols-4 gap-4">
            {avatars.map((a) => (
              <button
                key={a}
                onClick={() => setAvatar(a)}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all ${a === avatar ? "bg-brand-primary border-b-4 border-purple-800 scale-110 shadow-lg" : "bg-black/40 border-2 border-brand-primary/10 hover:bg-black/60"}`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-4 bg-slate-900 text-slate-400 font-black uppercase tracking-widest text-xs rounded-2xl border-b-4 border-slate-950"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(name, avatar)}
            className="flex-1 py-4 bg-brand-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl border-b-4 border-purple-800 shadow-xl shadow-purple-900/20"
          >
            Guardar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function StatBadge({ icon, value }: { icon: React.ReactNode; value: number }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full font-bold text-sm">
      {icon}
      <span>{value}</span>
    </div>
  );
}

function NavButton({
  icon,
  label,
  onClick,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 ${active ? "text-white" : "text-slate-400"} hover:text-white transition-colors`}
    >
      <div className={`p-1 rounded-xl ${active ? "bg-blue-50/10" : ""}`}>
        {icon}
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest leading-none">
        {label}
      </span>
    </button>
  );
}

function LessonView({
  lesson,
  onClose,
  onComplete,
}: {
  lesson: Lesson;
  onClose: () => void;
  onComplete: () => void;
  key?: string;
}) {
  const [step, setStep] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<"wrong" | "tip" | "correct">(
    "tip",
  );
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const content = lesson.content || [];
  const currentContent = content[step];

  const toggleSpeak = () => {
    setIsSpeaking(!isSpeaking);
    if (!isSpeaking) {
      const textToSpeak = currentContent.text || currentContent.question;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = "es-ES";
      utterance.rate = 0.85; // Relaxed speed
      utterance.pitch = 1.1; // Friendly pitch

      // Try to find a better voice if available
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(
        (v) =>
          v.lang.includes("es") &&
          (v.name.includes("Monica") ||
            v.name.includes("Helena") ||
            v.name.includes("Google")),
      );
      if (spanishVoice) utterance.voice = spanishVoice;

      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
    }
  };

  const handleNext = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setShowHint(false);

    if (currentContent?.options && !showFeedback) {
      if (selectedOption === null) return;
      if (selectedOption === currentContent.correct) {
        setFeedbackType("correct");
        setShowFeedback(true);
      } else {
        setFeedbackType("wrong");
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

  const getHint = () => {
    if (currentContent.hint) return currentContent.hint;
    if (currentContent.options && currentContent.correct !== undefined) {
      const correctText = currentContent.options[currentContent.correct];
      return `Kaelen susurra: "Enfócate en la opción que menciona '${correctText.split(" ").slice(0, 2).join(" ")}...'. Es la clave para vencer esta sombra."`;
    }
    return "Confía en tu entrenamiento de Guardián.";
  };

  if (!currentContent) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-bg-main z-[60] flex flex-col border-8 border-brand-primary"
    >
      <header className="h-20 border-b-4 border-brand-primary/30 flex items-center px-4 md:px-8 gap-4 bg-bg-space/80 backdrop-blur-md">
        <button
          onClick={onClose}
          className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          <X size={32} />
        </button>
        <div className="flex-1 h-4 bg-black rounded-full overflow-hidden border-2 border-brand-primary/30 shadow-inner">
          <motion.div
            className="h-full bg-brand-primary shadow-[0_0_15px_#610094]"
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / content.length) * 100}%` }}
          />
        </div>
        <div className="text-white font-black text-xs uppercase tracking-widest hidden sm:block">
          {lesson.sectionId === "anxiety"
            ? "Etapa: Ansiedad"
            : "Etapa: Depresión"}
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${lesson.id}-${step}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className={`max-w-2xl w-full p-8 md:p-12 rounded-[60px] shadow-2xl border-4 relative overflow-hidden ${lesson.type === "boss" ? "bg-red-950/20 border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.2)]" : "bg-bg-space border-brand-primary/30"}`}
          >
            {lesson.type === "boss" && (
              <div className="absolute top-4 right-8 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
                <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">
                  Encuentro de Jefe
                </span>
              </div>
            )}

            <div className="absolute top-4 left-8 flex gap-2">
              <button
                onClick={toggleSpeak}
                className={`p-3 rounded-xl transition-all ${isSpeaking ? "bg-brand-primary text-white scale-110 shadow-[0_0_15px_#610094]" : "bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10"}`}
                title="Escuchar con voz relajada"
              >
                <Zap size={20} fill={isSpeaking ? "currentColor" : "none"} />
              </button>

              {currentContent.options && (
                <button
                  onClick={() => setShowHint(!showHint)}
                  className={`p-3 rounded-xl transition-all ${showHint ? "bg-accent-amber text-slate-900 scale-110 shadow-[0_0_15px_#FFB400]" : "bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10"}`}
                  title="Obtener pista"
                >
                  <Star size={20} fill={showHint ? "currentColor" : "none"} />
                </button>
              )}
            </div>

            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-20 left-8 right-8 bg-accent-amber/95 p-4 rounded-2xl border-2 border-yellow-400 text-slate-900 font-bold text-xs shadow-xl z-30"
              >
                {getHint()}
              </motion.div>
            )}

            {!currentContent.options ? (
              <div className="text-center mt-6">
                <div className="text-8xl md:text-9xl mb-8 transform hover:scale-110 transition-transform drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  {currentContent.image ||
                    (lesson.type === "boss" ? "👿" : "🪐")}
                </div>
                <h2 className="text-xl md:text-3xl font-black text-white leading-tight uppercase tracking-tight glow-text leading-relaxed">
                  {currentContent.text}
                </h2>
                <p className="mt-6 text-slate-400 italic font-bold text-sm">
                  Escucha y lee con atención para derrotar a las sombras.
                </p>
              </div>
            ) : (
              <div className="text-left w-full mt-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center text-4xl">
                    {lesson.type === "boss" ? "💀" : "❓"}
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight grow">
                    {currentContent.question}
                  </h2>
                </div>

                <div className="grid gap-4">
                  {currentContent.options.map((opt: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => !showFeedback && setSelectedOption(i)}
                      className={`w-full py-5 px-6 rounded-3xl border-b-8 font-black text-left flex items-center gap-4 transition-all ${
                        selectedOption === i
                          ? "bg-brand-primary text-white border-purple-800 scale-[1.02]"
                          : "bg-black/20 text-slate-300 border-black/40 hover:bg-black/40"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-black">
                        {String.fromCharCode(65 + i)}
                      </div>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Feedback Bubble - Professional and Explanatory */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className={`absolute bottom-32 w-full max-w-lg p-8 rounded-[40px] border-b-8 shadow-2xl z-20 ${
                feedbackType === "correct"
                  ? "bg-brand-success border-green-700 shadow-green-500/20"
                  : feedbackType === "wrong"
                    ? "bg-accent-rose border-rose-700 shadow-rose-500/20"
                    : "bg-accent-amber border-yellow-600 shadow-amber-500/20"
              }`}
            >
              <div className="flex gap-6">
                <div className="text-5xl">
                  {feedbackType === "correct"
                    ? "🏆"
                    : feedbackType === "wrong"
                      ? "🛸"
                      : "💡"}
                </div>
                <div>
                  <h3 className="font-black text-white uppercase text-sm mb-2 tracking-widest">
                    {feedbackType === "correct"
                      ? "Retroalimentación Heroica"
                      : "Análisis del Guardián"}
                  </h3>
                  <p className="text-sm text-white/95 font-bold leading-relaxed">
                    {feedbackType === "correct" ? (
                      <>
                        <span className="block mb-2">
                          ¡Excelente análisis, Guardián!
                        </span>
                        {currentContent.feedback ||
                          "Esta respuesta demuestra una comprensión sólida de los mecanismos psicológicos necesarios para gestionar tus emociones. Sigue aplicando este criterio en tu camino."}
                      </>
                    ) : (
                      "La sombra ha nublado tu juicio esta vez. No te preocupes, el fracaso es solo un peldaño hacia el mando. Analiza la situación y busca la respuesta que promueva la salud y la calma."
                    )}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (feedbackType === "correct") {
                    handleNext();
                  } else {
                    setShowFeedback(false);
                    setSelectedOption(null);
                  }
                }}
                className="mt-8 w-full py-5 bg-black/30 hover:bg-black/40 text-white font-black text-sm uppercase tracking-[0.2em] border-2 border-white/20 rounded-2xl transition-all"
              >
                {feedbackType === "correct"
                  ? "CONTINUAR EL VIAJE"
                  : "REINTENTAR ANÁLISIS"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="p-8 border-t-4 border-brand-primary/30 bg-bg-space/80">
        <div className="max-w-xl mx-auto flex gap-4">
          <button
            onClick={handleNext}
            disabled={
              currentContent.options && selectedOption === null && !showFeedback
            }
            className={`w-full py-6 bg-brand-primary text-white font-black text-xl rounded-3xl shadow-xl border-b-8 border-purple-800 hover:scale-[1.02] transition-all active:translate-y-1 active:border-b-0 uppercase tracking-widest glow-text ${currentContent.options && selectedOption === null && !showFeedback ? "opacity-50 grayscale cursor-not-allowed" : ""}`}
          >
            {step < content.length - 1
              ? "SIGUIENTE PASO"
              : lesson.type === "boss"
                ? "¡JEFE DERROTADO!"
                : "¡MISIÓN COMPLETADA!"}
          </button>
        </div>
      </footer>
    </motion.div>
  );
}

function InteractiveBreathe({
  steps,
  onFinish,
}: {
  steps: number;
  onFinish: () => void;
}) {
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= steps) {
      onFinish();
      return;
    }

    const timer = setInterval(() => {
      setPhase((p) => {
        if (p === "inhale") return "hold";
        if (p === "hold") return "exhale";
        setCount((c) => c + 1);
        return "inhale";
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [count, steps, onFinish]);

  return (
    <div className="flex flex-col items-center">
      <motion.div
        animate={{
          scale: phase === "inhale" ? 1.5 : phase === "hold" ? 1.5 : 0.8,
          opacity: phase === "hold" ? 1 : 0.7,
        }}
        transition={{ duration: 4, ease: "easeInOut" }}
        className="w-32 h-32 bg-brand-primary rounded-full flex items-center justify-center text-white text-3xl shadow-[0_0_40px_#610094]"
      >
        <Wind size={40} />
      </motion.div>
      <div className="mt-12">
        <p className="text-2xl font-black text-white uppercase tracking-widest">
          {phase === "inhale"
            ? "Inhala..."
            : phase === "hold"
              ? "Mantén..."
              : "Exhala..."}
        </p>
        <p className="text-slate-500 font-bold mt-2 italic">
          Ciclo {count + 1} de {steps}
        </p>
      </div>
    </div>
  );
}

function CrisisModal({
  contacts,
  onClose,
}: {
  contacts: CrisisContact[];
  onClose: () => void;
}) {
  const [activeTechnique, setActiveTechnique] = useState<
    "478" | "54321" | null
  >(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, scale: 0.9 }}
        animate={{ y: 0, scale: 1 }}
        className="bg-white w-full max-w-lg rounded-[48px] overflow-hidden shadow-2xl border-8 border-gray-50 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-accent-rose p-6 md:p-8 text-white text-center border-b-8 border-rose-800 shrink-0">
          <ShieldAlert size={48} className="mx-auto mb-2" />
          <h2 className="text-2xl font-black mb-1 uppercase tracking-tight">
            Protocolo de Emergencia
          </h2>
          <p className="text-rose-100 text-[10px] font-black uppercase tracking-widest opacity-80 animate-pulse">
            IMPORTANTE: Mal uso podría tener consecuencias legales
          </p>
        </div>

        <div className="p-6 overflow-y-auto space-y-8">
          {/* Herramientas Rápidas Section */}
          <section>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Zap size={14} className="text-accent-amber" /> Herramientas de
              Calma Inmediata
            </h3>
            <div className="grid gap-4">
              <button
                onClick={() => setActiveTechnique("478")}
                className="w-full p-6 bg-blue-50 border-2 border-blue-100 rounded-[32px] text-left hover:scale-[1.02] transition-transform group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm group-hover:rotate-12 transition-transform">
                    <Wind size={24} />
                  </div>
                  <div>
                    <p className="font-black text-slate-800 uppercase text-xs tracking-tight">
                      Técnica 4-7-8
                    </p>
                    <p className="text-[10px] text-slate-500 font-bold">
                      Respiración profunda controlada.
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveTechnique("54321")}
                className="w-full p-6 bg-purple-50 border-2 border-purple-100 rounded-[32px] text-left hover:scale-[1.02] transition-transform group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-purple-600 shadow-sm group-hover:rotate-12 transition-transform">
                    <Star size={24} />
                  </div>
                  <div>
                    <p className="font-black text-slate-800 uppercase text-xs tracking-tight">
                      Método 5-4-3-2-1
                    </p>
                    <p className="text-[10px] text-slate-500 font-bold">
                      Grounding para volver al presente.
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </section>

          {/* Contactos Section */}
          <section>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
              Líneas de Ayuda Profesional
            </h3>
            <div className="space-y-3">
              {contacts.map((contact) => (
                <a
                  key={contact.number}
                  href={`tel:${contact.number.replace(/\s/g, "")}`}
                  className="flex items-center gap-4 p-4 bg-slate-50 border-2 border-gray-100 rounded-2xl hover:bg-slate-100 transition-all group active:scale-95"
                >
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-accent-rose group-hover:scale-110 transition-transform border-b-2 border-gray-100">
                    <Phone size={18} fill="currentColor" />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-slate-800 uppercase text-[10px] tracking-widest">
                      {contact.name}
                    </p>
                    <p className="text-xs text-slate-500 font-black">
                      {contact.number}
                    </p>
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
              <button
                onClick={() => setActiveTechnique(null)}
                className="absolute top-8 right-8 text-slate-300 hover:text-slate-800 transition-colors"
              >
                <X size={32} />
              </button>

              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="text-7xl mb-8">
                  {activeTechnique === "478" ? "🌬️" : "🌍"}
                </div>
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-widest mb-6">
                  {activeTechnique === "478"
                    ? "Respiración 4-7-8"
                    : "Grounding 5-4-3-2-1"}
                </h3>

                <div className="space-y-6 text-slate-600 font-bold leading-relaxed text-lg">
                  {activeTechnique === "478" ? (
                    <ul className="space-y-4">
                      <li className="flex items-center gap-4 bg-blue-50 p-4 rounded-2xl">
                        <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
                          1
                        </span>{" "}
                        Inhala por la nariz (4s)
                      </li>
                      <li className="flex items-center gap-4 bg-blue-50 p-4 rounded-2xl">
                        <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
                          2
                        </span>{" "}
                        Mantén el aire (7s)
                      </li>
                      <li className="flex items-center gap-4 bg-blue-50 p-4 rounded-2xl">
                        <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
                          3
                        </span>{" "}
                        Exhala por la boca (8s)
                      </li>
                    </ul>
                  ) : (
                    <ul className="space-y-3">
                      <li className="flex items-center gap-4 bg-purple-50 p-3 rounded-xl">
                        <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">
                          5
                        </span>{" "}
                        cosas que ves
                      </li>
                      <li className="flex items-center gap-4 bg-purple-50 p-3 rounded-xl">
                        <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">
                          4
                        </span>{" "}
                        cosas que sientes
                      </li>
                      <li className="flex items-center gap-4 bg-purple-50 p-3 rounded-xl">
                        <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">
                          3
                        </span>{" "}
                        cosas que escuchas
                      </li>
                      <li className="flex items-center gap-4 bg-purple-50 p-3 rounded-xl">
                        <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">
                          2
                        </span>{" "}
                        cosas que hueles
                      </li>
                      <li className="flex items-center gap-4 bg-purple-50 p-3 rounded-xl">
                        <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">
                          1
                        </span>{" "}
                        cosa que saboreas
                      </li>
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
