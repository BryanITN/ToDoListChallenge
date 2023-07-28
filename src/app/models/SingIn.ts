export interface SingInRequest {
  Password: string;
  UserName: string;
}



export interface SingInResponse {
  Token: string;
  UserId: number;
}
