import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Home, Explore, VideoLibrary, Person } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = React.useState(location.pathname);

    React.useEffect(() => {
        setValue(location.pathname);
    }, [location.pathname]);

    return (
        <Paper
            elevation={0}
            sx={(theme) => ({
                position: "fixed",
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1100,
                // прозрачный фон у самого Paper
                backgroundColor: "transparent",
                borderTop: "1px solid",
                borderColor:
                    theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.12)"
                        : "rgba(0,0,0,0.08)",
                // стекло через псевдоэлемент
                "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    zIndex: -1,
                    WebkitBackdropFilter: "blur(16px) saturate(180%)",
                    backdropFilter: "blur(16px) saturate(180%)",
                    backgroundColor:
                        theme.palette.mode === "dark"
                            ? "rgba(18,18,18,0.65)"
                            : "rgba(255,255,255,0.65)",
                },
            })}
        >
            <BottomNavigation
                value={value}
                onChange={(_, newValue) => {
                    setValue(newValue);
                    navigate(newValue);
                }}
                showLabels
                sx={{
                    backgroundColor: "transparent !important", // убираем фон навигации
                }}
            >
                <BottomNavigationAction
                    label="Home"
                    value="/"
                    icon={<Home />}
                    sx={{ backgroundColor: "transparent !important" }}
                />
                <BottomNavigationAction
                    label="Feed"
                    value="/feed"
                    icon={<Explore />}
                    sx={{ backgroundColor: "transparent !important" }}
                />
                <BottomNavigationAction
                    label="Library"
                    value="/library"
                    icon={<VideoLibrary />}
                    sx={{ backgroundColor: "transparent !important" }}
                />
                <BottomNavigationAction
                    label="Profile"
                    value="/profile"
                    icon={<Person />}
                    sx={{ backgroundColor: "transparent !important" }}
                />
            </BottomNavigation>
        </Paper>
    );
}