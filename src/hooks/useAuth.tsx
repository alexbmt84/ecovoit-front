import axios from 'axios';
import { useState } from 'react';

const useAuth = () => {
    axios.defaults.withCredentials = true;

    const csrfToken = typeof window !== 'undefined' ? localStorage.getItem('csrfToken') : null;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email: string, password: string, onSuccess: () => void) => {
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

            sessionStorage.setItem('access_token', response.data.access_token); // Stocker le token dans sessionStorage

            setLoading(false);
            onSuccess(); // Appeler le callback de redirection après connexion réussie
            return response.data;

        } catch (error) {
            setLoading(false);
            // @ts-ignore
            setError(error.response ? error.response.data : error.message);
            return null;
        }
    };

    return { login, loading, error };
};

export default useAuth;
