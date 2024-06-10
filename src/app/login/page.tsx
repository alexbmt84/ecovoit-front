"use client";

import {LoginForm} from "@/components/component/login-form";
import {Navbar} from "@/components/component/navbar";
import useAuth from "@/hooks/useAuth";
import {useIsLoggedIn} from "@/hooks/useIsLoggedIn";

export default function Login() {

    const {logout} = useAuth();
    const isLoggedIn = useIsLoggedIn();

    return (
        <>
            <Navbar onLogout={logout} isLoggedIn={isLoggedIn}/>
            <LoginForm/>
        </>
    );
}
