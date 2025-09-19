import { useRestaurante } from '../hooks/useRestaurante';

export default function Categoria({ categoria }) {
	const { handleClickCategoria, categoriaActual } = useRestaurante();
	const { icono, id, nombre } = categoria;
	const resaltarCategoriaActual = () =>
		categoriaActual.id === id ? 'bg-amber-400' : 'bg-white';
	return (
		<div className={resaltarCategoriaActual()}>
			<button
				type="button"
				onClick={() => handleClickCategoria(id)}
				className="flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer">
				<img
					src={`/img/icono_${icono}.svg`}
					alt="Icono categoria"
					className="w-12"
				/>
				<span className="text-lg font-bold truncate cursor-pointer">
					{nombre}
				</span>
			</button>
		</div>
	);
}

