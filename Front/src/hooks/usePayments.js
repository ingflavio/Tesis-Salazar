import { useState } from "react";
import paymentsService from "../services/payments";

export default function usePayments() {
  const [payments, setPayments] = useState()

  const fetchPayments = () =>{
    const response = paymentsService.getPayments()
    setPayments(response)
  }

  const fetchUserPayments = (id) =>{
    console.log('buscando pagos del usuario ' + id)
    const response = paymentsService.getPaymentsByUser(id)
    setPayments(response)
  }

  return { payments, fetchPayments, fetchUserPayments }
}