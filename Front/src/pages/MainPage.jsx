import { useState } from "react"
import classes from '../styles/home.module.scss'
import Icons from "../components/Icons"

function Recomendation({paragraphs, title}){
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
  };
  
  const paragraphsFormated = Array.isArray(paragraphs) ? paragraphs : [paragraphs]

  return (<section className={classes.recomendation}>
    <div className={classes.recomendation__header}>
      <label className={`${classes.unfold_label} ${isChecked ? classes.unfolded : ''}`}>
        <Icons icon='chevron' />
        <input 
          type="checkbox" 
          className={classes.unfold_checkbox} 
          checked={isChecked}
          onChange={handleChange}
        />
      </label>
      <label className="toDo">
        <span>
          <input type="checkbox" />
          <Icons icon='check' />
        </span>
        <h3>{title}</h3>
      </label>
    </div>
    <div className={`${classes.recomendation__body} ${isChecked ? '' : classes.hidden}`}>
      {
        paragraphsFormated.map((paragraph, index) => {
          let content
          console.log(paragraph.content)
          if(typeof paragraph.content === 'object'){
            content = <ul>
              {
                paragraph.content.map((item, index) => {
                  const [title, text] = item.split(':') 
                  return <li key={index}><b>{`${title}: `}</b>{text}</li>
                })
              }
            </ul>
          }else {
            content = <p>{paragraph.content}</p>
          }

          return(
            <div key={index}>
              <h4>{paragraph.title}</h4>
              {
                content 
              }
            </div>
          )
        })
      }
    </div>
  </section>)
}

