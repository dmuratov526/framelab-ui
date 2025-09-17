import React, { useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { Button } from "@mui/material";

export default function VideoExporter({ project }) {
    const [ffmpeg] = useState(new FFmpeg());
    const [isReady, setIsReady] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [outputUrl, setOutputUrl] = useState(null);

    const loadFFmpeg = async () => {
        if (!ffmpeg.loaded) {
            // грузим wasm и worker
            await ffmpeg.load({
                coreURL: "/ffmpeg/ffmpeg-core.js",
                wasmURL: "/ffmpeg/ffmpeg-core.wasm",
            });
        }
        setIsReady(true);
    };

    const exportVideo = async () => {
        if (!isReady) await loadFFmpeg();

        setIsExporting(true);

        // Загружаем сцены
        for (let i = 0; i < project.scenes.length; i++) {
            const scene = project.scenes[i];
            if (scene.media) {
                const res = await fetch(scene.media);
                const buf = await res.arrayBuffer();
                await ffmpeg.writeFile(`scene${i}.mp4`, new Uint8Array(buf));
            }
        }

        // Загружаем музыку
        if (project.music?.audio) {
            const res = await fetch(project.music.audio);
            const buf = await res.arrayBuffer();
            await ffmpeg.writeFile("music.mp3", new Uint8Array(buf));
        }

        // concat list
        let concatList = "";
        project.scenes.forEach((_, i) => {
            concatList += `file 'scene${i}.mp4'\n`;
        });
        await ffmpeg.writeFile("concat.txt", concatList);

        // Склейка видео
        await ffmpeg.exec([
            "-f", "concat",
            "-safe", "0",
            "-i", "concat.txt",
            "-c", "copy",
            "joined.mp4",
        ]);

        // Добавляем музыку
        await ffmpeg.exec([
            "-i", "joined.mp4",
            "-i", "music.mp3",
            "-c:v", "copy",
            "-c:a", "aac",
            "-shortest",
            "final.mp4",
        ]);

        // Читаем результат
        const data = await ffmpeg.readFile("final.mp4");
        const url = URL.createObjectURL(
            new Blob([data.buffer], { type: "video/mp4" })
        );
        setOutputUrl(url);
        setIsExporting(false);
    };

    return (
        <div>
            <Button
                onClick={exportVideo}
                variant="contained"
                color="primary"
                disabled={isExporting}
            >
                {isExporting ? "Exporting..." : "Export Video"}
            </Button>

            {outputUrl && (
                <video
                    src={outputUrl}
                    controls
                    style={{ width: "100%", marginTop: 20 }}
                />
            )}
        </div>
    );
}
