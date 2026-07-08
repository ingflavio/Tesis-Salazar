import { paymentsConfigArray } from "../utils/fieldsConfig" 
import FormField from "./FormField"

export default function PaymentsForm({submit}) {


  return <form onSubmit={submit}>
    {
      paymentsConfigArray.map((config) => {
        return <FormField key={config.name} config={config} />
      })
    }
    <button>Registrar</button>
  </form>
}