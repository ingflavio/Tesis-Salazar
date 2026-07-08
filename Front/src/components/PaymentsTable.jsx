import classes from '../styles/payments.module.scss'

export default function PaymentsTable({payments = [], rol = 'user'}) {
  console.table(payments)
  return <table className={classes.paymentsTable}>
    <thead>
      <tr>
        {rol === 'admin' && <th>Usuario</th>}
        <th>Cedula</th>
        <th>Telefono</th>
        <th>Banco</th>
        <th>Monto</th>
        <th>fecha</th>
      </tr>
    </thead>
    <tbody>{
      payments.map((payment) => {
        return <tr key={payment.id}>
          {rol === 'admin' && <th>{payment.user}</th>}
          <th>{payment.cedula}</th>
          <th>{payment.phone}</th>
          <th>{payment.bank}</th>
          <th>{payment.amount}Bs</th>
          <th>{payment.date.replaceAll('-','/')}</th>
        </tr>
      })
    }</tbody>
  </table>
}