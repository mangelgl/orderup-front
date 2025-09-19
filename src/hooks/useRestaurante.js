import { useContext } from 'react';
import { RestauranteContex } from '../context/RestauranteProvider';

export const useRestaurante = () => {
	return useContext(RestauranteContex);
};

