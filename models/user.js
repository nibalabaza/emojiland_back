var mongoose = require ("mongoose");
var bcrypt   = require("bcrypt");

var user = new mongoose.Schema({
    password: String,
    firstName: {type: String,
                index: true},

    lastName: {type: String,
                index: true},
 
    email: {type: String,
            index: true},

    avatar: {type: String,
            index: true},

    rights: {type: Object,
            index: true},
})

user.pre('save', async function(next){
        /**before saving the user excute the hash */
  console.log(this.password)
  const user = this
  const hash = await bcrypt.hash(this.password, 10)
  /**creation de mot de pass et lae hashage ont le meme valure "10" */
  this.password = hash
  next()
})

user.methods.isValidPassword = async function(password){
  const user = this
  const compare = await bcrypt.compare(password, user.password)
  return compare
}
/**if the password of the sign up is the same of the log in   */

var model = mongoose.model('user', user);

module.exports = model;
