import { supabase } from '../lib/supabase';

export const fetchMusicNotes = async () => {
    // const { data: tableData, error } = await supabase
    const { error } = await supabase
      .from('music_notes')
      .select('*');

    if (error) console.error(error);
    // console.log("tableData: ", tableData);
};