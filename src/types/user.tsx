import {VehicleData} from "@/hooks/useVehicle";

export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
    phone_number: string;
    vehicles: VehicleData;
    establishment_id: number;
}
