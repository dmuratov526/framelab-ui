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
} from "@mui/material";
import { Refresh } from "@mui/icons-material";

export default function QuickInspirationPage() {
    const ideas = [
        {
            title: "Morning Coffee ☕",
            desc: "Show your morning vibe in 3 quick shots: making coffee, first sip, and your smile.",
            preview: "https://picsum.photos/400/200?random=22",
            music: "Chill Vibes Track",
            duration: "15s",
        },
        {
            title: "City Walk 🚶‍♂️",
            desc: "Film your walk: shoes, the street, and a landmark.",
            preview: "https://picsum.photos/400/200?random=23",
            music: "Urban Beat",
            duration: "20s",
        },
        {
            title: "Dance Break 💃",
            desc: "Try 5 seconds of your favorite dance move.",
            preview: "https://picsum.photos/400/200?random=24",
            music: "Trending TikTok Track",
            duration: "10s",
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
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Quick Inspiration
                </Typography>
                <IconButton onClick={handleRefresh}>
                    <Refresh />
                </IconButton>
            </Box>

            <Card
                sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    backdropFilter: "blur(16px) saturate(180%)",
                    WebkitBackdropFilter: "blur(16px) saturate(180%)",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
                }}
            >
                <CardMedia
                    component="img"
                    height="180"
                    image={inspiration.preview}
                    alt={inspiration.title}
                    sx={{ objectFit: "cover" }}
                />
                <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {inspiration.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                    >
                        {inspiration.desc}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                        <Typography variant="caption" color="text.secondary">
                            ⏱ {inspiration.duration}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            🎶 {inspiration.music}
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ borderRadius: 3, py: 1.5, mb: 1 }}
                        onClick={handleRecord}
                    >
                        Try This
                    </Button>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block", textAlign: "center" }}
                    >
                        AI will build the clip — you just need to record 📹
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
}
