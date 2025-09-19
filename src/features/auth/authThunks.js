import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "./authApi";

// 🔹 Логин
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            return await loginApi({ email, password });
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// 🔹 Регистрация
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ email, name, password }, { rejectWithValue }) => {
        try {
            return await registerApi({ email, name, password });
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);
