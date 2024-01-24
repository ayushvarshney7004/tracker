"use client";
import { useTheme } from "next-themes";
import { Switch } from "@radix-ui/themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
const ThemeSwitch = () => {
  const { setTheme, theme } = useTheme();
  // 

  return (
    <div className="max-w-fit flex items-center space-x-3">
       <SunIcon/>
      <Switch
        radius="full"
        size={"2"}
        onClick={() => {
          if (theme === "dark") {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        }}
      />
    
      <MoonIcon/>
    </div>
  );
};
export default ThemeSwitch;
