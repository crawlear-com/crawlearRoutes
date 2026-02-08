const INVALIDCLASS = 'invalid';
const VALIDCLASS = 'valid';
  
import * as z from 'zod';

const validateInput = (feedbackSelector: string, elementId: string, value: string, schema: z.ZodString | z.ZodEmail | z.ZodObject | z.ZodUnion) => {
  const feedbackElement = document.querySelector(feedbackSelector);
  const element = document.getElementById(elementId);
  const result = schema.safeParse(value);

  generateUIfeedback(result, feedbackElement, element);

  return result.success;
}

const generateUIfeedback = (result: z.ZodSafeParseResult<unknown>, feedbackElement: Element | null, element: Element | null) => {
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

const setAndValidate = (setFunction: React.Dispatch<React.SetStateAction<string>> | ((value: string) => void), elementId: string, schema: z.ZodString | z.ZodEmail | z.ZodObject | z.ZodUnion) => {
    const value = (document.getElementById(elementId) as HTMLInputElement).value;

    setFunction(value);
    validateInput(`.${elementId}__feedback`, elementId, value, schema);
}

export { VALIDCLASS, INVALIDCLASS, validateInput, setAndValidate, generateUIfeedback, setFormError };