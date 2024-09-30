import { supabase } from '../lib/supabase';

export const insertMusicNote = async (cardArray, currCardIndex, time, incorrect_attempts, attemptId) => {
    // Insert correct answer into supabase
    const { error } = await supabase
    .from('music_notes')
    .insert([
        { note : cardArray[currCardIndex], time: time, incorrect_attempts: incorrect_attempts, attempt_id: attemptId }
    ]);

    if (error) console.error(error);
}    
