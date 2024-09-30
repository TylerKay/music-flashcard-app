import music_notes from "../data/music_notes.json";

export function getRandomizedNoteNames(notes: typeof music_notes) {
    // Get all the note names (keys) from the JSON object
    const noteNames = Object.keys(notes);

    // Shuffle the note names array
    for (let i = noteNames.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [noteNames[i], noteNames[j]] = [noteNames[j], noteNames[i]];
    }

    return noteNames;
}