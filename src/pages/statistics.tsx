"use client";
import { MusicCardStats } from "@/components/ui/StatComponents/MusicCardStats";
import { useState, useEffect } from "react";
import { fetchStatsGivenAttemptId } from "../utils/fetchMusicNotes";
import { fetchAttempts } from "../utils/fetchAttempts";

import React from "react";
import { AttemptMenu } from "@/components/ui/StatComponents/AttemptMenu";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface StatsProps {
  note: string;
  time: number;
  seconds: number;
  incorrect_attempts: number;
}

export default function Statistics() {
  const [attemptIds, setAttemptIds] = useState<number[]>([]); // selectedAttemptId
  const [selectedAttemptId, setSelectedAttemptId] = useState<number>(0); // selectedAttemptId
  const [stats, setStats] = useState<StatsProps[]>([]);

  useEffect(() => {
    fetchAttempts().then((attemptIdsArr: number[]) => {
      console.log("Attempt data: ", attemptIdsArr);
      setAttemptIds(attemptIdsArr);
      
    })

  }, []);

  useEffect(() => {
    fetchStatsGivenAttemptId(selectedAttemptId).then((statsData) => {
      console.log("Stats data: ", statsData);
      setStats(statsData);
    })
  }, [selectedAttemptId])


  return (
    <>
      {/* <div className="flex flex-col items-center justify-center min-h-screen"> */}
      <div className="bg-gradient-to-r from-yellow-400 to-red-500">
        <AttemptMenu attemptIds={attemptIds} onSelectAttemptId={setSelectedAttemptId} selectedAttemptId={selectedAttemptId} />


        <Table>
          <TableCaption>Statistics for Attempt {selectedAttemptId}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Note</TableHead>
              <TableHead>Time (seconds)</TableHead>
              <TableHead>Incorrect Attempts</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.map((stat) => (
              <TableRow key={stat.note}>
                <TableCell>{stat.note}</TableCell>
                <TableCell>{stat.seconds}</TableCell>
                <TableCell>{stat.incorrect_attempts}</TableCell>
                <TableCell><MusicCardStats noteString={stat.note} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>



      </div>
    </>
  );
}
