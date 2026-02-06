const {zod} = require('zod')
const statusEnum = ['pending', 'in progress', 'completed'];
const priorityEnum = ['low', 'medium', 'high'];

const titleSchema = z.string().trim().min(1,"Title is required").max(100,"Title must be at most 100 character");

