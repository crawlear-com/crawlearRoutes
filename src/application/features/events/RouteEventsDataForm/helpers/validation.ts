 import * as z from 'zod';

const nameSchema = z.string().max(100).min(2, "The event name must have at least 2 chars");
const descriptionSchema = z.string().max(500).min(10, "The event description must have at least 10 chars");

export { nameSchema, descriptionSchema };