import { createRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
    const emailRef = createRef();
    const passwordRef = createRef();

    const [errores, setErrores] = useState([]);
    const { login } = useAuth({
        middleware: 'guest',
        url: '/',
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        const datos = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        login(datos, setErrores);
    };
    return (
        <>
            <h1 className="text-4xl font-black">Iniciar sesión</h1>
            <p>Para crear un pedido debes iniciar sesión</p>

            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <form onSubmit={handleLogin} noValidate>
                    {errores
                        ? errores.map((error, i) => (
                              <Alerta key={i}>{error}</Alerta>
                          ))
                        : null}
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
                            ref={emailRef}
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
                            ref={passwordRef}
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
                <Link to="/auth/registro">
                    No tienes una cuenta? ¡Regístrate!
                </Link>
            </nav>
        </>
    );
}

