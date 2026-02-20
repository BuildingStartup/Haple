
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://mnojffbasafjsyamcbqw.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ub2pmZmJhc2FmanN5YW1jYnF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MDM4OTYsImV4cCI6MjA4NzA3OTg5Nn0.3ZtywNh0XdHGYrCxTBAXgBGHTLjzXP9stkzYYJIc8Tk";
const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase;


