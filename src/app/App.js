import React from "react";
import { Routes, Route } from "react-router-dom";
import {ThemeProvider, CssBaseline, Box} from "@mui/material";
import { useSelector } from "react-redux";
import { selectTheme } from "../features/settings/settingsSlice";
import getTheme from "../styles/theme";

// Layout
import Layout from "../components/Layout";

// Pages
import DashboardPage from "../features/home/DashboardPage";
import LoginPage from "../features/auth/LoginPage";
import ProfilePage from "../features/profile/ProfilePage";
import FeedPage from "../features/feed/FeedPage";
import LibraryPage from "../features/library/LibraryPage";
import NewProjectPage from "../features/projects/NewProjectPage";
import GenreWizardPage from "../features/projects/wizards/GenreWizardPage";
import ChallengeFriendWizardPage from "../features/projects/wizards/ChallengeFriendWizardPage";
import ProjectView from "../features/projects/ProjectView";
import QuickInspirationPage from "../features/projects/wizards/QuickInspirationPage";

export default function App() {
    const themeMode = useSelector(selectTheme);
    const theme = getTheme(themeMode);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/feed" element={<FeedPage />} />
                    <Route path="/library" element={<LibraryPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/projects/new" element={<NewProjectPage />} />
                    <Route path="/projects/new/genre" element={<GenreWizardPage />} />
                    {/* Wizards */}
                    <Route path="/wizard/genre" element={<GenreWizardPage />} />
                    <Route path="/wizard/challenge-friend" element={<ChallengeFriendWizardPage />} />
                    <Route path="/wizard/quick-inspiration" element={<QuickInspirationPage />} />
                    {/*<Route path="/wizard/music" element={<MusicWizardPage />} />*/}
                    {/*<Route path="/wizard/custom" element={<CustomWizardPage />} />*/}
                    {/*<Route path="/wizard/challenge-system" element={<ChallengeSystemWizardPage />} />*/}
                    <Route path="/projects/:projectId" element={<ProjectView />} />
                    <Route path="/projects/:projectId/scenes/:sceneId" element={<Box>Scene Processing</Box>} />
                </Routes>
            </Layout>
        </ThemeProvider>
    );
}