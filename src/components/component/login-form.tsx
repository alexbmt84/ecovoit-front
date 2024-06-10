/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/jFUcNGYxhd3
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

 import { Inter } from 'next/font/google'

 inter({
 subsets: ['latin'],
 display: 'swap',
 })

 To read more about using these font, please visit the Next.js documentation:
 - App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
 - Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
 **/

"use client";

import {useState} from 'react';
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import Link from "next/link"
import useAuth from '@/hooks/useAuth';
import useCSRFToken from "@/hooks/useCSRFToken";
import {useRouter} from "next/navigation";
import {Navbar} from "@/components/component/navbar";

export function LoginForm() {
    useCSRFToken();

    const router = useRouter();
    const {login, loading, error} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        // @ts-ignore
        await login(email, password);
        router.push('/home');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
            <div className="mx-auto w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900">
                <div className="space-y-4">
                    <div className="text-center">
                        <h1 className="text-3xl mb-5 font-bold">Bienvenue !</h1>
                        <p className="text-gray-500 dark:text-gray-400 mb-5">Connectez-vous à votre compte</p>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" value={email} onChange={e => setEmail(e.target.value)}
                                   placeholder="m@example.com" required type="email" name={"email"}/>
                        </div>
                        <div>
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input id="password" value={password} onChange={e => setPassword(e.target.value)}
                                   placeholder="••••••••" required type="password" name={"password"}/>
                        </div>
                        <Button className="w-full" type="submit" disabled={loading}>
                            Connexion
                        </Button>
                    </form>
                    <div className="flex items-center justify-between">
                        <Link
                            className="text-sm mx-auto font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="#"
                        >
                            Mot de passe oublié?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
