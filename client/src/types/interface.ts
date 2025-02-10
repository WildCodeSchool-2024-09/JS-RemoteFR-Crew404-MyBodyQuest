export interface User {
  id: number;
  username: string;
  lastname: string;
  firstname: string;
  email: string;
  birthday: string;
  age: string;
  size: string;
  original_weight: string;
  current_weight: string;
  current_xp: number;
  level: number;
}

export interface Quest {
  is_done: boolean | undefined;
  id: number;
  quest_title: string;
  description: string;
  xp: number;
  category_id: number;
}

export interface Category {
  id: number;
  name: string;
  success_id: number;
}

export interface Success {
  id: number;
  name: string;
  img: string;
}

export interface UserQuest {
  user_id: number;
  quest_id: number;
  is_done: boolean;
}
