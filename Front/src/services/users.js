const users = [
  {
    id: 25107117,
    password: 123,
    admin: true
  },
  {
    id: 30123123,
    password: 123,
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