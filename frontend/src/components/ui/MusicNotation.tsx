import { useEffect, useRef } from 'react';
import { Renderer, Stave, StaveNote, Voice, Formatter } from 'vexflow';

interface NoteProps {
    clef: string;
    keys: string[];
    duration: string;
    stem_direction: number;
    mp3_name: string;
}

interface MusicNotationProps {
    note: NoteProps;
}

const MusicNotation: React.FC<MusicNotationProps> = ({ note }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        if (containerRef.current) {
            // Clear the previous content
            containerRef.current.innerHTML = '';

            // Create a new renderer
            const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
            renderer.resize(100, 200);
            const context = renderer.getContext();

            // Create a stave at position 10, 40 of width 150 on the canvas
            const stave = new Stave(10, 40, 100);
            stave.addClef(note.clef);
            stave.setContext(context).draw();

            // Create a single note
            const notes = [
                new StaveNote({
                    clef: note.clef,
                    keys: note.keys,
                    duration: note.duration,
                    stem_direction: note.stem_direction
                })
            ];

            // Create a voice and add the note
            const voice = new Voice({ num_beats: 1, beat_value: 4 });
            voice.addTickables(notes);
            new Formatter().joinVoices([voice]).format([voice], 150);

            // Render the voice
            voice.draw(context, stave);
        }
    }, [note]); // Dependency on note to re-render when it changes

    return <div ref={containerRef}></div>;
};

export default MusicNotation;
