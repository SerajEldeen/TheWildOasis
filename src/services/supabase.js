import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://xedeubugsqygryamdtty.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlZGV1YnVnc3F5Z3J5YW1kdHR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwODUzMjUsImV4cCI6MjA0NzY2MTMyNX0.KN02-eQcw8nk7cUmE8cdA1p0mbR1vZd-2fDYttyrjhY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
