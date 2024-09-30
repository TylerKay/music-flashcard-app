"use client";
import { useEffect, useRef } from 'react';
import { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } from 'vexflow';

const BassClefNotation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create a VexFlow renderer attached to the containerRef
    const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);

    // Configure the rendering context
    const context = renderer.getContext();
    renderer.resize(500, 200);

    // Create a stave of width 400 at position x=10, y=40 for bass clef
    const stave = new Stave(10, 40, 100);
    stave.addClef('bass'); // Add bass clef to the stave

    // Connect the stave to the rendering context and draw it
    stave.setContext(context).draw();

    // Create the notes to display (in bass clef notation)
    const notes = [
      new StaveNote({ clef: 'bass', keys: ['c/3'], duration: 'q' }), // C3 quarter note
      new StaveNote({ clef: 'bass', keys: ['e/3'], duration: 'q' }), // E3 quarter note
      new StaveNote({ clef: 'bass', keys: ['g/3'], duration: 'q' }), // G3 quarter note
      new StaveNote({ clef: 'bass', keys: ['c/4'], duration: 'q' }), // C4 quarter note
    ];

    // Optional: Add accidentals to notes
    notes[1].addModifier(new Accidental('#')); // Sharp on E3

    // Create a voice in 4/4 and add the notes to it
    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(notes);

    // Format and justify the notes to 400 pixels
    new Formatter().joinVoices([voice]).format([voice], 400);

    // Render the voice
    voice.draw(context, stave);
  }, []);

  return <div ref={containerRef}></div>;
};

export default BassClefNotation;
