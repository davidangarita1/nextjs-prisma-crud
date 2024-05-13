import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <nav className="ng-slate-900">
      <div className="container mx-auto flex justify-between items-center py-3">
        <Link href="/">
          <h3 className="font-bold text-3xl">NextCRUD</h3>
        </Link>
        <ul className="flex gap-x-2 text-lg font-bold">
          <li>
            <Link href="/new" className="text-slate-300 hover:text-slate-200">
              Nueva tarea
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-slate-300 hover:text-slate-200">
              Acerca de
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
