import { useEffect, useRef, useState } from 'react'
import { fieldsConfig, parseValues } from '../utils/fieldsConfig'
import FormField from '../components/FormField'
import usePayments from '../hooks/usePayments'
import useValidateForm from '../hooks/useValidateForm'
import classes from '../styles/ProfileCard.module.scss'
import PaymentsTable from './PaymentsTable'

export default function ProfileCard({ profile, editCallback, modalCallback, rol = 'user' }){
  const editableFields = ['phone', 'email', 'age', 'weight', 'height', 'fat','condition'] 
  if(rol === 'admin') editableFields.push('name', 'lastName','sex')
  const initalAlerts = Object.fromEntries(editableFields.map((field) => [field, '']))
  const buttons = [
    { name: 'perfil', mode: 'profile'},
    { name: 'editar', mode: 'edit'},
    { name: 'pagos', mode: 'payments'}
  ]

  const { alerts, validateFields } = useValidateForm(initalAlerts)
  const [ mode, setMode] = useState(location.state ? location.state.mode : 'profile')
  const { paymentsByUser: payments , fetchPaymentsByUser: fetchPayments } = usePayments()
  const refSavedChanges = useRef(false)
  const extraFields = []

  useEffect(() => {
    if (profile) {
      fetchPayments()
    }
  }, [profile]) 

  const changeMode = (event, value) => {
    event.preventDefault()
    if (mode === value) return
    if (mode === 'edit' && value === 'profile') {
      if(refSavedChanges.current) resetValues()
      refSavedChanges.current = false
    }
    setMode(value)
  }

  const checkReadOnly = (field) => {
    if (mode !== 'edit') return true
    return !editableFields.includes(field)
  }

  const handleSumbit = (event) => {
    event.preventDefault()
    mode === 'edit' ? saveChanges(event) : modalCallback('Registrar Pago', 'Registrar', rol)
  }

  const saveChanges = (event) => {
    const form = event.target
    const formData = new FormData(form)
    const entries = Array.from(formData.entries()) 
    for (const field of extraFields) {
      const input = document.getElementById(field)
      if (input) entries.push([field, input.value])
    }
    const data = Object.fromEntries(entries)
    
    const validations = Object.fromEntries(entries.reduce((validationArray, [key, value]) => {
      const validationFunc = editableFields.includes(key) ? fieldsConfig[key]?.validateFunc : null
      if (validationFunc) {
        return [...validationArray, [key, validationFunc(value, profile[key])]]
      }
      return validationArray
    }, []))
  
    const valid = validateFields(validations)
    if (valid) {
      refSavedChanges.current = true
      const parsedData = parseValues(data)
      setMode('profile')
      editCallback(parsedData)
    }
  } 

  const resetValues = () => {
    for (const field of editableFields){
      const input = document.getElementById(field)
      const newValue = profile[field]
      if (newValue !== input.value) input.value = newValue
    }
  }

  const classTable = {
    'profile': classes.profileCard,
    'edit': `${classes.profileCard} ${classes.editMode }`,
    'payments': `${classes.profileCard} ${classes.paymentsMode }`
  }

  const tittleTable = {
    'profile': 'Datos del usuario',
    'edit': 'Editar datos usuario',
    'payments': 'Registro de pagos del usuario'    
  }

  return (
    <form className={classTable[mode]} onSubmit={(event) => handleSumbit(event)}>
      <div className={classes.buttonBar}>
        {buttons.map((button) => 
          <button key={button.mode} className={mode === button.mode ? classes.activeButton : ""}
            onClick={(event) => changeMode(event, button.mode)}
          >{button.name}</button>
        )}
      </div>
      <div className={mode !== 'payments' ? classes.fields_Wrapper : classes.paymentsList}>
        {rol === 'admin' && <h3>{tittleTable[mode]}</h3>}
        {mode !== 'payments' && <>
          {Object.entries(profile).map(([name, value]) => {
            const config = fieldsConfig[name] 
            if (!config) return
            if (config.type !== 'text') extraFields.push(name)
            const notEditable = checkReadOnly(name)
            const errorMsg = mode !== 'edit' 
              ? '' 
              : Object.keys(alerts).includes(name) 
                ? alerts[name] 
                : ''

            return <FormField 
              className={notEditable ? '' : classes.showInput}
              key={`${name}-${mode}-${value}`}
              config={config} 
              initialValue={value}
              id={name}
              readOnly={notEditable}
              errorMsg={errorMsg}
            />})}
        <div className={classes.submitWrapper}>
          <button className={classes.submitBtn}>
            guardar cambios
          </button>
        </div>
        </> 
        }
        {
          mode === 'payments' &&
          <PaymentsTable payments={payments} modalCallback={modalCallback} 
            rol={rol}
          />
        }
      </div>
    </form>
  )
}