// src/context/authContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import apiClient from '../../utils/apiClient';
import { useRouter } from 'next/router';
import  { jwtDecode, JwtPayload } from 'jwt-decode';
import { AuthContextProps, QueueCreate, User } from './interface';
import Cookies from 'js-cookie';
import { Queue } from '@/components/Queue/interface';

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [joinedQueues, setJoinedQueues] = useState<Queue[]| []>([]);
  const [queues, setQueues] = useState<Queue[] | []>([]); 
  const router = useRouter();

  useEffect(() => {
    // Check if there's a token in localStorage on mount
    const token = Cookies.get('token');
    if (token) {
      try {
        // Decode the token to get user info and expiration time
        const decodedToken: User & JwtPayload = jwtDecode(token);

        const { id, name, email, role, exp } = decodedToken;

        // Check if the token is expired
        if (exp && Date.now() >= exp * 1000) {
          // Token is expired, log the user out
          logout();
        } else {
          // Set the user details
          setUser({ id, name, email, role });

          // Set a timeout to log the user out when the token expires
          if (exp) {
            const timeout = setTimeout(() => {
              logout();
            }, exp * 1000 - Date.now());

            return () => clearTimeout(timeout); // Clear timeout if the component unmounts or token changes
          }
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
        // If there's an error decoding, remove the token
        localStorage.removeItem('token');
      }
    }
  }, []);


  useEffect(()=>{
    fetchJoinedQueue()
  },[])

  const fetchQueues = async () => {
    try {
      const response = await apiClient.get('/queues');  // Assuming '/queues' is your endpoint
      setQueues(response.data);
     
    } catch (error) {
      console.error('Failed to fetch queues:', error);
    }
  };

  const createQueue = async (payload: QueueCreate) => {
    try {
     await apiClient.post('/queues',payload);  
      await fetchQueues();
     
    } catch (error) {
      console.error('Failed to fetch queues:', error);
    }
  };
  const fetchJoinedQueue = async () => {
    try {
    const res = await apiClient.get('/queues/joined');  
     setJoinedQueues(res.data.allJoinedQueue
     )
    } catch (error) {
      console.error('Failed to fetch queues:', error);
    }
  };

  const joinQueue = async (qId: string) => {
    try {
     await apiClient.post(`/queues/${qId}/join`);
     await fetchQueues();
      await fetchJoinedQueue();
     
    } catch (error) {
      console.error('Failed to fetch queues:', error);
    }
  };

  const leaveQueue = async (qId: string) => {
    try {
     await apiClient.delete(`/queues/${qId}/leave`);  
     await fetchQueues();
     await fetchJoinedQueue();
     
    } catch (error) {
      console.error('Failed to fetch queues:', error);
    }
  };
  
  const signup = async (email: string, password: string, name:string) => {
    try {
      const response = await apiClient.post('/signup', { email, password, name });
      setUser(response.data.user);
      Cookies.set('token', response.data.token, { expires: 1 }); // Set token in cookie
      router.push('/'); // Redirect to dashboard or other protected page
    } catch (error) {
      console.error('Signup error:', error);
      throw error; // Handle the error in the signup form
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/login', { email, password });
      setUser(response.data.user);
      Cookies.set('token', response.data.token, { expires: 1 }); // Set token in cookie
      router.push('/');
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Handle the error in the login form
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('token'); // Remove token from cookie
    router.push('/login');
  };


  return (
    <AuthContext.Provider
      value={{leaveQueue,joinQueue, joinedQueues, user, fetchQueues, createQueue, isAuthenticated: !!user, signup, login, logout, queues }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


