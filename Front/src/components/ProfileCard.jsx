import { fieldsConfig } from '../utils/fieldsConfig'
import FormField from '../components/FormField'
import classes from '../styles/ProfileCard.module.scss'

export default function ProfileCard({ profile }){
  return (
    <form className={classes.profileCard}>
      {Object.entries(profile).map(([name, value]) => (
        <FormField 
          key={name}
          config={fieldsConfig[name]} 
          initialValue={value}
          id={name}
        />
      ))}
    </form>
  )
}