import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
} from "@mui/material";

const CLIENT_ID = "001345e0"; // твой client_id от Jamendo

export default function MusicTab({ music, onSelectMusic }) {
    const [tracks, setTracks] = useState([]);

    // функция загрузки треков
    const fetchTracks = async (order = "popularity_total") => {
        try {
            const res = await fetch(
                `https://api.jamendo.com/v3.0/tracks/?client_id=${CLIENT_ID}&format=json&limit=6&order=${order}&include=musicinfo`
            );
            const data = await res.json();
            setTracks(data.results);
        } catch (err) {
            console.error("Ошибка загрузки музыки", err);
        }
    };

    useEffect(() => {
        fetchTracks(); // при открытии показываем популярные треки
    }, []);

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
                🎵 Popular Tracks
            </Typography>

            <Button
                variant="outlined"
                onClick={() => fetchTracks("random")}
                sx={{ mb: 2 }}
            >
                🎲 Regenerate (Random)
            </Button>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                    gap: 2,
                }}
            >
                {tracks.map((track) => (
                    <Card key={track.id} sx={{ borderRadius: 2 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={track.album_image}
                            alt={track.name}
                        />
                        <CardContent>
                            <Typography variant="subtitle1" fontWeight={600}>
                                {track.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {track.artist_name}
                            </Typography>
                            <audio controls src={track.audio} style={{ width: "100%" }} />
                            <Button
                                variant={music?.id === track.id ? "contained" : "outlined"}
                                fullWidth
                                sx={{ mt: 1 }}
                                onClick={() => onSelectMusic(track)}
                            >
                                {music?.id === track.id ? "Selected" : "Select"}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}
