const {z} = require('zod');
const statusEnum = ['pending', 'in progress', 'completed'];
const priorityEnum = ['low', 'medium', 'high'];

const titleSchema = z.string().trim().min(1,"Title is required").max(100,"Title must be at most 100 character");

const descriptionSchema = z.string().trim().min(1, 'Description is required').max(500, 'Description must be at most 500 characters');

const createTaskSchema = z.object({
    title: titleSchema,
    description: descriptionSchema,
    status: z.enum(statusEnum).optional().default('pending'),
    priority: z.enum(priorityEnum).optional().default('low'),
});

const updateTaskSchema = z.object({
    title: titleSchema.optional(),
    description: descriptionSchema.optional(),
    status: z.enum(statusEnum).optional(),
    priority: z.enum(priorityEnum).optional(),
})

module.exports={createTaskSchema,updateTaskSchema};