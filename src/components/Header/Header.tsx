import { NavLink } from "react-router";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import useHeader from "./hooks/useHeader";
import { useSelector } from "react-redux";
import { selectTheme } from "../ToggleTheme/store/selectors/themeSelectors";

import logo from '../../assets/images/logo.png';
import logoWhite from '../../assets/images/logo-white.png'


const Header = () => {
    const [ isUserLogged, displayName, contentClass, isOpen, menuOnClick, onLogoutClick ] = useHeader();
    const theme = useSelector(selectTheme);

    return (<>
        <header className="grid items-center align-start grid-rows-auto grid-cols-[25%_75%] px-4 py-4 sticky top-0 left-0 w-full backdrop-blur">
            <a href="/" className="row-start-1 col-start-1 justify-self-start">
                <img className="max-h-10" src={ theme === "light" ? logo : logoWhite } alt="Crawlear.com logo" />
            </a>
            <button onClick={ menuOnClick } className="text-font text-2xl justify-self-end max-h-5 sm:hidden leading-1.5">{ 
                isUserLogged ? (isOpen ? "x" : "☰") : "" 
            }</button>
            <div className={ contentClass }>
                <div className="block sm:inline sm:mr-5">
                    Welcome back <span className="font-bold">{ displayName }</span>
                </div>
                <ToggleTheme className="sm:mr-5" />
                <NavLink to="/myroutes" className="link block sm:inline sm:mr-5">my routes</NavLink>
                <a href="/" onClick={ onLogoutClick } className="link block sm:inline">sign out</a>
            </div>
        </header>
    </>);
}

export default Header;