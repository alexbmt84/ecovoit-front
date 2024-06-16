"use client";

import {Button} from "@/components/ui/button"
import {SheetTrigger, SheetClose, SheetContent, Sheet} from "@/components/ui/sheet"
import Link from "next/link"
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/authContext";
import {BriefcaseIcon} from "@/components/icons/BriefcaseIcon";
import {XIcon} from "@/components/icons/XIcon";
import {MenuIcon} from "@/components/icons/MenuIcon";
import {HomeIcon} from "@/components/icons/HomeIcon";
import {MailIcon} from "@/components/icons/MailIcon";
import {InfoIcon} from "@/components/icons/InfoIcon";
import {EcovoitLogo} from "@/components/logos/EcovoitLogo";

// @ts-ignore
export function Navbar() {

    const router = useRouter();
    const {isAuthenticated, logout} = useAuth();


    const redirectToLogin = () => {
        router.push('/login');
    };

    return (
        <header
            className="flex h-16 w-full items-center justify-between bg-white px-4 shadow-sm dark:bg-gray-950 md:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button className="md:hidden" size="icon" variant="outline">
                        <MenuIcon className="h-6 w-6"/>
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-[300px] bg-white shadow-lg dark:bg-gray-950" side="left">
                    {isAuthenticated ? (
                        <div className="flex h-16 items-center justify-between px-4">
                            <Link className="flex items-center gap-2 text-lg font-semibold" href={"/home"}>
                                <EcovoitLogo/>
                            </Link>
                            <SheetClose>
                                <XIcon className="h-6 w-6"/>
                            </SheetClose>
                        </div>
                    ) : (
                        <div className="flex h-16 items-center justify-between px-4">
                            <Link className="flex items-center gap-2 text-lg font-semibold" href="/">
                                <EcovoitLogo/>
                            </Link>
                            <SheetClose>
                                <XIcon className="h-6 w-6"/>
                            </SheetClose>
                        </div>
                    )}
                    <nav className="grid gap-4 px-4 py-6">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                                    href={"/home"}
                                >
                                    <HomeIcon className="h-5 w-5"/>
                                    Accueil
                                </Link>
                                <Link
                                    className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                                    href={"/mytrips"}
                                >
                                    <InfoIcon className="h-5 w-5"/>
                                    Mes trajets
                                </Link>
                                <Link
                                    className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                                    href="#"
                                >
                                    <BriefcaseIcon className="h-5 w-5"/>
                                    Services
                                </Link>
                                <Link
                                    className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                                    href="#"
                                >
                                    <MailIcon className="h-5 w-5"/>
                                    Contact
                                </Link>

                                <Button onClick={logout}
                                        className="transition-colors hover:text-gray-900 dark:hover:text-gray-50">Déconnexion</Button>
                            </>
                        ) : (
                            <Button onClick={redirectToLogin}
                                    className="transition-colors hover:text-gray-900 dark:hover:text-gray-50">Connexion</Button>
                        )}
                    </nav>
                </SheetContent>
            </Sheet>
            {isAuthenticated ? (
                <Link className="flex items-center gap-2 text-lg font-semibold" href={"/home"}>
                    <EcovoitLogo/>
                </Link>
            ) : (
                <Link className="flex items-center gap-2 text-lg font-semibold" href="/">
                    <EcovoitLogo/>
                </Link>
            )}
            <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                {isAuthenticated ? (
                    <>
                        <Link
                            className="transition-colors hover:text-gray-500 dark:hover:text-gray-50 text-black" href={"/home"}>
                            Accueil
                        </Link>
                        <Link className="transition-colors hover:text-gray-500 dark:hover:text-gray-50" href={"/mytrips"}>
                            Mes trajets
                        </Link>
                        <Link className="transition-colors hover:text-gray-500 dark:hover:text-gray-50" href="#">
                            Services
                        </Link>
                        <Link className="transition-colors hover:text-gray-500 dark:hover:text-gray-50" href="#">
                            Contact
                        </Link>

                        <Button onClick={logout}
                                className="transition-colors hover:text-gray-500 dark:hover:text-gray-50">Déconnexion</Button>
                    </>
                ) : (
                    <Button onClick={redirectToLogin}
                            className="transition-colors hover:text-gray-500 dark:hover:text-gray-50">Connexion</Button>
                )}
            </nav>
        </header>
    )
}