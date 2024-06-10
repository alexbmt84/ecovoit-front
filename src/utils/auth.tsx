// Check if User is authenticated
export const isAuthenticated = () => {
    if (typeof window !== 'undefined') {
        const token = sessionStorage.getItem('access_token');
        return !!token;
    }
    return false;
};
