import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchTrips(token: string, paramsObj: Record<string, string>): Promise<any> {
    const baseUrl = `${apiUrl}/api/trips`;
    const params = new URLSearchParams(paramsObj).toString();

    try {
        const response = await axios.get(`${baseUrl}?${params}`, {
            headers: {'Authorization': `Bearer ${token}`}
        });

        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return null;
        } else {
            console.error('An error occurred:', error);
            throw error;
        }
    }
}

export async function fetchDirections(departure: string, arrival: string): Promise<google.maps.DirectionsResult | null> {
    const directionsService = new google.maps.DirectionsService();
    return new Promise((resolve, reject) => {
        directionsService.route({
            origin: `${departure}, France`,
            destination: `${arrival}, France`,
            travelMode: google.maps.TravelMode.DRIVING
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                resolve(result);
            } else {
                reject(`Error fetching directions. Status: ${status}`);
            }
        });
    });
}
