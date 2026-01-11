 import * as z from 'zod';

const nameSchema = z.string().max(25).min(2, "The route name must have at least 2 chars");
const descriptionSchema = z.string().max(250).min(10, "The route description must have at least 10 chars");
const youtubeSchema = z.url({
  protocol: /^https?$/,
  hostname: /^.*(youtube.com|youtu.be)/,
  pattern: /^.*(youtube.com|youtu.be)\/(watch\?v=|embed\/|v\/|shorts\/|)(.*?((?=[&#?])|$))/,
  error: "Invalud youtube url"
});

export { nameSchema, descriptionSchema, youtubeSchema };