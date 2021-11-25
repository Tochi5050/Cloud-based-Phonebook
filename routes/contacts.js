const express = require('express')
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth')
const User = require('../models/User')
const Contacts = require('../models/Contacts')
const router = express.Router()


// @route   GET api/contacts
// @desc    Getting a user's contact
// @access  Private

router.get('/', auth, async(req, res) => {
try {
    const contacts = await Contacts.find({user : req.user.id}).sort({date : -1})
    res.json(contacts)   
} catch (error) {
    console.error(error.message)
}
})


// @route   POST api/contacts
// @desc    Adding a user
// @access  Private

router.post('/', [auth , 
body('name').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 

  const {name, email, phone, type} = req.body
   try{
      const newContact = new Contacts({
      name,
      email,
      phone,
      type,
      user : req.user.id
  })

  const contacts = await newContact.save()
  res.json(contacts)
}catch(err){
    console.error(err.message)
}
})

// @route   PUT api/contacts/:id
// @desc    Updating a user
// @access  Private

router.put('/:id', auth, async (req, res) => {

const {name, email, phone, type } = req.body

const contactFields = {};
if(name) contactFields.name = name;
if(email) contactFields.email = email;
if(phone) contactFields.phone = phone;
if(type) contactFields.type = type;

try {
  let contacts = Contacts.findById(req.params.id)
   
  if(!contacts){
      return res.status(500).json({msg : 'Invalid User'})
  }

  if(contacts.name !== req.user.name){
        return res.status(500).json({msg : 'Unauthorized access'})
    }

    contacts = await Contacts.findByIdAndUpdate(req.params.id, 
        {$set: contactFields},
        {new: true}
        )
    res.json(contacts)
} catch (error) {
    console.error(error.message)
}
})


// @route   DELETE api/contacts/:id
// @desc    Deleting a user
// @access  Private

router.delete('/:id', auth, async(req, res) => {

    try {
        let contacts = Contacts.findById(req.params.id)
         
        if(!contacts){
            return res.status(500).json({msg : 'Invalid User'})
        }
      
        if(contacts.name !== req.user.name){
              return res.status(500).json({msg : 'Unauthorized access'})
          }
      
          await Contacts.findByIdAndRemove(req.params.id)
          
          res.json({msg : "Contact Removed"})
      } catch (error) {
          console.error(error.message)
      }


})




module.exports = router