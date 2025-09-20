import { useRestaurante } from '../hooks/useRestaurante';
import ResumenProducto from './ResumenProducto';

export default function Resumen() {
	const { pedido } = useRestaurante();

	return (
		<aside className="md:w-72 h-screen overflow-y-scroll p-5">
			<h1 className="text-4cl font-black">Mi pedido</h1>
			<p className="text-lg my-5">Aquí podrás ver el resumen de tu pedido</p>

			<div className="py-10">
				{pedido.length === 0 ? (
					<p className="text-center text-2xl">No hay productos en tu pedido.</p>
				) : (
					pedido.map((producto) => (
						<ResumenProducto key={producto.id} producto={producto} />
					))
				)}
			</div>

			<p className="text-xl mt-10">Total {''}</p>

			<form className="w-full">
				<div className="mt-5">
					<input
						type="submit"
						value="Confirmar pedido"
						className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 rounded-lg uppercase font-bold text-white text-center w-full cursor-pointer"
					/>
				</div>
			</form>
		</aside>
	);
}

