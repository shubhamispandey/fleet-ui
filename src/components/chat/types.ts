export interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: "self" | "user";
  avatar?: string;
  status?: "sent" | "delivered" | "read";
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isOnline: boolean;
}
