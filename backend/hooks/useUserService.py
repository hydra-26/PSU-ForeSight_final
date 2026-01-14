"""
User service for handling user profile operations
"""
from config.supabase import supabase

class UserService:
    @staticmethod
    def get_user_by_email(email: str):
        """
        Fetch user profile from 'users' table by email
        Returns: user data with name, email, role
        """
        try:
            response = supabase.table("users").select("name, email, role").eq("email", email).execute()
            
            if not response.data or len(response.data) == 0:
                return {"error": "User not found", "data": None}
            
            user = response.data[0]
            return {
                "error": None,
                "data": {
                    "name": user.get("name", "User"),
                    "email": user.get("email", ""),
                    "role": user.get("role", "User")
                }
            }
        
        except Exception as e:
            return {"error": str(e), "data": None}
    
    @staticmethod
    def get_all_users():
        """
        Fetch all users from database
        """
        try:
            response = supabase.table("users").select("name, email, role").execute()
            return {"error": None, "data": response.data}
        except Exception as e:
            return {"error": str(e), "data": None}
