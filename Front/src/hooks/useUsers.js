// useUsers.js
import { useFetch } from './useFetch';
import { usersService } from '../services/users';

export const useUsers = () => {
  // Hook para obtener todos los usuarios
  const {
    data: users,
    loading: usersLoading,
    error: usersError,
    execute: fetchUsers,
    refetch: refetchUsers,
    reset: resetUsers
  } = useFetch(usersService.getUsers, [], { immediate: false });

  // Hook para obtener un usuario específico
  const {
    data: user,
    loading: userLoading,
    error: userError,
    execute: fetchUser,
    refetch: refetchUser,
    reset: resetUser
  } = useFetch(usersService.getUser, [], { immediate: false });

  // Hook para registrar un usuario
  const {
    loading: registerLoading,
    error: registerError,
    execute: registerUser,
    reset: resetRegister
  } = useFetch(usersService.registerUser, [], { immediate: false });

  // Hook para agregar perfil
  const {
    loading: profileLoading,
    error: profileError,
    execute: addProfile,
    reset: resetProfile
  } = useFetch(usersService.addProfile, [], { immediate: false });

  // Hook para editar perfil
  const {
    loading: editLoading,
    error: editError,
    execute: editProfile,
    reset: resetEdit
  } = useFetch(usersService.editProfile, [], { immediate: false });

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
    return await addProfile(profileData);
  };

  // Función para agregar perfil a un usuario
  const editUserProfile = async (profileData) => {
    if (!profileData.id) {
      throw new Error('ID de usuario es requerido');
    }
    const response = await editProfile(profileData);
    console.log(response)
  };

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
    profileLoading,
    profileError,
    addProfile: addUserProfile,
    resetProfile,

    // Estado de edicion de perfil
    editLoading,
    editError,
    editProfile: editUserProfile,
    resetEdit,
    

    // Utilidades
    isUsersLoading: usersLoading,
    isUserLoading: userLoading,
    isRegisterLoading: registerLoading,
    isProfileLoading: profileLoading,
    isEditLoading: editLoading,
    hasUsersError: !!usersError,
    hasUserError: !!userError,
    hasRegisterError: !!registerError,
    hasProfileError: !!profileError,
    hasEditError: !!editError,
  };
};

export default useUsers;