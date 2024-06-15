/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/ORtESNY01vW
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
import {CardTitle, CardDescription, CardHeader, CardContent, Card} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {JSX, SVGProps, useEffect, useState} from "react"
import {useRouter} from "next/navigation";
import axios from "axios";
import Link from "next/link";
import {Loader} from "@/components/component/loader";

export function ListTrips() {

    interface UserData {
        id: number;
        first_name: string;
        last_name: string;
    }

    type TripData = {
        id: number;
        departure: string;
        destination: string;
        distance: number;
        status: number;
        vehicle: {model:string};
        model: string;
        departure_time: string;
        users: UserData[];
    };

    const router = useRouter();
    const [trips, setTrips] = useState<TripData[]>([]);
    const [loading, setLoading] = useState(true);

    // @ts-ignore
    const redirectTripId = (id) => {
        router.push(`/trips/${id}`)
    }

    useEffect(() => {

        const getTrips = async () => {

            setLoading(true);

            try {

                const token = sessionStorage.getItem('access_token');

                if (!token) {
                    router.push('/login');
                    return;
                }

                const response = await axios.get('https://api.ecovoit.tech/api/trips?limit=10', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setTrips(response.data);
            } catch (error) {
                console.error('Failed to fetch trips data:', error);
            } finally {
                setLoading(false);
            }

        }
        getTrips();

    }, []);

    function toTitleCase(str:string) {
        return str.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
            }
        );
    }

    // @ts-ignore
    const handleSubmit = async (departure, arrival, startDate, model, user) => {

        // Constructing the URL with query parameters
        // @ts-ignore
        // @ts-ignore
        const searchParams = new URLSearchParams({
            departure: departure,
            arrival: arrival,
            startDate: startDate,
            user: user,
            vehicle: model,
            endDate: '',
            passengers: '',
        }).toString();

        // Navigate to the search results page with parameters
        router.push(`/search-results?${searchParams}`);
    };

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle>On vous propose</CardTitle>
                <CardDescription>Découvrez et rejoignez les covoiturages proches de chez vous.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-auto max-h-[400px]">
                {loading ? (
                    <div className="inset-0 flex items-center justify-center mt-32">
                        <Loader/>
                    </div>
                ) : (
                    trips.map((trip, index) => (
                        <div key={index} className="grid gap-4">
                            <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-md dark:bg-gray-800">
                                <div className="flex-1 grid gap-1">
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <MapPinIcon className="w-4 h-4"/>
                                        <span>{toTitleCase(trip.departure)}</span>
                                        <ArrowRightIcon className="w-4 h-4"/>
                                        <span>{toTitleCase(trip.destination)}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <ClockIcon className="h-4 w-4"/>
                                        <div className={"text-lg font-semibold"}>
                                            {
                                                new Date(trip.departure_time).toLocaleDateString("fr", {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })
                                            }
                                        </div>
                                    </div>
                                    {trip.users && trip.users.length > 0 && (
                                        <div className={"flex flex-row \"text-sm text-gray-500 space-x-2"}>

                                            <UserIcon className="w-4 h-4 mt-1"/>
                                            <ul>
                                                <Link href="#">
                                                    <li>{trip.users[0].first_name}</li>
                                                </Link>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <Button size="sm" variant="outline" onClick={() => handleSubmit(trip.departure, trip.destination, trip.departure_time, trip.vehicle.model, trip.users[0].first_name)}>
                                    Voir
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    )
}

function ArrowRightIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
