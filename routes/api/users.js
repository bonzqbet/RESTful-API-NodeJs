const express = require('express');
const router = express.Router();
const users = require('../../users')
const uuid = require('uuid');
// const popup = require('popups');


//Get all users
router.get('/',(req,res)=>{
    res.json(users);
})

//Get sigle users
router.get('/:id',(req,res)=>{
    let found = users.some(user => user.id === parseInt(req.params.id)); //return true or false
    if(found){
        res.json(users.filter(user => user.id === parseInt(req.params.id)));
    }
    else{
        res.status(400).json({msg : `No users with the id of ${req.params.id}`});
    }
})

// create users
router.post('/',function(req,res){
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email
    }
    if(!newUser.name || !newUser.email){
        // return res.redirect('/');
        return res.status(400).json({mgs: 'Please include a name and email'});
    }
    users.push(newUser);
    // res.json(users);
    res.redirect('/');
})

// Update users
router.put('/:id',(req,res)=>{
    let found = users.some(user => user.id === parseInt(req.params.id)); //return true or false
    if(found){
        const updUser = req.body;
        users.forEach(user=>{
            if(user.id === parseInt(req.params.id)){
                user.name = updUser.name ? updUser.name : user.name; 
                user.email = updUser.email ? updUser.email : user.email;

                res.json({msh : "User Updateed",user})
            }
            else{
                res.status(400).json({msg: `No user with the id of ${req.params.id}`});
            }
        })
    }
});

// Delete Users
router.delete('/:id',(req,res)=>{
    let found = users.some(user => user.id === parseInt(req.params.id)); //return true or false
    if(found){
        res.json({
            msg: 'Member Deleted',
            user :users.filter(user => user.id !== parseInt(req.params.id))
        })
    }
    else{
        res.status(400),json({msg: `No user with the id of ${req.params.id}`})
    }
})

module.exports = router;

