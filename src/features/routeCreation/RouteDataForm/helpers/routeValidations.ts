import { nameSchema, descriptionSchema, youtubeSchema } from "./validation";
import { VALIDCLASS, INVALIDCLASS, validateInput } from "@/helpers/formValidations";  

const cleanErrorsOnSubmit = () => {
  const nameFeedbackElement = document.querySelector('.routeName__feedback');
  const descriptionFeedbackElement = document.querySelector('.routeDescription__feedback');
  const youtubeFeedbackElement = document.querySelector('.youtube__feedback');
  const nameElement = document.getElementById('routeName');
  const descriptionElement = document.getElementById('routeDescription');
  const youtubeElement = document.getElementById('youtubeVideo');
  
  if (nameFeedbackElement && nameElement) {
    nameFeedbackElement.textContent = '';
    nameElement.classList.remove(INVALIDCLASS, VALIDCLASS);
  }
  if (descriptionFeedbackElement && descriptionElement) {
    descriptionFeedbackElement.textContent = '';
    descriptionElement.classList.remove(INVALIDCLASS, VALIDCLASS);
  }
  if (youtubeFeedbackElement && youtubeElement) {
    youtubeFeedbackElement.textContent = '';
    youtubeElement.classList.remove(INVALIDCLASS, VALIDCLASS);
  }
}

const routeFormValidates = (formData: FormData) => { 
  const nameValidates = validateInput('.routeName__feedback', 'routeName', formData.get('routeName') as string || '', nameSchema);
  const descriptionValidates = validateInput('.routeDescription__feedback', 'routeDescription', formData.get('routeDescription') as string || '', descriptionSchema);
  const youtubeValidates = validateInput('.youtube__feedback', 'youtubeVideo', formData.get('youtubeVideo') as string || '', youtubeSchema);

  if (nameValidates && descriptionValidates && youtubeValidates) {
    cleanErrorsOnSubmit();

    return true;
  } else {
    return false;
  }
}
export { routeFormValidates };