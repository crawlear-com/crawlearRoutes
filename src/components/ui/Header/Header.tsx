import { NavLink, useLocation } from "react-router";
import ToggleTheme from "@/features/theme/ToggleTheme/ToggleTheme";
import useHeader from "./hooks/useHeader";
import { useSelector } from "react-redux";
import { selectTheme } from "@/features/theme/ToggleTheme/store/selectors/themeSelectors";
import { useTranslation } from "react-i18next";
import useShowHide from "@/hooks/useShowHide";

import logo from '@/assets/images/logo.png';
import themeIcon from '@/components/ui/Header/assets/image/theme.png';
import myroutes from '@/components/ui/Header/assets/image/myroutes.png';
import myevents from '@/components/ui/Header/assets/image/myevents.png';
import search from '@/components/ui/Header/assets/image/search.png';
import logoWhite from '@/assets/images/logo-white.png'

import './styles/header.css';

const greyscaleIconClass = (location: string, name: string) => {
    return location.indexOf(name) >= 0 ? 'normal' : 'greyscale';
}

const Header = () => {
    const [ isUserLogged, displayName, contentClass, isOpen, menuOnClick, 
        onLogoutClick ] = useHeader();
    const theme = useSelector(selectTheme);
    const { t } = useTranslation(['landing']);
    const location = useLocation().pathname.split('/')[1];
    const  [ showClassName ] = useShowHide('showHide', 50)

    return (<>
        <header className={`${showClassName} grid items-center align-start grid-rows-auto grid-cols-[5%_95%] px-4 py-4 sticky top-0 left-0 w-full z-1000 backdrop-blur`}>
            <a href="/" className="row-start-1 col-start-1 justify-self-start">
                <img className="min-w-10 max-h-10" src={ theme === "light" ? logo : logoWhite } alt="Crawlear.com logo" />
            </a>
            <button onClick={ menuOnClick } className="text-font text-2xl justify-self-end max-h-5 md:hidden leading-1.5">{ 
                isUserLogged ? (isOpen ? "x" : "☰") : "" 
            }</button>
            <nav className={ contentClass }>
                <div className="block md:inline md:mr-5">
                    <span className="font-bold">{ displayName }</span>
                </div>
                <ToggleTheme className="mr-1">
                    <img alt={t("main.toggle theme")} className="icon greyscale" src={themeIcon} />
                </ToggleTheme>
                <NavLink to="/myroutes" className="link md:inline mr-1">
                    <img alt={t("main.my routes")} className={`icon ${greyscaleIconClass(location, 'route')}`} src={myroutes} />
                </NavLink>
                <NavLink to="/myevents" className="link md:inline mr-1">
                    <img  alt={t("main.my events")} className={`icon ${greyscaleIconClass(location, 'event')}`} src={myevents} />
                </NavLink>
                <NavLink to="/search" className="link md:inline mr-1">
                    <img  alt={t("main.search route")} className={`icon ${greyscaleIconClass(location, 'search')}`} src={search} />
                </NavLink>
                <div onClick={ onLogoutClick } className="link block md:inline text-font cursor-pointer">{ t('login.signout') }</div>
            </nav>
        </header>
    </>);
}

export default Header;