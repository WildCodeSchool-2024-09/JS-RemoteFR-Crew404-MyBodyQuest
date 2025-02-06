// to make the file a module and avoid the TypeScript error
export type {};

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: number;
        firstname: string;
        lastname: string;
        avatar: string | null;
        email: string;
        password: string;
        birthday_date?: Date | string;
        size: number;
        objective: string;
        initial_weight: number;
        desired_weight: number;
        weight_frequency: string;
        current_xp: number;
        level_id: number;
      };
    }
  }
}
