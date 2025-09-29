import { formatearDinero } from '../helpers';
import { useRestaurante } from '../hooks/useRestaurante';

export default function Producto({
    producto,
    botonAgregar = false,
    botonDisponible = false,
}) {
    const { handleClickModal, handleSetProducto, handleClickProductoAgotado } =
        useRestaurante();
    const { nombre, imagen, precio } = producto;

    return (
        <div className="border p-3 shadow bg-white">
            <img
                src={`/img/${imagen}.jpg`}
                alt={`Imagen ${nombre}`}
                className="w-full"
            />

            <div className="p-5">
                <h3 className="text-2xl font-bold">{nombre}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">
                    {formatearDinero(precio)}
                </p>

                {botonAgregar && (
                    <button
                        type="button"
                        onClick={() => {
                            handleClickModal();
                            handleSetProducto(producto);
                        }}
                        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold rounded-lg cursor-pointer">
                        Agregar al carrito
                    </button>
                )}
                {botonDisponible && (
                    <button
                        type="button"
                        onClick={() => {
                            handleClickProductoAgotado(producto.id);
                        }}
                        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold rounded-lg cursor-pointer">
                        Producto agotado
                    </button>
                )}
            </div>
        </div>
    );
}

