import { Lesson } from "./types";

export const INITIAL_LESSONS: Lesson[] = [
  // ==========================================
  // STAGE 1: ANXIETY (20 Levels)
  // ==========================================
  {
    id: "ans-1",
    sectionId: "anxiety",
    title: "¿Tu cuerpo te manda alertas?",
    description: "Aprende a reconocer tus señales corporales.",
    type: "anxiety",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 1,
    content: [
      {
        text: "El corazón acelerado antes de un examen. Las mariposas en el estómago antes de hablar en clase; son señales que nos manda el cuerpo. Eso tiene nombre: ansiedad. Y está bien sentirla.",
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
          "La ansiedad es una señal normal del cuerpo, no una debilidad. Todos la sentimos de vez en cuando (Craske & Barlow, 2022; Kendall et al., 2016).",
        hint: "Recuerda que la ansiedad es una señal.",
      },
    ],
  },
  {
    id: "ans-2",
    sectionId: "anxiety",
    title: "El ciclo del miedo",
    description: "¿Por qué evitar agranda nuestras dudas?",
    type: "anxiety",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 2,
    content: [
      {
        type: "completar-frase",
        text: "El miedo es una emoción que todos experimentamos en algún momento de nuestras vidas. A menudo, cuando nos enfrentamos a algo que nos asusta, nuestra reacción puede ser evitarlo. Aunque esto puede proporcionar un alivio temporal, a la larga, el miedo tiende a crecer y volverse más intenso.",
        sentences: [
          "Cuando evito algo que me da miedo, siento [GAP_0] por un momento, pero el miedo se vuelve [GAP_1].",
          "Para reducir la ansiedad de verdad, necesito [GAP_2] las situaciones que me asustan poco a poco.",
        ],
        bank: [
          "alivio",
          "tristeza",
          "más grande",
          "más pequeño",
          "afrontar",
          "evitar",
          "correr",
          "huir",
          "felicidad",
        ],
        correct: ["alivio", "más grande", "afrontar"],
        feedback:
          "Para reducir la ansiedad, es importante afrontar las situaciones que nos asustan poco a poco, en lugar de evitar (Clark & Wells, 1995; Higa-McMillan, 2016).",
        hint: "Evitar no es la mejor opción. Busquemos afrontar.",
      },
    ],
  },
  {
    id: "ans-3",
    sectionId: "anxiety",
    title: "Respiración cuadrada",
    description: "Hackea tu calma en 4 pasos.",
    type: "anxiety",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 3,
    content: [
      {
        type: "ordenar",
        text: "Imagina que estás dibujando un cuadrado. Esta técnica de respiración tiene cuatro partes, como los cuatro lados del cuadrado, hacer esto ayuda a que tu cuerpo se sienta más tranquilo y relajado rápidamente.",
        correctItems: [
          "Inhalar por la nariz contando 4 tiempos.",
          "Sostener el aire contando 4 tiempos.",
          "Exhala lentamente por la boca contando 4 tiempos.",
          "Sostener sin aire contando 4 tiempos.",
        ],
        initialItems: [
          "Sostener sin aire contando 4 tiempos.",
          "Inhalar por la nariz contando 4 tiempos.",
          "Exhala lentamente por la boca contando 4 tiempos.",
          "Sostener el aire contando 4 tiempos.",
        ],
        feedback:
          "Al inhalar, retener, exhalar y mantener el vacío en tiempos iguales, le envías a tu cerebro la señal directa de que estás a salvo (Zaccaro et al., 2018; Ma et al., 2017).",
        hint: "Recuerda el ciclo de la vida: primero necesitas llenarte de aire (inhalar), luego sostener, y después exhalar.",
      },
    ],
  },
  {
    id: "ans-4",
    sectionId: "anxiety",
    title: "¿Qué hace la evitación?",
    description: "La trampa del desvío rápido.",
    type: "anxiety",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 4,
    content: [
      {
        text: "La evitación es un comportamiento que muchas personas utilizan para escapar de situaciones que les generan miedo o ansiedad. Aunque puede parecer una solución fácil en el momento, evitar enfrentar nuestros miedos puede tener consecuencias a largo plazo.",
        image: "🚪",
      },
      {
        question:
          "Valentina siempre se hace la enferma los días que tiene que exponer en clase. ¿Qué le pasa a su miedo con el tiempo?",
        options: [
          "El miedo desaparece porque no tiene que enfrentarlo.",
          "El miedo se mantiene igual, no cambia.",
          "El miedo crece porque el cerebro aprende que exponer es peligroso.",
          "Valentina se vuelve más valiente al descansar de las exposiciones.",
        ],
        correct: 2,
        feedback:
          "Cada vez que evitamos, le decimos al cerebro que tenía razón en asustarse. Por eso el miedo crece (Barlow, 2002; Chorpita & Daleiden, 2009).",
        hint: "Recuerda que el miedo crece si lo evitas y el cerebro aprende que eso que evitamos es peligroso.",
      },
    ],
  },
  {
    id: "ans-5",
    sectionId: "anxiety",
    title: "Detector de pensamientos",
    description: "Identifica pensamientos trampa.",
    type: "anxiety",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 5,
    content: [
      {
        type: "completar-frase",
        text: "A veces, nuestros pensamientos pueden engañarnos y hacernos sentir miedo o ansiedad sin una razón real. Estos son lo que llamamos 'pensamientos trampa'. Aprender a identificarlos y cuestionarlos es un paso importante.",
        sentences: [
          "Cuando tengo un pensamiento que me asusta, primero pregunto: ¿Es [GAP_0] que esto va a pasar?",
          "Luego me pregunto: ¿Qué le [GAP_1] a un amigo que piensa lo mismo?",
          "Finalmente escribo un pensamiento [GAP_2] que sea más justo conmigo.",
        ],
        bank: [
          "seguro",
          "posible",
          "diría",
          "haría",
          "equilibrado",
          "exagerado",
          "incontrolable",
          "inquieto",
          "inseguro",
        ],
        correct: ["seguro", "diría", "equilibrado"],
        feedback:
          "Siempre trata de desarrollar una forma más justa y equilibrada de pensar sobre las situaciones que te generan miedo (Beck, 2021; Kendall et al., 2016).",
        hint: "Busca una palabra que describa un pensamiento que no se va a los extremos, sino que se mantiene en un punto medio.",
      },
    ],
  },
  {
    id: "ans-6",
    sectionId: "anxiety",
    title: "El ciclo de la ansiedad",
    description: "Ordena los engranajes del temor.",
    type: "anxiety",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 6,
    content: [
      {
        type: "ordenar",
        text: "Imagina que te llaman para exponer en clase. Esta situación puede activar una alerta en tu mente, desencadenando una serie de reacciones físicas y conductuales. Ordena las etapas correctas:",
        correctItems: [
          "Una situación activa una alerta (ej. te llaman a exponer).",
          "Aparece un pensamiento automático (ej. 'Me voy a bloquear').",
          "El cuerpo reacciona con emoción intensa (corazón acelerado, sudor).",
          "Evitas la situación para sentir alivio rápido.",
          "El cerebro confirma que la situación era peligrosa y el miedo crece.",
        ],
        initialItems: [
          "Evitas la situación para sentir alivio rápido.",
          "Una situación activa una alerta (ej. te llaman a exponer).",
          "El cerebro confirma que la situación era peligrosa and el miedo crece.",
          "Aparece un pensamiento automático (ej. 'Me voy a bloquear').",
          "El cuerpo reacciona con emoción intensa (corazón acelerado, sudor).",
        ],
        feedback:
          "Evitar enseña al cerebro que solo sobreviviste gracias al escape. Romper el ciclo requiere exposición gradual (Clark & Wells, 1995; Craske & Barlow, 2022).",
        hint: "Primero aparece la situación y el pensamiento automático, luego la reacción corporal y finalmente evitas.",
      },
    ],
  },
  {
    id: "ans-7",
    sectionId: "anxiety",
    title: "Pensamientos y etiquetas",
    description: "No te pongas leyes absolutas.",
    type: "anxiety",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 7,
    content: [
      {
        text: "Los pensamientos que tenemos sobre nosotros mismos influyen en cómo actuamos. A veces, al obtener una calificación regular en un examen, caemos en patrones que nos hacen sentir peor.",
        image: "🏷️",
      },
      {
        question:
          "Andrés saca un 3.8 en un examen y piensa: 'Soy un fracasado total, nunca sirvo para nada.' ¿Qué tipo de pensamiento es este?",
        options: [
          "Lectura de mente: cree saber lo que otros piensan de él.",
          "Generalización excesiva: usa un evento para concluir algo absoluto sobre sí mismo.",
          "Catastrofización: imagina el peor resultado posible.",
          "Pensamiento mágico: cree que sus pensamientos causan eventos.",
        ],
        correct: 1,
        feedback:
          "Frases como 'Nunca sirvo para nada' a partir de un solo resultado es una de las distorsiones más frecuentes en la ansiedad (Beck, 1979; Burns, 1980).",
        hint: "Andrés sacó un 3.8 que es aprobatorio, pero se impuso el término permanente de 'nunca sirvo'.",
      },
    ],
  },
  {
    id: "ans-8",
    sectionId: "anxiety",
    title: "La escalera de miedo",
    description: "Exposición paso a paso.",
    type: "anxiety",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 8,
    content: [
      {
        type: "completar-frase",
        text: "Enfrentar miedos es retador pero vital. La técnica de exposición gradual nos ayuda a enfrentar miedos de manera controlada para que el cerebro entienda que no hay peligro real.",
        sentences: [
          "La exposición gradual funciona porque el cerebro aprende que la situación no es tan [GAP_0] como creía.",
          "Cada vez que afronto un miedo sin evitarlo, el nivel de ansiedad sube y luego [GAP_1] solo.",
          "La escalera empieza por los miedos [GAP_2], no por los más intensos.",
        ],
        bank: [
          "peligrosa",
          "segura",
          "baja",
          "sube",
          "más fáciles",
          "más difíciles",
          "miedo",
          "risa",
        ],
        correct: ["peligrosa", "baja", "más fáciles"],
        feedback:
          "La escalera de miedos empieza siempre con los más fáciles para ir avanzando progresivamente (Higa-McMillan, 2016; Chorpita, 2009).",
        hint: "Para subir sin resbalarte, pones el pie sobre el escalón más accesible y fácil.",
      },
    ],
  },
  {
    id: "ans-9",
    sectionId: "anxiety",
    title: "Postergación de dudas",
    description: "Guarda tus preocupaciones para luego.",
    type: "anxiety",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 9,
    content: [
      {
        type: "ordenar",
        text: "En lugar de dejar que las preocupaciones te controlen todo el día, ordene los pasos de la postergación de preocupaciones para abordarlas juntas en un momento específico:",
        correctItems: [
          "Aparece una preocupación en un momento del día.",
          "La anoto en la app sin seguir pensando en ella.",
          "Me digo: 'La pienso en mi momento de preocupaciones.'",
          "En el horario programado leo todas las preocupaciones anotadas.",
          "Para cada una me pregunto: ¿Puedo hacer algo al respecto? ¿Sigue siendo importante?",
        ],
        initialItems: [
          "Para cada una me pregunto: ¿Puedo hacer algo al respecto? ¿Sigue siendo importante?",
          "Aparece una preocupación en un momento del día.",
          "Me digo: 'La pienso en mi momento de preocupaciones.'",
          "En el horario programado leo todas las preocupaciones anotadas.",
          "La anoto en la app sin seguir pensando en ella.",
        ],
        feedback:
          "Al mirarlas en frío, descubrirás que muchas preocupaciones perdieron su fuerza o relevancia solas (Borkovec et al., 1983; Rego, 2011).",
        hint: "Anota la preocupación primero, mantén tu horario y evalúalas de forma analítica al final.",
      },
    ],
  },
  {
    id: "ans-10",
    sectionId: "anxiety",
    title: "Calma 5-4-3-2-1",
    description: "Trae tu atención de vuelta.",
    type: "anxiety",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 10,
    content: [
      {
        text: "La técnica 5-4-3-2-1 es una herramienta excelente para reaccionar al pánico al conectarte con el presente mediante tus cinco sentidos básicos.",
        image: "🖐️",
      },
      {
        question: "¿Cuál es el mejor momento para usar la técnica 5-4-3-2-1?",
        options: [
          "Solo antes de dormir, como de costumbre.",
          "Cuando siento que la ansiedad está subiendo y mi mente está dando vueltas al mismo pensamiento.",
          "Después de que la ansiedad ya bajó, para celebrar.",
          "Únicamente durante ataques de pánico severos.",
        ],
        correct: 1,
        feedback:
          "Es más efectiva cuando la activas de forma temprana — rompe el engranaje del pánico antes de que se cierre (Keng et al., 2011; Zenner, 2014).",
        hint: "Piensa en interrumpir el ciclo de forma preventiva antes de llegar al máximo.",
      },
    ],
  },
  {
    id: "ans-11",
    sectionId: "anxiety",
    title: "Mi cuerpo tiene el mapa",
    description: "Ubica tus respuestas físicas.",
    type: "anxiety",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 11,
    content: [
      {
        type: "mapa-corporal",
      },
    ],
  },
  {
    id: "ans-12",
    sectionId: "anxiety",
    title: "Hecho vs Interpretación",
    description: "Filtra fantasías ansiosas de realidades.",
    type: "anxiety",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 12,
    content: [
      {
        type: "hecho-interpretacion",
      },
    ],
  },
  {
    id: "ans-13",
    sectionId: "anxiety",
    title: "El velocímetro interno",
    description: "Reconoce tu punto de aceleración.",
    type: "anxiety",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 13,
    content: [
      {
        type: "velocimetro",
      },
    ],
  },
  {
    id: "ans-14",
    sectionId: "anxiety",
    title: "Noticiero de mi Mente",
    description: "Desarma titulares exagerados.",
    type: "anxiety",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 14,
    content: [
      {
        type: "noticiero",
      },
    ],
  },
  {
    id: "ans-15",
    sectionId: "anxiety",
    title: "Yo del Futuro",
    description: "Gana perspectiva temporal en miedos.",
    type: "anxiety",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 15,
    content: [
      {
        type: "yo-futuro",
      },
    ],
  },
  {
    id: "ans-16",
    sectionId: "anxiety",
    title: "Mapa de Apoyo",
    description: "Traza tu red para tormentas.",
    type: "anxiety",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 16,
    content: [
      {
        type: "mapa-apoyo",
      },
    ],
  },
  {
    id: "ans-17",
    sectionId: "anxiety",
    title: "Experimento del Control",
    description: "Resta control y gana tranquilidad.",
    type: "anxiety",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 17,
    content: [
      {
        text: "Cuando la ansiedad se eleva, nuestra mente se vuelve súper controladora y nos exige hipervigilancia total sobre cada insignificante detalle.",
        image: "🧪",
      },
      {
        question:
          "Santiago predice que si no revisa todo grupal sacarán cero. ¿Qué experimento propone un término medio saludable?",
        options: [
          "El experimento del abandono total: apagar el teléfono y ausentarse.",
          "El experimento del hipercontrol: quedarse en vela rehaciendo todo solo.",
          "El experimento de la delegación pequeña: asumir su parte y revisar con un compañero la conclusión juntos una sola vez al final.",
          "Abstenerse de ayudar pero guardarle rabia al grupo.",
        ],
        correct: 2,
        feedback:
          "Al delegar una porción controlada, le permites a la realidad demostrarte que no ocurrirá un desastre (Bennett-Levy, 2004; McManus, 2012).",
        hint: "Busca la opción que delegue una tarea puntual con un único análisis final.",
      },
    ],
  },
  {
    id: "ans-18",
    sectionId: "anxiety",
    title: "Preocupaciones Útiles",
    description: "Diferencia ruidos de planes viables.",
    type: "anxiety",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 18,
    content: [
      {
        type: "preocupacion-util",
      },
    ],
  },
  {
    id: "ans-19",
    sectionId: "anxiety",
    title: "Mi Yo Compasivo",
    description: "Háblate con afecto y clemencia.",
    type: "anxiety",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 19,
    content: [
      {
        type: "yo-compasivo",
      },
    ],
  },
  {
    id: "ans-20",
    sectionId: "anxiety",
    title: "EL JEFE: VORTEX",
    description: "Diseña tu pócima de rescate químico.",
    type: "boss",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 20,
    content: [
      {
        type: "laboratorio-pociones",
      },
    ],
  },

  // ==========================================
  // STAGE 2: DEPRESSION (20 Levels)
  // ==========================================
  {
    id: "dep-1",
    sectionId: "depression",
    title: "Tristeza vs Depresión",
    description: "Aprende las diferencias de ánimo.",
    type: "depression",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 21,
    content: [
      {
        text: "La tristeza suele tener una causa clara y dura poco. La depresión se ancla por semanas, apaga el goce por tus entretenimientos y merma notablemente tu energía física diaria.",
        image: "☁️",
      },
      {
        question:
          "Valentina lleva tres semanas vacía, duerme en demasía y se percibe como una carga sin causa real. ¿Qué describe su estado?",
        options: [
          "Es solo tristeza normal que se solucionará esperando solitaria.",
          "Como no tiene una causa dura, es solo para llamar la atención.",
          "Su estado se asemeja a la depresión por su prolongación mayor a dos semanas, apatía por todo y ausencia de luto.",
          "Solo es preocupante si empieza a reprobar materias.",
        ],
        correct: 2,
        feedback:
          "La depresión puede aparecer de forma biológica sin un desencadenante evidente (APA, 2013; Hankin et al., 2015).",
        hint: "Presta atención a la duración, asimetría de goces y la ausencia de un motivo trágico concreto.",
      },
    ],
  },
  {
    id: "dep-2",
    sectionId: "depression",
    title: "Cerebro y depresión",
    description: "Conoce los sensores desregulados.",
    type: "depression",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 22,
    content: [
      {
        text: "En la juventud, tu cerebro cambia aceleradamente. En la depresión, la alarma emocional se enciende a tope por tonterías, mientras la corteza reguladora de calma trabaja con menos fuerza.",
        image: "🧠",
      },
      {
        question:
          "¿Qué ocurre con el cerebro adolescente en presencia de la depresión?",
        options: [
          "La zona de amortiguación afectiva trabaja de forma hiperactiva.",
          "La alarma emocional se activa con desmedida facilidad y el freno amortiguador trabaja con menor ímpetu.",
          "Se cancelan biológicamente todas las emociones por completo.",
          "Los mensajeros neurotransmisores suben para darnos alegría extra.",
        ],
        correct: 1,
        feedback:
          "Esta desregulación temporal hace que las dificultades normales se perciban gigantes (Lupien et al., 2009; Gotlib & Hamilton, 2008).",
        hint: "Es una sumatoria: alarma altamente sensible sumada a un freno debilitado.",
      },
    ],
  },
  {
    id: "dep-3",
    sectionId: "depression",
    title: "La depresión invisible",
    description: "No todo es llanto constante.",
    type: "depression",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 23,
    content: [
      {
        type: "multiple-select",
        question:
          "Sebastián antes era pacífico, pero hace un mes está irritable, con dolores tensionales estomacales y no contesta mensajes. No llora. ¿Qué afirmaciones son acertadas?",
        options: [
          "La depresión en jóvenes frecuentemente asume formas de mal genio recurrente, dolores somáticos y aislamiento en lugar de llanto.",
          "La irritabilidad crónica y las afecciones físicas sin fundamento médico son alertas que ameritan una evaluación cordial.",
          "Es solo rebeldía obligada del crecimiento, no conviene intervenir de ninguna forma.",
          "Solo es objeto de alarma si el rendimiento escolar decae a cero.",
        ],
        correct: [0, 1],
        feedback:
          "La tristeza en jóvenes a menudo asume máscaras de ira defensiva, quejas físicas y desvinculación progresiva de amigos (APA, 2013; Stringaris & Goodman, 2009).",
      },
    ],
  },
  {
    id: "dep-4",
    sectionId: "depression",
    title: "Laberinto de redes",
    description: "La tiranía del feed perfecto.",
    type: "depression",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 24,
    content: [
      {
        text: "Consumir perfiles perfectos de redes sin interactuar te incita a comparar tu vida detrás de escena con la máscara editada de los demás.",
        image: "📱",
      },
      {
        question:
          "Laura pasa horas scrolleando fotos perfectas de compañeras y termina frustrada y decaída sin saber por qué. ¿Qué lo explica?",
        options: [
          "Dos horas es insignificante; necesita pasar cuatro horas para alterarse.",
          "El scrolleo pasivo la empuja a la comparación social nociva contra fragmentos editados e irreales de otros.",
          "Instagram destruye las neuronas mecánicas de forma instantánea.",
          "Es una señal biológica de queLaura tiene baja capacidad académica.",
        ],
        correct: 1,
        feedback:
          "La comparación pasiva recurrente con ideales irreales de bienestar fomenta un desprecio severo de los propios logros (Twenge et al., 2018; Coyne et al., 2020).",
        hint: "Fíjate en el término de comparación social pasiva silenciosa contra vidas recortadas.",
      },
    ],
  },
  {
    id: "dep-5",
    sectionId: "depression",
    title: "Filtros y trampas",
    description: "Identifica los extremos absolutos.",
    type: "depression",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 25,
    content: [
      {
        text: "La tristeza tiñe las opiniones. Hace que tu cerebro ignore el lado positivo de un evento y se autoafirme en mentiras catastróficas del todo-o-nada.",
        image: "🕶️",
      },
      {
        question:
          "Camila obtiene un aceptable 3.8 y concluye: 'Me fue terrible. Nunca voy a poder con la materia. Siempre soy la peor.' ¿Qué trampas hay?",
        options: [
          "Ninguna; es totalmente lógico y honesto que se exprese con ese desprecio.",
          "Una sola: una leve molestia por perfeccionismo escolar.",
          "Múltiples trampas: filtro negativo (ignora pasar la materia), catastrofismo y etiquetas extremas absolutas ('nunca', 'siempre').",
          "Adjudicarse culpas ajenas a su control social.",
        ],
        correct: 2,
        feedback:
          "Desmontar el absolutismo del filtro negativo disminuye la pesadez de los errores pasajeros (Beck et al., 1979; Haaga et al., 1991).",
        hint: "Presta atención al uso de leyes absolutas injustas como 'nunca sirvo' y 'siempre fallo'.",
      },
    ],
  },
  {
    id: "dep-6",
    sectionId: "depression",
    title: "Sueño y humor",
    description: "La regularidad de tu recarga.",
    type: "depression",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 26,
    content: [
      {
        type: "multiple-select",
        question:
          "Daniel duerme 5 horas semanales y 12 horas el sábado para 'liquidar la deuda'. ¿Qué riesgos tiene esta rutina en su salud mental?",
        options: [
          "El sueño no se acumula ni se repone en bloques; dormir de menos debilita el escudo de los neurotransmisores de bienestar.",
          "Dormir poco desgasta la paciencia y el humor diario; los atracones de fin de semana descalibran el ritmo circadiano.",
          "Es una rutina totalmente normal que no repercute cognitivamente.",
          "Provoca fatiga física constante que el cerebro traduce como desánimo profundo durante la semana escolar.",
        ],
        correct: [0, 1, 3],
        feedback:
          "La falta recurrente de sueño diario magnifica la desregulación emocional, haciendo insalvables los retos (Paruthi et al., 2106; Harvey, 2011).",
      },
    ],
  },
  {
    id: "dep-7",
    sectionId: "depression",
    title: "La inercia de actuar",
    description: "Las ganas nacen del movimiento.",
    type: "depression",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 27,
    content: [
      {
        type: "multiple-select",
        question:
          "Sofi disfrutaba el voleibol, pero lo dejó y dice: 'Regresaré cuando me nazcan las ganas'. ¿Por qué postergar es perjudicial en la depresión?",
        options: [
          "En la depresión, las ganas no reaparecen solas esperando; el cerebro desmotivado necesita la inercia de un paso pequeño inicial.",
          "La activación conductual demuestra que el ánimo se gatilla como resultado del movimiento físico, no antes del mismo.",
          "Es lo más aconsejable para evitar la exigencia física del deporte.",
          "Solo debe chatear y suspender todas las salidas.",
        ],
        correct: [0, 1],
        feedback:
          "Iniciar con una actividad pequeña rompe el ciclo inactivo del decaimiento cerebral (Cuijpers et al., 2007; Lejuez, 2011).",
      },
    ],
  },
  {
    id: "dep-8",
    sectionId: "depression",
    title: "Hablase con amabilidad",
    description: "Desarma el desprecio interno.",
    type: "depression",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 28,
    content: [
      {
        text: "La autocrítica hostil daña tu cerebro igual que una amenaza física en curso. Háblate con la misma ternura que le ofrecerías a tu mejor amigo.",
        image: "🤍",
      },
      {
        question:
          "Tomás se equivoca en clase y piensa: 'Soy un fracasado.' ¿Cómo luce una respuesta autocompasiva y protectora?",
        options: [
          "Validar que el error duele recio, consolarse y recordarse que un fallo transitorio no destruye su valor o inteligencia completa.",
          "Negar el acontecimiento distrayéndose en videojuegos de forma obsesiva.",
          "Decirse mentiras exageradas sobre ser perfecto e infalible.",
          "Rumiar su descuidado en silencio por varias jornadas.",
        ],
        correct: 0,
        feedback:
          "La amabilidad realista ante la falla atenúa el miedo limitante a volver a probar (Neff, 2003; Blatt, 2004).",
        hint: "Busca la opción que acoja el dolor con clemencia, no con castigos mentales severos.",
      },
    ],
  },
  {
    id: "dep-9",
    sectionId: "depression",
    title: "El puente de la amistad",
    description: "Acompañar sin emitir juicios.",
    type: "depression",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 29,
    content: [
      {
        type: "multiple-select",
        question:
          "Tu amiga íntima lleva semanas ausente y apagada. Decides obrar con cuidado. ¿Qué caminos son aconsejables?",
        options: [
          "Acercarte en forma privada y formularle un sincero '¿cómo estás de verdad?'.",
          "Oír su malestar con paciencia y discreción, sin sermonearla ni exigirle 'ponle ganas'.",
          "Sugerirle respetuosamente buscar la guía del orientador o especialista escolar y ofrecerte a acompañarla.",
          "Forzarla a divertirse en público, revelando su malestar a otros para aconsejarla conjuntamente sin su anuencia.",
        ],
        correct: [0, 1, 2],
        feedback:
          "Una oreja dispuesta libre de críticas y motivar la vinculación con redes de soporte escolar son las mayores muestras de aprecio (Kitchener & Jorm, 2002; Rickwood et al., 2005).",
      },
    ],
  },
  {
    id: "dep-10",
    sectionId: "depression",
    title: "Buscar ayuda calificada",
    description: "Reconoce cuándo es tramo clínico.",
    type: "depression",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 30,
    content: [
      {
        text: "No requieres estar al borde del colapso para merecer apoyo. Dos semanas continuas de apatía general y pesadez son un indicador prudente para consultar.",
        image: "🩺",
      },
      {
        question:
          "Andrés lleva tres semanas cansado y vacío, pero dice: 'No es para tanto, todos tienen rachas malas'. ¿Qué criterio es apropiado?",
        options: [
          "Tiene razón; tres semanas es un luto breve que disolverá con ocio solitario.",
          "Debe consultar únicamente si empieza a reprobar exámenes drásticamente.",
          "Como ya sobrepasó el umbral clínico de dos semanas con cansancio y anhedonia, merece buscar ayuda sin dudar.",
          "Mientras no tenga llanto o crisis estridentes de luto, carece de alertas.",
        ],
        correct: 2,
        feedback:
          "Esperar a que el dolor se torne insostenible dilata la sanación del desánimo (APA, 2013; Radez et al., 2021).",
        hint: "Nuestras directrices fijan el umbral de dolor sostenido en las dos semanas continuadas.",
      },
    ],
  },
  {
    id: "dep-11",
    sectionId: "depression",
    title: "Tu cuerpo también habla",
    description: "Diferencia astenia de desgana voluntaria.",
    type: "depression",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 31,
    content: [
      {
        type: "multiple-select",
        question:
          "Sofi lleva semanas cansada. Duerme mucho, tiene dolor de cabeza frecuente y se tacha de 'perezosa'. ¿Qué le dirías?",
        options: [
          "Es posible que tu corporalidad esté manifestando dolores que no has procesado de forma consciente.",
          "Debes forzarte e ir de compras para superar de inmediato la modorra.",
          "El letargo extremo y la somnolencia desmedida son llamadas físicas de socorro de la depresión clínica.",
          "Esto carece por completo de conexión con tus sentimientos.",
        ],
        correct: [0, 2],
        feedback:
          "Nuestra mente y cuerpo operan unidos; el dolor anímico a menudo asume de forma silenciosa tensionales del cuerpo (Thapar et al., 2022).",
      },
    ],
  },
  {
    id: "dep-12",
    sectionId: "depression",
    title: "Detector de mitos",
    description: "Derrumba mentiras del bienestar.",
    type: "depression",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 32,
    content: [
      {
        text: "Reducir la depresión a 'una simple flojera' o 'mucha tristeza pasajera' fomenta sentimientos de desamparo y culpa injustos.",
        image: "🛡️",
      },
      {
        question:
          "Un compañero afirma: 'La depresión es estar algo triste y desganado. Poniéndole voluntad se cura'. ¿Qué opinas?",
        options: [
          "Es totalmente veraz; la voluntad anula el desbalance químico del cerebro.",
          "Es parcialmente cierto; el optimismo cura gripes tensionales.",
          "Es una mentira clínica severa. La depresión altera goces, sueño, relaciones y cognición, excediendo con creces un mero mal genio.",
          "Depende enteramente del temperamento de nacimiento.",
        ],
        correct: 2,
        feedback:
          "Tildar la afección de mero desánimo menor culpabiliza innecesariamente a los jóvenes (APA, 2013).",
      },
    ],
  },
  {
    id: "dep-13",
    sectionId: "depression",
    title: "Kit de Supervivencia",
    description: "Arma tus escudos de hábitos básicos.",
    type: "depression",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 33,
    content: [
      {
        type: "multiple-select",
        question:
          "Estás diseñando un 'escudo' anímico para periodos de exámenes escolares duros. ¿Qué hábitos añadirías?",
        options: [
          "Garantizar entre 8 y 10 horas de sueño diario regular.",
          "Platicar con franqueza acerca de mis miedos con un tutor o acudiente.",
          "Establecer descansos planeados alejándome de tareas cada hora.",
          "Encerrarme a solas por tres días sin contestar chats.",
        ],
        correct: [0, 1, 2],
        feedback:
          "Los hábitos elementales protegen de forma robusta la estabilidad química frente al estrés y la pesadez (OMS, 2021).",
      },
    ],
  },
  {
    id: "dep-14",
    sectionId: "depression",
    title: "¿Tristeza o algo más?",
    description: "Descubre alertas detrás de la irritabilidad.",
    type: "depression",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 34,
    content: [
      {
        type: "multiple-select",
        question:
          "Mateo está esquivo, responde de mal modo a todos y perdió el foco en clase. Los profesores lo tildan de 'grosero rebelde'. ¿Qué ocurre?",
        options: [
          "Mateo podría estar encubriendo un malestar depresivo profundo que no logra enunciar.",
          "Se trata solo de caprichos y ganas de boicotear la clase escolar.",
          "La hostilidad y la pérdida súbita de concentración son modos clásicos en que se expresa el dolor anímico juvenil.",
          "Tiene mala crianza y pereza.",
        ],
        correct: [0, 2],
        feedback:
          "La ira desmedida suele ser una estrategia inconsciente de autodefensa ante la pesadez del desánimo (Thapar et al., 2022).",
      },
    ],
  },
  {
    id: "dep-15",
    sectionId: "depression",
    title: "El primer mensaje",
    description: "Inicia la plática salvadora.",
    type: "depression",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 35,
    content: [
      {
        type: "multiple-select",
        question:
          "Deseas comentarle a un tutor de tu tensión pero tus miedos te frenan. ¿Qué mensajes serían discretos y efectivos para romper el hielo?",
        options: [
          "¿Podríamos platicar un momento? Últimamente no me he sentido muy bien en el colegio.",
          "Necesito confiarte algo importante de mis sentimientos cuando tengas un espacio.",
          "Será mejor callar; de todas formas a nadie le importa lo que siento.",
          "Soy un fastidio innecesario.",
        ],
        correct: [0, 1],
        feedback:
          "No requieres un discurso elocuente ni perfecto; un ademán puntual es un puente poderoso para aliviar tu carga (Schwartz-Mette et al., 2020).",
      },
    ],
  },
  {
    id: "dep-16",
    sectionId: "depression",
    title: "La nota perfecta",
    description: "Desarma el perfeccionismo destructivo.",
    type: "depression",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 36,
    content: [
      {
        type: "multiple-select",
        question:
          "Laura sacó 4.8 pero llora con desespero por no obtener un 5.0, asumiendo que es un fracaso absoluto. ¿Qué alertas expone su caso?",
        options: [
          "Un perfeccionismo dañino incontrolado que impide celebrar sus proezas académicas.",
          "Una autoexigencia extrema donde un error menor equivale a la demolición de su valor completo.",
          "Una ambición escolar perfectamente sana que conviene fomentar.",
          "Un rigor intelectual excelente y digno de ser imitado.",
        ],
        correct: [0, 1],
        feedback:
          "El perfeccionismo agobiante asfixia el amor propio multiplicando la desazón existencial (Smith et al., 2021).",
      },
    ],
  },
  {
    id: "dep-17",
    sectionId: "depression",
    title: "Entorno y consumos",
    description: "Presta atención a tus divertimentos.",
    type: "depression",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 37,
    content: [
      {
        type: "multiple-select",
        question:
          "Escuchar música sombría de forma constante o encallarse por horas en un videojuego frustrante altera tu ánimo. ¿Qué afirmaciones tienen sentido?",
        options: [
          "Los estímulos lúdicos y acústicos inciden directamente sobre tu estado de ánimo biológico.",
          "Ciertos consumos calman y recargan las pilas, pero otros exacerban la frustración y la melancolía.",
          "Los consumos digitales carecen de todo rastro sobre las hormonas afectivas adolescentes.",
        ],
        correct: [0, 1],
        feedback:
          "Regular concienzudamente tus consumos informáticos es una gran destreza de autodeterminación (Johannes et al., 2021).",
      },
    ],
  },
  {
    id: "dep-18",
    sectionId: "depression",
    title: "Higlights de redes",
    description: "Diferencia lo editado de lo verídico.",
    type: "depression",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 38,
    content: [
      {
        type: "multiple-select",
        question:
          "Después de una hora en TikTok piensas: 'Todos tienen una fortuna mayor y son más amados que yo'. ¿Qué ocurre?",
        options: [
          "Comparación distorsionada contra recortes editados de mejores momentos ajenos.",
          "Falsa devaluación de tu realidad personal basada en ficciones filtradas de pantallas.",
          "Que las vidas proyectadas en redes son enteramente fieles a la realidad cotidiana.",
        ],
        correct: [0, 1],
        feedback:
          "Nadie publica fotos llorando o teniendo días rutinarios; comparar tu tras bastidores con el folleto digital ajeno distorsiona el amor propio (Valkenburg et al., 2022).",
      },
    ],
  },
  {
    id: "dep-19",
    sectionId: "depression",
    title: "Cuando nada emociona",
    description: "Comprende el vacío de la anhedonia.",
    type: "depression",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 39,
    content: [
      {
        type: "multiple-select",
        question:
          "Samuel manifiesta: 'Ya nada me anima. Escuchar música o salir con amigos me da totalmente igual'. ¿Qué conceptos explican esto?",
        options: [
          "Vacío o bloqueo afectivo transitorio provocado por desánimo agudo.",
          "Anhedonia clínica: merma severa de la capacidad para sentir deleite con pasatiempos antes amados.",
          "Es perezón ordinario que requiere mano dura escolar.",
          "Una llamada física y anímica de socorro.",
        ],
        correct: [0, 1, 3],
        feedback:
          "La apatía prolongada no es una elección de flojera, sino una alerta indispensable para ser oída (OMS, 2021).",
      },
    ],
  },
  {
    id: "dep-20",
    sectionId: "depression",
    title: "EL JEFE: SOMBRA ETERNA",
    description: "Desarma el calabozo del desánimo.",
    type: "boss",
    activityType: "interactive",
    ageGroup: "teen",
    completed: false,
    order: 40,
    content: [
      {
        type: "multiple-select",
        question:
          "Sientes flojera limitante, desafección total y lejanía con tu familia. Si esto fuera un combate contra el Jefe de la Sombra, ¿qué proezas elegirías?",
        options: [
          "Obrar con valentía e iniciar una plática sincera con un tutor o acudiente.",
          "Acordar una cita de orientación con el área médica o psicológica del colegio.",
          "Fugarse y clausurar tu comunicación con el mundo para no importunar.",
          "Sufrir a solas obligándote a 'ponerle voluntad' perpetuamente.",
        ],
        correct: [0, 1],
        feedback:
          "Recurrir al amparo calificado escolar y médico es el mayor superpoder para retornar a la luz (NIMH, 2026).",
      },
    ],
  },
];
