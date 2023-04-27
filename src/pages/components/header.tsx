import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import Link from "next/link";

const Header: React.FC = () => {
  const { data: user } = useSession();

  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme;
  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <Link href="/">
          <h1>Take Notes</h1>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-4">
        {currentTheme === "dark" ? (
          <button
            className="dark:bg-black-700 rounded-full border-2 p-4 text-center transition delay-150 duration-100 ease-in dark:border-orange-300 dark:hover:bg-orange-300"
            onClick={() => setTheme("light")}
          >
            <Sun />
          </button>
        ) : (
          <button
            className=" rounded-full border-2 border-orange-300 bg-white p-4 text-center transition delay-150 duration-100 ease-in hover:bg-orange-300"
            onClick={() => setTheme("dark")}
          >
            <Moon />
          </button>
        )}
        <p className="text-center text-sm text-black dark:text-white md:text-xl">
          {user && <span> {user.user?.name}</span>}
        </p>
        <img
          className="w-10 rounded-full md:w-14"
          // @ts-ignore
          src={user && user?.user?.image}
          // @ts-ignore
          alt={user && user?.user?.name}
        />
        <button
          className="rounded-full border-2 border-orange-300 bg-white px-2 py-2 text-xs font-semibold text-black no-underline transition delay-150 duration-100 ease-in hover:bg-orange-300 dark:border-orange-300 dark:bg-black dark:text-white dark:hover:bg-orange-300 md:px-10 md:py-3 md:text-lg"
          onClick={user ? () => void signOut() : () => void signIn()}
        >
          {user ? "Sign out" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

export default Header;
