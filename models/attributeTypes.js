//@ts-check

const mongoose = require('mongoose')

const asgn = Object.assign
const types = mongoose.Schema.Types

const mT = (constructor, ...arguments) => {
  let res = { type: constructor }
  let args = Array.prototype.slice.call(arguments)
  let arg
  for(let i = 0; i < args.length; i++){
    arg = args[i]
    if(arg.constructor === Array){
      res[arg[0]] = arg[1]
    }else{
      res[arg] = true
    }
  }
  return res
}


const string   = mT(String)
const number   = mT(Number)
const date     = mT(Date)

const reqString = mT(String, "required")
const reqNumber = mT(Number, "required")
const reqDate   = mT(Date,   "required")

const reqUniqueString = mT(String, "required", "unique")

const boolOrFalse = mT(Boolean, ["default", false])

const cat13 = mT(Number, "required", ['min', 1], ['max', 3])
const cat15 = mT(Number, "required", ['min', 1], ['max', 5])


module.exports = {
  id: types.ObjectId,
  string: string,
  number: number,
  date: date,
  requiredString: reqString,
  requiredNumber: reqNumber,
  requiredDate:   reqDate,
  requiredUniqueString: reqUniqueString,
  boolOrFalse: boolOrFalse,
  cat13: cat13,
  cat15: cat15
}