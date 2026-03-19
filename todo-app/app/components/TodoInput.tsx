"use client";

import { useState } from "react";
import { Priority } from "../types/todo";

interface ScheduleInputProps {
  selectedDate: string;
  onAdd: (title: string, date: string, time: string, priority: Priority) => void;
}

export default function ScheduleInput({ selectedDate, onAdd }: ScheduleInputProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(selectedDate);
  const [time, setTime] = useState("09:00");
  const [priority, setPriority] = useState<Priority>("medium");

  // 선택된 날짜가 바뀌면 date도 동기화
  if (date !== selectedDate && title === "") {
    setDate(selectedDate);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), date, time, priority);
    setTitle("");
    setPriority("medium");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {/* Title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="일정 제목을 입력하세요..."
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-900"
      />

      {/* Date & Time */}
      <div className="flex gap-2">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-500"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-32 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-500"
        />
      </div>

      {/* Priority & Submit */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {(["low", "medium", "high"] as Priority[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                priority === p
                  ? p === "high"
                    ? "bg-red-500 text-white"
                    : p === "medium"
                    ? "bg-yellow-500 text-white"
                    : "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
              }`}
            >
              {p === "high" ? "높음" : p === "medium" ? "보통" : "낮음"}
            </button>
          ))}
        </div>
        <button
          type="submit"
          disabled={!title.trim()}
          className="rounded-lg bg-blue-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          추가
        </button>
      </div>
    </form>
  );
}
