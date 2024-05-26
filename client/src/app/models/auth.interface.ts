
export interface LoginRequestBody {
    email: string;
    password: string;
  }
  
  export interface SignupRequestBody {
    name: string;
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    success: boolean;
    message: string;
    token?: string; // token is optional because it may not be present in error responses
  }
  