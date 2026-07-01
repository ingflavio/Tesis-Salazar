// pagos
const pays = [
  {
    id: 1,
    user: 25107117,
    cedula: 30281014,
    bank: 'banco nacional de credito',
    phone: '04122082050',
    amount: 2800,
    date: '02-07-2026'
  },
  {
    id: 2,
    user: 26304456,
    cedula: 26304456,
    bank: 'banco venezuela',
    phone: '04244376400',
    amount: 2800,
    date: '02-07-2026'
  },
  {
    id: 3,
    user: 26304456,
    cedula: 26304456,
    bank: 'banco venezuela',
    phone: '04244376400',
    amount: 2800,
    date: '02-06-2026'
  },
  {
    id: 4,
    user: 25107117,
    cedula: 30281014,
    bank: 'banco nacional de credito',
    phone: '04122082050',
    amount: 2800,
    date: '02-06-2026'
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

export const getAll = () => pays

export const getByUser = (user) => pays.filter((pay) => pay.user == user)