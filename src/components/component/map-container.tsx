import React, {useState, Suspense, SVGProps} from 'react';
import MapComponent from "@/components/component/map";
import {Button} from "@/components/ui/button";
import UserIcon from "@/components/icons/UserIcon";
import CarIcon from "@/components/icons/CarIcon";
import {ArrowRightIcon} from "@/components/icons/Arrows";
import {ArrowDownIcon} from "@/components/icons/Arrows";
import {ThreeDots} from "react-loader-spinner";

export function MapContainer() {

    interface User {
        first_name: string;
    }

    interface Trip {
        id: React.Key | null | undefined;
        departure: string;
        destination: string;
        distance: string;
        duration: string;
        vehicle: { model: string };
        user: string;
        users: [User];
    }

    interface TripInformation {
        departure: string;
        arrival: string;
        distance: string;
        duration: string;
        model: string | null;
        user: string | null;
        trips: any[];
    }

    const [tripInformations, setTripInformations] = useState<TripInformation>({
        departure: '',
        arrival: '',
        distance: '',
        duration: '',
        model: '',
        user: '',
        trips: [],
    });

    const [trips, setTrips] = useState<any | []>([]);
    const [currentTrip, setCurrentTrip] = useState({departure: '', arrival: '', vehicle: '', user: ''});
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);

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
            setTrips(trips);
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
                                          startLoading={startLoading}
                                          stopLoading={stopLoading}
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
                                                </div>
                                                <Button size="sm" variant="outline"
                                                        onClick={() => handleTripButtonClick(trip)}>
                                                    Voir
                                                </Button>
                                            </div>
                                        ))
                                    ) : (
                                        <div>No trips found</div>
                                    )}
                                </div>
                            </>
                        )}
                </div>
            </div>
        </div>
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
function ShareIcon(props) {
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
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
            <polyline points="16 6 12 2 8 6"/>
            <line x1="12" x2="12" y1="2" y2="15"/>
        </svg>
    )
}

// @ts-ignore
function DistanceIcon(props) {
    return (

        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" strokeWidth="4" stroke="currentColor"
             width="24"
             height="24"
             fill="none">
            <path
                d="M17.94,54.81a.1.1,0,0,1-.14,0c-1-1.11-11.69-13.23-11.69-21.26,0-9.94,6.5-12.24,11.76-12.24,4.84,0,11.06,2.6,11.06,12.24C28.93,41.84,18.87,53.72,17.94,54.81Z"/>
            <circle cx="17.52" cy="31.38" r="4.75"/>
            <path
                d="M49.58,34.77a.11.11,0,0,1-.15,0c-.87-1-9.19-10.45-9.19-16.74,0-7.84,5.12-9.65,9.27-9.65,3.81,0,8.71,2,8.71,9.65C58.22,24.52,50.4,33.81,49.58,34.77Z"/>
            <circle cx="49.23" cy="17.32" r="3.75"/>
            <path d="M17.87,54.89a28.73,28.73,0,0,0,3.9.89"/>
            <path d="M24.68,56.07c2.79.12,5.85-.28,7.9-2.08,5.8-5.09,2.89-11.25,6.75-14.71a16.72,16.72,0,0,1,4.93-3"
                  strokeDasharray="7.8 2.92"/>
            <path d="M45.63,35.8a23,23,0,0,1,3.88-.95"/>
        </svg>
    )
}
