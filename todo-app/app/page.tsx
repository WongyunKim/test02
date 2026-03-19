"use client";

import { useState } from "react";
import { Todo, FilterType, Priority } from "./types/todo";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

const FILTER_LABELS: { value: FilterType; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "active", label: "진행 중" },
  { value: "completed", label: "완료" },
];

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  const addTodo = (text: string, priority: Priority) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      priority,
      createdAt: new Date(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <div className="mx-auto max-w-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            할 일 관리
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            오늘의 할 일을 정리하세요
          </p>
        </div>

        {/* Main card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800">
          {/* Input */}
          <TodoInput onAdd={addTodo} />

          {/* Divider */}
          <div className="my-5 border-t border-gray-100 dark:border-gray-700" />

          {/* Filter tabs */}
          <div className="mb-4 flex gap-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-700">
            {FILTER_LABELS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors ${
                  filter === value
                    ? "bg-white text-gray-800 shadow-sm dark:bg-gray-600 dark:text-white"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Todo list */}
          <TodoList
            todos={todos}
            filter={filter}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />

          {/* Footer stats */}
          {todos.length > 0 && (
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700">
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {activeCount}개 남음
              </span>
              {completedCount > 0 && (
                <button
                  onClick={clearCompleted}
                  className="text-xs text-gray-400 transition-colors hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                >
                  완료 항목 삭제 ({completedCount})
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
