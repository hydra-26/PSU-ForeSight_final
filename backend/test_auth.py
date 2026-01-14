from config.supabase import supabase

try:
    print("Testing login with admin@psu.edu.ph / admin123")
    auth_response = supabase.auth.sign_in_with_password({
        "email": "admin@psu.edu.ph",
        "password": "admin123"
    })
    
    print(f"Auth Response: {auth_response}")
    print(f"User: {auth_response.user}")
    
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
