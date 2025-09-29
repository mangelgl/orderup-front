import useSWR from 'swr';
import { clienteAxios } from '../helpers';
import Producto from '../components/Producto';

export default function Productos() {
    const token = localStorage.getItem('AUTH_TOKEN');
    const fetcher = () =>
        clienteAxios('/api/productos', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((datos) => datos.data);
    const { data, error, isLoading } = useSWR('api/productos', fetcher, {
        refreshInterval: 1000,
    });
    if (isLoading) return <p>Cargando...</p>;

    console.log(data);

    return (
        <div>
            <h1 className="text-4xl font-black">Productos</h1>
            <p>Maneja la disponibilidad desde aquí</p>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-10">
                {data.data.map((producto) => (
                    <Producto
                        key={producto.id}
                        producto={producto}
                        botonDisponible={true}
                    />
                ))}
            </div>
        </div>
    );
}

