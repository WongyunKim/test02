"use client";

import { useState } from "react";
import { Schedule, Priority } from "./types/todo";
import Calendar from "./components/Calendar";
import ScheduleInput from "./components/TodoInput";
import ScheduleList from "./components/TodoList";

function toDateStr(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatDisplayDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

export default function Home() {
  const today = toDateStr(new Date());
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedDate, setSelectedDate] = useState(today);

  const addSchedule = (title: string, date: string, time: string, priority: Priority) => {
    const newSchedule: Schedule = {
      id: crypto.randomUUID(),
      title,
      date,
      time,
      completed: false,
      priority,
    };
    setSchedules((prev) => [newSchedule, ...prev]);
    setSelectedDate(date);
  };

  const toggleSchedule = (id: string) => {
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    );
  };

  const deleteSchedule = (id: string) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
  };

  const scheduleDates = new Set(schedules.map((s) => s.date));
  const selectedSchedules = schedules.filter((s) => s.date === selectedDate);
  const completedCount = selectedSchedules.filter((s) => s.completed).length;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            일정 관리
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            날짜를 선택하여 일정을 관리하세요
          </p>
        </div>

        {/* Calendar */}
        <Calendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          scheduleDates={scheduleDates}
        />

        {/* Selected Day Panel */}
        <div className="mt-4 rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800">
          {/* Day header */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              {formatDisplayDate(selectedDate)}
            </h2>
            {selectedSchedules.length > 0 && (
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {completedCount}/{selectedSchedules.length} 완료
              </span>
            )}
          </div>

          {/* Schedule list */}
          <ScheduleList
            schedules={selectedSchedules}
            onToggle={toggleSchedule}
            onDelete={deleteSchedule}
          />

          {/* Divider */}
          <div className="my-5 border-t border-gray-100 dark:border-gray-700" />

          {/* Input */}
          <ScheduleInput selectedDate={selectedDate} onAdd={addSchedule} />
        </div>
      </div>
    </div>
  );
}
