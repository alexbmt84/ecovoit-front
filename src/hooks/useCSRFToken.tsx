import {useEffect} from 'react';
import axios from "axios";

const useCSRFToken = () => {
    axios.defaults.withXSRFToken = true;
    axios.defaults.withCredentials = true;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        async function fetchCSRFToken() {
            try {
                const response = await axios.get(`${apiUrl}/csrf-token`);
                const csrfToken = response.data.csrf_token;
                localStorage.setItem('csrfToken', csrfToken);
            } catch (error) {
                console.error('Unable to fetch CSRF token:', error);
            }
        }

        fetchCSRFToken();

    }, []);
};

export default useCSRFToken;
