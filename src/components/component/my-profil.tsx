import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useUser from "@/hooks/useUser";
import React, { useState,useEffect } from 'react';
import "../../../public/json/extensions_domains.json";
/**
 * TODO
 * regex for phone and inputs number
 */

export function MyProfil() {
  const { userData, updateUser } = useUser();
  const [formData, setFormData] = useState({
    last_name: "",
    first_name: "",
    email: "",
    phone_number: ""
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('')

  useEffect(() => {
    if (userData) {
      setFormData({
        last_name: userData.last_name,
        first_name: userData.first_name,
        email: userData.email,
        phone_number: userData.phone_number,
        Vehicle: userData.vesicule
      });
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const getModifiedFields = (original: any, updated: any) => {
    const modifiedFields: any = {};
    for (const key in updated) {
      if (updated[key] !== original[key]) {
        modifiedFields[key] = updated[key];
      }
    }
    return modifiedFields;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    if (userData?.id) {

        const modifiedData = getModifiedFields(userData, formData);
        if (Object.keys(modifiedData).length > 0) {
            try {
                const response = await updateUser(userData.id, modifiedData);
                if (response.ok) {
                    setSuccess("User updated successfully.");
                } else {
                    setError(`Failed to update user: ${response.error}`);
                }
            } catch (error) {
                console.error('Error updating user:', error);
                setError('Failed to update user');
            }
        } else {
            setError("No changes to update.");
        }
    } else {
        setError("User ID is missing.");
    }
};


  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-gray-100 dark:bg-gray-900 p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 mb-4">
            <img
              alt="Profile Avatar"
              className="rounded-full w-full h-full object-cover"
              height={128}
              src="/img/sticker2.jpg"
              style={{
                aspectRatio: "128/128",
                objectFit: "cover",
              }}
              width={128}
            />
            <div className="absolute bottom-0 right-0 bg-gray-900 dark:bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
              <FilePenIcon className="w-5 h-5" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Profile</h2>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label className="block mb-1 text-gray-700 dark:text-gray-300" htmlFor="last_name">
              Nom
            </Label>
            <Input
              className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="last_name"
              placeholder={userData?.last_name}
              type="text"
              value={formData.last_name}
              pattern="^[A-Za-zÀ-ÖØ-öø-ÿ'-\s]+$"
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="block mb-1 text-gray-700 dark:text-gray-300" htmlFor="first_name">
              Prenom
            </Label>
            <Input
              className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="first_name"
              placeholder={userData?.first_name}
              type="text"
              value={formData.first_name}
              pattern="^^[A-Za-zÀ-ÖØ-öø-ÿ'-\s]+$"
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="block mb-1 text-gray-700 dark:text-gray-300" htmlFor="email">
              Email
            </Label>
            <Input
              className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="email"
              placeholder={userData?.email}
              type="email"
              pattern='^[\w-\.]+@([\w-]+\.)+[\w-]$'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="block mb-1 text-gray-700 dark:text-gray-300" htmlFor="phone_number">
              Téléphone
            </Label>
            <Input
              className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="phone_number"
              placeholder={userData?.phone_number}
              type="tel"
              pattern='(\d{2}){5}'
              value={formData.phone_number}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-grow">
              <Label className="block mb-1 text-gray-700 dark:text-gray-300" htmlFor="vehicle">
                Vésicule
              </Label>
              <Input
                className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                id="vehicle"
                placeholder={userData?.vehicle}
                type="text"
                value={formData?.vehicle}
                onChange={handleChange}
              />
            </div>

            <div className="w-1/3">
              <Label className="block mb-1 text-gray-700 dark:text-gray-300" htmlFor="place">
                places :
              </Label>
              <Input
                className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                id="place"
                placeholder={userData?.place}
                type="number"
                value={formData?.place}
                min="1" max="10"
                onChange={handleChange}
              />
            </div>
          </div>

              <button>[+]</button>
                <p>
                  Deuxième véhicule
                </p>
                <div className="flex gap-4">
                  <div className="flex-grow">
                    <Label className="block mb-1 text-gray-700 dark:text-gray-300" htmlFor="vehicle">
                      Vésicule
                    </Label>
                    <Input
                      className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      id="vehicle"
                      placeholder={userData?.vehicle}
                      type="text"
                      value={formData?.vehicle}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="w-1/3">
                    <Label className="block mb-1 text-gray-700 dark:text-gray-300" htmlFor="place">
                      places :
                    </Label>
                    <Input
                      className="w-full px-4 py-2 rounded-md border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      id="place"
                      placeholder={userData?.place}
                      type="number"
                      value={formData?.place}
                      min="1" max="10"
                      onChange={handleChange}
                    />
                  </div>
                </div>


          <Button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            type="submit"
          >
            Modifier
          </Button>
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
          {success && <p className="mt-4 text-center text-green-500">{success}</p>}

        </form>
      </div>
    </div>
  );
}

// @ts-ignore
function FilePenIcon(props) {
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
  );
}
