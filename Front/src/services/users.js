const users = [
  {
    id: 30281014,
    password: 1,
    admin: true
  },
  {
    id: 2,
    password: 2,
    admin: false
  }
]

export const searchUsers = () => {
  //Aqui iria un fetch 
  return users 
}

export const searchUser = (id) => {
  //Aqui iria un fetch 
  return users.filter((item) => item.id === id)[0]
}