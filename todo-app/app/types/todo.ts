export type Priority = "low" | "medium" | "high";

export interface Schedule {
  id: string;
  title: string;
  date: string;   // "YYYY-MM-DD"
  time: string;   // "HH:MM"
  completed: boolean;
  priority: Priority;
}
