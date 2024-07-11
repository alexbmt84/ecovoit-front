import React, {useState, useEffect} from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import useUser from "@/hooks/useUser";
import useVehicle, {VehicleData} from "@/hooks/useVehicle";
import {SpinnerWheel} from "@/components/component/spinner-wheel";

export function MyProfil() {
    const {userData, updateUser} = useUser();
    const {addVehicle, updateVehicle, deleteVehicle, vehicleData} = useVehicle();
    const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);

    type FormData = {
        avatar: string;
        last_name: string;
        first_name: string;
        email: string;
        phone_number: string;
        vehicles: VehicleData[];
    };

    type VehicleData = {
        id: number;
        model: string;
        immatriculation: string;
        places: number;
        picture: string;
    };

    const [formData, setFormData] = useState<FormData>({
        avatar: "",
        last_name: "",
        first_name: "",
        email: "",
        phone_number: "",
        vehicles: [],
    });

    const [success, setSuccess] = useState('');
    const [error, setError] = useState<string | undefined>('');

    useEffect(() => {
        if (userData) {
            setFormData({
                avatar: userData.avatar,
                last_name: userData.last_name,
                first_name: userData.first_name,
                email: userData.email,
                phone_number: userData.phone_number,
                vehicles: Array.isArray(userData.vehicles) ? userData.vehicles : []
            });
        }
        console.log(formData)
    }, [userData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number | null = null, field: string | null = null) => {
        if (index !== null && field !== null) {
            const newVehicles = [...formData.vehicles];
            newVehicles[index] = {...newVehicles[index], [field]: e.target.value};
            setFormData({...formData, vehicles: newVehicles});
        } else {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            });
        }
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedAvatar(file);
            // Mettre à jour l'URL de l'avatar dans l'état local directement
            setFormData(prevFormData => ({
                ...prevFormData,
                avatar: URL.createObjectURL(file)
            }));
        }
    };

    const handleUploadAvatar = async () => {
        if (!selectedAvatar) return;

        const formData = new FormData();
        formData.append('avatar', selectedAvatar);

        try {
            const response = await fetch('/api/upload/avatar', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const { avatarUrl } = await response.json(); // Supposons que l'API retourne l'URL de l'avatar
                setFormData(prevFormData => ({
                    ...prevFormData,
                    avatar: avatarUrl,
                }));
                setSuccess('Avatar mis à jour avec succès.');
            } else {
                setError('Échec de la mise à jour de l\'avatar.');
            }
        } catch (error) {
            console.error('Erreur lors du téléchargement de l\'avatar :', error);
            setError('Échec de la mise à jour de l\'avatar.');
        }
    };

    const getModifiedFields = (original: any, updated: any) => {
        const modifiedFields: any = {};
        for (const key in updated) {
            if (JSON.stringify(updated[key]) !== JSON.stringify(original[key])) {
                modifiedFields[key] = updated[key];
            }
        }
        return modifiedFields;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (userData?.id) {
            const modifiedData = getModifiedFields(userData, formData);
            if (Object.keys(modifiedData).length > 0) {
                try {
                    const response = await updateUser(userData.id, modifiedData);
                    if (response.ok) {
                        setSuccess("User updated successfully.");
                    } else {
                        setError(`Failed to update user: ${response.error}`);
                    }
                } catch (error) {
                    console.error('Error updating user:', error);
                    setError('Failed to update user');
                }
            } else {
                setError("No changes to update.");
            }
        } else {
            setError("User ID is missing.");
        }
    };

    const handleAddVehicle = () => {
        setFormData({
            ...formData,
            vehicles: [...formData.vehicles, {id: Date.now(), model: "", immatriculation: "", places: 1, picture: ""}]
        });
    };

    const handleDeleteVehicle = async (vehicleId: number) => {
        const response = await deleteVehicle(vehicleId);
        if (!response.ok) {
            setError(response.error);
        } else {
            setFormData(prevState => {

                const filteredVehicles = prevState.vehicles.filter(vehicle => {
                    console.log("Checking vehicle ID: ", vehicle.id);
                    return vehicle.id !== vehicleId;
                });

                setSuccess("Vehicle deleted successfully.");

                return {
                    ...prevState,
                    vehicles: filteredVehicles,
                };
            });
        }
    };


    const handleUpdateVehicle = async (vehicleId: number, updatedData: Partial<VehicleData>) => {
        const response = await updateVehicle(vehicleId, updatedData);
        if (!response.ok) {
            setError(response.error);
        } else {
            setSuccess("Vehicle updated successfully.");
        }
    };

    if (!userData) {
        return (<main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="fixed inset-0 flex items-center justify-center">
                    <SpinnerWheel/>
                </div>
            </main>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-gray-100 dark:bg-gray-900 p-6">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="flex flex-col items-center mb-6">
                    <div className="relative w-32 h-32 mb-4">
                        <img
                            alt="Profile Avatar"
                            className="rounded-full w-full h-full object-cover"
                            height={128}
                            src={formData.avatar || `/avatar/${userData?.avatar}`}
                            style={{aspectRatio: "128/128", objectFit: "cover"}}
                            width={128}
                        />
                        <div
                            className="absolute bottom-0 right-0 bg-gray-900 dark:bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
                            onClick={() => document.getElementById('fileInput')?.click()}
                        >
                            <FilePenIcon className="w-5 h-5"/>
                            <input
                                type="file"
                                id="fileInput"
                                style={{display: 'none'}}
                                onChange={handleAvatarChange}
                            />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Profile</h2>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                    <Label className="block mb-1 text-gray-700 dark:text-gray-300" htmlFor="last_name">
                            Nom
                        </Label>
                        <Input
                            className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            id="last_name"
                            placeholder={userData?.last_name}
                            type="text"
                            value={formData.last_name}
                            pattern="^[A-Za-zÀ-ÖØ-öø-ÿ'-\s]+$"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label className="block mb-1 text-gray-700 dark:text-gray-300" htmlFor="first_name">
                            Prenom
                        </Label>
                        <Input
                            className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            id="first_name"
                            placeholder={userData?.first_name}
                            type="text"
                            value={formData.first_name}
                            pattern="^[A-Za-zÀ-ÖØ-öø-ÿ'-\s]+$"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label className="block mb-1 text-gray-700 dark:text-gray-300" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            id="email"
                            placeholder={userData?.email}
                            type="email"
                            pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label className="block mb-1 text-gray-700 dark:text-gray-300" htmlFor="phone_number">
                            Téléphone
                        </Label>
                        <Input
                            className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            id="phone_number"
                            placeholder={userData?.phone_number}
                            type="tel"
                            pattern="(\d{2}){5}"
                            value={formData.phone_number}
                            onChange={handleChange}
                        />
                    </div>

                    {formData.vehicles.map((vehicle) => (

                        <div key={vehicle.id} className="flex gap-4">
                            <div className="flex-grow">
                                <Label className="block mb-1 text-gray-700 dark:text-gray-300"
                                       htmlFor={`vehicle_${vehicle.id}_model`}>
                                    Modèle
                                </Label>
                                <Input
                                    className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    id={`model-${vehicle.id}`}
                                    placeholder={vehicle.model}
                                    type="text"
                                    value={vehicle.model}
                                    onChange={(e) => handleChange(e, vehicle.id, 'model')}
                                />
                            </div>
                            <div className="flex-grow">
                                <Label className="block mb-1 text-gray-700 dark:text-gray-300"
                                       htmlFor={`vehicle_${vehicle.id}_immatriculation`}>
                                    Immatriculation
                                </Label>
                                <Input
                                    className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    id={`immatriculation-${vehicle.id}`}
                                    placeholder={vehicle.immatriculation}
                                    type="text"
                                    value={vehicle.immatriculation}
                                    onChange={(e) => handleChange(e, vehicle.id, 'immatriculation')}
                                />
                            </div>
                            <div className="w-1/3">
                                <Label className="block mb-1 text-gray-700 dark:text-gray-300"
                                       htmlFor={`vehicle_${vehicle.id}_places`}>
                                    Places
                                </Label>
                                <Input
                                    className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    id={`places-${vehicle.id}`}
                                    placeholder="2"
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={vehicle.places}
                                    onChange={(e) => handleChange(e, vehicle.id, 'places')}
                                />
                            </div>
                            {vehicle.id !== undefined && (
                                <Button
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mt-4"
                                    type="button"
                                    onClick={() => handleDeleteVehicle(vehicle.id!)}
                                >
                                    X
                                </Button>
                            )}
                        </div>
                    ))}

                    <Button
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4"
                        type="button"
                        onClick={handleAddVehicle}
                    >
                        Ajouter un véhicule
                    </Button>

                    <Button
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        type="submit"
                    >
                        Modifier
                    </Button>
                    {error && <p className="mt-4 text-center text-red-500">{error}</p>}
                    {success && <p className="mt-4 text-center text-green-500">{success}</p>}
                </form>
            </div>
        </div>
    );
}

// @ts-ignore
function FilePenIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"/>
            <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
            <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"/>
        </svg>
    );
}
