const {createTaskSchema,updateTaskSchema} =require('./task.schema')

function validateCreateTask(req,res,next){
    const result = createTaskSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            error:{
                code:"INVALID_TASK_DATA",
                message: result.error.errors[0].message
            }
        })
    }
    req.body = result.data;
    next();
}

function validateUpdateTask(req, res, next) {
  const fieldsNotRequired = ['id', 'createdAt', 'updatedAt'];
  for (const field of fieldsNotRequired) {
    if (req.body[field] !== undefined) {
      return res.status(400).json({
        error: {
          code: 'INVALID_UPDATE_FIELDS',
          message: 'id, createdAt, and updatedAt cannot be updated',
        },
      });
    }
  }
    const result = updateTaskSchema.safeParse(req.body);
    if (!result.success) {
    return res.status(400).json({
        error: {
        code: 'INVALID_TASK_DATA',
        message: result.error.errors[0].message,
        },
    });
    }
    req.body = result.data;
    next();
}
module.exports={validateCreateTask,validateUpdateTask}