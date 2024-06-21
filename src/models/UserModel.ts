export interface User {
  id: number;
  username: string;
  password: string;
  phone_no: string;
  profilePic: string | undefined; // URL to the profile picture
  role: string; // e.g., 'admin', 'user', etc.
}
