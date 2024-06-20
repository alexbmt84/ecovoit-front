import {CardTitle, CardDescription, CardHeader, CardContent, Card} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {useEffect, useState} from "react"
import {useRouter} from "next/navigation";
import axios from "axios";
import Link from "next/link";
import {Loader} from "@/components/component/loader";
import {ArrowRightIcon} from "@/components/icons/Arrows";
import {MapPinIcon} from "@/components/icons/MapPinIcon";
import {UserIcon} from "@/components/icons/UserIcon";
import {ClockIcon} from "@/components/icons/ClockIcon";

export function ListTrips() {

    interface UserData {
        id: number;
        first_name: string;
        last_name: string;
    }

    type TripData = {
        id: number;
        departure: string;
        destination: string;
        distance: number;
        status: number;
        vehicle: {model:string};
        model: string;
        departure_time: string;
        users: UserData[];
    };

    const router = useRouter();
    const [trips, setTrips] = useState<TripData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getTrips = async () => {

            setLoading(true);

            try {

                const token = sessionStorage.getItem('access_token');

                if (!token) {
                    router.push('/login');
                    return;
                }

                const response = await axios.get('https://api.ecovoit.tech/api/trips?limit=10', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setTrips(response.data);
            } catch (error) {
                console.error('Failed to fetch trips data:', error);
            } finally {
                setLoading(false);
            }

        }
        getTrips();

    }, []);

    function toTitleCase(str:string) {
        return str.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
            }
        );
    }

    // @ts-ignore
    const handleSubmit = async (departure, arrival, startDate, model, user) => {

        // Constructing the URL with query parameters
        const searchParams = new URLSearchParams({
            departure: departure,
            arrival: arrival,
            startDate: startDate,
            user: user,
            vehicle: model,
            endDate: '',
            passengers: '',
        }).toString();

        router.push(`/search-results?${searchParams}`);
    };

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle>On vous propose</CardTitle>
                <CardDescription>Découvrez et rejoignez les covoiturages proches de chez vous.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-auto max-h-[400px]">
                {loading ? (
                    <div className="inset-0 flex items-center justify-center mt-32">
                        <Loader/>
                    </div>
                ) : (
                    trips.map((trip, index) => (
                        <div key={index} className="grid gap-4">
                            <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-md dark:bg-gray-800">
                                <div className="flex-1 grid gap-1">
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <MapPinIcon className="w-4 h-4"/>
                                        <span>{toTitleCase(trip.departure)}</span>
                                        <ArrowRightIcon className="w-4 h-4"/>
                                        <span>{toTitleCase(trip.destination)}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <ClockIcon className="h-4 w-4"/>
                                        <div className={"text-lg font-semibold"}>
                                            {
                                                new Date(trip.departure_time).toLocaleDateString("fr", {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })
                                            }
                                        </div>
                                    </div>
                                     {trip.users && trip.users.length > 0 && (
                                        <div className={"flex flex-row \"text-sm text-gray-500 space-x-2"}>
                                            <UserIcon className="w-4 h-4 mt-1" />
                                            <ul>
                                                <Link href={`/profil/${trip.users[0].id}`}>
                                                    <li>{trip.users[0].first_name} {trip.users[0].last_name}</li>
                                                </Link>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <Button size="sm" variant="outline" onClick={() => handleSubmit(trip.departure, trip.destination, trip.departure_time, trip.vehicle.model, trip.users[0].first_name)}>
                                    Voir
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    )
}