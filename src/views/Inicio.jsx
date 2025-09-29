import useSWR from 'swr';
import Producto from '../components/Producto';
import { useRestaurante } from '../hooks/useRestaurante';
import { clienteAxios } from '../helpers';

export default function Inicio() {
    const { categorias, categoriaActual } = useRestaurante();

    // Consulta SWR
    const fetcher = () =>
        clienteAxios('/api/productos', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`,
            },
        }).then((data) => data.data);
    const { data, error, isLoading } = useSWR('api/productos', fetcher, {
        refreshInterval: 60000,
    });

    if (isLoading) return 'Cargando...';

    const productos = data.data.filter(
        (producto) => producto.categoria_id === categoriaActual.id
    );

    return (
        <>
            <h1 className="text-4xl font-black">{categoriaActual.nombre}</h1>
            <p>Elige y personaliza tu pedido a continuación</p>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-10">
                {productos.map((producto) => (
                    <Producto
                        key={producto.id}
                        producto={producto}
                        botonAgregar={true}
                    />
                ))}
            </div>
        </>
    );
}

