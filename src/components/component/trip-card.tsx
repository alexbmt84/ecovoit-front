import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {UsersIcon} from "@/components/icons/UsersIcon";
import {MapPinIcon} from "@/components/icons/MapPinIcon";
import {ClockIcon} from "@/components/icons/ClockIcon";
import {DollarSignIcon} from "@/components/icons/DollarSignIcon";

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