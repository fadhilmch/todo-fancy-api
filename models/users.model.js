const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  id_fb   : String,
  name    : String,
  username: String,
  email   : String,
  password: String
});

const User = mongoose.model('User', userSchema);

// userSchema.pre('save', function(next) {
//     if(this.username) {
//       User.find({
//         $or : [
//           {email: this.email},
//           {username: this.username}
//         ]
//       })
//       .exec()
//       .then(user => {
//         if(user.length) {
//           next( new Error('Username of email already taken!'))
//         }
//         else {
//           next()
//         }
//       })
//     } else {
//       User.find({
//         email : this.email
//       })
//       .exec()
//       .then(user => {
//         if(user.length) {
//           next(new Error ('Username or email already taken!'));
//         } else {
//           next();
//         }
//       })
//     }
// })

module.exports = User;
