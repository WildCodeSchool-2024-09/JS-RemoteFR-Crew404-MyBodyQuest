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

export interface Quest {
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
