export interface MapComponentProps {
    tripInformations: (departure: string, arrival: string, distance: string, duration: string, trips: any[], vehicle: string | null, user: string | null, userId: string | null, startDate: string | null) => void;
    currentDeparture: string;
    currentArrival: string;
    currentVehicle: string | null;
    currentUser: string | null;
    currentUserId: string | null;
}