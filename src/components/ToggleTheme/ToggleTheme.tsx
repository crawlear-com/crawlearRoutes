import { useState } from "react";
import { useDispatch } from "react-redux";
import type { ToggleThemeProps } from "./ToggleTheme.types";
import { setTheme } from "./store/slice/themeSlice";

const ToggleTheme = ({ className }: ToggleThemeProps) => {
    const [isLightTheme, setIsLightTheme] = useState(true);
    const dispatch = useDispatch();

    const toggleTheme = () => {
      setIsLightTheme(!isLightTheme);
      dispatch(setTheme(!isLightTheme ? "light" : "dark"));
      document.documentElement.classList.toggle('dark');
    }

  return <strong className={ `cursor-pointer ${className}` } onClick={ toggleTheme }>
    ({isLightTheme ? "light" : "dark"} theme)
  </strong>
}

export default ToggleTheme;