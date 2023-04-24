import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

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
        <h1>Take Notes</h1>
      </div>
      <div className="flex items-center gap-4">
        {currentTheme === "dark" ? (
          <button
            className="bg-black-700 w-28 rounded-full border-2 border-purple-400 p-4 hover:bg-black"
            onClick={() => setTheme("light")}
          >
            dark
          </button>
        ) : (
          <button
            className="w-28 rounded-md border-2 border-purple-400 bg-gray-100 p-4 hover:bg-gray-300"
            onClick={() => setTheme("dark")}
          >
            light
          </button>
        )}
        <p className="text-center text-xl text-white">
          {user && <span> {user.user?.name}</span>}
        </p>
        <img
          className="w-14 rounded-full"
          src={user && user.user?.image}
          alt={user && user.user?.name}
        />
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={user ? () => void signOut() : () => void signIn()}
        >
          {user ? "Sign out" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

export default Header;
