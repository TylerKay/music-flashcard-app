import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import MusicNotation from './MusicNotation';
import music_notes from "../../data/music_notes.json";
import React from "react"
import { AnswerRows } from "./AnswerRows";

import { useCardStore } from "@/stores/CardStore";


type CardProps = React.ComponentProps<typeof Card> & {
  noteString: string; // Accept 'note' prop in the component
}

type MusicNotesKeys = keyof typeof music_notes;

export function MusicCard({ className, noteString, ...props }: CardProps) {
  const { correct } = useCardStore();

  const note = music_notes[noteString as MusicNotesKeys]; // Assert noteString as one of the keys
  return (
    <>
      <Card className={cn("w-[380px]", className)} {...props}>
        <CardHeader>
        <CardTitle>Music Identification</CardTitle>
          {/* Horizontal align the CardDescription with the p tag */}
          <div className="flex justify-between w-full">
            <CardDescription>What note is this?</CardDescription>
            <p className="text-green-500 mr-10 font-bold">{correct ? "Correct!" : ""}</p>
          </div>
          
        </CardHeader>
        <CardContent className="grid gap-4">
        <div className="flex justify-center items-center space-x-4 rounded-md border p-4">
            <MusicNotation note={note} />
          </div>
        </CardContent>
        <CardFooter>
          {/* <Button className="w-full">
            <Check className="mr-2 h-4 w-4" />
            Add answer buttons here
          </Button> */}

          <AnswerRows />
          
        </CardFooter>
      </Card>
    
    </>
    

    
  )
}



// <div>
//         <h1>Music Notation Example</h1>
//         {Object.entries(music_notes).map(([noteName, note]) => (
//           <div key={noteName}>
//             <h2>{noteName}</h2> {/* Render the note name (C2, C3, etc.) */}
//             <MusicNotation note={note} />
//           </div>
//         ))}
//       </div>