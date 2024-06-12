/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/Dot2toYsY84
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {CardTitle, CardHeader, CardContent, CardFooter, Card} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"

export function SearchTripCard() {
    return (
        <div className="flex flex-col">
            <Card className="w-full sm:w-[550px]">
                <CardHeader>
                    <CardTitle className={"text-center"}>Où allez-vous aujourd&apos;hui ?</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 mt-5">
                            <MapPinIcon className="h-5 w-5 text-gray-400"/>
                            <Input placeholder="Ville de départ"/>
                        </div>
                        <div className="flex items-center space-x-2 py-3">
                            <MapPinIcon className="h-5 w-5 text-gray-400"/>
                            <Input placeholder="Ville d'arrivée"/>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CalendarDaysIcon className="h-5 w-5 text-gray-400"/>
                            <Input placeholder="Mardi 10 octobre"/>
                        </div>
                        <Button className="justify-start text-blue-600" variant="ghost">
                            Ajouter un retour
                        </Button>
                        <div className="flex items-center space-x-2">
                            <UserIcon className="h-5 w-5 text-gray-400"/>
                            <Input placeholder="1 passager(ère)"/>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full mt-5 mb-3">Go !</Button>
                </CardFooter>
            </Card>
        </div>
    )
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
            <path d="M8 2v4"/>
            <path d="M16 2v4"/>
            <rect width="18" height="18" x="3" y="4" rx="2"/>
            <path d="M3 10h18"/>
            <path d="M8 14h.01"/>
            <path d="M12 14h.01"/>
            <path d="M16 14h.01"/>
            <path d="M8 18h.01"/>
            <path d="M12 18h.01"/>
            <path d="M16 18h.01"/>
        </svg>
    )
}

// @ts-ignore
function MapPinIcon(props) {
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
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
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
