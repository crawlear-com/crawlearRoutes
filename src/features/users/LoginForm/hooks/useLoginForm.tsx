import * as React from "react";
import { loginFormValidates } from "../../helpers/loginValidations";
import { useDispatch } from "react-redux";
import { setSession } from "../../store/slice/userSlice";
import supabaseClient from "../../../../helpers/supabaseClient";
import { useNavigate } from "react-router";
import { setFormError } from "../../helpers/validation";

const useLoginForm = (): [ string, React.Dispatch<React.SetStateAction<string>>, string,
    (formData: FormData) => void, (event: React.ChangeEvent<HTMLInputElement>) => void ] => {
    const [ email, setEmail ] = React.useState('');
    const [ password, setPassword ] = React.useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmitLoginForm = async(formData: FormData) => {
        if (loginFormValidates(formData)) {
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });
            if (error) {
                setFormError(error.message);
            } else {
                setFormError("");
                dispatch(setSession(data.session));
                navigate("/myroutes");
            }
            setEmail('');
            setPassword('');
        }
    }

    const onPaswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;

        setPassword(value);
    }

    return [ email, setEmail, password, onSubmitLoginForm, onPaswordChange ]
}

export default useLoginForm;