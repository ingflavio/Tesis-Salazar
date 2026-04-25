import {searchProfile, searchProfiles, searchProfileColumns} from '../services/profiles'

export const useProfile = () => {
  const getProfiles = () => {
    //aqui iria algo asincronico
    return searchProfiles()
  }
  
  const getProfile = (id) => {
    //aqui iria algo asincronico
    return searchProfile(id)
  }
  
  const getProfileColumns = () => {
    //aqui iria algo asincronico
    return searchProfileColumns();
  }

  return {getProfile, getProfiles, getProfileColumns}
}

export default useProfile