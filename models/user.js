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
  console.log(this.password)
  const user = this
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

user.methods.isValidPassword = async function(password){
  const user = this
  const compare = await bcrypt.compare(password, user.password)
  return compare
}

var model = mongoose.model('user', user);

module.exports = model;
