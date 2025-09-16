import React, {useEffect, useState} from "react";
import {
    Box,
    Typography,
    LinearProgress,
    IconButton,
    Tabs,
    Tab,
    Card,
    CardContent
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { projectTabsConfig } from "./projectTabsConfig";
import { createProject } from "./projectFactory";
import DurationCard from "./DurationCard";
import ScenesTab from "../tabs/ScenesTab";
import {generateRandomScene, generateRandomScenes} from "./generators";
import MusicTab from "../tabs/MusicTab";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";




//
// const projectTypes = Object.keys(projectTabsConfig);

export default function ProjectView() {
    const location = useLocation();
    const incomingProject = location.state?.projectData;
    const [currentProject, setCurrentProject] = useState(
        incomingProject ||
        createProject("theme", {
            title: "Default Project",
            duration: "30s",
            scenes: generateRandomScenes("theme"),
            musicSelected: false,
            notes: "",
        })
    );

    const [progress, setProgress] = useState(0);

    function calculateProgress(project) {
        let totalSteps = project.scenes.length + 1; // сцены + музыка
        let done = project.scenes.filter(s => s.completed).length;
        if (project.musicSelected) done += 1;
        return totalSteps === 0 ? 0 : Math.round((done / totalSteps) * 100);
    }
    console.log(incomingProject.music)

    useEffect(() => {
        setProgress(calculateProgress(currentProject));
    }, [currentProject]);

    const config = projectTabsConfig[currentProject.type] || { tabs: [] };
    const currentTabs = config.tabs || [];
    const [tabIndex, setTabIndex] = useState(0);

    // // выбор случайного типа
    // const getRandomType = () =>
    //     projectTypes[Math.floor(Math.random() * projectTypes.length)];

    // // смена типа вручную
    // const handleTypeChange = (e) => {
    //     const newType = e.target.value;
    //     setCurrentProject(
    //         createProject(newType, {
    //             title: `New ${newType} Project`,
    //             duration: `${20 + Math.floor(Math.random() * 40)}s`,
    //             scenes: generateRandomScenes(newType),
    //         })
    //     );
    //     setTabIndex(0);
    // };
    //
    // // регенерация (полностью новый объект)
    // const handleRegenerate = () => {
    //     const newType = getRandomType();
    //     const newDuration = 20 + Math.floor(Math.random() * 40);
    //
    //     setCurrentProject(
    //         createProject(newType, {
    //             title: `Auto ${newType} Project`,
    //             duration: `${newDuration}s`,
    //             scenes: generateScenesMatchingTotal(newType, newDuration),
    //         })
    //     );
    //     setTabIndex(0);
    // };

    const handleRegenerateOnlyScenes = () => {
        setCurrentProject((prev) => ({
            ...prev,
            scenes: generateScenesMatchingTotal(prev.type, parseInt(prev.duration)),
        }));
    };

    // добавить сцену
    const handleAddScene = () => {
        setCurrentProject((prev) => ({
            ...prev,
            scenes: [
                ...(prev.scenes || []),
                generateRandomScene(prev.scenes?.length || 0, prev.type),
            ],
        }));
    };

    // удалить сцену
    const handleDeleteScene = (id) => {
        setCurrentProject((prev) => ({
            ...prev,
            scenes: prev.scenes.filter((s) => s.id !== id),
        }));
    };

    function generateScenesMatchingTotal(type, total) {
        const numScenes = 2 + Math.floor(Math.random() * 5); // от 2 до 6 сцен
        let remaining = total;
        const scenes = [];

        for (let i = 0; i < numScenes; i++) {
            let dur;
            if (i === numScenes - 1) {
                dur = remaining; // последняя сцена добивает остаток
            } else {
                dur = Math.max(1, Math.floor(remaining * (0.1 + Math.random() * 0.3)));
            }
            remaining -= dur;

            scenes.push({
                id: `${Date.now()}-${i}`,
                title: `Scene ${i + 1}`,
                duration: dur,
                description: `${type} scene`,
                completed: false
            });
        }

        return scenes;
    }

    const handleRegenerateScenes = (newDuration) => {
        setCurrentProject((prev) =>
            createProject(prev.type, {
                title: prev.title,
                duration: `${newDuration}s`,
                scenes: generateScenesMatchingTotal(prev.type, newDuration),
            })
        );
    };

    const handleToggleSceneComplete = (id) => {
        setCurrentProject((prev) => ({
            ...prev,
            scenes: prev.scenes.map((s) =>
                s.id === id ? { ...s, completed: !s.completed } : s
            ),
        }));
    };

    const handleToggleMusic = () => {
        setCurrentProject(prev => ({
            ...prev,
            musicSelected: !prev.musicSelected
        }));
    };

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
                <Box display={'flex'} alignItems={'center'}>
                    <IconButton size="small" onClick={() => navigate(-1)}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {currentProject.title}
                    </Typography>
                </Box>
                <Box>
                    {/*<IconButton onClick={handleRegenerate}>*/}
                    {/*    <AutorenewIcon />*/}
                    {/*</IconButton>*/}
                    <IconButton>
                        <ShareIcon />
                    </IconButton>
                </Box>
            </Box>

            {/*/!* Панель выбора типа проекта (для тестов) *!/*/}
            {/*<Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center" }}>*/}
            {/*    <Select*/}
            {/*        value={currentProject.type}*/}
            {/*        onChange={handleTypeChange}*/}
            {/*        size="small"*/}
            {/*    >*/}
            {/*        {projectTypes.map((key) => (*/}
            {/*            <MenuItem key={key} value={key}>*/}
            {/*                {projectTabsConfig[key].label}*/}
            {/*            </MenuItem>*/}
            {/*        ))}*/}
            {/*    </Select>*/}
            {/*</Box>*/}

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
                        sx={{ height: 8, borderRadius: 5, mb: 1 }}
                        color="primary"
                    />
                    <Typography variant="caption" color="text.secondary">
                        {progress}% complete
                    </Typography>
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
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Content for <b>{currentTabs[tabIndex]}</b> tab (type:{" "}
                    {currentProject.type})
                </Typography>

                {currentTabs[tabIndex] === "Scenes" && (
                    <ScenesTab
                        scenes={currentProject.scenes}
                        onAddScene={handleAddScene}
                        onDeleteScene={handleDeleteScene}
                        onRegenerateScenes={handleRegenerateOnlyScenes}
                        onToggleComplete={handleToggleSceneComplete} // 🟢
                    />
                )}

                {currentTabs[tabIndex] === "Music" && (
                    <MusicTab
                        music={currentProject.music}
                        musicSelected={currentProject.musicSelected}
                        onToggleMusic={handleToggleMusic}
                    />
                )}
            </Card>
        </Box>
    );
}
