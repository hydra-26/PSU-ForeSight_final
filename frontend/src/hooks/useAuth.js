import { useState } from "react";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const loginUser = async (email, password) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setLoading(false);
        return { error: errorData.error || "Invalid email or password" };
      }

      const userData = await response.json();
      
      // Store user data in localStorage - include role to avoid race condition
      if (userData.user && userData.user.email) {
        localStorage.setItem('user', JSON.stringify({
          email: userData.user.email,
          id: userData.user.id,
          name: userData.user.name,
          role: userData.user.role
        }));
        console.log('User stored in localStorage:', userData.user.email, 'Role:', userData.user.role);
      }
      
      setLoading(false);
      return { user: userData.user, success: true };
    } catch (err) {
      setLoading(false);
      return { error: err.message || "Login failed" };
    }
  };

  const logoutUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return { loginUser, logoutUser, loading };
};
