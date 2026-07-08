export default function PaymentsTable({payments = [], rol = 'user'}) {
  return <table>
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
        <tr key={payment.id}>
          {rol === 'admin' && <th>{payment.user}</th>}
          <th>{payment.cedula}</th>
          <th>{payment.phone}</th>
          <th>{payment.bank}</th>
          <th>{payment.amount}Bs</th>
          <th>{payment.date.replace('-','/')}</th>
        </tr>
      })
    }</tbody>
  </table>
}