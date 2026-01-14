// import { useState, useEffect } from 'react';

// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// export const useEnrollmentData = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/enrollment`);
      
//       if (!response.ok) {
//         throw new Error(`API error: ${response.statusText}`);
//       }
      
//       const fetchedData = await response.json();
//       setData(fetchedData || []);
//     } catch (err) {
//       setError(err.message);
//       console.error("Error fetching enrollment data:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();

//   }, []);

//   return { 
//     data, 
//     isLoading, 
//     error, 
//     refetch: fetchData 
//   };
// };

// export default useEnrollmentData;

import { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Try to import supabase, but handle if it doesn't exist
let supabase = null;
try {
  const supabaseModule = require('../config/supabase');
  supabase = supabaseModule.supabase;
} catch (error) {
  console.warn('⚠️ Supabase not configured. Real-time updates disabled.');
}

export const useEnrollmentData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('📥 Fetching enrollment data from API...');
      const response = await fetch(`${API_BASE_URL}/api/enrollment`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
      
      const fetchedData = await response.json();
      console.log('✅ Data fetched:', fetchedData?.length, 'records');
      setData(fetchedData || []);
    } catch (err) {
      setError(err.message);
      console.error("❌ Error fetching enrollment data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('🚀 Initializing enrollment data hook...');
    
    // Initial data fetch
    fetchData();
    
    // Only set up real-time if supabase is configured
    if (!supabase) {
      console.warn('⚠️ Supabase not available. Real-time updates disabled.');
      return;
    }
    
    // Set up real-time subscription
    console.log('🔌 Setting up Supabase real-time subscription...');
    
    const channel = supabase
      .channel("realtime-enrollments")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "enrolled" },
        (payload) => {
          console.log('🔔 Real-time update received!', payload);
          console.log('Event type:', payload.eventType);
          console.log('New data:', payload.new);
          console.log('Old data:', payload.old);
          
          // Refetch data when changes occur
          console.log('🔄 Refetching data...');
          fetchData();
        }
      )
      .subscribe((status) => {
        console.log('📡 Subscription status:', status);
      });

    // Cleanup subscription on unmount
    return () => {
      console.log('🧹 Cleaning up subscription...');
      supabase.removeChannel(channel);
    };
  }, []);

  return { 
    data, 
    isLoading, 
    error, 
    refetch: fetchData 
  };
};

export default useEnrollmentData;
