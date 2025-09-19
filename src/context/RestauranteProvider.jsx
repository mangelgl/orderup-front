import PropTypes from 'prop-types';
import { createContext, useState, useMemo } from 'react';
import { categorias as categoriasData } from '../data/categorias';

export const RestauranteContex = createContext();

export const RestauranteProvider = ({ children }) => {
	const [categorias, setCategorias] = useState(categoriasData);
	const [categoriaActual, setCategoriaActual] = useState(categorias[0]);

	const handleClickCategoria = (id) => {
		const categoria = categorias.filter((categoria) => categoria.id === id)[0];
		setCategoriaActual(categoria);
	};

	return (
		<RestauranteContex
			value={useMemo(
				() => ({ categorias, categoriaActual, handleClickCategoria }),
				[categorias, categoriaActual, handleClickCategoria]
			)}>
			{children}
		</RestauranteContex>
	);
};

RestauranteProvider.propTypes = {
	children: PropTypes.node,
};

