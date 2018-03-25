const jwt = require('jsonwebtoken');
const FB = require('fb');
const User = require('../models/users.model');
const saltRound = 10;
const bcrypt = require('bcrypt');

module.exports = {
  signInFb(req, res) {
    FB.api('/me', {
      fields: ['id', 'name', 'email'],
      access_token : req.headers.token_fb},
      function(userData) {
        if(userData) {
          User.findOne({
            email: userData.email
          })
            .then(data => {
              if(data) {
                let token = jwt.sign({id : data._id}, 'secret');
                console.log('succeed signed in with facebook');
                return res.status(200).json({
                  message: 'Succeed signed in with facebook',
                  _id : data._id,
                  email: data.email,
                  name: data.name,
                  token,
                })
              } else {
                User.create({
                  id_fb     :userData.id,
                  name      :userData.name,
                  email     :userData.email,
                  username  :userData.name.split(' ').join(''),
                  password  :null,
                })
                  .then(data => {
                    let token = jwt.sign({id :data._id}, 'secret');
                    console.log('Succeed signed up with facebook')
                    return res.status(200).json({
                      message: 'Succeed signed up with facebook',
                      _id : data._id,
                      email: data.email,
                      name: data.name,
                      token,
                    })
                  })
                  .catch(err => {
                    return res.status(500).json({
                      message: 'Failed to create new account using facebook',
                      err
                    })
                  })
              }
            })
            .catch(err => {
              return res.status(400).json({
                message: 'Failed to get user data',
                err
              })
            })
        } else {
          return res.status(500).json({
            message: `Failed to connect with facebook`
          })
        }
    })
  },
  signUpFb: (req, res) => {
    FB.api('/me', {
      fields: ['id', 'name', 'email'],
      access_token : req.headers.token_fb},
      function(userData) {
        if(userData){
          User.findOne({
            email: userData.email
          })
            .then(data => {
              if(data) {
                return res.status(400).json({
                  message: 'Failed to signup using facebook. User already registered'
                })
              } else {
                User.create({
                  id_fb     :userData.id,
                  name      :userData.name,
                  email     :userData.email,
                  username  :userData.name.split(' ').join(''),
                  password  :null,
                })
                  .then(data => {
                    let token = jwt.sign({id :data._id}, 'secret');
                    console.log('Succeed signed up with facebook')
                    return res.status(200).json({
                      message: 'Succeed signed up with facebook',
                      _id : data._id,
                      email: data.email,
                      name: data.name,
                      token,
                    })
                  })
                  .catch(err => {
                    return res.status(500).json({
                      message: 'Failed to create new account using facebook',
                      err
                    })
                  })
              }
            })
            .catch(err => {
              return res.status(500).json({
                message: 'cannot find user',
                err
              })
            })
        } else {
          return res.status(500).json({
            message: `Failed to connect with facebook`
          })
        }
    })
  },
  signIn: (req, res) => {
    User
      .findOne({
        $or : [
          {username : req.body.username},
          {email    : req.body.email}
        ]
      })
      .exec()
      .then(userData => {
        console.log(req.body.username)
        console.log(req.body.email)
        console.log(userData)
          if (userData) {
            let passwordCheck = bcrypt.compareSync(req.body.password, userData.password)
            if (passwordCheck) {
              let token = jwt.sign({id : userData._id},
              'secret')
              return res.status(200).json({
                message: 'Sign in success',
                data : {
                  id        : userData._id,
                  name      : userData.name,
                  username  : userData.username,
                  email     : userData.email,
                  token
                }
              })
            } else {
              return res.status(400).json({
                message: 'Failed to sign in, wrong password'
              })
            }
          } else {
            return res.status(400).json({
              message: 'Username / email not found'
            })
          }
      })
      .catch(err => {
        return res.status(400).json({
          message:"Cannot get user data",
          err
        })
      })
  },
  signUp: (req, res) => {
    User
      .findOne({
        $or : [
          {username   :req.body.username},
          {email      :req.body.email}
        ]
      })
      .then(userData => {
        if(userData) {
          return res.status(500).json({
            message   : 'Username / Email already exist'
          })
        } else {
          let userPassword = bcrypt.hashSync(req.body.password, saltRound);
          User.create({
            username  : req.body.username,
            password  : userPassword,
            name      : req.body.name,
            email     : req.body.email
          })
            .then(data => {
              let token = jwt.sign({id : data._id}, 'secret');

              return res.status(201).json({
                message: 'Created new account succeed',
                id: data._id,
                name: data.name,
                email: data.email,
                username: data.username,
                token
              })
            })
            .catch(err => {
              return res.status(500).json({
                message: 'Failed to create new account',
                err
              })
            })
        }
      })
      .catch(err => {
        return res.status(500).json({
          message: 'Failed to get users data',
          err
        })
      })
  },
  findAll: (req, res) => {
      User.find()
          .exec()
          .then(data => {
              return res.status(200).json({
                  message: "Succeed get all users data",
                  data
              })
          })
          .catch(err => {
              return res.status(400).json({
                  message: "Failed get all users data",
              })
          })
  },
  findById: (req, res) => {
      User.findOne({
          _id: req.params.id
      })
      .exec()
      .then(data => {
          return res.status(200).json({
              message: "Succeed get user data by id",
              data
          })
      })
      .catch(err => {
          return res.status(400).json({
              message: "Failed to get user data by Id"
          })
      })
  },
  create: (req, res) => {
      User.create({
          text: req.body.text,
          due_date: req.body.due_date,
          starred: req.body.starred,
      },(err, data) => {
          console.log("masuk")
          if(err){
              return res.status(400).json({
                  message: "Failed to create user",
                  err
              })
          }
          return res.status(200).json({
              message: "Succeed to create user"
          })
      })

  },
  update: (req, res) => {
      User.findOneAndUpdate(
          req.params.id,
          req.body,
          {
              new: true
          }
      )
      .then((data) => {
          return res.status(200).json({
              message: "Succeed to update user data",
              data
          })
      })
      .catch(err => {
          return res.status(400).json({
              message: "failed to update data"
          })
      })
  },
  destroy: (req,res) => {
      User.findByIdAndRemove(
          req.params.id
      )
      .then(() => {
          return res.status(200).json({
              message: "Succeed to delete data"
          })
      })
      .catch(() => {
          return res.status(400).json({
              message: "Failed to delete data"
          })
      })
  }
}
