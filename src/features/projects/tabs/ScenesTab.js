import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Chip,
    IconButton,
    Grid,
    Button,
} from "@mui/material";
import { AddCircle, Delete, Refresh, Edit } from "@mui/icons-material";
import {
    DragDropContext,
    Droppable,
    Draggable,
} from "@hello-pangea/dnd";

export default function ScenesTab() {
    const [scenes, setScenes] = useState([
        {
            id: "1",
            title: "Opening Shot",
            desc: "Wide drone view of mountains at sunrise.",
            duration: "10s",
            status: "Draft",
        },
        {
            id: "2",
            title: "Close-up Emotion",
            desc: "Face reacting to the first view of the city.",
            duration: "8s",
            status: "Planned",
        },
        {
            id: "3",
            title: "Action Sequence",
            desc: "Walking through the busy market with ambient sound.",
            duration: "12s",
            status: "In Progress",
        },
    ]);

    // перестановка элементов
    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(scenes);
        const [reordered] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reordered);
        setScenes(items);
    };

    const handleRegenerate = (id) => {
        alert(`AI regenerates scene ${id}`);
    };

    const handleDelete = (id) => {
        setScenes(scenes.filter((s) => s.id !== id));
    };

    const handleAddScene = () => {
        const newId = String(Date.now());
        setScenes([
            ...scenes,
            {
                id: newId,
                title: "New Scene",
                desc: "Describe your scene idea here...",
                duration: "5s",
                status: "Draft",
            },
        ]);
    };

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Scenes
                </Typography>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => alert("AI regenerates all scenes")}
                    startIcon={<Refresh />}
                >
                    Regenerate All
                </Button>
            </Box>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="scenes">
                    {(provided) => (
                        <Grid
                            container
                            spacing={2}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {scenes.map((scene, index) => (
                                <Draggable
                                    key={scene.id}
                                    draggableId={scene.id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <Box display={'flex'} flexDirection={'column'} width={'100%'}

                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <Card
                                                sx={{
                                                    width: "100%",
                                                    borderRadius: 3,
                                                    height: 180,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "space-between",
                                                    backdropFilter: "blur(16px) saturate(180%)",
                                                    WebkitBackdropFilter: "blur(16px) saturate(180%)",
                                                    backgroundColor: "rgba(255,255,255,0.06)",
                                                    boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                                                    p: 2,
                                                    transition: "all 0.2s ease",
                                                    "&:hover": {
                                                        transform: "scale(1.02)",
                                                        boxShadow: "0 6px 28px rgba(0,0,0,0.35)",
                                                    },
                                                }}
                                            >
                                                <CardContent sx={{ p: 0, flexGrow: 1 }}>
                                                    {/* Заголовок + длительность */}
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            mb: 1,
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="subtitle1"
                                                            sx={{ fontWeight: 600 }}
                                                            noWrap
                                                        >
                                                            {scene.title}
                                                        </Typography>
                                                        <Chip
                                                            label={scene.duration}
                                                            size="small"
                                                            color="primary"
                                                            sx={{ fontWeight: 600 }}
                                                        />
                                                    </Box>

                                                    {/* Описание */}
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={{
                                                            display: "-webkit-box",
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: "vertical",
                                                            overflow: "hidden",
                                                            mb: 1,
                                                        }}
                                                    >
                                                        {scene.desc}
                                                    </Typography>

                                                    {/* Статус */}
                                                    <Chip
                                                        label={scene.status}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{ fontSize: "0.75rem", opacity: 0.8 }}
                                                    />
                                                </CardContent>

                                                {/* Кнопки действий */}
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "flex-end",
                                                        gap: 1,
                                                    }}
                                                >
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleRegenerate(scene.id)}
                                                    >
                                                        <Refresh fontSize="small" />
                                                    </IconButton>
                                                    <IconButton size="small">
                                                        <Edit fontSize="small" />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleDelete(scene.id)}
                                                    >
                                                        <Delete fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            </Card>
                                        </Box>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}

                            {/* Кнопка добавить сцену */}
                            <Grid item xs={12} sm={6}>
                                <Card
                                    onClick={handleAddScene}
                                    sx={{
                                        borderRadius: 3,
                                        height: 180,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                        backdropFilter: "blur(16px) saturate(180%)",
                                        WebkitBackdropFilter: "blur(16px) saturate(180%)",
                                        backgroundColor: "rgba(255,255,255,0.04)",
                                        border: "2px dashed rgba(255,255,255,0.15)",
                                        "&:hover": {
                                            transform: "scale(1.02)",
                                            boxShadow: "0 6px 28px rgba(0,0,0,0.35)",
                                        },
                                    }}
                                >
                                    <IconButton color="primary" sx={{ fontSize: 64 }}>
                                        <AddCircle sx={{ fontSize: 48 }} />
                                    </IconButton>
                                </Card>
                            </Grid>
                        </Grid>
                    )}
                </Droppable>
            </DragDropContext>
        </Box>
    );
}
