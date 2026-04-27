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
  let days = 0

  // const 

  return (
    <>
      <h1>Principal</h1>
      <div>
         {
          days === 0 
          ? <label> ¿Cuantos dias entrenas por semana?
              <select >
                <option value="" disabled selected ></option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>
          : <p>Juegito</p>
         }
      </div>
    </>
  )
}