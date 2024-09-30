"use client";
import { Button } from "@/components/ui/button"
import { supabase } from '../../lib/supabase';
import { useCardStore } from "./CardStore";
import { usePageStore } from "./usePageStore";


export default function LandingPage() {
    const { attemptId, setAttemptId } = useCardStore();
    const { setPageState, pageState, incrementPageState } = usePageStore();

    const createAttempt = async () => {
        const { data, error } = await supabase
          .from('attempts')
          .insert([
            { }
          ])
          .select(); // Ensure you select the inserted row(s) to return the id
    
        if (error) {
            console.error(error);
            return null; // Return null or handle the error as needed
        }
    
        // Assuming 'id' is the primary key in the 'attempts' table
        const insertedId = data ? data[0].id : null;
        setAttemptId(insertedId);
        console.log("Attempt id: ", insertedId);

        // Move to MainCardPage
        setPageState(1);
        

        return insertedId;
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-center">Welcome to Our Landing Page</h1>
            <Button
                onClick={createAttempt}
                className="px-8 py-3 text-lg font-semibold bg-blue-700 hover:bg-blue-800 rounded-lg shadow-md transition duration-300"
            >
                Click to Begin
            </Button>
        </div>
    )
}