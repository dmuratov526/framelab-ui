import React from "react";
import {
    Box,
    Button,
    Grid,
    Paper,
    Typography,
    IconButton,
    Checkbox
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function ScenesTab({ scenes, onAddScene, onDeleteScene, onRegenerateScenes, onToggleComplete }) {
    return (
        <Box>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <Button variant="contained" startIcon={<AddIcon />} onClick={onAddScene}>
                    Add
                </Button>
                <Button variant="contained" color={'info'}  startIcon={<RefreshIcon/>} onClick={onRegenerateScenes}>
                    Regenerate
                </Button>
            </Box>

            <Grid container spacing={2}>
                {scenes?.map((scene) => (
                    <Grid item size={{ xs: 12, md: 6 }} key={scene.id}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
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

                            <IconButton
                                color="error"
                                size="small"
                                onClick={() => onDeleteScene(scene.id)}
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