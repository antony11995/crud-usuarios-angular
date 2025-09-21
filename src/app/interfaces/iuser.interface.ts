export interface IUser {
  _id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;  
  image: string;
}
export interface IResponse {
  results: IUser[];
}
