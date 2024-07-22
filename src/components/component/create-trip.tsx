"use client";

import {CardTitle, CardHeader, CardContent, CardFooter, Card} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import React, {useState, useEffect, Suspense} from "react";
import {useRouter} from "next/navigation";
import {UserIcon} from "@/components/icons/UserIcon";
import {MapPinIcon} from "@/components/icons/MapPinIcon";
import {CalendarDaysIcon} from "@/components/icons/CalendarDaysIcon";
import MapComponent from "@/components/component/map";
import {VehicleSelect} from "@/components/component/vehicle-select";
import axios from "axios";
import {ThreeDots} from "react-loader-spinner";
import {AlertBoxCreatedTrip} from "@/components/component/alert-box-created-trip";
import {ArrowRightIcon} from "@/components/icons/Arrows";
import useUser from "@/hooks/useUser";
import Link from "next/link";
import {CarIcon} from "@/components/icons/CarIcon";
import {ShareIcon} from "@/components/icons/ShareIcon";
import {VehicleData} from "@/hooks/useVehicle";
import {Trip} from "@/types/trips";
import {TripInformation} from "@/types/tripInformation";

interface Vehicle {
    id: number;
    model: string;
    immatriculation: string;
    places: number;
    picture: string;
    [key: string]: any;
}


