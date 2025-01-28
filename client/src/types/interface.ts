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
