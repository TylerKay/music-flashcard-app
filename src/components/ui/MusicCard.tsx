import { BellRing, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import MusicNotation from './MusicNotation';
import music_notes from "./music_notes.json";
import React from "react"

type CardProps = React.ComponentProps<typeof Card> & {
  noteString: string; // Accept 'note' prop in the component
}

type MusicNotesKeys = keyof typeof music_notes;

export function MusicCard({ className, noteString, ...props }: CardProps) {
  const note = music_notes[noteString as MusicNotesKeys]; // Assert noteString as one of the keys
  return (
    <>
      <Card className={cn("w-[380px]", className)} {...props}>
        <CardHeader>
          <CardTitle>Music Identification</CardTitle>
          <CardDescription>What note is this?</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
        <div className="flex justify-center items-center space-x-4 rounded-md border p-4">
            <MusicNotation note={note} />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Check className="mr-2 h-4 w-4" />
            Add answer buttons here
          </Button>
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