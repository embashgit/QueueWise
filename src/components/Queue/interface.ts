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
  