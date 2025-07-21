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
  typing?: Record<string, boolean>;
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

interface MessageSender {
  _id: string;
  name: string;
  avatar: string;
}

export interface MessageType {
  _id: string;
  conversationId: string;
  senderId: MessageSender;
  content: string;
  type: "text" | "image" | "file" | "video" | "audio";
  readBy: string[]; // Array of user IDs
  replyTo: string | null; // Message ID being replied to

  // Edit tracking
  edited: boolean;
  editedBy: string | null; // User ID
  editedAt: string | null; // ISO string
  editable: boolean;

  // Delete tracking
  deletedBy: null | {
    _id: string;
    name: string;
    avatar: string;
  }; // User ID
  deletedAt: string | null; // ISO string
  deletable: boolean;

  // Pinned status
  isPinned: boolean;

  // Optional reply preview (if using replySnapshot)
  replySnapshot?: {
    content: string;
    senderName: string;
    type: "text" | "image" | "file" | "video" | "audio";
  };

  // System timestamps
  createdAt: string;
  updatedAt: string;
  __v?: number;
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

export interface SelectedMessageState {
  message: null | MessageType;
  type: null | "edit" | "delete";
}

export interface ConversationsState {
  allConversations: AllConversationState;
  selectedConversation: SelectedConversationState;
  messages: MessagesState;
  selectedMessage: SelectedMessageState;
}

export interface GetMessagesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export type HandleGetMessages = (params?: GetMessagesParams) => void;
