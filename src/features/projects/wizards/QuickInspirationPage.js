import React, { useState } from "react";
import {
    Typography,
    Card,
    CardContent,
    CardMedia,
    Button,
    Box,
    IconButton,
    Chip,
    Divider,
    useTheme,
    Paper,
} from "@mui/material";
import {
    Refresh,
    ArrowBack,
    BookmarkBorder,
    Whatshot,
    Assignment,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createProject } from "../project-page/projectFactory";
import {ideasList} from "./ideasList";



// 🔹 Парсим длительность
const parseDuration = (dur) => {
    if (dur.endsWith("s")) return parseInt(dur);
    if (dur.endsWith("m")) return parseInt(dur) * 60;
    return 30;
};

// 🔹 Генерация сцен
const generateScenesFromIdea = (idea) => {
    const total = parseDuration(idea.duration);
    const baseDur = Math.floor(total / idea.shots);
    let remaining = total;

    return Array.from({ length: idea.shots }, (_, i) => {
        const dur = i === idea.shots - 1 ? remaining : baseDur;
        remaining -= dur;
        return {
            id: `${Date.now()}-${i}`,
            title: idea.shotsDetails?.[i]?.text || `Shot ${i + 1}`,
            duration: dur,
            description: `${idea.title} scene`,
            completed: false,
            media: null,
        };
    });
};

export default function QuickInspirationPage() {
    const navigate = useNavigate();
    const theme = useTheme();

    const [current, setCurrent] = useState(
        Math.floor(Math.random() * ideasList.length)
    );

    const inspiration = ideasList[current];
    const previewUrl = `https://picsum.photos/800/400?random=${current + 100}`;

    const handleRecord = () => {
        const projectData = createProject("quick", {
            title: inspiration.title,
            duration: inspiration.duration,
            scenes: generateScenesFromIdea(inspiration),
            musicSelected: true,
            music: inspiration.music,
            notes: inspiration.tip,
        });
        navigate("/project", { state: { projectData } });
    };

    const handleRefresh = () => {
        setCurrent(Math.floor(Math.random() * ideasList.length));
    };

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
    });

    return (
        <Box maxWidth="md" sx={{ mt: 1, mb: 4 }}>
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <IconButton size="small" onClick={() => navigate(-1)}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Challenge of the Day
                </Typography>
                <IconButton size="small" onClick={handleRefresh}>
                    <Refresh />
                </IconButton>
            </Box>

            {/* Card */}
            <Card
                sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                    background:
                        theme.palette.mode === "dark"
                            ? "linear-gradient(180deg, rgba(30,35,50,0.95) 0%, rgba(10,15,25,0.98) 100%)"
                            : "linear-gradient(180deg, #ffffff 0%, #f9f9f9 100%)",
                    color: theme.palette.mode === "dark" ? "white" : "inherit",
                }}
            >
                {/* Preview */}
                <Box sx={{ position: "relative" }}>
                    <CardMedia
                        component="img"
                        height="220"
                        image={previewUrl}
                        alt={inspiration.title}
                        sx={{ objectFit: "cover" }}
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            p: 1.5,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                        }}
                    >
                        <Whatshot sx={{ color: "orange" }} />
                        <Typography variant="body2" sx={{ color: "white", fontWeight: 600 }}>
                            {today}
                        </Typography>
                    </Box>
                </Box>

                <CardContent sx={{ p: 3 }}>
                    {/* Title + bookmark */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 1,
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                color: theme.palette.mode === "dark" ? "white" : "black",
                            }}
                        >
                            {inspiration.title}
                        </Typography>
                        <IconButton
                            sx={{ color: theme.palette.mode === "dark" ? "white" : "black" }}
                        >
                            <BookmarkBorder />
                        </IconButton>
                    </Box>

                    {/* Description */}
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 1.5,
                            mb: 2,
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 1,
                            borderRadius: 2,
                            borderStyle: "dashed",
                            borderColor:
                                theme.palette.mode === "dark"
                                    ? "rgba(255,255,255,0.2)"
                                    : "rgba(0,0,0,0.15)",
                            bgcolor:
                                theme.palette.mode === "dark"
                                    ? "rgba(255,255,255,0.05)"
                                    : "rgba(0,0,0,0.02)",
                        }}
                    >
                        <Assignment fontSize="small" />
                        <Typography variant="body2">{inspiration.desc}</Typography>
                    </Paper>

                    {/* Tags */}
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                        {inspiration.tags.map((tag) => (
                            <Chip
                                key={tag}
                                label={`#${tag}`}
                                size="small"
                                sx={{
                                    borderRadius: "8px",
                                    background:
                                        theme.palette.mode === "dark"
                                            ? "rgba(255,255,255,0.15)"
                                            : "rgba(0,0,0,0.08)",
                                    color: theme.palette.mode === "dark" ? "white" : "black",
                                    fontWeight: 500,
                                }}
                            />
                        ))}
                    </Box>

                    {/* Meta */}
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
                        <Typography variant="caption">⏱ {inspiration.duration}</Typography>
                        <Typography variant="caption">🎶 {inspiration.music}</Typography>
                        <Typography variant="caption">
                            🎬 {inspiration.shots} shots
                        </Typography>
                        <Typography variant="caption">⭐ {inspiration.difficulty}</Typography>
                    </Box>

                    {/* Shots Preview */}
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: `repeat(${inspiration.shots}, 1fr)`,
                            gap: 1.2,
                            mb: 2,
                        }}
                    >
                        {inspiration.shotsDetails?.map((shot, i) => {
                            const dur = Math.floor(parseDuration(inspiration.duration) / inspiration.shots);
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.15, duration: 0.4 }}
                                >
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 1,
                                            height: 90,
                                            borderRadius: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            bgcolor:
                                                theme.palette.mode === "dark"
                                                    ? "rgba(255,255,255,0.08)"
                                                    : "rgba(0,0,0,0.04)",
                                        }}
                                    >
                                        <Typography sx={{ fontSize: "1.4rem" }}>{shot.emoji}</Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{ mt: 0.5, textAlign: "center", fontWeight: 500 }}
                                        >
                                            {shot.text}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{ fontSize: "0.7rem", mt: 0.3 }}
                                        >
                                            ⏱ {dur}s
                                        </Typography>
                                    </Paper>
                                </motion.div>
                            );
                        })}
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="caption" sx={{ display: "block", mb: 1.5 }}>
                        💡 {inspiration.tip}
                    </Typography>

                    {/* Button */}
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                borderRadius: 2,
                                py: 1.4,
                                fontWeight: 600,
                                textTransform: "none",
                                fontSize: "1rem",
                                background: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
                                color: "white",
                            }}
                            onClick={handleRecord}
                        >
                            🎥 Start Challenge
                        </Button>
                    </motion.div>
                </CardContent>
            </Card>
        </Box>
    );
}
