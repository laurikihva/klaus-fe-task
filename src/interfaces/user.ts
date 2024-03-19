type TUserRole = "ADMIN" | "AGENT" | "ACCOUNT_MANAGER" | "EXTERNAL_REVIEWER";

interface IResponseUser {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: TUserRole;
}

interface IUser extends IResponseUser {
  checked: boolean;
}

export type { TUserRole, IResponseUser, IUser };