function getRecomendation(days){
  const espalda = {
    title: 'Espalda',
    content: [
      'Remo en polea baja: Sentado en el banco con los pies apoyados en la plataforma, agarra la barra o manija en V. Mantén la espalda recta y el pecho erguido. Tira de la polea hacia tu abdomen, juntando los omóplatos al final del movimiento. Controla el peso al regresar a la posición inicial sin dejar caer el peso.',
      'Jalones al pecho: Sentado en la máquina con las rodillas sujetas bajo los soportes. Agarra la barra más ancha que el ancho de hombros. Inclina ligeramente el torso hacia atrás, baja la barra hacia la parte superior del pecho mientras sacas el pecho y juntas los omóplatos. Sube controladamente hasta estirar completamente los brazos.',
      'Remo con mancuernas: Apoya una rodilla y la mano del mismo lado en un banco plano. La otra pierna queda apoyada en el suelo para estabilidad. Mantén la espalda recta y paralela al suelo. Sube la mancuerna hacia tu cadera, manteniendo el codo pegado al cuerpo. Baja controladamente sintiendo el estiramiento.',
      'Remo al mentón: De pie con agarre prono (palmas hacia abajo) en la barra, manos separadas al ancho de hombros. Tira la barra hacia tu mentón manteniendo los codos apuntando hacia fuera. La barra debe subir cerca del cuerpo. Controla el descenso hasta brazos extendidos.'
    ]
  }

  const biceps = {
    title: 'Biceps',
    content: [
      'Curl martillo: De pie o sentado, sostén una mancuerna en cada mano con las palmas enfrentadas (como sosteniendo un martillo). Mantén los codos pegados a tu torso. Flexiona los codos subiendo las mancuernas hacia tus hombros sin mover los brazos hacia adelante. Baja lentamente hasta estirar completamente los brazos.',
      'Curl de bíceps concentrado: Sentado con las piernas abiertas, sostén una mancuerna con una mano y apoya el codo en la parte interna del muslo del mismo lado. Mantén el brazo completamente extendido hacia abajo. Flexiona el codo subiendo la mancuerna hacia tu hombro, contrayendo fuertemente el bíceps en la parte alta. Baja controladamente hasta estirar el brazo.',
      'Curl alternado: De pie con una mancuerna en cada mano, brazos extendidos a los lados. Mantén los codos pegados a tu torso. Comienza flexionando un brazo, subiendo la mancuerna hacia el hombro mientras contraes el bíceps. Baja ese brazo mientras subes el otro. Alterna los movimientos manteniendo un ritmo constante.',
      'Curl 21: De pie con barra Z o mancuernas, realiza primero 7 repeticiones medias desde la posición de brazos extendidos hasta la mitad del recorrido (ángulo de 90 grados). Luego 7 repeticiones medias superiores desde los 90 grados hasta el hombro. Finalmente 7 repeticiones completas. Son 21 repeticiones que generan máxima congestión.'
    ]
  }

  const cuadriceps = {
    title: 'Cuadriceps',
    content: [
      'Sentadilla libre: Coloca la barra sobre los trapecios (no en el cuello), pies separados al ancho de hombros con puntas ligeramente hacia fuera. Mantén la espalda recta, pecho arriba y mirada al frente. Baja flexionando rodillas y cadera como si fueras a sentarte en una silla baja, hasta que los muslos estén paralelos al suelo o ligeramente más abajo. Empuja con los talones para subir.',
      'Zancada con mancuernas: De pie con una mancuerna en cada mano, pies separados al ancho de cadera. Da un paso largo hacia adelante con una pierna. Baja la cadera hasta que ambas rodillas estén flexionadas a 90 grados (la rodilla trasera cerca del suelo sin tocarlo). La rodilla delantera no debe sobrepasar la punta del pie. Empuja con la pierna delantera para volver a la posición inicial. Alterna piernas.',
      'Sentadilla sumo: Colócate con los pies más anchos que los hombros y las puntas apuntando hacia fuera (unos 45 grados). Sostén una mancuerna o barra entre las piernas. Mantén la espalda recta y el pecho arriba. Baja flexionando principalmente la cadera manteniendo las rodillas alineadas con los pies. Llega hasta donde tu movilidad permita y sube apretando glúteos y cuadriceps.',
      'Silla extensora: Siéntate en la máquina de cuádriceps con la espalda apoyada en el respaldo. Coloca los tobillos bajo los acolchados (rodillos) y ajusta el asiento para que el eje de la máquina coincida con la rodilla. Mantén las manos en las agarraderas laterales. Extiende las piernas hasta que queden rectas, contrayendo fuertemente el cuádriceps en la parte alta. Baja controladamente hasta que los rodillos toquen el peso, sin usar impulso.'
    ]
  }

  const aductores = {
    title: 'Aductores',
    content: [
      'Elevación de pierna lateral acostado: Acuéstate de lado sobre una colchoneta con la pierna apoyada extendida. La pierna superior debe estar recta y alineada con el torso. Coloca la cabeza apoyada en tu brazo inferior para mayor comodidad. Eleva la pierna superior lentamente hasta unos 45 grados, manteniendo el pie flexionado (no apuntado). Baja controladamente sin soltar la pierna completamente para mantener tensión en el aductor.',
      'Máquina de aductores (mariposa invertida): Siéntate en la máquina diseñada para aductores con la espalda apoyada en el respaldo. Coloca las piernas abiertas apoyando las almohadillas en la parte interna de tus rodillas. Mantén las manos en las agarraderas laterales. Junta las piernas lentamente contrayendo los músculos internos del muslo, apretando en el punto máximo. Abre las piernas controladamente sintiendo el estiramiento en los aductores.',
      'Aducción con polea baja: Coloca una correa en el tobillo de una pierna y conéctala a la polea baja más cercana a tu pierna de apoyo. Párate de lado a la polea con la pierna con correa alejada de la máquina. Mantén una mano en algo estable para equilibrio. Lleva la pierna con correa hacia adelante cruzando frente a tu pierna de apoyo, tirando del cable. Regresa controladamente a la posición inicial sintiendo el aductor trabajar.',
      'Prensa de aductores en máquina: En la máquina de prensa de piernas (leg press), coloca los pies más anchos que los hombros con las puntas apuntando hacia fuera. Mantén la espalda baja apoyada en el respaldo. Baja el peso flexionando las rodillas llevándolas hacia fuera, siguiendo la dirección de los pies. Empuja el peso hacia arriba mientras juntas las rodillas activamente, sintiendo cómo trabajan los aductores para cerrar las piernas.'
      ]
  }

  const hombro = {
    title: 'Hombro (Deltoides)',
    content: [
      'Elevación frontal con mancuerna: De pie con una mancuerna en cada mano o con una barra, brazos extendidos frente a los muslos con las palmas hacia atrás. Mantén una ligera flexión de codos durante todo el movimiento. Eleva los brazos al frente hasta la altura de los hombros (paralelos al suelo) o ligeramente más arriba. Mantén el torso estable sin balancearte. Controla el descenso hasta la posición inicial sin dejar caer el peso.',
      'Elevación lateral con mancuerna: De pie con una mancuerna en cada mano, brazos a los lados con una ligera flexión de codos. Inclina ligeramente el torso hacia adelante y mantén el pecho arriba. Eleva los brazos hacia los lados manteniendo la misma flexión de codos, como si estuvieras vertiendo una jarra (palmas hacia abajo). Llega hasta la altura de los hombros en forma de "T". Baja controladamente sin que los brazos toquen el cuerpo para mantener tensión.',
      'Press de hombro con mancuernas: Sentado con respaldo o de pie, sostén una mancuerna en cada mano a la altura de los hombros con las palmas hacia adelante y codos apuntando hacia fuera. Mantén la espalda recta y el abdomen contraído. Extiende los brazos hacia arriba empujando las mancuernas hasta que se junten sobre tu cabeza, sin bloquear completamente los codos. Baja controladamente hasta que las mancuernas estén a la altura de las orejas.',
      'Remo alto a la nariz: De pie con barra Z o barra recta, agarre prono (palmas hacia abajo) con manos separadas ligeramente más anchas que los hombros. Mantén la barra a la altura de los muslos. Sube la barra hacia tu nariz tirando con los codos hacia fuera y arriba, manteniendo la barra cerca del cuerpo. La barra debe llegar aproximadamente a la altura de los hombros o ligeramente debajo de la barbilla. Baja controladamente manteniendo los codos altos durante el descenso.'
      ]
  }

  const triceps = {
    title: 'Tríceps',
    content: [
      'Fondos en paralelas (tríceps): En barras paralelas, súbete sosteniéndote con los brazos extendidos y el cuerpo recto. Inclina ligeramente el torso hacia adelante. Baja flexionando los codos hacia atrás (no hacia fuera) manteniéndolos pegados al cuerpo baja hasta que los hombros estén ligeramente más bajos que los codos o hasta un ángulo de 90 grados. Empuja hacia arriba extendiendo los brazos hasta la posición inicial evitando bloquear completamente los codos para mantener tensión. Si es fácil, añade peso con un cinturón.',
      'Extensión de tríceps con mancuerna a dos manos: Sentado o de pie, sostén una mancuerna verticalmente con ambas manos agarrando la campana interior (no el mango). Sube la mancuerna por detrás de tu cabeza manteniendo los codos apuntando hacia arriba y pegados a las orejas. Extiende los brazos hacia arriba hasta que queden casi rectos, contrayendo fuertemente el tríceps en la parte alta. Baja lentamente la mancuerna detrás de tu cabeza sintiendo el estiramiento en el tríceps, controlando el movimiento en todo momento.',
      'Jalón en polea alta con barra: Frente a la polea alta, agarra la barra corta con agarre prono (palmas hacia abajo) con manos separadas unos 20-25 cm. Mantén los codos pegados a tu torso y el cuerpo ligeramente inclinado hacia adelante con rodillas flexionadas. Empuja la barra hacia abajo extendiendo los brazos completamente, girando ligeramente las palmas hacia fuera al final del movimiento para mayor contracción. Sube la barra controladamente hasta que los antebrazos estén paralelos al suelo sin dejar que el peso te levante los brazos.',
      'Patada de tríceps (Triceps kickback): Apoya una rodilla y la mano del mismo lado en un banco plano manteniendo la espalda recta y paralela al suelo. La otra pierna queda apoyada en el suelo. Sostén una mancuerna con la mano libre, brazo pegado al torso y codo flexionado a 90 grados. Extiende el brazo hacia atrás hasta que esté completamente recto y paralelo al suelo, contrayendo el tríceps en el punto más alto. Mantén el brazo pegado al cuerpo durante todo el movimiento. Baja controladamente a la posición inicial sin mover el hombro.'
      ]
  }

  const femoral = {
    title: 'Femoral (Isquiotibiales)',
    content: [
      'Curl femoral acostado (femoral tumbado): Acuéstate boca abajo en la máquina de curl de piernas. Coloca los tobillos bajo los rodillos acolchados, con las rodillas justo en el borde del banco. Mantén el torso apoyado y las manos en las agarraderas o debajo del banco para estabilidad. Flexiona las rodillas llevando los talones hacia los glúteos contrayendo fuertemente los isquiotibiales. Baja controladamente hasta estirar completamente las piernas sin soltar el peso, manteniendo la cadera siempre apoyada en el banco (sin levantarla).',
      'Peso muerto rumano: De pie con barra en el suelo o en rack, agarre prono o mixto con manos separadas al ancho de hombros. Mantén las piernas semiflexionadas (no bloqueadas) y la espalda completamente recta durante todo el movimiento. Baja la barra deslizándola cerca de tus espinillas, empujando la cadera hacia atrás mientras mantienes las piernas casi extendidas. Llega hasta donde sientas estiramiento en los isquiotibiales sin redondear la espalda (generalmente por debajo de las rodillas). Sube contrayendo glúteos e isquiotibiales para volver a la posición vertical, empujando la cadera hacia adelante.',
      'Curl femoral sentado: Siéntate en la máquina de curl femoral sentado con la espalda apoyada en el respaldo. Coloca los tobillos bajo los rodillos acolchados y ajusta el asiento para que la rodilla quede alineada con el eje de la máquina. Mantén las manos en las agarraderas laterales. Flexiona las piernas llevando los rodillos hacia abajo contrayendo los isquiotibiales hasta que las espinillas estén perpendiculares al suelo o casi. Baja controladamente hasta la posición inicial sintiendo el estiramiento en la parte baja del movimiento, manteniendo siempre el torso apoyado en el respaldo.',
      'Buenos días con barra: Coloca la barra sobre tus trapecios (como en sentadilla) con las manos sujetándola por fuera de los hombros. Mantén las piernas separadas al ancho de hombros y una ligera flexión de rodillas (sin bloquear). Con la espalda completamente recta y el pecho arriba, flexiona la cadera llevando el torso hacia adelante como si hicieras una reverencia. Continúa bajando hasta que sientas un estiramiento intenso en los isquiotibiales o hasta que el torso esté casi paralelo al suelo. Sube contrayendo glúteos e isquiotibiales para volver a la posición vertical sin redondear la espalda.'
      ]
  }

  const gluteos = {
    title: 'Glúteos',
    content: [
      'Puente de glúteos en el suelo: Acuéstate boca arriba con las rodillas flexionadas y los pies planos en el suelo separados al ancho de caderas. Los brazos descansan a los lados con las palmas hacia abajo. Aprieta los glúteos y eleva la cadera hacia el techo hasta que tu cuerpo forme una línea recta desde los hombros hasta las rodillas. Mantén la contracción en la parte alta por 1-2 segundos apretando fuerte los glúteos. Baja lentamente la cadera sin tocar completamente el suelo para mantener tensión, repite el movimiento sintiendo trabajar únicamente los glúteos (no la zona lumbar).',
      'Hip thrust en banco: Apoya la parte superior de la espalda en un banco plano, sentado en el suelo con las rodillas flexionadas. Coloca una barra con peso sobre tus caderas (usa una toalla o acolchado para protegerte). Mantén la barbilla ligeramente metida y la mirada al frente. Sube la cadera apretando los glúteos hasta que tu cuerpo esté recto desde las rodillas hasta los hombros (cadera extendida). Mantén la contracción en la parte alta por 2 segundos apretando fuertemente los glúteos. Baja controladamente sin dejar caer el peso ni despegar la espalda del banco.',
      'Patada de glúteo en cuatro puntos: En posición de cuadrupedia (manos debajo de hombros y rodillas debajo de caderas), mantén la espalda recta y el abdomen contraído sin arquear la zona lumbar. Con una pierna flexionada a 90 grados y el pie activo (no apuntado), sube la rodilla hacia el techo manteniendo la flexión constante. Llega hasta donde tu cadera permita sintiendo la contracción máxima en el glúteo manteniendo la espalda estable (no arquees para subir más). Baja controladamente sin tocar la rodilla en el suelo para mantener tensión en todo momento. Completa las repeticiones antes de cambiar de pierna.',
      'Sentadilla búlgara: Colócate de espaldas a un banco, coloca el empeine de un pie sobre el banco. La pierna delantera debe estar lo suficientemente adelantada para que al bajar la rodilla trasera casi toque el suelo. Sostén una mancuerna en cada mano o una barra. Mantén el torso erguido y la cadera cuadrada (sin girar hacia el lado del pie elevado). Baja hasta que el muslo de la pierna delantera esté paralelo al suelo o ligeramente más abajo, manteniendo la rodilla delantera detrás de la punta del pie. Sube empujando principalmente con el talón del pie delantero para enfocar el trabajo en glúteo y cuadriceps. Mantén la espalda recta en todo momento sin inclinarte hacia adelante.'
      ]
  }

  const pecho = {
    title: 'Pecho',
    content: [
      'Flexión de pecho (Push-up con variante de pecho): Colócate en posición de plancha con las manos ligeramente más anchas que los hombros y los dedos apuntando hacia adelante. Mantén el cuerpo en línea recta desde los hombros hasta los talones, abdomen y glúteos contraídos. Baja el pecho hacia el suelo flexionando los codos hacia fuera (no pegados al cuerpo) hasta que el pecho esté a unos centímetros del suelo. Empuja con fuerza para subir extendiendo los brazos completamente sin perder la línea recta del cuerpo. Para mayor estímulo de pecho, separa más las manos o eleva los pies.',
      'Press de banca con barra: Acuéstate en el banco plano con los ojos bajo la barra. Agarra la barra con manos separadas ligeramente más anchas que los hombros (ancho de pecho). Aprieta los omóplatos hacia abajo y atrás manteniéndolos pegados al banco. Desclava la barra, baja controladamente hasta que toque ligeramente la parte baja del pecho (aproximadamente a la altura de los pezones), con los codos a 45 grados del cuerpo (no completamente abiertos ni pegados). Empuja la barra hacia arriba explosivamente extendiendo los brazos sin bloquear completamente los codos, manteniendo siempre los omóplatos apretados contra el banco.',
      'Aperturas con mancuernas (Mariposa con mancuernas): Acuéstate en un banco plano con una mancuerna en cada mano por encima del pecho con los brazos extendidos y palmas enfrentadas. Mantén una ligera flexión de codos constante durante todo el movimiento (no bloquees ni varíes el ángulo). Abre los brazos hacia los lados en un arco amplio sintiendo el estiramiento en el pecho, llevando las mancuernas hasta que estén a la altura del pecho o ligeramente más abajo (sientes el estiramiento máximo en el pectoral). Junta las mancuernas nuevamente por encima del pecho contrayendo los pectorales como si estuvieras abrazando un árbol, manteniendo la misma flexión de codos durante todo el recorrido.',
      'Press inclinado con mancuernas: Ajusta el banco a un ángulo de 30-45 grados. Siéntate en el banco inclinado con una mancuerna en cada mano apoyadas en tus muslos. Impúlsalas hacia arriba para colocarlas a los lados de tus hombros con las palmas hacia adelante. Mantén los omóplatos apretados contra el banco y la zona lumbar con un arco natural. Empuja las mancuernas hacia arriba hasta que estén sobre la parte superior del pecho, sin bloquear los codos. Baja controladamente hasta sentir un estiramiento en la parte alta del pecho, manteniendo los codos a 45 grados del cuerpo. El movimiento enfatiza la parte clavicular del pectoral.'
    ]
  }

  const abdominales = {
    title: 'Abdominales',
    content: [
      'Plancha frontal (Front Plank): Colócate boca abajo apoyando los antebrazos en el suelo con los codos directamente bajo los hombros. Las manos pueden estar juntas o separadas, según tu comodidad. Apoya las puntas de los pies en el suelo manteniendo las piernas extendidas. Contrae fuertemente el abdomen y los glúteos para mantener el cuerpo en línea recta desde la cabeza hasta los talones (no subas ni bajes la cadera). Aguanta la posición sin dejar que la cadera se hunda o los hombros se encogen. Para progresión, puedes levantar un brazo o pierna alternadamente manteniendo la estabilidad del tronco.',
      'Crunches abdominales (Encogimientos): Acuéstate boca arriba con las rodillas flexionadas a 90 grados y los pies planos en el suelo separados al ancho de caderas. Coloca las manos detrás de la cabeza sin entrelazar los dedos, solo apoyando los dedos suavemente (no jales el cuello). Contrae el abdomen elevando los hombros y la parte superior de la espalda del suelo manteniendo la zona lumbar pegada al suelo. Sube solo hasta que los omóplatos se despeguen del suelo (unos 30 grados), sin levantar la zona lumbar. Baja controladamente sin relajar completamente el abdomen para mantener tensión.',
      'Elevación de piernas colgado: Cuélgate de una barra de dominadas con agarre prono (palmas hacia adelante) o con correas para antebrazo para aislar mejor. Mantén el cuerpo recto y los hombros activos (no colgados pasivamente). Contrae el abdomen y eleva las piernas rectas hacia adelante hasta que estén paralelas al suelo o más arriba si es posible (hacia la barra). Controla el descenso bajando las piernas lentamente sin balancearte, manteniendo el core activo durante toda la fase excéntrica. Si es muy difícil, puedes empezar con rodillas flexionadas (elevación de rodillas al pecho) manteniendo el control del movimiento.',
      'Russian twist (Giro ruso): Siéntate en el suelo con las rodillas flexionadas a 90 grados y los pies apoyados. Inclina el torso hacia atrás unos 45 grados manteniendo la espalda recta (sin redondear). Sostén un disco, mancuerna o balón medicinal con ambas manos a la altura del pecho. Levanta los pies del suelo para mayor intensidad o mantenlos apoyados para empezar. Gira el torso hacia un lado llevando el peso junto a tu cadera, contrayendo el oblicuo. Regresa al centro y gira hacia el otro lado. Mantén los brazos extendidos y fijos mientras giras, el movimiento debe venir de la rotación del torso (no de mover los brazos). Mantén la mirada al frente y no redondees la espalda.'
    ]
  }

  const fiveDaysRoutines = [
    {
      name: 'Dia de Espalda y Biceps',
      muscles: [espalda, biceps] 
    },
    {
      name: 'Dia de Cuadriceps y Aductores',
      muscles: [cuadriceps, aductores]
    },
    {
      name: 'Dia de Hombro y Triceps',
      muscles: [hombro, triceps]
    },
    {
      name: 'Dia de Femoral y Gluteos',
      muscles: [femoral, gluteos]
    },
    {
      name: 'Dia de Pecho y Abdominales',
      muscles: [pecho, abdominales]
    }
  ]

  const fourDaysRoutines = [
    {
      name: 'Dia de Empuje',
      muscles: [pecho,triceps] 
    },
    {
      name: 'Dia de Traccion',
      muscles: [espalda, femoral]
    },
    {
      name: 'Dia de Empuje',
      muscles: [pecho, hombro, cuadriceps]
    },
    {
      name: 'Dia de Traccion',
      muscles: [espalda, biceps]
    }
  ]

  const threeDaysRoutines = [
    {
      name: 'Dia de tren superior 1',
      muscles: [espalda, biceps, abdominales]
    },
    {
      name: 'Dia de tren superior 2',
      muscles: [pecho, triceps, hombro]
    },
    {
      name: 'Dia de tren inferior',
      muscles: [cuadriceps, gluteos, femoral]
    }
  ]

  const reduceContent = (array, amount) => {
    return array.map((day) => {
      return {
        name: day.name,
        muscles: day.muscles.map((muscle) => {
          return {
            title: muscle.title,
            content: randomItems(muscle.content, amount)
          }
        })
      }
    })
  }

  const randomItems = (array, amount) => {
    console.log(amount)
    const items = []
    for (let i = 0; i < amount; i++){
      const index = Math.floor(Math.random() * (array.length))
      items.push(array[index])
    }
    return items

  }

  if(days === 3){
    return reduceContent(threeDaysRoutines, 2)
  } else if (days === 4){
    return reduceContent(fourDaysRoutines, 3)
  } else if (days === 5){
    return fiveDaysRoutines
  } else {
    return null
  }
}

