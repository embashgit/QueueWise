import { Queue } from "@/components/Queue/interface";

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }


  export interface QueueCreate {
    eventType:string;
    queueLength:number;
    description:string;
  }

  export interface AuthContextProps {
    user: User | null;
    joinedQueues:Queue[];
    queues: Queue[] | [];
    fetchQueues:()=> void;
    leaveQueue:(id:string)=>void;
    joinQueue:(id:string)=>void;
    createQueue:(payload:QueueCreate)=>void;
    isAuthenticated: boolean;
    signup: (email: string, password: string, name:string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
  }
  