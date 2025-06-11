export interface UserType {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  isVerified: boolean;
  status: "online" | "offline" | "away";
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

