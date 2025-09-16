import React from "react";
import {
    Container,
    Typography,
    Grid,
    Card,
    CardActionArea,
    Box,
    IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { newProjectCategories } from "./newProjectCategories";

export default function NewProjectPage() {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md" sx={{ mt: 2, mb: 4 }}>
            {/* Заголовок + кнопка назад */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 3,
                }}
            >
                <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Create New Project
                </Typography>
            </Box>

            <Grid container justifyContent={'center'} spacing={3}>
                {newProjectCategories.map((c) => (
                    <Grid width={ { xs: '100%', md: 'inherit' } } item xs={12} sm={6} key={c.id} justifyContent={'center'}>
                        <Card
                            sx={(theme) => ({
                                opacity: c.blocked ? 0.6 : 1,
                                borderRadius: 2,
                                height: 160,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: c.blocked
                                    ? theme.palette.mode === "dark"
                                        ? "linear-gradient(135deg, rgba(30,30,30,0.9), rgba(20,20,20,0.85))"
                                        : "linear-gradient(135deg, rgba(230,230,230,0.9), rgba(245,245,245,0.85))"
                                    : "linear-gradient(135deg, rgba(103,58,183,0.15), rgba(103,58,183,0.05))",
                                backdropFilter: "blur(16px) saturate(180%)",
                                WebkitBackdropFilter: "blur(16px) saturate(180%)",
                                color: "text.primary",
                                boxShadow: c.blocked
                                    ? "inset 0 0 0 1px rgba(255,255,255,0.1)"
                                    : "0 4px 20px rgba(0,0,0,0.15)",
                                transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
                                "&:hover": !c.blocked && {
                                    transform: "scale(1.03)",
                                    boxShadow: "0 8px 28px rgba(103,58,183,0.35)",
                                    background:
                                        "linear-gradient(135deg, rgba(103,58,183,0.3), rgba(103,58,183,0.15))",
                                },
                            })}
                        >
                            <CardActionArea
                                disabled={c.blocked}
                                onClick={() => navigate(`/wizard/${c.id}`)}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    p: 2,
                                    textAlign: "center",
                                }}
                            >
                                <Box
                                    sx={{
                                        mb: 1,
                                        color: c.blocked ? "text.disabled" : "primary.main",
                                    }}
                                >
                                    {c.icon}
                                </Box>
                                <Typography
                                    variant="subtitle1"
                                    sx={{ fontWeight: 600, color: c.blocked ? "text.disabled" : "inherit" }}
                                >
                                    {c.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color={c.blocked ? "text.disabled" : "text.secondary"}
                                    sx={{ mt: 1, maxWidth: 220 }}
                                >
                                    {c.desc}
                                </Typography>
                            </CardActionArea>
                        </Card>

                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
