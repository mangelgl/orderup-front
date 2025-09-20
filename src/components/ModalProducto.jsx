import { useState, useEffect } from 'react';
import { useRestaurante } from '../hooks/useRestaurante';
import { formatearDinero } from '../helpers';

export default function ModalProducto() {
	const { producto, handleClickModal, handleAgregarPedido, pedido } =
		useRestaurante();
	const [cantidad, setCantidad] = useState(1);
	const [edicion, setEdicion] = useState(false);

	// Se ejecuta cuando la dependencia existe y cambia
	useEffect(() => {
		// Actualiza la cantidad del modal cuando el producto ya está en el pedido
		if (pedido.some((pedidoState) => pedidoState.id === producto.id)) {
			const productoEdicion = pedido.filter(
				(pedidoState) => pedidoState.id === producto.id
			)[0];

			setCantidad(productoEdicion.cantidad);
			setEdicion(true);
		}
	}, [pedido]);

	return (
		<div className="md:flex gap-10">
			<div className="md:w-1/3">
				<img
					src={`img/${producto.imagen}.jpg`}
					alt={`Imagen producto ${producto.nombre}`}
				/>
			</div>
			<div className="md:w-2/3">
				<div className="flex justify-end">
					<button
						type="button"
						onClick={handleClickModal}
						className="cursor-pointer">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-6">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18 18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<h1 className="text-3xl font-bold mt-5">{producto.nombre}</h1>
				<p className="mt-5 font-black text-5xl text-amber-500">
					{formatearDinero(producto.precio)}
				</p>

				<div className="flex gap-4 mt-5">
					<button
						type="button"
						onClick={() => {
							if (cantidad <= 1) return;
							setCantidad(cantidad - 1);
						}}
						className="cursor-pointer">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="size-6">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
							/>
						</svg>
					</button>
					<p className="text-3xl">{cantidad}</p>
					<button
						type="button"
						onClick={() => {
							if (cantidad >= 5) return;
							setCantidad(cantidad + 1);
						}}
						className="cursor-pointer">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="size-6">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
							/>
						</svg>
					</button>
				</div>

				<button
					type="button"
					onClick={() => {
						handleAgregarPedido({ ...producto, cantidad });
						handleClickModal();
					}}
					className="bg-indigo-600 hover:bg-indigo-800 p-5 py-2 mt-5 text-white font-bold uppercase rounded-lg cursor-pointer">
					{edicion ? 'Guardar cambios' : 'Agregar al pedido'}
				</button>
			</div>
		</div>
	);
}

