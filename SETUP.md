# SocialManu Setup Instructions

## 🚨 Quick Fix for Registration Error

If you're getting "Profile creation blocked by security policy" error:

### Step 1: Open Supabase SQL Editor

1. Go to https://moxigystzunlawdbnmcf.supabase.co
2. Click "SQL Editor" in sidebar
3. Click "New Query"

### Step 2: Run This SQL

```sql
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
```

### Step 3: Test Registration

Try registering again - it should work immediately!

## 📋 Complete Setup Checklist

### ✅ Environment Variables (DONE)

- [x] VITE_SUPABASE_URL configured
- [x] VITE_SUPABASE_ANON_KEY configured

### ✅ Database Tables (DONE)

- [x] profiles table created
- [x] posts table created
- [x] follows table created
- [x] likes table created
- [x] comments table created
- [x] messages table created
- [x] bookmarks table created
- [x] views table created

### ⚠️ RLS Policies (NEEDS FIX)

- [ ] Profile creation policy needs to be fixed
- [ ] Run the SQL from fix-rls.sql

### 🎯 After Fix

- [ ] Test user registration
- [ ] Test user login
- [ ] Test profile creation

## 🔧 Troubleshooting

### Common Errors:

**"Profile creation blocked by security policy"**

- Solution: Run the RLS fix SQL above

**"Username already taken"**

- Solution: Try a different username

**"Database error"**

- Solution: Make sure all tables are created

**"Supabase not configured"**

- Solution: Check .env file has correct values

## 🚀 Next Steps After Registration Works

1. Test login functionality
2. Test profile editing
3. Test post creation
4. Implement additional features

## 📞 Support

If you're still having issues:

1. Check browser console for detailed errors
2. Verify Supabase dashboard shows your project
3. Make sure you ran the database schema SQL
4. Try the RLS fix SQL
