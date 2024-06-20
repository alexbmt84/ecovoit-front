import {User} from '@/types/user';
import React from "react";

export interface Trip {
    id: React.Key | null | undefined;
    departure: string;
    destination: string;
    distance: string;
    duration: string;
    vehicle: { model: string };
    user: string;
    users: User[];
    isFull: boolean;
}