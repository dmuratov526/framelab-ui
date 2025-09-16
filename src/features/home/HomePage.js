import React from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    LinearProgress,
    Container,
    Chip, Grid,
} from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const user = { name: "Ethan" };
    const stats = { planned: 5, completed: 2 };
    const navigate = useNavigate();

    const handleNewProject = () => {
        navigate("/projects/new");
    };

    const trendingTags = [
        "travel",
        "coffee",
        "dance",
        "citylife",
        "friends",
        "nature",
        "storytime",
    ];

    return (
        <Container maxWidth="md" sx={{ p: 0, pb: 2, mt: 1 }}>
            {/* Приветствие */}
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Hi, {user.name} 👋
            </Typography>

            <Grid container mb={2} spacing={2} alignItems="stretch">
                <Grid item size={{ xs: 12, md: 6 }}>
                    {/* Highlights / Stats */}
                    <Card
                        sx={(theme) => ({
                            borderRadius: 2,
                            mb: 2,
                            height: "100%",
                            background:
                                theme.palette.mode === "dark"
                                    ? "linear-gradient(180deg, rgba(40,50,70,0.9) 0%, rgba(20,25,35,0.95) 100%)"
                                    : "linear-gradient(180deg, rgba(250,250,255,0.9) 0%, rgba(240,240,250,0.95) 100%)",
                        })}
                    >
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                📊 Your Highlights
                            </Typography>
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                                    gap: 3,
                                }}
                            >
                                <Box sx={{ textAlign: "center" }}>
                                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                        {stats.planned}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Planned Projects
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: "center" }}>
                                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                        {stats.completed}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Completed
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: "center" }}>
                                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                        3d
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Current Streak
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: "center" }}>
                                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                        4m 20s
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Total Video Time
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item size={{ xs: 12, md: 6 }}>

                    {/* Achievements (градиентная плашка) */}
                    <Box
                        sx={{
                            height: '100%',
                            borderRadius: 2,
                            mb: 2,
                            p: 2,
                            background: "linear-gradient(135deg, rgba(103,58,183,0.1), rgba(33,150,243,0.08))",
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            🏆 Achievements
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                            <Chip label="🔥 3 Projects in a Row" color="primary" />
                            <Chip label="🎬 First Video Published" color="secondary" />
                            <Chip label="🌟 7-Day Streak" variant="outlined" />
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Grid container spacing={2} alignItems="stretch" mb={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    {/* Quick Actions */}
                    <Card
                        sx={(theme) => ({
                            borderRadius: 2,
                            height: '100%',
                            mb: 2,
                            background:
                                theme.palette.mode === "dark"
                                    ? "linear-gradient(135deg, #0f0f17 0%, #1a1a2e 50%, #0d0d14 100%)"
                                    : "linear-gradient(135deg, #f9f9fb 0%, #f0f0f5 50%, #ffffff 100%)",
                            boxShadow:
                                theme.palette.mode === "dark"
                                    ? "0 8px 24px rgba(0,0,0,0.7)"
                                    : "0 4px 12px rgba(0,0,0,0.15)",
                            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
                        })}
                    >
                        <CardContent sx={{ textAlign: "left" }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                ⚡ Quick Actions
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ borderRadius: 2 }}
                                    onClick={handleNewProject}
                                >
                                    + New Project
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    fullWidth
                                    sx={(theme) => ({
                                        borderRadius: 2,
                                        borderColor:
                                            theme.palette.mode === "dark"
                                                ? "rgba(255,255,255,0.3)"
                                                : "rgba(0,0,0,0.3)",
                                        color:
                                            theme.palette.mode === "dark"
                                                ? "rgba(255,255,255,0.9)"
                                                : "rgba(0,0,0,0.9)",
                                        "&:hover": {
                                            borderColor: theme.palette.mode === "dark" ? "#fff" : "#000",
                                            background:
                                                theme.palette.mode === "dark"
                                                    ? "rgba(255,255,255,0.08)"
                                                    : "rgba(0,0,0,0.05)",
                                        },
                                    })}
                                >
                                    🚀 Join Challenge
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    {/* Community Now */}
                    <Box
                        sx={{
                            height: '100%',
                            borderRadius: 2,
                            mb: 2,
                            p: 2,
                            background: "linear-gradient(135deg, rgba(103,58,183,0.08), rgba(103,58,183,0.03))",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            🌍 Community Now
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            🚀 1,245 creators completed challenges today <br />
                            🔥 Trending: <b>#dance</b> (3.2k clips) <br />
                            🎶 Most used track: "Urban Beat"
                        </Typography>

                        {/* Прогрессбар активности */}
                        <Box sx={{ mb: 2 }}>
                            <LinearProgress
                                variant="determinate"
                                value={75}
                                sx={{ height: 6, borderRadius: 2 }}
                                color="primary"
                            />
                            <Typography variant="caption" color="text.secondary">
                                75% more active than yesterday
                            </Typography>
                        </Box>

                        {/* Мини-аватарки онлайн */}
                        <Box sx={{ display: "flex", gap: 1 }}>
                            {Array.from({ length: 5 }).map((_, idx) => (
                                <Box
                                    key={idx}
                                    component="img"
                                    src={`https://i.pravatar.cc/40?img=${idx + 10}`}
                                    alt="user"
                                    sx={{
                                        width: 28,
                                        height: 28,
                                        borderRadius: "50%",
                                        border: "2px solid white",
                                        boxShadow: "0 0 0 1px rgba(0,0,0,0.1)",
                                    }}
                                />
                            ))}
                            <Typography variant="caption" color="text.secondary" sx={{ alignSelf: "center" }}>
                                +320 online
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>


            {/* Tips (без карточки, как заметка) */}
            <Box
                sx={{
                    borderRadius: 2,
                    mb: 2,
                    p: 2,
                    background: "linear-gradient(135deg, rgba(103,58,183,0.1), rgba(33,150,243,0.08))",
                    border: "1px dashed rgba(0,0,0,0.15)",
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    🎬 Tips for Creators
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    🌟 Use natural light when filming. <br />
                    🎶 Match your clips with the beat of the music. <br />
                    ✨ Keep it short and dynamic for max engagement.
                </Typography>
            </Box>

            {/* Trending Tags */}
            <Card
                sx={(theme) => ({
                    borderRadius: 2,
                    mb: 2,
                    background:
                        theme.palette.mode === "dark"
                            ? "linear-gradient(135deg, #141421 0%, #1d1d2f 50%, #111118 100%)"
                            : "linear-gradient(135deg, #ffffff 0%, #f5f5f9 50%, #fdfdfd 100%)",
                    boxShadow:
                        theme.palette.mode === "dark"
                            ? "0 8px 24px rgba(0,0,0,0.6)"
                            : "0 4px 12px rgba(0,0,0,0.12)",
                    color: theme.palette.mode === "dark" ? "#fff" : "inherit",
                })}
            >
                <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        🔥 Trending Tags
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {trendingTags.map((tag) => (
                            <Chip
                                key={tag}
                                label={`#${tag}`}
                                variant="outlined"
                                sx={(theme) => ({
                                    borderColor:
                                        theme.palette.mode === "dark"
                                            ? "rgba(255,255,255,0.25)"
                                            : "rgba(0,0,0,0.25)",
                                    color:
                                        theme.palette.mode === "dark"
                                            ? "rgba(255,255,255,0.9)"
                                            : "rgba(0,0,0,0.8)",
                                    "&:hover": {
                                        background:
                                            theme.palette.mode === "dark"
                                                ? "rgba(255,255,255,0.08)"
                                                : "rgba(0,0,0,0.05)",
                                    },
                                })}
                            />
                        ))}
                    </Box>
                </CardContent>
            </Card>


            {/* Inspiration Videos (сетка) */}
            <Box sx={{ mt: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    🎥 Inspiration Videos
                </Typography>
                <Box
                    sx={{
                        display: "grid",
                        gridAutoFlow: "column",
                        gridTemplateRows: "repeat(2, 1fr)",
                        gridAutoColumns: "160px",
                        overflowX: "auto",
                        gap: 2,
                        pb: 1,
                        "&::-webkit-scrollbar": { display: "none" },
                    }}
                >
                    {Array.from({ length: 16 }).map((_, idx) => (
                        <Card
                            key={idx}
                            sx={{
                                borderRadius: 2,
                                overflow: "hidden",
                                position: "relative",
                                height: 140,
                            }}
                        >
                            <Box
                                component="img"
                                src={`https://picsum.photos/300/200?random=${idx + 1}`}
                                alt={`Inspiration ${idx + 1}`}
                                sx={{
                                    width: "100%",
                                    height: 100,
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                            <PlayCircleFilledWhiteIcon
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    color: "white",
                                    fontSize: 36,
                                    opacity: 0.85,
                                }}
                            />
                            <CardContent sx={{ p: 1 }}>
                                <Typography
                                    variant="body2"
                                    noWrap
                                    sx={{ fontWeight: 500 }}
                                >
                                    Inspiration {idx + 1}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Container>
    );
}
