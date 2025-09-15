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
            <Card sx={{ borderRadius: 3, mb: 4 }}>
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
                                borderRadius: 3,
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
            <Card sx={{ borderRadius: 3, mb: 4 }}>
                <CardContent sx={{ pb: 0 }}>
                    {completedVideos.map((v, idx) => (
                        <Box
                            key={v.id}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                p: 2,
                                borderBottom:
                                    idx !== completedVideos.length - 1
                                        ? "1px solid rgba(0,0,0,0.5)"
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
                            <Button size="small" variant="outlined" sx={{ borderRadius: 2 }}>
                                Play
                            </Button>
                        </Box>
                    ))}
                </CardContent>
            </Card>
        </Container>
    );
}