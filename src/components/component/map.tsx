import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";

type DirectionsResult = google.maps.DirectionsResult;  // Assurez-vous que ce type est correct

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: 43.9492,
    lng: 5.4080
};

interface TripInformations {
    departure: string;
    arrival: string;
    distance: string;
    duration: string;
    trips: any[];
}

interface MapComponentProps {
    tripInformations: (departure: string, arrival: string, distance: string, duration: string, trips: any[]) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ tripInformations }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDxnbqlXcwX93UYD9GqYzX2g_-N01zL33c"
    });

    const router = useRouter();
    const searchParams = useSearchParams();
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [directions, setDirections] = useState<DirectionsResult | null>(null);
    const [distance, setDistance] = useState<string>("");
    const [duration, setDuration] = useState<string>("");
    const [trips, setTrips] = useState<any[]>([]);

    const departure = searchParams.get('departure');
    const arrival = searchParams.get('arrival');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const passengers = searchParams.get('passengers');

    function formatDuration(duration: string) {
        return duration.replace('hours', 'heures').replace('hour', 'heure')
            .replace('days', 'jours').replace('day', 'jour');
    }

    useEffect(() => {
        async function fetchAllData() {
            const token = sessionStorage.getItem('access_token');
            if (!token) {
                router.push('/login');
                return;
            }

            const tripsData = await fetchTrips(token);
            const directionsData = await fetchDirections();

            if (tripsData && directionsData) {
                const route = directionsData.routes[0];
                const leg:google.maps.DirectionsLeg = route.legs[0];
                setTrips(tripsData);
                setDirections(directionsData);
                // @ts-ignore
                setDistance(leg.distance.text);
                // @ts-ignore
                const formattedDuration = formatDuration(leg.duration.text);
                setDuration(formattedDuration);
                // @ts-ignore
                tripInformations(departure || '', arrival || '', leg.distance.text, formattedDuration, tripsData);
            }
        }

        async function fetchTrips(token: string) {
            const baseUrl = 'https://api.ecovoit.tech/api/trips';
            // @ts-ignore
            const params = new URLSearchParams({ departure, arrival, startDate, endDate, passengers }).toString();
            const response = await axios.get(`${baseUrl}?${params}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return response.status === 200 ? response.data : null;
        }

        async function fetchDirections() {
            if (departure && arrival) {
                const directionsService = new google.maps.DirectionsService();
                return new Promise<DirectionsResult>((resolve, reject) => {
                    directionsService.route({
                        origin: `${departure}, France`,
                        destination: `${arrival}, France`,
                        travelMode: google.maps.TravelMode.DRIVING
                    }, (result, status) => {
                        if (status === google.maps.DirectionsStatus.OK) {
                            // @ts-ignore
                            resolve(result);
                        } else {
                            reject(`Error fetching directions. Status: ${status}`);
                        }
                    });
                });
            }
            return null;
        }

        if (isLoaded) {
            fetchAllData();
        }
    }, [isLoaded, departure, arrival, startDate, endDate, passengers]);

    const onLoad = useCallback((map: google.maps.Map) => {
        const bounds = new google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
    ) : <div>Loading map...</div>;
};

export default React.memo(MapComponent);
