import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    data: null,
    status: 'idle',
    error: null,
};
export const API_Prefix = (sessionStorage.getItem("serverUrl")) || 'https://reactstaging.cloudclinik.com'
export const loadPortalExtProperties = createAsyncThunk(
    'PortalExt/loadPortalExtProperties',
    async ({countrycode, country, sitecode, onlineVideoCallWidgetURL, serverUrl}) => {
        try {
            const payload = JSON.stringify({countrycode, country, sitecode, onlineVideoCallWidgetURL, serverUrl});
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token', null)}`
                },
            };

            const response = await axios.post(API_Prefix + '/o/patientheader/readExtProperty', payload, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

const PortalExtSlice = createSlice({
    name: 'PortalExt',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadPortalExtProperties.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadPortalExtProperties.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(loadPortalExtProperties.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default PortalExtSlice.reducer;