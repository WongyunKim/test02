"use client";

import { Schedule } from "../types/todo";

interface ScheduleItemProps {
  schedule: Schedule;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityConfig = {
  high: { label: "높음", className: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" },
  medium: { label: "보통", className: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" },
  low: { label: "낮음", className: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" },
};

export default function ScheduleItem({ schedule, onToggle, onDelete }: ScheduleItemProps) {
  const priority = priorityConfig[schedule.priority];

  return (
    <li className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-3.5 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      {/* Toggle */}
      <button
        onClick={() => onToggle(schedule.id)}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          schedule.completed
            ? "border-blue-500 bg-blue-500"
            : "border-gray-300 hover:border-blue-400 dark:border-gray-600"
        }`}
        aria-label={schedule.completed ? "완료 취소" : "완료 표시"}
      >
        {schedule.completed && (
          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Time */}
      <span className="shrink-0 rounded-md bg-gray-100 px-2 py-0.5 text-xs font-mono font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
        {schedule.time}
      </span>

      {/* Title */}
      <span
        className={`flex-1 text-sm ${
          schedule.completed
            ? "text-gray-400 line-through dark:text-gray-500"
            : "text-gray-700 dark:text-gray-200"
        }`}
      >
        {schedule.title}
      </span>

      {/* Priority */}
      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${priority.className}`}>
        {priority.label}
      </span>

      {/* Delete */}
      <button
        onClick={() => onDelete(schedule.id)}
        className="rounded p-1 text-gray-300 transition-colors hover:bg-red-50 hover:text-red-500 dark:text-gray-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
        aria-label="삭제"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </li>
  );
}
