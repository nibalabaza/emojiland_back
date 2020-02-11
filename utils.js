//@ts-check

function log(){
  const now = `[${(new Date()).toISOString()}]`;
  let args = Array.prototype.slice.call(arguments);
  args.splice(0, 0, now);
  console.log.apply(null, args);
}


function buildReply(res, success, reply){
  res.json({
    success: true,
    data: reply
  })
}

/**
 * Returns a bolean with a chanceTrue chance of being true
 * @param {number} chanceTrue 
 */
function randomBool(chanceTrue){
  return function(){
    return Math.random() < (chanceTrue / 100)
  }
}


/**
 * Returns a random number between min and max (inclusive).
 * @param {number} min a natural
 * @param {number} max a natural 
 */
function randBetween(min, max){
  if(!Number.isInteger(min) || !Number.isInteger(max)){
    throw 'randBetween: integer arguments';
  }
  if(min >= max){
    throw 'randBetween: min strictly less than max';
  }
  return Math.floor(Math.random()*(max-min)+min);
}

/**
 * A curried version of randBetween for repeat use.
 * @param {number} min a natural 
 * @param {number} max a natural
 */
function randBetweenC(min, max){
  return function(){ return randBetween(min, max); }
}

module.exports = {
  log: log,
  buildReply: buildReply,
  randomBool: randomBool,
  randBetweenC: randBetweenC
};