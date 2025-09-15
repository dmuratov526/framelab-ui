import React, { useState } from "react";
import {
    Container,
    Typography,
    Box,
    Button,
    LinearProgress,
} from "@mui/material";

export default function WizardPage({ title, description, steps, onFinish }) {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({});

    const stepsTotal = steps.length;
    const progressValue = ((step + 1) / stepsTotal) * 100;

    const handleNext = () => {
        if (step < stepsTotal - 1) {
            setStep(step + 1);
        } else {
            onFinish(formData);
        }
    };

    const handleBack = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    const currentStep = steps[step];

    return (
        <Container maxWidth="md" sx={{ mt: 2, mb: 4, p: 0 }}>
            {/* Прогресс-бар */}
            <Box sx={{ mb: 3 }}>
                <LinearProgress
                    variant="determinate"
                    value={progressValue}
                    sx={{ height: 8, borderRadius: 5 }}
                    color="primary"
                />
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1, display: "block" }}
                >
                    Step {step + 1} of {stepsTotal}
                </Typography>
            </Box>

            {/* Заголовок */}
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {description}
            </Typography>

            {/* Контент шага */}
            <Box>{currentStep.render(formData, setFormData)}</Box>

            {/* Кнопки */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 3,
                }}
            >
                <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    sx={{ borderRadius: 3, px: 4, m: 2 }}
                    disabled={step === 0}
                    onClick={handleBack}
                >
                    Back
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ borderRadius: 3, px: 5, m: 2 }}
                    disabled={currentStep.validate && !currentStep.validate(formData)}
                    onClick={handleNext}
                >
                    {step < stepsTotal - 1 ? "Next" : "Finish"}
                </Button>
            </Box>
        </Container>
    );
}
