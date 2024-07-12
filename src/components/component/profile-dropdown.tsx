/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/vCSAMVwvYcX
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
import {AvatarImage, AvatarFallback, Avatar} from "@/components/ui/avatar"
import {
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuContent,
    DropdownMenu
} from "@/components/ui/dropdown-menu"
import useUser from "@/hooks/useUser";
import {useRouter} from "next/navigation";

interface ProfileDropdownProps {
    onLogout: () => void;
    size?: 'small' | 'normal'
}

export function ProfileDropdown({onLogout, size = 'normal'}: ProfileDropdownProps) {
    const router = useRouter();
    const avatarSizeClass = size === 'small' ? 'h-5 w-5' : 'h-10 w-10';
    const {userData} = useUser();

    const redirectToProfil = () => {
        router.push('./my-profil');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className={"cursor-pointer"}>
                {userData?.avatar && (
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Avatar className={`${avatarSizeClass}`}>
                            <AvatarImage alt="avatar" src={`${userData?.avatar}`}/>
                            <AvatarFallback>{userData?.first_name}</AvatarFallback>
                        </Avatar>
                        {size === 'small' && <p className="text-sm font-medium">Mon Profil</p>}
                    </div>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-2">
                <DropdownMenuItem onClick={redirectToProfil} className={"cursor-pointer"}>
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage alt="avatar" src={`${userData?.avatar}`}/>
                            <AvatarFallback>{userData?.first_name}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <p className="text-sm font-medium">{userData?.first_name} {userData?.last_name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{userData?.email}</p>
                        </div>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={redirectToProfil} className={"cursor-pointer"}>
                    <SettingsIcon className="h-4 w-4 mr-2"/>
                    <span>Modifier</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout} className={"cursor-pointer"}>
                    <LogOutIcon className="h-4 w-4 mr-2"/>
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

// @ts-ignore
function LogOutIcon(props) {
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
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" x2="9" y1="12" y2="12"/>
        </svg>
    )
}

// @ts-ignore
function SettingsIcon(props) {
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
            <path
                d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
            <circle cx="12" cy="12" r="3"/>
        </svg>
    )
}

// @ts-ignore
function UserIcon(props) {
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
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
        </svg>
    )
}
