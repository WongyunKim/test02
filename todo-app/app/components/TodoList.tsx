"use client";

import { Todo, FilterType } from "../types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, filter, onToggle, onDelete }: TodoListProps) {
  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-gray-400 dark:text-gray-600">
        {filter === "completed" ? "완료된 항목이 없습니다." : "할 일이 없습니다. 새 항목을 추가해보세요!"}
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {filtered.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
