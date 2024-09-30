import { Button } from "@/components/ui/button"
import { useCardStore } from "../../stores/CardStore"
import { useStopwatchStore } from "@/stores/useStopwatchStore";
import { usePageStore } from "../../stores/usePageStore";
import React from "react";
import { insertMusicNote } from "../../utils/createMusicNote";

export function AnswerRows() {
  const { answer, incrementCurrCardIndex, cardArray, currCardIndex, incorrect_attempts, resetIncorrectAttempts, incrementIncorrectAttempts, attemptId } = useCardStore();
  const { time, startStopwatch, stopStopwatch, resetStopwatch } = useStopwatchStore();
  const { incrementPageState } = usePageStore();


  const checkAnswer = async (inputAnswer: string) => {
    if (inputAnswer === answer) {
      // console.log("Correct. It took you", time, "seconds");
      resetStopwatch();

      await insertMusicNote(cardArray, currCardIndex, time, incorrect_attempts, attemptId);


      // Last card
      if (currCardIndex === cardArray.length - 1) {
        stopStopwatch();
        // console.log("You have completed the whole set of cards!");
        
        incrementPageState();
        

      } else { // move to next card
        incrementCurrCardIndex();
        startStopwatch()


        // Reset incorrect attempts
        resetIncorrectAttempts();
        
      }

    }
    else {
      incrementIncorrectAttempts();
      // console.log("incorrect. You inputted:", inputAnswer);
    }
  }



  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <Button onClick={async () => await checkAnswer("A")} className="m-5">A</Button> {/* Add m-2 for margin */}
        <Button onClick={async () => await checkAnswer("B")} className="m-5">B</Button>
        <Button onClick={async () => await checkAnswer("C")} className="m-5">C</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Button onClick={async () => await checkAnswer("D")} className="m-5">D</Button>
        <Button onClick={async () => await checkAnswer("E")} className="m-5">E</Button>
        <Button onClick={async () => await checkAnswer("F")} className="m-5">F</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Button onClick={async () => await checkAnswer("G")} className="m-5">G</Button>
      </div>

    </>
  )
}
