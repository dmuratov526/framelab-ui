import React from "react";
import WizardPage from "./WizardPage";
import {
    Box,
    Card,
    CardActionArea,
    Typography,
    TextField,
    List,
    ListItem,
    ListItemButton,
    ListItemAvatar,
    Avatar,
    ListItemText,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const renderDurations = (options, key) => (formData, setFormData) => (
    <Box
        sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: 2,
        }}
    >
        {options.map((opt) => (
            <Card
                key={opt.value}
                sx={{
                    borderRadius: 3,
                    height: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor:
                        formData[key] === opt.value
                            ? "primary.main"
                            : "rgba(255,255,255,0.05)",
                    color: formData[key] === opt.value ? "white" : "text.primary",
                    cursor: "pointer",
                }}
            >
                <CardActionArea
                    onClick={() => setFormData({ ...formData, [key]: opt.value })}
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
                        {opt.label}
                    </Typography>
                </CardActionArea>
            </Card>
        ))}
    </Box>
);

export default function ChallengeFriendWizardPage() {
    const friends = [
        { id: 1, name: "Liam Smith", avatar: "https://i.pravatar.cc/150?img=11" },
        { id: 2, name: "Sophia Lee", avatar: "https://i.pravatar.cc/150?img=22" },
        { id: 3, name: "Noah Johnson", avatar: "https://i.pravatar.cc/150?img=33" },
    ];

    const durations = [
        { label: "10 sec", value: "10s" },
        { label: "30 sec", value: "30s" },
        { label: "1 min", value: "1m" },
        { label: "90 sec", value: "90s" },
        { label: "2 min", value: "2m" },
    ];

    const steps = [
        {
            title: "Set a Theme",
            render: (formData, setFormData) => (
                <TextField
                    fullWidth
                    label="Challenge Theme"
                    placeholder="e.g. Show your favorite coffee spot"
                    value={formData.theme || ""}
                    onChange={(e) =>
                        setFormData({ ...formData, theme: e.target.value })
                    }
                />
            ),
            validate: (data) => !!data.theme,
        },
        {
            title: "Pick Duration",
            render: renderDurations(durations, "duration"),
            validate: (data) => !!data.duration,
        },
        {
            title: "Choose Deadline",
            render: (formData, setFormData) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Deadline"
                        value={formData.deadline || null}
                        onChange={(newValue) =>
                            setFormData({ ...formData, deadline: newValue })
                        }
                        slotProps={{ textField: { fullWidth: true } }}
                    />
                </LocalizationProvider>
            ),
            validate: (data) => !!data.deadline,
        },
        {
            title: "Select a Friend",
            render: (formData, setFormData) => (
                <List>
                    {friends.map((f) => (
                        <ListItem disablePadding key={f.id}>
                            <ListItemButton
                                selected={formData.friend?.id === f.id}
                                onClick={() => setFormData({ ...formData, friend: f })}
                            >
                                <ListItemAvatar>
                                    <Avatar src={f.avatar} />
                                </ListItemAvatar>
                                <ListItemText primary={f.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            ),
            validate: (data) => !!data.friend,
        },
        {
            title: "Review Challenge",
            render: (formData) => (
                <Box
                    sx={{ p: 2, borderRadius: 2, bgcolor: "rgba(255,255,255,0.05)" }}
                >
                    <Typography><b>Theme:</b> {formData.theme}</Typography>
                    <Typography><b>Duration:</b> {formData.duration}</Typography>
                    <Typography>
                        <b>Deadline:</b>{" "}
                        {formData.deadline
                            ? dayjs(formData.deadline).format("YYYY-MM-DD")
                            : "No deadline"}
                    </Typography>
                    <Typography>
                        <b>Friend:</b> {formData.friend?.name || "Not selected"}
                    </Typography>
                </Box>
            ),
            validate: () => true,
        },
    ];

    const handleFinish = (data) => {
        alert("Challenge Sent:\n" + JSON.stringify(data, null, 2));
    };

    return (
        <WizardPage
            title="Challenge a Friend"
            description="Create and send a challenge to your friend."
            steps={steps}
            onFinish={handleFinish}
        />
    );
}
