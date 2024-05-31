import {useEffect} from 'react';

const useCSRFToken = () => {
    useEffect(() => {
        async function fetchCSRFToken() {
            try {
                const response = await fetch('https://api.ecovoit.tech/csrf-token');
                const data = await response.json();  // Convertit la réponse en JSON
                const csrfToken = data.csrf_token;
                localStorage.setItem('csrfToken', csrfToken);  // Stocker le token dans localStorage
            } catch (error) {
                console.error('Unable to fetch CSRF token:', error);
            }
        }

        fetchCSRFToken();
    }, []);
};

export default useCSRFToken;
