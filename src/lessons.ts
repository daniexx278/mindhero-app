import { Lesson } from "./types";

export const INITIAL_LESSONS: Lesson[] = [
  // ==========================================
  // STAGE 1: ANXIETY (10 Levels)
  // ==========================================
  {
    id: "ans-1",
    sectionId: "anxiety",
    title: "¿Tu cuerpo manda alertas?",
    description: "Reconoce las señales que nos da el cuerpo.",
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
          "La ansiedad es una señal normal del cuerpo, no una debilidad. Todos la sentimos de vez en cuando.\n\nReferencias:\n- Craske, M.G. & Barlow, D.H. (2022). Mastery of your anxiety and worry (3rd ed.). Oxford University Press.\n- Kendall, P.C. et al. (2016). Cognitive-behavioral therapy for anxious youth. Journal of Consulting and Clinical Psychology, 84(6), 522–531.",
        hint: "Recuerda que la ansiedad es una señal.",
      },
    ],
  },
  {
    id: "ans-2",
    sectionId: "anxiety",
    title: "Respiración cuadrada",
    description: "Regula tus alarmas internas.",
    type: "anxiety",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 2,
    content: [
      {
        text: "Para usar la respiración al cuadrado, imagina que dibujas un cuadrado en el aire mientras cuentas hasta cuatro en cada lado. Primero, subes tomando aire por la nariz. Luego, cruzas aguantando la respiración. Después, bajas soltando el aire despacio por la boca. Finalmente, cierras la base quedándote un momento sin aire antes de empezar otra vez. Repetir este recorrido le avisa a tu cerebro que todo está bien, relajando tu cuerpo al instante.",
        image: "🔲",
      },
      {
        question:
          "¿Cuáles son los cuatro pasos de la respiración cuadrada en el orden correcto?",
        options: [
          "A) Respirar hondo, pausar el aire, vaciar los pulmones y mantener el vacío.",
          "B) Tomar aire, soltarlo lentamente, aguantar la respiración y pausar en seco.",
          "C) Retener el aire, inhalar profundo, pausar el ritmo y exhalar por completo.",
          "D) Respirar hondo, mantener el aire, inhalar de nuevo y vaciar los pulmones.",
        ],
        correct: 0,
        feedback:
          "Seguir un orden y un ritmo medido al respirar funciona como un interruptor biológico. Al alternar de forma exacta cada fase del ejercicio, se corta la señal de alerta que los nervios envían al cerebro, lo que estabiliza el ritmo cardíaco de forma automática y ayuda a recuperar el control y la claridad mental en cualquier momento tenso.\n\nReferencias:\n- Zaccaro, A. et al. (2018). How breath-control can change your life: A systematic review. Frontiers in Human Neuroscience, 12, 353.\n- Ma, X. et al. (2017). The effect of diaphragmatic breathing on attention and stress in healthy adults. Frontiers in Psychology, 8, 874.",
        hint: "Para descubrir el orden, sigue el flujo natural de tu cuerpo: piensa en qué debes hacer obligatoriamente antes de poder retener el aire, y en qué estado te quedas justo después de haberlo soltado por completo.",
      },
    ],
  },
  {
    id: "ans-3",
    sectionId: "anxiety",
    title: "¿Qué hace la evitación?",
    description: "La trampa del desvío rápido.",
    type: "anxiety",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 3,
    content: [
      {
        text: "La evitación es un comportamiento que muchas personas utilizan para escapar de situaciones que les generan miedo o ansiedad. Aunque puede parecer una solución fácil en el momento, evitar enfrentar nuestros miedos puede tener consecuencias a largo plazo.",
        image: "🚪",
      },
      {
        question:
          "Valentina siempre se hace la enferma los días que tiene que exponer en clase. ¿Qué le pasa a su miedo con el tiempo?",
        options: [
          "A) El miedo desaparece porque no tiene que enfrentarlo.",
          "B) El miedo se mantiene igual, no cambia.",
          "C) El miedo crece porque el cerebro aprende que exponer es peligroso.",
          "D) Valentina se vuelve más valiente al descansar de las exposiciones.",
        ],
        correct: 2,
        feedback:
          "Evitar lo que nos asusta da un alivio inmediato, pero es una trampa. Al huir, le confirmamos al cerebro que la situación era realmente peligrosa y que solo la evasión nos mantenía a salvo. Esto hace que el miedo crezca, volviéndonos más sensibles y atrapándonos en un ciclo que debilita nuestra confianza.\n\nReferencias:\n- Barlow, D.H. (2002). Anxiety and its disorders (2nd ed.). Guilford Press.\n- Chorpita, B.F. & Daleiden, E.L. (2009). Mapping evidence-based treatments for children and adolescents. Journal of Consulting and Clinical Psychology, 77(3), 566–579.",
        hint: "Piensa en lo que ocurre cuando el cerebro no comprueba si el peligro es real. Si la única respuesta ante el miedo es alejarnos, el sistema de alerta asume que huir fue lo que nos salvó, reforzando esa misma reacción para la próxima vez.",
      },
    ],
  },
  {
    id: "ans-4",
    sectionId: "anxiety",
    title: "Detector de pensamientos trampa",
    description: "Cuestiona las películas alarmantes de tu mente.",
    type: "anxiety",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 4,
    content: [
      {
        text: "A veces, nuestros pensamientos pueden engañarnos y hacernos sentir miedo o ansiedad sin una razón real. Estos son lo que llamamos 'pensamientos trampa'. Aprender a identificarlos y cuestionarlos es un paso importante para mantener una mentalidad saludable y equilibrada.",
        image: "🕵️",
      },
      {
        question:
          "Completa la frase lógica de cuestionamiento: 'Cuando tengo un pensamiento que me asusta, primero pregunto: ¿Es __________ que esto va a pasar? Luego me pregunto: ¿Qué le __________ a un amigo que piensa lo mismo? Finalmente escribo un pensamiento __________ que sea más justo conmigo.'",
        options: [
          "A) probable / aconsejaría / positivo",
          "B) seguro / diría / equilibrado",
          "C) posible / ocultaría / lógico",
          "D) fijo / preguntaría / feliz",
        ],
        correct: 1,
        feedback:
          "Cuestionar lo que pensamos nos ayuda a quitarle fuerza al miedo. Al evaluar la certeza de un pensamiento, ponernos en el lugar de un amigo y buscar un enfoque más equilibrado, logramos desactivar el drama de la mente para responder con mucha más calma y justicia hacia nosotros mismos.\n\nReferencias:\n- Beck, J.S. (2021). Cognitive Behavior Therapy: Basics and Beyond (3rd ed.). Guilford Press.\n- Kendall, P.C. et al. (2016). Cognitive-behavioral therapy for anxious youth. Journal of Consulting and Clinical Psychology, 84(6), 522–531.",
        hint: "Piensa en cómo reaccionarías con un amigo: no querrás mentirle con optimismo vacío, sino darle una opinión sensata, lógica y equilibrada.",
      },
    ],
  },
  {
    id: "ans-5",
    sectionId: "anxiety",
    title: "El ciclo de la ansiedad",
    description: "Ordena los engranajes del temor.",
    type: "anxiety",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 5,
    content: [
      {
        text: "La ansiedad es una respuesta natural que todos experimentamos en diferentes momentos de nuestras vidas. Sin embargo, a veces, esta reacción puede volverse abrumadora y dificultar nuestras actividades diarias. Imagina que te llaman para exponer en clase. Esta situación puede activar una alerta en tu mente, desencadenando una serie de pensamientos y reacciones en tu cuerpo. A través de este ejercicio, aprenderás a identificar y ordenar estas etapas, lo que te ayudará a entender mejor cómo la ansiedad se desarrolla y cómo puedes manejarla de manera más efectiva.",
        image: "⚙️",
      },
      {
        question:
          "¿Cuál es el orden secuencial correcto de cómo se desarrolla el ciclo de la ansiedad?",
        options: [
          "A) 1. Situación de alerta 2. Pensamiento automático 3. Reacción física y emocional 4. Evitación y alivio 5. Confirmación del peligro y aumento del miedo.",
          "B) 1. Pensamiento automático 2. Situación de alerta 3. Evitación y alivio 4. Reacción física y emocional 5. Confirmación del peligro y aumento del miedo.",
          "C) 1. Situación de alerta 2. Reacción física y emocional 3. Pensamiento automático 4. Confirmación del peligro y aumento del miedo 5. Evitación y alivio.",
          "D) 1. Pensamiento automático 2. Reacción física y emocional 3. Situación de alerta 4. Evitación y alivio 5. Confirmación del peligro y aumento del miedo.",
        ],
        correct: 0,
        feedback:
          "La ansiedad se dispara por un detonante que genera una idea de amenaza, activando al cuerpo; si se elige escapar, el cerebro asume erróneamente que el peligro era real, haciendo que el miedo aumente a futuro.\n\nReferencias:\n- Clark, D.M. & Wells, A. (1995). A cognitive model of social phobia. En R.G. Heimberg et al. (Eds.), Social Phobia. Guilford Press.\n- Craske, M.G. & Barlow, D.H. (2022). Mastery of your anxiety and worry (3rd ed.). Oxford University Press.",
        hint: "Para descifrar el orden, piensa en la causa y el efecto: el cuerpo no reacciona por sí solo sin que la mente interprete primero la situación externa, y el cerebro no puede confirmar que huir 'te salvó' hasta que decides evitar el escenario.",
      },
    ],
  },
  {
    id: "ans-6",
    sectionId: "anxiety",
    title: "¿Qué tipo de pensamiento es?",
    description: "No te pongas leyes absolutas.",
    type: "anxiety",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 6,
    content: [
      {
        text: "Los pensamientos que tenemos sobre nosotros mismos pueden influir mucho en cómo nos sentimos y actuamos. A veces, cuando enfrentamos situaciones difíciles, como obtener una calificación baja en un examen, podemos caer en patrones de pensamiento que no son útiles y que nos hacen sentir peor. Te invitamos a identificar qué tipo de pensamiento está teniendo Andrés.",
        image: "🏷️",
      },
      {
        question:
          "Andrés saca un 3.8 en un examen y piensa: 'Soy un fracasado total, nunca sirvo para nada.' ¿Qué tipo de pensamiento es este?",
        options: [
          "A) Lectura de mente: cree saber lo que otros piensan de él.",
          "B) Generalización excesiva: usa un evento para concluir algo absoluto sobre sí mismo.",
          "C) Catastrofización: imagina el peor resultado posible.",
          "D) Pensamiento mágico: cree que sus pensamientos pueden causar eventos.",
        ],
        correct: 1,
        feedback:
          "Este patrón distorsiona la realidad al transformar un hecho aislado en una regla absoluta. Identificar estas conclusiones apresuradas nos permite frenar la autocrítica destructiva, recordándonos que un resultado específico jamás define nuestra capacidad total ni nuestro valor personal.\n\nReferencias:\n- Beck, A.T. (1979). Cognitive therapy of depression. Guilford Press.\n- Burns, D.D. (1980). Feeling good: The new mood therapy. Morrow. (Clasificación de distorsiones cognitivas)",
        hint: "Andrés sacó un 3.8 (¡que ni siquiera es una nota perdida!), pero al decir 'nunca sirvo para nada', cerró la puerta a cualquier otra posibilidad. No está leyendo mentes, ni imaginando el fin del mundo ... está usando un único momento para ponerse una etiqueta excesiva para siempre.",
      },
    ],
  },
  {
    id: "ans-7",
    sectionId: "anxiety",
    title: "La escalera de miedo",
    description: "Exposición paso a paso.",
    type: "anxiety",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 7,
    content: [
      {
        text: "Enfrentar nuestros miedos puede ser un desafío, pero es un paso importante para sentirnos más seguros y tranquilos. La técnica de la exposición gradual nos ayuda a enfrentar esos miedos de manera controlada y efectiva. Al hacerlo, nuestro cerebro comienza a entender que las situaciones que tememos no son tan peligrosas como pensamos.",
        image: "🪜",
      },
      {
        question:
          "Completa los conceptos de la exposición: 'La exposición gradual funciona porque el cerebro aprende que la situación no es tan __________ como creía. Cada vez que afronto un miedo sin evitarlo, el nivel de ansiedad sube y luego __________ solo. La escalera empieza por los miedos __________, no por los más intensos.'",
        options: [
          "A) real / desaparece / intermedios",
          "B) peligrosa / baja / más fáciles",
          "C) aburrida / se mantiene / conocidos",
          "D) difícil / aumenta / más fuertes",
        ],
        correct: 1,
        feedback:
          "Enfrentar los miedos de forma escalonada reentrena al cerebro al demostrarle que el peligro percibido no es real. Al sostener la situación sin huir, permitimos que la alarma biológica se apague sola, demostrándonos que podemos tolerar el malestar y avanzar con éxito hacia retos mayores.\n\nReferencias:\n- Higa-McMillan, C.K. et al. (2016). Evidence base update: 50 years of research on treatment for child and adolescent anxiety. Journal of Clinical Child & Adolescent Psychology, 45(2), 91–113.\n- Chorpita, B.F. & Daleiden, E.L. (2009). Mapping evidence-based treatments for children and adolescents. Journal of Consulting and Clinical Psychology, 77(3), 566–579.",
        hint: "Piensa en el proceso de adaptación del cuerpo: primero desmientes una amenaza exagerada, luego experimentas cómo el malestar se reduce de forma natural con el tiempo, y finalmente avanzas paso a paso, ganando confianza desde el escalón que requiere menos esfuerzo.",
      },
    ],
  },
  {
    id: "ans-8",
    sectionId: "anxiety",
    title: "¿Cómo usar las preocupaciones?",
    description: "Gana espacio libre posponiendo tus dudas.",
    type: "anxiety",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 8,
    content: [
      {
        text: "Las preocupaciones son algo normal en nuestra vida diaria, pero a veces pueden volverse abrumadoras y difíciles de manejar. En lugar de dejar que estas preocupaciones nos controlen, podemos aprender a gestionarlas de manera efectiva. Una técnica útil es la 'postergación de preocupaciones', que nos permite anotar nuestras inquietudes y abordarlas en un momento específico.",
        image: "📝",
      },
      {
        question:
          "¿Cuál es el orden ideal para aplicar la técnica de postergación de preocupaciones?",
        options: [
          "A) 1. Aparece una preocupación 2. La anoto en la app 3. Me digo que la pensaré luego 4. En el horario programado la leo 5. Evalúo si puedo hacer algo o si sigue siendo importante.",
          "B) 1. Me digo que la pensaré luego 2. Aparece una preocupación 3. La anoto en la app 4. Evalúo si puedo hacer algo o si sigue siendo importante 5. En el horario programado la leo.",
          "C) 1. Aparece una preocupación 2. Evalúo si puedo hacer algo o si sigue siendo importante 3. La anoto en la app 4. Me digo que la pensaré luego 5. En el horario programado la leo.",
          "D) 1. La anoto en la app 2. Me digo que la pensaré luego 3. Aparece una preocupación 4. En el horario programado la leo 5. Evalúo si puedo hacer algo o si sigue siendo importante.",
        ],
        correct: 0,
        feedback:
          "La postergación reduce la rumiación obsesiva y agobiante acumulando silenciosamente las inquietudes para resolverlas en un espacio planeado libre de apuros emocionales.\n\nReferencias:\n- Borkovec, T.D. et al. (1983). Preliminary exploration of worry. Behaviour Research and Therapy, 21(1), 9–16.\n- Rego, S.A. (2011). Worry postponement. En O'Donohue & Fisher (Eds.), Cognitive Behavior Therapy: Core Principles for Practice. Wiley.",
        hint: "Para descifrar el orden, piensa en la causa: para poder guardar una preocupación y sacártela del foco escolar, esta primero tiene que brotar en tu mente.",
      },
    ],
  },
  {
    id: "ans-9",
    sectionId: "anxiety",
    title: "Técnica 5-4-3-2-1",
    description: "Grounding para reconectar con el presente.",
    type: "anxiety",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 9,
    content: [
      {
        text: "La técnica 5-4-3-2-1 es una herramienta útil para manejar la ansiedad y volver a conectar con el momento presente. A veces, cuando nos sentimos abrumados o ansiosos, nuestra mente puede empezar a dar vueltas a los mismos pensamientos, lo que puede intensificar nuestra incomodidad. Esta técnica nos ayuda a interrumpir ese ciclo y a enfocarnos en nuestro entorno de una manera sencilla y efectiva. Esta es una oportunidad para reflexionar sobre lo que funciona mejor para ti.",
        image: "🖐️",
      },
      {
        question:
          "¿Cuál es el mejor momento para usar la técnica de estimulación sensorial 5-4-3-2-1?",
        options: [
          "A) Una vez que la agitación ha desaparecido por completo, para estabilizar el estado de ánimo.",
          "B) Exclusivamente cuando la crisis emocional ha alcanzado su punto más alto e incontrolable.",
          "C) Únicamente al final de la jornada como un método programado para conciliar el sueño.",
          "D) Al notar las primeras señales de que la mente empieza a rumiar y el malestar va en aumento.",
        ],
        correct: 3,
        feedback:
          "El ejercicio de estimulación sensorial (grounding) funciona mejor si se aplica de manera preventiva ante los primeros síntomas de agitación. Interrumpir el ciclo de rumiación a tiempo evita que los pensamientos repetitivos tomen el control total de tu atención, facilitando un retorno más rápido a la calma.\n\nReferencias:\n- Keng, S.L. et al. (2011). Effects of mindfulness on psychological health: A review. Clinical Psychology Review, 31(6), 1041–1056.\n- Zenner, C. et al. (2014). Mindfulness-based interventions in schools: A systematic review and meta-analysis. Frontiers in Psychology, 5, 603.",
        hint: "Visualiza esta herramienta como un freno de mano: es mucho más fácil y seguro detener un vehículo cuando empieza a acelerar cuesta abajo que intentar frenarlo en seco cuando ya va a su máxima velocidad.",
      },
    ],
  },
  {
    id: "ans-10",
    sectionId: "anxiety",
    title: "EL JEFE: EL VELOCÍMETRO",
    description: "Mide tus alertas antes de acelerar.",
    type: "boss",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 10,
    content: [
      {
        text: "La ansiedad no llega de cero a cien de un momento a otro va subiendo poco a poco, como el velocímetro de un carro. El problema es que muchas veces no notamos que está subiendo hasta que ya está muy alta. Si aprendes a identificar tu nivel antes de que llegue al límite, puedes usar una herramienta a tiempo y evitar que se te salga de las manos.",
        image: "🏎️",
      },
      {
        question:
          "¿Cuál de estos esquemas se asocia con los niveles y herramientas del velocímetro?",
        options: [
          "A) 0–2 (Verde): Ansiedad leve; 3–5 (Amarillo): Momento de calma; 6–8 (Naranja): Crisis alta que requiere apoyo externo; 9–10 (Rojo): Pausa inmediata y técnica de grounding.",
          "B) 0–2 (Verde): Estado tranquilo para aprender; 3–5 (Amarillo): Alerta leve para usar respiración cuadrada; 6–8 (Naranja): Ansiedad moderada para activar grounding 5-4-3-2-1; 9–10 (Rojo): Ansiedad alta que requiere un adulto de confianza.",
          "C) 0–2 (Verde): Alerta inicial; 3–5 (Amarillo): Ansiedad moderada con respiración; 6–8 (Naranja): Estado tranquilo para planear; 9–10 (Rojo): Alerta máxima que se resuelve por completo con la app.",
          "D) 0–2 (Verde): Momento de planear; 3–5 (Amarillo): Ansiedad alta; 6–8 (Naranja): Alerta leve para pausar actividades; 9–10 (Rojo): Ansiedad moderada que requiere soporte técnico.",
        ],
        correct: 1,
        feedback:
          "Chequear cómo estás todos los días te ayuda a conocer tus patrones: qué situaciones te ponen nervioso, cuándo sube más, qué te ayuda a bajarla. Ese autoconocimiento vale muchísimo. Recuerda que si la ansiedad llega a un nivel rojo (muy alta), la app no reemplaza el acompañamiento presencial y de confianza de profesionales de la salud o un adulto cercano.\n\nReferencias:\n- Wolpe, J. (1969). The Practice of Behavior Therapy. Pergamon Press. (Origen de la Escala SUDs)\n- Kendall, P.C. et al. (2016). Cognitive-behavioral therapy for anxious youth. Journal of Consulting and Clinical Psychology, 84(6), 522–531.",
        hint: "No busques el número perfecto — busca el que se siente honesto. Pregúntate: ¿puedo respirar con calma? ¿Mi cuerpo está tenso? ¿Mi mente está dando vueltas? Esas respuestas te ayudan a encontrar tu número.",
      },
    ],
  },

  // ==========================================
  // STAGE 2: DEPRESSION (10 Levels)
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
    order: 11,
    content: [
      {
        text: "La tristeza suele tener una causa clara y dura poco. La depresión se ancla por semanas, apaga el goce por tus entretenimientos y merma notablemente tu energía física diaria.",
        image: "☁️",
      },
      {
        question:
          "Valentina lleva tres semanas vacía, duerme en demasía y se percibe como una carga sin causa real. ¿Qué describe su estado?",
        options: [
          "A) Es solo tristeza normal que se solucionará esperando solitaria.",
          "B) Como no tiene una causa dura, es solo para llamar la atención.",
          "C) Su estado se asemeja a la depresión por su prolongación mayor a dos semanas, apatía por todo y ausencia de luto.",
          "D) Solo es preocupante si empieza a reprobar materias.",
        ],
        correct: 2,
        feedback:
          "La depresión puede aparecer de forma biológica sin un desencadenante evidente.\n\nReferencias:\n- American Psychiatric Association (APA, 2013). Diagnostic and Statistical Manual of Mental Disorders (5th ed.).\n- Hankin, B.L. et al. (2015). Depressive disorders in children and adolescents. Handbook of Clinical Child Psychology.",
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
    order: 12,
    content: [
      {
        text: "En la juventud, tu cerebro cambia aceleradamente. En la depresión, la alarma emocional se enciende a tope por tonterías, mientras la corteza reguladora de calma trabaja con menos fuerza.",
        image: "🧠",
      },
      {
        question:
          "¿Qué ocurre con el cerebro adolescente en presencia de la depresión?",
        options: [
          "A) La zona de amortiguación afectiva trabaja de forma hiperactiva.",
          "B) La alarma emocional se activa con desmedida facilidad y el freno amortiguador trabaja con menor ímpetu.",
          "C) Se cancelan biológicamente todas las emociones por completo.",
          "D) Los mensajeros neurotransmisores suben para darnos alegría extra.",
        ],
        correct: 1,
        feedback:
          "Esta desregulación temporal hace que las dificultades normales se perciban gigantes.\n\nReferencias:\n- Lupien, S.J. et al. (2009). Effects of stress throughout the lifespan on the brain, behaviour and cognition. Nature Reviews Neuroscience, 10, 434-445.\n- Gotlib, I.H. & Hamilton, J.P. (2008). Neuroimaging and depression. Handbook of Depression.",
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
    order: 13,
    content: [
      {
        text: "La depresión en jóvenes no siempre se manifiesta en llanto triste o encierro. Muchas veces asume máscaras de ira defensiva, quejas físicas y desvinculación progresiva de amigos.",
        image: "👤",
      },
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
          "La tristeza en jóvenes a menudo asume máscaras de ira defensiva, quejas físicas y desvinculación progresiva de amigos.\n\nReferencias:\n- American Psychiatric Association (APA, 2013).\n- Stringaris, A. & Goodman, R. (2009). Longitudinal outcome of irritability in children. American Journal of Psychiatry, 166(9).",
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
    order: 14,
    content: [
      {
        text: "Consumir perfiles perfectos de redes sin interactuar te incita a comparar tu vida detrás de escena con la máscara editada de los demás.",
        image: "📱",
      },
      {
        question:
          "Laura pasa horas scrolleando fotos perfectas de compañeras y termina frustrada y decaída sin saber por qué. ¿Qué lo explica?",
        options: [
          "A) Dos horas es insignificante; necesita pasar cuatro horas para alterarse.",
          "B) El scrolleo pasivo la empuja a la comparación social nociva contra fragmentos editados e irreales de otros.",
          "C) Instagram destruye las neuronas mecánicas de forma instantánea.",
          "D) Es una señal biológica de que Laura tiene baja capacidad académica.",
        ],
        correct: 1,
        feedback:
          "La comparación pasiva recurrente con ideales irreales de bienestar fomenta un desprecio severo de los propios logros.\n\nReferencias:\n- Twenge, J.M. et al. (2018). Increases in depressive symptoms, suicide-related outcomes, and suicide rates among US adolescents. Clinical Psychological Science, 6(1), 3–17.\n- Coyne, S.M. et al. (2020). Does time spent on social media impact mental health? A 8-year longitudinal study. Computers in Human Behavior, 102.",
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
    order: 15,
    content: [
      {
        text: "La tristeza tiñe las opiniones. Hace que tu cerebro ignore el lado positivo de un evento y se autoafirme en mentiras catastróficas del todo-o-nada.",
        image: "🕶️",
      },
      {
        question:
          "Camila obtiene un aceptable 3.8 y concluye: 'Me fue terrible. Nunca voy a poder con la materia. Siempre soy la peor.' ¿Qué trampas hay?",
        options: [
          "A) Ninguna; es totalmente lógico y honesto que se exprese con ese desprecio.",
          "B) Una sola: una leve molestia por perfeccionismo escolar.",
          "C) Múltiples trampas: filtro negativo (ignora pasar la materia), catastrofismo y etiquetas extremas absolutas ('nunca', 'siempre').",
          "D) Adjudicarse culpas ajenas a su control social.",
        ],
        correct: 2,
        feedback:
          "Desmontar el absolutismo del filtro negativo disminuye la pesadez de los errores pasajeros.\n\nReferencias:\n- Beck, A.T. et al. (1979). Cognitive therapy of depression. Guilford Press.\n- Haaga, D.A. et al. (1991). Empirical status of cognitive theory of depression. Psychological Bulletin, 110(2).",
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
    order: 16,
    content: [
      {
        text: "La falta de sueño diario desgasta la paciencia, debilita el escudo de los neurotransmisores de bienestar y descalibra por completo tu ritmo circadiano.",
        image: "🛌",
      },
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
          "La falta recurrente de sueño diario magnifica la desregulación emocional, haciendo insalvables los retos.\n\nReferencias:\n- Paruthi, S. et al. (2016). Recommended amount of sleep for pediatric populations. Journal of Clinical Sleep Medicine, 12(6).\n- Harvey, A.G. (2011). Sleep and circadian rhythms in bipolar disorder and schizophrenia. Lancet Psychiatry.",
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
    order: 17,
    content: [
      {
        text: "En la depression, el cerebro se apaga y posterga. Al contrario de lo que creemos, las ganas no nacen de la espera pasiva, ¡nacen del movimiento físico inicial!",
        image: "🏃",
      },
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
          "Iniciar con una actividad pequeña rompe el ciclo inactivo del decaimiento cerebral.\n\nReferencias:\n- Cuijpers, P. et al. (2007). Behavioral activation in the treatment of depression: A meta-analysis. Clinical Psychology Review, 27(3).\n- Lejuez, C.W. et al. (2011). Ten-year revision of the Brief Behavioral Activation Treatment for Depression. Cognitive and Behavioral Practice, 18(2).",
      },
    ],
  },
  {
    id: "dep-8",
    sectionId: "depression",
    title: "Hablarse con amabilidad",
    description: "Desarma el desprecio interno.",
    type: "depression",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 18,
    content: [
      {
        text: "La autocrítica hostil daña tu cerebro igual que una amenaza física en curso. Háblate con la misma ternura que le ofrecerías a tu mejor amigo.",
        image: "🤍",
      },
      {
        question:
          "Tomás se equivoca en clase y piensa: 'Soy un fracasado.' ¿Cómo luce una respuesta autocompasiva y protectora?",
        options: [
          "A) Validar que el error duele recio, consolarse y recordarse que un fallo transitorio no destruye su valor o inteligencia completa.",
          "B) Negar el acontecimiento distrayéndose en videojuegos de forma obsesiva.",
          "C) Decirse mentiras exageradas sobre ser perfecto e infalible.",
          "D) Rumiar su descuidado en silencio por varias jornadas.",
        ],
        correct: 0,
        feedback:
          "La amabilidad realista ante la falla atenúa el miedo limitante a volver a probar.\n\nReferencias:\n- Neff, K.D. (2003). Development and validation of a scale to measure self-compassion. Self and Identity, 2(3), 223–250.\n- Blatt, S.J. (204). Experiences of depression: Theoretical, clinical, and research perspectives. American Psychological Association.",
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
    order: 19,
    content: [
      {
        text: "Apoyar a un amigo con depresión no requiere dar sermones o decir 'ponle ganas'. Un oído paciente libre de juicios es el puente más poderoso.",
        image: "🤝",
      },
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
          "Una oreja dispuesta libre de críticas y motivar la vinculación con redes de soporte escolar son las mayores muestras de aprecio.\n\nReferencias:\n- Kitchener, B.A. & Jorm, A.F. (2002). Mental health first aid training in a workplace setting. International Journal of Mental Health Systems.\n- Rickwood, D. et al. (2005). Young people's help-seeking for mental health problems. Australian e-Journal for the Advancement of Mental Health, 4(3).",
      },
    ],
  },
  {
    id: "dep-10",
    sectionId: "depression",
    title: "EL JEFE: SOMBRA ETERNA",
    description: "Reconoce cuándo es tramo clínico.",
    type: "boss",
    activityType: "quiz",
    ageGroup: "teen",
    completed: false,
    order: 20,
    content: [
      {
        text: "No requieres estar al borde del colapso para merecer apoyo. Dos semanas continuas de apatía general y pesadez son un indicador prudente para consultar.",
        image: "🩺",
      },
      {
        question:
          "Andrés lleva tres semanas cansado y vacío, pero dice: 'No es para tanto, todos tienen rachas malas'. ¿Qué criterio es apropiado?",
        options: [
          "A) Tiene razón; tres semanas es un luto breve que disolverá con ocio solitario.",
          "B) Debe consultar únicamente si empieza a reprobar exámenes drásticamente.",
          "C) Como ya sobrepasó el umbral clínico de dos semanas con cansancio y anhedonia, merece buscar ayuda sin dudar.",
          "D) Mientras no tenga llanto o crisis estridentes de luto, carece de alertas.",
        ],
        correct: 2,
        feedback:
          "Esperar a que el dolor se torne insostenible dilata la sanación del desánimo.\n\nReferencias:\n- American Psychiatric Association (APA, 2013). DSM-5.\n- Radez, J. et al. (2021). Why do children and adolescents not seek formal help for their mental health difficulties? A systematic review. Social Psychiatry and Psychiatric Epidemiology, 56, 1221–1232.",
        hint: "Nuestras directrices fijan el umbral de dolor sostenido en las dos semanas continuadas.",
      },
    ],
  },
];
