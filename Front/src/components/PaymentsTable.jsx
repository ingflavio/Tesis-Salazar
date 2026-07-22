import classes from '../styles/payments.module.scss'
import { formatBank } from '../utils/fieldsConfig'

export default function PaymentsTable({payments = [], rol = 'user', modalCallback = null, tfootCallback }) {
  if (!payments) return <h3>Cargando pagos</h3>
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
      payments.map((payment, index) => {
        return <tr key={index} onClick={rol === 'admin' ? () => modalCallback(payment): null}>
          {rol === 'admin'  && <th>{payment.user}</th>}
          <th>{payment.cedula}</th>
          <th>{payment.phone}</th>
          <th>{formatBank(payment.bank)}</th>
          <th>{payment.amount}Bs</th>
          <th>{payment.date.replaceAll('-','/')}</th>
          <th className={payment.status ? classes.acepted : classes.pending}>{payment.status ? 'Comprobado' : 'Pendiente'}</th>
        </tr>
      })
    }</tbody>
    {
      // rol === 'admin' &&
      // <tfoot><tr><th>
      //   <button onClick={tfootCallback}>Registrar Pago</button>  
      // </th></tr></tfoot>
    }
  </table>
}