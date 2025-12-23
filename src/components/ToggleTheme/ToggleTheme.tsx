import { useState } from "react";

type ToggleThemeProps = {
  className: string
};

const ToggleTheme = ({ className }: ToggleThemeProps) => {
    const [isLightTheme, setIsLightTheme] = useState(true);
    
    const toggleTheme = () => {
      setIsLightTheme(!isLightTheme);
      document.documentElement.classList.toggle('dark');
    }

  return <strong className={ className } onClick={ toggleTheme }>
    ({isLightTheme ? "light" : "dark"} theme)
  </strong>
}

export default ToggleTheme;