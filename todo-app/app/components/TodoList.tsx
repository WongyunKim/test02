"use client";

import { Schedule } from "../types/todo";
import ScheduleItem from "./TodoItem";

interface ScheduleListProps {
  schedules: Schedule[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ScheduleList({ schedules, onToggle, onDelete }: ScheduleListProps) {
  const sorted = [...schedules].sort((a, b) => a.time.localeCompare(b.time));

  if (sorted.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-gray-400 dark:text-gray-600">
        이 날의 일정이 없습니다. 새 일정을 추가해보세요!
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {sorted.map((schedule) => (
        <ScheduleItem key={schedule.id} schedule={schedule} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
