import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  X,
  ArrowUp,
  ArrowDown,
  Smile,
  Shield,
  Heart,
  User,
  Sparkles,
  Volume2,
  Wind,
  AlertTriangle,
  Info,
  ChevronRight,
  Eye,
  Lock,
  MessageSquare,
} from "lucide-react";

// ==========================================
// 1. COMPLETAR FRASE (FILL IN THE BLANK GAPS)
// ==========================================
export function CompletarFrase({
  text,
  sentences,
  bank,
  correct,
  feedback,
  onSuccess,
}: {
  text: string;
  sentences: string[]; // E.g. ["Cuando evito algo que me da miedo, siento [GAP] por un momento...", ...]
  bank: string[]; // Word bank E.g. ["alivio", "tristeza", ...]
  correct: string[]; // Correct answers in order E.g. ["alivio", "más grande", "afrontar"]
  feedback: string;
  onSuccess: () => void;
}) {
  // Store user selections for each gap
  const [selections, setSelections] = useState<string[]>(
    Array(correct.length).fill(""),
  );
  const [activeGap, setActiveGap] = useState<number | null>(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleWordSelect = (word: string) => {
    if (activeGap === null) return;

    const newSelections = [...selections];
    newSelections[activeGap] = word;
    setSelections(newSelections);

    // Auto-advance active gap if blank
    const nextGap = newSelections.findIndex((s) => s === "");
    if (nextGap !== -1) {
      setActiveGap(nextGap);
    } else {
      setActiveGap(null);
    }
  };

  const handleClearGap = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelections = [...selections];
    newSelections[index] = "";
    setSelections(newSelections);
    setActiveGap(index);
    setShowResult(false);
  };

  const verifyAnswers = () => {
    const allFilled = selections.every((s) => s !== "");
    if (!allFilled) return;

    const matchesAll = selections.every(
      (selected, i) => selected.toLowerCase() === correct[i].toLowerCase(),
    );
    setIsCorrect(matchesAll);
    setShowResult(true);
  };

  return (
    <div className="w-full text-left space-y-6">
      <div className="bg-purple-950/20 p-6 rounded-3xl border border-purple-500/20">
        <p className="text-xs text-brand-success font-black uppercase tracking-widest mb-2 flex items-center gap-2">
          <Sparkles size={14} /> Juego: Completar Frase
        </p>
        <p className="text-slate-300 text-sm font-bold leading-relaxed">
          {text}
        </p>
      </div>

      <div className="bg-black/30 p-6 rounded-[32px] border border-white/5 space-y-6">
        {sentences.map((sentence, sIdx) => {
          // Render sentences with interactive inputs for gaps like [GAP_0]
          const parts = sentence.split(/\[GAP_(\d+)\]/g);

          return (
            <p
              key={sIdx}
              className="text-base md:text-lg text-white font-medium leading-loose flex flex-wrap items-center gap-y-2"
            >
              {parts.map((part, pIdx) => {
                const match = part.match(/^\d+$/);
                if (match) {
                  const gapIdx = parseInt(part, 10);
                  const isSelected = selections[gapIdx] !== "";
                  const isActive = activeGap === gapIdx;

                  return (
                    <button
                      key={pIdx}
                      onClick={() => {
                        setActiveGap(gapIdx);
                        setShowResult(false);
                      }}
                      className={`mx-2 px-4 py-2 rounded-2xl font-black text-sm uppercase tracking-wider transition-all border-2 flex items-center gap-2 ${
                        isActive
                          ? "bg-purple-600/40 border-yellow-400 text-yellow-350 shadow-[0_0_15px_rgba(244,196,48,0.2)] animate-pulse"
                          : isSelected
                            ? "bg-purple-900 border-purple-500 text-white"
                            : "bg-slate-950 border-slate-800 text-slate-500 border-dashed border-3"
                      }`}
                    >
                      {isSelected ? selections[gapIdx] : `Falta palabra`}
                      {isSelected && (
                        <span
                          onClick={(e) => handleClearGap(gapIdx, e)}
                          className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[8px] hover:bg-red-650"
                        >
                          ✕
                        </span>
                      )}
                    </button>
                  );
                }
                return (
                  <span key={pIdx} className="opacity-90">
                    {part}
                  </span>
                );
              })}
            </p>
          );
        })}
      </div>

      {/* Word bank */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
          Banco de Palabras (Elige una para el espacio marcado):
        </label>
        <div className="flex flex-wrap gap-2">
          {bank.map((word) => {
            const isUsed = selections.includes(word);
            return (
              <button
                key={word}
                disabled={isUsed && activeGap === null}
                onClick={() => handleWordSelect(word)}
                className={`px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-wider border-2 transition-all ${
                  isUsed
                    ? "bg-slate-900/50 text-slate-600 border-slate-900/10 cursor-not-allowed opacity-40 line-through"
                    : "bg-slate-900 text-slate-200 border-slate-800 hover:border-purple-500 hover:text-white"
                }`}
              >
                {word}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-6 rounded-3xl border-2 ${
              isCorrect
                ? "bg-green-950/40 border-green-500 text-green-200"
                : "bg-red-950/40 border-red-500 text-red-200"
            }`}
          >
            <div className="flex gap-4 items-start">
              <span className="text-3xl">{isCorrect ? "✨" : "⚠️"}</span>
              <div className="flex-1">
                <p className="font-black text-sm uppercase tracking-wider">
                  {isCorrect ? "¡PROCESO CORRECTO!" : "HAY INCOHERENCIAS"}
                </p>
                <p className="text-xs mt-2 leading-relaxed">
                  {isCorrect
                    ? feedback
                    : "Algunas de las palabras colocadas no concuerdan con los principios terapéuticos. ¡Revisa el ciclo de la ansiedad y vuelve a intentarlo!"}
                </p>
              </div>
            </div>
            {isCorrect ? (
              <button
                onClick={onSuccess}
                className="mt-4 w-full py-4 bg-brand-success text-white font-black text-xs uppercase tracking-widest rounded-xl hover:scale-[1.01] transition-transform"
              >
                Completar Misión
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowResult(false);
                  setSelections(Array(correct.length).fill(""));
                  setActiveGap(0);
                }}
                className="mt-4 w-full py-4 bg-red-650 hover:bg-red-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all"
              >
                Limpiar y Reintentar
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!showResult && (
        <button
          onClick={verifyAnswers}
          disabled={selections.some((s) => s === "")}
          className="w-full py-5 bg-purple-600 text-white font-black rounded-3xl border-b-8 border-purple-800 tracking-widest uppercase hover:scale-[1.01] transition-all disabled:opacity-50 disabled:grayscale disabled:pointer-events-none"
        >
          Verificar Respuestas
        </button>
      )}
    </div>
  );
}

// ==========================================
// 2. ORDENAR SECUENCIA (CARD SEQUENCING GAME)
// ==========================================
export function OrdenarSecuencia({
  text,
  initialItems,
  correctItems,
  feedback,
  onSuccess,
}: {
  text: string;
  initialItems: string[];
  correctItems: string[];
  feedback: string;
  onSuccess: () => void;
}) {
  const [items, setItems] = useState<string[]>(initialItems);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const moveItem = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === items.length - 1) return;

    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIdx];
    newItems[targetIdx] = temp;
    setItems(newItems);
    setShowResult(false);
  };

  const verifyOrder = () => {
    const isOrdered = items.every((item, i) => item === correctItems[i]);
    setIsCorrect(isOrdered);
    setShowResult(true);
  };

  return (
    <div className="w-full text-left space-y-6">
      <div className="bg-purple-950/20 p-6 rounded-3xl border border-purple-500/20">
        <p className="text-xs text-brand-success font-black uppercase tracking-widest mb-2 flex items-center gap-2">
          <Sparkles size={14} /> Ordenar Secuencia
        </p>
        <p className="text-slate-300 text-sm font-bold leading-relaxed">
          {text}
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={item}
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex items-center gap-4 bg-slate-900 border-2 border-slate-800 p-5 rounded-3xl relative overflow-hidden group hover:border-purple-500/50"
          >
            {/* Number badge */}
            <div className="w-10 h-10 rounded-2xl bg-purple-950 border border-purple-500/30 flex items-center justify-center text-white text-xs font-black shrink-0 shadow-lg">
              {index + 1}
            </div>

            <p className="text-sm md:text-base text-gray-100 font-bold flex-1 pr-6">
              {item}
            </p>

            {/* UP / DOWN controls */}
            <div className="flex flex-col gap-1 shrink-0">
              <button
                disabled={index === 0}
                onClick={() => moveItem(index, "up")}
                className={`p-2 rounded-xl transition-all border ${
                  index === 0
                    ? "opacity-20 cursor-not-allowed border-slate-950"
                    : "bg-slate-950 text-slate-350 border-slate-850 hover:bg-purple-950 hover:text-white hover:border-purple-500"
                }`}
              >
                <ArrowUp size={16} />
              </button>
              <button
                disabled={index === items.length - 1}
                onClick={() => moveItem(index, "down")}
                className={`p-2 rounded-xl transition-all border ${
                  index === items.length - 1
                    ? "opacity-20 cursor-not-allowed border-slate-950"
                    : "bg-slate-950 text-slate-350 border-slate-850 hover:bg-purple-950 hover:text-white hover:border-purple-500"
                }`}
              >
                <ArrowDown size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-6 rounded-3xl border-2 ${
              isCorrect
                ? "bg-green-950/40 border-green-500 text-green-200"
                : "bg-red-950/40 border-red-500 text-red-200"
            }`}
          >
            <div className="flex gap-4 items-start">
              <span className="text-3xl">{isCorrect ? "🏆" : "👾"}</span>
              <div className="flex-1">
                <p className="font-black text-sm uppercase tracking-wider">
                  {isCorrect
                    ? "¡Módulos Alineados Correctamente!"
                    : "Orden Turbulento"}
                </p>
                <p className="text-xs mt-2 leading-relaxed">
                  {isCorrect
                    ? feedback
                    : "El flujo de pasos contiene incongruencias. Revisa los tiempos o etapas y reorganízalas desde el principio."}
                </p>
              </div>
            </div>
            {isCorrect && (
              <button
                onClick={onSuccess}
                className="mt-4 w-full py-4 bg-brand-success text-white font-black text-xs uppercase tracking-widest rounded-xl hover:scale-[1.01] transition-transform"
              >
                Completar Misión
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!isCorrect && (
        <button
          onClick={verifyOrder}
          className="w-full py-5 bg-purple-600 text-white font-black rounded-3xl border-b-8 border-purple-800 tracking-widest uppercase hover:scale-[1.01] transition-all"
        >
          Confirmar Orden de la Secuencia
        </button>
      )}
    </div>
  );
}

// ==========================================
// 3. MAPA CORPORAL (ANXIETY BODILY MAP)
// ==========================================
export function MapaCorporal({ onSuccess }: { onSuccess: () => void }) {
  const hotspots = [
    {
      id: "heart",
      name: "Corazón acelerado / Taquicardia",
      label: "El corazón acelerado",
      explanation:
        "El corazón se acelera porque el cerebro está preparando al cuerpo para actuar. No es peligroso, es tu sistema de alarma funcionando.",
      top: "32%",
      left: "52%",
    },
    {
      id: "chest",
      name: "Respiración agitada / Opresión",
      label: "La respiración agitada o nudo en el pecho",
      explanation:
        "La respiración se vuelve de forma rápida y superficial para oxigenar tus músculos con fuerza en situaciones críticas.",
      top: "25%",
      left: "42%",
    },
    {
      id: "hands",
      name: "Sudoración en las manos",
      label: "Manos sudorosas, temblorosas o frías",
      explanation:
        "La sudoración es un radiador corporal que enfría el cuerpo durante el combate o la huida, evitando sobrecalentarse.",
      top: "50%",
      left: "26%",
    },
    {
      id: "stomach",
      name: "Nudo en el estómago",
      label: "Nudo en el estómago o revoltijo",
      explanation:
        "Tu estómago se debilita porque el sistema digestivo gasta mucha energía, la cual es redirigida hacia brazos y piernas para ponerse a salvo.",
      top: "46%",
      left: "50%",
    },
  ];

  const [matchedSensations, setMatchedSensations] = useState<string[]>([]);
  const [activeSensation, setActiveSensation] = useState<string | null>(null);
  const [selectedHotspotText, setSelectedHotspotText] = useState<string | null>(
    null,
  );

  const handleSensationClick = (id: string) => {
    setActiveSensation(id);
    setSelectedHotspotText(null);
  };

  const handleHotspotClick = (hotspotId: string) => {
    if (!activeSensation) return;

    if (activeSensation === hotspotId) {
      if (!matchedSensations.includes(hotspotId)) {
        setMatchedSensations([...matchedSensations, hotspotId]);
      }
      setSelectedHotspotText(
        hotspots.find((h) => h.id === hotspotId)?.explanation || null,
      );
      setActiveSensation(null);
    } else {
      alert("¡Prueba en otra parte de la silueta!");
    }
  };

  const allCompleted = matchedSensations.length === hotspots.length;

  return (
    <div className="w-full text-left space-y-6">
      <div className="bg-purple-950/20 p-6 rounded-3xl border border-purple-500/20">
        <p className="text-xs text-brand-success font-black uppercase tracking-widest mb-1 flex items-center gap-2">
          <Sparkles size={14} /> Tarea Activa: Mi Cuerpo tiene el Mapa
        </p>
        <p className="text-slate-300 text-sm font-bold leading-relaxed">
          Haz clic en una de las sensaciones físicas abajo, y colócala en el
          círculo correcto sobre la silueta del astronauta.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-black/40 p-6 rounded-[48px] border border-white/5 relative min-h-[480px]">
        {/* Body Graphic silhouette */}
        <div className="relative w-full aspect-[3/4] max-w-[280px] mx-auto bg-slate-950/40 rounded-[40px] border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center p-4">
          {/* Glowing human body outline */}
          <svg
            className="w-full h-full text-indigo-500/30 filter drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]"
            viewBox="0 0 100 120"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {/* Outline of helmet astronaut */}
            <circle cx="50" cy="18" r="10" strokeWidth="2" />
            <path
              d="M50,8 A12,12 0 1,1 50,28 A12,12 0 1,1 50,8"
              strokeWidth="1"
              strokeDasharray="3 2"
            />
            {/* Trunk shoulders */}
            <path d="M28,34 Q50,28 72,34 C74,50 68,70 65,75" strokeWidth="2" />
            <path
              d="M35,34 L65,34 L60,80 L40,80 Z"
              strokeWidth="2"
              fill="currentColor"
              fillOpacity="0.05"
            />
            {/* Arms */}
            <path d="M28,34 C20,44 14,54 26,58 C29,54 34,42 35,34" />
            <path d="M72,34 C80,44 86,54 74,58 C71,54 66,42 65,34" />
            {/* Legs */}
            <path d="M40,80 L35,115 L46,115 L48,80" />
            <path d="M60,80 L65,115 L54,115 L52,80" />
            {/* Chest shield */}
            <rect
              x="42"
              y="32"
              width="16"
              height="18"
              rx="2"
              strokeWidth="1"
              strokeDasharray="2 1"
            />
          </svg>

          {/* Glowing Hotspots */}
          {hotspots.map((hs) => {
            const isMatched = matchedSensations.includes(hs.id);
            const isActiveTarget = activeSensation === hs.id;

            return (
              <button
                key={hs.id}
                onClick={() => handleHotspotClick(hs.id)}
                style={{ top: hs.top, left: hs.left }}
                className={`absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center border-2 transition-all cursor-pointer ${
                  isMatched
                    ? "bg-green-500 border-white text-white shadow-[0_0_20px_#22c55e] scale-110"
                    : isActiveTarget
                      ? "bg-yellow-400 border-white text-slate-900 shadow-[0_0_20px_#eab308] scale-125 animate-ping"
                      : "bg-indigo-600/40 border-indigo-400 text-indigo-200 animate-pulse hover:scale-110"
                }`}
              >
                {isMatched ? "✓" : "?"}
              </button>
            );
          })}
        </div>

        {/* Sensations to assign */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
            Sensaciones Disponibles (Toca una y pulsa en la silueta):
          </label>
          <div className="grid gap-3">
            {hotspots.map((hs) => {
              const isMatched = matchedSensations.includes(hs.id);
              const isSelected = activeSensation === hs.id;

              return (
                <button
                  key={hs.id}
                  disabled={isMatched}
                  onClick={() => handleSensationClick(hs.id)}
                  className={`w-full p-4 rounded-2xl text-left border-2 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-between ${
                    isMatched
                      ? "bg-green-950/20 text-green-500 border-green-500/20 opacity-60"
                      : isSelected
                        ? "bg-yellow-400 text-black border-yellow-200 scale-[1.03] shadow-lg"
                        : "bg-slate-900 text-slate-200 border-slate-800 hover:border-purple-500/50 hover:bg-slate-900/80"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center font-black">
                      {isMatched ? "✓" : "●"}
                    </span>
                    {hs.name}
                  </span>
                  {isSelected && (
                    <span className="text-[9px] font-black bg-black px-2 py-1 text-yellow-400 rounded-md">
                      Coloca en el cuerpo
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {selectedHotspotText && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-purple-900/40 p-5 rounded-3xl border border-purple-500/30 text-white font-semibold text-xs leading-relaxed flex gap-3"
              >
                <div className="text-3xl">🫁</div>
                <div>
                  <h4 className="font-black text-yellow-400 uppercase tracking-widest text-[10px] mb-1">
                    Entendiendo la Señal
                  </h4>
                  {selectedHotspotText}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {allCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl border-2 border-green-500 bg-green-950/40 text-green-200 text-sm font-bold"
          >
            <p className="font-black text-base uppercase mb-2">
              ¡MAPA EXAMINADO CON ÉXITO!
            </p>
            <p className="text-xs leading-relaxed mb-4">
              Cada cuerpo siente la alarma de forma distinta. Conocer cómo te
              avisa tu cuerpo es el primer paso indispensable para actuar con
              Grounding o respiración antes de que te agobies. ¡Excelente
              trabajo, Cadete!
            </p>
            <button
              onClick={onSuccess}
              className="w-full py-5 bg-brand-success text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:scale-[1.01] transition-all"
            >
              Completar Nivel
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==========================================
// 4. HECHO O INTERPRETACIÓN (SWIPE/SLIDE CARDS)
// ==========================================
export function HechoInterpretacion({ onSuccess }: { onSuccess: () => void }) {
  const cards = [
    {
      phrase: "Llegar tarde a clase",
      isFact: true,
      feedback:
        "Un retraso de horario es un dato objetivo comprobable: entraste al salón más tarde.",
    },
    {
      phrase:
        "Todos en el salón me estaban juzgando y criticándolo en su mente",
      isFact: false,
      feedback:
        "Adivinar la mente de los demás es un pensamiento trampa. Una cámara de video no podría grabar mentes juzgando.",
    },
    {
      phrase: "Sacar una calificación de 1.5 en el examen final",
      isFact: true,
      feedback:
        "La nota en papel es un hecho medible que cualquier cámara podría registrar.",
    },
    {
      phrase:
        "Esa nota arruina mi vida completa y demuestra que soy un inútil total",
      isFact: false,
      feedback:
        "Es una interpretación catastrófica. La nota es temporal, no define tu valía humana ni tu destino vital.",
    },
  ];

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState<string | null>(
    null,
  );
  const [currentResult, setCurrentResult] = useState<
    "correct" | "incorrect" | null
  >(null);

  const handleClassify = (choiceIsFact: boolean) => {
    const isCorrectClassification = cards[index].isFact === choiceIsFact;
    if (isCorrectClassification) {
      setScore((s) => s + 1);
      setCurrentResult("correct");
    } else {
      setCurrentResult("incorrect");
    }
    setShowAnswerFeedback(cards[index].feedback);
  };

  const handleNext = () => {
    setShowAnswerFeedback(null);
    setCurrentResult(null);
    if (index < cards.length - 1) {
      setIndex(index + 1);
    } else {
      // Finished all cards!
    }
  };

  const allDone =
    index >= cards.length - 1 &&
    showAnswerFeedback === null &&
    currentResult === null;

  return (
    <div className="w-full text-left space-y-6">
      <div className="bg-purple-950/20 p-6 rounded-3xl border border-purple-500/20">
        <p className="text-xs text-brand-success font-black uppercase tracking-widest mb-1 flex items-center gap-2">
          <Sparkles size={14} /> Laboratorio: Separador de Hechos
        </p>
        <p className="text-slate-300 text-sm font-bold leading-relaxed">
          Clasifica cada frase en \"Hechos\" (comprobables por cámara) o
          \"Interpretaciones de tu mente\" (lo que el miedo agrega).
        </p>
      </div>

      {index < cards.length && score < 5 && !allDone && (
        <div className="bg-slate-900 border border-slate-800 rounded-[48px] p-6 space-y-6 text-center">
          {/* Deck display */}
          <div className="text-xs font-black uppercase text-slate-500 tracking-wider">
            Tarjeta de situación {index + 1} de {cards.length}
          </div>

          <AnimatePresence mode="wait">
            {!showAnswerFeedback ? (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-950/60 p-8 rounded-3xl border-2 border-indigo-500/20 text-white font-extrabold text-lg flex items-center justify-center min-h-[160px] shadow-inner"
              >
                \"{cards[index].phrase}\"
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-6 rounded-3xl border-2 text-left space-y-3 ${
                  currentResult === "correct"
                    ? "bg-green-950/40 border-green-500 text-green-200"
                    : "bg-red-950/40 border-red-500 text-red-200"
                }`}
              >
                <div className="flex gap-4 items-center mb-3">
                  <span className="text-3xl">
                    {currentResult === "correct" ? "🎯" : "⚠️"}
                  </span>
                  <p className="font-black text-sm uppercase tracking-wider">
                    {currentResult === "correct"
                      ? "¡ACERTADO!"
                      : "Sombra Mental Detectada"}
                  </p>
                </div>
                <p className="text-xs leading-relaxed font-bold">
                  {showAnswerFeedback}
                </p>
                <button
                  onClick={handleNext}
                  className="w-full mt-4 py-3 bg-black/40 border border-white/10 hover:bg-black/60 text-white font-black uppercase tracking-wider text-[10px] rounded-xl"
                >
                  Siguiente Situación
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {!showAnswerFeedback && (
            <div className="flex gap-4">
              <button
                onClick={() => handleClassify(true)}
                className="flex-1 py-5 bg-indigo-600 border-b-8 border-indigo-800 text-white font-black tracking-widest rounded-2xl uppercase text-xs hover:scale-[1.02] active:translate-y-1 active:border-b-0 flex flex-col items-center gap-1"
              >
                <span>Hecho Comprobable</span>
                <span className="text-[10px] text-indigo-200 normal-case tracking-normal opacity-90">
                  \"Lo graba una cámara 📹\"
                </span>
              </button>
              <button
                onClick={() => handleClassify(false)}
                className="flex-1 py-5 bg-purple-600 border-b-8 border-purple-800 text-white font-black tracking-widest rounded-2xl uppercase text-xs hover:scale-[1.02] active:translate-y-1 active:border-b-0 flex flex-col items-center gap-1"
              >
                <span>Interpretación</span>
                <span className="text-[10px] text-purple-200 normal-case tracking-normal opacity-90">
                  \"Lo que añade la mente 🧠\"
                </span>
              </button>
            </div>
          )}
        </div>
      )}

      {(index >= cards.length || allDone) && (
        <div className="p-6 rounded-3xl border-2 border-green-500 bg-green-950/40 text-green-200 text-sm font-bold">
          <p className="font-black text-base uppercase mb-2">
            ¡SALA DE REDACCIÓN COMPLETADA!
          </p>
          <p className="text-xs leading-relaxed mb-4">
            Has separado el ruido mental de las verdades del entorno. Entrenar
            esto te evitará cargar con sufrimientos creados únicamente por
            proyecciones de temor. ¡Continúa en tu trayecto!
          </p>
          <button
            onClick={onSuccess}
            className="w-full py-5 bg-brand-success text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:scale-[1.01] transition-all"
          >
            Finalizar Nivel
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 5. VELOCÍMETRO DE ANSIEDAD (SUDS SLIDER)
// ==========================================
export function VelocimetroAnsiedad({ onSuccess }: { onSuccess: () => void }) {
  const [sliderVal, setSliderVal] = useState(5);
  const [step, setStep] = useState(1); // 1: Slider, 2: Open reaction
  const [reason, setReason] = useState("");

  const getSudsDescription = (val: number) => {
    if (val <= 2)
      return {
        title: "Zona Segura 🟢 (Tranquilo)",
        body: "Estás tranquilo. Tu cuerpo está en un estado relajado, ideal para aprender destrezas o planear nuevas tareas.",
      };
    if (val <= 5)
      return {
        title: "Alerta Leve 🟡 (Alerta)",
        body: "Ansiedad leve. Tu alarma interna se está despertando. Buen momento para usar la Respiración Cuadrada antes de que el velocímetro siga subiendo.",
      };
    if (val <= 8)
      return {
        title: "Ansiedad Moderada 🟠 (Acción)",
        body: "Ansiedad moderada. Haz una pausa inmediata. Es momento de usar la técnica de Grounding 5-4-3-2-1 para traerte de vuelta al presente.",
      };
    return {
      title: "Ansiedad Crítica 🔴 (Auxilio)",
      body: "Ansiedad muy alta. Te sientes abrumado. Busca a un adulto, profesor o tutor de confianza. Recuerda usar el botón de SOS si sientes pánico extremo.",
    };
  };

  const desc = getSudsDescription(sliderVal);

  return (
    <div className="w-full text-left space-y-6">
      <div className="bg-purple-950/20 p-6 rounded-3xl border border-purple-500/20">
        <p className="text-xs text-brand-success font-black uppercase tracking-widest mb-1 flex items-center gap-2">
          <Sparkles size={14} /> Monitorización: El Velocímetro Emocional
        </p>
        <p className="text-slate-300 text-sm font-bold leading-relaxed">
          Mueve el deslizador para ubicar la lectura honesta de tu nivel de
          tensión o ansiedad en este momento preciso.
        </p>
      </div>

      {step === 1 ? (
        <div className="bg-black/30 border border-white/5 rounded-[40px] p-6 space-y-8">
          {/* Dial and value */}
          <div className="text-center space-y-2">
            <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500 glow-text">
              {sliderVal}
            </span>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">
              Escala de Tensión
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="range"
              min="0"
              max="10"
              value={sliderVal}
              onChange={(e) => setSliderVal(parseInt(e.target.value, 10))}
              className="w-full h-4 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex justify-between text-[10px] font-black uppercase text-slate-500 tracking-wider">
              <span>0 (Paz Total)</span>
              <span>5 (Moderado)</span>
              <span>10 (Pánico)</span>
            </div>
          </div>

          {/* Dynamic explanation card */}
          <div className="p-6 bg-slate-950 border-2 border-slate-900 rounded-3xl space-y-2">
            <h4 className="font-extrabold text-sm text-yellow-500 uppercase flex items-center gap-2">
              <Info size={16} /> {desc.title}
            </h4>
            <p className="text-xs leading-relaxed text-slate-400">
              {desc.body}
            </p>
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full py-5 bg-purple-600 border-b-8 border-purple-800 text-white font-black tracking-widest rounded-2xl uppercase text-xs"
          >
            Confirmar e Introducir Detalle
          </button>
        </div>
      ) : (
        <div className="bg-black/30 border border-white/5 rounded-[40px] p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-200">
              Pregunta de Autoconocimiento:
            </label>
            <p className="text-sm font-bold text-slate-400">
              ¿Qué crees que encendió o alteró tu velocidad el día de hoy en el
              colegio o tu casa?
            </p>
          </div>

          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Escribe brevemente sobre la situación..."
            className="w-full h-32 bg-slate-950 border-2 border-slate-900 focus:border-purple-500 font-bold text-sm text-slate-200 p-4 rounded-3xl outline-none"
          />

          <button
            onClick={onSuccess}
            className="w-full py-5 bg-brand-success border-b-8 border-green-800 text-white font-black tracking-widest rounded-2xl uppercase text-xs"
          >
            Guardar Historial y Finalizar
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 6. EL NOTICIERO DE MI MENTE (MATCH CHANNELS)
// ==========================================
export function NoticieroMente({ onSuccess }: { onSuccess: () => void }) {
  const cases = [
    {
      id: 1,
      name: "Caso 1: La Exposición de Clase",
      situation:
        'Santiago piensa: "Si me equivoco al exponer, todo el mundo se va a burlar de mí para siempre."',
      drama:
        "¡ALERTA MÁXIMA: Estudiante comete un error en clase y desata el apocalipsis social definitivo!",
      facts:
        "Estudiante hace una pausa durante su presentación; la clase continúa con normalidad.",
    },
    {
      id: 2,
      name: "Caso 2: El Mensaje no Respondido",
      situation:
        'Andrés piensa: "Mi amigo no me contestó el mensaje, seguro me odia y no quiere hablarme nunca más."',
      drama:
        "¡ESCÁNDALO: El fin de una era. Un mensaje en visto destruye una amistad para siempre!",
      facts:
        "Persona no revisa su teléfono durante unas horas; el chat sigue abierto esperando respuesta.",
    },
  ];

  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [selectedDrama, setSelectedDrama] = useState<string | null>(null);
  const [selectedFacts, setSelectedFacts] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const activeCase = cases[activeCaseIdx];

  const handleMatch = (type: "drama" | "facts", val: string) => {
    if (type === "drama") {
      setSelectedDrama(val);
    } else {
      setSelectedFacts(val);
    }
  };

  const verifyCase = () => {
    if (
      selectedDrama === activeCase.drama &&
      selectedFacts === activeCase.facts
    ) {
      setShowExplanation(true);
    } else {
      alert(
        "⚠️ Los titulares seleccionados no coinciden con las directrices de los canales Drama y Hechos.",
      );
      setSelectedDrama(null);
      setSelectedFacts(null);
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    setSelectedDrama(null);
    setSelectedFacts(null);
    if (activeCaseIdx < cases.length - 1) {
      setActiveCaseIdx(activeCaseIdx + 1);
    } else {
      onSuccess();
    }
  };

  return (
    <div className="w-full text-left space-y-6">
      <div className="bg-purple-950/20 p-6 rounded-3xl border border-purple-500/20">
        <p className="text-xs text-brand-success font-black uppercase tracking-widest mb-1 flex items-center gap-2">
          <Sparkles size={14} /> Juego: Emparejar Canales del Noticiero
        </p>
        <p className="text-slate-350 text-sm font-bold">
          Empareja el pensamiento ansioso con su titular exagerado (Canal Drama)
          y su titular objetivo (Canal Hechos).
        </p>
      </div>

      <div className="bg-black/40 border border-white/5 rounded-[40px] p-6 space-y-6">
        <div className="bg-purple-900/20 p-5 rounded-3xl border border-purple-500/30">
          <p className="text-[10px] font-black uppercase text-purple-400 mb-1">
            {activeCase.name}
          </p>
          <p className="text-white text-base font-extrabold italic">
            \"{activeCase.situation}\"
          </p>
        </div>

        {!showExplanation ? (
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-wider text-red-400">
                Elige cuál es el Titular del Canal Drama (Exagerado):
              </label>
              <div className="grid gap-2">
                {[activeCase.drama, activeCase.facts].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleMatch("drama", opt)}
                    className={`p-4 rounded-2xl border-2 text-left text-xs font-bold transition-all uppercase ${
                      selectedDrama === opt
                        ? "bg-red-950/60 text-red-400 border-red-500"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-wider text-green-400">
                Elige cuál es el Titular del Canal Hechos (Objetivo):
              </label>
              <div className="grid gap-2">
                {[activeCase.drama, activeCase.facts].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleMatch("facts", opt)}
                    className={`p-4 rounded-2xl border-2 text-left text-xs font-bold transition-all uppercase ${
                      selectedFacts === opt
                        ? "bg-green-950/60 text-green-400 border-green-500"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={!selectedFacts || !selectedDrama}
              onClick={verifyCase}
              className="w-full py-5 bg-purple-600 border-b-8 border-purple-800 text-white font-black tracking-widest rounded-2xl uppercase text-xs disabled:opacity-40"
            >
              Publicar Noticia Editada
            </button>
          </div>
        ) : (
          <div className="p-6 bg-green-950/40 border-2 border-green-500 rounded-3xl text-left space-y-4">
            <h4 className="font-black text-white uppercase text-sm">
              📺 ¡EMISIÓN EN VIVO CORREGIDA!
            </h4>
            <p className="text-xs text-green-200 leading-relaxed font-bold">
              Desarmaste el sensacionalismo del Canal Drama. Tu mente asustada
              le mete efectos especiales negativos a las situaciones cotidianas.
              Sintonizar el Canal Hechos te regresa la ecuanimidad de inmediato.
            </p>
            <button
              onClick={handleNext}
              className="w-full py-4 bg-brand-success text-white font-black uppercase tracking-wider text-xs rounded-xl"
            >
              Siguiente Caso
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 7. RESPUESTA ABIERTA INTERGEN / YO DEL FUTURO
// ==========================================
export function YoFuturo({ onSuccess }: { onSuccess: () => void }) {
  const [answers, setAnswers] = useState<string[]>(Array(4).fill(""));
  const [idx, setIdx] = useState(0);

  const questions = [
    {
      label: "SITUACIÓN DE CARGA",
      title:
        "Escribe brevemente cuál circunstancia te genera mayor preocupación hoy en el colegio o con tus amigos:",
    },
    {
      label: "PASADO MAÑANA",
      title:
        "¿En una semana, crees que esto seguirá siendo igual de importante para ti?",
    },
    {
      label: "MÁS ADELANTE",
      title:
        "¿En un mes, lo recordarás todavía con la misma intensidad que hoy?",
    },
    {
      label: "DENTRO DE UN AÑO",
      title:
        "¿En un año exacto de calendario, esto seguirá molestándote o habrá quedado en el olvido?",
    },
  ];

  const handleAnswerSubmit = () => {
    if (!answers[idx]) return;
    if (idx < questions.length - 1) {
      setIdx(idx + 1);
    } else {
      // Completed last question
      setIdx(questions.length);
    }
  };

  return (
    <div className="w-full text-left space-y-6">
      <div className="bg-purple-950/20 p-6 rounded-3xl border border-purple-500/20">
        <p className="text-xs text-brand-success font-black uppercase tracking-widest mb-1 flex items-center gap-2">
          <Sparkles size={14} /> Tarea: Viaje Temporal (Yo del Futuro)
        </p>
        <p className="text-slate-300 text-sm font-bold">
          La ansiedad hace que el problema de hoy se sienta gigante y eterno.
          Tomar perspectiva temporal te enseñará a anclar la mente en el tiempo
          real.
        </p>
      </div>

      {idx < questions.length ? (
        <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-6 space-y-6">
          <p className="text-[10px] font-black uppercase text-purple-400 tracking-wider">
            Paso {idx + 1} de {questions.length} - {questions[idx].label}
          </p>
          <p className="text-white text-base font-extrabold leading-relaxed">
            {questions[idx].title}
          </p>

          <textarea
            value={answers[idx]}
            onChange={(e) => {
              const newAns = [...answers];
              newAns[idx] = e.target.value;
              setAnswers(newAns);
            }}
            placeholder="Escribe tu reflexión introspectiva..."
            className="w-full h-32 bg-slate-950 border-2 border-slate-900 focus:border-purple-500 font-bold text-sm text-slate-200 p-4 rounded-3xl outline-none"
          />

          <button
            disabled={!answers[idx]}
            onClick={handleAnswerSubmit}
            className="w-full py-5 bg-purple-600 border-b-8 border-purple-800 text-white font-black tracking-widest rounded-2xl uppercase text-xs disabled:opacity-40"
          >
            Guardar y Avanzar en el Tiempo
          </button>
        </div>
      ) : (
        <div className="bg-green-950/40 border-2 border-green-500 rounded-[40px] p-6 space-y-6 text-left">
          <h4 className="font-black text-white uppercase text-base tracking-wider">
            🗓️ RESUMEN DEL MAPA TEMPORAL DEL GUARDIÁN
          </h4>

          <div className="space-y-4">
            <div className="p-4 bg-slate-950 border border-white/5 rounded-2xl">
              <p className="text-[10px] uppercase font-black text-purple-400">
                Preocupación Declarada
              </p>
              <p className="text-xs font-bold text-slate-350 italic">
                \"{answers[0]}\"
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-white/5 rounded-2xl">
              <p className="text-[10px] uppercase font-black text-purple-400">
                Proyección Temporal (1 semana - 1 año)
              </p>
              <p className="text-xs font-bold text-slate-350 leading-relaxed font-semibold">
                Dentro de una semana esperas que: {answers[1]}
                <br />
                En un mes calculas que: {answers[2]}
                <br />
                En un año prevés que: {answers[3]}
              </p>
            </div>
          </div>

          <p className="text-xs text-green-200 leading-relaxed font-bold">
            El presente es real pero no infinito. La ansiedad nos miente
            diciendo que el dolor será eterno. ¡Anotar esto le quita poder de
            inmediato!
          </p>

          <button
            onClick={onSuccess}
            className="w-full py-5 bg-brand-success border-b-8 border-green-800 text-white font-black tracking-widest rounded-2xl uppercase text-xs"
          >
            Escribir en Bitácora y Finalizar
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 8. MAPA DE APOYO (SUPPORT CIRCLE IN APP)
// ==========================================
export function MapaApoyo({ onSuccess }: { onSuccess: () => void }) {
  const [names, setNames] = useState<string[]>(Array(5).fill(""));

  const questions = [
    {
      key: 0,
      placeholder: "Nombre del familiar...",
      label: "Familiar de Confianza 🏡",
      desc: "Alguien de mi familia que me respalda u oye",
    },
    {
      key: 1,
      placeholder: "Nombre del amigo...",
      label: "Amigo Cercano 🤝",
      desc: "Alguien de confianza que me oye de verdad",
    },
    {
      key: 2,
      placeholder: "Nombre del docente...",
      label: "Docente o Tutor Escolar 🎓",
      desc: "Un profesor u orientador del colegio a quien recurrir",
    },
    {
      key: 3,
      placeholder: "Nombre del profesional...",
      label: "Orientador o Especialista de Salud 🩺",
      desc: "Un psicólogo o médico al que podría acudir",
    },
    {
      key: 4,
      placeholder: "Persona divertida...",
      label: "Compañero que me alegra 😄",
      desc: "Alguien que siempre logra hacerme reír en un mal día",
    },
  ];

  const handleSave = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newNames = [...names];
    newNames[idx] = e.target.value;
    setNames(newNames);
  };

  const isCompleted = names.filter((n) => n.trim() !== "").length >= 3;

  return (
    <div className="w-full text-left space-y-6">
      <div className="bg-purple-950/20 p-6 rounded-3xl border border-purple-500/20">
        <p className="text-xs text-brand-success font-black uppercase tracking-widest mb-1 flex items-center gap-2">
          <Sparkles size={14} /> Tarea: Mi Mapa de Protección
        </p>
        <p className="text-slate-300 text-sm font-bold leading-relaxed">
          Enfrentar miedos es mejor en equipo. Completa tu red personal llenando
          al menos tres de los círculos activos a tu alrededor.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 bg-black/40 border border-white/5 rounded-[40px] p-6">
        {/* Radar Map Graphic */}
        <div className="relative w-full aspect-square max-w-[280px] mx-auto flex items-center justify-center">
          <div className="absolute w-24 h-24 rounded-full bg-purple-600/20 border-3 border-purple-500 flex items-center justify-center text-center animate-pulse z-10 shadow-[0_0_20px_#610094]">
            <span className="text-xs font-black text-white">¡TÚ!</span>
          </div>

          {/* Support Ring Lines */}
          <div className="absolute w-44 h-44 rounded-full border border-dashed border-indigo-500/20" />
          <div className="absolute w-64 h-64 rounded-full border border-dashed border-indigo-500/10" />

          {/* Visualizing small dots representing team members entered */}
          {names.map((name, i) => {
            if (!name) return null;
            const angle = (i * 2 * Math.PI) / 5;
            const radius = 90; // placement from center
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{ transform: `translate(${x}px, ${y}px)` }}
                className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black text-[9px] flex items-center justify-center text-center shadow-lg border-2 border-white"
              >
                {name.substring(0, 7)}...
              </motion.div>
            );
          })}
        </div>

        {/* Text Fields */}
        <div className="space-y-4">
          {questions.map((q, idx) => (
            <div key={q.key} className="space-y-1">
              <label className="text-[9px] font-black uppercase text-slate-400 tracking-wider block">
                {q.label} - {q.desc}
              </label>
              <input
                type="text"
                value={names[idx]}
                onChange={(e) => handleSave(idx, e)}
                placeholder={q.placeholder}
                className="w-full bg-slate-950 border-2 border-slate-900 focus:border-purple-500 p-3 rounded-xl font-bold text-xs text-white"
              />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl border-2 border-green-500 bg-green-950/40 text-green-200 space-y-3"
          >
            <h4 className="font-black text-white text-sm uppercase">
              ✅ ¡EQUIPO DE RESPALDO CONSOLIDADO!
            </h4>
            <p className="text-xs leading-relaxed font-bold">
              Has trazado tu red protectora. Cuando el Velómetro sobrepase la
              línea amarilla o naranja en el colegio, recuerda que estas
              personas están ahí para escucharte. ¡No tienes que ir solo!
            </p>
            <button
              onClick={onSuccess}
              className="w-full py-4 bg-brand-success text-white font-black uppercase tracking-wider text-xs rounded-xl"
            >
              Guardar Mapa de Apoyo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==========================================
// 9. DOMAR PREOCUPACIÓN (ÚTIL VS INÚTIL)
// ==========================================
export function PreocupacionUtilUtil({ onSuccess }: { onSuccess: () => void }) {
  const cards = [
    {
      text: "Tengo un examen mañana y me preocupa no haber estudiado el último capítulo entero.",
      isUseful: true,
      why: "Es un hecho real de hoy. Hay una acción concreta factible que puedes realizar ahora mismo: abrir los apuntes e iniciar la lectura.",
    },
    {
      text: "Entregué la libreta escolar de notas y me asusta pensar: 'El profesor creerá que soy descuidado'.",
      isUseful: false,
      why: "El reporte escolar ya fue entregado (pasado) y el pensamiento se basa en la especulación inaudible de la mente académica. No puedes controlarlo hoy.",
    },
    {
      text: "Me preocupa que el clima esté fatal y se desate una tormenta el próximo mes el día de la clausura escolar.",
      isUseful: false,
      why: "El clima es totalmente inmanejable y falta un mes entero para el evento. Centrarse ahí es una trampa inútil de anticipación excesiva.",
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentResult, setCurrentResult] = useState<"right" | "wrong" | null>(
    null,
  );

  const activeCard = cards[activeIdx];

  const handleVerify = (choiceIsUseful: boolean) => {
    const isRight = activeCard.isUseful === choiceIsUseful;
    setCurrentResult(isRight ? "right" : "wrong");
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    setCurrentResult(null);
    if (activeIdx < cards.length - 1) {
      setActiveIdx(activeIdx + 1);
    } else {
      onSuccess();
    }
  };

  return (
    <div className="w-full text-left space-y-6 flex-1 max-h-[70vh] overflow-y-auto pr-1">
      <div className="bg-purple-950/20 p-6 rounded-3xl border border-purple-500/20">
        <p className="text-xs text-brand-success font-black uppercase tracking-widest mb-1 flex items-center gap-2">
          <Sparkles size={14} /> Desafío de Clasificación: Útil o Ruidoso
        </p>
        <p className="text-slate-350 text-sm font-bold">
          Determina si la preocupación tiene una acción física útil viable hoy,
          o si es ruidoso/inmóvil.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-6 space-y-6">
        <div className="text-center font-black uppercase text-xs text-slate-500 tracking-wider">
          Preocupación {activeIdx + 1} de {cards.length}
        </div>

        <div className="bg-slate-950 p-6 rounded-3xl border-2 border-indigo-500/10 text-white font-extrabold text-base min-h-[100px] flex items-center justify-center">
          \"{activeCard.text}\"
        </div>

        {!showExplanation ? (
          <div className="flex gap-4">
            <button
              onClick={() => handleVerify(true)}
              className="flex-1 py-5 bg-indigo-600 border-b-8 border-indigo-800 text-white font-black tracking-widest rounded-2xl uppercase text-xs hover:scale-[1.02]"
            >
              Preocupación Útil ✅
            </button>
            <button
              onClick={() => handleVerify(false)}
              className="flex-1 py-5 bg-purple-600 border-b-8 border-purple-800 text-white font-black tracking-widest rounded-2xl uppercase text-xs hover:scale-[1.02]"
            >
              Preocupación Inútil ❌
            </button>
          </div>
        ) : (
          <div
            className={`p-6 border-2 rounded-3xl space-y-4 text-left ${
              currentResult === "right"
                ? "bg-green-950/40 border-green-500 text-green-200"
                : "bg-red-950/40 border-red-500 text-red-200"
            }`}
          >
            <h4 className="font-black uppercase text-sm flex items-center gap-2">
              {currentResult === "right"
                ? "🎯 ¡RESPUESTA EXCELENTE!"
                : "⚠️ COMPRENSIÓN DE SOMBRA"}
            </h4>
            <p className="text-xs leading-relaxed font-bold">
              {activeCard.why}
            </p>
            <button
              onClick={handleNext}
              className="w-full py-4 bg-black/45 border border-white/10 hover:bg-black/60 text-white font-black uppercase tracking-wider text-xs rounded-xl"
            >
              Siguiente Preocupación
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 10. LA CARTA DE MI YO COMPASIVO
// ==========================================
export function LaCartaYoCompasivo({ onSuccess }: { onSuccess: () => void }) {
  const [answers, setAnswers] = useState<string[]>(Array(3).fill(""));
  const [step, setStep] = useState(0);

  const prompts = [
    "Piensa en alguien que te aprecia y conoce tu valor profundamente (un familiar, docente o amigo). ¿Qué reconocería esa persona sobre lo difícil y desgastante que han sido estos días de tensión para ti?",
    "¿Qué cualidades de tu verdadera fuerza e identidad te recordaría esa persona hoy, para que recuerdes que eres valioso más allá de este tropezón?",
    "¿Qué buenos y amables deseos te enviaría de forma genuina para enfrentar los retos escolares o relaciones que vienen los próximos días?",
  ];

  const handleNext = () => {
    if (!answers[step]) return;
    setStep((s) => s + 1);
  };

  return (
    <div className="w-full text-left space-y-6 flex-1 max-h-[70vh] overflow-y-auto pr-1">
      <div className="bg-purple-950/20 p-6 rounded-3xl border border-purple-500/20">
        <p className="text-xs text-brand-success font-black uppercase tracking-widest mb-1 flex items-center gap-2">
          <Sparkles size={14} /> Diario: Terapia de Autocompasión Interna
        </p>
        <p className="text-slate-355 text-sm font-bold">
          Esa voz dura que te critica drena tu fuerza. Escribirte con la
          amabilidad con la que consolarías a tu mejor compañero disuelve el
          veneno de la ansiedad.
        </p>
      </div>

      {step < 3 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-6 space-y-6">
          <p className="text-[10px] font-black uppercase text-purple-400">
            Mensaje Compasivo parte {step + 1} de 3
          </p>
          <p className="text-white text-base font-extrabold leading-relaxed">
            {prompts[step]}
          </p>

          <textarea
            value={answers[step]}
            onChange={(e) => {
              const newAns = [...answers];
              newAns[step] = e.target.value;
              setAnswers(newAns);
            }}
            placeholder="Escribe la carta honesta y amable hacia ti..."
            className="w-full h-32 bg-slate-950 border-2 border-slate-900 focus:border-purple-500 font-bold text-sm text-slate-200 p-4 rounded-3xl outline-none"
          />

          <button
            disabled={!answers[step]}
            onClick={handleNext}
            className="w-full py-5 bg-purple-600 border-b-8 border-purple-800 text-white font-black tracking-widest rounded-2xl uppercase text-xs disabled:opacity-40"
          >
            Sellar Párrafo y Continuar
          </button>
        </div>
      ) : (
        <div className="bg-violet-950/40 border-4 border-yellow-400 rounded-[48px] p-8 space-y-6 text-left shadow-[0_0_30px_rgba(234,179,8,0.2)]">
          <div className="text-center relative">
            <span className="text-6xl mb-2 block">📜</span>
            <h4 className="font-black text-yellow-350 uppercase tracking-widest text-lg">
              CARTA DE TU GUARDIÁN INTERNO
            </h4>
            <div className="w-24 h-1.5 bg-yellow-400 mx-auto mt-2 rounded" />
          </div>

          <p className="font-semibold text-xs leading-relaxed text-yellow-105 italic space-y-4">
            <span className="block font-bold">\"Querido(a) Cadete,</span>
            <span className="block">
              Sé lo complejo que ha sido este tramo para ti en el colegio.{" "}
              {answers[0]}
            </span>
            <span className="block">No olvides nunca que {answers[1]}</span>
            <span className="block">
              Deseo sinceramente que nos próximos días puedas conseguir{" "}
              {answers[2]}
            </span>
            <span className="block text-right font-black mt-4">
              Con todo el aprecio, Tu Guardián Interno.\"
            </span>
          </p>

          <p className="text-xs text-yellow-400/80 leading-relaxed font-bold text-center">
            Esta voz llena de afecto y clemencia también es tuya. Regresa a esta
            bitácora siempre que las críticas de la ansiedad hablen más fuerte.
          </p>

          <button
            onClick={onSuccess}
            className="w-full py-5 bg-accent-amber border-b-8 border-yellow-600 text-slate-900 font-black tracking-widest rounded-3xl uppercase text-xs shadow-xl"
          >
            Archivar Carta de Calma
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 11. LABORATORIO DE POCIONES
// ==========================================
export function LaboratorioPociones({ onSuccess }: { onSuccess: () => void }) {
  const shelf1 = [
    {
      name: "Esencia de Aire (Respiración cuadrada)",
      emoji: "🌬️",
      desc: "Regula y frena de golpe los ritmos cardíacos del estrés.",
    },
    {
      name: "Raíz de Flexibilidad (Estiramiento de hombros/cuello)",
      emoji: "🌱",
      desc: "Libera las contracturas musculares acumuladas por el alerta.",
    },
    {
      name: "Piedra de Enraizamiento (Caminar despacio)",
      emoji: "🪨",
      desc: "Te devuelve la sensación de control sobre tus movimientos.",
    },
  ];

  const shelf2 = [
    {
      name: "Tinta de Realidad (Escribir 3 cosas que controlo hoy)",
      emoji: "🖋️",
      desc: "Le quita fuerza a los catastróficos miedos y te enfoca en lo real.",
    },
    {
      name: "Pigmento Libre (Dibujar o colorear libremente)",
      emoji: "🎨",
      desc: "Activa el área artística calmante del hemisferio derecho cerebral.",
    },
    {
      name: "Pergamino Antiguo (Leer un texto fantástico)",
      emoji: "📜",
      desc: "Guía y distrae voluntariamente tu atención a un espacio seguro.",
    },
  ];

  const shelf3 = [
    {
      name: "Onda Sonora (Música instrumental)",
      emoji: "🎵",
      desc: "Bloquea el bullicio ruidoso creando un fondo acústico predecible.",
    },
    {
      name: "Cristal de Hielo (Agua fría o hielo en cara)",
      emoji: "❄️",
      desc: "Estimula térmicamente el nervio vago bajando el pulso cardíaco.",
    },
    {
      name: "Velo de Sombra (Pausar todas las pantallas)",
      emoji: "🕶️",
      desc: "Otorga un respiro visual y neurológico inmediato a tus ojos y cerebro.",
    },
  ];

  const [idx1, setIdx1] = useState<number | null>(null);
  const [idx2, setIdx2] = useState<number | null>(null);
  const [idx3, setIdx3] = useState<number | null>(null);
  const [brewing, setBrewing] = useState(false);
  const [finished, setFinished] = useState(false);

  const startBrew = () => {
    if (idx1 === null || idx2 === null || idx3 === null) return;
    setBrewing(true);
    setTimeout(() => {
      setBrewing(false);
      setFinished(true);
    }, 2000);
  };

  return (
    <div className="w-full text-left space-y-6 flex-1 max-h-[70vh] overflow-y-auto pr-1">
      <div className="bg-purple-950/20 p-6 rounded-3xl border border-purple-500/20">
        <p className="text-xs text-brand-success font-black uppercase tracking-widest mb-1 flex items-center gap-2">
          <Sparkles size={14} /> Juego: Mezclador Químico de Calma
        </p>
        <p className="text-slate-355 text-sm font-bold">
          Para forjar un hechizo estable, selecciona exactamente un ingrediente
          químico de cada estantería para el caldero.
        </p>
      </div>

      {!finished && !brewing && (
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase text-purple-400 tracking-wider">
              Estante 1: Química Física (Cuerpo)
            </span>
            <div className="grid gap-2">
              {shelf1.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setIdx1(i)}
                  className={`p-4 border-2 text-left rounded-2xl flex items-center gap-4 transition-all ${
                    idx1 === i
                      ? "bg-indigo-950/60 border-indigo-400 text-indigo-300"
                      : "bg-slate-900 border-slate-800 text-slate-350 hover:border-slate-750"
                  }`}
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <div className="flex-1 text-xs">
                    <p className="font-black text-white">{item.name}</p>
                    <p className="text-slate-500 font-bold mt-1">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase text-purple-400 tracking-wider">
              Estante 2: Cristal Mental (Pensamientos)
            </span>
            <div className="grid gap-2">
              {shelf2.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setIdx2(i)}
                  className={`p-4 border-2 text-left rounded-2xl flex items-center gap-4 transition-all ${
                    idx2 === i
                      ? "bg-indigo-950/60 border-indigo-400 text-indigo-300"
                      : "bg-slate-900 border-slate-800 text-slate-350 hover:border-slate-750"
                  }`}
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <div className="flex-1 text-xs">
                    <p className="font-black text-white">{item.name}</p>
                    <p className="text-slate-500 font-bold mt-1">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase text-purple-400 tracking-wider">
              Estante 3: Escudo Sensor (Entorno)
            </span>
            <div className="grid gap-2">
              {shelf3.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setIdx3(i)}
                  className={`p-4 border-2 text-left rounded-2xl flex items-center gap-4 transition-all ${
                    idx3 === i
                      ? "bg-indigo-950/60 border-indigo-400 text-indigo-300"
                      : "bg-slate-900 border-slate-800 text-slate-350 hover:border-slate-750"
                  }`}
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <div className="flex-1 text-xs">
                    <p className="font-black text-white">{item.name}</p>
                    <p className="text-slate-500 font-bold mt-1">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={idx1 === null || idx2 === null || idx3 === null}
            onClick={startBrew}
            className="w-full py-5 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black tracking-widest rounded-3xl border-b-8 border-yellow-700 uppercase hover:scale-[1.01] transition-all disabled:opacity-40"
          >
            🔥 Hervir Poción en Caldero Alquímico
          </button>
        </div>
      )}

      {brewing && (
        <div className="text-center p-12 space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-8xl w-32 h-32 mx-auto flex items-center justify-center filter drop-shadow-[0_0_20px_#f59e0b]"
          >
            🔮
          </motion.div>
          <p className="font-black text-lg text-yellow-400 uppercase tracking-widest animate-pulse">
            Mezclando Esencias...
          </p>
        </div>
      )}

      {finished && idx1 !== null && idx2 !== null && idx3 !== null && (
        <div className="bg-slate-900 border-4 border-yellow-400 rounded-[48px] p-6 text-left space-y-4 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
          <div className="text-center">
            <span className="text-6xl text-center block">🧪</span>
            <h4 className="font-black text-yellow-505 uppercase text-lg tracking-widest mt-2">
              ✨ ¡POCIÓN DE CALMA ESTABLE! ✨
            </h4>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mt-2" />
          </div>

          <div className="space-y-3 pt-3">
            <p className="text-xs font-bold text-white leading-relaxed">
              Has combinado tres ingredientes fundamentales:
            </p>
            <div className="space-y-2">
              <div className="p-3 bg-slate-950 rounded-xl flex items-center gap-3">
                <span className="text-xl">{shelf1[idx1].emoji}</span>
                <span className="text-xs font-black text-white">
                  {shelf1[idx1].name}
                </span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl flex items-center gap-3">
                <span className="text-xl">{shelf2[idx2].emoji}</span>
                <span className="text-xs font-black text-white">
                  {shelf2[idx2].name}
                </span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl flex items-center gap-3">
                <span className="text-xl">{shelf3[idx3].emoji}</span>
                <span className="text-xs font-black text-white">
                  {shelf3[idx3].name}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-semibold italic pt-2">
              Esta fórmula es tu maletín clínico rápido. No funciona con magia
              iridiscente; funciona por el hábito continuado. Al entrenarlo
              recurrentemente, tu cerebro sabrá exactamente qué protocolo de
              calma lanzar ante un bajón o estrés escolar.
            </p>
          </div>

          <button
            onClick={onSuccess}
            className="w-full py-4 bg-brand-success text-white font-black uppercase text-xs tracking-widest rounded-2xl border-b-6 border-green-800"
          >
            Guardar Poción en Inventario
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 12. CHECKBOX QUIZ (MULTIPLE-SELECT OPTIONS)
// ==========================================
export function MultipleSelectQuiz({
  question,
  options,
  correct, // array of indices, e.g., [0, 1, 2]
  feedback,
  onSuccess,
}: {
  question: string;
  options: string[];
  correct: number[];
  feedback: string;
  onSuccess: () => void;
}) {
  const [selected, setSelected] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const toggleOption = (idx: number) => {
    if (showFeedback) return;
    if (selected.includes(idx)) {
      setSelected(selected.filter((i) => i !== idx));
    } else {
      setSelected([...selected, idx]);
    }
  };

  const handleVerify = () => {
    if (selected.length === 0) return;

    // Check if sorted selection array matches sorted correct array exactly
    const correctSorted = [...correct].sort();
    const selectedSorted = [...selected].sort();

    const matched =
      correctSorted.length === selectedSorted.length &&
      correctSorted.every((val, index) => val === selectedSorted[index]);

    setIsCorrect(matched);
    setShowFeedback(true);
  };

  return (
    <div className="w-full text-left space-y-6 flex-1 max-h-[70vh] overflow-y-auto pr-1">
      <div className="bg-purple-950/20 p-5 rounded-3xl border border-purple-500/20">
        <p className="text-xs text-brand-success font-black uppercase tracking-widest mb-1 flex items-center gap-2">
          <Sparkles size={14} /> Misión Activa: Selección Múltiple
        </p>
        <p className="text-slate-355 text-xs font-bold">
          Lee con extremo cuidado. Al ser un ejercicio especial, puede haber
          **MÁS DE UNA opción correcta**. Marca todas las adecuadas para rebasar
          la barrera.
        </p>
      </div>

      <div className="bg-black/40 border border-white/5 rounded-[40px] p-6 space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-2xl shrink-0">
            ❓
          </div>
          <p className="text-white text-base font-extrabold leading-relaxed pt-1 flex-1">
            {question}
          </p>
        </div>

        <div className="grid gap-3 custom-scroll overflow-y-auto max-h-[36vh] sm:max-h-[44vh] md:max-h-[48vh] pr-1">
          {options.map((opt, i) => {
            const isChecked = selected.includes(i);
            return (
              <button
                key={i}
                disabled={showFeedback}
                onClick={() => toggleOption(i)}
                className={`w-full py-4 px-5 rounded-2xl border-2 font-bold text-xs uppercase tracking-wider text-left flex items-start gap-3 transition-all ${
                  isChecked
                    ? "bg-purple-900 border-purple-500 text-white"
                    : "bg-slate-900 border-slate-800 text-slate-350 hover:bg-slate-900/80 hover:border-slate-700"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center text-[10px] font-black mt-0.5 ${
                    isChecked
                      ? "bg-purple-500 border-white text-white"
                      : "border-slate-500 bg-transparent"
                  }`}
                >
                  {isChecked ? "✓" : ""}
                </div>
                <span className="flex-1 leading-relaxed">{opt}</span>
              </button>
            );
          })}
        </div>

        {!showFeedback ? (
          <button
            disabled={selected.length === 0}
            onClick={handleVerify}
            className="w-full py-5 bg-purple-600 border-b-8 border-purple-800 text-white font-black tracking-widest rounded-2xl uppercase text-xs hover:scale-[1.01] transition-all disabled:opacity-40"
          >
            Confirmar Selección
          </button>
        ) : (
          <div
            className={`p-6 border-2 rounded-3xl text-left space-y-4 ${
              isCorrect
                ? "bg-green-950/40 border-green-500 text-green-200"
                : "bg-red-950/40 border-red-500 text-red-200"
            }`}
          >
            <h4 className="font-black text-white uppercase text-sm">
              {isCorrect
                ? "✅ ¡ANÁLISIS COMPLETO CORRECTO!"
                : "❌ COMBINACIÓN ERRÓNEA"}
            </h4>
            <p className="text-xs leading-relaxed font-semibold">
              {isCorrect
                ? feedback
                : "No has elegido la respuesta o conjunto exacto de afirmaciones correctas según el código del Guardián del bienestar. ¡Revisa y reintenta!"}
            </p>
            {isCorrect ? (
              <button
                onClick={onSuccess}
                className="w-full py-4 bg-brand-success text-white font-black uppercase text-xs tracking-wider rounded-xl border-b-4 border-green-800"
              >
                Misión Superada
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowFeedback(false);
                  setSelected([]);
                }}
                className="w-full py-4 bg-red-650 text-white font-black uppercase text-xs tracking-wider rounded-xl transition-all"
              >
                Intentar Nuevamente
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
