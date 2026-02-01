import { useState } from "react";
import { useDispatch } from "react-redux";
import type { ToggleThemeProps } from "./ToggleTheme.types";
import { setTheme } from "./store/slice/themeSlice";

const ToggleTheme = ({ className, children }: ToggleThemeProps) => {
    const [isLightTheme, setIsLightTheme] = useState(true);
    const dispatch = useDispatch();

    const toggleTheme = () => {
      setIsLightTheme(!isLightTheme);
      dispatch(setTheme(!isLightTheme ? "light" : "dark"));
      document.documentElement.classList.toggle('dark');
    }

  return <strong data-testid={isLightTheme ? "light" : "dark"} className={ `cursor-pointer link ${className}` } onClick={ toggleTheme }>
    { children }
  </strong>
}

export default ToggleTheme;