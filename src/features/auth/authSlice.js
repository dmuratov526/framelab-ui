import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser} from "./authThunks";

// --- persist при старте ---
const savedToken = localStorage.getItem("token");
const savedUser = localStorage.getItem("user");

const initialState = {
    user: savedUser ? JSON.parse(savedUser) : null,
    token: savedToken || null,
    isAuthenticated: !!savedToken,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;

            // очистка persist
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
        updateUser: (state, action) => {
            // обновить локально данные профиля
            state.user = { ...state.user, ...action.payload };
            localStorage.setItem("user", JSON.stringify(state.user));
        },
    },
    extraReducers: (builder) => {
        builder
            // 🔹 LOGIN
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = {
                    name: action.payload.userName,
                    email: action.payload.email,
                };
                state.token = action.payload.token;
                state.isAuthenticated = true;

                // persist
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        name: action.payload.userName,
                        email: action.payload.email,
                    })
                );
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Login failed";
            })

            // 🔹 REGISTER
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = {
                    name: action.payload.userName,
                    email: action.payload.email,
                };
                state.token = action.payload.token;
                state.isAuthenticated = true;

                // persist
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        name: action.payload.userName,
                        email: action.payload.email,
                    })
                );
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Registration failed";
            })
    },
});

export const { logout, updateUser } = authSlice.actions;
export default authSlice.reducer;