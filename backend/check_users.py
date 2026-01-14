from config.supabase import supabase

try:
    users = supabase.table('users').select('*').execute()
    print('Users in database:')
    for user in users.data:
        print(f'  Email: {user.get("email")}, Name: {user.get("name")}, Role: {user.get("role")}')
    
    print('\n\nAuth users:')
    # Try to list auth users (may not have permission)
    try:
        auth_users = supabase.auth.admin.list_users()
        for auth_user in auth_users:
            print(f'  Email: {auth_user.email}, ID: {auth_user.id}')
    except:
        print('  Cannot list auth users - permission denied')
        
except Exception as e:
    print(f'Error: {e}')
