const Joi = require('joi')
const express = require('express');
const router = express.Router();
var posts = [] ;

// Get all Posts
router.get('/', (req,res)=>{
    res.status(200).send(posts)
})

// Create post
router.post('/add', (req,res)=>{
    const { title, content } = req.body

    const newPost = { title, content}
    console.log("Post", newPost)
    if(title && content){
        posts.push(newPost)
        console.log("Posts", posts)
        res.status(201).send(`Post :${JSON.stringify(newPost)} created successfully`)
    }
})




// Update post
router.put('/update', (req,res)=>{
    const { title, content } = req.body

    const updatePost = { title, content}
    const oldPost = posts.indexOf(updatePost) > -1

    console.log("Post", updatePost)
    if(oldPost){
        posts.push(newPost)
        console.log("Posts", posts)
        res.status(200).send(`Post :${updatePost} updated successfully`)
    }
})


// Delete post
router.delete('/delete/:title', (req,res)=>{
    const { title } = req.params

    console.log("Title", title)

    if(title){
        posts.filter(post => post.title !== title )
        res.status(200).send(`Post with title :${title} deleted successfully`)
    }

})



module.exports = router