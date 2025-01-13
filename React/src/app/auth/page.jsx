'use client'

import {useState} from 'react';
import Login from "@/components/login/Login";
import Cadastro from "@/components/cadastro/Cadastro";

const Auth = () => {
    const [activeTab, setActiveTab] = useState('login');

    return (
            <section className="bg-gray-300 min-h-screen flex items-center justify-center">
                <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="flex mb-6">
                        <button
                            className={`w-full py-2 text-center font-medium shadow-inner-white rounded text-gray-50 ${activeTab === 'login' ? 'border-b-2 border-blue-500' : 'text-gray-300'}`}
                            onClick={() => setActiveTab('login')}
                        >
                            Login
                        </button>
                        <button
                            className={`w-full py-2 text-center font-medium shadow-inner-white rounded text-gray-50 ${activeTab === 'cadastro' ? 'border-b-2 border-blue-500' : 'text-gray-300'}`}
                            onClick={() => setActiveTab('cadastro')}
                        >
                            Cadastro
                        </button>
                    </div>
                    <div className="min-h-96 ">
                        {activeTab === 'login' ? <Login/>
                            : <Cadastro setActiveTab={setActiveTab}/>
                        }
                    </div>
                </div>
            </section>
    );
};
export default Auth;