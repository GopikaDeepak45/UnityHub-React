import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
}

const storedToken = localStorage.getItem('tokenInfo');
const initialState: AuthState = {
    token: storedToken ? JSON.parse(storedToken).accessToken : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ accessToken: string }>) => {
            state.token = action.payload.accessToken;
            localStorage.setItem('tokenInfo', JSON.stringify({ accessToken: action.payload.accessToken }));
        },
        logOut: (state) => {
            state.token = null;
            localStorage.removeItem('tokenInfo')
        },
    }
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token;
