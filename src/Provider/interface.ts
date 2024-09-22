import { Queue } from "@/components/Queue/interface";

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }

  export interface AuthContextProps {
    user: User | null;
    queues: Queue[] | [];
    fetchQueues:()=> void;
    isAuthenticated: boolean;
    signup: (email: string, password: string, name:string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
  }
  