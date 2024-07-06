import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {VehicleData} from "@/hooks/useVehicle";
import axios from 'axios';
import useCSRFToken from "@/hooks/useCSRFToken";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const useUser = () => {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    type UserData = {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        avatar: string;
        phone_number: string;
        vehicles: VehicleData;
    };

    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useCSRFToken();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = sessionStorage.getItem('access_token');
            if (!token) {
                console.log('No token found, redirecting to login...');
                router.push('/login');
                return;
            }

            try {
                const response = await axios.post(`${apiUrl}/api/me`, undefined, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data', error);
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [router]);


    const updateUser = async (id: number, updatedData: Partial<UserData>) => {
        const token = sessionStorage.getItem('access_token');
        if (!token) {
            router.push('/login');
            return {ok: false, error: 'No token found'};
        }

        try {
            const response = await axios.put(`${apiUrl}/api/users/${id}`, updatedData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                setUserData(response.data);
                return {ok: true};
            } else {
                return {ok: false, error: 'Failed to update user'};
            }

        } catch (error) {
            console.error('Erreur lors de la mise à jour des données utilisateur', error);
            return {ok: false, error: 'Failed to update user'};
        }
    };


    return {userData, loading, updateUser};

};

export default useUser;
