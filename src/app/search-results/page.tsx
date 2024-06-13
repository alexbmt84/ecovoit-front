"use client";

import MapComponent from "@/components/component/map";

export default function Page() {

    return (
        <>
            <main className="flex min-h-screen flex-col items-center p-24">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <MapComponent/>
                </div>
            </main>
        </>

    );
}