function getNutritionTip(){
  const tips = [
    {
      title: 'No saltarse el desayuno antes de entrenar',
      content: 'Saltarte el desayuno antes de entrenar por la mañana puede hacer que te sientas débil y sin energía durante el ejercicio. Come algo ligero como un plátano o una tostada con mermelada 30-45 minutos antes de entrenar. Esto te dará la glucosa necesaria para rendir mejor y evitar mareos o fatiga temprana.'
    },
    {
      title: 'Bebe agua antes de tener sed',
      content: 'La sed es un signo tardío de deshidratación, cuando ya perdiste entre 1-2% de agua corporal. Lleva siempre una botella de agua y toma pequeños sorbos cada 15-20 minutos durante tu entrenamiento. Una buena señal es que tu orina sea de color amarillo claro o transparente durante el día.'
    },
    {
      title: 'No elimines todos los carbohidratos',
      content: 'Muchos principiantes creen que los carbohidratos engordan y los eliminan por completo, pero esto es un grave error. Los carbohidratos son tu principal fuente de energía para entrenar con intensidad y recuperarte después. Elige carbohidratos complejos como avena, arroz integral, batata o quinoa en lugar de azúcares refinados.'
    },
    {
      title: 'Come proteína en cada comida',
      content: 'Distribuir tu consumo de proteína en 4-5 comidas al día es más efectivo que comer toda la proteína en una sola comida. Cada comida debe tener al menos 20-30 gramos de proteína de fuentes como huevos, pollo, pescado, legumbres o lácteos. Esto mantiene activa la síntesis de proteína muscular durante todo el día.'
    },
    {
      title: 'No tengas miedo a las grasas saludables',
      content: 'Las grasas no son las enemigas, las grasas malas (trans y saturadas en exceso) sí lo son. Incorpora grasas saludables como aguacate, aceite de oliva, frutos secos o semillas de chía en tus comidas diarias. Estas grasas son esenciales para producir hormonas, absorber vitaminas y mantener tus articulaciones sanas.'
    },
    {
      title: 'Planifica tus comidas con anticipación',
      content: 'Si no planificas qué vas a comer, es muy probable que termines recurriendo a opciones poco saludables por falta de tiempo o hambre. Dedica una hora los domingos para preparar tus comidas de la semana o al menos tener los ingredientes listos. Esto te ahorrará decisiones de último momento y evitará que compres comida chatarra.'
    },
    {
      title: 'No obsesionarte con las calorías al principio',
      content: 'Contar cada caloría desde el día uno puede ser abrumador y generar ansiedad innecesaria. Enfócate primero en mejorar la calidad de lo que comes: más vegetales, proteínas magras y alimentos enteros. Una vez que tengas el hábito de comer sano, entonces puedes ajustar las cantidades según tus objetivos.'
    },
    {
      title: 'Incluye vegetales en todas tus comidas',
      content: 'Los vegetales son tus mejores aliados porque tienen pocas calorías pero muchos nutrientes y fibra que te mantienen saciado. Intenta llenar la mitad de tu plato con vegetales de colores variados como brócoli, espinacas, zanahoria o pimientos. La fibra también mejora tu digestión y controla los picos de azúcar en sangre.'
    },
    {
      title: 'No necesitas suplementos caros al empezar',
      content: 'Como principiante, tu prioridad debe ser mejorar tu alimentación con comida real, no gastar dinero en suplementos costosos. La proteína en polvo puede ser útil si te cuesta llegar a tus requerimientos diarios, pero no es mágica. Enfócate en dominar la proteína de fuentes naturales como huevos, carnes magras y legumbres primero.'
    },
    {
      title: 'Permítete comidas trampa sin culpa',
      content: 'Restringirte demasiado te llevará a atracones y a abandonar tu plan nutricional por completo. Permítete una o dos comidas libres a la semana donde disfrutes tus antojos sin culpa ni remordimiento. La clave está en el 80-90% de consistencia con buenos hábitos, no en la perfección absoluta cada día.'
    }
  ];

  const randomIndex = Math.floor(Math.random() * (tips.length + 1));
  return tips[randomIndex]
}

