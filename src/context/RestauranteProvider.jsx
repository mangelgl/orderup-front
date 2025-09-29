import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { createContext, useState, useMemo, useEffect } from 'react';
import { clienteAxios } from '../helpers';

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
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [modal, setModal] = useState(false);
    const [producto, setProducto] = useState({});
    const [pedido, setPedido] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const nuevoTotal = pedido.reduce(
            (total, producto) => producto.precio * producto.cantidad + total,
            0
        );
        setTotal(nuevoTotal);
    }, [pedido]);

    const obtenerCategorias = async () => {
        try {
            const request = await clienteAxios('/api/categorias');
            setCategorias(request.data.data);
            setCategoriaActual(request.data.data[0]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        obtenerCategorias();
    }, []);

    // Gestiona el cambio de categoría
    const handleClickCategoria = (id) => {
        const categoria = categorias.filter(
            (categoria) => categoria.id === id
        )[0];
        setCategoriaActual(categoria);
    };
    // Gestiona la apertura y cierre de la ventana modal
    const handleClickModal = () => setModal(!modal);

    // Gestiona la selección de producto para pasarlo a la ventana modal
    const handleSetProducto = (producto) => {
        setProducto(producto);
    };

    // Gestiona la adicción de productos al Resumen de pedido
    const handleAgregarPedido = ({ categoria_id, ...producto }) => {
        if (pedido.some((pedidoState) => pedidoState.id === producto.id)) {
            const pedidoActualizado = pedido.map((pedidoState) =>
                pedidoState.id === producto.id ? producto : pedidoState
            );
            setPedido(pedidoActualizado);
            toast.success('Guardado correctamente!');
        } else {
            setPedido([...pedido, producto]);
            toast.success('¡Agregado al pedido!');
        }
    };

    const handleEditarCantidad = (id) => {
        const productoActualizar = pedido.filter(
            (producto) => producto.id === id
        )[0];
        setProducto(productoActualizar);
        setModal(!modal);
    };

    const handleEliminarProductoPedido = (id) => {
        const pedidoActualizado = pedido.filter(
            (producto) => producto.id !== id
        );
        setPedido(pedidoActualizado);
        toast.success('¡Eliminado del pedido!');
    };

    const handleSubmitNuevoPedido = async (logout) => {
        try {
            const response = await clienteAxios.post(
                '/api/pedidos',
                {
                    total,
                    productos: pedido.map((producto) => {
                        return {
                            id: producto.id,
                            cantidad: producto.cantidad,
                        };
                    }),
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'AUTH_TOKEN'
                        )}`,
                    },
                }
            );

            toast.success(response.data.message);
            // Limpiar pedido
            setTimeout(() => {
                setPedido([]);
            }, 1000);

            setTimeout(() => {
                logout();
            }, 1000);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClickCompletarPedido = async (id) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            await clienteAxios.put(`/api/pedidos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error(error);
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
                        handleEditarCantidad,
                        handleEliminarProductoPedido,
                        total,
                        handleSubmitNuevoPedido,
                        handleClickCompletarPedido,
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
                        handleEditarCantidad,
                        handleEliminarProductoPedido,
                        total,
                        handleSubmitNuevoPedido,
                        handleClickCompletarPedido,
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

