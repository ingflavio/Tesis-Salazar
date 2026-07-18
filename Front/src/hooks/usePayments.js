// useUsers.js
import { useFetch } from './useFetch';
import { userService } from '../services/user';
import { adminService } from '../services/admin';
import { utilsService } from '../services/utils';

export const usePayments = () => {
  // Hook para obtener todos los pagos
  const {
    data: payments,
    loading: paymentsLoading,
    error: paymentsError,
    execute: fetchPayments,
    refetch: refetchPayments,
    reset: resetPayments
  } = useFetch(adminService.getPayments, [], { immediate: false });

  // Hook para obtener todos los pagos de un usuarios
  const {
    data: paymentsByUser,
    loading: paymentsByUserLoading,
    error: paymentsByUserError,
    execute: fetchPaymentsByUser,
    refetch: refetchpaymentsByUser,
    reset: resetpaymentsByUser
  } = useFetch(userService.myPayments, [], { immediate: false });

  // Hook para enviar pagos
  const {
    loading: sendPaymentsLoading,
    error: sendPaymentsError,
    execute: sendPayment,
    refetch: refetchSendPayments,
    reset: resetSendPayments
  } = useFetch(userService.sendPay, [], { immediate: false });

  // Hook para obtener los bancos
  const {
    data: banks,
    loading: banksLoading,
    error: banksError,
    execute: fetchBanks,
    refetch: refetchBanks,
    reset: resetBanks
  } = useFetch(utilsService.getBanks, [], { immediate: false });

  // Hook para verificar el pago
  const {
    execute: verifyPayment,
  } = useFetch(adminService.verifyPayments, [], { immediate: false });

  // Función para agregar perfil a un usuario
  const verifyPaymentById = async (id, status) => {
    if (!id || !status) {
      throw new Error('ID del pago y el estado es requerido');
    }
    const response = await verifyPayment(id, status);
    if (response.status === 200){
      return response.data
    }
    return false
  };



  return {
    // Estado de pagos
    payments,
    paymentsLoading,
    paymentsError,
    fetchPayments,
    refetchPayments,
    resetPayments,

    // Estado de pagos por usuario
    paymentsByUser,
    paymentsByUserLoading,
    paymentsByUserError,
    fetchPaymentsByUser,
    refetchpaymentsByUser,
    resetpaymentsByUser,

    // Estado de envio de pagos
    sendPaymentsError,
    sendPaymentsLoading,
    sendPayment,
    refetchSendPayments,
    resetSendPayments,

    // Estado de bancos
    banks,
    banksLoading,
    banksError,
    fetchBanks,
    refetchBanks,
    resetBanks,

    //Verificar pago
    verifyPayment: verifyPaymentById
  }
};

export default usePayments;