"use client";

import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Moon } from "@phosphor-icons/react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div className="flex justify-between items-center px-2 my-2">
      <div className="flex items-center space-x-2">
        <Moon
          size={20}
          weight="bold"
          className="text-ch-dark dark:text-ch-light"
        />
        <span className="text-sm">Dark Mode</span>
      </div>
      <Switch checked={theme === "dark"} onCheckedChange={changeTheme} />
    </div>
  );
};
