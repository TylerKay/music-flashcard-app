"use client";
import { MusicCard } from "./MusicCard"
import { AnswerRows } from "./AnswerRows"
import { useCardStore } from "./CardStore";
import { useStopwatchStore } from "@/components/ui/useStopwatchStore";
// import { useEffect } from "react"
import music_notes from "./music_notes.json";
import { useEffect } from "react";
import { supabase } from '../../lib/supabase';
import React from "react";

export default function MainCardPage() {
  const musicCardsArr = ["C2", "C3", "C4", "C5"];
  const { answer, setAnswer, incrementCurrCardIndex, cardArray, setCardArray, setCurrCardIndex, currCardIndex } = useCardStore();
  type MusicNotesKeys = keyof typeof music_notes; // Create a type for valid keys
  var allCards = [];
  const { time, startStopwatch, stopStopwatch, resetStopwatch, isRunning } = useStopwatchStore();
  
  const grabAllCards = () => {
    Object.entries(music_notes).map(([noteName, note]) => (
      allCards.push(noteName)
    ))
  }

    function getRandomizedNoteNames(notes: typeof music_notes) {
        // Get all the note names (keys) from the JSON object
        const noteNames = Object.keys(notes);

        // Shuffle the note names array
        for (let i = noteNames.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [noteNames[i], noteNames[j]] = [noteNames[j], noteNames[i]];
        }

        return noteNames;
    }



  

  useEffect(() => {
    // Test all cards
    // grabAllCards();
    // setCardArray(allCards);
    // setCurrCardIndex(0);
    
    // test supabase
    const fetchData = async () => {
      const { data: tableData, error } = await supabase
        .from('music_notes')
        .select('*');

      if (error) console.error(error);
      console.log("tableData: ", tableData);
    };

    // Grab the data and initialize the cards
    fetchData();
    allCards = getRandomizedNoteNames(music_notes);

    // Set initial state
    setCardArray(allCards);
    setCurrCardIndex(0);

    // Start timer
    startStopwatch();

    


  }, []);

  useEffect(() => {
    // Ensure cardArray is defined and has the currentMusicCard
    if (cardArray && cardArray[currCardIndex]) {
      const currentMusicCard = cardArray[currCardIndex];
      console.log("currentMusicCard: ", currentMusicCard);

      // Check if currentMusicCard exists in music_notes
      if (music_notes[currentMusicCard as MusicNotesKeys]) {
        setAnswer(music_notes[currentMusicCard as MusicNotesKeys].answer);
        console.log("answer: ", answer);
      } else {
        console.error(`No entry found in music_notes for key: ${currentMusicCard}`);
      }
    }
  }, [currCardIndex, cardArray]);



  return (
    <>
      {/* {<p>currCardIndex: {currCardIndex}</p>}
      {cardArray[currCardIndex]} */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        {cardArray && answer ? (
          <>
            <h1>Time: {new Date(time).toISOString().substr(11, 8)}</h1>
            <MusicCard noteString={cardArray[currCardIndex]} />
            <AnswerRows />
          </>
        ) : (
          <>Loading...</>
        )}
      </div>
    </>
  );
}
