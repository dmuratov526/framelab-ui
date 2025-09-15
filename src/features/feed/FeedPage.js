import {
    Box,
    Typography,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Container,
    Divider,
} from "@mui/material";
import { Masonry } from "@mui/lab";
import { Favorite, Share, ChatBubbleOutline } from "@mui/icons-material";

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

    return (
        <Container maxWidth="md" sx={{ mt: 1, p:0 }}>
            {/* Заголовок */}
            <Typography variant="h5" sx={{ mb: 2 }}>
                Explore & Feed
            </Typography>

            {/* Masonry grid */}
            <Masonry columns={2} spacing={2} sx={{ mb: 3 }}>
                {Array.from({ length: 8 }).map((_, idx) => (
                    <Box
                        key={idx}
                        sx={{
                            borderRadius: 3,
                            height: 120 + (idx % 3) * 40, // разная высота
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 600,
                            fontSize: "0.95rem",
                            color: "white",
                            background: [
                                "linear-gradient(135deg, #4A148C, #7E57C2)",   // глубокий фиолетовый
                                "linear-gradient(135deg, #1565C0, #42A5F5)",   // синий
                                "linear-gradient(135deg, #00695C, #26A69A)",   // бирюза
                                "linear-gradient(135deg, #AD1457, #EC407A)",   // малиново-коралловый
                                "linear-gradient(135deg, #EF6C00, #FFB74D)",   // янтарный
                                "linear-gradient(135deg, #283593, #5C6BC0)",   // тёмно-синий с лавандой
                            ][idx % 6],
                            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                            transition: "transform 0.2s ease, box-shadow 0.2s ease",
                            "&:hover": {
                                transform: "scale(1.02)",
                                boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
                            },
                        }}
                    >
                        Inspiration {idx + 1}
                    </Box>
                ))}
            </Masonry>

            <Divider sx={{ mb: 3 }}>Latest Posts</Divider>

            {/* Лента постов */}
            {posts.map((post) => (
                <Card
                    key={post.id}
                    sx={{
                        mb: 3,
                        borderRadius: 3,
                        overflow: "hidden",
                        bgcolor: "background.paper",
                    }}
                >
                    <CardHeader
                        avatar={<Avatar src={post.avatar} />}
                        title={<Typography sx={{ fontWeight: 600 }}>{post.author}</Typography>}
                        subheader={post.date}
                    />
                    <Box
                        component="img"
                        src={post.image}
                        alt={post.text}
                        sx={{ width: "100%", height: 240, objectFit: "cover" }}
                    />
                    <CardContent>
                        <Typography variant="body2">{post.text}</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton><Favorite /></IconButton>
                        <IconButton><ChatBubbleOutline /></IconButton>
                        <IconButton><Share /></IconButton>
                    </CardActions>
                </Card>
            ))}
        </Container>
    );
}