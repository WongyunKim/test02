"use client";

import { useState } from "react";
import { Priority } from "../types/todo";

interface TodoInputProps {
  onAdd: (text: string, priority: Priority) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim(), priority);
    setText("");
    setPriority("medium");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="새 할 일을 입력하세요..."
          className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-900"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          추가
        </button>
      </div>
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
    </form>
  );
}
