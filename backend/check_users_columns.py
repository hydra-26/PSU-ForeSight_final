from config.supabase import supabase

users = supabase.table('users').select('*').execute()
print('User records:')
for user in users.data:
    print(f'Email: {user.get("email")}, Name: {user.get("name")}, Role: {user.get("role")}')
    print(f'All columns: {list(user.keys())}')
    print('---')
