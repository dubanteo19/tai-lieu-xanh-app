export interface RegisterReponse {
  messgae: string;
  email: string;
  id: number;
}
export interface LoginResponse {
  accessToken: string;
}
export interface AuthUser {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string;
}
