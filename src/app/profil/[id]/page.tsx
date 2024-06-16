"use client";

import { useEffect, useState } from 'react'
import { useParams }from "next/navigation";
import Profil from '@/components/component/profil'
import axios from 'axios'

const ProfilPage = () => {
    interface UserData {
        id: number;
        first_name: string;
        last_name: string;
    }

    type TripData = {
        id: number;
        departure: string;
        destination: string;
        distance: number;
        status: number;
        departure_time: string;
        users: UserData[];
    };
    type UserProfile = {
      first_name: string;
      last_name: string;
      email: string;
      trips: TripData[];
      car: string;
      about: string;
    };
  //const router = useRouter()
  const { id } = useParams()

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`/api/user/${id}`)
        .then((response) => {
          setUserData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id])

  if (!userData) {
    return <div>Loading...</div>
  }

  return <Profil 
  first_name={userData.first_name}
  last_name={userData.last_name}
  email={userData.email}
  trips={userData.trips}
  car={userData.car}
  about={userData.about} 
  />
}

export default ProfilPage
function setLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}

