export interface AuthContext {
  body: {
    email: string;
    password: string;
  };
  request: Request;
  headers: Headers;
  context: {
    returned: {
      status: string;
      statusCode: number;
    };
  };
}
