import React, { useCallback } from "react";
import {
    Box,
    Button,
    Grid,
    Paper,
    Typography,
    IconButton,
    useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

export default function ScenesTab({
                                      setCurrentProject,
                                      scenes,
                                      onAddScene,
                                      onDeleteScene,
                                      onRegenerateScenes,
                                      onToggleComplete,
                                      onOpenScene,
                                  }) {
    const theme = useTheme();

    const handleAttachMedia = useCallback((sceneId, file) => {
        const url = URL.createObjectURL(file);
        setCurrentProject((prev) => ({
            ...prev,
            scenes: prev.scenes.map((s) =>
                s.id === sceneId ? { ...s, media: url } : s
            ),
        }));
    }, [setCurrentProject]);

    const handleDrop = (sceneId, e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith("video/")) {
            handleAttachMedia(sceneId, file);
        }
    };

    return (
        <Box>
            {/* Кнопки управления */}
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <Button variant="contained" startIcon={<AddIcon />} onClick={onAddScene}>
                    Add Scene
                </Button>
                <Button
                    variant="outlined"
                    color="info"
                    startIcon={<RefreshIcon />}
                    onClick={onRegenerateScenes}
                >
                    Regenerate
                </Button>
            </Box>

            {/* Список сцен */}
            <Grid container spacing={2}>
                {scenes?.map((scene) => (
                    <Grid item size={{ xs: 12, md: 4 }} key={scene.id}>
                        <Paper
                            elevation={2}
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                position: "relative",
                                background:
                                    theme.palette.mode === "dark"
                                        ? "linear-gradient(135deg, #1b1b1d, #121214)"
                                        : "linear-gradient(135deg, #ffffff, #f7f9fc)",
                                border: "1px solid",
                                borderColor: theme.palette.divider,
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDrop(scene.id, e)}
                        >
                            {/* Заголовок */}
                            <Box>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                        {scene.title}
                                    </Typography>
                                    {/* Кнопка удалить */}
                                    <IconButton
                                        color="error"
                                        size="small"
                                        onClick={() => onDeleteScene(scene.id)}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                                <Typography variant="caption" color="text.secondary">
                                    {scene.duration}s • {scene.description}
                                </Typography>
                            </Box>

                            {/* Видео / Drop-зона */}
                            <Box>
                                {scene.media ? (
                                    <video
                                        src={scene.media}
                                        controls
                                        style={{
                                            width: "100%",
                                            borderRadius: 8,
                                            marginBottom: 8,
                                            border: "1px solid rgba(255,255,255,0.1)",
                                        }}
                                    />
                                ) : (
                                    <Box
                                        sx={{
                                            height: 150,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            border: "2px dashed",
                                            borderColor: "divider",
                                            borderRadius: 2,
                                            mb: 2,
                                            color: "text.secondary",
                                            fontStyle: "italic",
                                        }}
                                    >
                                        Drag & Drop video here
                                    </Box>
                                )}

                                {/* Кнопка загрузки */}
                                <Button
                                    component="label"
                                    variant="outlined"
                                    fullWidth
                                    startIcon={<UploadFileIcon />}
                                    sx={{
                                        py: 1.2,
                                        mt: 1,
                                        borderStyle: "dashed",
                                    }}
                                >
                                    Upload Video
                                    <input
                                        type="file"
                                        accept="video/*"
                                        hidden
                                        onChange={(e) => {
                                            if (e.target.files?.[0]) {
                                                handleAttachMedia(scene.id, e.target.files[0]);
                                            }
                                        }}
                                    />
                                </Button>
                            </Box>

                            {/* Статус + кнопка открыть */}
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Button
                                    sx={{ mb: 1 }}
                                    variant={scene.completed ? "contained" : "outlined"}
                                    color="success"
                                    size="small"
                                    startIcon={
                                        scene.completed ? <CheckCircleIcon /> : <HourglassEmptyIcon />
                                    }
                                    onClick={() => onToggleComplete(scene.id)}
                                >
                                    {scene.completed ? "Ready" : "Mark as Ready"}
                                </Button>

                                <Button
                                    variant="contained"
                                    size="small"
                                    endIcon={<ArrowForwardIosIcon />}
                                    onClick={() => onOpenScene?.(scene.id)}
                                >
                                    Open Scene
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
