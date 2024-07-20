import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export type VehicleData = {
    id: number;
    model: string;
    immatriculation: string;
    places: number;
    picture: string;
    user_id: number;
};

const useVehicle = () => {
    const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const addVehicle = async (newVehicle: Partial<VehicleData>) => {
        const token = sessionStorage.getItem('access_token');
        if (!token) {
            router.push('/login');
            return { ok: false, error: 'No token found' };
        }

        try {
            console.log('Cest quoi ques ce qui y a ici =>', newVehicle)
            const response = await axios.post(`${apiUrl}/api/vehicles`, newVehicle, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                setVehicleData(response.data);
                return { ok: true, data: response.data };
            } else {
                return { ok: false, error: 'Failed to add vehicle' };
            }

        } catch (error) {
            console.error('Erreur lors de l\'ajout du véhicule', error);
            return { ok: false, error: 'Failed to add vehicle' };
        }
    };

    const updateVehicle = async (vehicleId: number, updatedData: Partial<VehicleData>) => {
        const token = sessionStorage.getItem('access_token');
        if (!token) {
            router.push('/login');
            return { ok: false, error: 'No token found' };
        }

        try {
            const response = await axios.put(`${apiUrl}/api/vehicles/${vehicleId}`, updatedData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                setVehicleData(prevVehicleData =>
                    prevVehicleData ? { ...prevVehicleData, ...response.data } : null
                );
                return { ok: true };
            } else {
                return { ok: false, error: 'Failed to update vehicle' };
            }

        } catch (error) {
            console.error('Erreur lors de la mise à jour du véhicule', error);
            return { ok: false, error: 'Failed to update vehicle' };
        }
    };

    const deleteVehicle = async (vehicleId: number) => {
        const token = sessionStorage.getItem('access_token');
        if (!token) {
            router.push('/login');
            return { ok: false, error: 'No token found' };
        }

        try {
            const response = await axios.delete(`${apiUrl}/api/vehicles/${vehicleId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setVehicleData(prevVehicleData =>
                    prevVehicleData && prevVehicleData.id === vehicleId ? null : prevVehicleData
                );
                return { ok: true };
            } else {
                return { ok: false, error: 'Failed to delete vehicle' };
            }

        } catch (error) {
            console.error('Erreur lors de la suppression du véhicule', error);
            return { ok: false, error: 'Failed to delete vehicle' };
        }
    };

    return { vehicleData, addVehicle, updateVehicle, deleteVehicle };
};

// @ts-ignore
export default useVehicle;