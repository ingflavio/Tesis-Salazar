import { searchUser, searchUsers } from "../services/users"

export const useUsers = () => {
  const getUsers = () => {
    //Algo asincronico
    return searchUsers()
  }
  
  const getUser = (id) => {
    //Algo asincronico
    return searchUser(id)
  }
  
  const checkAdmin = (id) => {
    return searchUser(id).admin
  }

  return {getUsers, getUser, checkAdmin}
}

export default useUsers