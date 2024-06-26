"use client";

import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import axios from "axios";
import {TripCard} from "@/components/component/trip-card";
import {Loader} from "@/components/component/loader";
import {useAuth} from "@/context/authContext";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Page() {
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

    const params = useParams();
    const router = useRouter();
    const [trip, setTrip] = useState<TripData>();
    const {isAuthenticated, logout} = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTrip = async () => {
            setLoading(true);
            const token = sessionStorage.getItem('access_token');
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                const response = await axios.get(`${apiUrl}/api/trips/${params.id}`, {

                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setTrip(response.data);
            } catch (error) {
                console.error('Failed to fetch trip data:', error);
                // Optionally handle errors more gracefully here
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            getTrip();
        }
    }, [params.id]); // Depend on params.id to refetch when it changes

    function toTitleCase(str:string|undefined) {
        return str?.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
            }
        );
    }


    if (loading) {
        return <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="fixed inset-0 flex items-center justify-center">
                <Loader/>
            </div>
        </main>
    }

    return (
        <>
            <main className="flex min-h-screen flex-col items-center p-24">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div>
                        <TripCard key={trip?.id}
                                  tripDeparture={toTitleCase(trip?.departure)}
                                  tripDestination={toTitleCase(trip?.destination)}
                                  tripDriverFirstName={trip?.users[0].first_name}
                                  tripDriverLastName={trip?.users[0].last_name}
                        />
                    </div>
                </div>
            </main>
        </>

    );
}
