import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";


export  const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [dToken, setDToken] = useState(localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "");
    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {

        try {
            
            const { data } = await axios.get(backendUrl + '/api/doctor/appointments', {
                  headers: { Authorization: `Bearer ${dToken}` } 
            })

            
            
            if (data.success) {
                setAppointments(data.appointments.reverse())
                console.log(data.appointments);
                
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(
                    error.response?.data?.message ||
                      "Something went wrong while fetching doctor appointments data."
                  );
        }
    }

    const value = {
        backendUrl,
        dToken,
        setDToken,
        appointments,
        setAppointments,
        getAppointments,

    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;