import { useEffect, useState } from "react"
import usePayments from "../hooks/usePayments"
import PaymentsTable from "../components/PaymentsTable"
import classes from '../styles/finances.module.scss'
import { useModalForm } from "../hooks/useModalForm"
import PaymentsForm from "../components/PaymentForm"

export default function FinancePage() {
  const { payments, fetchPayments } = usePayments()
    const [alert, setAlert] = useState('')
  const { formInfo, formValues, modalOpen, modal, showModalForm, closeModalForm } = useModalForm()

  useEffect(() => {
    fetchPayments()
  }, [])

  const OpenPaymentInfo = (payment) => {
    showModalForm({
      text: 'Informacion del pago',
      mode: 'show',
      profile: payment,
      submit: payment.status ? '' : 'Verificar Pago',
      secondSubmit: payment.status ? null : 'Denegar Pago' 
    })
  }

  const OpenPaymentRegister = () => {
    showModalForm({
      text: 'Registrar Pago',
      mode: 'register admin',
      submit: 'Registrar'
    })
  }

  const showAlert = (newAlert, succes) => {
    if (succes) closeModalForm()
    setAlert(newAlert)
    fetchPayments()
    setTimeout(() => setAlert(''), 3000)
  }
  

  return <main className={classes.financePage}>
    <PaymentsTable payments={payments} rol="admin" 
      modalCallback={(payment) => OpenPaymentInfo(payment)}
      tfootCallback={OpenPaymentRegister}
    />    
    <dialog ref={modal} open={modalOpen}>
      <button className="closeBtn" onClick={closeModalForm}>X</button>
      <PaymentsForm title={formInfo.title} 
        values={formValues}
        sumbit={formInfo.submit}
        secondSumbit={formInfo.secondSubmit}
        mode={formInfo.mode}
        alertCallback={showAlert}
        rol='admin'
      />
    </dialog>
    {
      alert !== '' && 
      <span className={classes.alertBubble}>
        {alert}
      </span>
    }
  </main>
}