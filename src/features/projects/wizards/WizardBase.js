import React, { useState } from "react";
import {
    Container,
    Typography,
    Box,
    Button,
    LinearProgress,
    IconButton,
} from "@mui/material";
import {ArrowBack, ArrowBackIos, ArrowForwardIos} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function WizardBase({ title, description, steps, onFinish }) {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

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
            {/* Кнопка назад к категориям */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <IconButton onClick={() => navigate(-1)}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: 600, ml: 1 }}>
                    Back
                </Typography>
            </Box>

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
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
                {currentStep.title}
            </Typography>

            {/* Контент шага */}
            <Box>{currentStep.render(formData, setFormData)}</Box>

            {/* Кнопки (шаг назад/вперёд) */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 3,
                }}
            >
                <Button
                    variant='text'
                    color="secondary"
                    size="large"
                    sx={{ borderRadius: 2, px: 4, m: 2 }}
                    disabled={step === 0}
                    onClick={handleBack}
                >
                    <ArrowBackIos/> Back
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ borderRadius: 2, px: 5, m: 2 }}
                    disabled={currentStep.validate && !currentStep.validate(formData)}
                    onClick={handleNext}
                >
                    {step < stepsTotal - 1 ? <>Next<ArrowForwardIos/></> : "Finish"}
                </Button>
            </Box>
        </Container>
    );
}
