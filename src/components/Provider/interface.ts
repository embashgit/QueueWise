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

  interface IQueueUsersResponse {
    users: User[];    // Assuming 'User' is already defined elsewhere
    eventType: string;
  }

  export interface AuthContextProps {
    user: User | null;
    joinedQueues:Queue[];
    queues: Queue[] | [];
    fetchQueues:()=> void;
    callNextWaiter:(userId:string,queueId:string)=>Promise<any>;
    fetchQueueUsers:(id:string)=>Promise<IQueueUsersResponse>;
    leaveQueue:(id:string)=>void;
    joinQueue:(id:string)=>void;
    createQueue:(payload:QueueCreate)=>void;
    removeQueue:(id:string)=>void;
    isAuthenticated: boolean;
    signup: (email: string, password: string, name:string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
  }
  export interface BreadcrumbContextType {
    breadcrumb: string[];
    addBreadcrumb: (route: string) => void;
}

export interface IError {
  response :{
    data: {
      message:string;
    }
  }
}
