import { fieldsConfig } from '../utils/fieldsConfig'
import FormField from '../components/FormField'
import classes from '../styles/ProfileCard.module.scss'

export default function ProfileCard({ profile }){
  return (
    <form className={classes.profileCard}>
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
    </form>
  )
}