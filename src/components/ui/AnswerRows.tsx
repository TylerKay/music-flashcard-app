import { Button } from "@/components/ui/button";
import { useCardStore } from "../../stores/CardStore";
import { useStopwatchStore } from "@/stores/useStopwatchStore";
import { usePageStore } from "../../stores/usePageStore";
import React, { useState } from "react";
import { insertMusicNote } from "../../utils/createMusicNote";

export function AnswerRows() {
  const {
    answer,
    incrementCurrCardIndex,
    cardArray,
    currCardIndex,
    incorrect_attempts,
    resetIncorrectAttempts,
    incrementIncorrectAttempts,
    attemptId,
  } = useCardStore();
  
  const { time, startStopwatch, stopStopwatch, resetStopwatch } = useStopwatchStore();
  const { incrementPageState } = usePageStore();
  const { setCorrect } = useCardStore();
  
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [disabledButtons, setDisabledButtons] = useState(new Set());

  const disableButton = (button: string) => {
    setDisabledButtons((prev) => new Set(prev).add(button));
  };

  const resetDisabledButtons = () => {
    setDisabledButtons(new Set());
  };

  const checkAnswer = async (inputAnswer: string) => {
    if (loading) return;
    setLoading(true);
    
    if (inputAnswer === answer) {
      resetStopwatch();
      
      // Call insertMusicNote and handle its promise separately
      const insertPromise = insertMusicNote(cardArray, currCardIndex, time, incorrect_attempts, attemptId)
        .then(() => {
          setCorrect(true);
          resetDisabledButtons();

          // Clear feedback after 2 seconds
          setTimeout(() => {
            setCorrect(false);
          }, 500);
        })
        .catch((error) => {
          console.error("Error inserting music note:", error);
          setFeedback("An error occurred while saving. Please try again.");
        });
    
      // Continue with the flow without waiting for insertMusicNote to resolve
      if (currCardIndex === cardArray.length - 1) {
        stopStopwatch();
        incrementPageState();
      } else {
        incrementCurrCardIndex();
        startStopwatch();
        resetIncorrectAttempts();
      }
    
      // You can also handle any UI updates after the promise resolves, if needed
      insertPromise.then(() => {
        // Any additional UI updates after successful insertion can go here
      });
    } else {
      incrementIncorrectAttempts();
      disableButton(inputAnswer);
    }

    setLoading(false);
  };

  return (
    <>
      {feedback && <p>{feedback}</p>}
      <div className="grid grid-cols-3 gap-10 mr-6 mt-5">
        {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(letter => (
          <Button
            key={letter}
            onClick={() => checkAnswer(letter)}
            className="m-5 w-full h-12 rounded-full "
            disabled={disabledButtons.has(letter)} 
            aria-label={`Select answer ${letter}`}
          >
            {letter}
          </Button>
        ))}
      </div>
    </>
  );
}
