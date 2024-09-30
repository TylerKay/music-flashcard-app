// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Add your Supabase URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Add your anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


// Function to insert a note
export const insertNote = async (note) => {
    const { data, error } = await supabase
      .from('music_notes')
      .insert([
        { note }
      ]);
  
    if (error) {
      console.error('Error inserting note:', error);
      return null;
    }
    return data;
  };