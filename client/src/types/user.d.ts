export interface User {
  id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  username: string;
  email: string;
  phoneNumber?: string;
}
