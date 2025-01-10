'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/service/api';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const { addToast } = useToast();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/login', { email, senha });
            login(res.data);

            if (rememberMe) {
                localStorage.setItem('email', email);
                localStorage.setItem('senha', senha);
            } else {
                localStorage.removeItem('email');
                localStorage.removeItem('senha');
            }
            addToast('Login realizado com sucesso!', 'success');
            router.push('/');
        } catch (error) {
            addToast('Email ou senha inválidos!', 'danger');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        const savedSenha = localStorage.getItem('senha');
        if (savedEmail && savedSenha) {
            setEmail(savedEmail);
            setSenha(savedSenha);
            setRememberMe(true);
        }
    }, []);

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
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
                    name="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    placeholder="••••••••"
                />
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="remember-me" className="ml-2 text-sm text-gray-500 dark:text-gray-300">Lembrar de mim</label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:underline dark:text-blue-500">Esqueceu a senha?</a>
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 text-white rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
                {loading ? 'Entrando...' : 'Entrar'}
            </button>
        </form>
    );
};
export default Login;