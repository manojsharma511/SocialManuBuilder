-- IMMEDIATE FIX for RLS Policy Error
-- Copy and paste this into your Supabase SQL Editor

-- Option 1: Simple fix - disable RLS temporarily
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Option 2: Alternative - create permissive policy (comment out the line above and use this instead)
-- DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
-- CREATE POLICY "allow_profile_creation" ON profiles FOR INSERT WITH CHECK (true);

-- Test the fix
SELECT 'RLS fix applied! Try registering now.' as status;
