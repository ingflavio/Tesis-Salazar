import { useFetch } from './useFetch';
import { userService } from '../services/user';
import { adminService } from '../services/admin';
import { useState } from 'react';
import { formatUser } from '../services/api';

export const useUsers = () => {
  // Hook para obtener todos los usuarios
  const {
    data: users,
    loading: usersLoading,
    error: usersError,
    execute: fetchUsers,
    refetch: refetchUsers,
    reset: resetUsers
  } = useFetch(adminService.getUsers, [], { immediate: false });

  // Hook para obtener un usuario específico
  const {
    data: user,
    loading: userLoading,
    error: userError,
    execute: fetchUser,
    refetch: refetchUser,
    reset: resetUser
  } = useFetch(adminService.getUser, [], { immediate: false });

  // Hook para registrar un usuario
  const {
    loading: registerLoading,
    error: registerError,
    execute: registerUser,
    reset: resetRegister
  } = useFetch(userService.registerUser, [], { immediate: false });

  // Hook para obtener el perfil del usuario
  const {
    data: profile,
    loading: profileLoading,
    error: profileError,
    execute: getProfile,
    reset: resetProfile
  } = useFetch(userService.getProfile, [], { immediate: false });

  // Hook para agregar perfil
  const {
    loading: sendProfileLoading,
    error: sendProfileError,
    execute: addProfile,
    reset: resetSendProfile
  } = useFetch(adminService.addProfile, [], { immediate: false });

  // Hook para editar perfil
  const {
    loading: editLoading,
    error: editError,
    execute: editProfile,
    reset: resetEdit
  } = useFetch(userService.editProfile, [], { immediate: false });

  // Hook para editar perfil (siendo admin)
  const {
    execute: AdminEdit
  } = useFetch(adminService.editProfile, [], { immediate: false });
  
  // Hook para obtener el perfil del usuario
  const {
    data: admins,
    loading: adminsLoading,
    error: adminsError,
    execute: getAdmins,
    reset: resetAdmins
  } = useFetch(adminService.getAdmins, [], { immediate: false });


  // Hook para obtener el perfil del usuario
  const [admin, setAdmin] = useState()
  const {
    loading: adminLoading,
    error: adminError,
    execute: getAdmin,
    reset: resetAdmin
  } = useFetch(adminService.getAdmins, [], { immediate: false });

  // Función para obtener un usuario por ID
  const getUser = async (id) => {
    if (!id) {
      throw new Error('ID de usuario es requerido');
    }
    return await fetchUser(id);
  };

  // Función para registrar un nuevo usuario
  const registerNewUser = async (userData) => {
    if (!userData.id || !userData.username || !userData.password || !userData.rol) {
      throw new Error('Todos los campos son requeridos: id, username, password, rol');
    }
    return await registerUser(userData);
  };

  // Función para agregar perfil a un usuario
  const addUserProfile = async (profileData) => {
    if (!profileData.id) {
      throw new Error('ID de usuario es requerido');
    }
    const response = await addProfile(profileData);
    return response
  };

  // Función para editar perfil a un usuario
  const editUserProfile = async (profileData) => {
    if (!profileData.id) {
      throw new Error('ID de usuario es requerido');
    }
    const response = await editProfile(profileData);
    if (response.status === 200){
      return response.data
    }
    return false
  };

  //funcion para obtener un admin
  const getAdminById = async (id) => {
  if (!id) {
    throw new Error('ID de usuario es requerido');
  }
  try {
    // Primero obtén la lista completa de admins
    const response = await getAdmins();
    
    if (response && response.status === 200 && response.data) {
      // Busca el admin por ID en la lista
      const foundAdmin = response.data.find((admin) => admin.id === id || admin.cedula === id);
      
      if (foundAdmin) {
        setAdmin(foundAdmin);
        return foundAdmin;
      }
    }
    
    setAdmin(null);
    return null;
  } catch (error) {
    console.error('Error al obtener admin:', error);
    setAdmin(null);
    return false;
  }
}

  return {
    // Estado de usuarios (todos)
    users,
    usersLoading,
    usersError,
    fetchUsers,
    refetchUsers,
    resetUsers,

    // Estado de usuario individual
    user,
    userLoading,
    userError,
    getUser,
    refetchUser,
    resetUser,

    // Estado de registro
    registerLoading,
    registerError,
    registerUser: registerNewUser,
    resetRegister,

    // Estado de perfil
    profile,
    profileLoading,
    profileError,
    getProfile,
    resetProfile,

    // estado del envio del perfil
    sendProfileLoading,
    sendProfileError,
    addProfile: addUserProfile,
    resetSendProfile,

    // Estado de edicion de perfil
    editLoading,
    editError,
    editProfile: editUserProfile,
    resetEdit,

    //Estado de obtener admins 
    admin,
    adminLoading,
    adminsError,
    getAdmin: getAdminById,
    resetAdmin,

    //Estado de obtener admins 
    admins,
    adminsLoading,
    adminError,
    getAdmins,
    resetAdmins,
  };
};

export default useUsers;