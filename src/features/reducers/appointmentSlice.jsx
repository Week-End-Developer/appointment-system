import { createSlice } from "@reduxjs/toolkit";

const setLocalStorage = (state) => {
    localStorage.setItem('state', JSON.stringify(state))
};

export const appointmentSlice = createSlice({
    name: "appointment",
    initialState: {
        doctor: undefined,
        doctor_id: undefined,
        time: undefined,
        date: undefined,
        complaint_Id: '',
        pet: undefined,
        pet_Id: undefined,
        per_price: undefined,
        duration: 30,
        coupon_code: '',
        card_name: '',
        card_number: '',
        card_date_month: '',
        card_date_year: '',
        card_cvv: '',
        doctor_detail: undefined
    },
    reducers: {
        setAppointment: (state, action) => {
            state.doctor = action.payload?.doctor;
            state.doctor_id = action.payload?.doctor_id;
            state.time = action.payload?.time;
            state.date = action.payload?.date;
            state.complaint_Id = action.payload?.complaint_Id;
            state.pet = action.payload?.pet;
            state.pet_Id = action.payload?.pet_Id;
            state.per_price = action.payload?.per_price;
            state.duration = 30;
            state.coupon_code = action.payload?.coupon_code;
            state.card_name = action.payload?.card_name;
            state.card_number = action.payload?.card_number;
            state.card_date_month = action.payload?.card_date_month;
            state.card_date_year = action.payload?.card_date_year;
            state.card_cvv = action.payload?.card_cvv;
            state.doctor_detail = action.payload?.doctor_detail;
        },
        setDoctorId: (state, action) => {
            state.doctor_id = action.payload;
        },
        setDoctor: (state, action) => {
            state.doctor = action.payload;
        },
        setTime: (state, action) => {
            state.time = action.payload;
        },
        setDate: (state, action) => {
            state.date = action.payload;
        },
        setPet: (state, action) => {
            state.pet = action.payload;
        },
        setPetId: (state, action) => {
            state.pet_Id = action.payload;
        },
        setComplaintId: (state, action) => {
            state.complaint_Id = action.payload;
        },
        setPerPrice: (state, action) => {
            state.per_price = action.payload;
        },
        setDoctorDetail: (state, action) => {
            state.doctor_detail = action.payload;
            if (action.payload?.profession !== 'veterinarian') {
                state.pet_Id = undefined;
                state.pet = undefined;
            }
        },
        setCouponCode: (state, action) => {
            state.coupon_code = action.payload;
        },
        setToLocalStorage: (state) => {
            setLocalStorage(state)
        },
        saveCardName: (state, action) => {
            state.card_name = action.payload;
        },
        saveCardNumber: (state, action) => {
            state.card_number = action.payload;
        },
        saveCardDateMonth: (state, action) => {
            state.card_date_month = action.payload;
        },
        saveCardDateYear: (state, action) => {
            state.card_date_year = action.payload;
        },
        saveCardCVV: (state, action) => {
            state.card_cvv = action.payload;
        },
        removeCardDetails: (state) => {
            state.card_name = "";
            state.card_number = "";
            state.card_date_month = "";
            state.card_date_year = "";
            state.card_cvv = "";
        }
    }
});

export const {
    setAppointment,
    setDoctor,
    setDoctorId,
    setTime,
    setDate,
    setPet,
    setPetId,
    setComplaintId,
    setPerPrice,
    setDoctorDetail,
    setToLocalStorage,
    setCouponCode,
    saveCardName,
    saveCardNumber,
    saveCardDateMonth,
    saveCardDateYear,
    saveCardCVV,
    removeCardDetails
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
