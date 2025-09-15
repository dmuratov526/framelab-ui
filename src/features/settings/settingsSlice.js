import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        theme: "dark", // light | dark
    },
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
        },
    },
});

export const { toggleTheme } = settingsSlice.actions;
export const selectTheme = (state) => state.settings.theme;
export default settingsSlice.reducer;