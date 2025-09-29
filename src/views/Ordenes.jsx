import useSWR from 'swr';
import { clienteAxios } from '../helpers';
import { useRestaurante } from '../hooks/useRestaurante';

export default function Ordenes() {
    const token = localStorage.getItem('AUTH_TOKEN');

    const fetcher = () =>
        clienteAxios('/api/pedidos', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    const { data, error, isLoading } = useSWR('api/pedidos', fetcher, {
        refreshInterval: 60000,
    });
    const { handleClickCompletarPedido } = useRestaurante();

    if (isLoading) return <p>Cargando...</p>;

    return (
        <div>
            <h1 className="text-4xl font-black">Órdenes</h1>
            <p>Administra las órdenes desde aquí</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.data.data.map((pedido) => (
                    <div
                        key={pedido.id}
                        className="p-5 bg-white shadow space-y-2 border-b">
                        <div className="text-xl font-bold text-slate-600">
                            Contenido del pedido
                            <p className="text-sm">ID: {pedido.id}</p>
                        </div>
                        <div className="border-b border-b-slate-200 last-of-type:border-none py-4">
                            {pedido.productos.map((producto) => (
                                <p key={producto.id}>
                                    {producto.pivot.cantidad}x {producto.nombre}
                                </p>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() =>
                                handleClickCompletarPedido(pedido.id)
                            }
                            className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 rounded-lg uppercase font-bold text-white text-center cursor-pointer">
                            Completar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

