'use client'
import { useState } from 'react';
import Login from "@/components/login/Login";
import Cadastro from "@/components/cadastro/Cadastro";

const Auth = () => {
    const [activeTab, setActiveTab] = useState('login');

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-center space-x-4 mb-6">
                    <button
                        className={`w-1/2 py-2 text-center font-medium ${activeTab === 'login' ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('login')}
                    >
                        Login
                    </button>
                    <button
                        className={`w-1/2 py-2 text-center font-medium ${activeTab === 'cadastro' ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('cadastro')}
                    >
                        Cadastro
                    </button>
                </div>
                <div className="min-h-96 ">
                    {activeTab === 'login' ? <Login />
                        : <Cadastro setActiveTab={setActiveTab}/>
                    }
                </div>
            </div>
        </section>
    );
};
export default Auth;