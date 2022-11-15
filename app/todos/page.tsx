import React from "react";
import TodosList from "./TodosList";

export default function Todos() {
  return (
    <div>
      {/* @ts-ignore */}
      <TodosList />
      <h1>Todo List</h1>
    </div>
  );
}
