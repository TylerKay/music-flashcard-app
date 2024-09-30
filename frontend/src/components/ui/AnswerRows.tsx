import { BellRing, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useCardStore } from "./CardStore"
import { useEffect } from "react";


export function AnswerRows() {
  const { answer, setAnswer, incrementCurrCardIndex, cardArray, setCardArray, setCurrCardIndex, currCardIndex } = useCardStore();

  // useEffect(() => {
  //   console.log(answer)
    
  // }, [answer]);

  const checkAnswer = (inputAnswer: string) => {
    // setAnswer(answer)

    if (inputAnswer === answer) {
      console.log("correct");
      incrementCurrCardIndex();
      console.log("new card index: ", currCardIndex);
    }
    else {
      console.log("incorrect. You inputted:", inputAnswer);
    }
  }



  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <Button onClick={() => checkAnswer("A")} className="m-5">A</Button> {/* Add m-2 for margin */}
        <Button onClick={() => checkAnswer("B")} className="m-5">B</Button>
        <Button onClick={() => checkAnswer("C")} className="m-5">C</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Button onClick={() => checkAnswer("D")} className="m-5">D</Button>
        <Button onClick={() => checkAnswer("E")} className="m-5">E</Button>
        <Button onClick={() => checkAnswer("F")} className="m-5">F</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Button onClick={() => checkAnswer("G")} className="m-5">G</Button>
      </div>

    </>
  )
}
