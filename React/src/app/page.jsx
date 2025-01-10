'use client';

import { useRouter } from 'next/navigation';

const Home = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 flex flex-col justify-center items-center text-center px-6">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                    Bem-vindo ao Gerenciador de Eventos!
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                    Organize e acompanhe seus eventos com facilidade e praticidade.
                </p>
                <button
                    onClick={() => router.push('/eventos')}
                    className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition"
                >
                    Acessar Eventos
                </button>
            </main>
        </div>
    );
};
export default Home;