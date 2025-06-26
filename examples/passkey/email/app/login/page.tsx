'use client';

import { login, useSession } from "@astra-void/auth-kit/react";
import { loginPasskey } from "@astra-void/auth-kit/react/passkey";
import Link from "next/link";
import { FormEvent, useState } from "react";

const LoginPage = () => {
    const { data: session } = useSession();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginType, setLoginType] = useState<'default' | 'passkey'>('default');
    const [currentTab, setCurrentTab] = useState(0);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (currentTab === 0 && email) {
            setCurrentTab(1);
            return;
        } else if (currentTab === 1 && password && loginType === 'default') {
            await login({ email, password });
            return;
        } else if (currentTab === 1 && loginType === 'passkey') {
            await loginPasskey({ email });
            return;
        }
    };

    if (session.user){
        return (
            <div className='flex justify-center items-center min-h-screen dark:bg-black dark:text-white'>
                <div className='text-center'>
                    <h1 className='text-3xl font-bold p-4'>Already logged in</h1>
                    <Link className='text-blue-500 hover:underline focus:text-blue-700' href="/">
                        Go back to home
                    </Link>
                </div>
            </div>
        )
    }

    if (currentTab === 0) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen gap-2">
                <form className="flex flex-col space-y-4" onSubmit={(e) => onSubmit(e)}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="p-2 border border-gray-300 rounded-lg"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Next
                    </button>
                </form>
            </div>
        );
    } else if (currentTab === 1) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen gap-2">
                <form className="flex flex-col space-y-4" onSubmit={(e) => onSubmit(e)}>
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-2 border border-gray-300 rounded-lg"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        onClick={() => setLoginType('default')}
                        className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Login
                    </button>
                    <button
                        type="submit"
                        onClick={() => setLoginType('passkey')}
                        className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Passkey
                    </button>
                </form>
            </div>
        );
    }

    return (
        <>
        </>
    );
}
 
export default LoginPage;