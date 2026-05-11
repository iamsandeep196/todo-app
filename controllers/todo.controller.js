const Todo = require("../models/todo.model");
const User = require("../models/user.model");

// creatting user
exports.createTodo = async (req,res) => {
    try {


        const { title , description } = req.body;
        const existsUser = await User.findById(req.user.id).select("-user");
        
         if(!existsUser) return res.status(404).json({msg:"User not found"});

        const newTodo = await Todo.create({
            title,
            description,
            user:req.user.id
        });
        res.status(201).json({msg:"Todo created",newTodo});

    }catch(error){
        res.status(500).json({
            msg:"internal server error",error
        })
    }

}

// get todos by uder id
exports.getTodos = async (req,res) => {
    const userId = req.user.id;
    // console.log(userId);
    const todos = await Todo.find({user : userId}).select("-user");
    

    res.json(todos);
}

exports.updateTodo = async (req,res) => {
    try {
        console.log(req.user);

        const { id } = req.params;
        const { title , description } = req.body;
        console.log(req.body);

        const updateTodo = await Todo.findOneAndUpdate(
            {
                _id:id,
                user:req.user.id
            },
            {
                title,
                description
            },
            {
                new:true
            }
        )
        
        if(!updateTodo){
            return res.status(404).json({
                msg:"Todo not found"
            })
        }

        res.status(200).json({
            msg:"Todo Updated"
        })

    }
    // 
    catch (error){
        res.status(500).json({
            msg:"Update failed",
            error:error.message
        })
    }

}

// Delete todo controller

exports.deleteTodo = async (req,res) => {

    try {

        const { id } = req.params;

        const todo = await Todo.findByIdAndDelete(id);

        if(!todo){
            
            return res.status(404).json({
                msg:"Todo not found"
            });
        }

        res.status(200).json({
            msg:"Todo deleted successfully"
        });


    }
    catch (error){

        res.status(500).json({
            msg:"Internal server error",
            error:error.message
        })
    }


}


