import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
//import {Trip} from "@/types/trips";
import {User} from "@/types/user";
//import {Vehicle} from "@/types/vehicle";

interface PageProfilProps {
    user: User;
}

export const Profile: React.FC<PageProfilProps> = ({ user }) => {

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
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.first_name + user.last_name}</AvatarFallback>
                    </Avatar>
                    <div className="mt-20 text-center space-y-4">
                        <h2 className="text-2xl font-bold">{user.first_name} {user.last_name}</h2>

                        <Button variant="outline" className="flex items-center gap-2">
                            Contacte-moi !
                        </Button>
                    </div>
                </div>
                <div className="w-3/4 pl-6">
                    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">Informations</h3>
                        <div className="grid grid-cols-2 gap-6 mt-4">
                            <div className="space-y-2">
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Prénom</div>
                                <div>{user.first_name}</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Nom</div>
                                <div>{user.last_name}</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">E-mail</div>
                                <div>{user.email}</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Centre de formation</div>
                                <div>{getEstablishmentName(user.establishment_id)}</div>
                            </div>
                        </div>
                        <Separator className="my-6" />
                    </div>
                </div>
            </div>
        </div>
);
};
export default Profile;
