import {Card, CardHeader, CardContent} from "@/components/ui/card"
import {MapPinIcon} from "@/components/icons/MapPinIcon";
import useUser from "@/hooks/useUser";
import React, {
    AwaitedReactNode,
    JSX,
    JSXElementConstructor,
    ReactElement,
    ReactNode,
    ReactPortal,
    SVGProps
} from "react";
import Link from "next/link";
import {VehicleData} from "@/hooks/useVehicle";
import {Button} from "@/components/ui/button";

export function TripCard(props: {
    trip: {
        departure: string,
        destination: string,
        departure_time: string,
        totalPassengers: number,
        driverName: string,
        driverId: number
        vehicle: VehicleData;
    },
    userId: number | null
}) {

    const {userData} = useUser();

    function toTitleCase(str: string) {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
            }
        );
    }

    console.log(props)

    return (
        <Card className="shadow-md rounded-lg max-w-md mx-auto lg:min-w-[350px]">
            <CardHeader
                className="bg-[#F3F4F6] text-primary-foreground p-4 flex flex-col items-center rounded-t-md justify-center">
                <div className={"flex mb-3"}>
                    <div className="flex items-center gap-2">
                        {/*<CarIcon className="w-5 h-5 mt-1"/>*/}
                        <span className="font-medium">{toTitleCase(props.trip.departure)}</span>
                    </div>
                    <ArrowRightIcon className="w-5 h-5 mr-2 ml-2 mt-1"/>
                    <div className="flex items-center gap-2">
                        <span className="font-medium">{toTitleCase(props.trip.destination)}</span>
                        {/*<MapPinIcon className="w-5 h-5"/>*/}
                    </div>
                </div>
                <div className={"flex"}>
                    <SteeringWheelIcon className="w-5 h-5 text-muted-foreground mr-1 mt-0.5"/>
                    <span className="text-muted-foreground mr-4 font-semibold text-gray-500">
                    <Link href={`/profil/${props.trip.driverId}`}>
                        {props.trip.driverName}
                    </Link>
                </span>
                </div>

            </CardHeader>
            <CardContent className="p-6 flex flex-col items-center justify-center gap-4">
                <div className="flex items-center justify-between">

                    <div className="flex items-center">
                        <div className="flex items-center">
                            <CarIcon className="w-5 h-5 text-muted-foreground mr-1"/>
                            <span className="text-muted-foreground mr-4">{props.trip.vehicle.model}</span>
                        </div>
                        <UsersIcon className="w-5 h-5 text-muted-foreground mr-1"/>
                        <span className="text-muted-foreground">
                            {
                                props.trip.totalPassengers > 1 ?
                                    props.trip.totalPassengers + ' Passagers' :
                                    props.trip.totalPassengers + ' Passager'
                            }
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex items-center">
                            <CalendarIcon className="w-5 h-5 text-muted-foreground mr-1"/>
                            <span className="text-muted-foreground mr-4">
                            {
                                new Date(props.trip.departure_time).toLocaleDateString("fr", {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric'
                                })
                            }
                             </span>
                        </div>
                        <ClockIcon className="w-5 h-5 text-muted-foreground mr-1"/>
                        <span className="text-muted-foreground">
                              {
                                  new Date(props.trip.departure_time).getUTCHours() < 10 ?
                                      "0" + new Date(props.trip.departure_time).getUTCHours() :
                                      new Date(props.trip.departure_time).getUTCHours()
                              }
                            h
                            {
                                new Date(props.trip.departure_time).getMinutes() === 0 ?
                                    new Date(props.trip.departure_time).getMinutes() + "0" :
                                    new Date(props.trip.departure_time).getMinutes()
                            }
                        </span>
                    </div>
                </div>
                {props.userId === props.trip.driverId ? (
                    <>
                        <Button className={"w-[70%] mt-3"}>Démarrer le trajet</Button>
                        <Button className={"w-[70%] mb-3"}>Annuler le trajet</Button>
                    </>
                ) : (
                    <Button className={"mt-3 mb-3"}>Quitter le trajet</Button>
                )}
            </CardContent>
        </Card>
    )
}

function ArrowRightIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="M5 12h14"/>
            <path d="m12 5 7 7-7 7"/>
        </svg>
    )
}


function CalendarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="M8 2v4"/>
            <path d="M16 2v4"/>
            <rect width="18" height="18" x="3" y="4" rx="2"/>
            <path d="M3 10h18"/>
        </svg>
    )
}


function CarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path
                d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
            <circle cx="7" cy="17" r="2"/>
            <path d="M9 17h6"/>
            <circle cx="17" cy="17" r="2"/>
        </svg>
    )
}


function ClockIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
        </svg>
    )
}

function SteeringWheelIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12 21.68C10.084 21.6821 8.21041 21.1155 6.61662 20.052C5.02284 18.9884 3.78052 17.4759 3.047 15.7058C2.31349 13.9357 2.12178 11.9878 2.49614 10.1087C2.87051 8.22956 3.79412 6.50382 5.15 5.15001C6.27575 4.02035 7.66293 3.18602 9.18845 2.72103C10.714 2.25604 12.3307 2.17477 13.8952 2.48443C15.4596 2.79409 16.9235 3.4851 18.1568 4.49617C19.3902 5.50723 20.355 6.80708 20.9655 8.28041C21.576 9.75373 21.8135 11.355 21.6568 12.9421C21.5001 14.5292 20.9541 16.0531 20.0673 17.3786C19.1804 18.704 17.9801 19.7901 16.5728 20.5405C15.1655 21.2908 13.5948 21.6823 12 21.68ZM12 3.82001C10.9249 3.81628 9.85968 4.02556 8.8659 4.43577C7.87212 4.84599 6.96944 5.44901 6.21 6.21001C4.72575 7.75607 3.90668 9.82234 3.92853 11.9654C3.95039 14.1085 4.81143 16.1576 6.3269 17.6731C7.84237 19.1886 9.8915 20.0496 12.0346 20.0715C14.1777 20.0933 16.2439 19.2743 17.79 17.79C18.9364 16.646 19.7173 15.1874 20.0339 13.5991C20.3505 12.0108 20.1885 10.3642 19.5684 8.86806C18.9483 7.37192 17.8981 6.09351 16.5507 5.19484C15.2034 4.29617 13.6196 3.81768 12 3.82001Z"
                fill="#637377"/>
            <path
                d="M12 14.69C11.468 14.69 10.9479 14.5322 10.5055 14.2367C10.0631 13.9411 9.71836 13.5209 9.51476 13.0294C9.31116 12.5379 9.25789 11.997 9.36169 11.4752C9.46548 10.9534 9.72168 10.4741 10.0979 10.0979C10.4741 9.72168 10.9534 9.46548 11.4752 9.36169C11.997 9.25789 12.5379 9.31116 13.0294 9.51476C13.5209 9.71836 13.9411 10.0631 14.2367 10.5055C14.5322 10.9479 14.69 11.468 14.69 12C14.6874 12.7126 14.4031 13.3953 13.8992 13.8992C13.3953 14.4031 12.7126 14.6874 12 14.69ZM12 10.81C11.7646 10.81 11.5346 10.8798 11.3389 11.0106C11.1432 11.1413 10.9907 11.3272 10.9006 11.5446C10.8105 11.7621 10.7869 12.0013 10.8329 12.2322C10.8788 12.463 10.9921 12.675 11.1585 12.8415C11.325 13.0079 11.537 13.1212 11.7678 13.1671C11.9987 13.213 12.2379 13.1895 12.4554 13.0994C12.6728 13.0093 12.8587 12.8568 12.9894 12.6611C13.1202 12.4654 13.19 12.2354 13.19 12C13.19 11.6844 13.0646 11.3817 12.8415 11.1585C12.6183 10.9354 12.3156 10.81 12 10.81Z"
                fill="#06B6D4"/>
            <path
                d="M20.94 12.75H13.94C13.7411 12.75 13.5503 12.671 13.4097 12.5303C13.269 12.3897 13.19 12.1989 13.19 12C13.19 11.8011 13.269 11.6103 13.4097 11.4697C13.5503 11.329 13.7411 11.25 13.94 11.25H20.94C21.1389 11.25 21.3297 11.329 21.4703 11.4697C21.611 11.6103 21.69 11.8011 21.69 12C21.69 12.1989 21.611 12.3897 21.4703 12.5303C21.3297 12.671 21.1389 12.75 20.94 12.75Z"
                fill="#637377"/>
            <path
                d="M10.06 12.75H3.06C2.86109 12.75 2.67032 12.671 2.52967 12.5303C2.38902 12.3897 2.31 12.1989 2.31 12C2.31 11.8011 2.38902 11.6103 2.52967 11.4697C2.67032 11.329 2.86109 11.25 3.06 11.25H10.06C10.2589 11.25 10.4497 11.329 10.5903 11.4697C10.731 11.6103 10.81 11.8011 10.81 12C10.81 12.1989 10.731 12.3897 10.5903 12.5303C10.4497 12.671 10.2589 12.75 10.06 12.75Z"
                fill="#637377"/>
            <path
                d="M12 21.69C11.8019 21.6874 11.6126 21.6076 11.4725 21.4675C11.3324 21.3274 11.2526 21.1381 11.25 20.94V13.94C11.25 13.7411 11.329 13.5503 11.4697 13.4097C11.6103 13.269 11.8011 13.19 12 13.19C12.1989 13.19 12.3897 13.269 12.5303 13.4097C12.671 13.5503 12.75 13.7411 12.75 13.94V20.94C12.7474 21.1381 12.6676 21.3274 12.5275 21.4675C12.3874 21.6076 12.1981 21.6874 12 21.69Z"
                fill="#637377"/>
        </svg>
    )
}


function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
        </svg>
    )
}


function UsersIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
    )
}