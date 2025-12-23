import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { registerFormValidates } from "../../helpers/registerValidations";
import supabaseClient from "../../../../helpers/supabaseClient";
import { setSession } from "../../store/slice/userSlice";
import { setFormError } from "../../helpers/validation";

const useRegisterForm = (): [ string, React.Dispatch<React.SetStateAction<string>>, string, React.Dispatch<React.SetStateAction<string>>, 
    string, React.Dispatch<React.SetStateAction<string>>, string, React.Dispatch<React.SetStateAction<string>>, (formData: FormData) => void ] => {
    const [ name, setName ] = React.useState('');
    const [ email, setEmail ] = React.useState('');
    const [ password, setPassword ] = React.useState('');
    const [ repassword, setRepassword ] = React.useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmitRegisterForm = async (formData: FormData) => {
        if (registerFormValidates(formData)) {
            const { data, error } = await supabaseClient.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: { displayName: name },
                    emailRedirectTo: '/search',
                },
            });

            if (error) {
                setFormError(error.message);
            } else if (data && data.user && data.session) {
                setFormError("");
                dispatch(setSession(data.session));
                navigate("/myroutes");
            }
            setName('');
            setEmail('');
            setPassword('');
            setRepassword('');
        }
    }

    return [ name, setName, email, setEmail, password, setPassword, repassword, setRepassword, onSubmitRegisterForm ];
}

export default useRegisterForm;