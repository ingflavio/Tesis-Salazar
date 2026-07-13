import classes from '../styles/payments.module.scss'

export default function PaymentsTable({payments = [], rol = 'user', context = 'user'}) {
  return <table className={classes.paymentsTable}>
    <thead>
      {rol === 'user' &&<tr>
        <th className={classes.uniqueCell}><button>Registrar pago</button></th>
      </tr>}
      <tr>
        {rol === 'admin' && <th>Usuario</th>}
        <th>Cedula</th>
        <th>Telefono</th>
        <th>Banco</th>
        <th>Monto</th>
        <th>fecha</th>
        <th>estado</th>
      </tr>
    </thead>
    <tbody>{
      payments.map((payment) => {
        console.log(payment)
        return <tr key={payment.id}>
          {context === 'all' && <th>{payment.user}</th>}
          <th>{payment.cedula}</th>
          <th>{payment.phone}</th>
          <th>{payment.bank}</th>
          <th>{payment.amount}Bs</th>
          <th>{payment.date.replaceAll('-','/')}</th>
          <th className={payment.status ? classes.acepted : classes.pending}>{payment.status ? 'Comprobado' : 'Pendiente'}</th>
        </tr>
      })
    }</tbody>
  </table>
}