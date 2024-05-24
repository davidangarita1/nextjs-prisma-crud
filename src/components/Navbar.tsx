import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const routes = [
  {
    href: "/dashboard",
    label: "Dashboard",
  },
  {
    href: "/new",
    label: "Nueva tarea",
  },
  {
    href: "/about",
    label: "Acerca de",
  },
];

export const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="ng-slate-900">
      <div className="container mx-auto flex justify-between items-center py-3">
        <Link href="/">
          <h3 className="font-bold text-3xl">NextCRUD</h3>
        </Link>
        <ul className="flex gap-x-2 text-lg font-bold">
          {!session?.user ? (
            <>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/auth/login">Login</Link>
              </li>
              <li>
                <Link href="/auth/register">Register</Link>
              </li>
            </>
          ) : (
            routes.map((route) => (
              <li>
                <Link
                  href={route.href}
                  className="text-slate-300 hover:text-slate-200"
                >
                  {route.label}
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </nav>
  );
};
