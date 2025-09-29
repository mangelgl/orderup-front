import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { clienteAxios } from '../helpers';

export const useAuth = ({ middleware, url }) => {
    const token = localStorage.getItem('AUTH_TOKEN');
    const navigate = useNavigate();

    // Revalida si existe usuario cada cierto tiempo
    const {
        data: user,
        error,
        isLoading,
        mutate,
    } = useSWR('/api/user', () =>
        clienteAxios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.data)
            .catch((error) => {
                // Optional chaining
                // Si el objeto que usa el operador es undefined o null, la expresión
                // se evalúa a undefined en lugar de lanzar un error
                throw Error(error?.response?.data?.errors);
            })
    );
    const login = async (datos, setErrores) => {
        try {
            const { data } = await clienteAxios.post('/api/login', datos);
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([]);
            await mutate(); // Revalida la información de usuario una vez se logea el usuario
        } catch (error) {
            console.error(error);
            setErrores(Object.values(error.response.data.errors));
        }
    };
    const registro = async (datos, setErrores) => {
        try {
            const { data } = await clienteAxios.post('/api/registro', datos);
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([]);
            await mutate();
        } catch (error) {
            setErrores(Object.values(error.response.data.errors));
        }
    };
    const logout = async () => {
        try {
            await clienteAxios.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            localStorage.removeItem('AUTH_TOKEN');
            await mutate(undefined);
        } catch (error) {
            console.error(error);
            throw Error(error?.response?.data?.errors);
        }
    };

    useEffect(() => {
        if (middleware === 'guest' && url && user) {
            navigate(url);
        }

        if (middleware === 'guest' && user?.admin) {
            navigate('/admin');
        }

        if (middleware === 'admin' && !user?.admin && !isLoading) {
            navigate('/');
        }

        if (middleware === 'auth' && error) {
            navigate('/auth/login');
        }
    }, [user, error]);

    return {
        login,
        registro,
        logout,
        user,
    };
};

