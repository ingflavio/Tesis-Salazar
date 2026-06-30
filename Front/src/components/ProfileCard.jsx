import { useState } from 'react'
import { fieldsConfig } from '../utils/fieldsConfig'
import FormField from '../components/FormField'
import classes from '../styles/ProfileCard.module.scss'

export default function ProfileCard({ profile }){
  const [ mode, setMode] = useState('profile')

  const changeMode = (event, value) => {
    event.preventDefault()
    if (mode === value) return
    setMode(value)
  }

  const buttons = [
    { name: 'perfil', mode: 'profile'},
    { name: 'editar', mode: 'edit'},
    { name: 'pagos', mode: 'finance'}
  ]

  return (
    <form className={classes.profileCard}>
      <div className={classes.buttonBar}>
        {buttons.map((button) => 
          <button className={mode === button.mode ? classes.activeButton : ""}
            onClick={(event) => changeMode(event, button.mode)}
          >{button.name}</button>
        )}
      </div>
      <div className={classes.fields_Wrapper}>
        {Object.entries(profile).map(([name, value]) => {
          const config = fieldsConfig[name] 
          if (!config) return
          const formatValue = config.formatValue 
          const newValue = formatValue ? formatValue(value) : value
          return <FormField 
            key={name}
            config={config} 
            initialValue={newValue}
            id={name}
          />
        })}
      </div>
    </form>
  )
}