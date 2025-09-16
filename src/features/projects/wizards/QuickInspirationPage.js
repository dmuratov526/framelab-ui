import React, { useState } from "react";
import {
    Container,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Button,
    Box,
    IconButton,
    Chip,
    Divider,
} from "@mui/material";
import { Refresh, ArrowBack, BookmarkBorder } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function QuickInspirationPage() {
    const navigate = useNavigate();

    const ideas = [
        {
            title: "Morning Coffee ☕",
            desc: "Show your morning vibe in 3 quick shots: making coffee, first sip, and your smile.",
            preview: "https://picsum.photos/800/400?random=22",
            music: "Chill Vibes Track",
            duration: "15s",
            tags: ["morning", "coffee", "lifestyle"],
            difficulty: "Easy",
            shots: 3,
            usedBy: 245,
            tip: "Best filmed in portrait mode near a window with natural light.",
        },
        {
            title: "City Walk 🚶‍♂️",
            desc: "Film your walk: shoes, the street, and a landmark.",
            preview: "https://picsum.photos/800/400?random=23",
            music: "Urban Beat",
            duration: "20s",
            tags: ["city", "walk", "travel"],
            difficulty: "Easy",
            shots: 3,
            usedBy: 367,
            tip: "Capture moving details: footsteps, flowing traffic, wide street shots.",
        },
        {
            title: "Dance Break 💃",
            desc: "Try 5 seconds of your favorite dance move.",
            preview: "https://picsum.photos/800/400?random=24",
            music: "Trending TikTok Track",
            duration: "10s",
            tags: ["dance", "fun", "trend"],
            difficulty: "Medium",
            shots: 1,
            usedBy: 589,
            tip: "Place camera on a steady surface — full body in frame works best.",
        },
    ];

    const [current, setCurrent] = useState(0);

    const handleRecord = () => {
        alert("🎥 Open Camera Flow (to be implemented)");
    };

    const handleRefresh = () => {
        setCurrent((prev) => (prev + 1) % ideas.length);
    };

    const inspiration = ideas[current];

    return (
        <Container maxWidth="md" sx={{ mt: 2, mb: 4 }}>
            {/* Header with back + refresh */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Quick Inspiration
                </Typography>
                <IconButton onClick={handleRefresh}>
                    <Refresh />
                </IconButton>
            </Box>

            <Card
                sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                    background: "linear-gradient(180deg, rgba(40,50,70,0.9) 0%, rgba(20,25,35,0.95) 100%)",
                    color: "white",
                }}
            >
                {/* Картинка с градиентным overlay */}
                <Box sx={{ position: "relative" }}>
                    <CardMedia
                        component="img"
                        height="220"
                        image={inspiration.preview}
                        alt={inspiration.title}
                        sx={{ objectFit: "cover" }}
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "50%",
                            background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                        }}
                    />
                </Box>

                <CardContent sx={{ p: 3 }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 1,
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 700, color: "white" }}>
                            {inspiration.title}
                        </Typography>
                        <IconButton sx={{ color: "white" }}>
                            <BookmarkBorder />
                        </IconButton>
                    </Box>

                    <Typography
                        variant="body2"
                        sx={{ mb: 2, color: "rgba(255,255,255,0.8)" }}
                    >
                        {inspiration.desc}
                    </Typography>

                    {/* Теги */}
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                        {inspiration.tags.map((tag) => (
                            <Chip
                                key={tag}
                                label={`#${tag}`}
                                size="small"
                                sx={{
                                    borderRadius: "8px",
                                    background: "rgba(255,255,255,0.2)",
                                    color: "white",
                                    fontWeight: 500,
                                }}
                            />
                        ))}
                    </Box>

                    {/* Meta */}
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2,
                            mb: 2,
                            fontSize: "0.8rem",
                        }}
                    >
                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.8)" }}>
                            ⏱ {inspiration.duration}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.8)" }}>
                            🎶 {inspiration.music}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.8)" }}>
                            🎬 {inspiration.shots} shots
                        </Typography>
                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.8)" }}>
                            ⭐ {inspiration.difficulty}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.2)" }} />

                    <Typography
                        variant="caption"
                        sx={{ display: "block", mb: 1.5, color: "rgba(255,255,255,0.8)" }}
                    >
                        💡 {inspiration.tip}
                    </Typography>

                    <Typography
                        variant="caption"
                        sx={{ display: "block", mb: 2, color: "rgba(255,255,255,0.8)" }}
                    >
                        👥 {inspiration.usedBy} creators already tried this
                    </Typography>

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            borderRadius: 2,
                            py: 1.4,
                            fontWeight: 600,
                            textTransform: "none",
                            fontSize: "1rem",
                            background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                            color: "white",
                            boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
                            "&:hover": {
                                background: "linear-gradient(135deg, #7b1fff 0%, #3d8bff 100%)",
                            },
                        }}
                        onClick={handleRecord}
                    >
                        🎥 Try This
                    </Button>
                </CardContent>
            </Card>

        </Container>
    );
}
