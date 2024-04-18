import { useEffect, useState } from "react";
import doctorService from "../services/doctorService";
import { useDispatch, useSelector } from "react-redux";
import { setDoctorId, setTime, setDate, setDoctor } from "../features/reducers/appointmentSlice";

function AppointmentDateSelectionPage() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDoctorObj, setSelectedDoctorObj] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const dispatch = useDispatch();

  const appointment = useSelector((state) => {
    return state?.appointmentReducer;
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsData = await doctorService.getDoctors();
        setDoctors(doctorsData);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);


  useEffect(() => {
      if (!selectedDoctorObj) setSelectedDoctorObj(appointment.doctor);
      if (!selectedDoctor) setSelectedDoctor(appointment.doctor_id);
      if (!selectedDate) setSelectedDate(appointment.date);
      if (!selectedTime) setSelectedTime(appointment.time);
  }, [appointment])
  

  useEffect(() => {
    if (selectedDoctorObj) dispatch(setDoctor(selectedDoctorObj));
    if (selectedDoctor) dispatch(setDoctorId(selectedDoctor));
    if (selectedDate) dispatch(setDate(selectedDate));
    if (selectedTime) dispatch(setTime(selectedTime));
  }, [selectedDoctor, selectedDate, selectedTime]);


  const handleDoctorSelect = (event) => {
    setSelectedDoctor(event.target.value);
    setSelectedDoctorObj(doctors.find(x => x.id === parseInt(event.target.value)));
  };

  const handleDateSelect = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeSelect = (event) => {
    setSelectedTime(event.target.value);
  };

  return (
    <>
      <select className="form-select form-select-lg" aria-label="Default select example" value={selectedDoctor} onChange={handleDoctorSelect}>
        <option value="" disabled>
          Select a doctor
        </option>
        {doctors.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.title}
          </option>
        ))}
      </select>

      <input type="date" value={selectedDate} onChange={handleDateSelect} />
      <input type="time" value={selectedTime} onChange={handleTimeSelect} />
    </>
  );
}

export default AppointmentDateSelectionPage;
