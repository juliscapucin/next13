import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Link href={"/"}>Back</Link>
      <Link href={"/todos"}>Todos</Link>
      <Link href={"/photos"}>Photos</Link>
    </header>
  );
}
