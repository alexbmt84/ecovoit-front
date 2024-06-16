import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { JSX, SVGProps } from "react"

const Profil = ({ user }) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage alt={user.name} src={user.avatar || "/placeholder-user.jpg"} />
            <AvatarFallback>{user.initials}</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <div className="font-semibold">{user.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 py-6">
        <div className="flex items-center justify-between">
          <div className="grid gap-1">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Trips</div>
            <div className="text-2xl font-semibold">{user.tripsCount}</div>
          </div>
          <div className="flex items-center gap-2">
            <CarIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{user.car}</div>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon key={i} className={`h-5 w-5 ${i < user.rating ? "fill-gray-900 dark:fill-gray-50" : "fill-gray-100 stroke-gray-500 dark:fill-gray-800 dark:stroke-gray-400"}`} />
            ))}
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{user.rating}</div>
          </div>
        </div>
        <Separator />
        <div className="grid gap-1">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">About</div>
          <div className="text-base text-gray-700 dark:text-gray-300">{user.about}</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button className="gap-2" variant="outline">
          <FilePenIcon className="h-4 w-4" />
          Edit Profile
        </Button>
      </CardFooter>
    </Card>
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
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  )
}

function FilePenIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  )
}

function StarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export default Profil
