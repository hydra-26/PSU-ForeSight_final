"""
Authentication hook for handling user login/logout
Equivalent to frontend useAuth.js
"""
from config.supabase import supabase

class AuthService:
    @staticmethod
    def login_user(email: str, password: str):
        """
        Sign in user with email and password
        Returns user data if successful, error otherwise
        """
        try:
            # Query users table by email
            user_records = supabase.table("users").select("*").eq("email", email).execute()
            
            if not user_records.data or len(user_records.data) == 0:
                return {"error": "Invalid email or password"}
            
            user_record = user_records.data[0]
            
            # Validate password
            stored_password = user_record.get("password")
            if not stored_password or stored_password != password:
                return {"error": "Invalid email or password"}
            
            # Password is correct, return user data
            return {"user": {
                "id": user_record.get("user_id"),
                "email": user_record.get("email"),
                "name": user_record.get("name"),
                "role": user_record.get("role")
            }, "success": True}
        
        except Exception as e:
            return {"error": str(e)}
    
    @staticmethod
    def logout_user():
        """
        Sign out user
        """
        try:
            return {"success": True, "message": "User logged out successfully"}
        except Exception as e:
            return {"error": str(e)}
