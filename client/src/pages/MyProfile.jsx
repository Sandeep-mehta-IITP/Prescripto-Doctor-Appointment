import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const MyProfile = () => {
  const { userData, setUserData } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  if (!userData || !userData.address) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 p-4">
      <div className="w-full flex flex-col gap-6 text-sm">
        <img
          src={userData.image}
          alt="user-img"
          className="w-45 rounded-full object-cover overflow-hidden bg-gray-100"
        />

        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="bg-gray-50 text-3xl font-medium max-w-60 mt-4 px-2 py-1"
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-4">
            {userData.name}
          </p>
        )}

        <hr className="bg-zinc-400 h-[1px] border-none" />

        <div>
          <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Email ID:</p>
            <p className="text-blue-500">{userData.email}</p>
            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="bg-gray-50 max-w-52 px-2 py-2"
              />
            ) : (
              <p className="text-blue-400">{userData.phone}</p>
            )}
            <p className="font-medium">Address:</p>
            {isEdit ? (
              <p>
                <input
                  type="text"
                  value={userData?.address?.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  className="bg-gray-50 px-2 py-2"
                />
                <br />
                <input
                  type="text"
                  value={userData?.address?.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  className="bg-gray-50 px-2 py-2"
                />
              </p>
            ) : (
              <p className="text-gray-500">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>

        <div>
          <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="max-w-33 bg-gray-100 px-2 py-2"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="prefer not to say">Prefer not to say</option>
              </select>
            ) : (
              <p className="text-gray-400">{userData.gender}</p>
            )}
            <p className="font-medium">Date of Birth:</p>
            {isEdit ? (
              <input
                type="date"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                className="max-w-28 bg-gray-100 px-2 py-2"
              />
            ) : (
              <p className="text-gray-400">{userData.dob}</p>
            )}
          </div>
        </div>

        <div className="mt-10">
          {isEdit ? (
            <button
              className="border border-primary px-8 py-2 rounded-full cursor-pointer hover:bg-primary hover:text-white hover:scale-105 transition-all duration-200"
              onClick={() => setIsEdit(false)}
            >
              Save Changes
            </button>
          ) : (
            <button
              className="border border-primary px-8 py-2 rounded-full cursor-pointer hover:bg-primary hover:text-white hover:scale-105 transition-all duration-200"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
