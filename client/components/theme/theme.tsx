"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  const activeTheme = (type: string) => {
    if (type === theme) {
      return "text-primary bg-card w-[28px] h-[28px] rounded-full p-1 flex items-center justify-center";
    } else {
      return "default w-[28px] h-[28px] p-1";
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className=" flex items-center gap-2">
      <Sun
        className={activeTheme("light")}
        onClick={() => setTheme("light")}
        size={20}
      />
      <Moon
        onClick={() => setTheme("dark")}
        size={20}
        className={activeTheme("dark")}
      />
      <Laptop
        onClick={() => setTheme("system")}
        size={20}
        className={activeTheme("system")}
      />
    </div>
  );
};

export default ThemeToggle;
