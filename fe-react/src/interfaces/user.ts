export default interface IUser {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  admin: boolean;
  createdAt?: string;
  updatedAt?: string;
}
