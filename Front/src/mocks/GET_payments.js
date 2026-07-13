// pagos
const payments = [
  {
    id: 1,
    user: 20000001,
    cedula: 30281014,
    bank: 'banco nacional de credito',
    phone: '04122082050',
    amount: 2800,
    date: '02-07-2026',
    status: false
  },
  {
    id: 2,
    user: 20000002,
    cedula: 26304456,
    bank: 'banco venezuela',
    phone: '04244376400',
    amount: 2800,
    date: '02-07-2026',
    status: false
  },
  {
    id: 3,
    user: 20000002,
    cedula: 26304456,
    bank: 'banco venezuela',
    phone: '04244376400',
    amount: 2800,
    date: '02-06-2026',
    status: true
  },
  {
    id: 4,
    user: 20000001,
    cedula: 30281014,
    bank: 'banco nacional de credito',
    phone: '04122082050',
    amount: 2800,
    date: '02-06-2026',
    status: true
  // },
  // {
  //   id: 5,
  //   user: 0,
  //   cedula: 0,
  //   bank: '',
  //   phone: '',
  //   amount: 0,
  //   date: ''
  }
]

export const getAll = () => payments

export const getByUser = (user) => payments.filter((pay) => pay.user == user)