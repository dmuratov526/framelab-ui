import React, { useState } from "react";
import {
    Card,
    Typography,
    Slider,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { motion } from "framer-motion";

export default function DurationCard({ type, duration, onRegenerate }) {
    const [pending, setPending] = useState(parseInt(duration));
    const [open, setOpen] = useState(false);

    const handleChange = (_, value) => setPending(value);

    const handleCommit = () => {
        if (pending !== parseInt(duration)) setOpen(true);
    };

    return (
        <Card sx={{ borderRadius: 2, mb: 3, textAlign: "center", py: 1, px: 1, background: "linear-gradient(135deg, rgba(103,58,183,0.1), rgba(33,150,243,0.08))", }}>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                🎬 Total Duration
            </Typography>

            <motion.div
                key={pending}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        mb: 1,
                        background: "linear-gradient(90deg,#673ab7,#2196f3)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    {pending}s
                </Typography>
            </motion.div>

            {
                type !== "quick" &&
                <Slider
                    value={pending}
                    min={10}
                    max={120}
                    step={5}
                    onChange={handleChange}
                    onChangeCommitted={handleCommit}
                />
            }

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Change duration?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Changing total duration will affect your scenes.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant={'soft'} onClick={() => setOpen(false)}>Cancel</Button>
                    <Button
                        onClick={() => { onRegenerate(pending); setOpen(false); }}
                        variant="contained"
                        color="primary"
                    >
                        Regenerate Scenes
                    </Button>
                </DialogActions>

            </Dialog>
        </Card>
    );
}