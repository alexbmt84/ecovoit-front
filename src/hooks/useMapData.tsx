import {useState, useEffect, useCallback} from 'react';
import {useSearchParams, useRouter} from 'next/navigation';
import {fetchTrips, fetchDirections} from '@/requests/api';
import axios from "axios";

type DirectionsResult = google.maps.DirectionsResult | null;

export const useMapData = (tripInformations: (departure: string, arrival: string, distance: string, duration: string, trips: any[], vehicle: (string | null), user: (string | null), currentUserId: (string | null), startDate: string | null) => void, currentDeparture: string, currentArrival: string, currentVehicle: string | null, currentUser: string | null, currentUserId: string | null) => {

    const [directions, setDirections] = useState<DirectionsResult | null>(null);
    const [trips, setTrips] = useState<[]>([]);
    const [user, setUser] = useState(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const departure = searchParams.get('departure');
    const arrival = searchParams.get('arrival');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const passengers = searchParams.get('passengers');
    const vehicle = searchParams.get('vehicle');
    const userId = searchParams.get('user');
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    function formatDuration(duration: string) {
        return duration.replace('hours', 'heures').replace('hour', 'heure')
            .replace('days', 'jours').replace('day', 'jour');
    }

    useEffect(() => {

        const getUser = async () => {

            const token = sessionStorage.getItem('access_token');

            if (!token) {
                router.push('/login');
                return;
            }

            try {
                const response = await axios.get(`${apiUrl}/api/users/${userId}`, {

                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        getUser();
    }, []);

        useEffect(() => {
            async function fetchAllData() {
                const token = sessionStorage.getItem('access_token');
                if (!token) {
                    router.push('/login');
                    return;
                }

                const paramsObj: Record<string, string> = {};
                if (departure) paramsObj.departure = departure;
                if (arrival) paramsObj.arrival = arrival;
                if (startDate) paramsObj.startDate = startDate;
                if (endDate) paramsObj.endDate = endDate;
                if (passengers) paramsObj.passengers = passengers;

                try {
                    const tripsData = await fetchTrips(token, paramsObj);
                    const directionsData = await fetchDirections(departure!, arrival!);

                    if (directionsData) {
                        const route = directionsData.routes[0];
                        const leg: google.maps.DirectionsLeg = route.legs[0];
                        if (leg.distance && leg.duration) {
                            setDirections(directionsData);
                            const formattedDuration = formatDuration(leg.duration.text);
                            setTrips(tripsData || []);
                            console.log('user : ', user);
                            // @ts-ignore
                            tripInformations(departure || '', arrival || '', leg.distance.text.replace("km", ""), formattedDuration, tripsData || [], vehicle, user?.first_name, user?.id, startDate);
                        }
                    } else {
                        console.log("No trips found");
                        setDirections(await getFallbackDirections());
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                }
            }

            async function getFallbackDirections() {
                if (departure && arrival) {
                    return await fetchDirections(departure, arrival);
                }
                return null;
            }

            if (user) {
                fetchAllData();
            }

        }, [departure, arrival, startDate, endDate, passengers, user]);


    useEffect(() => {
        if (currentDeparture && currentArrival) {
            getDirections(currentDeparture, currentArrival);
        }
    }, [currentDeparture, currentArrival]);

    const getDirections = async (departure: string, arrival: string) => {
        try {
            const result = await fetchDirections(departure, arrival);
            if (result) {
                const leg = result.routes[0].legs[0];
                if (leg.distance && leg.duration) {
                    tripInformations(departure, arrival || '', leg.distance.text.replace("km", ""), formatDuration(leg.duration.text), trips, currentVehicle, currentUser, currentUserId, startDate || '');
                }
                setDirections(result);
            }
        } catch (error) {
            console.error(`Error fetching directions: ${error}`);
        }
    };

    return {directions, trips};
};
