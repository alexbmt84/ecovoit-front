"use client";

import {Navbar} from "@/components/component/navbar";
import {Landing} from "@/components/component/landing";
import useAuth from "@/hooks/useAuth";
import {useIsLoggedIn} from "@/hooks/useIsLoggedIn";

export default function Page() {

    const {logout} = useAuth();
    const isLoggedIn = useIsLoggedIn();

    return (
        <>
            <Navbar onLogout={logout} isLoggedIn={isLoggedIn}/>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
             <Landing/>
            </main>
        </>
    );
}
