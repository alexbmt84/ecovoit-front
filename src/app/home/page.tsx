'use client';

import useUser from "@/hooks/useUser";
import {Navbar} from "@/components/component/navbar";
import {SearchTripCard} from "@/components/component/searchTripCard";
import {Loader} from "@/components/component/loader";
import useAuth from "@/hooks/useAuth";
import {useIsLoggedIn} from "@/hooks/useIsLoggedIn";
import {ListTripCard} from "@/components/component/listTripCard";
import {ListTrips} from "@/components/component/list-trips";

const Home = () => {

    const {userData, loading} = useUser();
    const {logout} = useAuth();
    const isLoggedIn = useIsLoggedIn();

    if (loading) {
        return <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Loader/>
        </main>
    }

    if (!userData) {
        return null;
    }

    return (
        <>
            <Navbar onLogout={logout} isLoggedIn={isLoggedIn}/>
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
