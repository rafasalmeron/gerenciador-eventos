'use client';

import { useRouter } from 'next/navigation';

const Home = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col bg-gray-200">
            <main className="flex-1 flex flex-col justify-center items-center text-center px-6">
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg">
                    <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
                        <svg className="w-10 h-10 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m4 0h-1v4h-1m-4 0h-1v-4h-1m9-4V9a3 3 0 00-3-3H8a3 3 0 00-3 3v2a3 3 0 003 3h3v1h1m0 1h1m-3-1H8m4 0V9"></path>
                        </svg>
                        Bem-vindo ao Gerenciador de Eventos!
                    </h2>
                    <p className="text-lg text-gray-400 mb-8">
                        Organize e acompanhe seus eventos com facilidade e praticidade.
                    </p>
                    <button
                        onClick={() => router.push('/eventos')}
                        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300"
                    >
                        Acessar Eventos
                    </button>
                </div>
            </main>
            <footer className="py-4 text-center text-gray-900">
                <p>&copy; 2025 Gerenciador de Eventos. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default Home;
