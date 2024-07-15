import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {Trip} from "@/types/trips";

interface UserData {
    establishment_id: number;
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    vehicles: VehicleData[];
    trips: Trip[];
}

interface VehicleData {
    id: number;
    model: string;
    immatriculation: string;
    places: number;
    picture: string;
}

interface ProfilProps {
    user: UserData;
}

export const Profil: React.FC<ProfilProps> = ({ user }) => {
    const getEstablishmentName = (id: number) => {
        if (id === 1) {
            return "Nextech Avignon";
        } else {
            return "Nextech Pertuis";
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-xl dark:bg-gray-950">
            <div className="relative flex">
                <div className="w-2/8 flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg relative">
                    <Avatar className="w-36 h-36 border-4 border-white dark:border-gray-950 rounded-full absolute -top-16 shadow-lg">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>{user.first_name.charAt(0).toUpperCase() + user.last_name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="mt-20 text-center space-y-4">
                        <h2 className="text-2xl font-bold">{user.first_name} {user.last_name}</h2>
                        <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
                        <Button variant="outline" className="flex items-center gap-2">
                            Send Message
                        </Button>
                    </div>
                </div>
                <div className="w-3/4 pl-6">
                    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">Information</h3>
                        <div className="grid grid-cols-2 gap-6 mt-4">
                            <div className="space-y-2">
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">First Name</div>
                                <div>{user.first_name}</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Name</div>
                                <div>{user.last_name}</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</div>
                                <div>{user.email}</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">University</div>
                                <div>{getEstablishmentName(user.establishment_id)}</div>
                            </div>
                        </div>
                        <Separator className="my-6" />
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Vehicles</h3>
                            <div className="space-y-4 mt-4">
                                {user.vehicles && user.vehicles.length > 0 ? (
                                    user.vehicles.map((vehicle: VehicleData) => (
                                        <div key={vehicle.id} className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg dark:bg-gray-800">
                                            <div className="w-16 h-16">
                                                <img src={vehicle.picture} alt={vehicle.model} className="w-full h-full object-cover rounded-lg" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Model: {vehicle.model}</div>
                                                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Immatriculation: {vehicle.immatriculation}</div>
                                                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Places: {vehicle.places}</div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-sm text-gray-500 dark:text-gray-400">No vehicles available</div>
                                )}
                            </div>
                        </div>
                        <Separator className="my-6" />
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Trips</h3>
                            <div className="space-y-4 mt-4">
                                {user.trips && user.trips.length > 0 ? (
                                    user.trips.map((trip: Trip) => (
                                        <div key={trip.id} className="p-4 bg-gray-100 rounded-lg dark:bg-gray-800">
                                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Destination: {trip.destination}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-sm text-gray-500 dark:text-gray-400">No trips available</div>
                                )}
                            </div>
                        </div>
                        <Separator className="my-6" />
                        <Link href="#" passHref className="inline-flex items-center gap-2 text-gray-900 hover:underline dark:text-gray-50">
                            View Offered Rides
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Profil;
