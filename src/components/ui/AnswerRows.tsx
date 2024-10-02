"use client";

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
  
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackClass, setFeedbackClass] = useState("");
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
      try {
        await insertMusicNote(cardArray, currCardIndex, time, incorrect_attempts, attemptId);
        setFeedback("Correct!");
        setFeedbackClass(""); 
        resetDisabledButtons();

        if (currCardIndex === cardArray.length - 1) {
          stopStopwatch();
          incrementPageState();
        } else {
          incrementCurrCardIndex();
          startStopwatch();
          resetIncorrectAttempts();
        }
      } catch (error) {
        console.error("Error inserting music note:", error);
        setFeedback("An error occurred while saving. Please try again.");
      }
    } else {
      incrementIncorrectAttempts();
      setFeedback("Incorrect. Try again.");
      setFeedbackClass("incorrect");
      disableButton(inputAnswer);
    }

    setLoading(false);
  };

  return (
    <>
      {feedback && <div className={`feedback-message ${feedbackClass}`}>{feedback}</div>}
      <div className="grid grid-cols-3 gap-4">
        {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(letter => (
          <Button
            key={letter}
            onClick={() => checkAnswer(letter)}
            className="m-5"
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
