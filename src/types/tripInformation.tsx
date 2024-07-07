import {Trip} from '@/types/trips';

export interface TripInformation {
    departure: string;
    arrival: string;
    distance: string;
    duration: string;
    model: string | null;
    user: string | null;
    userId: string | null;
    trips: Trip[];
}
