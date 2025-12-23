import * as React from "react";
import { useDispatch } from "react-redux";
import { setSession } from "../features/users/store/slice/userSlice";
import { useNavigate } from "react-router";
import supabaseClient from "../helpers/supabaseClient";

const useSession = (redirectPage?: string) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    React.useEffect(() => {        
        supabaseClient.auth.getSession().then(({ data: { session } }) => {
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