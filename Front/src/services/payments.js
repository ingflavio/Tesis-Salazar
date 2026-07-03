import { getAll, getByUser } from "../mocks/GET_payments"

export const paymentsService = {
  getPayments: () => getAll(),
  getPaymentsByUser: (id) => getByUser(id)
}

export default paymentsService