import { UserType } from "../users/users.types";

export interface Conversation {
  _id: string;
  participants: UserType[];
  type: "private" | "group";
  name?: string;
  groupAdmin?: string;
  createdAt: string;
  updatedAt: string;
  lastMessageContent?: string;
  lastMessageTimestamp?: string;
  unreadCount?: number;
}

export interface AllConversationState {
  loading: boolean;
  data: {
    conversations: Conversation[];
    page?: number;
    limit?: number;
    totalCount?: number;
  };
  error: string | null;
}

// ...existing code...

export interface CreateConversationPayload {
  type: "private" | "group";
  participantId?: string;
  participantIds?: string[];
  name: string;
}

export interface GetConversationsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface SelectedConversationState {
  loading: boolean;
  data: Conversation | null;
  error: string | null;
}

export interface ConversationsState {
  allConversations: AllConversationState;
  selectedConversation: SelectedConversationState;
}

export interface Message {
  _id: string;
  conversationId: string;
  senderId: UserType;
  content: string;
  timestamp: string;
  readBy?: string[];
}
