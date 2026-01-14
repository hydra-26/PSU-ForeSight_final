import { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const useUserProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Get email from localStorage
        const storedUser = localStorage.getItem('user');
        
        if (!storedUser) {
          console.log('No user in localStorage');
          setUser(null);
          setIsLoading(false);
          return;
        }

        const { email } = JSON.parse(storedUser);
        console.log('Fetching profile for email:', email);

        if (!email) {
          console.log('No email found');
          setUser(null);
          setIsLoading(false);
          return;
        }

        // Call backend API
        const response = await fetch(`${API_BASE_URL}/api/user/profile?email=${encodeURIComponent(email)}`);
        
        console.log('API Response:', response.status);

        if (!response.ok) {
          throw new Error(`Failed to fetch user profile: ${response.statusText}`);
        }

        const userData = await response.json();
        console.log('User data:', userData);
        
        setUser(userData);

      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err.message);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Check if user exists in localStorage and fetch
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const { email } = JSON.parse(storedUser);
      // Always fetch when email changes
      fetchUserProfile();
    } else {
      // Clear user when no one is logged in
      setUser(null);
    }
  }, []); // This will run once on mount, but we'll add a custom trigger below

  // Listen for storage changes to re-fetch when user logs in/out
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const { email } = JSON.parse(storedUser);
        // Re-fetch profile for the new user
        const fetchNewProfile = async () => {
          setIsLoading(true);
          try {
            const response = await fetch(`${API_BASE_URL}/api/user/profile?email=${encodeURIComponent(email)}`);
            if (response.ok) {
              const userData = await response.json();
              console.log('Updated user profile:', userData);
              setUser(userData);
            } else {
              setUser(null);
            }
          } catch (err) {
            console.error('Error re-fetching profile:', err);
            setUser(null);
          } finally {
            setIsLoading(false);
          }
        };
        fetchNewProfile();
      } else {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return { 
    user, 
    isLoading, 
    error
  };
};

export default useUserProfile;
