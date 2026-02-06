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