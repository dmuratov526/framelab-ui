import React from "react";
import {
    Box,
    Button,
    Grid,
    Paper,
    Typography,
    IconButton,
    Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function ScenesTab({
                                      setCurrentProject,
                                      scenes,
                                      onAddScene,
                                      onDeleteScene,
                                      onRegenerateScenes,
                                      onToggleComplete,
                                  }) {
    const handleAttachMedia = (sceneId, file) => {
        const url = URL.createObjectURL(file); // временный blob-URL
        setCurrentProject((prev) => ({
            ...prev,
            scenes: prev.scenes.map((s) =>
                s.id === sceneId ? { ...s, media: url } : s
            ),
        }));
    };

    return (
        <Box>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={onAddScene}
                >
                    Add
                </Button>
                <Button
                    variant="contained"
                    color={"info"}
                    startIcon={<RefreshIcon />}
                    onClick={onRegenerateScenes}
                >
                    Regenerate
                </Button>
            </Box>

            <Grid container spacing={2}>
                {scenes?.map((scene) => (
                    <Grid item xs={12} md={6} key={scene.id}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                            }}
                        >
                            {/* Заголовок + чекбокс */}
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Checkbox
                                    checked={scene.completed}
                                    onChange={() => onToggleComplete(scene.id)}
                                />
                                <Box>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight: 600,
                                            textDecoration: scene.completed ? "line-through" : "none",
                                            opacity: scene.completed ? 0.6 : 1,
                                        }}
                                    >
                                        {scene.title}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {scene.duration}s • {scene.description}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Блок загрузки видео */}
                            <Box>
                                {scene.media ? (
                                    <video
                                        src={scene.media}
                                        controls
                                        style={{ width: "100%", borderRadius: 8 }}
                                    />
                                ) : (
                                    <Typography variant="caption" color="text.secondary">
                                        No video attached
                                    </Typography>
                                )}

                                <Button
                                    component="label"
                                    variant="outlined"
                                    size="small"
                                    sx={{ mt: 1 }}
                                >
                                    Attach video
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

                            {/* Кнопка удалить */}
                            <IconButton
                                color="error"
                                size="small"
                                onClick={() => onDeleteScene(scene.id)}
                                sx={{ alignSelf: "flex-end" }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
