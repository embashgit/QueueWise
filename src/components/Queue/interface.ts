// src/interfaces/Queue.ts
export interface Queue {
    id: string;
    eventType: string;
    description: string;
    userCount: number;
    queueLength: number;
    estimatedWaitTime: number; // in minutes
    createdAt: string;
    updatedAt: string;
  }
  


export interface UserCardProps {
  name: string;
  registrationDate: string;
  avatarUrl: string;
}


export interface User {
  position: number;
  name: string;
  id:string;
  email: string;
  joinTime: string;
  avatarUrl: string;
}