import axios from 'axios';
import {useState} from 'react';

const useAuth = () => {

    const csrfToken = typeof window !== 'undefined' ? localStorage.getItem('csrfToken') : null
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email: string, password: string) => {

            setLoading(true);
            setError(null);

            try {

                const response = await axios.post('https://api.ecovoit.tech/api/login', {
                    email,
                    password
                }, {
                    headers: {
                        'X-CSRF-TOKEN': csrfToken
                    }
                });

                setLoading(false);
                return response.data;

            } catch
                (error) {

                setLoading(false);

                // @ts-ignore
                setError(error.response ? error.response.data : error.message);
                return null;

            }
        }
    ;

    return {login, loading, error};
};

export default useAuth;
