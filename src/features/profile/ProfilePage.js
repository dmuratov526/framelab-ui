import React from "react";
import {
    Box,
    Avatar,
    Typography,
    Button,
    Stack,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider, Container,
} from "@mui/material";
import {
    Settings,
    ExitToApp,
    Notifications,
    Security,
    CreditCard
} from "@mui/icons-material";

export default function ProfilePage() {
    const user = {
        name: "Ethan Carter",
        username: "@ethan",
        bio: "Filmmaker | Traveler | Dreamer ✨",
        avatar: "https://i.pravatar.cc/150?img=12",
        projects: 15,
        followers: 540,
        following: 310,
    };

    return (
        <Container maxWidth={'md'} sx={{ p:0 }}>
            {/* Верхняя часть: аватар + имя */}
            <Stack alignItems="center" mt={2} spacing={2}>
                <Avatar src={user.avatar} sx={{ width: 96, height: 96 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {user.username}
                </Typography>
                <Typography
                    variant="body2"
                    align="center"
                    color="text.secondary"
                    sx={{ maxWidth: 280 }}
                >
                    {user.bio}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ borderRadius: 2, textTransform: "none", px: 3 }}
                >
                    Edit Profile
                </Button>
            </Stack>

            {/* Статистика */}
            <Card
                sx={(theme) => ({
                    mt: 3,
                    borderRadius: 2,
                    background:
                        theme.palette.mode === "dark"
                            ? "linear-gradient(135deg, rgba(30,30,40,0.9), rgba(20,20,30,0.95))"
                            : "linear-gradient(135deg, rgba(250,250,255,1), rgba(240,240,250,1))",
                    boxShadow:
                        theme.palette.mode === "dark"
                            ? "0 2px 10px rgba(0,0,0,0.4)"
                            : "0 2px 6px rgba(0,0,0,0.08)",
                })}
            >
                <CardContent>
                    <Stack
                        direction="row"
                        justifyContent="space-around"
                        textAlign="center"
                    >
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {user.projects}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Projects
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {user.followers}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Followers
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {user.following}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Following
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>


            {/* Настройки */}
            <Card
                sx={(theme) => ({
                    mt: 3,
                    borderRadius: 2,
                    background:
                        theme.palette.mode === "dark"
                            ? "linear-gradient(180deg, rgba(25,25,35,0.95) 0%, rgba(15,15,25,0.98) 100%)"
                            : "linear-gradient(180deg, #ffffff 0%, #f9f9fb 100%)",
                    boxShadow:
                        theme.palette.mode === "dark"
                            ? "0 4px 16px rgba(0,0,0,0.5)"
                            : "0 2px 8px rgba(0,0,0,0.08)",
                })}
            >
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Notifications color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Notifications" />
                        </ListItemButton>
                    </ListItem>

                    <Divider />

                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Security color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Privacy & Security" />
                        </ListItemButton>
                    </ListItem>

                    <Divider />

                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <CreditCard color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Manage Subscription" />
                        </ListItemButton>
                    </ListItem>

                    <Divider />

                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Settings color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="General Settings" />
                        </ListItemButton>
                    </ListItem>

                    <Divider />

                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ExitToApp color="error" />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Card>

        </Container>
    );
}