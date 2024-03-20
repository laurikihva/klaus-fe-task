type TUserRole = "ADMIN" | "AGENT" | "ACCOUNT_MANAGER" | "EXTERNAL_REVIEWER";

interface IUserResponse {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: TUserRole;
}

interface IUserResponseData {
  users: IUserResponse[];
}

interface IUser extends IUserResponse {
  checked: boolean;
}

export type { TUserRole, IUserResponse, IUserResponseData, IUser };
