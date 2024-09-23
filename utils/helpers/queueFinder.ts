import { Queue } from "@/components/Queue/interface";

export const findQueue = (queue: Queue[], id: string): boolean => {
  return queue?.find((q) => q.id === id) !== undefined;
}
