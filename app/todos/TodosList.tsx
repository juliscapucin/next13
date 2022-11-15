import React from 'react'
import { Todo } from "../../typings";
import Link from "next/link";

const fetchToDos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/");
  const toDos: Todo[] = await res.json();
  
  return toDos;
};

async function TodosList() {
  const todos = await fetchToDos();
  
  return (
    <>
      <h1>Hello</h1>
      {todos.map((item) => 
        <p key={item.id}>
          {item.title}
          <Link href={"/todos/{item.id}"}>Todo: {item.id}</Link>
        </p>
      )}
    </>
  );
}

export default TodosList;
