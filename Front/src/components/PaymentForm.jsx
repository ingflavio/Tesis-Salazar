import { paymentsConfigArray } from "../utils/fieldsConfig" 
import FormField from "./FormField"
import classes from '../styles/paymentForm.module.scss'

export default function PaymentsForm({submit}) {


  return <form onSubmit={submit}>
    <h3>Registrar Pago</h3>
    <div className={classes.fields_wrapper}>{
      paymentsConfigArray.map((config) => {
        return <FormField key={config.name} config={config} />
      })
    }</div>
    <button>Registrar</button>
  </form>
}