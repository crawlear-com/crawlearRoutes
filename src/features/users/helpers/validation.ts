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

export { nameSchema, passwordSchema, notEmptySchema, passwordConfirmationSchema, emailSchema };