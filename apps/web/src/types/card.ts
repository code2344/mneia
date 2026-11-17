export type Card = {
  id: string;
  deck_id: string;
  front: string;
  back: string;
  position: number;
  created_at: string;
  updated_at: string;
  scheduling: {
    due_at: string;
    stability: number;
    difficulty: number;
    state: number;
    reps: number;
    lapses: number;
    last_reviewed_at: string | null;
  } | null;
};