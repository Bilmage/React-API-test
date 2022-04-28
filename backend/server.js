const express = require('express')
const app = express()
const PORT = 5000 

// middleware to allow request body
app.use(express.json())

app.get('/', (req, res)=>{
    res.status(200).send("Nelson backend running here")
})



// Routes importation
app.use('/crud', require('./routes/crud'))

// server listening
app.listen(PORT,()=>console.log(`Server running on PORT:${PORT}`))