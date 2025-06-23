-- FIX for Column Mismatch Error
-- The database has user_id column but our code expects id

-- Option 1: Remove user_id column and use id as primary key (RECOMMENDED)
ALTER TABLE profiles DROP COLUMN IF EXISTS user_id;

-- Option 2: Alternative - if you want to keep user_id, run this instead:
-- ALTER TABLE profiles ALTER COLUMN user_id DROP NOT NULL;
-- ALTER TABLE profiles ADD CONSTRAINT profiles_id_key UNIQUE (id);

-- Verify the fix
SELECT column_name, is_nullable, data_type 
FROM information_schema.columns 
WHERE table_name = 'profiles' 
ORDER BY ordinal_position;

SELECT 'Schema fix applied!' as status;
