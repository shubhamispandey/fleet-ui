export interface UserType {
  _id: string;
  name: string;
  avatar: string;
  email: string;
  status: "online" | "offline" | "away";
  isVerified: boolean;
  createdAt: string;
  __v: number;
}


export interface UsersType {
  loading: boolean;
  data: UserType[];
  error: string | null;
}

export interface UserResponseType {
  data: UserType[];
  error: string | null;
  message: string;
}
export interface UsersState {
  user: {
    loading: boolean;
    data: UserType | null;
    error: string | null;
  };
}
