import { useState, useEffect, useCallback } from 'react';

// Estado inicial para evitar re-renderizados innecesarios
const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const useFetch = (fetchFunction, dependencies = [], options = {}) => {
  const [state, setState] = useState(initialState);
  const { immediate = true } = options;

  const execute = useCallback(async (...args) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await fetchFunction(...args);
      setState({
        data: data,
        loading: false,
        error: null,
      });
      return data;
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error.response?.data?.message || error.message || 'Error desconocido',
      });
      throw error;
    }
  }, [fetchFunction]);

  // Ejecutar automáticamente si immediate es true
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [...dependencies, execute, immediate]);

  // Función para resetear el estado
  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    ...state,
    execute,
    reset,
    // Alias útiles
    refetch: execute,
    isIdle: state.data === null && !state.loading && !state.error,
  };
};