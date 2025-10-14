import { createClient } from '@supabase/supabase-js'

// Recipes BD
const supabaseUrlRecipes = import.meta.env.VITE_SUPABASE_URL
const supabaseKeyRecipes = import.meta.env.VITE_SUPABASE_ANON_KEY

// Clients BD
const supabaseUrlClients = import.meta.env.VITE_SUPABASE_URL_CLIENTS
const supabaseKeyClients = import.meta.env.VITE_SUPABASE_ANON_KEY_CLIENTS

export const supabase = createClient(supabaseUrlRecipes, supabaseKeyRecipes)
export const supabaseClients = createClient(supabaseUrlClients, supabaseKeyClients)