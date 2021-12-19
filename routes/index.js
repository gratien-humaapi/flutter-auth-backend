const express = require('express');
const actions = require('../methods/actions');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Welcome to user page')
})

// Add a new user
router.post('/adduser', actions.addNewUser)

router.post('/authenticate', actions.authenticate)

router.get('/getinfo', actions.getinfo)

router.get('/users', actions.getAllUsers)






module.exports = router;