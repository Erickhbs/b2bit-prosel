interface LoginResponse {
  tokens: any;
  access: string;
  refresh?: string;
}

export type {LoginResponse};