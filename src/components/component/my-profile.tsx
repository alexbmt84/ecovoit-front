import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useUser from "@/hooks/useUser";
import useVehicle, { VehicleData } from "@/hooks/useVehicle";
import { SpinnerWheel } from "@/components/component/spinner-wheel";
import { useRouter } from "next/navigation";
import { FilePenIcon } from "@/components/icons/Filepenicon";
import axios from "axios";
import {TrashIcon} from "@/components/icons/trashIcon";

export function MyProfile() {
    const { userData, updateUser } = useUser();
    const { addVehicle, updateVehicle, deleteVehicle } = useVehicle();
    const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    type FormData = {
        avatar: string;
        last_name: string;
        first_name: string;
        email: string;
        phone_number: string;
        vehicles: VehicleData[];
    };

    type FormVehicleData = {
        model: string;
        immatriculation: string;
        places: number;
        picture: string;
        user_id: number;
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
    const [showAddVehicleForm, setShowAddVehicleForm] = useState(false);

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

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const isModified = () => {
        const modifiedData = getModifiedFields(userData, formData);
        return Object.keys(modifiedData).length > 0;
    };

    const handleUpdateVehicle = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: string) => {
        const newVehicles = [...formData.vehicles];
        newVehicles[index] = { ...newVehicles[index], [field]: e.target.value };
        setFormData(prevState => ({
            ...prevState,
            vehicles: newVehicles
        }));
    };

    const handleAddVehicle = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setFormVehicleData(prevState => ({
            ...prevState,
            [field]: e.target.value
        }));
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
        e.preventDefault();
        const token = sessionStorage.getItem('access_token');

        if (!token) {
            router.push('/login');
            return;
        }

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

                    setSuccess("Votre profil a bien été mis a jour.");
                    setTimeout(() => {
                        setSuccess('');
                    }, 1000);
                } catch (error) {
                    console.error('Error updating user:', error);
                    setError('Nous n\'avons pas reussit a mettre a  jour votre profil');
                    setTimeout(() => {
                        setError('');
                    }, 1000);
                }
            } else {
                setError("Pas de changement.");
                setTimeout(() => {
                    setError('');
                }, 1000);
            }
        } else {
            setError("Utilisateur non trouvé.");
            setTimeout(() => {
                setError('');
            }, 1000);
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
                const newVehicle = { ...formVehicleData, user_id: userData.id };
                const addVehicleResponse = await addVehicle(newVehicle);

                    setFormVehicleData({
                        model: "",
                        immatriculation: "",
                        places: 0,
                        picture: "",
                        user_id: userData.id,
                    });


                    setShowAddVehicleForm(false);
                    window.location.reload();
                    setSuccess("Vehicule ajouté avec succé.");
                    setTimeout(() => {
                        setSuccess('');
                    }, 1000);

            } catch (error) {
                console.error('Error to add vehicle:', error);
                setError('Erreur d\'ajout du véhicule');
                setTimeout(() => {
                    setError('');
                }, 1000);
            }
        } else {
            setError("Utilisateur non trouvé.");
            setTimeout(() => {
                setError('');
            }, 1000);
        }
    };

    if (!userData) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="fixed inset-0 flex items-center justify-center">
                    <SpinnerWheel />
                </div>
            </main>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-gray-100 dark:bg-gray-900 p-6">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
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
                            onChange={handleProfileChange}
                        />
                    </div>
                    <div>
                        <Label className="block mb-1 text-gray-700 dark:text-gray-300" htmlFor="first_name">
                            Prénom
                        </Label>
                        <Input
                            className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            id="first_name"
                            placeholder={userData?.first_name}
                            type="text"
                            value={formData.first_name}
                            onChange={handleProfileChange}
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
                            value={formData.email}
                            onChange={handleProfileChange}
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
                            value={formData.phone_number}
                            onChange={handleProfileChange}
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

                <div className="pt-3 flex justify-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Mes véhicules</h2>
                </div>

                {/* Liste des véhicules de l'utilisateur */}
                <div>
                    {formData.vehicles.map((vehicle, index) => (
                        <div key={index} className="flex gap-2 mb-4">
                            <div className="flex-grow">
                                <Label className="block mb-1 text-gray-700 dark:text-gray-300"
                                       htmlFor={`model-${index}`}>
                                    Modèle
                                </Label>
                                <Input
                                    className="w-full text-center py-2 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    id={`model-${index}`}
                                    placeholder='SIAN FKP 37'
                                    type="text"
                                    value={vehicle?.model}
                                    disabled={true}
                                />
                            </div>
                            <div className="flex-grow">
                                <Label className="block mb-1 text-gray-700 dark:text-gray-300"
                                       htmlFor={`immatriculation-${index}`}>
                                    Immatriculation
                                </Label>
                                <Input
                                    className="w-full text-center py-2 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    id={`immatriculation-${index}`}
                                    placeholder="YY-000-YY"
                                    type="text"
                                    value={vehicle?.immatriculation}
                                    disabled={true}
                                />
                            </div>
                            <div className="w-1/3">
                                <Label className="block mb-1 text-gray-700 dark:text-gray-300"
                                       htmlFor={`places-${index}`}>
                                    Places
                                </Label>
                                <Input
                                    className="w-full text-center py-2 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    id={`places-${index}`}
                                    placeholder="..."
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={vehicle?.places}
                                    onChange={(e) => handleUpdateVehicle(e, index, 'places')}
                                />
                            </div>
                            <div className='flex items-center justify-center gap-1'>
                                <div className='flex items-center pt-4'>
                                    <FilePenIcon/>
                                </div>
                                <div className='flex items-center pt-4'>|</div>
                                <div className=' flex items-center pt-4'>
                                    <TrashIcon className="stroke-red-500"/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Formulaire pour ajouter un véhicule */}
                {showAddVehicleForm && (
                    <form className="space-y-4 pt-6" onSubmit={handleVehicleSubmit}>

                        <div className="flex gap-4">
                            <div className="flex-grow">
                                <Label className="block mb-1 text-gray-700 dark:text-gray-300" htmlFor="model">
                                    Modèle
                                </Label>
                                <Input
                                    className="w-full text-center py-2 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    id="model"
                                    placeholder='SIAN FKP 37'
                                    type="text"
                                    value={formVehicleData.model}
                                    onChange={(e) => handleAddVehicle(e, 'model')}
                                />
                            </div>
                            <div className="flex-grow">
                                <Label className="block mb-1 text-gray-700 dark:text-gray-300"
                                       htmlFor="immatriculation">
                                    Immatriculation
                                </Label>
                                <Input
                                    className="w-full text-center py-2 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    id="immatriculation"
                                    placeholder="YY-000-YY"
                                    type="text"
                                    value={formVehicleData.immatriculation}
                                    onChange={(e) => handleAddVehicle(e, 'immatriculation')}
                                />
                            </div>
                            <div className="w-1/3">
                                <Label className="block mb-1 text-gray-700 dark:text-gray-300" htmlFor="places">
                                    Places
                                </Label>
                                <Input
                                    className="w-full text-center py-2 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    id="places"
                                    placeholder="..."
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={formVehicleData.places}
                                    onChange={(e) => handleAddVehicle(e, 'places')}
                                />
                            </div>
                            <Button
                                className="w1/5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4"
                                type="submit"
                            >
                                OK
                            </Button>

                        </div>


                        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
                        {success && <p className="mt-4 text-center text-green-500">{success}</p>}
                    </form>
                )}
                <Button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4"
                    type="button"
                    onClick={() => setShowAddVehicleForm(true)}
                >
                    Ajouter un véhicule
                </Button>

            </div>
        </div>
    );
}
