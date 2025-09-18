import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    LinearProgress,
    IconButton,
    Tabs,
    Tab,
    Card,
    CardContent,
    Button, Paper, Grid,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { projectTabsConfig } from "./projectTabsConfig";
import { createProject } from "./projectFactory";
import DurationCard from "./DurationCard";
import ScenesTab from "../tabs/ScenesTab";
import { generateRandomScene, generateRandomScenes } from "./generators";
import MusicTab from "../tabs/MusicTab";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import VideoExporter from "../video/videoExporter";
import ProjectPreview from "./ProjectPreview";

export default function ProjectView() {
    const location = useLocation();
    const incomingProject = location.state?.projectData;

    const [currentProject, setCurrentProject] = useState(
        incomingProject ||
        createProject("theme", {
            title: "Default Project",
            duration: "30s",
            scenes: generateRandomScenes("theme"),
            notes: "",
        })
    );

    const [progress, setProgress] = useState(0);

    // --- Музыка ---
    const handleSelectMusic = (track) => {
        setCurrentProject((prev) => ({
            ...prev,
            music: track ? { ...track, startTime: track.startTime || 0 } : null,
        }));
    };

    // --- Сцены ---
    const handleAddScene = () => {
        setCurrentProject((prev) => ({
            ...prev,
            scenes: [
                ...(prev.scenes || []),
                generateRandomScene(prev.scenes?.length || 0, prev.type),
            ],
        }));
    };

    const handleDeleteScene = (id) => {
        setCurrentProject((prev) => ({
            ...prev,
            scenes: prev.scenes.filter((s) => s.id !== id),
        }));
    };

    const handleToggleSceneComplete = (id) => {
        setCurrentProject((prev) => ({
            ...prev,
            scenes: prev.scenes.map((s) =>
                s.id === id ? { ...s, completed: !s.completed } : s
            ),
        }));
    };

    // --- Генерация сцен ---
    function generateScenesMatchingTotal(type, total) {
        const numScenes = 2 + Math.floor(Math.random() * 5); // от 2 до 6 сцен
        let remaining = total;
        const scenes = [];

        for (let i = 0; i < numScenes; i++) {
            let dur;
            if (i === numScenes - 1) {
                dur = remaining;
            } else {
                dur = Math.max(1, Math.floor(remaining * (0.1 + Math.random() * 0.3)));
            }
            remaining -= dur;

            scenes.push({
                id: `${Date.now()}-${i}`,
                title: `Scene ${i + 1}`,
                duration: dur,
                description: `${type} scene`,
                completed: false,
                media: null,
            });
        }

        return scenes;
    }

    const handleRegenerateOnlyScenes = () => {
        setCurrentProject((prev) => ({
            ...prev,
            scenes: generateScenesMatchingTotal(prev.type, parseInt(prev.duration)),
        }));
    };

    const handleRegenerateScenes = (newDuration) => {
        setCurrentProject((prev) =>
            createProject(prev.type, {
                title: prev.title,
                duration: `${newDuration}s`,
                scenes: generateScenesMatchingTotal(prev.type, newDuration),
            })
        );
    };

    // --- Прогресс ---
    function calculateProgress(project) {
        let totalSteps = project.scenes.length + 1; // сцены + музыка
        let done = project.scenes.filter((s) => s.completed).length;

        // ✅ учитываем только если реально выбран трек
        if (project.music?.id) done += 1;

        return totalSteps === 0 ? 0 : Math.round((done / totalSteps) * 100);
    }

    useEffect(() => {
        setProgress(calculateProgress(currentProject));
    }, [currentProject]);

    const config = projectTabsConfig[currentProject.type] || { tabs: [] };
    const currentTabs = config.tabs || [];
    const [tabIndex, setTabIndex] = useState(0);

    const navigate = useNavigate();

    return (
        <Box maxWidth="md" sx={{ mt: 1, mb: 4 }}>
            {/* Заголовок */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                }}
            >
                <Box display={"flex"} alignItems={"center"}>
                    <IconButton size="small" onClick={() => navigate(-1)}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {currentProject.title}
                    </Typography>
                </Box>
                <Box>
                    <IconButton>
                        <ShareIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* Прогресс */}
            <Card
                sx={(theme) => ({
                    borderRadius: 2,
                    mb: 3,
                    background:
                        theme.palette.mode === "dark"
                            ? "linear-gradient(135deg, #121212 0%, #1e1e2e 50%, #0f0f17 100%)"
                            : "linear-gradient(135deg, #f8f9fb 0%, #eef1f7 50%, #ffffff 100%)",
                })}
            >
                <CardContent>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                        Progress
                    </Typography>

                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{ height: 8, borderRadius: 5, mb: 2 }}
                        color="primary"
                    />
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block", mb: 2 }}
                    >
                        {progress}% complete
                    </Typography>

                    {/* Детали в виде сетки */}
                    <Grid container spacing={2}>
                        <Grid item size={4} height="100%">
                            <Paper
                                variant="outlined"
                                sx={{
                                    p: 1.5,
                                    borderRadius: 1,
                                    textAlign: "center",
                                    bgcolor: "background.default",
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    {currentProject.scenes.filter((s) => s.completed).length}/
                                    {currentProject.scenes.length}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Scenes Ready
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid item size={4} height="100%">
                            <Paper
                                variant="outlined"
                                sx={{
                                    p: 1.5,
                                    borderRadius: 1,
                                    textAlign: "center",
                                    bgcolor: "background.default",
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 700,
                                        color: currentProject.music?.id ? "success.main" : "error.main",
                                    }}
                                >
                                    {currentProject.music?.id ? "✓" : "✗"}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {currentProject.music?.id
                                        ? `Music (${currentProject.music.startTime || 0}s start)`
                                        : "Not selected"}
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid item size={4} height="100%">
                            <Paper
                                variant="outlined"
                                sx={{
                                    p: 1.5,
                                    borderRadius: 1,
                                    textAlign: "center",
                                    bgcolor: "background.default",
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    {currentProject.scenes.reduce(
                                        (sum, s) => sum + (s.duration || 0),
                                        0
                                    )}s
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Duration
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Общая длительность */}
            <DurationCard
                type={currentProject.type}
                duration={currentProject.duration}
                onRegenerate={handleRegenerateScenes}
            />

            {/* Tabs */}
            <Tabs
                value={tabIndex}
                onChange={(_, v) => setTabIndex(v)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    mb: 2,
                    borderRadius: 2,
                    background:
                        "linear-gradient(135deg, rgba(103,58,183,0.08), rgba(33,150,243,0.05))",
                }}
            >
                {currentTabs.map((tab, idx) => (
                    <Tab key={idx} label={tab} />
                ))}
            </Tabs>

            {/* Контент вкладки */}
            <Card
                sx={(theme) => ({
                    borderRadius: 2,
                    p: 2,
                    minHeight: 220,
                    background:
                        theme.palette.mode === "dark"
                            ? "linear-gradient(135deg, #1a1a1a, #222 50%, #111)"
                            : "linear-gradient(135deg, #fafbff, #f0f3fa 50%, #ffffff)",
                })}
            >
                {currentTabs[tabIndex] === "Scenes" && (
                    <ScenesTab
                        setCurrentProject={setCurrentProject}
                        scenes={currentProject.scenes}
                        onAddScene={handleAddScene}
                        onDeleteScene={handleDeleteScene}
                        onRegenerateScenes={handleRegenerateOnlyScenes}
                        onToggleComplete={handleToggleSceneComplete}
                    />
                )}

                {currentTabs[tabIndex] === "Music" && (
                    <MusicTab
                        music={currentProject.music}
                        onSelectMusic={handleSelectMusic}
                    />
                )}

                {currentTabs[tabIndex] === "Preview" && (
                    <Box>
                        <Button
                            onClick={() => console.log(currentProject)}
                            variant="outlined"
                            color="secondary"
                            sx={{ mb: 2 }}
                        >
                            Debug: Get project
                        </Button>
                        <ProjectPreview project={currentProject} />
                    </Box>
                )}
            </Card>
        </Box>
    );
}