export function MainPage() {
  const [recomendations, setRecomendations] = useState(null)

  const nutritionFact = getNutritionTip()

  const handleChange = (event) => {
    const newRecomendations = getRecomendation(Number(event.target.value))
    console.log(newRecomendations) 
    setRecomendations(newRecomendations)
  }

  return (
    <main className={classes.homePage}>
      <div className={classes.excersices}>
        <h2>Ejercicios</h2>
        <p>¿No tienes una rutina de ejercicio en mente?, no hay problema si, selecciona la cantidad de dias que entranas a la semana y te recomendamos una rutina de ejercicio para cada dia.</p>
        <p>Recuerda que esto solo una recomendacion general, para rutinas mas efecientes o ayudas de como realizar los ejercicios busca a un profesional, el gimnasio no se hacer responsable de cualquier problema siguiendo las rutinas recomendadas</p>
        <label> ¿Cuantos dias entrenas por semana?
          <select defaultValue='0' onChange={handleChange}>
            <option value="0" disabled></option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <div className={classes.recomendation_wrapper}>
          { 
            recomendations ? 
            recomendations.map((recomendation, index) => {
              return <Recomendation paragraphs={recomendation.muscles} title={recomendation.name} key={index}/>
            })
            : <></>
          }
        </div>
      </div>
      <div className={classes.tips}>
        <section className={`${classes.recomendation__body} ${classes.recomendation_nonFolded}`}>
          <h4>Consejo: {nutritionFact.title}</h4>
          <p>{nutritionFact.content}</p>
          <p>Este consejo no es de un profesional, son recomendaciones generales, para mas informacion consulte con un netricionista. El gimnasio no se hacer responsabel de cualquier problema surgir a la hora de aplicar los consejos</p>
        </section>
        </div>
    </main>
  )
}