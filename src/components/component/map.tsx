"use client";

import React, {useState, useCallback, useEffect} from 'react';
import {GoogleMap, useJsApiLoader, DirectionsRenderer} from '@react-google-maps/api';
import {useSearchParams} from "next/navigation";
import DirectionsResult = google.maps.DirectionsResult;

const containerStyle = {
    width: '600px',
    height: '600px',
    borderRadius: '25px'
};

const center = {
    lat: 43.9492, // Latitude for Sault
    lng: 5.4080  // Longitude for Sault
};

function MapComponent() {
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDxnbqlXcwX93UYD9GqYzX2g_-N01zL33c"
    });

    const searchParams = useSearchParams();
    const [map, setMap] = useState(null);
    const [directions, setDirections] = useState<DirectionsResult>();
    const [distance, setDistance] = useState<string>(""); // État pour stocker la distance
    const [duration, setDuration] = useState<string>(""); // État pour stocker la distance

    const departure = searchParams.get('departure');
    const arrival = searchParams.get('arrival');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const passengers = searchParams.get('passengers');

    // @ts-ignore
    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback() {
        setMap(null);
    }, []);

    const fetchDirections = useCallback(() => {
        if (departure && arrival) {
            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route({
                origin: `${departure}, France`,
                destination: `${arrival}, France`,
                travelMode: window.google.maps.TravelMode.DRIVING
            }, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    // @ts-ignore
                    setDirections(result);
                    // Accéder à la distance et la durée du premier leg de l'itinéraire
                    // @ts-ignore
                    const route = result.routes[0];
                    const leg = route.legs[0];
                    // @ts-ignore
                    const distance = leg.distance.text; // Distance en km ou miles, formatée
                    setDistance(distance);
                    // @ts-ignore
                    const duration = leg.duration.text; // Durée en format lisible
                    setDuration(duration);
                } else {
                    console.error(`Error fetching directions. Status: ${status}`, result);
                }
            });
        }
    }, [departure, arrival]);

    useEffect(() => {
        if (isLoaded) {
            fetchDirections();
        }
    }, [isLoaded, departure, arrival]);

    return isLoaded ? (
        <>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {directions && <DirectionsRenderer directions={directions}/>}
            </GoogleMap>
            <div className={"text-black"}>Distance: {distance}</div>
            <div className={"text-black"}>Durée du trajet: {duration}</div>
        </>

    ) : <></>;
}

export default React.memo(MapComponent);
