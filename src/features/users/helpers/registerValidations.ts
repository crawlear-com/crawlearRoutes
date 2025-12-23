const INVALIDCLASS = 'invalid';
const VALIDCLASS = 'valid';
  
import * as z from 'zod';
import { emailSchema, generateUIfeedback, nameSchema, notEmptySchema, passwordConfirmationSchema, passwordSchema, validateInput } from './validation';

const validateConfirmPassword = () => {
  const feedbackElement = document.querySelector('.repassword__feedback');
  const passwordElement = document.getElementById('password') as HTMLInputElement;
  const repasswordElement = document.getElementById('repassword') as HTMLInputElement;
  const result = z.safeParse(passwordConfirmationSchema, {
    password: passwordElement.value,
    repassword: repasswordElement.value
    });

  generateUIfeedback(result, feedbackElement, repasswordElement);

  return result.success;
}

const cleanErrorsOnSubmit = () => {
  const nameFeedbackElement = document.querySelector('.name__feedback');
  const passwordFeedbackElement = document.querySelector('.password__feedback');
  const repasswordFeedbackElement = document.querySelector('.repassword__feedback');
  const emailFeedbackElement = document.querySelector('.email__feedback');
  const nameElement = document.getElementById('name');
  const passwordElement = document.getElementById('password');
  const repasswordElement = document.getElementById('repassword');
  const emailElement = document.getElementById('email');

  if (nameFeedbackElement && nameElement) {
    nameFeedbackElement.textContent = '';
    nameElement.classList.remove(INVALIDCLASS, VALIDCLASS);
  }
  if (passwordFeedbackElement && passwordElement) {
    passwordFeedbackElement.textContent = '';
    passwordElement.classList.remove(INVALIDCLASS, VALIDCLASS);
  }
  if (repasswordFeedbackElement && repasswordElement) {
    repasswordFeedbackElement.textContent = '';
    repasswordElement.classList.remove(INVALIDCLASS, VALIDCLASS);
  }
  if (emailFeedbackElement && emailElement) {
    emailFeedbackElement.textContent = '';
    emailElement.classList.remove(INVALIDCLASS, VALIDCLASS);
  }
}

const registerFormValidates = (formData: FormData) => { 
  const nameValidates = validateInput('.name__feedback', 'name', formData.get('name') as string || '', nameSchema);
  const passwordValidates = validateInput('.password__feedback', 'password', formData.get('password') as string || '', passwordSchema);
  const repasswordValidates = validateInput('.repassword__feedback', 'repassword', formData.get('repassword') as string || '', notEmptySchema) && 
    validateConfirmPassword();
  const emailValidates = validateInput('.email__feedback', 'email', formData.get('email') as string || '', emailSchema);

  if (nameValidates && passwordValidates && repasswordValidates && emailValidates) {
    cleanErrorsOnSubmit();

    return true;
  } else {
    return false;
  }
}

export { validateInput, registerFormValidates, validateConfirmPassword, passwordConfirmationSchema };