import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";

const experienceOptions = [
  "No Experience",
  "1 Year",
  "2 Years",
  "3 Years",
  "4 Years",
  "5 Years",
  "6 Years",
  "7 Years",
  "8 Years",
  "9 Years",
  "10 Years",
  "11 Years",
  "12 Years",
  "13 Years",
  "14 Years",
  "15 Years",
  "16 Years",
  "17 Years",
  "18 Years",
  "19 Years",
  "20+ Years",
];

const specialties = [
  "General Physician",
  "Pediatrician (Child Specialist)",
  "Dermatologist (Skin Specialist)",
  "Gynecologist",
  "Neurologist",
  "Gastroenterologist",
];

const AddDoctor = () => {
  const [specialtiy, setSpeciality] = useState("");
  const [open, setOpen] = useState(false);
  const [experience, setExperience] = useState("");
  const [experienceOpen, setExperienceOpen] = useState(false);

  const closeDropdown = () => setOpen(false);
  const closeExperienceDropdown = () => setExperienceOpen(false);

  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fee, setFee] = useState("");
  const [about, setAbout] = useState("");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const addDocHandler = async (e) => {
    e.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Please upload a document image before proceeding.");
      }

      const formData = new FormData();

      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fee", Number(fee));
      formData.append("speciality", specialtiy);
      formData.append("degree", degree);
      formData.append("about", about);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      //console log form data
      // formData.forEach((val, key) => {
      //   console.log(`${key} : ${val}`);
      // });

      // console.log("Token:", aToken);

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { Authorization: `Bearer ${aToken}` } }
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while adding doctor.");
    }
  };

  return (
    <form onSubmit={addDocHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border border-gray-200 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="doctor-img"
              className="w-20 bg-blue-100 rounded-full cursor-pointer"
            />
          </label>
          <input
            type="file"
            id="doc-img"
            onChange={(e) => setDocImg(e.target.files[0])}
            hidden
          />

          <p className="text-zinc-600">
            Upload doctor <br /> picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-gray-600 font-medium">Doctor Name</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Doctor Name"
                className="border rounded px-3 py-2 bg-blue-50 text-gray-800 font-medium"
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p className="text-gray-600 font-medium">Doctor Email</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Doctor Email"
                className="border rounded px-3 py-2 bg-blue-50 text-gray-800 font-medium"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p className="text-gray-600 font-medium">Doctor Password</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Doctor Password"
                className="border rounded px-3 py-2 bg-blue-50 text-gray-800 font-medium"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1 relative">
              <p className="text-gray-600 font-medium">Experience</p>

              <div
                onClick={() => setExperienceOpen(!experienceOpen)}
                className="border rounded px-3 py-2 bg-blue-50 text-gray-800 font-medium cursor-pointer"
              >
                {experience || "Select Experience"}
              </div>

              {experienceOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={closeExperienceDropdown}
                  ></div>

                  <div className="absolute top-full mt-1 w-full max-h-48 overflow-y-auto bg-white border rounded shadow z-20">
                    {experienceOptions.map((exp, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setExperience(exp);
                          setExperienceOpen(false);
                        }}
                        className="px-3 py-2 bg-gray-100 text-black hover:text-white font-medium hover:bg-blue-500 cursor-pointer"
                      >
                        {exp}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p className="text-gray-600 font-medium">Fee</p>
              <input
                type="number"
                min={0}
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                placeholder="Doctor Fee"
                className="border rounded px-3 py-2 bg-blue-50 text-gray-800 font-medium"
                required
              />
            </div>
          </div>

          {/*-------Right Side---------*/}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1 relative">
              <p className="text-gray-600 font-medium">Speciality</p>
              <div
                onClick={() => setOpen(!open)}
                className="border rounded px-3 py-2 bg-blue-50 text-gray-800 font-medium cursor-pointer"
              >
                {specialtiy || "Select Speciality"}
              </div>

              {open && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={closeDropdown}
                  ></div>

                  <div className="absolute top-full mt-1 w-full max-h-48 overflow-y-auto bg-white border rounded shadow z-20">
                    {specialties.map((spec, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setSpeciality(spec);
                          setOpen(false);
                        }}
                        className="px-3 py-2 bg-gray-100 text-black hover:text-white font-medium hover:bg-blue-500 cursor-pointer"
                      >
                        {spec}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p className="text-gray-600 font-medium">Doctor Education</p>
              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                placeholder="Enter Doctor Education"
                className="border rounded px-3 py-2 bg-blue-50 text-gray-800 font-medium"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p className="text-gray-600 font-medium">Doctor Address</p>
              <input
                type="text"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                placeholder="Address line 1"
                className="border rounded px-3 py-2 bg-blue-50 text-gray-800 font-medium"
                required
              />
              <input
                type="text"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                placeholder="Address line 2"
                className="border rounded px-3 py-2 bg-blue-50 text-gray-800 font-medium"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <p className="mt-4 mb-2 text-gray-600 font-medium">About Doctor</p>
          <textarea
            placeholder="Wrtie about doctor..."
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={5}
            className="w-full px-4 pt-2 border rounded bg-blue-50 text-gray-800 font-medium"
            required
          />
        </div>

        <button className="bg-primary px-10 py-3 mt-4 text-white rounded-full cursor-pointer">
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
