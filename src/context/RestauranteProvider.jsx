import PropTypes from 'prop-types';
import { createContext, useState, useMemo } from 'react';
import { categorias as categoriasData } from '../data/categorias';

/**
 * Crea el contexto de la aplicación, es decir, un "contenedor" para
 * compartir datos entre componentes sin necesidad de pasar props en cada nivel
 */
export const RestauranteContex = createContext();

/**
 * Componente especial que genera React automáticamente al crear un contexto.
 * Provee un valor (estado, funciones o datos) a todos los componentes hijos
 * que estén dentro de él.
 */
export const RestauranteProvider = ({ children }) => {
	const [categorias, setCategorias] = useState(categoriasData);
	const [categoriaActual, setCategoriaActual] = useState(categorias[0]);
	const [modal, setModal] = useState(false);
	const [producto, setProducto] = useState({});
	const [pedido, setPedido] = useState([]);

	// Gestiona el cambio de categoría
	const handleClickCategoria = (id) => {
		const categoria = categorias.filter((categoria) => categoria.id === id)[0];
		setCategoriaActual(categoria);
	};
	// Gestiona la apertura y cierre de la ventana modal
	const handleClickModal = () => setModal(!modal);

	// Gestiona la selección de producto para pasarlo a la ventana modal
	const handleSetProducto = (producto) => {
		setProducto(producto);
	};

	// Gestiona la adicción de productos al Resumen de pedido
	const handleAgregarPedido = ({ categoria_id, imagen, ...producto }) => {
		if (pedido.some((pedidoState) => pedidoState.id === producto.id)) {
			const pedidoActualizado = pedido.map((pedidoState) =>
				pedidoState.id === producto.id ? producto : pedidoState
			);
			setPedido(pedidoActualizado);
		} else {
			setPedido([...pedido, producto]);
		}
	};

	return (
		<RestauranteContex
			value={
				// Guarda en caché el resultado de un cálculo entre renderizados, para evitar recálculos costosos
				useMemo(
					// La función que calcula el valor que deseas memorizar. Pura, sin argumentos.
					() => ({
						categorias,
						categoriaActual,
						handleClickCategoria,
						modal,
						handleClickModal,
						producto,
						handleSetProducto,
						pedido,
						handleAgregarPedido,
					}),
					// La lista de todos los valores reactivos a los que se hace referencia dentro del código de arriba.
					[
						categorias,
						categoriaActual,
						handleClickCategoria,
						modal,
						handleClickModal,
						producto,
						handleSetProducto,
						pedido,
						handleAgregarPedido,
					]
				)
			}>
			{children}
		</RestauranteContex>
	);
};

// Establece el tipo de las props
// En TypeScript esto viene implícito y no hay que importar ninguna librería, simplemente prop: String
RestauranteProvider.propTypes = {
	children: PropTypes.node,
};

