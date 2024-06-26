import { JSX, SVGProps } from "react";

export const DistanceIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => {
    return (

        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" strokeWidth="4" stroke="currentColor"
             width="24"
             height="24"
             fill="none">
            <path
                d="M17.94,54.81a.1.1,0,0,1-.14,0c-1-1.11-11.69-13.23-11.69-21.26,0-9.94,6.5-12.24,11.76-12.24,4.84,0,11.06,2.6,11.06,12.24C28.93,41.84,18.87,53.72,17.94,54.81Z"/>
            <circle cx="17.52" cy="31.38" r="4.75"/>
            <path
                d="M49.58,34.77a.11.11,0,0,1-.15,0c-.87-1-9.19-10.45-9.19-16.74,0-7.84,5.12-9.65,9.27-9.65,3.81,0,8.71,2,8.71,9.65C58.22,24.52,50.4,33.81,49.58,34.77Z"/>
            <circle cx="49.23" cy="17.32" r="3.75"/>
            <path d="M17.87,54.89a28.73,28.73,0,0,0,3.9.89"/>
            <path d="M24.68,56.07c2.79.12,5.85-.28,7.9-2.08,5.8-5.09,2.89-11.25,6.75-14.71a16.72,16.72,0,0,1,4.93-3"
                  strokeDasharray="7.8 2.92"/>
            <path d="M45.63,35.8a23,23,0,0,1,3.88-.95"/>
        </svg>
    )
}