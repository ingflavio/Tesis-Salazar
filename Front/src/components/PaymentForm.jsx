import { paymentsFieldsConfig, paymentsConfigArray } from "../utils/fieldsConfig" 
import FormField from "./FormField"
import classes from '../styles/paymentForm.module.scss'
import useValidateForm from "../hooks/useValidateForm"

export default function PaymentsForm({submit}) {
  const initialAlerts = Object.fromEntries(paymentsConfigArray.map((config) => [config.name, '']))
  const { alerts, validateFields } = useValidateForm(initialAlerts)

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const entries = Array.from(formData.entries()) 
    console.log(entries)
    const validations = Object.fromEntries(entries.reduce((validationArray, [key, value]) => {
      const validationFunc = paymentsFieldsConfig[key].validateFunc
      if (validationFunc) {
        return [...validationArray, [key, validationFunc(value)]]
      }
      return validationArray
    }, []))

    const valid = validateFields(validations)
    if (valid) {
      const data = Object.fromEntries(entries.map(([key, value]) => {
        const parseFunc = paymentsFieldsConfig[key].parseValue
        if(parseFunc) {
          return [key, parseFunc(value)]
        } 
        return [key, value]
      }))
      console.log(data)
    }
  }

  return <form onSubmit={(event) => handleSubmit(event)}>
    <h3>Registrar Pago</h3>
    <div className={classes.fields_wrapper}>{
      paymentsConfigArray.map((config) => {
        return <FormField key={config.name} config={config} errorMsg={alerts[config.name]}/>
      })
    }</div>
    <button>Registrar</button>
  </form>
}