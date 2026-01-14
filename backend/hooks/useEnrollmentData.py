"""
Enrollment data hook for fetching enrollment data from Supabase
Equivalent to frontend useEnrollmentData.js
"""
from config.supabase import supabase

class EnrollmentService:
    @staticmethod
    def get_enrollment_data():
        """
        Fetch enrollment data from Supabase 'enrolled' table
        Returns data sorted by Year
        """
        try:
            response = supabase.table("enrolled").select("*").order("Year").execute()
            
            if response.data:
                return {
                    "data": response.data,
                    "isLoading": False,
                    "error": None
                }
            else:
                return {
                    "data": [],
                    "isLoading": False,
                    "error": None
                }
        
        except Exception as e:
            return {
                "data": [],
                "isLoading": False,
                "error": str(e)
            }
    
    @staticmethod
    def get_enrollment_by_year(year: int):
        """
        Fetch enrollment data for a specific year
        """
        try:
            response = supabase.table("enrolled").select("*").eq("Year", year).execute()
            return {"data": response.data, "error": None}
        except Exception as e:
            return {"data": [], "error": str(e)}
    
    @staticmethod
    def insert_enrollment_data(enrollment_data: dict):
        """
        Insert new enrollment record into database
        """
        try:
            response = supabase.table("enrolled").insert(enrollment_data).execute()
            return {"success": True, "data": response.data}
        except Exception as e:
            return {"success": False, "error": str(e)}
