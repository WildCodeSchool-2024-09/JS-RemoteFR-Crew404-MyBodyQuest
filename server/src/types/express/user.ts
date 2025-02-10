export interface User {
  id: number;
  firstname: string;
  lastname: string;
  sexe: string;
  avatar: string;
  email: string;
  password: string;
  birthday_date?: string;
  size: number;
  objective: string;
  initial_weight: number;
  desired_weight: number;
  weight_frequency: string;
  current_xp: number;
  level: number;
}
