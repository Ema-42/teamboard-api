export interface User {
    id: string;
    email: string;
    role: string | null;
    roles: string[] | null;
    iat: number;
    exp: number;
  }
  