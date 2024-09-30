"use client";
import { MusicCard } from "../components/ui/MusicCard"
import { AnswerRows } from "../components/ui/AnswerRows"
import { useCardStore } from "../components/ui/CardStore";
import { useStopwatchStore } from "@/components/ui/useStopwatchStore";
// import { useEffect } from "react"
import music_notes from "../components/ui/music_notes.json";
import { useEffect } from "react";
import { supabase } from '../lib/supabase';

export default function Home() {
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

    fetchData();
    startStopwatch();



    // Set initial state
    setCardArray(musicCardsArr);
    setCurrCardIndex(0);

    


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
      {<p>currCardIndex: {currCardIndex}</p>}
      {cardArray[currCardIndex]}
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
