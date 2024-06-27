import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export type VehicleData = {
    id: number;
    model: string;
    immatriculation: string;
    places: number;
    picture: string;
};

const useVehicle = () => {
    const [vehicleData, setVehicleData] = useState<VehicleData[]>([]);
    const router = useRouter();

    // Fonction pour ajouter un nouveau véhicule
    const addVehicle = async (newVehicle: Partial<VehicleData>) => {
        const token = sessionStorage.getItem('access_token');
        if (!token) {
            router.push('/login');
            return { ok: false, error: 'No token found' };
        }

        try {
            const response = await axios.post('https://api.ecovoit.tech/api/vehicles', newVehicle, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                // Ajouter le nouveau véhicule localement
                setVehicleData(prevVehicleData => [...prevVehicleData, response.data]);
                return { ok: true };
            } else {
                return { ok: false, error: 'Failed to add vehicle' };
            }

        } catch (error) {
            console.error('Erreur lors de l\'ajout du véhicule', error);
            return { ok: false, error: 'Failed to add vehicle' };
        }
    };

    // Fonction pour mettre à jour un véhicule existant
    const updateVehicle = async (vehicleId: number, updatedData: Partial<VehicleData>) => {
        const token = sessionStorage.getItem('access_token');
        if (!token) {
            router.push('/login');
            return { ok: false, error: 'No token found' };
        }

        try {
            const response = await axios.put(`https://api.ecovoit.tech/api/vehicles/${vehicleId}`, updatedData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                // Mettre à jour les données du véhicule localement
                setVehicleData(prevVehicleData =>
                    prevVehicleData.map(vehicle =>
                        vehicle.id === vehicleId ? { ...vehicle, ...response.data } : vehicle
                    )
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

    // Fonction pour supprimer un véhicule
    const deleteVehicle = async (vehicleId: number) => {
        const token = sessionStorage.getItem('access_token');
        if (!token) {
            router.push('/login');
            return { ok: false, error: 'No token found' };
        }

        try {
            const response = await axios.delete(`https://api.ecovoit.tech/api/vehicles/${vehicleId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 204) {
                // Supprimer le véhicule localement
                setVehicleData(prevVehicleData =>
                    prevVehicleData.filter(vehicle => vehicle.id !== vehicleId)
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
export default useVehicle;
