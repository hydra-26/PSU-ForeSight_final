from config.supabase import supabase

users = supabase.table('users').select('*').execute()
print('User passwords:')
for user in users.data:
    print(f'Email: {user.get("email")}, Password: {user.get("password")}')
