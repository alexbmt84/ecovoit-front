// pages/profile/[id].tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Profile from "@/components/component/profile"; // Importer le composant Profile
import { Loader } from "@/components/component/loader";
import {SpinnerWheel} from "@/components/component/spinner-wheel"; // Importer un composant Loader

// Composant de la page de profil
export default function ProfilePage() {
    const params = useParams(); // Récupère les paramètres de l'URL (ici, l'ID de l'utilisateur)
    const router = useRouter();
    const [user, setUser] = useState(null); // State pour stocker les données de l'utilisateur
    const [loading, setLoading] = useState(true); // State pour gérer l'état de chargement
    const [error, setError] = useState<string | null>(null); // State pour gérer les erreurs
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // Effectue une requête pour récupérer les données de l'utilisateur
    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            const token = sessionStorage.getItem('access_token');
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                const response = await axios.get(`${apiUrl}/api/users/${params.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(response.data); // Met à jour les données de l'utilisateur
                setError(null); // Réinitialise l'erreur
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                setError('User not found or an error occurred while fetching user data'); // Met à jour l'erreur
            } finally {
                setLoading(false); // Met fin à l'état de chargement
            }
        };

        if (params.id) {
            getUser(); // Appelle la fonction pour récupérer les données de l'utilisateur
        }
    }, [params.id]);

    // Affiche un loader si les données sont en cours de chargement
    if (loading) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="fixed inset-0 flex items-center justify-center">
                    <SpinnerWheel/>
                </div>
            </main>
        );
    }

    // Affiche un message d'erreur si une erreur est survenue
    if (error) {
        return (
            <main className="flex min-h-screen flex-col items-center p-24">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="text-red-500">{error}</div>
                </div>
            </main>
        );
    }

    // Affiche les données de l'utilisateur ou un message si l'utilisateur n'est pas trouvé
    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {user ? (
                    <Profile user={user} /> // Utilise le composant Profile pour afficher les données de l'utilisateur
                ) : (
                    <div>User not found</div>
                )}
            </div>
        </main>
    );
}
