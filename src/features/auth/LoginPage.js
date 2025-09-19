import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./authThunks";
import {
    Container,
    TextField,
    Button,
    Typography,
    Stack,
    CircularProgress,
} from "@mui/material";

export default function LoginPage() {
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated, user } = useSelector(
        (state) => state.auth
    );

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        dispatch(loginUser({ email, password }));
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 6 }}>
            <Stack spacing={2}>
                <Typography variant="h5" fontWeight={600}>
                    Log In
                </Typography>

                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && (
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                )}

                <Button
                    variant="contained"
                    onClick={handleLogin}
                    disabled={loading}
                    sx={{ borderRadius: 2, textTransform: "none" }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Log In"}
                </Button>

                {isAuthenticated && (
                    <Typography color="success.main">
                        ✅ Welcome back, {user?.name || user?.email}!
                    </Typography>
                )}
            </Stack>
        </Container>
    );
}
