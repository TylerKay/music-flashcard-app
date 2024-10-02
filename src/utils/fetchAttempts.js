import { supabase } from '../lib/supabase';

export const fetchAttempts = async () => {
    // const { data: tableData, error } = await supabase
    const { data: tableData, error } = await supabase
      .from('attempts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error(error);
    // console.log("tableData: ", tableData);

    const attemptIds = tableData.map((attempt) => attempt.id);
    return attemptIds;
};