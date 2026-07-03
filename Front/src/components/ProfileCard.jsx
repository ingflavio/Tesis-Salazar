import { fieldsConfig } from '../utils/fieldsConfig'
import FormField from '../components/FormField'

export default function ProfileCard({ profile }){
  return <form>
    {
      Object.entries(profile).map(([name, ]) => <FormField config={fieldsConfig[name]} key={name}/>)
    }
  </form>
}