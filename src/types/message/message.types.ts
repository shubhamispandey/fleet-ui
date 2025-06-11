import { UserType } from "../users/users.types";

export interface Conversation {
  _id: string;
  participants: UserType[];
  type: "private" | "group";
  name?: string;
  groupAdmin?: UserType;
  lastMessage: MessageType | null;
  lastActivityAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
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

interface MessageSender {
  _id: string;
  name: string;
  avatar: string;
}

export interface MessageType {
  type: string;
  _id: string;
  conversationId: string;
  senderId: MessageSender;
  content: string;
  readBy: string[];
  timestamp: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface MessageResponseData {
  messages: MessageType[];
  totalCount: number;
  page: number;
  limit: number;
}

export interface MessagesState {
  loading: boolean;
  data: {
    messages: Record<string, MessageType[]>;
  };
  error: string | null;
}

export interface ConversationsState {
  allConversations: AllConversationState;
  selectedConversation: SelectedConversationState;
  messages: MessagesState;
}

export interface GetMessagesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export type HandleGetMessages = (params?: GetMessagesParams) => void;
