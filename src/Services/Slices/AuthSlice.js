import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as api_types from '../../Services/Constants/ApiMethods';
import api from "../TokenApi/TokenApi"

const initialState = {
    token: null,
    status: 'idle',
    error: null,
};

// Create an async thunk to fetch the token
export const fetchToken = createAsyncThunk('auth/fetchToken', async () => {
    try {
        // Make the API request to fetch the token
        // eslint-disable-next-line no-undef
        const response = await api.execute(api_types.GETTOKEN(), null);
        const token = response.access_token;
        
        sessionStorage.setItem('token', token);
        return token;
    } catch (error) {
        throw error;
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchToken.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchToken.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload;
            })
            .addCase(fetchToken.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default authSlice.reducer;