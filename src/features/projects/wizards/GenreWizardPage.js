import React from "react";
import WizardPage from "./WizardPage";
import {
    Box,
    Card,
    CardActionArea,
    Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const renderOptions = (options, key) => (formData, setFormData) => (
    <Box
        sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: 2,
        }}
    >
        {options.map((opt) => (
            <Card
                key={typeof opt === "string" ? opt : opt.value}
                sx={{
                    borderRadius: 3,
                    height: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor:
                        formData[key] === (typeof opt === "string" ? opt : opt.value)
                            ? "primary.main"
                            : "rgba(255,255,255,0.05)",
                    color:
                        formData[key] === (typeof opt === "string" ? opt : opt.value)
                            ? "white"
                            : "text.primary",
                    cursor: "pointer",
                }}
            >
                <CardActionArea
                    onClick={() =>
                        setFormData({
                            ...formData,
                            [key]: typeof opt === "string" ? opt : opt.value,
                        })
                    }
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {typeof opt === "string" ? opt : opt.label}
                    </Typography>
                    {typeof opt !== "string" && (
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                        >
                            {opt.desc}
                        </Typography>
                    )}
                </CardActionArea>
            </Card>
        ))}
    </Box>
);

export default function GenreWizardPage() {
    const steps = [
        {
            title: "Choose a Genre",
            render: renderOptions(
                ["Travel", "Vlog", "Music", "Dance", "Education"],
                "genre"
            ),
            validate: (data) => !!data.genre,
        },
        {
            title: "Choose a Mood",
            render: renderOptions(
                ["Fun", "Chill", "Romantic", "Adventure"],
                "mood"
            ),
            validate: (data) => !!data.mood,
        },
        {
            title: "Who is in the Video?",
            render: renderOptions(["Solo", "Friends", "Group"], "participants"),
            validate: (data) => !!data.participants,
        },
        {
            title: "Where is the Location?",
            render: renderOptions(["City", "Nature", "Home", "Studio"], "location"),
            validate: (data) => !!data.location,
        },
        {
            title: "Choose a Style",
            render: renderOptions(
                ["Cinematic", "Casual", "Experimental", "Documentary"],
                "style"
            ),
            validate: (data) => !!data.style,
        },
        {
            title: "Music Mood",
            render: renderOptions(
                ["Energetic", "Calm", "Romantic", "Epic"],
                "music"
            ),
            validate: (data) => !!data.music,
        },
        {
            title: "Duration",
            render: renderOptions(
                [
                    { label: "5 sec", value: "5s", desc: "Ultra quick" },
                    { label: "10 sec", value: "10s", desc: "Quick shot" },
                    { label: "20 sec", value: "20s", desc: "Short clip" },
                    { label: "30 sec", value: "30s", desc: "Extended clip" },
                    { label: "45 sec", value: "45s", desc: "Almost a story" },
                    { label: "1 min", value: "1m", desc: "Mini story" },
                    { label: "90 sec", value: "90s", desc: "Deep dive short" },
                    { label: "2 min", value: "2m", desc: "Max project" },
                ],
                "duration"
            ),
            validate: (data) => !!data.duration,
        },
        {
            title: "Choose a Project Date (optional)",
            render: (formData, setFormData) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Project Date"
                        value={formData.date || null}
                        onChange={(newValue) =>
                            setFormData({ ...formData, date: newValue })
                        }
                        slotProps={{ textField: { fullWidth: true } }}
                    />
                </LocalizationProvider>
            ),
            validate: () => true, // дата не обязательна
        },
    ];

    const handleFinish = (data) => {
        alert("Genre Project:\n" + JSON.stringify(data, null, 2));
    };

    return (
        <WizardPage
            title="Create Project from Genre"
            description="Answer a few quick questions to let AI prepare scene placeholders."
            steps={steps}
            onFinish={handleFinish}
        />
    );
}
