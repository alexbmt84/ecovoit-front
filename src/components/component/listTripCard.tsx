"use client";

import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";


export function ListTripCard() {

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
        departure_time: string;
        users: UserData[];
    };

    const router = useRouter();
    const [trips, setTrips] = useState<TripData[]>([]);

    useEffect(() => {

        const getTrips = async () => {

            const token = sessionStorage.getItem('access_token');

            if (!token) {
                router.push('/login');
                return;
            }

            const response = await axios.get('https://api.ecovoit.tech/api/trips?limit=3', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setTrips(response.data);

        }
        getTrips();

    }, []);

    return (

        <Card className="w-full sm:w-[550px]">
            <CardHeader>
                <CardTitle className={"text-center"}>On vous propose !</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex flex-col items-center">
                <ScrollArea className="space-y-4">

                    {trips.map((trip, index) => (

                        <div key={index} className="flex items-center space-x-4 mb-3">
                            <Avatar>
                                <AvatarImage src="https://api.multiavatar.com/ecovoit.png"/>
                                <AvatarFallback>Em</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                                <div className="flex items-center space-x-2 font-semibold">
                                    <MapPinIcon className="h-4 w-4 text-gray-400"/>
                                    <div>{trip.departure}</div>
                                </div>
                                <div className="text-sm text-gray-500">
                                    <div className="flex items-center space-x-2">
                                        <ClockIcon className="h-4 w-4"/>
                                        <div>
                                            Depart: {
                                            new Date(trip.departure_time).toLocaleDateString("fr", {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })
                                        }
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 font-semibold">
                                    <MapPinIcon className="h-4 w-4 text-gray-400"/>
                                    <div>{trip.destination}</div>
                                </div>
                                <div className="text-sm text-gray-500">
                                    <div className="flex items-center space-x-2">
                                        <ClockIcon className="h-4 w-4"/>
                                        <div>Arrivée: 8h25</div>
                                    </div>
                                </div>
                                {trip.users && trip.users.length > 0 && (
                                    <div className={"flex flex-row \"text-sm text-gray-500 space-x-2 "}>

                                        <UserIcon className="w-4 h-4 mt-1"/>
                                        <ul>
                                            <li>{trip.users[0].first_name}</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Voir tous les trajets</Button>
            </CardFooter>
        </Card>
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