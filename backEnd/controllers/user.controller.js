let User = require('../models/user.model');

// Create a New User
const create = async function (req, res) {
    if (!req.body.firstName) {
        return res.json({
            success: false,
            message: "please enter first name"
        });
    } else if (!req.body.lastName) {
        return res.json({
            success: false,
            message: "please enter last name"
        })
    } else if (!req.body.email) {
        return res.json({
            success: false,
            message: "please enter email"
        })
    } else {
        let newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email.toLowerCase(),
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
            role: req.body.role
        });

        User.createUser(newUser, function (err, user) {
            if (err) {
                res.send({
                    success: false,
                    message: err
                });
            } else {
                res.json({
                    success: true,
                    message: "User registered sucessfully",
                    userdata: user
                });
            }
        });
    }
}
module.exports.create = create;
// End of Create a New User

// Get By UserId
const getByUserId = function (req, res) {
    let id = req.params.userId;
    User.findById(id, function (err, result) {
        if (result) {
            res.send({
                success: true,
                userData: result
            });
        } else {
            res.json({
                success: false,
                message: "Not Found / Send a valid ID"
            });
        }
    });
}
module.exports.getByUserId = getByUserId;
// End of Get By UserId

// Update a User
const updateByUserId = async function (req, res) {

    User.findById(req.params.userId, function (err, result) {
        if (result) {
            User.findOneAndUpdate(req.params.userId, req.body, function (err, userObj) {
                if (err) return res.json({
                    success: false,
                    message: 'Error in updating user',
                    error: err
                });
                if (userObj) {
                    return res.json({
                        success: true,
                        message: 'Successfully updated the user',
                        userData: userObj
                    });
                }
            });
        } else {
            res.json({
                success: false,
                message: "Not Found / Send a valid ID"
            });
        }
    });
}
module.exports.updateByUserId = updateByUserId;
// End of Update a User

// Delete UserById
const deleteByUserId = async function (req, res) {
    let id = req.params.userId;
    User.findById(req.params.userId, function (err, result) {
        if (result) {
            User.findByIdAndRemove(id, function (err, post) {
                if (err) {
                    res.json({
                        success: false,
                        message: "User Not Exists / Send a valid ID"
                    });
                } else {
                    res.json({
                        success: true,
                        message: "Deleted User Successfully"
                    });
                }
            });
        } else {
            res.json({
                success: false,
                message: "Not Found / Send a valid ID"
            });
        }
    });
}
module.exports.deleteByUserId = deleteByUserId;
// End of Delete UserById

// Get All Users
const getAllUsers = async function (req, res) {
    User.find({}, function(err, userList) {
        if (userList) {
          res.send({
              success: true,
              userData: userList
          });
        } else {
          res.json({
            error: "No data found!"
          });
        }
      });
}
module.exports.getAllUsers = getAllUsers;
// End of Get All Users

// Login User
const loginUser = async function (req, res) {
    if (!req.body.email) {
        res.json({
            success: false,
            message: 'No email was provided'
        });
    } else {
        if (!req.body.password) {
            res.json({
                success: false,
                message: 'No passsword was provided'
            });
        } else {
            User.findOne({
                    email: req.body.email.toLowerCase()
                },
                (err, user) => {
                    if (err) {
                        res.json({
                            success: false,
                            message: err
                        });
                    } else {
                        if (!user) {
                            res.json({
                                success: false,
                                message: 'email not found'
                            });
                        } else {
                            let candidatePassword = req.body.password;
                            let hash = user.password;

                            User.comparePassword(candidatePassword, hash, function (err, result) {
                                if (result) {
                                    res.json({
                                        success: true,
                                        message: 'successfully logged in',
                                        userData : user
                                    });
                                } else {
                                    res.json({
                                        success: false,
                                        message: "Invalid Password"
                                    });
                                }
                            });

                        }
                    }
                });
        }
    }
}
module.exports.loginUser = loginUser;
// End of Login User