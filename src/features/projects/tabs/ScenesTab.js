import React, { useCallback } from "react";
import {
    Box,
    Paper,
    Typography,
    IconButton,
    Button,
    useTheme, Chip,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";


// 🎨 палитры для карточек
const darkCardBackgrounds = [
    "linear-gradient(135deg, #1a1a1a, #2a2a2a)",
    "linear-gradient(135deg, #0f0f0f, #1e1e1e)",
    "linear-gradient(135deg, #1c1c24, #2d2d3a)",
    "linear-gradient(135deg, #1b1525, #241b36)",
];

const lightCardBackgrounds = [
    "linear-gradient(135deg, #ffffff, #f3f3f3)",
    "linear-gradient(135deg, #fdfbfb, #ebedee)",
    "linear-gradient(135deg, #f8f9fa, #e9ecef)",
    "linear-gradient(135deg, #e0eafc, #cfdef3)",
];

export default function ScenesTab({
                                      setCurrentProject,
                                      scenes,
                                      onAddScene,
                                      onDeleteScene,
                                      onToggleComplete
                                  }) {
    const theme = useTheme();

    const handleAttachMedia = useCallback(
        (sceneId, file) => {
            const url = URL.createObjectURL(file);
            setCurrentProject((prev) => ({
                ...prev,
                scenes: prev.scenes.map((s) =>
                    s.id === sceneId ? { ...s, media: url } : s
                ),
            }));
        },
        [setCurrentProject]
    );

    const handleDrop = (sceneId, e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith("video/")) {
            handleAttachMedia(sceneId, file);
        }
    };

    const getCardBackground = (index) => {
        const pool =
            theme.palette.mode === "dark" ? darkCardBackgrounds : lightCardBackgrounds;
        return pool[index % pool.length];
    };

    return (
        <>
            <Box>
                <Button startIcon={<AddIcon/>} variant={'contained'} color={'success'} sx={{ mt: 1, mb: 2 }} onClick={onAddScene}>
                    <Typography fontWeight={'bold'}>Add Scene</Typography>
                </Button>
            </Box>
            <Swiper
                modules={[Pagination]}
                spaceBetween={12}
                slidesPerView={1}
                style={{ paddingBottom: "60px" }}
                pagination={{
                    clickable: true,
                    renderBullet: (index, className) => {
                        return `
        <span class="${className}" 
              style="
                width: 32px;
                height: 32px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                background: rgba(255,255,255,0.3);
                color: white;
                font-size: 16px;
                font-weight: 600;
                margin: 0 6px;
                cursor: pointer;
              ">
          ${index + 1}
        </span>`;
                    },
                }}
                sx={{
                    "& .swiper-pagination": {
                        position: "relative",
                        marginTop: "16px",
                        textAlign: "center",
                    },
                    "& .swiper-pagination-bullet-active": {
                        background: "white !important",
                        color: "black !important", // активная цифра — чёрная на белом круге
                    },
                }}
            >
                {scenes?.map((scene, idx) => (
                    <SwiperSlide key={scene.id}>
                        <Paper
                            elevation={4}
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                background: getCardBackground(idx),
                                border: "1px solid",
                                borderColor: theme.palette.divider,
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                                position: "relative",
                                boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                            }}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDrop(scene.id, e)}
                        >
                            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    {scene.title}
                                </Typography>
                                <Box>
                                    <Chip color={ scene.completed ? 'success' : 'info' } label={scene.completed ? 'Ready' : 'In progress'} size="small"/>
                                    <IconButton
                                        component={'label'}
                                        size="small"
                                    >
                                        <UploadFileIcon fontSize="small" />
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
                                    </IconButton>
                                    {/* Минусик */}
                                    <IconButton
                                        color="error"
                                        size="small"
                                        onClick={() => onDeleteScene(scene.id)}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                                {scene.duration}s • {scene.description} {idx + 1}
                            </Typography>

                            {/* Видео или Drop-зона */}
                            {scene.media ? (
                                <video
                                    src={scene.media}
                                    controls
                                    style={{
                                        width: "100%",
                                        borderRadius: 8,
                                    }}
                                />
                            ) : (
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        border: "2px dashed",
                                        borderColor: "divider",
                                        borderRadius: 2,
                                        pt: 2 , pb: 2,
                                        color: "text.secondary",
                                        fontStyle: "italic",
                                        background:
                                            theme.palette.mode === "dark"
                                                ? "rgba(255,255,255,0.05)"
                                                : "rgba(0,0,0,0.03)",
                                    }}
                                >
                                    Drag & Drop video here
                                </Box>
                            )}

                            {/* Кнопки состояния */}
                            <Button
                                sx={{ mb: 1 }}
                                variant={scene.completed ? "contained" : "outlined"}
                                color="success"
                                size="small"
                                startIcon={
                                    scene.completed ? (
                                        <CheckCircleIcon />
                                    ) : (
                                        <HourglassEmptyIcon />
                                    )
                                }
                                onClick={() => onToggleComplete(scene.id)}
                            >
                                {scene.completed ? "Ready" : "Mark as Ready"}
                            </Button>
                        </Paper>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}

