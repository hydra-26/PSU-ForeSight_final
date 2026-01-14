"""
Graduate data hook for fetching graduation data from Supabase
Equivalent to frontend useGraduateData.js
"""
from config.supabase import supabase

class GraduateService:
    @staticmethod
    def get_graduate_data():
        """
        Fetch graduate data from Supabase 'graduate' table
        Returns data sorted by year in ascending order
        """
        try:
            response = supabase.table("graduate").select("*").order("year", desc=False).execute()
            
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
                    "error": "Graduate table returned no data"
                }
        
        except Exception as e:
            return {
                "data": [],
                "isLoading": False,
                "error": str(e)
            }
    
    @staticmethod
    def get_graduate_by_year(year: int):
        """
        Fetch graduate data for a specific year
        """
        try:
            response = supabase.table("graduate").select("*").eq("year", year).execute()
            return {"data": response.data, "error": None}
        except Exception as e:
            return {"data": [], "error": str(e)}
    
    @staticmethod
    def insert_graduate_data(graduate_data: dict):
        """
        Insert new graduate record into database
        """
        try:
            response = supabase.table("graduate").insert(graduate_data).execute()
            return {"success": True, "data": response.data}
        except Exception as e:
            return {"success": False, "error": str(e)}
