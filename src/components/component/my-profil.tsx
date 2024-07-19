import React, {useState, useEffect} from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import useUser from "@/hooks/useUser";
import useVehicle, {VehicleData} from "@/hooks/useVehicle";
import {SpinnerWheel} from "@/components/component/spinner-wheel";
import {useRouter} from "next/navigation";
import {FilePenIcon} from "@/components/icons/Filepenicon";
import axios from "axios";

export function MyProfil() {
    const {userData, updateUser} = useUser();
    const {addVehicle, updateVehicle, deleteVehicle, vehicleData} = useVehicle();
    const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const nameRegex ="/^[A-Za-zÀ-ÖØ-öø-ÿ'\-\s]+$/";
    const emailRegex = "/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/";

    type FormData = {
        avatar: string;
        last_name: string;
        first_name: string;
        email: string;
        phone_number: string;
        vehicles: VehicleData[];
    };

    type FormVehicleData = {
        model: string,
        immatriculation: string,
        places: number,
        picture: string,
        user_id: number,
    };

    const [formData, setFormData] = useState<FormData>({
        avatar: "",
        last_name: "",
        first_name: "",
        email: "",
        phone_number: "",
        vehicles: [],
    });

    const [formVehicleData, setFormVehicleData] = useState<FormVehicleData>({
        model: "",
        immatriculation: "",
        places: 0,
        picture: "",
        user_id: 0,
    });

    const [success, setSuccess] = useState('');
    const [error, setError] = useState<string | undefined>('');
    const [profilIsModified, setProfilIsModified] = useState(false);

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
    }, [userData]);

    useEffect(() => {
        if (vehicleData && userData) {
            setFormVehicleData({
                model: vehicleData.model,
                immatriculation: vehicleData.immatriculation,
                places: vehicleData.places,
                picture: vehicleData.picture,
                user_id: userData.id,
            });
        }
    }, [vehicleData]);

    // Fonction pour déterminer si le formulaire est modifié
    const isModified = () => {
        const modifiedData = getModifiedFields(userData, formData);
        return Object.keys(modifiedData).length > 0;
    };

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
            setAvatarPreview(URL.createObjectURL(file));
            setFormData(prevFormData => ({
                ...prevFormData,
                avatar: file.name
            }));

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

        const token = sessionStorage.getItem('access_token');

        if (!token) {
            router.push('/login');
            return;
        }

        e.preventDefault();
        if (userData?.id) {
            const modifiedData = getModifiedFields(userData, formData);
            if (Object.keys(modifiedData).length > 0) {
                try {
                    const response = await updateUser(userData.id, modifiedData);
                    if (response.ok && selectedAvatar) {
                        const formData = new FormData();
                        formData.append('file', selectedAvatar);
                        try {
                            const uploadResponse = await axios.post(`${apiUrl}/api/upload`, formData, {
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                }
                            });

                        } catch (err) {
                            console.error('Error during the file upload:', err);
                        }
                    }

                    setSuccess("User data updated successfully.");
                    setTimeout(() => {
                        setSuccess('');
                    }, 1000);

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


    const handleVehicleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = sessionStorage.getItem('access_token');

        if (!token) {
            router.push('/login');
            return;
        }

        if (userData?.id) {
            try {
                const addVehicleResponse = await addVehicle(formVehicleData);

                if (addVehicleResponse.ok) {
                    // Mettre à jour l'état des véhicules
                    setFormData(prevState => ({
                        ...prevState,
                        vehicles: [...prevState.vehicles, addVehicleResponse.data]
                    }));
                    setSuccess("Vehicle added successfully.");
                    setTimeout(() => {
                        setSuccess('');
                    }, 1000);
                } else {
                    setError('Failed to add vehicle');
                }
            } catch (error) {
                console.error('Error adding vehicle:', error);
                setError('Error adding vehicle');
            }
        } else {
            setError("User ID is missing.");
        }
    };

    const handleAddVehicle = () => {
        setFormData(prevState => ({
            ...prevState,
            vehicles: [...prevState.vehicles, { id: Date.now(), model: "", immatriculation: "", places: 1, picture: "", user_id: userData?.id || 0 }]
        }));
    };

    // const handleDeleteVehicle = async (vehicleId: number) => {
    //     const response = await deleteVehicle(vehicleId);
    //     if (!response.ok) {
    //         setError(response.error);
    //     } else {
    //         setFormData(prevState => {
    //
    //             const filteredVehicles = prevState.vehicles.filter(vehicle => {
    //
    //                 return vehicle.id !== vehicleId;
    //             });
    //
    //             setSuccess("Vehicle deleted successfully.");
    //
    //             return {
    //                 ...prevState,
    //                 vehicles: filteredVehicles,
    //             };
    //         });
    //     }
    // };


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
                            src={avatarPreview || `${userData?.avatar}`}
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
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Mon Profile</h2>
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
                            pattern={nameRegex}
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
                            pattern={nameRegex}
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
                            pattern={emailRegex}
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

                    <Button
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        type="submit"
                        disabled={!isModified()}
                    >
                        Modifier
                    </Button>

                </form>

                <form className="space-y-4" onSubmit={handleVehicleSubmit}>
                    <div className="pt-3 flex justify-center">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Mes véhicules</h2>
                    </div>


                        <div className="flex gap-4">
                            <div className="flex-grow">
                                <Label className="block mb-1 text-gray-700 dark:text-gray-300"
                                       htmlFor="model">
                                    Modèle
                                </Label>
                                <Input
                                    className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    id="model"
                                    placeholder='SIAN FKP 37'
                                    type="text"
                                    value={vehicleData?.model}
                                    onChange={(e) => handleChange(e, vehicleData?.id, 'model')}
                                />
                            </div>
                            <div className="flex-grow">
                                <Label className="block mb-1 text-gray-700 dark:text-gray-300"
                                       htmlFor="immatriculation">
                                    Immatriculation
                                </Label>
                                <Input
                                    className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    id="immatriculation"
                                    placeholder="YY-000-YY"
                                    type="text"
                                    value={vehicleData?.immatriculation}
                                    onChange={(e) => handleChange(e, vehicleData?.id, 'immatriculation')}
                                />
                            </div>
                            <div className="w-1/3">
                                <Label className="block mb-1 text-gray-700 dark:text-gray-300"
                                       htmlFor="places">
                                    Places
                                </Label>
                                <Input
                                    className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    id="places"
                                    placeholder="..."
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={vehicleData?.places}
                                    onChange={(e) => handleChange(e, vehicleData?.id, 'places')}
                                />
                            </div>
                            {vehicleData?.id !== undefined && (
                                <Button
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mt-4"
                                    type="button"
                                    //onClick={() => handleDeleteVehicle(vehicle.id!)}
                                >
                                    X
                                </Button>
                            )}
                            <div>
                                <Button type='submit'
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4"
                                >
                                    Ok
                                </Button>
                            </div>
                        </div>

                    <Button
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4"
                        type="button"
                        onClick={handleAddVehicle}
                    >
                        Ajouter un véhicule
                    </Button>

                    {error && <p className="mt-4 text-center text-red-500">{error}</p>}
                    {success && <p className="mt-4 text-center text-green-500">{success}</p>}
                </form>
            </div>
        </div>
    );
}


