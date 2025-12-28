
export type Role = 'ai' | 'user';

export interface ChatMessage {
  id: string;
  role: Role;
  text: string;
}

export interface AdData {
  productName: string;
  condition: string;
  tags: string[];
}

export enum AppStep {
  PRODUCT_NAME = 1,
  CONDITION = 2,
  HIGHLIGHTS = 3,
  GENERATING = 4
}
