import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import settingsReducer from "../features/settings/settingsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer, // ✅ ключ "auth" обязательно
        settings: settingsReducer,
    },
});