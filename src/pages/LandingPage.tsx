"use client";
import { Button } from "@/components/ui/button"
import { useCardStore } from "../stores/CardStore";
import { usePageStore } from "../stores/usePageStore";
import { createAttempt } from "../utils/createNewAttempt";


export default function LandingPage() {
    const { setAttemptId } = useCardStore();
    const { setPageState } = usePageStore();

    const handleAttemptCreation = async () => {
        const attemptId = await createAttempt();
        setAttemptId(attemptId);
        setPageState(1);
    }



    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-center">Welcome to the Music Identification Game</h1>
            <p className="mb-6 text-center">Get through all the cards as quickly as possible</p>
            <Button
                onClick={handleAttemptCreation}
                className="px-8 py-3 text-lg font-semibold bg-blue-700 hover:bg-blue-800 rounded-lg shadow-md transition duration-300"
            >
                Click to Begin
            </Button>
        </div>
    )
}