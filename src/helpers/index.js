import axios from 'axios';

export const formatearDinero = (cantidad) => {
  return cantidad.toLocaleString('es', {
    style: 'currency',
    currency: 'EUR',
  });
};

export const clienteAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

