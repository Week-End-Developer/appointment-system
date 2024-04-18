import { createSlice } from '@reduxjs/toolkit'

export const locationSlice = createSlice({
    name: 'location-slice',
    initialState: {
        value: "/"
    },
    reducers: {
        updatePath: (state, action) => {
            state.path = action.payload;
        },
    }
})

export const { updatePath } = locationSlice.actions;

export default locationSlice.reducer;