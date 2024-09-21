import { createClient } from "@supabase/supabase-js";

const key = import.meta.env.VITE_SUPABASE_KEY

if (!key || key === "") {
    console.error('Нету ключа от Supabase')
    throw new Error("NO SUPABASE KEY: no supabase key was provided")
}

const supabase = createClient("https://mllifwgowjoivrxplnbq.supabase.co", key);

export { supabase }