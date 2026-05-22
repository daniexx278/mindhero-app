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
import { INITIAL_LESSONS } from "./lessons";
import {
  CompletarFrase,
  OrdenarSecuencia,
  MapaCorporal,
  HechoInterpretacion,
  VelocimetroAnsiedad,
  NoticieroMente,
  YoFuturo,
  MapaApoyo,
  PreocupacionUtilUtil,
  LaCartaYoCompasivo,
  LaboratorioPociones,
  MultipleSelectQuiz,
} from "./components/InteractiveActivities";

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

const OLD_STATIC_LESSONS: Lesson[] = [
  // ANXIETY STAGE (10 levels)
  {
    id: "ans-1",
    sectionId: "anxiety",
    title: "Alertas corporales",
    description: "¿Tu cuerpo a veces te manda alertas raras?",
    type: "anxiety",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 1,
    content: [
      {
        text: "El corazón acelerado antes de un examen o las mariposas en el estómago antes de hablar en clase son señales que nos manda el cuerpo. Eso tiene nombre: ansiedad, y está bien sentirla.",
        image: "💓",
      },
      {
        question: "¿Cuál de estas frases describe mejor lo que es la ansiedad?",
        options: [
          "Una enfermedad grave que solo les pasa a personas muy débiles.",
          "Una señal del cuerpo que nos avisa cuando algo nos parece peligroso o amenazante.",
          "Sentirse triste por algo que salió mal.",
          "Un estado que solo ocurre en situaciones muy extremas, como terremotos.",
        ],
        correct: 1,
        feedback:
          "La ansiedad es una señal normal del cuerpo, no una debilidad. Todos la sentimos de vez en cuando. (Craske & Barlow, 2022; Kendall et al., 2016)",
        hint: "Recuerda que la ansiedad es una señal del cuerpo.",
      },
    ],
  },
  {
    id: "ans-2",
    sectionId: "anxiety",
    title: "El ciclo del miedo",
    description: "¿Por qué evitar agranda nuestros miedos?",
    type: "anxiety",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 2,
    content: [
      {
        text: "Cuando nos enfrentamos a algo que nos asusta, nuestra reacción puede ser evitarlo. Esto da un alivio inmediato pero, a la larga, el miedo tiende a crecer y volverse más intenso.",
        image: "🔄",
      },
      {
        question:
          "Para reducir la ansiedad de verdad, ¿qué necesito hacer con las situaciones que me asustan?",
        options: [
          "Evitarlas para sentir calma por siempre.",
          "Afrontarlas poco a poco con calma y guía.",
          "Correr, huir o ignorar el reto.",
          "Enojarme con los demás.",
        ],
        correct: 1,
        feedback:
          "Para reducir la ansiedad, es importante afrontar las situaciones que nos asustan poco a poco, en lugar de evitar. (Clark & Wells, 1995; Higa-McMillan, 2016)",
        hint: "Evitar da alivio rápido pero a la larga el miedo crece. ¿Qué palabra es la contraria?",
      },
    ],
  },
  {
    id: "ans-3",
    sectionId: "anxiety",
    title: "Respiración cuadrada",
    description: "Hackea tu alarma interna",
    type: "anxiety",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 3,
    content: [
      {
        text: "Imagina que dibujas un cuadrado. Inhalas en 4, mantienes 4, exhalas en 4 y sostienes sin aire otros 4. Así ordenas a tu cerebro relajarse.",
        image: "💨",
      },
      {
        question:
          "En la respiración cuadrada, ¿cuál es el primer paso indispensable de la secuencia?",
        options: [
          "Mantener el aire por 4 tiempos.",
          "Inhalar por la nariz contando 4 tiempos.",
          "Exhalar fuertemente todo el aire.",
          "Sostener sin aire contando 4 tiempos.",
        ],
        correct: 1,
        feedback:
          "Al inhalar, retener, exhalar y mantener el vacío en tiempos iguales, le envías a tu cerebro la señal directa de que estás a salvo. (Zaccaro et al., 2018; Ma et al., 2017)",
        hint: "Primero necesitas llenarte de aire y energía antes de empezar a retenerla.",
      },
    ],
  },
  {
    id: "ans-4",
    sectionId: "anxiety",
    title: "¿Qué hace la evitación?",
    description: "La trampa del escape fácil",
    type: "anxiety",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 4,
    content: [
      {
        text: "La evitación es escapar de nuestros miedos. Pareciera una solución perfecta hoy, pero en el fondo enseña al cerebro que la situación es inmanejable.",
        image: "🚪",
      },
      {
        question:
          "Valentina siempre se hace la enferma para evitar exponer. ¿Qué le pasa a su miedo con el tiempo?",
        options: [
          "Desaparece porque no tiene que enfrentarlo.",
          "Se mantiene exactamente igual sin cambiar.",
          "Crece porque el cerebro aprende que exponer es realmente peligroso.",
          "Se vuelve más valiente para la próxima.",
        ],
        correct: 2,
        feedback:
          "Cada vez que evitamos, le decimos al cerebro que tenía razón en asustarse. Por eso el miedo crece. (Barlow, 2002; Chorpita & Daleiden, 2009)",
        hint: "Recuerda que el miedo crece si lo evitas y el cerebro aprende que esa situación es peligrosa.",
      },
    ],
  },
  {
    id: "ans-5",
    sectionId: "anxiety",
    title: "Pensamientos trampa",
    description: "Aprende a identificarlos",
    type: "anxiety",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 5,
    content: [
      {
        text: "Los pensamientos tramposos distorsionan la realidad y disparan miedos innecesarios. Cuestionarlos es el primer paso para no dejarnos controlar por ellos.",
        image: "🧠",
      },
      {
        question:
          "Al detectar un pensamiento trampa que te asusta, ¿qué tipo de pensamiento debes elaborar?",
        options: [
          "Un pensamiento exageradamente optimista aunque falso.",
          "Un pensamiento equilibrado, justo y realista contigo mismo.",
          "Un pensamiento ignorando el problema por completo.",
          "Un pensamiento culposo.",
        ],
        correct: 1,
        feedback:
          "Siempre trata de desarrollar una forma más justa y equilibrada de pensar sobre las situaciones que te generan miedo. (Beck, 2021; Kendall et al., 2016)",
        hint: "Busca una palabra que describa el punto medio: algo justo, tranquilo y equilibrado.",
      },
    ],
  },
  {
    id: "ans-6",
    sectionId: "anxiety",
    title: "Ciclo de la ansiedad",
    description: "Conoce los engranajes de la alerta",
    type: "anxiety",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 6,
    content: [
      {
        text: "Una situación activa una alerta. Surge el pensamiento automático ('Me bloquearé'). El cuerpo reacciona con emoción intensa. Evitas para sentir alivio rápido. El miedo crece.",
        image: "🌀",
      },
      {
        question:
          "¿Qué papel juega evitar la situación estresante dentro de este ciclo?",
        options: [
          "Disuelve el ciclo de inmediato de forma definitiva.",
          "Permite que el cerebro olvide el peligro.",
          "Da un alivio rápido al principio pero confirma al cerebro que la situación era peligrosa y el miedo crece.",
          "Garantiza el éxito total en tareas difíciles.",
        ],
        correct: 2,
        feedback:
          "Evitar enseña al cerebro que solo sobreviviste gracias al escape. Romper el ciclo requiere exposición gradual. (Clark & Wells, 1995; Craske & Barlow, 2022)",
        hint: "Es un parche cómodo momentáneo que agiganta la sombra a largo plazo.",
      },
    ],
  },
  {
    id: "ans-7",
    sectionId: "anxiety",
    title: "Pensamientos y etiquetas",
    description: "No te pongas leyes absolutas",
    type: "anxiety",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 7,
    content: [
      {
        text: "Obtener un mal resultado y transformarlo en una etiqueta global sobre nuestra identidad es un error cognitivo común que nos desgasta en exceso.",
        image: "🏷️",
      },
      {
        question:
          "Andrés saca un 3.8 en un examen y piensa: 'Soy un fracasado total, nunca sirvo para nada.' ¿Qué tipo de pensamiento es?",
        options: [
          "Lectura de mente: asume lo que otros piensan.",
          "Generalización excesiva: saca una conclusión absoluta de sí mismo por un solo evento.",
          "Catastrofización: asume que es el fin del mundo.",
          "Pensamiento lógico realista.",
        ],
        correct: 1,
        feedback:
          "Generalizar en exceso es un sesgo clave donde un fallo temporal se lee como una definición irreversible de quién eres. (Beck, 1979; Burns, 1980)",
        hint: "Andrés sacó 3.8 que es aprobatoria, pero cerró la puerta de su valor con la palabra 'nunca'.",
      },
    ],
  },
  {
    id: "ans-8",
    sectionId: "anxiety",
    title: "La escalera de miedo",
    description: "Exposición paso a paso",
    type: "anxiety",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 8,
    content: [
      {
        text: "Subir una montaña alta o vencer el pánico no se hace corriendo sino con pasos controlados y calculados. La escalera de miedos te guía de lo simple a lo complejo.",
        image: "🪜",
      },
      {
        question:
          "¿Cuáles miedos debemos colocar al inicio de nuestra escalera de exposición?",
        options: [
          "Miedos medianamente extremos.",
          "Los miedos más fáciles y tolerables primero.",
          "Los miedos definitivos y destructivos.",
          "No colocar ningún miedo.",
        ],
        correct: 1,
        feedback:
          "La escalera empieza con retos pequeños para habituarnos, de modo que cada logro nos dé la confianza de dar el siguiente paso. (Higa-McMillan, 2016; Chorpita, 2009)",
        hint: "Para subir sin resbalar, siempre colocamos el pie en el escalón más accesible y fácil.",
      },
    ],
  },
  {
    id: "ans-9",
    sectionId: "anxiety",
    title: "Postergación de dudas",
    description: "Guarda tus preocupaciones para luego",
    type: "anxiety",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 9,
    content: [
      {
        text: "Preocuparse 24/7 desgasta. La técnica de postergación te enseña a anotarlas todas para analizarlas juntas únicamente en un horario reservado de tu día.",
        image: "📝",
      },
      {
        question:
          "Cuando llega tu horario programado de resolver preocupaciones anotadas, ¿qué filtro racional debes aplicarles?",
        options: [
          "Preguntarte: ¿puedo hacer algo al respecto hoy?, ¿sigue siendo importante hoy?",
          "Llorar desconsoladamente por cada una.",
          "Compartirlas en redes para asustar a mis contactos.",
          "Anotarlas en una lista más larga.",
        ],
        correct: 0,
        feedback:
          "Al mirarlas en frío, descubrirás que muchas de tus preocupaciones han perdido relevancia o fuerza por sí solas. (Borkovec et al., 1983; Rego, 2011)",
        hint: "Te cuestionas racionalmente si la duda es útil, si tiene una acción viable hoy o perdió importancia.",
      },
    ],
  },
  {
    id: "ans-10",
    sectionId: "anxiety",
    title: "EL JEFE: VORTEX",
    description: "Desarma la trampa del hipercontrol",
    type: "boss",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 10,
    content: [
      {
        text: "El VORTEX te susurra que debes controlarlo todo, revisarlo cinco veces y no confiar en nadie u ocurrirá un desastre. ¡Desafía y vence la desconfianza ansiosa!",
        image: "👾",
      },
      {
        question:
          "Santiago predice que si no rehace él mismo el trabajo grupal sacarán cero. ¿Cuál es el experimento seguro para probar su predicción?",
        options: [
          "Abandono total: dejar todo tirado y apagar su teléfono sin mediar acuerdo.",
          "Hipercontrol: desvelarse rehaciendo en secreto la entrega entera solo.",
          "Delegación pequeña: redactar su parte, permitir que el grupo redacte la conclusión y revisarla juntos solo una vez al final.",
          "Hacer la entrega solo, pero pasarse días quejándose.",
        ],
        correct: 2,
        feedback:
          "Menos control es más paz. Al soltar una parte pequeña y controlada, Santiago le da la oportunidad a la reality de demostrar que no ocurrirá un desastre. (Bennett-Levy et al., 2004; McManus, 2012)",
        hint: "No saltes al vacío; busca una delegación intermedia, equilibrada y saludable para verificar.",
      },
    ],
  },
  // DEPRESSION STAGE (10 Levels)
  {
    id: "dep-1",
    sectionId: "depression",
    title: "Tristeza vs Depresión",
    description: "Entiendo profundamente mis ánimos",
    type: "depression",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 11,
    content: [
      {
        text: "Estar triste es normal y dura poco. La depresión se ancla por semanas o meses, apaga el placer en tus pasatiempos y drena tu energía diaria sin una explicación clara.",
        image: "☁️",
      },
      {
        question:
          "Valentina lleva tres semanas sintiéndose vacía, sin aliento de nada, durmiendo en exceso y cree que es una carga. ¿Qué describe su estado?",
        options: [
          "Es solo pereza escolar que se pasará distrayéndose.",
          "Como no le ocurrió un drama puntual, no puede ser nada de cuidado.",
          "Se parece a la depresión clínica: dura más de dos semanas, anula el gusto por todo y carece de causa clara.",
          "Solo debería atenderse si afecta radicalmente sus tareas.",
        ],
        correct: 2,
        feedback:
          "Que no haya pasado nada malo es una característica de la depresión; es un malestar de salud real persistente. (APA, 2013; Hankin et al., 2015)",
        hint: "Presta atención a la duración prolongada (mayor a dos semanas) y a la apatía que no requiere un luto.",
      },
    ],
  },
  {
    id: "dep-2",
    sectionId: "depression",
    title: "Cerebro y regulación",
    description: "La alarma hipersensible",
    type: "depression",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 12,
    content: [
      {
        text: "En la juventud, tu cerebro madura a mil por hora. En la depresión, la alarma emocional interna se enciende a tope por tonterías, mientras el freno regulador pierde tracción.",
        image: "🧠",
      },
      {
        question:
          "¿Qué ocurre biológicamente con el sistema emocional en la depresión?",
        options: [
          "La zona amortiguadora cerebral trabaja el triple de fuerte.",
          "La alarma emocional se dispara fácil y al mismo tiempo el guardián regulador de calma trabaja con menos fuerza.",
          "Se cancela toda actividad y producción hormonal de golpe.",
          "Se multiplica la energía mental infinitamente.",
        ],
        correct: 1,
        feedback:
          "Esta desregulación temporal hace que sientas todo con un volumen ensordecedor. Aprender técnicas le devuelve la fuerza al freno cerebral. (Lupien et al., 2009; Gotlib & Hamilton, 2008)",
        hint: "Es una combinación dual de alarma hipersensible combinada con un freno débil.",
      },
    ],
  },
  {
    id: "dep-3",
    sectionId: "depression",
    title: "Depresión invisible",
    description: "La irritabilidad constante",
    type: "depression",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 13,
    content: [
      {
        text: "En los jóvenes, la depresión no siempre se reduce a llorar. Se esconde a menú detrás de un mal humor constante, responder hostilmente y dolores corporales raros.",
        image: "🎭",
      },
      {
        question:
          "Sebastián antes era pacífico, pero hace un mes está irritable, con dolores de cabeza frecuentes y dejó de chatear. ¿Qué es lo más acertado?",
        options: [
          "Es solo rebelión adolescente común, no hay de qué preocuparse.",
          "La depresión en adolescentes se manifiesta a menudo con irritabilidad, fatiga somática y evitación social en lugar de lágrimas.",
          "Mientras no declare estar deprimido, no se le debe forzar a nada.",
          "Solo es preocupante si empieza a faltar a clase.",
        ],
        correct: 1,
        feedback:
          "Darse de baja socialmente, enfadarse por minucias y expresar dolores corporales recurrentes son banderas rojas importantes. (APA, 2013; Stringaris & Goodman, 2009)",
        hint: "No todos lloran; algunos manifiestan sufrimiento con enojo constante, silencios corporales y alejamiento.",
      },
    ],
  },
  {
    id: "dep-4",
    sectionId: "depression",
    title: "El laberinto social",
    description: "Ojo con el scrolleo pasivo",
    type: "depression",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 14,
    content: [
      {
        text: "Consumir feeds perfectos de redes en silencio deforma la percepción. Comparar tu vida normal con la pantalla hiperfiltrada ajena destruye el amor propio.",
        image: "📱",
      },
      {
        question:
          "Laura pasa dos horas en silencio scrolleando fotos perfectas de compañeras y termina triste sin saber por qué. ¿Qué lo explica?",
        options: [
          "La cantidad de tiempo es idónea para regular el cansancio.",
          "Mirar pasivamente vidas recortadas y editadas incita a la comparación social, disparando inferioridad.",
          "Las redes causan depresión biológica inmediata.",
          "Es una respuesta sana de autocrítica.",
        ],
        correct: 1,
        feedback:
          "El consumo pasivo y la comparación destructiva de 'vidas perfectas' es un factor estresante de alta correlación con el desánimo. (Twenge et al., 2018; Keles et al., 2020)",
        hint: "Ella mira sin hablar ni reír, comparando su backstage con las mejores fotos editadas de otros.",
      },
    ],
  },
  {
    id: "dep-5",
    sectionId: "depression",
    title: "Detector de engaños",
    description: "Las trampas de tu propio cerebro",
    type: "depression",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 15,
    content: [
      {
        text: "La depresión deforma los pensamientos. Nos hace ver todo en blanco o negro ('siempre fallo', 'nunca mejoraré') y descarta por completo las buenas victorias.",
        image: "🕶️",
      },
      {
        question:
          "Camila saca un decente 3.8 y piensa: 'Me fue horrible, soy la peor, nunca voy a poder'. ¿Cuántas trampas mentales hay aquí?",
        options: [
          "Ninguna, es una queja normal y razonable.",
          "Una sola: está frustrada académica.",
          "Múltiples trampas: filtrado negativo (ignora pasar la materia), catastrofismo y absolutismo de todo-o-nada.",
          "Dos: se echa la culpa de problemas climáticos.",
        ],
        correct: 2,
        feedback:
          "Disolver estos extremismos debilita el filtro oscuro y le quita dramatismo a la realidad. (Beck et al., 1979; Weisz et al., 2017)",
        hint: "Presta atención a términos exagerados como 'nunca', 'siempre' y su descarte absoluto de su nota de 3.8.",
      },
    ],
  },
  {
    id: "dep-6",
    sectionId: "depression",
    title: "El descanso sagrado",
    description: "Regula las horas de tu batería",
    type: "depression",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 16,
    content: [
      {
        text: "Dormir menos de 8 horas debilita el escudo biológico contra la tristeza. El sueño no es una deuda que se liquide toda junta el fin de semana.",
        image: "🔋",
      },
      {
        question:
          "Daniel duerme 5 horas semanales y 12 horas los sábados. ¿Cuál es la consecuencia anímica de esta rutina?",
        options: [
          "Un sábado largo solventa y repara la fatiga diaria acumulada.",
          "Dormir poco desgasta el humor diario y los atracones de sueño de fin de semana desestabilizan el ritmo circadiano de tus neuronas.",
          "No tiene repercusiones si pasa el resto del día jugando.",
          "Que recorta su capacidad creativa anímica.",
        ],
        correct: 1,
        feedback:
          "La regularidad del sueño diario es indispensable para que el cerebro sintetice neurotransmisores de bienestar. (Paruthi et al., 2016; Goldstein et al., 2014)",
        hint: "El sistema del sueño requiere constancia diaria; no funciona ahorrando de golpe un día.",
      },
    ],
  },
  {
    id: "dep-7",
    sectionId: "depression",
    title: "La ley de la inercia",
    description: "La chispa nace de la acción",
    type: "depression",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 17,
    content: [
      {
        text: "En la depresión, esperar a que te nazcan las ganas de actuar te dejará atrapado perpetuamente. Las ganas de moverte aparecen justamente después de comenzar algo simple.",
        image: "🔥",
      },
      {
        question:
          "Sofi solía jugar voley, pero lo dejó y dice: 'Cuando tenga ánimos iré'. ¿Qué falla en su plan?",
        options: [
          "Ninguno, descansar sin ganas es la terapia más idónea.",
          "La activación conductual enseña que las ganas regresan una vez arranca la acción física coordinada, no antes.",
          "Debe sustituir el voley por ver películas sola.",
          "Que los ánimos regresan únicamente durmiendo.",
        ],
        correct: 1,
        feedback:
          "Dar un paso pequeño (como preparar la mochila) rompe la parálisis de la desgana dopaminérgica de la depresión. (Cuijpers et al., 2007; Lejuez et al., 2011)",
        hint: "La gasolina de las ganas de actuar nace después de calentar el motor de la acción.",
      },
    ],
  },
  {
    id: "dep-8",
    sectionId: "depression",
    title: "Hablarse con clemencia",
    description: "Desarma el juez interno",
    type: "depression",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 18,
    content: [
      {
        text: "La autocrítica salvaje eleva el cortisol sanguíneo. El cerebro procesa tu culpa interna como un ataque físico en curso. Háblate con la ternura de un amigo.",
        image: "🤍",
      },
      {
        question:
          "Tomás falla en su presentación y se tilda de 'fracaso'. ¿Cómo luce un trato autocompasivo honesto?",
        options: [
          "Validar que el fallo dolió profundamente, consolarse y recordarse que un tropiezo no anula su valor intelectual completo.",
          "Evadir el asunto fingiendo que nunca ocurrió.",
          "Decirse delirios inflados de perfección absoluta en todo.",
          "Autocastigarse rumiando el percance sin tregua.",
        ],
        correct: 0,
        feedback:
          "Abordarse con clemencia reduce el miedo a cometer fallos, permitiendo reintentar los retos con calma. (Neff, 2003; MacBeth & Gumley, 2012)",
        hint: "Utiliza el mismo tono comprensivo que dirigirías a tu mejor compañero al verlo triste.",
      },
    ],
  },
  {
    id: "dep-9",
    sectionId: "depression",
    title: "El puente de la amistad",
    description: "Acompañar a quien sufre",
    type: "depression",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 19,
    content: [
      {
        text: "Apoyar no es jugar al doctor ni repetir frases vacías de 'échale ganas'. Consiste en prestar oído paciente, no juzgar el llanto y ser el puente a adultos habilitados.",
        image: "🤝",
      },
      {
        question:
          "Tu mejor amiga lleva semanas ausente y apagada en el colegio. Decides ayudarla. ¿Cuál es el camino?",
        options: [
          "Forzarla a sonreír enfrente de toda la clase.",
          "Acercarte en privado, escuchar su dolor con paciencia sin sermonear y sugerirle con respeto acudir a un orientador o especialista.",
          "Hacerte cargo tú de rescatarla emocional en solitario.",
          "Exponer sus secretos a otros compañeros para aconsejarla grupal.",
        ],
        correct: 1,
        feedback:
          "Brindar una escucha empática libre de juicios y motivarla a buscar ayuda calificada es el mayor acto de ternura. (Kitchener & Jorm, 2002; Radez et al., 2021)",
        hint: "Es discreto, libre de sermones y promueve alentar a buscar ayuda de un psicólogo o acudientes.",
      },
    ],
  },
  {
    id: "dep-10",
    sectionId: "depression",
    title: "EL JEFE: SOMBRA ETERNA",
    description: "Recuperando la luz del Guardián",
    type: "boss",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 20,
    content: [
      {
        text: "La SOMBRA ETERNA de la depresión te infunde aislamiento para debilitarte en un calabozo. ¡Pero tu equipo de apoyo galáctico está listo hoy para ganar!",
        image: "💀",
      },
      {
        question:
          "Andrés sumamente cansado y vacío hace tres semanas dice: 'Es solo una mala racha'. Según el protocolo de bienestar, ¿cuál es el paso definitivo?",
        options: [
          "Esperar más meses antes de alarmarse.",
          "Acudir al doctor únicamente si tiene pensamientos extremos.",
          "Como lleva más de dos semanas seguidas de alertas clínicas claras de anhedonia y fatiga, merece consultar a redes escolares o profesionales de salud sin dilación.",
          "Ocultarlo indefinidamente de sus padres.",
        ],
        correct: 2,
        feedback:
          "Dos semanas de desinterés general y cansancio persistente ameritan atención. Pedir ayuda oportuna es el mayor superpoder del Guardián. (APA, 2013; MinSalud colombiano, 2023)",
        hint: "Asegúrate de ponderar la duración en semanas (el límite general son dos semanas de desgana continuada).",
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
    setParentalConsent(false);
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
    setUserRole(null);
    setParentData(null);
    setInstitutionalData(null);
    setLessons((prev) => prev.map((l) => ({ ...l, completed: false })));
    setShowEditProfile(false);
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
            onBack={() => {
              setAgeGroup(null);
              setParentalConsent(false);
              setView("onboarding");
            }}
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
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    if (!formData.childName || !formData.idNumber || !formData.verifiedEmail) {
      setShowError(true);
      return;
    }
    onConsent(formData);
  };

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
              className={`w-full p-4 rounded-xl font-bold transition-all border-2 text-slate-950 ${showError && !formData.childName ? "border-red-500 bg-red-50 text-red-950 placeholder-red-300 focus:border-red-500 focus:outline-none" : "bg-slate-50 border-slate-100 text-slate-950 focus:border-brand-primary"}`}
              placeholder="Nombre completo"
              value={formData.childName}
              onChange={(e) => {
                setFormData({ ...formData, childName: e.target.value });
                if (showError) setShowError(false);
              }}
            />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400">
              Cédula del Acudiente
            </label>
            <input
              type="text"
              className={`w-full p-4 rounded-xl font-bold transition-all border-2 text-slate-950 ${showError && !formData.idNumber ? "border-red-500 bg-red-50 text-red-950 placeholder-red-300 focus:border-red-500 focus:outline-none" : "bg-slate-50 border-slate-100 text-slate-950 focus:border-brand-primary"}`}
              placeholder="Número de documento"
              value={formData.idNumber}
              onChange={(e) => {
                setFormData({ ...formData, idNumber: e.target.value });
                if (showError) setShowError(false);
              }}
            />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400">
              Correo de Contacto
            </label>
            <input
              type="email"
              className={`w-full p-4 rounded-xl font-bold transition-all border-2 text-slate-950 ${showError && !formData.verifiedEmail ? "border-red-500 bg-red-50 text-red-950 placeholder-red-300 focus:border-red-500 focus:outline-none" : "bg-slate-50 border-slate-100 text-slate-950 focus:border-brand-primary"}`}
              placeholder="email@ejemplo.com"
              value={formData.verifiedEmail}
              onChange={(e) => {
                setFormData({ ...formData, verifiedEmail: e.target.value });
                if (showError) setShowError(false);
              }}
            />
          </div>
        </div>

        {showError && (
          <p className="text-red-500 font-extrabold text-xs mt-4 animate-bounce text-center bg-red-50 border border-red-200 py-3 px-4 rounded-2xl flex items-center justify-center gap-2">
            ⚠️ ¡Por favor completa todos los campos del formulario!
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full mt-10 py-5 bg-accent-amber text-slate-800 font-black rounded-3xl border-b-8 border-yellow-600 shadow-xl uppercase tracking-widest hover:scale-[1.01] transition-all"
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
          className="relative py-5 pl-24 pr-6 w-full min-h-[84px] text-left bg-brand-primary text-white font-black rounded-3xl border-b-8 border-blue-800 hover:scale-[1.02] active:translate-y-1 active:border-b-0 transition-all text-lg md:text-xl flex items-center shadow-lg"
        >
          <div className="absolute left-5 w-12 h-12 bg-black/20 rounded-2xl flex items-center justify-center text-white shadow-inner">
            <Gamepad2 size={26} />
          </div>
          <span className="tracking-wide uppercase">SOY JUGADOR</span>
        </button>
        <button
          onClick={() => onSelect("parent")}
          className="relative py-5 pl-24 pr-6 w-full min-h-[84px] text-left bg-bg-space text-brand-primary font-black rounded-3xl border-b-8 border-slate-900 border-2 hover:scale-[1.02] active:translate-y-1 active:border-b-0 transition-all text-lg md:text-xl flex items-center shadow-lg"
        >
          <div className="absolute left-5 w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary shadow-inner border border-brand-primary/20">
            <User size={26} />
          </div>
          <span className="tracking-wide uppercase">SOY EL PADRE</span>
        </button>
        <button
          onClick={() => onSelect("student")}
          className="relative py-5 pl-24 pr-6 w-full min-h-[84px] text-left bg-slate-100 text-slate-700 font-black rounded-3xl border-b-8 border-slate-300 border-2 hover:scale-[1.02] active:translate-y-1 active:border-b-0 transition-all text-lg md:text-xl flex items-center shadow-lg"
        >
          <div className="absolute left-5 w-12 h-12 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-600 shadow-inner">
            <BookOpen size={26} />
          </div>
          <span className="tracking-wide uppercase leading-tight">
            SOY ESTUDIANTE INSTITUCIONAL
          </span>
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
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    if (
      !formData.studentName ||
      !formData.institutionalEmail ||
      !formData.verificationCode
    ) {
      setShowError(true);
      return;
    }
    onSubmit(formData);
  };

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
              className={`w-full p-4 rounded-xl font-bold transition-all border-2 text-slate-950 ${showError && !formData.studentName ? "border-red-500 bg-red-50 text-red-950 placeholder-red-300 focus:border-red-500 focus:outline-none" : "bg-slate-50 border-slate-100 text-slate-950 focus:border-brand-primary"}`}
              placeholder="Tu nombre completo"
              value={formData.studentName}
              onChange={(e) => {
                setFormData({ ...formData, studentName: e.target.value });
                if (showError) setShowError(false);
              }}
            />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400">
              Correo Institucional
            </label>
            <input
              type="email"
              className={`w-full p-4 rounded-xl font-bold transition-all border-2 text-slate-950 ${showError && !formData.institutionalEmail ? "border-red-500 bg-red-50 text-red-950 placeholder-red-300 focus:border-red-500 focus:outline-none" : "bg-slate-50 border-slate-100 text-slate-100 focus:border-brand-primary"}`}
              placeholder="estudiante@colegio.edu.co"
              value={formData.institutionalEmail}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  institutionalEmail: e.target.value,
                });
                if (showError) setShowError(false);
              }}
            />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400">
              Código de Verificación
            </label>
            <input
              type="text"
              className={`w-full p-4 rounded-xl font-bold transition-all border-2 text-slate-950 ${showError && !formData.verificationCode ? "border-red-500 bg-red-50 text-red-950 placeholder-red-300 focus:border-red-500 focus:outline-none" : "bg-slate-50 border-slate-100 text-slate-950 focus:border-brand-primary"}`}
              placeholder="Código entregado por tu colegio"
              value={formData.verificationCode}
              onChange={(e) => {
                setFormData({ ...formData, verificationCode: e.target.value });
                if (showError) setShowError(false);
              }}
            />
          </div>
        </div>

        {showError && (
          <p className="text-red-500 font-extrabold text-xs mt-4 animate-bounce text-center bg-red-50 border border-red-200 py-3 px-4 rounded-2xl flex items-center justify-center gap-2">
            ⚠️ ¡Por favor completa todos los campos del formulario!
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full mt-10 py-5 bg-brand-primary text-white font-black rounded-3xl border-b-8 border-purple-800 shadow-xl uppercase tracking-widest hover:scale-[1.01] transition-all"
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

                          {isActive && (
                            <>
                              {/* Pulsing deep aura ring */}
                              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-yellow-300/35 to-purple-500/35 blur-md animate-pulse -z-10" />
                              {/* Standard ping ring */}
                              <div className="absolute -inset-1 rounded-full border-4 border-yellow-300/50 animate-ping -z-10 duration-1000" />
                            </>
                          )}

                          <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                              opacity: 1,
                              scale: isActive ? [1, 1.15, 1] : 1,
                              boxShadow: isActive
                                ? [
                                    "0 0 15px #D97706",
                                    "0 0 45px #FBBF24",
                                    "0 0 15px #D97706",
                                  ]
                                : "none",
                            }}
                            transition={{
                              delay: lIdx * 0.1,
                              scale: isActive
                                ? {
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }
                                : {},
                              boxShadow: isActive
                                ? {
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
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
                                    : "bg-purple-600 border-b-8 border-purple-900 text-white ring-4 ring-yellow-400 border-4 border-yellow-350 glow-text scale-[1.05]"
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
  const [interactiveSolved, setInteractiveSolved] = useState(false);

  const content = lesson.content || [];
  const currentContent = content[step];

  const isInteractive =
    currentContent &&
    [
      "completar-frase",
      "ordenar",
      "mapa-corporal",
      "hecho-interpretacion",
      "velocimetro",
      "noticiero",
      "yo-futuro",
      "mapa-apoyo",
      "preocupacion-util",
      "yo-compasivo",
      "laboratorio-pociones",
      "multiple-select",
    ].includes(currentContent.type);

  const toggleSpeak = () => {
    setIsSpeaking(!isSpeaking);
    if (!isSpeaking) {
      let textToSpeak = currentContent.text || currentContent.question;

      if (!textToSpeak && currentContent.type) {
        const interactiveDescriptions: Record<string, string> = {
          "mapa-corporal":
            "Mi cuerpo tiene el mapa de mis emociones. Haz clic en una de las sensaciones físicas e identifícala en la silueta del astronauta para ver su explicación científica.",
          "hecho-interpretacion":
            "Hecho o interpretación. Lee cada situación y decide si es un dato totalmente objetivo, un hecho, o una historia subjetiva que crea tu mente, una interpretación.",
          velocimetro:
            "Velocímetro de ansiedad. Ajusta el velocímetro regulando tu estado actual, del uno al diez. Luego responde con sinceridad cómo se manifiesta esa fuerza en tu mente.",
          noticiero:
            "El Noticiero de la Mente. Analicemos cómo la mente de forma espontánea a menudo dramatiza y exagera las preocupaciones cotidianas. Lee el titular exagerado y redáctalo de manera realista.",
          "yo-futuro":
            "La carta a mi yo del futuro. Date un espacio de calma para responder a estas amigables preguntas concebidas para recordarle a tu yo del mañana tus fortalezas y metas actuales.",
          "mapa-apoyo":
            "Mi mapa de apoyo estelar. Nombra a cinco personas confiables, amigos, familiares o tutores, que conforman tu tripulación de rescate y apoyo en momentos de inestabilidad.",
          "preocupacion-util":
            "Clasificador de preocupaciones. No todas las preocupaciones son iguales. Algunas son útiles porque podemos resolverlas hoy, y otras no lo son. Vamos a clasificarlas.",
          "yo-compasivo":
            "La carta para mi yo compasivo. Escribe una breve nota de aliento dirigida a ti mismo o a un amigo cercano, usando palabras amables, libres de juicios dañinos.",
          "laboratorio-pociones":
            "El laboratorio de pociones de calma. Combina los ingredientes correctos para preparar misiones mágicas que reequilibren tu energía emocional según la receta del grimorio.",
        };
        textToSpeak = interactiveDescriptions[currentContent.type] || "";
      }

      if (!textToSpeak) {
        textToSpeak =
          lesson.description ||
          lesson.title ||
          "Misión interactiva en progreso";
      }

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
      setInteractiveSolved(false);
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
            className={`max-w-3xl md:max-w-4xl w-full p-8 md:p-12 rounded-[60px] shadow-2xl border-4 relative overflow-hidden ${lesson.type === "boss" ? "bg-red-950/20 border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.2)]" : "bg-bg-space border-brand-primary/30"}`}
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

            {isInteractive ? (
              <div
                id="interactive-activity-box"
                className="w-full text-left mt-6 custom-scroll overflow-y-auto max-h-[68vh] pr-2"
              >
                {currentContent.type === "completar-frase" && (
                  <CompletarFrase
                    text={currentContent.text}
                    sentences={currentContent.sentences}
                    bank={currentContent.bank}
                    correct={currentContent.correct}
                    feedback={currentContent.feedback}
                    onSuccess={() => {
                      setInteractiveSolved(true);
                      setFeedbackType("correct");
                      setShowFeedback(true);
                    }}
                  />
                )}
                {currentContent.type === "ordenar" && (
                  <OrdenarSecuencia
                    text={currentContent.text}
                    initialItems={currentContent.initialItems}
                    correctItems={currentContent.correctItems}
                    feedback={currentContent.feedback}
                    onSuccess={() => {
                      setInteractiveSolved(true);
                      setFeedbackType("correct");
                      setShowFeedback(true);
                    }}
                  />
                )}
                {currentContent.type === "mapa-corporal" && (
                  <MapaCorporal
                    onSuccess={() => {
                      setInteractiveSolved(true);
                      setFeedbackType("correct");
                      setShowFeedback(true);
                    }}
                  />
                )}
                {currentContent.type === "hecho-interpretacion" && (
                  <HechoInterpretacion
                    onSuccess={() => {
                      setInteractiveSolved(true);
                      setFeedbackType("correct");
                      setShowFeedback(true);
                    }}
                  />
                )}
                {currentContent.type === "velocimetro" && (
                  <VelocimetroAnsiedad
                    onSuccess={() => {
                      setInteractiveSolved(true);
                      setFeedbackType("correct");
                      setShowFeedback(true);
                    }}
                  />
                )}
                {currentContent.type === "noticiero" && (
                  <NoticieroMente
                    onSuccess={() => {
                      setInteractiveSolved(true);
                      setFeedbackType("correct");
                      setShowFeedback(true);
                    }}
                  />
                )}
                {currentContent.type === "yo-futuro" && (
                  <YoFuturo
                    onSuccess={() => {
                      setInteractiveSolved(true);
                      setFeedbackType("correct");
                      setShowFeedback(true);
                    }}
                  />
                )}
                {currentContent.type === "mapa-apoyo" && (
                  <MapaApoyo
                    onSuccess={() => {
                      setInteractiveSolved(true);
                      setFeedbackType("correct");
                      setShowFeedback(true);
                    }}
                  />
                )}
                {currentContent.type === "preocupacion-util" && (
                  <PreocupacionUtilUtil
                    onSuccess={() => {
                      setInteractiveSolved(true);
                      setFeedbackType("correct");
                      setShowFeedback(true);
                    }}
                  />
                )}
                {currentContent.type === "yo-compasivo" && (
                  <LaCartaYoCompasivo
                    onSuccess={() => {
                      setInteractiveSolved(true);
                      setFeedbackType("correct");
                      setShowFeedback(true);
                    }}
                  />
                )}
                {currentContent.type === "laboratorio-pociones" && (
                  <LaboratorioPociones
                    onSuccess={() => {
                      setInteractiveSolved(true);
                      setFeedbackType("correct");
                      setShowFeedback(true);
                    }}
                  />
                )}
                {currentContent.type === "multiple-select" && (
                  <MultipleSelectQuiz
                    question={currentContent.question}
                    options={currentContent.options}
                    correct={currentContent.correct}
                    feedback={currentContent.feedback}
                    onSuccess={() => {
                      setInteractiveSolved(true);
                      setFeedbackType("correct");
                      setShowFeedback(true);
                    }}
                  />
                )}
              </div>
            ) : !currentContent.options ? (
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

                <div className="grid gap-4 custom-scroll overflow-y-auto max-h-[55vh] pr-1">
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
              className={`absolute bottom-32 w-full max-w-lg p-8 rounded-[40px] border-b-8 shadow-2xl z-25 ${
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
                    setInteractiveSolved(false);
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
              (currentContent.options &&
                selectedOption === null &&
                !showFeedback) ||
              (isInteractive && !interactiveSolved && !showFeedback)
            }
            className={`w-full py-6 bg-brand-primary text-white font-black text-xl rounded-3xl shadow-xl border-b-8 border-purple-800 hover:scale-[1.02] transition-all active:translate-y-1 active:border-b-0 uppercase tracking-widest glow-text ${(currentContent.options && selectedOption === null && !showFeedback) || (isInteractive && !interactiveSolved && !showFeedback) ? "opacity-50 grayscale cursor-not-allowed" : ""}`}
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
