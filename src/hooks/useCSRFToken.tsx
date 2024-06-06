import {useEffect} from 'react';
import axios from "axios";

const useCSRFToken = () => {
    axios.defaults.withXSRFToken = true;
    axios.defaults.withCredentials = true;

    useEffect(() => {
        async function fetchCSRFToken() {
            try {
                const response = await axios.get('https://api.ecovoit.tech/csrf-token');
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
