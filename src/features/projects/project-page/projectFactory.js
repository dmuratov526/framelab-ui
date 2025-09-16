
import { v4 as uuidv4 } from "uuid";

export function createProject(type, overrides = {}) {
    const base = {
        id: uuidv4(),
        title: "Untitled Project",
        type,
        progress: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    switch (type) {
        case "theme":
            return {
                ...base,
                title: "My Theme Project",
                duration: "30s",
                scenes: [],
                music: null,
                notes: "",
                ...overrides,
            };

        case "quick":
            return {
                ...base,
                title: "Quick Inspiration",
                preview: null,
                usedIdea: null,
                ...overrides,
            };

        case "friendChallenge":
            return {
                ...base,
                title: "Friend Challenge",
                duration: "15s",
                scenes: [],
                collab: [],
                ...overrides,
            };

        case "music":
            return {
                ...base,
                title: "Music Based Project",
                track: null,
                scenes: [],
                ...overrides,
            };

        case "empty":
            return {
                ...base,
                title: "Empty Project",
                scenes: [],
                notes: "",
                ...overrides,
            };

        case "dailyChallenge":
            return {
                ...base,
                title: "Daily Challenge",
                scenes: [],
                collab: [],
                ...overrides,
            };

        default:
            return { ...base, ...overrides };
    }
}