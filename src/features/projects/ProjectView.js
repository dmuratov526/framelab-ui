import React, { useState } from "react";
import {
    Container,
    Typography,
    Box,
    Tabs,
    Tab,
    LinearProgress,
    IconButton,
    Paper,
} from "@mui/material";
import { Share } from "@mui/icons-material";
import ScenesTab from "./tabs/ScenesTab";


function MusicTab() {
    return <Typography>🎵 Music (waveform, align to beats)</Typography>;
}
function MediaTab() {
    return <Typography>📂 Media (uploads, references)</Typography>;
}
function NarrationTab() {
    return <Typography>🎙️ Narration (voiceover, TTS)</Typography>;
}
function CollabTab() {
    return <Typography>👥 Collaboration (chat, comments)</Typography>;
}
function PreviewTab() {
    return <Typography>▶️ Preview (rough cut, export)</Typography>;
}

export default function ProjectView() {
    const [tab, setTab] = useState(0);

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    const project = {
        title: "My Travel Story",
        progress: 40, // % от готовности
    };

    return (
        <Container maxWidth="md" sx={{ mt: 2, mb: 6, p: 0 }}>
            {/* Заголовок + прогресс */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {project.title}
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={project.progress}
                        sx={{
                            height: 8,
                            borderRadius: 5,
                            mt: 1,
                            maxWidth: 240,
                        }}
                        color="primary"
                    />
                </Box>
                <IconButton color="primary">
                    <Share />
                </IconButton>
            </Box>

            {/* Табы */}
            <Paper
                sx={{
                    borderRadius: 3,
                    mb: 2,
                    backdropFilter: "blur(16px) saturate(180%)",
                    WebkitBackdropFilter: "blur(16px) saturate(180%)",
                    backgroundColor: "rgba(255,255,255,0.05)",
                }}
            >
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    textColor="primary"
                    indicatorColor="primary"
                    sx={{
                        "& .MuiTab-root": { fontWeight: 600, minWidth: 100 },
                    }}
                >
                    <Tab label="Scenes" />
                    <Tab label="Music" />
                    <Tab label="Media" />
                    <Tab label="Narration" />
                    <Tab label="Collab" />
                    <Tab label="Preview" />
                </Tabs>
            </Paper>

            {/* Контент активной вкладки */}
            <Box sx={{ mt: 2 }}>
                {tab === 0 && <ScenesTab />}
                {tab === 1 && <MusicTab />}
                {tab === 2 && <MediaTab />}
                {tab === 3 && <NarrationTab />}
                {tab === 4 && <CollabTab />}
                {tab === 5 && <PreviewTab />}
            </Box>
        </Container>
    );
}