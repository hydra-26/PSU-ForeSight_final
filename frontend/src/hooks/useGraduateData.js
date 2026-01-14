import { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const useGraduateData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/graduates`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const fetchedData = await response.json();

      if (!fetchedData || fetchedData.length === 0) {
        console.warn("Graduate API returned no data");
      } else {
        console.log("Fetched graduate data:", fetchedData);
      }

      setData(fetchedData || []);
    } catch (err) {
      setError(err.message || "Error fetching graduate data");
      console.error("Error fetching graduate data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { 
    data, 
    isLoading, 
    error, 
    refetch: fetchData 
  };
};

export default useGraduateData;
