import { apiSlice } from '@/redux/apiSlice';
import authReducer from '@/redux/slices/authSlice';
import { combineReducers } from '@reduxjs/toolkit';


const rootReducer = combineReducers({
    auth:authReducer,
    [apiSlice.reducerPath]:apiSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
