import {User} from '@/types/user';
import React from "react";

export interface Trip {
    id: number;
    departure: string;
    destination: string;
    distance: string;
    duration: string;
    vehicle: { model: string };
    user: string;
    userId: string;
    totalPassengers: number;
    departure_time: string;
    users: User[];
    isFull: boolean;
    driverId: number;
    isJoined: boolean;
}