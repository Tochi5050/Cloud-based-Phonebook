const express = require('express')
const auth = require('../middleware/auth')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { body, validationResult } = require('express-validator');

// @route   GET api/auth
// @desc    Getting a user logged in
// @access  Private

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.error(err.message)
        
    }


})



// @route   POST api/auth
// @desc    Authenticate a user & get web tokens
// @access  Public

router.post('/', 
    body("email").isEmail(),
    body("password").exists(),
    
    async(req , res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() })}

        const{email , password} = req.body
        try {
            let user = await User.findOne({email})

        if(!user){
            return res.status(500).send('Email doesnt exist, Please Sign Up')
        }

        const isMatch = await bcrypt.compare(password , user.password)

        if(!isMatch){
            return res.status(500).send('Wrong Password')
        }

        const payload = {
            user : {
                id : user.id
            }
        }
     
     jwt.sign(payload, config.get('jwtSecret'), {expiresIn : 360000}, (err, token) => {
         if(err) throw err
         res.json({token})
     })
     
        } catch (error) {
          console.error(error.message)  
          
        }
        
    
    })




module.exports = router