export function CreateTrip() {

    interface Option {
        value: string;
        label: string;
    }

    const router = useRouter();
    const csrfToken = typeof window !== 'undefined' ? localStorage.getItem('csrfToken') : null;

    const [value, setValue] = useState<Option | null>(null);
    const [arrivalValue, setArrivalValue] = useState<Option | null>(null);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [passenger, setPassenger] = useState<string>("");
    const [showReturnDate, setShowReturnDate] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<VehicleData | null>(null);
    const [displayCreatedModal, setDisplayCreatedModal] = useState<boolean>(false);
    const [tripInformations, setTripInformations] = useState<TripInformation>({
        departure: '',
        arrival: '',
        distance: '',
        duration: '',
        model: '',
        user: '',
        userId: '',
        startDate: '',
        trips: [],
    });
    const [showSelect, setShowSelect] = useState(false);
    const [showCreate, setShowCreate] = useState(true);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const {userData} = useUser();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const accessToken = sessionStorage.getItem('access_token');
        setToken(accessToken);

        if (!accessToken) {
            router.push('/login');
        }
    }, [router]);

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(event.target.value);
    };

    const handlePassengerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassenger(event.target.value);
    };

    const handleAddReturnClick = () => {
        setShowReturnDate(true);
    };

    const handleVehicleSelect = (vehicle: VehicleData | null) => {
        setSelectedVehicle(vehicle);
        console.log("Selected Vehicle:", vehicle);
    };

    const transformedVehicles = userData?.vehicles ? userData.vehicles.map((vehicle: vehicle) => ({
        id: vehicle.id,
        model: vehicle.model,
        immatriculation: vehicle.immatriculation,
        places: vehicle.places,
        picture: vehicle.picture,
        user_id: vehicle.user_id
    })) : undefined;

    const handleTripInformations = (
        departure: string,
        arrival: string,
        distance: string,
        duration: string,
        trips: any[],
        model: string | null,
        user?: string | null,
        userId?: string | null,
        startDate?: string | null,
    ) => {
        try {
            setTripInformations({
                departure,
                arrival,
                distance,
                duration,
                trips,
                model: model ?? "",
                user: user ?? "",
                startDate: startDate ?? "",
                userId: userId ?? ""
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleCreateTrip = () => {
        setDisplayCreatedModal(true);
    };

    const createTrip = async () => {
        if (!tripInformations.startDate) {
            alert("Please select a date and time for your trip");
            return;
        }
        try {
            console.log(selectedVehicle);
            const response = await axios.post(`${apiUrl}/api/trips`, {
                departure: tripInformations.departure,
                destination: tripInformations.arrival,
                distance: parseInt(tripInformations.distance),
                departure_time: tripInformations.startDate,
                vehicle_id: selectedVehicle?.id
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-CSRF-TOKEN': csrfToken
                }
            });
            console.log(response);
            router.push('/mytrips');
        } catch (error) {
            console.log("Error while creating trip");
            console.error(error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const searchParams = new URLSearchParams();

        if (value?.label) {
            searchParams.append("departure", value.label);
        }

        if (arrivalValue?.label) {
            searchParams.append("arrival", arrivalValue.label);
        }

        searchParams.append("startDate", startDate);
        searchParams.append("endDate", endDate);
        searchParams.append("passengers", passenger);

        router.push(`/search-results?${searchParams.toString()}`);
    };


    return (
        <div className="flex flex-col w-full">
            <Card className="w-full sm:w-[550px]">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="text-center">Veuillez renseigner les champs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2 mt-5">
                                <MapPinIcon className="h-5 w-5 text-gray-400"/>
                                <GooglePlacesAutocomplete
                                    apiKey="API_KEY"
                                    apiOptions={{language: 'fr', region: 'fr'}}
                                    selectProps={{
                                        value,
                                        onChange: setValue,
                                        placeholder: 'Adresse de départ',
                                        required: true,
                                        styles: {
                                            input: (provided) => ({
                                                ...provided,
                                                minWidth: "450px",
                                            }),
                                        },
                                    }}
                                />
                            </div>
                            <div className="flex items-center space-x-2 py-3">
                                <MapPinIcon className="h-5 w-5 text-gray-400"/>
                                <GooglePlacesAutocomplete
                                    apiKey="API_KEY"
                                    apiOptions={{language: 'fr', region: 'fr'}}
                                    selectProps={{
                                        placeholder: 'Adresse d\'arrivée',
                                        required: true,
                                        styles: {
                                            input: (provided) => ({
                                                ...provided,
                                                minWidth: "450px",
                                            }),
                                        },
                                        onChange: setArrivalValue,
                                        value: arrivalValue,
                                    }}
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <CalendarDaysIcon className="h-5 w-5 text-gray-400"/>
                                <Input type="date" placeholder="yyyy-mm-dd" onChange={handleStartDateChange} value={startDate} />
                            </div>
                            {showReturnDate && (
                                <div className="flex items-center space-x-2">
                                    <CalendarDaysIcon className="h-5 w-5 text-gray-400"/>
                                    <Input type="date" placeholder="yyyy-mm-dd" onChange={handleEndDateChange} value={endDate} />
                                </div>
                            )}
                            {!showReturnDate && (
                                <Button className="justify-start text-gray-500 ml-6" variant="ghost" onClick={handleAddReturnClick}>
                                    Ajouter un retour
                                </Button>
                            )}
                            <div className="flex items-center space-x-2">
                                <UserIcon className="h-5 w-5 text-gray-400"/>
                                <Input type="number" placeholder={passenger ? passenger : "Nombre de passagers"} onChange={handlePassengerChange} value={passenger} required />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button type="submit" className="w-2/5 mt-5 mb-3 p-2 transition-colors rounded-md border border-cyan-700 bg-cyan-100 text-gray-500 font-bold hover:text-black dark:bg-black dark:text-gray-500 dark:hover:bg-cyan-500/50">
                            Go !
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            <div className="flex w-full flex-col mt-8">
                <div className="flex flex-row">
                    {tripInformations.departure && tripInformations.arrival ? (
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8 md:text-4xl flex flex-row">
                            <MapPinIcon className="w-7 h-7 mt-1 mr-2"/>
                            <span>{tripInformations.departure}</span>
                            <ArrowRightIcon className="w-7 h-7 mt-2 mx-2"/>
                            <span>{tripInformations.arrival}</span>
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
                                              currentDeparture={tripInformations.departure}
                                              currentArrival={tripInformations.arrival}
                                              currentVehicle={tripInformations.model}
                                              currentUser={tripInformations.user}
                                              currentUserId={tripInformations.userId}
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
                                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Distance
                                            </div>
                                            <div className="text-3xl font-bold">
                                                <span>{tripInformations.distance} kilomètres</span>
                                            </div>
                                        </div>
                                        {tripInformations.duration ? (
                                            <div className="grid gap-1 mt-2">
                                                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                    Durée du trajet
                                                </div>
                                                <div className="text-3xl font-bold">
                                                    <span>{tripInformations.duration}</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div></div>
                                        )}

                                        {showSelect ? (
                                            <>
                                                <VehicleSelect
                                                    userVehiclesProps={transformedVehicles}
                                                    onSelectVehicle={handleVehicleSelect}
                                                />
                                                <div className={"flex flex-row gap-2"}>
                                                    <Button className="w-full mt-3 mb-3"
                                                            size="lg"
                                                            onClick={handleCreateTrip}
                                                    >
                                                        Valider
                                                    </Button>
                                                    <Button className="w-full mt-3 mb-3" size="lg"
                                                            onClick={() => {
                                                                setShowCreate(!showCreate);
                                                                setShowSelect(!showSelect);
                                                            }}>
                                                        Annuler
                                                    </Button>
                                                </div>
                                            </>
                                        ) : tripInformations.user && tripInformations.model ? (
                                            <>
                                                <div className="mt-2 flex text-gray-500">
                                                    <UserIcon className="mr-2 h-5 w-5"/>
                                                    <Link href={`/profile/${tripInformations.userId}`}>
                                                        <div className="text-sm font-bold">
                                                            <span>{tripInformations.user}</span>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className="mt-2 flex text-gray-500">
                                                    <CarIcon className="mr-2 h-5 w-5"/>
                                                    <div className="text-sm font-bold">
                                                        <span>{tripInformations.model}</span>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                        {showCreate && (
                                            <>
                                                <Button className="w-full mt-5" size="lg" onClick={() => {
                                                    setShowCreate(!showCreate);
                                                    setShowSelect(!showSelect);
                                                }}>
                                                    <CarIcon className="mr-2 h-5 w-5"/>
                                                    Créer ce trajet
                                                </Button>
                                            </>
                                        )}
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
                                                                {trip.departure}
                                                            </p>
                                                        </div>
                                                        <div className={"flex space-x-1"}>
                                                            <ArrowRightIcon
                                                                className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-2.5"/>
                                                            <p className={"mt-1.5"}>
                                                                {trip.destination}
                                                            </p>
                                                        </div>
                                                        <div className={"flex space-x-1"}>
                                                            <CarIcon
                                                                className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-2"/>
                                                            <p className={"mt-1.5"}>
                                                                {trip.vehicle?.model}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className={"flex flex-col gap-2"}>
                                                        <Button size="sm" variant="outline">
                                                            Voir
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className={"mx-auto text-gray-500 font-bold"}>Aucun trajet n a été trouvé</div>
                                        )}
                                    </div>
                                </>
                            )}
                    </div>
                </div>
            </div>
            {displayCreatedModal && (
                <AlertBoxCreatedTrip createTrip={createTrip} trip={tripInformations}/>
            )}
        </div>
    );
}
