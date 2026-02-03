import * as React from "react";
import { useSelector } from "react-redux";
import { selectUserDisplayName, selectUserSession } from "@/features/users/store/selectors/userSelectors";
import supabaseClient from "@/database/supabaseClient";
import { useDispatch } from "react-redux";
import { cleanSession } from "@/features/users/store/slice/userSlice";

const useHeader = (): [ boolean, string, string, boolean, () => void,
  (event: React.MouseEvent<HTMLDivElement>) => void ] => {
    const dispatch = useDispatch();
    const session = useSelector(selectUserSession);
    const isUserLogged = session !== null;
    const displayName = useSelector(selectUserDisplayName);
    const [ isOpen, setIsOpen ] = React.useState(false);
    const contentClass = `row-start-2 col-start-1 col-end-3 mt-5 z-1
        rounded border border-primary md:border-0 p-5 md:p-0 md:mt-0 bg-background md:bg-transparent 
        ${!isUserLogged ? "hidden" : (isOpen ? "block" : "hidden md:block")}
        md:row-start-1 md:col-start-2 md:col-end-3 md:justify-self-end`;
    const menuOnClick = () => {
        setIsOpen(!isOpen);
    }
    const onLogoutClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();

        supabaseClient.auth.signOut();
        dispatch(cleanSession());
    }

    return [ isUserLogged, displayName, contentClass, isOpen, menuOnClick, onLogoutClick ];
}

export default useHeader;