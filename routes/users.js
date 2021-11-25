const express = require('express');
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = express.Router()
const { body, validationResult } = require('express-validator');





// @route   POST api/users
// @desc    Registering a user
// @access  Public

router.post('/', 

body("email").isEmail(),
body("password").isLength({min : 6}),


async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

       const {name , email, password} = req.body
try {
   let user = await User.findOne({email})

    if(user){
        return res.status(400).json({msg : 'User already exists'})
    }

    user = new User ({
       name,
       email,
       password
    })

    const salt = await bcrypt.genSalt(12)
    user.password = await bcrypt.hash(password, salt)

    user.save()

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

    res.status(500).send('Server Error')
}

 })







module.exports = router;