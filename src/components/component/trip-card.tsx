import {Card, CardHeader, CardContent} from "@/components/ui/card"
import {MapPinIcon} from "@/components/icons/MapPinIcon";
import useUser from "@/hooks/useUser";

export function TripCard(props) {
    const {userData} = useUser();
    return (
        <Card className="shadow-md rounded-lg max-w-md mx-auto lg:min-w-[350px] mt-5 mb-3">
            <CardHeader
                className="bg-[#F3F4F6] text-primary-foreground p-4 flex flex-row items-center rounded-t-md justify-center">
                <div className="flex items-center gap-2">
                    <CarIcon className="w-5 h-5 mt-1"/>
                    <span className="font-medium mt-1.5">{props.trip.departure}</span>
                </div>
                <ArrowRightIcon className="w-5 h-5 mr-2 ml-2 mt-1.5"/>
                <div className="flex items-center gap-2">
                    <span className="font-medium">{props.trip.destination}</span>
                    <MapPinIcon className="w-5 h-5"/>
                </div>
            </CardHeader>
            <CardContent className="p-6 grid gap-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <UsersIcon className="w-5 h-5 text-muted-foreground"/>
                        <span className="text-muted-foreground">2 Passengers</span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="w-5 h-5 text-muted-foreground"/>
                            <span className="text-muted-foreground">
                            {
                                new Date(props.trip.departure_time).toLocaleDateString("fr", {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                            }
                             </span>
                        </div>
                        <ClockIcon className="w-5 h-5 text-muted-foreground"/>
                        <span className="text-muted-foreground">
                              {
                                  new Date(props.trip.departure_time).getUTCHours()
                              }
                            h
                            {
                                new Date(props.trip.departure_time).getMinutes() === 0 ?
                                    new Date(props.trip.departure_time).getMinutes() + "0" :
                                    new Date(props.trip.departure_time).getMinutes()
                            }
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function ArrowRightIcon(props) {
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
            <path d="M5 12h14"/>
            <path d="m12 5 7 7-7 7"/>
        </svg>
    )
}


function CalendarIcon(props) {
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
        </svg>
    )
}


function CarIcon(props) {
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
                d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
            <circle cx="7" cy="17" r="2"/>
            <path d="M9 17h6"/>
            <circle cx="17" cy="17" r="2"/>
        </svg>
    )
}


function ClockIcon(props) {
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
            <polyline points="12 6 12 12 16 14"/>
        </svg>
    )
}


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
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
    )
}