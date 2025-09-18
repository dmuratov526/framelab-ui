import React, {useEffect, useState} from "react";
import {
    Box,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
    Button, CircularProgress,
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MovieIcon from "@mui/icons-material/Movie";
import {FFmpeg} from "@ffmpeg/ffmpeg";

export default function ProjectPreview({ project }) {
    //export
    const [ffmpeg] = useState(new FFmpeg());
    const [isReady, setIsReady] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [outputUrl, setOutputUrl] = useState(null);

    // 🔹 Логирование для отладки
    useEffect(() => {
        ffmpeg.on("log", ({ type, message }) => {
            console.log(`[ffmpeg.${type}] ${message}`);
        });
    }, [ffmpeg]);

    const loadFFmpeg = async () => {
        if (!ffmpeg.loaded) {
            await ffmpeg.load({
                coreURL: `${process.env.PUBLIC_URL}/ffmpeg/ffmpeg-core.js`,
                wasmURL: `${process.env.PUBLIC_URL}/ffmpeg/ffmpeg-core.wasm`,
            });
        }
        setIsReady(true);
    };

    const exportVideo = async () => {
        try {
            if (!isReady) await loadFFmpeg();
            setIsExporting(true);
            console.log("Project:", project);

            // 🔹 Загружаем и обрезаем сцены
            for (let i = 0; i < project.scenes.length; i++) {
                const scene = project.scenes[i];
                if (!scene.media) continue;

                const res = await fetch(scene.media);
                const buf = await res.arrayBuffer();
                await ffmpeg.writeFile(`orig${i}.mp4`, new Uint8Array(buf));

                const args = [
                    "-y",
                    ...(scene.startTime ? ["-ss", String(scene.startTime)] : []),
                    "-i", `orig${i}.mp4`,
                    ...(scene.duration ? ["-t", String(scene.duration)] : []),
                    "-vf", "scale=1280:720,fps=30",
                    "-c:v", "libx264",
                    "-preset", "ultrafast",
                    "-c:a", "aac",
                    `scene${i}.mp4`,
                ];
                await ffmpeg.exec(args);
            }

            // 🔹 Считаем общую длительность проекта
            const totalDuration = project.scenes.reduce(
                (sum, s) => sum + (s.duration || 0),
                0
            );

            // 🔹 concat list
            let concatList = "";
            project.scenes.forEach((s, i) => {
                if (s.media) concatList += `file 'scene${i}.mp4'\n`;
            });
            await ffmpeg.writeFile("concat.txt", concatList);

            // 🔹 Склейка сцен
            await ffmpeg.exec([
                "-y",
                "-f", "concat",
                "-safe", "0",
                "-i", "concat.txt",
                "-c:v", "libx264",
                "-preset", "ultrafast",
                "-c:a", "aac",
                "joined.mp4",
            ]);

            // 🔹 Финальная сборка (с музыкой или без)
            if (project.music?.audio) {
                const res = await fetch(project.music.audio);
                const buf = await res.arrayBuffer();
                await ffmpeg.writeFile("music.mp3", new Uint8Array(buf));

                const start = project.music.startTime || 0;

                await ffmpeg.exec([
                    "-y",
                    "-i", "joined.mp4",
                    "-ss", String(start),
                    "-i", "music.mp3",
                    "-t", String(totalDuration),
                    "-map", "0:v:0",
                    "-map", "1:a:0",
                    "-c:v", "libx264",
                    "-preset", "ultrafast",
                    "-c:a", "aac",
                    "-shortest",
                    "final.mp4",
                ]);
            } else {
                await ffmpeg.exec([
                    "-y",
                    "-i", "joined.mp4",
                    "-t", String(totalDuration),
                    "-c:v", "libx264",
                    "-preset", "ultrafast",
                    "-c:a", "aac",
                    "final.mp4",
                ]);
            }

            console.log("FS after final step:", await ffmpeg.listDir("/"));

            // 🔹 Читаем результат
            const data = await ffmpeg.readFile("final.mp4");
            const url = URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }));
            setOutputUrl(url);

            // 🔹 Очистка временных файлов
            await ffmpeg.deleteFile("concat.txt");
            for (let i = 0; i < project.scenes.length; i++) {
                if (project.scenes[i].media) {
                    await ffmpeg.deleteFile(`orig${i}.mp4`);
                    await ffmpeg.deleteFile(`scene${i}.mp4`);
                }
            }
            await ffmpeg.deleteFile("joined.mp4");
            if (project.music?.audio) {
                await ffmpeg.deleteFile("music.mp3");
            }

        } catch (err) {
            console.error("Ошибка экспорта:", err);
        } finally {
            setIsExporting(false);
        }
    };


    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                🎬 Project Preview
            </Typography>

            <Paper
                elevation={2}
                sx={{
                    mb: 3,
                    p: 2,
                    borderRadius: 2,
                    background:
                        "linear-gradient(135deg, rgba(100,100,255,0.05), rgba(150,150,255,0.08))",
                }}
            >
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                    Scenes Timeline
                </Typography>

                <List dense>
                    {project.scenes.map((scene, i) => (
                        <React.Fragment key={scene.id}>
                            <ListItem>
                                <MovieIcon color="action" sx={{ mr: 1 }} />
                                <ListItemText
                                    primary={`Scene ${i + 1}: ${scene.title}`}
                                    secondary={`${scene.duration || 0}s ${
                                        scene.media ? "• video attached" : "• no media"
                                    }`}
                                />
                            </ListItem>
                            {i < project.scenes.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                    Music
                </Typography>
                {project.music?.id ? (
                    <ListItem>
                        <MusicNoteIcon color="success" sx={{ mr: 1 }} />
                        <ListItemText
                            primary={project.music.name}
                            secondary={`Artist: ${project.music.artist_name} • Start: ${
                                project.music.startTime || 0
                            }s`}
                        />
                    </ListItem>
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        No music selected
                    </Typography>
                )}
            </Paper>

            {
                isExporting ?  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled
                >
                    <CircularProgress />
                </Button> :
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={exportVideo}
                    >
                        🚀 Export Final Video
                    </Button>
            }

            {outputUrl && (
                <video
                    src={outputUrl}
                    controls
                    style={{ width: "100%", marginTop: 20 }}
                />
            )}

            {}
        </Box>
    );
}
