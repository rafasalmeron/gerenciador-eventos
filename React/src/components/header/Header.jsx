'use client';

import {useAuth} from "@/context/AuthContext";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useToast} from "@/context/ToastContext";
import Link from "next/link";

const Header = () => {
    const { isAuthenticated, logout } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const { addToast } = useToast();

    const handleAuthAction = () => {
        if (isAuthenticated) {
            logout();
            router.push('/auth');
            addToast('Deslogado com sucesso!', 'success');
        } else {
            router.push('/auth');
        }
        setShowModal(false);
    };

    return (
        <header className="w-full bg-gradient-to-r from-blue-700 to-blue-900 py-4 px-6 flex justify-between items-center relative">
            <Link
                className="text-white text-2xl font-bold"
                rel="preload"
                href="/" >
                Gerenciador de Eventos
            </Link>
            <div className="relative">
                <button
                    className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-blue-600 hover:bg-gray-200"
                    onClick={() => setShowModal((prev) => !prev)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 14.25a4.5 4.5 0 01-7.5 0m7.5 0a4.5 4.5 0 00-7.5 0m7.5 0V16.5a6 6 0 01-6 6m0-6v2.25a6 6 0 01-6-6m6-6a4.5 4.5 0 110 9m0-9a4.5 4.5 0 110-9"
                        />
                    </svg>
                </button>

                {showModal && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                        <button
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={handleAuthAction}
                        >
                            {isAuthenticated ? 'Logout' : 'Login'}
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
export default Header;