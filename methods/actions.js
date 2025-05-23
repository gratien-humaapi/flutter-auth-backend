var User = require('../models/user');
var jwt = require('jwt-simple');
var config = require('../config/dbconfig');

var functions = {
    addNewUser: function (req, res) {
        if ((!req.body.name) || (!req.body.email)|| (!req.body.password)) {
            res.json({succes: false, msg: 'Enter all fields'})
        } else {
            var newUser = User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            newUser.save(function (err, newUser) {
                if(err) {
                    res.json({success: false, msg: 'Failed to save'})
                } else {
                    res.json({success: true, msg: 'Successfully saved'})
                }
            })
        }
    },
    authenticate: function (req, res) {
        User.findOne({
            name: req.body.name
        }, function (err, user) {
            if(err) throw err
                if (!user) {
                    res.status(403).send({success: false, msg: 'Authentication Failed, User not found'})
                } else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        var token = jwt.encode(user, config.secret)
                        user.token = token;
                        res.json({success: true, token: token})
                    } else {
                        return res.status(403).send({success: false, msg: 'Authentication failed, wrong password'})
                    }
                })
            }
        } )
    },
    getinfo: function (req, res) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0]=== 'Bearer') {
            var token = req.headers.authorization.split(' ')[1]
            var decodedtoken = jwt.decode(token, config.secret)
            return res.json({success: true, msg: 'Hello' + decodedtoken.name, userId: decodedtoken._id, name: decodedtoken.name})
        } else {
            return res.json({success: false, msg: 'No Headers'})
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find({});
            res.json(users);
        } catch (e){
            res.json({message: err});
        }
    },
}


module.exports = functions;