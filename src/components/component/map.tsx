import React, {useState, useCallback, useEffect} from 'react';
import {GoogleMap, useJsApiLoader, DirectionsRenderer} from '@react-google-maps/api';
import {useSearchParams} from "next/navigation";
import axios from "axios";
import {useRouter} from "next/navigation";

type DirectionsResult = google.maps.DirectionsResult;

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: 43.9492,
    lng: 5.4080
};

interface MapComponentProps {
    tripInformations: (departure: string, arrival: string, distance: string, duration: string, trips: any[], vehicle: string | null, user: string | null) => void;
    currentDeparture: string;
    currentArrival: string;
    currentVehicle: string | null;
    currentUser: string | null;
}

const MapComponent: React.FC<MapComponentProps> = ({
                                                       tripInformations,
                                                       currentDeparture,
                                                       currentArrival,
                                                       currentVehicle,
                                                       currentUser
                                                   }) => {
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDxnbqlXcwX93UYD9GqYzX2g_-N01zL33c"
    });

    const router = useRouter();
    const searchParams = useSearchParams();
    const [directions, setDirections] = useState<DirectionsResult | null>(null);
    const [trips, setTrips] = useState<[]>([]);

    const departure = searchParams.get('departure');
    const arrival = searchParams.get('arrival');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const passengers = searchParams.get('passengers');
    const vehicle = searchParams.get('vehicle');
    const user = searchParams.get('user');

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
                const leg: google.maps.DirectionsLeg = route.legs[0];
                if (leg.distance && leg.duration) {
                    setDirections(directionsData);
                    // @ts-ignore
                    // @ts-ignore
                    const formattedDuration = formatDuration(leg.duration.text);
                    // @ts-ignore
                    setTrips(tripsData)
                    tripInformations(departure || '', arrival || '', leg.distance.text.replace("km", ""), formattedDuration, tripsData, vehicle, user);

                } else {
                    console.log("Error while fetching trip");
                }
            }
        }

        async function fetchTrips(token: string) {
            const baseUrl = 'https://api.ecovoit.tech/api/trips';
            // @ts-ignore
            const params = new URLSearchParams({departure, arrival, startDate, endDate, passengers}).toString();
            const response = await axios.get(`${baseUrl}?${params}`, {
                headers: {'Authorization': `Bearer ${token}`}
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


    useEffect(() => {
        if (currentDeparture && currentArrival && (currentDeparture !== departure || currentArrival !== arrival)) {
            getDirections(currentDeparture, currentArrival);
        }
    }, [currentDeparture, currentArrival]);

    // Unified function to fetch directions
    const getDirections = async (departure: string, arrival: string) => {
        const directionsService = new google.maps.DirectionsService();
        directionsService.route({
            origin: `${departure}, France`,
            destination: `${arrival}, France`,
            travelMode: google.maps.TravelMode.DRIVING
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                setDirections(result);
                if (result) {
                    const leg = result.routes[0].legs[0];

                    if (leg.distance && leg.duration) {
                        tripInformations(departure, arrival || '', leg.distance.text.replace("km", ""), formatDuration(leg.duration.text), trips, currentVehicle, currentUser);

                    }
                } else {
                    console.error(`Error map: ${status}`);
                }

            } else {
                console.error(`Error fetching directions: ${status}`);
            }
        });
    };


    const onLoad = useCallback((mapInstance: google.maps.Map) => {
        const bounds = new google.maps.LatLngBounds(center);
        mapInstance.fitBounds(bounds);
    }, []);


    const onUnmount = useCallback(() => {
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {directions && <DirectionsRenderer directions={directions}/>}
        </GoogleMap>
    ) : <div>Loading map...</div>;
};

export default React.memo(MapComponent);
