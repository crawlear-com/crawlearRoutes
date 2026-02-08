import { NavLink } from "react-router";
import { emailSchema } from "../helpers/validation";
import { setAndValidate } from "@/application/helpers/formValidations";
import useLoginForm from "./hooks/useLoginForm";
import FormFeedbackElement from "@/application/components/ui/FormFeedbackElement/FormFeedbackElement";
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
    const [ email, setEmail, password, onSubmitLoginForm, onPaswordChange ] = useLoginForm();
    const { t } = useTranslation(["landing"]);

    return (<>
        <div className="w-full max-w-sm m-auto items-center px-20 sm:px-0">
            <h2 className="text-3xl font-bold text-primary mb-2 text-center">{ t("login.signin") }</h2>
            <p className="text-center mb-6">
                { t("login.sign in to explore") }
                <NavLink to="/" className="link"> { t("login.landing") }</NavLink>
            </p>

            <form className="space-y-4" action={ onSubmitLoginForm } noValidate>
                <input className="input p-3" type="email" id="email" name="email" placeholder="Email"
                    onChange={ () => { setAndValidate(setEmail, 'email', emailSchema) }} value={ email } />
                <FormFeedbackElement className="email__feedback" />
                <input className="input p-3" type="password" id="password" name="password" placeholder="Password"
                    onChange={ onPaswordChange } value={ password } />
                <FormFeedbackElement className="password__feedback" />
                <button type="submit" className="button-primary m-auto">  { t("login.signin") } </button>
                <FormFeedbackElement className="general__feedback" />
            </form>

            <p className="text-center mt-6">
                { t("login.dont have account") }
                <NavLink to="/register" className="link"> { t("login.signup") } </NavLink>
            </p>
        </div>
    </>)
}

export default LoginForm;