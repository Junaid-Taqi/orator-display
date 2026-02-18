import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { serverUrl } from '../Constants/Constants';

const initialState = {
    status: 'idle',
    error: null,
    addedDisplay: null,
};

export const addDisplay = createAsyncThunk(
    'AddDisplay/addDisplay',
    async (payload) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
            };

            const response = await axios.post(`${serverUrl}/o/rest/displayManagementApplication/addNewDisplay`, payload, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

const AddDisplaySlice = createSlice({
    name: 'AddDisplay',
    initialState,
    reducers: {
        resetAddDisplayState: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(addDisplay.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addDisplay.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.addedDisplay = action.payload;
            })
            .addCase(addDisplay.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { resetAddDisplayState } = AddDisplaySlice.actions;
export default AddDisplaySlice.reducer;
