import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://fiiwxofocddfgwpisvgu.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpaXd4b2ZvY2RkZmd3cGlzdmd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxMjk0MTIsImV4cCI6MjA0NDcwNTQxMn0.z43UYoRUoXduLr6Trn0Cw-_lB2jIwcVrI7acKe1519o"

//const supabaseUrl = process.env.REACT_APP_SUPAABSE_URL
//const supabaseKey = process.env.REACT_APP_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase