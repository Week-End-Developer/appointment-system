import { configureStore } from "@reduxjs/toolkit";
import locationSlice from "../features/reducers/locationSlice";
import appointmentSlice from "../features/reducers/appointmentSlice";

export default configureStore({
    reducer: {
        locationReducer: locationSlice,
        appointmentReducer: appointmentSlice
    },
})