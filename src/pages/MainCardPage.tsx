"use client";
import { MusicCard } from "../components/ui/MusicCard"
import { AnswerRows } from "../components/ui/AnswerRows"
import { useCardStore } from "../stores/CardStore";
import { useStopwatchStore } from "@/stores/useStopwatchStore";
import music_notes from "../data/music_notes.json";
import { useEffect } from "react";
import { fetchMusicNotes } from "../utils/fetchMusicNotes";
import { getRandomizedNoteNames } from "@/utils/CardsUtil";
import React from "react";

export default function MainCardPage() {
  // const musicCardsArr = ["C2", "C3", "C4", "C5"];
  const { answer, setAnswer, cardArray, setCardArray, setCurrCardIndex, currCardIndex } = useCardStore();
  type MusicNotesKeys = keyof typeof music_notes; // Create a type for valid keys
  let allCards = [];
  const { time, startStopwatch } = useStopwatchStore();
  
  // const grabAllCards = () => {
  //   Object.entries(music_notes).map(([noteName]) => (
  //     allCards.push(noteName)
  //   ))
  // }


  useEffect(() => {
    // Test all cards
    // grabAllCards();
    // setCardArray(allCards);
    // setCurrCardIndex(0);

    // Grab the data and initialize the cards
    fetchMusicNotes();
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
      // console.log("currentMusicCard: ", currentMusicCard);

      // Check if currentMusicCard exists in music_notes
      if (music_notes[currentMusicCard as MusicNotesKeys]) {
        setAnswer(music_notes[currentMusicCard as MusicNotesKeys].answer);
        // console.log("answer: ", answer);
      } else {
        console.error(`No entry found in music_notes for key: ${currentMusicCard}`);
      }
    }
  }, [currCardIndex, cardArray]);



  return (
    <>
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
