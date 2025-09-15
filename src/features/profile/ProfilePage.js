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
            <Stack alignItems="center" mt={1} spacing={2}>
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
                    sx={{ borderRadius: 3, textTransform: "none", px: 3 }}
                >
                    Edit Profile
                </Button>
            </Stack>

            {/* Статистика */}
            <Card
                sx={{
                    mt: 3,
                    borderRadius: 2,   // <-- вместо 3
                    bgcolor: "background.paper",
                    boxShadow: "none",
                }}
            >
                <CardContent>
                    <Stack direction="row" justifyContent="space-around" textAlign="center">
                        <Box>
                            <Typography variant="h6">{user.projects}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Projects
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6">{user.followers}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Followers
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6">{user.following}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Following
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>

            {/* Настройки */}
            <Card
                sx={{
                    mt: 3,
                    borderRadius: 2,   // <-- вместо 3
                    bgcolor: "background.paper",
                    boxShadow: "none",
                }}
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