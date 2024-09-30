import { supabase } from '../lib/supabase';

export const createAttempt = async () => {
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
    // setAttemptId(insertedId);
    // console.log("Attempt id: ", insertedId);

    // // Move to MainCardPage
    // setPageState(1);
    

    return insertedId;
};