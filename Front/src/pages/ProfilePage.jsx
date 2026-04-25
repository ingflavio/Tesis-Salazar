import { useState } from "react"
import { useUser } from "../hooks/useUser"
import useValidateForm from '../hooks/useValidateForm'
import useProfile from '../hooks/useProfile'
import classes from '../styles/profile.module.scss'

const SpecialField = ({ id, defaultValue, className, readOnly, onChange }) => {
  const props = {
    defaultValue: defaultValue,
    className: className,
    readOnly: readOnly,
    id:id,
    onChange: onChange
  }

  const specialFields = {
    'age': <input type="number" min='18' max='99' {...props} />,
    'height': <input type="number" min='1.30' max='2.10' step='0.01' {...props} />,
    'weight': <input type="number" min='40' max='120' {...props} />,
    'fat': <input type="number"  min='10' max='50' {...props} />,
    'condition': <textarea rows={readOnly ? 1 : 3 } {...props}/>
  }

  return specialFields[id]
};

const ProfileInput = ({id, name, value, editable, errorMsg, handleChange}) => {
  const spanOffset = (value, close) => {
    const smallCharacter =['.',',',';',':','`','"',"'"]
    
    const characters = String(value).split('')
    let offset = close ? 0 : 0.1
    characters.map((char) => {
      offset += smallCharacter.includes(char) 
      ? 0
      : 0.75
    })
    
    return offset
  } 

  const measures = {
    'height': 'cm',
    'weight': 'Kg',
    'fat': '%'
  }
  const specialFieldsRows = ['age','sex','height','weight','fat','condition']
  
  return <>
    <label className={classes.rowName} htmlFor={id}>{name}:</label>
    <div>{
      specialFieldsRows.includes(id) 
        ? <SpecialField 
            defaultValue={value}
            className={editable ? '' : classes.disguisedInput}
            readOnly={!editable}
            id={id}
            onChange= {handleChange}
          />
        : <input  
            id={id}
            className={editable ? '' : classes.disguisedInput} 
            type="text" 
            key={id} 
            readOnly={!editable} 
            defaultValue={value}
            onChange={handleChange}
          /> 
        }
      { Object.keys(measures).includes(id) &&
        <span 
        className={classes.measureSpan}
        style={{left: `${spanOffset(value, id=== 'fat')}em`}}
        >
          {measures[id]}
        </span>
      }
    </div>
    <span className={classes.warnSpan}>{errorMsg}</span>
  </>
}

function useProfileForm() {
  const { getProfile, getProfileColumns } = useProfile()
  const { user } = useUser()
  const profile = getProfile(user)
  delete profile['solvency']
  const profileFields = Object.entries(profile)
  const profileColumns = getProfileColumns()

  const unchangeableRows = ['id','name','lastName','sex']

  const resetValues = () => {
    profileFields.map(([key, value]) => {
      const input = document.getElementById(key)
      if (input) input.value = value
    })
  }

  let initialAlerts = {}
  profileFields.map(([key, ]) => initialAlerts[key] = "")
  
  return { resetValues, profileFields, profileNames: profileColumns, unchangeableRows, initialAlerts }
}

export function ProfilePage () {  
  const { logOut } = useUser()
  const [editMode, SetEditMode] = useState(false)
  const [fristChange, setFristChange] = useState(false)
  const { resetValues, profileFields, profileNames, unchangeableRows, initialAlerts } = useProfileForm()
  const { alerts, validateFields, validateIncrease, validatePhone } = useValidateForm(initialAlerts)

  const validations = {
    'age': (field) => validateIncrease({...field, increase: 1, increaseMasure: 'año', decreaseAllowed:false}),
    'phone': (field) => validatePhone(field.value),
    'height': (field) => validateIncrease({...field, increase: 0.05, increaseMasure: 'cm', increaseAdjust: 100}),
    'weight': (field) => validateIncrease({...field, increase: 5, increaseMasure: 'Kg'}),
    'fat': (field) => validateIncrease({...field, increase: 5, increaseMasure: '%',})
  } 
  const numericFields = ['age','height','weight','fat']

  const sendData = (validations, numericFields) =>{
    const fieldsToValidate =  profileFields.filter(([key, ]) => Object.keys(validations).includes(key))
    const fieldsInfo =  fieldsToValidate.map(([key, value]) => {
      const input = document.getElementById(key)
      if (input) return {
        id: key,
        name: profileNames[key],
        value: numericFields.includes(key) ? Number(input.value) : input.value,
        previousValue: value
      }
    })
    const isValid = validateFields(fieldsInfo, validations)
    return isValid 
  }

  const handleChange = () => {
    if (!fristChange) setFristChange(true)
  }

  const changeEditMode = (value) => {
    if (!value) resetValues()
    SetEditMode(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const status = sendData(validations, numericFields)
    if (status) SetEditMode(true)
  }

  return (<main>
    <h1>Perfil</h1>
    <form onSubmit={handleSubmit} className={`${classes.profile} ${editMode ? 'editMode' : ''}`}>
      <ul>
        {profileFields.map(([key, value]) => {
          const name = profileNames[key]
          const text = key!== 'sex' 
            ? value
            : value === 'f' 
              ? 'Femenino'
              : 'Masculino'

          return (<li key={key}>{
            unchangeableRows.includes(key)
            ? <p className={classes.rowText}> <span className={classes.rowName}>{name}: </span>{text}</p>
            : <ProfileInput 
                id={key}
                name={name}
                value={value}
                editable={editMode}
                errorMsg={alerts[key]}
                handleChange={handleChange}
              />
          }</li>)
        })}
      </ul>
      {
        editMode 
        ? <div className={classes.buttonContainer}>
            <button onClick={() => changeEditMode(false)}>Cancelar</button> 
            <button disabled={!fristChange} type="submit">Guardar cambios</button>
          </div>
        : <button onClick={() => changeEditMode(true)}>Editar valores</button>
      }
    </form>
    <button onClick={logOut}>Cerrar sesion</button>
  </main>)
}