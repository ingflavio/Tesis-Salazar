export const searchUsers = () => {
  //Aqui iria un fetch 
  return users 
}

export const searchUser = (id) => {
  //Aqui iria un fetch 
  return users.filter((item) => item.id === id)[0]
}