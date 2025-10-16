export type ICSFile = {
  content: string;
  id: string;
  filename: string;
  contentType: string;
  contentDisposition: string;
  headers: Record<string, string>;
};

export type ICSType = "INVITE" | "UPDATE" | "CANCEL";