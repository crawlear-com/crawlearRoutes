import * as React from "react";
import { useSelector } from "react-redux";
import { selectUserDisplayName, selectUserSession } from "../../../features/users/store/selectors/userSelectors";
import supabaseClient from "../../../helpers/supabaseClient";
import { useDispatch } from "react-redux";
import { cleanSession } from "../../../features/users/store/slice/userSlice";

const useHeader = (): [ boolean, string, string, boolean, () => void,
  (event: React.MouseEvent<HTMLAnchorElement>) => void ] => {
    const dispatch = useDispatch();
    const session = useSelector(selectUserSession);
    const isUserLogged = session !== null;
    const displayName = useSelector(selectUserDisplayName);
    const [ isOpen, setIsOpen ] = React.useState(false);
    const contentClass = `row-start-2 col-start-1 col-end-3 mt-5 z-1
        rounded border border-primary sm:border-0 p-5 sm:p-0 sm:mt-0 bg-background sm:bg-transparent 
        ${!isUserLogged ? "hidden" : (isOpen ? "block" : "hidden sm:block")}
        sm:row-start-1 sm:col-start-2 sm:col-end-3 sm:justify-self-end`;
    const menuOnClick = () => {
        setIsOpen(!isOpen);
    }
    const onLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        supabaseClient.auth.signOut();
        dispatch(cleanSession());
    }

    return [ isUserLogged, displayName, contentClass, isOpen, menuOnClick, onLogoutClick ];
}

export default useHeader;