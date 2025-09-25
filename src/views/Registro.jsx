import { createRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';

export default function Registro() {
    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();

    const [errores, setErrores] = useState([]);
    const { registro } = useAuth({
        middleware: 'guest',
        url: '/',
    });

    const handleSubmit = async (e) => {
        e.preventDefault(); // cancela el evento si es cancelable

        const datos = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };

        registro(datos, setErrores);
    };

    return (
        <>
            <h1 className="text-4xl font-black">Crea tu cuenta</h1>
            <p>Crea tu cuenta</p>

            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <form onSubmit={handleSubmit} noValidate>
                    {errores
                        ? errores.map((error, i) => (
                              <Alerta key={i}>{error}</Alerta>
                          ))
                        : null}

                    <div className="mb-4">
                        <label htmlFor="name" className="text-slate-800">
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Introduce tu nombre"
                            className="mt-2 w-full p-3 bg-gray-50"
                            ref={nameRef}
                        />
                    </div>
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
                    <div className="mb-4">
                        <label
                            htmlFor="password.confirmation"
                            className="text-slate-800">
                            Repite tu contraseña
                        </label>
                        <input
                            type="password"
                            name="password.confirmation"
                            id="password.confirmation"
                            placeholder="Introduce tu contraseña"
                            className="mt-2 w-full p-3 bg-gray-50"
                            ref={passwordConfirmationRef}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Crear cuenta"
                        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-5 uppercase font-bold cursor-pointer rounded-lg"
                    />
                </form>
            </div>

            <nav className="mt-5">
                <Link to="/auth/login">
                    ¿Ya tienes una cuenta? ¡Inicia sesión!
                </Link>
            </nav>
        </>
    );
}

