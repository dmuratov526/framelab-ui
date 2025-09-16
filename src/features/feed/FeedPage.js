import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Container,
    Divider,
    Button,
} from "@mui/material";
import { Favorite, Share, ChatBubbleOutline, PlayCircleFilled } from "@mui/icons-material";

export default function FeedPage() {
    const posts = [
        {
            id: 1,
            author: "Ethan Carter",
            avatar: "https://i.pravatar.cc/100?img=12",
            date: "2h ago",
            text: "Captured this amazing sunset while hiking 🌄✨",
            image: "https://picsum.photos/500/300?random=1",
        },
        {
            id: 2,
            author: "Liam Smith",
            avatar: "https://i.pravatar.cc/100?img=32",
            date: "5h ago",
            text: "Trying out new transitions in my edits 🎬🔥",
            image: "https://picsum.photos/500/300?random=2",
        },
    ];

    const challenges = [
        { title: "🌆 City Lights", desc: "Capture your night city view in 10 sec" },
        { title: "☕ Coffee Mood", desc: "Film your morning coffee routine" },
        { title: "💃 Dance Move", desc: "5 sec of your best dance step" },
    ];

    const events = [
        { name: "Live Collab Jam", date: "Tomorrow 7PM", desc: "Join creators worldwide in sync recording." },
        { name: "Weekend Challenge", date: "Sat–Sun", desc: "Post your 15s travel story." },
    ];

    return (
        <Container maxWidth="md" sx={{ mt: 1, p: 0, pb: 3 }}>
            {/* Заголовок */}
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Explore Feed
            </Typography>

            {/* Spotlight video */}
            <Box
                sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    mb: 3,
                    position: "relative",
                    background: "linear-gradient(135deg, rgba(33,33,33,0.8), rgba(55,55,55,0.6))",
                }}
            >
                <Box
                    component="img"
                    src="https://picsum.photos/800/400?random=11"
                    alt="Spotlight"
                    sx={{ width: "100%", height: 220, objectFit: "cover", opacity: 0.85 }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        textAlign: "center",
                        p: 2,
                    }}
                >
                    <PlayCircleFilled sx={{ fontSize: 48, opacity: 0.9, mb: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Creator Spotlight
                    </Typography>
                    <Typography variant="body2" sx={{ maxWidth: 360 }}>
                        Watch today’s featured clip by <b>@Amelia</b> — shot entirely on mobile 📱
                    </Typography>
                </Box>
            </Box>

            {/* Challenges */}
            {/* Challenges */}
            <Card
                sx={(theme) => ({
                    borderRadius: 2,
                    mb: 3,
                    background:
                        theme.palette.mode === "dark"
                            ? "linear-gradient(135deg, #0d1b2a 0%, #1b263b 50%, #0a192f 100%)"
                            : "linear-gradient(135deg, #f8fbff 0%, #eaf1f9 50%, #ffffff 100%)",
                    boxShadow:
                        theme.palette.mode === "dark"
                            ? "0 8px 24px rgba(0,0,0,0.65)"
                            : "0 4px 12px rgba(0,0,0,0.12)",
                    color: theme.palette.mode === "dark" ? "#fff" : "inherit",
                })}
            >
                <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        🚀 Trending Challenges
                    </Typography>
                    {challenges.map((c, i) => (
                        <Box key={i} sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {c.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {c.desc}
                            </Typography>
                        </Box>
                    ))}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                            mt: 1,
                            borderRadius: 2,
                            fontWeight: 600,
                        }}
                    >
                        View All Challenges
                    </Button>
                </CardContent>
            </Card>


            {/* Collab board */}
            {/* Collab board */}
            <Card
                sx={(theme) => ({
                    borderRadius: 2,
                    mb: 3,
                    background:
                        theme.palette.mode === "dark"
                            ? "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)"
                            : "linear-gradient(135deg, #e6f9f6 0%, #d9f1ec 50%, #ffffff 100%)",
                    boxShadow:
                        theme.palette.mode === "dark"
                            ? "0 8px 24px rgba(0,0,0,0.6)"
                            : "0 4px 12px rgba(0,0,0,0.12)",
                    color: theme.palette.mode === "dark" ? "#fff" : "inherit",
                })}
            >
                <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        👥 Collab Board
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Join others working on duet videos and group edits right now.
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <Avatar key={idx} src={`https://i.pravatar.cc/100?img=${20 + idx}`} />
                        ))}
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ alignSelf: "center" }}
                        >
                            +120 more
                        </Typography>
                    </Box>
                </CardContent>
            </Card>


            {/* Latest posts */}
            <Divider sx={{ mb: 2 }}>Latest Posts</Divider>
            {posts.map((post) => (
                <Card
                    key={post.id}
                    sx={(theme) => ({
                        mb: 3,
                        borderRadius: 2,
                        overflow: "hidden",
                        background:
                            theme.palette.mode === "dark"
                                ? "linear-gradient(180deg, rgba(25,25,25,0.95) 0%, rgba(18,18,18,0.98) 100%)"
                                : "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(248,248,248,1) 100%)",
                        boxShadow:
                            theme.palette.mode === "dark"
                                ? "0 6px 20px rgba(0,0,0,0.6)"
                                : "0 4px 12px rgba(0,0,0,0.12)",
                    })}
                >
                    <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
                        <Avatar src={post.avatar} sx={{ mr: 2 }} />
                        <Box>
                            <Typography sx={{ fontWeight: 600 }}>{post.author}</Typography>
                            <Typography variant="caption" color="text.secondary">
                                {post.date}
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        component="img"
                        src={post.image}
                        alt={post.text}
                        sx={{
                            width: "100%",
                            height: 240,
                            objectFit: "cover",
                        }}
                    />

                    <CardContent>
                        <Typography variant="body2">{post.text}</Typography>
                    </CardContent>

                    <CardActions disableSpacing>
                        <IconButton>
                            <Favorite />
                        </IconButton>
                        <IconButton>
                            <ChatBubbleOutline />
                        </IconButton>
                        <IconButton>
                            <Share />
                        </IconButton>
                    </CardActions>
                </Card>

            ))}

            {/* AI Prompt + Events side by side */}
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2, mb: 3 }}>
                {/* AI Prompt */}
                <Box
                    sx={{
                        borderRadius: 2,
                        p: 2,
                        background: "linear-gradient(135deg, rgba(103,58,183,0.1), rgba(33,150,243,0.08))",
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        🤖 AI Prompt Idea
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        “Film 3 shots that show how your day starts — morning light, your face, your first move.”
                    </Typography>
                </Box>

                {/* Events */}
                <Card
                    sx={(theme) => ({
                        borderRadius: 2,
                        background:
                            theme.palette.mode === "dark"
                                ? "linear-gradient(135deg, #1a237e 0%, #283593 50%, #0d47a1 100%)"
                                : "linear-gradient(135deg, #e8f0ff 0%, #f4f7ff 50%, #ffffff 100%)",
                        boxShadow:
                            theme.palette.mode === "dark"
                                ? "0 8px 24px rgba(0,0,0,0.6)"
                                : "0 4px 12px rgba(0,0,0,0.12)",
                        color: theme.palette.mode === "dark" ? "#fff" : "inherit",
                        mb: 3,
                    })}
                >
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            📅 Upcoming Events
                        </Typography>
                        {events.map((e, i) => (
                            <Box key={i} sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                    {e.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {e.date}
                                </Typography>
                                <Typography variant="body2">{e.desc}</Typography>
                            </Box>
                        ))}
                    </CardContent>
                </Card>

            </Box>

            {/* Collections */}
            <Box sx={{ mt: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    🎥 Explore Collections
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        overflowX: "auto",
                        gap: 2,
                        pb: 1,
                        "&::-webkit-scrollbar": { display: "none" },
                    }}
                >
                    {["Travel Stories", "Dance Vibes", "Foodies", "Nature Shots", "City Life"].map((c, idx) => (
                        <Card
                            key={idx}
                            sx={{
                                borderRadius: 2,
                                minWidth: 160,
                                flex: "0 0 auto",
                                overflow: "hidden",
                                position: "relative",
                            }}
                        >
                            <Box
                                component="img"
                                src={`https://picsum.photos/300/200?random=${40 + idx}`}
                                alt={c}
                                sx={{ width: "100%", height: 100, objectFit: "cover" }}
                            />
                            <CardContent sx={{ p: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {c}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Container>
    );
}
