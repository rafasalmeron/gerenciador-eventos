'use client'
import { useState } from 'react';
import api from "@/service/api";
import {useToast} from "@/context/ToastContext";

const Cadastro = ({setActiveTab}) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const { addToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            await api.post('/cadastro', { nome, email, senha });
            addToast('Cadastro realizado com sucesso!', 'success');
            setActiveTab('login');
        } catch (error) {
            addToast('Erro ao realizar cadastro. Tente novamente.', 'danger');
            console.error('Erro de cadastro', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    placeholder="Seu nome completo"
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    placeholder="example@domain.com"
                />
            </div>

            <div>
                <label htmlFor="senha" className="block text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                <input
                    type="password"
                    id="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    placeholder="••••••••"
                />
            </div>

            <div>
                <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-900 dark:text-white">Confirmar Senha</label>
                <input
                    type="password"
                    id="confirmarSenha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    placeholder="••••••••"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 text-white rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
        </form>
    );
};
export default Cadastro;