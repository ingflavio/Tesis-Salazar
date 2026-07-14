// useUsers.js
import { useFetch } from './useFetch';
import { userService } from '../services/user';
import { adminService } from '../services/admin';
import { utilsService } from '../services/utils';
// 

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
    data: sendPayments,
    loading: sendPaymentsLoading,
    error: sendPaymentsError,
    execute: fetchSendPayments,
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
    sendPayments,
    sendPaymentsError,
    sendPaymentsLoading,
    fetchSendPayments,
    refetchSendPayments,
    resetSendPayments,

    // Estado de bancos
    banks,
    banksLoading,
    banksError,
    fetchBanks,
    refetchBanks,
    resetBanks

  }
};

export default usePayments;