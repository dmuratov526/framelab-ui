import React, { useState } from "react";
import {
    Box,
    Container,
    TextField,
    Typography,
    Button,
    Card,
    CardContent,
    Stack,
    Link,
    Divider,
} from "@mui/material";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = () => {
        console.log("Signup:", { name, username, email, password });
        // здесь можно дернуть API регистрации
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 3 }}>
            <Card
                sx={(theme) => ({
                    borderRadius: 2,
                    p: 1,
                    background:
                        theme.palette.mode === "dark"
                            ? "linear-gradient(135deg, rgba(25,25,35,0.95), rgba(15,15,25,0.98))"
                            : "linear-gradient(135deg, #ffffff, #f8f9fc)",
                    boxShadow:
                        theme.palette.mode === "dark"
                            ? "0 4px 16px rgba(0,0,0,0.5)"
                            : "0 4px 12px rgba(0,0,0,0.1)",
                })}
            >
                <CardContent>
                    <Stack spacing={3}>
                        {/* Заголовок */}
                        <Box textAlign="center">
                            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                Create Account
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 1 }}
                            >
                                Join us and start your journey 🚀
                            </Typography>
                        </Box>

                        {/* Поля */}
                        <TextField
                            label="Name"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
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

                        {/* Кнопка */}
                        <Button
                            variant="contained"
                            size="large"
                            sx={{ borderRadius: 2, textTransform: "none" }}
                            onClick={handleSignup}
                        >
                            Sign Up
                        </Button>

                        <Divider />

                        {/* Логин */}
                        <Box textAlign="center">
                            <Typography variant="body2" color="text.secondary">
                                Already have an account?{" "}
                                <Link href="/login" underline="hover">
                                    Log In
                                </Link>
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        </Container>
    );
}
