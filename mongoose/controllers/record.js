const Record = require('../models/record');
const Task = require('../models/task');

exports.addTask = async (req, res) => {
    try{

        const { title, desc, completed, userid } = req.body;
        
        if(!(title && desc && userid)){
            return res.status(400).send("Not sufficient data provided.");
        }
        
        const newTask = await Task.create({
            t_title: title,
            t_desc: desc,
            completed: completed,
            createdAt: new Date()
        });
        
        const newRecord = await Record.create({
            user_id: userid,
            createdAt: new Date(),
            tasks: [{task_id: newTask._id}]
        });
        const ifExists = await Record.findOne({createdAt: newTask.createdAt, user_id: userid});
        
        if(ifExists){
            return res.send(ifExists);
            //ifExists.tasks.push({task_id: newTask._id});
        }
        else{
            
        }
        res.send(newRecord);
    }
    catch(err){
        res.send(err.message)

    }
}
    