import React from "react";
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar, Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, selectTheme } from "../../features/settings/settingsSlice";
import { useNavigate } from "react-router-dom";
import {DarkMode, LightMode} from "@mui/icons-material";
import BottomNav from "./BottomNav";

export default function Layout({ children }) {
    const dispatch = useDispatch();
    const themeMode = useSelector(selectTheme);
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "background.default",
                color: "text.primary",
                pb: 7,
                transition: "background-color 0.4s ease, color 0.4s ease", // плавная смена
            }}
        >
            {/* Верхняя панель */}
            <AppBar
                position="sticky"
                color="transparent"
                elevation={0}
                sx={(theme) => ({
                    borderBottom: "1px solid",
                    borderColor:
                        theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(0,0,0,0.08)",
                    backdropFilter: "blur(12px)", // всегда blur
                    backgroundColor:
                        theme.palette.mode === "dark"
                            ? "rgba(18,18,18,0.7)"   // тёмное стекло
                            : "rgba(255,255,255,0.7)", // светлое стекло
                    transition: "background-color 0.4s ease, border-color 0.4s ease",
                })}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            FrameLab
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {/* Переключатель темы */}
                        <IconButton
                            color="primary"
                            onClick={() => dispatch(toggleTheme())}
                            sx={{ transition: "color 0.4s ease" }}
                        >
                            {themeMode === "light" ? <DarkMode /> : <LightMode />}
                        </IconButton>

                        {/* Профиль */}
                        <IconButton onClick={() => navigate("/profile")}>
                            <Avatar
                                src="https://i.pravatar.cc/100?img=12"
                                sx={{
                                    width: 32,
                                    height: 32,
                                    transition: "border 0.3s ease",
                                    "&:hover": { border: "2px solid", borderColor: "primary.main" },
                                }}
                            />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Контент */}
            <Container
                maxWidth="md"
                sx={{
                    px: 2,
                    pb: "calc(72px + env(safe-area-inset-bottom))", // под BottomNav
                }}
            >
                {children}
            </Container>

            {/* Нижняя навигация */}
            <BottomNav />
        </Box>
    );
}
