import Image from "next/image";
import {Navbar} from "@/components/component/navbar";
import {Landing} from "@/components/component/landing";

export default function Home() {
    return (
        <>
            <Navbar/>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
             <Landing/>
            </main>
        </>
    );
}
