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
