const {z} = require('zod');
const statusEnum = ['pending', 'in progress', 'completed'];
const priorityEnum = ['low', 'medium', 'high'];

const titleSchema = z.string().trim().min(1,"Title is required").max(100,"Title must be at most 100 character");

const descriptionSchema = z.string().trim().min(1, 'Description is required').max(500, 'Description must be at most 500 characters');

const statusSchema = z.string().refine(val => statusEnum.includes(val), {message: `Status should be ${statusEnum.join(', ')}`});

const prioritySchema = z.string().refine(val=>priorityEnum.includes(val), {message: `priority should be ${priorityEnum.join(', ')}`});

const createTaskSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  status: statusSchema.optional().default('pending'),
  priority: prioritySchema.optional().default('low'),
});

const updateTaskSchema = z.object({
  title: titleSchema.optional(),
  description: descriptionSchema.optional(),
  status: statusSchema.optional(),
  priority: prioritySchema.optional(),
});


module.exports={createTaskSchema,updateTaskSchema};