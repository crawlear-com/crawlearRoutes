import { NavLink } from "react-router";
import { emailSchema, setAndValidate } from "../helpers/validation";
import useLoginForm from "./hooks/useLoginForm";
import FormFeedbackElement from "../../../components/FormFeedbackElement/FormFeedbackElement";

const LoginForm = () => {
    const [ email, setEmail, password, onSubmitLoginForm, onPaswordChange ] = useLoginForm();

    return (<>
        <div className="w-full max-w-sm m-auto items-center px-20">
            <h2 className="text-3xl font-bold text-primary mb-2 text-center">Sign in</h2>
            <p className="text-center mb-6">
                Sign in to explore, create and organize your next crawler routes or go back to 
                <NavLink to="/" className="link"> landing</NavLink>
            </p>

            <form className="space-y-4" action={ onSubmitLoginForm } noValidate>
                <input className="input" type="email" id="email" name="email" placeholder="Email"
                    onChange={ () => { setAndValidate(setEmail, 'email', emailSchema) }} value={ email } />
                <FormFeedbackElement className="email__feedback" />
                <input className="input" type="password" id="password" name="password" placeholder="Password"
                    onChange={ onPaswordChange } value={ password } />
                <FormFeedbackElement className="password__feedback" />
                <button type="submit" className="button-primary">  Sign in </button>
                <FormFeedbackElement className="general__feedback" />
            </form>

            <p className="text-center mt-6">
                Don't have an account?
                <NavLink to="/register" className="link"> Sign Up </NavLink>
            </p>
        </div>
    </>)
}

export default LoginForm;