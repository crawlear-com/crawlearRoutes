const INVALIDCLASS = 'invalid';
const VALIDCLASS = 'valid';
  
import * as z from 'zod';

const nameSchema = z.string().max(25).min(2, "The name must have at least 2 chars");
const passwordSchema = z.string().min(6, {
    message: "The password must be minimum 6 chars length"
  }).refine((password) => /[A-Z]/.test(password), {
    message: "The password must have at least one capital letter"
  }).refine((password) => /[a-z]/.test(password), {
    message: "The password must have at least one non capital letter"
  }).refine((password) => /[0-9]/.test(password), {
    message: "The password must have at least one number"
  }).refine((password) => /[!@#$%^&*]/.test(password), {
    message: "The password must have at least one special character (!@#$%^&*)"
  });
const notEmptySchema = z.string().min(1, {
    message: "The password cannot be empty"
  });
const passwordConfirmationSchema = z.object({ password: passwordSchema, repassword: notEmptySchema}).refine((data) => data.password === data.repassword, {
    message: "The password confirmation is incorrect"
  });
const emailSchema = z.email("The email is not in the correct format").min(1, "The email cannot be empty").max(50);

const validateInput = (feedbackSelector: string, elementId: string, value: string, schema: z.ZodString | z.ZodEmail | z.ZodObject) => {
  const feedbackElement = document.querySelector(feedbackSelector);
  const element = document.getElementById(elementId);
  const result = z.safeParse(schema, value);

  generateUIfeedback(result, feedbackElement, element);

  return result.success;
}

const generateUIfeedback = (result: z.ZodSafeParseResult<string | Record<string, unknown>>, feedbackElement: Element | null, element: Element | null) => {
  if (!result.success && feedbackElement && element) {
    feedbackElement.textContent = result.error.issues[0].message;
    element.classList.add(INVALIDCLASS);
    element.classList.remove(VALIDCLASS);
  } else if (result.success && feedbackElement && element) {
    feedbackElement.textContent = '';
    element.classList.remove(INVALIDCLASS);
    element.classList.add(VALIDCLASS);
  }
}

const setFormError = (error: string) => {
    const feedbackElement = document.querySelector(".general__feedback");

    if (feedbackElement) {
        (feedbackElement  as HTMLDivElement).innerText = error;
    }
}


const setAndValidate = (setFunction: React.Dispatch<React.SetStateAction<string>>, elementId: string, schema: z.ZodString | z.ZodEmail | z.ZodObject) => {
    const value = (document.getElementById(elementId) as HTMLInputElement).value;

    setFunction(value);
    validateInput(`.${elementId}__feedback`, elementId, value, schema);
}

export { validateInput, setAndValidate, generateUIfeedback, setFormError, nameSchema, passwordSchema, notEmptySchema, passwordConfirmationSchema, emailSchema };