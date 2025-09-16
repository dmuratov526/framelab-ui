export function generateRandomScene(index, type) {
    const baseDur = 5 + Math.floor(Math.random() * 10);
    let description;

    switch (type) {
        case "music":
            description = "Music-based scene";
            break;
        case "friendChallenge":
            description = "Collaboration scene";
            break;
        case "dailyChallenge":
            description = "Challenge task";
            break;
        default:
            description = "Randomly generated scene";
    }

    return {
        id: `${Date.now()}-${index}`,
        title: `Scene ${index + 1}`,
        duration: baseDur,
        description,
        completed: false
    };
}

export function generateRandomScenes(type) {
    const randomCount = 2 + Math.floor(Math.random() * 4);
    return Array.from({ length: randomCount }, (_, i) =>
        generateRandomScene(i, type)
    );
}