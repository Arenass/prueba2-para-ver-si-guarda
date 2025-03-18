import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = 'https://fviwpverixgheapwghwt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2aXdwdmVyaXhnaGVhcHdnaHd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwMDQwNDksImV4cCI6MjA1NjU4MDA0OX0.njvzU0WggqaLyQ1LiKpOXGIAR6ZCmkHhlxRvZvEB9Ps';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
