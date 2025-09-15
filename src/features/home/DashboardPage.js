import React from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    LinearProgress,
    Container,
} from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import {useNavigate} from "react-router-dom";

export default function DashboardPage() {
    const user = { name: "Ethan" };
    const stats = { planned: 5, completed: 2 };
    const navigate = useNavigate();

    const handleNewProject = () => {
        navigate("/projects/new"); // путь к странице NewProjectPage
    };


    return (
        <Container maxWidth={'md'} sx={{ p:0, pb: 2, mt: 1 }}>
            {/* Приветствие */}
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Hi, {user.name} 👋
            </Typography>

            {/* Сегодняшний челлендж */}
            <Card sx={{ borderRadius: 2, mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        🎥 Today's Challenge
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Capture a 10-second clip showing your favorite place in the city.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ borderRadius: 3 }}
                    >
                        Start Challenge
                    </Button>
                </CardContent>
            </Card>

            {/* Прогресс проектов */}
            <Card sx={{ borderRadius: 2, mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        Your Progress
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {stats.completed} of {stats.planned} projects completed
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={(stats.completed / stats.planned) * 100}
                        color="primary"
                        sx={{ borderRadius: 5, height: 8 }}
                    />
                </CardContent>
            </Card>

            {/* Новый проект */}
            <Card sx={{ borderRadius: 2, mb: 3 }}>
                <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        Got an idea?
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ borderRadius: 3 }}
                        onClick={handleNewProject}   // вот тут обработчик
                    >
                        + New Project
                    </Button>
                </CardContent>
            </Card>

            {/* Подсказки */}
            <Card sx={{ borderRadius: 2, mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        Tips for Creators
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        🌟 Use natural light when filming.<br />
                        🎶 Match your clips with the beat of the music.<br />
                        ✨ Keep it short and dynamic for max engagement.
                    </Typography>
                </CardContent>
            </Card>

            {/* Inspiration Videos */}
            <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Inspiration Videos
                </Typography>
                <Box
                    sx={{
                        display: "grid",
                        gridAutoFlow: "column",               // карточки идут колонками
                        gridTemplateRows: "repeat(2, 1fr)",   // две строки
                        gridAutoColumns: "160px",             // ширина каждой карточки
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
                            {/* Превью */}
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

                            {/* Иконка Play по центру */}
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
                                <Typography variant="body2" noWrap sx={{ fontWeight: 500 }}>
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