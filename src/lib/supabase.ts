import { createClient } from '@supabase/supabase-js';

// Substitua pelas suas credenciais do Supabase (Settings > API)
const supabaseUrl = 'https://fyumjaxxyohhewymkhmf.supabase.co';
const supabaseAnonKey = 'sb_secret_77D_otr25BQ8SZGE12UP-w_tmGVkuRb';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
