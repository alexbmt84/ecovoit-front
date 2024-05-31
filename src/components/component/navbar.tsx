/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/vXD8ZSRBbtR
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
import {Button} from "@/components/ui/button"
import {SheetTrigger, SheetClose, SheetContent, Sheet} from "@/components/ui/sheet"
import Link from "next/link"
import Image from "next/image";

export function Navbar() {
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
                    <div className="flex h-16 items-center justify-between px-4">
                        <Link className="flex items-center gap-2 text-lg font-semibold" href="#">
                            <EcovoitLogo/>
                        </Link>
                        <SheetClose>
                            <XIcon className="h-6 w-6"/>
                        </SheetClose>
                    </div>
                    <nav className="grid gap-4 px-4 py-6">
                        <Link
                            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                            href="#"
                        >
                            <HomeIcon className="h-5 w-5"/>
                            Accueil
                        </Link>
                        <Link
                            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                            href="#"
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
                    </nav>
                </SheetContent>
            </Sheet>
            <Link className="flex items-center gap-2 text-lg font-semibold" href="#">
                <EcovoitLogo/>
            </Link>
            <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                <Link className="transition-colors hover:text-gray-900 dark:hover:text-gray-50" href="#">
                    Accueil
                </Link>
                <Link className="transition-colors hover:text-gray-900 dark:hover:text-gray-50" href="#">
                    Mes trajets
                </Link>
                <Link className="transition-colors hover:text-gray-900 dark:hover:text-gray-50" href="#">
                    Services
                </Link>
                <Link className="transition-colors hover:text-gray-900 dark:hover:text-gray-50" href="#">
                    Contact
                </Link>
            </nav>
        </header>
    )
}

// @ts-ignore
function BriefcaseIcon(props) {
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
            <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            <rect width="20" height="14" x="2" y="6" rx="2"/>
        </svg>
    )
}


// @ts-ignore
function HomeIcon(props) {
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
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
    )
}


// @ts-ignore
function InfoIcon(props) {
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
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4"/>
            <path d="M12 8h.01"/>
        </svg>
    )
}


// @ts-ignore
function MailIcon(props) {
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
            <rect width="20" height="16" x="2" y="4" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
    )
}


// @ts-ignore
function MenuIcon(props) {
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
            <line x1="4" x2="20" y1="12" y2="12"/>
            <line x1="4" x2="20" y1="6" y2="6"/>
            <line x1="4" x2="20" y1="18" y2="18"/>
        </svg>
    )
}


function EcovoitLogo() {
    return (
        <Image src={"/img/logo.png"} alt={"ecovoit logo"} width={50} height={50} />
    )
}


// @ts-ignore
function XIcon(props) {
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
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
        </svg>
    )
}
