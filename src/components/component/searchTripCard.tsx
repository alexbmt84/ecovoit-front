"use client";

import {CardTitle, CardHeader, CardContent, CardFooter, Card} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {UserIcon} from "@/components/icons/UserIcon";
import {MapPinIcon} from "@/components/icons/MapPinIcon";
import {CalendarDaysIcon} from "@/components/icons/CalendarDaysIcon";

export function SearchTripCard() {

    interface Option {
        value: string;
        label: string;
    }

    // @ts-ignore
    const [value, setValue] = useState<Option | null>("");
    const [arrivalValue, setArrivalValue] = useState<Option | null>(null);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [passenger, setPassenger] = useState<string>("");
    const [showReturnDate, setShowReturnDate] = useState(false);

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

    const router = useRouter();

    // @ts-ignore
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent default form submission behavior

        // Constructing the URL with query parameters
        // @ts-ignore
        const searchParams = new URLSearchParams({
            departure: value?.label,
            arrival: arrivalValue?.label,
            startDate: startDate,
            endDate: endDate,
            passengers: passenger
        }).toString();

        router.push(`/search-results?${searchParams}`);
    };

    return (
        <div className="flex flex-col">
            <Card className="w-full sm:w-[550px]">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className={"text-center"}>Où allez-vous aujourd&apos;hui ?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2 mt-5">
                                <MapPinIcon className="h-5 w-5 text-gray-400"/>
                                <GooglePlacesAutocomplete
                                    apiKey={"AIzaSyDxnbqlXcwX93UYD9GqYzX2g_-N01zL33c"}
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

                                    apiKey={"AIzaSyDxnbqlXcwX93UYD9GqYzX2g_-N01zL33c"}
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
                                <Input type="date" placeholder="yyyy-mm-dd" onChange={handleStartDateChange}
                                       value={startDate}/>
                            </div>
                            {showReturnDate &&
                                <div className="flex items-center space-x-2">
                                    <CalendarDaysIcon className="h-5 w-5 text-gray-400"/>
                                    <Input type="date" placeholder="yyyy-mm-dd" onChange={handleEndDateChange}
                                           value={endDate}
                                    />
                                </div>
                            }
                            {!showReturnDate && (
                                <Button className="justify-start text-blue-600" variant="ghost"
                                        onClick={handleAddReturnClick}>
                                    Ajouter un retour
                                </Button>
                            )}
                            <div className="flex items-center space-x-2">
                                <UserIcon className="h-5 w-5 text-gray-400"/>
                                <Input type={"number"} placeholder={passenger ? passenger : "Nombre de passagers"} onChange={handlePassengerChange}
                                       value={passenger}
                                       required={true}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type={"submit"} className="w-full mt-5 mb-3">Go !</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}