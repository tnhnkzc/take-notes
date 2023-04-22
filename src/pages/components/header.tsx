import { signIn, signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const { data: user } = useSession();
  console.log(user);

  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <h1>Take Notes</h1>
      </div>
      <div className="flex items-center justify-center gap-4">
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
