import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Link href={"/"}>Home</Link>
      <Link href={"/todos"}>Todos</Link>
      <Link href={"/photos"}>Photos</Link>
      <Link href={"/print"}>Print</Link>
    </header>
  );
}
