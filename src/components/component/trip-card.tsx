/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/gB79J0cEJQF
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// @ts-ignore
export function TripCard(props) {
  return (
    <Card className="w-full max-w-4xl mx-auto p-8 bg-white dark:bg-gray-950 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="border-2 border-gray-200 dark:border-gray-800">
            <AvatarImage alt="Driver" src="/placeholder-user.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-2xl font-bold">{ props.tripDriverFirstName } {props.tripDriverLastName}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-lg">Driver</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <UsersIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-500 dark:text-gray-400 text-lg">3 passengers</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h4 className="text-gray-500 dark:text-gray-400 text-lg mb-2">Departure</h4>
          <div className="flex items-center gap-3">
            <MapPinIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            <span className="font-medium text-lg">{ props.tripDeparture }</span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <ClockIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            <span className="font-medium text-lg">8:30 AM</span>
          </div>
        </div>
        <div>
          <h4 className="text-gray-500 dark:text-gray-400 text-lg mb-2">Destination</h4>
          <div className="flex items-center gap-3">
            <MapPinIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            <span className="font-medium text-lg">{ props.tripDestination }</span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <ClockIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            <span className="font-medium text-lg">11:45 AM</span>
          </div>
        </div>
      </div>
      <div className="mt-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ClockIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-500 dark:text-gray-400 text-lg">3h 15m</span>
        </div>
        <div className="flex items-center gap-3">
          <DollarSignIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          <span className="font-medium text-lg">$20 per passenger</span>
        </div>
      </div>
      <Button className="w-full mt-10 py-3 text-lg font-medium">Join Carpool</Button>
    </Card>
  )
}

// @ts-ignore
function ClockIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}


// @ts-ignore
function DollarSignIcon(props) {
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
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}


// @ts-ignore
function MapPinIcon(props) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}


// @ts-ignore
function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}