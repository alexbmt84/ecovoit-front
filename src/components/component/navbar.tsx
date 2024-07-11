"use client";

import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetClose, SheetContent, Sheet } from "@/components/ui/sheet";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProfileDropdown } from "@/components/component/profile-dropdown";
import { useAuth } from "@/context/authContext";
import { XIcon } from "@/components/icons/XIcon";
import { MenuIcon } from "@/components/icons/MenuIcon";
import { EcovoitLogo } from "@/components/logos/EcovoitLogo";

// @ts-ignore
export function Navbar() {

    const router = useRouter();
    const { isAuthenticated, logout } = useAuth();

    const redirectToLogin = () => {
        router.push('/login');
    };

    return (
        <header className="relative">
            <div className="absolute inset-0 bg-white dark:bg-gray-950 opacity-25"></div>
            <div className="relative flex h-16 w-full items-center justify-between px-4 shadow-sm md:px-6">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="md:hidden opacity-100" size="icon" variant="outline">
                            <MenuIcon className="h-6 w-6" />
                            <span className="sr-only">Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-[300px] bg-white shadow-lg dark:bg-gray-950 opacity-100" side="left">
                        {isAuthenticated ? (
                            <div className="flex h-16 items-center justify-between px-4">
                                <Link className="flex items-center gap-2 text-lg font-semibold" href={"/home"}>
                                    <EcovoitLogo />
                                </Link>
                                <SheetClose>
                                    <XIcon className="h-6 w-6" />
                                </SheetClose>
                            </div>
                        ) : (
                            <div className="flex h-16 items-center justify-between px-4">
                                <Link className="flex items-center gap-2 text-lg font-semibold" href="/">
                                    <EcovoitLogo />
                                </Link>
                                <SheetClose>
                                    <XIcon className="h-6 w-6" />
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
                                        <CalendarDaysIcon className="h-5 w-5" />
                                        Reserver un trajet
                                    </Link>
                                    <Link
                                        className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                                        href={"/mytrips"}
                                    >
                                        <TargetIcon className="h-5 w-5" />
                                        Mes trajets
                                    </Link>
                                    <Link
                                        className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                                        href="#"
                                    >
                                        <UsersIcon className="h-5 w-5" />
                                        M&apos;e-co-voit
                                    </Link>

                                    <div className="flex items-center gap-2">
                                        <ProfileDropdown onLogout={logout} size="small"></ProfileDropdown>
                                    </div>
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
                        <EcovoitLogo />
                    </Link>
                ) : (
                    <Link className="flex items-center gap-2 text-lg font-semibold" href="/">
                        <EcovoitLogo />
                    </Link>
                )}
                <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                    {isAuthenticated ? (
                        <>
                            <Link
                                className="p-2 transition-colors rounded-md border border-cyan-700 bg-cyan-100 text-gray-500 font-bold hover:text-black dark:bg-black dark:text-gray-500 dark:hover:bg-cyan-500/50"
                                href={"/home"}
                            >
                                Reserver un trajet
                            </Link>
                            <Link
                                className="p-2 transition-colors rounded-md border border-cyan-700 bg-cyan-100 text-gray-500 font-bold hover:text-black dark:bg-black dark:text-gray-500 dark:hover:bg-cyan-500/50"
                                href={"/mytrips"}
                            >
                                Mes trajets
                            </Link>
                            <Link
                                className="p-2 transition-colors rounded-md border border-cyan-700 bg-cyan-100 text-gray-500 font-bold hover:text-black dark:bg-black dark:text-gray-500 dark:hover:bg-cyan-500/50"
                                href="#"
                            >
                                M&apos;e-co-voit
                            </Link>
                            <ProfileDropdown onLogout={logout} />
                        </>
                    ) : (
                        <Button onClick={redirectToLogin}
                                className="transition-colors hover:text-gray-500 dark:hover:text-gray-50">Connexion</Button>
                    )}
                </nav>
            </div>
        </header>
    );
}

// @ts-ignore
function CalendarDaysIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
            <path d="M8 14h.01" />
            <path d="M12 14h.01" />
            <path d="M16 14h.01" />
            <path d="M8 18h.01" />
            <path d="M12 18h.01" />
            <path d="M16 18h.01" />
        </svg>
    );
}

// @ts-ignore
function TargetIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
        </svg>
    );
}

// @ts-ignore
function UsersIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}
