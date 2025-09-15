import React from "react";
import {
    Container,
    Typography,
    Grid,
    Card,
    CardActionArea,
    Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Иконки MUI
import MovieIcon from "@mui/icons-material/Movie";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import BoltIcon from "@mui/icons-material/Bolt";
import PeopleIcon from "@mui/icons-material/People";
import LightbulbIcon from "@mui/icons-material/Lightbulb";


export default function NewProjectPage() {
    const navigate = useNavigate();

    const categories = [
        {
            id: "quick-inspiration",
            title: "Quick Inspiration",
            desc: "One-tap ideas — shoot fast, get instant videos with music.",
            icon: <LightbulbIcon  sx={{ fontSize: 36 }} />,
            blocked: false
        },
        {
            id: "genre",
            title: "Theme",
            desc: "Pick a theme and mood for your video",
            icon: <MovieIcon sx={{ fontSize: 36 }} />,
            blocked: false
        },
        {
            id: "challenge-friend",
            title: "Friend Challenge",
            desc: "Send a custom challenge to your friend.",
            icon: <PeopleIcon sx={{ fontSize: 36 }} />,
            blocked: false
        },
        {
            id: "music",
            title: "Start from Music",
            desc: "Choose a track and AI will suggest scenes by rhythm.",
            icon: <MusicNoteIcon sx={{ fontSize: 36 }} />,
            blocked: true
        },
        {
            id: "custom",
            title: "Start Empty",
            desc: "Blank project. Build scenes and structure manually.",
            icon: <NoteAddIcon sx={{ fontSize: 36 }} />,
            blocked: true
        },
        {
            id: "challenge-system",
            title: "Challenge of the Day",
            desc: "Take on daily/weekly challenge from the app.",
            icon: <BoltIcon sx={{ fontSize: 36 }} />,
            blocked: true
        }
    ];

    return (
        <Container maxWidth="md" sx={{ mt: 2, mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Create New Project
            </Typography>

            <Grid container spacing={3}>
                {categories.map((c) => (
                    <Grid item xs={12} sm={6} key={c.id}>
                        <Card
                            sx={{
                                opacity: c.blocked ? 0.5 : 1,
                                borderRadius: 3,
                                height: 160,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: c.blocked ? 'rgba(0, 0, 0, 0.6)' :
                                    "linear-gradient(135deg, rgba(103,58,183,0.15), rgba(103,58,183,0.05))",
                                backdropFilter: "blur(16px) saturate(180%)",
                                WebkitBackdropFilter: "blur(16px) saturate(180%)",
                                color: "text.primary",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                                transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
                                "&:hover": {
                                    transform: "scale(1.03)",
                                    boxShadow: "0 8px 28px rgba(103,58,183,0.35)",
                                    background:
                                        "linear-gradient(135deg, rgba(103,58,183,0.3), rgba(103,58,183,0.15))",
                                },
                            }}
                        >
                            <CardActionArea disabled={c.blocked}
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
                                <Box sx={{ mb: 1, color: "primary.main" }}>{c.icon}</Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    {c.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
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
