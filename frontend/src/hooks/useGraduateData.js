// import { useState, useEffect } from 'react';

// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// export const useGraduateData = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`${API_BASE_URL}/api/graduates`);
      
//       if (!response.ok) {
//         throw new Error(`API error: ${response.statusText}`);
//       }

//       const fetchedData = await response.json();

//       if (!fetchedData || fetchedData.length === 0) {
//         console.warn("Graduate API returned no data");
//       } else {
//         console.log("Fetched graduate data:", fetchedData);
//       }

//       setData(fetchedData || []);
//     } catch (err) {
//       setError(err.message || "Error fetching graduate data");
//       console.error("Error fetching graduate data:", err);
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

// export default useGraduateData;

import { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Try to import supabase, but handle if it doesn't exist
let supabase = null;
try {
  const supabaseModule = require('../config/supabase');
  supabase = supabaseModule.supabase;
} catch (error) {
  console.warn('⚠️ Supabase not configured. Real-time updates disabled for graduates.');
}

export const useGraduateData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('📥 Fetching graduate data from API...');
      const response = await fetch(`${API_BASE_URL}/api/graduates`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const fetchedData = await response.json();

      if (!fetchedData || fetchedData.length === 0) {
        console.warn("⚠️ Graduate API returned no data");
      } else {
        console.log("✅ Fetched graduate data:", fetchedData.length, 'records');
      }

      setData(fetchedData || []);
    } catch (err) {
      setError(err.message || "Error fetching graduate data");
      console.error("❌ Error fetching graduate data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('🚀 Initializing graduate data hook...');
    
    // Initial data fetch
    fetchData();
    
    // Only set up real-time if supabase is configured
    if (!supabase) {
      console.warn('⚠️ Supabase not available. Real-time updates disabled for graduates.');
      return;
    }
    
    // Set up real-time subscription for graduates table
    console.log('🔌 Setting up Supabase real-time subscription for graduates...');
    
    const channel = supabase
      .channel("realtime-graduates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "graduate" },
        (payload) => {
          console.log('🔔 Graduate data real-time update received!', payload);
          console.log('Event type:', payload.eventType);
          console.log('New data:', payload.new);
          console.log('Old data:', payload.old);
          
          // Refetch data when changes occur
          console.log('🔄 Refetching graduate data...');
          fetchData();
        }
      )
      .subscribe((status) => {
        console.log('📡 Graduate subscription status:', status);
      });

    // Cleanup subscription on unmount
    return () => {
      console.log('🧹 Cleaning up graduate subscription...');
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

export default useGraduateData;