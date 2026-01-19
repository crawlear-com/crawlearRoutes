 import * as z from 'zod';
import { YOTUBE_PATTERN } from '../../../../components/YoutubeEmbed/helpers/utils';

const nameSchema = z.string().max(100).min(2, "The route name must have at least 2 chars");
const descriptionSchema = z.string().max(500).min(10, "The route description must have at least 10 chars");
const youtubeSchema = z.union([z.literal(""), z.url({
  protocol: /^https?$/,
  pattern: YOTUBE_PATTERN,
  error: "Invalud youtube url"
})]);

export { nameSchema, descriptionSchema, youtubeSchema };