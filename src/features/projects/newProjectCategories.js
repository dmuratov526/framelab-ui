import MovieIcon from "@mui/icons-material/Movie";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import BoltIcon from "@mui/icons-material/Bolt";
import PeopleIcon from "@mui/icons-material/People";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

export const newProjectCategories = [
    {
        id: "quick-inspiration",
        title: "Quick Inspiration",
        desc: "One-tap ideas — shoot fast, get instant videos with music.",
        icon: <LightbulbIcon  sx={{ fontSize: 36 }} />,
        blocked: false
    },
    {
        id: "theme",
        title: "Theme",
        desc: "Pick a theme and mood for your video",
        icon: <MovieIcon sx={{ fontSize: 36 }} />,
        blocked: false
    },
    {
        id: "challenge-friend",
        title: "Friend Challenge",
        desc: "Send a custom challenge to your friend.",
        icon: <PeopleIcon sx={{ fontSize: 36 }} />,
        blocked: false
    },
    {
        id: "music",
        title: "Start from Music",
        desc: "Choose a track and AI will suggest scenes by rhythm.",
        icon: <MusicNoteIcon sx={{ fontSize: 36 }} />,
        blocked: true
    },
    {
        id: "custom",
        title: "Start Empty",
        desc: "Blank project. Build scenes and structure manually.",
        icon: <NoteAddIcon sx={{ fontSize: 36 }} />,
        blocked: true
    },
    {
        id: "challenge-system",
        title: "Challenge of the Day",
        desc: "Take on daily/weekly challenge from the app.",
        icon: <BoltIcon sx={{ fontSize: 36 }} />,
        blocked: true
    }
]