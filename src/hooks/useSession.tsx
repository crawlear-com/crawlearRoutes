import * as React from "react";
import { useDispatch } from "react-redux";
import { setIsLoading, setSession } from "../features/users/store/slice/userSlice";
import { useNavigate } from "react-router";
import supabaseClient from "../database/supabaseClient";

const useSession = (redirectPage?: string) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    React.useEffect(() => {      
        dispatch(setIsLoading(true));
        supabaseClient.auth.getSession().then(({ data: { session } }) => {
            dispatch(setIsLoading(false));
            if (session) {
                dispatch(setSession(session));
                if(redirectPage) {
                    navigate(redirectPage);
                }
            }
        });
    }, [dispatch, navigate, redirectPage]);
}

export default useSession;