import { JSX, SVGProps, useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";

interface Vehicle {
    id: number;
    model: string;
    immatriculation: string;
    places:number,
    picture: string;
    [key: string]: any;
}

interface VehicleSelectProps {
    userVehiclesProps: Vehicle[] | undefined;
    onSelectVehicle: (vehicle: Vehicle | null) => void;
}

export function VehicleSelect({ userVehiclesProps, onSelectVehicle }: VehicleSelectProps) {
    const handleSelectedVehicle = (vehicleId: number) => {
        // Flatten the array to ensure it's a single-level array of vehicle objects
        const flatUserVehiclesProps = userVehiclesProps?.flat();
        const selected = flatUserVehiclesProps?.find(vehicle => vehicle.id === vehicleId);
        onSelectVehicle(selected || null);
    };

    return (
        <Select onValueChange={(value) => handleSelectedVehicle(parseInt(value, 10))}>
            <SelectTrigger className="w-full border-[#06B6D4] border-2 mt-5">
                <SelectValue placeholder="Sélectionnez votre véhicule"/>
            </SelectTrigger>
            <SelectContent className="bg-white">
                <SelectGroup>
                    {userVehiclesProps?.flat().map((vehicle) => (
                        vehicle.id ? (
                            <SelectItem key={vehicle.id} value={vehicle.id.toString()} className="cursor-pointer">
                                <div className="flex flex-row">
                                    <CarIcon className="mr-2 h-5 w-5"/>
                                    {vehicle.model} ({vehicle.immatriculation})
                                </div>
                            </SelectItem>
                        ) : null
                    )) || <SelectItem value="no-vehicles" className="cursor-not-allowed">Aucun véhicule disponible</SelectItem>}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

function CarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
            <circle cx="7" cy="17" r="2"/>
            <path d="M9 17h6"/>
            <circle cx="17" cy="17" r="2"/>
        </svg>
    );
}
