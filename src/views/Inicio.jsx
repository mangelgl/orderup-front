import Producto from '../components/Producto';
import { productos as productosData } from '../data/productos';
import { useRestaurante } from '../hooks/useRestaurante';

export default function Inicio() {
	const { categorias, categoriaActual } = useRestaurante();

	const productos = productosData.filter(
		(producto) => producto.categoria_id === categoriaActual.id
	);

	return (
		<>
			<h1 className="text-4xl font-black">{categoriaActual.nombre}</h1>
			<p>Elige y personaliza tu pedido a continuación</p>

			<div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-10">
				{productos.map((producto) => (
					<Producto key={producto.id} producto={producto} />
				))}
			</div>
		</>
	);
}

