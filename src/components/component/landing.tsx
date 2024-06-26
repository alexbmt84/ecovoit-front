import Link from "next/link"
import Image from "next/image";
import {WalletIcon} from "@/components/icons/WalletIcon";
import {UsersIcon} from "@/components/icons/UsersIcon";
import {TreesIcon} from "@/components/icons/TreesIcon";

export function Landing() {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <main className="flex-1">
                <section className="w-full pt-12 md:pt-24 lg:pt-32">
                    <div className="container px-4 md:px-6 space-y-10 xl:space-y-16">
                        <div
                            className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
                            <div>
                                <h1 className="lg:leading-tighter text-3xl mb-5 font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                                    Simplifiez vos trajets avec Ecovoit
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                    Réduisez votre empreinte carbone,
                                    économisez de l&apos;argent et créez
                                    des liens avec votre communauté grâce
                                    à notre plateforme de covoiturage facile à utiliser.
                                </p>
                                <div className="space-x-4 mt-6">
                                    <Link
                                        className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                                        href={"/login"}
                                    >
                                        Connexion
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <Image
                                    alt="Hero"
                                    className="mx-auto aspect-[2/1] overflow-hidden rounded-xl object-cover"
                                    height={400}
                                    src="/img/landing.webp"
                                    width={1270}
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container space-y-12 px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Pourquoi choisir Ecovoit ?
                                </h2>
                                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                    Notre plateforme de covoiturage offre une série d&apos;avantages
                                    pour vous aider à économiser du temps, de l&apos;argent et à préserver
                                    l&apos;environnement.
                                </p>
                            </div>
                        </div>
                        <div
                            className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
                            <div className="grid gap-1">
                                <WalletIcon className="h-8 w-8 text-gray-900 dark:text-gray-50"/>
                                <h3 className="text-lg font-bold">Économisez de l&apos;argent</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Réduisez vos frais de déplacement en partageant votre trajet
                                    avec d&apos;autres personnes faisant le même chemin.
                                </p>
                            </div>
                            <div className="grid gap-1">
                                <TreesIcon className="h-8 w-8 text-gray-900 dark:text-gray-50"/>
                                <h3 className="text-lg font-bold">Réduisez vos émissions</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Participez à la sauvegarde de l&apos;environnement en réduisant votre empreinte
                                    carbone grâce au covoiturage.
                                </p>
                            </div>
                            <div className="grid gap-1">
                                <UsersIcon className="h-8 w-8 text-gray-900 dark:text-gray-50"/>
                                <h3 className="text-lg font-bold">Rejoignez une communauté</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Connectez-vous avec amis et collègues en partageant des trajets
                                    et en établissant de nouvelles connexions.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                    <div
                        className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                                Ce que disent nos utilisateurs
                            </h2>
                            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                Écoutez les témoignages de personnes qui ont utilisé notre application de covoiturage
                                pour améliorer leurs trajets.
                            </p>
                        </div>
                        <div className="divide-y rounded-lg border">
                            <div
                                className="grid w-full grid-cols-3 items-stretch justify-center divide-x md:grid-cols-3">
                                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                                    <div className="space-y-2 text-center">
                                        <img
                                            alt="Avatar"
                                            className="mx-auto rounded-full"
                                            height="60"
                                            src="https://api.multiavatar.com/leaa.png"
                                            style={{
                                                aspectRatio: "60/60",
                                                objectFit: "cover",
                                            }}
                                            width="60"
                                        />
                                        <div className="font-semibold">Léa</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            Ecovoit a changé la donne pour mes trajets quotidiens.
                                            J&apos;ai économisé beaucoup d&apos;argent et je me suis fait de nouveaux
                                            amis.
                                        </div>
                                    </div>
                                </div>
                                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                                    <div className="space-y-2 text-center">
                                        <img
                                            alt="Avatar"
                                            className="mx-auto rounded-full"
                                            height="60"
                                            src="https://api.multiavatar.com/julien.png "
                                            style={{
                                                aspectRatio: "60/60",
                                                objectFit: "cover",
                                            }}
                                            width="60"
                                        />
                                        <div className="font-semibold">Julien</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            J&apos;étais hésitant au début, mais Ecovoit a
                                            rendu mon trajet tellement plus agréable. Hautement recommandé !
                                        </div>
                                    </div>
                                </div>
                                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                                    <div className="space-y-2 text-center">
                                        <img
                                            alt="Avatar"
                                            className="mx-auto rounded-full"
                                            height="60"
                                            src="https://api.multiavatar.com/saraccroche.png"
                                            style={{
                                                aspectRatio: "60/60",
                                                objectFit: "cover",
                                            }}
                                            width="60"
                                        />
                                        <div className="font-semibold">Sarah</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            Avec Ecovoit, j&apos;ai économisé du temps,
                                            de l&apos;argent et j&apos;ai eu le plaisir de rencontrer de nouvelles
                                            personnes.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="grid w-full grid-cols-3 items-stretch justify-center divide-x md:grid-cols-3">
                                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                                    <div className="space-y-2 text-center">
                                        <img
                                            alt="Avatar"
                                            className="mx-auto rounded-full"
                                            height="60"
                                            src="https://api.multiavatar.com/micha.png"
                                            style={{
                                                aspectRatio: "60/60",
                                                objectFit: "cover",
                                            }}
                                            width="60"
                                        />
                                        <div className="font-semibold">Michael</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            J&apos;étais sceptique au début,
                                            mais l&apos;application s&apos;est avérée être tellement pratique !
                                            Je la conseille à tous les étudiants de Nextech !
                                        </div>
                                    </div>
                                </div>
                                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                                    <div className="space-y-2 text-center">
                                        <img
                                            alt="Avatar"
                                            className="mx-auto rounded-full"
                                            height="60"
                                            src="https://api.multiavatar.com/ealjlk.png"
                                            style={{
                                                aspectRatio: "60/60",
                                                objectFit: "cover",
                                            }}
                                            width="60"
                                        />
                                        <div className="font-semibold">Emilie</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            J&apos;adore utiliser cette application.
                                            C&apos;est un excellent moyen de réduire mon empreinte carbone.
                                        </div>
                                    </div>
                                </div>
                                <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                                    <div className="space-y-2 text-center">
                                        <img
                                            alt="Avatar"
                                            className="mx-auto rounded-full"
                                            height="60"
                                            src="https://api.multiavatar.com/nassimm.png"
                                            style={{
                                                aspectRatio: "60/60",
                                                objectFit: "cover",
                                            }}
                                            width="60"
                                        />
                                        <div className="font-semibold">Nassim</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            Merci Ecovoit ! J&apos;ai pu partager mes frais d&apos;essence et commencer
                                            à faire de belles économies chaque mois !
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Ecovoit. Tous droits réservés.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Conditions d&apos;utilisation
                    </Link>
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Mentions légales
                    </Link>
                </nav>
            </footer>
        </div>
    )
}