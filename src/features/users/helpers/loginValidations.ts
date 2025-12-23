import { emailSchema, notEmptySchema, validateInput } from "./validation";

const INVALIDCLASS = 'invalid';
const VALIDCLASS = 'valid';
  
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

const loginFormValidates = (formData: FormData) => { 
  const passwordValidates = validateInput('.password__feedback', 'password', formData.get('password') as string || '', notEmptySchema);
  const emailValidates = validateInput('.email__feedback', 'email', formData.get('email') as string || '', emailSchema);

  if (passwordValidates && emailValidates) {
    cleanErrorsOnSubmit();

    return true;
  } else {
    return false;
  }
}
export { loginFormValidates };