import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY")

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Health check for Supabase connection
def check_supabase_connection():
    try:
        # Simple query to verify connection
        response = supabase.table("enrolled").select("*").limit(1).execute()
        return {"status": "connected", "message": "Supabase connection successful"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
