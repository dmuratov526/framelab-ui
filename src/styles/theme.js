import { createTheme } from "@mui/material/styles";
import { deepPurple } from "@mui/material/colors";

const getTheme = (mode = "dark") =>
    createTheme({
        palette: {
            mode,
            ...(mode === "dark"
                ? {
                    primary: { main: deepPurple[500] },     // основной акцент
                    secondary: { main: deepPurple[300] },   // дополнительный акцент
                    background: {
                        default: "#121212",                   // общий фон
                        paper: "#1E1E1E",                     // карточки, панели
                    },
                    text: {
                        primary: "#FFFFFF",
                        secondary: "#B0B0B0",
                    },
                }
                : {
                    primary: { main: deepPurple[500] },
                    secondary: { main: deepPurple[300] },
                    background: {
                        default: "#fafafa",
                        paper: "#fff",
                    },
                    text: {
                        primary: "#000000",
                        secondary: "#444444",
                    },
                }),
        },
        shape: {
            borderRadius: 16, // глобальные скругления для карточек
        }
    });

export default getTheme;