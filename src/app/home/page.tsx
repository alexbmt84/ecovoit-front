'use client';

import useUser from "@/hooks/useUser";
import {SearchTripCard} from "@/components/component/searchTripCard";
import {Loader} from "@/components/component/loader";
import {ListTrips} from "@/components/component/list-trips";
import {useAuth} from "@/context/authContext";

const Home = () => {

    const {userData, loading} = useUser();
    const {isAuthenticated, logout} = useAuth();

    if (loading) {
        return <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="fixed inset-0 flex items-center justify-center">
                <Loader/>
            </div>
        </main>
    }

    if (!userData) {
        return null;
    }

    return (
        <>
        <main className="flex min-h-screen flex-col items-center p-24">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">

                    <div className="max-w-2xl mx-auto text-center">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8 md:text-4xl">
                            Bienvenue, {userData.first_name} {userData.last_name} !
                        </h1>
                    </div>
                </div>
                <div className={"flex flex-row gap-8 mt-12"}>
                    <SearchTripCard/>
                    <ListTrips/>
                </div>

            </main>
        </>

    )
        ;
};

export default Home;
