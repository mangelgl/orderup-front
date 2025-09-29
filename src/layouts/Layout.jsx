import { Outlet } from 'react-router-dom';
import Modal from 'react-modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import Sidebar from '../components/Sidebar';
import Resumen from '../components/Resumen';
import { useRestaurante } from '../hooks/useRestaurante';
import ModalProducto from '../components/ModalProducto';
import { useAuth } from '../hooks/useAuth';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export default function Layout() {
    useAuth({ middleware: 'auth' });
    const { modal } = useRestaurante();

    return (
        <>
            <div className="md:flex">
                <Sidebar />
                <main className="flex-1 h-screen overflow-y-scroll bg-gray-100 p-5">
                    <Outlet />
                </main>
                <Resumen />
            </div>

            <Modal isOpen={modal} style={customStyles}>
                <ModalProducto />
            </Modal>

            <ToastContainer />
        </>
    );
}

