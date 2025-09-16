import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Container,
    Grid,
    Chip,
    Avatar,
    LinearProgress,
} from "@mui/material";

export default function LibraryPage() {
    const projects = [
        {
            id: 1,
            title: "Mountain Adventure",
            status: "Draft",
            started: "Mar 1",
            updated: "Mar 5",
            color: "#7E57C2",
        },
        {
            id: 2,
            title: "City Nightlife",
            status: "Completed",
            started: "Feb 20",
            updated: "Mar 2",
            color: "#42A5F5",
        },
        {
            id: 3,
            title: "Beach Vibes",
            status: "Draft",
            started: "Feb 15",
            updated: "Feb 28",
            color: "#26A69A",
        },
    ];

    const completedVideos = [
        { id: 1, title: "City Nightlife", date: "Mar 2", length: "1:20" },
        { id: 2, title: "Winter Festival", date: "Feb 24", length: "0:45" },
        { id: 3, title: "Street Dance", date: "Feb 10", length: "2:05" },
    ];

    const totalProjects = projects.length;
    const drafts = projects.filter((p) => p.status === "Draft").length;
    const completed = completedVideos.length;

    return (
        <Container
            maxWidth="md"
            sx={{ p:0, pb: "calc(72px + env(safe-area-inset-bottom))", mt: 1 }}
        >
            {/* Заголовок */}
            <Typography variant="h5" sx={{ mb: 3 }}>
                My Library
            </Typography>

            {/* Progress Overview */}
            <Card
                sx={(theme) => ({
                    borderRadius: 2,
                    mb: 2,
                    background:
                        theme.palette.mode === "dark"
                            ? "linear-gradient(135deg, #121212 0%, #1e1e2e 50%, #0f0f17 100%)"
                            : "linear-gradient(135deg, #f8f9fb 0%, #eef1f7 50%, #ffffff 100%)",
                    boxShadow:
                        theme.palette.mode === "dark"
                            ? "0 6px 20px rgba(0,0,0,0.65)"
                            : "0 4px 12px rgba(0,0,0,0.12)",
                    color: theme.palette.mode === "dark" ? "#fff" : "inherit",
                })}
            >
                <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        Progress Overview
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                        Completed Videos: {completed}/{totalProjects}
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={(completed / totalProjects) * 100}
                        sx={{ mb: 2, height: 8, borderRadius: 5 }}
                        color="primary"
                    />

                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                        Draft Projects: {drafts}/{totalProjects}
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={(drafts / totalProjects) * 100}
                        sx={{ mb: 2, height: 8, borderRadius: 5 }}
                        color="secondary"
                    />

                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                        Total Library Size: {completedVideos.length + projects.length} items
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={100}
                        sx={{ height: 8, borderRadius: 5 }}
                        color="success"
                    />
                </CardContent>
            </Card>


            {/* Projects */}
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                My Projects
            </Typography>

            <Grid container spacing={2} sx={{ mx: 0 }}>
                {projects.map((p) => (
                    <Grid item xs={12} sm={6} key={p.id} sx={{ px: 0, width: "100%" }}>
                        <Card
                            sx={{
                                borderRadius: 2,
                                overflow: "hidden",
                                background: `linear-gradient(135deg, ${p.color}, #00000040)`,
                                color: "white",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    {p.title}
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                    Started: {p.started} • Last edited: {p.updated}
                                </Typography>
                                <Chip
                                    label={p.status}
                                    size="small"
                                    sx={{
                                        mt: 1,
                                        bgcolor: "rgba(255,255,255,0.2)",
                                        color: "white",
                                    }}
                                />
                            </CardContent>
                            <CardActions sx={{ p: 2, pt: 0 }}>
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="secondary"
                                    sx={{ borderRadius: 2 }}
                                >
                                    Open Project
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>




            {/* Completed Videos */}
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, mt: 2 }}>
                Completed Videos
            </Typography>
            <Card sx={{ borderRadius: 2, mb: 4 }}>
                <CardContent
                    sx={(theme) => ({
                        pb: 0,
                        background:
                            theme.palette.mode === "dark"
                                ? "linear-gradient(180deg, rgba(40,50,70,0.9) 0%, rgba(20,25,35,0.95) 100%)"
                                : "linear-gradient(180deg, rgba(250,250,255,0.95) 0%, rgba(240,240,250,0.98) 100%)",
                    })}
                >
                    {completedVideos.map((v, idx) => (
                        <Box
                            key={v.id}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                p: 1.5,
                                borderBottom:
                                    idx !== completedVideos.length - 1
                                        ? (theme) =>
                                            `1px solid ${
                                                theme.palette.mode === "dark"
                                                    ? "rgba(255,255,255,0.08)"
                                                    : "rgba(0,0,0,0.1)"
                                            }`
                                        : "none",
                            }}
                        >
                            <Avatar
                                variant="rounded"
                                src={`https://picsum.photos/200/120?random=${v.id + 30}`}
                                sx={{ width: 64, height: 40, mr: 2 }}
                            />
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                    {v.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {v.date} • {v.length}
                                </Typography>
                            </Box>
                            <Button
                                size="small"
                                variant="contained"
                                sx={{ borderRadius: 2, textTransform: "none" }}
                            >
                                Play
                            </Button>
                        </Box>
                    ))}
                </CardContent>
            </Card>
        </Container>
    );
}