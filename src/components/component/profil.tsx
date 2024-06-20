// components/component/profil.tsx

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface UserData {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    car_model: string;
    available_seats: number;
    university: string;
}

interface ProfilProps {
    user: UserData;
}

export const Profil: React.FC<ProfilProps> = ({ user }) => {
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg dark:bg-gray-950">
            <div className="flex items-center space-x-6">
                <Avatar className="w-20 h-20 border-2 border-gray-900 dark:border-gray-50">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>{user.first_name.charAt(0).toUpperCase() + user.last_name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{user.first_name} {user.last_name}</h2>
                    <Button variant="outline" className="flex items-center gap-2">
                        Send Message
                    </Button>
                </div>
            </div>
            <Separator className="my-6" />
            <div className="grid grid-cols-2 gap-6">
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
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Car Model</div>
                    <div>{user.car_model}</div>
                </div>
                <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Available Seats</div>
                    <div>{user.available_seats}</div>
                </div>
                <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">University</div>
                    <div>{user.university}</div>
                </div>
            </div>
            <Separator className="my-6" />
            <Link
                href="#"
                passHref
                className="inline-flex items-center gap-2 text-gray-900 hover:underline dark:text-gray-50">
                
                    View Offered Rides
                
            </Link>
        </div>
    );
};

export default Profil;
