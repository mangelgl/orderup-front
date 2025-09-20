import { useContext } from 'react';
import { RestauranteContex } from '../context/RestauranteProvider';

// Crea el hook useRestaurante
export const useRestaurante = () => {
	return useContext(RestauranteContex);
};

