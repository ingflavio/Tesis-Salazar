import { useState } from 'react'
import { fieldsConfig } from '../utils/fieldsConfig'
import FormField from '../components/FormField'
import classes from '../styles/ProfileCard.module.scss'

export default function ProfileCard({ profile, rol = 'user' }){
  const [ mode, setMode] = useState('profile')

  const editableFields = ['phone', 'email', 'age', 'weight', 'height','condition'] 
  if(rol === 'admin') editableFields.push('name', 'lastName')

  const changeMode = (event, value) => {
    event.preventDefault()
    if (mode === value) return
    if (mode === 'edit' && value === 'profile') resetValues()
    setMode(value)
  }

  const buttons = [
    { name: 'perfil', mode: 'profile'},
    { name: 'editar', mode: 'edit'},
    { name: 'pagos', mode: 'finance'}
  ]

  const checkReadOnly = (field) => {
    if (mode !== 'edit') return true
    return !editableFields.includes(field)
  }

  const handleSumbit = (event) => {
    event.preventDefault()
    const form = event.target
    const data = Object.fromEntries(new FormData(form).entries())
    console.log(data)
  }

  const resetValues = () => {
    for (const field of editableFields){
      const input = document.getElementById(field)
      const formatValue = fieldsConfig[field].formatValue
      const newValue = formatValue ? formatValue(profile[field]) : profile[field]
      if (newValue !== input.value) input.value = newValue
    }
  }

  return (
    <form className={`${classes.profileCard} ${mode === 'edit' ? classes.editMode : ''}`} onSubmit={(event) => handleSumbit(event)}
      style={{transition: 'all 1s'}}
    >
      <div className={classes.buttonBar}>
        {buttons.map((button) => 
          <button className={mode === button.mode ? classes.activeButton : ""}
            onClick={(event) => changeMode(event, button.mode)}
          >{button.name}</button>
        )}
      </div>
      <div className={`${classes.fields_Wrapper} ${mode === 'edit' ? classes.editMode : ''}`}>
        {mode !== 'finance' && Object.entries(profile).map(([name, value]) => {
          const config = fieldsConfig[name] 
          if (!config) return
          const formatValue = config.formatValue 
          const newValue = formatValue ? formatValue(value) : value
          const notEditable = checkReadOnly(name)
          return <FormField 
            className={notEditable ? '' : classes.showInput}
            key={name}
            config={config} 
            initialValue={newValue}
            id={name}
            readOnly={notEditable}
          />
        })}
        <button className={classes.sumbitBtn}>
          guardar cambios
        </button>
      </div>
    </form>
  )
}