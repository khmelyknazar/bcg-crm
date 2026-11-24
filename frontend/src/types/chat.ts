export interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: number;
  direction: 'IN' | 'OUT';
  text: string;
  createdAt: string;
}
