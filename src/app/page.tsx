"use client";

import {useEffect, useState} from 'react';
import {Landing} from "@/components/component/landing";
import {useAuth} from "@/context/authContext";
import {useRouter} from "next/navigation";

export default function Page() {
    const {isAuthenticated, logout} = useAuth();

    const router = useRouter();
    useEffect(() => {
        if (isAuthenticated) {
            router.push("/home");
        }
    }, [isAuthenticated, router]);

    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <Landing/>
            </main>
        </>
    );
}
