import { useEffect } from "react"
import usePayments from "../hooks/usePayments"
import PaymentsTable from "../components/PaymentsTable"
import classes from '../styles/finances.module.scss'
import { useModalForm } from "../hooks/useModalForm"
import PaymentsForm from "../components/PaymentForm"

export default function FinancePage() {
  const { payments, fetchPayments } = usePayments()
  const { formInfo, formValues, modalOpen, modal, showModalForm, closeModalForm } = useModalForm()

  useEffect(() => {
    fetchPayments()
  }, [])

  useEffect(() => {
    console.log(payments)
  }, [payments])

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
      mode: 'show',
      submit: 'Registrar'
    })
  }

  

  return <main className={classes.financePage}>
    <PaymentsTable payments={payments} rol="admin" 
      modalCallback={(payment) => OpenPaymentInfo(payment)}
      tfootCallback={OpenPaymentRegister}
    />    
    <dialog ref={modal}>
      <button className="closeBtn" onClick={closeModalForm}>X</button>
      <PaymentsForm title={formInfo.title} 
        values={formValues}
        sumbit={formInfo.submit}
        secondSumbit={formInfo.secondSubmit}
        rol='admin'
      />
    </dialog>
  </main>
}