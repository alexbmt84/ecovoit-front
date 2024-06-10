import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import axios from 'axios';

const useUser = () => {

    type UserData = {
        first_name: string;
        last_name: string;
    };

    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {

        const fetchUserData = async () => {

            const token = sessionStorage.getItem('access_token');
            if (!token) {
                router.push('/login');
                return;
            }

            try {

                const response = await axios.post('https://api.ecovoit.tech/api/me', undefined, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setUserData(response.data);

            } catch (error) {
                console.error('Erreur lors de la récupération des données utilisateur', error);
                router.push('/login');

            } finally {
                setLoading(false);
            }

        };

        fetchUserData();

    }, [router]);

    return {userData, loading};

};

export default useUser;
