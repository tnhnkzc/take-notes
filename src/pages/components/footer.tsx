import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Github } from "lucide-react";

const Footer: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [year, setYear] = useState<number>();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    const year = new Date().getFullYear();
    setYear(year);
  });
  if (!mounted) return null;

  const currentTheme = theme;

  return (
    <footer>
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-center p-4 md:absolute md:bottom-0 md:left-0 md:right-0 md:py-8">
        <div>
          <Link href="https://www.github.com/tnhnkzc/take-notes">
            <Github />
          </Link>
        </div>
        <div className="text-black dark:text-white">
          Copyright <span className="text-black dark:text-white">{year}</span>
        </div>
        <div className="text-black dark:text-white">
          Made by Tunahan Kuzucu with ❤️
        </div>
      </div>
    </footer>
  );
};

export default Footer;
