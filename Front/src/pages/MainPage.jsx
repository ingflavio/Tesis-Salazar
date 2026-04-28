import { useState } from "react"
import classes from '../styles/home.module.scss'
import Icons from "../components/Icons"

function Recomendation(){
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
  };

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
        <h3>Texto</h3>
      </label>
    </div>
    <div className={`${classes.recomendation__body} ${isChecked ? classes.expanded : ''}`}>
      <h4>Musculo tal</h4>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ipsa ex pariatur repellat ratione fuga error eum nulla dolore distinctio consequuntur, qui dolorum quis temporibus. Sunt atque et veritatis ducimus!</p>
    </div>
  </section>)
}

function useRecomendation(days){
  const fiveDaysRoutines = [
    {
      primary: 'Espalda',
      secondary: 'Bicep' 
    },
    {
      primary: 'Cuadricep',
      secondary: 'Aductores' 
    },
    {
      primary: 'Hombro',
      secondary: 'Tricep' 
    },
    {
      primary: 'Femorales',
      secondary: 'Gluteos' 
    },
    {
      primary: 'Pecho',
      secondary: 'Abdominales' 
    }
  ]

  const fourDaysRoutines = [
    {
      name: 'empuje',
      muscles: ['Pecho','Triceps'] 
    },
    {
      name: 'traccion',
      muscles: ['Espalda','Piernas']
    },
    {
      name: 'empuje',
      muscles: ['Pecho','Hombro', 'Cuadriceps']
    },
    {
      name: 'traccion',
      muscles: ['Espalda','Biceps']
    }
  ]

  const threeDaysRoutines = [
    ['espalda','Biceps','Abdominales'],
    ['Pecho','Triceps', 'Hombro'],
    ['Piernas','Gluteo']
  ]

  if(days === 3){
    return threeDaysRoutines
  } else if (days === 4){
    return fourDaysRoutines
  } else if (days === 5){
    return fiveDaysRoutines
  }
}

export function MainPage() {
  const [days, setDays] = useState(0) 

  const handleChange = (event) => {
    setDays(event.target.value)
  }

  return (
    <>
      <h1>Principal</h1>
      <div>
        <label> ¿Cuantos dias entrenas por semana?
          <select defaultValue='0' onChange={handleChange}>
            <option value="0" disabled></option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <h1>{days}</h1>
        <Recomendation />
      </div>
    </>
  )
}