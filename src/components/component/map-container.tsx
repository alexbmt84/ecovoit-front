import React, {useState, Suspense} from 'react';
import {Trip} from '@/types/trips';
import {TripInformation} from "@/types/tripInformation";
import MapComponent from "@/components/component/map";
import {ThreeDots} from "react-loader-spinner";
import {ArrowRightIcon} from "@/components/icons/Arrows";
import {ArrowDownIcon} from "@/components/icons/Arrows";
import {MapPinIcon} from "@/components/icons/MapPinIcon";
import {UserIcon} from "@/components/icons/UserIcon";
import {CarIcon} from "@/components/icons/CarIcon";
import {DistanceIcon} from "@/components/icons/DistanceIcon";
import {ShareIcon} from "@/components/icons/ShareIcon";
import {Button} from "@/components/ui/button";

export function MapContainer() {

    const [tripInformations, setTripInformations] = useState<TripInformation>({
        departure: '',
        arrival: '',
        distance: '',
        duration: '',
        model: '',
        user: '',
        trips: [],
    });

    const [currentTrip, setCurrentTrip] = useState({departure: '', arrival: '', vehicle: '', user: ''});

    const handleTripInformations = (
        departure: string,
        arrival: string,
        distance: string,
        duration: string,
        trips: any[],
        model: string | null,
        user?: string | null
    ) => {

        try {
            setTripInformations({departure, arrival, distance, duration, trips, model: model ?? "", user: user ?? ""});
        } catch (error) {
            console.log(error);
        }

    };

    const handleTripButtonClick = (trip: Trip) => {

        setCurrentTrip({
            departure: trip.departure,
            arrival: trip.destination,
            vehicle: trip.vehicle.model,
            user: trip.users[0].first_name
        });
    };

    function toTitleCase(str: string) {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
            }
        );
    }

    return (
        <div className="flex w-full flex-col">
            <div className="flex flex-row">
                {tripInformations.departure && tripInformations.arrival ? (
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8 md:text-4xl flex flex-row">
                        <MapPinIcon className="w-7 h-7 mt-1 mr-2"/>
                        <span>{toTitleCase(tripInformations.departure)}</span>
                        <ArrowRightIcon className="w-7 h-7 mt-2 mx-2"/>
                        <span>{toTitleCase(tripInformations.arrival)}</span>
                    </h1>
                ) : (
                    <ThreeDots color="#38BDC8"/>
                )}
            </div>
            <div className="flex h-[700px] flex-row">
                <div className="flex-1 bg-gray-100 dark:bg-gray-900">
                    <div className="relative h-full w-full">
                        <Suspense fallback={<div>Loading Map...</div>}>
                            <MapComponent tripInformations={handleTripInformations}
                                          currentDeparture={currentTrip.departure}
                                          currentArrival={currentTrip.arrival}
                                          currentVehicle={currentTrip.vehicle}
                                          currentUser={currentTrip.user}
                            />
                        </Suspense>
                    </div>
                </div>
                <div className="flex w-80 flex-col gap-6 bg-white p-6 dark:bg-gray-950">
                    {
                        !tripInformations.departure &&
                        !tripInformations.arrival &&
                        !tripInformations.distance &&
                        tripInformations.trips.length <= 0 &&
                        !tripInformations.model &&
                        !tripInformations.user ? (
                            <div className={"flex justify-center"}>
                                <ThreeDots color="#38BDC8"/>
                            </div>
                        ) : (

                            <>
                                <div className="grid gap-2">
                                    <div className="grid gap-1">
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Distance
                                        </div>
                                        <div className="text-3xl font-bold">

                                            <span>{tripInformations.distance} kilomètres</span>
                                        </div>
                                    </div>

                                    {tripInformations.duration ? (
                                        <div className="grid gap-1 mt-2">
                                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Durée
                                                du trajet
                                            </div>
                                            <div className="text-3xl font-bold">
                                                <span>{tripInformations.duration}</span>
                                            </div>
                                        </div>

                                    ) : (
                                        <div></div>
                                    )}

                                    {tripInformations.user && (
                                        <div className="mt-2 flex text-gray-500">
                                            <UserIcon className="mr-2 h-5 w-5"/>
                                            <div className="text-sm font-bold">
                                                <span>{tripInformations.user}</span>
                                            </div>
                                        </div>
                                    )}

                                    {tripInformations.model ? (
                                        <div className="mt-2 flex text-gray-500">
                                            <CarIcon className="mr-2 h-5 w-5"/>
                                            <div className="text-sm font-bold">
                                                <span>{tripInformations.model}</span>
                                            </div>
                                        </div>

                                    ) : (
                                        <div></div>
                                    )}

                                    <Button className="w-full mt-5" size="lg">
                                        <CarIcon className="mr-2 h-5 w-5"/>
                                        Créer ce trajet
                                    </Button>
                                    <Button className="w-full" size="lg" variant="outline">
                                        <ShareIcon className="mr-2 h-5 w-5"/>
                                        Partager ce trajet
                                    </Button>
                                </div>
                                <div className="flex flex-col gap-6 bg-white dark:bg-gray-950 overflow-y-auto"
                                     style={{maxHeight: '500px'}}>
                                    {tripInformations.trips.length > 0 ? (
                                        tripInformations.trips.map((trip) => (
                                            <div key={trip.id} className={"flex justify-between"}>
                                                <div className={"flex flex-col"}>

                                                    <div className={"flex space-x-1"}>
                                                        <MapPinIcon
                                                            className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-1"/>
                                                        <p>
                                                            {toTitleCase(trip.departure)}
                                                        </p>
                                                    </div>

                                                    <div className={"flex space-x-1"}>
                                                        <ArrowDownIcon
                                                            className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-1"/>
                                                        <p>
                                                            {toTitleCase(trip.destination)}
                                                        </p>
                                                    </div>

                                                    <div className={"flex space-x-1"}>
                                                        <DistanceIcon
                                                            className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1"/>
                                                        <p>
                                                            {trip.distance} km
                                                        </p>
                                                    </div>
                                                    <div className={"flex space-x-1"}>
                                                        <CarIcon
                                                            className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5"/>
                                                        <p>
                                                            {trip.vehicle?.model}
                                                        </p>
                                                    </div>

                                                    {trip.isFull ? (
                                                        <div className={"flex space-x-1"}>
                                                            <p className={"text-teal-600 font-bold"}>
                                                                Trajet complet
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <p>Places disponibles : </p>
                                                    )}

                                                </div>
                                                <Button size="sm" variant="outline"
                                                        onClick={() => handleTripButtonClick(trip)}>
                                                    Voir
                                                </Button>
                                            </div>
                                        ))
                                    ) : (
                                        <div className={"mx-auto text-gray-500 font-bold"}>Aucun trajet n&apos;a été trouvé</div>
                                    )}
                                </div>
                            </>
                        )}
                </div>
            </div>
        </div>
    )
}
