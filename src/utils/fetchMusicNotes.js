import { supabase } from '../lib/supabase';

export const fetchMusicNotes = async () => {
    // const { data: tableData, error } = await supabase
    const { error } = await supabase
      .from('music_notes')
      .select('*');

    if (error) console.error(error);
    // console.log("tableData: ", tableData);
};

export const fetchStatsGivenAttemptId = async (id) => {
  const { data: attemptStats, error } = await supabase
    .from('music_notes')
    .select('note, time, incorrect_attempts')
    .match({ attempt_id: id })
    .order('time', { ascending: false });

  if (error) console.error(error);

  const formattedData = formatStatistics(attemptStats);
  return formattedData;
};

const formatStatistics = (data) => {
  const formattedData = data.map((item) => {
    const seconds = convertMilisecondsToSeconds(item.time);
    return {
      ...item,
      seconds: seconds
    };
  });

  return formattedData;
}

const convertMilisecondsToSeconds = (miliseconds) => {
  const seconds = miliseconds / 1000;
  return seconds;
}
