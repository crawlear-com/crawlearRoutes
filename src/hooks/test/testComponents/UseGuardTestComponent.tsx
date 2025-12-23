import useGuard from "../../useGuard";
import { setSession } from "../../../features/users/store/slice/userSlice";
import { useDispatch } from "react-redux";
import { sessionData } from "./sessionData";
import type { Session } from '@supabase/supabase-js'

const TestComponent = ({setsSession} : { setsSession: boolean }) => {
    const dispatch = useDispatch();
    if(setsSession) {
        dispatch(setSession(sessionData as Session));
    }

    useGuard();

    return <div data-testid="guard"></div>;
}

export default TestComponent;