import { paymentsFieldsConfig, paymentsConfigArray } from "../utils/fieldsConfig" 
import FormField from "./FormField"
import classes from '../styles/paymentForm.module.scss'
import useValidateForm from "../hooks/useValidateForm"
import usePayments from "../hooks/usePayments";
import { useEffect } from "react";

export default function PaymentsForm({ alertCallback, values = null, title = 'Registrar pago', sumbit = '', mode = 'register', secondSumbit = null}) {
  const { sendPayment, verifyPayment, banks, fetchBanks } = usePayments()
  const initialAlerts = Object.fromEntries(paymentsConfigArray.map((config) => [config.name, '']))
  const { alerts, changeAlert, onChange, validateFields } = useValidateForm(initialAlerts)

  useEffect(() => {
    fetchBanks()
  }, []) 

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const registerPayment = async (event) => {
    const form = event.target
    const formData = new FormData(form)
    const entries = Array.from(formData.entries()) 
    const validations = Object.fromEntries(entries.reduce((validationArray, [key, value]) => {
      const validationFunc = paymentsFieldsConfig[key].validateFunc
      if (validationFunc) {
        return [...validationArray, [key, validationFunc(value)]]
      }
      return validationArray
    }, []))

    const input = document.getElementById('image')
    const file = input.files[0] 
    if (!file){
      validations['image'] = 'Es necesario subir una captura del comprobante'
    }else {
      validations['image'] = true
    }
    const valid = validateFields(validations)
    if (valid) {
      const data = Object.fromEntries(entries.map(([key, value]) => {
        const parseFunc = paymentsFieldsConfig[key].parseValue
        if(parseFunc) {
          return [key, parseFunc(value)]
        } 
        return [key, value]
      }))
      const base64String = await fileToBase64(input.files[0]);
      data['image'] = base64String
      const response = await sendPayment(data)
      if (response.status === 200){
        alertCallback('Pago registrado', true)
        return response.data.id
      } else {
        alertCallback('Fallo al registrar el pago', false)
      }
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (mode === 'register'){
      registerPayment(event)
    } else if (mode === 'verify') {
      //
    } else if (mode === 'admin register') {
      const id = registerPayment(event)
      //
    }
  }

  return <form className={classes.payment_form} onSubmit={(event) => handleSubmit(event)}>
    <h3>{title}</h3>
    <div className={`${classes.fields_wrapper} ${values !== null ? classes.readOnly : ''}`}>{
      paymentsConfigArray.map((config) => {
        const readOnlyProps = values !== null 
        ? {
          initialValue: values[config.name],
          readOnly: true
        }
        :
        {}
        if (config.name === 'bank'){
          const newConfig = {...config} 
          let newOptions = []
          if (banks) {
            newOptions = banks.map(config.formatOption) 
          }
          newConfig.options = newOptions
          return <FormField key={config.name} config={newConfig} 
            errorMsg={alerts[config.name]}
            {...readOnlyProps}/> 
        } else if (config.name === 'image') {
          if (values === null){
            return <FormField 
              key={config.name} 
              config={config} 
              onChange={(value) => onChange(value, config.name, config.validateFunc)}
              errorMsg={alerts[config.name]}
              changeAlert={(newAlert) => changeAlert('image', newAlert)}
            />
          } else {
            return 
          }
        }
        return <FormField 
          key={config.name} 
          config={config} 
          onChange={(value) => onChange(value, config.name, config.validateFunc)}
          errorMsg={alerts[config.name]}
          {...readOnlyProps}
        />
      })
    }</div>
    <div className={classes.btnWrapper}>
      {sumbit !== '' && <button>{sumbit}</button>}
      {secondSumbit !== null && <button>{secondSumbit}</button>}
    </div>
  </form>
}