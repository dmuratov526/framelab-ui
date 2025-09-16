import React from "react";
import {
    Box,
    Typography,
    FormControlLabel,
    Checkbox,
    Button,
    Paper
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

export default function MusicTab({ music, musicSelected, onToggleMusic }) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Paper
                elevation={2}
                sx={{
                    p: 2,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                <MusicNoteIcon color={musicSelected ? "primary" : "disabled"} />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={musicSelected}
                            onChange={onToggleMusic}
                        />
                    }
                    label={
                        <Typography sx={{ fontWeight: 500 }}>
                            {musicSelected
                                ? music || "Track selected"
                                : "No track selected"}
                        </Typography>
                    }
                />
            </Paper>

            <Button
                variant="contained"
                color="primary"
                disabled={!musicSelected}
            >
                {music ? "Change track" : "Choose track"}
            </Button>
        </Box>
    );
}