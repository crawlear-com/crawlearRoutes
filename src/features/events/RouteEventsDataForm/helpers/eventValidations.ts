import { nameSchema, descriptionSchema } from "./validation";
import { VALIDCLASS, INVALIDCLASS, validateInput } from "@/helpers/formValidations";  

const cleanErrorsOnSubmit = () => {
  const nameFeedbackElement = document.querySelector('.routeName__feedback');
  const descriptionFeedbackElement = document.querySelector('.routeDescription__feedback');
  const nameElement = document.getElementById('routeName');
  const descriptionElement = document.getElementById('routeDescription');
  
  if (nameFeedbackElement && nameElement) {
    nameFeedbackElement.textContent = '';
    nameElement.classList.remove(INVALIDCLASS, VALIDCLASS);
  }
  if (descriptionFeedbackElement && descriptionElement) {
    descriptionFeedbackElement.textContent = '';
    descriptionElement.classList.remove(INVALIDCLASS, VALIDCLASS);
  }
}

const eventFormValidates = (formData: FormData) => { 
  const nameValidates = validateInput('.routeName__feedback', 'routeName', formData.get('routeName') as string || '', nameSchema);
  const descriptionValidates = validateInput('.routeDescription__feedback', 'routeDescription', formData.get('routeDescription') as string || '', descriptionSchema);

  if (nameValidates && descriptionValidates) {
    cleanErrorsOnSubmit();

    return true;
  } else {
    return false;
  }
}
export { eventFormValidates };