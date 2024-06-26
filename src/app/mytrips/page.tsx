"use client";

import {useEffect, useState} from "react";
import axios from "axios";
import {TripCard} from "@/components/component/trip-card";
import useUser from "@/hooks/useUser";
import {useRouter} from "next/navigation";
import {SpinnerWheel} from "@/components/component/spinner-wheel";
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

    const {userData, loading: userLoading} = useUser();
    const router = useRouter();
    const [trips, setTrips] = useState<TripData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = sessionStorage.getItem('access_token');

        if (!token) {
            router.push('/login');
            return;
        }
        if (userData) {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            axios.get(`${apiUrl}/api/users/${userData.id}/trips`, config)
                .then(response => {
                    setTrips(response.data);
                    setLoading(false);
                })
                .catch(err => {
                    setLoading(false);
                    if (err.response && err.response.status === 404) {
                        // Gérer spécifiquement l'erreur 404
                        setError('Vous n\'avez actuellement pas de trajet.');
                    } else {
                        console.error(err);
                        setError('Une erreur est survenue lors de la récupération des trajets.');
                    }
                });
        }
    }, [userData]);

    if (userLoading || loading) {
        return <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="fixed inset-0 flex items-center justify-center">
                <SpinnerWheel/>
            </div>
        </main>;
    }

    return (
        <>
            <main className="flex min-h-screen flex-col items-center p-24">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        {!loading && !userLoading ? (
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8 md:text-4xl">
                                {userData?.first_name}, voici vos trajets
                            </h1>
                        ) : (
                            <h1></h1>
                        )}
                        {error ? (
                            <p className="text-gray-500">{error}</p>
                        ) : (
                            trips.map(trip => (
                                <TripCard key={trip.id} trip={trip}/>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}

