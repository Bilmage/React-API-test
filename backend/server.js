const Joi = require('joi');
const pool = require('./database');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000; 



// middleware to allow request body
app.use(express.json()); // => req.body

//Link postgres to webbackend (RESTAPI)
//GET ALL TODOS (READ)
app.get('/todos', async(req,res) =>{
    try {
        //await 
        const allTodos = await pool.query("SELECT * FROM todo" ); 
        res.json(allTodos.rows);    
    } catch (error) {
        console.error(error.message);  
    }
});
//CREATE TODOS (CREATE)
app.post('/todos', async(req,res) => {
    try {
      //await  
      const { description } = req.body;
      const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
      );
      res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
    
})
//GET TODOS (READ)
app.get('/todos/:id', async(req,res) => {
   const { id } = req.params;

   try {
       //await 
       const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id] );
       res.json(todo.rows[0]);
   } catch (error) {
    console.error(error.message);
   }
})
//UPDATE TODOS (UPDATE)
app.put('/todos/:id', async(req,res) =>{
   try {
       const { id } = req.params; //WHERE
       const { description } = req.body; //SET
       const updateTodo = await pool.query("UPDATE  todo SET description = $1 WHERE todo_id = $2", [description,id] );

       res.json("TODO was UPDATED!!");
   } catch (error) {
    console.error(error.message);  
   }
});
//DELETE TODOS
app.delete('/todos/:id', async(req,res) =>{
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]
             );
        res.json("TODO was successfully DELETED my G!!");
    } catch (error) {
        console.error(error.message);
    }
})


app.get('/', (req, res)=>{
    res.status(200).send("Nelson backend running here")
});






// Routes importation
app.use('/crud', require('./routes/crud'))

// server listening
app.listen(PORT,()=>console.log(`Server running on PORT:${PORT}`))