import React, { useEffect, useState, useRef } from "react";
import {
    Box,
    Typography,
    Button,
    TextField,
    InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider,
    Paper,
    Slider,
    IconButton,
    Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const CLIENT_ID = "001345e0"; // твой client_id от Jamendo

export default function MusicTab({ music, onSelectMusic }) {
    const [tracks, setTracks] = useState([]);
    const [query, setQuery] = useState("");
    const [currentTrack, setCurrentTrack] = useState(null);
    const [duration, setDuration] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // --- загрузка треков ---
    const fetchTracks = async (order = "popularity_total") => {
        try {
            const res = await fetch(
                `https://api.jamendo.com/v3.0/tracks/?client_id=${CLIENT_ID}&format=json&limit=12&order=${order}&include=musicinfo`
            );
            const data = await res.json();
            setTracks(data.results);
        } catch (err) {
            console.error("Ошибка загрузки музыки", err);
        }
    };

    // --- поиск ---
    const searchTracks = async () => {
        if (!query.trim()) return fetchTracks();
        try {
            const res = await fetch(
                `https://api.jamendo.com/v3.0/tracks/?client_id=${CLIENT_ID}&format=json&limit=12&search=${encodeURIComponent(
                    query
                )}&include=musicinfo`
            );
            const data = await res.json();
            setTracks(data.results);
        } catch (err) {
            console.error("Ошибка поиска музыки", err);
        }
    };

    // --- выбор трека ---
    const playTrack = (track) => {
        if (audioRef.current) audioRef.current.pause();

        setCurrentTrack(track);
        setStartTime(0);

        // уведомляем проект
        onSelectMusic({ ...track, startTime: 0 });

        setTimeout(() => {
            audioRef.current.play().catch(() => {});
            setIsPlaying(true);
        }, 100);
    };

    // --- длительность трека ---
    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(Math.floor(audioRef.current.duration));
        }
    };

    // --- ползунок ---
    const handleSliderChange = (_, value) => {
        setStartTime(value);
        if (audioRef.current) {
            audioRef.current.currentTime = value;
        }

        if (currentTrack && music?.id === currentTrack.id) {
            onSelectMusic({ ...music, startTime: value });
        }
    };

    // --- play/pause ---
    const togglePlay = () => {
        if (!audioRef.current) return;
        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        fetchTracks();
    }, []);

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
                🎵 Music Library
            </Typography>

            {/* поиск */}
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search tracks..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && searchTracks()}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button variant="contained" onClick={searchTracks}>
                    Search
                </Button>
            </Box>

            {/* выбранный трек */}
            {currentTrack && (
                <Paper
                    elevation={3}
                    sx={{
                        mb: 3,
                        p: 2,
                        borderRadius: 2,
                        background: "linear-gradient(135deg, #673ab7, #3f51b5)",
                        color: "white",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                ▶️ Now Playing: {currentTrack.name}
                            </Typography>
                            <Typography variant="body2">
                                {currentTrack.artist_name}
                            </Typography>
                        </Box>
                        <Chip
                            label="✅ Selected for project"
                            sx={{
                                bgcolor: "white",
                                color: "#3f51b5",
                                fontWeight: 600,
                            }}
                        />
                    </Box>

                    <audio
                        ref={audioRef}
                        src={currentTrack.audio}
                        style={{ display: "none" }}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={() => setIsPlaying(false)}
                    />

                    <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
                        <IconButton
                            onClick={togglePlay}
                            sx={{
                                bgcolor: "white",
                                color: "#3f51b5",
                                "&:hover": { bgcolor: "#eee" },
                            }}
                        >
                            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                        </IconButton>

                        {duration > 0 && (
                            <Box sx={{ mt: 2, width: "100%" }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ fontWeight: 600, mb: 1, color: "white" }}
                                >
                                    🎚 Start Position
                                </Typography>
                                <Slider
                                    value={startTime}
                                    min={0}
                                    max={duration}
                                    step={1}
                                    onChange={handleSliderChange}
                                    sx={{
                                        color: "success.main",
                                        "& .MuiSlider-thumb": {
                                            bgcolor: "white",
                                            border: "2px solid green",
                                        },
                                    }}
                                />
                                <Typography
                                    variant="caption"
                                    sx={{
                                        mt: 1,
                                        display: "block",
                                        color: "rgba(255,255,255,0.8)",
                                    }}
                                >
                                    Start at {startTime}s / {duration}s
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Paper>
            )}

            {/* список треков */}
            <List>
                {tracks
                    .filter((track) => !currentTrack || track.id !== currentTrack.id)
                    .map((track, index) => (
                        <React.Fragment key={track.id}>
                            <ListItem button onClick={() => playTrack(track)}>
                                <ListItemAvatar>
                                    <Avatar src={track.album_image}>
                                        <PlayArrowIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={track.name}
                                    secondary={track.artist_name}
                                />
                            </ListItem>
                            {index < tracks.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
            </List>
        </Box>
    );
}
