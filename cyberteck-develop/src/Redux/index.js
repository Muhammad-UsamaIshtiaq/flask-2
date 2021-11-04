import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import AuthReducer from './AuthReducer';

const store = configureStore({
    reducer: {
        auth: AuthReducer
    },
    middleware: [
        ...getDefaultMiddleware(),
    ]
});

export default store