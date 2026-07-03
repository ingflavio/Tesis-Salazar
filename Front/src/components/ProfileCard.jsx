import { useEffect, useRef, useState } from 'react'
import { fieldsConfig } from '../utils/fieldsConfig'
import FormField from '../components/FormField'
import classes from '../styles/ProfileCard.module.scss'
import usePayemnts from '../hooks/usePayments'

export default function ProfileCard({ profile, rol = 'user' }){
  const [ mode, setMode] = useState('profile')
  const { payments, fetchUserPayments } = usePayemnts()
  const refSavedChanges = useRef(false)

  const editableFields = ['phone', 'email', 'age', 'weight', 'height','condition'] 
  if(rol === 'admin') editableFields.push('name', 'lastName','sex')

  const errorMessages = Object.fromEntries(editableFields.map((field) => [field, '']))

  const changeMode = (event, value) => {
    event.preventDefault()
    if (mode === value) return
    if (mode === 'edit' && value === 'profile') {
      resetValues()
      refSavedChanges.current = false
    }
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

  useEffect(() => {
    fetchUserPayments(profile.id)
  }, [])

  const handleSumbit = (event) => {
    event.preventDefault()
    refSavedChanges.current = true
    const form = event.target
    const data = Object.fromEntries(new FormData(form).entries())
    console.log(data)
  }

  const resetValues = () => {
    if(refSavedChanges.current) return
    for (const field of editableFields){
      const input = document.getElementById(field)
      const formatValue = fieldsConfig[field].formatValue
      const newValue = formatValue ? formatValue(profile[field]) : profile[field]
      if (newValue !== input.value) input.value = newValue
    }
  }

  return (
    <form className={`${classes.profileCard} ${mode === 'edit' ? classes.editMode : ''}`} onSubmit={(event) => handleSumbit(event)}>
      <div className={classes.buttonBar}>
        {buttons.map((button) => 
          <button className={mode === button.mode ? classes.activeButton : ""}
            onClick={(event) => changeMode(event, button.mode)}
          >{button.name}</button>
        )}
      </div>
      <div className={mode !== 'finance' ? classes.fields_Wrapper : classes.paymentsList}>
        {mode !== 'finance' && <>
          {Object.entries(profile).map(([name, value]) => {
            const config = fieldsConfig[name] 
            if (!config) return
            const formatValue = config.formatValue 
            const newValue = formatValue ? formatValue(value) : value
            const notEditable = checkReadOnly(name)
            const errorMsg = mode !== 'edit' 
              ? '' 
              : Object.keys(errorMessages).includes(name) 
                ? errorMessages[name] 
                : ''

            return <FormField 
              className={notEditable ? '' : classes.showInput}
              key={`${name}-${mode}`}
              config={config} 
              initialValue={newValue}
              id={name}
              readOnly={notEditable}
              errorMsg={errorMsg}
            />})}
        <button className={classes.sumbitBtn}>
          guardar cambios
        </button>
        </> 
        }
        {
          mode === 'finance' &&
          <div>{
            payments.map((payment) => {
              <span>{payment}</span>
            })  
          }</div>
        }
      </div>
    </form>
  )
}