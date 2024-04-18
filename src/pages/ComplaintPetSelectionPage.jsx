import { useDispatch, useSelector } from "react-redux";
import doctorService from "../services/doctorService";
import { Fragment, useEffect, useState } from "react";
import petService from "../services/petService";
import { setComplaintId, setDoctorDetail, setPerPrice, setPet, setPetId } from "../features/reducers/appointmentSlice";

function ComplaintPetSelectionPage() {
    const [pets, setPets] = useState([]);
    const [doctorDetailData, setDoctorDetailData] = useState(undefined);
    const [selectedPet, setSelectedPet] = useState(undefined);
    const [selectedPetId, setSelectedPetId] = useState(undefined);
    const [complaint, setComplaint] = useState("");

    const dispatch = useDispatch();

    const appointment = useSelector((state) => {
        return state?.appointmentReducer;
    });

    useEffect(() => {
        if (appointment.doctor_id) {
            const fetchDoctorDetail = async () => {
                try {
                    const doctorDetailData = await doctorService.getDoctorDetail(appointment.doctor.id);
                    setDoctorDetailData(doctorDetailData);
                    dispatch(setPerPrice(doctorDetailData.per_price));
                    dispatch(setDoctorDetail(doctorDetailData));
                } catch (error) {
                    console.error('Error fetching doctors:', error);
                }
            };
            fetchDoctorDetail();
        }
    }, []);

    useEffect(() => {
        if (doctorDetailData?.profession === 'veterinarian' && pets.length === 0) {
            const fetchPets = async () => {
                try {
                    const pets = await petService.getPets();
                    setPets(pets);
                } catch (error) {
                    console.error('Error fetching pets:', error);
                }
            };
            fetchPets();
        }
    }, []);

    useEffect(() => {
        if (!selectedPet) setSelectedPet(appointment.pet);
        if (!selectedPetId) setSelectedPetId(appointment.pet_Id);
        if (!complaint) setComplaint(appointment.complaint_Id);
    }, [appointment, complaint, selectedPet, selectedPetId])

    const handleRadioChange = (event) => {
        const itemId = parseInt(event.target.value);
        const selected = pets.find(item => item.id === itemId);
        setSelectedPet(selected);
        setSelectedPetId(itemId);
        dispatch(setPet(selected));
        dispatch(setPetId(itemId));
    };

    const handleComplaintId = (event) => {
        setComplaint(event.target.value);
        dispatch(setComplaintId(event?.target?.value));
    };

    return (
        <div>
            <p>{appointment.doctor?.title} {doctorDetailData?.profession}</p>
            <p>randevu tarihi: {appointment.date} - {appointment.time}</p>
            <p>Şikayet</p>
            <p><textarea name="textarea" rows="4" value={complaint} cols="50" onChange={handleComplaintId} /></p>

            {pets.length > 0 &&
                <Fragment>
                    <p>Pet</p>
                    <div>
                        {pets.map(item => (
                            <label key={item.id}>
                                <input
                                    type="radio"
                                    name="item"
                                    value={item.id}
                                    checked={selectedPetId === item.id}
                                    onChange={handleRadioChange}
                                />
                                <div>
                                    <img src={item.image} alt={item.name} />
                                    <p>{item.name}</p>
                                </div>
                            </label>
                        ))}
                    </div>
                </Fragment>
            }
        </div>
    );
}

export default ComplaintPetSelectionPage;
