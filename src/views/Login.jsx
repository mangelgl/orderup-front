import { Link } from 'react-router-dom';

export default function Login() {
	return (
		<>
			<h1 className="text-4xl font-black">Iniciar sesión</h1>
			<p>Para crear un pedido debes iniciar sesión</p>

			<div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
				<form>
					<div className="mb-4">
						<label htmlFor="email" className="text-slate-800">
							Email
						</label>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Introduce tu correo electrónico"
							className="mt-2 w-full p-3 bg-gray-50"
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="password" className="text-slate-800">
							Contraseña
						</label>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Introduce tu contraseña"
							className="mt-2 w-full p-3 bg-gray-50"
						/>
					</div>

					<input
						type="submit"
						value="Iniciar sesión"
						className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-5 uppercase font-bold cursor-pointer rounded-lg"
					/>
				</form>
			</div>

			<nav className="mt-5">
				<Link to="/auth/registro">No tienes una cuenta? ¡Regístrate!</Link>
			</nav>
		</>
	);
}

