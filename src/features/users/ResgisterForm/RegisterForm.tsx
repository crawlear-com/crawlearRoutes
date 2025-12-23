import { NavLink } from "react-router";
import { emailSchema, nameSchema, passwordSchema, notEmptySchema, setAndValidate } from "../helpers/validation";
import { validateConfirmPassword } from "../helpers/registerValidations";
import useRegisterForm from "./hooks/useRegisterForm";
import FormFeedbackElement from "../../../components/FormFeedbackElement/FormFeedbackElement";

const RegisterForm = () => {
    const [ name, setName, email, setEmail, password, setPassword, repassword, setRepassword, onSubmitRegisterForm ] = useRegisterForm();

    return (<div className="w-full max-w-sm m-auto items-center px-20">
        <h2 className="text-3xl font-bold text-primary mb-2 text-center">Sign up</h2>
        <p className="text-center mb-6">
            Create an account to explore, create and organize your next crawler routes or go back to 
                <NavLink to="/" className="link"> landing</NavLink>
        </p>

        <form className="space-y-4" action={ onSubmitRegisterForm } noValidate>
            <input className="input" id="name" name="name" type="text" placeholder="Name"
                onChange={ () => { setAndValidate(setName, 'name', nameSchema) }} value={ name } />
            <FormFeedbackElement className="name__feedback" />
            <input className="input" id="email" name="email" type="email" placeholder="Email" 
                onChange={ () => { setAndValidate(setEmail, 'email', emailSchema) }} value={ email } />
            <FormFeedbackElement className="email__feedback"/>    
            <input className="input" id="password" name="password" type="password" placeholder="Password" 
                onChange={ () => { setAndValidate(setPassword, 'password', passwordSchema) }} value={ password } />
            <FormFeedbackElement className="password__feedback"/>
            <input className="input" id="repassword" name="repassword" type="password" placeholder="Confirm password" 
                onChange={ () => { 
                    setAndValidate(setRepassword, 'repassword', notEmptySchema);
                    validateConfirmPassword();
                }} value={ repassword } />
            <FormFeedbackElement className="repassword__feedback"/>
            <button type="submit" className="button-primary"> Sing up </button>
            <FormFeedbackElement className="general__feedback" />
        </form>

        <p className="text-center mt-6">
            Already have an account?
            <NavLink to="/login" className="link"> Sign in</NavLink>
        </p>
    </div>);
}

export default RegisterForm;