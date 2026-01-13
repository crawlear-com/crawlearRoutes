import { NavLink } from "react-router";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import useHeader from "./hooks/useHeader";
import { useSelector } from "react-redux";
import { selectTheme } from "../ToggleTheme/store/selectors/themeSelectors";
import { useTranslation } from "react-i18next";

import logo from '../../assets/images/logo.png';
import logoWhite from '../../assets/images/logo-white.png'

const Header = () => {
    const [ isUserLogged, displayName, contentClass, isOpen, menuOnClick, 
        onLogoutClick ] = useHeader();
    const theme = useSelector(selectTheme);
    const { t } = useTranslation(['landing']);

    return (<>
        <header className="grid items-center align-start grid-rows-auto grid-cols-[5%_95%] px-4 py-4 sticky top-0 left-0 w-full backdrop-blur z-1000 ">
            <a href="/" className="row-start-1 col-start-1 justify-self-start">
                <img className="min-w-10 max-h-10" src={ theme === "light" ? logo : logoWhite } alt="Crawlear.com logo" />
            </a>
            <button onClick={ menuOnClick } className="text-font text-2xl justify-self-end max-h-5 md:hidden leading-1.5">{ 
                isUserLogged ? (isOpen ? "x" : "☰") : "" 
            }</button>
            <div className={ contentClass }>
                <div className="block md:inline md:mr-5">
                    <span className="font-bold">{ displayName }</span>
                </div>
                <ToggleTheme className="md:mr-5" />
                <NavLink to="/myroutes" className="link block md:inline md:mr-5">{ t("main.my routes") }</NavLink>
                <NavLink to="/search" className="link block md:inline md:mr-5">{ t("main.search route") }</NavLink>
                <a href="/" onClick={ onLogoutClick } className="link block md:inline">{ t('login.signout') }</a>
            </div>
        </header>
    </>);
}

export default Header;