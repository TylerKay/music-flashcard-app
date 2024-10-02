import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import MusicNotation from "@/components/ui/MusicNotation";
import music_notes from "@/data/music_notes.json";
import React from "react"

type CardProps = React.ComponentProps<typeof Card> & {
  noteString: string; // Accept 'note' prop in the component
}

type MusicNotesKeys = keyof typeof music_notes;

export function MusicCardStats({ className, noteString, ...props }: CardProps) {
  const note = music_notes[noteString as MusicNotesKeys]; // Assert noteString as one of the keys
  return (
    <>
      <Card className={cn("w-[250px]", className)} {...props}>
        <CardContent className="grid gap-4">
        <div className="flex justify-center items-center space-x-4 rounded-md border p-4">
            <MusicNotation note={note} />
          </div>
        </CardContent>

      </Card>
    
    </>
    

    
  )
}
