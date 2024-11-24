export interface CozeConfig {
  baseURL: string;
  botId: string;
  userId: string;
}

export interface CozeMessage {
  role: 'user' | 'assistant';
  content: string;
  content_type: 'text';
}

export interface CozeResponse {
  id: string;
  conversation_id: string;
  content: string;
}
