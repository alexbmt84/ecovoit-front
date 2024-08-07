"use client";

import {useEffect, useState} from "react";
import axios from "axios";
import {TripCard} from "@/components/component/trip-card";
import useUser from "@/hooks/useUser";
import {useRouter} from "next/navigation";
import {SpinnerWheel} from "@/components/component/spinner-wheel";
import {VehicleData} from "@/hooks/useVehicle";

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
        totalPassengers: number;
        driverName: string;
        driverId: number;
        driverLastName: string;
        started_at: string;
        ended_at: string;
        vehicle: VehicleData;
        users: UserData[];
    };

    const {userData, loading: userLoading} = useUser();
    const router = useRouter();
    const [trips, setTrips] = useState<TripData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [isTripStarted, setIsTripStarted] = useState<boolean>(false);

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
                    const uniqueTrips = Array.from(new Set(response.data.map((trip: { id: number; }) => trip.id)))
                        .map(id => {
                            return response.data.find((trip: { id: number; }) => trip.id === id);
                        });
                    setTrips(uniqueTrips);
                    setLoading(false);
                    setUserId(userData.id);
                })
                .catch(err => {
                    setLoading(false);
                    if (err.response && err.response.status === 404) {
                        setError('Vous n\'avez actuellement pas de trajet.');
                    } else {
                        console.error(err);
                        setError('Une erreur est survenue lors de la récupération des trajets.');
                    }
                });
        }
    }, [userData]);

    const handleDeletedTrip = (tripId: number) => {
        setTrips(trips.filter(trip => trip.id !== tripId));
    }

    if (userLoading || loading) {
        return <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="fixed inset-0 flex items-center justify-center">
                <SpinnerWheel/>
            </div>
        </main>;
    }

    return (
        <>
            <main className="flex min-h-screen flex-col items-center p-24 w-[100%]">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full">
                    <div className="max-w-2xl mx-auto text-center min-w-[100%]">
                        {!loading && !userLoading ? (
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-10 pb-8 md:text-4xl">
                                {userData?.first_name}, voici vos trajets
                            </h1>
                        ) : (
                            <h1></h1>
                        )}
                        {error ? (
                            <p className="text-gray-500">{error}</p>
                        ) : (
                            <div
                                className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full justify-center">

                                {trips.map(trip => (
                                    <TripCard key={trip.id} trip={trip} userId={userId}
                                              handleDeletedTrip={handleDeletedTrip}/>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}

